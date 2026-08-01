import type {
  VehicleTaxCaseFileDocumentType,
  VehicleTaxCaseFileExtractionMethod,
  VehicleTaxCaseFileSourceType,
  VehicleTaxCaseFileVerificationStatus,
} from "../data/vehicleTaxCaseFileCatalogs.d.mts";
import type { VehicleTaxEstimateOptions } from "./vehicleTaxEstimateApi.d.mts";

export type VehicleTaxActionRequestSchemaVersion = "vehicle_tax_action_request.v1";
export type VehicleTaxActionCaseId = `case-${string}`;
export type VehicleTaxActionDocumentId = `doc-${string}`;
export type VehicleTaxActionEvidenceId = `ev-${string}`;
export type VehicleTaxActionCandidateId = `candidate-${string}`;

export type VehicleTaxActionFieldPath =
  | "vehicle.category"
  | "vehicle.fuelType"
  | "vehicle.engineDisplacementCc"
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
  | "taxDestination.municipalityCode"
  | "taxDestination.foralTerritory"
  | "taxDestination.expectedSettlementDate";

export type VehicleTaxActionValueType = "boolean" | "country" | "currency" | "date" | "enum" | "ine_code" | "money" | "number" | "year";

export interface VehicleTaxActionDocumentDto {
  documentId: VehicleTaxActionDocumentId;
  documentType: VehicleTaxCaseFileDocumentType;
  pageCount?: number | null;
  candidateId?: VehicleTaxActionCandidateId | null;
}

export interface VehicleTaxActionEvidenceDto {
  evidenceId: VehicleTaxActionEvidenceId;
  documentId?: VehicleTaxActionDocumentId | null;
  candidateId?: VehicleTaxActionCandidateId | null;
  page?: number | null;
  field: VehicleTaxActionFieldPath;
  normalizedValue: unknown;
  valueType: VehicleTaxActionValueType;
  sourceType: VehicleTaxCaseFileSourceType;
  extractionMethod: VehicleTaxCaseFileExtractionMethod;
  verificationStatus: VehicleTaxCaseFileVerificationStatus;
}

export interface VehicleTaxActionRequestDto {
  schemaVersion: VehicleTaxActionRequestSchemaVersion;
  caseId: VehicleTaxActionCaseId;
  documents: VehicleTaxActionDocumentDto[];
  evidence: VehicleTaxActionEvidenceDto[];
  selectedVehicleCandidateId?: VehicleTaxActionCandidateId | null;
  options: VehicleTaxEstimateOptions;
}
