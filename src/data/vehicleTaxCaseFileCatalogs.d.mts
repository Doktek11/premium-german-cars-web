export type VehicleTaxCaseFileDocumentType =
  | "coc"
  | "german_registration_part_i"
  | "german_registration_part_ii"
  | "invoice"
  | "private_sale_contract"
  | "vehicle_ad"
  | "technical_inspection_document"
  | "spanish_technical_card"
  | "proof_of_tax_residence"
  | "municipal_ordinance"
  | "professional_report"
  | "user_declaration"
  | "other";

export type VehicleTaxCaseFileExtractionStatus =
  | "not_processed"
  | "extracted"
  | "partially_extracted"
  | "verified"
  | "failed"
  | "rejected";

export type VehicleTaxCaseFileSourceType =
  | "official_document"
  | "professional_document"
  | "contractual_document"
  | "vehicle_ad"
  | "user_declaration"
  | "derived"
  | "other";

export type VehicleTaxCaseFileVerificationStatus =
  | "confirmed_official"
  | "confirmed_professional"
  | "confirmed_user"
  | "extracted"
  | "inferred"
  | "scenario"
  | "conflict"
  | "rejected";

export type VehicleTaxCaseFileExtractionMethod =
  | "manual"
  | "structured"
  | "ocr"
  | "ai"
  | "imported"
  | "unknown";

export type VehicleTaxCaseFileFactStatus =
  | "confirmed"
  | "probable"
  | "inferred"
  | "scenario_required"
  | "conflict"
  | "missing"
  | "not_applicable"
  | "invalid";

export type VehicleTaxCaseFileReadinessStatus =
  | "ready_confirmed"
  | "ready_with_assumptions"
  | "ready_with_scenarios"
  | "insufficient_data"
  | "identity_conflict"
  | "invalid";

export type VehicleTaxCaseFileConflictType =
  | "identity_conflict"
  | "value_conflict"
  | "date_conflict"
  | "classification_conflict"
  | "destination_conflict"
  | "reference_integrity_conflict";

export type VehicleTaxCaseFileConflictSeverity =
  | "info"
  | "warning"
  | "blocking_for_engine"
  | "critical_identity";

export type VehicleTaxCaseFileConflictResolutionStatus =
  | "unresolved"
  | "resolved_by_priority"
  | "resolved_manually"
  | "split_into_candidates"
  | "rejected";

export type VehicleTaxCaseFileWarningCode =
  | "INVALID_CASE_FILE_INPUT"
  | "INVALID_SCHEMA_VERSION"
  | "DUPLICATE_DOCUMENT_ID"
  | "DUPLICATE_EVIDENCE_ID"
  | "UNKNOWN_DOCUMENT_REFERENCE"
  | "DOCUMENT_TYPE_MISMATCH"
  | "UNKNOWN_VEHICLE_CANDIDATE"
  | "INVALID_EVIDENCE_VALUE"
  | "INVALID_EVIDENCE_PAGE"
  | "INVALID_FIELD"
  | "VALUE_CONFLICT"
  | "IDENTITY_CONFLICT"
  | "INVALID_SELECTED_CANDIDATE"
  | "CASE_FILE_SCENARIOS_TRUNCATED"
  | "SOURCE_EXCERPT_TRUNCATED"
  | "SENSITIVE_DATA_PRESENT"
  | "INVALID_REFERENCE"
  | "NON_SERIALIZABLE_VALUE"
  | "INVALID_CASE_TIMESTAMPS";
export type VehicleTaxCaseFileFieldPath =
  | "vehicle.vin"
  | "vehicle.make"
  | "vehicle.model"
  | "vehicle.variant"
  | "vehicle.category"
  | "vehicle.fuelType"
  | "vehicle.engineDisplacementCc"
  | "vehicle.powerKw"
  | "vehicle.powerCv"
  | "vehicle.fiscalHorsepower"
  | "vehicle.firstRegistrationDate"
  | "vehicle.spanishRegistrationDate"
  | "vehicle.condition"
  | "vehicle.co2Wltp"
  | "vehicle.co2Nedc"
  | "vehicle.emissionsStandard"
  | "vehicle.zeroEmissionStatus"
  | "vehicle.boeValue"
  | "vehicle.boeValueYear"
  | "vehicle.isHistoricVehicle"
  | "vehicle.isEndOfLifeVehicle"
  | "transaction.date"
  | "transaction.purchasePrice"
  | "transaction.currency"
  | "transaction.purchaseCountry"
  | "transaction.documentType"
  | "transaction.sellerType"
  | "transaction.buyerType"
  | "transaction.vatRegime"
  | "transaction.vatItemizedStatus"
  | "transaction.rebuStatus"
  | "transaction.intendedForResale"
  | "parties.sellerCountry"
  | "parties.buyerTaxResidenceCountry"
  | "taxDestination.autonomousCommunity"
  | "taxDestination.province"
  | "taxDestination.municipalityName"
  | "taxDestination.municipalityCode"
  | "taxDestination.foralTerritory"
  | "taxDestination.expectedSettlementDate";

export const VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION: "vehicle_tax_case_file.v1";
export const VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPES: Record<string, VehicleTaxCaseFileDocumentType>;
export const VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES: readonly VehicleTaxCaseFileDocumentType[];
export const VEHICLE_TAX_CASE_FILE_EXTRACTION_STATUSES: Record<string, VehicleTaxCaseFileExtractionStatus>;
export const VEHICLE_TAX_CASE_FILE_SOURCE_TYPES: Record<string, VehicleTaxCaseFileSourceType>;
export const VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES: Record<string, VehicleTaxCaseFileVerificationStatus>;
export const VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS: Record<string, VehicleTaxCaseFileExtractionMethod>;
export const VEHICLE_TAX_CASE_FILE_FACT_STATUSES: Record<string, VehicleTaxCaseFileFactStatus>;
export const VEHICLE_TAX_CASE_FILE_READINESS_STATUSES: Record<string, VehicleTaxCaseFileReadinessStatus>;
export const VEHICLE_TAX_CASE_FILE_CONFLICT_TYPES: Record<string, VehicleTaxCaseFileConflictType>;
export const VEHICLE_TAX_CASE_FILE_CONFLICT_SEVERITIES: Record<string, VehicleTaxCaseFileConflictSeverity>;
export const VEHICLE_TAX_CASE_FILE_CONFLICT_RESOLUTION_STATUSES: Record<string, VehicleTaxCaseFileConflictResolutionStatus>;
export const VEHICLE_TAX_CASE_FILE_WARNING_CODES: Record<string, VehicleTaxCaseFileWarningCode>;
export const VEHICLE_TAX_CASE_FILE_WARNING_MESSAGES: Record<VehicleTaxCaseFileWarningCode, string>;
export const VEHICLE_TAX_CASE_FILE_FIELD_CATALOG: Record<VehicleTaxCaseFileFieldPath, {
  valueType: string;
  unit: string | null;
  scope: "vehicle" | "global";
  allowYearMonth?: boolean;
}>;
export const VEHICLE_TAX_CASE_FILE_FIELD_PATHS: readonly VehicleTaxCaseFileFieldPath[];
export const VEHICLE_TAX_CASE_FILE_ENUM_VALUES: Partial<Record<VehicleTaxCaseFileFieldPath, readonly string[]>>;
