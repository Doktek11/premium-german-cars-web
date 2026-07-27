export type VehicleCondition =
  | "usado_importado"
  | "nuevo_o_no_matriculado"
  | "desconocido";

export type EmissionsStandard = "nedc" | "wltp" | "unknown";

export type Territory = {
  id: string;
  label: string;
  displayName: string;
  group: string;
  supportedAutomaticCalculation: boolean;
  currentHighEmissionRate: number;
  aliases: string[];
};

export type RegistrationTaxResult = {
  supportedCalculation: boolean;
  scope: string;
  boeValue: number | null;
  firstRegistrationDate: string | null;
  isDerivedFirstRegistrationDate: boolean;
  months: number | null;
  depreciationCoefficient: number | null;
  marketValue: number | null;
  indirectTaxName: string;
  indirectTaxRate: number | null;
  residualRegistrationTaxRate: number | null;
  otherIndirectTaxRate: number;
  denominator: number | null;
  taxableBase: number | null;
  currentRegistrationTaxRate: number | null;
  rate: number | null;
  tax: number | null;
  selectedTerritory: Territory | null;
  territory: Territory | null;
  territoryForRate: Territory;
  needsTerritory: boolean;
  isProvisionalTerritory: boolean;
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
  exclusionReason: string;
  urlRate: number | null;
  validatedUrlRate: number | null;
  isUrlRateConsistent: boolean;
};

export const DEFAULT_TERRITORY_ID: string;
export const VEHICLE_CONDITIONS: {
  USED_IMPORTED: "usado_importado";
  NEW_OR_NOT_PREVIOUSLY_REGISTERED: "nuevo_o_no_matriculado";
  UNKNOWN: "desconocido";
};
export const EMISSIONS_STANDARDS: {
  NEDC: "nedc";
  WLTP: "wltp";
  UNKNOWN: "unknown";
};
export const TERRITORIES: Territory[];
export function normalizeTerritoryKey(value?: string): string;
export function getTerritoryById(id?: string | null): Territory | null;
export function getTerritoryFromParam(value?: string | null): Territory | null;
export function parseRateParam(value?: string | null): number | null;
export function toPercentRate(rate?: number | null): number | null;
export function getMonthsFromFirstRegistrationDate(
  firstRegistrationDate?: string | null,
  calculationDate?: string | Date | null
): number | null;
export function getRateFromEmissions(
  emissions: number,
  territoryId?: string | null
): number | null;
export function getCurrentRegistrationTaxRate(input: {
  emissions: number;
  territoryId?: string | null;
  noAccreditedEmissions?: boolean;
}): { rate: number | null; supported: boolean; warningCode: string; warning: string };
export function getResidualRegistrationTaxRate(input: {
  firstRegistrationDate?: string | null;
  emissions: number;
  territoryId?: string | null;
  noAccreditedEmissions?: boolean;
  emissionsStandard?: EmissionsStandard;
}): { rate: number | null; supported: boolean; sourcePeriod: string; warningCode: string; warning: string };
export function getResidualIndirectTaxRate(input: {
  firstRegistrationDate?: string | null;
  territoryId?: string | null;
}): {
  rate: number | null;
  taxName: string;
  supported: boolean;
  sourcePeriod: string;
  warningCode: string;
  warning: string;
};
export function getDepreciationCoefficient(months: number): number | null;
export function calculateRegistrationTax(input: {
  boeValue?: number | null;
  price?: number | null;
  emissions: number;
  firstRegistrationDate?: string | null;
  months?: number | null;
  calculationDate?: string | Date | null;
  territoryId?: string | null;
  noAccreditedEmissions?: boolean;
  vehicleCondition?: VehicleCondition;
  emissionsStandard?: EmissionsStandard;
  urlRate?: number | null;
  otherIndirectTaxRate?: number | null;
}): RegistrationTaxResult;

