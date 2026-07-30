import assert from "node:assert/strict";
import test from "node:test";

import { VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION } from "../data/vehicleTaxCaseFileCatalogs.mjs";
import { buildVehicleTaxCaseFile } from "./vehicleTaxCaseFile.mjs";
import {
  VEHICLE_TAX_OPERATION_CLASSIFICATION_SCHEMA_VERSION,
  VEHICLE_TAX_OPERATION_CONFLICT_TYPES,
  VEHICLE_TAX_OPERATION_WARNING_CODES,
  classifyVehicleTaxOperation,
} from "./vehicleTaxOperationClassifier.mjs";

const OUTPUT_KEYS = [
  "schemaVersion",
  "caseId",
  "status",
  "sellerType",
  "sellerTypeStatus",
  "buyerType",
  "buyerTypeStatus",
  "documentType",
  "documentTypeStatus",
  "vatRegime",
  "vatRegimeStatus",
  "vatItemizedStatus",
  "vatItemizedStatusCertainty",
  "rebuStatus",
  "rebuStatusCertainty",
  "intendedForResale",
  "intendedForResaleStatus",
  "buyerTaxResidenceCountry",
  "buyerTaxResidenceCountryStatus",
  "sellerCountry",
  "sellerCountryStatus",
  "evidenceIds",
  "selectedEvidence",
  "conflicts",
  "scenarios",
  "transferTaxClassification",
  "legalBasis",
  "assumptions",
  "warnings",
  "warningCodes",
  "missingFields",
];

function doc(overrides = {}) {
  return {
    documentId: "doc-invoice",
    documentType: "invoice",
    filename: "document.pdf",
    language: "DE",
    country: "DE",
    issueDate: "2026-01-10",
    issuer: "seller",
    pageCount: 2,
    contentHash: "sha256:classifier-fixture",
    extractionStatus: "verified",
    uploadedAt: "2026-01-11T10:00:00.000Z",
    containsPersonalData: false,
    warnings: [],
    ...overrides,
  };
}

function ev(overrides = {}) {
  return {
    evidenceId: "ev-1",
    documentId: "doc-invoice",
    vehicleCandidateId: "vehicle-1",
    field: "transaction.documentType",
    documentType: "invoice",
    page: 1,
    fieldLabel: "document type",
    sourceExcerpt: "invoice",
    normalizedValue: "invoice",
    valueType: "enum",
    unit: null,
    sourceType: "contractual_document",
    confidence: 0.9,
    extractionMethod: "manual",
    verifiedBy: "reviewer",
    verificationStatus: "confirmed_professional",
    notes: null,
    ...overrides,
  };
}

function operationEvidence(overrides = {}) {
  return [
    ev({ evidenceId: "ev-doc", field: "transaction.documentType", normalizedValue: "invoice", sourceExcerpt: "Rechnung", ...overrides.doc }),
    ev({ evidenceId: "ev-seller", field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: "professional seller", ...overrides.seller }),
    ev({ evidenceId: "ev-buyer", field: "transaction.buyerType", normalizedValue: "private", sourceExcerpt: "private buyer", documentId: "doc-user", documentType: "user_declaration", sourceType: "user_declaration", verificationStatus: "confirmed_user", ...overrides.buyer }),
    ev({ evidenceId: "ev-resale", field: "transaction.intendedForResale", normalizedValue: false, sourceExcerpt: "not for resale", documentId: "doc-user", documentType: "user_declaration", sourceType: "user_declaration", verificationStatus: "confirmed_user", valueType: "boolean", ...overrides.resale }),
    ev({ evidenceId: "ev-buyer-country", field: "parties.buyerTaxResidenceCountry", normalizedValue: "ES", sourceExcerpt: "buyer residence ES", documentId: "doc-user", documentType: "user_declaration", sourceType: "user_declaration", verificationStatus: "confirmed_user", valueType: "country", ...overrides.buyerCountry }),
    ev({ evidenceId: "ev-seller-country", field: "parties.sellerCountry", normalizedValue: "DE", sourceExcerpt: "seller country DE", valueType: "country", ...overrides.sellerCountry }),
  ];
}

function makeCase({ documents = null, evidence = [], assumptions = [] } = {}) {
  return buildVehicleTaxCaseFile({
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId: "case-classifier-1",
    createdAt: "2026-01-11T10:00:00.000Z",
    updatedAt: "2026-01-12T10:00:00.000Z",
    documents: documents ?? [
      doc(),
      doc({ documentId: "doc-user", documentType: "user_declaration", sourceType: "user_declaration" }),
    ],
    evidence,
    selectedVehicleCandidateId: null,
    assumptions,
  });
}

function classifyWithEvidence(extraEvidence = [], options = {}) {
  return classifyVehicleTaxOperation(makeCase({
    ...options,
    evidence: [...operationEvidence(options.overrides ?? {}), ...extraEvidence],
  }));
}

function conflictTypes(result) {
  return result.conflicts.map((item) => item.type).sort();
}

function assertNoPrivateDataLeak(result) {
  const json = JSON.stringify(result);
  assert.equal(json.includes("SOURCE_EXCERPT_FAKE_PERSON"), false);
  assert.equal(json.includes("IBAN_SAMPLE_REDACTED"), false);
  assert.equal(json.includes("VIN_SAMPLE_REDACTED"), false);
  assert.equal(json.includes("sample@example.invalid"), false);
}
test("returns exact public shape for an empty structured case file", () => {
  const result = classifyVehicleTaxOperation(makeCase());
  assert.deepEqual(Object.keys(result), OUTPUT_KEYS);
  assert.equal(result.schemaVersion, VEHICLE_TAX_OPERATION_CLASSIFICATION_SCHEMA_VERSION);
  assert.equal(result.caseId, "case-classifier-1");
  assert.equal(JSON.parse(JSON.stringify(result)).schemaVersion, result.schemaVersion);
});

test("handles null input as invalid", () => {
  const result = classifyVehicleTaxOperation(null);
  assert.equal(result.status, "invalid");
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_OPERATION_WARNING_CODES.INVALID_CLASSIFIER_INPUT), true);
});

test("handles array input as invalid", () => {
  const result = classifyVehicleTaxOperation([]);
  assert.equal(result.status, "invalid");
  assert.equal(result.sellerTypeStatus, "invalid");
});

test("rejects incompatible case file schema", () => {
  const result = classifyVehicleTaxOperation({ schemaVersion: "different", caseId: "case-schema" });
  assert.equal(result.status, "invalid");
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_OPERATION_WARNING_CODES.INCOMPATIBLE_CASE_FILE_SCHEMA), true);
});

test("classifies professional invoice without guessing VAT", () => {
  const result = classifyWithEvidence();
  assert.equal(result.sellerType, "professional");
  assert.equal(result.documentType, "invoice");
  assert.equal(result.vatRegime, "unknown");
  assert.equal(result.transferTaxClassification.sellerType, "professional");
});

test("transfer patch contains only the fiscal-operation classification fields", () => {
  const result = classifyWithEvidence();
  assert.deepEqual(Object.keys(result.transferTaxClassification).sort(), [
    "buyerTaxResidenceCountry",
    "buyerType",
    "documentType",
    "intendedForResale",
    "sellerCountry",
    "sellerType",
    "vatRegime",
  ].sort());
});

test("private sale contract makes VAT not applicable and rejects REBU", () => {
  const result = classifyWithEvidence([], {
    documents: [doc({ documentId: "doc-contract", documentType: "private_sale_contract" }), doc({ documentId: "doc-user", documentType: "user_declaration" })],
    overrides: {
      doc: { documentId: "doc-contract", documentType: "private_sale_contract", normalizedValue: "private_sale_contract", sourceExcerpt: "private sale contract" },
      seller: { documentId: "doc-contract", documentType: "private_sale_contract", normalizedValue: "private", sourceExcerpt: "private transferor" },
      sellerCountry: { documentId: "doc-contract", documentType: "private_sale_contract" },
    },
  });
  assert.equal(result.sellerType, "private");
  assert.equal(result.documentType, "private_sale_contract");
  assert.equal(result.vatRegime, "not_applicable_private_sale");
  assert.equal(result.rebuStatus, "rejected");
});

test("valid invoice literal confirms REBU", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung nach 25a UStG", documentType: "invoice" }),
  ]);
  assert.equal(result.vatRegime, "rebu");
  assert.equal(result.rebuStatus, "confirmed");
  assert.equal(result.rebuStatusCertainty, "confirmed");
});

test("structured REBU fact confirms REBU", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-fact", field: "transaction.vatRegime", normalizedValue: "rebu", sourceExcerpt: "regimen especial de bienes usados" }),
  ]);
  assert.equal(result.vatRegime, "rebu");
  assert.equal(result.rebuStatus, "confirmed");
});

test("structured rebuStatus confirmation confirms REBU", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-status", field: "transaction.rebuStatus", normalizedValue: "confirmed", sourceExcerpt: "REBU confirmed on invoice" }),
  ]);
  assert.equal(result.rebuStatus, "confirmed");
  assert.equal(result.vatRegime, "rebu");
});


test("structured vatRegime REBU fact confirms rebuStatus without relying on literal text", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-no-literal", field: "transaction.vatRegime", normalizedValue: "rebu", sourceExcerpt: "structured VAT regime field" }),
  ]);
  assert.equal(result.vatRegime, "rebu");
  assert.equal(result.rebuStatus, "confirmed");
});

test("structured REBU and general VAT contradiction creates VAT conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-general-vat", field: "transaction.vatRegime", normalizedValue: "general_vat", sourceExcerpt: "structured VAT field" }),
    ev({ evidenceId: "ev-rebu-status-conflict", field: "transaction.rebuStatus", normalizedValue: "confirmed", sourceExcerpt: "structured status confirmed" }),
  ]);
  assert.equal(result.vatRegime, "unknown");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT), true);
});test("negative REBU literal does not confirm REBU", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-not-rebu", field: "transaction.rebuStatus", normalizedValue: "unknown", sourceExcerpt: "keine Differenzbesteuerung" }),
  ]);
  assert.notEqual(result.vatRegime, "rebu");
  assert.notEqual(result.rebuStatus, "confirmed");
});

test("positive and negative REBU evidence creates conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-positive", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung nach 25a UStG" }),
    ev({ evidenceId: "ev-rebu-negative", field: "transaction.rebuStatus", normalizedValue: "unknown", sourceExcerpt: "keine Differenzbesteuerung" }),
  ]);
  assert.equal(result.vatRegime, "unknown");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), true);
});

test("Mehrwertsteuer nicht ausweisbar never confirms REBU", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-no-mwst", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "Mehrwertsteuer nicht ausweisbar" }),
  ]);
  assert.equal(result.vatItemizedStatus, "not_itemized");
  assert.equal(result.vatRegime, "vat_not_itemized");
  assert.equal(result.rebuStatus, "unknown");
});

test("itemized VAT literal on invoice confirms general VAT", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-mwst", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "MwSt ausweisbar" }),
  ]);
  assert.equal(result.vatItemizedStatus, "itemized");
  assert.equal(result.vatRegime, "general_vat");
});

test("ad-only VAT wording does not confirm general VAT", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-ad-vat", documentId: "doc-ad", documentType: "vehicle_ad", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "MwSt ausweisbar", sourceType: "vehicle_ad" }),
  ], { documents: [doc(), doc({ documentId: "doc-user", documentType: "user_declaration" }), doc({ documentId: "doc-ad", documentType: "vehicle_ad" })] });
  assert.equal(result.vatRegime, "unknown");
});

test("inkl MwSt does not confirm general VAT", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-inkl", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Preis inkl MwSt" }),
  ]);
  assert.equal(result.vatRegime, "unknown");
});

test("Netto Export does not confirm general VAT", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-netto", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Netto Export" }),
  ]);
  assert.equal(result.vatRegime, "unknown");
});

test("intermediary wording creates unresolved seller scenario", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-intermediary", field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: "Verkauf im Kundenauftrag" }),
  ]);
  assert.equal(result.sellerType, "unknown");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), true);
});

test("negative intermediary wording does not create intermediary conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-not-intermediary", field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: "nicht im Kundenauftrag" }),
  ]);
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), false);
});

test("invoice and private contract coexistence creates document conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-contract-doc", documentId: "doc-contract", documentType: "private_sale_contract", field: "transaction.documentType", normalizedValue: "private_sale_contract", sourceExcerpt: "private sale contract" }),
  ], { documents: [doc(), doc({ documentId: "doc-user", documentType: "user_declaration" }), doc({ documentId: "doc-contract", documentType: "private_sale_contract" })] });
  assert.equal(result.documentType, "unknown");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.DOCUMENT_TYPE_CONFLICT), true);
});test("rejected evidence cannot support selected classification", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rejected-rebu", field: "transaction.vatRegime", normalizedValue: "rebu", sourceExcerpt: "REBU", verificationStatus: "rejected" }),
  ]);
  assert.notEqual(result.vatRegime, "rebu");
  assert.equal(result.evidenceIds.includes("ev-rejected-rebu"), false);
});

test("evidence with impossible page is rejected before classification", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-page-rebu", field: "transaction.vatRegime", normalizedValue: "rebu", sourceExcerpt: "REBU", page: 99 }),
  ]);
  assert.notEqual(result.vatRegime, "rebu");
  assert.equal(result.evidenceIds.includes("ev-page-rebu"), false);
});

test("document type mismatch evidence is ignored", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-mismatch", documentId: "doc-invoice", documentType: "private_sale_contract", field: "transaction.documentType", normalizedValue: "private_sale_contract", sourceExcerpt: "private sale contract" }),
  ]);
  assert.equal(result.documentType, "invoice");
  assert.equal(result.evidenceIds.includes("ev-mismatch"), false);
});

test("broken document reference evidence is ignored", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-broken", documentId: "missing-doc", field: "transaction.vatRegime", normalizedValue: "rebu", sourceExcerpt: "REBU" }),
  ]);
  assert.notEqual(result.vatRegime, "rebu");
  assert.equal(result.evidenceIds.includes("ev-broken"), false);
});

test("private seller is not inferred from absence of VAT", () => {
  const result = classifyVehicleTaxOperation(makeCase({
    evidence: [
      ev({ evidenceId: "ev-doc-only", field: "transaction.documentType", normalizedValue: "invoice", sourceExcerpt: "invoice" }),
      ev({ evidenceId: "ev-no-vat", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "Mehrwertsteuer nicht ausweisbar" }),
    ],
  }));
  assert.equal(result.sellerType, "unknown");
});

test("invoice alone does not confirm professional seller", () => {
  const result = classifyVehicleTaxOperation(makeCase({
    evidence: [ev({ evidenceId: "ev-doc-alone", field: "transaction.documentType", normalizedValue: "invoice", sourceExcerpt: "invoice" })],
  }));
  assert.equal(result.documentType, "invoice");
  assert.equal(result.sellerType, "unknown");
});

test("professional seller fact confirmed by contractual evidence is accepted", () => {
  const result = classifyWithEvidence();
  assert.equal(result.sellerType, "professional");
  assert.equal(result.sellerTypeStatus, "confirmed");
});

test("probable fact status remains probable", () => {
  const result = classifyWithEvidence([], { overrides: { buyer: { verificationStatus: "confirmed_user" } } });
  assert.equal(result.buyerType, "private");
  assert.equal(result.buyerTypeStatus, "probable");
});

test("inferred fact status remains inferred", () => {
  const result = classifyWithEvidence([], { overrides: { buyer: { verificationStatus: "inferred" } } });
  assert.equal(result.buyerType, "private");
  assert.equal(result.buyerTypeStatus, "inferred");
});

test("buyer company is not converted into vehicle reseller automatically", () => {
  const result = classifyWithEvidence([], { overrides: { buyer: { normalizedValue: "professional", sourceExcerpt: "buyer company" }, resale: { normalizedValue: "unknown", valueType: "enum" } } });
  assert.equal(result.buyerType, "professional");
  assert.equal(result.intendedForResale, "unknown");
});

test("vehicle reseller without resale intent creates eligibility conflict", () => {
  const result = classifyWithEvidence([], { overrides: { buyer: { normalizedValue: "vehicle_reseller", sourceExcerpt: "buyer dealer" }, resale: { normalizedValue: false } } });
  assert.equal(result.buyerType, "unknown");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.RESALE_ELIGIBILITY_CONFLICT), true);
});

test("vehicle reseller with resale intent is accepted", () => {
  const result = classifyWithEvidence([], { overrides: { buyer: { normalizedValue: "vehicle_reseller" }, resale: { normalizedValue: true, sourceExcerpt: "resale intent confirmed" } } });
  assert.equal(result.buyerType, "vehicle_reseller");
  assert.equal(result.intendedForResale, true);
});

test("tax residence alternatives create conflict and scenarios", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-buyer-country-fr", documentId: "doc-user", documentType: "user_declaration", field: "parties.buyerTaxResidenceCountry", normalizedValue: "FR", sourceExcerpt: "buyer residence FR", sourceType: "user_declaration", verificationStatus: "confirmed_user" }),
  ]);
  assert.equal(result.buyerTaxResidenceCountry, null);
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.TAX_RESIDENCE_CONFLICT), true);
  assert.ok(result.scenarios.some((item) => item.classificationPatch.buyerTaxResidenceCountry === "FR"));
});

test("multiple vehicle candidates without selection keeps identity conflict", () => {
  const built = makeCase();
  built.vehicleCandidates = [
    { vehicleCandidateId: "vehicle-1", status: "ready", documentIds: [], evidenceIds: [], facts: {}, conflicts: [], assumptions: [], warnings: [] },
    { vehicleCandidateId: "vehicle-2", status: "ready", documentIds: [], evidenceIds: [], facts: {}, conflicts: [], assumptions: [], warnings: [] },
  ];
  built.selectedVehicleCandidateId = null;
  const result = classifyVehicleTaxOperation(built);
  assert.equal(result.status, "identity_conflict");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.IDENTITY_CONFLICT), true);
});

test("case file identity warning keeps top-level identity conflict", () => {
  const built = makeCase();
  built.warningCodes = ["IDENTITY_CONFLICT"];
  const result = classifyVehicleTaxOperation(built);
  assert.equal(result.status, "identity_conflict");
});

test("circular input is handled defensively", () => {
  const built = makeCase();
  built.self = built;
  const result = classifyVehicleTaxOperation(built);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_OPERATION_WARNING_CODES.NON_SERIALIZABLE_CLASSIFIER_INPUT), true);
});

test("Date, Map and Set inputs are warned as non serializable", () => {
  const built = makeCase();
  built.extraDate = new Date("2026-01-01T00:00:00.000Z");
  built.extraMap = new Map();
  built.extraSet = new Set();
  const result = classifyVehicleTaxOperation(built);
  assert.equal(result.warningCodes.includes(VEHICLE_TAX_OPERATION_WARNING_CODES.NON_SERIALIZABLE_CLASSIFIER_INPUT), true);
});

test("output references are defensively cloned", () => {
  const result = classifyWithEvidence();
  result.legalBasis[0].title = "mutated";
  result.transferTaxClassification.sellerType = "private";
  const again = classifyWithEvidence();
  assert.notEqual(again.legalBasis[0].title, "mutated");
  assert.equal(again.transferTaxClassification.sellerType, "professional");
});

test("classifier does not mutate the case file", () => {
  const built = makeCase({ evidence: operationEvidence() });
  const before = JSON.stringify(built);
  classifyVehicleTaxOperation(built);
  assert.equal(JSON.stringify(built), before);
});

test("selected evidence never includes source excerpts", () => {
  const result = classifyWithEvidence();
  assert.ok(result.selectedEvidence.length > 0);
  assert.equal(Object.hasOwn(result.selectedEvidence[0], "sourceExcerpt"), false);
});

test("privacy-sensitive source text is not leaked", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-private-text", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "SOURCE_EXCERPT_FAKE_PERSON sample@example.invalid IBAN_SAMPLE_REDACTED VIN_SAMPLE_REDACTED Mehrwertsteuer nicht ausweisbar" }),
  ]);
  assertNoPrivateDataLeak(result);
});

test("legal basis is structured and cloneable", () => {
  const result = classifyWithEvidence();
  assert.ok(result.legalBasis.every((item) => typeof item.id === "string" && typeof item.title === "string" && typeof item.url === "string"));
  assert.equal(JSON.parse(JSON.stringify(result.legalBasis)).length, result.legalBasis.length);
});
test("ad-only seller fact remains unresolved", () => {
  const result = classifyVehicleTaxOperation(makeCase({
    documents: [doc({ documentId: "doc-ad", documentType: "vehicle_ad" })],
    evidence: [ev({ evidenceId: "ev-ad-seller", documentId: "doc-ad", documentType: "vehicle_ad", field: "transaction.sellerType", normalizedValue: "private", sourceExcerpt: "private seller", sourceType: "vehicle_ad", verificationStatus: "confirmed_professional" })],
  }));
  assert.equal(result.sellerType, "unknown");
  assert.equal(result.sellerTypeStatus, "missing");
});

test("identity conflict does not create seller unknown scenarios from candidate evidence", () => {
  const built = buildVehicleTaxCaseFile({
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId: "case-candidates",
    documents: [doc({ documentId: "doc-c1" }), doc({ documentId: "doc-c2" })],
    vehicleCandidates: [
      { vehicleCandidateId: "vehicle-1" },
      { vehicleCandidateId: "vehicle-2" },
    ],
    evidence: [
      ev({ evidenceId: "ev-c1-rebu", documentId: "doc-c1", vehicleCandidateId: "vehicle-1", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "REBU" }),
      ev({ evidenceId: "ev-c2-vat", documentId: "doc-c2", vehicleCandidateId: "vehicle-2", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "MwSt ausweisbar" }),
    ],
    selectedVehicleCandidateId: null,
  });
  const result = classifyVehicleTaxOperation(built);
  assert.equal(result.status, "identity_conflict");
  assert.equal(result.evidenceIds.includes("ev-c1-rebu"), false);
  assert.equal(result.evidenceIds.includes("ev-c2-vat"), false);
  assert.equal(result.scenarios.some((item) => item.label === "Seller is private"), false);
});

test("fact conflict produces canonical conflict and scenarios", () => {
  const built = buildVehicleTaxCaseFile({
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId: "case-fact-conflict",
    documents: [doc({ documentId: "doc-invoice" }), doc({ documentId: "doc-contract", documentType: "private_sale_contract" })],
    evidence: [
      ev({ evidenceId: "ev-invoice-doc", documentId: "doc-invoice", documentType: "invoice", field: "transaction.documentType", normalizedValue: "invoice" }),
      ev({ evidenceId: "ev-contract-doc", documentId: "doc-contract", documentType: "private_sale_contract", field: "transaction.documentType", normalizedValue: "private_sale_contract", sourceExcerpt: "private sale contract" }),
    ],
  });
  const result = classifyVehicleTaxOperation(built);
  assert.equal(result.documentTypeStatus, "conflict");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.DOCUMENT_TYPE_CONFLICT), true);
  assert.ok(result.scenarios.every((item) => Object.hasOwn(item, "classificationPatch")));
});

test("scenario list remains deterministic and capped", () => {
  const built = makeCase();
  const resultA = classifyVehicleTaxOperation(built);
  const resultB = classifyVehicleTaxOperation(built);
  assert.deepEqual(resultA.scenarios.map((item) => item.scenarioId), resultB.scenarios.map((item) => item.scenarioId));
  assert.ok(resultA.scenarios.length <= 12);
});
test("REBU negations never confirm positive or create accepted scenario", () => {
  const phrases = [
    "kein §25a UStG",
    "kein § 25a UStG",
    "unterliegt nicht der Differenzbesteuerung",
    "keine Differenzbesteuerung",
    "nicht differenzbesteuert",
    "ohne Anwendung des §25a",
    "§25a nicht anwendbar",
    "REBU no aplicable",
    "no se aplica REBU",
    "no REBU",
    "sin aplicación de REBU",
    "no sujeto al régimen especial de bienes usados",
  ];
  for (const [index, phrase] of phrases.entries()) {
    const result = classifyWithEvidence([
      ev({ evidenceId: `ev-rebu-neg-${index}`, field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: phrase }),
    ]);
    assert.notEqual(result.vatRegime, "rebu", phrase);
    assert.notEqual(result.rebuStatus, "confirmed", phrase);
    assert.equal(result.conflicts.some((item) => item.type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), false, phrase);
    assert.equal(result.scenarios.some((item) => item.classificationPatch.vatRegime === "rebu"), false, phrase);
  }
});

test("REBU positive variants still confirm from contractual evidence", () => {
  const phrases = ["REBU", "Differenzbesteuerung", "Differenzbesteuerung gemäß § 25a UStG", "§ 25a UStG"];
  for (const [index, phrase] of phrases.entries()) {
    const result = classifyWithEvidence([
      ev({ evidenceId: `ev-rebu-pos-${index}`, field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: phrase }),
    ]);
    assert.equal(result.vatRegime, "rebu", phrase);
    assert.equal(result.rebuStatus, "confirmed", phrase);
  }
});

test("independent positive and negative REBU segments create conflict without selecting positive", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-independent", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung nach §25a UStG. Keine Differenzbesteuerung" }),
  ]);
  assert.equal(result.vatRegime, "unknown");
  assert.equal(result.vatRegimeStatus, "conflict");
  assert.equal(result.rebuStatus, "unknown");
  assert.equal(result.rebuStatusCertainty, "conflict");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), true);
});

test("VAT itemized and not itemized in same excerpt create a single VAT conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-vat-both", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "MwSt ausweisbar und Mehrwertsteuer nicht ausweisbar" }),
  ]);
  assert.equal(result.vatItemizedStatus, "unknown");
  assert.equal(result.vatItemizedStatusCertainty, "conflict");
  assert.equal(result.vatRegime, "unknown");
  assert.equal(result.vatRegimeStatus, "conflict");
  assert.equal(conflictTypes(result).filter((type) => type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT).length, 1);
  assert.equal(result.transferTaxClassification.vatRegime, "unknown");
});

test("VAT itemized and not itemized in separate evidence create a single VAT conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-vat-itemized", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "MwSt ausweisbar" }),
    ev({ evidenceId: "ev-vat-not-itemized", field: "transaction.vatItemizedStatus", normalizedValue: "unknown", sourceExcerpt: "Mehrwertsteuer nicht ausweisbar" }),
  ]);
  assert.equal(result.vatItemizedStatus, "unknown");
  assert.equal(result.vatRegime, "unknown");
  assert.equal(conflictTypes(result).filter((type) => type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT).length, 1);
});

test("VAT fact and opposite literal create VAT conflict", () => {
  const itemizedFact = classifyWithEvidence([
    ev({ evidenceId: "ev-vat-itemized-fact", field: "transaction.vatItemizedStatus", normalizedValue: "itemized", sourceExcerpt: "structured itemized fact" }),
    ev({ evidenceId: "ev-vat-not-literal", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Mehrwertsteuer nicht ausweisbar" }),
  ]);
  assert.equal(itemizedFact.vatItemizedStatus, "unknown");
  assert.equal(itemizedFact.vatRegime, "unknown");
  assert.equal(conflictTypes(itemizedFact).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT), true);

  const notItemizedFact = classifyWithEvidence([
    ev({ evidenceId: "ev-vat-not-fact", field: "transaction.vatItemizedStatus", normalizedValue: "not_itemized", sourceExcerpt: "structured not itemized fact" }),
    ev({ evidenceId: "ev-vat-itemized-literal", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "MwSt ausweisbar" }),
  ]);
  assert.equal(notItemizedFact.vatItemizedStatus, "unknown");
  assert.equal(notItemizedFact.vatRegime, "unknown");
  assert.equal(conflictTypes(notItemizedFact).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT), true);
});

test("REBU positive plus not itemized remains REBU without choosing VAT conflict", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-with-not-itemized", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung nach §25a UStG. Mehrwertsteuer nicht ausweisbar" }),
  ]);
  assert.equal(result.vatRegime, "rebu");
  assert.equal(result.rebuStatus, "confirmed");
  assert.equal(result.vatItemizedStatus, "not_itemized");
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT), false);
});

test("intermediary negations never create unresolved intermediary conflict", () => {
  const phrases = [
    "kein Kommissionsverkauf",
    "kein Verkauf im Kundenauftrag",
    "nicht im Kundenauftrag",
    "keine Vermittlung",
    "kein Kommissionsgeschäft",
    "keine Kommission",
    "ohne Vermittlung",
    "no se vende por cuenta de cliente",
    "no es intermediación",
    "sin intermediación",
  ];
  for (const [index, phrase] of phrases.entries()) {
    const result = classifyWithEvidence([
      ev({ evidenceId: `ev-intermediary-neg-${index}`, field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: phrase }),
    ]);
    assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), false, phrase);
  }
});

test("independent intermediary positive and negative signals create ambiguity", () => {
  const result = classifyWithEvidence([
    ev({ evidenceId: "ev-intermediary-mixed", field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: "Verkauf im Kundenauftrag. Kein Kommissionsverkauf" }),
  ]);
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), true);
  assert.equal(result.sellerType, "unknown");
});

test("free text from case file is never propagated to classifier output", () => {
  const privateTokens = [
    "DNI_TEST_12345678Z",
    "person@example.invalid",
    "PHONE_TEST_600123123",
    "IBAN_TEST_ES0000000000000000000000",
    "ADDRESS_TEST_MAIN_STREET_1",
    "NAME_TEST_FULL_PERSON",
    "VAT_TEST_DE123456789",
    "VIN_TEST_WBA12345678901234",
  ];
  const built = buildVehicleTaxCaseFile({
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId: "case-private-free-text",
    documents: [doc()],
    assumptions: [`assumption ${privateTokens.join(" ")}`],
    evidence: [
      ev({
        evidenceId: "ev-free-text-private",
        field: "transaction.vatRegime",
        normalizedValue: "unknown",
        sourceExcerpt: `REBU ${privateTokens.join(" ")}`,
        notes: `notes ${privateTokens.join(" ")}`,
      }),
    ],
  });
  built.warnings = [`warning ${privateTokens.join(" ")}`];
  built.conflicts = [{
    conflictId: "input-conflict",
    severity: "blocking_for_engine",
    type: "classification_conflict",
    fields: ["transaction.vatRegime"],
    vehicleCandidateIds: [],
    evidenceIds: ["ev-free-text-private"],
    description: `description ${privateTokens.join(" ")}`,
    resolutionStatus: "unresolved",
    selectedValue: null,
    selectedValueReason: `reason ${privateTokens.join(" ")}`,
    warnings: [],
  }];
  const before = JSON.stringify(built);
  const result = classifyVehicleTaxOperation(built);
  const output = JSON.stringify(result);
  for (const token of privateTokens) assert.equal(output.includes(token), false, token);
  assert.equal(result.vatRegime, "rebu");
  assert.equal(JSON.stringify(built), before);
});
function assertSingleRebuConflict(result, label, expectedEvidenceIds = null) {
  assert.equal(result.vatRegime, "unknown", label);
  assert.equal(result.vatRegimeStatus, "conflict", label);
  assert.equal(result.rebuStatus, "unknown", label);
  assert.equal(result.rebuStatusCertainty, "conflict", label);
  assert.equal(conflictTypes(result).filter((type) => type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT).length, 1, label);
  assert.equal(result.transferTaxClassification.vatRegime, "unknown", label);
  if (expectedEvidenceIds) {
    const conflict = result.conflicts.find((item) => item.type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT);
    assert.deepEqual(conflict.evidenceIds, expectedEvidenceIds, label);
  }
}

function assertRebuNegativeOnly(result, label) {
  assert.notEqual(result.vatRegime, "rebu", label);
  assert.notEqual(result.rebuStatus, "confirmed", label);
  assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), false, label);
  assert.equal(result.scenarios.some((item) => item.classificationPatch.vatRegime === "rebu"), false, label);
}

test("REBU positional spans keep independent positives inside extended clauses", () => {
  const conflictPhrases = [
    ["ev-rebu-span-aber", "Kein \u00a725a UStG fuer die vorherige Kalkulation, aber diese Rechnung verwendet Differenzbesteuerung nach \u00a725a UStG"],
    ["ev-rebu-span-pero", "No REBU para la tasacion previa, pero esta factura aplica regimen especial de bienes usados"],
    ["ev-rebu-span-comma", "Kein \u00a725a UStG fuer Vorgang A, diese Rechnung verwendet Differenzbesteuerung nach \u00a725a UStG"],
    ["ev-rebu-span-pos-neg", "Differenzbesteuerung nach \u00a725a UStG, \u00a725a UStG nicht anwendbar fuer Vorgang A"],
    ["ev-rebu-span-two-25a", "Kein \u00a725a UStG fuer die vorherige Kalkulation, Rechnung nach \u00a725a UStG"],
    ["ev-rebu-span-two-diff", "Keine Differenzbesteuerung fuer Vorgang A, jetzt Differenzbesteuerung nach \u00a725a UStG"],
    ["ev-rebu-span-two-pos-one-neg", "Kein \u00a725a UStG fuer Vorgang A, REBU laut Rechnung und Differenzbesteuerung nach \u00a725a UStG"],
    ["ev-rebu-span-two-neg-one-pos", "Kein \u00a725a UStG fuer Vorgang A, REBU no aplicable para presupuesto previo, Differenzbesteuerung nach \u00a725a UStG"],
  ];

  for (const [evidenceId, sourceExcerpt] of conflictPhrases) {
    const result = classifyWithEvidence([
      ev({ evidenceId, field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt }),
    ]);
    assertSingleRebuConflict(result, sourceExcerpt, [evidenceId]);
    const repeated = classifyWithEvidence([
      ev({ evidenceId, field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt }),
    ]);
    assert.deepEqual(result.conflicts.map((item) => item.conflictId), repeated.conflicts.map((item) => item.conflictId), sourceExcerpt);
  }
});

test("REBU positional spans preserve isolated negative and positive classifications", () => {
  const negativeOnly = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-span-negative-only", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Kein \u00a725a UStG fuer die vorherige Kalkulation mit langem Text aber ohne steuerliche Signalwirkung danach" }),
  ]);
  assertRebuNegativeOnly(negativeOnly, "negative only");

  const positiveOnly = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-span-positive-only", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung nach \u00a725a UStG" }),
  ]);
  assert.equal(positiveOnly.vatRegime, "rebu");
  assert.equal(positiveOnly.rebuStatus, "confirmed");

  const newlineNegative = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-span-newline-negative", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "kein\n\u00a725a UStG" }),
  ]);
  assertRebuNegativeOnly(newlineNegative, "newline negative");

  const separateEvidence = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-span-separate-positive", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung nach \u00a725a UStG" }),
    ev({ evidenceId: "ev-rebu-span-separate-negative", field: "transaction.rebuStatus", normalizedValue: "unknown", sourceExcerpt: "kein \u00a725a UStG" }),
  ]);
  assertSingleRebuConflict(separateEvidence, "separate evidence", ["ev-rebu-span-separate-negative", "ev-rebu-span-separate-positive"]);

  const transitionWithoutPositive = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-span-transition-only", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Kein \u00a725a UStG fuer Vorgang A, aber die Rechnung enthaelt nur Fahrzeugdaten" }),
  ]);
  assertRebuNegativeOnly(transitionWithoutPositive, "transition without positive");

  const twoPositives = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-span-two-positive", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "REBU laut Rechnung, Differenzbesteuerung nach \u00a725a UStG" }),
  ]);
  assert.equal(twoPositives.vatRegime, "rebu");
  assert.equal(twoPositives.rebuStatus, "confirmed");
});

test("intermediary positional spans do not let local negations hide independent positives", () => {
  const mixedPhrases = [
    "Kein Kommissionsverkauf fuer Vorgang A, aber Verkauf im Kundenauftrag fuer diesen Vorgang.",
    "Keine Vermittlung vorher, aber jetzt Vermittlung.",
  ];
  for (const [index, sourceExcerpt] of mixedPhrases.entries()) {
    const result = classifyWithEvidence([
      ev({ evidenceId: `ev-intermediary-span-mixed-${index}`, field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt }),
    ]);
    assert.equal(conflictTypes(result).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), true, sourceExcerpt);
    assert.equal(result.sellerType, "unknown", sourceExcerpt);
  }

  const negative = classifyWithEvidence([
    ev({ evidenceId: "ev-intermediary-span-negative", field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: "Kein Kommissionsverkauf" }),
  ]);
  assert.equal(conflictTypes(negative).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), false);

  const positive = classifyWithEvidence([
    ev({ evidenceId: "ev-intermediary-span-positive", field: "transaction.sellerType", normalizedValue: "professional", sourceExcerpt: "Verkauf im Kundenauftrag" }),
  ]);
  assert.equal(conflictTypes(positive).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED), true);
});
test("REBU negation scope covers soft separators before or after the concept", () => {
  const phrases = [
    "kein\n\u00a725a UStG",
    "kein\r\n\u00a725a UStG",
    "kein\t\u00a725a UStG",
    "kein   \u00a725a UStG",
    "kein:\n\u00a725a UStG",
    "kein \u2013 \u00a725a UStG",
    "kein (\u00a725a UStG)",
    "keine\nDifferenzbesteuerung",
    "unterliegt nicht der\nDifferenzbesteuerung",
    "ohne Anwendung des\n\u00a725a",
    "no\nREBU",
    "no se aplica\nREBU",
    "sin aplicaci\u00f3n de\nREBU",
    "REBU\nno aplicable",
    "\u00a725a UStG\nnicht anwendbar",
    "r\u00e9gimen especial de bienes usados\nno aplicable",
    "Differenzbesteuerung\nnicht anwendbar",
  ];
  for (const [index, phrase] of phrases.entries()) {
    const result = classifyWithEvidence([
      ev({ evidenceId: `ev-rebu-soft-neg-${index}`, field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: phrase }),
    ]);
    assert.notEqual(result.vatRegime, "rebu", phrase);
    assert.notEqual(result.rebuStatus, "confirmed", phrase);
    assert.equal(result.conflicts.some((item) => item.type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), false, phrase);
    assert.equal(result.scenarios.some((item) => item.classificationPatch.vatRegime === "rebu"), false, phrase);
  }
});

test("REBU independent positive and negative clauses still conflict", () => {
  const negThenPos = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-neg-then-pos", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Kein \u00a725a UStG. Sp\u00e4ter: Differenzbesteuerung gem\u00e4\u00df \u00a725a UStG" }),
  ]);
  assert.equal(negThenPos.vatRegime, "unknown");
  assert.equal(negThenPos.rebuStatus, "unknown");
  assert.equal(conflictTypes(negThenPos).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), true);

  const posThenNeg = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-pos-then-neg", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung gem\u00e4\u00df \u00a725a UStG. Kein \u00a725a UStG" }),
  ]);
  assert.equal(posThenNeg.vatRegime, "unknown");
  assert.equal(posThenNeg.rebuStatus, "unknown");
  assert.equal(conflictTypes(posThenNeg).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), true);
});

test("REBU independent evidence keeps conflict, double negative stays negative and positive still confirms", () => {
  const separateEvidence = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-independent-positive", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung gem\u00e4\u00df \u00a725a UStG" }),
    ev({ evidenceId: "ev-rebu-independent-negative", field: "transaction.rebuStatus", normalizedValue: "unknown", sourceExcerpt: "kein\n\u00a725a UStG" }),
  ]);
  assert.equal(separateEvidence.vatRegime, "unknown");
  assert.equal(conflictTypes(separateEvidence).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), true);

  const doubleNegative = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-double-negative", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "kein\n\u00a725a UStG. Keine Differenzbesteuerung" }),
  ]);
  assert.notEqual(doubleNegative.vatRegime, "rebu");
  assert.notEqual(doubleNegative.rebuStatus, "confirmed");
  assert.equal(conflictTypes(doubleNegative).includes(VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT), false);
  assert.equal(doubleNegative.scenarios.some((item) => item.classificationPatch.vatRegime === "rebu"), false);

  const positive = classifyWithEvidence([
    ev({ evidenceId: "ev-rebu-valid-positive-after-soft-fix", field: "transaction.vatRegime", normalizedValue: "unknown", sourceExcerpt: "Differenzbesteuerung gem\u00e4\u00df \u00a725a UStG" }),
  ]);
  assert.equal(positive.vatRegime, "rebu");
  assert.equal(positive.rebuStatus, "confirmed");
});
