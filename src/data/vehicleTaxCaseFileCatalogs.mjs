export const VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION = "vehicle_tax_case_file.v1";

export const VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES = {
  COC: "coc",
  GERMAN_REGISTRATION_PART_I: "german_registration_part_i",
  GERMAN_REGISTRATION_PART_II: "german_registration_part_ii",
  INVOICE: "invoice",
  PRIVATE_SALE_CONTRACT: "private_sale_contract",
  VEHICLE_AD: "vehicle_ad",
  TECHNICAL_INSPECTION_DOCUMENT: "technical_inspection_document",
  SPANISH_TECHNICAL_CARD: "spanish_technical_card",
  PROOF_OF_TAX_RESIDENCE: "proof_of_tax_residence",
  MUNICIPAL_ORDINANCE: "municipal_ordinance",
  PROFESSIONAL_REPORT: "professional_report",
  USER_DECLARATION: "user_declaration",
  OTHER: "other",
};

export const VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES = Object.freeze(
  Object.values(VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES)
);

export const VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES = {
  NOT_PROCESSED: "not_processed",
  EXTRACTED: "extracted",
  PARTIALLY_EXTRACTED: "partially_extracted",
  VERIFIED: "verified",
  FAILED: "failed",
  REJECTED: "rejected",
};

export const VEHICLE_TAX_CASE_FILE_SOURCE_TYPES = {
  OFFICIAL_DOCUMENT: "official_document",
  PROFESSIONAL_DOCUMENT: "professional_document",
  CONTRACTUAL_DOCUMENT: "contractual_document",
  VEHICLE_AD: "vehicle_ad",
  USER_DECLARATION: "user_declaration",
  DERIVED: "derived",
  OTHER: "other",
};

export const VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES = {
  CONFIRMED_OFFICIAL: "confirmed_official",
  CONFIRMED_PROFESSIONAL: "confirmed_professional",
  CONFIRMED_USER: "confirmed_user",
  EXTRACTED: "extracted",
  INFERRED: "inferred",
  SCENARIO: "scenario",
  CONFLICT: "conflict",
  REJECTED: "rejected",
};

export const VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS = {
  MANUAL: "manual",
  STRUCTURED: "structured",
  OCR: "ocr",
  AI: "ai",
  IMPORTED: "imported",
  UNKNOWN: "unknown",
};

export const VEHICLE_TAX_CASE_FILE_FACT_STATUSES = {
  CONFIRMED: "confirmed",
  PROBABLE: "probable",
  INFERRED: "inferred",
  SCENARIO_REQUIRED: "scenario_required",
  CONFLICT: "conflict",
  MISSING: "missing",
  NOT_APPLICABLE: "not_applicable",
  INVALID: "invalid",
};

export const VEHICLE_TAX_CASE_FILE_READINESS_STATUSES = {
  READY_CONFIRMED: "ready_confirmed",
  READY_WITH_ASSUMPTIONS: "ready_with_assumptions",
  READY_WITH_SCENARIOS: "ready_with_scenarios",
  INSUFFICIENT_DATA: "insufficient_data",
  IDENTITY_CONFLICT: "identity_conflict",
  INVALID: "invalid",
};

export const VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES = {
  IDENTITY_CONFLICT: "identity_conflict",
  VALUE_CONFLICT: "value_conflict",
  DATE_CONFLICT: "date_conflict",
  CLASSIFICATION_CONFLICT: "classification_conflict",
  DESTINATION_CONFLICT: "destination_conflict",
  REFERENCE_INTEGRITY_CONFLICT: "reference_integrity_conflict",
};

export const VEHICLE_TAX_CASE_FILE_CONFLICT_SEVERITIES = {
  INFO: "info",
  WARNING: "warning",
  BLOCKING_FOR_ENGINE: "blocking_for_engine",
  CRITICAL_IDENTITY: "critical_identity",
};

export const VEHICLE_TAX_CASE_FILE_CONFLICT_RESOLUTION_STATUSES = {
  UNRESOLVED: "unresolved",
  RESOLVED_BY_PRIORITY: "resolved_by_priority",
  RESOLVED_MANUALLY: "resolved_manually",
  SPLIT_INTO_CANDIDATES: "split_into_candidates",
  REJECTED: "rejected",
};

export const VEHICLE_TAX_CASE_FILE_WARNING_CODES = {
  INVALID_CASE_FILE_INPUT: "INVALID_CASE_FILE_INPUT",
  INVALID_SCHEMA_VERSION: "INVALID_SCHEMA_VERSION",
  DUPLICATE_DOCUMENT_ID: "DUPLICATE_DOCUMENT_ID",
  DUPLICATE_EVIDENCE_ID: "DUPLICATE_EVIDENCE_ID",
  UNKNOWN_DOCUMENT_REFERENCE: "UNKNOWN_DOCUMENT_REFERENCE",
  DOCUMENT_TYPE_MISMATCH: "DOCUMENT_TYPE_MISMATCH",
  UNKNOWN_VEHICLE_CANDIDATE: "UNKNOWN_VEHICLE_CANDIDATE",
  INVALID_EVIDENCE_VALUE: "INVALID_EVIDENCE_VALUE",
  INVALID_EVIDENCE_PAGE: "INVALID_EVIDENCE_PAGE",
  INVALID_FIELD: "INVALID_FIELD",
  VALUE_CONFLICT: "VALUE_CONFLICT",
  IDENTITY_CONFLICT: "IDENTITY_CONFLICT",
  INVALID_SELECTED_CANDIDATE: "INVALID_SELECTED_CANDIDATE",
  CASE_FILE_SCENARIOS_TRUNCATED: "CASE_FILE_SCENARIOS_TRUNCATED",
  SOURCE_EXCERPT_TRUNCATED: "SOURCE_EXCERPT_TRUNCATED",
  SENSITIVE_DATA_PRESENT: "SENSITIVE_DATA_PRESENT",
  INVALID_REFERENCE: "INVALID_REFERENCE",
  NON_SERIALIZABLE_VALUE: "NON_SERIALIZABLE_VALUE",
  INVALID_CASE_TIMESTAMPS: "INVALID_CASE_TIMESTAMPS",
};

export const VEHICLE_TAX_CASE_FILE_WARNING_MESSAGES = {
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_FILE_INPUT]:
    "The case file input was not a plain object and has been sanitized.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SCHEMA_VERSION]:
    "The schemaVersion is missing or unsupported.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_DOCUMENT_ID]:
    "A duplicate documentId was found; later entries are preserved but rejected.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.DUPLICATE_EVIDENCE_ID]:
    "A duplicate evidenceId was found; later entries are preserved but rejected.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_DOCUMENT_REFERENCE]:
    "Evidence references a documentId that is not present in documents.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.DOCUMENT_TYPE_MISMATCH]:
    "Evidence documentType does not match the referenced document.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.UNKNOWN_VEHICLE_CANDIDATE]:
    "Evidence references a vehicleCandidateId that was not declared.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_VALUE]:
    "Evidence contains a value that is invalid for its canonical field.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_EVIDENCE_PAGE]:
    "Evidence page is invalid for the referenced document.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_FIELD]:
    "Evidence contains an unknown or missing canonical field.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.VALUE_CONFLICT]:
    "Multiple same-priority evidence items contain different values.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.IDENTITY_CONFLICT]:
    "Official identity evidence conflicts inside a vehicle candidate.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_SELECTED_CANDIDATE]:
    "selectedVehicleCandidateId does not match any vehicle candidate.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.CASE_FILE_SCENARIOS_TRUNCATED]:
    "Documentary scenarios were truncated to the deterministic maximum.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.SOURCE_EXCERPT_TRUNCATED]:
    "A sourceExcerpt exceeded the maximum length and was truncated.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.SENSITIVE_DATA_PRESENT]:
    "Personal-data categories are present and summarized without values.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_REFERENCE]:
    "A reference inside the case file is invalid.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.NON_SERIALIZABLE_VALUE]:
    "A non JSON-serializable value was rejected or replaced with null.",
  [VEHICLE_TAX_CASE_FILE_WARNING_CODES.INVALID_CASE_TIMESTAMPS]:
    "Case timestamps are invalid or not in chronological order.",
};

export const VEHICLE_TAX_CASE_FILE_FIELD_CATALOG = {
  "vehicle.vin": { valueType: "string", unit: null, scope: "vehicle" },
  "vehicle.make": { valueType: "string", unit: null, scope: "vehicle" },
  "vehicle.model": { valueType: "string", unit: null, scope: "vehicle" },
  "vehicle.variant": { valueType: "string", unit: null, scope: "vehicle" },
  "vehicle.category": { valueType: "enum", unit: null, scope: "vehicle" },
  "vehicle.fuelType": { valueType: "enum", unit: null, scope: "vehicle" },
  "vehicle.engineDisplacementCc": { valueType: "number", unit: "cc", scope: "vehicle" },
  "vehicle.powerKw": { valueType: "number", unit: "kW", scope: "vehicle" },
  "vehicle.powerCv": { valueType: "number", unit: "CV", scope: "vehicle" },
  "vehicle.fiscalHorsepower": { valueType: "number", unit: "CVF", scope: "vehicle" },
  "vehicle.firstRegistrationDate": { valueType: "date", unit: null, scope: "vehicle", allowYearMonth: true },
  "vehicle.spanishRegistrationDate": { valueType: "date", unit: null, scope: "vehicle", allowYearMonth: false },
  "vehicle.condition": { valueType: "enum", unit: null, scope: "vehicle" },
  "vehicle.co2Wltp": { valueType: "number", unit: "g/km", scope: "vehicle" },
  "vehicle.co2Nedc": { valueType: "number", unit: "g/km", scope: "vehicle" },
  "vehicle.emissionsStandard": { valueType: "enum", unit: null, scope: "vehicle" },
  "vehicle.zeroEmissionStatus": { valueType: "enum", unit: null, scope: "vehicle" },
  "vehicle.boeValue": { valueType: "money", unit: "EUR", scope: "vehicle" },
  "vehicle.boeValueYear": { valueType: "year", unit: null, scope: "vehicle" },
  "vehicle.isHistoricVehicle": { valueType: "boolean", unit: null, scope: "vehicle" },
  "vehicle.isEndOfLifeVehicle": { valueType: "boolean", unit: null, scope: "vehicle" },
  "transaction.date": { valueType: "date", unit: null, scope: "global", allowYearMonth: false },
  "transaction.purchasePrice": { valueType: "money", unit: null, scope: "global" },
  "transaction.currency": { valueType: "currency", unit: null, scope: "global" },
  "transaction.purchaseCountry": { valueType: "country", unit: null, scope: "global" },
  "transaction.documentType": { valueType: "enum", unit: null, scope: "global" },
  "transaction.sellerType": { valueType: "enum", unit: null, scope: "global" },
  "transaction.buyerType": { valueType: "enum", unit: null, scope: "global" },
  "transaction.vatRegime": { valueType: "enum", unit: null, scope: "global" },
  "transaction.vatItemizedStatus": { valueType: "enum", unit: null, scope: "global" },
  "transaction.rebuStatus": { valueType: "enum", unit: null, scope: "global" },
  "transaction.intendedForResale": { valueType: "boolean", unit: null, scope: "global" },
  "parties.sellerCountry": { valueType: "country", unit: null, scope: "global" },
  "parties.buyerTaxResidenceCountry": { valueType: "country", unit: null, scope: "global" },
  "taxDestination.autonomousCommunity": { valueType: "string", unit: null, scope: "global" },
  "taxDestination.province": { valueType: "string", unit: null, scope: "global" },
  "taxDestination.municipalityName": { valueType: "string", unit: null, scope: "global" },
  "taxDestination.municipalityCode": { valueType: "ine_code", unit: null, scope: "global" },
  "taxDestination.foralTerritory": { valueType: "enum", unit: null, scope: "global" },
  "taxDestination.expectedSettlementDate": { valueType: "date", unit: null, scope: "global", allowYearMonth: false },
};

export const VEHICLE_TAX_CASE_FILE_FIELD_PATHS = Object.freeze(
  Object.keys(VEHICLE_TAX_CASE_FILE_FIELD_CATALOG)
);

export const VEHICLE_TAX_CASE_FILE_ENUM_VALUES = {
  "vehicle.category": ["passenger_car", "turismo", "suv", "mixed_adaptable", "unknown"],
  "vehicle.fuelType": ["gasoline", "diesel", "hybrid", "phev", "electric", "hydrogen", "other", "unknown"],
  "vehicle.condition": ["usado_importado", "nuevo_o_no_matriculado", "desconocido"],
  "vehicle.emissionsStandard": ["wltp", "nedc", "unknown"],
  "vehicle.zeroEmissionStatus": ["confirmed", "not_zero_emission", "unknown"],
  "transaction.documentType": ["invoice", "private_sale_contract", "unknown"],
  "transaction.sellerType": ["private", "professional", "unknown"],
  "transaction.buyerType": ["private", "professional", "vehicle_reseller", "unknown"],
  "transaction.vatRegime": ["general_vat", "rebu", "vat_not_itemized", "not_applicable_private_sale", "unknown"],
  "transaction.vatItemizedStatus": ["itemized", "not_itemized", "unknown"],
  "transaction.rebuStatus": ["confirmed", "not_confirmed", "unknown"],
  "taxDestination.foralTerritory": ["alava", "bizkaia", "gipuzkoa", "none", "unknown"],
};
