export type SellerType = "private" | "professional" | "unknown";
export type BuyerType = "private" | "professional" | "vehicle_reseller" | "unknown";
export type DocumentType = "private_sale_contract" | "invoice" | "unknown";
export type VatRegime =
  | "not_applicable_private_sale"
  | "general_vat"
  | "rebu"
  | "vat_not_itemized"
  | "unknown";
export type ZeroEmissionStatus = "confirmed" | "not_zero_emission" | "unknown";
export type TransferTaxFilingRequirement = "required" | "not_required" | "conditional" | "unknown";
export type TransferTaxApplicability =
  | "taxable"
  | "bonified"
  | "not_subject"
  | "exempt"
  | "filing_not_required"
  | "scenario_required"
  | "review_required";

export type TransferTaxJsonValue =
  | null
  | boolean
  | number
  | string
  | TransferTaxJsonValue[]
  | { [key: string]: TransferTaxJsonValue };

export type TransferTaxEvidence = TransferTaxJsonValue;

export type TransferTaxLegalBasis = {
  source: string;
  article: string;
  summary: string;
  url: string;
};

export type TransferTaxNormalizedCountries = {
  buyerTaxResidenceCountry: "ES" | "DE" | null;
  sellerCountry: "ES" | "DE" | null;
};

export type TransferTaxOutcome = {
  applicability: TransferTaxApplicability;
  supportedCalculation: boolean;
  taxAmount: number | null;
  probableAmount: number | null;
  minimumAmount: number | null;
  maximumAmount: number | null;
  prudentBudget: number | null;
  taxableBase: number | null;
  rate: number | null;
  fixedFee: number | null;
  territoryRule: string | null;
  territoryStatus: string | null;
  legalBasis: TransferTaxLegalBasis[];
  assumptions: string[];
  warnings: string[];
  warningCodes: string[];
  missingFields: string[];
  evidence: TransferTaxEvidence | null;
  normalizedCountries: TransferTaxNormalizedCountries;
  filingRequirement: TransferTaxFilingRequirement;
  filingForm: "620" | null;
};

export type TransferTaxScenario = TransferTaxOutcome & {
  id: string;
  label: string;
};

export type TransferTaxResult = TransferTaxOutcome & {
  scenarios: TransferTaxScenario[];
};

export type TransferTaxInput = {
  transactionDate?: string | Date | null;
  buyerRegion?: string | null;
  buyerProvince?: string | null;
  buyerCountry?: string | null;
  buyerTaxResidenceCountry?: string | null;
  sellerCountry?: string | null;
  sellerType?: SellerType | string | null;
  buyerType?: BuyerType | string | null;
  documentType?: DocumentType | string | null;
  vatRegime?: VatRegime | string | null;
  zeroEmissionStatus?: ZeroEmissionStatus | string | null;
  purchasePrice?: number | string | null;
  officialMarketValue?: number | string | null;
  originalBoeValue?: number | string | null;
  vehicleCategory?: string | null;
  engineDisplacement?: number | string | null;
  fiscalHorsepower?: number | string | null;
  firstRegistrationDate?: string | null;
  intendedForResale?: boolean | null;
  isHistoricVehicle?: boolean | null;
  isEndOfLifeVehicle?: boolean | null;
  evidence?: TransferTaxEvidence | null;
};

export const SELLER_TYPES: {
  PRIVATE: "private";
  PROFESSIONAL: "professional";
  UNKNOWN: "unknown";
};
export const BUYER_TYPES: {
  PRIVATE: "private";
  PROFESSIONAL: "professional";
  VEHICLE_RESELLER: "vehicle_reseller";
  UNKNOWN: "unknown";
};
export const DOCUMENT_TYPES: {
  PRIVATE_SALE_CONTRACT: "private_sale_contract";
  INVOICE: "invoice";
  UNKNOWN: "unknown";
};
export const VAT_REGIMES: {
  NOT_APPLICABLE_PRIVATE_SALE: "not_applicable_private_sale";
  GENERAL_VAT: "general_vat";
  REBU: "rebu";
  VAT_NOT_ITEMIZED: "vat_not_itemized";
  UNKNOWN: "unknown";
};
export const ZERO_EMISSION_STATUSES: {
  CONFIRMED: "confirmed";
  NOT_ZERO_EMISSION: "not_zero_emission";
  UNKNOWN: "unknown";
};
export const TRANSFER_TAX_FILING_REQUIREMENTS: {
  REQUIRED: "required";
  NOT_REQUIRED: "not_required";
  CONDITIONAL: "conditional";
  UNKNOWN: "unknown";
};
export const TRANSFER_TAX_APPLICABILITY: {
  TAXABLE: "taxable";
  BONIFIED: "bonified";
  NOT_SUBJECT: "not_subject";
  EXEMPT: "exempt";
  FILING_NOT_REQUIRED: "filing_not_required";
  SCENARIO_REQUIRED: "scenario_required";
  REVIEW_REQUIRED: "review_required";
};
export const TRANSFER_TAX_WARNING_CODES: Record<string, string>;
export function calculateTransferTax(input?: TransferTaxInput): TransferTaxResult;
