import type { VehicleTaxCaseFile } from "./vehicleTaxCaseFile.d.mts";

export type VehicleTaxOperationClassificationSchemaVersion = "vehicle_tax_operation_classification.v1";

export type VehicleTaxOperationClassificationStatus =
  | "confirmed"
  | "probable"
  | "inferred"
  | "scenario_required"
  | "conflict"
  | "insufficient_data"
  | "identity_conflict"
  | "invalid";

export type VehicleTaxOperationFieldStatus =
  | "confirmed"
  | "probable"
  | "inferred"
  | "scenario_required"
  | "conflict"
  | "missing"
  | "invalid";

export type VehicleTaxOperationSellerType = "private" | "professional" | "unknown";
export type VehicleTaxOperationBuyerType = "private" | "professional" | "vehicle_reseller" | "unknown";
export type VehicleTaxOperationDocumentType = "private_sale_contract" | "invoice" | "unknown";
export type VehicleTaxOperationVatRegime =
  | "not_applicable_private_sale"
  | "general_vat"
  | "rebu"
  | "vat_not_itemized"
  | "unknown";
export type VehicleTaxOperationVatItemizedStatus = "itemized" | "not_itemized" | "unknown";
export type VehicleTaxOperationRebuStatus = "confirmed" | "rejected" | "unknown";
export type VehicleTaxOperationResaleIntent = boolean | "unknown";
export type VehicleTaxOperationCountry = string | null;

export type VehicleTaxOperationWarningCode =
  | "INVALID_CLASSIFIER_INPUT"
  | "INCOMPATIBLE_CASE_FILE_SCHEMA"
  | "CASE_FILE_IDENTITY_CONFLICT"
  | "SELLER_TYPE_UNRESOLVED"
  | "BUYER_TYPE_UNRESOLVED"
  | "DOCUMENT_TYPE_UNRESOLVED"
  | "VAT_REGIME_UNRESOLVED"
  | "REBU_NOT_CONFIRMED"
  | "DOCUMENT_CLASSIFICATION_CONFLICT"
  | "INTERMEDIARY_SELLER_UNRESOLVED"
  | "TAX_RESIDENCE_UNRESOLVED"
  | "RESALE_ELIGIBILITY_UNRESOLVED"
  | "INVALID_EVIDENCE_REFERENCE"
  | "CLASSIFICATION_SCENARIOS_TRUNCATED"
  | "NON_SERIALIZABLE_CLASSIFIER_INPUT";

export type VehicleTaxOperationConflictType =
  | "SELLER_TYPE_CONFLICT"
  | "BUYER_TYPE_CONFLICT"
  | "DOCUMENT_TYPE_CONFLICT"
  | "VAT_REGIME_CONFLICT"
  | "REBU_EVIDENCE_CONFLICT"
  | "INTERMEDIARY_SELLER_UNRESOLVED"
  | "TAX_RESIDENCE_CONFLICT"
  | "RESALE_ELIGIBILITY_CONFLICT"
  | "IDENTITY_CONFLICT";

export interface VehicleTaxOperationSelectedEvidence {
  field: string;
  evidenceId: string;
  documentId: string | null;
  documentType: string | null;
  reason: string;
}

export interface VehicleTaxOperationConflict {
  conflictId: string;
  type: VehicleTaxOperationConflictType;
  fields: string[];
  evidenceIds: string[];
  severity: "blocking" | "critical";
  description: string;
  resolutionStatus: "unresolved";
  alternatives: Record<string, unknown>[];
  warnings: VehicleTaxOperationWarningCode[];
}

export interface VehicleTaxOperationScenario {
  scenarioId: string;
  label: string;
  classificationPatch: VehicleTaxOperationTransferPatch;
  evidenceIds: string[];
  assumptions: string[];
  warnings: VehicleTaxOperationWarningCode[];
  status: "scenario_required";
}

export interface VehicleTaxOperationLegalBasisReference {
  id: string;
  title: string;
  url: string;
}

export interface VehicleTaxOperationTransferPatch {
  sellerType: VehicleTaxOperationSellerType;
  buyerType: VehicleTaxOperationBuyerType;
  documentType: VehicleTaxOperationDocumentType;
  vatRegime: VehicleTaxOperationVatRegime;
  intendedForResale: boolean | null;
  buyerTaxResidenceCountry: VehicleTaxOperationCountry;
  sellerCountry: VehicleTaxOperationCountry;
}

export interface VehicleTaxOperationClassification {
  schemaVersion: VehicleTaxOperationClassificationSchemaVersion;
  caseId: string | null;
  status: VehicleTaxOperationClassificationStatus;
  sellerType: VehicleTaxOperationSellerType;
  sellerTypeStatus: VehicleTaxOperationFieldStatus;
  buyerType: VehicleTaxOperationBuyerType;
  buyerTypeStatus: VehicleTaxOperationFieldStatus;
  documentType: VehicleTaxOperationDocumentType;
  documentTypeStatus: VehicleTaxOperationFieldStatus;
  vatRegime: VehicleTaxOperationVatRegime;
  vatRegimeStatus: VehicleTaxOperationFieldStatus;
  vatItemizedStatus: VehicleTaxOperationVatItemizedStatus;
  vatItemizedStatusCertainty: VehicleTaxOperationFieldStatus;
  rebuStatus: VehicleTaxOperationRebuStatus;
  rebuStatusCertainty: VehicleTaxOperationFieldStatus;
  intendedForResale: VehicleTaxOperationResaleIntent;
  intendedForResaleStatus: VehicleTaxOperationFieldStatus;
  buyerTaxResidenceCountry: VehicleTaxOperationCountry;
  buyerTaxResidenceCountryStatus: VehicleTaxOperationFieldStatus;
  sellerCountry: VehicleTaxOperationCountry;
  sellerCountryStatus: VehicleTaxOperationFieldStatus;
  evidenceIds: string[];
  selectedEvidence: VehicleTaxOperationSelectedEvidence[];
  conflicts: VehicleTaxOperationConflict[];
  scenarios: VehicleTaxOperationScenario[];
  transferTaxClassification: VehicleTaxOperationTransferPatch;
  legalBasis: VehicleTaxOperationLegalBasisReference[];
  assumptions: string[];
  warnings: string[];
  warningCodes: VehicleTaxOperationWarningCode[];
  missingFields: string[];
}

export const VEHICLE_TAX_OPERATION_CLASSIFICATION_SCHEMA_VERSION: VehicleTaxOperationClassificationSchemaVersion;
export const VEHICLE_TAX_OPERATION_CLASSIFICATION_STATUSES: Readonly<Record<string, VehicleTaxOperationClassificationStatus>>;
export const VEHICLE_TAX_OPERATION_FIELD_STATUSES: Readonly<Record<string, VehicleTaxOperationFieldStatus>>;
export const VEHICLE_TAX_OPERATION_WARNING_CODES: Readonly<Record<string, VehicleTaxOperationWarningCode>>;
export const VEHICLE_TAX_OPERATION_WARNING_MESSAGES: Readonly<Record<VehicleTaxOperationWarningCode, string>>;
export const VEHICLE_TAX_OPERATION_CONFLICT_TYPES: Readonly<Record<string, VehicleTaxOperationConflictType>>;
export function classifyVehicleTaxOperation(caseFile: VehicleTaxCaseFile | unknown): VehicleTaxOperationClassification;
