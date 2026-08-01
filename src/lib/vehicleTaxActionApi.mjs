import { calculateVehicleTaxCase } from "./vehicleTaxCalculationOrchestrator.mjs";
import { buildVehicleTaxCaseFromActionDto, VehicleTaxActionDtoError } from "./vehicleTaxActionAdapter.mjs";
import {
  VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES,
  VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION,
  VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION,
  handleVehicleTaxEstimateRequest,
} from "./vehicleTaxEstimateApi.mjs";

export const VEHICLE_TAX_ACTION_MAX_STRUCTURE_DEPTH = 64;
export const VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES = 20000;

const MINIMAL_ESTIMATE_BODY = Object.freeze({
  schemaVersion: VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION,
  caseFile: { schemaVersion: "vehicle_tax_case_file.v1" },
  options: {
    calculationDate: "2026-01-01",
    taxYear: 2026,
    scenarioPolicy: "confirmed_only",
    maxScenarios: 0,
    currency: "EUR",
  },
});

const AUTH_GATE_RESULT = Object.freeze({
  schemaVersion: "vehicle_tax_calculation.v1",
  caseId: null,
  status: "partial",
  calculationDate: "2026-01-01",
  taxYear: 2026,
  currency: "EUR",
  classification: null,
  engineExecutions: {},
  taxSummary: { status: "partial", exactTotal: null, confirmedSubtotal: 0, exactTotalBlockedBy: [] },
  scenarios: [],
  readiness: {},
  assumptions: [],
  warnings: [],
  warningCodes: [],
  missingFields: [],
  privacySummary: { containsPersonalData: false, categories: [], documentCount: 0, evidenceCount: 0, warnings: [] },
});

const PROHIBITED_NORMALIZED_KEYS = new Set([
  "dependencies", "proto", "prototype", "constructor", "sourceexcerpt", "rawtext", "ocrtext", "documentcontent", "binary", "base64", "signature", "personalname", "fullname", "email", "phone", "dni", "nif", "iban", "postaladdress", "tojson",
]);
const PROHIBITED_CONFIG_KEYS = new Set([
  "downloadurl", "callbackurl", "webhookurl", "fileurl", "instruction", "instructions", "prompt", "command", "shell", "route", "credential", "credentials", "secret", "token", "password",
]);

function jsonResponse(statusCode, requestId, payload, headers = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
    body: {
      schemaVersion: VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION,
      requestId,
      ...payload,
    },
  };
}

function errorResponse(statusCode, requestId, code, message) {
  return jsonResponse(statusCode, requestId, { ok: false, error: { code, message } });
}

function requestIdFrom(response) {
  return typeof response?.body?.requestId === "string" ? response.body.requestId : "request_error";
}

function byteLength(text) {
  return Buffer.byteLength(text, "utf8");
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}

function normalizedKey(key) {
  return String(key).normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function complexityError() {
  return { ok: false, statusCode: 400, code: "REQUEST_TOO_COMPLEX", message: "Request body is too complex." };
}

function rejectedError() {
  return { ok: false, statusCode: 400, code: "REQUEST_REJECTED", message: "Request contains unsupported or sensitive fields." };
}

function inspectActionJsonValue(root) {
  const seen = new WeakSet();
  const stack = [{ value: root, depth: 0 }];
  let nodes = 0;
  while (stack.length > 0) {
    const { value, depth } = stack.pop();
    nodes += 1;
    if (nodes > VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES || depth > VEHICLE_TAX_ACTION_MAX_STRUCTURE_DEPTH) return complexityError();
    if (value === null) continue;
    const type = typeof value;
    if (type === "string" || type === "number" || type === "boolean") {
      if (type === "number" && !Number.isFinite(value)) return rejectedError();
      continue;
    }
    if (type !== "object") return rejectedError();
    if (seen.has(value)) return rejectedError();
    seen.add(value);
    if (Array.isArray(value)) {
      nodes += value.length;
      if (nodes > VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES) return complexityError();
      for (let index = value.length - 1; index >= 0; index -= 1) stack.push({ value: value[index], depth: depth + 1 });
      continue;
    }
    if (!isPlainObject(value)) return rejectedError();
    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key === "symbol")) return rejectedError();
    nodes += ownKeys.length;
    if (nodes > VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES) return complexityError();
    for (let index = ownKeys.length - 1; index >= 0; index -= 1) {
      const key = ownKeys[index];
      const normalized = normalizedKey(key);
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || !Object.hasOwn(descriptor, "value")) return rejectedError();
      if (PROHIBITED_NORMALIZED_KEYS.has(normalized) || PROHIBITED_CONFIG_KEYS.has(normalized)) return rejectedError();
      stack.push({ value: descriptor.value, depth: depth + 1 });
    }
  }
  return { ok: true };
}

async function readBody(req, limit) {
  if (req?.body !== undefined) {
    if (Buffer.isBuffer(req.body)) {
      if (req.body.length > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
      if (req.body.length === 0) return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
      return { ok: true, text: req.body.toString("utf8") };
    }
    if (typeof req.body === "string") {
      if (byteLength(req.body) > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
      if (req.body.trim() === "") return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
      return { ok: true, text: req.body };
    }
    if (req.body === null) return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
    const safe = inspectActionJsonValue(req.body);
    if (!safe.ok) return safe;
    try {
      const text = JSON.stringify(req.body);
      if (text === undefined) return { ok: false, statusCode: 400, code: "BODY_INVALID", message: "Request body must be valid JSON." };
      if (byteLength(text) > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
      return { ok: true, text };
    } catch {
      return { ok: false, statusCode: 400, code: "BODY_INVALID", message: "Request body must be valid JSON." };
    }
  }
  if (req && typeof req[Symbol.asyncIterator] === "function") {
    const chunks = [];
    let total = 0;
    try {
      for await (const chunk of req) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        total += buffer.length;
        if (total > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
        chunks.push(buffer);
      }
    } catch {
      return { ok: false, statusCode: 400, code: "BODY_INVALID", message: "Request body could not be read." };
    }
    const text = Buffer.concat(chunks).toString("utf8");
    if (text.trim() === "") return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
    return { ok: true, text };
  }
  return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
}

async function authGate(req, config) {
  return handleVehicleTaxEstimateRequest(
    { method: req?.method, headers: req?.headers, body: MINIMAL_ESTIMATE_BODY },
    {
      apiKey: config.apiKey,
      createRequestId: config.createRequestId,
      calculateVehicleTaxCase: async () => AUTH_GATE_RESULT,
    }
  );
}

export async function handleVehicleTaxActionRequest(req, config = {}) {
  let gate;
  try {
    gate = await authGate(req, config);
  } catch {
    return errorResponse(500, "request_error", "INTERNAL_ERROR", "Internal error.");
  }
  if (gate.statusCode !== 200 || gate.body?.ok !== true) return gate;
  const requestId = requestIdFrom(gate);
  const read = await readBody(req, config.maxBodyBytes ?? VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES);
  if (!read.ok) return errorResponse(read.statusCode, requestId, read.code, read.message);
  let dto;
  try {
    dto = JSON.parse(read.text);
  } catch {
    return errorResponse(400, requestId, "JSON_INVALID", "Request body must contain valid JSON.");
  }
  const safe = inspectActionJsonValue(dto);
  if (!safe.ok) return errorResponse(safe.statusCode, requestId, safe.code, safe.message);
  let adapted;
  try {
    const adapter = config.buildVehicleTaxCaseFromActionDto ?? buildVehicleTaxCaseFromActionDto;
    adapted = adapter(dto);
  } catch (error) {
    if (error instanceof VehicleTaxActionDtoError) return errorResponse(error.statusCode, requestId, error.code, error.message);
    return errorResponse(500, requestId, "ACTION_ADAPTER_FAILED", "Action adapter failed.");
  }
  return handleVehicleTaxEstimateRequest(
    {
      method: "POST",
      headers: { "content-type": "application/json", authorization: req?.headers?.authorization ?? req?.headers?.Authorization },
      body: { schemaVersion: VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION, caseFile: adapted.caseFile, options: adapted.options },
    },
    {
      apiKey: config.apiKey,
      timeoutMs: config.timeoutMs,
      createRequestId: () => requestId,
      calculateVehicleTaxCase: config.calculateVehicleTaxCase ?? calculateVehicleTaxCase,
    }
  );
}
