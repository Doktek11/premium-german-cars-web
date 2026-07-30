import type { IncomingMessage } from "node:http";

import type { VehicleTaxCalculationResult } from "./vehicleTaxCalculationOrchestrator.d.mts";
import type { VehicleTaxCaseFile } from "./vehicleTaxCaseFile.d.mts";

export declare const VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION: "vehicle_tax_estimate_request.v1";
export declare const VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION: "vehicle_tax_estimate_response.v1";
export declare const VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES: number;
export declare const VEHICLE_TAX_ESTIMATE_TIMEOUT_MS: number;

export type VehicleTaxEstimateScenarioPolicy = "confirmed_only" | "documentary_scenarios";

export interface VehicleTaxEstimateOptions {
  calculationDate: string;
  taxYear: number;
  scenarioPolicy: VehicleTaxEstimateScenarioPolicy;
  maxScenarios: number;
  currency: "EUR";
}

export interface VehicleTaxEstimateRequestBody {
  schemaVersion: typeof VEHICLE_TAX_ESTIMATE_REQUEST_SCHEMA_VERSION;
  caseFile: VehicleTaxCaseFile;
  options: VehicleTaxEstimateOptions;
}

export interface VehicleTaxEstimateSuccessBody {
  schemaVersion: typeof VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION;
  requestId: string;
  ok: true;
  data: VehicleTaxCalculationResult;
}

export interface VehicleTaxEstimateErrorBody {
  schemaVersion: typeof VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION;
  requestId: string;
  ok: false;
  error: {
    code: string;
    message: string;
  };
}

export type VehicleTaxEstimateResponseBody = VehicleTaxEstimateSuccessBody | VehicleTaxEstimateErrorBody;

export interface VehicleTaxEstimateHttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: VehicleTaxEstimateResponseBody;
}

export interface VehicleTaxEstimateRequestLike extends Partial<IncomingMessage> {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
}

export interface VehicleTaxEstimateResponseLike {
  setHeader?: (name: string, value: string) => void;
  status: (code: number) => VehicleTaxEstimateResponseLike;
  json: (body: unknown) => VehicleTaxEstimateResponseLike;
}

export interface VehicleTaxEstimateApiConfig {
  apiKey?: string;
  maxBodyBytes?: number;
  timeoutMs?: number;
  createRequestId?: () => string;
  calculateVehicleTaxCase?: (caseFile: VehicleTaxCaseFile, options: VehicleTaxEstimateOptions) => Promise<VehicleTaxCalculationResult> | VehicleTaxCalculationResult;
}

export declare function handleVehicleTaxEstimateRequest(req: VehicleTaxEstimateRequestLike, config?: VehicleTaxEstimateApiConfig): Promise<VehicleTaxEstimateHttpResponse>;

export declare function sendVehicleTaxEstimateResponse(res: VehicleTaxEstimateResponseLike, response: VehicleTaxEstimateHttpResponse): VehicleTaxEstimateResponseLike;
