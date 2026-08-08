import assert from "node:assert/strict";
import test from "node:test";

import { VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION } from "../data/vehicleTaxCaseFileCatalogs.mjs";
import { VEHICLE_TAX_ACTION_FIELD_CONTRACT } from "./vehicleTaxActionAdapter.mjs";
import { buildVehicleTaxCaseFile } from "./vehicleTaxCaseFile.mjs";
import { calculateVehicleTaxSummary } from "./vehicleTaxSummary.mjs";
import {
  VEHICLE_TAX_CALCULATION_SCHEMA_VERSION,
  VEHICLE_TAX_CALCULATION_STATUSES,
  VEHICLE_TAX_ENGINE_EXECUTION_STATUSES,
  VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES,
  calculateVehicleTaxCase,
} from "./vehicleTaxCalculationOrchestrator.mjs";

const DEFAULT_OPTIONS = Object.freeze({ calculationDate: "2026-07-29", taxYear: 2026, currency: "EUR", scenarioPolicy: "confirmed_only", maxScenarios: 0 });
const PRIVATE_PATCH = Object.freeze({ sellerType: "private", buyerType: "private", documentType: "private_sale_contract", vatRegime: "not_applicable_private_sale", intendedForResale: false, buyerTaxResidenceCountry: "ES", sellerCountry: "DE" });

function doc(overrides = {}) {
  return { documentId: "doc-1", documentType: "coc", filename: "document.pdf", language: "DE", country: "DE", issueDate: "2026-01-10", issuer: "issuer", pageCount: 3, contentHash: `sha256:${overrides.documentId ?? "fixture"}`, extractionStatus: "verified", uploadedAt: "2026-01-11T10:00:00.000Z", containsPersonalData: false, warnings: [], ...overrides };
}

function ev(overrides = {}) {
  return { evidenceId: "ev-1", documentId: "coc-1", vehicleCandidateId: "vehicle-1", field: "vehicle.vin", documentType: "coc", page: 1, fieldLabel: "field", sourceExcerpt: "fixture excerpt", normalizedValue: "WBA8E51070A123456", valueType: "string", unit: null, sourceType: "official_document", confidence: 0.92, extractionMethod: "manual", verifiedBy: "reviewer", verificationStatus: "confirmed_official", notes: null, ...overrides };
}

function baseDocuments() {
  return [doc({ documentId: "coc-1", documentType: "coc" }), doc({ documentId: "report-1", documentType: "professional_report" }), doc({ documentId: "contract-1", documentType: "private_sale_contract" }), doc({ documentId: "invoice-1", documentType: "invoice" }), doc({ documentId: "spanish-card-1", documentType: "spanish_technical_card", country: "ES" }), doc({ documentId: "user-1", documentType: "user_declaration" })];
}

function baseEvidence(overrides = {}) {
  const items = [
    ev({ evidenceId: "vin", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
    ev({ evidenceId: "boe", documentId: "report-1", documentType: "professional_report", field: "vehicle.boeValue", normalizedValue: 24000, valueType: "money", sourceType: "professional_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "co2-wltp", field: "vehicle.co2Wltp", normalizedValue: 165, valueType: "number", unit: "g/km" }),
    ev({ evidenceId: "emissions-standard", field: "vehicle.emissionsStandard", normalizedValue: "wltp", valueType: "enum" }),
    ev({ evidenceId: "first-reg", field: "vehicle.firstRegistrationDate", normalizedValue: "2020-06", valueType: "date" }),
    ev({ evidenceId: "category", field: "vehicle.category", normalizedValue: "passenger_car", valueType: "enum" }),
    ev({ evidenceId: "displacement", field: "vehicle.engineDisplacementCc", normalizedValue: 1995, valueType: "number", unit: "cc" }),
    ev({ evidenceId: "cvf", documentId: "spanish-card-1", documentType: "spanish_technical_card", field: "vehicle.fiscalHorsepower", normalizedValue: 13.7, valueType: "number" }),
    ev({ evidenceId: "spanish-reg", documentId: "spanish-card-1", documentType: "spanish_technical_card", field: "vehicle.spanishRegistrationDate", normalizedValue: "2026-07-20", valueType: "date" }),
    ev({ evidenceId: "zero", field: "vehicle.zeroEmissionStatus", normalizedValue: "not_zero_emission", valueType: "enum" }),
    ev({ evidenceId: "historic", field: "vehicle.isHistoricVehicle", normalizedValue: false, valueType: "boolean" }),
    ev({ evidenceId: "end-life", field: "vehicle.isEndOfLifeVehicle", normalizedValue: false, valueType: "boolean" }),
    ev({ evidenceId: "condition", documentId: "user-1", documentType: "user_declaration", field: "vehicle.condition", normalizedValue: "usado_importado", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    ev({ evidenceId: "tx-date", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.date", normalizedValue: "2026-07-20", valueType: "date", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "price", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.purchasePrice", normalizedValue: 21500, valueType: "money", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "doc-type", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.documentType", normalizedValue: "private_sale_contract", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "seller", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.sellerType", normalizedValue: "private", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "buyer", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.buyerType", normalizedValue: "private", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "vat", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.vatRegime", normalizedValue: "not_applicable_private_sale", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "resale", documentId: "user-1", documentType: "user_declaration", field: "transaction.intendedForResale", normalizedValue: false, valueType: "boolean", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    ev({ evidenceId: "buyer-country", documentId: "user-1", documentType: "user_declaration", field: "parties.buyerTaxResidenceCountry", normalizedValue: "ES", valueType: "country", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    ev({ evidenceId: "seller-country", documentId: "contract-1", documentType: "private_sale_contract", field: "parties.sellerCountry", normalizedValue: "DE", valueType: "country", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    ev({ evidenceId: "region", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.autonomousCommunity", normalizedValue: "madrid", valueType: "string", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    ev({ evidenceId: "province", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.province", normalizedValue: "madrid", valueType: "string", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    ev({ evidenceId: "municipality", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.municipalityCode", normalizedValue: "28079", valueType: "string", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    ev({ evidenceId: "settlement", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.expectedSettlementDate", normalizedValue: "2026-07-29", valueType: "date", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
  ];
  return items.map((item) => ({ ...item, ...(overrides[item.evidenceId] ?? {}) }));
}

function makeCase({ remove = [], evidenceOverrides = {}, extraEvidence = [], caseOverrides = {} } = {}) {
  const removeSet = new Set(remove);
  return buildVehicleTaxCaseFile({ schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION, caseId: "case-orchestrator-1", createdAt: "2026-07-01T10:00:00.000Z", updatedAt: "2026-07-02T10:00:00.000Z", documents: baseDocuments(), evidence: [...baseEvidence(evidenceOverrides).filter((item) => !removeSet.has(item.evidenceId)), ...extraEvidence], selectedVehicleCandidateId: null, assumptions: [], ...caseOverrides });
}

function piiFree(result) {
  const text = JSON.stringify(result);
  for (const marker of ["SOURCE_EXCERPT_MARKER", "NOTES_MARKER", "ASSUMPTION_MARKER", "WARNING_MARKER", "CONFLICT_MARKER", "sample@example.invalid", "IBAN_SAMPLE"]) assert.equal(text.includes(marker), false, marker);
  assert.equal(text.includes("sourceExcerpt"), false);
}

function sharedRefCount(value, seen = new WeakSet(), refs = new WeakMap()) {
  if (value === null || typeof value !== "object") return 0;
  if (refs.has(value)) return 1;
  refs.set(value, true);
  if (seen.has(value)) return 0;
  seen.add(value);
  let count = 0;
  for (const item of Array.isArray(value) ? value : Object.values(value)) count += sharedRefCount(item, seen, refs);
  return count;
}

function jsonClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function noSharedNonFiniteOrMutation(result, inputBefore, inputAfter) {
  assert.equal(inputAfter, inputBefore);
  assert.deepEqual(result, JSON.parse(JSON.stringify(result)));
  assert.equal(sharedRefCount(result), 0);
}

function emptyCase() {
  return buildVehicleTaxCaseFile({
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId: "case-orchestrator-empty",
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-02T10:00:00.000Z",
    documents: [],
    evidence: [],
    selectedVehicleCandidateId: null,
    assumptions: [],
  });
}

const STUB_RESULTS = Object.freeze({
  iedmt: Object.freeze({ supportedCalculation: true, tax: 100, isProvisionalTerritory: false, assumptions: [], warnings: [], warningCodes: [], missingFields: [] }),
  itp: Object.freeze({ supportedCalculation: true, applicability: "taxable", taxAmount: 200, probableAmount: 200, minimumAmount: 200, maximumAmount: 200, prudentBudget: 200, assumptions: [], warnings: [], warningCodes: [], missingFields: [], scenarios: [], legalBasis: [] }),
  ivtm: Object.freeze({ supportedCalculation: true, dataStatus: "verified_municipal", taxAmount: 50, referenceProratedTax: 50, minimumAmount: 50, maximumAmount: 50, prudentBudget: 50, assumptions: [], warnings: [], warningCodes: [], missingFields: [], scenarios: [], legalBasis: [] }),
  dgt: Object.freeze({ supportedCalculation: true, applicability: "applicable", status: "confirmed", currency: "EUR", amount: 99.77, referenceAmount: 99.77, probableAmount: 99.77, minimumAmount: 99.77, maximumAmount: 99.77, prudentAmount: 99.77, legalBasis: [], source: null, assumptions: [], warnings: [], warningCodes: [], missingFields: [] }),
});

function partialSummaryDependencies({ calls = [], summaryCalls = [], throwEngine = null, throwLookup = false, throwSummary = false, classifierStatus = "confirmed" } = {}) {
  return {
    classifyOperation: () => {
      calls.push("classify");
      return { status: classifierStatus, warningCodes: [], evidenceIds: [], scenarios: [], transferTaxClassification: { ...PRIVATE_PATCH } };
    },
    calculateIedmt: () => {
      calls.push("iedmt");
      if (throwEngine === "iedmt") throw new Error("THROW_MARKER_IEDMT");
      return jsonClone(STUB_RESULTS.iedmt);
    },
    calculateItp: () => {
      calls.push("itp");
      if (throwEngine === "itp") throw new Error("THROW_MARKER_ITP");
      return jsonClone(STUB_RESULTS.itp);
    },
    lookupMunicipalData: async (code, options) => {
      calls.push("lookup");
      if (throwLookup) throw new Error("THROW_MARKER_LOOKUP");
      return { municipalityCode: code, taxYear: options.taxYear };
    },
    calculateIvtm: () => {
      calls.push("ivtm");
      if (throwEngine === "ivtm") throw new Error("THROW_MARKER_IVTM");
      return jsonClone(STUB_RESULTS.ivtm);
    },
    calculateDgtFee: () => {
      calls.push("dgt");
      if (throwEngine === "dgt") throw new Error("THROW_MARKER_DGT");
      return jsonClone(STUB_RESULTS.dgt);
    },
    calculateSummary: (input) => {
      calls.push("summary");
      summaryCalls.push(jsonClone(input));
      if (throwSummary) throw new Error("THROW_MARKER_SUMMARY");
      return calculateVehicleTaxSummary(input);
    },
  };
}

function assertPartialSummary(result, expectedSubtotal, blockedIds) {
  assert.notEqual(result.taxSummary, null);
  assert.equal(result.taxSummary.confirmedSubtotal, expectedSubtotal);
  assert.equal(result.taxSummary.exactTotal, null);
  assert.deepEqual([...result.taxSummary.exactTotalBlockedBy].sort(), [...blockedIds].sort());
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE), false);
}

test("returns canonical invalid output for null input", async () => {
  const result = await calculateVehicleTaxCase(null, DEFAULT_OPTIONS);
  assert.equal(result.schemaVersion, VEHICLE_TAX_CALCULATION_SCHEMA_VERSION);
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.INVALID);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_INPUT), true);
  assert.deepEqual(Object.keys(result.engineExecutions), ["iedmt", "itp", "ivtm", "dgt_registration_fee"]);
});

test("validates options before executing engines", async () => {
  let called = false;
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, maxScenarios: 13, dependencies: { calculateIedmt: () => { called = true; } } });
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.INVALID);
  assert.equal(called, false);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SCENARIO_LIMIT_EXCEEDED), true);
});

test("rejects dependency keys outside the bounded allowlist", async () => {
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, dependencies: { calculatePdf: () => null } });
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.INVALID);
  assert.equal(result.missingFields.includes("dependencies.calculatePdf"), true);
});

test("runs confirmed documentary case through the four isolated engines", async () => {
  const result = await calculateVehicleTaxCase(makeCase(), DEFAULT_OPTIONS);
  assert.equal(result.engineExecutions.iedmt.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED);
  assert.ok([VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW].includes(result.engineExecutions.itp.status));
  assert.notEqual(result.engineExecutions.itp.result, null);
  assert.notEqual(result.engineExecutions.ivtm.result, null);
  assert.equal(result.engineExecutions.dgt_registration_fee.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED);
  assert.notEqual(result.taxSummary, null);
  assert.equal(result.engineExecutions.iedmt.inputsUsed.territoryId, "peninsula_general");
  assert.equal(result.engineExecutions.itp.inputsUsed.evidence.evidenceIds.includes("price"), true);
  piiFree(result);
});

test("todas las CCAA Action resuelven territorio IEDMT explicito", async () => {
  const expected = {
    andalucia: "peninsula_general",
    aragon: "peninsula_general",
    asturias: "asturias",
    canarias: "canarias",
    cantabria: "cantabria",
    castilla_la_mancha: "peninsula_general",
    castilla_y_leon: "peninsula_general",
    cataluna: "cataluna",
    ceuta: "ceuta_melilla",
    comunitat_valenciana: "comunidad_valenciana",
    extremadura: "peninsula_general",
    galicia: "peninsula_general",
    illes_balears: "baleares",
    la_rioja: "peninsula_general",
    madrid: "peninsula_general",
    melilla: "ceuta_melilla",
    murcia: "murcia",
    navarra: "peninsula_general",
    pais_vasco: "peninsula_general",
  };
  const ccaa = VEHICLE_TAX_ACTION_FIELD_CONTRACT["taxDestination.autonomousCommunity"].enumValues;
  assert.deepEqual([...ccaa].sort(), Object.keys(expected).sort());

  for (const autonomousCommunity of ccaa) {
    let iedmtInput = null;
    const result = await calculateVehicleTaxCase(makeCase({ evidenceOverrides: { region: { normalizedValue: autonomousCommunity } } }), {
      ...DEFAULT_OPTIONS,
      dependencies: {
        calculateIedmt: (input) => {
          iedmtInput = input;
          return jsonClone(STUB_RESULTS.iedmt);
        },
      },
    });
    assert.notEqual(result.engineExecutions.iedmt.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS, autonomousCommunity);
    assert.equal(iedmtInput.territoryId, expected[autonomousCommunity], autonomousCommunity);
  }
});

test("does not rely on the IEDMT default territory when destination is missing", async () => {
  const result = await calculateVehicleTaxCase(makeCase({ remove: ["region"] }), DEFAULT_OPTIONS);
  assert.equal(result.engineExecutions.iedmt.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
  assert.equal(Object.hasOwn(result.engineExecutions.iedmt.inputsUsed, "territoryId"), false);
  assert.notEqual(result.taxSummary, null);
});

test("blocks IEDMT emissions from user-only or advertising evidence", async () => {
  const result = await calculateVehicleTaxCase(makeCase({ evidenceOverrides: { "co2-wltp": { documentId: "user-1", documentType: "user_declaration", sourceType: "user_declaration", verificationStatus: "confirmed_user" } } }), DEFAULT_OPTIONS);
  assert.equal(result.engineExecutions.iedmt.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
  assert.equal(result.engineExecutions.iedmt.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.UNSAFE_EVIDENCE_SOURCE), true);
});

test("does not choose between WLTP and NEDC when both are official and no standard is confirmed", async () => {
  const result = await calculateVehicleTaxCase(makeCase({ remove: ["emissions-standard"], extraEvidence: [ev({ evidenceId: "co2-nedc", field: "vehicle.co2Nedc", normalizedValue: 143, valueType: "number", unit: "g/km" })] }), DEFAULT_OPTIONS);
  assert.equal(result.engineExecutions.iedmt.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT);
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.SCENARIO_REQUIRED);
});

test("identity conflict prevents mixing technical candidates across every engine", async () => {
  const caseFile = makeCase({ extraEvidence: [ev({ evidenceId: "vin-2", vehicleCandidateId: "vehicle-2", field: "vehicle.vin", normalizedValue: "WBA8E51070B654321" })] });
  const result = await calculateVehicleTaxCase(caseFile, DEFAULT_OPTIONS);
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.IDENTITY_CONFLICT);
  assert.equal(Object.values(result.engineExecutions).every((item) => item.status === VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT), true);
});

test("classifier conflict blocks ITP main execution", async () => {
  const result = await calculateVehicleTaxCase(makeCase(), {
    ...DEFAULT_OPTIONS,
    dependencies: {
      classifyOperation: () => ({ status: "conflict", warningCodes: [], evidenceIds: ["vat"], scenarios: [], transferTaxClassification: { ...PRIVATE_PATCH, vatRegime: "unknown" } }),
    },
  });
  assert.equal(result.engineExecutions.itp.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT);
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.SCENARIO_REQUIRED);
});

test("documentary scenarios are deterministic and capped", async () => {
  const options = { ...DEFAULT_OPTIONS, scenarioPolicy: "documentary_scenarios", maxScenarios: 2 };
  const first = await calculateVehicleTaxCase(makeCase({ remove: ["seller", "vat"] }), options);
  const second = await calculateVehicleTaxCase(makeCase({ remove: ["seller", "vat"] }), options);
  assert.equal(first.scenarios.length <= 2, true);
  assert.deepEqual(first.scenarios.map((item) => item.scenarioId), second.scenarios.map((item) => item.scenarioId));
  assert.equal(first.status, VEHICLE_TAX_CALCULATION_STATUSES.SCENARIO_REQUIRED);
});

test("bounded dependency injection executes once per isolated engine and allows exact output", async () => {
  const calls = [];
  const dependencies = {
    classifyOperation: () => ({ status: "confirmed", warningCodes: [], evidenceIds: [], scenarios: [], transferTaxClassification: { ...PRIVATE_PATCH } }),
    calculateIedmt: (input) => { calls.push(["iedmt", input]); return { supportedCalculation: true, tax: 100, isProvisionalTerritory: false, assumptions: [], warnings: [], warningCodes: [], missingFields: [] }; },
    calculateItp: (input) => { calls.push(["itp", input]); return { applicability: "taxable", tax: 200, assumptions: [], warnings: [], warningCodes: [], missingFields: [] }; },
    lookupMunicipalData: async (code, options) => { calls.push(["lookup", code, options]); return { municipalityCode: code, taxYear: options.taxYear }; },
    calculateIvtm: (input, data) => { calls.push(["ivtm", input, data]); return { supportedCalculation: true, dataStatus: "verified_municipal", tax: 50, assumptions: [], warnings: [], warningCodes: [], missingFields: [] }; },
    calculateDgtFee: (input) => { calls.push(["dgt", input]); return { status: "confirmed", amount: 99.77, assumptions: [], warnings: [], warningCodes: [], missingFields: [] }; },
    calculateSummary: (input) => { calls.push(["summary", input]); return { status: "exact", exactTotal: 449.77, exactTotalBlockedBy: [], lineItems: [], assumptions: [], warnings: [], warningCodes: [] }; },
  };
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, dependencies });
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.EXACT);
  assert.deepEqual(calls.map((item) => item[0]), ["iedmt", "itp", "lookup", "ivtm", "dgt", "summary"]);
  assert.equal(result.taxSummary.exactTotal, 449.77);
});

test("partial summary keeps three confirmed engines when IVTM is absent", async () => {
  const calls = [];
  const summaryCalls = [];
  const caseFile = makeCase({ remove: ["municipality"] });
  const before = JSON.stringify(caseFile);
  const result = await calculateVehicleTaxCase(caseFile, { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ calls, summaryCalls }) });
  assert.equal(result.engineExecutions.ivtm.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
  assertPartialSummary(result, 399.77, ["ivtm"]);
  assert.deepEqual(calls, ["classify", "iedmt", "itp", "dgt", "summary"]);
  assert.equal(summaryCalls.length, 1);
  assert.equal(summaryCalls[0].municipalVehicleTaxResult, null);
  noSharedNonFiniteOrMutation(result, before, JSON.stringify(caseFile));
});

test("partial summary keeps IEDMT and DGT when ITP and IVTM are absent", async () => {
  const summaryCalls = [];
  const result = await calculateVehicleTaxCase(makeCase({ remove: ["price", "municipality"] }), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ summaryCalls }) });
  assert.equal(result.engineExecutions.itp.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
  assert.equal(result.engineExecutions.ivtm.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
  assertPartialSummary(result, 199.77, ["itp", "ivtm"]);
  assert.equal(result.taxSummary.lineItems.find((item) => item.id === "itp").amount, null);
  assert.equal(result.taxSummary.lineItems.find((item) => item.id === "ivtm").amount, null);
  assert.equal(summaryCalls.length, 1);
  assert.equal(summaryCalls[0].transferTaxResult, null);
  assert.equal(summaryCalls[0].municipalVehicleTaxResult, null);
});

test("partial summary keeps IEDMT ITP and IVTM when DGT is absent", async () => {
  const summaryCalls = [];
  const result = await calculateVehicleTaxCase(makeCase({ remove: ["settlement"] }), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ summaryCalls }) });
  assert.equal(result.engineExecutions.dgt_registration_fee.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
  assertPartialSummary(result, 350, ["dgt_registration_fee"]);
  assert.equal(summaryCalls.length, 1);
  assert.equal(summaryCalls[0].registrationFeeResult, null);
});

test("partial summary isolates a thrown engine and preserves other results", async () => {
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ throwEngine: "itp" }) });
  assert.equal(result.engineExecutions.itp.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.FAILED_VALIDATION);
  assert.equal(result.engineExecutions.itp.result, null);
  assertPartialSummary(result, 249.77, ["itp"]);
  assert.equal(JSON.stringify(result).includes("THROW_MARKER_ITP"), false);
});

test("partial summary isolates IVTM lookup failure without inventing IVTM tax", async () => {
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ throwLookup: true }) });
  assert.equal(result.engineExecutions.ivtm.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.FAILED_VALIDATION);
  assert.equal(result.engineExecutions.ivtm.result, null);
  assertPartialSummary(result, 399.77, ["ivtm"]);
  assert.equal(result.taxSummary.lineItems.find((item) => item.id === "ivtm").amount, null);
});

test("partial summary is available when ITP is blocked by classification conflict", async () => {
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ classifierStatus: "conflict" }) });
  assert.equal(result.engineExecutions.itp.status, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT);
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.SCENARIO_REQUIRED);
  assertPartialSummary(result, 249.77, ["itp"]);
});

test("summary is unavailable only when no engine returns a real result", async () => {
  const calls = [];
  const result = await calculateVehicleTaxCase(emptyCase(), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ calls }) });
  assert.equal(result.taxSummary, null);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE), true);
  assert.equal(calls.includes("summary"), false);
});

test("summary exception is isolated and preserves individual engine results", async () => {
  const summaryCalls = [];
  const result = await calculateVehicleTaxCase(makeCase(), { ...DEFAULT_OPTIONS, dependencies: partialSummaryDependencies({ summaryCalls, throwSummary: true }) });
  assert.equal(summaryCalls.length, 1);
  assert.equal(result.taxSummary, null);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE), true);
  assert.notEqual(result.engineExecutions.iedmt.result, null);
  assert.notEqual(result.engineExecutions.itp.result, null);
  assert.notEqual(result.engineExecutions.ivtm.result, null);
  assert.notEqual(result.engineExecutions.dgt_registration_fee.result, null);
  assert.equal(JSON.stringify(result).includes("THROW_MARKER_SUMMARY"), false);
});

test("does not propagate free text, source excerpts, notes, or input warnings", async () => {
  const caseFile = makeCase({ evidenceOverrides: { vin: { sourceExcerpt: "SOURCE_EXCERPT_MARKER sample@example.invalid", notes: "NOTES_MARKER IBAN_SAMPLE" } }, caseOverrides: { assumptions: ["ASSUMPTION_MARKER"], warnings: ["WARNING_MARKER"], sensitiveDataSummary: { containsPersonalData: true, categories: ["synthetic"], documentCount: 1, evidenceCount: 1, warnings: ["CONFLICT_MARKER"] } } });
  const result = await calculateVehicleTaxCase(caseFile, DEFAULT_OPTIONS);
  piiFree(result);
  assert.equal(result.privacySummary.containsPersonalData, true);
  assert.deepEqual(result.privacySummary.warnings, []);
});

test("does not mutate input and returns JSON-roundtrippable independent objects", async () => {
  const caseFile = makeCase();
  const before = JSON.stringify(caseFile);
  const first = await calculateVehicleTaxCase(caseFile, DEFAULT_OPTIONS);
  const second = await calculateVehicleTaxCase(caseFile, DEFAULT_OPTIONS);
  assert.equal(JSON.stringify(caseFile), before);
  assert.deepEqual(first, JSON.parse(JSON.stringify(first)));
  assert.deepEqual(first.scenarios.map((item) => item.scenarioId), second.scenarios.map((item) => item.scenarioId));
  assert.equal(sharedRefCount(first), 0);
  first.engineExecutions.iedmt.inputsUsed.boeValue = 1;
  assert.notEqual(second.engineExecutions.iedmt.inputsUsed.boeValue, 1);
});

test("handles circular input without throwing", async () => {
  const circular = { schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION };
  circular.self = circular;
  const result = await calculateVehicleTaxCase(circular, DEFAULT_OPTIONS);
  assert.equal(result.status, VEHICLE_TAX_CALCULATION_STATUSES.INVALID);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.NON_SERIALIZABLE_ORCHESTRATOR_INPUT), true);
});

test("professional invoice with unknown VAT keeps ITP unrun without inventing tax regime", async () => {
  const result = await calculateVehicleTaxCase(makeCase({ remove: ["doc-type", "seller", "vat"], extraEvidence: [ev({ evidenceId: "doc-type-invoice", documentId: "invoice-1", documentType: "invoice", field: "transaction.documentType", normalizedValue: "invoice", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }), ev({ evidenceId: "seller-professional", documentId: "invoice-1", documentType: "invoice", field: "transaction.sellerType", normalizedValue: "professional", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" })] }), DEFAULT_OPTIONS);
  assert.equal(result.classification.sellerType, "professional");
  assert.notEqual(result.classification.vatRegime, "rebu");
  assert.ok([VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT].includes(result.engineExecutions.itp.status));
});
