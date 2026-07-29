import {
  VEHICLE_TAX_CASE_FILE_CONFLICT_RESOLUTION_STATUSES,
  VEHICLE_TAX_CASE_FILE_CONFLICT_SEVERITIES,
  VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES,
  VEHICLE_TAX_CASE_FILE_ENUM_VALUES,
  VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS,
  VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES,
  VEHICLE_TAX_CASE_FILE_FACT_STATUSES,
  VEHICLE_TAX_CASE_FILE_FIELD_CATALOG,
  VEHICLE_TAX_CASE_FILE_FIELD_PATHS,
  VEHICLE_TAX_CASE_FILE_READINESS_STATUSES,
  VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
  VEHICLE_TAX_CASE_FILE_SOURCE_TYPES,
  VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES,
  VEHICLE_TAX_CASE_FILE_WARNING_CODES,
  VEHICLE_TAX_CASE_FILE_WARNING_MESSAGES,
} from "../data/vehicleTaxCaseFileCatalogs.mjs";

const MAX_STRING_LENGTH = 300;
const MAX_FILENAME_LENGTH = 260;
const MAX_SOURCE_EXCERPT_LENGTH = 500;
const MAX_SCENARIOS = 20;

const DOCUMENT_FIELD_DEFAULTS = {
  documentId: null,
  documentType: VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.OTHER,
  filename: null,
  language: null,
  country: null,
  issueDate: null,
  issuer: null,
  pageCount: null,
  contentHash: null,
  extractionStatus: VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES.NOT_PROCESSED,
  uploadedAt: null,
  containsPersonalData: false,
  warnings: [],
};

const EVIDENCE_FIELD_DEFAULTS = {
  evidenceId: null,
  documentId: null,
  vehicleCandidateId: null,
  field: null,
  documentType: null,
  page: null,
  fieldLabel: null,
  sourceExcerpt: null,
  normalizedValue: null,
  valueType: null,
  unit: null,
  sourceType: VEHICLE_TAX_CASE_FILE_SOURCE_TYPES.OTHER,
  confidence: null,
  extractionMethod: VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS.UNKNOWN,
  verifiedBy: null,
  verificationStatus: VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.EXTRACTED,
  notes: null,
};

const VERIFICATION_PRIORITY = {
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_OFFICIAL]: 800,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_PROFESSIONAL]: 700,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_USER]: 500,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.EXTRACTED]: 400,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.INFERRED]: 300,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.SCENARIO]: 200,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFLICT]: 100,
  [VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED]: -1,
};

const OFFICIAL_VEHICLE_DOCUMENTS = new Set([
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.COC,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.GERMAN_REGISTRATION_PART_I,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.GERMAN_REGISTRATION_PART_II,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.TECHNICAL_INSPECTION_DOCUMENT,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.SPANISH_TECHNICAL_CARD,
]);

const REGISTRATION_DATE_DOCUMENT_PRIORITY = new Map([
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.GERMAN_REGISTRATION_PART_I, 70],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.GERMAN_REGISTRATION_PART_II, 70],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.COC, 60],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.SPANISH_TECHNICAL_CARD, 60],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.TECHNICAL_INSPECTION_DOCUMENT, 55],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.INVOICE, 40],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PRIVATE_SALE_CONTRACT, 40],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.VEHICLE_AD, 10],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.USER_DECLARATION, 5],
]);

const PRICE_DOCUMENT_PRIORITY = new Map([
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.INVOICE, 70],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PRIVATE_SALE_CONTRACT, 70],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PROFESSIONAL_REPORT, 50],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.VEHICLE_AD, 20],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.USER_DECLARATION, 10],
]);

const TECHNICAL_DOCUMENT_PRIORITY = new Map([
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.COC, 70],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.GERMAN_REGISTRATION_PART_I, 68],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.GERMAN_REGISTRATION_PART_II, 68],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.SPANISH_TECHNICAL_CARD, 66],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.TECHNICAL_INSPECTION_DOCUMENT, 60],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PROFESSIONAL_REPORT, 45],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.USER_DECLARATION, 20],
  [VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.VEHICLE_AD, 10],
]);

const CONTRACTUAL_DOCUMENTS = new Set([
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.INVOICE,
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PRIVATE_SALE_CONTRACT,
]);

const GLOBAL_FACT_PREFIXES = ["transaction.", "parties.", "taxDestination."];

function emptyFact(field) {
  const meta = VEHICLE_TAX_CASE_FILE_FIELD_CATALOG[field] ?? { valueType: null, unit: null };
  return {
    field,
    value: null,
    normalizedValue: null,
    valueType: meta.valueType,
    unit: meta.unit,
    status: VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING,
    selectedEvidenceId: null,
    evidenceIds: [],
    alternatives: [],
    selectionReason: "",
    assumptions: [],
    warnings: [],
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}

function cloneJson(value, warnings, seen = new WeakSet()) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : warnAndNull(warnings, VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE);
  if (typeof value === "bigint" || typeof value === "symbol" || typeof value === "function" || typeof value === "undefined") {
    return warnAndNull(warnings, VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE);
  }
  if (value instanceof Date || value instanceof Map || value instanceof Set) {
    return warnAndNull(warnings, VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE);
  }
  if (seen.has(value)) return warnAndNull(warnings, VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE);
  seen.add(value);
  if (Array.isArray(value)) {
    const output = value.map((item) => cloneJson(item, warnings, seen));
    seen.delete(value);
    return output;
  }
  if (!isPlainObject(value)) {
    seen.delete(value);
    return warnAndNull(warnings, VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE);
  }
  const output = {};
  for (const [key, item] of Object.entries(value)) {
    const cloned = cloneJson(item, warnings, seen);
    if (cloned !== undefined) output[key] = cloned;
  }
  seen.delete(value);
  return output;
}

function warnAndNull(warnings, code) {
  warnings.push(code);
  return null;
}

function uniqueStrings(values) {
  return Array.from(new Set((Array.isArray(values) ? values : []).filter((value) => typeof value === "string" && value)));
}

function warningMessages(codes) {
  return uniqueStrings(codes).map((code) => VEHICLE_TAX_CASE_FILE_WARNING_MESSAGES[code]).filter(Boolean);
}

function normalizeString(value, maxLength = MAX_STRING_LENGTH) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function normalizeId(value) {
  return normalizeString(value, 120);
}

function normalizeEnum(value, allowedValues, fallback = null) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeDocumentType(value) {
  return normalizeEnum(value, VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES, null);
}

function normalizeLanguage(value) {
  const normalized = normalizeString(value, 16);
  if (!normalized) return null;
  const lowered = normalized.toLowerCase();
  return /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/.test(lowered) ? lowered : null;
}

function normalizeCountry(value) {
  const normalized = normalizeString(value, 32);
  if (!normalized) return null;
  const upper = normalized.toUpperCase();
  return /^[A-Z]{2}$/.test(upper) ? upper : null;
}

function normalizeCurrency(value) {
  const normalized = normalizeString(value, 8);
  if (!normalized) return null;
  const upper = normalized.toUpperCase();
  return /^[A-Z]{3}$/.test(upper) ? upper : null;
}

function isIsoDate(value, allowYearMonth = false) {
  if (typeof value !== "string") return false;
  if (allowYearMonth && /^\d{4}-\d{2}$/.test(value)) {
    const month = Number(value.slice(5, 7));
    return month >= 1 && month <= 12;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function normalizeIsoDate(value, allowYearMonth = false) {
  const normalized = normalizeString(value, 32);
  return isIsoDate(normalized, allowYearMonth) ? normalized : null;
}

function normalizeIsoLikeDate(value) {
  const normalized = normalizeString(value, 40);
  if (!normalized) return null;
  if (isIsoDate(normalized, true)) return normalized;
  if (/^\d{4}-\d{2}-\d{2}T/.test(normalized) && Number.isFinite(Date.parse(normalized))) return normalized;
  return null;
}

function normalizeBoolean(value) {
  return typeof value === "boolean" ? value : null;
}

function normalizeNonNegativeNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const numeric = Number(value.trim().replace(",", "."));
    return Number.isFinite(numeric) && numeric >= 0 ? numeric : null;
  }
  return null;
}

function normalizeYear(value) {
  const numeric = typeof value === "number" ? value : Number(String(value ?? "").trim());
  return Number.isInteger(numeric) && numeric >= 1900 && numeric <= 2100 ? numeric : null;
}

function normalizeVin(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase().replace(/\s+/g, "");
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(normalized) ? normalized : null;
}

function normalizeIneCode(value) {
  if (typeof value !== "string") return null;
  const code = value.trim();
  return /^\d{5}$/.test(code) ? code : null;
}

function normalizeFieldValue(field, value) {
  const meta = VEHICLE_TAX_CASE_FILE_FIELD_CATALOG[field];
  if (!meta) return { valid: false, normalizedValue: null };
  if (value === null || value === undefined || value === "") return { valid: false, normalizedValue: null };
  if (field === "vehicle.vin") {
    const normalizedValue = normalizeVin(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "number" || meta.valueType === "money") {
    const normalizedValue = normalizeNonNegativeNumber(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "year") {
    const normalizedValue = normalizeYear(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "country") {
    const normalizedValue = normalizeCountry(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "currency") {
    const normalizedValue = normalizeCurrency(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "ine_code") {
    const normalizedValue = normalizeIneCode(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "date") {
    const normalizedValue = normalizeIsoDate(value, Boolean(meta.allowYearMonth));
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "boolean") {
    const normalizedValue = normalizeBoolean(value);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  if (meta.valueType === "enum") {
    const normalizedValue = normalizeEnum(value, VEHICLE_TAX_CASE_FILE_ENUM_VALUES[field] ?? [], null);
    return { valid: normalizedValue !== null, normalizedValue };
  }
  const normalizedValue = normalizeString(value);
  return { valid: normalizedValue !== null, normalizedValue };
}

function stableHash(value) {
  const text = JSON.stringify(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function deterministicId(prefix, parts) {
  return `${prefix}_${stableHash(parts)}`;
}

function canonicalSortById(left, right, field) {
  return String(left[field] ?? "").localeCompare(String(right[field] ?? ""));
}

function sanitizeDocument(item, index, seenDocumentIds, warningCodes) {
  const localWarnings = [];
  const object = isPlainObject(item) ? item : {};
  if (!isPlainObject(item)) warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_FILE_INPUT);
  const documentId = normalizeId(object.documentId) ?? `invalid_document_${index + 1}`;
  const duplicate = seenDocumentIds.has(documentId);
  if (duplicate) warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_DOCUMENT_ID);
  seenDocumentIds.add(documentId);
  const knownDocumentType = normalizeDocumentType(object.documentType);
  if (!knownDocumentType) localWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_FIELD);
  const extractionStatus = normalizeEnum(
    object.extractionStatus,
    Object.values(VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES),
    VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES.NOT_PROCESSED
  );
  const warnings = uniqueStrings([
    ...localWarnings,
    ...((Array.isArray(object.warnings) ? object.warnings : []).filter((value) => typeof value === "string").map((value) => normalizeString(value)).filter(Boolean)),
    ...(duplicate ? [VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_DOCUMENT_ID] : []),
    ...(!normalizeId(object.documentId) ? [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_REFERENCE] : []),
  ]);
  return {
    ...DOCUMENT_FIELD_DEFAULTS,
    documentId,
    documentType: knownDocumentType ?? VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.OTHER,
    filename: normalizeString(object.filename, MAX_FILENAME_LENGTH),
    language: normalizeLanguage(object.language),
    country: normalizeCountry(object.country),
    issueDate: normalizeIsoLikeDate(object.issueDate),
    issuer: normalizeString(object.issuer),
    pageCount: Number.isInteger(object.pageCount) && object.pageCount > 0 ? object.pageCount : null,
    contentHash: typeof object.contentHash === "string" ? normalizeString(object.contentHash, 256) : null,
    extractionStatus: duplicate || !normalizeId(object.documentId) || !knownDocumentType
      ? VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES.REJECTED
      : extractionStatus,
    uploadedAt: normalizeIsoLikeDate(object.uploadedAt),
    containsPersonalData: object.containsPersonalData === true,
    warnings,
  };
}

function sanitizeDeclaredCandidate(item, index, warningCodes) {
  if (!isPlainObject(item)) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_REFERENCE);
    return null;
  }
  const vehicleCandidateId = normalizeId(item.vehicleCandidateId);
  if (!vehicleCandidateId) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_REFERENCE);
    return null;
  }
  return {
    vehicleCandidateId,
    status: normalizeString(item.status, 80) ?? "declared",
    documentIds: uniqueStrings(item.documentIds),
    evidenceIds: uniqueStrings(item.evidenceIds),
    facts: buildMissingFacts("vehicle"),
    conflicts: [],
    assumptions: uniqueStrings(item.assumptions),
    warnings: uniqueStrings(item.warnings),
    order: index,
  };
}

function buildMissingFacts(scope) {
  const entries = VEHICLE_TAX_CASE_FILE_FIELD_PATHS
    .filter((field) => VEHICLE_TAX_CASE_FILE_FIELD_CATALOG[field].scope === scope)
    .map((field) => [field, emptyFact(field)]);
  return Object.fromEntries(entries);
}

function truncateSourceExcerpt(value, warningCodes, evidenceWarnings) {
  const excerpt = normalizeString(value, 10000);
  if (!excerpt) return null;
  if (excerpt.length <= MAX_SOURCE_EXCERPT_LENGTH) return excerpt;
  warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.SOURCE_EXCERPT_TRUNCATED);
  evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.SOURCE_EXCERPT_TRUNCATED);
  return excerpt.slice(0, MAX_SOURCE_EXCERPT_LENGTH);
}

function sanitizeEvidence(item, index, documentsById, knownCandidateIds, seenEvidenceIds, warningCodes) {
  const evidenceWarnings = [];
  const object = isPlainObject(item) ? item : {};
  if (!isPlainObject(item)) warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_FILE_INPUT);
  const evidenceId = normalizeId(object.evidenceId) ?? `invalid_evidence_${index + 1}`;
  const duplicate = seenEvidenceIds.has(evidenceId);
  if (duplicate) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_EVIDENCE_ID);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_EVIDENCE_ID);
  }
  seenEvidenceIds.add(evidenceId);
  const documentId = normalizeId(object.documentId);
  const document = documentId ? documentsById.get(documentId) : null;
  if (documentId && !document) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_DOCUMENT_REFERENCE);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_DOCUMENT_REFERENCE);
  }
  const documentType = normalizeDocumentType(object.documentType) ?? document?.documentType ?? null;
  const hasDocumentTypeMismatch = Boolean(document && documentType !== document.documentType);
  if (hasDocumentTypeMismatch) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DOCUMENT_TYPE_MISMATCH);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.DOCUMENT_TYPE_MISMATCH);
  }
  const field = normalizeString(object.field, 120);
  const fieldMeta = field ? VEHICLE_TAX_CASE_FILE_FIELD_CATALOG[field] : null;
  if (!fieldMeta) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_FIELD);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_FIELD);
  }
  const normalizedInputValue = cloneJson(object.normalizedValue, warningCodes);
  const valueResult = fieldMeta ? normalizeFieldValue(field, normalizedInputValue) : { valid: false, normalizedValue: null };
  if (fieldMeta && normalizedInputValue !== null && !valueResult.valid) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_VALUE);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_VALUE);
  }
  const candidateId = normalizeId(object.vehicleCandidateId);
  if (candidateId && knownCandidateIds.size > 0 && !knownCandidateIds.has(candidateId)) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_VEHICLE_CANDIDATE);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_VEHICLE_CANDIDATE);
  }
  const confidence = typeof object.confidence === "number" && Number.isFinite(object.confidence) && object.confidence >= 0 && object.confidence <= 1
    ? object.confidence
    : null;
  const sourceType = normalizeEnum(
    object.sourceType,
    Object.values(VEHICLE_TAX_CASE_FILE_SOURCE_TYPES),
    VEHICLE_TAX_CASE_FILE_SOURCE_TYPES.OTHER
  );
  const verificationStatus = normalizeEnum(
    object.verificationStatus,
    Object.values(VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES),
    VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.EXTRACTED
  );
  const extractionMethod = normalizeEnum(
    object.extractionMethod,
    Object.values(VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS),
    VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS.UNKNOWN
  );
  const rawPagePresent = object.page !== null && object.page !== undefined && object.page !== "";
  const page = Number.isInteger(object.page) && object.page > 0 ? object.page : null;
  const hasInvalidPageValue = rawPagePresent && page === null;
  const isPageBeyondDocument = page !== null && Number.isInteger(document?.pageCount) && document.pageCount > 0 && page > document.pageCount;
  const hasInvalidEvidencePage = hasInvalidPageValue || isPageBeyondDocument;
  if (hasInvalidEvidencePage) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_PAGE);
    evidenceWarnings.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_PAGE);
  }
  const rejected =
    duplicate ||
    !normalizeId(object.evidenceId) ||
    !fieldMeta ||
    (documentId && !document) ||
    hasDocumentTypeMismatch ||
    hasInvalidEvidencePage ||
    (candidateId && knownCandidateIds.size > 0 && !knownCandidateIds.has(candidateId));

  return {
    ...EVIDENCE_FIELD_DEFAULTS,
    evidenceId,
    documentId,
    vehicleCandidateId: candidateId,
    field,
    documentType,
    page,
    fieldLabel: normalizeString(object.fieldLabel),
    sourceExcerpt: truncateSourceExcerpt(object.sourceExcerpt, warningCodes, evidenceWarnings),
    normalizedValue: valueResult.normalizedValue,
    valueType: fieldMeta?.valueType ?? object.valueType ?? null,
    unit: fieldMeta?.unit ?? object.unit ?? null,
    sourceType,
    confidence,
    extractionMethod,
    verifiedBy: normalizeString(object.verifiedBy),
    verificationStatus: rejected ? VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED : verificationStatus,
    notes: normalizeString(object.notes),
    warnings: uniqueStrings(evidenceWarnings),
    isValueValid: fieldMeta ? valueResult.valid : false,
    originalOrder: index,
  };
}

function buildDocumentVinGroups(evidence) {
  const groups = new Map();
  for (const item of evidence) {
    if (item.field === "vehicle.vin" && item.isValueValid && item.documentId && !item.vehicleCandidateId) {
      groups.set(item.documentId, deterministicId("candidate_auto", ["vin", item.normalizedValue]));
    }
  }
  return groups;
}

function assignedCandidateId(evidenceItem, documentVinGroups) {
  if (evidenceItem.vehicleCandidateId) return evidenceItem.vehicleCandidateId;
  if (VEHICLE_TAX_CASE_FILE_FIELD_CATALOG[evidenceItem.field]?.scope !== "vehicle") return null;
  if (evidenceItem.documentId && documentVinGroups.has(evidenceItem.documentId)) return documentVinGroups.get(evidenceItem.documentId);
  return deterministicId("candidate_auto", ["document", evidenceItem.documentId ?? evidenceItem.evidenceId]);
}

function ensureCandidate(candidatesById, candidateId, documents, evidenceItem) {
  if (!candidateId) return;
  if (!candidatesById.has(candidateId)) {
    candidatesById.set(candidateId, {
      vehicleCandidateId: candidateId,
      status: "derived",
      documentIds: [],
      evidenceIds: [],
      facts: buildMissingFacts("vehicle"),
      conflicts: [],
      assumptions: ["Vehicle candidate created deterministically from documentary evidence."],
      warnings: [],
      order: candidatesById.size,
    });
  }
  const candidate = candidatesById.get(candidateId);
  if (evidenceItem.documentId && documents.has(evidenceItem.documentId) && !candidate.documentIds.includes(evidenceItem.documentId)) {
    candidate.documentIds.push(evidenceItem.documentId);
  }
  if (!candidate.evidenceIds.includes(evidenceItem.evidenceId)) {
    candidate.evidenceIds.push(evidenceItem.evidenceId);
  }
}

function sourcePriorityForField(field, evidenceItem) {
  if (field === "transaction.purchasePrice") return PRICE_DOCUMENT_PRIORITY.get(evidenceItem.documentType) ?? 0;
  if (field === "vehicle.firstRegistrationDate") return REGISTRATION_DATE_DOCUMENT_PRIORITY.get(evidenceItem.documentType) ?? 0;
  if (field.startsWith("vehicle.")) return TECHNICAL_DOCUMENT_PRIORITY.get(evidenceItem.documentType) ?? 0;
  if (CONTRACTUAL_DOCUMENTS.has(evidenceItem.documentType)) return 50;
  if (evidenceItem.documentType === VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.PROFESSIONAL_REPORT) return 40;
  if (evidenceItem.documentType === VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.USER_DECLARATION) return 20;
  if (evidenceItem.documentType === VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES.VEHICLE_AD) return 10;
  return 0;
}

function rankEvidence(evidenceItem) {
  let statusRank = VERIFICATION_PRIORITY[evidenceItem.verificationStatus] ?? 0;
  if (
    evidenceItem.sourceType === VEHICLE_TAX_CASE_FILE_SOURCE_TYPES.CONTRACTUAL_DOCUMENT &&
    CONTRACTUAL_DOCUMENTS.has(evidenceItem.documentType)
  ) {
    statusRank = Math.max(statusRank, 600);
  }
  return {
    statusRank,
    documentRank: sourcePriorityForField(evidenceItem.field, evidenceItem),
    confidence: evidenceItem.confidence ?? -1,
    evidenceId: evidenceItem.evidenceId,
  };
}

function compareEvidence(left, right) {
  const leftRank = rankEvidence(left);
  const rightRank = rankEvidence(right);
  if (leftRank.statusRank !== rightRank.statusRank) return rightRank.statusRank - leftRank.statusRank;
  if (leftRank.documentRank !== rightRank.documentRank) return rightRank.documentRank - leftRank.documentRank;
  if (leftRank.confidence !== rightRank.confidence) return rightRank.confidence - leftRank.confidence;
  return leftRank.evidenceId.localeCompare(rightRank.evidenceId);
}

function comparableValue(value) {
  return JSON.stringify(value);
}

function factStatusFromEvidence(evidenceItem) {
  if (!evidenceItem.isValueValid) return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INVALID;
  if (evidenceItem.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_OFFICIAL) return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED;
  if (evidenceItem.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_PROFESSIONAL) return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED;
  if (evidenceItem.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_USER) return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE;
  if (evidenceItem.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.INFERRED) return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INFERRED;
  if (evidenceItem.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.SCENARIO) return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.SCENARIO_REQUIRED;
  return VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE;
}

function makeAlternative(evidenceItem) {
  return {
    evidenceId: evidenceItem.evidenceId,
    value: evidenceItem.normalizedValue,
    normalizedValue: evidenceItem.normalizedValue,
    verificationStatus: evidenceItem.verificationStatus,
    documentType: evidenceItem.documentType,
    sourceType: evidenceItem.sourceType,
    confidence: evidenceItem.confidence,
  };
}

function resolveFact(field, evidenceItems, conflictSink, candidateId = null) {
  const fact = emptyFact(field);
  const relevant = evidenceItems
    .filter((item) => item.field === field)
    .sort(compareEvidence);
  fact.evidenceIds = relevant.map((item) => item.evidenceId);
  fact.alternatives = relevant.map(makeAlternative);
  if (relevant.length === 0) return fact;
  const selectable = relevant.filter((item) => item.verificationStatus !== VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED);
  if (selectable.length === 0) {
    return { ...fact, status: VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING, warnings: [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_VALUE] };
  }
  const validSelectable = selectable.filter((item) => item.isValueValid);
  if (validSelectable.length === 0) {
    return { ...fact, status: VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INVALID, warnings: [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_VALUE] };
  }
  const topRank = rankEvidence(validSelectable[0]);
  const sameStatusRank = validSelectable.filter((item) => rankEvidence(item).statusRank === topRank.statusRank);
  const sameStatusValues = new Set(sameStatusRank.map((item) => comparableValue(item.normalizedValue)));
  if (sameStatusRank.length > 1 && sameStatusValues.size > 1) {
    const type = field.endsWith("Date")
      ? VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.DATE_CONFLICT
      : field.includes("sellerType") || field.includes("buyerType") || field.includes("vat")
        ? VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.CLASSIFICATION_CONFLICT
        : VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.VALUE_CONFLICT;
    conflictSink.push(buildConflict({
      type,
      field,
      candidateId,
      evidenceIds: sameStatusRank.map((item) => item.evidenceId),
      warningCode: VEHICLE_TAX_CASE_FILE_WARNING_CODES.VALUE_CONFLICT,
    }));
    return {
      ...fact,
      status: VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFLICT,
      selectedEvidenceId: null,
      warnings: [VEHICLE_TAX_CASE_FILE_WARNING_CODES.VALUE_CONFLICT],
      selectionReason: "Same-level evidence contains different values; no value selected.",
    };
  }
  const sameRank = validSelectable.filter((item) => {
    const rank = rankEvidence(item);
    return rank.statusRank === topRank.statusRank && rank.documentRank === topRank.documentRank;
  });
  const sameRankValues = new Set(sameRank.map((item) => comparableValue(item.normalizedValue)));
  if (sameRankValues.size > 1) {
    const type = field.endsWith("Date")
      ? VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.DATE_CONFLICT
      : field.includes("sellerType") || field.includes("buyerType") || field.includes("vat")
        ? VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.CLASSIFICATION_CONFLICT
        : VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.VALUE_CONFLICT;
    conflictSink.push(buildConflict({
      type,
      field,
      candidateId,
      evidenceIds: sameRank.map((item) => item.evidenceId),
      warningCode: VEHICLE_TAX_CASE_FILE_WARNING_CODES.VALUE_CONFLICT,
    }));
    return {
      ...fact,
      status: VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFLICT,
      selectedEvidenceId: null,
      warnings: [VEHICLE_TAX_CASE_FILE_WARNING_CODES.VALUE_CONFLICT],
      selectionReason: "Same-priority evidence contains different values; no value selected.",
    };
  }
  const selected = validSelectable[0];
  const lowerDifferent = validSelectable.some((item) => comparableValue(item.normalizedValue) !== comparableValue(selected.normalizedValue));
  return {
    ...fact,
    value: selected.normalizedValue,
    normalizedValue: selected.normalizedValue,
    status: factStatusFromEvidence(selected),
    selectedEvidenceId: selected.evidenceId,
    selectionReason: lowerDifferent
      ? "Selected by verification and document priority; lower-priority alternatives are preserved."
      : "Selected by verification and document priority.",
    warnings: [],
  };
}

function buildConflict({ type, field, candidateId, evidenceIds, warningCode }) {
  const critical = type === VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.IDENTITY_CONFLICT;
  return {
    conflictId: deterministicId("conflict", [type, field, candidateId, evidenceIds]),
    severity: critical
      ? VEHICLE_TAX_CASE_FILE_CONFLICT_SEVERITIES.CRITICAL_IDENTITY
      : VEHICLE_TAX_CASE_FILE_CONFLICT_SEVERITIES.BLOCKING_FOR_ENGINE,
    type,
    fields: [field],
    vehicleCandidateIds: candidateId ? [candidateId] : [],
    evidenceIds: uniqueStrings(evidenceIds).sort(),
    description: critical
      ? "Official vehicle identity evidence conflicts inside the same candidate."
      : "Same-priority evidence conflicts for the same field.",
    resolutionStatus: VEHICLE_TAX_CASE_FILE_CONFLICT_RESOLUTION_STATUSES.UNRESOLVED,
    selectedValue: null,
    selectedValueReason: "",
    warnings: [warningCode],
  };
}

function appendIdentityConflicts(candidate, allEvidence) {
  const vinEvidence = allEvidence.filter((item) =>
    item.field === "vehicle.vin" &&
    candidate.evidenceIds.includes(item.evidenceId) &&
    item.isValueValid &&
    item.verificationStatus === VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.CONFIRMED_OFFICIAL &&
    OFFICIAL_VEHICLE_DOCUMENTS.has(item.documentType)
  );
  const values = new Set(vinEvidence.map((item) => item.normalizedValue));
  if (values.size <= 1) return [];
  return [buildConflict({
    type: VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.IDENTITY_CONFLICT,
    field: "vehicle.vin",
    candidateId: candidate.vehicleCandidateId,
    evidenceIds: vinEvidence.map((item) => item.evidenceId),
    warningCode: VEHICLE_TAX_CASE_FILE_WARNING_CODES.IDENTITY_CONFLICT,
  })];
}

function buildScenariosFromConflictingFacts(facts, candidateId = null) {
  const scenarios = [];
  for (const field of Object.keys(facts).sort()) {
    const fact = facts[field];
    if (![VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFLICT, VEHICLE_TAX_CASE_FILE_FACT_STATUSES.SCENARIO_REQUIRED].includes(fact.status)) continue;
    const alternatives = fact.alternatives.filter((item) => item.verificationStatus !== VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED);
    for (const [index, alternative] of alternatives.entries()) {
      scenarios.push({
        scenarioId: deterministicId("scenario", [candidateId, field, alternative.evidenceId, index]),
        label: `Documentary alternative for ${field}`,
        appliesToEngines: enginesForField(field),
        factOverrides: { [field]: alternative.normalizedValue },
        assumptions: ["Documentary alternative only; no fiscal conclusion is calculated."],
        evidenceIds: [alternative.evidenceId],
        confidence: alternative.confidence,
        status: "documentary_alternative",
        warnings: fact.warnings,
      });
    }
  }
  return scenarios;
}

function enginesForField(field) {
  const engines = new Set();
  if (["vehicle.boeValue", "vehicle.firstRegistrationDate", "vehicle.co2Wltp", "vehicle.co2Nedc", "vehicle.condition"].includes(field)) engines.add("iedmt");
  if (field.startsWith("transaction.") || field.startsWith("parties.") || ["vehicle.boeValue", "vehicle.firstRegistrationDate", "vehicle.category", "vehicle.engineDisplacementCc", "vehicle.fiscalHorsepower", "vehicle.zeroEmissionStatus", "vehicle.isHistoricVehicle", "vehicle.isEndOfLifeVehicle"].includes(field)) engines.add("itp");
  if (["vehicle.fiscalHorsepower", "vehicle.spanishRegistrationDate", "vehicle.category", "vehicle.zeroEmissionStatus", "vehicle.isHistoricVehicle"].includes(field) || field.startsWith("taxDestination.")) engines.add("ivtm");
  if (["vehicle.category", "vehicle.spanishRegistrationDate", "taxDestination.expectedSettlementDate"].includes(field)) engines.add("dgt_registration_fee");
  return Array.from(engines).sort();
}

function deriveSection(facts, prefix) {
  const output = {};
  for (const [field, fact] of Object.entries(facts)) {
    if (field.startsWith(`${prefix}.`)) {
      output[field.slice(prefix.length + 1)] = cloneNoWarn(fact);
    }
  }
  return output;
}

function cloneNoWarn(value) {
  return JSON.parse(JSON.stringify(value));
}

function fieldValueForReadiness(globalFacts, selectedCandidate, field) {
  const fact = field.startsWith("vehicle.") ? selectedCandidate?.facts?.[field] : globalFacts[field];
  return fact ?? emptyFact(field);
}

function buildReadinessForEngine(engine, requiredFields, globalFacts, selectedCandidate, identityConflict, extraRules = () => ({})) {
  if (Array.isArray(identityConflict) && identityConflict.length > 0) {
    return {
      status: VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.IDENTITY_CONFLICT,
      confirmedInputs: [],
      probableInputs: [],
      scenarioInputs: [],
      missingInputs: [],
      conflictingInputs: [],
      blockingConflicts: identityConflict.map((item) => item.conflictId),
      assumptions: [],
      warnings: [VEHICLE_TAX_CASE_FILE_WARNING_CODES.IDENTITY_CONFLICT],
    };
  }
  const confirmedInputs = [];
  const probableInputs = [];
  const scenarioInputs = [];
  const missingInputs = [];
  const conflictingInputs = [];
  for (const field of requiredFields) {
    const fact = fieldValueForReadiness(globalFacts, selectedCandidate, field);
    if (fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED) confirmedInputs.push(field);
    else if ([VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE, VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INFERRED].includes(fact.status)) probableInputs.push(field);
    else if (fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.SCENARIO_REQUIRED) scenarioInputs.push(field);
    else if (fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFLICT || fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INVALID) conflictingInputs.push(field);
    else missingInputs.push(field);
  }
  const extra = extraRules({ confirmedInputs, probableInputs, scenarioInputs, missingInputs, conflictingInputs });
  const finalMissing = uniqueStrings([...missingInputs, ...(extra.missingInputs ?? [])]);
  const finalScenario = uniqueStrings([...scenarioInputs, ...(extra.scenarioInputs ?? [])]);
  const finalConflicting = uniqueStrings([...conflictingInputs, ...(extra.conflictingInputs ?? [])]);
  let status = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_CONFIRMED;
  if (finalConflicting.length > 0) status = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.INVALID;
  else if (finalMissing.length > 0) status = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.INSUFFICIENT_DATA;
  else if (finalScenario.length > 0) status = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_WITH_SCENARIOS;
  else if (probableInputs.length > 0 || (extra.assumptions ?? []).length > 0) status = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_WITH_ASSUMPTIONS;
  return {
    status,
    confirmedInputs: uniqueStrings(confirmedInputs).sort(),
    probableInputs: uniqueStrings(probableInputs).sort(),
    scenarioInputs: finalScenario.sort(),
    missingInputs: finalMissing.sort(),
    conflictingInputs: finalConflicting.sort(),
    blockingConflicts: [],
    assumptions: uniqueStrings(extra.assumptions).sort(),
    warnings: uniqueStrings(extra.warnings).sort(),
  };
}

function buildReadiness(globalFacts, selectedCandidate, conflicts) {
  const identityConflicts = conflicts.filter((item) => item.type === VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES.IDENTITY_CONFLICT);
  const iedmtCo2Rule = () => {
    const wltp = fieldValueForReadiness(globalFacts, selectedCandidate, "vehicle.co2Wltp");
    const nedc = fieldValueForReadiness(globalFacts, selectedCandidate, "vehicle.co2Nedc");
    if ([wltp.status, nedc.status].includes(VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED)) return {};
    if ([wltp.status, nedc.status].includes(VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE)) return {};
    return { missingInputs: ["vehicle.co2Wltp|vehicle.co2Nedc"] };
  };
  const iedmt = buildReadinessForEngine(
    "iedmt",
    ["vehicle.boeValue", "vehicle.firstRegistrationDate", "vehicle.condition", "taxDestination.autonomousCommunity"],
    globalFacts,
    selectedCandidate,
    identityConflicts,
    iedmtCo2Rule
  );
  const itp = buildReadinessForEngine(
    "itp",
    [
      "transaction.date",
      "transaction.purchasePrice",
      "transaction.currency",
      "transaction.sellerType",
      "transaction.buyerType",
      "transaction.vatRegime",
      "parties.buyerTaxResidenceCountry",
      "taxDestination.autonomousCommunity",
    ],
    globalFacts,
    selectedCandidate,
    identityConflicts,
    () => {
      const ac = fieldValueForReadiness(globalFacts, selectedCandidate, "taxDestination.autonomousCommunity").normalizedValue;
      const province = fieldValueForReadiness(globalFacts, selectedCandidate, "taxDestination.province");
      const foral = fieldValueForReadiness(globalFacts, selectedCandidate, "taxDestination.foralTerritory");
      const needsProvince = typeof ac === "string" && ["pais vasco", "euskadi", "basque_country"].includes(ac.toLowerCase());
      return needsProvince && province.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING && foral.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING
        ? { missingInputs: ["taxDestination.province"], warnings: ["Basque territory requires province or foral territory."] }
        : {};
    }
  );
  const ivtm = buildReadinessForEngine(
    "ivtm",
    ["vehicle.fiscalHorsepower", "vehicle.spanishRegistrationDate", "vehicle.category", "taxDestination.municipalityCode", "taxDestination.expectedSettlementDate"],
    globalFacts,
    selectedCandidate,
    identityConflicts
  );
  const dgt = buildReadinessForEngine(
    "dgt_registration_fee",
    ["vehicle.category", "taxDestination.expectedSettlementDate"],
    globalFacts,
    selectedCandidate,
    identityConflicts,
    () => ({ assumptions: ["Procedure is not calculated here; downstream DGT engine must receive ordinary_vehicle_registration explicitly."] })
  );
  const childReadiness = [iedmt, itp, ivtm, dgt];
  let summaryStatus = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_CONFIRMED;
  if (childReadiness.some((item) => item.status === VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.IDENTITY_CONFLICT)) summaryStatus = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.IDENTITY_CONFLICT;
  else if (childReadiness.some((item) => item.status === VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.INVALID)) summaryStatus = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.INVALID;
  else if (childReadiness.some((item) => item.status === VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.INSUFFICIENT_DATA)) summaryStatus = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.INSUFFICIENT_DATA;
  else if (childReadiness.some((item) => item.status === VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_WITH_SCENARIOS)) summaryStatus = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_WITH_SCENARIOS;
  else if (childReadiness.some((item) => item.status === VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_WITH_ASSUMPTIONS)) summaryStatus = VEHICLE_TAX_CASE_FILE_READINESS_STATUSES.READY_WITH_ASSUMPTIONS;
  const tax_summary = {
    status: summaryStatus,
    confirmedInputs: [],
    probableInputs: [],
    scenarioInputs: childReadiness.flatMap((item) => item.scenarioInputs),
    missingInputs: childReadiness.flatMap((item) => item.missingInputs),
    conflictingInputs: childReadiness.flatMap((item) => item.conflictingInputs),
    blockingConflicts: childReadiness.flatMap((item) => item.blockingConflicts),
    assumptions: childReadiness.flatMap((item) => item.assumptions),
    warnings: childReadiness.flatMap((item) => item.warnings),
  };
  return { iedmt, itp, ivtm, dgt_registration_fee: dgt, tax_summary };
}

function summarizeSensitiveData(documents, evidence, warningCodes) {
  const categories = new Set();
  let documentCount = 0;
  let evidenceCount = 0;
  for (const document of documents) {
    if (document.containsPersonalData) {
      documentCount += 1;
      categories.add("identity");
    }
  }
  for (const item of evidence) {
    const itemCategories = new Set();
    if (item.field === "vehicle.vin") itemCategories.add("vehicle_identifier");
    if (item.field === "parties.buyerTaxResidenceCountry") itemCategories.add("tax_residence");
    if (item.sourceExcerpt && /@/.test(item.sourceExcerpt)) itemCategories.add("contact");
    if (item.sourceExcerpt && /iban|bic|konto|bank/i.test(item.sourceExcerpt)) itemCategories.add("financial");
    if (item.sourceExcerpt && /signature|firma|unterschrift/i.test(item.sourceExcerpt)) itemCategories.add("signature");
    if (item.sourceExcerpt && /(street|strasse|calle|adresse|address)/i.test(item.sourceExcerpt)) itemCategories.add("address");
    for (const category of itemCategories) categories.add(category);
    if (itemCategories.size > 0) evidenceCount += 1;
  }
  const containsPersonalData = documentCount > 0 || categories.size > 0;
  if (containsPersonalData) warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.SENSITIVE_DATA_PRESENT);
  return {
    containsPersonalData,
    categories: Array.from(categories).sort(),
    documentCount,
    evidenceCount,
    warnings: containsPersonalData ? [VEHICLE_TAX_CASE_FILE_WARNING_CODES.SENSITIVE_DATA_PRESENT] : [],
  };
}

function topLevelMissingFields(output) {
  const missing = [];
  for (const [field, fact] of Object.entries(output.facts)) {
    if (fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING) missing.push(field);
  }
  for (const candidate of output.vehicleCandidates) {
    for (const [field, fact] of Object.entries(candidate.facts)) {
      if (fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.MISSING) missing.push(`${candidate.vehicleCandidateId}.${field}`);
    }
  }
  return missing.sort();
}

export function buildVehicleTaxCaseFile(input) {
  const warningCodes = [];
  const root = isPlainObject(input) ? input : {};
  if (!isPlainObject(input)) warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_FILE_INPUT);
  const clonedRoot = cloneJson(root, warningCodes);
  const schemaVersion = clonedRoot.schemaVersion === VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION
    ? VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION
    : VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION;
  if (clonedRoot.schemaVersion !== VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SCHEMA_VERSION);
  }
  const rawCreatedAtPresent = Object.hasOwn(root, "createdAt") && root.createdAt !== null && root.createdAt !== undefined && root.createdAt !== "";
  const rawUpdatedAtPresent = Object.hasOwn(root, "updatedAt") && root.updatedAt !== null && root.updatedAt !== undefined && root.updatedAt !== "";
  const createdAt = normalizeIsoLikeDate(clonedRoot.createdAt);
  const updatedAt = normalizeIsoLikeDate(clonedRoot.updatedAt);
  const invalidCreatedAt = rawCreatedAtPresent && createdAt === null;
  const invalidUpdatedAt = rawUpdatedAtPresent && updatedAt === null;
  const invalidTimestampOrder = createdAt !== null && updatedAt !== null && Date.parse(createdAt) > Date.parse(updatedAt);
  if (invalidCreatedAt || invalidUpdatedAt || invalidTimestampOrder) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_TIMESTAMPS);
  }
  const documentsInput = Array.isArray(clonedRoot.documents) ? clonedRoot.documents : [];
  const seenDocumentIds = new Set();
  const documents = documentsInput
    .map((item, index) => sanitizeDocument(item, index, seenDocumentIds, warningCodes))
    .sort((left, right) => canonicalSortById(left, right, "documentId"));
  const documentsById = new Map(documents.filter((item) => item.extractionStatus !== VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES.REJECTED).map((item) => [item.documentId, item]));
  const candidateInput = Array.isArray(clonedRoot.vehicleCandidates) ? clonedRoot.vehicleCandidates : [];
  const candidatesById = new Map();
  for (const [index, item] of candidateInput.entries()) {
    const candidate = sanitizeDeclaredCandidate(item, index, warningCodes);
    if (candidate && !candidatesById.has(candidate.vehicleCandidateId)) candidatesById.set(candidate.vehicleCandidateId, candidate);
  }
  const seenEvidenceIds = new Set();
  const evidenceInput = Array.isArray(root.evidence)
    ? root.evidence
    : (Array.isArray(clonedRoot.evidence) ? clonedRoot.evidence : []);
  const evidence = evidenceInput
    .map((item, index) => sanitizeEvidence(item, index, documentsById, new Set(candidatesById.keys()), seenEvidenceIds, warningCodes));
  const documentVinGroups = buildDocumentVinGroups(evidence);
  for (const item of evidence) {
    const candidateId = assignedCandidateId(item, documentVinGroups);
    if (candidateId) item.vehicleCandidateId = candidateId;
    ensureCandidate(candidatesById, candidateId, documentsById, item);
  }
  const globalFacts = buildMissingFacts("global");
  const globalConflicts = [];
  const validEvidence = evidence.filter((item) => item.verificationStatus !== VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES.REJECTED);
  for (const field of Object.keys(globalFacts)) {
    globalFacts[field] = resolveFact(field, validEvidence, globalConflicts, null);
  }
  const vehicleCandidates = Array.from(candidatesById.values())
    .sort((left, right) => left.order - right.order || left.vehicleCandidateId.localeCompare(right.vehicleCandidateId))
    .map((candidate) => {
      const candidateEvidence = validEvidence.filter((item) => item.vehicleCandidateId === candidate.vehicleCandidateId);
      const conflicts = [];
      const facts = buildMissingFacts("vehicle");
      for (const field of Object.keys(facts)) {
        facts[field] = resolveFact(field, candidateEvidence, conflicts, candidate.vehicleCandidateId);
      }
      const identityConflicts = appendIdentityConflicts(candidate, evidence);
      return {
        vehicleCandidateId: candidate.vehicleCandidateId,
        status: identityConflicts.length > 0 ? "identity_conflict" : candidate.status,
        documentIds: uniqueStrings(candidate.documentIds).sort(),
        evidenceIds: uniqueStrings(candidate.evidenceIds).sort(),
        facts,
        conflicts: [...conflicts, ...identityConflicts],
        assumptions: uniqueStrings(candidate.assumptions),
        warnings: uniqueStrings([...candidate.warnings, ...identityConflicts.flatMap((item) => item.warnings)]),
      };
    });
  let selectedVehicleCandidateId = normalizeId(clonedRoot.selectedVehicleCandidateId);
  if (!selectedVehicleCandidateId && vehicleCandidates.length === 1) {
    selectedVehicleCandidateId = vehicleCandidates[0].vehicleCandidateId;
  } else if (selectedVehicleCandidateId && !vehicleCandidates.some((item) => item.vehicleCandidateId === selectedVehicleCandidateId)) {
    warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SELECTED_CANDIDATE);
    selectedVehicleCandidateId = null;
  } else if (!selectedVehicleCandidateId) {
    selectedVehicleCandidateId = null;
  }
  const selectedCandidate = vehicleCandidates.find((item) => item.vehicleCandidateId === selectedVehicleCandidateId) ?? null;
  const conflicts = [...globalConflicts, ...vehicleCandidates.flatMap((candidate) => candidate.conflicts)]
    .sort((left, right) => left.conflictId.localeCompare(right.conflictId));
  const scenarioSource = [
    ...buildScenariosFromConflictingFacts(globalFacts, null),
    ...vehicleCandidates.flatMap((candidate) => buildScenariosFromConflictingFacts(candidate.facts, candidate.vehicleCandidateId)),
  ].sort((left, right) => left.scenarioId.localeCompare(right.scenarioId));
  const scenarios = scenarioSource.slice(0, MAX_SCENARIOS);
  if (scenarioSource.length > MAX_SCENARIOS) warningCodes.push(VEHICLE_TAX_CASE_FILE_WARNING_CODES.CASE_FILE_SCENARIOS_TRUNCATED);
  const readiness = buildReadiness(globalFacts, selectedCandidate, conflicts);
  const output = {
    schemaVersion,
    caseId: normalizeId(clonedRoot.caseId),
    createdAt,
    updatedAt,
    documents,
    vehicleCandidates,
    selectedVehicleCandidateId,
    facts: globalFacts,
    parties: deriveSection(globalFacts, "parties"),
    transaction: deriveSection(globalFacts, "transaction"),
    taxDestination: deriveSection(globalFacts, "taxDestination"),
    evidence: evidence
      .map(({ isValueValid, originalOrder, ...item }) => item)
      .sort((left, right) => canonicalSortById(left, right, "evidenceId")),
    conflicts,
    scenarios,
    readiness,
    assumptions: uniqueStrings(clonedRoot.assumptions),
    warnings: [],
    warningCodes: [],
    missingFields: [],
    sensitiveDataSummary: null,
  };
  output.sensitiveDataSummary = summarizeSensitiveData(output.documents, output.evidence, warningCodes);
  output.warningCodes = uniqueStrings([
    ...warningCodes,
    ...output.documents.flatMap((item) => item.warnings),
    ...output.evidence.flatMap((item) => item.warnings),
    ...output.conflicts.flatMap((item) => item.warnings),
  ]).sort();
  output.warnings = warningMessages(output.warningCodes);
  output.missingFields = topLevelMissingFields(output);
  return cloneNoWarn(output);
}
