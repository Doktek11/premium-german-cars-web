import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  getInitialIntegerParam,
  getInitialNumberInputValue,
  getInitialNumberParam,
  getInitialRateParam,
  parseCalculatorNumberInput,
} from "./calculatorUrlPrefill.ts";
import { getCalculatorActionState } from "./calculatorActionState.ts";
import { calculateRegistrationTax, getTerritoryFromParam, VEHICLE_CONDITIONS } from "./registrationTax.mjs";

const BOE_PARAMS = ["valor", "valor_boe", "valorBoe", "precio", "valor_fiscal", "valorFiscal"];
const CO2_PARAMS = ["co2", "emisiones", "emisiones_co2", "emisionesCO2"];
const MONTH_PARAMS = ["antiguedad", "antiguedad_meses", "antiguedadMeses", "meses", "meses_antiguedad", "mesesAntiguedad"];
const DATE_PARAMS = ["fecha_primera_matriculacion", "firstRegistrationDate", "first_registration_date"];
const CALCULATION_DATE = "2026-07-01";

const firstPresentParamValue = (params, names) => {
  for (const name of names) {
    if (params.has(name)) return params.get(name) ?? "";
  }
  return null;
};

const deriveDateFromMonths = ({ boeValue, emissions, months, territoryId, vehicleCondition, emissionsStandard, noAccreditedEmissions, urlRate }) => {
  if (months === null) return "";

  return calculateRegistrationTax({
    boeValue,
    emissions,
    months,
    territoryId,
    vehicleCondition,
    emissionsStandard,
    noAccreditedEmissions,
    urlRate,
    calculationDate: CALCULATION_DATE,
  }).firstRegistrationDate ?? "";
};

const parseUrlForCalculation = (query) => {
  const params = new URLSearchParams(query);
  const boeParam = getInitialNumberParam(params, BOE_PARAMS, 45000);
  const co2Param = getInitialNumberParam(params, CO2_PARAMS, 155);
  const monthsParam = getInitialIntegerParam(params, MONTH_PARAMS, 36);
  const urlRateParam = getInitialRateParam(params, ["tramo"]);
  const boeInput = getInitialNumberInputValue(boeParam);
  const co2Input = getInitialNumberInputValue(co2Param);
  const boeValue = parseCalculatorNumberInput(boeInput);
  const emissions = parseCalculatorNumberInput(co2Input);
  const territoryId = getTerritoryFromParam(params.get("territorio") ?? "peninsula_general")?.id;
  const vehicleCondition = params.get("condicion") ?? VEHICLE_CONDITIONS.USED_IMPORTED;
  const emissionsStandard = params.get("norma_emisiones") ?? "unknown";
  const noAccreditedEmissions = ["1", "true", "si"].includes(
    (params.get("emisiones_no_acreditadas") ?? "").toLocaleLowerCase("es-ES")
  );
  const urlRate = urlRateParam.status === "valid" ? urlRateParam.value : null;
  const canonicalDate = firstPresentParamValue(params, DATE_PARAMS);
  const firstRegistrationDate = canonicalDate !== null
    ? canonicalDate.trim()
    : deriveDateFromMonths({
        boeValue: boeValue ?? 45000,
        emissions: emissions ?? 155,
        months: monthsParam.status === "invalid" ? null : monthsParam.value,
        territoryId,
        vehicleCondition,
        emissionsStandard,
        noAccreditedEmissions,
        urlRate,
      });

  const result = calculateRegistrationTax({
    boeValue: boeValue ?? Number.NaN,
    emissions: emissions ?? Number.NaN,
    firstRegistrationDate: firstRegistrationDate || null,
    territoryId,
    vehicleCondition,
    emissionsStandard,
    urlRate,
    noAccreditedEmissions,
    calculationDate: CALCULATION_DATE,
  });
  const hasInvalidBoeValue = boeValue === null;
  const hasInvalidEmissions = emissions === null;
  const hasInvalidLegacyMonths = !firstRegistrationDate.trim() && canonicalDate === null && monthsParam.status === "invalid";
  const hasInvalidFirstRegistrationDate = Boolean(firstRegistrationDate.trim()) && result.firstRegistrationDate === null && result.warningCodes.includes("INVALID_INPUT");
  const actionState = getCalculatorActionState({
    hasInvalidBoeValue,
    hasInvalidEmissions,
    hasInvalidLegacyMonths,
    hasInvalidFirstRegistrationDate,
    supportedCalculation: result.supportedCalculation,
  });
  const hasIncompatibleLegacyMonths = canonicalDate !== null && monthsParam.status === "valid" && result.months !== null && result.months !== monthsParam.value;
  const urlParameterWarnings = [
    urlRateParam.status === "invalid" ? "INVALID_URL_RATE_PARAM" : "",
    hasIncompatibleLegacyMonths ? "INCOMPATIBLE_LEGACY_MONTHS_PARAM" : "",
  ].filter(Boolean);

  return {
    boeParam,
    co2Param,
    monthsParam,
    urlRateParam,
    boeInput,
    co2Input,
    boeValue,
    emissions,
    firstRegistrationDate,
    result,
    actionState,
    urlParameterWarnings,
  };
};

test("URL sin valor_boe ni co2 usa defaults de visita directa", () => {
  const parsed = parseUrlForCalculation("");

  assert.equal(parsed.boeParam.status, "absent");
  assert.equal(parsed.co2Param.status, "absent");
  assert.equal(parsed.boeValue, 45000);
  assert.equal(parsed.emissions, 155);
  assert.equal(parsed.result.supportedCalculation, true);
});

test("valor_boe valido no se clampa silenciosamente", () => {
  const parsed = parseUrlForCalculation("valor_boe=200000&co2=138");

  assert.equal(parsed.boeParam.status, "valid");
  assert.equal(parsed.boeValue, 200000);
  assert.equal(parsed.result.boeValue, 200000);
  assert.equal(parsed.result.supportedCalculation, true);
});

test("valor_boe no numerico no usa default ni genera cuota", () => {
  const parsed = parseUrlForCalculation("valor_boe=abc&co2=138");

  assert.equal(parsed.boeParam.status, "invalid");
  assert.equal(parsed.boeInput, "abc");
  assert.equal(parsed.boeValue, null);
  assert.notEqual(parsed.result.boeValue, 45000);
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
  assert.equal(parsed.result.taxableBase, null);
});

test("valor_boe vacio pero presente no usa default", () => {
  const parsed = parseUrlForCalculation("valor_boe=&co2=138");

  assert.equal(parsed.boeParam.status, "invalid");
  assert.equal(parsed.boeInput, "");
  assert.equal(parsed.boeValue, null);
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
});

test("co2 no numerico no usa default ni genera cuota", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=abc");

  assert.equal(parsed.co2Param.status, "invalid");
  assert.equal(parsed.co2Input, "abc");
  assert.equal(parsed.emissions, null);
  assert.notEqual(parsed.result.currentRegistrationTaxRate, 0.0975);
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
  assert.equal(parsed.result.taxableBase, null);
});

test("co2 vacio pero presente no usa default", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=");

  assert.equal(parsed.co2Param.status, "invalid");
  assert.equal(parsed.co2Input, "");
  assert.equal(parsed.emissions, null);
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
});

test("antiguedad_meses ausente mantiene comportamiento normal", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&territorio=cataluna");

  assert.equal(parsed.monthsParam.status, "absent");
  assert.equal(parsed.monthsParam.value, 36);
  assert.equal(parsed.result.firstRegistrationDate, "2023-07");
  assert.equal(parsed.result.supportedCalculation, true);
});

test("antiguedad_meses negativo es invalido y no se clampa a cero", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&antiguedad_meses=-1&territorio=cataluna");

  assert.equal(parsed.monthsParam.status, "invalid");
  assert.equal(parsed.monthsParam.rawValue, "-1");
  assert.equal(parsed.result.firstRegistrationDate, null);
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
  assert.equal(parsed.actionState.blocked, true);
  assert.equal(parsed.actionState.reasons.includes("invalid_legacy_months"), true);
});

test("antiguedad_meses=999 no se clampa y queda fuera de alcance sin cuota", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&antiguedad_meses=999&territorio=cataluna");

  assert.equal(parsed.monthsParam.status, "valid");
  assert.equal(parsed.monthsParam.value, 999);
  assert.equal(parsed.result.firstRegistrationDate, "1943-04");
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
  assert.equal(parsed.result.warningCodes.includes("UNSUPPORTED_HISTORICAL_PERIOD"), true);
  assert.equal(parsed.actionState.blocked, true);
});

test("antiguedad_meses vacio presente no usa default", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&antiguedad_meses=&territorio=cataluna");

  assert.equal(parsed.monthsParam.status, "invalid");
  assert.equal(parsed.monthsParam.rawValue, "");
  assert.notEqual(parsed.result.firstRegistrationDate, "2023-07");
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
});

test("antiguedad_meses no numerico es invalido", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&antiguedad_meses=abc&territorio=cataluna");

  assert.equal(parsed.monthsParam.status, "invalid");
  assert.equal(parsed.result.supportedCalculation, false);
  assert.equal(parsed.result.tax, null);
});

test("antiguedad_meses decimal es invalido", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&antiguedad_meses=12.5&territorio=cataluna");

  assert.equal(parsed.monthsParam.status, "invalid");
  assert.equal(parsed.result.supportedCalculation, false);
});

test("antiguedad_meses=145 conserva 145", () => {
  const parsed = parseUrlForCalculation("valor_boe=61200&co2=210&antiguedad_meses=145&territorio=peninsula_general");

  assert.equal(parsed.monthsParam.status, "valid");
  assert.equal(parsed.monthsParam.value, 145);
  assert.equal(parsed.result.firstRegistrationDate, "2014-06");
  assert.equal(parsed.result.months, 145);
  assert.equal(parsed.result.supportedCalculation, true);
});

test("fecha canonica valida sin antiguedad_meses prevalece", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna");

  assert.equal(parsed.firstRegistrationDate, "2024-06");
  assert.equal(parsed.result.months, 25);
  assert.equal(parsed.result.supportedCalculation, true);
});

test("fecha canonica valida con meses compatibles no advierte", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&antiguedad_meses=25&territorio=cataluna");

  assert.equal(parsed.firstRegistrationDate, "2024-06");
  assert.equal(parsed.result.months, 25);
  assert.deepEqual(parsed.urlParameterWarnings, []);
});

test("fecha canonica valida con meses incompatibles conserva fecha y advierte", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&antiguedad_meses=36&territorio=cataluna");

  assert.equal(parsed.firstRegistrationDate, "2024-06");
  assert.equal(parsed.result.months, 25);
  assert.equal(parsed.urlParameterWarnings.includes("INCOMPATIBLE_LEGACY_MONTHS_PARAM"), true);
});

test("tramo ausente conserva comportamiento actual", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna");

  assert.equal(parsed.urlRateParam.status, "absent");
  assert.equal(parsed.result.urlRate, null);
  assert.equal(parsed.result.isUrlRateConsistent, true);
});

test("tramo valido y consistente se valida", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna&tramo=4.75");

  assert.equal(parsed.urlRateParam.status, "valid");
  assert.equal(parsed.urlRateParam.value, 4.75);
  assert.equal(parsed.result.validatedUrlRate, 4.75);
  assert.equal(parsed.result.isUrlRateConsistent, true);
});

test("tramo valido pero inconsistente mantiene aviso de inconsistencia", () => {
  const parsed = parseUrlForCalculation("valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna&tramo=9.75");

  assert.equal(parsed.urlRateParam.status, "valid");
  assert.equal(parsed.result.supportedCalculation, true);
  assert.equal(parsed.result.validatedUrlRate, null);
  assert.equal(parsed.result.isUrlRateConsistent, false);
});

test("tramo no numerico y vacio advierten sin bloquear calculo canonico", () => {
  for (const query of [
    "valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna&tramo=abc",
    "valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna&tramo=",
  ]) {
    const parsed = parseUrlForCalculation(query);

    assert.equal(parsed.urlRateParam.status, "invalid");
    assert.equal(parsed.result.supportedCalculation, true);
    assert.equal(parsed.result.urlRate, null);
    assert.equal(parsed.result.validatedUrlRate, null);
    assert.equal(parsed.urlParameterWarnings.includes("INVALID_URL_RATE_PARAM"), true);
    assert.equal(parsed.actionState.blocked, false);
  }
});

test("BOE, CO2 o antiguedad invalidos bloquean acciones", () => {
  for (const query of [
    "valor_boe=abc&co2=138",
    "valor_boe=47100&co2=abc",
    "valor_boe=47100&co2=138&antiguedad_meses=-1",
  ]) {
    const parsed = parseUrlForCalculation(query);
    assert.equal(parsed.actionState.blocked, true);
  }
});

test("handler de WhatsApp tiene retorno defensivo antes de analytics y navegacion", () => {
  const source = readFileSync(new URL("../pages/CalculadoraImpuestos.tsx", import.meta.url), "utf8");
  const guardIndex = source.indexOf("if (isCalculatorActionBlocked)");
  const trackingIndex = source.indexOf("trackLeadEvent(\"lead_followup_click\", { leadType: \"calculadora-impuestos\", channel: \"whatsapp\"");
  const openIndex = source.indexOf("window.open(`https://wa.me/");

  assert.notEqual(guardIndex, -1);
  assert.notEqual(trackingIndex, -1);
  assert.notEqual(openIndex, -1);
  assert.equal(guardIndex < trackingIndex, true);
  assert.equal(guardIndex < openIndex, true);
});

test("URL completa del Asistente PGC sigue funcionando", () => {
  const parsed = parseUrlForCalculation(
    "valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna&condicion=usado_importado&norma_emisiones=wltp&tramo=4.75&origen=asistente_pgc"
  );

  assert.equal(parsed.result.supportedCalculation, true);
  assert.equal(parsed.result.boeValue, 47100);
  assert.equal(parsed.result.territoryForRate.id, "cataluna");
  assert.equal(parsed.result.validatedUrlRate, 4.75);
  assert.equal(parsed.result.warningCodes.includes("NO_ACCREDITED_EMISSIONS"), false);
});

test("tras corregir manualmente un valor invalido se permite calcular", () => {
  assert.equal(parseCalculatorNumberInput("abc"), null);

  const boeValue = parseCalculatorNumberInput("47100");
  const emissions = parseCalculatorNumberInput("138");
  const result = calculateRegistrationTax({
    boeValue: boeValue ?? Number.NaN,
    emissions: emissions ?? Number.NaN,
    firstRegistrationDate: "2024-06",
    territoryId: "cataluna",
    vehicleCondition: VEHICLE_CONDITIONS.USED_IMPORTED,
    calculationDate: CALCULATION_DATE,
  });
  const actionState = getCalculatorActionState({ supportedCalculation: result.supportedCalculation });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.tax !== null, true);
  assert.equal(actionState.blocked, false);
});