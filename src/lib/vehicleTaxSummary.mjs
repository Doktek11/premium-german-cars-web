export const VEHICLE_TAX_SUMMARY_STATUSES = {
  EXACT: "exact",
  PARTIAL: "partial",
  ESTIMATED: "estimated",
  SCENARIO_REQUIRED: "scenario_required",
  REQUIRES_REVIEW: "requires_review",
  INVALID: "invalid",
};

export const VEHICLE_TAX_LINE_ITEM_STATUSES = {
  CONFIRMED: "confirmed",
  CONFIRMED_ZERO: "confirmed_zero",
  NOT_SUBJECT: "not_subject",
  EXEMPT: "exempt",
  FILING_NOT_REQUIRED: "filing_not_required",
  BONIFIED: "bonified",
  ESTIMATED: "estimated",
  ESTIMATED_RANGE: "estimated_range",
  OUTDATED: "outdated",
  SCENARIO_REQUIRED: "scenario_required",
  REQUIRES_REVIEW: "requires_review",
  MISSING: "missing",
  INVALID: "invalid",
};

export const VEHICLE_TAX_SUMMARY_WARNING_CODES = {
  INVALID_INPUT: "SUMMARY_INVALID_INPUT",
  INVALID_LINE_ITEM_RESULT: "SUMMARY_INVALID_LINE_ITEM_RESULT",
  INVALID_REGISTRATION_FEE_RESULT: "SUMMARY_INVALID_REGISTRATION_FEE_RESULT",
  RESULT_CONTRADICTION: "SUMMARY_RESULT_CONTRADICTION",
  SCENARIOS_TRUNCATED: "SUMMARY_SCENARIOS_TRUNCATED",
};

const SUMMARY_WARNING_MESSAGES_BY_CODE = {
  [VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_INPUT]: "El resumen exige currency EUR y resultados calculados de los cuatro motores.",
  [VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_LINE_ITEM_RESULT]: "Una partida recibida no cumple el contrato esperado del motor correspondiente.",
  [VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_REGISTRATION_FEE_RESULT]: "La tasa DGT recibida no cumple el contrato publico del motor de tasa de matriculacion.",
  [VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION]: "Una partida recibida contiene una contradiccion entre soporte del calculo e importe confirmado.",
  [VEHICLE_TAX_SUMMARY_WARNING_CODES.SCENARIOS_TRUNCATED]: "Los escenarios agregados se han truncado al maximo determinista de 12.",
};

const CLOSED_STATUSES = new Set([
  VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED,
  VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED_ZERO,
  VEHICLE_TAX_LINE_ITEM_STATUSES.NOT_SUBJECT,
  VEHICLE_TAX_LINE_ITEM_STATUSES.EXEMPT,
  VEHICLE_TAX_LINE_ITEM_STATUSES.FILING_NOT_REQUIRED,
  VEHICLE_TAX_LINE_ITEM_STATUSES.BONIFIED,
]);

const IEDMT_INVALID_CODES = new Set(["INVALID_INPUT"]);
const ITP_INVALID_CODES = new Set(["INVALID_INPUT"]);
const REGISTRATION_FEE_INPUT_STATUSES = {
  CONFIRMED: "confirmed",
  OUTDATED: "outdated",
  MISSING: "missing",
  REQUIRES_REVIEW: "requires_review",
  INVALID: "invalid",
};
const REGISTRATION_FEE_ALLOWED_STATUSES = new Set(Object.values(REGISTRATION_FEE_INPUT_STATUSES));
const REGISTRATION_FEE_APPLICABILITIES = {
  APPLICABLE: "applicable",
  UNSUPPORTED: "unsupported",
};
const REGISTRATION_FEE_ALLOWED_APPLICABILITIES = new Set(Object.values(REGISTRATION_FEE_APPLICABILITIES));
const IVTM_INVALID_CODES = new Set([
  "INVALID_INPUT",
  "INVALID_MUNICIPALITY_CODE",
  "INVALID_REGISTRATION_DATE",
  "INVALID_FISCAL_HORSEPOWER",
  "VEHICLE_TYPE_UNSUPPORTED",
  "BONUS_EVIDENCE_REQUIRED",
  "BONUS_EVIDENCE_MISMATCH",
  "BONUS_REASON_UNSUPPORTED",
  "BONUS_ELIGIBILITY_MISMATCH",
  "INVALID_BONUS_RATE",
]);

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

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function uniqueStrings(values) {
  return Array.from(new Set((Array.isArray(values) ? values : []).filter((value) => typeof value === "string" && value)));
}

function moneyOrNull(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function hasInvalidMoney(value) {
  return value !== null && value !== undefined && moneyOrNull(value) === null;
}

function sumMoney(values) {
  return moneyOrNull(values.reduce((sum, value) => sum + value, 0));
}

function warningMessages(codes, existingWarnings = []) {
  const messages = [];
  for (const warning of Array.isArray(existingWarnings) ? existingWarnings : []) {
    if (typeof warning === "string" && warning) messages.push(warning);
  }
  for (const code of codes) {
    if (SUMMARY_WARNING_MESSAGES_BY_CODE[code]) messages.push(SUMMARY_WARNING_MESSAGES_BY_CODE[code]);
  }
  return uniqueStrings(messages);
}

function addValidationWarning(validation, code, field = null) {
  validation.warningCodes.push(code);
  if (field) validation.missingFields.push(field);
}

function buildLineItem({
  id,
  label,
  category,
  applicability,
  status,
  amount = null,
  referenceAmount = null,
  probableAmount = null,
  minimumAmount = null,
  maximumAmount = null,
  prudentAmount = null,
  sourceType,
  source = null,
  legalBasis = [],
  assumptions = [],
  warnings = [],
  warningCodes = [],
  missingFields = [],
  scenarios = [],
}) {
  return cloneJson({
    id,
    label,
    category,
    applicability,
    status,
    amount: moneyOrNull(amount),
    referenceAmount: moneyOrNull(referenceAmount),
    probableAmount: moneyOrNull(probableAmount),
    minimumAmount: moneyOrNull(minimumAmount),
    maximumAmount: moneyOrNull(maximumAmount),
    prudentAmount: moneyOrNull(prudentAmount),
    sourceType,
    source: cloneJson(source),
    legalBasis: cloneJson(Array.isArray(legalBasis) ? legalBasis : []),
    assumptions: uniqueStrings(assumptions),
    warnings: uniqueStrings(warnings),
    warningCodes: uniqueStrings(warningCodes),
    missingFields: uniqueStrings(missingFields),
    scenarios: Array.isArray(scenarios) ? scenarios.map((scenario) => cloneJson(scenario)) : [],
  });
}

function buildInvalidLineItem({ id, label, category, sourceType, source = null, legalBasis = [], validation, originalWarnings = [], originalWarningCodes = [], originalMissingFields = [], scenarios = [] }) {
  const warningCodes = uniqueStrings([
    ...originalWarningCodes,
    ...validation.warningCodes,
    VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_LINE_ITEM_RESULT,
  ]);
  return buildLineItem({
    id,
    label,
    category,
    applicability: "invalid",
    status: VEHICLE_TAX_LINE_ITEM_STATUSES.INVALID,
    sourceType,
    source,
    legalBasis,
    assumptions: [],
    warnings: warningMessages(warningCodes, originalWarnings),
    warningCodes,
    missingFields: uniqueStrings([...originalMissingFields, ...validation.missingFields]),
    scenarios,
  });
}

function validateCommonResult(result, moneyFields) {
  const validation = { ok: true, warningCodes: [], missingFields: [] };
  if (!isPlainObject(result)) {
    validation.ok = false;
    addValidationWarning(validation, VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_INPUT, "result");
    return validation;
  }
  if (typeof result.supportedCalculation !== "boolean") {
    validation.ok = false;
    addValidationWarning(validation, VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_INPUT, "supportedCalculation");
  }
  for (const field of moneyFields) {
    if (hasInvalidMoney(result[field])) {
      validation.ok = false;
      addValidationWarning(validation, VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_INPUT, field);
    }
  }
  if (result.supportedCalculation === false) {
    for (const field of ["taxAmount", "tax", "amount"]) {
      const value = moneyOrNull(result[field]);
      if (value !== null && value > 0) {
        validation.ok = false;
        addValidationWarning(validation, VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION, field);
      }
    }
  }
  return validation;
}

function normalizeScenario({ lineItemId, sourceScenario, index }) {
  const amount = moneyOrNull(sourceScenario?.taxAmount ?? sourceScenario?.amount);
  return cloneJson({
    id: `${lineItemId}_${typeof sourceScenario?.id === "string" && sourceScenario.id ? sourceScenario.id : `scenario_${index + 1}`}`,
    lineItemId,
    sourceScenarioId: typeof sourceScenario?.id === "string" ? sourceScenario.id : null,
    label: typeof sourceScenario?.label === "string" ? sourceScenario.label : `Escenario ${index + 1}`,
    amount,
    probableAmount: moneyOrNull(sourceScenario?.probableAmount),
    minimumAmount: moneyOrNull(sourceScenario?.minimumAmount),
    maximumAmount: moneyOrNull(sourceScenario?.maximumAmount),
    prudentAmount: moneyOrNull(sourceScenario?.prudentBudget ?? sourceScenario?.prudentAmount),
    assumptions: uniqueStrings(sourceScenario?.assumptions),
    warnings: uniqueStrings(sourceScenario?.warnings),
    warningCodes: uniqueStrings(sourceScenario?.warningCodes),
  });
}

function normalizeScenarios(lineItemId, scenarios) {
  if (!Array.isArray(scenarios)) return [];
  return scenarios.map((scenario, index) => normalizeScenario({ lineItemId, sourceScenario: scenario, index }));
}

function mapRegistrationTax(result) {
  const validation = validateCommonResult(result, ["tax"]);
  const warnings = uniqueStrings(result?.warnings);
  const warningCodes = uniqueStrings(result?.warningCodes);
  const missingFields = uniqueStrings(result?.missingFields);
  if (!validation.ok) {
    return buildInvalidLineItem({
      id: "iedmt",
      label: "IEDMT",
      category: "tax",
      sourceType: "engine",
      source: isPlainObject(result) ? { engine: "registrationTax", scope: result.scope ?? null, exclusionReason: result.exclusionReason ?? null } : null,
      validation,
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
    });
  }

  const amount = moneyOrNull(result.tax);
  if (result.supportedCalculation && amount === null) {
    return buildInvalidLineItem({
      id: "iedmt",
      label: "IEDMT",
      category: "tax",
      sourceType: "engine",
      source: { engine: "registrationTax", scope: result.scope ?? null, exclusionReason: result.exclusionReason ?? null },
      validation: { warningCodes: [VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION], missingFields: ["tax"] },
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
    });
  }
  let status = VEHICLE_TAX_LINE_ITEM_STATUSES.REQUIRES_REVIEW;
  if (result.supportedCalculation && amount !== null) {
    status = amount === 0 ? VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED_ZERO : VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED;
  } else if (warningCodes.some((code) => IEDMT_INVALID_CODES.has(code))) {
    status = VEHICLE_TAX_LINE_ITEM_STATUSES.INVALID;
  }

  const closed = CLOSED_STATUSES.has(status);
  return buildLineItem({
    id: "iedmt",
    label: "IEDMT",
    category: "tax",
    applicability: result.scope ?? "used_imported_foreign_first_registration_spain",
    status,
    amount: closed ? amount : null,
    probableAmount: closed ? amount : null,
    minimumAmount: closed ? amount : null,
    maximumAmount: closed ? amount : null,
    prudentAmount: closed ? amount : null,
    sourceType: "engine",
    source: {
      engine: "registrationTax",
      scope: result.scope ?? null,
      exclusionReason: result.exclusionReason ?? null,
      territory: cloneJson(result.territory ?? null),
      territoryForRate: cloneJson(result.territoryForRate ?? null),
      rate: result.rate ?? null,
    },
    legalBasis: [],
    assumptions: result.assumptions,
    warnings,
    warningCodes,
    missingFields,
  });
}

function mapTransferTaxStatus(result, warningCodes) {
  if (warningCodes.some((code) => ITP_INVALID_CODES.has(code))) return VEHICLE_TAX_LINE_ITEM_STATUSES.INVALID;
  if (result.applicability === "scenario_required") return VEHICLE_TAX_LINE_ITEM_STATUSES.SCENARIO_REQUIRED;
  if (result.applicability === "review_required") return VEHICLE_TAX_LINE_ITEM_STATUSES.REQUIRES_REVIEW;
  if (result.applicability === "not_subject") return VEHICLE_TAX_LINE_ITEM_STATUSES.NOT_SUBJECT;
  if (result.applicability === "exempt") return VEHICLE_TAX_LINE_ITEM_STATUSES.EXEMPT;
  if (result.applicability === "filing_not_required") return VEHICLE_TAX_LINE_ITEM_STATUSES.FILING_NOT_REQUIRED;
  if (result.applicability === "bonified") return VEHICLE_TAX_LINE_ITEM_STATUSES.BONIFIED;
  if (result.applicability === "taxable" && result.supportedCalculation) {
    return moneyOrNull(result.taxAmount) === 0 ? VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED_ZERO : VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED;
  }
  return VEHICLE_TAX_LINE_ITEM_STATUSES.REQUIRES_REVIEW;
}

function mapTransferTax(result) {
  const validation = validateCommonResult(result, ["taxAmount", "probableAmount", "minimumAmount", "maximumAmount", "prudentBudget"]);
  const warnings = uniqueStrings(result?.warnings);
  const warningCodes = uniqueStrings(result?.warningCodes);
  const missingFields = uniqueStrings(result?.missingFields);
  const scenarios = normalizeScenarios("itp", result?.scenarios);
  if (!validation.ok || typeof result?.applicability !== "string") {
    return buildInvalidLineItem({
      id: "itp",
      label: "ITP",
      category: "tax",
      sourceType: "engine",
      source: isPlainObject(result) ? { engine: "transferTax", applicability: result.applicability ?? null } : null,
      legalBasis: result?.legalBasis,
      validation,
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
      scenarios,
    });
  }

  const status = mapTransferTaxStatus(result, warningCodes);
  const closed = CLOSED_STATUSES.has(status);
  const amount = moneyOrNull(result.taxAmount);
  if (closed && amount === null) {
    return buildInvalidLineItem({
      id: "itp",
      label: "ITP",
      category: "tax",
      sourceType: "engine",
      source: { engine: "transferTax", applicability: result.applicability },
      legalBasis: result.legalBasis,
      validation: { warningCodes: [VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION], missingFields: ["taxAmount"] },
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
      scenarios,
    });
  }
  return buildLineItem({
    id: "itp",
    label: "ITP",
    category: "tax",
    applicability: result.applicability,
    status,
    amount: closed ? amount : null,
    probableAmount: closed ? amount : moneyOrNull(result.probableAmount),
    minimumAmount: closed ? amount : moneyOrNull(result.minimumAmount),
    maximumAmount: closed ? amount : moneyOrNull(result.maximumAmount),
    prudentAmount: closed ? amount : moneyOrNull(result.prudentBudget),
    sourceType: "engine",
    source: {
      engine: "transferTax",
      applicability: result.applicability,
      filingRequirement: result.filingRequirement ?? null,
      filingForm: result.filingForm ?? null,
      territoryRule: result.territoryRule ?? null,
      territoryStatus: result.territoryStatus ?? null,
      evidence: cloneJson(result.evidence ?? null),
      normalizedCountries: cloneJson(result.normalizedCountries ?? null),
    },
    legalBasis: result.legalBasis,
    assumptions: result.assumptions,
    warnings,
    warningCodes,
    missingFields,
    scenarios,
  });
}

function mapMunicipalVehicleTaxStatus(result, warningCodes) {
  if (warningCodes.some((code) => IVTM_INVALID_CODES.has(code))) return VEHICLE_TAX_LINE_ITEM_STATUSES.INVALID;
  if (result.dataStatus === "outdated") return VEHICLE_TAX_LINE_ITEM_STATUSES.OUTDATED;
  if (result.dataStatus === "estimated_range") return VEHICLE_TAX_LINE_ITEM_STATUSES.ESTIMATED_RANGE;
  if (result.dataStatus === "requires_review") return VEHICLE_TAX_LINE_ITEM_STATUSES.REQUIRES_REVIEW;
  if (result.dataStatus === "missing") return VEHICLE_TAX_LINE_ITEM_STATUSES.MISSING;
  if (result.supportedCalculation) {
    const amount = moneyOrNull(result.taxAmount);
    if (amount === 0 && moneyOrNull(result.bonusAmount) > 0) return VEHICLE_TAX_LINE_ITEM_STATUSES.BONIFIED;
    if (amount === 0) return VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED_ZERO;
    return VEHICLE_TAX_LINE_ITEM_STATUSES.CONFIRMED;
  }
  return VEHICLE_TAX_LINE_ITEM_STATUSES.REQUIRES_REVIEW;
}

function mapMunicipalVehicleTax(result) {
  const validation = validateCommonResult(result, ["taxAmount", "referenceProratedTax", "minimumAmount", "maximumAmount", "prudentBudget", "proratedTax"]);
  const warnings = uniqueStrings(result?.warnings);
  const warningCodes = uniqueStrings(result?.warningCodes);
  const missingFields = uniqueStrings(result?.missingFields);
  const scenarios = normalizeScenarios("ivtm", result?.scenarios);
  if (!validation.ok || typeof result?.dataStatus !== "string") {
    return buildInvalidLineItem({
      id: "ivtm",
      label: "IVTM",
      category: "municipal_tax",
      sourceType: "engine",
      source: isPlainObject(result) ? { engine: "municipalVehicleTax", dataStatus: result.dataStatus ?? null } : null,
      legalBasis: result?.legalBasis,
      validation,
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
      scenarios,
    });
  }

  const status = mapMunicipalVehicleTaxStatus(result, warningCodes);
  const closed = CLOSED_STATUSES.has(status);
  const amount = moneyOrNull(result.taxAmount);
  if (closed && amount === null) {
    return buildInvalidLineItem({
      id: "ivtm",
      label: "IVTM",
      category: "municipal_tax",
      sourceType: "engine",
      source: { engine: "municipalVehicleTax", dataStatus: result.dataStatus },
      legalBasis: result.legalBasis,
      validation: { warningCodes: [VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION], missingFields: ["taxAmount"] },
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
      scenarios,
    });
  }
  return buildLineItem({
    id: "ivtm",
    label: "IVTM",
    category: "municipal_tax",
    applicability: result.dataStatus,
    status,
    amount: closed ? amount : null,
    referenceAmount: moneyOrNull(result.referenceProratedTax),
    probableAmount: closed ? amount : null,
    minimumAmount: closed ? amount : moneyOrNull(result.minimumAmount),
    maximumAmount: closed ? amount : moneyOrNull(result.maximumAmount),
    prudentAmount: closed ? amount : moneyOrNull(result.prudentBudget),
    sourceType: "engine",
    source: {
      engine: "municipalVehicleTax",
      dataStatus: result.dataStatus,
      municipalityCode: result.municipalityCode ?? null,
      taxYear: result.taxYear ?? null,
      ratesYear: result.ratesYear ?? null,
      source: cloneJson(result.source ?? null),
      filingRequirement: result.filingRequirement ?? null,
      paymentRequirement: result.paymentRequirement ?? null,
    },
    legalBasis: result.legalBasis,
    assumptions: result.assumptions,
    warnings,
    warningCodes,
    missingFields,
    scenarios,
  });
}

function invalidateRegistrationFeeValidation(validation, field = null) {
  validation.ok = false;
  addValidationWarning(validation, VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_REGISTRATION_FEE_RESULT, field);
}

function validateRegistrationFeeContract(result, validation) {
  if (!isPlainObject(result)) {
    invalidateRegistrationFeeValidation(validation, "result");
    return validation;
  }

  if (!REGISTRATION_FEE_ALLOWED_STATUSES.has(result.status)) invalidateRegistrationFeeValidation(validation, "status");
  if (!REGISTRATION_FEE_ALLOWED_APPLICABILITIES.has(result.applicability)) invalidateRegistrationFeeValidation(validation, "applicability");
  if (result.currency !== "EUR") invalidateRegistrationFeeValidation(validation, "currency");

  const amount = moneyOrNull(result.amount);
  if (result.status === REGISTRATION_FEE_INPUT_STATUSES.CONFIRMED) {
    if (result.supportedCalculation !== true) invalidateRegistrationFeeValidation(validation, "supportedCalculation");
    if (result.applicability !== REGISTRATION_FEE_APPLICABILITIES.APPLICABLE) invalidateRegistrationFeeValidation(validation, "applicability");
    if (amount === null) invalidateRegistrationFeeValidation(validation, "amount");
  } else if (
    result.status === REGISTRATION_FEE_INPUT_STATUSES.OUTDATED ||
    result.status === REGISTRATION_FEE_INPUT_STATUSES.MISSING ||
    result.status === REGISTRATION_FEE_INPUT_STATUSES.REQUIRES_REVIEW
  ) {
    if (result.supportedCalculation !== false) invalidateRegistrationFeeValidation(validation, "supportedCalculation");
    if (result.applicability !== REGISTRATION_FEE_APPLICABILITIES.APPLICABLE) invalidateRegistrationFeeValidation(validation, "applicability");
    if (result.amount !== null) invalidateRegistrationFeeValidation(validation, "amount");
  } else if (result.status === REGISTRATION_FEE_INPUT_STATUSES.INVALID) {
    if (result.supportedCalculation !== false) invalidateRegistrationFeeValidation(validation, "supportedCalculation");
    if (result.applicability !== REGISTRATION_FEE_APPLICABILITIES.UNSUPPORTED) invalidateRegistrationFeeValidation(validation, "applicability");
    if (result.amount !== null) invalidateRegistrationFeeValidation(validation, "amount");
  }

  return validation;
}

function mapRegistrationFee(result) {
  const validation = validateRegistrationFeeContract(
    result,
    validateCommonResult(result, ["amount", "referenceAmount", "probableAmount", "minimumAmount", "maximumAmount", "prudentAmount"])
  );
  const warnings = uniqueStrings(result?.warnings);
  const warningCodes = uniqueStrings(result?.warningCodes);
  const missingFields = uniqueStrings(result?.missingFields);
  if (!validation.ok) {
    return buildInvalidLineItem({
      id: "dgt_registration_fee",
      label: "Tasa DGT de matriculacion",
      category: "administrative_fee",
      sourceType: "official",
      source: isPlainObject(result) ? result.source ?? null : null,
      legalBasis: result?.legalBasis,
      validation,
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
    });
  }

  const status = result.status;
  const closed = CLOSED_STATUSES.has(status);
  const amount = moneyOrNull(result.amount);
  if (closed && amount === null) {
    return buildInvalidLineItem({
      id: "dgt_registration_fee",
      label: "Tasa DGT de matriculacion",
      category: "administrative_fee",
      sourceType: "official",
      source: result.source ?? null,
      legalBasis: result.legalBasis,
      validation: { warningCodes: [VEHICLE_TAX_SUMMARY_WARNING_CODES.RESULT_CONTRADICTION], missingFields: ["amount"] },
      originalWarnings: warnings,
      originalWarningCodes: warningCodes,
      originalMissingFields: missingFields,
    });
  }
  return buildLineItem({
    id: "dgt_registration_fee",
    label: "Tasa DGT de matriculacion",
    category: "administrative_fee",
    applicability: result.applicability,
    status,
    amount: closed ? amount : null,
    referenceAmount: moneyOrNull(result.referenceAmount),
    probableAmount: closed ? amount : moneyOrNull(result.probableAmount),
    minimumAmount: closed ? amount : moneyOrNull(result.minimumAmount),
    maximumAmount: closed ? amount : moneyOrNull(result.maximumAmount),
    prudentAmount: closed ? amount : moneyOrNull(result.prudentAmount),
    sourceType: "official",
    source: result.source,
    legalBasis: result.legalBasis,
    assumptions: result.assumptions,
    warnings,
    warningCodes,
    missingFields,
  });
}

function calculateAggregate(lineItems, field) {
  const values = [];
  for (const item of lineItems) {
    if (CLOSED_STATUSES.has(item.status)) {
      if (item.amount === null) return null;
      values.push(item.amount);
    } else {
      if (item[field] === null) return null;
      values.push(item[field]);
    }
  }
  return sumMoney(values);
}

function determineSummaryStatus({ invalidInput, lineItems, exactTotal, probableTotal, minimumTotal, maximumTotal, prudentBudget, confirmedSubtotal }) {
  if (invalidInput || lineItems.some((item) => item.status === VEHICLE_TAX_LINE_ITEM_STATUSES.INVALID)) return VEHICLE_TAX_SUMMARY_STATUSES.INVALID;
  if (exactTotal !== null) return VEHICLE_TAX_SUMMARY_STATUSES.EXACT;
  if (lineItems.some((item) => item.status === VEHICLE_TAX_LINE_ITEM_STATUSES.REQUIRES_REVIEW)) return VEHICLE_TAX_SUMMARY_STATUSES.REQUIRES_REVIEW;
  if (lineItems.some((item) => item.status === VEHICLE_TAX_LINE_ITEM_STATUSES.SCENARIO_REQUIRED)) return VEHICLE_TAX_SUMMARY_STATUSES.SCENARIO_REQUIRED;
  if (probableTotal !== null && minimumTotal !== null && maximumTotal !== null && prudentBudget !== null) return VEHICLE_TAX_SUMMARY_STATUSES.ESTIMATED;
  return confirmedSubtotal !== null ? VEHICLE_TAX_SUMMARY_STATUSES.PARTIAL : VEHICLE_TAX_SUMMARY_STATUSES.INVALID;
}

function aggregateScenarios(lineItems) {
  const allScenarios = [];
  for (const item of lineItems) {
    for (const scenario of item.scenarios) {
      allScenarios.push(cloneJson(scenario));
    }
  }
  return {
    scenarios: allScenarios.slice(0, 12),
    truncated: allScenarios.length > 12,
  };
}

export function calculateVehicleTaxSummary(input = {}) {
  const invalidInput = !isPlainObject(input) || input.currency !== "EUR";
  const lineItems = [
    mapRegistrationTax(input?.registrationTaxResult),
    mapTransferTax(input?.transferTaxResult),
    mapMunicipalVehicleTax(input?.municipalVehicleTaxResult),
    mapRegistrationFee(input?.registrationFeeResult),
  ];
  const exactTotalBlockedBy = lineItems.filter((item) => !CLOSED_STATUSES.has(item.status)).map((item) => item.id);
  const confirmedValues = lineItems.filter((item) => CLOSED_STATUSES.has(item.status)).map((item) => item.amount);
  const confirmedSubtotal = confirmedValues.every((value) => value !== null) ? sumMoney(confirmedValues) : null;
  const exactTotal = exactTotalBlockedBy.length === 0 ? sumMoney(lineItems.map((item) => item.amount)) : null;
  const probableTotal = exactTotal !== null ? exactTotal : calculateAggregate(lineItems, "probableAmount");
  const minimumTotal = exactTotal !== null ? exactTotal : calculateAggregate(lineItems, "minimumAmount");
  const maximumTotal = exactTotal !== null ? exactTotal : calculateAggregate(lineItems, "maximumAmount");
  const prudentBudget = exactTotal !== null ? exactTotal : calculateAggregate(lineItems, "prudentAmount");
  const scenarioAggregation = aggregateScenarios(lineItems);
  const summaryWarningCodes = uniqueStrings([
    ...(invalidInput ? [VEHICLE_TAX_SUMMARY_WARNING_CODES.INVALID_INPUT] : []),
    ...(scenarioAggregation.truncated ? [VEHICLE_TAX_SUMMARY_WARNING_CODES.SCENARIOS_TRUNCATED] : []),
    ...lineItems.flatMap((item) => item.warningCodes),
  ]);
  const status = determineSummaryStatus({
    invalidInput,
    lineItems,
    exactTotal,
    probableTotal,
    minimumTotal,
    maximumTotal,
    prudentBudget,
    confirmedSubtotal,
  });

  return cloneJson({
    status,
    currency: input?.currency === "EUR" ? "EUR" : null,
    exactTotal,
    confirmedSubtotal,
    probableTotal,
    minimumTotal,
    maximumTotal,
    prudentBudget,
    lineItems,
    scenarios: scenarioAggregation.scenarios,
    assumptions: uniqueStrings(lineItems.flatMap((item) => item.assumptions)),
    warnings: warningMessages(summaryWarningCodes, lineItems.flatMap((item) => item.warnings)),
    warningCodes: summaryWarningCodes,
    missingFields: uniqueStrings([
      ...(invalidInput ? ["currency"] : []),
      ...lineItems.flatMap((item) => item.missingFields.map((field) => `${item.id}.${field}`)),
    ]),
    exactTotalBlockedBy,
  });
}