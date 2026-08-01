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
  const badType = dto();
  badType.evidence[0].valueType = "string";
  assertActionError(() => buildVehicleTaxCaseFromActionDto(badType), "ACTION_VALUE_TYPE_INVALID");
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
  assert.equal(result.engineExecutions.itp.inputsUsed.officialMarketValue, 24000);
  assert.equal(result.engineExecutions.itp.inputsUsed.purchasePrice, 21500);
  assert.equal(Object.hasOwn(adapted.caseFile, "officialMarketValue"), false);
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
