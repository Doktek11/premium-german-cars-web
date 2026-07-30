import type { VehicleTaxCaseFile } from "./vehicleTaxCaseFile.d.mts";
import type { VehicleTaxOperationClassification } from "./vehicleTaxOperationClassifier.d.mts";
import type { RegistrationTaxResult } from "./registrationTax.d.mts";
import type { TransferTaxResult } from "./transferTax.d.mts";
import type { MunicipalVehicleTaxResult } from "./municipalVehicleTax.d.mts";
import type { RegistrationFeeResult } from "./registrationFee.d.mts";
import type { VehicleTaxSummaryResult } from "./vehicleTaxSummary.d.mts";

export declare const VEHICLE_TAX_CALCULATION_SCHEMA_VERSION: "vehicle_tax_calculation.v1";

export declare const VEHICLE_TAX_CALCULATION_STATUSES: Readonly<{
  EXACT: "exact";
  PARTIAL: "partial";
  ESTIMATED: "estimated";
  SCENARIO_REQUIRED: "scenario_required";
  REQUIRES_REVIEW: "requires_review";
  IDENTITY_CONFLICT: "identity_conflict";
  INVALID: "invalid";
}>;

export type VehicleTaxCalculationStatus = typeof VEHICLE_TAX_CALCULATION_STATUSES[keyof typeof VEHICLE_TAX_CALCULATION_STATUSES];

export declare const VEHICLE_TAX_ENGINE_EXECUTION_STATUSES: Readonly<{
  CALCULATED_CONFIRMED: "calculated_confirmed";
  CALCULATED_SCENARIO: "calculated_scenario";
  NOT_RUN_MISSING_INPUTS: "not_run_missing_inputs";
  NOT_RUN_CONFLICT: "not_run_conflict";
  FAILED_VALIDATION: "failed_validation";
  REQUIRES_REVIEW: "requires_review";
}>;

export type VehicleTaxEngineExecutionStatus = typeof VEHICLE_TAX_ENGINE_EXECUTION_STATUSES[keyof typeof VEHICLE_TAX_ENGINE_EXECUTION_STATUSES];

export declare const VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES: Readonly<Record<string, string>>;
export declare const VEHICLE_TAX_ORCHESTRATOR_WARNING_MESSAGES: Readonly<Record<string, string>>;

export type VehicleTaxEngineId = "iedmt" | "itp" | "ivtm" | "dgt_registration_fee";
export type VehicleTaxScenarioPolicy = "confirmed_only" | "documentary_scenarios";
export type VehicleTaxCalculationCurrency = "EUR";

export interface VehicleTaxCalculationDependencies {
  classifyOperation?: (caseFile: VehicleTaxCaseFile) => VehicleTaxOperationClassification;
  calculateIedmt?: (input: Record<string, unknown>) => RegistrationTaxResult;
  calculateItp?: (input: Record<string, unknown>) => TransferTaxResult;
  lookupMunicipalData?: (municipalityCode: string, options?: { taxYear?: number }) => unknown | Promise<unknown>;
  calculateIvtm?: (input: Record<string, unknown>, resolvedData?: unknown) => MunicipalVehicleTaxResult;
  calculateDgtFee?: (input: Record<string, unknown>) => RegistrationFeeResult;
  calculateSummary?: (input: {
    registrationTaxResult: RegistrationTaxResult;
    transferTaxResult: TransferTaxResult;
    municipalVehicleTaxResult: MunicipalVehicleTaxResult;
    registrationFeeResult: RegistrationFeeResult;
    calculationDate: string;
    currency: VehicleTaxCalculationCurrency;
  }) => VehicleTaxSummaryResult;
}

export interface VehicleTaxCalculationOptions {
  calculationDate: string;
  taxYear: number;
  currency: VehicleTaxCalculationCurrency;
  scenarioPolicy: VehicleTaxScenarioPolicy;
  maxScenarios: number;
  dependencies?: VehicleTaxCalculationDependencies;
}

export interface VehicleTaxEngineExecution<Result = unknown> {
  engineId: VehicleTaxEngineId;
  status: VehicleTaxEngineExecutionStatus;
  inputStatus: "confirmed" | "scenario" | "missing" | "conflict" | "invalid";
  inputsUsed: Record<string, unknown>;
  evidenceIds: string[];
  result: Result | null;
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
  missingFields: string[];
}

export interface VehicleTaxCalculationScenario {
  scenarioId: string;
  sourceScenarioId: string | null;
  label: string;
  classificationPatch: Record<string, unknown>;
  engineExecutions: VehicleTaxEngineExecutionMap;
  taxSummary: VehicleTaxSummaryResult | null;
  warningCodes: string[];
  assumptions: string[];
}

export interface VehicleTaxCalculationReadinessEntry {
  status: string;
  inputStatus: string;
  missingInputs: string[];
  warningCodes: string[];
}

export interface VehicleTaxCalculationReadiness {
  iedmt: VehicleTaxCalculationReadinessEntry;
  itp: VehicleTaxCalculationReadinessEntry;
  ivtm: VehicleTaxCalculationReadinessEntry;
  dgt_registration_fee: VehicleTaxCalculationReadinessEntry;
  classification: { status: string; warningCodes: string[] };
  tax_summary: { status: string; exactTotalBlockedBy: string[] };
}

export interface VehicleTaxEngineExecutionMap {
  iedmt: VehicleTaxEngineExecution<RegistrationTaxResult>;
  itp: VehicleTaxEngineExecution<TransferTaxResult>;
  ivtm: VehicleTaxEngineExecution<MunicipalVehicleTaxResult>;
  dgt_registration_fee: VehicleTaxEngineExecution<RegistrationFeeResult>;
}

export interface VehicleTaxCalculationPrivacySummary {
  containsPersonalData: boolean;
  categories: string[];
  documentCount: number;
  evidenceCount: number;
  warnings: string[];
}

export interface VehicleTaxCalculationResult {
  schemaVersion: typeof VEHICLE_TAX_CALCULATION_SCHEMA_VERSION;
  caseId: string | null;
  status: VehicleTaxCalculationStatus;
  calculationDate: string | null;
  taxYear: number | null;
  currency: VehicleTaxCalculationCurrency | null;
  classification: VehicleTaxOperationClassification | null;
  engineExecutions: VehicleTaxEngineExecutionMap;
  taxSummary: VehicleTaxSummaryResult | null;
  scenarios: VehicleTaxCalculationScenario[];
  readiness: VehicleTaxCalculationReadiness;
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
  missingFields: string[];
  privacySummary: VehicleTaxCalculationPrivacySummary;
}

export declare function calculateVehicleTaxCase(caseFile: VehicleTaxCaseFile, options: VehicleTaxCalculationOptions): Promise<VehicleTaxCalculationResult>;
