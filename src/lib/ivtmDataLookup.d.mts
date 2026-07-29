import type { MunicipalVehicleTaxInput, MunicipalVehicleTaxResult } from "./municipalVehicleTax.mjs";

export interface IvtmLookupResult {
  ok: boolean;
  reason: "invalid_code" | "not_found" | "rate_found" | "rate_missing";
  municipalityCode: string | null;
  municipality: Record<string, unknown> | null;
  rate: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
}

export interface IvtmLookup {
  readonly counts: { readonly municipalities: number; readonly rates: number };
  readonly metadata: Record<string, unknown> | null;
  resolveMunicipalityCode(code: string): IvtmLookupResult;
}

export interface IvtmDataLoadOptions {
  municipalitiesUrl?: URL;
  ratesUrl?: URL;
  metadataUrl?: URL;
}

export function loadIvtmData(options?: IvtmDataLoadOptions): Promise<IvtmLookup>;
export function resolveIvtmMunicipalityData(municipalityCode: string, options?: IvtmDataLoadOptions): Promise<IvtmLookupResult>;
export function calculateMunicipalVehicleTaxWithLookup(input: MunicipalVehicleTaxInput, options?: IvtmDataLoadOptions): Promise<MunicipalVehicleTaxResult>;
export function clearIvtmDataCacheForTests(): void;