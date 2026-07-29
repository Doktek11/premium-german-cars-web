import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  IVTM_BONUS_STATUSES,
  IVTM_DATA_STATUSES,
  IVTM_VEHICLE_TYPES,
  IVTM_WARNING_CODES,
  IVTM_ZERO_EMISSION_STATUSES,
  calculateMunicipalVehicleTax,
  getIvtmHorsepowerBand,
  getIvtmProrationFromRegistrationDate,
} from "./municipalVehicleTax.mjs";
import {
  calculateMunicipalVehicleTaxWithLookup,
  clearIvtmDataCacheForTests,
  loadIvtmData,
  resolveIvtmMunicipalityData,
} from "./ivtmDataLookup.mjs";

const dataDir = new URL("../data/ivtm/", import.meta.url);
const municipalities = JSON.parse(readFileSync(new URL("./municipalities-2026.json", dataDir), "utf8"));
const rates = JSON.parse(readFileSync(new URL("./municipal-rates-2025.json", dataDir), "utf8"));
const metadata = JSON.parse(readFileSync(new URL("./metadata.json", dataDir), "utf8"));
const municipalitiesByCode = new Map(municipalities.map((municipality) => [municipality.ineCode, municipality]));
const ratesByCode = new Map(rates.map((rate) => [rate.ineCode, rate]));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function resolved(code) {
  return {
    municipality: clone(municipalitiesByCode.get(code) ?? null),
    rate: clone(ratesByCode.get(code) ?? null),
    metadata: clone(metadata),
  };
}

function input(overrides = {}) {
  return {
    municipalityCode: "28079",
    taxYear: 2025,
    spanishRegistrationDate: "2025-01-15",
    fiscalHorsepower: 12,
    vehicleType: IVTM_VEHICLE_TYPES.PASSENGER_CAR,
    zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.NOT_ZERO_EMISSION,
    isHistoricVehicle: false,
    bonusStatus: IVTM_BONUS_STATUSES.NOT_APPLICABLE,
    ...overrides,
  };
}

function bonusEvidence(overrides = {}) {
  return {
    reason: "environmental",
    municipalityCode: "28079",
    taxYear: 2025,
    confirmedRate: 0.75,
    sourceUrl: "https://example.test/ordenanza-ivtm-madrid-2025",
    eligibilityConfirmed: true,
    ordinanceTitle: "Ordenanza fiscal IVTM auditada externamente",
    ...overrides,
  };
}

const topLevelKeys = [
  "supportedCalculation",
  "taxAmount",
  "baseAnnualQuota",
  "municipalAnnualQuota",
  "municipalCoefficient",
  "grossAnnualTax",
  "proratedTax",
  "bonusRate",
  "bonusAmount",
  "finalTax",
  "referenceAnnualTax",
  "referenceProratedTax",
  "minimumAmount",
  "maximumAmount",
  "prudentBudget",
  "municipality",
  "municipalityCode",
  "province",
  "autonomousCommunity",
  "taxYear",
  "ratesYear",
  "fiscalHorsepower",
  "horsepowerBand",
  "quarter",
  "remainingQuarters",
  "filingRequirement",
  "paymentRequirement",
  "dataStatus",
  "legalBasis",
  "source",
  "scenarios",
  "assumptions",
  "warnings",
  "warningCodes",
  "missingFields",
].sort();

function assertTopShape(result) {
  assert.deepEqual(Object.keys(result).sort(), topLevelKeys);
  assert.ok(Array.isArray(result.scenarios));
  assert.ok(Array.isArray(result.warningCodes));
  assert.ok(Array.isArray(result.missingFields));
}

function assertScenarioShape(scenario) {
  assert.equal(Object.hasOwn(scenario, "id"), true);
  assert.equal(Object.hasOwn(scenario, "label"), true);
  assert.equal(Object.hasOwn(scenario, "taxAmount"), true);
  assert.equal(Object.hasOwn(scenario, "dataStatus"), true);
  assert.equal(Object.hasOwn(scenario, "warnings"), true);
  assert.equal(Object.hasOwn(scenario, "warningCodes"), true);
  assert.equal(Object.hasOwn(scenario, "scenarios"), false);
}

function sharedReferenceCount(left, right, seen = new WeakSet()) {
  if (!left || !right || typeof left !== "object" || typeof right !== "object") return 0;
  if (left === right) return 1;
  if (seen.has(left)) return 0;
  seen.add(left);
  let count = 0;
  for (const leftValue of Object.values(left)) {
    for (const rightValue of Object.values(right)) {
      if (leftValue && rightValue && typeof leftValue === "object" && typeof rightValue === "object") {
        count += sharedReferenceCount(leftValue, rightValue, seen);
      }
    }
  }
  return count;
}

test("tramos CVF respetan todas las fronteras exactas sin redondear", () => {
  const cases = [
    [7.99, "lt8"],
    [8, "from8To11_99"],
    [11.99, "from8To11_99"],
    [12, "from12To15_99"],
    [15.99, "from12To15_99"],
    [16, "from16To19_99"],
    [19.99, "from16To19_99"],
    [20, "gte20"],
  ];
  for (const [cvf, key] of cases) assert.equal(getIvtmHorsepowerBand(cvf).key, key);
});

test("cuota municipal real verificada Madrid 2025 y coeficiente informativo por tramo", () => {
  const result = calculateMunicipalVehicleTax(input({ fiscalHorsepower: 12 }), resolved("28079"));
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.dataStatus, IVTM_DATA_STATUSES.VERIFIED_MUNICIPAL);
  assert.equal(result.baseAnnualQuota, 71.94);
  assert.equal(result.municipalAnnualQuota, 129);
  assert.equal(result.municipalCoefficient, 1.7932);
  assert.equal(result.taxAmount, 129);
  assert.equal(result.warningCodes.length, 0);
});

test("prorrateo por trimestre incluye el trimestre de alta y redondea a centimo", () => {
  const months = [
    ["2025-01-01", 129],
    ["2025-03-31", 129],
    ["2025-04-01", 96.75],
    ["2025-06-30", 96.75],
    ["2025-07-01", 64.5],
    ["2025-09-30", 64.5],
    ["2025-10-01", 32.25],
    ["2025-12-31", 32.25],
  ];
  for (const [date, expected] of months) {
    const result = calculateMunicipalVehicleTax(input({ spanishRegistrationDate: date, fiscalHorsepower: 12 }), resolved("28079"));
    assert.equal(result.proratedTax, expected, date);
  }

  const custom = resolved("28079");
  custom.rate.annualQuotaCents.from12To15_99 = 1001;
  const rounded = calculateMunicipalVehicleTax(input({ spanishRegistrationDate: "2025-04-01", fiscalHorsepower: 12 }), custom);
  assert.equal(rounded.proratedTax, 7.51);
  assert.equal(getIvtmProrationFromRegistrationDate("2025-04-01").rounding, "round-half-up-to-cent-after-quarter-proration");
});

test("lookup usa codigo INE canonico, preserva cero inicial y no resuelve por nombre", async () => {
  clearIvtmDataCacheForTests();
  const lookup = await loadIvtmData();
  const secondLookup = await loadIvtmData();
  assert.equal(lookup, secondLookup);
  assert.deepEqual(lookup.counts, { municipalities: 8132, rates: 7399 });

  const alava = lookup.resolveMunicipalityCode("01059");
  assert.equal(alava.ok, true);
  assert.equal(alava.reason, "rate_missing");
  assert.equal(alava.municipality.name, "Vitoria-Gasteiz");
  assert.equal(alava.rate, null);

  assert.equal(lookup.resolveMunicipalityCode("1059").reason, "invalid_code");
  assert.equal(lookup.resolveMunicipalityCode("Arroyomolinos").reason, "invalid_code");
  assert.equal(lookup.resolveMunicipalityCode("99999").reason, "not_found");
});

test("municipio inexistente e input invalido mantienen forma uniforme", () => {
  const notFound = calculateMunicipalVehicleTax(input({ municipalityCode: "99999" }), { municipality: null, rate: null, metadata });
  assertTopShape(notFound);
  assert.equal(notFound.dataStatus, IVTM_DATA_STATUSES.MISSING);
  assert.ok(notFound.warningCodes.includes(IVTM_WARNING_CODES.MUNICIPALITY_NOT_FOUND));

  const invalid = calculateMunicipalVehicleTax(input({ municipalityCode: 1059, fiscalHorsepower: Number.NaN, spanishRegistrationDate: "2025-02-31" }), {});
  assertTopShape(invalid);
  assert.equal(invalid.taxAmount, null);
  assert.ok(invalid.warningCodes.includes(IVTM_WARNING_CODES.INVALID_MUNICIPALITY_CODE));
  assert.ok(invalid.warningCodes.includes(IVTM_WARNING_CODES.INVALID_REGISTRATION_DATE));
});

test("municipios sin tarifa, Navarra y Pais Vasco devuelven intervalo legal sin coeficiente inventado", () => {
  for (const code of ["31201", "01059", "20069", "48020"]) {
    const result = calculateMunicipalVehicleTax(input({ municipalityCode: code, fiscalHorsepower: 12 }), resolved(code));
    assert.equal(result.dataStatus, IVTM_DATA_STATUSES.ESTIMATED_RANGE);
    assert.equal(result.taxAmount, null);
    assert.equal(result.municipalAnnualQuota, null);
    assert.equal(result.municipalCoefficient, null);
    assert.equal(result.minimumAmount, 71.94);
    assert.equal(result.maximumAmount, 143.88);
    assert.equal(result.prudentBudget, 143.88);
    assert.ok(result.warningCodes.includes(IVTM_WARNING_CODES.MUNICIPAL_RATE_NOT_AVAILABLE));
  }
});

test("los nueve codigos requires_review conservan referencia publicada y no calculan cuota", () => {
  for (const code of ["02012", "02047", "28002", "28099", "28151", "28153", "44065", "44219", "50165"]) {
    const result = calculateMunicipalVehicleTax(input({ municipalityCode: code, fiscalHorsepower: 20 }), resolved(code));
    assert.equal(result.dataStatus, IVTM_DATA_STATUSES.REQUIRES_REVIEW);
    assert.equal(result.taxAmount, null);
    assert.equal(result.referenceAnnualTax, ratesByCode.get(code).annualQuotaCents.gte20 / 100);
    assert.equal(result.maximumAmount, 224);
    assert.ok(result.warningCodes.includes(IVTM_WARNING_CODES.MUNICIPAL_RATE_REQUIRES_REVIEW));
  }
});

test("taxYear 2026 usa tarifa 2025 solo como referencia outdated", () => {
  const result = calculateMunicipalVehicleTax(
    input({ taxYear: 2026, spanishRegistrationDate: "2026-01-10", fiscalHorsepower: 12 }),
    resolved("28079")
  );
  assert.equal(result.dataStatus, IVTM_DATA_STATUSES.OUTDATED);
  assert.equal(result.taxAmount, null);
  assert.equal(result.referenceAnnualTax, 129);
  assert.equal(result.referenceProratedTax, 129);
  assert.equal(result.minimumAmount, 71.94);
  assert.equal(result.maximumAmount, 143.88);
  assert.equal(result.prudentBudget, 143.88);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.id), ["reference_2025_municipal_rate"]);
  assert.ok(result.warningCodes.includes(IVTM_WARNING_CODES.MUNICIPAL_RATE_YEAR_OUTDATED));
});

test("conflicto entre taxYear y fecha no confirma cuota", () => {
  const result = calculateMunicipalVehicleTax(input({ taxYear: 2025, spanishRegistrationDate: "2024-12-10" }), resolved("28079"));
  assert.equal(result.taxAmount, null);
  assert.equal(result.prudentBudget, 32.25);
  assert.ok(result.warningCodes.includes(IVTM_WARNING_CODES.TAX_YEAR_DATE_CONFLICT));
});

function assertBlockedBonus(result, expectedWarningCode) {
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(result.finalTax, null);
  assert.equal(result.bonusRate, null);
  assert.equal(result.bonusAmount, null);
  assert.equal(result.grossAnnualTax, 129);
  assert.equal(result.proratedTax, 129);
  assert.equal(result.prudentBudget, 129);
  assert.ok(result.warningCodes.includes(expectedWarningCode), expectedWarningCode);
}

test("bonificaciones confirmadas exigen evidencia estructurada y respetan limites legales", () => {
  const normal = calculateMunicipalVehicleTax(input(), resolved("28079"));
  assert.equal(normal.finalTax, 129);
  assert.equal(normal.bonusAmount, 0);

  const possibleZero = calculateMunicipalVehicleTax(
    input({ zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED, bonusStatus: IVTM_BONUS_STATUSES.POSSIBLE }),
    resolved("28079")
  );
  assert.equal(possibleZero.taxAmount, 129);
  assert.equal(possibleZero.prudentBudget, 129);
  assert.equal(possibleZero.scenarios[0].bonusRate, 0.75);
  assert.equal(possibleZero.scenarios[0].taxAmount, 32.25);

  const possibleHistoric = calculateMunicipalVehicleTax(input({ isHistoricVehicle: true, bonusStatus: IVTM_BONUS_STATUSES.UNKNOWN }), resolved("28079"));
  assert.equal(possibleHistoric.scenarios[0].bonusRate, 1);
  assert.equal(possibleHistoric.scenarios[0].taxAmount, 0);

  const environmentalFull = calculateMunicipalVehicleTax(
    input({
      zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED,
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 1,
      bonusEvidence: bonusEvidence({ confirmedRate: 1 }),
    }),
    resolved("28079")
  );
  assertBlockedBonus(environmentalFull, IVTM_WARNING_CODES.INVALID_BONUS_RATE);

  const environmentalOverLimit = calculateMunicipalVehicleTax(
    input({
      zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED,
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 0.8,
      bonusEvidence: bonusEvidence({ confirmedRate: 0.8 }),
    }),
    resolved("28079")
  );
  assertBlockedBonus(environmentalOverLimit, IVTM_WARNING_CODES.INVALID_BONUS_RATE);

  const environmental75 = calculateMunicipalVehicleTax(
    input({
      zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED,
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 0.75,
      bonusEvidence: bonusEvidence({ confirmedRate: 0.75 }),
    }),
    resolved("28079")
  );
  assert.equal(environmental75.taxAmount, 32.25);
  assert.equal(environmental75.bonusAmount, 96.75);
  assert.equal(environmental75.bonusRate, 0.75);

  const environmental50 = calculateMunicipalVehicleTax(
    input({
      zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED,
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 0.5,
      bonusEvidence: bonusEvidence({ confirmedRate: 0.5 }),
    }),
    resolved("28079")
  );
  assert.equal(environmental50.taxAmount, 64.5);
  assert.equal(environmental50.bonusAmount, 64.5);
  assert.equal(environmental50.bonusRate, 0.5);

  const historic100 = calculateMunicipalVehicleTax(
    input({
      isHistoricVehicle: true,
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 1,
      bonusEvidence: bonusEvidence({ reason: "historic", confirmedRate: 1 }),
    }),
    resolved("28079")
  );
  assert.equal(historic100.taxAmount, 0);
  assert.equal(historic100.bonusAmount, 129);
  assert.equal(historic100.bonusRate, 1);

  const notHistoric = calculateMunicipalVehicleTax(
    input({
      isHistoricVehicle: false,
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 1,
      bonusEvidence: bonusEvidence({ reason: "historic", confirmedRate: 1 }),
    }),
    resolved("28079")
  );
  assertBlockedBonus(notHistoric, IVTM_WARNING_CODES.BONUS_ELIGIBILITY_MISMATCH);

  const age25 = calculateMunicipalVehicleTax(
    input({
      bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED,
      confirmedBonusRate: 1,
      bonusEvidence: bonusEvidence({ reason: "age_25_plus", confirmedRate: 1 }),
    }),
    resolved("28079")
  );
  assert.equal(age25.taxAmount, 0);
  assert.ok(age25.assumptions.some((value) => value.includes("25 anos")));

  const normalFull = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 1, bonusEvidence: bonusEvidence({ confirmedRate: 1 }) }),
    resolved("28079")
  );
  assertBlockedBonus(normalFull, IVTM_WARNING_CODES.BONUS_ELIGIBILITY_MISMATCH);

  const genericEvidence = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: { ordinance: "external" } }),
    resolved("28079")
  );
  assertBlockedBonus(genericEvidence, IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED);

  const missingSource = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: bonusEvidence({ confirmedRate: 0.5, sourceUrl: "" }) }),
    resolved("28079")
  );
  assertBlockedBonus(missingSource, IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED);

  const httpSource = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: bonusEvidence({ confirmedRate: 0.5, sourceUrl: "http://example.test/ordenanza" }) }),
    resolved("28079")
  );
  assertBlockedBonus(httpSource, IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED);

  const wrongMunicipality = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: bonusEvidence({ confirmedRate: 0.5, municipalityCode: "08019" }) }),
    resolved("28079")
  );
  assertBlockedBonus(wrongMunicipality, IVTM_WARNING_CODES.BONUS_EVIDENCE_MISMATCH);

  const wrongYear = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: bonusEvidence({ confirmedRate: 0.5, taxYear: 2026 }) }),
    resolved("28079")
  );
  assertBlockedBonus(wrongYear, IVTM_WARNING_CODES.BONUS_EVIDENCE_MISMATCH);

  const wrongRate = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: bonusEvidence({ confirmedRate: 0.75 }) }),
    resolved("28079")
  );
  assertBlockedBonus(wrongRate, IVTM_WARNING_CODES.BONUS_EVIDENCE_MISMATCH);

  const unsupportedReason = calculateMunicipalVehicleTax(
    input({ bonusStatus: IVTM_BONUS_STATUSES.CONFIRMED, confirmedBonusRate: 0.5, bonusEvidence: bonusEvidence({ reason: "family", confirmedRate: 0.5 }) }),
    resolved("28079")
  );
  assertBlockedBonus(unsupportedReason, IVTM_WARNING_CODES.BONUS_REASON_UNSUPPORTED);

  const notConfirmed = calculateMunicipalVehicleTax(
    input({
      zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED,
      bonusStatus: IVTM_BONUS_STATUSES.POSSIBLE,
      confirmedBonusRate: 0.75,
      bonusEvidence: bonusEvidence({ confirmedRate: 0.75 }),
    }),
    resolved("28079")
  );
  assert.equal(notConfirmed.taxAmount, 129);
  assert.equal(notConfirmed.bonusRate, 0);
  assert.equal(notConfirmed.scenarios[0].bonusRate, 0.75);
});

test("CVF ausente genera cinco escenarios sin elegir tramo", () => {
  const result = calculateMunicipalVehicleTax(input({ fiscalHorsepower: undefined }), resolved("28079"));
  assert.equal(result.taxAmount, null);
  assert.equal(result.horsepowerBand, null);
  assert.equal(result.scenarios.length, 5);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.horsepowerBand.key), [
    "lt8",
    "from8To11_99",
    "from12To15_99",
    "from16To19_99",
    "gte20",
  ]);
  assert.equal(result.prudentBudget, 224);
  assert.ok(result.warningCodes.includes(IVTM_WARNING_CODES.FISCAL_HORSEPOWER_REQUIRED));
});

test("contrato superior, contrato de escenario, JSON roundtrip y sharedRefs 0", () => {
  const result = calculateMunicipalVehicleTax(
    input({ fiscalHorsepower: undefined, zeroEmissionStatus: IVTM_ZERO_EMISSION_STATUSES.CONFIRMED, bonusStatus: IVTM_BONUS_STATUSES.POSSIBLE }),
    resolved("28079")
  );
  assertTopShape(result);
  for (const scenario of result.scenarios) assertScenarioShape(scenario);
  assert.deepEqual(JSON.parse(JSON.stringify(result)), result);
  assert.equal(sharedReferenceCount({ arrays: [result.warningCodes, result.missingFields, result.legalBasis] }, result.scenarios[0]), 0);
});

test("no muta inputs ni comparte referencias entre dos llamadas", () => {
  const originalInput = input({ fiscalHorsepower: undefined });
  const inputSnapshot = JSON.stringify(originalInput);
  const first = calculateMunicipalVehicleTax(originalInput, resolved("28079"));
  const second = calculateMunicipalVehicleTax(originalInput, resolved("28079"));
  assert.equal(JSON.stringify(originalInput), inputSnapshot);
  assert.notEqual(first.scenarios, second.scenarios);
  assert.notEqual(first.warningCodes, second.warningCodes);
  first.warningCodes.push("MUTATED");
  first.scenarios[0].warningCodes.push("MUTATED");
  assert.equal(second.warningCodes.includes("MUTATED"), false);
  assert.equal(second.scenarios[0].warningCodes.includes("MUTATED"), false);
});

test("helper de alto nivel carga datos y calcula sin importacion estatica en el motor", async () => {
  const result = await calculateMunicipalVehicleTaxWithLookup(input({ fiscalHorsepower: 16 }));
  assert.equal(result.taxAmount, 179);
  const moduleText = readFileSync(new URL("./municipalVehicleTax.mjs", import.meta.url), "utf8");
  assert.equal(moduleText.includes("municipalities-2026.json"), false);
  assert.equal(moduleText.includes("municipal-rates-2025.json"), false);
});

test("integridad de datasets usada por el lookup", async () => {
  const resolvedMadrid = await resolveIvtmMunicipalityData("28079");
  assert.equal(resolvedMadrid.ok, true);
  assert.equal(resolvedMadrid.reason, "rate_found");
  assert.equal(resolvedMadrid.municipality.name, "Madrid");
  assert.equal(resolvedMadrid.rate.annualQuotaCents.from12To15_99, 12900);
  assert.equal(metadata.counts.municipalities, 8132);
  assert.equal(metadata.counts.municipalRates, 7399);
  assert.equal(metadata.counts.missingRates, 733);
  assert.equal(metadata.counts.anomalies, 9);
});

test("regresion de conteo IEDMT e ITP permanece fuera del motor IVTM", () => {
  const registrationTests = readFileSync(new URL("./registrationTax.test.mjs", import.meta.url), "utf8");
  const prefillTests = readFileSync(new URL("./calculatorUrlPrefill.test.mjs", import.meta.url), "utf8");
  const transferTests = readFileSync(new URL("./transferTax.test.mjs", import.meta.url), "utf8");
  assert.equal((registrationTests.match(/^test\(/gm) ?? []).length + (prefillTests.match(/^test\(/gm) ?? []).length, 59);
  assert.equal((transferTests.match(/^test\(/gm) ?? []).length, 91);
});