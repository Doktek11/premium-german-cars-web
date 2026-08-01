import { handleVehicleTaxActionRequest } from "../src/lib/vehicleTaxActionApi.mjs";
import { sendVehicleTaxEstimateResponse } from "../src/lib/vehicleTaxEstimateApi.mjs";

const FALLBACK_ERROR_BODY = Object.freeze({
  schemaVersion: "vehicle_tax_estimate_response.v1",
  requestId: "request_error",
  ok: false,
  error: {
    code: "INTERNAL_ERROR",
    message: "Internal error.",
  },
});

function canWrite(res) {
  return res?.headersSent !== true && res?.writableEnded !== true;
}

function sendFallback(res) {
  try {
    if (!canWrite(res)) return res;
    if (typeof res.setHeader === "function") {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
    }
    return res.status(500).json(FALLBACK_ERROR_BODY);
  } catch {
    return res;
  }
}

export default async function handler(req, res) {
  try {
    const response = await handleVehicleTaxActionRequest(req, {
      apiKey: process.env.VEHICLE_TAX_ESTIMATE_API_KEY,
    });
    if (!canWrite(res)) return res;
    return sendVehicleTaxEstimateResponse(res, response);
  } catch {
    return sendFallback(res);
  }
}
