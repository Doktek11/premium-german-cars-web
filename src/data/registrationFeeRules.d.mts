export type RegistrationFeeProcedure = "ordinary_vehicle_registration";
export type RegistrationFeeVehicleType = "passenger_car";
export type RegistrationFeeCurrency = "EUR";
export type RegistrationFeeSourceType = "official";

export interface RegistrationFeeRule {
  procedure: RegistrationFeeProcedure;
  vehicleType: RegistrationFeeVehicleType;
  feeCode: string;
  label: string;
  description: string;
  amount: number;
  currency: RegistrationFeeCurrency;
  feeYear: number;
  verifiedAt: string;
  sourceType: RegistrationFeeSourceType;
  source: Record<string, unknown>;
  legalBasis: Record<string, unknown>[];
  assumptions: string[];
}

export const REGISTRATION_FEE_PROCEDURES: { readonly ORDINARY_VEHICLE_REGISTRATION: "ordinary_vehicle_registration" };
export const REGISTRATION_FEE_VEHICLE_TYPES: { readonly PASSENGER_CAR: "passenger_car" };
export const REGISTRATION_FEE_CURRENCIES: { readonly EUR: "EUR" };
export const REGISTRATION_FEE_RULES: readonly RegistrationFeeRule[];

export function findRegistrationFeeRule(input: {
  procedure: string;
  vehicleType: string;
  feeYear: number;
  currency: string;
}): RegistrationFeeRule | null;

export function latestRegistrationFeeRule(input: {
  procedure: string;
  vehicleType: string;
  currency: string;
}): RegistrationFeeRule | null;