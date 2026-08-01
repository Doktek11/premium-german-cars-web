import type { VehicleTaxEstimateHttpResponse, VehicleTaxEstimateRequestLike } from "./vehicleTaxEstimateApi.d.mts";
import type { VehicleTaxCalculationResult } from "./vehicleTaxCalculationOrchestrator.d.mts";
import type { VehicleTaxCaseFile } from "./vehicleTaxCaseFile.d.mts";
import type { VehicleTaxEstimateOptions } from "./vehicleTaxEstimateApi.d.mts";

export declare const VEHICLE_TAX_ACTION_MAX_STRUCTURE_DEPTH: 64;
export declare const VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES: 20000;

export interface VehicleTaxActionApiConfig {
  apiKey?: string;
  maxBodyBytes?: number;
  timeoutMs?: number;
  createRequestId?: () => string;
  buildVehicleTaxCaseFromActionDto?: (dto: unknown) => { caseFile: VehicleTaxCaseFile; options: VehicleTaxEstimateOptions };
  calculateVehicleTaxCase?: (caseFile: VehicleTaxCaseFile, options: VehicleTaxEstimateOptions) => Promise<VehicleTaxCalculationResult> | VehicleTaxCalculationResult;
}

export declare function handleVehicleTaxActionRequest(req: VehicleTaxEstimateRequestLike, config?: VehicleTaxActionApiConfig): Promise<VehicleTaxEstimateHttpResponse>;
