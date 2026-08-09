import {
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES,
  VEHICLE_TAX_CASE_FILE_FACT_STATUSES,
  VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
  VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES,
} from "../data/vehicleTaxCaseFileCatalogs.mjs";

export const VEHICLE_TAX_OPERATION_CLASSIFICATION_SCHEMA_VERSION = "vehicle_tax_operation_classification.v1";

export const VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES = Object.freeze({
  CONFIRMED: "confirmed",
  PROBABLE: "probable",
  INFERRED: "inferred",
  SCENARIO_REQUIRED: "scenario_required",
  CONFLICT: "conflict",
  INSUFFICIENT_DATA: "insufficient_data",
  IDENTITY_CONFLICT: "identity_conflict",
  INVALID: "invalid",
});

export const VEHICLE_TAX_OPERATION_FIELD_STATUSES = Object.freeze({
  CONFIRMED: "confirmed",
  PROBABLE: "probable",
  INFERRED: "inferred",
  SCENARIO_REQUIRED: "scenario_required",
  CONFLICT: "conflict",
  MISSING: "missing",
  INVALID: "invalid",
});

export const VEHICLE_TAX_OPERATION_WARNING_CODES = Object.freeze({
  INVALID_CLASSIFIER_INPUT: "INVALID_CLASSIFIER_INPUT",
  INCOMPATIBLE_CASE_FILE_SCHEMA: "INCOMPATIBLE_CASE_FILE_SCHEMA",
  CASE_FILE_IDENTITY_CONFLICT: "CASE_FILE_IDENTITY_CONFLICT",
  SELLER_TYPE_UNRESOLVED: "SELLER_TYPE_UNRESOLVED",
  BUYER_TYPE_UNRESOLVED: "BUYER_TYPE_UNRESOLVED",
  DOCUMENT_TYPE_UNRESOLVED: "DOCUMENT_TYPE_UNRESOLVED",
  VAT_REGIME_UNRESOLVED: "VAT_REGIME_UNRESOLVED",
  REBU_NOT_CONFIRMED: "REBU_NOT_CONFIRMED",
  DOCUMENT_CLASSIFICATION_CONFLICT: "DOCUMENT_CLASSIFICATION_CONFLICT",
  INTERMEDIARY_SELLER_UNRESOLVED: "INTERMEDIARY_SELLER_UNRESOLVED",
  TAX_RESIDENCE_UNRESOLVED: "TAX_RESIDENCE_UNRESOLVED",
  RESALE_ELIGIBILITY_UNRESOLVED: "RESALE_ELIGIBILITY_UNRESOLVED",
  INVALID_EVIDENCE_REFERENCE: "INVALID_EVIDENCE_REFERENCE",
  CLASSIFICATION_SCENARIOS_TRUNCATED: "CLASSIFICATION_SCENARIOS_TRUNCATED",
  NON_SERIALIZABLE_CLASSIFIER_INPUT: "NON_SERIALIZABLE_CLASSIFIER_INPUT",
});

export const VEHICLE_TAX_OPERATION_WARNING_MESSAGES = Object.freeze({
  [VEHICLE_TAX_OPERATION_WARNING_CODES.INVALID_CLASSIFIER_INPUT]: "Classifier input is not a compatible structured vehicle tax case file.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.INCOMPATIBLE_CASE_FILE_SCHEMA]: "The case file schemaVersion is not vehicle_tax_case_file.v1.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.CASE_FILE_IDENTITY_CONFLICT]: "Vehicle identity is unresolved; operation facts are not merged across candidates.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.SELLER_TYPE_UNRESOLVED]: "Seller type requires contractual or structured confirmation.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.BUYER_TYPE_UNRESOLVED]: "Buyer type is not sufficiently supported by the case file.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_TYPE_UNRESOLVED]: "Document type is not sufficiently supported by contractual evidence.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.VAT_REGIME_UNRESOLVED]: "VAT regime cannot be confirmed from the available structured case file evidence.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.REBU_NOT_CONFIRMED]: "REBU has not been confirmed by a valid invoice or structured fact.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT]: "Documentary operation classification contains unresolved contradictions.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.INTERMEDIARY_SELLER_UNRESOLVED]: "The seller may be acting as an intermediary and needs scenario treatment.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.TAX_RESIDENCE_UNRESOLVED]: "Buyer tax residence country is unresolved.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.RESALE_ELIGIBILITY_UNRESOLVED]: "Resale intent or buyer reseller status is unresolved.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.INVALID_EVIDENCE_REFERENCE]: "One or more selected evidence references are unusable for classification.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.CLASSIFICATION_SCENARIOS_TRUNCATED]: "Classification scenarios were truncated to the deterministic maximum.",
  [VEHICLE_TAX_OPERATION_WARNING_CODES.NON_SERIALIZABLE_CLASSIFIER_INPUT]: "The input contains non JSON-serializable values and was classified defensively.",
});

export const VEHICLE_TAX_OPERATION_CONFLICT_TYPES = Object.freeze({
  SELLER_TYPE_CONFLICT: "SELLER_TYPE_CONFLICT",
  BUYER_TYPE_CONFLICT: "BUYER_TYPE_CONFLICT",
  DOCUMENT_TYPE_CONFLICT: "DOCUMENT_TYPE_CONFLICT",
  VAT_REGIME_CONFLICT: "VAT_REGIME_CONFLICT",
  REBU_EVIDENCE_CONFLICT: "REBU_EVIDENCE_CONFLICT",
  INTERMEDIARY_SELLER_UNRESOLVED: "INTERMEDIARY_SELLER_UNRESOLVED",
  TAX_RESIDENCE_CONFLICT: "TAX_RESIDENCE_CONFLICT",
  RESALE_ELIGIBILITY_CONFLICT: "RESALE_ELIGIBILITY_CONFLICT",
  IDENTITY_CONFLICT: "IDENTITY_CONFLICT",
});

const OUTPUT_KEYS = Object.freeze([
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
]);

const MAX_SCENARIOS = 12;
const UNKNOWN = "unknown";
const CONTRACTUAL_DOCUMENT_TYPES = new Set([
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.INVOICE,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PRIVATE_SALE_CONTRACT,
]);
const SELECTABILITY_WARNING_CODES = new Set([
  "UNKNOWN_DOCUMENT_REFERENCE",
  "DOCUMENT_TYPE_MISMATCH",
  "INVALID_EVIDENCE_PAGE",
  "INVALID_FIELD",
  "INVALID_EVIDENCE_VALUE",
  "DUPLICATE_EVIDENCE_ID",
]);
const FACT_FIELDS = Object.freeze({
  sellerType: "transaction.sellerType",
  buyerType: "transaction.buyerType",
  documentType: "transaction.documentType",
  vatRegime: "transaction.vatRegime",
  vatItemizedStatus: "transaction.vatItemizedStatus",
  rebuStatus: "transaction.rebuStatus",
  intendedForResale: "transaction.intendedForResale",
  buyerTaxResidenceCountry: "parties.buyerTaxResidenceCountry",
  sellerCountry: "parties.sellerCountry",
});
const VALUE_SETS = Object.freeze({
  sellerType: new Set(["private", "professional", UNKNOWN]),
  buyerType: new Set(["private", "professional", "vehicle_reseller", UNKNOWN]),
  documentType: new Set(["private_sale_contract", "invoice", UNKNOWN]),
  vatRegime: new Set(["not_applicable_private_sale", "general_vat", "rebu", "vat_not_itemized", UNKNOWN]),
  vatItemizedStatus: new Set(["itemized", "not_itemized", UNKNOWN]),
  rebuStatus: new Set(["confirmed", "rejected", UNKNOWN]),
});
const LEGAL_BASIS = Object.freeze([
  { id: "TRLITPAJD_ART_7_5", title: "Real Decreto Legislativo 1/1993, articulo 7.5", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1993-25359" },
  { id: "AEAT_IVA_TPO_VEHICLES", title: "AEAT: tributacion IVA o TPO en transmisiones de vehiculos", url: "https://sede.agenciatributaria.gob.es/" },
  { id: "AEAT_REBU", title: "AEAT: regimen especial de bienes usados", url: "https://sede.agenciatributaria.gob.es/" },
  { id: "LIVA_ART_135_136", title: "Ley 37/1992 del IVA, articulos 135 y 136", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740" },
  { id: "RD_1619_2012", title: "Real Decreto 1619/2012, obligaciones de facturacion", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696" },
  { id: "USTG_2_14_25A", title: "Umsatzsteuergesetz sections 2, 14 and 25a", url: "https://www.gesetze-im-internet.de/ustg_1980/" },
  { id: "HGB_383", title: "Handelsgesetzbuch section 383", url: "https://www.gesetze-im-internet.de/hgb/" },
  { id: "BGB_164", title: "Buergerliches Gesetzbuch section 164", url: "https://www.gesetze-im-internet.de/bgb/" },
]);
function isPlainObject(value) {
  if (!value || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0))].sort();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function warningsFromCodes(codes) {
  return uniqueStrings(codes).map((code) => VEHICLE_TAX_OPERATION_WARNING_MESSAGES[code]).filter(Boolean);
}

function addCode(codes, code) {
  if (code) codes.add(code);
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasPhrase(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}
function splitSignalSegments(value) {
  return String(value ?? "")
    .split(/[.;:\r\n]+|\s+-\s+|\s+\|\s+|\s+\/\s+/)
    .map((segment) => normalizeText(segment))
    .filter(Boolean);
}

function matchesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function detectSegmentSignal(segment, config) {
  const positive = matchesAny(segment, config.positivePatterns);
  const negative = matchesAny(segment, config.negativePatterns);
  const ambiguous = matchesAny(segment, config.ambiguousPatterns ?? []);
  if (positive && negative) return config.negativeDominates ? "negative" : "conflict";
  if (negative) return "negative";
  if (positive && !ambiguous) return "positive";
  return "none";
}

function detectTextSignal(value, config) {
  let hasPositive = false;
  let hasNegative = false;
  for (const segment of splitSignalSegments(value)) {
    const signal = detectSegmentSignal(segment, config);
    if (signal === "conflict") return "conflict";
    if (signal === "positive") hasPositive = true;
    if (signal === "negative") hasNegative = true;
  }
  if (hasPositive && hasNegative) return "conflict";
  if (hasPositive) return "positive";
  if (hasNegative) return "negative";
  return "none";
}

function collectPatternSpans(text, patterns) {
  const spans = [];
  for (const pattern of patterns) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    const regex = new RegExp(pattern.source, flags);
    let match = regex.exec(text);
    while (match) {
      spans.push({ start: match.index, end: match.index + match[0].length, text: match[0] });
      if (match[0].length === 0) regex.lastIndex += 1;
      match = regex.exec(text);
    }
  }
  return spans.sort((left, right) => left.start - right.start || left.end - right.end);
}

function spansOverlap(left, right) {
  return left.start < right.end && right.start < left.end;
}

function hasLocalAmbiguity(positive, ambiguousSpans) {
  return ambiguousSpans.some((ambiguous) => ambiguous.end <= positive.start && positive.start - ambiguous.end <= 24);
}

function detectPositionalSignal(value, config) {
  const text = normalizeText(value);
  if (!text) return "none";

  const positiveSpans = collectPatternSpans(text, config.positivePatterns);
  const negativeSpans = collectPatternSpans(text, config.negativePatterns);
  const ambiguousSpans = collectPatternSpans(text, config.ambiguousPatterns ?? []);
  const activePositiveSpans = positiveSpans.filter((positive) => (
    !negativeSpans.some((negative) => spansOverlap(positive, negative))
    && !hasLocalAmbiguity(positive, ambiguousSpans)
  ));

  if (activePositiveSpans.length > 0 && negativeSpans.length > 0) return "conflict";
  if (activePositiveSpans.length > 0) return "positive";
  if (negativeSpans.length > 0) return "negative";
  return "none";
}

const REBU_SIGNAL_CONFIG = Object.freeze({
  negativeDominates: true,
  positivePatterns: Object.freeze([
    /\brebu\b/,
    /\bregimen especial de bienes usados\b/,
    /\bdifferenz\s*besteuerung\b/,
    /\b25a(?:\s+ustg)?\b/,
  ]),
  negativePatterns: Object.freeze([
    /\bkein(?:e|er|en)?\s+(?:25a(?:\s+ustg)?|differenz\s*besteuerung|rebu|regimen especial de bienes usados)\b/,
    /\b(?:25a(?:\s+ustg)?)\s+nicht\s+anwendbar\b/,
    /\bdifferenz\s*besteuerung\s+nicht\s+anwendbar\b/,
    /\bnicht\s+differenzbesteuert\b/,
    /\bunterliegt\s+nicht\s+der\s+differenz\s*besteuerung\b/,
    /\bohne\s+anwendung\s+(?:des\s+)?(?:25a|25a\s+ustg|rebu|regimen especial de bienes usados)\b/,
    /\brebu\s+no\s+aplicable\b/,
    /\bregimen\s+especial\s+de\s+bienes\s+usados\s+no\s+aplicable\b/,
    /\bno\s+se\s+aplica\s+(?:el\s+)?rebu\b/,
    /\bno\s+rebu\b/,
    /\bsin\s+aplicacion\s+(?:de\s+)?(?:rebu|del\s+rebu|regimen especial de bienes usados)\b/,
    /\bno\s+sujeto\s+al\s+regimen\s+especial\s+de\s+bienes\s+usados\b/,
  ]),
  ambiguousPatterns: Object.freeze([
    /\bposible\b/,
    /\bposibilidad\b/,
    /\bpuede\s+aplicarse\b/,
    /\bpodria\s+aplicarse\b/,
    /\binformativo\b/,
  ]),
});

const VAT_ITEMIZATION_SIGNAL_CONFIG = Object.freeze({
  negativeDominates: false,
  positivePatterns: Object.freeze([
    /\b(?:mwst|mehrwertsteuer|umsatzsteuer)\s+ausweisbar\b/,
    /\biva\s+desglosado\b/,
    /\biva\s+repercutido\b/,
  ]),
  negativePatterns: Object.freeze([
    /\b(?:mwst|mehrwertsteuer|umsatzsteuer)\s+nicht\s+ausweisbar\b/,
    /\biva\s+no\s+desglosad[oa]\b/,
    /\biva\s+no\s+desglosable\b/,
  ]),
});

const INTERMEDIARY_SIGNAL_CONFIG = Object.freeze({
  negativeDominates: true,
  positivePatterns: Object.freeze([
    /\bim\s+kundenauftrag\b/,
    /\bverkauf\s+im\s+kundenauftrag\b/,
    /\bvermittlung\b/,
    /\bverkauf\s+im\s+namen\s+des\s+kunden\b/,
    /\bkommissionsverkauf\b/,
    /\bkommissionsgeschaft\b/,
    /\bkommission\b/,
    /\bventa\s+por\s+cuenta\s+de\s+cliente\b/,
    /\bintermediacion\b/,
  ]),
  negativePatterns: Object.freeze([
    /\bkein\s+verkauf\s+im\s+kundenauftrag\b/,
    /\bnicht\s+im\s+kundenauftrag\b/,
    /\bkeine\s+vermittlung\b/,
    /\bkein\s+kommissionsverkauf\b/,
    /\bkein\s+kommissionsgeschaft\b/,
    /\bkeine\s+kommission\b/,
    /\bohne\s+vermittlung\b/,
    /\bno\s+se\s+vende\s+por\s+cuenta\s+de\s+cliente\b/,
    /\bno\s+es\s+intermediacion\b/,
    /\bsin\s+intermediacion\b/,
  ]),
});

function normalizeEnum(value, allowed, fallback = UNKNOWN) {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase();
  return allowed.has(normalized) ? normalized : fallback;
}

function normalizeCountry(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

function normalizeBooleanOrUnknown(value) {
  if (typeof value === "boolean") return value;
  return UNKNOWN;
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (isPlainObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function deterministicId(prefix, payload) {
  const text = stableStringify(payload);
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `${prefix}_${hash.toString(16).padStart(8, "0")}`;
}

function hasNonSerializableValue(value, seen = new WeakSet(), depth = 0) {
  if (typeof value === "bigint" || typeof value === "function" || typeof value === "symbol") return true;
  if (!value || typeof value !== "object") return false;
  if (value instanceof Date || value instanceof Map || value instanceof Set) return true;
  if (seen.has(value)) return true;
  if (depth > 8) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.some((item) => hasNonSerializableValue(item, seen, depth + 1));
  if (!isPlainObject(value)) return true;
  return Object.values(value).some((item) => hasNonSerializableValue(item, seen, depth + 1));
}

function selectedCandidateScope(caseFile) {
  const candidates = Array.isArray(caseFile.vehicleCandidates) ? caseFile.vehicleCandidates : [];
  const candidateIds = new Set(candidates.map((item) => item?.vehicleCandidateId).filter((id) => typeof id === "string"));
  const selectedVehicleCandidateId = typeof caseFile.selectedVehicleCandidateId === "string" ? caseFile.selectedVehicleCandidateId : null;
  if (selectedVehicleCandidateId && candidateIds.has(selectedVehicleCandidateId)) return { mode: "selected", selectedVehicleCandidateId };
  if (candidateIds.size > 1) return { mode: "global_only", selectedVehicleCandidateId: null };
  return { mode: "all", selectedVehicleCandidateId: null };
}

function evidenceCandidateIsAllowed(item, scope) {
  if (!item.vehicleCandidateId) return true;
  if (scope.mode === "all") return true;
  return scope.mode === "selected" && item.vehicleCandidateId === scope.selectedVehicleCandidateId;
}

function buildIndexes(caseFile) {
  const documentById = new Map();
  const selectableEvidenceById = new Map();
  const allEvidenceById = new Map();
  const documents = Array.isArray(caseFile.documents) ? caseFile.documents : [];
  const evidence = Array.isArray(caseFile.evidence) ? caseFile.evidence : [];
  const scope = selectedCandidateScope(caseFile);
  for (const document of documents) {
    if (isPlainObject(document) && typeof document.documentId === "string") documentById.set(document.documentId, document);
  }
  for (const item of evidence) {
    if (!isPlainObject(item) || typeof item.evidenceId !== "string") continue;
    allEvidenceById.set(item.evidenceId, item);
    const document = item.documentId ? documentById.get(item.documentId) : null;
    const warnings = Array.isArray(item.warnings) ? item.warnings : [];
    const hasSelectabilityWarning = warnings.some((code) => SELECTABILITY_WARNING_CODES.has(code));
    const hasBrokenDocumentReference = Boolean(item.documentId && !document);
    const hasDocumentTypeMismatch = Boolean(document && item.documentType && document.documentType !== item.documentType);
    const isRejected = item.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED;
    if (!isRejected && !hasSelectabilityWarning && !hasBrokenDocumentReference && !hasDocumentTypeMismatch && evidenceCandidateIsAllowed(item, scope)) {
      selectableEvidenceById.set(item.evidenceId, item);
    }
  }
  return { documentById, selectableEvidenceById, allEvidenceById };
}

function getFact(caseFile, field) {
  if (isPlainObject(caseFile.facts) && isPlainObject(caseFile.facts[field])) return caseFile.facts[field];
  const [section, key] = field.split(".");
  if (isPlainObject(caseFile[section]) && isPlainObject(caseFile[section][key])) return caseFile[section][key];
  return null;
}

function factValue(fact) {
  if (!isPlainObject(fact)) return null;
  return fact.normalizedValue ?? fact.value ?? null;
}

function candidateEvidenceIds(fact, selectedEvidence) {
  const ids = [];
  if (isPlainObject(fact) && typeof fact.selectedEvidenceId === "string") ids.push(fact.selectedEvidenceId);
  if (Array.isArray(fact?.evidenceIds)) ids.push(...fact.evidenceIds);
  if (selectedEvidence?.evidenceId) ids.push(selectedEvidence.evidenceId);
  return uniqueStrings(ids);
}

function evidenceSelection(field, evidence, reason) {
  if (!evidence) return null;
  return {
    field,
    evidenceId: evidence.evidenceId,
    documentId: evidence.documentId ?? null,
    documentType: evidence.documentType ?? null,
    reason,
  };
}

function controlledSelectionReason(outputField, evidence) {
  if (!evidence) return "structured fact without selected evidence";
  if (CONTRACTUAL_DOCUMENT_TYPES.has(evidence.documentType)) return `${outputField} supported by contractual evidence`;
  if (evidence.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_USER) return `${outputField} supported by user-confirmed structured evidence`;
  if (evidence.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_PROFESSIONAL) return `${outputField} supported by professional structured evidence`;
  if (evidence.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_OFFICIAL) return `${outputField} supported by official structured evidence`;
  return `${outputField} supported by structured evidence`;
}

function evidenceIsAdOnly(evidence) {
  return evidence?.documentType === VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.VEHICLE_AD || evidence?.sourceType === "vehicle_ad";
}

function factEvidenceIsCompatible(outputField, evidence) {
  if (!evidence) return true;
  if (evidenceIsAdOnly(evidence) && ["sellerType", "buyerType", "documentType", "vatRegime", "vatItemizedStatus", "rebuStatus", "intendedForResale"].includes(outputField)) return false;
  if (outputField === "documentType") return CONTRACTUAL_DOCUMENT_TYPES.has(evidence.documentType) || (evidence.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.SCENARIO && evidence.field === FACT_FIELDS.documentType && CONTRACTUAL_DOCUMENT_TYPES.has(evidence.normalizedValue));
  return true;
}

function normalizeFactField(caseFile, field, outputField, indexes, warningCodes) {
  const fact = getFact(caseFile, field);
  const selectedEvidence = typeof fact?.selectedEvidenceId === "string"
    ? indexes.selectableEvidenceById.get(fact.selectedEvidenceId) ?? null
    : null;
  const selectedIdIsInvalid = typeof fact?.selectedEvidenceId === "string" && !selectedEvidence;
  if (selectedIdIsInvalid) addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.INVALID_EVIDENCE_REFERENCE);
  if (!isPlainObject(fact)) {
    return { value: outputField.includes("Country") ? null : UNKNOWN, status: "missing", evidenceIds: [], selectedEvidence: null };
  }
  const status = fact.status;
  const rawValue = factValue(fact);
  const evidenceIds = candidateEvidenceIds(fact, selectedEvidence).filter((id) => indexes.selectableEvidenceById.has(id));
  const selected = evidenceSelection(field, selectedEvidence, controlledSelectionReason(outputField, selectedEvidence));
  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INVALID) {
    return { value: outputField.includes("Country") ? null : UNKNOWN, status: "invalid", evidenceIds, selectedEvidence: null };
  }
  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFLICT) {
    return { value: outputField.includes("Country") ? null : UNKNOWN, status: "conflict", evidenceIds, selectedEvidence: selected };
  }

  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING || status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.NOT_APPLICABLE) {
    return { value: outputField.includes("Country") ? null : UNKNOWN, status: "missing", evidenceIds, selectedEvidence: null };
  }
  if ([VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED, VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE, VEHICLE_TAX_CASE_FILE_FACT_STATUSES.SCENARIO_REQUIRED].includes(status) && (!selectedEvidence || selectedIdIsInvalid || !factEvidenceIsCompatible(outputField, selectedEvidence))) {
    return { value: outputField.includes("Country") ? null : UNKNOWN, status: "missing", evidenceIds: [], selectedEvidence: null };
  }
  let value;
  if (outputField === "buyerTaxResidenceCountry" || outputField === "sellerCountry") {
    value = normalizeCountry(rawValue);
    if (!value) return { value: null, status: "missing", evidenceIds, selectedEvidence: selected };
  } else if (outputField === "intendedForResale") {
    value = normalizeBooleanOrUnknown(rawValue);
    if (value === UNKNOWN) return { value, status: "missing", evidenceIds, selectedEvidence: selected };
  } else if (outputField === "rebuStatus") {
    const mapped = rawValue === "not_confirmed" ? "rejected" : rawValue;
    value = normalizeEnum(mapped, VALUE_SETS.rebuStatus);
  } else {
    value = normalizeEnum(rawValue, VALUE_SETS[outputField]);
  }
  if (value === UNKNOWN && outputField !== "intendedForResale") return { value, status: "missing", evidenceIds, selectedEvidence: selected };
  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED) return { value, status: "confirmed", evidenceIds, selectedEvidence: selected };
  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE) return { value, status: "probable", evidenceIds, selectedEvidence: selected };
  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INFERRED) return { value, status: "inferred", evidenceIds, selectedEvidence: selected };
  if (status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.SCENARIO_REQUIRED) return { value, status: "scenario_required", evidenceIds, selectedEvidence: selected };
  return { value: outputField.includes("Country") ? null : UNKNOWN, status: "missing", evidenceIds, selectedEvidence: null };
}
function selectableContractualEvidence(indexes, documentType = null) {
  return [...indexes.selectableEvidenceById.values()]
    .filter((item) => CONTRACTUAL_DOCUMENT_TYPES.has(item.documentType))
    .filter((item) => !documentType || item.documentType === documentType)
    .sort((left, right) => left.evidenceId.localeCompare(right.evidenceId));
}

function pushSignalEvidence(result, positiveKey, negativeKey, signal, item) {
  if (signal === "positive") result[positiveKey].push(item);
  if (signal === "negative") result[negativeKey].push(item);
  if (signal === "conflict") {
    result[positiveKey].push(item);
    result[negativeKey].push(item);
  }
}

function literalEvidence(indexes) {
  const result = {
    rebuPositive: [],
    rebuNegative: [],
    notItemized: [],
    itemized: [],
    intermediaryPositive: [],
    intermediaryNegative: [],
  };
  for (const item of selectableContractualEvidence(indexes)) {
    pushSignalEvidence(result, "rebuPositive", "rebuNegative", detectPositionalSignal(item.sourceExcerpt, REBU_SIGNAL_CONFIG), item);
    pushSignalEvidence(result, "itemized", "notItemized", detectTextSignal(item.sourceExcerpt, VAT_ITEMIZATION_SIGNAL_CONFIG), item);
    pushSignalEvidence(result, "intermediaryPositive", "intermediaryNegative", detectPositionalSignal(item.sourceExcerpt, INTERMEDIARY_SIGNAL_CONFIG), item);
  }
  return result;
}
function alternativeValuesForFact(fact, fieldName, indexes) {
  if (!Array.isArray(fact?.alternatives)) return [];
  const allowed = VALUE_SETS[fieldName];
  const values = [];
  for (const alternative of fact.alternatives) {
    const evidenceId = alternative?.evidenceId;
    if (evidenceId && !indexes.selectableEvidenceById.has(evidenceId)) continue;
    let value = alternative?.normalizedValue ?? alternative?.value;
    if (fieldName === "rebuStatus" && value === "not_confirmed") value = "rejected";
    if (fieldName === "buyerTaxResidenceCountry" || fieldName === "sellerCountry") value = normalizeCountry(value);
    else if (fieldName === "intendedForResale") value = normalizeBooleanOrUnknown(value);
    else value = normalizeEnum(value, allowed);
    if (value !== UNKNOWN && value !== null) values.push({ value, evidenceId: evidenceId ?? null });
  }
  return values;
}

function buildPatch(state) {
  return {
    sellerType: state.sellerType,
    buyerType: state.buyerType,
    documentType: state.documentType,
    vatRegime: state.vatRegime,
    intendedForResale: state.intendedForResale === UNKNOWN ? null : state.intendedForResale,
    buyerTaxResidenceCountry: state.buyerTaxResidenceCountry,
    sellerCountry: state.sellerCountry,
  };
}

function addConflict(list, type, fields, evidenceIds, description, alternatives = [], warnings = []) {
  const conflict = {
    conflictId: deterministicId("classification_conflict", { type, fields, evidenceIds, alternatives }),
    type,
    fields: uniqueStrings(fields),
    evidenceIds: uniqueStrings(evidenceIds),
    severity: type === VEHICLE_TAX_OPERATION_CONFLICT_TYPES.IDENTITY_CONFLICT ? "critical" : "blocking",
    description,
    resolutionStatus: "unresolved",
    alternatives: alternatives.map((item) => cloneJson(item)),
    warnings: uniqueStrings(warnings),
  };
  if (!list.some((item) => item.conflictId === conflict.conflictId)) list.push(conflict);
}

function makeScenario(label, patch, evidenceIds, assumptions, warnings = []) {
  return {
    scenarioId: deterministicId("classification_scenario", { label, patch, evidenceIds, assumptions }),
    label,
    classificationPatch: cloneJson(patch),
    evidenceIds: uniqueStrings(evidenceIds),
    assumptions: uniqueStrings(assumptions),
    warnings: uniqueStrings(warnings),
    status: "scenario_required",
  };
}

function appendScenario(scenarios, scenario, warningCodes) {
  if (scenarios.some((item) => item.scenarioId === scenario.scenarioId)) return;
  if (scenarios.length >= MAX_SCENARIOS) {
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.CLASSIFICATION_SCENARIOS_TRUNCATED);
    return;
  }
  scenarios.push(scenario);
}

function identityIsConflicted(caseFile) {
  const candidateCount = Array.isArray(caseFile.vehicleCandidates) ? caseFile.vehicleCandidates.length : 0;
  const selectedCandidateId = typeof caseFile.selectedVehicleCandidateId === "string" ? caseFile.selectedVehicleCandidateId : null;
  const hasInvalidSelection = candidateCount > 0 && selectedCandidateId && !caseFile.vehicleCandidates.some((item) => item.vehicleCandidateId === selectedCandidateId);
  const hasUnselectedMultipleCandidates = candidateCount > 1 && !selectedCandidateId;
  const warningCodes = Array.isArray(caseFile.warningCodes) ? caseFile.warningCodes : [];
  const conflicts = Array.isArray(caseFile.conflicts) ? caseFile.conflicts : [];
  const readinessStatuses = Object.values(isPlainObject(caseFile.readiness) ? caseFile.readiness : {}).map((item) => item?.status);
  return hasInvalidSelection
    || hasUnselectedMultipleCandidates
    || warningCodes.includes("IDENTITY_CONFLICT")
    || warningCodes.includes("INVALID_SELECTED_CANDIDATE")
    || readinessStatuses.includes("identity_conflict")
    || conflicts.some((item) => item?.type === "identity_conflict" || item?.warnings?.includes?.("IDENTITY_CONFLICT"));
}

function initialState(caseFile, indexes, warningCodes) {
  const selectedEvidence = [];
  const allEvidenceIds = [];
  const state = {};
  const statuses = {};
  for (const [outputField, field] of Object.entries(FACT_FIELDS)) {
    const result = normalizeFactField(caseFile, field, outputField, indexes, warningCodes);
    state[outputField] = result.value;
    statuses[outputField] = result.status;
    allEvidenceIds.push(...result.evidenceIds);
    if (result.selectedEvidence) selectedEvidence.push(result.selectedEvidence);
  }
  return { state, statuses, selectedEvidence, evidenceIds: uniqueStrings(allEvidenceIds) };
}

function conflictTypeForOutputField(outputField) {
  if (outputField === "sellerType") return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.SELLER_TYPE_CONFLICT;
  if (outputField === "buyerType") return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.BUYER_TYPE_CONFLICT;
  if (outputField === "documentType") return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.DOCUMENT_TYPE_CONFLICT;
  if (outputField === "vatRegime" || outputField === "vatItemizedStatus" || outputField === "rebuStatus") return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT;
  if (outputField === "intendedForResale") return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.RESALE_ELIGIBILITY_CONFLICT;
  if (outputField === "buyerTaxResidenceCountry" || outputField === "sellerCountry") return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.TAX_RESIDENCE_CONFLICT;
  return VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT;
}

function patchWithField(state, outputField, value) {
  const patch = buildPatch(state);
  if (outputField in patch) patch[outputField] = outputField === "intendedForResale" && value === UNKNOWN ? null : value;
  return patch;
}

function addFactDrivenConflicts(context) {
  const { state, statuses, facts, indexes, conflicts, scenarios, warningCodes } = context;
  for (const [outputField, fact] of Object.entries(facts)) {
    if (statuses[outputField] !== "conflict") continue;
    const field = FACT_FIELDS[outputField];
    const alternatives = alternativeValuesForFact(fact, outputField, indexes);
    const evidenceIds = uniqueStrings([
      ...(Array.isArray(fact?.evidenceIds) ? fact.evidenceIds : []),
      ...alternatives.map((item) => item.evidenceId).filter(Boolean),
    ].filter((id) => indexes.selectableEvidenceById.has(id)));
    const type = conflictTypeForOutputField(outputField);
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT);
    addConflict(
      conflicts,
      type,
      [field],
      evidenceIds,
      `${field} has unresolved structured alternatives in the case file.`,
      alternatives.map((item) => ({ [outputField]: item.value }))
    );
    for (const alternative of alternatives) {
      appendScenario(
        scenarios,
        makeScenario(`${field} alternative ${String(alternative.value)}`, patchWithField(state, outputField, alternative.value), alternative.evidenceId ? [alternative.evidenceId] : evidenceIds, [`Use the ${field} alternative supported by structured case file evidence.`]),
        warningCodes
      );
    }
  }
}
function applyLiteralRules(context) {
  const { state, statuses, selectedEvidence, evidenceIds, conflicts, scenarios, warningCodes, indexes, literals } = context;
  const rebuPositiveIds = literals.rebuPositive.map((item) => item.evidenceId);
  const rebuNegativeIds = literals.rebuNegative.map((item) => item.evidenceId);
  const positiveAndNegativeRebu = rebuPositiveIds.length > 0 && rebuNegativeIds.length > 0;
  const structuredRebuContradicted = rebuNegativeIds.length > 0 && (state.rebuStatus === "confirmed" || state.vatRegime === "rebu");
  const positiveRebuContradictsGeneral = rebuPositiveIds.length > 0 && state.vatRegime === "general_vat";
  if (positiveAndNegativeRebu || structuredRebuContradicted || positiveRebuContradictsGeneral) {
    state.vatRegime = UNKNOWN;
    state.rebuStatus = UNKNOWN;
    statuses.vatRegime = "conflict";
    statuses.rebuStatus = "conflict";
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.REBU_EVIDENCE_CONFLICT, ["vatRegime", "rebuStatus"], [...rebuPositiveIds, ...rebuNegativeIds], "Valid invoice evidence contains both REBU-positive and REBU-negative wording.", [
      { vatRegime: "rebu", rebuStatus: "confirmed" },
      { vatRegime: UNKNOWN, rebuStatus: "rejected" },
    ]);
    appendScenario(scenarios, makeScenario("REBU wording accepted", { ...buildPatch(state), vatRegime: "rebu" }, rebuPositiveIds, ["Treat the positive REBU wording as controlling."]), warningCodes);
    appendScenario(scenarios, makeScenario("REBU wording rejected", { ...buildPatch(state), vatRegime: UNKNOWN }, rebuNegativeIds, ["Treat the negative REBU wording as controlling."]), warningCodes);
  } else if (rebuPositiveIds.length > 0 && state.vatRegime !== "general_vat") {
    state.vatRegime = "rebu";
    statuses.vatRegime = statuses.vatRegime === "confirmed" ? "confirmed" : "confirmed";
    state.rebuStatus = "confirmed";
    statuses.rebuStatus = "confirmed";
    evidenceIds.push(...rebuPositiveIds);
    const evidence = literals.rebuPositive[0];
    selectedEvidence.push(evidenceSelection(FACT_FIELDS.vatRegime, evidence, "valid invoice literal confirms REBU"));
  } else if (rebuNegativeIds.length > 0 && state.rebuStatus !== "confirmed") {
    state.rebuStatus = "rejected";
    statuses.rebuStatus = statuses.rebuStatus === "missing" ? "confirmed" : statuses.rebuStatus;
    evidenceIds.push(...rebuNegativeIds);
  }

  const itemizedEvidenceIds = literals.itemized.map((item) => item.evidenceId);
  const notItemizedEvidenceIds = literals.notItemized.map((item) => item.evidenceId);
  const hasItemizedSignal = itemizedEvidenceIds.length > 0 || state.vatItemizedStatus === "itemized";
  const hasNotItemizedSignal = notItemizedEvidenceIds.length > 0 || state.vatItemizedStatus === "not_itemized";
  if (hasItemizedSignal && hasNotItemizedSignal) {
    state.vatItemizedStatus = UNKNOWN;
    statuses.vatItemizedStatus = "conflict";
    state.vatRegime = UNKNOWN;
    statuses.vatRegime = "conflict";
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT, ["vatItemizedStatus", "vatRegime"], uniqueStrings([...evidenceIds, ...itemizedEvidenceIds, ...notItemizedEvidenceIds]), "VAT itemization evidence contains unresolved itemized and non-itemized signals.", [
      { vatItemizedStatus: "itemized", vatRegime: "general_vat" },
      { vatItemizedStatus: "not_itemized", vatRegime: "vat_not_itemized" },
    ]);
  } else if (literals.itemized.length > 0 && state.vatRegime !== "rebu" && statuses.vatRegime !== "conflict") {
    state.vatItemizedStatus = "itemized";
    statuses.vatItemizedStatus = "confirmed";
    if (state.vatRegime === UNKNOWN || state.vatRegime === "vat_not_itemized") {
      state.vatRegime = "general_vat";
      statuses.vatRegime = "confirmed";
    }
    evidenceIds.push(...itemizedEvidenceIds);
  } else if (literals.notItemized.length > 0 && statuses.vatRegime !== "conflict") {
    state.vatItemizedStatus = "not_itemized";
    statuses.vatItemizedStatus = "confirmed";
    if (state.sellerType === "professional" && state.documentType === "invoice" && state.vatRegime !== "rebu" && state.vatRegime !== "general_vat") {
      state.vatRegime = "vat_not_itemized";
      statuses.vatRegime = "confirmed";
    }
    if (state.rebuStatus !== "confirmed") {
      state.rebuStatus = UNKNOWN;
      statuses.rebuStatus = statuses.rebuStatus === "missing" ? "missing" : statuses.rebuStatus;
      addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.REBU_NOT_CONFIRMED);
    }
    evidenceIds.push(...notItemizedEvidenceIds);
  }

  const invoiceEvidence = selectableContractualEvidence(indexes, VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.INVOICE);
  const contractEvidence = selectableContractualEvidence(indexes, VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PRIVATE_SALE_CONTRACT);
  if (invoiceEvidence.length > 0 && contractEvidence.length > 0) {
    state.documentType = UNKNOWN;
    statuses.documentType = "conflict";
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.DOCUMENT_TYPE_CONFLICT, ["documentType"], [...invoiceEvidence, ...contractEvidence].map((item) => item.evidenceId), "Invoice and private sale contract evidence coexist without a resolved document classification.", [
      { documentType: "invoice" },
      { documentType: "private_sale_contract" },
    ]);
    appendScenario(scenarios, makeScenario("Operation documented by invoice", { ...buildPatch(state), documentType: "invoice" }, invoiceEvidence.map((item) => item.evidenceId), ["Use invoice evidence as the contractual operation document."]), warningCodes);
    appendScenario(scenarios, makeScenario("Operation documented by private contract", { ...buildPatch(state), documentType: "private_sale_contract" }, contractEvidence.map((item) => item.evidenceId), ["Use private contract evidence as the contractual operation document."]), warningCodes);
  }
}
function applyConsistencyRules(context) {
  const { state, statuses, conflicts, scenarios, warningCodes, evidenceIds, literals, indexes, facts, identityConflict } = context;
  if (state.rebuStatus === "confirmed" && state.vatRegime === UNKNOWN) {
    state.vatRegime = "rebu";
    statuses.vatRegime = statuses.rebuStatus;
  } else if (state.vatRegime === "rebu" && state.rebuStatus !== "confirmed") {
    state.rebuStatus = "confirmed";
    statuses.rebuStatus = statuses.vatRegime;
  } else if (state.rebuStatus === "confirmed" && ["general_vat", "vat_not_itemized", "not_applicable_private_sale"].includes(state.vatRegime)) {
    const previousVatRegime = state.vatRegime;
    state.vatRegime = UNKNOWN;
    state.rebuStatus = UNKNOWN;
    statuses.vatRegime = "conflict";
    statuses.rebuStatus = "conflict";
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.VAT_REGIME_CONFLICT, ["vatRegime", "rebuStatus"], evidenceIds, "Structured REBU confirmation conflicts with another VAT regime classification.", [
      { vatRegime: "rebu", rebuStatus: "confirmed" },
      { vatRegime: previousVatRegime, rebuStatus: "rejected" },
    ]);
  }

  if (state.sellerType === "private" && state.documentType === "private_sale_contract" && state.vatRegime === UNKNOWN) {
    const scenarioDerived = statuses.sellerType === "scenario_required" || statuses.documentType === "scenario_required";
    state.vatRegime = "not_applicable_private_sale";
    statuses.vatRegime = statuses.vatRegime === "missing" ? (scenarioDerived ? "scenario_required" : "confirmed") : statuses.vatRegime;
    state.rebuStatus = "rejected";
    statuses.rebuStatus = scenarioDerived ? "scenario_required" : "confirmed";
  }

  const sellerContradictions = [];
  if (state.sellerType === "private" && state.documentType === "invoice") sellerContradictions.push("private seller with invoice");
  if (state.sellerType === "professional" && state.documentType === "private_sale_contract") sellerContradictions.push("professional seller with private contract");
  if (state.sellerType === "private" && (state.vatRegime === "general_vat" || state.vatRegime === "rebu")) sellerContradictions.push("private seller with VAT regime");
  if (state.sellerType === "professional" && state.vatRegime === "not_applicable_private_sale") sellerContradictions.push("professional seller with private-sale non-application");
  if (sellerContradictions.length > 0) {
    const fields = ["sellerType", "documentType", "vatRegime"];
    state.sellerType = UNKNOWN;
    statuses.sellerType = "conflict";
    state.vatRegime = UNKNOWN;
    statuses.vatRegime = "conflict";
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_CLASSIFICATION_CONFLICT);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.SELLER_TYPE_CONFLICT, fields, evidenceIds, `Contradictory seller classification: ${sellerContradictions.join(", ")}.`, [
      { sellerType: "private", documentType: "private_sale_contract", vatRegime: "not_applicable_private_sale" },
      { sellerType: "professional", documentType: "invoice", vatRegime: UNKNOWN },
    ]);
    appendScenario(scenarios, makeScenario("Seller treated as private transferor", { ...buildPatch(state), sellerType: "private", documentType: "private_sale_contract", vatRegime: "not_applicable_private_sale" }, evidenceIds, ["Resolve contradiction in favor of private seller evidence."]), warningCodes);
    appendScenario(scenarios, makeScenario("Seller treated as professional supplier", { ...buildPatch(state), sellerType: "professional", documentType: "invoice", vatRegime: UNKNOWN }, evidenceIds, ["Resolve contradiction in favor of professional seller evidence."]), warningCodes);
  }

  if (literals.intermediaryPositive.length > 0 && state.sellerType !== "private") {
    state.sellerType = UNKNOWN;
    statuses.sellerType = "scenario_required";
    const ids = literals.intermediaryPositive.map((item) => item.evidenceId);
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.INTERMEDIARY_SELLER_UNRESOLVED);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.INTERMEDIARY_SELLER_UNRESOLVED, ["sellerType", "vatRegime"], ids, "Intermediary wording prevents assuming that the dealer is the seller.", [
      { sellerType: "professional", vatRegime: UNKNOWN },
      { sellerType: "private", vatRegime: "not_applicable_private_sale" },
    ], [VEHICLE_TAX_OPERATION_WARNING_CODES.INTERMEDIARY_SELLER_UNRESOLVED]);
    appendScenario(scenarios, makeScenario("Dealer is contractual seller", { ...buildPatch(state), sellerType: "professional", vatRegime: state.vatRegime }, ids, ["Treat the dealer as contractual seller only if independently confirmed."]), warningCodes);
    appendScenario(scenarios, makeScenario("Dealer acts for private owner", { ...buildPatch(state), sellerType: "private", vatRegime: "not_applicable_private_sale" }, ids, ["Treat intermediary wording as agency for a private owner."]), warningCodes);
  }

  if (state.buyerType === "vehicle_reseller" && state.intendedForResale !== true) {
    state.buyerType = UNKNOWN;
    state.intendedForResale = UNKNOWN;
    statuses.buyerType = "conflict";
    statuses.intendedForResale = "conflict";
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.RESALE_ELIGIBILITY_UNRESOLVED);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.RESALE_ELIGIBILITY_CONFLICT, ["buyerType", "intendedForResale"], evidenceIds, "Vehicle reseller status requires supported resale intent.", [
      { buyerType: "vehicle_reseller", intendedForResale: true },
      { buyerType: "professional", intendedForResale: UNKNOWN },
    ], [VEHICLE_TAX_OPERATION_WARNING_CODES.RESALE_ELIGIBILITY_UNRESOLVED]);
    appendScenario(scenarios, makeScenario("Buyer qualifies as reseller", { ...buildPatch(state), buyerType: "vehicle_reseller", intendedForResale: true }, evidenceIds, ["Confirm habitual resale activity and resale intent."]), warningCodes);
    appendScenario(scenarios, makeScenario("Buyer remains professional non-reseller", { ...buildPatch(state), buyerType: "professional", intendedForResale: null }, evidenceIds, ["Do not apply reseller status without resale intent."]), warningCodes);
  }

  const buyerCountryAlternatives = alternativeValuesForFact(facts.buyerTaxResidenceCountry, "buyerTaxResidenceCountry", indexes);
  const buyerCountries = uniqueStrings(buyerCountryAlternatives.map((item) => item.value).filter(Boolean));
  if (buyerCountries.length > 1) {
    state.buyerTaxResidenceCountry = null;
    statuses.buyerTaxResidenceCountry = "conflict";
    const ids = uniqueStrings(buyerCountryAlternatives.map((item) => item.evidenceId).filter(Boolean));
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.TAX_RESIDENCE_UNRESOLVED);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.TAX_RESIDENCE_CONFLICT, ["buyerTaxResidenceCountry"], ids, "Buyer tax residence country has unresolved alternatives.", buyerCountries.map((country) => ({ buyerTaxResidenceCountry: country })), [VEHICLE_TAX_OPERATION_WARNING_CODES.TAX_RESIDENCE_UNRESOLVED]);
    for (const country of buyerCountries) {
      appendScenario(scenarios, makeScenario(`Buyer tax residence ${country}`, { ...buildPatch(state), buyerTaxResidenceCountry: country }, ids, [`Treat ${country} as the buyer tax residence country.`]), warningCodes);
    }
  }

  if (!identityConflict && state.sellerType === UNKNOWN && statuses.sellerType !== "conflict" && statuses.sellerType !== "scenario_required") {
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.SELLER_TYPE_UNRESOLVED);
    appendScenario(scenarios, makeScenario("Seller is private", { ...buildPatch(state), sellerType: "private", vatRegime: "not_applicable_private_sale" }, evidenceIds, ["Seller type remains unresolved in the structured case file."]), warningCodes);
    appendScenario(scenarios, makeScenario("Seller is professional", { ...buildPatch(state), sellerType: "professional", vatRegime: UNKNOWN }, evidenceIds, ["Seller type remains unresolved in the structured case file."]), warningCodes);
  }
}

function addMissingWarnings(state, statuses, warningCodes) {
  if (state.sellerType === UNKNOWN || statuses.sellerType === "missing") addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.SELLER_TYPE_UNRESOLVED);
  if (state.buyerType === UNKNOWN || statuses.buyerType === "missing") addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.BUYER_TYPE_UNRESOLVED);
  if (state.documentType === UNKNOWN || statuses.documentType === "missing") addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.DOCUMENT_TYPE_UNRESOLVED);
  if (state.vatRegime === UNKNOWN || statuses.vatRegime === "missing") addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.VAT_REGIME_UNRESOLVED);
  if (state.rebuStatus === UNKNOWN && state.vatRegime !== "not_applicable_private_sale") addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.REBU_NOT_CONFIRMED);
  if (state.buyerTaxResidenceCountry === null || statuses.buyerTaxResidenceCountry === "missing") addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.TAX_RESIDENCE_UNRESOLVED);
  if (state.buyerType === "professional" && state.intendedForResale === UNKNOWN) addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.RESALE_ELIGIBILITY_UNRESOLVED);
}

function topStatus(statuses, conflicts, scenarios, identityConflict) {
  const values = Object.values(statuses);
  if (values.includes("invalid")) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.INVALID;
  if (identityConflict) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.IDENTITY_CONFLICT;
  if (conflicts.length > 0 || values.includes("conflict")) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.CONFLICT;
  if (values.includes("scenario_required") || scenarios.length > 0) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.SCENARIO_REQUIRED;
  if (values.includes("missing")) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.INSUFFICIENT_DATA;
  if (values.includes("inferred")) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.INFERRED;
  if (values.includes("probable")) return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.PROBABLE;
  return VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.CONFIRMED;
}

function missingFields(state, statuses) {
  return Object.entries(FACT_FIELDS)
    .filter(([outputField]) => statuses[outputField] === "missing" || state[outputField] === UNKNOWN || state[outputField] === null)
    .map(([, field]) => field)
    .sort();
}

function invalidOutput(caseFile, codes) {
  const warningCodes = uniqueStrings(codes);
  const output = {
    schemaVersion: VEHICLE_TAX_OPERATION_CLASSIFICATION_SCHEMA_VERSION,
    caseId: isPlainObject(caseFile) && typeof caseFile.caseId === "string" ? caseFile.caseId : null,
    status: VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES.INVALID,
    sellerType: UNKNOWN,
    sellerTypeStatus: "invalid",
    buyerType: UNKNOWN,
    buyerTypeStatus: "invalid",
    documentType: UNKNOWN,
    documentTypeStatus: "invalid",
    vatRegime: UNKNOWN,
    vatRegimeStatus: "invalid",
    vatItemizedStatus: UNKNOWN,
    vatItemizedStatusCertainty: "invalid",
    rebuStatus: UNKNOWN,
    rebuStatusCertainty: "invalid",
    intendedForResale: UNKNOWN,
    intendedForResaleStatus: "invalid",
    buyerTaxResidenceCountry: null,
    buyerTaxResidenceCountryStatus: "invalid",
    sellerCountry: null,
    sellerCountryStatus: "invalid",
    evidenceIds: [],
    selectedEvidence: [],
    conflicts: [],
    scenarios: [],
    transferTaxClassification: {
      sellerType: UNKNOWN,
      buyerType: UNKNOWN,
      documentType: UNKNOWN,
      vatRegime: UNKNOWN,
      intendedForResale: null,
      buyerTaxResidenceCountry: null,
      sellerCountry: null,
    },
    legalBasis: cloneJson(LEGAL_BASIS),
    assumptions: [],
    warnings: warningsFromCodes(warningCodes),
    warningCodes,
    missingFields: Object.values(FACT_FIELDS).sort(),
  };
  return cloneJson(output);
}

export function classifyVehicleTaxOperation(caseFile) {
  const baseWarningCodes = new Set();
  if (!isPlainObject(caseFile)) {
    return invalidOutput(caseFile, [VEHICLE_TAX_OPERATION_WARNING_CODES.INVALID_CLASSIFIER_INPUT]);
  }
  if (hasNonSerializableValue(caseFile)) addCode(baseWarningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.NON_SERIALIZABLE_CLASSIFIER_INPUT);
  if (caseFile.schemaVersion !== VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION) {
    addCode(baseWarningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.INCOMPATIBLE_CASE_FILE_SCHEMA);
    return invalidOutput(caseFile, [...baseWarningCodes]);
  }

  const warningCodes = new Set(baseWarningCodes);
  const indexes = buildIndexes(caseFile);
  const { state, statuses, selectedEvidence, evidenceIds } = initialState(caseFile, indexes, warningCodes);
  const conflicts = [];
  const scenarios = [];
  const literals = literalEvidence(indexes);
  const facts = Object.fromEntries(Object.entries(FACT_FIELDS).map(([key, field]) => [key, getFact(caseFile, field)]));
  const identityConflict = identityIsConflicted(caseFile);
  addFactDrivenConflicts({ state, statuses, facts, indexes, conflicts, scenarios, warningCodes });
  applyLiteralRules({ state, statuses, selectedEvidence, evidenceIds, conflicts, scenarios, warningCodes, indexes, literals });
  applyConsistencyRules({ state, statuses, selectedEvidence, evidenceIds, conflicts, scenarios, warningCodes, indexes, literals, facts, identityConflict });

  if (identityConflict) {
    addCode(warningCodes, VEHICLE_TAX_OPERATION_WARNING_CODES.CASE_FILE_IDENTITY_CONFLICT);
    addConflict(conflicts, VEHICLE_TAX_OPERATION_CONFLICT_TYPES.IDENTITY_CONFLICT, Object.values(FACT_FIELDS), evidenceIds, "Vehicle identity is unresolved; classification must remain scenario based.", [], [VEHICLE_TAX_OPERATION_WARNING_CODES.CASE_FILE_IDENTITY_CONFLICT]);
  }

  addMissingWarnings(state, statuses, warningCodes);
  const sortedScenarios = scenarios.sort((left, right) => left.scenarioId.localeCompare(right.scenarioId));
  const sortedConflicts = conflicts.sort((left, right) => left.conflictId.localeCompare(right.conflictId));
  const sortedSelectedEvidence = selectedEvidence
    .filter(Boolean)
    .filter((item, index, list) => list.findIndex((other) => other.field === item.field && other.evidenceId === item.evidenceId) === index)
    .sort((left, right) => `${left.field}:${left.evidenceId}`.localeCompare(`${right.field}:${right.evidenceId}`));
  const uniqueEvidenceIds = uniqueStrings([...evidenceIds, ...sortedSelectedEvidence.map((item) => item.evidenceId), ...sortedConflicts.flatMap((item) => item.evidenceIds), ...sortedScenarios.flatMap((item) => item.evidenceIds)]);
  const finalWarningCodes = uniqueStrings([...warningCodes]);
  const output = {
    schemaVersion: VEHICLE_TAX_OPERATION_CLASSIFICATION_SCHEMA_VERSION,
    caseId: typeof caseFile.caseId === "string" ? caseFile.caseId : null,
    status: topStatus(statuses, sortedConflicts, sortedScenarios, identityConflict),
    sellerType: state.sellerType,
    sellerTypeStatus: statuses.sellerType,
    buyerType: state.buyerType,
    buyerTypeStatus: statuses.buyerType,
    documentType: state.documentType,
    documentTypeStatus: statuses.documentType,
    vatRegime: state.vatRegime,
    vatRegimeStatus: statuses.vatRegime,
    vatItemizedStatus: state.vatItemizedStatus,
    vatItemizedStatusCertainty: statuses.vatItemizedStatus,
    rebuStatus: state.rebuStatus,
    rebuStatusCertainty: statuses.rebuStatus,
    intendedForResale: state.intendedForResale,
    intendedForResaleStatus: statuses.intendedForResale,
    buyerTaxResidenceCountry: state.buyerTaxResidenceCountry,
    buyerTaxResidenceCountryStatus: statuses.buyerTaxResidenceCountry,
    sellerCountry: state.sellerCountry,
    sellerCountryStatus: statuses.sellerCountry,
    evidenceIds: uniqueEvidenceIds,
    selectedEvidence: sortedSelectedEvidence,
    conflicts: sortedConflicts,
    scenarios: sortedScenarios,
    transferTaxClassification: buildPatch(state),
    legalBasis: cloneJson(LEGAL_BASIS),
    assumptions: [],
    warnings: warningsFromCodes(finalWarningCodes),
    warningCodes: finalWarningCodes,
    missingFields: missingFields(state, statuses),
  };
  const orderedOutput = Object.fromEntries(OUTPUT_KEYS.map((key) => [key, output[key]]));
  return cloneJson(orderedOutput);
}
