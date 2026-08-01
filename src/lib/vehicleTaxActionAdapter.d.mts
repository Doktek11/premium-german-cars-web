import type { VehicleTaxCaseFile } from "./vehicleTaxCaseFile.d.mts";
import type { VehicleTaxActionRequestDto, VehicleTaxActionValueType } from "./vehicleTaxActionDto.d.mts";
import type { VehicleTaxEstimateOptions } from "./vehicleTaxEstimateApi.d.mts";

export declare const VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION: "vehicle_tax_action_request.v1";

export interface VehicleTaxActionFieldContractEntry {
  valueType: VehicleTaxActionValueType;
  min?: number;
  max?: number;
  allowYearMonth?: boolean;
  enumValues?: readonly string[];
}

export declare const VEHICLE_TAX_ACTION_FIELD_CONTRACT: Readonly<Record<string, VehicleTaxActionFieldContractEntry>>;
export declare const VEHICLE_TAX_ACTION_LIMITATIONS: Readonly<{
  imKundenauftrag: "out_of_scope_structured_v1";
  ivtmBonifications: "out_of_scope_structured_v1";
}>;

export declare class VehicleTaxActionDtoError extends Error {
  code: string;
  statusCode: number;
  constructor(code: string, message: string, statusCode?: number);
}

export interface VehicleTaxActionAdaptedRequest {
  caseFile: VehicleTaxCaseFile;
  options: VehicleTaxEstimateOptions;
}

export declare function buildVehicleTaxCaseFromActionDto(dto: VehicleTaxActionRequestDto | unknown): VehicleTaxActionAdaptedRequest;
