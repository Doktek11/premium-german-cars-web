import assert from "node:assert/strict";
import { Readable } from "node:stream";
import test from "node:test";

import apiHandler from "../../api/vehicle-tax-estimate.js";
import { buildVehicleTaxCaseFile } from "./vehicleTaxCaseFile.mjs";
import {
  VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES,
  VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION,
  VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION,
  handleVehicleTaxEstimateRequest,
} from "./vehicleTaxEstimateApi.mjs";

const API_KEY = "test-secret-key";
const DEFAULT_OPTIONS = Object.freeze({ calculationDate: "2026-07-29", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" });

function fact(field, value, evidenceId, overrides = {}) {
  return {
    field,
    value,
    normalizedValue: value,
    valueType: typeof value,
    unit: null,
    status: "confirmed",
    selectedEvidenceId: evidenceId,
    evidenceIds: [evidenceId],
    alternatives: [],
    selectionReason: "confirmed evidence",
    assumptions: [],
    warnings: [],
    ...overrides,
  };
}

function evidence(evidenceId, field, documentType, sourceType, overrides = {}) {
  return {
    evidenceId,
    documentId: `${evidenceId}-doc`,
    vehicleCandidateId: field.startsWith("vehicle.") ? "vehicle-1" : null,
    field,
    documentType,
    page: 1,
    fieldLabel: field,
    normalizedValue: overrides.normalizedValue ?? null,
    valueType: overrides.valueType ?? null,
    unit: null,
    sourceType,
    confidence: 0.9,
    extractionMethod: "manual",
    verifiedBy: "reviewer",
    verificationStatus: "confirmed_official",
    warnings: [],
    ...overrides,
  };
}

function minimalCaseFile(overrides = {}) {
  return {
    schemaVersion: "vehicle_tax_case_file.v1",
    caseId: "case-api-1",
    documents: [],
    vehicleCandidates: [],
    selectedVehicleCandidateId: "vehicle-1",
    facts: {},
    evidence: [],
    conflicts: [],
    scenarios: [],
    readiness: {},
    sensitiveDataSummary: { containsPersonalData: false, categories: [], documentCount: 0, evidenceCount: 0, warnings: [] },
    ...overrides,
  };
}

function realLookupCaseFile() {
  const items = [
    evidence("boe", "vehicle.boeValue", "professional_report", "professional_document", { normalizedValue: 24000, valueType: "money" }),
    evidence("wltp", "vehicle.co2Wltp", "coc", "official_document", { normalizedValue: 165, valueType: "number" }),
    evidence("standard", "vehicle.emissionsStandard", "coc", "official_document", { normalizedValue: "wltp", valueType: "enum" }),
    evidence("first-reg", "vehicle.firstRegistrationDate", "coc", "official_document", { normalizedValue: "2020-06", valueType: "date" }),
    evidence("category", "vehicle.category", "coc", "official_document", { normalizedValue: "passenger_car", valueType: "enum" }),
    evidence("cvf", "vehicle.fiscalHorsepower", "spanish_technical_card", "official_document", { normalizedValue: 13.7, valueType: "number" }),
    evidence("spanish-reg", "vehicle.spanishRegistrationDate", "spanish_technical_card", "official_document", { normalizedValue: "2026-07-20", valueType: "date" }),
    evidence("condition", "vehicle.condition", "user_declaration", "user_declaration", { normalizedValue: "usado_importado", valueType: "enum", verificationStatus: "confirmed_user" }),
    evidence("municipality", "taxDestination.municipalityCode", "user_declaration", "user_declaration", { normalizedValue: "28079", valueType: "string", verificationStatus: "confirmed_user" }),
    evidence("region", "taxDestination.autonomousCommunity", "user_declaration", "user_declaration", { normalizedValue: "madrid", valueType: "string", verificationStatus: "confirmed_user" }),
    evidence("settlement", "taxDestination.expectedSettlementDate", "user_declaration", "user_declaration", { normalizedValue: "2026-07-29", valueType: "date", verificationStatus: "confirmed_user" }),
  ];
  const vehicleFacts = Object.fromEntries([
    ["vehicle.boeValue", fact("vehicle.boeValue", 24000, "boe")],
    ["vehicle.co2Wltp", fact("vehicle.co2Wltp", 165, "wltp")],
    ["vehicle.emissionsStandard", fact("vehicle.emissionsStandard", "wltp", "standard")],
    ["vehicle.firstRegistrationDate", fact("vehicle.firstRegistrationDate", "2020-06", "first-reg")],
    ["vehicle.category", fact("vehicle.category", "passenger_car", "category")],
    ["vehicle.fiscalHorsepower", fact("vehicle.fiscalHorsepower", 13.7, "cvf")],
    ["vehicle.spanishRegistrationDate", fact("vehicle.spanishRegistrationDate", "2026-07-20", "spanish-reg")],
    ["vehicle.condition", fact("vehicle.condition", "usado_importado", "condition")],
  ]);
  return minimalCaseFile({
    evidence: items,
    facts: {
      "taxDestination.municipalityCode": fact("taxDestination.municipalityCode", "28079", "municipality"),
      "taxDestination.autonomousCommunity": fact("taxDestination.autonomousCommunity", "madrid", "region"),
      "taxDestination.expectedSettlementDate": fact("taxDestination.expectedSettlementDate", "2026-07-29", "settlement"),
    },
    vehicleCandidates: [{ vehicleCandidateId: "vehicle-1", status: "single_confirmed", documentIds: [], evidenceIds: items.map((item) => item.evidenceId), facts: vehicleFacts, conflicts: [], assumptions: [], warnings: [] }],
  });
}

function requestBody(overrides = {}) {
  return { schemaVersion: VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION, caseFile: minimalCaseFile(), options: { ...DEFAULT_OPTIONS }, ...overrides };
}

function calculationResult(overrides = {}) {
  return {
    schemaVersion: "vehicle_tax_calculation.v1",
    caseId: "case-api-1",
    status: "exact",
    calculationDate: "2026-07-29",
    taxYear: 2026,
    currency: "EUR",
    classification: { status: "confirmed", warningCodes: [], evidenceIds: [], scenarios: [], transferTaxClassification: { sellerType: "private" } },
    engineExecutions: {},
    taxSummary: { status: "exact", currency: "EUR", exactTotal: 123.45, confirmedSubtotal: 123.45, exactTotalBlockedBy: [] },
    scenarios: [],
    readiness: {},
    assumptions: [],
    warnings: [],
    warningCodes: [],
    missingFields: [],
    privacySummary: { containsPersonalData: false, categories: [], documentCount: 0, evidenceCount: 0, warnings: [] },
    ...overrides,
  };
}

function req(body, overrides = {}) {
  return { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` }, body, ...overrides };
}

function config(overrides = {}) {
  return { apiKey: API_KEY, createRequestId: () => "req-test-1", calculateVehicleTaxCase: async () => calculationResult(), ...overrides };
}

async function call(body = requestBody(), overrides = {}, configOverrides = {}) {
  return handleVehicleTaxEstimateRequest(req(body, overrides), config(configOverrides));
}

function responseText(response) {
  return JSON.stringify(response.body);
}

function assertCanonicalSuccess(response) {
  assert.equal(response.statusCode, 200);
  assert.deepEqual(Object.keys(response.body), ["schemaVersion", "requestId", "ok", "data"]);
  assert.equal(response.body.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
  assert.equal(response.body.requestId, "req-test-1");
  assert.equal(response.body.ok, true);
}

function assertCanonicalError(response, statusCode, code) {
  assert.equal(response.statusCode, statusCode);
  assert.deepEqual(Object.keys(response.body), ["schemaVersion", "requestId", "ok", "error"]);
  assert.equal(response.body.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
  assert.equal(response.body.ok, false);
  assert.equal(response.body.error.code, code);
  assert.equal(responseText(response).includes(API_KEY), false);
}

function streamFrom(text) {
  return Readable.from([Buffer.from(text)]);
}

function mockRes() {
  const res = {
    headers: {},
    statusCode: null,
    jsonBody: null,
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.jsonBody = body;
      return this;
    },
  };
  return res;
}

test("POST valido exacto devuelve JSON canonico y llama al orquestador una vez", async () => {
  let calls = 0;
  let receivedCaseFile = null;
  let receivedOptions = null;
  const input = requestBody();
  const before = JSON.stringify(input);
  const response = await call(input, {}, {
    calculateVehicleTaxCase: async (caseFile, options) => {
      calls += 1;
      receivedCaseFile = caseFile;
      receivedOptions = options;
      return calculationResult();
    },
  });
  assertCanonicalSuccess(response);
  assert.equal(calls, 1);
  assert.equal(receivedCaseFile, input.caseFile);
  assert.deepEqual(receivedOptions, DEFAULT_OPTIONS);
  assert.equal(JSON.stringify(input), before);
  assert.deepEqual(response.body, JSON.parse(JSON.stringify(response.body)));
});

test("calculo parcial y requires_review se devuelven con 200", async () => {
  const partial = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ status: "partial", taxSummary: { status: "partial", exactTotal: null, confirmedSubtotal: 10, exactTotalBlockedBy: ["ivtm"] } }) });
  const review = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ status: "requires_review", taxSummary: { status: "requires_review", exactTotal: null, confirmedSubtotal: 10, exactTotalBlockedBy: ["ivtm"] } }) });
  assertCanonicalSuccess(partial);
  assertCanonicalSuccess(review);
  assert.equal(partial.body.data.status, "partial");
  assert.equal(review.body.data.status, "requires_review");
});

test("metodos no POST responden 405 sin CORS y Allow POST", async () => {
  for (const method of ["GET", "OPTIONS", "PUT"]) {
    const response = await handleVehicleTaxEstimateRequest({ method, headers: {}, body: null }, config());
    assertCanonicalError(response, 405, "METHOD_NOT_ALLOWED");
    assert.equal(response.headers.Allow, "POST");
    assert.equal(Object.hasOwn(response.headers, "Access-Control-Allow-Origin"), false);
  }
});

test("auth fail-closed y Bearer requerido", async () => {
  assertCanonicalError(await handleVehicleTaxEstimateRequest(req(requestBody()), config({ apiKey: "" })), 503, "AUTH_NOT_CONFIGURED");
  assertCanonicalError(await handleVehicleTaxEstimateRequest(req(requestBody(), { headers: { "content-type": "application/json" } }), config()), 401, "AUTH_REQUIRED");
  assertCanonicalError(await handleVehicleTaxEstimateRequest(req(requestBody(), { headers: { "content-type": "application/json", authorization: "Basic abc" } }), config()), 401, "AUTH_REQUIRED");
  assertCanonicalError(await handleVehicleTaxEstimateRequest(req(requestBody(), { headers: { "content-type": "application/json", authorization: "Bearer wrong" } }), config()), 403, "AUTH_FORBIDDEN");
  assertCanonicalSuccess(await call());
});

test("Content-Type, body vacio y JSON invalido se rechazan", async () => {
  assertCanonicalError(await handleVehicleTaxEstimateRequest(req(requestBody(), { headers: { "content-type": "text/plain", authorization: `Bearer ${API_KEY}` } }), config()), 415, "CONTENT_TYPE_UNSUPPORTED");
  assertCanonicalError(await call(""), 400, "BODY_EMPTY");
  assertCanonicalError(await call("{"), 400, "JSON_INVALID");
  assertCanonicalError(await call(Buffer.from("{")), 400, "JSON_INVALID");
});

test("body exactamente en limite pasa y superior al limite responde 413", async () => {
  const body = JSON.stringify(requestBody());
  assertCanonicalSuccess(await call(body, {}, { maxBodyBytes: Buffer.byteLength(body) }));
  assertCanonicalError(await call(body, {}, { maxBodyBytes: Buffer.byteLength(body) - 1 }), 413, "BODY_TOO_LARGE");
});

test("acepta body objeto, string, Buffer y stream", async () => {
  const text = JSON.stringify(requestBody());
  assertCanonicalSuccess(await call(requestBody()));
  assertCanonicalSuccess(await call(text));
  assertCanonicalSuccess(await call(Buffer.from(text)));
  assertCanonicalSuccess(await handleVehicleTaxEstimateRequest({ method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` }, [Symbol.asyncIterator]: streamFrom(text)[Symbol.asyncIterator].bind(streamFrom(text)) }, config()));
});

test("stream superior al limite corta con 413", async () => {
  const largeStream = streamFrom("x".repeat(VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES + 1));
  const response = await handleVehicleTaxEstimateRequest({ method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` }, [Symbol.asyncIterator]: largeStream[Symbol.asyncIterator].bind(largeStream) }, config());
  assertCanonicalError(response, 413, "BODY_TOO_LARGE");
});

test("contrato cerrado rechaza schemas, options invalidas y claves extra", async () => {
  assertCanonicalError(await call({ ...requestBody(), schemaVersion: "wrong" }), 400, "REQUEST_SCHEMA_INVALID");
  const withoutCaseFile = { ...requestBody() };
  delete withoutCaseFile.caseFile;
  assertCanonicalError(await call(withoutCaseFile), 400, "REQUEST_KEYS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { schemaVersion: "wrong" } }), 400, "CASE_FILE_SCHEMA_INVALID");
  const withoutOptions = { ...requestBody() };
  delete withoutOptions.options;
  assertCanonicalError(await call(withoutOptions), 400, "REQUEST_KEYS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), extra: true }), 400, "REQUEST_KEYS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), options: { ...DEFAULT_OPTIONS, extra: true } }), 400, "OPTIONS_KEYS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), options: { ...DEFAULT_OPTIONS, calculationDate: "2026-02-31" } }), 400, "OPTIONS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), options: { ...DEFAULT_OPTIONS, taxYear: 2025 } }), 400, "OPTIONS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), options: { ...DEFAULT_OPTIONS, scenarioPolicy: "all" } }), 400, "OPTIONS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), options: { ...DEFAULT_OPTIONS, maxScenarios: 13 } }), 400, "OPTIONS_INVALID");
  assertCanonicalError(await call({ ...requestBody(), options: { ...DEFAULT_OPTIONS, currency: "USD" } }), 400, "OPTIONS_INVALID");
});

test("rechaza dependencies, claves peligrosas, PII, VIN completo y objetos no planos", async () => {
  assertCanonicalError(await call({ ...requestBody(), dependencies: {} }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), nested: { dependencies: {} } } }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), constructor: "bad" } }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), evidence: [{ sourceExcerpt: "raw" }] } }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), personalName: "Sample Person" } }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), email: "sample@example.invalid" } }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), evidence: [{ field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }] } }), 400, "REQUEST_REJECTED");
  assertCanonicalSuccess(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), selectedVehicleCandidateId: "VIN_REDACTED_123" } }));
  const odd = Object.create({ inherited: true });
  odd.schemaVersion = VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION;
  odd.caseFile = minimalCaseFile();
  odd.options = { ...DEFAULT_OPTIONS };
  assertCanonicalError(await call(odd), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), amount: Number.NaN } }), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call({ ...requestBody(), caseFile: { ...minimalCaseFile(), amount: Infinity } }), 400, "REQUEST_REJECTED");
});

test("errores del orquestador son controlados", async () => {
  assertCanonicalError(await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ status: "invalid" }) }), 422, "CASE_FILE_NOT_PROCESSABLE");
  assertCanonicalError(await call(requestBody(), {}, { calculateVehicleTaxCase: async () => { throw new Error("C:\\Users\\secret\\stack"); } }), 500, "CALCULATION_FAILED");
  const timeout = await call(requestBody(), {}, { timeoutMs: 1, calculateVehicleTaxCase: () => new Promise((resolve) => setTimeout(() => resolve(calculationResult()), 25)) });
  assertCanonicalError(timeout, 503, "CALCULATION_TIMEOUT");
  assert.equal(responseText(timeout).includes("exactTotal\":0"), false);
  assert.equal(responseText(timeout).includes("stack"), false);
});

test("guardia de privacidad rechaza salida contaminada", async () => {
  const response = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ warnings: ["sample@example.invalid"], taxSummary: { status: "exact", exactTotal: 10, sourceExcerpt: "raw" } }) });
  assertCanonicalError(response, 500, "PRIVACY_GUARD_FAILED");
  const text = responseText(response);
  for (const marker of ["sample@example.invalid", "sourceExcerpt", "raw"]) assert.equal(text.includes(marker), false);
});

test("requestIds son opacos y llamadas independientes", async () => {
  let sequence = 0;
  const createRequestId = () => `opaque-${++sequence}`;
  const first = await call(requestBody(), {}, { createRequestId });
  const second = await call(requestBody(), {}, { createRequestId });
  assert.equal(first.body.requestId, "opaque-1");
  assert.equal(second.body.requestId, "opaque-2");
  assert.notEqual(first.body, second.body);
});

test("adaptador Vercel importa y ejecuta el handler minimo", async () => {
  const old = process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
  process.env.VEHICLE_TAX_ESTIMATE_API_KEY = API_KEY;
  try {
    const res = mockRes();
    await apiHandler(req(requestBody()), res);
    assert.ok([200, 422].includes(res.statusCode));
    assert.equal(res.jsonBody.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
  } finally {
    if (old === undefined) delete process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
    else process.env.VEHICLE_TAX_ESTIMATE_API_KEY = old;
  }
});

test("endpoint real llega al lookup IVTM local con JSON disponibles", async () => {
  const old = process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
  process.env.VEHICLE_TAX_ESTIMATE_API_KEY = API_KEY;
  try {
    const res = mockRes();
    await apiHandler(req(requestBody({ caseFile: realLookupCaseFile() })), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonBody.ok, true);
    assert.notEqual(res.jsonBody.data.engineExecutions.ivtm.result, null);
    assert.notEqual(res.jsonBody.data.engineExecutions.ivtm.status, "not_run_missing_inputs");
    assert.equal(JSON.stringify(res.jsonBody).includes("sourceExcerpt"), false);
  } finally {
    if (old === undefined) delete process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
    else process.env.VEHICLE_TAX_ESTIMATE_API_KEY = old;
  }
});

function deepRequestJson(depth) {
  return `{"schemaVersion":"${VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION}","caseFile":{"schemaVersion":"vehicle_tax_case_file.v1","deep":${'{"a":'.repeat(depth)}null${'}'.repeat(depth)}},"options":{"calculationDate":"2026-07-29","taxYear":2026,"scenarioPolicy":"confirmed_only","maxScenarios":0,"currency":"EUR"}}`;
}

function assertSafeRequestId(value) {
  assert.match(value, /^[A-Za-z0-9_-]{8,128}$/);
  assert.equal(value.includes("sample@example.invalid"), false);
  assert.equal(value.includes("[object Object]"), false);
}

test("complejidad estructural se rechaza sin RangeError ni excepcion externa", async () => {
  const deep = await call(deepRequestJson(10_000));
  assertCanonicalError(deep, 400, "REQUEST_TOO_COMPLEX");

  const tooManyNodes = requestBody({ caseFile: { ...minimalCaseFile(), nodes: Array.from({ length: 20_001 }, () => null) } });
  assertCanonicalError(await call(tooManyNodes), 400, "REQUEST_TOO_COMPLEX");

  const largeArray = requestBody({ caseFile: { ...minimalCaseFile(), nodes: Array.from({ length: 20_001 }, (_, index) => index % 10) } });
  assertCanonicalError(await call(largeArray), 400, "REQUEST_TOO_COMPLEX");

  const circular = requestBody();
  circular.caseFile.self = circular.caseFile;
  assertCanonicalError(await call(circular), 400, "REQUEST_REJECTED");

  const getterBody = requestBody();
  Object.defineProperty(getterBody.caseFile, "note", { enumerable: true, get() { throw new Error("GETTER_SECRET"); } });
  const getterResponse = await call(getterBody);
  assertCanonicalError(getterResponse, 400, "REQUEST_REJECTED");
  assert.equal(responseText(getterResponse).includes("GETTER_SECRET"), false);

  const toJsonBody = requestBody({ caseFile: { ...minimalCaseFile(), toJSON: () => { throw new Error("TOJSON_SECRET"); } } });
  assertCanonicalError(await call(toJsonBody), 400, "REQUEST_REJECTED");

  const nullProto = Object.create(null);
  nullProto.value = "x";
  assertCanonicalError(await call(requestBody({ caseFile: { ...minimalCaseFile(), nullProto } })), 400, "REQUEST_REJECTED");
});

test("normaliza claves prohibidas equivalentes", async () => {
  for (const key of ["source_excerpt", "SourceExcerpt", "source-excerpt", "raw_text", "OCR-TEXT", "document_content", "personal-name", "full_name", "postal-address"]) {
    const body = requestBody({ caseFile: { ...minimalCaseFile(), [key]: "marker" } });
    assertCanonicalError(await call(body), 400, "REQUEST_REJECTED");
  }
  assertCanonicalError(await call(requestBody({ caseFile: { ...minimalCaseFile(), nested: [{ dependencies: {} }] } })), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call(requestBody({ caseFile: { ...minimalCaseFile(), prototype: "bad" } })), 400, "REQUEST_REJECTED");
});

test("permite solo sourceExcerpt null en evidencia canonica de input", async () => {
  const built = buildVehicleTaxCaseFile({
    schemaVersion: "vehicle_tax_case_file.v1",
    caseId: "case-built-1",
    documents: [{ documentId: "doc-1", documentType: "coc", pageCount: 1 }],
    evidence: [{ evidenceId: "ev-1", documentId: "doc-1", field: "vehicle.boeValue", normalizedValue: 24000, valueType: "money" }],
  });
  assert.equal(built.evidence[0].sourceExcerpt, null);
  let calls = 0;
  const response = await call(requestBody({ caseFile: built }), {}, { calculateVehicleTaxCase: async (caseFile) => {
    calls += 1;
    assert.equal(caseFile.evidence[0].sourceExcerpt, null);
    assert.equal(caseFile.evidence[0].documentId, "doc-1");
    assert.equal(caseFile.evidence[0].evidenceId, "ev-1");
    return calculationResult({ caseId: caseFile.caseId });
  } });
  assertCanonicalSuccess(response);
  assert.equal(calls, 1);
  assert.equal(responseText(response).includes("sourceExcerpt"), false);

  const real = await handleVehicleTaxEstimateRequest(req(requestBody({ caseFile: built })), config({ calculateVehicleTaxCase: undefined }));
  assert.ok([200, 422].includes(real.statusCode));
  assert.equal(responseText(real).includes("sourceExcerpt"), false);
});

test("sourceExcerpt input output mantiene politica diferenciada", async () => {
  const canonical = { ...minimalCaseFile(), evidence: [{ evidenceId: "ev-1", documentId: "doc-1", field: "vehicle.boeValue", sourceExcerpt: null }] };
  assertCanonicalSuccess(await call(requestBody({ caseFile: canonical })));

  for (const value of ["", "texto", "sample@example.invalid", {}, [], 0, false, undefined]) {
    const response = await call(requestBody({ caseFile: { ...minimalCaseFile(), evidence: [{ evidenceId: "ev-1", documentId: "doc-1", field: "vehicle.boeValue", sourceExcerpt: value }] } }));
    assertCanonicalError(response, 400, "REQUEST_REJECTED");
    assert.equal(responseText(response).includes("sample@example.invalid"), false);
  }

  for (const body of [
    requestBody({ caseFile: { ...minimalCaseFile(), sourceExcerpt: null } }),
    requestBody({ options: { ...DEFAULT_OPTIONS, sourceExcerpt: null } }),
    requestBody({ caseFile: { ...minimalCaseFile(), evidence: [{ evidenceId: "ev-1", source_excerpt: null }] } }),
    requestBody({ caseFile: { ...minimalCaseFile(), evidence: [{ evidenceId: "ev-1", SourceExcerpt: null }] } }),
    requestBody({ caseFile: { ...minimalCaseFile(), evidence: [{ evidenceId: "ev-1", rawText: null }] } }),
    requestBody({ caseFile: { ...minimalCaseFile(), evidence: [{ evidenceId: "ev-1", ocrText: null }] } }),
  ]) assertCanonicalError(await call(body), 400, "REQUEST_REJECTED");

  for (const output of [
    { sourceExcerpt: null },
    { sourceExcerpt: "texto" },
    { source_excerpt: null },
    { warnings: [{ sourceExcerpt: null }] },
    { classification: { sourceExcerpt: null } },
    { scenarios: [{ sourceExcerpt: null }] },
    { engineExecutions: { ivtm: { result: { evidence: [{ sourceExcerpt: null }] } } } },
  ]) {
    const response = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult(output) });
    assertCanonicalError(response, 500, "PRIVACY_GUARD_FAILED");
    assert.equal(responseText(response).includes("sourceExcerpt"), false);
    assert.equal(responseText(response).includes("texto"), false);
    assert.equal(responseText(response).includes("stack"), false);
  }
});

test("detecta PII evidente bajo claves genericas sin ejecutar orquestador", async () => {
  for (const value of ["sample@example.invalid", "12345678Z", "X1234567L", "ES9121000418450200051332", "+34600111222", "Calle Mayor 1 Madrid", "WBA8E51070A123456", "B12345678", "A12345678", "G12345678", "N1234567A"]) {
    let calls = 0;
    const response = await call(requestBody({ caseFile: { ...minimalCaseFile(), note: value } }), {}, { calculateVehicleTaxCase: async () => { calls += 1; return calculationResult(); } });
    assertCanonicalError(response, 400, "REQUEST_REJECTED");
    assert.equal(calls, 0);
    assert.equal(responseText(response).includes(value), false);
  }
});

test("detecta NIF CIF de entidad y conserva IDs tecnicos no PII", async () => {
  for (const value of ["CIF B12345678", "nif a12345678", "texto libre G12345678", "  n1234567a  "]) {
    let calls = 0;
    const response = await call(requestBody({ caseFile: { ...minimalCaseFile(), note: ["ok", { nested: value }] } }), {}, { calculateVehicleTaxCase: async () => { calls += 1; return calculationResult(); } });
    assertCanonicalError(response, 400, "REQUEST_REJECTED");
    assert.equal(calls, 0);
    assert.equal(responseText(response).toLowerCase().includes(value.trim().toLowerCase()), false);
  }

  const technicalIds = {
    caseId: "case-technical_1",
    candidateId: "candidate_550e8400-e29b-41d4-a716-446655440000",
    documentId: "sha256_0123456789abcdef0123456789abcdef",
    evidenceId: "ABCIOQXYZ12345678",
    requestId: "request_id_123",
    warningCodes: ["MISSING_OPTIONAL_FIELD", "PRIVACY_SUMMARY_PRESENT"],
  };
  assertCanonicalSuccess(await call(requestBody({ caseFile: { ...minimalCaseFile(), ...technicalIds } })));

  const built = buildVehicleTaxCaseFile({ schemaVersion: "vehicle_tax_case_file.v1", caseId: "case-built-1", documents: [], evidence: [], warningCodes: ["MISSING_OPTIONAL_FIELD"] });
  assertCanonicalSuccess(await call(requestBody({ caseFile: built })));

  for (const value of ["Z12345678", "B1234567Z", "O12345678"]) {
    assertCanonicalSuccess(await call(requestBody({ caseFile: { ...minimalCaseFile(), note: value } })));
  }
});

test("rechaza PII en campos ID de input antes del orquestador", async () => {
  const cases = [
    ["caseId", "sample@example.invalid"],
    ["caseId", "ES9121000418450200051332"],
    ["caseId", "WBA8E51070A123456"],
    ["caseId", "B12345678"],
    ["caseId", "+34600111222"],
    ["caseId", "Calle Mayor 1 Madrid"],
    ["candidateId", "sample@example.invalid"],
    ["documentId", "ES9121000418450200051332"],
    ["evidenceId", "WBA8E51070A123456"],
    ["evidenceIds", ["B12345678"]],
    ["scenarios", [{ scenarioId: "scenario-safe-1", sourceScenarioId: "WBA8E51070A123456" }]],
    ["warningCodes", ["sample@example.invalid"]],
    ["warningCodes", ["texto libre no canonico"]],
  ];
  for (const [field, value] of cases) {
    let calls = 0;
    const response = await call(requestBody({ caseFile: { ...minimalCaseFile(), [field]: value } }), {}, { calculateVehicleTaxCase: async () => { calls += 1; return calculationResult(); } });
    assertCanonicalError(response, 400, "REQUEST_REJECTED");
    assert.equal(calls, 0);
    assert.equal(responseText(response).includes(typeof value === "string" ? value : JSON.stringify(value).replace(/[\[\]"{}]/g, "")), false);
  }
});

test("rechaza PII en campos ID de output sin propagar resultado parcial", async () => {
  const outputs = [
    { caseId: "sample@example.invalid" },
    { caseId: "WBA8E51070A123456" },
    { classification: { vehicleCandidateId: "WBA8E51070A123456" } },
    { classification: { evidenceIds: ["ES9121000418450200051332"] } },
    { scenarios: [{ scenarioId: "scenario-safe-1", documentId: "B12345678" }] },
    { warningCodes: ["Contact sample@example.invalid"] },
  ];
  for (const output of outputs) {
    const response = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult(output) });
    assertCanonicalError(response, 500, "PRIVACY_GUARD_FAILED");
    assert.equal(responseText(response).includes("sample@example.invalid"), false);
    assert.equal(responseText(response).includes("ES9121000418450200051332"), false);
    assert.equal(responseText(response).includes("WBA8E51070A123456"), false);
    assert.equal(responseText(response).includes("B12345678"), false);
    assert.equal(responseText(response).includes("stack"), false);
  }
});

test("evita falsos positivos fiscales y permite URL oficial de bonificacion", async () => {
  const good = requestBody({ caseFile: { ...minimalCaseFile(), municipalityName: "Madrid", facts: { municipalityCode: { normalizedValue: "28079" } }, candidateId: "candidate-safe-123", documentId: "doc_safe_123", evidenceId: "ABCIOQXYZ12345678", boeReference: "BOE-A-1993-25359", bonusEvidence: { sourceUrl: "https://sede.agenciatributaria.gob.es/" } } });
  assertCanonicalSuccess(await call(good));

  assertCanonicalError(await call(requestBody({ caseFile: { ...minimalCaseFile(), fileUrl: "https://example.com/file.pdf" } })), 400, "REQUEST_REJECTED");
  assertCanonicalError(await call(requestBody({ caseFile: { ...minimalCaseFile(), bonusEvidence: { sourceUrl: "http://example.com/" } } })), 400, "REQUEST_REJECTED");

  const output = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ classification: { legalBasis: [{ id: "BOE", title: "BOE reference", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1993-25359" }] }, taxSummary: { status: "exact", exactTotal: 10, confirmedSubtotal: 10, exactTotalBlockedBy: [], source: { legalBasis: [{ url: "https://www.boe.es/" }] } } }) });
  assertCanonicalSuccess(output);
});

test("aplica politica de URLs path-aware tambien al output", async () => {
  for (const value of ["http://evil.example/", "https://evil.example/", "file:///etc/passwd", "ftp://example", "javascript:alert(1)", "data:text/plain,hello", "//evil.example/path", " HTTP ://evil.example/", "https://user:pass@example.com/"]) {
    const response = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ warnings: [value] }) });
    assertCanonicalError(response, 500, "PRIVACY_GUARD_FAILED");
    assert.equal(responseText(response).includes(value), false);
    assert.equal(responseText(response).includes("stack"), false);
  }

  const genericHttps = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ assumptions: [{ note: "see https://evil.example/" }] }) });
  assertCanonicalError(genericHttps, 500, "PRIVACY_GUARD_FAILED");

  const genericSourceUrl = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ assumptions: [{ source: { url: "https://evil.example/" } }] }) });
  assertCanonicalError(genericSourceUrl, 500, "PRIVACY_GUARD_FAILED");

  const official = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => calculationResult({ classification: { legalBasis: [{ source: "https://www.boe.es/", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1993-25359" }] }, taxSummary: { status: "partial", exactTotal: null, confirmedSubtotal: 10, exactTotalBlockedBy: ["ivtm"], source: { url: "https://sede.agenciatributaria.gob.es/" } }, warnings: ["Referencia BOE y AEAT sin URL"] }) });
  assertCanonicalSuccess(official);
});

test("Content-Type con espacios razonables se acepta", async () => {
  assertCanonicalSuccess(await handleVehicleTaxEstimateRequest(req(requestBody(), { headers: { "content-type": " application/json ; charset=utf-8 ", authorization: `Bearer ${API_KEY}` } }), config()));
  assertCanonicalError(await handleVehicleTaxEstimateRequest(req(requestBody(), { headers: { "content-type": "application/xml", authorization: `Bearer ${API_KEY}` } }), config()), 415, "CONTENT_TYPE_UNSUPPORTED");
});

test("requestId inyectado queda validado y saneado", async () => {
  assert.equal((await call(requestBody(), {}, { createRequestId: () => "valid_id_123" })).body.requestId, "valid_id_123");
  for (const createRequestId of [() => { throw new Error("RID_SECRET"); }, () => ({ bad: true }), () => null, () => "", () => "sample@example.invalid"]) {
    const response = await call(requestBody(), {}, { createRequestId });
    assert.equal(response.statusCode, 200);
    assert.equal(response.body.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
    assert.equal(response.body.ok, true);
    assertSafeRequestId(response.body.requestId);
    assert.equal(responseText(response).includes("RID_SECRET"), false);
  }
});

test("excepciones inesperadas se canonizan sin secretos ni doble respuesta", async () => {
  const throwingHeaders = {};
  Object.defineProperty(throwingHeaders, "content-type", { enumerable: true, get() { throw new Error("HEADER_SECRET"); } });
  throwingHeaders.authorization = `Bearer ${API_KEY}`;
  const beforeRunner = await handleVehicleTaxEstimateRequest({ method: "POST", headers: throwingHeaders, body: requestBody() }, config());
  assertCanonicalError(beforeRunner, 500, "INTERNAL_ERROR");
  assert.equal(responseText(beforeRunner).includes("HEADER_SECRET"), false);

  const throwingOutput = {};
  Object.defineProperty(throwingOutput, "schemaVersion", { enumerable: true, get() { throw new Error("OUTPUT_SECRET"); } });
  const output = await call(requestBody(), {}, { calculateVehicleTaxCase: async () => throwingOutput });
  assertCanonicalError(output, 500, "INTERNAL_ERROR");
  assert.equal(responseText(output).includes("OUTPUT_SECRET"), false);

  const old = process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
  process.env.VEHICLE_TAX_ESTIMATE_API_KEY = API_KEY;
  try {
    const res = mockRes();
    res.count = 0;
    const originalJson = res.json;
    res.json = function json(body) { this.count += 1; return originalJson.call(this, body); };
    await apiHandler(req(requestBody()), res);
    assert.equal(res.count, 1);
    assert.equal(res.jsonBody.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
  } finally {
    if (old === undefined) delete process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
    else process.env.VEHICLE_TAX_ESTIMATE_API_KEY = old;
  }
});
