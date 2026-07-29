import type {
  VehicleTaxCaseFileConflictResolutionStatus,
  VehicleTaxCaseFileConflictSeverity,
  VehicleTaxCaseFileConflictType,
  VehicleTaxCaseFileDocumentType,
  VehicleTaxCaseFileExtractionMethod,
  VehicleTaxCaseFileExtractionStatus,
  VehicleTaxCaseFileFactStatus,
  VehicleTaxCaseFileFieldPath,
  VehicleTaxCaseFileReadinessStatus,
  VehicleTaxCaseFileSourceType,
  VehicleTaxCaseFileVerificationStatus,
} from "../data/vehicleTaxCaseFileCatalogs.d.mts";

export type VehicleTaxCaseFileJsonValue =
  | null
  | boolean
  | number
  | string
  | VehicleTaxCaseFileJsonValue[]
  | { [key: string]: VehicleTaxCaseFileJsonValue };

export interface VehicleTaxCaseFileDocumentInput {
  documentId?: string | null;
  documentType?: VehicleTaxCaseFileDocumentType | string | null;
  filename?: string | null;
  language?: string | null;
  country?: string | null;
  issueDate?: string | null;
  issuer?: string | null;
  pageCount?: number | null;
  contentHash?: string | null;
  extractionStatus?: VehicleTaxCaseFileExtractionStatus | string | null;
  uploadedAt?: string | null;
  containsPersonalData?: boolean | null;
  warnings?: string[];
}

export interface VehicleTaxCaseFileEvidenceInput {
  evidenceId?: string | null;
  documentId?: string | null;
  vehicleCandidateId?: string | null;
  field?: VehicleTaxCaseFileFieldPath | string | null;
  documentType?: VehicleTaxCaseFileDocumentType | string | null;
  page?: number | null;
  fieldLabel?: string | null;
  sourceExcerpt?: string | null;
  normalizedValue?: unknown;
  valueType?: string | null;
  unit?: string | null;
  sourceType?: VehicleTaxCaseFileSourceType | string | null;
  confidence?: number | null;
  extractionMethod?: VehicleTaxCaseFileExtractionMethod | string | null;
  verifiedBy?: string | null;
  verificationStatus?: VehicleTaxCaseFileVerificationStatus | string | null;
  notes?: string | null;
}

export interface VehicleTaxCaseFileCandidateInput {
  vehicleCandidateId?: string | null;
  status?: string | null;
  documentIds?: string[];
  evidenceIds?: string[];
  assumptions?: string[];
  warnings?: string[];
}

export interface VehicleTaxCaseFileInput {
  schemaVersion?: "vehicle_tax_case_file.v1" | string;
  caseId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  documents?: VehicleTaxCaseFileDocumentInput[];
  evidence?: VehicleTaxCaseFileEvidenceInput[];
  vehicleCandidates?: VehicleTaxCaseFileCandidateInput[];
  selectedVehicleCandidateId?: string | null;
  assumptions?: string[];
}

export interface VehicleTaxCaseFileDocument {
  documentId: string | null;
  documentType: VehicleTaxCaseFileDocumentType;
  filename: string | null;
  language: string | null;
  country: string | null;
  issueDate: string | null;
  issuer: string | null;
  pageCount: number | null;
  contentHash: string | null;
  extractionStatus: VehicleTaxCaseFileExtractionStatus;
  uploadedAt: string | null;
  containsPersonalData: boolean;
  warnings: string[];
}

export interface VehicleTaxCaseFileEvidence {
  evidenceId: string | null;
  documentId: string | null;
  vehicleCandidateId: string | null;
  field: VehicleTaxCaseFileFieldPath | string | null;
  documentType: VehicleTaxCaseFileDocumentType | null;
  page: number | null;
  fieldLabel: string | null;
  sourceExcerpt: string | null;
  normalizedValue: VehicleTaxCaseFileJsonValue;
  valueType: string | null;
  unit: string | null;
  sourceType: VehicleTaxCaseFileSourceType;
  confidence: number | null;
  extractionMethod: VehicleTaxCaseFileExtractionMethod;
  verifiedBy: string | null;
  verificationStatus: VehicleTaxCaseFileVerificationStatus;
  notes: string | null;
  warnings: string[];
}

export interface VehicleTaxCaseFileFactAlternative {
  evidenceId: string | null;
  value: VehicleTaxCaseFileJsonValue;
  normalizedValue: VehicleTaxCaseFileJsonValue;
  verificationStatus: VehicleTaxCaseFileVerificationStatus;
  documentType: VehicleTaxCaseFileDocumentType | null;
  sourceType: VehicleTaxCaseFileSourceType;
  confidence: number | null;
}

export interface VehicleTaxCaseFileFact {
  field: VehicleTaxCaseFileFieldPath | string;
  value: VehicleTaxCaseFileJsonValue;
  normalizedValue: VehicleTaxCaseFileJsonValue;
  valueType: string | null;
  unit: string | null;
  status: VehicleTaxCaseFileFactStatus;
  selectedEvidenceId: string | null;
  evidenceIds: string[];
  alternatives: VehicleTaxCaseFileFactAlternative[];
  selectionReason: string;
  assumptions: string[];
  warnings: string[];
}

export interface VehicleTaxCaseFileConflict {
  conflictId: string;
  severity: VehicleTaxCaseFileConflictSeverity;
  type: VehicleTaxCaseFileConflictType;
  fields: string[];
  vehicleCandidateIds: string[];
  evidenceIds: string[];
  description: string;
  resolutionStatus: VehicleTaxCaseFileConflictResolutionStatus;
  selectedValue: VehicleTaxCaseFileJsonValue;
  selectedValueReason: string;
  warnings: string[];
}

export interface VehicleTaxCaseFileScenario {
  scenarioId: string;
  label: string;
  appliesToEngines: string[];
  factOverrides: Record<string, VehicleTaxCaseFileJsonValue>;
  assumptions: string[];
  evidenceIds: string[];
  confidence: number | null;
  status: string;
  warnings: string[];
}

export interface VehicleTaxCaseFileCandidate {
  vehicleCandidateId: string;
  status: string;
  documentIds: string[];
  evidenceIds: string[];
  facts: Record<string, VehicleTaxCaseFileFact>;
  conflicts: VehicleTaxCaseFileConflict[];
  assumptions: string[];
  warnings: string[];
}

export interface VehicleTaxCaseFileReadiness {
  status: VehicleTaxCaseFileReadinessStatus;
  confirmedInputs: string[];
  probableInputs: string[];
  scenarioInputs: string[];
  missingInputs: string[];
  conflictingInputs: string[];
  blockingConflicts: string[];
  assumptions: string[];
  warnings: string[];
}

export interface VehicleTaxCaseFileSensitiveDataSummary {
  containsPersonalData: boolean;
  categories: string[];
  documentCount: number;
  evidenceCount: number;
  warnings: string[];
}

export interface VehicleTaxCaseFile {
  schemaVersion: "vehicle_tax_case_file.v1";
  caseId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  documents: VehicleTaxCaseFileDocument[];
  vehicleCandidates: VehicleTaxCaseFileCandidate[];
  selectedVehicleCandidateId: string | null;
  facts: Record<string, VehicleTaxCaseFileFact>;
  parties: Record<string, VehicleTaxCaseFileFact>;
  transaction: Record<string, VehicleTaxCaseFileFact>;
  taxDestination: Record<string, VehicleTaxCaseFileFact>;
  evidence: VehicleTaxCaseFileEvidence[];
  conflicts: VehicleTaxCaseFileConflict[];
  scenarios: VehicleTaxCaseFileScenario[];
  readiness: {
    iedmt: VehicleTaxCaseFileReadiness;
    itp: VehicleTaxCaseFileReadiness;
    ivtm: VehicleTaxCaseFileReadiness;
    dgt_registration_fee: VehicleTaxCaseFileReadiness;
    tax_summary: VehicleTaxCaseFileReadiness;
  };
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
  missingFields: string[];
  sensitiveDataSummary: VehicleTaxCaseFileSensitiveDataSummary;
}

export function buildVehicleTaxCaseFile(input?: VehicleTaxCaseFileInput | null): VehicleTaxCaseFile;
