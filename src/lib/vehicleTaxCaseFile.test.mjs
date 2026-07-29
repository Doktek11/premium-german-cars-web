import assert from "node:assert/strict";
import test from "node:test";

import {
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES,
  VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES,
  VEHICLE_TAX_CASE_FILE_FIELD_PATHS,
  VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
  VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES,
  VEHICLE_TAX_CASE_FILE_WARNING_CODES,
} from "../data/vehicleTaxCaseFileCatalogs.mjs";
import { buildVehicleTaxCaseFile } from "./vehicleTaxCaseFile.mjs";

function doc(overrides = {}) {
  return {
    documentId: "doc-1",
    documentType: "coc",
    filename: "coc.pdf",
    language: "DE",
    country: "de",
    issueDate: "2025-01-10",
    issuer: "Manufacturer",
    pageCount: 2,
    contentHash: "sha256:test",
    extractionStatus: "verified",
    uploadedAt: "2026-01-02T10:00:00.000Z",
    containsPersonalData: false,
    warnings: [],
    ...overrides,
  };
}

function ev(overrides = {}) {
  return {
    evidenceId: "ev-1",
    documentId: "doc-1",
    vehicleCandidateId: "candidate-1",
    field: "vehicle.vin",
    documentType: "coc",
    page: 1,
    fieldLabel: "VIN",
    sourceExcerpt: "VIN shown on document",
    normalizedValue: "WBA8E51070A123456",
    valueType: "string",
    unit: null,
    sourceType: "official_document",
    confidence: 0.9,
    extractionMethod: "manual",
    verifiedBy: "user",
    verificationStatus: "confirmed_official",
    notes: null,
    ...overrides,
  };
}

function caseInput(overrides = {}) {
  return {
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId: "case-1",
    createdAt: "2026-01-02T10:00:00.000Z",
    updatedAt: "2026-01-03T10:00:00.000Z",
    documents: [],
    evidence: [],
    selectedVehicleCandidateId: null,
    assumptions: [],
    ...overrides,
  };
}

function completeSelectedCandidateInput(extraEvidence = []) {
  return caseInput({
    documents: [
      doc({ documentId: "coc-1", documentType: "coc" }),
      doc({ documentId: "invoice-1", documentType: "invoice" }),
      doc({ documentId: "user-1", documentType: "user_declaration" }),
    ],
    evidence: [
      ev({ evidenceId: "vin", documentId: "coc-1", documentType: "coc", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
      ev({ evidenceId: "boe", documentId: "user-1", documentType: "user_declaration", field: "vehicle.boeValue", normalizedValue: 35000, verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "co2", documentId: "coc-1", documentType: "coc", field: "vehicle.co2Wltp", normalizedValue: 145 }),
      ev({ evidenceId: "condition", documentId: "user-1", documentType: "user_declaration", field: "vehicle.condition", normalizedValue: "usado_importado", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "first-reg", documentId: "coc-1", documentType: "coc", field: "vehicle.firstRegistrationDate", normalizedValue: "2022-05" }),
      ev({ evidenceId: "category", documentId: "coc-1", documentType: "coc", field: "vehicle.category", normalizedValue: "passenger_car" }),
      ev({ evidenceId: "cvf", documentId: "coc-1", documentType: "coc", field: "vehicle.fiscalHorsepower", normalizedValue: 14.2 }),
      ev({ evidenceId: "spanish-reg", documentId: "user-1", documentType: "user_declaration", field: "vehicle.spanishRegistrationDate", normalizedValue: "2026-03-20", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "tx-date", documentId: "invoice-1", documentType: "invoice", field: "transaction.date", normalizedValue: "2026-02-01", sourceType: "contractual_document" }),
      ev({ evidenceId: "price", documentId: "invoice-1", documentType: "invoice", field: "transaction.purchasePrice", normalizedValue: 32000, sourceType: "contractual_document" }),
      ev({ evidenceId: "currency", documentId: "invoice-1", documentType: "invoice", field: "transaction.currency", normalizedValue: "EUR", sourceType: "contractual_document" }),
      ev({ evidenceId: "seller", documentId: "invoice-1", documentType: "invoice", field: "transaction.sellerType", normalizedValue: "professional", sourceType: "contractual_document" }),
      ev({ evidenceId: "buyer", documentId: "user-1", documentType: "user_declaration", field: "transaction.buyerType", normalizedValue: "private", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "vat", documentId: "invoice-1", documentType: "invoice", field: "transaction.vatRegime", normalizedValue: "unknown", sourceType: "contractual_document" }),
      ev({ evidenceId: "residence", documentId: "user-1", documentType: "user_declaration", field: "parties.buyerTaxResidenceCountry", normalizedValue: "ES", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "ac", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.autonomousCommunity", normalizedValue: "Catalunya", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "ine", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.municipalityCode", normalizedValue: "43123", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ev({ evidenceId: "settlement", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.expectedSettlementDate", normalizedValue: "2026-03-20", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
      ...extraEvidence,
    ],
  });
}

test("builds a valid empty case file shape", () => {
  const result = buildVehicleTaxCaseFile(caseInput());
  assert.equal(result.schemaVersion, VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION);
  assert.deepEqual(result.documents, []);
  assert.deepEqual(result.evidence, []);
  assert.equal(result.selectedVehicleCandidateId, null);
  assert.equal(result.vehicleCandidates.length, 0);
  assert.equal(result.readiness.iedmt.status, "insufficient_data");
  assert.ok(VEHICLE_TAX_CASE_FILE_FIELD_PATHS.every((field) => field.startsWith("vehicle.") || result.facts[field]));
});

test("handles null and undefined without throwing", () => {
  assert.equal(buildVehicleTaxCaseFile(null).warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_FILE_INPUT), true);
  assert.equal(buildVehicleTaxCaseFile(undefined).warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_FILE_INPUT), true);
});

test("normalizes one COC with VIN, CO2 and month precision first registration date", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" })],
    evidence: [
      ev({ evidenceId: "vin", documentId: "coc-1", field: "vehicle.vin", normalizedValue: "wba8e51070a123456" }),
      ev({ evidenceId: "co2", documentId: "coc-1", field: "vehicle.co2Wltp", normalizedValue: 142 }),
      ev({ evidenceId: "date", documentId: "coc-1", field: "vehicle.firstRegistrationDate", normalizedValue: "2022-05" }),
    ],
  }));
  assert.equal(result.vehicleCandidates.length, 1);
  assert.equal(result.selectedVehicleCandidateId, result.vehicleCandidates[0].vehicleCandidateId);
  assert.equal(result.vehicleCandidates[0].facts["vehicle.vin"].normalizedValue, "WBA8E51070A123456");
  assert.equal(result.vehicleCandidates[0].facts["vehicle.firstRegistrationDate"].normalizedValue, "2022-05");
});

test("Teil I and Teil II matching VIN remain in the same explicit candidate", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [
      doc({ documentId: "teil-i", documentType: "german_registration_part_i" }),
      doc({ documentId: "teil-ii", documentType: "german_registration_part_ii" }),
    ],
    evidence: [
      ev({ evidenceId: "vin-i", documentId: "teil-i", documentType: "german_registration_part_i", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
      ev({ evidenceId: "vin-ii", documentId: "teil-ii", documentType: "german_registration_part_ii", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
    ],
  }));
  assert.equal(result.vehicleCandidates.length, 1);
  assert.equal(result.conflicts.length, 0);
});

test("invoice can confirm seller type without inferring fiscal conclusions", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice" })],
    evidence: [
      ev({ evidenceId: "seller", documentId: "invoice-1", documentType: "invoice", field: "transaction.sellerType", normalizedValue: "professional", sourceType: "contractual_document" }),
      ev({ evidenceId: "doc-type", documentId: "invoice-1", documentType: "invoice", field: "transaction.documentType", normalizedValue: "invoice", sourceType: "contractual_document" }),
    ],
  }));
  assert.equal(result.facts["transaction.sellerType"].normalizedValue, "professional");
  assert.equal(result.facts["transaction.vatRegime"].status, "missing");
  assert.equal(JSON.stringify(result).includes("not_subject"), false);
});

test("private contract preserves private seller and buyer facts", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "contract-1", documentType: "private_sale_contract" })],
    evidence: [
      ev({ evidenceId: "seller", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.sellerType", normalizedValue: "private", sourceType: "contractual_document" }),
      ev({ evidenceId: "buyer", documentId: "contract-1", documentType: "private_sale_contract", field: "transaction.buyerType", normalizedValue: "private", sourceType: "contractual_document" }),
    ],
  }));
  assert.equal(result.facts["transaction.sellerType"].normalizedValue, "private");
  assert.equal(result.facts["transaction.buyerType"].normalizedValue, "private");
});

test("invoice without VAT regime keeps vatRegime missing", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice" })],
    evidence: [ev({ evidenceId: "seller", documentId: "invoice-1", documentType: "invoice", field: "transaction.sellerType", normalizedValue: "professional", sourceType: "contractual_document" })],
  }));
  assert.equal(result.facts["transaction.vatRegime"].status, "missing");
  assert.equal(result.readiness.itp.status, "insufficient_data");
});

test("Mehrwertsteuer nicht ausweisbar does not confirm REBU", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice" })],
    evidence: [
      ev({ evidenceId: "vat-item", documentId: "invoice-1", documentType: "invoice", field: "transaction.vatItemizedStatus", normalizedValue: "not_itemized", sourceExcerpt: "Mehrwertsteuer nicht ausweisbar", sourceType: "contractual_document" }),
    ],
  }));
  assert.equal(result.facts["transaction.vatItemizedStatus"].normalizedValue, "not_itemized");
  assert.equal(result.facts["transaction.rebuStatus"].status, "missing");
});

test("unknown seller does not create ITP tax scenarios", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "user-1", documentType: "user_declaration" })],
    evidence: [ev({ evidenceId: "seller", documentId: "user-1", documentType: "user_declaration", field: "transaction.sellerType", normalizedValue: "unknown", verificationStatus: "confirmed_user", sourceType: "user_declaration" })],
  }));
  assert.equal(result.facts["transaction.sellerType"].normalizedValue, "unknown");
  assert.equal(result.scenarios.some((scenario) => JSON.stringify(scenario).includes("itp")), false);
});

test("WLTP and NEDC CO2 are separate facts", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" })],
    evidence: [
      ev({ evidenceId: "wltp", documentId: "coc-1", field: "vehicle.co2Wltp", normalizedValue: 150 }),
      ev({ evidenceId: "nedc", documentId: "coc-1", field: "vehicle.co2Nedc", normalizedValue: 120 }),
    ],
  }));
  const candidate = result.vehicleCandidates[0];
  assert.equal(candidate.facts["vehicle.co2Wltp"].normalizedValue, 150);
  assert.equal(candidate.facts["vehicle.co2Nedc"].normalizedValue, 120);
});

test("same-priority official CO2 conflict is not selected silently", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" }), doc({ documentId: "card-1", documentType: "spanish_technical_card" })],
    evidence: [
      ev({ evidenceId: "co2-a", documentId: "coc-1", field: "vehicle.co2Wltp", normalizedValue: 150, confidence: 0.8 }),
      ev({ evidenceId: "co2-b", documentId: "card-1", documentType: "spanish_technical_card", field: "vehicle.co2Wltp", normalizedValue: 160, confidence: 0.8 }),
    ],
  }));
  assert.equal(result.vehicleCandidates[0].facts["vehicle.co2Wltp"].status, "conflict");
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.VALUE_CONFLICT));
});

test("matching VIN values do not create identity conflict", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" }), doc({ documentId: "card-1", documentType: "spanish_technical_card" })],
    evidence: [
      ev({ evidenceId: "vin-a", documentId: "coc-1", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
      ev({ evidenceId: "vin-b", documentId: "card-1", documentType: "spanish_technical_card", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
    ],
  }));
  assert.equal(result.conflicts.some((conflict) => conflict.type === "identity_conflict"), false);
});

test("official contradictory VIN creates critical identity conflict", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" }), doc({ documentId: "card-1", documentType: "spanish_technical_card" })],
    evidence: [
      ev({ evidenceId: "vin-a", documentId: "coc-1", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
      ev({ evidenceId: "vin-b", documentId: "card-1", documentType: "spanish_technical_card", field: "vehicle.vin", normalizedValue: "WBA8E51070A654321" }),
    ],
  }));
  assert.ok(result.conflicts.some((conflict) => conflict.type === "identity_conflict" && conflict.severity === "critical_identity"));
  assert.equal(result.readiness.iedmt.status, "identity_conflict");
});

test("different VIN groups without explicit candidates stay separated", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-a" }), doc({ documentId: "coc-b" })],
    evidence: [
      ev({ evidenceId: "vin-a", documentId: "coc-a", vehicleCandidateId: null, field: "vehicle.vin", normalizedValue: "WBA8E51070A123456" }),
      ev({ evidenceId: "vin-b", documentId: "coc-b", vehicleCandidateId: null, field: "vehicle.vin", normalizedValue: "WBA8E51070A654321" }),
    ],
  }));
  assert.equal(result.vehicleCandidates.length, 2);
  assert.equal(result.selectedVehicleCandidateId, null);
});

test("invoice price wins over vehicle ad price but preserves alternative", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice" }), doc({ documentId: "ad-1", documentType: "vehicle_ad" })],
    evidence: [
      ev({ evidenceId: "invoice-price", documentId: "invoice-1", documentType: "invoice", field: "transaction.purchasePrice", normalizedValue: 32000, sourceType: "contractual_document", confidence: 0.8 }),
      ev({ evidenceId: "ad-price", documentId: "ad-1", documentType: "vehicle_ad", field: "transaction.purchasePrice", normalizedValue: 30000, sourceType: "vehicle_ad", verificationStatus: "extracted", confidence: 0.99 }),
    ],
  }));
  assert.equal(result.facts["transaction.purchasePrice"].normalizedValue, 32000);
  assert.equal(result.facts["transaction.purchasePrice"].alternatives.length, 2);
});

test("date validation preserves YYYY-MM where allowed and rejects it where not allowed", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" }), doc({ documentId: "user-1", documentType: "user_declaration" })],
    evidence: [
      ev({ evidenceId: "first", documentId: "coc-1", field: "vehicle.firstRegistrationDate", normalizedValue: "2021-09" }),
      ev({ evidenceId: "spanish", documentId: "user-1", documentType: "user_declaration", field: "vehicle.spanishRegistrationDate", normalizedValue: "2026-03", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
    ],
  }));
  const candidate = result.vehicleCandidates[0];
  assert.equal(candidate.facts["vehicle.firstRegistrationDate"].normalizedValue, "2021-09");
  assert.equal(candidate.facts["vehicle.spanishRegistrationDate"].status, "invalid");
  assert.notEqual(candidate.facts["vehicle.firstRegistrationDate"].normalizedValue, "2021-09-01");
});

test("municipality code keeps leading zeros", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "user-1", documentType: "user_declaration" })],
    evidence: [ev({ evidenceId: "ine", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.municipalityCode", normalizedValue: "01059", verificationStatus: "confirmed_user", sourceType: "user_declaration" })],
  }));
  assert.equal(result.facts["taxDestination.municipalityCode"].normalizedValue, "01059");
});

test("Basque destination without province is isolated to ITP readiness", () => {
  const input = completeSelectedCandidateInput();
  input.evidence = input.evidence.filter((item) => item.evidenceId !== "ac");
  input.evidence.push(ev({ evidenceId: "ac-basque", documentId: "user-1", documentType: "user_declaration", field: "taxDestination.autonomousCommunity", normalizedValue: "Pais Vasco", verificationStatus: "confirmed_user", sourceType: "user_declaration" }));
  const result = buildVehicleTaxCaseFile(input);
  assert.ok(result.readiness.itp.missingInputs.includes("taxDestination.province"));
  assert.notEqual(result.readiness.ivtm.status, "insufficient_data");
});

test("readiness is independent for five destinations", () => {
  const result = buildVehicleTaxCaseFile(completeSelectedCandidateInput());
  assert.equal(result.readiness.iedmt.status, "ready_with_assumptions");
  assert.equal(result.readiness.itp.status, "ready_with_assumptions");
  assert.equal(result.readiness.ivtm.status, "ready_with_assumptions");
  assert.equal(result.readiness.dgt_registration_fee.status, "ready_with_assumptions");
  assert.equal(result.readiness.tax_summary.status, "ready_with_assumptions");
});

test("rejected evidence cannot be selected", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" })],
    evidence: [
      ev({ evidenceId: "bad", documentId: "coc-1", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456", verificationStatus: "rejected", confidence: 1 }),
      ev({ evidenceId: "good", documentId: "coc-1", field: "vehicle.vin", normalizedValue: "WBA8E51070A123456", verificationStatus: "extracted", confidence: 0.1 }),
    ],
  }));
  assert.equal(result.vehicleCandidates[0].facts["vehicle.vin"].selectedEvidenceId, "good");
});

test("official evidence beats ad despite lower confidence", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1" }), doc({ documentId: "ad-1", documentType: "vehicle_ad" })],
    evidence: [
      ev({ evidenceId: "official", documentId: "coc-1", field: "vehicle.co2Wltp", normalizedValue: 150, confidence: 0.8 }),
      ev({ evidenceId: "ad", documentId: "ad-1", documentType: "vehicle_ad", field: "vehicle.co2Wltp", normalizedValue: 130, verificationStatus: "extracted", sourceType: "vehicle_ad", confidence: 0.99 }),
    ],
  }));
  assert.equal(result.vehicleCandidates[0].facts["vehicle.co2Wltp"].normalizedValue, 150);
});

test("same-level conflict produces conflict and scenario alternatives", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "ad-1", documentType: "vehicle_ad" }), doc({ documentId: "ad-2", documentType: "vehicle_ad" })],
    evidence: [
      ev({ evidenceId: "ad-a", documentId: "ad-1", documentType: "vehicle_ad", field: "transaction.purchasePrice", normalizedValue: 30000, verificationStatus: "extracted", sourceType: "vehicle_ad", confidence: 0.5 }),
      ev({ evidenceId: "ad-b", documentId: "ad-2", documentType: "vehicle_ad", field: "transaction.purchasePrice", normalizedValue: 31000, verificationStatus: "extracted", sourceType: "vehicle_ad", confidence: 0.5 }),
    ],
  }));
  assert.equal(result.facts["transaction.purchasePrice"].status, "conflict");
  assert.equal(result.scenarios.length, 2);
});

test("duplicate document and evidence IDs are rejected with warnings", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "dup" }), doc({ documentId: "dup", documentType: "invoice" })],
    evidence: [ev({ evidenceId: "dup-ev" }), ev({ evidenceId: "dup-ev" })],
  }));
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_DOCUMENT_ID));
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_EVIDENCE_ID));
  assert.equal(result.documents.some((item) => item.extractionStatus === VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES.REJECTED), true);
  assert.equal(result.evidence.some((item) => item.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED), true);
});

test("unknown document reference and documentType mismatch are reported", () => {
  const unknown = buildVehicleTaxCaseFile(caseInput({ evidence: [ev({ evidenceId: "missing-doc", documentId: "missing" })] }));
  assert.ok(unknown.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_DOCUMENT_REFERENCE));
  const mismatch = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice" })],
    evidence: [ev({ evidenceId: "mismatch", documentId: "invoice-1", documentType: "coc", field: "transaction.documentType", normalizedValue: "invoice" })],
  }));
  assert.ok(mismatch.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DOCUMENT_TYPE_MISMATCH));
});

test("sourceExcerpt is truncated and warned", () => {
  const longText = "x".repeat(700);
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "doc-1" })],
    evidence: [ev({ sourceExcerpt: longText })],
  }));
  assert.equal(result.evidence[0].sourceExcerpt.length, 500);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.SOURCE_EXCERPT_TRUNCATED));
});

test("sensitive data summary contains categories and no raw values", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice", containsPersonalData: true })],
    evidence: [
      ev({
        evidenceId: "contact",
        documentId: "invoice-1",
        documentType: "invoice",
        field: "transaction.sellerType",
        normalizedValue: "professional",
        sourceExcerpt: "contact redacted IBAN_SAMPLE_REDACTED",
      }),
    ],
  }));
  assert.equal(result.sensitiveDataSummary.containsPersonalData, true);
  assert.ok(result.sensitiveDataSummary.categories.includes("financial"));
  assert.equal(JSON.stringify(result.sensitiveDataSummary).includes("IBAN_SAMPLE_REDACTED"), false);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.SENSITIVE_DATA_PRESENT));
});

test("scenarios are truncated deterministically", () => {
  const evidence = [];
  for (let index = 0; index < 25; index += 1) {
    evidence.push(ev({
      evidenceId: `price-${index}`,
      documentId: "doc-1",
      documentType: "invoice",
      field: "transaction.purchasePrice",
      normalizedValue: 30000 + index,
      sourceType: "contractual_document",
      verificationStatus: "confirmed_official",
      confidence: 0.5,
    }));
  }
  const result = buildVehicleTaxCaseFile(caseInput({ documents: [doc({ documentId: "doc-1", documentType: "invoice" })], evidence }));
  assert.equal(result.scenarios.length, 20);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.CASE_FILE_SCENARIOS_TRUNCATED));
});

test("input is not mutated and output has no shared references", () => {
  const input = completeSelectedCandidateInput();
  const before = JSON.stringify(input);
  const result = buildVehicleTaxCaseFile(input);
  assert.equal(JSON.stringify(input), before);
  result.facts["transaction.currency"].normalizedValue = "USD";
  const again = buildVehicleTaxCaseFile(input);
  assert.equal(again.facts["transaction.currency"].normalizedValue, "EUR");
});

test("two calls are independent and JSON roundtrip is stable", () => {
  const first = buildVehicleTaxCaseFile(completeSelectedCandidateInput());
  const second = buildVehicleTaxCaseFile(completeSelectedCandidateInput());
  assert.deepEqual(first, second);
  assert.deepEqual(JSON.parse(JSON.stringify(first)), first);
});

test("top-level and internal canonical shapes are always present", () => {
  const result = buildVehicleTaxCaseFile(caseInput({ documents: [doc()], evidence: [ev()] }));
  for (const key of ["schemaVersion", "caseId", "createdAt", "updatedAt", "documents", "vehicleCandidates", "selectedVehicleCandidateId", "facts", "parties", "transaction", "taxDestination", "evidence", "conflicts", "scenarios", "readiness", "assumptions", "warnings", "warningCodes", "missingFields", "sensitiveDataSummary"]) {
    assert.ok(Object.hasOwn(result, key), key);
  }
  assert.deepEqual(Object.keys(result.documents[0]), ["documentId", "documentType", "filename", "language", "country", "issueDate", "issuer", "pageCount", "contentHash", "extractionStatus", "uploadedAt", "containsPersonalData", "warnings"]);
  assert.deepEqual(Object.keys(result.evidence[0]), ["evidenceId", "documentId", "vehicleCandidateId", "field", "documentType", "page", "fieldLabel", "sourceExcerpt", "normalizedValue", "valueType", "unit", "sourceType", "confidence", "extractionMethod", "verifiedBy", "verificationStatus", "notes", "warnings"]);
});

test("systematic document catalog matrix accepts every document type", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES.map((documentType, index) => doc({ documentId: `doc-${index}`, documentType })),
  }));
  assert.equal(result.documents.length, VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES.length);
  assert.equal(result.documents.every((item) => item.extractionStatus !== "rejected"), true);
});

test("defensive validation rejects non serializable values and invalid enums", () => {
  const input = caseInput({
    documents: [doc({ documentId: "doc-1", documentType: "mystery", issueDate: new Date("2026-01-01") })],
    evidence: [
      ev({ evidenceId: "bad-num", field: "vehicle.co2Wltp", normalizedValue: Number.POSITIVE_INFINITY }),
      ev({ evidenceId: "bad-field", field: "unknown.field", normalizedValue: "x" }),
      ev({ evidenceId: "bad-enum", field: "transaction.sellerType", normalizedValue: "dealer" }),
    ],
  });
  input.self = input;
  const result = buildVehicleTaxCaseFile(input);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE));
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_FIELD));
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_VALUE));
});

test("invalid selected candidate is cleared", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    selectedVehicleCandidateId: "missing",
    documents: [doc({ documentId: "doc-1" })],
    evidence: [ev({ evidenceId: "vin" })],
  }));
  assert.equal(result.selectedVehicleCandidateId, null);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SELECTED_CANDIDATE));
});


test("rejects evidence whose page is beyond referenced document pageCount", () => {
  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "doc-page", pageCount: 2 })],
    evidence: [ev({ evidenceId: "vin-page-99", documentId: "doc-page", page: 99 })],
  }));
  assert.equal(result.evidence[0].evidenceId, "vin-page-99");
  assert.equal(result.evidence[0].verificationStatus, "rejected");
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_PAGE));
  assert.equal(result.vehicleCandidates[0].facts["vehicle.vin"].status, "missing");
  assert.equal(result.vehicleCandidates[0].facts["vehicle.vin"].selectedEvidenceId, null);
});

test("accepts evidence page equal to pageCount and positive page when pageCount is unknown", () => {
  const exactPage = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "doc-page", pageCount: 2 })],
    evidence: [ev({ evidenceId: "vin-page-2", documentId: "doc-page", page: 2 })],
  }));
  assert.equal(exactPage.evidence[0].verificationStatus, "confirmed_official");
  assert.equal(exactPage.vehicleCandidates[0].facts["vehicle.vin"].selectedEvidenceId, "vin-page-2");

  const unknownPageCount = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "doc-page", pageCount: null })],
    evidence: [ev({ evidenceId: "vin-page-99", documentId: "doc-page", page: 99 })],
  }));
  assert.equal(unknownPageCount.evidence[0].verificationStatus, "confirmed_official");
  assert.equal(unknownPageCount.vehicleCandidates[0].facts["vehicle.vin"].selectedEvidenceId, "vin-page-99");
});

test("rejects non-positive non-integer and non-finite evidence pages", () => {
  for (const [index, page] of [0, -1, 1.5, NaN, Infinity].entries()) {
    const result = buildVehicleTaxCaseFile(caseInput({
      documents: [doc({ documentId: `doc-page-${index}`, pageCount: 2 })],
      evidence: [ev({ evidenceId: `bad-page-${index}`, documentId: `doc-page-${index}`, page })],
    }));
    assert.equal(result.evidence[0].verificationStatus, "rejected");
    assert.equal(result.vehicleCandidates[0].facts["vehicle.vin"].selectedEvidenceId, null);
    assert.ok(result.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_PAGE));
  }
});

test("documentType mismatch cannot confirm technical or transactional facts", () => {
  const fakeCoc = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "ad-1", documentType: "vehicle_ad" })],
    evidence: [ev({
      evidenceId: "fake-coc-co2",
      documentId: "ad-1",
      documentType: "coc",
      field: "vehicle.co2Wltp",
      normalizedValue: 140,
      valueType: "number",
      unit: "g/km",
      sourceType: "official_document",
      verificationStatus: "confirmed_official",
    })],
  }));
  assert.equal(fakeCoc.evidence[0].verificationStatus, "rejected");
  assert.equal(fakeCoc.vehicleCandidates[0].facts["vehicle.co2Wltp"].status, "missing");
  assert.ok(fakeCoc.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DOCUMENT_TYPE_MISMATCH));

  const fakeContract = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "invoice-1", documentType: "invoice" })],
    evidence: [ev({
      evidenceId: "fake-contract-type",
      documentId: "invoice-1",
      documentType: "private_sale_contract",
      field: "transaction.documentType",
      normalizedValue: "private_sale_contract",
      sourceType: "contractual_document",
      verificationStatus: "confirmed_official",
    })],
  }));
  assert.equal(fakeContract.evidence[0].verificationStatus, "rejected");
  assert.equal(fakeContract.facts["transaction.documentType"].status, "missing");
  assert.ok(fakeContract.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DOCUMENT_TYPE_MISMATCH));
});

test("matching documentType continues to confirm and rejected high priority cannot beat lower valid evidence", () => {
  const matching = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "coc-1", documentType: "coc" })],
    evidence: [ev({ evidenceId: "valid-coc-vin", documentId: "coc-1", documentType: "coc" })],
  }));
  assert.equal(matching.evidence[0].verificationStatus, "confirmed_official");
  assert.equal(matching.vehicleCandidates[0].facts["vehicle.vin"].selectedEvidenceId, "valid-coc-vin");

  const result = buildVehicleTaxCaseFile(caseInput({
    documents: [doc({ documentId: "ad-1", documentType: "vehicle_ad" }), doc({ documentId: "user-1", documentType: "user_declaration" })],
    evidence: [
      ev({ evidenceId: "fake-high", documentId: "ad-1", documentType: "coc", field: "vehicle.co2Wltp", normalizedValue: 111, valueType: "number", unit: "g/km", verificationStatus: "confirmed_official", sourceType: "official_document" }),
      ev({ evidenceId: "valid-low", documentId: "user-1", documentType: "user_declaration", field: "vehicle.co2Wltp", normalizedValue: 155, valueType: "number", unit: "g/km", verificationStatus: "confirmed_user", sourceType: "user_declaration" }),
    ],
  }));
  assert.equal(result.evidence.find((item) => item.evidenceId === "fake-high").verificationStatus, "rejected");
  assert.equal(result.vehicleCandidates[0].facts["vehicle.co2Wltp"].selectedEvidenceId, "valid-low");
});

test("documentType mismatch does not mutate document or input", () => {
  const input = caseInput({
    documents: [doc({ documentId: "ad-1", documentType: "vehicle_ad" })],
    evidence: [ev({ evidenceId: "fake-coc", documentId: "ad-1", documentType: "coc" })],
  });
  const before = JSON.stringify(input);
  const result = buildVehicleTaxCaseFile(input);
  assert.equal(JSON.stringify(input), before);
  assert.equal(result.documents[0].documentType, "vehicle_ad");
  assert.equal(result.evidence[0].documentType, "coc");
  assert.equal(result.evidence[0].verificationStatus, "rejected");
});

test("schemaVersion warning is emitted exactly once for absent null and invalid versions", () => {
  for (const schemaVersion of [undefined, null, "wrong.version"]) {
    const input = caseInput({ schemaVersion });
    if (schemaVersion === undefined) delete input.schemaVersion;
    const result = buildVehicleTaxCaseFile(input);
    assert.equal(result.schemaVersion, VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION);
    assert.equal(result.warningCodes.filter((code) => code === VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SCHEMA_VERSION).length, 1);
  }
  const valid = buildVehicleTaxCaseFile(caseInput());
  assert.equal(valid.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SCHEMA_VERSION), false);
});

test("case timestamps warn when invalid or created after updated without swapping values", () => {
  const earlier = buildVehicleTaxCaseFile(caseInput({ createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-02T00:00:00.000Z" }));
  assert.equal(earlier.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_TIMESTAMPS), false);

  const equal = buildVehicleTaxCaseFile(caseInput({ createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" }));
  assert.equal(equal.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_TIMESTAMPS), false);

  const posterior = buildVehicleTaxCaseFile(caseInput({ createdAt: "2026-01-03T00:00:00.000Z", updatedAt: "2026-01-02T00:00:00.000Z" }));
  assert.equal(posterior.createdAt, "2026-01-03T00:00:00.000Z");
  assert.equal(posterior.updatedAt, "2026-01-02T00:00:00.000Z");
  assert.ok(posterior.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_TIMESTAMPS));

  const invalid = buildVehicleTaxCaseFile(caseInput({ createdAt: "not-a-date", updatedAt: "2026-01-02T00:00:00.000Z" }));
  assert.equal(invalid.createdAt, null);
  assert.ok(invalid.warningCodes.includes(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_TIMESTAMPS));
});

test("warning code runtime catalog is unique and has messages", () => {
  const codes = Object.values(VEHICLE_TAX_CASE_FILE_WARNING_CODES);
  assert.equal(new Set(codes).size, codes.length);
  assert.ok(codes.includes("INVALID_EVIDENCE_PAGE"));
  assert.ok(codes.includes("INVALID_CASE_TIMESTAMPS"));
});
