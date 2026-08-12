import test from "node:test";
import assert from "node:assert/strict";

import {
  REGISTRATION_FEE_STATUSES,
  REGISTRATION_FEE_WARNING_CODES,
  calculateRegistrationFee,
} from "./registrationFee.mjs";

function input(overrides = {}) {
  return {
    procedure: "ordinary_vehicle_registration",
    vehicleType: "passenger_car",
    feeDate: "2026-07-29",
    calculationDate: "2026-07-29",
    currency: "EUR",
    ...overrides,
  };
}

const topLevelKeys = [
  "supportedCalculation",
  "applicability",
  "amount",
  "referenceAmount",
  "probableAmount",
  "minimumAmount",
  "maximumAmount",
  "prudentAmount",
  "feeCode",
  "feeYear",
  "status",
  "currency",
  "legalBasis",
  "source",
  "assumptions",
  "warnings",
  "warningCodes",
  "missingFields",
].sort();

function assertShape(result) {
  assert.deepEqual(Object.keys(result).sort(), topLevelKeys);
  assert.ok(Array.isArray(result.legalBasis));
  assert.ok(Array.isArray(result.assumptions));
  assert.ok(Array.isArray(result.warnings));
  assert.ok(Array.isArray(result.warningCodes));
  assert.ok(Array.isArray(result.missingFields));
}

test("tasa DGT 1.1 confirmada en 2026", () => {
  const result = calculateRegistrationFee(input());
  assertShape(result);
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.applicability, "applicable");
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.CONFIRMED);
  assert.equal(result.amount, 99.77);
  assert.equal(result.referenceAmount, 99.77);
  assert.equal(result.probableAmount, 99.77);
  assert.equal(result.minimumAmount, 99.77);
  assert.equal(result.maximumAmount, 99.77);
  assert.equal(result.prudentAmount, 99.77);
  assert.equal(result.feeCode, "1.1");
  assert.equal(result.feeYear, 2026);
  assert.equal(result.currency, "EUR");
  assert.equal(result.source.type, "official");
  assert.equal(result.source.rule.verifiedAt, "2026-07-29");
  assert.ok(result.legalBasis.some((item) => item.url.includes("sedeclave.dgt.gob.es")));
});

test("fecha futura respecto a calculationDate no confirma tasa", () => {
  const result = calculateRegistrationFee(input({ feeDate: "2026-12-01", calculationDate: "2026-07-29" }));
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.REQUIRES_REVIEW);
  assert.equal(result.amount, null);
  assert.equal(result.referenceAmount, 99.77);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.FUTURE_FEE_DATE));
});

test("fecha futura dentro del ejercicio con tarifa disponible conserva importe orientativo no confirmado", () => {
  const result = calculateRegistrationFee(input({ feeDate: "2026-12-01", calculationDate: "2026-07-29" }));
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.REQUIRES_REVIEW);
  assert.equal(result.amount, null);
  assert.equal(result.referenceAmount, 99.77);
  assert.equal(result.probableAmount, 99.77);
  assert.equal(result.minimumAmount, 99.77);
  assert.equal(result.maximumAmount, 99.77);
  assert.equal(result.prudentAmount, 99.77);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.FUTURE_FEE_DATE));
});

test("2027 sin regla cargada conserva referencia 2026 como outdated", () => {
  const result = calculateRegistrationFee(input({ feeDate: "2027-01-10", calculationDate: "2027-01-10" }));
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.OUTDATED);
  assert.equal(result.amount, null);
  assert.equal(result.referenceAmount, 99.77);
  assert.equal(result.probableAmount, null);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.REGISTRATION_FEE_OUTDATED));
});

test("2025 sin regla historica no usa tarifa futura como referencia", () => {
  const result = calculateRegistrationFee(input({ feeDate: "2025-12-31", calculationDate: "2025-12-31" }));
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.MISSING);
  assert.equal(result.amount, null);
  assert.equal(result.referenceAmount, null);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.REGISTRATION_FEE_YEAR_UNSUPPORTED));
});

test("fecha invalida bloquea con missingFields explicito", () => {
  const result = calculateRegistrationFee(input({ feeDate: "2026-02-31" }));
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.INVALID);
  assert.equal(result.amount, null);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.INVALID_INPUT));
  assert.ok(result.missingFields.includes("feeDate"));
});

test("moneda invalida no aplica default silencioso", () => {
  const result = calculateRegistrationFee(input({ currency: "USD" }));
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.INVALID);
  assert.equal(result.currency, null);
  assert.equal(result.amount, null);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.INVALID_CURRENCY));
});

test("vehiculo y procedimiento no soportados quedan invalid", () => {
  const result = calculateRegistrationFee(input({ procedure: "transfer", vehicleType: "moped" }));
  assert.equal(result.status, REGISTRATION_FEE_STATUSES.INVALID);
  assert.equal(result.amount, null);
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.PROCEDURE_UNSUPPORTED));
  assert.ok(result.warningCodes.includes(REGISTRATION_FEE_WARNING_CODES.VEHICLE_TYPE_UNSUPPORTED));
});

test("input no mutado, clones defensivos y dos llamadas independientes", () => {
  const original = input();
  const before = JSON.stringify(original);
  const first = calculateRegistrationFee(original);
  first.source.rule.feeCode = "mutated";
  const second = calculateRegistrationFee(original);
  assert.equal(JSON.stringify(original), before);
  assert.equal(second.source.rule.feeCode, "1.1");
  assert.notEqual(first.source, second.source);
});

test("forma JSON serializable y sin valores no finitos", () => {
  const result = calculateRegistrationFee(input());
  const json = JSON.stringify(result);
  assert.equal(json.includes("NaN"), false);
  assert.equal(json.includes("Infinity"), false);
  assert.deepEqual(JSON.parse(json), result);
});