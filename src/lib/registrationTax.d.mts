export type Territory = {
  id: string;
  label: string;
  displayName: string;
  rate: number;
  aliases: string[];
};

export type RegistrationTaxResult = {
  taxableBase: number;
  tax: number;
  rate: number;
  coefficient: number;
  needsTerritory: boolean;
  isProvisionalTerritory: boolean;
  territory: Territory | null;
  territoryForRate: Territory;
  urlRate: number | null;
  validatedUrlRate: number | null;
  isUrlRateConsistent: boolean;
};

export const DEFAULT_TERRITORY_ID: string;
export const TERRITORIES: Territory[];
export function normalizeTerritoryKey(value?: string): string;
export function getTerritoryById(id?: string | null): Territory | null;
export function getTerritoryFromParam(value?: string | null): Territory | null;
export function parseRateParam(value?: string | null): number | null;
export function getRateFromEmissions(emissions: number): number | null;
export function getDepreciationCoefficient(months: number): number;
export function calculateRegistrationTax(input: {
  price: number;
  emissions: number;
  months: number;
  territoryId?: string | null;
  noAccreditedEmissions?: boolean;
  urlRate?: number | null;
}): RegistrationTaxResult;
