export type IvtmVehicleType = "passenger_car";
export type IvtmZeroEmissionStatus = "confirmed" | "not_zero_emission" | "unknown";
export type IvtmBonusStatus = "not_applicable" | "confirmed" | "possible" | "unknown";
export type IvtmDataStatus = "verified_municipal" | "verified_state_fallback" | "estimated_range" | "outdated" | "requires_review" | "missing";
export type IvtmBonusReason = "environmental" | "historic" | "age_25_plus";
export type IvtmWarningCode =
  | "INVALID_INPUT"
  | "INVALID_MUNICIPALITY_CODE"
  | "MUNICIPALITY_NOT_FOUND"
  | "FISCAL_HORSEPOWER_REQUIRED"
  | "INVALID_FISCAL_HORSEPOWER"
  | "INVALID_REGISTRATION_DATE"
  | "TAX_YEAR_DATE_CONFLICT"
  | "MUNICIPAL_RATE_NOT_AVAILABLE"
  | "MUNICIPAL_RATE_YEAR_OUTDATED"
  | "MUNICIPAL_RATE_REQUIRES_REVIEW"
  | "BONUS_STATUS_UNKNOWN"
  | "BONUS_EVIDENCE_REQUIRED"
  | "BONUS_EVIDENCE_MISMATCH"
  | "BONUS_REASON_UNSUPPORTED"
  | "BONUS_ELIGIBILITY_MISMATCH"
  | "INVALID_BONUS_RATE"
  | "VEHICLE_TYPE_UNSUPPORTED";

export interface IvtmBonusEvidence {
  reason: IvtmBonusReason;
  municipalityCode: string;
  taxYear: number;
  confirmedRate: number;
  sourceUrl: string;
  eligibilityConfirmed: true;
  ordinanceTitle?: string;
  publicationDate?: string;
  [key: string]: unknown;
}

export interface MunicipalVehicleTaxInput {
  municipalityCode?: string;
  taxYear?: number;
  spanishRegistrationDate?: string;
  fiscalHorsepower?: number | null;
  vehicleType?: IvtmVehicleType | string;
  zeroEmissionStatus?: IvtmZeroEmissionStatus;
  isHistoricVehicle?: boolean;
  bonusStatus?: IvtmBonusStatus;
  confirmedBonusRate?: number | null;
  bonusEvidence?: IvtmBonusEvidence | unknown;
  calculationDate?: string;
}

export interface IvtmResolvedData {
  municipality?: Record<string, unknown> | null;
  rate?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
}

export interface IvtmScenario {
  id: string;
  label: string;
  taxAmount: number | null;
  bonusRate: number | null;
  dataStatus: IvtmDataStatus;
  assumptions: string[];
  warnings: string[];
  warningCodes: IvtmWarningCode[];
  source: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface MunicipalVehicleTaxResult {
  supportedCalculation: boolean;
  taxAmount: number | null;
  baseAnnualQuota: number | null;
  municipalAnnualQuota: number | null;
  municipalCoefficient: number | null;
  grossAnnualTax: number | null;
  proratedTax: number | null;
  bonusRate: number | null;
  bonusAmount: number | null;
  finalTax: number | null;
  referenceAnnualTax: number | null;
  referenceProratedTax: number | null;
  minimumAmount: number | null;
  maximumAmount: number | null;
  prudentBudget: number | null;
  municipality: Record<string, unknown> | null;
  municipalityCode: string | null;
  province: Record<string, unknown> | null;
  autonomousCommunity: Record<string, unknown> | null;
  taxYear: number | null;
  ratesYear: number | null;
  fiscalHorsepower: number | null;
  horsepowerBand: Record<string, unknown> | null;
  quarter: number | null;
  remainingQuarters: number | null;
  filingRequirement: string;
  paymentRequirement: string;
  dataStatus: IvtmDataStatus;
  legalBasis: Record<string, unknown>[];
  source: Record<string, unknown> | null;
  scenarios: IvtmScenario[];
  assumptions: string[];
  warnings: string[];
  warningCodes: IvtmWarningCode[];
  missingFields: string[];
}

export const IVTM_VEHICLE_TYPES: { readonly PASSENGER_CAR: "passenger_car" };
export const IVTM_ZERO_EMISSION_STATUSES: Record<string, IvtmZeroEmissionStatus>;
export const IVTM_BONUS_STATUSES: Record<string, IvtmBonusStatus>;
export const IVTM_DATA_STATUSES: Record<string, IvtmDataStatus>;
export const IVTM_WARNING_CODES: Record<string, IvtmWarningCode>;
export const STATE_TOURISM_QUOTAS_CENTS: Record<string, number>;
export const IVTM_HORSEPOWER_BANDS: readonly Record<string, unknown>[];

export function getIvtmHorsepowerBand(fiscalHorsepower: number): Record<string, unknown> | null;
export function getIvtmProrationFromRegistrationDate(spanishRegistrationDate: string): { quarter: number; remainingQuarters: number; rounding: string } | null;
export function calculateMunicipalVehicleTax(input?: MunicipalVehicleTaxInput, resolvedData?: IvtmResolvedData): MunicipalVehicleTaxResult;