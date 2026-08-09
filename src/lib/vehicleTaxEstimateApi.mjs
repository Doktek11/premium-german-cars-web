import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

import { calculateVehicleTaxCase } from "./vehicleTaxCalculationOrchestrator.mjs";

export const VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION = "vehicle_tax_estimate_request.v1";
export const VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION = "vehicle_tax_estimate_response.v1";
export const VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES = 256 * 1024;
export const VEHICLE_TAX_ESTIMATE_TIMEOUT_MS = 15_000;

const MAX_STRUCTURE_DEPTH = 64;
const MAX_STRUCTURE_NODES = 20_000;
const ROOT_KEYS = Object.freeze(["schemaVersion", "caseFile", "options"]);
const OPTION_KEYS = Object.freeze(["calculationDate", "taxYear", "scenarioPolicy", "maxScenarios", "currency"]);
const CASE_FILE_SCHEMA_VERSION = "vehicle_tax_case_file.v1";
const SAFE_REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{8,128}$/;
const LOCAL_PATH_PATTERN = /(?:[A-Za-z]:\\|\/(?:Users|home|var|etc|tmp|mnt|workspace)\/|\\{2})/;
const COMPLETE_VIN_PATTERN = /\b(?=[A-HJ-NPR-Z0-9]{17}\b)(?=[A-HJ-NPR-Z0-9]*\d)[A-HJ-NPR-Z0-9]{17}\b/i;
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const IBAN_PATTERN = /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/i;
const SPANISH_ID_PATTERN = /\b(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z]|[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J])\b/i;
const PHONE_PATTERN = /(?:^|\s)(?:\+\d{7,15}|\+?34[ -]?[6789]\d{2}[ -]?\d{2}[ -]?\d{2}[ -]?\d{2})(?:\s|$)/;
const ADDRESS_PATTERN = /\b(?:calle|carrer|avenida|avinguda|plaza|passeig|paseo|rambla|via|straße|strasse|street|road|adresse|address)\b[^\n\r]{0,80}\b\d{1,5}\b/i;
const URL_SCHEME_PATTERN = /\b(?:([a-z][a-z0-9+.-]*)\s*:\s*\/\/|((?:data|javascript|mailto))\s*:)/i;
const PROTOCOL_RELATIVE_URL_PATTERN = /(?:^|[\s([{"'])\/\/[^\s\/]/;
const HTTPS_CREDENTIALS_PATTERN = /\bhttps\s*:\s*\/\/[^/\s@]+:[^/\s@]+@/i;
const RESPONSE_ALLOWED_KEYS = Object.freeze([
  "schemaVersion",
  "caseId",
  "status",
  "calculationDate",
  "taxYear",
  "currency",
  "classification",
  "engineExecutions",
  "taxSummary",
  "estimatedSummary",
  "scenarios",
  "readiness",
  "assumptions",
  "warnings",
  "warningCodes",
  "missingFields",
  "privacySummary",
]);
const PROHIBITED_NORMALIZED_KEYS = new Set([
  "dependencies",
  "proto",
  "prototype",
  "constructor",
  "sourceexcerpt",
  "rawtext",
  "ocrtext",
  "documentcontent",
  "binary",
  "base64",
  "signature",
  "personalname",
  "fullname",
  "email",
  "phone",
  "dni",
  "nif",
  "iban",
  "postaladdress",
]);
const PROHIBITED_CONFIG_KEYS = new Set([
  "downloadurl",
  "callbackurl",
  "webhookurl",
  "fileurl",
  "instruction",
  "instructions",
  "prompt",
  "command",
  "shell",
  "route",
  "credential",
  "credentials",
  "secret",
  "token",
  "password",
  "apikey",
]);
const SAFE_REFERENCE_URL_KEYS = new Set(["sourceurl"]);
const OUTPUT_REFERENCE_URL_KEYS = new Set(["url", "sourceurl"]);
const OUTPUT_URL_FORBIDDEN_CONTEXT_KEYS = new Set(["assumptions", "warnings", "conflicts", "label", "labels", "missingfields", "warningcodes", "readiness", "privacysummary"]);
const SAFE_ID_KEYS = new Set(["caseid", "candidateid", "vehiclecandidateid", "documentid", "evidenceid", "requestid", "warningcodes", "conflictid", "scenarioid", "sourcescenarioid"]);
const WARNING_CODE_PATTERN = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}

function byteLength(text) {
  return Buffer.byteLength(text, "utf8");
}

function normalizedKey(key) {
  return String(key ?? "").normalize("NFKC").toLowerCase().replace(/[\s_\-\u2010-\u2015]+/g, "");
}

function normalizedPath(path) {
  return path.map((part) => normalizedKey(part));
}

function lastNormalizedKey(path) {
  return normalizedKey(path.at(-1) ?? "");
}

function isIdPath(path) {
  const keys = normalizedPath(path);
  return keys.some((key) => SAFE_ID_KEYS.has(key) || key.endsWith("id") || key.endsWith("ids") || key.endsWith("identifier"));
}

function isWarningCodePath(path) {
  return normalizedPath(path).includes("warningcodes");
}

function isOfficialReferenceUrlPath(path) {
  const keys = normalizedPath(path);
  return SAFE_REFERENCE_URL_KEYS.has(keys.at(-1)) && keys.includes("bonusevidence");
}

function isAllowedInputNullSourceExcerpt({ privacy, path, keyText, value }) {
  return privacy === "input" && keyText === "sourceExcerpt" && value === null && path.length === 3 && path[0] === "caseFile" && path[1] === "evidence" && Number.isInteger(path[2]);
}

function isOfficialOutputReferenceUrlPath(path) {
  const keys = normalizedPath(path);
  const last = keys.at(-1);
  if (keys.some((key) => OUTPUT_URL_FORBIDDEN_CONTEXT_KEYS.has(key))) return false;
  if (OUTPUT_REFERENCE_URL_KEYS.has(last)) {
    return keys.includes("legalbasis") || keys.includes("source") || keys.includes("sources") || keys.includes("bonusevidence");
  }
  return last === "source" && keys.includes("legalbasis");
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

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

function errorResponse(statusCode, requestId, code, message, headers = {}) {
  return jsonResponse(statusCode, requestId, { ok: false, error: { code, message } }, headers);
}

function methodNotAllowed(requestId) {
  return errorResponse(405, requestId, "METHOD_NOT_ALLOWED", "Only POST is allowed.", { Allow: "POST" });
}

function safeRequestIdFrom(value) {
  return typeof value === "string" && SAFE_REQUEST_ID_PATTERN.test(value) ? value : null;
}

function fallbackRequestId() {
  try {
    return safeRequestIdFrom(randomUUID()) ?? "request_error";
  } catch {
    return "request_error";
  }
}

function createRequestId(config) {
  try {
    if (typeof config?.createRequestId === "function") {
      const generated = safeRequestIdFrom(config.createRequestId());
      if (generated) return generated;
    }
  } catch {
    return fallbackRequestId();
  }
  return fallbackRequestId();
}

function contentTypeOf(req) {
  const headers = req?.headers ?? {};
  const value = headers["content-type"] ?? headers["Content-Type"] ?? (typeof req?.getHeader === "function" ? req.getHeader("content-type") : "");
  return Array.isArray(value) ? value[0] : String(value ?? "");
}

function hasJsonContentType(req) {
  const mediaType = contentTypeOf(req).trim().split(";")[0].trim().toLowerCase();
  return mediaType === "application/json";
}

function bearerToken(req) {
  const headers = req?.headers ?? {};
  const value = headers.authorization ?? headers.Authorization ?? "";
  const text = Array.isArray(value) ? value[0] : String(value ?? "");
  const match = text.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left), "utf8");
  const rightBuffer = Buffer.from(String(right), "utf8");
  if (leftBuffer.length !== rightBuffer.length) {
    const digestLeft = createHash("sha256").update(leftBuffer).digest();
    const digestRight = createHash("sha256").update(rightBuffer).digest();
    timingSafeEqual(digestLeft, digestRight);
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function validateAuth(req, apiKey, requestId) {
  if (typeof apiKey !== "string" || apiKey.trim() === "") {
    return errorResponse(503, requestId, "AUTH_NOT_CONFIGURED", "Authentication is not configured.");
  }
  const token = bearerToken(req);
  if (!token) return errorResponse(401, requestId, "AUTH_REQUIRED", "Bearer authentication is required.");
  if (!safeEqual(token, apiKey)) return errorResponse(403, requestId, "AUTH_FORBIDDEN", "Bearer token is not authorized.");
  return null;
}

async function readStreamBody(stream, limit) {
  const chunks = [];
  let total = 0;
  try {
    for await (const chunk of stream) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      total += buffer.length;
      if (total > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
      chunks.push(buffer);
    }
  } catch {
    return { ok: false, statusCode: 400, code: "BODY_INVALID", message: "Request body could not be read." };
  }
  return { ok: true, text: Buffer.concat(chunks).toString("utf8") };
}

function safeSerializedByteLength(value) {
  try {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) return { ok: false, statusCode: 400, code: "BODY_INVALID", message: "Request body must be valid JSON." };
    return { ok: true, bytes: byteLength(serialized) };
  } catch {
    return { ok: false, statusCode: 400, code: "BODY_INVALID", message: "Request body must be valid JSON." };
  }
}

async function readRequestBody(req, limit) {
  if (req?.body !== undefined) {
    if (Buffer.isBuffer(req.body)) {
      if (req.body.length > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
      if (req.body.length === 0) return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
      return { ok: true, body: JSON.parse(req.body.toString("utf8")) };
    }
    if (typeof req.body === "string") {
      if (byteLength(req.body) > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
      if (req.body.trim() === "") return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
      return { ok: true, body: JSON.parse(req.body) };
    }
    if (req.body === null) return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
    const complexity = inspectJsonValue(req.body, { privacy: "input" });
    if (!complexity.ok) return complexity;
    const measured = safeSerializedByteLength(req.body);
    if (!measured.ok) return measured;
    if (measured.bytes > limit) return { ok: false, statusCode: 413, code: "BODY_TOO_LARGE", message: "Request body is too large." };
    return { ok: true, body: req.body };
  }
  if (req && typeof req[Symbol.asyncIterator] === "function") {
    const streamBody = await readStreamBody(req, limit);
    if (!streamBody.ok) return streamBody;
    if (streamBody.text.trim() === "") return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
    return { ok: true, body: JSON.parse(streamBody.text) };
  }
  return { ok: false, statusCode: 400, code: "BODY_EMPTY", message: "Request body is empty." };
}

function validIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function stringHasUnsafeUrl(value, path, privacy) {
  const normalized = value.normalize("NFKC");
  if (PROTOCOL_RELATIVE_URL_PATTERN.test(normalized)) return true;
  const match = normalized.match(URL_SCHEME_PATTERN);
  if (!match) return false;
  const scheme = (match[1] ?? match[2]).toLowerCase();
  const allowedPath = privacy === "output" ? isOfficialOutputReferenceUrlPath(path) : isOfficialReferenceUrlPath(path);
  if (scheme !== "https" || !allowedPath || HTTPS_CREDENTIALS_PATTERN.test(normalized)) return true;
  try {
    const compact = normalized.slice(match.index).trim().replace(/^([a-z][a-z0-9+.-]*)\s*:\s*/i, "$1:");
    const token = compact.split(/[\s<>"')\]}]+/u)[0];
    const url = new URL(token);
    return url.protocol !== "https:" || url.username !== "" || url.password !== "";
  } catch {
    return true;
  }
}

function stringHasPrivateValue(value, path) {
  const normalized = value.normalize("NFKC");
  if (EMAIL_PATTERN.test(normalized) || IBAN_PATTERN.test(normalized) || SPANISH_ID_PATTERN.test(normalized) || PHONE_PATTERN.test(normalized) || ADDRESS_PATTERN.test(normalized) || COMPLETE_VIN_PATTERN.test(normalized) || LOCAL_PATH_PATTERN.test(normalized) || /\bstack\b/i.test(normalized)) return true;
  return isWarningCodePath(path) && !WARNING_CODE_PATTERN.test(normalized);
}

function hasProhibitedOutputField(root) {
  const seen = new WeakSet();
  const stack = [root];
  while (stack.length > 0) {
    const value = stack.pop();
    if (!value || typeof value !== "object" || seen.has(value)) continue;
    seen.add(value);
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index += 1) stack.push(value[index]);
      continue;
    }
    if (!isPlainObject(value)) continue;
    for (const key of Reflect.ownKeys(value)) {
      const normalized = normalizedKey(String(key));
      if (PROHIBITED_NORMALIZED_KEYS.has(normalized) || PROHIBITED_CONFIG_KEYS.has(normalized)) return true;
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor && Object.hasOwn(descriptor, "value")) stack.push(descriptor.value);
    }
  }
  return false;
}

function inspectJsonValue(root, { privacy }) {
  const seen = new WeakSet();
  const stack = [{ value: root, depth: 0, path: [] }];
  let nodes = 0;
  while (stack.length > 0) {
    const { value, depth, path } = stack.pop();
    nodes += 1;
    if (nodes > MAX_STRUCTURE_NODES || depth > MAX_STRUCTURE_DEPTH) {
      return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_TOO_COMPLEX" : "RESPONSE_TOO_COMPLEX", message: privacy === "input" ? "Request body is too complex." : "Calculation response is too complex." };
    }
    if (value === null) continue;
    const type = typeof value;
    if (type === "string") {
      if (privacy === "input" && (stringHasUnsafeUrl(value, path, privacy) || stringHasPrivateValue(value, path))) return { ok: false, statusCode: 400, code: "REQUEST_REJECTED", message: "Request contains unsupported or sensitive fields." };
      if (privacy === "output" && (stringHasUnsafeUrl(value, path, privacy) || stringHasPrivateValue(value, path))) return { ok: false, statusCode: 500, code: "PRIVACY_GUARD_FAILED", message: "Calculation response failed privacy checks." };
      continue;
    }
    if (type === "number") {
      if (!Number.isFinite(value)) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "CALCULATION_RESPONSE_INVALID", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response is invalid." };
      continue;
    }
    if (type === "boolean") continue;
    if (type !== "object") return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "CALCULATION_RESPONSE_INVALID", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response is invalid." };
    if (seen.has(value)) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "CALCULATION_RESPONSE_INVALID", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response is invalid." };
    seen.add(value);
    if (Array.isArray(value)) {
      nodes += value.length;
      if (nodes > MAX_STRUCTURE_NODES) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_TOO_COMPLEX" : "RESPONSE_TOO_COMPLEX", message: privacy === "input" ? "Request body is too complex." : "Calculation response is too complex." };
      for (let index = value.length - 1; index >= 0; index -= 1) stack.push({ value: value[index], depth: depth + 1, path: [...path, index] });
      continue;
    }
    if (!isPlainObject(value)) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "CALCULATION_RESPONSE_INVALID", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response is invalid." };
    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key === "symbol")) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "CALCULATION_RESPONSE_INVALID", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response is invalid." };
    nodes += ownKeys.length;
    if (nodes > MAX_STRUCTURE_NODES) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_TOO_COMPLEX" : "RESPONSE_TOO_COMPLEX", message: privacy === "input" ? "Request body is too complex." : "Calculation response is too complex." };
    for (let index = ownKeys.length - 1; index >= 0; index -= 1) {
      const key = ownKeys[index];
      const keyText = String(key);
      const normalized = normalizedKey(keyText);
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || !Object.hasOwn(descriptor, "value")) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "CALCULATION_RESPONSE_INVALID", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response is invalid." };
      if ((PROHIBITED_NORMALIZED_KEYS.has(normalized) || PROHIBITED_CONFIG_KEYS.has(normalized)) && !isAllowedInputNullSourceExcerpt({ privacy, path, keyText, value: descriptor.value })) return { ok: false, statusCode: privacy === "input" ? 400 : 500, code: privacy === "input" ? "REQUEST_REJECTED" : "PRIVACY_GUARD_FAILED", message: privacy === "input" ? "Request contains unsupported or sensitive fields." : "Calculation response failed privacy checks." };
      stack.push({ value: descriptor.value, depth: depth + 1, path: [...path, keyText] });
    }
  }
  return { ok: true };
}

function validateExactKeys(object, allowedKeys) {
  const keys = Object.keys(object).sort();
  const allowed = [...allowedKeys].sort();
  return keys.length === allowed.length && keys.every((key, index) => key === allowed[index]);
}

function validateRequestContract(body) {
  if (!isPlainObject(body)) return { ok: false, statusCode: 400, code: "REQUEST_INVALID", message: "Request body must be an object." };
  const safe = inspectJsonValue(body, { privacy: "input" });
  if (!safe.ok) return safe;
  if (!validateExactKeys(body, ROOT_KEYS)) return { ok: false, statusCode: 400, code: "REQUEST_KEYS_INVALID", message: "Request root keys are invalid." };
  if (body.schemaVersion !== VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION) return { ok: false, statusCode: 400, code: "REQUEST_SCHEMA_INVALID", message: "Request schemaVersion is invalid." };
  if (!isPlainObject(body.caseFile)) return { ok: false, statusCode: 400, code: "CASE_FILE_REQUIRED", message: "caseFile is required." };
  if (body.caseFile.schemaVersion !== CASE_FILE_SCHEMA_VERSION) return { ok: false, statusCode: 400, code: "CASE_FILE_SCHEMA_INVALID", message: "caseFile schemaVersion is invalid." };
  if (!isPlainObject(body.options)) return { ok: false, statusCode: 400, code: "OPTIONS_REQUIRED", message: "options is required." };
  if (!validateExactKeys(body.options, OPTION_KEYS)) return { ok: false, statusCode: 400, code: "OPTIONS_KEYS_INVALID", message: "options keys are invalid." };
  if (!validIsoDate(body.options.calculationDate)) return { ok: false, statusCode: 400, code: "OPTIONS_INVALID", message: "calculationDate is invalid." };
  if (!Number.isInteger(body.options.taxYear) || body.options.taxYear < 1990 || body.options.taxYear > 2100) return { ok: false, statusCode: 400, code: "OPTIONS_INVALID", message: "taxYear is invalid." };
  if (Number(body.options.calculationDate.slice(0, 4)) !== body.options.taxYear) return { ok: false, statusCode: 400, code: "OPTIONS_INVALID", message: "taxYear must match calculationDate year." };
  if (!["confirmed_only", "documentary_scenarios"].includes(body.options.scenarioPolicy)) return { ok: false, statusCode: 400, code: "OPTIONS_INVALID", message: "scenarioPolicy is invalid." };
  if (!Number.isInteger(body.options.maxScenarios) || body.options.maxScenarios < 0 || body.options.maxScenarios > 12) return { ok: false, statusCode: 400, code: "OPTIONS_INVALID", message: "maxScenarios is invalid." };
  if (body.options.currency !== "EUR") return { ok: false, statusCode: 400, code: "OPTIONS_INVALID", message: "currency is invalid." };
  return { ok: true };
}

function sanitizeCalculationResult(result) {
  if (!isPlainObject(result)) return null;
  const out = {};
  for (const key of RESPONSE_ALLOWED_KEYS) out[key] = cloneJson(result[key] ?? null);
  return out;
}

async function withTimeout(task, timeoutMs) {
  let timer = null;
  try {
    return await Promise.race([
      task,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("VEHICLE_TAX_ESTIMATE_TIMEOUT")), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function handleVehicleTaxEstimateRequestInner(req, config, requestId) {
  const method = String(req?.method ?? "").toUpperCase();
  if (method !== "POST") return methodNotAllowed(requestId);

  const authError = validateAuth(req, config.apiKey, requestId);
  if (authError) return authError;
  if (!hasJsonContentType(req)) return errorResponse(415, requestId, "CONTENT_TYPE_UNSUPPORTED", "Content-Type must be application/json.");

  let parsed;
  try {
    parsed = await readRequestBody(req, config.maxBodyBytes ?? VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES);
  } catch {
    return errorResponse(400, requestId, "JSON_INVALID", "Request body must contain valid JSON.");
  }
  if (!parsed.ok) return errorResponse(parsed.statusCode, requestId, parsed.code, parsed.message);

  const contract = validateRequestContract(parsed.body);
  if (!contract.ok) return errorResponse(contract.statusCode, requestId, contract.code, contract.message);

  const runner = config.calculateVehicleTaxCase ?? calculateVehicleTaxCase;
  let result;
  try {
    result = await withTimeout(Promise.resolve().then(() => runner(parsed.body.caseFile, parsed.body.options)), config.timeoutMs ?? VEHICLE_TAX_ESTIMATE_TIMEOUT_MS);
  } catch (error) {
    if (error?.message === "VEHICLE_TAX_ESTIMATE_TIMEOUT") return errorResponse(503, requestId, "CALCULATION_TIMEOUT", "Calculation timed out.");
    return errorResponse(500, requestId, "CALCULATION_FAILED", "Calculation failed.");
  }

  if (hasProhibitedOutputField(result)) return errorResponse(500, requestId, "PRIVACY_GUARD_FAILED", "Calculation response failed privacy checks.");
  const data = sanitizeCalculationResult(result);
  if (!data) return errorResponse(500, requestId, "CALCULATION_RESPONSE_INVALID", "Calculation response is invalid.");
  if (data.status === "invalid") return errorResponse(422, requestId, "CASE_FILE_NOT_PROCESSABLE", "caseFile is not processable.");
  const outputSafe = inspectJsonValue(data, { privacy: "output" });
  if (!outputSafe.ok) return errorResponse(outputSafe.statusCode, requestId, outputSafe.code, outputSafe.message);

  return jsonResponse(200, requestId, { ok: true, data });
}

export async function handleVehicleTaxEstimateRequest(req, config = {}) {
  const requestId = createRequestId(config);
  try {
    return await handleVehicleTaxEstimateRequestInner(req, config, requestId);
  } catch {
    return errorResponse(500, requestId, "INTERNAL_ERROR", "Internal error.");
  }
}

export function sendVehicleTaxEstimateResponse(res, response) {
  try {
    for (const [key, value] of Object.entries(response.headers ?? {})) {
      if (typeof res.setHeader === "function") res.setHeader(key, value);
    }
    return res.status(response.statusCode).json(response.body);
  } catch {
    return res;
  }
}
