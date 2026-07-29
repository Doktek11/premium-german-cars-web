export type RegistrationFeeApplicability = "applicable" | "unsupported";
export type RegistrationFeeStatus = "confirmed" | "outdated" | "missing" | "requires_review" | "invalid";
export type RegistrationFeeWarningCode =
  | "REGISTRATION_FEE_INVALID_INPUT"
  | "REGISTRATION_FEE_INVALID_CURRENCY"
  | "REGISTRATION_FEE_PROCEDURE_UNSUPPORTED"
  | "REGISTRATION_FEE_VEHICLE_TYPE_UNSUPPORTED"
  | "REGISTRATION_FEE_FUTURE_FEE_DATE"
  | "REGISTRATION_FEE_OUTDATED"
  | "REGISTRATION_FEE_YEAR_UNSUPPORTED";

export interface RegistrationFeeInput {
  procedure?: "ordinary_vehicle_registration" | string;
  vehicleType?: "passenger_car" | string;
  feeDate?: string | null;
  calculationDate?: string | null;
  currency?: "EUR" | string;
}

export interface RegistrationFeeResult {
  supportedCalculation: boolean;
  applicability: RegistrationFeeApplicability;
  amount: number | null;
  referenceAmount: number | null;
  probableAmount: number | null;
  minimumAmount: number | null;
  maximumAmount: number | null;
  prudentAmount: number | null;
  feeCode: string | null;
  feeYear: number | null;
  status: RegistrationFeeStatus;
  currency: "EUR" | null;
  legalBasis: Record<string, unknown>[];
  source: Record<string, unknown> | null;
  assumptions: string[];
  warnings: string[];
  warningCodes: RegistrationFeeWarningCode[];
  missingFields: string[];
}

export const REGISTRATION_FEE_APPLICABILITY: {
  readonly APPLICABLE: "applicable";
  readonly UNSUPPORTED: "unsupported";
};

export const REGISTRATION_FEE_STATUSES: {
  readonly CONFIRMED: "confirmed";
  readonly OUTDATED: "outdated";
  readonly MISSING: "missing";
  readonly REQUIRES_REVIEW: "requires_review";
  readonly INVALID: "invalid";
};

export const REGISTRATION_FEE_WARNING_CODES: Record<string, RegistrationFeeWarningCode>;

export function calculateRegistrationFee(input?: RegistrationFeeInput): RegistrationFeeResult;