import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildVehicleTaxCaseFromActionDto, VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION } from "./vehicleTaxActionAdapter.mjs";
import { calculateVehicleTaxCase } from "./vehicleTaxCalculationOrchestrator.mjs";

function assertActionError(fn, code) {
  assert.throws(fn, (error) => error?.code === code);
}

const OPTIONS_2025 = Object.freeze({ calculationDate: "2025-07-15", taxYear: 2025, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" });

function document(overrides = {}) {
  return { documentId: "doc-1", documentType: "coc", pageCount: 3, candidateId: "candidate-1", ...overrides };
}

function evidence(overrides = {}) {
  return {
    evidenceId: "ev-1",
    documentId: "doc-1",
    candidateId: "candidate-1",
    page: 1,
    field: "vehicle.category",
    normalizedValue: "passenger_car",
    valueType: "enum",
    sourceType: "official_document",
    extractionMethod: "manual",
    verificationStatus: "confirmed_official",
    ...overrides,
  };
}

function baseEvidence(overrides = {}) {
  const seller = overrides.seller ?? "private";
  const documentType = overrides.documentType ?? "private_sale_contract";
  const vatRegime = overrides.vatRegime ?? (seller === "private" ? "not_applicable_private_sale" : "unknown");
  const contractDocumentId = documentType === "invoice" ? "doc-invoice-1" : "doc-contract-1";
  return [
    evidence({ evidenceId: "ev-boe", documentId: "doc-report-1", field: "vehicle.boeValue", normalizedValue: 24000, valueType: "money", sourceType: "professional_document", verificationStatus: overrides.boeStatus ?? "confirmed_professional" }),
    evidence({ evidenceId: "ev-co2-wltp", field: "vehicle.co2Wltp", normalizedValue: 165, valueType: "number", sourceType: "official_document", verificationStatus: "confirmed_official" }),
    evidence({ evidenceId: "ev-co2-nedc", field: "vehicle.co2Nedc", normalizedValue: 143, valueType: "number", sourceType: "official_document", verificationStatus: "confirmed_official" }),
    evidence({ evidenceId: "ev-emissions-standard", field: "vehicle.emissionsStandard", normalizedValue: "wltp", valueType: "enum" }),
    evidence({ evidenceId: "ev-first-reg", field: "vehicle.firstRegistrationDate", normalizedValue: "2021-06", valueType: "date" }),
    evidence({ evidenceId: "ev-category", field: "vehicle.category", normalizedValue: "passenger_car", valueType: "enum" }),
    evidence({ evidenceId: "ev-condition", documentId: null, field: "vehicle.condition", normalizedValue: "usado_importado", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-displacement", field: "vehicle.engineDisplacementCc", normalizedValue: 1995, valueType: "number" }),
    evidence({ evidenceId: "ev-cvf", documentId: "doc-spanish-card-1", field: "vehicle.fiscalHorsepower", normalizedValue: 12, valueType: "number" }),
    evidence({ evidenceId: "ev-spanish-reg", documentId: "doc-spanish-card-1", field: "vehicle.spanishRegistrationDate", normalizedValue: "2025-07-15", valueType: "date" }),
    evidence({ evidenceId: "ev-zero", documentId: null, field: "vehicle.zeroEmissionStatus", normalizedValue: "not_zero_emission", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-historic", documentId: null, field: "vehicle.isHistoricVehicle", normalizedValue: false, valueType: "boolean", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-tx-date", documentId: contractDocumentId, candidateId: null, field: "transaction.date", normalizedValue: "2025-07-15", valueType: "date", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-price", documentId: contractDocumentId, candidateId: null, field: "transaction.purchasePrice", normalizedValue: 21500, valueType: "money", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-currency", documentId: contractDocumentId, candidateId: null, field: "transaction.currency", normalizedValue: "EUR", valueType: "currency", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-doc-type", documentId: contractDocumentId, candidateId: null, field: "transaction.documentType", normalizedValue: documentType, valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-seller", documentId: contractDocumentId, candidateId: null, field: "transaction.sellerType", normalizedValue: seller, valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-buyer", documentId: contractDocumentId, candidateId: null, field: "transaction.buyerType", normalizedValue: "private", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-vat", documentId: contractDocumentId, candidateId: null, field: "transaction.vatRegime", normalizedValue: vatRegime, valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-rebu", documentId: contractDocumentId, candidateId: null, field: "transaction.rebuStatus", normalizedValue: overrides.rebuStatus ?? "unknown", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-vat-itemized", documentId: contractDocumentId, candidateId: null, field: "transaction.vatItemizedStatus", normalizedValue: overrides.vatItemizedStatus ?? "unknown", valueType: "enum", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-resale", documentId: null, candidateId: null, field: "transaction.intendedForResale", normalizedValue: false, valueType: "boolean", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-seller-country", documentId: contractDocumentId, candidateId: null, field: "parties.sellerCountry", normalizedValue: "DE", valueType: "country", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }),
    evidence({ evidenceId: "ev-buyer-country", documentId: null, candidateId: null, field: "parties.buyerTaxResidenceCountry", normalizedValue: "ES", valueType: "country", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-region", documentId: null, candidateId: null, field: "taxDestination.autonomousCommunity", normalizedValue: "madrid", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-province", documentId: null, candidateId: null, field: "taxDestination.province", normalizedValue: "madrid", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-foral", documentId: null, candidateId: null, field: "taxDestination.foralTerritory", normalizedValue: "none", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-municipality", documentId: null, candidateId: null, field: "taxDestination.municipalityCode", normalizedValue: "28079", valueType: "ine_code", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
    evidence({ evidenceId: "ev-settlement", documentId: null, candidateId: null, field: "taxDestination.expectedSettlementDate", normalizedValue: "2025-07-15", valueType: "date", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
  ];
}

function dto(overrides = {}) {
  const documents = [
    document({ documentId: "doc-1", documentType: "coc" }),
    document({ documentId: "doc-report-1", documentType: "professional_report", candidateId: null }),
    document({ documentId: "doc-contract-1", documentType: "private_sale_contract", candidateId: null }),
    document({ documentId: "doc-invoice-1", documentType: "invoice", candidateId: null }),
    document({ documentId: "doc-spanish-card-1", documentType: "spanish_technical_card" }),
  ];
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-action-1",
    documents,
    evidence: baseEvidence(overrides),
    selectedVehicleCandidateId: "candidate-1",
    options: { ...OPTIONS_2025 },
    ...overrides.root,
  };
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

function volvoDeclaredDto({ transactionDate = null, expectedSettlementDate = null, scenarioPolicy = "documentary_scenarios" } = {}) {
  const options = { calculationDate: "2026-08-09", taxYear: 2026, scenarioPolicy, maxScenarios: 3, currency: "EUR" };
  const item = (evidenceId, field, normalizedValue, valueType, candidateId = null) => evidence({ evidenceId, documentId: null, candidateId, page: null, field, normalizedValue, valueType, sourceType: "user_declaration", verificationStatus: "confirmed_user" });
  const evidenceItems = [
    item("ev-volvo-category", "vehicle.category", "passenger_car", "enum", "candidate-volvo"),
    item("ev-volvo-fuel", "vehicle.fuelType", "gasoline", "enum", "candidate-volvo"),
    item("ev-volvo-cc", "vehicle.engineDisplacementCc", 1969, "number", "candidate-volvo"),
    item("ev-volvo-cvf", "vehicle.fiscalHorsepower", 13.4, "number", "candidate-volvo"),
    item("ev-volvo-first-reg", "vehicle.firstRegistrationDate", "2024-06", "date", "candidate-volvo"),
    item("ev-volvo-condition", "vehicle.condition", "usado_importado", "enum", "candidate-volvo"),
    item("ev-volvo-co2", "vehicle.co2Wltp", 138, "number", "candidate-volvo"),
    item("ev-volvo-standard", "vehicle.emissionsStandard", "wltp", "enum", "candidate-volvo"),
    item("ev-volvo-zero", "vehicle.zeroEmissionStatus", "not_zero_emission", "enum", "candidate-volvo"),
    item("ev-volvo-historic", "vehicle.isHistoricVehicle", false, "boolean", "candidate-volvo"),
    item("ev-volvo-end-life", "vehicle.isEndOfLifeVehicle", false, "boolean", "candidate-volvo"),
    item("ev-volvo-boe", "vehicle.boeValue", 47100, "money", "candidate-volvo"),
    item("ev-volvo-price", "transaction.purchasePrice", 30000, "money"),
    item("ev-volvo-doc-type", "transaction.documentType", "private_sale_contract", "enum"),
    item("ev-volvo-seller", "transaction.sellerType", "private", "enum"),
    item("ev-volvo-buyer", "transaction.buyerType", "private", "enum"),
    item("ev-volvo-vat", "transaction.vatRegime", "not_applicable_private_sale", "enum"),
    item("ev-volvo-resale", "transaction.intendedForResale", false, "boolean"),
    item("ev-volvo-seller-country", "parties.sellerCountry", "DE", "country"),
    item("ev-volvo-buyer-country", "parties.buyerTaxResidenceCountry", "ES", "country"),
    item("ev-volvo-region", "taxDestination.autonomousCommunity", "la_rioja", "enum"),
    item("ev-volvo-province", "taxDestination.province", "la_rioja", "enum"),
    item("ev-volvo-municipality", "taxDestination.municipalityCode", "26089", "ine_code"),
  ];
  if (transactionDate) evidenceItems.push(item("ev-volvo-tx-date", "transaction.date", transactionDate, "date"));
  if (expectedSettlementDate) evidenceItems.push(item("ev-volvo-settlement", "taxDestination.expectedSettlementDate", expectedSettlementDate, "date"));
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-volvo-declared",
    documents: [],
    evidence: evidenceItems,
    selectedVehicleCandidateId: "candidate-volvo",
    options,
  };
}
const SEMANTIC_VALUE_TYPES = Object.freeze({
  "vehicle.category": "vehicle_category",
  "vehicle.fuelType": "fuel_type",
  "vehicle.engineDisplacementCc": "engine_displacement_cc",
  "vehicle.fiscalHorsepower": "fiscal_horsepower",
  "vehicle.firstRegistrationDate": "year_month",
  "vehicle.condition": "vehicle_condition",
  "vehicle.co2Wltp": "co2_wltp",
  "vehicle.emissionsStandard": "emissions_standard",
  "vehicle.zeroEmissionStatus": "zero_emission_status",
  "vehicle.isHistoricVehicle": "boolean_flag",
  "vehicle.isEndOfLifeVehicle": "boolean_flag",
  "vehicle.boeValue": "money_eur",
  "transaction.purchasePrice": "money_eur",
  "transaction.documentType": "document_type",
  "transaction.sellerType": "seller_type",
  "transaction.buyerType": "buyer_type",
  "transaction.vatRegime": "vat_regime",
  "transaction.intendedForResale": "boolean_flag",
  "parties.sellerCountry": "country_code",
  "parties.buyerTaxResidenceCountry": "country_code",
  "taxDestination.autonomousCommunity": "autonomous_community",
  "taxDestination.province": "province_code",
  "taxDestination.municipalityCode": "municipality_code",
  "transaction.date": "date_iso",
  "taxDestination.expectedSettlementDate": "date_iso",
});

function withSemanticValueTypes(input) {
  const copy = JSON.parse(JSON.stringify(input));
  for (const item of copy.evidence) item.valueType = SEMANTIC_VALUE_TYPES[item.field] ?? item.valueType;
  return copy;
}

function volvoNaturalScenarioDto() {
  const input = volvoDeclaredDto({ transactionDate: "2026-08-09", expectedSettlementDate: "2026-08-09" });
  input.evidence = input.evidence.filter((item) => item.evidenceId !== "ev-volvo-vat");
  for (const evidenceId of ["ev-volvo-doc-type", "ev-volvo-tx-date", "ev-volvo-settlement"]) {
    const item = input.evidence.find((entry) => entry.evidenceId === evidenceId);
    item.verificationStatus = "scenario";
  }
  return input;
}

function volvoNaturalWithoutDocumentTypeDto() {
  const input = volvoDeclaredDto({ expectedSettlementDate: "2026-08-09" });
  input.evidence = input.evidence.filter((item) => !["ev-volvo-doc-type", "ev-volvo-vat"].includes(item.evidenceId));
  input.evidence.find((entry) => entry.evidenceId === "ev-volvo-settlement").verificationStatus = "scenario";
  return input;
}
function bmwProfessionalRebuScenarioDto({ sellerType = "professional", buyerType = "private", intendedForResale = undefined, rebuField = "transaction.vatRegime", vatRegime = "rebu", addContradictoryVat = false } = {}) {
  const options = { calculationDate: "2026-08-09", taxYear: 2026, scenarioPolicy: "documentary_scenarios", maxScenarios: 3, currency: "EUR" };
  const candidateId = "candidate-a1";
  const item = (evidenceId, field, normalizedValue, valueType, candidate = null, verificationStatus = "confirmed_user") => evidence({ evidenceId, documentId: null, candidateId: candidate, page: null, field, normalizedValue, valueType, sourceType: "user_declaration", verificationStatus });
  const evidenceItems = [
    item("ev-a01", "vehicle.category", "passenger_car", "enum", candidateId),
    item("ev-a02", "vehicle.engineDisplacementCc", 1598, "number", candidateId),
    item("ev-a03", "vehicle.fiscalHorsepower", 9.7, "number", candidateId),
    item("ev-a04", "vehicle.firstRegistrationDate", "2012-03-01", "date", candidateId),
    item("ev-a05", "vehicle.condition", "usado_importado", "enum", candidateId),
    item("ev-a06", "vehicle.co2Wltp", 132, "number", candidateId),
    item("ev-a07", "vehicle.emissionsStandard", "wltp", "enum", candidateId),
    item("ev-a08", "vehicle.zeroEmissionStatus", "not_zero_emission", "enum", candidateId),
    item("ev-a09", "vehicle.isHistoricVehicle", false, "boolean", candidateId),
    item("ev-a10", "vehicle.isEndOfLifeVehicle", false, "boolean", candidateId),
    item("ev-a11", "vehicle.boeValue", 21100, "money", candidateId),
    item("ev-a12", "transaction.purchasePrice", 12000, "money"),
    item("ev-a13", "transaction.sellerType", sellerType, "enum"),
    item("ev-a14", "transaction.buyerType", buyerType, "enum"),
    item("ev-a15", rebuField, rebuField === "transaction.rebuStatus" ? "confirmed" : vatRegime, "enum", null, "scenario"),
    item("ev-a16", "parties.sellerCountry", "DE", "country"),
    item("ev-a17", "parties.buyerTaxResidenceCountry", "ES", "country"),
    item("ev-a18", "taxDestination.autonomousCommunity", "la_rioja", "enum"),
    item("ev-a19", "taxDestination.province", "la_rioja", "enum"),
    item("ev-a20", "taxDestination.municipalityCode", "26089", "ine_code"),
  ];
  if (intendedForResale !== undefined) evidenceItems.push(item("ev-a21", "transaction.intendedForResale", intendedForResale, "boolean"));
  if (addContradictoryVat) evidenceItems.push(item("ev-a22", "transaction.vatRegime", vatRegime === "general_vat" ? "rebu" : "general_vat", "enum", null, "scenario"));
  return { schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION, caseId: "case-a1", documents: [], evidence: evidenceItems, selectedVehicleCandidateId: candidateId, options };
}

async function calculate(dtoInput) {
  const adapted = buildVehicleTaxCaseFromActionDto(dtoInput);
  return calculateVehicleTaxCase(adapted.caseFile, adapted.options);
}

test("construye expediente canonico completo sin mutar input y ejecuta IVTM", async () => {
  const input = dto();
  const before = JSON.stringify(input);
  const adapted = buildVehicleTaxCaseFromActionDto(input);
  assert.equal(JSON.stringify(input), before);
  assert.deepEqual(adapted, JSON.parse(JSON.stringify(adapted)));
  assert.equal(sharedRefCount(adapted), 0);
  assert.equal(adapted.caseFile.schemaVersion, "vehicle_tax_case_file.v1");
  assert.equal(adapted.caseFile.evidence.some((item) => item.sourceExcerpt !== null || item.notes !== null), false);
  assert.equal(adapted.caseFile.vehicleCandidates[0].vehicleCandidateId, "candidate-1");
  const result = await calculateVehicleTaxCase(adapted.caseFile, adapted.options);
  assert.equal(result.engineExecutions.ivtm.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.ivtm.result.municipalityCode, "28079");
});

test("clasificacion conserva particular, profesional REBU y factura profesional sin regimen", async () => {
  const privateResult = await calculate(dto({ seller: "private", documentType: "private_sale_contract" }));
  const rebuResult = await calculate(dto({ seller: "professional", documentType: "invoice", vatRegime: "rebu", rebuStatus: "confirmed" }));
  const unknownVat = await calculate(dto({ seller: "professional", documentType: "invoice", vatRegime: "unknown", rebuStatus: "unknown" }));
  assert.equal(privateResult.classification.sellerType, "private");
  assert.equal(privateResult.classification.vatRegime, "not_applicable_private_sale");
  assert.equal(rebuResult.classification.sellerType, "professional");
  assert.equal(rebuResult.classification.vatRegime, "rebu");
  assert.equal(unknownVat.classification.sellerType, "professional");
  assert.notEqual(unknownVat.classification.vatRegime, "general_vat");
});

test("Mehrwertsteuer nicht ausweisbar no confirma REBU porque no acepta sourceExcerpt", () => {
  const input = dto();
  input.evidence[0].sourceExcerpt = "Mehrwertsteuer nicht ausweisbar";
  assert.throws(() => buildVehicleTaxCaseFromActionDto(input), /unsupported fields|sensitive/i);
});

test("vendedor desconocido, CO2 contradictorio, BOE probable y expediente parcial producen estados no inventados", async () => {
  const unknownSeller = await calculate(dto({ seller: "unknown", documentType: "invoice", vatRegime: "unknown" }));
  assert.equal(unknownSeller.classification.status, "scenario_required");
  assert.equal(unknownSeller.engineExecutions.itp.status, "not_run_conflict");

  const co2ConflictDto = dto();
  co2ConflictDto.documents.push(document({ documentId: "doc-spanish-card-2", documentType: "spanish_technical_card" }));
  co2ConflictDto.evidence.push(evidence({ evidenceId: "ev-co2-wltp-conflict", documentId: "doc-spanish-card-2", field: "vehicle.co2Wltp", normalizedValue: 190, valueType: "number" }));
  const co2Conflict = await calculate(co2ConflictDto);
  assert.equal(co2Conflict.engineExecutions.iedmt.status, "not_run_conflict");

  const probable = buildVehicleTaxCaseFromActionDto(dto({ boeStatus: "inferred" })).caseFile;
  assert.notEqual(probable.vehicleCandidates[0].facts["vehicle.boeValue"].status, "confirmed");

  const partialDto = dto();
  partialDto.evidence = partialDto.evidence.filter((item) => !["ev-price", "ev-municipality"].includes(item.evidenceId));
  const partial = await calculate(partialDto);
  assert.equal(partial.engineExecutions.ivtm.status, "not_run_missing_inputs");
  assert.ok(partial.taxSummary.exactTotalBlockedBy.includes("ivtm"));
});

test("varios candidatos y seleccionado se conservan por referencias opacas", () => {
  const input = dto();
  input.documents.push(document({ documentId: "doc-2", candidateId: "candidate-2" }));
  input.evidence.push(evidence({ evidenceId: "ev-category-2", documentId: "doc-2", candidateId: "candidate-2", field: "vehicle.category", normalizedValue: "passenger_car", valueType: "enum" }));
  const adapted = buildVehicleTaxCaseFromActionDto(input);
  assert.deepEqual(adapted.caseFile.vehicleCandidates.map((candidate) => candidate.vehicleCandidateId).sort(), ["candidate-1", "candidate-2"]);
  assert.equal(adapted.caseFile.selectedVehicleCandidateId, "candidate-1");
});

test("rechaza referencias rotas, paginas invalidas, campos y enums desconocidos", () => {
  const brokenDoc = dto();
  brokenDoc.evidence[0].documentId = "doc-missing";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(brokenDoc), "ACTION_REFERENCE_INVALID");
  const badPage = dto();
  badPage.evidence[0].page = 99;
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badPage), "ACTION_PAGE_INVALID");
  const badField = dto();
  badField.evidence[0].field = "vehicle.originalBoeValue";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badField), "ACTION_FIELD_INVALID");
  const badEnum = dto();
  badEnum.evidence[0].normalizedValue = "lorry";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badEnum), "ACTION_VALUE_INVALID");
  const badIne = dto();
  badIne.evidence.find((item) => item.evidenceId === "ev-municipality").normalizedValue = "26A89";
  badIne.evidence.find((item) => item.evidenceId === "ev-municipality").valueType = "municipality_code";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badIne), "ACTION_VALUE_INVALID");
});

test("rechaza numericos invalidos, PII, raw OCR, VIN e IDs con PII", () => {
  const badNumber = dto();
  badNumber.evidence.find((item) => item.evidenceId === "ev-cvf").normalizedValue = Number.NaN;
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badNumber), "ACTION_VALUE_INVALID");
  for (const patch of [
    (input) => { input.evidence[0].normalizedValue = "sample@example.invalid"; },
    (input) => { input.evidence[0].field = "vehicle.vin"; input.evidence[0].normalizedValue = "WBA8E51070A123456"; input.evidence[0].valueType = "string"; },
    (input) => { input.caseId = "B12345678"; },
    (input) => { input.documents[0].documentId = "sample@example.invalid"; },
    (input) => { input.evidence[0].evidenceId = "ES9121000418450200051332"; },
    (input) => { input.rawText = "raw"; },
    (input) => { input.evidence[0].ocrText = "raw"; },
    (input) => { input.documents[0].downloadUrl = "https://example.com/file.pdf"; },
    (input) => { input.dependencies = {}; },
  ]) {
    const input = dto();
    patch(input);
    assert.throws(() => buildVehicleTaxCaseFromActionDto(input), (error) => typeof error?.code === "string" && error.code.startsWith("ACTION_"));
  }
});

test("determinismo y JSON roundtrip", () => {
  const input = dto();
  const first = buildVehicleTaxCaseFromActionDto(input);
  const second = buildVehicleTaxCaseFromActionDto(JSON.parse(JSON.stringify(input)));
  assert.deepEqual(first, second);
  assert.deepEqual(first, JSON.parse(JSON.stringify(first)));
});

test("contrato publico rechaza texto libre, matriculas e IDs no opacos", () => {
  for (const patch of [
    (input) => { input.evidence[0].field = "vehicle.model"; input.evidence[0].normalizedValue = "Juan Perez"; input.evidence[0].valueType = "string"; },
    (input) => { input.evidence[0].field = "taxDestination.municipalityName"; input.evidence[0].normalizedValue = "Madrid"; input.evidence[0].valueType = "string"; },
    (input) => { input.evidence[0].field = "vehicle.model"; input.evidence[0].normalizedValue = "Firma Juan Perez"; input.evidence[0].valueType = "string"; },
  ]) {
    const input = dto();
    patch(input);
    assertActionError(() => buildVehicleTaxCaseFromActionDto(input), "ACTION_FIELD_INVALID");
  }
  for (const patch of [
    (input) => { input.evidence[0].evidenceId = "ev-1234ABC"; },
    (input) => { input.documents[0].documentId = "doc-B-AB-1234"; },
    (input) => { input.documents[0].documentId = "doc-B-1234-AB"; },
    (input) => { input.documents[0].documentId = "doc-Juan-Perez"; },
    (input) => { input.evidence[0].evidenceId = "ev-sample@example.invalid"; },
    (input) => { input.selectedVehicleCandidateId = "candidate-WBA8E51070A123456"; },
  ]) {
    const input = dto();
    patch(input);
    assert.throws(() => buildVehicleTaxCaseFromActionDto(input), (error) => ["ACTION_ID_INVALID", "ACTION_PRIVACY_REJECTED"].includes(error?.code));
  }
});

test("caseId requerido, selectedVehicleCandidateId opcional null o valido", () => {
  const missingCase = dto();
  delete missingCase.caseId;
  assertActionError(() => buildVehicleTaxCaseFromActionDto(missingCase), "ACTION_FIELD_INVALID");

  const omittedSelected = dto();
  delete omittedSelected.selectedVehicleCandidateId;
  assert.equal(buildVehicleTaxCaseFromActionDto(omittedSelected).caseFile.selectedVehicleCandidateId, null);

  const nullSelected = dto({ root: { selectedVehicleCandidateId: null } });
  assert.equal(buildVehicleTaxCaseFromActionDto(nullSelected).caseFile.selectedVehicleCandidateId, null);

  const badSelected = dto({ root: { selectedVehicleCandidateId: "candidate-missing" } });
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badSelected), "ACTION_REFERENCE_INVALID");
});

test("runtime y d.mts excluyen vin y campos de texto libre", () => {
  const dtoTypes = readFileSync(new URL("./vehicleTaxActionDto.d.mts", import.meta.url), "utf8");
  assert.equal(dtoTypes.includes('"vehicle.vin"'), false);
  assert.equal(dtoTypes.includes('"vehicle.model"'), false);
  assert.equal(dtoTypes.includes('"taxDestination.municipalityName"'), false);
  const input = dto();
  input.evidence[0].field = "vehicle.vin";
  input.evidence[0].normalizedValue = "WBA8E51070A123456";
  input.evidence[0].valueType = "string";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(input), "ACTION_FIELD_INVALID");
});

test("im Kundenauftrag queda fuera de Action v1 y vendedor unknown no confirma ITP", async () => {
  const unknownSeller = await calculate(dto({ seller: "unknown", documentType: "invoice", vatRegime: "unknown" }));
  assert.equal(unknownSeller.classification.status, "scenario_required");
  assert.equal(unknownSeller.engineExecutions.itp.status, "not_run_conflict");
  const extra = dto();
  extra.intermediaryStatus = "im_kundenauftrag";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(extra), "ACTION_REQUEST_KEYS_INVALID");
  const raw = dto();
  raw.evidence[0].rawWording = "im Kundenauftrag";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(raw), "ACTION_EVIDENCE_KEYS_INVALID");
});

test("DTO alimenta ITP y DGT soportados sin aliases falsos", async () => {
  const input = dto({ root: { options: { calculationDate: "2026-07-29", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" } } });
  input.documents.push(document({ documentId: "doc-tax-1", documentType: "technical_inspection_document" }));
  input.evidence.push(evidence({ evidenceId: "ev-boe-year", documentId: "doc-report-1", field: "vehicle.boeValueYear", normalizedValue: 2026, valueType: "year", sourceType: "professional_document", verificationStatus: "confirmed_professional" }));
  input.evidence.find((item) => item.evidenceId === "ev-zero").documentId = "doc-tax-1";
  input.evidence.find((item) => item.evidenceId === "ev-zero").sourceType = "official_document";
  input.evidence.find((item) => item.evidenceId === "ev-zero").verificationStatus = "confirmed_official";
  input.evidence.find((item) => item.evidenceId === "ev-historic").documentId = "doc-tax-1";
  input.evidence.find((item) => item.evidenceId === "ev-historic").sourceType = "official_document";
  input.evidence.find((item) => item.evidenceId === "ev-historic").verificationStatus = "confirmed_official";
  input.evidence.push(evidence({ evidenceId: "ev-end-life", documentId: "doc-tax-1", field: "vehicle.isEndOfLifeVehicle", normalizedValue: false, valueType: "boolean" }));
  input.evidence.push(evidence({ evidenceId: "ev-purchase-country", documentId: "doc-contract-1", candidateId: null, field: "transaction.purchaseCountry", normalizedValue: "DE", valueType: "country", sourceType: "contractual_document", verificationStatus: "confirmed_professional" }));
  input.evidence.find((item) => item.evidenceId === "ev-region").normalizedValue = "murcia";
  input.evidence.find((item) => item.evidenceId === "ev-province").normalizedValue = "murcia";
  input.evidence.find((item) => item.evidenceId === "ev-settlement").normalizedValue = "2026-07-29";
  input.evidence.find((item) => item.evidenceId === "ev-tx-date").normalizedValue = "2026-07-20";
  input.evidence.find((item) => item.evidenceId === "ev-spanish-reg").normalizedValue = "2026-07-20";
  const adapted = buildVehicleTaxCaseFromActionDto(input);
  const result = await calculateVehicleTaxCase(adapted.caseFile, adapted.options);
  assert.equal(result.engineExecutions.iedmt.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.itp.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.dgt_registration_fee.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.itp.inputsUsed.originalBoeValue, 24000);
  assert.equal(result.engineExecutions.itp.inputsUsed.officialMarketValue, 9360);
  assert.equal(result.engineExecutions.itp.inputsUsed.purchasePrice, 21500);
  assert.equal(Object.hasOwn(adapted.caseFile, "officialMarketValue"), false);
});

test("Action La Rioja usa IEDMT peninsula, ITP depreciado y no provincia no foral", async () => {
  const input = dto({ root: { options: { calculationDate: "2026-08-02", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" } } });
  input.documents.push(document({ documentId: "doc-tax-1", documentType: "technical_inspection_document" }));
  input.evidence.find((item) => item.evidenceId === "ev-boe").normalizedValue = 47100;
  input.evidence.push(evidence({ evidenceId: "ev-boe-year", documentId: "doc-report-1", field: "vehicle.boeValueYear", normalizedValue: 2026, valueType: "year", sourceType: "professional_document", verificationStatus: "confirmed_professional" }));
  input.evidence.find((item) => item.evidenceId === "ev-first-reg").normalizedValue = "2024-06";
  input.evidence.find((item) => item.evidenceId === "ev-co2-wltp").normalizedValue = 138;
  input.evidence.find((item) => item.evidenceId === "ev-displacement").normalizedValue = 1969;
  input.evidence.find((item) => item.evidenceId === "ev-cvf").normalizedValue = 13.4;
  input.evidence.find((item) => item.evidenceId === "ev-price").normalizedValue = 30000;
  input.evidence.find((item) => item.evidenceId === "ev-tx-date").normalizedValue = "2026-08-02";
  input.evidence.find((item) => item.evidenceId === "ev-region").normalizedValue = "la_rioja";
  input.evidence.find((item) => item.evidenceId === "ev-province").normalizedValue = "la_rioja";
  input.evidence.find((item) => item.evidenceId === "ev-foral").normalizedValue = "none";
  input.evidence.find((item) => item.evidenceId === "ev-municipality").normalizedValue = "26089";
  input.evidence.find((item) => item.evidenceId === "ev-settlement").normalizedValue = "2026-08-02";
  input.evidence.find((item) => item.evidenceId === "ev-spanish-reg").normalizedValue = "2026-08-02";
  for (const evidenceId of ["ev-zero", "ev-historic"]) {
    const item = input.evidence.find((entry) => entry.evidenceId === evidenceId);
    item.documentId = "doc-tax-1";
    item.sourceType = "official_document";
    item.verificationStatus = "confirmed_official";
  }
  input.evidence.push(evidence({ evidenceId: "ev-end-life", documentId: "doc-tax-1", field: "vehicle.isEndOfLifeVehicle", normalizedValue: false, valueType: "boolean" }));

  const result = await calculate(input);
  assert.equal(result.engineExecutions.iedmt.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.iedmt.inputsUsed.territoryId, "peninsula_general");
  assert.equal(result.engineExecutions.itp.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.itp.inputsUsed.originalBoeValue, 47100);
  assert.equal(result.engineExecutions.itp.inputsUsed.officialMarketValue, 31557);
  assert.equal(Object.hasOwn(result.engineExecutions.itp.inputsUsed, "buyerProvince"), false);
  assert.equal(result.engineExecutions.itp.result.taxableBase, 31557);
  assert.equal(result.engineExecutions.itp.result.taxAmount, 1262.28);
  assert.equal(result.engineExecutions.itp.warningCodes.includes("INVALID_BUYER_PROVINCE"), false);
  assert.equal(result.taxSummary.exactTotal, null);
  assert.equal(result.taxSummary.exactTotalBlockedBy.includes("ivtm"), true);
  assert.equal(result.taxSummary.lineItems.some((item) => item.status === "invalid" && item.amount === 0), false);

  const noDate = JSON.parse(JSON.stringify(input));
  noDate.caseId = "case-action-no-date";
  noDate.evidence = noDate.evidence.filter((item) => item.evidenceId !== "ev-tx-date");
  const noDateResult = await calculate(noDate);
  assert.equal(noDateResult.engineExecutions.itp.status, "not_run_missing_inputs");
  assert.equal(noDateResult.engineExecutions.itp.missingFields.includes("transaction.date"), true);
  assert.equal(Object.hasOwn(noDateResult.engineExecutions.itp.inputsUsed, "officialMarketValue"), false);
});

test("profesional REBU sin factura calcula ITP no sujeto solo como escenario", async () => {
  for (const intendedForResale of [undefined, true, false]) {
    const result = await calculate(bmwProfessionalRebuScenarioDto({ buyerType: "professional", intendedForResale }));
    assert.equal(result.taxSummary, null);
    assert.equal(result.estimatedSummary.exactTotal, null);
    assert.equal(result.estimatedSummary.estimatedTotal, 212.22);
    assert.equal(result.estimatedSummary.prudentBudget, 215.5);
    for (const engineId of ["iedmt", "itp", "ivtm", "dgt_registration_fee"]) assert.equal(result.engineExecutions[engineId].status, "calculated_scenario", engineId);
    assert.equal(result.engineExecutions.iedmt.result.tax.toFixed(2), "81.65");
    assert.equal(result.engineExecutions.itp.result.applicability, "not_subject");
    assert.equal(result.engineExecutions.itp.result.taxAmount, 0);
    assert.equal(result.engineExecutions.itp.inputsUsed.documentType, "invoice");
    assert.equal(result.engineExecutions.itp.inputsUsed.vatRegime, "rebu");
    assert.equal(result.engineExecutions.itp.inputsUsed.assumedTransactionDate, "2026-08-09");
    assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), true);
    assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_REBU"), true);
    assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_TRANSACTION_DATE"), true);
    assert.equal(result.engineExecutions.itp.evidenceIds.some((id) => id.includes("doc")), false);
    assert.equal(result.engineExecutions.ivtm.result.referenceProratedTax, 30.8);
    assert.equal(result.engineExecutions.ivtm.result.prudentBudget, 34.08);
    assert.equal(result.engineExecutions.dgt_registration_fee.result.amount, 99.77);
    const itpLine = result.estimatedSummary.lineItems.find((item) => item.id === "itp");
    assert.equal(itpLine.amount, 0);
  }

  const privateBuyer = await calculate(bmwProfessionalRebuScenarioDto({ buyerType: "private" }));
  assert.equal(privateBuyer.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(privateBuyer.engineExecutions.itp.result.applicability, "not_subject");
  assert.equal(privateBuyer.engineExecutions.itp.result.taxAmount, 0);

  const rebuStatusOnly = await calculate(bmwProfessionalRebuScenarioDto({ rebuField: "transaction.rebuStatus" }));
  assert.equal(rebuStatusOnly.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(rebuStatusOnly.engineExecutions.itp.result.applicability, "not_subject");
});

test("profesional IVA general sin factura calcula ITP no sujeto solo como escenario", async () => {
  for (const buyerType of ["private", "professional"]) {
    for (const intendedForResale of [undefined, true, false]) {
      const result = await calculate(bmwProfessionalRebuScenarioDto({ buyerType, intendedForResale, vatRegime: "general_vat" }));
      assert.equal(result.taxSummary, null);
      assert.equal(result.estimatedSummary.exactTotal, null);
      assert.equal(result.estimatedSummary.estimatedTotal, 212.22);
      for (const engineId of ["iedmt", "itp", "ivtm", "dgt_registration_fee"]) assert.equal(result.engineExecutions[engineId].status, "calculated_scenario", `${buyerType}-${intendedForResale}-${engineId}`);
      assert.equal(result.engineExecutions.itp.result.applicability, "not_subject");
      assert.equal(result.engineExecutions.itp.result.taxAmount, 0);
      assert.equal(result.engineExecutions.itp.inputsUsed.documentType, "invoice");
      assert.equal(result.engineExecutions.itp.inputsUsed.vatRegime, "general_vat");
      assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), true);
      assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_REBU"), false);
      assert.equal(result.engineExecutions.itp.warnings.some((warning) => warning.includes("REBU")), false);
      assert.equal(result.engineExecutions.itp.evidenceIds.some((id) => id.includes("doc")), false);
      const itpLine = result.estimatedSummary.lineItems.find((item) => item.id === "itp");
      assert.equal(itpLine.amount, 0);
    }
  }
});

test("inferencia profesional IVA general no se aplica a seller private unknown contradiccion confirmed_only", async () => {
  const privateSeller = await calculate(bmwProfessionalRebuScenarioDto({ sellerType: "private", vatRegime: "general_vat" }));
  assert.notEqual(privateSeller.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(privateSeller.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);

  const unknownSeller = await calculate(bmwProfessionalRebuScenarioDto({ sellerType: "unknown", vatRegime: "general_vat" }));
  assert.notEqual(unknownSeller.engineExecutions.itp.inputsUsed.documentType, "invoice");
  assert.equal(unknownSeller.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);

  const contradiction = await calculate(bmwProfessionalRebuScenarioDto({ vatRegime: "general_vat", addContradictoryVat: true }));
  assert.notEqual(contradiction.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(contradiction.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);

  const confirmedOnlyInput = bmwProfessionalRebuScenarioDto({ vatRegime: "general_vat" });
  confirmedOnlyInput.options.scenarioPolicy = "confirmed_only";
  const strict = await calculate(confirmedOnlyInput);
  assert.notEqual(strict.engineExecutions.itp.status, "calculated_scenario");
  assert.notEqual(strict.engineExecutions.itp.inputsUsed.documentType, "invoice");
});
test("inferencia profesional REBU no se aplica a seller private unknown o REBU contradictorio", async () => {
  const privateSeller = await calculate(bmwProfessionalRebuScenarioDto({ sellerType: "private" }));
  assert.notEqual(privateSeller.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(privateSeller.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);

  const unknownSeller = await calculate(bmwProfessionalRebuScenarioDto({ sellerType: "unknown" }));
  assert.notEqual(unknownSeller.engineExecutions.itp.inputsUsed.documentType, "invoice");
  assert.equal(unknownSeller.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);

  const contradiction = await calculate(bmwProfessionalRebuScenarioDto({ addContradictoryVat: true }));
  assert.notEqual(contradiction.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(contradiction.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_REBU"), false);
});

test("factura IVA general confirmada conserva el flujo confirmado sin hipotesis", async () => {
  const input = dto({ seller: "professional", documentType: "invoice", vatRegime: "general_vat", rebuStatus: "unknown" });
  for (const evidenceId of ["ev-zero", "ev-historic"]) {
    const item = input.evidence.find((entry) => entry.evidenceId === evidenceId);
    item.documentId = "doc-1";
    item.page = 1;
    item.sourceType = "official_document";
    item.verificationStatus = "confirmed_official";
  }
  input.evidence.push(evidence({ evidenceId: "ev-end-life", documentId: "doc-1", field: "vehicle.isEndOfLifeVehicle", normalizedValue: false, valueType: "boolean" }));
  const result = await calculate(input);
  assert.equal(result.engineExecutions.itp.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.itp.result.applicability, "not_subject");
  assert.equal(result.engineExecutions.itp.result.taxAmount, 0);
  assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);
  assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_REBU"), false);
});
test("factura REBU confirmada conserva el flujo confirmado sin hipotesis", async () => {
  const input = dto({ seller: "professional", documentType: "invoice", vatRegime: "rebu", rebuStatus: "confirmed" });
  for (const evidenceId of ["ev-zero", "ev-historic"]) {
    const item = input.evidence.find((entry) => entry.evidenceId === evidenceId);
    item.documentId = "doc-1";
    item.page = 1;
    item.sourceType = "official_document";
    item.verificationStatus = "confirmed_official";
  }
  input.evidence.push(evidence({ evidenceId: "ev-end-life", documentId: "doc-1", field: "vehicle.isEndOfLifeVehicle", normalizedValue: false, valueType: "boolean" }));
  const result = await calculate(input);
  assert.equal(result.engineExecutions.itp.status, "calculated_confirmed");
  assert.equal(result.engineExecutions.itp.result.applicability, "not_subject");
  assert.equal(result.engineExecutions.itp.result.taxAmount, 0);
  assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_INVOICE"), false);
  assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PROFESSIONAL_REBU"), false);
});
test("request natural sin documentType infiere contrato privado solo como hipotesis ITP", async () => {
  const input = volvoNaturalWithoutDocumentTypeDto();
  const before = JSON.stringify(input);
  const result = await calculate(input);
  assert.equal(JSON.stringify(input), before);
  assert.equal(result.taxSummary, null);
  assert.equal(result.estimatedSummary.exactTotal, null);
  assert.equal(result.estimatedSummary.estimatedTotal, 2619.06);
  assert.equal(result.estimatedSummary.prudentBudget, 2626);
  assert.equal(result.classification.documentType, "unknown");
  assert.notEqual(result.classification.rebuStatus, "confirmed");
  for (const engineId of ["iedmt", "itp", "ivtm", "dgt_registration_fee"]) assert.equal(result.engineExecutions[engineId].status, "calculated_scenario", engineId);
  assert.equal(result.engineExecutions.iedmt.result.tax.toFixed(2), "1192.01");
  assert.equal(result.engineExecutions.itp.result.taxAmount, 1262.28);
  assert.equal(result.engineExecutions.itp.inputsUsed.documentType, "private_sale_contract");
  assert.equal(result.engineExecutions.itp.inputsUsed.vatRegime, "not_applicable_private_sale");
  assert.equal(result.engineExecutions.itp.inputsUsed.assumedTransactionDate, "2026-08-09");
  assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_PRIVATE_SALE_CONTRACT"), true);
  assert.equal(result.engineExecutions.itp.warningCodes.includes("ASSUMED_TRANSACTION_DATE"), true);
  assert.equal(result.engineExecutions.itp.evidenceIds.includes("ev-volvo-doc-type"), false);
  assert.equal(JSON.stringify(result).includes("ev-volvo-doc-type"), false);
  assert.equal(result.engineExecutions.ivtm.result.referenceProratedTax, 65);
  assert.equal(result.engineExecutions.ivtm.result.prudentBudget, 71.94);
  assert.equal(result.engineExecutions.dgt_registration_fee.result.amount, 99.77);
});

test("inferencia de contrato privado no se aplica a professional unknown conflicto o candidatos multiples", async () => {
  const professional = volvoNaturalWithoutDocumentTypeDto();
  professional.evidence.find((item) => item.evidenceId === "ev-volvo-seller").normalizedValue = "professional";
  const professionalResult = await calculate(professional);
  assert.notEqual(professionalResult.engineExecutions.itp.status, "calculated_scenario");
  assert.notEqual(professionalResult.engineExecutions.itp.inputsUsed.documentType, "private_sale_contract");
  assert.equal(professionalResult.engineExecutions.itp.warningCodes.includes("ASSUMED_PRIVATE_SALE_CONTRACT"), false);

  const unknown = volvoNaturalWithoutDocumentTypeDto();
  unknown.evidence.find((item) => item.evidenceId === "ev-volvo-seller").normalizedValue = "unknown";
  const unknownResult = await calculate(unknown);
  assert.notEqual(unknownResult.engineExecutions.itp.status, "calculated_scenario");
  assert.notEqual(unknownResult.engineExecutions.itp.inputsUsed.documentType, "private_sale_contract");
  assert.notEqual(unknownResult.engineExecutions.itp.inputsUsed.vatRegime, "rebu");

  const conflict = volvoNaturalWithoutDocumentTypeDto();
  conflict.evidence.push(evidence({ evidenceId: "ev-volvo-seller-conflict", documentId: null, candidateId: null, page: null, field: "transaction.sellerType", normalizedValue: "professional", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }));
  const conflictResult = await calculate(conflict);
  assert.equal(conflictResult.classification.status, "conflict");
  assert.notEqual(conflictResult.engineExecutions.itp.status, "calculated_scenario");

  const multiple = volvoNaturalWithoutDocumentTypeDto();
  multiple.evidence.push(evidence({ evidenceId: "ev-other-category-no-doc", documentId: null, candidateId: "candidate-other", page: null, field: "vehicle.category", normalizedValue: "passenger_car", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }));
  multiple.evidence.push(evidence({ evidenceId: "ev-other-boe-no-doc", documentId: null, candidateId: "candidate-other", page: null, field: "vehicle.boeValue", normalizedValue: 9000, valueType: "money", sourceType: "user_declaration", verificationStatus: "confirmed_user" }));
  const multipleResult = await calculate(multiple);
  assert.notEqual(multipleResult.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(multipleResult.engineExecutions.itp.warningCodes.includes("ASSUMED_PRIVATE_SALE_CONTRACT"), false);
});
test("request natural con evidencias scenario calcula cuatro motores orientativos", async () => {
  const input = volvoNaturalScenarioDto();
  const before = JSON.stringify(input);
  const result = await calculate(input);
  assert.equal(JSON.stringify(input), before);
  assert.equal(result.taxSummary, null);
  assert.equal(result.estimatedSummary.exactTotal, null);
  assert.equal(result.estimatedSummary.confirmedSubtotal, null);
  assert.equal(result.estimatedSummary.estimatedTotal, 2619.06);
  assert.equal(result.estimatedSummary.prudentBudget, 2626);
  assert.equal(result.classification.sellerType, "private");
  assert.equal(result.classification.buyerType, "private");
  assert.equal(result.classification.documentType, "private_sale_contract");
  assert.equal(result.classification.vatRegime, "not_applicable_private_sale");
  assert.notEqual(result.classification.rebuStatus, "confirmed");
  for (const engineId of ["iedmt", "itp", "ivtm", "dgt_registration_fee"]) {
    assert.equal(result.engineExecutions[engineId].status, "calculated_scenario", engineId);
    assert.equal(result.engineExecutions[engineId].inputStatus, "scenario", engineId);
  }
  assert.equal(result.engineExecutions.iedmt.result.tax.toFixed(2), "1192.01");
  assert.equal(result.engineExecutions.itp.result.taxAmount, 1262.28);
  assert.equal(result.engineExecutions.itp.inputsUsed.transactionDate, "2026-08-09");
  assert.equal(result.engineExecutions.itp.inputsUsed.vatRegime, "not_applicable_private_sale");
  assert.equal(result.engineExecutions.ivtm.result.referenceProratedTax, 65);
  assert.equal(result.engineExecutions.ivtm.result.prudentBudget, 71.94);
  assert.equal(result.engineExecutions.ivtm.result.dataStatus, "outdated");
  assert.equal(result.engineExecutions.dgt_registration_fee.result.amount, 99.77);
  assert.equal(JSON.stringify(result).includes("confirmed_official"), false);
});

test("escenarios naturales no presumen REBU ni mezclan conflictos o candidatos", async () => {
  const professional = volvoNaturalScenarioDto();
  professional.evidence.find((item) => item.evidenceId === "ev-volvo-seller").normalizedValue = "professional";
  const professionalResult = await calculate(professional);
  assert.equal(professionalResult.classification.status, "conflict");
  assert.notEqual(professionalResult.classification.vatRegime, "not_applicable_private_sale");
  assert.notEqual(professionalResult.engineExecutions.itp.status, "calculated_scenario");

  const unknown = volvoNaturalScenarioDto();
  unknown.evidence.find((item) => item.evidenceId === "ev-volvo-seller").normalizedValue = "unknown";
  const unknownResult = await calculate(unknown);
  assert.notEqual(unknownResult.classification.rebuStatus, "confirmed");
  assert.notEqual(unknownResult.engineExecutions.itp.inputsUsed.vatRegime, "rebu");

  const conflict = volvoNaturalScenarioDto();
  conflict.evidence.push(evidence({ evidenceId: "ev-volvo-seller-conflict", documentId: null, candidateId: null, page: null, field: "transaction.sellerType", normalizedValue: "professional", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }));
  const conflictResult = await calculate(conflict);
  assert.equal(conflictResult.classification.status, "conflict");
  assert.notEqual(conflictResult.engineExecutions.itp.status, "calculated_scenario");

  const multiple = volvoNaturalScenarioDto();
  multiple.evidence.push(evidence({ evidenceId: "ev-other-category", documentId: null, candidateId: "candidate-other", page: null, field: "vehicle.category", normalizedValue: "passenger_car", valueType: "enum", sourceType: "user_declaration", verificationStatus: "confirmed_user" }));
  multiple.evidence.push(evidence({ evidenceId: "ev-other-boe", documentId: null, candidateId: "candidate-other", page: null, field: "vehicle.boeValue", normalizedValue: 9000, valueType: "money", sourceType: "user_declaration", verificationStatus: "confirmed_user" }));
  const multipleResult = await calculate(multiple);
  assert.equal(multipleResult.engineExecutions.iedmt.status, "calculated_scenario");
  assert.equal(multipleResult.engineExecutions.iedmt.result.tax.toFixed(2), "1192.01");
  assert.equal(multipleResult.engineExecutions.itp.result.taxAmount, 1262.28);
});
test("normaliza valueType semanticos desde FIELD_RULES sin reflejarlos", async () => {
  const input = withSemanticValueTypes(volvoDeclaredDto());
  const before = JSON.stringify(input);
  const adapted = buildVehicleTaxCaseFromActionDto(input);
  assert.equal(JSON.stringify(input), before);

  const valueTypesByField = new Map(adapted.caseFile.evidence.map((item) => [item.field, item.valueType]));
  assert.equal(valueTypesByField.get("vehicle.category"), "enum");
  assert.equal(valueTypesByField.get("vehicle.fuelType"), "enum");
  assert.equal(valueTypesByField.get("vehicle.engineDisplacementCc"), "number");
  assert.equal(valueTypesByField.get("vehicle.fiscalHorsepower"), "number");
  assert.equal(valueTypesByField.get("vehicle.firstRegistrationDate"), "date");
  assert.equal(valueTypesByField.get("vehicle.boeValue"), "money");
  assert.equal(valueTypesByField.get("parties.sellerCountry"), "country");
  assert.equal(valueTypesByField.get("taxDestination.municipalityCode"), "ine_code");
  for (const semanticType of Object.values(SEMANTIC_VALUE_TYPES)) assert.equal(JSON.stringify(adapted).includes(semanticType), false, semanticType);

  const result = await calculateVehicleTaxCase(adapted.caseFile, adapted.options);
  for (const engineId of ["iedmt", "itp", "ivtm", "dgt_registration_fee"]) assert.equal(result.engineExecutions[engineId].status, "calculated_scenario", engineId);
  assert.equal(result.estimatedSummary.estimatedTotal, 2619.06);
  for (const semanticType of Object.values(SEMANTIC_VALUE_TYPES)) assert.equal(JSON.stringify(result).includes(semanticType), false, semanticType);
});
test("Volvo declarado sin documentos calcula estimacion orientativa separada", async () => {
  const input = volvoDeclaredDto();
  const before = JSON.stringify(input);
  const result = await calculate(input);
  assert.equal(JSON.stringify(input), before);
  assert.deepEqual(result, JSON.parse(JSON.stringify(result)));
  assert.equal(sharedRefCount(result), 0);
  assert.equal(result.status, "estimated");
  assert.equal(result.taxSummary, null);
  assert.equal(result.estimatedSummary.exactTotal, null);
  assert.equal(result.estimatedSummary.confirmedSubtotal, null);
  assert.equal(result.estimatedSummary.estimatedTotal, 2619.06);
  assert.equal(result.estimatedSummary.prudentBudget, 2626);
  assert.deepEqual(result.estimatedSummary.exactTotalBlockedBy, ["iedmt", "itp", "ivtm", "dgt_registration_fee"]);
  for (const engineId of ["iedmt", "itp", "ivtm", "dgt_registration_fee"]) {
    assert.equal(result.engineExecutions[engineId].status, "calculated_scenario", engineId);
    assert.equal(result.engineExecutions[engineId].inputStatus, "scenario", engineId);
    assert.equal(result.engineExecutions[engineId].confidenceLevel, "declared", engineId);
    assert.equal(result.engineExecutions[engineId].warningCodes.includes("SCENARIO_FROM_DECLARED_DATA"), true, engineId);
  }
  assert.equal(result.engineExecutions.iedmt.result.tax.toFixed(2), "1192.01");
  assert.equal(result.engineExecutions.itp.inputsUsed.assumedTransactionDate, "2026-08-09");
  assert.equal(result.engineExecutions.itp.inputsUsed.officialMarketValue, 31557);
  assert.equal(result.engineExecutions.itp.result.taxAmount, 1262.28);
  assert.equal(result.engineExecutions.ivtm.inputsUsed.assumedSpanishRegistrationDate, "2026-08-09");
  assert.equal(result.engineExecutions.dgt_registration_fee.inputsUsed.assumedSpanishRegistrationDate, "2026-08-09");
  assert.equal(result.engineExecutions.dgt_registration_fee.result.amount, 99.77);
  assert.equal(JSON.stringify(result).includes("confirmed_official"), false);
});

test("Volvo declarado con fechas previstas usa esas fechas solo en escenario", async () => {
  const result = await calculate(volvoDeclaredDto({ transactionDate: "2026-08-02", expectedSettlementDate: "2026-08-02" }));
  assert.equal(result.status, "estimated");
  assert.equal(result.engineExecutions.itp.status, "calculated_scenario");
  assert.equal(result.engineExecutions.itp.inputsUsed.transactionDate, "2026-08-02");
  assert.equal(Object.hasOwn(result.engineExecutions.itp.inputsUsed, "assumedTransactionDate"), false);
  assert.equal(result.engineExecutions.ivtm.inputsUsed.spanishRegistrationDate, "2026-08-02");
  assert.equal(result.engineExecutions.ivtm.inputsUsed.assumedSpanishRegistrationDate, "2026-08-02");
  assert.equal(result.engineExecutions.dgt_registration_fee.inputsUsed.feeDate, "2026-08-02");
  assert.equal(result.engineExecutions.dgt_registration_fee.inputsUsed.assumedSpanishRegistrationDate, "2026-08-02");
  assert.equal(result.taxSummary, null);
  assert.equal(result.estimatedSummary.exactTotal, null);
});

test("confirmed_only mantiene bloqueo estricto con datos solo declarados", async () => {
  const result = await calculate(volvoDeclaredDto({ scenarioPolicy: "confirmed_only" }));
  assert.equal(result.status, "partial");
  assert.equal(result.estimatedSummary, null);
  assert.equal(result.engineExecutions.iedmt.status, "not_run_missing_inputs");
  assert.equal(result.engineExecutions.itp.status, "not_run_missing_inputs");
  assert.equal(result.engineExecutions.ivtm.status, "not_run_missing_inputs");
  assert.equal(result.engineExecutions.dgt_registration_fee.status, "not_run_missing_inputs");
});
test("instrucciones GPT no permiten inferir transaction.date y caben en el limite compacto", () => {
  const instructions = readFileSync(new URL("../../docs/asistente-pgc-instructions.md", import.meta.url), "utf8");
  assert.match(instructions, /Nunca infieras .*transaction.date/);
  assert.match(instructions, /si el usuario no da fecha contractual, omitela/i);
  assert.ok(instructions.length < 8000, instructions.length);
});

test("Madrid conserva requires_review para evidencia no representable e IVTM no inventa bonificacion", async () => {
  const madrid = await calculate(dto());
  assert.equal(madrid.engineExecutions.ivtm.status, "calculated_confirmed");
  assert.equal(madrid.engineExecutions.ivtm.inputsUsed.bonusStatus, "unknown");
  assert.equal(madrid.engineExecutions.ivtm.warningCodes.includes("BONUS_STATUS_UNKNOWN"), true);
  const madrid2026 = dto({ root: { options: { calculationDate: "2026-07-29", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" } } });
  madrid2026.documents.push(document({ documentId: "doc-tax-1", documentType: "technical_inspection_document" }));
  madrid2026.evidence.find((item) => item.evidenceId === "ev-settlement").normalizedValue = "2026-07-29";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-tx-date").normalizedValue = "2026-07-20";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-spanish-reg").normalizedValue = "2026-07-20";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-zero").documentId = "doc-tax-1";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-zero").sourceType = "official_document";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-zero").verificationStatus = "confirmed_official";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-historic").documentId = "doc-tax-1";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-historic").sourceType = "official_document";
  madrid2026.evidence.find((item) => item.evidenceId === "ev-historic").verificationStatus = "confirmed_official";
  madrid2026.evidence.push(evidence({ evidenceId: "ev-end-life", documentId: "doc-1", field: "vehicle.isEndOfLifeVehicle", normalizedValue: false, valueType: "boolean" }));
  const result = await calculate(madrid2026);
  assert.equal(result.engineExecutions.itp.status, "requires_review");
  assert.ok(result.engineExecutions.itp.missingFields.includes("evidence.madridReducedValuationUse"));
});
