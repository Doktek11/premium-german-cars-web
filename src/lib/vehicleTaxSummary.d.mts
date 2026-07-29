export type VehicleTaxSummaryStatus = "exact" | "partial" | "estimated" | "scenario_required" | "requires_review" | "invalid";
export type VehicleTaxLineItemStatus =
  | "confirmed"
  | "confirmed_zero"
  | "not_subject"
  | "exempt"
  | "filing_not_required"
  | "bonified"
  | "estimated"
  | "estimated_range"
  | "outdated"
  | "scenario_required"
  | "requires_review"
  | "missing"
  | "invalid";
export type VehicleTaxLineItemId = "iedmt" | "itp" | "ivtm" | "dgt_registration_fee";
export type VehicleTaxLineItemCategory = "tax" | "municipal_tax" | "administrative_fee";
export type VehicleTaxSummaryWarningCode =
  | "SUMMARY_INVALID_INPUT"
  | "SUMMARY_INVALID_LINE_ITEM_RESULT"
  | "SUMMARY_INVALID_REGISTRATION_FEE_RESULT"
  | "SUMMARY_RESULT_CONTRADICTION"
  | "SUMMARY_SCENARIOS_TRUNCATED"
  | string;

export interface VehicleTaxSummaryScenario {
  id: string;
  lineItemId: VehicleTaxLineItemId;
  sourceScenarioId: string | null;
  label: string;
  amount: number | null;
  probableAmount: number | null;
  minimumAmount: number | null;
  maximumAmount: number | null;
  prudentAmount: number | null;
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
}

export interface VehicleTaxSummaryLineItem {
  id: VehicleTaxLineItemId;
  label: string;
  category: VehicleTaxLineItemCategory;
  applicability: string | null;
  status: VehicleTaxLineItemStatus;
  amount: number | null;
  referenceAmount: number | null;
  probableAmount: number | null;
  minimumAmount: number | null;
  maximumAmount: number | null;
  prudentAmount: number | null;
  sourceType: string;
  source: Record<string, unknown> | null;
  legalBasis: Record<string, unknown>[];
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
  missingFields: string[];
  scenarios: VehicleTaxSummaryScenario[];
}

export interface VehicleTaxSummaryInput {
  registrationTaxResult?: Record<string, unknown> | null;
  transferTaxResult?: Record<string, unknown> | null;
  municipalVehicleTaxResult?: Record<string, unknown> | null;
  registrationFeeResult?: Record<string, unknown> | null;
  calculationDate?: string | null;
  currency?: "EUR" | string;
}

export interface VehicleTaxSummaryResult {
  status: VehicleTaxSummaryStatus;
  currency: "EUR" | null;
  exactTotal: number | null;
  confirmedSubtotal: number | null;
  probableTotal: number | null;
  minimumTotal: number | null;
  maximumTotal: number | null;
  prudentBudget: number | null;
  lineItems: VehicleTaxSummaryLineItem[];
  scenarios: VehicleTaxSummaryScenario[];
  assumptions: string[];
  warnings: string[];
  warningCodes: VehicleTaxSummaryWarningCode[];
  missingFields: string[];
  exactTotalBlockedBy: VehicleTaxLineItemId[];
}

export const VEHICLE_TAX_SUMMARY_STATUSES: {
  readonly EXACT: "exact";
  readonly PARTIAL: "partial";
  readonly ESTIMATED: "estimated";
  readonly SCENARIO_REQUIRED: "scenario_required";
  readonly REQUIRES_REVIEW: "requires_review";
  readonly INVALID: "invalid";
};

export const VEHICLE_TAX_LINE_ITEM_STATUSES: Record<string, VehicleTaxLineItemStatus>;
export const VEHICLE_TAX_SUMMARY_WARNING_CODES: Record<string, VehicleTaxSummaryWarningCode>;
export function calculateVehicleTaxSummary(input?: VehicleTaxSummaryInput): VehicleTaxSummaryResult;