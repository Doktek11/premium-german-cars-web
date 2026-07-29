import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { calculateRegistrationTax } from "./registrationTax.mjs";
import { calculateTransferTax, BUYER_TYPES, SELLER_TYPES, VAT_REGIMES } from "./transferTax.mjs";
import { calculateMunicipalVehicleTax } from "./municipalVehicleTax.mjs";
import { calculateRegistrationFee } from "./registrationFee.mjs";
import {
  VEHICLE_TAX_LINE_ITEM_STATUSES,
  VEHICLE_TAX_SUMMARY_STATUSES,
  VEHICLE_TAX_SUMMARY_WARNING_CODES,
  calculateVehicleTaxSummary,
} from "./vehicleTaxSummary.mjs";

const dataDir = new URL("../data/ivtm/", import.meta.url);
const municipalities = JSON.parse(readFileSync(new URL("./municipalities-2026.json", dataDir), "utf8"));
const rates = JSON.parse(readFileSync(new URL("./municipal-rates-2025.json", dataDir), "utf8"));
const metadata = JSON.parse(readFileSync(new URL("./metadata.json", dataDir), "utf8"));
const municipalitiesByCode = new Map(municipalities.map((municipality) => [municipality.ineCode, municipality]));
const ratesByCode = new Map(rates.map((rate) => [rate.ineCode, rate]));
const clone = (value) => JSON.parse(JSON.stringify(value));
const resolved = (code) => ({ municipality: clone(municipalitiesByCode.get(code) ?? null), rate: clone(ratesByCode.get(code) ?? null), metadata: clone(metadata) });

const transferBaseInput = {
  transactionDate: "2026-07-01",
  buyerRegion: "madrid",
  sellerType: SELLER_TYPES.PRIVATE,
  buyerType: BUYER_TYPES.PRIVATE,
  documentType: "private_sale_contract",
  vatRegime: VAT_REGIMES.NOT_APPLICABLE_PRIVATE_SALE,
  purchasePrice: 12000,
  officialMarketValue: 10000,
  evidence: { madridReducedValuationUse: false },
  vehicleCategory: "passenger_car",
  engineDisplacement: 1995,
  fiscalHorsepower: 14.7,
  firstRegistrationDate: "2018-06-01",
};

function iedmtPositive() {
  return calculateRegistrationTax({ boeValue: 61200, emissions: 210, firstRegistrationDate: "2014-06-15", calculationDate: "2026-07-29", vehicleCondition: "usado_importado", territoryId: "peninsula_general" });
}

function iedmtZero() {
  return calculateRegistrationTax({ boeValue: 30000, emissions: 100, firstRegistrationDate: "2024-01-01", calculationDate: "2026-07-29", vehicleCondition: "usado_importado", territoryId: "peninsula_general" });
}

function itpTaxable(overrides = {}) {
  return calculateTransferTax({ ...transferBaseInput, ...overrides });
}

function ivtmExact(overrides = {}, code = "28079") {
  return calculateMunicipalVehicleTax(
    {
      municipalityCode: code,
      taxYear: 2025,
      spanishRegistrationDate: "2025-01-15",
      fiscalHorsepower: 12,
      vehicleType: "passenger_car",
      zeroEmissionStatus: "not_zero_emission",
      isHistoricVehicle: false,
      bonusStatus: "not_applicable",
      ...overrides,
    },
    resolved(code)
  );
}

function dgtConfirmed(overrides = {}) {
  return calculateRegistrationFee({ procedure: "ordinary_vehicle_registration", vehicleType: "passenger_car", feeDate: "2026-07-29", calculationDate: "2026-07-29", currency: "EUR", ...overrides });
}

function summary(overrides = {}) {
  return calculateVehicleTaxSummary({
    registrationTaxResult: iedmtPositive(),
    transferTaxResult: itpTaxable(),
    municipalVehicleTaxResult: ivtmExact(),
    registrationFeeResult: dgtConfirmed(),
    calculationDate: "2026-07-29",
    currency: "EUR",
    ...overrides,
  });
}

const summaryKeys = ["status", "currency", "exactTotal", "confirmedSubtotal", "probableTotal", "minimumTotal", "maximumTotal", "prudentBudget", "lineItems", "scenarios", "assumptions", "warnings", "warningCodes", "missingFields", "exactTotalBlockedBy"].sort();
const lineItemKeys = ["id", "label", "category", "applicability", "status", "amount", "referenceAmount", "probableAmount", "minimumAmount", "maximumAmount", "prudentAmount", "sourceType", "source", "legalBasis", "assumptions", "warnings", "warningCodes", "missingFields", "scenarios"].sort();
const scenarioKeys = ["id", "lineItemId", "sourceScenarioId", "label", "amount", "probableAmount", "minimumAmount", "maximumAmount", "prudentAmount", "assumptions", "warnings", "warningCodes"].sort();

function assertShape(result) {
  assert.deepEqual(Object.keys(result).sort(), summaryKeys);
  assert.deepEqual(result.lineItems.map((item) => item.id), ["iedmt", "itp", "ivtm", "dgt_registration_fee"]);
  for (const item of result.lineItems) assert.deepEqual(Object.keys(item).sort(), lineItemKeys);
  for (const scenario of result.scenarios) assert.deepEqual(Object.keys(scenario).sort(), scenarioKeys);
}

function item(result, id) {
  return result.lineItems.find((lineItem) => lineItem.id === id);
}

function assertInvalidDgtResult(registrationFeeResult) {
  const result = summary({ registrationFeeResult });
  const dgt = item(result, "dgt_registration_fee");
  assert.equal(result.status, VEHICLE_TAX_SUMMARY_STATUSES.INVALID);
  assert.equal(result.exactTotal, null);
  assert.equal(result.confirmedSubtotal, 664.97 + 480 + 129);
  assert.deepEqual(result.exactTotalBlockedBy, ["dgt_registration_fee"]);
  assert.equal(dgt.status, VEHICLE_TAX_LINE_ITEM_STATUSES.INVALID);
  assert.equal(dgt.amount, null);
  assert.ok(dgt.warningCodes.includes(VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_REGISTRATION_FEE_RESULT));
}
test("cuatro partidas confirmadas generan resumen exacto", () => {
  const result = summary();
  assertShape(result);
  assert.equal(result.status, VEHICLE_TAX_SUMMARY_STATUSES.EXACT);
  assert.equal(result.currency, "EUR");
  assert.equal(item(result, "iedmt").status, VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED);
  assert.equal(item(result, "itp").status, VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED);
  assert.equal(item(result, "ivtm").status, VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED);
  assert.equal(item(result, "dgt_registration_fee").status, VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED);
  assert.equal(item(result, "itp").amount, 480);
  assert.equal(item(result, "ivtm").amount, 129);
  assert.equal(item(result, "dgt_registration_fee").amount, 99.77);
  assert.equal(result.exactTotal, result.confirmedSubtotal);
  assert.equal(result.exactTotal, result.probableTotal);
  assert.deepEqual(result.exactTotalBlockedBy, []);
});

test("IEDMT positivo y cuota cero real se diferencian", () => {
  const positive = summary();
  const zero = summary({ registrationTaxResult: iedmtZero() });
  assert.equal(item(positive, "iedmt").status, "confirmed");
  assert.equal(item(zero, "iedmt").status, "confirmed_zero");
  assert.equal(item(zero, "iedmt").amount, 0);
});

test("IEDMT invalido y no automatizado no se mezclan", () => {
  const invalid = summary({ registrationTaxResult: calculateRegistrationTax({ boeValue: 0, emissions: 100, firstRegistrationDate: "2024-01-01", calculationDate: "2026-07-29", vehicleCondition: "usado_importado", territoryId: "peninsula_general" }) });
  const review = summary({ registrationTaxResult: calculateRegistrationTax({ boeValue: 30000, emissions: 100, firstRegistrationDate: "2024-01-01", calculationDate: "2026-07-29", vehicleCondition: "nuevo_o_no_matriculado", territoryId: "peninsula_general" }) });
  assert.equal(invalid.status, "invalid");
  assert.equal(item(invalid, "iedmt").status, "invalid");
  assert.equal(review.status, "requires_review");
  assert.equal(item(review, "iedmt").status, "requires_review");
});

test("ITP taxable not_subject exempt bonified y filing_not_required preservan semantica", () => {
  const taxable = summary();
  const notSubject = summary({ transferTaxResult: itpTaxable({ sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.GENERAL_VAT }) });
  const exemptLike = summary({ transferTaxResult: { ...itpTaxable(), applicability: "exempt", taxAmount: 0, probableAmount: 0, minimumAmount: 0, maximumAmount: 0, prudentBudget: 0 } });
  const bonifiedLike = summary({ transferTaxResult: { ...itpTaxable(), applicability: "bonified", taxAmount: 120, probableAmount: 120, minimumAmount: 120, maximumAmount: 120, prudentBudget: 120 } });
  const filingNotRequired = summary({ transferTaxResult: { ...itpTaxable(), applicability: "filing_not_required", taxAmount: 0, probableAmount: 0, minimumAmount: 0, maximumAmount: 0, prudentBudget: 0, filingRequirement: "not_required" } });
  assert.equal(item(taxable, "itp").status, "confirmed");
  assert.equal(item(notSubject, "itp").status, "not_subject");
  assert.equal(item(notSubject, "itp").amount, 0);
  assert.equal(item(exemptLike, "itp").status, "exempt");
  assert.equal(item(bonifiedLike, "itp").status, "bonified");
  assert.equal(item(filingNotRequired, "itp").status, "filing_not_required");
  assert.equal(item(filingNotRequired, "itp").applicability, "filing_not_required");
  assert.equal(item(filingNotRequired, "itp").source.filingRequirement, "not_required");
});

test("ITP con escenarios bloquea exactTotal y conserva escenarios", () => {
  const result = summary({ transferTaxResult: itpTaxable({ purchasePrice: 10000, officialMarketValue: 28000, evidence: {} }) });
  assert.equal(result.status, "scenario_required");
  assert.equal(item(result, "itp").status, "scenario_required");
  assert.equal(result.exactTotal, null);
  assert.deepEqual(result.exactTotalBlockedBy, ["itp"]);
  assert.equal(result.scenarios.length, 2);
  assert.equal(result.scenarios[0].lineItemId, "itp");
  assert.equal(result.minimumTotal, 664.97 + 784 + 129 + 99.77);
  assert.equal(result.maximumTotal, 664.97 + 1120 + 129 + 99.77);
  assert.equal(result.prudentBudget, 664.97 + 1120 + 129 + 99.77);
});

test("IVTM exacto outdated rango y requires_review se mapean sin usar referencia como cuota", () => {
  const exact = summary();
  const outdated = summary({ municipalVehicleTaxResult: ivtmExact({ taxYear: 2026, spanishRegistrationDate: "2026-01-15" }) });
  const range = summary({ municipalVehicleTaxResult: ivtmExact({ municipalityCode: "01059" }, "01059") });
  const review = summary({ municipalVehicleTaxResult: ivtmExact({ municipalityCode: "28002", fiscalHorsepower: 20 }, "28002") });
  assert.equal(item(exact, "ivtm").status, "confirmed");
  assert.equal(item(outdated, "ivtm").status, "outdated");
  assert.equal(item(outdated, "ivtm").amount, null);
  assert.equal(item(outdated, "ivtm").referenceAmount, 129);
  assert.equal(item(range, "ivtm").status, "estimated_range");
  assert.equal(item(range, "ivtm").maximumAmount, 143.88);
  assert.equal(item(review, "ivtm").status, "requires_review");
  assert.equal(item(review, "ivtm").referenceAmount, 28);
});

test("IVTM usa cuota prorrateada y no cuota anual", () => {
  const result = summary({ municipalVehicleTaxResult: ivtmExact({ spanishRegistrationDate: "2025-07-01" }) });
  assert.equal(item(result, "ivtm").amount, 64.5);
  assert.equal(item(result, "ivtm").source.paymentRequirement, "required");
});

test("DGT confirmada y outdated bloquean segun contrato", () => {
  const confirmed = summary();
  const outdated = summary({ registrationFeeResult: dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }) });
  assert.equal(item(confirmed, "dgt_registration_fee").status, "confirmed");
  assert.equal(item(outdated, "dgt_registration_fee").status, "outdated");
  assert.equal(item(outdated, "dgt_registration_fee").amount, null);
  assert.equal(item(outdated, "dgt_registration_fee").referenceAmount, 99.77);
  assert.deepEqual(outdated.exactTotalBlockedBy, ["dgt_registration_fee"]);
});

test("DGT rechaza estados fiscales generales aunque traigan importe cero", () => {
  for (const status of ["not_subject", "exempt", "filing_not_required", "bonified"]) {
    assertInvalidDgtResult({ ...dgtConfirmed(), status, applicability: status, amount: 0, referenceAmount: 0, probableAmount: 0, minimumAmount: 0, maximumAmount: 0, prudentAmount: 0 });
  }
});

test("DGT rechaza status desconocido", () => {
  assertInvalidDgtResult({ ...dgtConfirmed(), status: "waived_by_magic", amount: 0 });
});

test("DGT rechaza confirmed contradictorio", () => {
  assertInvalidDgtResult({ ...dgtConfirmed(), supportedCalculation: false });
  assertInvalidDgtResult({ ...dgtConfirmed(), amount: null });
  for (const amount of [-1, NaN, Infinity, "99.77"]) {
    assertInvalidDgtResult({ ...dgtConfirmed(), amount });
  }
});

test("DGT rechaza estados no cerrados con amount confirmado", () => {
  assertInvalidDgtResult({ ...dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }), amount: 10 });
  assertInvalidDgtResult({ ...dgtConfirmed({ feeDate: "2025-01-01", calculationDate: "2025-01-01" }), amount: 0 });
  assertInvalidDgtResult({ ...dgtConfirmed({ feeDate: "2026-12-01", calculationDate: "2026-07-29" }), amount: 0 });
  assertInvalidDgtResult({ ...dgtConfirmed({ feeDate: "invalid-date" }), amount: 0 });
});

test("DGT real confirmed outdated y missing conservan contrato", () => {
  const confirmed = summary({ registrationFeeResult: dgtConfirmed() });
  const outdated = summary({ registrationFeeResult: dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }) });
  const missing = summary({ registrationFeeResult: dgtConfirmed({ feeDate: "2025-01-01", calculationDate: "2025-01-01" }) });

  assert.equal(item(confirmed, "dgt_registration_fee").status, VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED);
  assert.equal(item(confirmed, "dgt_registration_fee").amount, 99.77);
  assert.equal(confirmed.status, VEHICLE_TAX_SUMMARY_STATUSES.EXACT);
  assert.notEqual(confirmed.exactTotal, null);

  assert.equal(item(outdated, "dgt_registration_fee").status, VEHICLE_TAX_LINE_ITEM_STATUSES.OUTDATED);
  assert.equal(item(outdated, "dgt_registration_fee").amount, null);
  assert.equal(item(outdated, "dgt_registration_fee").referenceAmount, 99.77);
  assert.equal(outdated.exactTotal, null);
  assert.deepEqual(outdated.exactTotalBlockedBy, ["dgt_registration_fee"]);

  assert.equal(item(missing, "dgt_registration_fee").status, VEHICLE_TAX_LINE_ITEM_STATUSES.MISSING);
  assert.equal(item(missing, "dgt_registration_fee").amount, null);
  assert.equal(missing.exactTotal, null);
  assert.deepEqual(missing.exactTotalBlockedBy, ["dgt_registration_fee"]);
});

test("validacion contractual DGT no muta inputs y no comparte referencias", () => {
  const registrationFeeResult = { ...dgtConfirmed(), status: "not_subject", applicability: "not_subject", amount: 0, referenceAmount: 0, probableAmount: 0, minimumAmount: 0, maximumAmount: 0, prudentAmount: 0 };
  const before = JSON.stringify(registrationFeeResult);
  const result = summary({ registrationFeeResult });
  const json = JSON.stringify(result);
  assert.equal(json.includes("NaN"), false);
  assert.equal(json.includes("Infinity"), false);
  assert.deepEqual(JSON.parse(json), result);
  item(result, "dgt_registration_fee").source.source.note = "mutated";
  const second = summary({ registrationFeeResult });
  assert.equal(JSON.stringify(registrationFeeResult), before);
  assert.notEqual(item(second, "dgt_registration_fee").source.source.note, "mutated");
});
test("confirmedSubtotal y totales no convierten null en cero", () => {
  const result = summary({ registrationFeeResult: dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }) });
  assert.equal(result.confirmedSubtotal, 664.97 + 480 + 129);
  assert.equal(result.exactTotal, null);
  assert.equal(result.probableTotal, null);
  assert.equal(result.minimumTotal, null);
  assert.equal(result.maximumTotal, null);
  assert.equal(result.prudentBudget, null);
});

test("probable minimum maximum prudent completos producen estimated si no hay estados de mayor prioridad", () => {
  const estimatedFee = { ...dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }), probableAmount: 101, minimumAmount: 99, maximumAmount: 110, prudentAmount: 110 };
  const result = summary({ registrationFeeResult: estimatedFee });
  assert.equal(result.status, "estimated");
  assert.equal(result.probableTotal, 664.97 + 480 + 129 + 101);
  assert.equal(result.minimumTotal, 664.97 + 480 + 129 + 99);
  assert.equal(result.maximumTotal, 664.97 + 480 + 129 + 110);
  assert.equal(result.prudentBudget, 664.97 + 480 + 129 + 110);
});

test("no doble contabilizacion de escenarios ni referenceAmount", () => {
  const scenarioResult = summary({ transferTaxResult: itpTaxable({ evidence: {} }) });
  assert.equal(scenarioResult.confirmedSubtotal, 664.97 + 129 + 99.77);
  assert.equal(scenarioResult.confirmedSubtotal < scenarioResult.prudentBudget, true);
  const outdated = summary({ municipalVehicleTaxResult: ivtmExact({ taxYear: 2026, spanishRegistrationDate: "2026-01-15" }) });
  assert.equal(outdated.confirmedSubtotal, 664.97 + 480 + 99.77);
});

test("exactTotalBlockedBy respeta orden estable", () => {
  const result = summary({
    transferTaxResult: itpTaxable({ evidence: {} }),
    municipalVehicleTaxResult: ivtmExact({ taxYear: 2026, spanishRegistrationDate: "2026-01-15" }),
    registrationFeeResult: dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }),
  });
  assert.deepEqual(result.exactTotalBlockedBy, ["itp", "ivtm", "dgt_registration_fee"]);
});

test("precedencia de status global", () => {
  assert.equal(summary({ registrationTaxResult: { ...iedmtPositive(), supportedCalculation: false, tax: 10 } }).status, "invalid");
  assert.equal(summary({ municipalVehicleTaxResult: ivtmExact({ municipalityCode: "28002", fiscalHorsepower: 20 }, "28002") }).status, "requires_review");
  assert.equal(summary({ transferTaxResult: itpTaxable({ evidence: {} }) }).status, "scenario_required");
});

test("maximo 12 escenarios y warning de truncado", () => {
  const scenarios = Array.from({ length: 14 }, (_, index) => ({ id: `s${index}`, label: `Escenario ${index}`, taxAmount: index, prudentBudget: index }));
  const result = summary({ transferTaxResult: { ...itpTaxable({ evidence: {} }), scenarios } });
  assert.equal(result.scenarios.length, 12);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_SUMMARY_WARNING_CODES.SCENARIOS_TRUNCATED));
});

test("resultados contradictorios invalidan partida y bloquean total", () => {
  const result = summary({ transferTaxResult: { ...itpTaxable(), supportedCalculation: false, taxAmount: 100 } });
  assert.equal(result.status, "invalid");
  assert.equal(item(result, "itp").status, "invalid");
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION));
  assert.deepEqual(result.exactTotalBlockedBy, ["itp"]);
});

test("input del agregador invalido mantiene partidas conocidas pero status invalid", () => {
  const result = summary({ currency: "USD" });
  assert.equal(result.status, "invalid");
  assert.equal(result.currency, null);
  assert.equal(result.lineItems.length, 4);
  assert.ok(result.warningCodes.includes(VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_INPUT));
});

test("inputs no mutados y sin referencias compartidas", () => {
  const input = {
    registrationTaxResult: iedmtPositive(),
    transferTaxResult: itpTaxable({ evidence: {} }),
    municipalVehicleTaxResult: ivtmExact(),
    registrationFeeResult: dgtConfirmed(),
    calculationDate: "2026-07-29",
    currency: "EUR",
  };
  const before = JSON.stringify(input);
  const result = calculateVehicleTaxSummary(input);
  result.lineItems[1].source.evidence = { mutated: true };
  result.scenarios[0].label = "mutated";
  const second = calculateVehicleTaxSummary(input);
  assert.equal(JSON.stringify(input), before);
  assert.notEqual(result.lineItems[1].source, input.transferTaxResult.evidence);
  assert.notEqual(second.scenarios[0].label, "mutated");
});

test("JSON roundtrip y sin valores no finitos", () => {
  const result = summary();
  const json = JSON.stringify(result);
  assert.equal(json.includes("NaN"), false);
  assert.equal(json.includes("Infinity"), false);
  assert.deepEqual(JSON.parse(json), result);
});

test("dos llamadas independientes", () => {
  const first = summary();
  first.lineItems[0].amount = 999;
  const second = summary();
  assert.notEqual(second.lineItems[0].amount, 999);
});

test("matriz sistematica de combinaciones principales", () => {
  const cases = [
    ["iedmt_zero", { registrationTaxResult: iedmtZero() }, "exact"],
    ["iedmt_review", { registrationTaxResult: calculateRegistrationTax({ boeValue: 30000, emissions: 100, firstRegistrationDate: "2024-01-01", calculationDate: "2026-07-29", vehicleCondition: "desconocido", territoryId: "peninsula_general" }) }, "requires_review"],
    ["itp_not_subject", { transferTaxResult: itpTaxable({ sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.GENERAL_VAT }) }, "exact"],
    ["itp_unknown", { transferTaxResult: calculateTransferTax({ ...transferBaseInput, sellerType: "unknown", documentType: "unknown", vatRegime: "unknown" }) }, "scenario_required"],
    ["ivtm_outdated", { municipalVehicleTaxResult: ivtmExact({ taxYear: 2026, spanishRegistrationDate: "2026-01-15" }) }, "partial"],
    ["ivtm_range", { municipalVehicleTaxResult: ivtmExact({ municipalityCode: "01059" }, "01059") }, "partial"],
    ["ivtm_review", { municipalVehicleTaxResult: ivtmExact({ municipalityCode: "28002", fiscalHorsepower: 20 }, "28002") }, "requires_review"],
    ["dgt_outdated", { registrationFeeResult: dgtConfirmed({ feeDate: "2027-01-01", calculationDate: "2027-01-01" }) }, "partial"],
  ];
  for (const [name, overrides, expectedStatus] of cases) {
    assert.equal(summary(overrides).status, expectedStatus, name);
  }
});