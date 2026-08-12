import {
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES,
  VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS,
  VEHICLE_TAX_CASE_FILE_FIELD_CATALOG,
  VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
  VEHICLE_TAX_CASE_FILE_SOURCE_TYPES,
  VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES,
} from "../data/vehicleTaxCaseFileCatalogs.mjs";
import { buildVehicleTaxCaseFile } from "./vehicleTaxCaseFile.mjs";

export const VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION = "vehicle_tax_action_request.v1";
export const VEHICLE_TAX_ACTION_LIMITATIONS = Object.freeze({
  imKundenauftrag: "out_of_scope_structured_v1",
  ivtmBonifications: "out_of_scope_structured_v1",
});

const ROOT_KEYS = Object.freeze(["caseId", "documents", "evidence", "options", "schemaVersion", "selectedVehicleCandidateId"]);
const DOCUMENT_KEYS = Object.freeze(["candidateId", "documentId", "documentType", "pageCount"]);
const EVIDENCE_KEYS = Object.freeze(["candidateId", "documentId", "evidenceId", "extractionMethod", "field", "normalizedValue", "page", "sourceType", "valueType", "verificationStatus"]);
const OPTION_KEYS = Object.freeze(["calculationDate", "currency", "maxScenarios", "scenarioPolicy", "taxYear"]);
const DOCUMENT_TYPES = new Set(VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES);
const SOURCE_TYPES = new Set(Object.values(VEHICLE_TAX_CASE_FILE_SOURCE_TYPES));
const EXTRACTION_METHODS = new Set(Object.values(VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS));
const VERIFICATION_STATUSES = new Set(Object.values(VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES));

const SPANISH_AUTONOMOUS_COMMUNITIES = Object.freeze([
  "andalucia", "aragon", "asturias", "canarias", "cantabria", "castilla_la_mancha", "castilla_y_leon", "cataluna", "ceuta", "comunitat_valenciana", "extremadura", "galicia", "illes_balears", "la_rioja", "madrid", "melilla", "murcia", "navarra", "pais_vasco",
]);
const SPANISH_PROVINCES = Object.freeze([
  "alava", "albacete", "alicante", "almeria", "asturias", "avila", "badajoz", "barcelona", "bizkaia", "burgos", "caceres", "cadiz", "cantabria", "castellon", "ceuta", "ciudad_real", "cordoba", "cuenca", "girona", "granada", "guadalajara", "gipuzkoa", "huelva", "huesca", "illes_balears", "jaen", "la_coruna", "la_rioja", "las_palmas", "leon", "lleida", "lugo", "madrid", "malaga", "melilla", "murcia", "navarra", "ourense", "palencia", "pontevedra", "salamanca", "santa_cruz_de_tenerife", "segovia", "sevilla", "soria", "tarragona", "teruel", "toledo", "valencia", "valladolid", "zamora", "zaragoza",
]);
const COUNTRY_CODES = Object.freeze(["DE", "ES"]);
const CURRENCY_CODES = Object.freeze(["EUR"]);

export const VEHICLE_TAX_ACTION_FIELD_CONTRACT = Object.freeze({
  "vehicle.category": { valueType: "enum", enumValues: ["passenger_car", "turismo", "suv", "mixed_adaptable", "unknown"] },
  "vehicle.fuelType": { valueType: "enum", enumValues: ["gasoline", "diesel", "hybrid", "phev", "electric", "hydrogen", "other", "unknown"] },
  "vehicle.engineDisplacementCc": { valueType: "number", min: 1, max: 10000 },
  "vehicle.fiscalHorsepower": { valueType: "number", min: 0.01, max: 100 },
  "vehicle.firstRegistrationDate": { valueType: "date", allowYearMonth: true },
  "vehicle.spanishRegistrationDate": { valueType: "date", allowYearMonth: false },
  "vehicle.condition": { valueType: "enum", enumValues: ["usado_importado", "nuevo_o_no_matriculado", "desconocido"] },
  "vehicle.co2Wltp": { valueType: "number", min: 0, max: 600 },
  "vehicle.co2Nedc": { valueType: "number", min: 0, max: 600 },
  "vehicle.emissionsStandard": { valueType: "enum", enumValues: ["wltp", "nedc", "unknown"] },
  "vehicle.zeroEmissionStatus": { valueType: "enum", enumValues: ["confirmed", "not_zero_emission", "unknown"] },
  "vehicle.boeValue": { valueType: "money", min: 0.01, max: 2000000 },
  "vehicle.boeValueYear": { valueType: "year", min: 1990, max: 2100 },
  "vehicle.isHistoricVehicle": { valueType: "boolean" },
  "vehicle.isEndOfLifeVehicle": { valueType: "boolean" },
  "transaction.date": { valueType: "date", allowYearMonth: false },
  "transaction.purchasePrice": { valueType: "money", min: 0.01, max: 2000000 },
  "transaction.currency": { valueType: "currency", enumValues: CURRENCY_CODES },
  "transaction.purchaseCountry": { valueType: "country", enumValues: COUNTRY_CODES },
  "transaction.documentType": { valueType: "enum", enumValues: ["invoice", "private_sale_contract", "unknown"] },
  "transaction.sellerType": { valueType: "enum", enumValues: ["private", "professional", "unknown"] },
  "transaction.buyerType": { valueType: "enum", enumValues: ["private", "professional", "vehicle_reseller", "unknown"] },
  "transaction.vatRegime": { valueType: "enum", enumValues: ["general_vat", "rebu", "vat_not_itemized", "not_applicable_private_sale", "unknown"] },
  "transaction.vatItemizedStatus": { valueType: "enum", enumValues: ["itemized", "not_itemized", "unknown"] },
  "transaction.rebuStatus": { valueType: "enum", enumValues: ["confirmed", "not_confirmed", "unknown"] },
  "transaction.intendedForResale": { valueType: "boolean" },
  "parties.sellerCountry": { valueType: "country", enumValues: COUNTRY_CODES },
  "parties.buyerTaxResidenceCountry": { valueType: "country", enumValues: COUNTRY_CODES },
  "taxDestination.autonomousCommunity": { valueType: "enum", enumValues: SPANISH_AUTONOMOUS_COMMUNITIES },
  "taxDestination.province": { valueType: "enum", enumValues: SPANISH_PROVINCES },
  "taxDestination.municipalityCode": { valueType: "ine_code" },
  "taxDestination.foralTerritory": { valueType: "enum", enumValues: ["alava", "bizkaia", "gipuzkoa", "none", "unknown"] },
  "taxDestination.expectedSettlementDate": { valueType: "date", allowYearMonth: false },
});

const LOCAL_PATH_PATTERN = /(?:[A-Za-z]:\\|\/(?:Users|home|var|etc|tmp|mnt|workspace)\/|\\{2})/;
const COMPLETE_VIN_PATTERN = /\b(?=[A-HJ-NPR-Z0-9]{17}\b)(?=[A-HJ-NPR-Z0-9]*\d)[A-HJ-NPR-Z0-9]{17}\b/i;
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const IBAN_PATTERN = /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/i;
const SPANISH_ID_PATTERN = /\b(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z]|[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J])\b/i;
const PHONE_PATTERN = /(?:^|\s)(?:\+\d{7,15}|\+?34[ -]?[6789]\d{2}[ -]?\d{2}[ -]?\d{2}[ -]?\d{2})(?:\s|$)/;
const ADDRESS_PATTERN = /\b(?:calle|carrer|avenida|avinguda|plaza|passeig|paseo|rambla|via|strasse|street|road|adresse|address)\b[^\n\r]{0,80}\b\d{1,5}\b/i;
const URL_PATTERN = /\b(?:[a-z][a-z0-9+.-]*\s*:\s*\/\/|(?:data|javascript|mailto)\s*:|\/\/[^\s/])/i;
const SPANISH_PLATE_PATTERN = /\b\d{4}[ -]?[A-Z]{3}\b/i;
const GERMAN_PLATE_PATTERN = /\b(?:[A-Z]{1,3}[ -][A-Z]{1,2}[ -]?\d{1,4}[A-Z]?|[A-Z]{1,3}-\d{1,4}-[A-Z]{1,2})\b/i;
const HUMAN_WORDS_PATTERN = /\b(?:firma|signature|signed|nombre|name|apellidos|surname|juan|perez|pÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©rez)\b/i;
const TECHNICAL_ID_SUFFIX = "(?:[0-9]{1,12}|[a-z0-9]+(?:-[a-z0-9]+)*|[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})";
const ID_PATTERNS = Object.freeze({
  caseId: new RegExp(`^case-${TECHNICAL_ID_SUFFIX}$`, "i"),
  documentId: new RegExp(`^doc-${TECHNICAL_ID_SUFFIX}$`, "i"),
  evidenceId: new RegExp(`^ev-${TECHNICAL_ID_SUFFIX}$`, "i"),
  candidateId: new RegExp(`^candidate-${TECHNICAL_ID_SUFFIX}$`, "i"),
});

export class VehicleTaxActionDtoError extends Error {
  constructor(code, message, statusCode = 400) {
    super(message);
    this.name = "VehicleTaxActionDtoError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}

function assertPlainObject(value, code, message) {
  if (!isPlainObject(value)) throw new VehicleTaxActionDtoError(code, message);
}

function assertExactKeys(object, allowedKeys, code) {
  const allowed = new Set(allowedKeys);
  for (const key of Object.keys(object)) {
    if (!allowed.has(key)) throw new VehicleTaxActionDtoError(code, "Request contains unsupported fields.");
  }
}

function sensitive(value) {
  if (typeof value !== "string") return false;
  const normalized = value.normalize("NFKC");
  return EMAIL_PATTERN.test(normalized) || IBAN_PATTERN.test(normalized) || SPANISH_ID_PATTERN.test(normalized) || PHONE_PATTERN.test(normalized) || ADDRESS_PATTERN.test(normalized) || COMPLETE_VIN_PATTERN.test(normalized) || HUMAN_WORDS_PATTERN.test(normalized) || LOCAL_PATH_PATTERN.test(normalized) || URL_PATTERN.test(normalized);
}

function assertSafeString(value) {
  if (typeof value !== "string" || value.trim() === "") throw new VehicleTaxActionDtoError("ACTION_FIELD_INVALID", "Request field is invalid.");
  if (sensitive(value)) throw new VehicleTaxActionDtoError("ACTION_PRIVACY_REJECTED", "Request contains unsupported or sensitive fields.");
  return value.trim();
}

function assertSafeId(value, kind, { nullable = false, optional = false } = {}) {
  if (value === undefined && optional) return null;
  if (value === null && nullable) return null;
  const id = assertSafeString(value);
  if (!ID_PATTERNS[kind].test(id)) throw new VehicleTaxActionDtoError("ACTION_ID_INVALID", "Request id is invalid.");
  const suffix = id.slice(`${kind === "caseId" ? "case" : kind === "documentId" ? "doc" : kind === "evidenceId" ? "ev" : "candidate"}-`.length);
  if (SPANISH_PLATE_PATTERN.test(suffix) || GERMAN_PLATE_PATTERN.test(suffix) || HUMAN_WORDS_PATTERN.test(suffix) || COMPLETE_VIN_PATTERN.test(suffix)) throw new VehicleTaxActionDtoError("ACTION_PRIVACY_REJECTED", "Request contains unsupported or sensitive fields.");
  return id;
}

function validIsoDate(value, allowYearMonth = false) {
  if (typeof value !== "string") return false;
  if (allowYearMonth && /^\d{4}-\d{2}$/.test(value)) {
    const month = Number(value.slice(5, 7));
    return month >= 1 && month <= 12;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateOptions(options) {
  assertPlainObject(options, "ACTION_OPTIONS_INVALID", "options is required.");
  assertExactKeys(options, OPTION_KEYS, "ACTION_OPTIONS_KEYS_INVALID");
  if (!validIsoDate(options.calculationDate)) throw new VehicleTaxActionDtoError("ACTION_OPTIONS_INVALID", "options are invalid.");
  if (!Number.isInteger(options.taxYear) || options.taxYear < 1990 || options.taxYear > 2100) throw new VehicleTaxActionDtoError("ACTION_OPTIONS_INVALID", "options are invalid.");
  if (Number(options.calculationDate.slice(0, 4)) !== options.taxYear) throw new VehicleTaxActionDtoError("ACTION_OPTIONS_INVALID", "options are invalid.");
  if (!["confirmed_only", "documentary_scenarios"].includes(options.scenarioPolicy)) throw new VehicleTaxActionDtoError("ACTION_OPTIONS_INVALID", "options are invalid.");
  if (!Number.isInteger(options.maxScenarios) || options.maxScenarios < 0 || options.maxScenarios > 12) throw new VehicleTaxActionDtoError("ACTION_OPTIONS_INVALID", "options are invalid.");
  if (options.currency !== "EUR") throw new VehicleTaxActionDtoError("ACTION_OPTIONS_INVALID", "options are invalid.");
  return { ...options };
}

function validateNormalizedValue(field, value) {
  const meta = VEHICLE_TAX_ACTION_FIELD_CONTRACT[field];
  if (!meta) throw new VehicleTaxActionDtoError("ACTION_FIELD_INVALID", "field is invalid.");
  if (value === null || value === undefined) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
  if (meta.valueType === "number" || meta.valueType === "money") {
    if (typeof value !== "number" || !Number.isFinite(value) || value < meta.min || value > meta.max) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return value;
  }
  if (meta.valueType === "year") {
    if (!Number.isInteger(value) || value < meta.min || value > meta.max) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return value;
  }
  if (meta.valueType === "boolean") {
    if (typeof value !== "boolean") throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return value;
  }
  if (meta.valueType === "date") {
    const text = assertSafeString(value);
    if (!validIsoDate(text, Boolean(meta.allowYearMonth))) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return text;
  }
  if (meta.valueType === "country" || meta.valueType === "currency") {
    const text = assertSafeString(value).toUpperCase();
    if (!meta.enumValues.includes(text)) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return text;
  }
  if (meta.valueType === "ine_code") {
    const text = assertSafeString(value);
    if (!/^\d{5}$/.test(text)) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return text;
  }
  if (meta.valueType === "enum") {
    const text = assertSafeString(value).toLowerCase();
    if (!meta.enumValues.includes(text)) throw new VehicleTaxActionDtoError("ACTION_VALUE_INVALID", "Evidence value is invalid.");
    return text;
  }
  throw new VehicleTaxActionDtoError("ACTION_FIELD_INVALID", "field is invalid.");
}

function validateDocuments(documents) {
  if (!Array.isArray(documents)) throw new VehicleTaxActionDtoError("ACTION_DOCUMENTS_INVALID", "documents must be an array.");
  const seen = new Set();
  return documents.map((document) => {
    assertPlainObject(document, "ACTION_DOCUMENT_INVALID", "document is invalid.");
    assertExactKeys(document, DOCUMENT_KEYS, "ACTION_DOCUMENT_KEYS_INVALID");
    const documentId = assertSafeId(document.documentId, "documentId");
    if (seen.has(documentId)) throw new VehicleTaxActionDtoError("ACTION_REFERENCE_INVALID", "Document reference is invalid.");
    seen.add(documentId);
    if (!DOCUMENT_TYPES.has(document.documentType)) throw new VehicleTaxActionDtoError("ACTION_DOCUMENT_TYPE_INVALID", "documentType is invalid.");
    if (document.pageCount !== undefined && document.pageCount !== null && (!Number.isInteger(document.pageCount) || document.pageCount <= 0)) throw new VehicleTaxActionDtoError("ACTION_PAGE_INVALID", "page is invalid.");
    return {
      documentId,
      documentType: document.documentType,
      pageCount: document.pageCount ?? null,
      candidateId: assertSafeId(document.candidateId, "candidateId", { nullable: true, optional: true }),
    };
  });
}

function validateEvidence(evidenceItems, documentsById) {
  if (!Array.isArray(evidenceItems)) throw new VehicleTaxActionDtoError("ACTION_EVIDENCE_INVALID", "evidence must be an array.");
  const seen = new Set();
  return evidenceItems.map((item) => {
    assertPlainObject(item, "ACTION_EVIDENCE_INVALID", "evidence is invalid.");
    assertExactKeys(item, EVIDENCE_KEYS, "ACTION_EVIDENCE_KEYS_INVALID");
    const evidenceId = assertSafeId(item.evidenceId, "evidenceId");
    if (seen.has(evidenceId)) throw new VehicleTaxActionDtoError("ACTION_REFERENCE_INVALID", "Evidence reference is invalid.");
    seen.add(evidenceId);
    const documentId = assertSafeId(item.documentId, "documentId", { nullable: true, optional: true });
    const document = documentId ? documentsById.get(documentId) : null;
    if (documentId && !document) throw new VehicleTaxActionDtoError("ACTION_REFERENCE_INVALID", "Document reference is invalid.");
    const candidateId = assertSafeId(item.candidateId, "candidateId", { nullable: true, optional: true });
    if (item.page !== undefined && item.page !== null && (!Number.isInteger(item.page) || item.page <= 0)) throw new VehicleTaxActionDtoError("ACTION_PAGE_INVALID", "page is invalid.");
    if (document && item.page && document.pageCount && item.page > document.pageCount) throw new VehicleTaxActionDtoError("ACTION_PAGE_INVALID", "page is invalid.");
    if (!SOURCE_TYPES.has(item.sourceType)) throw new VehicleTaxActionDtoError("ACTION_SOURCE_INVALID", "sourceType is invalid.");
    if (!EXTRACTION_METHODS.has(item.extractionMethod)) throw new VehicleTaxActionDtoError("ACTION_EXTRACTION_INVALID", "extractionMethod is invalid.");
    if (!VERIFICATION_STATUSES.has(item.verificationStatus)) throw new VehicleTaxActionDtoError("ACTION_VERIFICATION_INVALID", "verificationStatus is invalid.");
    const normalizedValue = validateNormalizedValue(item.field, item.normalizedValue);
    return {
      evidenceId,
      documentId,
      vehicleCandidateId: candidateId,
      field: item.field,
      documentType: document?.documentType ?? "user_declaration",
      page: item.page ?? null,
      fieldLabel: null,
      sourceExcerpt: null,
      normalizedValue,
      valueType: VEHICLE_TAX_ACTION_FIELD_CONTRACT[item.field].valueType,
      unit: VEHICLE_TAX_CASE_FILE_FIELD_CATALOG[item.field].unit,
      sourceType: item.sourceType,
      confidence: null,
      extractionMethod: item.extractionMethod,
      verifiedBy: null,
      verificationStatus: item.verificationStatus,
      notes: null,
    };
  });
}

function buildCandidateInputs({ documents, evidence, selectedVehicleCandidateId }) {
  const ids = new Set();
  for (const document of documents) if (document.candidateId) ids.add(document.candidateId);
  for (const item of evidence) if (item.vehicleCandidateId) ids.add(item.vehicleCandidateId);
  return Array.from(ids).sort().map((vehicleCandidateId) => ({
    vehicleCandidateId,
    status: "declared",
    documentIds: documents.filter((document) => document.candidateId === vehicleCandidateId).map((document) => document.documentId).sort(),
    evidenceIds: evidence.filter((item) => item.vehicleCandidateId === vehicleCandidateId).map((item) => item.evidenceId).sort(),
    assumptions: [],
    warnings: [],
  }));
}

export function buildVehicleTaxCaseFromActionDto(dto) {
  assertPlainObject(dto, "ACTION_REQUEST_INVALID", "Request body must be an object.");
  assertExactKeys(dto, ROOT_KEYS, "ACTION_REQUEST_KEYS_INVALID");
  if (dto.schemaVersion !== VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION) throw new VehicleTaxActionDtoError("ACTION_SCHEMA_INVALID", "schemaVersion is invalid.");
  const caseId = assertSafeId(dto.caseId, "caseId");
  const selectedVehicleCandidateId = assertSafeId(dto.selectedVehicleCandidateId, "candidateId", { nullable: true, optional: true });
  const options = validateOptions(dto.options);
  const documents = validateDocuments(dto.documents);
  const documentsById = new Map(documents.map((document) => [document.documentId, document]));
  const evidence = validateEvidence(dto.evidence, documentsById);
  const vehicleCandidates = buildCandidateInputs({ documents, evidence, selectedVehicleCandidateId });
  if (selectedVehicleCandidateId && !vehicleCandidates.some((candidate) => candidate.vehicleCandidateId === selectedVehicleCandidateId)) {
    throw new VehicleTaxActionDtoError("ACTION_REFERENCE_INVALID", "Candidate reference is invalid.");
  }
  const caseFileInput = {
    schemaVersion: VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION,
    caseId,
    createdAt: null,
    updatedAt: null,
    documents: documents.map(({ candidateId, ...document }) => ({
      ...document,
      filename: null,
      language: null,
      country: null,
      issueDate: null,
      issuer: null,
      contentHash: null,
      extractionStatus: "verified",
      uploadedAt: null,
      containsPersonalData: false,
      warnings: [],
    })),
    vehicleCandidates,
    evidence,
    selectedVehicleCandidateId,
    assumptions: [],
  };
  const caseFile = { ...buildVehicleTaxCaseFile(caseFileInput), selectedVehicleCandidateId };
  return JSON.parse(JSON.stringify({ caseFile, options }));
}
