import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateRegistrationTax,
  getDepreciationCoefficient,
  getMonthsFromFirstRegistrationDate,
  getResidualIndirectTaxRate,
  getRateFromEmissions,
  getResidualRegistrationTaxRate,
  getTerritoryFromParam,
  parseRateParam,
  VEHICLE_CONDITIONS,
} from "./registrationTax.mjs";

const CALCULATION_DATE = "2026-07-01";
const closeTo = (actual, expected, epsilon = 0.000001) => {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `Expected ${actual} to be within ${epsilon} of ${expected}`
  );
};

const expectedTax = ({ boeValue, coefficient, currentRate, residualRate, indirectRate = 0.21 }) => {
  const marketValue = boeValue * coefficient;
  const denominator = 1 + indirectRate + residualRate;
  const taxableBase = marketValue / denominator;
  return { marketValue, denominator, taxableBase, tax: taxableBase * currentRate };
};

const calculate = (input = {}) =>
  calculateRegistrationTax({
    boeValue: 20000,
    emissions: 180,
    firstRegistrationDate: "2025-07",
    calculationDate: CALCULATION_DATE,
    territoryId: "peninsula_general",
    vehicleCondition: VEHICLE_CONDITIONS.USED_IMPORTED,
    ...input,
  });

const depreciationCases = [
  [12, 1],
  [13, 0.84],
  [24, 0.84],
  [25, 0.67],
  [36, 0.67],
  [37, 0.56],
  [48, 0.56],
  [49, 0.47],
  [60, 0.47],
  [61, 0.39],
  [72, 0.39],
  [73, 0.34],
  [84, 0.34],
  [85, 0.28],
  [96, 0.28],
  [97, 0.24],
  [108, 0.24],
  [109, 0.19],
  [120, 0.19],
  [121, 0.17],
  [132, 0.17],
  [133, 0.13],
  [144, 0.13],
  [145, 0.1],
  [240, 0.1],
];

test("tabla completa de depreciacion 2026 por limites mensuales", () => {
  for (const [months, coefficient] of depreciationCases) {
    assert.equal(getDepreciationCoefficient(months), coefficient);
  }
});

test("meses desde fecha de primera matriculacion", () => {
  assert.equal(getMonthsFromFirstRegistrationDate("2025-07", CALCULATION_DATE), 12);
  assert.equal(getMonthsFromFirstRegistrationDate("2025-06", CALCULATION_DATE), 13);
  assert.equal(getMonthsFromFirstRegistrationDate("2014-06", CALCULATION_DATE), 145);
});

test("fronteras CO2 120/121, 159/160 y 199/200", () => {
  assert.equal(getRateFromEmissions(120), 0);
  assert.equal(getRateFromEmissions(121), 4.75);
  assert.equal(getRateFromEmissions(159), 4.75);
  assert.equal(getRateFromEmissions(160), 9.75);
  assert.equal(getRateFromEmissions(199), 9.75);
  assert.equal(getRateFromEmissions(200), 14.75);
});

test("residual IEDMT respeta fronteras exactas de la ventana temporal 2021", () => {
  assert.equal(getResidualRegistrationTaxRate({ firstRegistrationDate: "2021-07-10", emissions: 180, territoryId: "peninsula_general" }).rate, 0.0975);
  assert.equal(getResidualRegistrationTaxRate({ firstRegistrationDate: "2021-07-11", emissions: 180, territoryId: "peninsula_general" }).rate, 0.0475);
  assert.equal(getResidualRegistrationTaxRate({ firstRegistrationDate: "2021-12-31", emissions: 180, territoryId: "peninsula_general" }).rate, 0.0475);
  assert.equal(getResidualRegistrationTaxRate({ firstRegistrationDate: "2022-01-01", emissions: 180, territoryId: "peninsula_general" }).rate, 0.0975);
});


test("IVA residual historico respeta fronteras 2010 y 2012", () => {
  const residualVat = (firstRegistrationDate) =>
    getResidualIndirectTaxRate({ firstRegistrationDate, territoryId: "peninsula_general" }).rate;

  assert.equal(residualVat("2010-06-30"), 0.16);
  assert.equal(residualVat("2010-07-01"), 0.18);
  assert.equal(residualVat("2012-08-31"), 0.18);
  assert.equal(residualVat("2012-09-01"), 0.21);
});

test("alcance automatico empieza el 01/01/2008", () => {
  const unsupported = calculate({ firstRegistrationDate: "2007-12-31" });
  const supported = calculate({ firstRegistrationDate: "2008-01-01" });

  assert.equal(unsupported.supportedCalculation, false);
  assert.equal(unsupported.tax, null);
  assert.equal(unsupported.warningCodes.includes("UNSUPPORTED_HISTORICAL_PERIOD"), true);
  assert.equal(supported.supportedCalculation, true);
  assert.equal(supported.indirectTaxRate, 0.16);
});
test("fronteras CO2 temporales 144/145, 191/192 y 239/240", () => {
  const rate = (emissions) =>
    getResidualRegistrationTaxRate({
      firstRegistrationDate: "2021-08-01",
      emissions,
      territoryId: "peninsula_general",
    }).rate;

  assert.equal(rate(144), 0);
  assert.equal(rate(145), 0.0475);
  assert.equal(rate(191), 0.0475);
  assert.equal(rate(192), 0.0975);
  assert.equal(rate(239), 0.0975);
  assert.equal(rate(240), 0.1475);
});

test("caso numerico completo: 180 g/km en periodo temporal usa residual 4,75% y actual 9,75%", () => {
  const result = calculate({ firstRegistrationDate: "2021-08-01", emissions: 180 });
  const expected = expectedTax({
    boeValue: 20000,
    coefficient: 0.47,
    currentRate: 0.0975,
    residualRate: 0.0475,
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.residualRegistrationTaxRate, 0.0475);
  assert.equal(result.currentRegistrationTaxRate, 0.0975);
  closeTo(result.marketValue, expected.marketValue);
  closeTo(result.denominator, 1.2575);
  closeTo(result.taxableBase, expected.taxableBase);
  closeTo(result.tax, expected.tax);
});

test("julio 2021 sin dia exacto queda bloqueado por ambiguedad fiscal", () => {
  const result = calculate({ firstRegistrationDate: "2021-07", emissions: 180 });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.tax, null);
  assert.equal(result.taxableBase, null);
  assert.equal(result.warningCodes.includes("AMBIGUOUS_FIRST_REGISTRATION_DATE"), true);
});


test("fecha mensual no se bloquea si el cambio legal no altera el tipo", () => {
  const unaffectedAsturias = calculate({
    firstRegistrationDate: "2010-07",
    emissions: 180,
    territoryId: "asturias",
  });
  const zeroTemporary = calculate({ firstRegistrationDate: "2021-07", emissions: 120 });

  assert.equal(unaffectedAsturias.supportedCalculation, true);
  assert.equal(unaffectedAsturias.residualRegistrationTaxRate, 0.0975);
  assert.equal(zeroTemporary.supportedCalculation, true);
  assert.equal(zeroTemporary.residualRegistrationTaxRate, 0);
});

test("Asturias 2010-07 sin dia bloquea solo el tramo alto afectado", () => {
  const result = calculate({
    firstRegistrationDate: "2010-07",
    emissions: 210,
    territoryId: "asturias",
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.tax, null);
  assert.equal(result.warningCodes.includes("AMBIGUOUS_FIRST_REGISTRATION_DATE"), true);
});
test("tarifas historicas territoriales por fecha y epigrafe", () => {
  const residual = (territoryId, firstRegistrationDate, emissions = 210) =>
    getResidualRegistrationTaxRate({ firstRegistrationDate, emissions, territoryId }).rate;

  assert.equal(residual("cataluna", "2010-06-30"), 0.1475);
  assert.equal(residual("cataluna", "2010-07-01"), 0.16);
  assert.equal(residual("asturias", "2010-07-14"), 0.1475);
  assert.equal(residual("asturias", "2010-07-15"), 0.16);
  assert.equal(residual("baleares", "2012-04-30"), 0.1475);
  assert.equal(residual("baleares", "2012-05-01"), 0.16);
  assert.equal(residual("comunidad_valenciana", "2016-12-31"), 0.1475);
  assert.equal(residual("comunidad_valenciana", "2017-01-01"), 0.16);
  assert.equal(residual("cantabria", "2010-12-31"), 0.1475);
  assert.equal(residual("cantabria", "2011-01-01"), 0.16);
  assert.equal(residual("cantabria", "2017-12-31"), 0.16);
  assert.equal(residual("cantabria", "2018-01-01"), 0.15);
  assert.equal(residual("cantabria", "2012-03-01", 180), 0.11);
  assert.equal(residual("peninsula_general", "2012-03-01", 180), 0.0975);
});

test("Cantabria separa tipo residual historico y tipo actual", () => {
  const medium = calculate({
    emissions: 180,
    firstRegistrationDate: "2012-03-01",
    territoryId: "cantabria",
  });
  const high = calculate({
    emissions: 210,
    firstRegistrationDate: "2012-03-01",
    territoryId: "cantabria",
  });
  const modern = calculate({
    emissions: 180,
    firstRegistrationDate: "2018-01-01",
    territoryId: "cantabria",
  });

  assert.equal(medium.supportedCalculation, true);
  assert.equal(medium.residualRegistrationTaxRate, 0.11);
  assert.equal(medium.currentRegistrationTaxRate, 0.0975);
  assert.notEqual(medium.currentRegistrationTaxRate, 0.11);
  assert.equal(high.residualRegistrationTaxRate, 0.16);
  assert.equal(high.currentRegistrationTaxRate, 0.15);
  assert.equal(modern.residualRegistrationTaxRate, 0.0975);
  assert.equal(modern.currentRegistrationTaxRate, 0.0975);
});

test("territorios no soportados no hacen fallback silencioso en residual", () => {
  const canarias = getResidualRegistrationTaxRate({
    firstRegistrationDate: "2021-08-01",
    emissions: 240,
    territoryId: "canarias",
  });
  const ceutaMelilla = getResidualRegistrationTaxRate({
    firstRegistrationDate: "2021-08-01",
    emissions: 240,
    territoryId: "ceuta_melilla",
  });

  assert.equal(canarias.supported, false);
  assert.equal(canarias.rate, null);
  assert.equal(canarias.warningCode, "UNSUPPORTED_CANARIAS");
  assert.equal(ceutaMelilla.supported, false);
  assert.equal(ceutaMelilla.rate, null);
  assert.equal(ceutaMelilla.warningCode, "UNSUPPORTED_CEUTA_MELILLA");
});

test("caso BMW marzo 2012 usa IVA 18% y calcula 81,65 EUR", () => {
  const result = calculate({
    boeValue: 21100,
    emissions: 132,
    firstRegistrationDate: "2012-03-01",
    territoryId: "cataluna",
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.depreciationCoefficient, 0.1);
  assert.equal(result.indirectTaxName, "IVA residual historico");
  assert.equal(result.indirectTaxRate, 0.18);
  assert.equal(result.residualRegistrationTaxRate, 0.0475);
  assert.equal(result.currentRegistrationTaxRate, 0.0475);
  closeTo(result.marketValue, 2110);
  closeTo(result.denominator, 1.2275);
  closeTo(result.taxableBase, 1718.9409368635438);
  closeTo(result.tax, 81.64969450101833);
});
test("caso control 1: coeficiente 1, IVA 21%, IEDMT residual 9,75%", () => {
  const result = calculate({ emissions: 180, firstRegistrationDate: "2025-07" });
  const expected = expectedTax({
    boeValue: 20000,
    coefficient: 1,
    currentRate: 0.0975,
    residualRate: 0.0975,
  });

  assert.equal(result.supportedCalculation, true);
  closeTo(result.marketValue, expected.marketValue);
  closeTo(result.denominator, 1.3075);
  closeTo(result.taxableBase, 15296.367112810325);
  closeTo(result.tax, expected.tax);
});

test("caso control 2: coeficiente 0,84", () => {
  const result = calculate({ emissions: 180, firstRegistrationDate: "2025-06" });
  const expected = expectedTax({
    boeValue: 20000,
    coefficient: 0.84,
    currentRate: 0.0975,
    residualRate: 0.0975,
  });

  closeTo(result.marketValue, expected.marketValue);
  closeTo(result.taxableBase, 12848.948374760994);
  closeTo(result.tax, 1252.772466540197);
});

test("caso auditoria: 61.200 EUR, 145 meses, CO2 210", () => {
  const result = calculate({
    boeValue: 61200,
    emissions: 210,
    firstRegistrationDate: "2014-06",
  });

  assert.equal(result.depreciationCoefficient, 0.1);
  closeTo(result.marketValue, 6120);
  closeTo(result.denominator, 1.3575);
  closeTo(result.taxableBase, 4508.28729281768);
  closeTo(result.tax, 664.9723756906076);
});

test("tipo actual 0%, 4,75%, 9,75% y tramo superior", () => {
  assert.equal(calculate({ emissions: 120 }).currentRegistrationTaxRate, 0);
  assert.equal(calculate({ emissions: 121 }).currentRegistrationTaxRate, 0.0475);
  assert.equal(calculate({ emissions: 160 }).currentRegistrationTaxRate, 0.0975);
  assert.equal(calculate({ emissions: 200 }).currentRegistrationTaxRate, 0.1475);
});

test("tipos territoriales existentes para tramo superior", () => {
  const expectedRates = new Map([
    ["peninsula_general", 0.1475],
    ["asturias", 0.16],
    ["baleares", 0.16],
    ["cataluna", 0.16],
    ["comunidad_valenciana", 0.16],
    ["murcia", 0.159],
    ["cantabria", 0.15],
  ]);

  for (const [territoryId, rate] of expectedRates) {
    const result = calculate({ emissions: 210, territoryId });
    assert.equal(result.supportedCalculation, true);
    assert.equal(result.currentRegistrationTaxRate, rate);
    assert.equal(result.residualRegistrationTaxRate, rate);
  }
});

test("Canarias, Ceuta y Melilla no generan cuota automatica", () => {
  for (const territoryId of ["canarias", "ceuta_melilla"]) {
    const result = calculate({ emissions: 210, territoryId });

    assert.equal(result.supportedCalculation, false);
    assert.equal(result.tax, null);
    assert.equal(result.taxableBase, null);
    assert.match(result.exclusionReason, /revision fiscal individual/);
  }
});

test("warningCodes territoriales no colisionan entre Canarias y Ceuta/Melilla", () => {
  const canarias = calculate({ emissions: 210, territoryId: "canarias" });
  const ceutaMelilla = calculate({ emissions: 210, territoryId: "ceuta_melilla" });

  assert.equal(canarias.supportedCalculation, false);
  assert.equal(canarias.tax, null);
  assert.equal(canarias.taxableBase, null);
  assert.deepEqual(canarias.warningCodes, ["UNSUPPORTED_CANARIAS"]);
  assert.equal(canarias.warningCodes.includes("UNSUPPORTED_CEUTA_MELILLA"), false);

  assert.equal(ceutaMelilla.supportedCalculation, false);
  assert.equal(ceutaMelilla.tax, null);
  assert.equal(ceutaMelilla.taxableBase, null);
  assert.deepEqual(ceutaMelilla.warningCodes, ["UNSUPPORTED_CEUTA_MELILLA"]);
  assert.equal(ceutaMelilla.warningCodes.includes("UNSUPPORTED_CANARIAS"), false);
});

test("warningCodes no tienen duplicados y cada codigo tiene mensaje visible", () => {
  const cases = [
    calculate({ emissions: 210, territoryId: "canarias" }),
    calculate({ emissions: 210, territoryId: "ceuta_melilla" }),
    calculate({ emissions: 210, territoryId: null }),
    calculate({ noAccreditedEmissions: true }),
    calculate({ vehicleCondition: VEHICLE_CONDITIONS.UNKNOWN }),
    calculate({ boeValue: 0 }),
  ];

  for (const result of cases) {
    assert.deepEqual(result.warningCodes, Array.from(new Set(result.warningCodes)));
    assert.equal(result.warnings.length, result.warningCodes.length);
    for (const warning of result.warnings) {
      assert.equal(typeof warning, "string");
      assert.notEqual(warning.trim(), "");
    }
  }
});

test("sin territorio o territorio desconocido usa Peninsula provisional y advierte", () => {
  const missing = calculate({ territoryId: null });
  const unknown = calculate({ territoryId: "inventado" });

  assert.equal(missing.supportedCalculation, true);
  assert.equal(missing.isProvisionalTerritory, true);
  assert.equal(unknown.isProvisionalTerritory, true);
  assert.equal(unknown.territoryForRate.id, "peninsula_general");
});

test("emisiones no acreditadas no generan cuota", () => {
  const result = calculate({ noAccreditedEmissions: true });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.tax, null);
  assert.match(result.exclusionReason, /emisiones/i);
});

test("vehiculo nuevo o condicion desconocida no generan cuota", () => {
  for (const vehicleCondition of [
    VEHICLE_CONDITIONS.NEW_OR_NOT_PREVIOUSLY_REGISTERED,
    VEHICLE_CONDITIONS.UNKNOWN,
  ]) {
    const result = calculate({ vehicleCondition });

    assert.equal(result.supportedCalculation, false);
    assert.equal(result.tax, null);
    assert.match(result.exclusionReason, /revision individual/);
  }
});

test("fecha futura, fecha imposible y fecha antigua quedan excluidas", () => {
  assert.equal(
    calculate({ firstRegistrationDate: "2026-08" }).supportedCalculation,
    false
  );
  assert.equal(
    calculate({ firstRegistrationDate: "2026-13" }).supportedCalculation,
    false
  );
  assert.equal(
    calculate({ firstRegistrationDate: "2007-12-31" }).supportedCalculation,
    false
  );
});

test("fecha derivada desde meses conserva URLs antiguas", () => {
  const result = calculateRegistrationTax({
    price: 61200,
    emissions: 210,
    months: 145,
    calculationDate: CALCULATION_DATE,
    territoryId: "peninsula_general",
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.firstRegistrationDate, "2014-06");
  assert.equal(result.isDerivedFirstRegistrationDate, true);
});

test("si fecha y meses coexisten, prioriza fecha canonica", () => {
  const result = calculate({ firstRegistrationDate: "2025-07", months: 145 });

  assert.equal(result.firstRegistrationDate, "2025-07");
  assert.equal(result.months, 12);
  assert.equal(result.depreciationCoefficient, 1);
});

test("URL nueva con fecha canonica, territorio y origen", () => {
  const params = new URLSearchParams(
    "valor_boe=61200&co2=210&fecha_primera_matriculacion=2014-06&tramo=14.75&territorio=peninsula_general&origen=asistente_pgc&condicion=usado_importado"
  );
  const result = calculateRegistrationTax({
    boeValue: Number(params.get("valor_boe")),
    emissions: Number(params.get("co2")),
    firstRegistrationDate: params.get("fecha_primera_matriculacion"),
    territoryId: getTerritoryFromParam(params.get("territorio"))?.id,
    vehicleCondition: params.get("condicion"),
    urlRate: parseRateParam(params.get("tramo")),
    calculationDate: CALCULATION_DATE,
  });

  assert.equal(params.get("origen"), "asistente_pgc");
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.isUrlRateConsistent, true);
});

test("URL Asistente PGC completa no activa emisiones no acreditadas ni confia ciegamente en tramo", () => {
  const params = new URLSearchParams(
    "valor_boe=47100&co2=138&fecha_primera_matriculacion=2024-06&territorio=cataluna&condicion=usado_importado&norma_emisiones=wltp&tramo=4.75&origen=asistente_pgc"
  );
  const result = calculateRegistrationTax({
    boeValue: Number(params.get("valor_boe")),
    emissions: Number(params.get("co2")),
    firstRegistrationDate: params.get("fecha_primera_matriculacion"),
    territoryId: getTerritoryFromParam(params.get("territorio"))?.id,
    vehicleCondition: params.get("condicion"),
    emissionsStandard: params.get("norma_emisiones"),
    urlRate: parseRateParam(params.get("tramo")),
    noAccreditedEmissions: ["1", "true", "si"].includes(
      (params.get("emisiones_no_acreditadas") ?? "").toLocaleLowerCase("es-ES")
    ),
    calculationDate: CALCULATION_DATE,
  });

  assert.equal(params.get("origen"), "asistente_pgc");
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.boeValue, 47100);
  assert.equal(result.firstRegistrationDate, "2024-06");
  assert.equal(result.territoryForRate.id, "cataluna");
  assert.equal(result.currentRegistrationTaxRate, 0.0475);
  assert.equal(result.validatedUrlRate, 4.75);
  assert.equal(result.isUrlRateConsistent, true);
  assert.equal(result.warningCodes.includes("NO_ACCREDITED_EMISSIONS"), false);
});

test("tramo URL manipulado no se valida", () => {
  const result = calculate({ emissions: 180, urlRate: parseRateParam("16") });

  assert.equal(result.rate, 9.75);
  assert.equal(result.validatedUrlRate, null);
  assert.equal(result.isUrlRateConsistent, false);
});

test("valor cero, negativo, NaN e Infinity no devuelven NaN ni cuota", () => {
  for (const boeValue of [0, -1, Number.NaN, Infinity]) {
    const result = calculate({ boeValue });

    assert.equal(result.supportedCalculation, false);
    assert.equal(result.tax, null);
    assert.equal(result.taxableBase, null);
    assert.equal(Number.isNaN(result.tax), false);
  }
});

const assertInvalidEmissions = (emissions) => {
  const result = calculateRegistrationTax({
    boeValue: 20000,
    emissions,
    firstRegistrationDate: "2025-07",
    calculationDate: CALCULATION_DATE,
    territoryId: "peninsula_general",
    vehicleCondition: VEHICLE_CONDITIONS.USED_IMPORTED,
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.tax, null);
  assert.equal(result.taxableBase, null);
  assert.equal(result.currentRegistrationTaxRate === 0, false);
  assert.equal(result.residualRegistrationTaxRate === 0, false);
  assert.equal(result.warningCodes.includes("INVALID_INPUT"), true);
  assert.equal(
    result.exclusionReason,
    "Los datos introducidos no permiten calcular el impuesto con seguridad."
  );
};

const describeEmissionInput = (value) => {
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) return JSON.stringify(value);
  if (value && typeof value === "object") return "{}";
  return String(value);
};

test("CO2 invalido no devuelve cuota ni base imponible", async (t) => {
  for (const emissions of [-1, 601, Number.NaN, Infinity]) {
    const result = calculate({ emissions });

    assert.equal(result.supportedCalculation, false);
    assert.equal(result.tax, null);
    assert.equal(result.taxableBase, null);
    assert.equal(result.warningCodes.includes("INVALID_INPUT"), true);
  }

  await t.test("CO2 vacio o tipo incompatible no se convierte implicitamente en epigrafe 1", async (t) => {
    for (const emissions of [null, "", "   ", undefined, false, true, [], [0], {}, "0", "120.01"]) {
      await t.test(describeEmissionInput(emissions), () => {
        assertInvalidEmissions(emissions);
      });
    }
  });

  await t.test("CO2 numerico real conserva limites ordinarios y maximo valido", () => {
    const cases = [
      [0, 0],
      [120, 0],
      [120.01, 0.0475],
      [159.99, 0.0475],
      [160, 0.0975],
      [199.99, 0.0975],
      [200, 0.1475],
      [600, 0.1475],
    ];

    for (const [emissions, expectedRate] of cases) {
      const result = calculate({ emissions });

      assert.equal(result.supportedCalculation, true);
      assert.equal(result.currentRegistrationTaxRate, expectedRate);
      assert.equal(result.warningCodes.includes("INVALID_INPUT"), false);
    }

    assertInvalidEmissions(600.01);
  });

  await t.test("fronteras decimales CO2 ordinarias no dejan huecos entre epigrafes", () => {
    const cases = [
      [120, 0],
      [120.01, 0.0475],
      [159.99, 0.0475],
      [160, 0.0975],
      [199.99, 0.0975],
      [200, 0.1475],
    ];

    for (const [emissions, expectedRate] of cases) {
      assert.equal(getResidualRegistrationTaxRate({
        firstRegistrationDate: "2022-01-01",
        emissions,
        territoryId: "peninsula_general",
      }).rate, expectedRate);
    }
  });

  await t.test("fronteras decimales CO2 de la ventana 2021 no dejan huecos entre epigrafes", () => {
    const cases = [
      [144, 0],
      [144.01, 0.0475],
      [191.99, 0.0475],
      [192, 0.0975],
      [239.99, 0.0975],
      [240, 0.1475],
    ];

    for (const [emissions, expectedRate] of cases) {
      assert.equal(getResidualRegistrationTaxRate({
        firstRegistrationDate: "2021-07-11",
        emissions,
        territoryId: "peninsula_general",
      }).rate, expectedRate);
    }
  });
});
test("conflicto entre boeValue y price prioriza boeValue y advierte", () => {
  const result = calculate({ boeValue: 20000, price: 30000 });

  assert.equal(result.boeValue, 20000);
  assert.match(result.warnings.join(" "), /boeValue y price/);
});

