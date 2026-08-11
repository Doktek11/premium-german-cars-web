import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build as buildBundle } from "esbuild";

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

function cloneBody(body) {
  return JSON.parse(JSON.stringify(body));
}

function setEvidenceValue(body, field, normalizedValue) {
  for (const item of body.evidence) if (item.field === field) item.normalizedValue = normalizedValue;
  return body;
}

function removeEvidenceFields(body, fields) {
  const blocked = new Set(fields);
  body.evidence = body.evidence.filter((item) => !blocked.has(item.field));
  return body;
}

function professionalMinimumItpScenarioDto({ sellerType = "professional", buyerType = "private", vatRegime = "rebu", scenarioPolicy = "documentary_scenarios" } = {}) {
  const docId = "doc-8101";
  const item = (evidenceId, field, normalizedValue, valueType) => ev(evidenceId, docId, null, field, normalizedValue, valueType, "user_declaration", "scenario");
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-itp-professional-minimum",
    documents: [{ documentId: docId, documentType: "user_declaration", pageCount: null, candidateId: null }],
    evidence: [
      item("ev-8101", "transaction.sellerType", sellerType, "enum"),
      item("ev-8102", "transaction.buyerType", buyerType, "enum"),
      item("ev-8103", "transaction.vatRegime", vatRegime, "enum"),
      item("ev-8104", "transaction.rebuStatus", "confirmed", "enum"),
      item("ev-8105", "parties.sellerCountry", "DE", "country"),
      item("ev-8106", "parties.buyerTaxResidenceCountry", "ES", "country"),
      item("ev-8107", "taxDestination.autonomousCommunity", "la_rioja", "enum"),
    ],
    selectedVehicleCandidateId: null,
    options: { calculationDate: "2026-08-09", taxYear: 2026, scenarioPolicy, maxScenarios: scenarioPolicy === "documentary_scenarios" ? 3 : 0, currency: "EUR" },
  };
}

function professionalBmwWithoutLifecycleFlagsDto() {
  return removeEvidenceFields(cloneBody(professionalItpDeclarationScenarioDto()), ["vehicle.isHistoricVehicle", "vehicle.isEndOfLifeVehicle"]);
}

function privateItpCharacterizationDto({ buyerType = "private", sellerType = "private", isHistoricVehicle = false, isEndOfLifeVehicle = false } = {}) {
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-private-itp-characterization",
    documents: [
      { documentId: "doc-tech-1", documentType: "coc", pageCount: 3, candidateId: "candidate-1" },
      { documentId: "doc-contract-1", documentType: "private_sale_contract", pageCount: 2, candidateId: null },
    ],
    evidence: [
      ev("ev-boe", "doc-tech-1", "candidate-1", "vehicle.boeValue", 24000, "money"),
      ev("ev-first-reg", "doc-tech-1", "candidate-1", "vehicle.firstRegistrationDate", "2021-06-15", "date"),
      ev("ev-category", "doc-tech-1", "candidate-1", "vehicle.category", "passenger_car", "enum"),
      ev("ev-engine", "doc-tech-1", "candidate-1", "vehicle.engineDisplacementCc", 1598, "number"),
      ev("ev-cvf", "doc-tech-1", "candidate-1", "vehicle.fiscalHorsepower", 12, "number"),
      ev("ev-zero", "doc-tech-1", "candidate-1", "vehicle.zeroEmissionStatus", "not_zero_emission", "enum"),
      ev("ev-historic", "doc-tech-1", "candidate-1", "vehicle.isHistoricVehicle", isHistoricVehicle, "boolean"),
      ev("ev-end-life", "doc-tech-1", "candidate-1", "vehicle.isEndOfLifeVehicle", isEndOfLifeVehicle, "boolean"),
      ev("ev-tx-date", "doc-contract-1", null, "transaction.date", "2025-07-15", "date", "contractual_document", "confirmed_professional"),
      ev("ev-price", "doc-contract-1", null, "transaction.purchasePrice", 21500, "money", "contractual_document", "confirmed_professional"),
      ev("ev-doc-type", "doc-contract-1", null, "transaction.documentType", "private_sale_contract", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-seller", "doc-contract-1", null, "transaction.sellerType", sellerType, "enum", "contractual_document", "confirmed_professional"),
      ev("ev-buyer", "doc-contract-1", null, "transaction.buyerType", buyerType, "enum", "contractual_document", "confirmed_professional"),
      ev("ev-vat", "doc-contract-1", null, "transaction.vatRegime", "not_applicable_private_sale", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-buyer-country", "doc-contract-1", null, "parties.buyerTaxResidenceCountry", "ES", "country", "contractual_document", "confirmed_professional"),
      ev("ev-seller-country", "doc-contract-1", null, "parties.sellerCountry", "DE", "country", "contractual_document", "confirmed_professional"),
      ev("ev-region", "doc-contract-1", null, "taxDestination.autonomousCommunity", "la_rioja", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-province", "doc-contract-1", null, "taxDestination.province", "la_rioja", "enum", "contractual_document", "confirmed_professional"),
      ev("ev-municipality", null, null, "taxDestination.municipalityCode", "26089", "ine_code", "user_declaration", "confirmed_user"),
      ev("ev-settlement", null, null, "taxDestination.expectedSettlementDate", "2025-07-15", "date", "user_declaration", "confirmed_user"),
    ],
    selectedVehicleCandidateId: "candidate-1",
    options: { calculationDate: "2025-07-15", taxYear: 2025, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" },
  };
}

function resellerProvisionalExemptionDto(config = {}) {
  const {
    caseId = "case-9400",
    sellerType = "private",
    buyerType = "vehicle_reseller",
    vatRegime,
    includePurchasePrice = false,
    includePrivateContract = false,
    includeVehicleData = false,
    scenarioPolicy = "documentary_scenarios",
  } = config;
  const intendedForResale = Object.hasOwn(config, "intendedForResale") ? config.intendedForResale : true;
  const declarationDocId = "doc-9400";
  const contractDocId = "doc-9401";
  const technicalDocId = "doc-9402";
  const candidateId = "candidate-9400";
  const transactionDocId = includePrivateContract ? contractDocId : declarationDocId;
  const transactionSource = includePrivateContract ? "contractual_document" : "user_declaration";
  const transactionStatus = includePrivateContract ? "confirmed_professional" : "scenario";
  const item = (evidenceId, documentId, candidateIdOverride, field, normalizedValue, valueType, sourceType = transactionSource, verificationStatus = transactionStatus) =>
    ev(evidenceId, documentId, candidateIdOverride, field, normalizedValue, valueType, sourceType, verificationStatus);
  const evidence = [
    item("ev-9401", transactionDocId, null, "transaction.sellerType", sellerType, "enum"),
    item("ev-9402", transactionDocId, null, "transaction.buyerType", buyerType, "enum"),
    item("ev-9403", transactionDocId, null, "parties.buyerTaxResidenceCountry", "ES", "country"),
    item("ev-9404", transactionDocId, null, "parties.sellerCountry", "DE", "country"),
    item("ev-9405", transactionDocId, null, "taxDestination.autonomousCommunity", "la_rioja", "enum"),
    item("ev-9406", transactionDocId, null, "taxDestination.province", "la_rioja", "enum"),
  ];
  if (intendedForResale !== undefined) evidence.push(item("ev-9407", transactionDocId, null, "transaction.intendedForResale", intendedForResale, "boolean"));
  if (vatRegime !== undefined) evidence.push(item("ev-9408", transactionDocId, null, "transaction.vatRegime", vatRegime, "enum"));
  if (includePrivateContract) evidence.push(item("ev-9409", contractDocId, null, "transaction.documentType", "private_sale_contract", "enum"));
  if (includePurchasePrice) evidence.push(item("ev-9410", transactionDocId, null, "transaction.purchasePrice", 21500, "money"));
  if (includeVehicleData) {
    evidence.push(
      item("ev-9411", technicalDocId, candidateId, "vehicle.boeValue", 24000, "money", "professional_document", "confirmed_professional"),
      item("ev-9412", technicalDocId, candidateId, "vehicle.firstRegistrationDate", "2021-06-15", "date", "professional_document", "confirmed_professional"),
      item("ev-9413", technicalDocId, candidateId, "vehicle.category", "passenger_car", "enum", "professional_document", "confirmed_professional"),
      item("ev-9414", technicalDocId, candidateId, "vehicle.engineDisplacementCc", 1598, "number", "professional_document", "confirmed_professional"),
      item("ev-9415", technicalDocId, candidateId, "vehicle.fiscalHorsepower", 12, "number", "professional_document", "confirmed_professional"),
      item("ev-9416", technicalDocId, candidateId, "vehicle.zeroEmissionStatus", "not_zero_emission", "enum", "professional_document", "confirmed_professional"),
      item("ev-9417", technicalDocId, candidateId, "vehicle.isHistoricVehicle", false, "boolean", "professional_document", "confirmed_professional"),
      item("ev-9418", technicalDocId, candidateId, "vehicle.isEndOfLifeVehicle", false, "boolean", "professional_document", "confirmed_professional"),
      item("ev-9419", transactionDocId, null, "transaction.date", "2025-07-15", "date")
    );
  }
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId,
    documents: [
      includePrivateContract ? { documentId: contractDocId, documentType: "private_sale_contract", pageCount: 2, candidateId: null } : { documentId: declarationDocId, documentType: "user_declaration", pageCount: null, candidateId: null },
      ...(includeVehicleData ? [{ documentId: technicalDocId, documentType: "professional_report", pageCount: 1, candidateId }] : []),
    ],
    evidence,
    selectedVehicleCandidateId: includeVehicleData ? candidateId : null,
    options: { calculationDate: "2026-08-09", taxYear: 2026, scenarioPolicy, maxScenarios: scenarioPolicy === "documentary_scenarios" ? 3 : 0, currency: "EUR" },
  };
}
async function actionData(body) {
  const response = await callRealActionHandler(apiHandler, body);
  assert.equal(response.statusCode, 200);
  return response.jsonBody.data;
}

function assertNoProfessionalNotSubjectBranch(data) {
  const itp = data.engineExecutions.itp;
  assert.notEqual(itp.result?.applicability, "not_subject");
  assert.notEqual(itp.result?.taxAmount, 0);
  assert.equal(itp.assumptions.some((item) => /professional seller is assumed|venta profesional declarada/i.test(item)), false);
}
function assertResellerProvisionalExemptionItp(data) {
  const itp = data.engineExecutions.itp;
  assert.equal(itp.status, "calculated_scenario");
  assert.equal(itp.inputStatus, "scenario");
  assert.equal(itp.confidenceLevel, "declared");
  assert.equal(itp.result.applicability, "exempt");
  assert.equal(itp.result.taxAmount, 0);
  assert.notEqual(itp.result.applicability, "not_subject");
  assert.deepEqual(itp.missingFields, []);
  assert.equal(itp.warningCodes.includes("RESELLER_EXEMPTION_REQUIRES_EVIDENCE"), true);
  assert.equal(itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), false);
  assert.equal(itp.warningCodes.includes("ENGINE_INPUTS_MISSING"), false);
  const assumptions = itp.assumptions.join(" ");
  assert.match(assumptions, /habitual|vehicle reseller|compraventa/i);
  assert.match(assumptions, /resale|reventa/i);
  assert.match(assumptions, /provisional/i);
  assert.match(assumptions, /one year|ano siguiente|año siguiente/i);
  const itpLine = data.estimatedSummary?.lineItems?.find((item) => item.id === "itp");
  assert.equal(itpLine?.amount, 0);
  assert.equal(data.estimatedSummary?.exactTotal, null);
}

function assertNoResellerExemption(data) {
  assert.notEqual(data.engineExecutions.itp.result?.applicability, "exempt");
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

async function callRealActionHandler(handler, body) {
  const old = process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
  process.env.VEHICLE_TAX_ESTIMATE_API_KEY = API_KEY;
  try {
    const res = { headers: {}, statusCode: null, jsonBody: null, setHeader(name, value) { this.headers[name] = value; return this; }, status(code) { this.statusCode = code; return this; }, json(body) { this.jsonBody = body; return this; } };
    await handler(req(body), res);
    return res;
  } finally {
    if (old === undefined) delete process.env.VEHICLE_TAX_ESTIMATE_API_KEY;
    else process.env.VEHICLE_TAX_ESTIMATE_API_KEY = old;
  }
}

async function bundledActionHandler() {
  const root = await mkdtemp(path.join(tmpdir(), "pgc-action-bundle-"));
  const outfile = path.join(root, "api", "vehicle-tax-estimate-action.mjs");
  await mkdir(path.dirname(outfile), { recursive: true });
  await mkdir(path.join(root, "data"), { recursive: true });
  await cp(fileURLToPath(new URL("../data/ivtm", import.meta.url)), path.join(root, "data", "ivtm"), { recursive: true });
  await buildBundle({
    entryPoints: [fileURLToPath(new URL("../../api/vehicle-tax-estimate-action.js", import.meta.url))],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node24",
    logLevel: "silent",
  });
  const module = await import(pathToFileURL(outfile).href + "?t=" + Date.now());
  return { handler: module.default, cleanup: () => rm(root, { recursive: true, force: true }) };
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
  const source = await callRealActionHandler(apiHandler, body);
  assert.equal(source.statusCode, 200);
  assertActionDiagnostics(source.headers, "documentary_scenarios");
  assert.equal(source.jsonBody.data.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(source.jsonBody.data.engineExecutions.itp.inputStatus, "scenario");
  assert.equal(source.jsonBody.data.engineExecutions.itp.confidenceLevel, "declared");
  assert.equal(source.jsonBody.data.engineExecutions.itp.result.applicability, "not_subject");
  assert.equal(source.jsonBody.data.engineExecutions.itp.result.taxAmount, 0);
  assert.deepEqual(source.jsonBody.data.engineExecutions.itp.missingFields, []);
  assert.equal(source.jsonBody.data.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), false);
  assert.equal(source.jsonBody.data.engineExecutions.itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), false);

  const direct = await handleVehicleTaxActionRequest(req(body), config());
  assert.equal(direct.statusCode, 200);
  assert.deepEqual(source.jsonBody.data.engineExecutions.itp, direct.body.data.engineExecutions.itp);
  assert.deepEqual(source.jsonBody.data.taxSummary, direct.body.data.taxSummary);
  assert.deepEqual(source.jsonBody.data.estimatedSummary, direct.body.data.estimatedSummary);

  const bundled = await bundledActionHandler();
  try {
    const bundledResponse = await callRealActionHandler(bundled.handler, body);
    assert.equal(bundledResponse.statusCode, 200);
    assertActionDiagnostics(bundledResponse.headers, "documentary_scenarios");
    assert.deepEqual(bundledResponse.jsonBody.data.engineExecutions.itp, source.jsonBody.data.engineExecutions.itp);
    assert.deepEqual(bundledResponse.jsonBody.data.taxSummary, source.jsonBody.data.taxSummary);
    assert.deepEqual(bundledResponse.jsonBody.data.estimatedSummary, source.jsonBody.data.estimatedSummary);
  } finally {
    await bundled.cleanup();
  }

  const confirmedOnly = await callRealActionHandler(apiHandler, { ...body, options: { ...body.options, scenarioPolicy: "confirmed_only", maxScenarios: 0 } });
  assert.equal(confirmedOnly.statusCode, 200);
  assertActionDiagnostics(confirmedOnly.headers, "confirmed_only");
  assert.equal(confirmedOnly.jsonBody.data.engineExecutions.itp.status, "not_run_conflict");
  assert.equal(confirmedOnly.jsonBody.data.engineExecutions.itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);

  const conflictBody = JSON.parse(JSON.stringify(body));
  conflictBody.evidence.push(ev("ev-899", "doc-8001", null, "transaction.sellerType", "private", "enum", "user_declaration", "scenario"));
  const conflict = await callRealActionHandler(apiHandler, conflictBody);
  assert.equal(conflict.statusCode, 200);
  assert.equal(conflict.jsonBody.data.classification.status, "conflict");
  assert.equal(conflict.jsonBody.data.engineExecutions.itp.status, "not_run_conflict");
  assert.equal(conflict.jsonBody.data.engineExecutions.itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);
  assert.equal(conflict.jsonBody.data.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);

  const invalidPolicy = await handleVehicleTaxActionRequest(req({ ...body, options: { ...body.options, scenarioPolicy: "invalid" } }), config());
  assert.equal(invalidPolicy.statusCode, 400);
  assertActionDiagnostics(invalidPolicy.headers, "unknown");
});
test("endpoint Action real debe estimar exencion provisional ITP de revendedor sin precio ni documento", async () => {
  const variants = [
    resellerProvisionalExemptionDto({ caseId: "case-9400" }),
    resellerProvisionalExemptionDto({ caseId: "case-9401", vatRegime: "unknown" }),
    resellerProvisionalExemptionDto({ caseId: "case-9402", vatRegime: "not_applicable_private_sale" }),
  ];
  const results = [];
  for (const body of variants) {
    const data = await actionData(body);
    const itp = data.engineExecutions.itp;
    results.push({
      status: itp.status,
      inputStatus: itp.inputStatus,
      confidenceLevel: itp.confidenceLevel,
      applicability: itp.result?.applicability,
      taxAmount: itp.result?.taxAmount,
      missingFields: itp.missingFields,
      warningCodes: itp.warningCodes,
      exactTotal: data.estimatedSummary?.exactTotal,
      itpLineAmount: data.estimatedSummary?.lineItems?.find((item) => item.id === "itp")?.amount,
    });
  }
  assert.deepEqual(results, variants.map(() => ({
    status: "calculated_scenario",
    inputStatus: "scenario",
    confidenceLevel: "declared",
    applicability: "exempt",
    taxAmount: 0,
    missingFields: [],
    warningCodes: ["RESELLER_EXEMPTION_REQUIRES_EVIDENCE", "SCENARIO_FROM_DECLARED_DATA"],
    exactTotal: null,
    itpLineAmount: 0,
  })));
});

test("endpoint Action real debe ignorar el precio para la exencion provisional ITP de revendedor", async () => {
  const data = await actionData(resellerProvisionalExemptionDto({ caseId: "case-9403", includePurchasePrice: true, vatRegime: "not_applicable_private_sale" }));
  assertResellerProvisionalExemptionItp(data);
});

test("endpoint Action real no convierte vendedor profesional en exencion provisional de revendedor", async () => {
  const professionalPrivate = await actionData(professionalMinimumItpScenarioDto());
  assert.equal(professionalPrivate.engineExecutions.itp.result.applicability, "not_subject");
  assert.equal(professionalPrivate.engineExecutions.itp.result.taxAmount, 0);
  assertNoResellerExemption(professionalPrivate);

  const professionalReseller = await actionData(resellerProvisionalExemptionDto({ caseId: "case-9404", sellerType: "professional", vatRegime: "rebu" }));
  assertNoResellerExemption(professionalReseller);
});

test("endpoint Action real mantiene sujeto el flujo particular sin reventa profesional", async () => {
  const privatePrivate = await actionData(privateItpCharacterizationDto());
  assert.equal(privatePrivate.engineExecutions.itp.result.applicability, "taxable");
  assert.equal(privatePrivate.engineExecutions.itp.result.taxableBase, 21500);
  assert.equal(privatePrivate.engineExecutions.itp.inputsUsed.officialMarketValue, 11280);
  assert.equal(privatePrivate.engineExecutions.itp.result.rate, 0.04);
  assert.equal(privatePrivate.engineExecutions.itp.result.taxAmount, 860);
  assert.equal(privatePrivate.engineExecutions.itp.result.territoryRule, "la_rioja");
  assertNoResellerExemption(privatePrivate);

  const ownUse = await actionData(resellerProvisionalExemptionDto({
    caseId: "case-9405",
    buyerType: "professional",
    intendedForResale: false,
    vatRegime: "not_applicable_private_sale",
    includePurchasePrice: true,
    includePrivateContract: true,
    includeVehicleData: true,
  }));
  assert.equal(ownUse.engineExecutions.itp.result.applicability, "taxable");
  assert.equal(ownUse.engineExecutions.itp.result.taxAmount, 860);
  assertNoResellerExemption(ownUse);
});

test("endpoint Action real no concede exencion provisional ITP a negativos de reventa", async () => {
  const cases = [
    resellerProvisionalExemptionDto({ caseId: "case-9406", buyerType: "private", intendedForResale: true, includePurchasePrice: true, includePrivateContract: true, includeVehicleData: true }),
    resellerProvisionalExemptionDto({ caseId: "case-9407", sellerType: "unknown", includePurchasePrice: true, includePrivateContract: true, includeVehicleData: true }),
    resellerProvisionalExemptionDto({ caseId: "case-9408", intendedForResale: undefined, includePurchasePrice: true, includePrivateContract: true, includeVehicleData: true }),
    resellerProvisionalExemptionDto({ caseId: "case-9409", intendedForResale: false, includePurchasePrice: true, includePrivateContract: true, includeVehicleData: true }),
    resellerProvisionalExemptionDto({ caseId: "case-9410", sellerType: "unknown", buyerType: "professional", vatRegime: "general_vat" }),
  ];
  for (const body of cases) {
    const data = await actionData(body);
    assertNoResellerExemption(data);
  }

  const conflictBody = resellerProvisionalExemptionDto({ caseId: "case-9411" });
  conflictBody.evidence.push(ev("ev-9420", "doc-9400", null, "transaction.sellerType", "professional", "enum", "user_declaration", "scenario"));
  const conflict = await actionData(conflictBody);
  assert.equal(conflict.classification.status, "conflict");
  assertNoResellerExemption(conflict);
});

test("endpoint Action real confirmed_only no confirma exencion provisional con evidencia scenario", async () => {
  const data = await actionData(resellerProvisionalExemptionDto({ caseId: "case-9412", scenarioPolicy: "confirmed_only" }));
  const itp = data.engineExecutions.itp;
  assert.notEqual(`${itp.status}/${itp.result?.applicability}/${itp.result?.taxAmount}`, "calculated_scenario/exempt/0");
  assertNoResellerExemption(data);
});
test("endpoint Action real caracteriza flujos no profesionales antes del cambio ITP", async () => {
  const privatePrivate = await actionData(privateItpCharacterizationDto());
  const privateItp = privatePrivate.engineExecutions.itp;
  assert.equal(privatePrivate.classification.sellerType, "private");
  assert.equal(privatePrivate.classification.buyerType, "private");
  assert.equal(privateItp.status, "calculated_confirmed");
  assert.equal(privateItp.inputStatus, "confirmed");
  assert.equal(privateItp.confidenceLevel, "confirmed");
  assert.equal(privateItp.result.applicability, "taxable");
  assert.equal(privateItp.result.taxableBase, 21500);
  assert.equal(privateItp.result.rate, 0.04);
  assert.equal(privateItp.result.taxAmount, 860);
  assert.equal(privateItp.result.territoryRule, "la_rioja");
  assert.equal(privateItp.inputsUsed.officialMarketValue, 11280);
  assert.equal(privateItp.inputsUsed.purchasePrice, 21500);
  assert.deepEqual(privateItp.missingFields, []);
  assertNoProfessionalNotSubjectBranch(privatePrivate);

  const privateProfessional = await actionData(privateItpCharacterizationDto({ buyerType: "professional" }));
  assert.equal(privateProfessional.classification.sellerType, "private");
  assert.equal(privateProfessional.classification.buyerType, "professional");
  assert.equal(privateProfessional.engineExecutions.itp.result.applicability, "taxable");
  assert.equal(privateProfessional.engineExecutions.itp.result.taxAmount, 860);
  assert.equal(privateProfessional.warningCodes.includes("RESALE_ELIGIBILITY_UNRESOLVED"), true);
  assertNoProfessionalNotSubjectBranch(privateProfessional);

  const sellerUnknown = await actionData(professionalMinimumItpScenarioDto({ sellerType: "unknown" }));
  assert.notEqual(sellerUnknown.engineExecutions.itp.status, "calculated_scenario");
  assertNoProfessionalNotSubjectBranch(sellerUnknown);

  const intermediaryLikeActionInput = await actionData(professionalMinimumItpScenarioDto({ sellerType: "unknown", buyerType: "professional", vatRegime: "general_vat" }));
  assert.notEqual(intermediaryLikeActionInput.engineExecutions.itp.status, "calculated_scenario");
  assertNoProfessionalNotSubjectBranch(intermediaryLikeActionInput);

  const conflictBody = professionalMinimumItpScenarioDto();
  conflictBody.evidence.push(ev("ev-8199", "doc-8101", null, "transaction.sellerType", "private", "enum", "user_declaration", "scenario"));
  const conflict = await actionData(conflictBody);
  assert.equal(conflict.classification.status, "conflict");
  assert.equal(conflict.engineExecutions.itp.status, "not_run_conflict");
  assert.equal(conflict.engineExecutions.itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);
  assert.equal(conflict.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);

  const confirmedOnly = await actionData(professionalMinimumItpScenarioDto({ scenarioPolicy: "confirmed_only" }));
  assert.notEqual(confirmedOnly.engineExecutions.itp.status, "calculated_scenario");
  assertNoProfessionalNotSubjectBranch(confirmedOnly);

  for (const lifecycle of [
    { isHistoricVehicle: true, isEndOfLifeVehicle: false },
    { isHistoricVehicle: false, isEndOfLifeVehicle: true },
  ]) {
    const data = await actionData(privateItpCharacterizationDto(lifecycle));
    assert.equal(data.engineExecutions.itp.status, "calculated_confirmed");
    assert.equal(data.engineExecutions.itp.result.applicability, "taxable");
    assert.equal(data.engineExecutions.itp.result.taxableBase, 21500);
    assert.equal(data.engineExecutions.itp.result.rate, 0.04);
    assert.equal(data.engineExecutions.itp.result.taxAmount, 860);
    assertNoProfessionalNotSubjectBranch(data);
  }

  const scenario = await actionData(professionalItpDeclarationScenarioDto());
  assert.equal(scenario.warningCodes.includes("ASSUMED_SPANISH_REGISTRATION_DATE"), true);
  assert.equal(scenario.warningCodes.includes("BONUS_STATUS_UNKNOWN"), true);
  assert.equal(scenario.warningCodes.includes("MUNICIPAL_RATE_YEAR_OUTDATED"), true);
  assert.equal(scenario.warningCodes.includes("SCENARIO_FROM_DECLARED_DATA"), true);
  assert.equal(scenario.estimatedSummary.warningCodes.includes("BONUS_STATUS_UNKNOWN"), true);
  assert.equal(scenario.estimatedSummary.warningCodes.includes("MUNICIPAL_RATE_YEAR_OUTDATED"), true);
});

test("endpoint Action real debe resolver ITP profesional minimo aunque falten datos del vehiculo", async () => {
  const data = await actionData(professionalMinimumItpScenarioDto());
  const itp = data.engineExecutions.itp;
  assert.equal(itp.status, "calculated_scenario");
  assert.equal(itp.inputStatus, "scenario");
  assert.equal(itp.confidenceLevel, "declared");
  assert.equal(itp.result.applicability, "not_subject");
  assert.equal(itp.result.taxAmount, 0);
  assert.deepEqual(itp.missingFields, []);
  assert.equal(itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), false);
  assert.equal(itp.warningCodes.includes("ENGINE_INPUTS_MISSING"), false);
  assert.equal(data.engineExecutions.iedmt.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);
  assert.equal(data.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), true);
  assert.equal(data.warningCodes.includes("ENGINE_INPUTS_MISSING"), true);
  assert.equal(data.warningCodes.includes("VEHICLE_CANDIDATE_REQUIRED"), true);
  assert.equal(data.warningCodes.includes("SUMMARY_NOT_AVAILABLE"), true);
  assert.equal(data.warningCodes.includes("SCENARIO_FROM_DECLARED_DATA"), true);
});

test("endpoint Action real debe resolver BMW profesional REBU sin flags historico ni fin de vida", async () => {
  const data = await actionData(professionalBmwWithoutLifecycleFlagsDto());
  const itp = data.engineExecutions.itp;
  assert.equal(itp.status, "calculated_scenario");
  assert.equal(itp.inputStatus, "scenario");
  assert.equal(itp.confidenceLevel, "declared");
  assert.equal(itp.result.applicability, "not_subject");
  assert.equal(itp.result.taxAmount, 0);
  assert.deepEqual(itp.missingFields, []);
  assert.equal(itp.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), false);
  assert.equal(itp.warningCodes.includes("ENGINE_INPUTS_MISSING"), false);
  assert.equal(data.warningCodes.includes("ENGINE_INPUTS_CONFLICT"), false);
  assert.equal(data.warningCodes.includes("ENGINE_INPUTS_MISSING"), false);
  assert.equal(data.estimatedSummary.exactTotal, null);
  assert.equal(data.estimatedSummary.estimatedTotal, 212.22);
  assert.equal(data.estimatedSummary.minimumTotal, 198.46);
  assert.equal(data.estimatedSummary.maximumTotal, 215.5);
  assert.equal(data.estimatedSummary.prudentBudget, 215.5);
  const itpLine = data.estimatedSummary.lineItems.find((item) => item.id === "itp");
  assert.equal(itpLine.amount, 0);
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
