import assert from "node:assert/strict";
import { Readable } from "node:stream";
import test from "node:test";

import apiHandler from "../../api/vehicle-tax-estimate-action.js";
import { VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION, buildVehicleTaxCaseFromActionDto } from "./vehicleTaxActionAdapter.mjs";
import { handleVehicleTaxActionRequest } from "./vehicleTaxActionApi.mjs";
import { VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION, handleVehicleTaxEstimateRequest } from "./vehicleTaxEstimateApi.mjs";
import { VEHICLE_TAX_ORCHESTRATOR_REVISION } from "./vehicleTaxCalculationOrchestrator.mjs";

const API_KEY = "test-secret-key";
const OPTIONS = Object.freeze({ calculationDate: "2025-07-15", taxYear: 2025, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" });

function dto(overrides = {}) {
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-action-api",
    documents: [
      { documentId: "doc-1", documentType: "coc", pageCount: 3, candidateId: "candidate-1" },
      { documentId: "doc-report-1", documentType: "professional_report", pageCount: 1, candidateId: null },
      { documentId: "doc-contract-1", documentType: "private_sale_contract", pageCount: 2, candidateId: null },
      { documentId: "doc-spanish-card-1", documentType: "spanish_technical_card", pageCount: 2, candidateId: "candidate-1" },
    ],
    evidence: [
      ev("ev-boe", "doc-report-1", null, "vehicle.boeValue", 24000, "money", "professional_document", "confirmed_professional"),
      ev("ev-co2", "doc-1", "candidate-1", "vehicle.co2Wltp", 165, "number"),
      ev("ev-standard", "doc-1", "candidate-1", "vehicle.emissionsStandard", "wltp", "enum"),
      ev("ev-first-reg", "doc-1", "candidate-1", "vehicle.firstRegistrationDate", "2021-06", "date"),
      ev("ev-category", "doc-1", "candidate-1", "vehicle.category", "passenger_car", "enum"),
      ev("ev-cvf", "doc-spanish-card-1", "candidate-1", "vehicle.fiscalHorsepower", 12, "number"),
      ev("ev-spanish-reg", "doc-spanish-card-1", "candidate-1", "vehicle.spanishRegistrationDate", "2025-07-15", "date"),
      ev("ev-condition", null, "candidate-1", "vehicle.condition", "usado_importado", "enum", "user_declaration", "confirmed_user"),
      ev("ev-zero", null, "candidate-1", "vehicle.zeroEmissionStatus", "not_zero_emission", "enum", "user_declaration", "confirmed_user"),
      ev("ev-historic", null, "candidate-1", "vehicle.isHistoricVehicle", false, "boolean", "user_declaration", "confirmed_user"),
      ev("ev-tx-date", "doc-contract-1", null, "transaction.date", "2025-07-15", "date", "contractual_document", "confirmed_professional"),
      ev("ev-price", "doc-contract-1", null, "transaction.purchasePrice", 21500, "money", "contractual_document", "confirmed_professional"),
      ev("ev-currency", "doc-contract-1", null, "transaction.currency", "EUR", "currency", "contractual_document", "confirmed_professional"),
      ev("ev-doc-type", "doc-contract-1", null, "transaction.documentType", "private_sale_contract", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-seller", "doc-contract-1", null, "transaction.sellerType", "private", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-buyer", "doc-contract-1", null, "transaction.buyerType", "private", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-vat", "doc-contract-1", null, "transaction.vatRegime", "not_applicable_private_sale", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-resale", null, null, "transaction.intendedForResale", false, "boolean", "user_declaration", "confirmed_user"),
      ev("ev-buyer-country", null, null, "parties.buyerTaxResidenceCountry", "ES", "country", "user_declaration", "confirmed_user"),
      ev("ev-seller-country", "doc-contract-1", null, "parties.sellerCountry", "DE", "country", "contractual_document", "confirmed_professional"),
      ev("ev-region", null, null, "taxDestination.autonomousCommunity", "madrid", "enum", "user_declaration", "confirmed_user"),
      ev("ev-municipality", null, null, "taxDestination.municipalityCode", "28079", "ine_code", "user_declaration", "confirmed_user"),
      ev("ev-settlement", null, null, "taxDestination.expectedSettlementDate", "2025-07-15", "date", "user_declaration", "confirmed_user"),
    ],
    selectedVehicleCandidateId: "candidate-1",
    options: { ...OPTIONS },
    ...overrides,
  };
}

function ev(evidenceId, documentId, candidateId, field, normalizedValue, valueType, sourceType = "official_document", verificationStatus = "confirmed_official") {
  return { evidenceId, documentId, candidateId, page: documentId ? 1 : null, field, normalizedValue, valueType, sourceType, extractionMethod: "manual", verificationStatus };
}

function professionalItpDeclarationScenarioDto() {
  const candidateId = "candidate-8001";
  const docId = "doc-8001";
  const item = (evidenceId, field, normalizedValue, valueType, candidateIdOverride = null) => ev(evidenceId, docId, candidateIdOverride, field, normalizedValue, valueType, "user_declaration", "scenario");
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-itp-professional-declaration",
    documents: [{ documentId: docId, documentType: "user_declaration", pageCount: null, candidateId: null }],
    evidence: [
      item("ev-801", "vehicle.category", "passenger_car", "enum", candidateId),
      item("ev-802", "vehicle.engineDisplacementCc", 1598, "number", candidateId),
      item("ev-803", "vehicle.fiscalHorsepower", 9.7, "number", candidateId),
      item("ev-804", "vehicle.firstRegistrationDate", "2012-03-01", "date", candidateId),
      item("ev-805", "vehicle.condition", "usado_importado", "enum", candidateId),
      item("ev-806", "vehicle.co2Wltp", 132, "number", candidateId),
      item("ev-807", "vehicle.emissionsStandard", "wltp", "enum", candidateId),
      item("ev-808", "vehicle.zeroEmissionStatus", "not_zero_emission", "enum", candidateId),
      item("ev-809", "vehicle.isHistoricVehicle", false, "boolean", candidateId),
      item("ev-810", "vehicle.isEndOfLifeVehicle", false, "boolean", candidateId),
      item("ev-811", "vehicle.boeValue", 21100, "money", candidateId),
      item("ev-812", "transaction.purchasePrice", 12000, "money"),
      item("ev-815", "transaction.sellerType", "professional", "enum"),
      item("ev-816", "transaction.buyerType", "private", "enum"),
      item("ev-820", "transaction.vatRegime", "rebu", "enum"),
      item("ev-821", "transaction.rebuStatus", "confirmed", "enum"),
      item("ev-813", "parties.sellerCountry", "DE", "country"),
      item("ev-814", "parties.buyerTaxResidenceCountry", "ES", "country"),
      item("ev-817", "taxDestination.autonomousCommunity", "la_rioja", "enum"),
      item("ev-818", "taxDestination.province", "la_rioja", "enum"),
      item("ev-819", "taxDestination.municipalityCode", "26089", "ine_code"),
    ],
    selectedVehicleCandidateId: candidateId,
    options: { calculationDate: "2026-08-09", taxYear: 2026, scenarioPolicy: "documentary_scenarios", maxScenarios: 3, currency: "EUR" },
  };
}

function req(body = dto(), overrides = {}) {
  return { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` }, body, ...overrides };
}

function config(overrides = {}) {
  return { apiKey: API_KEY, createRequestId: () => "req-action-1", ...overrides };
}

function responseText(response) {
  return JSON.stringify(response.body);
}

function assertCanonical(response) {
  assert.equal(response.body.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
  assert.equal(response.body.requestId, "req-action-1");
  assert.equal(Object.hasOwn(response.headers, "Access-Control-Allow-Origin"), false);
  assert.match(response.headers["Cache-Control"], /no-store/);
}

function assertActionDiagnostics(headers, scenarioPolicy) {
  assert.equal(headers["X-PGC-Orchestrator-Revision"], VEHICLE_TAX_ORCHESTRATOR_REVISION);
  assert.equal(headers["X-PGC-Scenario-Policy"], scenarioPolicy);
  assert.equal(headers["X-PGC-Node-Version"], process.version);
}

function calculationResult(overrides = {}) {
  return {
    schemaVersion: "vehicle_tax_calculation.v1",
    caseId: "case-action-api",
    status: "exact",
    calculationDate: "2025-07-15",
    taxYear: 2025,
    currency: "EUR",
    classification: null,
    engineExecutions: {},
    taxSummary: { status: "exact", exactTotal: 10, confirmedSubtotal: 10, exactTotalBlockedBy: [] },
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

test("auth ausente, incorrecta, correcta y secreto no configurado", async () => {
  const missingAuth = await handleVehicleTaxActionRequest(req(dto(), { headers: { "content-type": "application/json" } }), config());
  assert.equal(missingAuth.statusCode, 401);
  assertActionDiagnostics(missingAuth.headers, "unknown");
  const wrongAuth = await handleVehicleTaxActionRequest(req(dto(), { headers: { "content-type": "application/json", authorization: "Bearer wrong" } }), config());
  assert.equal(wrongAuth.statusCode, 403);
  assertActionDiagnostics(wrongAuth.headers, "unknown");
  const missingSecret = await handleVehicleTaxActionRequest(req(), config({ apiKey: "" }));
  assert.equal(missingSecret.statusCode, 503);
  assertActionDiagnostics(missingSecret.headers, "unknown");
  const ok = await handleVehicleTaxActionRequest(req(), config({ calculateVehicleTaxCase: async () => calculationResult() }));
  assert.equal(ok.statusCode, 200);
  assertActionDiagnostics(ok.headers, "confirmed_only");
  assertCanonical(ok);
});

test("DTO valido llama adapter y orquestador una vez y conserva parcial", async () => {
  let adapterCalls = 0;
  let runnerCalls = 0;
  const response = await handleVehicleTaxActionRequest(req(), config({
    buildVehicleTaxCaseFromActionDto: (body) => {
      adapterCalls += 1;
      return buildVehicleTaxCaseFromActionDto(body);
    },
    calculateVehicleTaxCase: async (caseFile, options) => {
      runnerCalls += 1;
      assert.equal(caseFile.schemaVersion, "vehicle_tax_case_file.v1");
      assert.deepEqual(options, OPTIONS);
      return calculationResult({ status: "partial", taxSummary: { status: "partial", exactTotal: null, confirmedSubtotal: 64.5, exactTotalBlockedBy: ["itp"] } });
    },
  }));
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(response.body.data.taxSummary.confirmedSubtotal, 64.5);
  assert.deepEqual(response.body.data.taxSummary.exactTotalBlockedBy, ["itp"]);
  assertActionDiagnostics(response.headers, "confirmed_only");
  assert.equal(adapterCalls, 1);
  assert.equal(runnerCalls, 1);
  assertCanonical(response);
});

test("400, 413, 415, 422, 500 y 503 canonicos", async () => {
  assert.equal((await handleVehicleTaxActionRequest(req("{"), config())).body.error.code, "JSON_INVALID");
  assert.equal((await handleVehicleTaxActionRequest(req({ ...dto(), extra: true }), config())).body.error.code, "ACTION_REQUEST_KEYS_INVALID");
  assert.equal((await handleVehicleTaxActionRequest(req(dto(), { headers: { "content-type": "text/plain", authorization: `Bearer ${API_KEY}` } }), config())).statusCode, 415);
  const tooLarge = { ...dto(), caseId: "x".repeat(VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES) };
  assert.equal((await handleVehicleTaxActionRequest(req(tooLarge), config())).statusCode, 413);
  const invalid = await handleVehicleTaxActionRequest(req(), config({ calculateVehicleTaxCase: async () => calculationResult({ status: "invalid" }) }));
  assert.equal(invalid.statusCode, 422);
  assert.equal(invalid.body.error.code, "CASE_FILE_NOT_PROCESSABLE");
  assertActionDiagnostics(invalid.headers, "confirmed_only");
  const failed = await handleVehicleTaxActionRequest(req(), config({ buildVehicleTaxCaseFromActionDto: () => { throw new Error("C:\\Users\\secret\\stack"); } }));
  assert.equal(failed.statusCode, 500);
  assert.equal(failed.body.error.code, "ACTION_ADAPTER_FAILED");
  assertActionDiagnostics(failed.headers, "confirmed_only");
  const timeout = await handleVehicleTaxActionRequest(req(), config({ timeoutMs: 1, calculateVehicleTaxCase: () => new Promise((resolve) => setTimeout(() => resolve(calculationResult()), 25)) }));
  assert.equal(timeout.statusCode, 503);
  assert.equal(timeout.body.error.code, "CALCULATION_TIMEOUT");
  assertActionDiagnostics(timeout.headers, "confirmed_only");
  for (const response of [invalid, failed, timeout]) {
    assert.equal(responseText(response).includes("sourceExcerpt"), false);
    assert.equal(responseText(response).includes("C:\\Users"), false);
    assert.equal(responseText(response).includes("stack"), false);
  }
});

test("rechaza PII/sourceExcerpt antes de orquestador y salida contaminada", async () => {
  let calls = 0;
  const pii = dto();
  pii.evidence[0].normalizedValue = "sample@example.invalid";
  const rejected = await handleVehicleTaxActionRequest(req(pii), config({ calculateVehicleTaxCase: async () => { calls += 1; return calculationResult(); } }));
  assert.equal(rejected.statusCode, 400);
  assert.equal(calls, 0);
  assert.equal(responseText(rejected).includes("sample@example.invalid"), false);
  const output = await handleVehicleTaxActionRequest(req(), config({ calculateVehicleTaxCase: async () => calculationResult({ warnings: ["sample@example.invalid"], taxSummary: { status: "exact", exactTotal: 1, sourceExcerpt: "raw" } }) }));
  assert.equal(output.statusCode, 500);
  assert.equal(output.body.error.code, "PRIVACY_GUARD_FAILED");
  assert.equal(responseText(output).includes("sample@example.invalid"), false);
  assert.equal(responseText(output).includes("sourceExcerpt"), false);
});

test("stream, endpoint Vercel e IVTM local con datasets disponibles", async () => {
  const text = JSON.stringify(dto());
  const streamResponse = await handleVehicleTaxActionRequest({ method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` }, [Symbol.asyncIterator]: Readable.from([Buffer.from(text)])[Symbol.asyncIterator].bind(Readable.from([Buffer.from(text)])) }, config({ calculateVehicleTaxCase: async () => calculationResult() }));
  assert.equal(streamResponse.statusCode, 200);

  const real = await handleVehicleTaxActionRequest(req(), config());
  assert.equal(real.statusCode, 200);
  assert.equal(real.body.ok, true);
  assertActionDiagnostics(real.headers, "confirmed_only");
  assert.equal(real.body.data.engineExecutions.ivtm.status, "calculated_confirmed");
  assert.equal(real.body.data.engineExecutions.ivtm.result.dataStatus, "verified_municipal");

  const old = process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
  process.env.VEHICLE_TAX_ESTIMATE_API_KEY = API_KEY;
  try {
    const res = { headers: {}, statusCode: null, jsonBody: null, setHeader(name, value) { this.headers[name] = value; return this; }, status(code) { this.statusCode = code; return this; }, json(body) { this.jsonBody = body; return this; } };
    await apiHandler(req(dto()), res);
    assert.equal(res.statusCode, 200);
    assertActionDiagnostics(res.headers, "confirmed_only");
    assert.equal(res.jsonBody.schemaVersion, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
  } finally {
    if (old === undefined) delete process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
    else process.env.VEHICLE_TAX_ESTIMATE_API_KEY = old;
  }
});

test("endpoint Action real expone diagnostico no sensible sin alterar resultado fiscal", async () => {
  const body = professionalItpDeclarationScenarioDto();
  const baseline = await handleVehicleTaxActionRequest(req(body), config());
  assert.equal(baseline.statusCode, 200);
  assert.equal(baseline.body.data.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(baseline.body.data.engineExecutions.itp.result.applicability, "not_subject");
  assert.equal(baseline.body.data.engineExecutions.itp.result.taxAmount, 0);
  const old = process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
  process.env.VEHICLE_TAX_ESTIMATE_API_KEY = API_KEY;
  try {
    const res = { headers: {}, statusCode: null, jsonBody: null, setHeader(name, value) { this.headers[name] = value; return this; }, status(code) { this.statusCode = code; return this; }, json(body) { this.jsonBody = body; return this; } };
    await apiHandler(req(body), res);
    assert.equal(res.statusCode, 200);
    assertActionDiagnostics(res.headers, "documentary_scenarios");
    assert.equal(res.headers["Cache-Control"], baseline.headers["Cache-Control"]);
    assert.deepEqual(res.jsonBody.data.engineExecutions.itp, baseline.body.data.engineExecutions.itp);
    assert.deepEqual(res.jsonBody.data.taxSummary, baseline.body.data.taxSummary);
    assert.deepEqual(res.jsonBody.data.estimatedSummary, baseline.body.data.estimatedSummary);
  } finally {
    if (old === undefined) delete process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
    else process.env.VEHICLE_TAX_ESTIMATE_API_KEY = old;
  }

  const invalidPolicy = await handleVehicleTaxActionRequest(req({ ...body, options: { ...body.options, scenarioPolicy: "invalid" } }), config());
  assert.equal(invalidPolicy.statusCode, 400);
  assertActionDiagnostics(invalidPolicy.headers, "unknown");
});

function deepActionJson(depth) {
  return `{"schemaVersion":"${VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION}","caseId":"case-deep","documents":[],"evidence":[],"options":{"calculationDate":"2025-07-15","taxYear":2025,"scenarioPolicy":"confirmed_only","maxScenarios":0,"currency":"EUR"},"selectedVehicleCandidateId":null,"deep":${'{"a":'.repeat(depth)}null${'}'.repeat(depth)}}`;
}

function deepEstimateJson(depth) {
  return `{"schemaVersion":"vehicle_tax_estimate_request.v1","caseFile":{"schemaVersion":"vehicle_tax_case_file.v1","deep":${'{"a":'.repeat(depth)}null${'}'.repeat(depth)}},"options":{"calculationDate":"2025-07-15","taxYear":2025,"scenarioPolicy":"confirmed_only","maxScenarios":0,"currency":"EUR"}}`;
}

test("privacidad Action bloquea antes de orquestador y no refleja valores", async () => {
  let runnerCalls = 0;
  const freeText = dto();
  freeText.evidence[0].field = "vehicle.model";
  freeText.evidence[0].normalizedValue = "Juan Perez";
  freeText.evidence[0].valueType = "string";
  const rejectedText = await handleVehicleTaxActionRequest(req(freeText), config({ calculateVehicleTaxCase: async () => { runnerCalls += 1; return calculationResult(); } }));
  assert.equal(rejectedText.statusCode, 400);
  assert.equal(runnerCalls, 0);
  assert.equal(responseText(rejectedText).includes("Juan Perez"), false);

  let adapterCalls = 0;
  const source = { ...dto(), sourceExcerpt: "Firma Juan Perez" };
  const rejectedKey = await handleVehicleTaxActionRequest(req(source), config({
    buildVehicleTaxCaseFromActionDto: () => { adapterCalls += 1; return buildVehicleTaxCaseFromActionDto(source); },
    calculateVehicleTaxCase: async () => { runnerCalls += 1; return calculationResult(); },
  }));
  assert.equal(rejectedKey.statusCode, 400);
  assert.equal(rejectedKey.body.error.code, "REQUEST_REJECTED");
  assert.equal(adapterCalls, 0);
  assert.equal(runnerCalls, 0);
  assert.equal(responseText(rejectedKey).includes("Firma"), false);
});

test("complejidad Action rechaza profundidad nodos ciclos getters toJSON y body grande", async () => {
  assert.equal((await handleVehicleTaxActionRequest(req(deepActionJson(10000)), config())).body.error.code, "REQUEST_TOO_COMPLEX");

  const manyNodes = dto({ nodes: Array.from({ length: 20001 }, () => null) });
  const nodes = await handleVehicleTaxActionRequest(req(manyNodes), config());
  assert.equal(nodes.statusCode, 400);
  assert.equal(nodes.body.error.code, "REQUEST_TOO_COMPLEX");

  const cyclic = dto();
  cyclic.self = cyclic;
  const cycle = await handleVehicleTaxActionRequest(req(cyclic), config());
  assert.equal(cycle.statusCode, 400);
  assert.equal(cycle.body.error.code, "REQUEST_REJECTED");

  const getter = dto();
  Object.defineProperty(getter, "hostile", { enumerable: true, get() { throw new Error("SECRET_GETTER"); } });
  const getterResponse = await handleVehicleTaxActionRequest(req(getter), config());
  assert.equal(getterResponse.statusCode, 400);
  assert.equal(getterResponse.body.error.code, "REQUEST_REJECTED");
  assert.equal(responseText(getterResponse).includes("SECRET_GETTER"), false);

  const toJson = dto();
  toJson.toJSON = () => { throw new Error("SECRET_TOJSON"); };
  const toJsonResponse = await handleVehicleTaxActionRequest(req(toJson), config());
  assert.equal(toJsonResponse.statusCode, 400);
  assert.equal(toJsonResponse.body.error.code, "REQUEST_REJECTED");
  assert.equal(responseText(toJsonResponse).includes("SECRET_TOJSON"), false);

  const tooLarge = JSON.stringify({ ...dto(), padding: "x".repeat(VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES) });
  assert.equal((await handleVehicleTaxActionRequest(req(tooLarge), config())).statusCode, 413);
});

test("guard de complejidad Action mantiene paridad basica con 7B", async () => {
  const action = await handleVehicleTaxActionRequest(req(deepActionJson(10000)), config());
  const estimate = await handleVehicleTaxEstimateRequest({ method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${API_KEY}` }, body: deepEstimateJson(10000) }, config({ calculateVehicleTaxCase: async () => calculationResult() }));
  assert.equal(action.statusCode, estimate.statusCode);
  assert.equal(action.body.error.code, estimate.body.error.code);
});
