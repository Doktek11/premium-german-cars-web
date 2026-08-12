import {
  REGISTRATION_FEE_CURRENCIES,
  REGISTRATION_FEE_PROCEDURES,
  REGISTRATION_FEE_VEHICLE_TYPES,
  findRegistrationFeeRule,
  latestRegistrationFeeRule,
} from "../data/registrationFeeRules.mjs";

export const REGISTRATION_FEE_APPLICABILITY = {
  APPLICABLE: "applicable",
  UNSUPPORTED: "unsupported",
};

export const REGISTRATION_FEE_STATUSES = {
  CONFIRMED: "confirmed",
  OUTDATED: "outdated",
  MISSING: "missing",
  REQUIRES_REVIEW: "requires_review",
  INVALID: "invalid",
};

export const REGISTRATION_FEE_WARNING_CODES = {
  INVALID_INPUT: "REGISTRATION_FEE_INVALID_INPUT",
  INVALID_CURRENCY: "REGISTRATION_FEE_INVALID_CURRENCY",
  PROCEDURE_UNSUPPORTED: "REGISTRATION_FEE_PROCEDURE_UNSUPPORTED",
  VEHICLE_TYPE_UNSUPPORTED: "REGISTRATION_FEE_VEHICLE_TYPE_UNSUPPORTED",
  FUTURE_FEE_DATE: "REGISTRATION_FEE_FUTURE_FEE_DATE",
  REGISTRATION_FEE_OUTDATED: "REGISTRATION_FEE_OUTDATED",
  REGISTRATION_FEE_YEAR_UNSUPPORTED: "REGISTRATION_FEE_YEAR_UNSUPPORTED",
};

const WARNING_MESSAGES_BY_CODE = {
  [REGISTRATION_FEE_WARNING_CODES.INVALID_INPUT]: "La fecha de tasa o de calculo no es una fecha ISO valida.",
  [REGISTRATION_FEE_WARNING_CODES.INVALID_CURRENCY]: "La tasa DGT solo esta soportada en EUR.",
  [REGISTRATION_FEE_WARNING_CODES.PROCEDURE_UNSUPPORTED]: "El procedimiento de tasa DGT no esta soportado por este motor.",
  [REGISTRATION_FEE_WARNING_CODES.VEHICLE_TYPE_UNSUPPORTED]: "El tipo de vehiculo no esta soportado por este motor de tasa DGT.",
  [REGISTRATION_FEE_WARNING_CODES.FUTURE_FEE_DATE]: "La fecha de tasa es posterior a la fecha de calculo; no se confirma una tasa futura.",
  [REGISTRATION_FEE_WARNING_CODES.REGISTRATION_FEE_OUTDATED]: "No existe regla oficial cargada para el ejercicio solicitado; se conserva solo la referencia oficial mas reciente.",
  [REGISTRATION_FEE_WARNING_CODES.REGISTRATION_FEE_YEAR_UNSUPPORTED]: "No existe regla historica oficial cargada para el ejercicio solicitado.",
};

function cloneJson(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return null;
  seen.add(value);
  if (Array.isArray(value)) return value.map((item) => cloneJson(item, seen));
  const output = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item !== "function" && typeof item !== "symbol" && typeof item !== "undefined") {
      output[key] = cloneJson(item, seen);
    }
  }
  return output;
}

function uniqueStrings(values) {
  return Array.from(new Set((Array.isArray(values) ? values : []).filter((value) => typeof value === "string" && value)));
}

function normalizeWarningCodes(codes) {
  return uniqueStrings(codes).filter((code) => WARNING_MESSAGES_BY_CODE[code]);
}

function warningsFromCodes(codes) {
  return normalizeWarningCodes(codes).map((code) => WARNING_MESSAGES_BY_CODE[code]);
}

function parseDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
  return { iso: value, year, time: date.getTime() };
}

function moneyOrNull(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function output(overrides = {}) {
  const warningCodes = normalizeWarningCodes(overrides.warningCodes);
  return cloneJson({
    supportedCalculation: Boolean(overrides.supportedCalculation),
    applicability: overrides.applicability ?? REGISTRATION_FEE_APPLICABILITY.UNSUPPORTED,
    amount: moneyOrNull(overrides.amount),
    referenceAmount: moneyOrNull(overrides.referenceAmount),
    probableAmount: moneyOrNull(overrides.probableAmount),
    minimumAmount: moneyOrNull(overrides.minimumAmount),
    maximumAmount: moneyOrNull(overrides.maximumAmount),
    prudentAmount: moneyOrNull(overrides.prudentAmount),
    feeCode: typeof overrides.feeCode === "string" ? overrides.feeCode : null,
    feeYear: Number.isInteger(overrides.feeYear) ? overrides.feeYear : null,
    status: overrides.status ?? REGISTRATION_FEE_STATUSES.INVALID,
    currency: overrides.currency === REGISTRATION_FEE_CURRENCIES.EUR ? REGISTRATION_FEE_CURRENCIES.EUR : null,
    legalBasis: cloneJson(overrides.legalBasis ?? []),
    source: cloneJson(overrides.source ?? null),
    assumptions: uniqueStrings(overrides.assumptions),
    warnings: warningsFromCodes(warningCodes),
    warningCodes,
    missingFields: uniqueStrings(overrides.missingFields),
  });
}

function ruleFields(rule) {
  return {
    feeCode: rule.feeCode,
    feeYear: rule.feeYear,
    currency: rule.currency,
    legalBasis: rule.legalBasis,
    source: {
      type: rule.sourceType,
      rule: {
        procedure: rule.procedure,
        vehicleType: rule.vehicleType,
        feeCode: rule.feeCode,
        label: rule.label,
        description: rule.description,
        feeYear: rule.feeYear,
        verifiedAt: rule.verifiedAt,
      },
      source: rule.source,
    },
    assumptions: rule.assumptions,
  };
}

export function calculateRegistrationFee(input = {}) {
  const procedure = input?.procedure;
  const vehicleType = input?.vehicleType;
  const currency = input?.currency;
  const feeDate = parseDateOnly(input?.feeDate);
  const calculationDate = parseDateOnly(input?.calculationDate);
  const warningCodes = [];
  const missingFields = [];

  if (procedure !== REGISTRATION_FEE_PROCEDURES.ORDINARY_VEHICLE_REGISTRATION) {
    warningCodes.push(REGISTRATION_FEE_WARNING_CODES.PROCEDURE_UNSUPPORTED);
    if (procedure === undefined || procedure === null || procedure === "") missingFields.push("procedure");
  }
  if (vehicleType !== REGISTRATION_FEE_VEHICLE_TYPES.PASSENGER_CAR) {
    warningCodes.push(REGISTRATION_FEE_WARNING_CODES.VEHICLE_TYPE_UNSUPPORTED);
    if (vehicleType === undefined || vehicleType === null || vehicleType === "") missingFields.push("vehicleType");
  }
  if (currency !== REGISTRATION_FEE_CURRENCIES.EUR) {
    warningCodes.push(REGISTRATION_FEE_WARNING_CODES.INVALID_CURRENCY);
    if (currency === undefined || currency === null || currency === "") missingFields.push("currency");
  }
  if (!feeDate) {
    warningCodes.push(REGISTRATION_FEE_WARNING_CODES.INVALID_INPUT);
    missingFields.push("feeDate");
  }
  if (!calculationDate) {
    warningCodes.push(REGISTRATION_FEE_WARNING_CODES.INVALID_INPUT);
    missingFields.push("calculationDate");
  }

  const latestRule =
    procedure && vehicleType && currency
      ? latestRegistrationFeeRule({ procedure, vehicleType, currency })
      : null;

  if (warningCodes.length > 0) {
    return output({
      supportedCalculation: false,
      applicability: REGISTRATION_FEE_APPLICABILITY.UNSUPPORTED,
      status: REGISTRATION_FEE_STATUSES.INVALID,
      currency: currency === REGISTRATION_FEE_CURRENCIES.EUR ? currency : null,
      warningCodes,
      missingFields,
      ...(latestRule ? ruleFields(latestRule) : {}),
    });
  }

  const sameYearRule = findRegistrationFeeRule({
    procedure,
    vehicleType,
    feeYear: feeDate.year,
    currency,
  });

  if (feeDate.time > calculationDate.time) {
    const futureSameYearAmount = sameYearRule ? sameYearRule.amount : null;
    return output({
      supportedCalculation: false,
      applicability: REGISTRATION_FEE_APPLICABILITY.APPLICABLE,
      status: REGISTRATION_FEE_STATUSES.REQUIRES_REVIEW,
      referenceAmount: futureSameYearAmount ?? (latestRule && feeDate.year > latestRule.feeYear ? latestRule.amount : null),
      probableAmount: futureSameYearAmount,
      minimumAmount: futureSameYearAmount,
      maximumAmount: futureSameYearAmount,
      prudentAmount: futureSameYearAmount,
      warningCodes: [REGISTRATION_FEE_WARNING_CODES.FUTURE_FEE_DATE],
      ...(sameYearRule ? ruleFields(sameYearRule) : latestRule ? ruleFields(latestRule) : { currency }),
    });
  }

  if (sameYearRule) {
    return output({
      supportedCalculation: true,
      applicability: REGISTRATION_FEE_APPLICABILITY.APPLICABLE,
      status: REGISTRATION_FEE_STATUSES.CONFIRMED,
      amount: sameYearRule.amount,
      referenceAmount: sameYearRule.amount,
      probableAmount: sameYearRule.amount,
      minimumAmount: sameYearRule.amount,
      maximumAmount: sameYearRule.amount,
      prudentAmount: sameYearRule.amount,
      ...ruleFields(sameYearRule),
    });
  }

  if (latestRule && feeDate.year > latestRule.feeYear) {
    return output({
      supportedCalculation: false,
      applicability: REGISTRATION_FEE_APPLICABILITY.APPLICABLE,
      status: REGISTRATION_FEE_STATUSES.OUTDATED,
      referenceAmount: latestRule.amount,
      warningCodes: [REGISTRATION_FEE_WARNING_CODES.REGISTRATION_FEE_OUTDATED],
      ...ruleFields(latestRule),
    });
  }

  return output({
    supportedCalculation: false,
    applicability: REGISTRATION_FEE_APPLICABILITY.APPLICABLE,
    status: REGISTRATION_FEE_STATUSES.MISSING,
    currency,
    warningCodes: [REGISTRATION_FEE_WARNING_CODES.REGISTRATION_FEE_YEAR_UNSUPPORTED],
    ...(latestRule ? { source: ruleFields(latestRule).source, legalBasis: ruleFields(latestRule).legalBasis } : {}),
  });
}