export type TransferTaxTerritoryStatus =
  | "SUPPORTED"
  | "SUPPORTED_WITH_CONDITIONS"
  | "REQUIRES_REVIEW"
  | "UNSUPPORTED";

export type TransferTaxSpecialRule = {
  id: string;
  kind: "rate" | "fixed_fee";
  vehicleCategories?: string[];
  minAgeMonthsExclusive?: number;
  minEngineDisplacement?: number;
  maxEngineDisplacement?: number;
  minFiscalHorsepowerExclusive?: number;
  rate?: number;
  fixedFee?: number;
  excludesHistoricVehicle?: boolean;
  zeroEmissionStatus?: "confirmed" | "not_zero_emission" | "unknown";
};

export type TransferTaxTerritorySource = {
  title: string;
  url: string;
  article: string;
  verifiedAt: string;
};

export type TransferTaxTerritoryRule = {
  id: string;
  aliases: string[];
  status: TransferTaxTerritoryStatus;
  effectiveFrom: string | null;
  effectiveTo: string | null;
  generalRate: number | null;
  specialRules: TransferTaxSpecialRule[];
  requiresProvince?: boolean;
  source: TransferTaxTerritorySource;
  sources?: TransferTaxTerritorySource[];
  valuationSource?: string;
  filingForm?: "620";
  note?: string;
};

export const TRANSFER_TAX_TERRITORY_STATUSES: {
  SUPPORTED: "SUPPORTED";
  SUPPORTED_WITH_CONDITIONS: "SUPPORTED_WITH_CONDITIONS";
  REQUIRES_REVIEW: "REQUIRES_REVIEW";
  UNSUPPORTED: "UNSUPPORTED";
};

export const TRANSFER_TAX_TERRITORY_RULES: TransferTaxTerritoryRule[];
export function normalizeTransferTaxTerritoryKey(value?: string | null): string;
export function getTransferTaxTerritoryRules(value?: string | null): TransferTaxTerritoryRule[];
export function getTransferTaxTerritoryRule(value?: string | null): TransferTaxTerritoryRule | null;
