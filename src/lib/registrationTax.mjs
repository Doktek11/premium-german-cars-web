export const DEFAULT_TERRITORY_ID = "peninsula_general";

export const VEHICLE_CONDITIONS = {
  USED_IMPORTED: "usado_importado",
  NEW_OR_NOT_PREVIOUSLY_REGISTERED: "nuevo_o_no_matriculado",
  UNKNOWN: "desconocido",
};

export const EMISSIONS_STANDARDS = {
  NEDC: "nedc",
  WLTP: "wltp",
  UNKNOWN: "unknown",
};

const WARNING_CODES = {
  DERIVED_FIRST_REGISTRATION_DATE: "DERIVED_FIRST_REGISTRATION_DATE",
  PROVISIONAL_TERRITORY: "PROVISIONAL_TERRITORY",
  OTHER_INDIRECT_TAX_ZERO: "OTHER_INDIRECT_TAX_ZERO",
  PRICE_ALIAS_CONFLICT: "PRICE_ALIAS_CONFLICT",
  UNSUPPORTED_CANARIAS: "UNSUPPORTED_CANARIAS",
  UNSUPPORTED_CEUTA_MELILLA: "UNSUPPORTED_CEUTA_MELILLA",
  NO_ACCREDITED_EMISSIONS: "NO_ACCREDITED_EMISSIONS",
  UNSUPPORTED_VEHICLE_CONDITION: "UNSUPPORTED_VEHICLE_CONDITION",
  UNSUPPORTED_HISTORICAL_PERIOD: "UNSUPPORTED_HISTORICAL_PERIOD",
  UNSUPPORTED_HISTORICAL_TERRITORY_RATE: "UNSUPPORTED_HISTORICAL_TERRITORY_RATE",
  AMBIGUOUS_FIRST_REGISTRATION_DATE: "AMBIGUOUS_FIRST_REGISTRATION_DATE",
  INVALID_INPUT: "INVALID_INPUT",
};

const WARNING_MESSAGES_BY_CODE = {
  [WARNING_CODES.DERIVED_FIRST_REGISTRATION_DATE]:
    "La fecha de primera matriculacion se ha estimado a partir de la antiguedad indicada.",
  [WARNING_CODES.PROVISIONAL_TERRITORY]:
    "Se ha utilizado provisionalmente el regimen general de Peninsula. Selecciona el territorio para ajustar la base imponible.",
  [WARNING_CODES.OTHER_INDIRECT_TAX_ZERO]:
    "No se han incluido otros impuestos indirectos residuales adicionales.",
  [WARNING_CODES.PRICE_ALIAS_CONFLICT]:
    "boeValue y price contienen valores diferentes. Se ha usado boeValue.",
  [WARNING_CODES.UNSUPPORTED_CANARIAS]:
    "Canarias requiere una revision fiscal individual para determinar correctamente los impuestos indirectos residuales.",
  [WARNING_CODES.UNSUPPORTED_CEUTA_MELILLA]:
    "Ceuta y Melilla requieren una revision fiscal individual para determinar correctamente los impuestos indirectos residuales.",
  [WARNING_CODES.NO_ACCREDITED_EMISSIONS]:
    "Las emisiones no constan acreditadas. Este supuesto requiere revision individual.",
  [WARNING_CODES.UNSUPPORTED_VEHICLE_CONDITION]:
    "Este supuesto requiere un calculo diferente o una revision individual.",
  [WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD]:
    "La fecha de primera matriculacion queda fuera de la matriz historica automatica implementada desde el 01/01/2008.",
  [WARNING_CODES.UNSUPPORTED_HISTORICAL_TERRITORY_RATE]:
    "No hay una tarifa historica territorial documentada para esa fecha y territorio. Requiere revision fiscal individual.",
  [WARNING_CODES.AMBIGUOUS_FIRST_REGISTRATION_DATE]:
    "La primera matriculacion requiere dia exacto porque en ese mes hubo un cambio legal que puede alterar el tipo aplicable.",
  [WARNING_CODES.INVALID_INPUT]:
    "Los datos introducidos no permiten calcular el impuesto con seguridad.",
};

function dedupeWarningCodes(codes) {
  return Array.from(
    new Set(codes.filter((code) => code && WARNING_MESSAGES_BY_CODE[code]))
  );
}

function getWarningsFromCodes(codes) {
  return codes.map((code) => WARNING_MESSAGES_BY_CODE[code]);
}

function getWarningMessage(code) {
  return WARNING_MESSAGES_BY_CODE[code] ?? "";
}
export const TERRITORIES = [
  {
    id: "peninsula_general",
    label: "Resto de la Peninsula",
    displayName: "Resto de la Peninsula",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.1475,
    aliases: [
      "peninsula_general",
      "resto",
      "resto_peninsula",
      "resto_de_peninsula",
      "peninsula",
      "madrid",
    ],
  },
  {
    id: "asturias",
    label: "Asturias",
    displayName: "Asturias",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.16,
    aliases: ["asturias", "principado_asturias"],
  },
  {
    id: "baleares",
    label: "Islas Baleares / Illes Balears",
    displayName: "Islas Baleares / Illes Balears",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.16,
    aliases: ["baleares", "illes_balears", "islas_baleares", "balears"],
  },
  {
    id: "cataluna",
    label: "Cataluna / Catalunya",
    displayName: "Cataluna / Catalunya",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.16,
    aliases: ["cataluna", "catalunya", "cataluña"],
  },
  {
    id: "comunidad_valenciana",
    label: "Comunidad Valenciana / Comunitat Valenciana",
    displayName: "Comunidad Valenciana / Comunitat Valenciana",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.16,
    aliases: ["comunidad_valenciana", "valencia", "comunitat_valenciana"],
  },
  {
    id: "murcia",
    label: "Murcia",
    displayName: "Murcia",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.159,
    aliases: ["murcia", "region_murcia", "region_de_murcia"],
  },
  {
    id: "cantabria",
    label: "Cantabria",
    displayName: "Cantabria",
    group: "iva_territory",
    supportedAutomaticCalculation: true,
    currentHighEmissionRate: 0.15,
    aliases: ["cantabria"],
  },
  {
    id: "canarias",
    label: "Canarias",
    displayName: "Canarias",
    group: "canarias",
    supportedAutomaticCalculation: false,
    currentHighEmissionRate: 0.1375,
    aliases: ["canarias", "islas_canarias"],
  },
  {
    id: "ceuta_melilla",
    label: "Ceuta y Melilla",
    displayName: "Ceuta y Melilla",
    group: "ceuta_melilla",
    supportedAutomaticCalculation: false,
    currentHighEmissionRate: 0,
    aliases: ["ceuta", "melilla", "ceuta_melilla", "ceuta_y_melilla"],
  },
];

const territoryAliases = new Map(
  TERRITORIES.flatMap((territory) =>
    territory.aliases.map((alias) => [normalizeTerritoryKey(alias), territory])
  )
);

const DEPRECIATION_BRACKETS = [
  [12, 1],
  [24, 0.84],
  [36, 0.67],
  [48, 0.56],
  [60, 0.47],
  [72, 0.39],
  [84, 0.34],
  [96, 0.28],
  [108, 0.24],
  [120, 0.19],
  [132, 0.17],
  [144, 0.13],
  [Infinity, 0.1],
];

const MODERN_CO2_IEDMT_START = "2008-01-01";
const TEMPORARY_2021_IEDMT_START = "2021-07-11";
const TEMPORARY_2021_IEDMT_END = "2021-12-31";
const VAT_18_START = "2010-07-01";
const VAT_21_START = "2012-09-01";
const STATE_HIGH_EMISSION_RATE = 0.1475;
const STATE_REGISTRATION_TAX_RATES = {
  epigraph1: 0,
  epigraph2: 0.0475,
  epigraph3: 0.0975,
  epigraph4: STATE_HIGH_EMISSION_RATE,
};

const HISTORICAL_REGISTRATION_TAX_RATE_PERIODS = {
  peninsula_general: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b, tipos estatales por epigrafe" },
  ],
  asturias: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b hasta entrada del tipo autonomico" },
    { from: "2010-07-15", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph4: 0.16 }, source: "Ley Asturias 5/2010 art. 7, BOE-A-2010-14629" },
  ],
  baleares: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b, Peninsula e Illes Balears" },
    { from: "2012-05-01", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph4: 0.16 }, source: "Decreto-ley Illes Balears 4/2012 art. 4 y DT unica, BOIB-i-2012-90027" },
  ],
  cataluna: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b hasta entrada del tipo autonomico" },
    { from: "2010-07-01", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph4: 0.16 }, source: "Decreto-ley Catalunya 3/2010 art. 6 y DF, BOE-A-2010-10217" },
  ],
  comunidad_valenciana: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b hasta entrada del tipo autonomico" },
    { from: "2017-01-01", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph4: 0.16 }, source: "Ley Generalitat Valenciana 13/2016 art. 18, BOE-A-2017-1291" },
  ],
  murcia: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b hasta entrada del tipo autonomico" },
    { from: "2013-07-11", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph4: 0.159 }, source: "Ley Region de Murcia 6/2013 art. 1.6, BOE-A-2013-8990" },
  ],
  cantabria: [
    { from: "2008-01-01", rates: STATE_REGISTRATION_TAX_RATES, source: "Ley 38/1992 art. 70.2.b hasta entrada del tipo autonomico" },
    { from: "2011-01-01", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph3: 0.11, epigraph4: 0.16 }, source: "Ley Cantabria 11/2010, BOE-A-2011-1651, epigrafes 3, 4 y 9" },
    { from: "2018-01-01", rates: { ...STATE_REGISTRATION_TAX_RATES, epigraph3: 0.0975, epigraph4: 0.15 }, source: "Ley Cantabria 9/2017 art. 18, BOE-A-2018-856" },
  ],
};

const RESIDUAL_VAT_PERIODS = [
  {
    from: "2008-01-01",
    rate: 0.16,
    source: "Ley 37/1992 art. 90, tipo general 16% vigente hasta 2010-06-30",
  },
  {
    from: VAT_18_START,
    rate: 0.18,
    source: "Ley 26/2009 art. 79, tipo general 18% desde 2010-07-01",
  },
  {
    from: VAT_21_START,
    rate: 0.21,
    source: "Real Decreto-ley 20/2012 art. 23, tipo general 21% desde 2012-09-01",
  },
];
export function normalizeTerritoryKey(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("es-ES")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function getTerritoryById(id) {
  return TERRITORIES.find((territory) => territory.id === id) ?? null;
}

export function getTerritoryFromParam(value) {
  const normalizedValue = normalizeTerritoryKey(value);

  if (!normalizedValue) {
    return null;
  }

  return territoryAliases.get(normalizedValue) ?? null;
}

export function parseRateParam(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const rate = Number(String(value).trim().replace(",", "."));
  return Number.isFinite(rate) ? rate : null;
}

export function toPercentRate(rate) {
  return typeof rate === "number" && Number.isFinite(rate) ? rate * 100 : null;
}

function safeNumber(value) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function isValidYearMonth(value) {
  if (!/^\d{4}-\d{2}$/.test(String(value))) {
    return false;
  }

  const [, month] = String(value).split("-").map(Number);
  return month >= 1 && month <= 12;
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    return false;
  }

  const [year, month, day] = String(value).split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function parseFirstRegistrationDate(value) {
  if (typeof value === "string" && isValidIsoDate(value)) {
    return { value, precision: "day" };
  }

  if (typeof value === "string" && isValidYearMonth(value)) {
    return { value, precision: "month" };
  }

  return null;
}

function firstRegistrationDateToIsoDate(value) {
  const parsed = parseFirstRegistrationDate(value);

  if (!parsed) {
    return { date: null, warningCode: WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD };
  }

  if (parsed.precision === "day") {
    return { date: parsed.value, warningCode: "" };
  }

  return { date: `${parsed.value}-01`, warningCode: "" };
}

function getLastDayOfMonthIso(yearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  const date = new Date(Date.UTC(year, month, 0));

  return `${yearMonth}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function normalizeCalculationDate(value) {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) ? value : null;
  }

  if (typeof value === "string" && isValidYearMonth(value)) {
    return `${value}-01`;
  }

  return new Date().toISOString().slice(0, 10);
}

function registrationDateToMonthIndex(value) {
  const parsed = parseFirstRegistrationDate(value);

  if (!parsed) {
    return null;
  }

  const [year, month] = parsed.value.split("-").map(Number);
  return year * 12 + month - 1;
}

function dateToMonthIndex(value) {
  const normalizedDate = normalizeCalculationDate(value);

  if (!normalizedDate) {
    return null;
  }

  const [year, month] = normalizedDate.split("-").map(Number);
  return year * 12 + month - 1;
}

function deriveFirstRegistrationDateFromMonths(months, calculationDate) {
  const numericMonths = safeNumber(months);
  const calculationMonthIndex = dateToMonthIndex(calculationDate);

  if (numericMonths === null || numericMonths < 0 || calculationMonthIndex === null) {
    return null;
  }

  const derivedIndex = calculationMonthIndex - Math.trunc(numericMonths);
  const year = Math.floor(derivedIndex / 12);
  const month = (derivedIndex % 12) + 1;

  return `${year}-${String(month).padStart(2, "0")}`;
}

export function getMonthsFromFirstRegistrationDate(
  firstRegistrationDate,
  calculationDate
) {
  const firstRegistrationIndex = registrationDateToMonthIndex(firstRegistrationDate);
  const calculationIndex = dateToMonthIndex(calculationDate);

  if (firstRegistrationIndex === null || calculationIndex === null) {
    return null;
  }

  return calculationIndex - firstRegistrationIndex;
}

export function getDepreciationCoefficient(months) {
  const numericMonths = safeNumber(months);

  if (numericMonths === null || numericMonths < 0) {
    return null;
  }

  const wholeMonths = Math.trunc(numericMonths);
  return DEPRECIATION_BRACKETS.find(([maxMonths]) => wholeMonths <= maxMonths)?.[1] ?? 0.1;
}

function getRegistrationTaxEpigraphFromEmissionsMatrix(emissions, matrix) {
  const numericEmissions = safeNumber(emissions);

  if (numericEmissions === null || numericEmissions < 0) {
    return null;
  }

  if (numericEmissions <= matrix.zeroMax) {
    return "epigraph1";
  }

  if (numericEmissions < matrix.mediumMin) {
    return "epigraph2";
  }

  if (numericEmissions < matrix.highMin) {
    return "epigraph3";
  }

  return "epigraph4";
}

function getRateFromRegistrationTaxRates(rates, epigraph) {
  const rate = rates?.[epigraph];
  return typeof rate === "number" && Number.isFinite(rate) ? rate : null;
}

function getRateFromEmissionsMatrix(emissions, highEmissionRate, matrix) {
  const epigraph = getRegistrationTaxEpigraphFromEmissionsMatrix(emissions, matrix);

  if (!epigraph) {
    return null;
  }

  const rates = { ...STATE_REGISTRATION_TAX_RATES, epigraph4: highEmissionRate };
  return toPercentRate(getRateFromRegistrationTaxRates(rates, epigraph));
}

function getCo2MatrixForDate(date) {
  if (date >= TEMPORARY_2021_IEDMT_START && date <= TEMPORARY_2021_IEDMT_END) {
    return {
      zeroMax: 144,
      mediumMin: 192,
      highMin: 240,
      source: "Ley 11/2021 disposicion adicional quinta, BOE-A-2021-11473, 11/07/2021-31/12/2021",
    };
  }

  return {
    zeroMax: 120,
    mediumMin: 160,
    highMin: 200,
    source: "Ley 38/1992 art. 70, matriz CO2 ordinaria",
  };
}

function getHistoricalRegistrationTaxRatePeriod(territoryId, date) {
  const periods = HISTORICAL_REGISTRATION_TAX_RATE_PERIODS[territoryId];

  if (!periods) {
    return null;
  }

  return [...periods].reverse().find((candidate) => date >= candidate.from) ?? null;
}

function getResidualRegistrationTaxRateForDate({ date, emissions, territory }) {
  if (date < MODERN_CO2_IEDMT_START) {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD),
    };
  }

  const period = getHistoricalRegistrationTaxRatePeriod(territory.id, date);

  if (!period) {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_HISTORICAL_TERRITORY_RATE,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_HISTORICAL_TERRITORY_RATE),
    };
  }

  const matrix = getCo2MatrixForDate(date);
  const epigraph = getRegistrationTaxEpigraphFromEmissionsMatrix(emissions, matrix);
  const rate = getRateFromRegistrationTaxRates(period.rates, epigraph);

  return {
    rate,
    supported: rate !== null,
    sourcePeriod: `${matrix.source}; ${period.source}`,
    warningCode: rate === null ? WARNING_CODES.INVALID_INPUT : "",
    warning: rate === null ? getWarningMessage(WARNING_CODES.INVALID_INPUT) : "",
  };
}

function isMonthAmbiguousForResidualRegistrationTaxRate({ yearMonth, emissions, territory }) {
  const startResult = getResidualRegistrationTaxRateForDate({
    date: `${yearMonth}-01`,
    emissions,
    territory,
  });
  const endResult = getResidualRegistrationTaxRateForDate({
    date: getLastDayOfMonthIso(yearMonth),
    emissions,
    territory,
  });

  if (!startResult.supported || !endResult.supported) {
    return false;
  }

  return Math.abs(startResult.rate - endResult.rate) > 0.0000001;
}

function getResidualVatPeriod(date) {
  return [...RESIDUAL_VAT_PERIODS].reverse().find((candidate) => date >= candidate.from) ?? null;
}
export function getRateFromEmissions(emissions, territoryId = DEFAULT_TERRITORY_ID) {
  const territory = getTerritoryById(territoryId) ?? getTerritoryById(DEFAULT_TERRITORY_ID);

  return getRateFromEmissionsMatrix(emissions, territory.currentHighEmissionRate, {
    zeroMax: 120,
    mediumMin: 160,
    highMin: 200,
  });
}

export function getCurrentRegistrationTaxRate({
  emissions,
  territoryId,
  noAccreditedEmissions = false,
}) {
  const territory = getTerritoryById(territoryId) ?? getTerritoryById(DEFAULT_TERRITORY_ID);

  if (noAccreditedEmissions) {
    return {
      rate: null,
      supported: false,
      warningCode: WARNING_CODES.NO_ACCREDITED_EMISSIONS,
      warning: getWarningMessage(WARNING_CODES.NO_ACCREDITED_EMISSIONS),
    };
  }

  const ratePercent = getRateFromEmissions(emissions, territory.id);

  return {
    rate: ratePercent === null ? null : ratePercent / 100,
    supported: ratePercent !== null,
    warningCode: ratePercent === null ? WARNING_CODES.INVALID_INPUT : "",
    warning: ratePercent === null ? getWarningMessage(WARNING_CODES.INVALID_INPUT) : "",
  };
}

export function getResidualRegistrationTaxRate({
  firstRegistrationDate,
  emissions,
  territoryId,
  noAccreditedEmissions = false,
}) {
  const territory = getTerritoryById(territoryId) ?? getTerritoryById(DEFAULT_TERRITORY_ID);

  if (noAccreditedEmissions) {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.NO_ACCREDITED_EMISSIONS,
      warning: getWarningMessage(WARNING_CODES.NO_ACCREDITED_EMISSIONS),
    };
  }

  if (territory.group === "canarias") {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_CANARIAS,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_CANARIAS),
    };
  }

  if (territory.group === "ceuta_melilla") {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_CEUTA_MELILLA,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_CEUTA_MELILLA),
    };
  }

  const parsedDate = parseFirstRegistrationDate(firstRegistrationDate);

  if (!parsedDate) {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD),
    };
  }

  if (
    parsedDate.precision === "month" &&
    isMonthAmbiguousForResidualRegistrationTaxRate({
      yearMonth: parsedDate.value,
      emissions,
      territory,
    })
  ) {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.AMBIGUOUS_FIRST_REGISTRATION_DATE,
      warning: getWarningMessage(WARNING_CODES.AMBIGUOUS_FIRST_REGISTRATION_DATE),
    };
  }

  const dateResult = firstRegistrationDateToIsoDate(firstRegistrationDate);
  const warningCode = dateResult.warningCode || WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD;

  if (!dateResult.date) {
    return {
      rate: null,
      supported: false,
      sourcePeriod: "",
      warningCode,
      warning: getWarningMessage(warningCode),
    };
  }

  return getResidualRegistrationTaxRateForDate({
    date: dateResult.date,
    emissions,
    territory,
  });
}
export function getResidualIndirectTaxRate({ firstRegistrationDate, territoryId }) {
  const territory = getTerritoryById(territoryId) ?? getTerritoryById(DEFAULT_TERRITORY_ID);

  if (territory.group === "canarias") {
    return {
      rate: null,
      taxName: "IGIC",
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_CANARIAS,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_CANARIAS),
    };
  }

  if (territory.group === "ceuta_melilla") {
    return {
      rate: null,
      taxName: "IPSI",
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_CEUTA_MELILLA,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_CEUTA_MELILLA),
    };
  }

  const dateResult = firstRegistrationDateToIsoDate(firstRegistrationDate);

  if (!dateResult.date || dateResult.date < MODERN_CO2_IEDMT_START) {
    const warningCode = dateResult.warningCode || WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD;
    return {
      rate: null,
      taxName: "IVA residual historico",
      supported: false,
      sourcePeriod: "",
      warningCode,
      warning: getWarningMessage(warningCode),
    };
  }

  const vatPeriod = getResidualVatPeriod(dateResult.date);

  if (!vatPeriod) {
    return {
      rate: null,
      taxName: "IVA residual historico",
      supported: false,
      sourcePeriod: "",
      warningCode: WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD,
      warning: getWarningMessage(WARNING_CODES.UNSUPPORTED_HISTORICAL_PERIOD),
    };
  }

  return {
    rate: vatPeriod.rate,
    taxName: "IVA residual historico",
    supported: true,
    sourcePeriod: vatPeriod.source,
    warningCode: "",
    warning: "",
  };
}

function unsupportedResult({
  boeValue,
  firstRegistrationDate,
  isDerivedFirstRegistrationDate,
  months,
  depreciationCoefficient,
  selectedTerritory,
  territoryForRate,
  isProvisionalTerritory,
  currentRegistrationTaxRate = null,
  residualRegistrationTaxRate = null,
  indirectTaxRate = null,
  indirectTaxName = "",
  otherIndirectTaxRate = 0,
  urlRate,
  validatedUrlRate,
  isUrlRateConsistent,
  assumptions,
  warningCodes,
  exclusionReasonCode,
}) {
  const finalWarningCodes = dedupeWarningCodes([...warningCodes, exclusionReasonCode]);

  return {
    supportedCalculation: false,
    scope: "used_imported_foreign_first_registration_spain",
    boeValue,
    firstRegistrationDate,
    isDerivedFirstRegistrationDate,
    months,
    depreciationCoefficient,
    marketValue:
      boeValue !== null && depreciationCoefficient !== null
        ? boeValue * depreciationCoefficient
        : null,
    indirectTaxName,
    indirectTaxRate,
    residualRegistrationTaxRate,
    otherIndirectTaxRate,
    denominator: null,
    taxableBase: null,
    currentRegistrationTaxRate,
    rate: toPercentRate(currentRegistrationTaxRate),
    tax: null,
    selectedTerritory,
    territory: selectedTerritory,
    territoryForRate,
    needsTerritory: true,
    isProvisionalTerritory,
    assumptions,
    warnings: getWarningsFromCodes(finalWarningCodes),
    warningCodes: finalWarningCodes,
    exclusionReason: getWarningMessage(exclusionReasonCode),
    urlRate,
    validatedUrlRate,
    isUrlRateConsistent,
  };
}

export function calculateRegistrationTax({
  boeValue,
  price,
  emissions,
  firstRegistrationDate,
  months,
  calculationDate,
  territoryId,
  noAccreditedEmissions = false,
  vehicleCondition = VEHICLE_CONDITIONS.USED_IMPORTED,
  emissionsStandard = EMISSIONS_STANDARDS.UNKNOWN,
  urlRate = null,
  otherIndirectTaxRate = 0,
}) {
  const calculationDateValue = normalizeCalculationDate(calculationDate);
  const selectedTerritory = getTerritoryById(territoryId);
  const defaultTerritory = getTerritoryById(DEFAULT_TERRITORY_ID);
  const territoryForRate = selectedTerritory ?? defaultTerritory;
  const warningCodes = [];
  const assumptions = [getWarningMessage(WARNING_CODES.OTHER_INDIRECT_TAX_ZERO)];
  const normalizedOtherIndirectTaxRate = safeNumber(otherIndirectTaxRate) ?? 0;
  const numericBoeValue = safeNumber(boeValue);
  const legacyPrice = safeNumber(price);
  const finalBoeValue = numericBoeValue ?? legacyPrice;

  if (
    numericBoeValue !== null &&
    legacyPrice !== null &&
    Math.abs(numericBoeValue - legacyPrice) > 0.001
  ) {
    warningCodes.push(WARNING_CODES.PRICE_ALIAS_CONFLICT);
  }

  const isProvisionalTerritory = !selectedTerritory;
  if (isProvisionalTerritory) {
    warningCodes.push(WARNING_CODES.PROVISIONAL_TERRITORY);
  }

  const parsedFirstRegistrationDate = parseFirstRegistrationDate(firstRegistrationDate);
  const canonicalFirstRegistrationDate =
    parsedFirstRegistrationDate?.value ?? deriveFirstRegistrationDateFromMonths(months, calculationDateValue);
  const isDerivedFirstRegistrationDate =
    !parsedFirstRegistrationDate && canonicalFirstRegistrationDate !== null;

  if (isDerivedFirstRegistrationDate) {
    warningCodes.push(WARNING_CODES.DERIVED_FIRST_REGISTRATION_DATE);
  }

  const calculatedMonths =
    canonicalFirstRegistrationDate === null
      ? null
      : getMonthsFromFirstRegistrationDate(canonicalFirstRegistrationDate, calculationDateValue);
  const depreciationCoefficient = getDepreciationCoefficient(calculatedMonths);
  const currentRateResult = getCurrentRegistrationTaxRate({
    emissions,
    territoryId: territoryForRate.id,
    noAccreditedEmissions,
  });
  const residualRateResult = getResidualRegistrationTaxRate({
    firstRegistrationDate: canonicalFirstRegistrationDate,
    emissions,
    territoryId: territoryForRate.id,
    noAccreditedEmissions,
    emissionsStandard,
  });
  const indirectTaxResult = getResidualIndirectTaxRate({
    firstRegistrationDate: canonicalFirstRegistrationDate,
    territoryId: territoryForRate.id,
  });

  const validatedUrlRate =
    typeof urlRate === "number" &&
    currentRateResult.rate !== null &&
    Math.abs(urlRate - toPercentRate(currentRateResult.rate)) < 0.001
      ? urlRate
      : null;
  const isUrlRateConsistent = urlRate === null || validatedUrlRate !== null;

  if (vehicleCondition !== VEHICLE_CONDITIONS.USED_IMPORTED) {
    warningCodes.push(WARNING_CODES.UNSUPPORTED_VEHICLE_CONDITION);
    return unsupportedResult({
      boeValue: finalBoeValue,
      firstRegistrationDate: canonicalFirstRegistrationDate,
      isDerivedFirstRegistrationDate,
      months: calculatedMonths,
      depreciationCoefficient,
      selectedTerritory,
      territoryForRate,
      isProvisionalTerritory,
      currentRegistrationTaxRate: currentRateResult.rate,
      residualRegistrationTaxRate: residualRateResult.rate,
      indirectTaxRate: indirectTaxResult.rate,
      indirectTaxName: indirectTaxResult.taxName,
      otherIndirectTaxRate: normalizedOtherIndirectTaxRate,
      urlRate,
      validatedUrlRate,
      isUrlRateConsistent,
      assumptions,
      warningCodes,
      exclusionReasonCode: WARNING_CODES.UNSUPPORTED_VEHICLE_CONDITION,
    });
  }

  const validationFailures = [];

  if (finalBoeValue === null || finalBoeValue <= 0) {
    validationFailures.push("Valor BOE no valido.");
  }

  if (safeNumber(emissions) === null || safeNumber(emissions) < 0 || safeNumber(emissions) > 600) {
    validationFailures.push("CO2 no valido.");
  }

  if (!canonicalFirstRegistrationDate || calculatedMonths === null || calculatedMonths < 0) {
    validationFailures.push("Fecha de primera matriculacion no valida.");
  }

  if (depreciationCoefficient === null) {
    validationFailures.push("Antiguedad no valida.");
  }

  if (normalizedOtherIndirectTaxRate < 0) {
    validationFailures.push("Tipo de otros impuestos indirectos no valido.");
  }

  if (validationFailures.length > 0) {
    warningCodes.push(WARNING_CODES.INVALID_INPUT);
    return unsupportedResult({
      boeValue: finalBoeValue,
      firstRegistrationDate: canonicalFirstRegistrationDate,
      isDerivedFirstRegistrationDate,
      months: calculatedMonths,
      depreciationCoefficient,
      selectedTerritory,
      territoryForRate,
      isProvisionalTerritory,
      currentRegistrationTaxRate: currentRateResult.rate,
      residualRegistrationTaxRate: residualRateResult.rate,
      indirectTaxRate: indirectTaxResult.rate,
      indirectTaxName: indirectTaxResult.taxName,
      otherIndirectTaxRate: normalizedOtherIndirectTaxRate,
      urlRate,
      validatedUrlRate,
      isUrlRateConsistent,
      assumptions,
      warningCodes,
      exclusionReasonCode: WARNING_CODES.INVALID_INPUT,
    });
  }

  if (!currentRateResult.supported) {
    warningCodes.push(currentRateResult.warningCode);
  }

  if (!residualRateResult.supported) {
    warningCodes.push(residualRateResult.warningCode);
  }

  if (!indirectTaxResult.supported) {
    warningCodes.push(indirectTaxResult.warningCode);
  }

  if (
    !currentRateResult.supported ||
    !residualRateResult.supported ||
    !indirectTaxResult.supported
  ) {
    return unsupportedResult({
      boeValue: finalBoeValue,
      firstRegistrationDate: canonicalFirstRegistrationDate,
      isDerivedFirstRegistrationDate,
      months: calculatedMonths,
      depreciationCoefficient,
      selectedTerritory,
      territoryForRate,
      isProvisionalTerritory,
      currentRegistrationTaxRate: currentRateResult.rate,
      residualRegistrationTaxRate: residualRateResult.rate,
      indirectTaxRate: indirectTaxResult.rate,
      indirectTaxName: indirectTaxResult.taxName,
      otherIndirectTaxRate: normalizedOtherIndirectTaxRate,
      urlRate,
      validatedUrlRate,
      isUrlRateConsistent,
      assumptions,
      warningCodes,
      exclusionReasonCode:
        indirectTaxResult.warningCode ||
        residualRateResult.warningCode ||
        currentRateResult.warningCode ||
        WARNING_CODES.INVALID_INPUT,
    });
  }

  const marketValue = finalBoeValue * depreciationCoefficient;
  // Ley 38/1992 art. 69 y Orden HAC/1501/2025 art. 5: minoracion de impuestos indirectos residuales.
  const denominator =
    1 +
    indirectTaxResult.rate +
    residualRateResult.rate +
    normalizedOtherIndirectTaxRate;

  if (!Number.isFinite(denominator) || denominator <= 0) {
    warningCodes.push(WARNING_CODES.INVALID_INPUT);
    return unsupportedResult({
      boeValue: finalBoeValue,
      firstRegistrationDate: canonicalFirstRegistrationDate,
      isDerivedFirstRegistrationDate,
      months: calculatedMonths,
      depreciationCoefficient,
      selectedTerritory,
      territoryForRate,
      isProvisionalTerritory,
      currentRegistrationTaxRate: currentRateResult.rate,
      residualRegistrationTaxRate: residualRateResult.rate,
      indirectTaxRate: indirectTaxResult.rate,
      indirectTaxName: indirectTaxResult.taxName,
      otherIndirectTaxRate: normalizedOtherIndirectTaxRate,
      urlRate,
      validatedUrlRate,
      isUrlRateConsistent,
      assumptions,
      warningCodes,
      exclusionReasonCode: WARNING_CODES.INVALID_INPUT,
    });
  }

  const taxableBase = marketValue / denominator;
  const tax = taxableBase * currentRateResult.rate;

  return {
    supportedCalculation: true,
    scope: "used_imported_foreign_first_registration_spain",
    boeValue: finalBoeValue,
    firstRegistrationDate: canonicalFirstRegistrationDate,
    isDerivedFirstRegistrationDate,
    months: calculatedMonths,
    depreciationCoefficient,
    marketValue,
    indirectTaxName: indirectTaxResult.taxName,
    indirectTaxRate: indirectTaxResult.rate,
    residualRegistrationTaxRate: residualRateResult.rate,
    otherIndirectTaxRate: normalizedOtherIndirectTaxRate,
    denominator,
    taxableBase,
    currentRegistrationTaxRate: currentRateResult.rate,
    rate: toPercentRate(currentRateResult.rate),
    tax,
    selectedTerritory,
    territory: selectedTerritory,
    territoryForRate,
    needsTerritory: true,
    isProvisionalTerritory,
    assumptions,
    warningCodes: dedupeWarningCodes(warningCodes),
    warnings: getWarningsFromCodes(dedupeWarningCodes(warningCodes)),
    exclusionReason: "",
    urlRate,
    validatedUrlRate,
    isUrlRateConsistent,
  };
}

