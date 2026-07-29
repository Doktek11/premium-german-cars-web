export const IVTM_VEHICLE_TYPES = {
  PASSENGER_CAR: "passenger_car",
};

export const IVTM_ZERO_EMISSION_STATUSES = {
  CONFIRMED: "confirmed",
  NOT_ZERO_EMISSION: "not_zero_emission",
  UNKNOWN: "unknown",
};

export const IVTM_BONUS_STATUSES = {
  NOT_APPLICABLE: "not_applicable",
  CONFIRMED: "confirmed",
  POSSIBLE: "possible",
  UNKNOWN: "unknown",
};

export const IVTM_DATA_STATUSES = {
  VERIFIED_MUNICIPAL: "verified_municipal",
  VERIFIED_STATE_FALLBACK: "verified_state_fallback",
  ESTIMATED_RANGE: "estimated_range",
  OUTDATED: "outdated",
  REQUIRES_REVIEW: "requires_review",
  MISSING: "missing",
};

export const IVTM_WARNING_CODES = {
  INVALID_INPUT: "INVALID_INPUT",
  INVALID_MUNICIPALITY_CODE: "INVALID_MUNICIPALITY_CODE",
  MUNICIPALITY_NOT_FOUND: "MUNICIPALITY_NOT_FOUND",
  FISCAL_HORSEPOWER_REQUIRED: "FISCAL_HORSEPOWER_REQUIRED",
  INVALID_FISCAL_HORSEPOWER: "INVALID_FISCAL_HORSEPOWER",
  INVALID_REGISTRATION_DATE: "INVALID_REGISTRATION_DATE",
  TAX_YEAR_DATE_CONFLICT: "TAX_YEAR_DATE_CONFLICT",
  MUNICIPAL_RATE_NOT_AVAILABLE: "MUNICIPAL_RATE_NOT_AVAILABLE",
  MUNICIPAL_RATE_YEAR_OUTDATED: "MUNICIPAL_RATE_YEAR_OUTDATED",
  MUNICIPAL_RATE_REQUIRES_REVIEW: "MUNICIPAL_RATE_REQUIRES_REVIEW",
  BONUS_STATUS_UNKNOWN: "BONUS_STATUS_UNKNOWN",
  BONUS_EVIDENCE_REQUIRED: "BONUS_EVIDENCE_REQUIRED",
  BONUS_EVIDENCE_MISMATCH: "BONUS_EVIDENCE_MISMATCH",
  BONUS_REASON_UNSUPPORTED: "BONUS_REASON_UNSUPPORTED",
  BONUS_ELIGIBILITY_MISMATCH: "BONUS_ELIGIBILITY_MISMATCH",
  INVALID_BONUS_RATE: "INVALID_BONUS_RATE",
  VEHICLE_TYPE_UNSUPPORTED: "VEHICLE_TYPE_UNSUPPORTED",
};

const WARNING_MESSAGES_BY_CODE = {
  [IVTM_WARNING_CODES.INVALID_INPUT]: "Los datos introducidos no permiten calcular el IVTM con seguridad.",
  [IVTM_WARNING_CODES.INVALID_MUNICIPALITY_CODE]: "El codigo INE municipal debe tener exactamente cinco digitos y conservar ceros iniciales.",
  [IVTM_WARNING_CODES.MUNICIPALITY_NOT_FOUND]: "El codigo INE municipal no existe en el catalogo municipal auditado.",
  [IVTM_WARNING_CODES.FISCAL_HORSEPOWER_REQUIRED]: "Falta la potencia fiscal; no se elige tramo IVTM en silencio.",
  [IVTM_WARNING_CODES.INVALID_FISCAL_HORSEPOWER]: "La potencia fiscal debe ser un numero finito mayor que cero.",
  [IVTM_WARNING_CODES.INVALID_REGISTRATION_DATE]: "La fecha de alta o primera matriculacion espanola no es valida.",
  [IVTM_WARNING_CODES.TAX_YEAR_DATE_CONFLICT]: "El ejercicio IVTM no coincide con el ano de la alta espanola; no se confirma la cuota.",
  [IVTM_WARNING_CODES.MUNICIPAL_RATE_NOT_AVAILABLE]: "No hay tarifa municipal Hacienda para este codigo INE; se conserva solo el intervalo legal.",
  [IVTM_WARNING_CODES.MUNICIPAL_RATE_YEAR_OUTDATED]: "La tarifa municipal disponible es de otro ejercicio y no se presenta como cuota exacta del ejercicio solicitado.",
  [IVTM_WARNING_CODES.MUNICIPAL_RATE_REQUIRES_REVIEW]: "La tarifa publicada queda fuera del rango legal esperado y requiere revision de ordenanza o fuente.",
  [IVTM_WARNING_CODES.BONUS_STATUS_UNKNOWN]: "No consta si existe bonificacion municipal aplicable; no se aplica descuento automatico.",
  [IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED]: "La bonificacion confirmada exige evidencia estructurada de ordenanza municipal con causa, ejercicio, municipio, URL HTTPS y elegibilidad confirmada.",
  [IVTM_WARNING_CODES.BONUS_EVIDENCE_MISMATCH]: "La evidencia de bonificacion no coincide con el municipio, ejercicio o porcentaje confirmado del calculo.",
  [IVTM_WARNING_CODES.BONUS_REASON_UNSUPPORTED]: "La causa de bonificacion indicada no esta soportada por el contrato IVTM actual.",
  [IVTM_WARNING_CODES.BONUS_ELIGIBILITY_MISMATCH]: "La causa de bonificacion no es compatible con el estado acreditado del vehiculo.",
  [IVTM_WARNING_CODES.INVALID_BONUS_RATE]: "La bonificacion confirmada supera el maximo legal compatible o no es un numero valido.",
  [IVTM_WARNING_CODES.VEHICLE_TYPE_UNSUPPORTED]: "Esta primera fase solo calcula IVTM de turismos por potencia fiscal.",
};

export const STATE_TOURISM_QUOTAS_CENTS = {
  lt8: 1262,
  from8To11_99: 3408,
  from12To15_99: 7194,
  from16To19_99: 8961,
  gte20: 11200,
};

export const IVTM_HORSEPOWER_BANDS = [
  { key: "lt8", label: "CVF < 8", minInclusive: null, maxExclusive: 8 },
  { key: "from8To11_99", label: "8 <= CVF < 12", minInclusive: 8, maxExclusive: 12 },
  { key: "from12To15_99", label: "12 <= CVF < 16", minInclusive: 12, maxExclusive: 16 },
  { key: "from16To19_99", label: "16 <= CVF < 20", minInclusive: 16, maxExclusive: 20 },
  { key: "gte20", label: "CVF >= 20", minInclusive: 20, maxExclusive: null },
];

const LEGAL_BASIS = [
  {
    id: "trlrhl-art-95",
    label: "TRLRHL articulo 95",
    note: "Cuotas estatales de turismos y coeficiente municipal maximo 2; el prorrateo se aplica por trimestres completos incluyendo el de alta.",
  },
  {
    id: "hacienda-ivtm-2025-all-municipalities",
    label: "Consulta de tipos impositivos municipales Hacienda 2025",
    note: "Fuente de referencia municipal 2025; no acredita automaticamente tarifas exactas de 2026.",
  },
];

function centsToEuros(cents) {
  return Number((cents / 100).toFixed(2));
}

function prorateCents(annualCents, remainingQuarters) {
  return Math.round((annualCents * remainingQuarters) / 4);
}

function normalizeWarningCodes(codes) {
  return Array.from(new Set(codes.filter((code) => code && WARNING_MESSAGES_BY_CODE[code])));
}

function warningsFromCodes(codes) {
  return normalizeWarningCodes(codes).map((code) => WARNING_MESSAGES_BY_CODE[code]);
}

function uniqueStrings(values) {
  return Array.from(new Set((Array.isArray(values) ? values : []).filter((value) => typeof value === "string" && value)));
}

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

function canonicalMunicipalityCode(value) {
  if (typeof value !== "string") return null;
  const code = value.trim();
  return /^\d{5}$/.test(code) ? code : null;
}

function parseTaxYear(value) {
  return Number.isInteger(value) && value >= 1900 && value <= 2100 ? value : null;
}

function parseDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return null;
  return { year, month, day, iso: value };
}

export function getIvtmHorsepowerBand(fiscalHorsepower) {
  if (!Number.isFinite(fiscalHorsepower) || fiscalHorsepower <= 0) return null;
  if (fiscalHorsepower < 8) return IVTM_HORSEPOWER_BANDS[0];
  if (fiscalHorsepower < 12) return IVTM_HORSEPOWER_BANDS[1];
  if (fiscalHorsepower < 16) return IVTM_HORSEPOWER_BANDS[2];
  if (fiscalHorsepower < 20) return IVTM_HORSEPOWER_BANDS[3];
  return IVTM_HORSEPOWER_BANDS[4];
}

export function getIvtmProrationFromRegistrationDate(spanishRegistrationDate) {
  const parsed = parseDateOnly(spanishRegistrationDate);
  if (!parsed) return null;
  const quarter = Math.floor((parsed.month - 1) / 3) + 1;
  return {
    quarter,
    remainingQuarters: 5 - quarter,
    rounding: "round-half-up-to-cent-after-quarter-proration",
  };
}

function baseOutput(overrides = {}) {
  return finalizeResult({
    supportedCalculation: false,
    taxAmount: null,
    baseAnnualQuota: null,
    municipalAnnualQuota: null,
    municipalCoefficient: null,
    grossAnnualTax: null,
    proratedTax: null,
    bonusRate: null,
    bonusAmount: null,
    finalTax: null,
    referenceAnnualTax: null,
    referenceProratedTax: null,
    minimumAmount: null,
    maximumAmount: null,
    prudentBudget: null,
    municipality: null,
    municipalityCode: null,
    province: null,
    autonomousCommunity: null,
    taxYear: null,
    ratesYear: null,
    fiscalHorsepower: null,
    horsepowerBand: null,
    quarter: null,
    remainingQuarters: null,
    filingRequirement: "unknown",
    paymentRequirement: "unknown",
    dataStatus: IVTM_DATA_STATUSES.MISSING,
    legalBasis: LEGAL_BASIS,
    source: buildSource(null, null),
    scenarios: [],
    assumptions: [],
    warnings: [],
    warningCodes: [],
    missingFields: [],
    ...overrides,
  });
}

function buildSource(municipality, rate, metadata = null) {
  return {
    municipalityCatalog: municipality
      ? { id: "ine-municipality-catalog-2026", catalogYear: municipality.catalogYear ?? null }
      : null,
    municipalRates: rate
      ? { id: rate.sourceId ?? "hacienda-ivtm-2025-all-municipalities", ratesYear: rate.ratesYear ?? null, dataStatus: rate.dataStatus ?? null }
      : null,
    metadata: metadata
      ? {
          generatorVersion: metadata.generatorVersion ?? null,
          datasetSha256: cloneJson(metadata.datasetSha256 ?? null),
        }
      : null,
  };
}

function municipalityFields(municipality) {
  if (!municipality) return { municipality: null, province: null, autonomousCommunity: null };
  return {
    municipality: {
      ineCode: municipality.ineCode,
      name: municipality.name,
      catalogYear: municipality.catalogYear,
    },
    province: {
      code: municipality.provinceCode,
      name: municipality.provinceName,
    },
    autonomousCommunity: {
      code: municipality.autonomousCommunityCode,
      name: municipality.autonomousCommunityName,
    },
  };
}

function legalRangeCents(baseAnnualCents, remainingQuarters) {
  return {
    minimumCents: prorateCents(baseAnnualCents, remainingQuarters),
    maximumCents: prorateCents(baseAnnualCents * 2, remainingQuarters),
  };
}

function calculateAmountsForBand({ band, rate, remainingQuarters }) {
  const baseAnnualCents = STATE_TOURISM_QUOTAS_CENTS[band.key];
  const municipalAnnualCents = rate?.annualQuotaCents?.[band.key] ?? null;
  const referenceProratedCents = Number.isInteger(municipalAnnualCents)
    ? prorateCents(municipalAnnualCents, remainingQuarters)
    : null;
  const { minimumCents, maximumCents } = legalRangeCents(baseAnnualCents, remainingQuarters);
  return {
    baseAnnualCents,
    municipalAnnualCents,
    referenceProratedCents,
    minimumCents,
    maximumCents,
  };
}

function bonusPotentialRate(input) {
  const zeroPotential = input.zeroEmissionStatus === IVTM_ZERO_EMISSION_STATUSES.CONFIRMED ? 0.75 : 0;
  const historicPotential = input.isHistoricVehicle === true ? 1 : 0;
  return Math.max(zeroPotential, historicPotential);
}

function buildScenario({ id, label, taxAmount = null, bonusRate = null, dataStatus, warningCodes = [], assumptions = [], source = null, extra = {} }) {
  const scenario = {
    id,
    label,
    taxAmount,
    bonusRate,
    dataStatus,
    assumptions: uniqueStrings(assumptions),
    warnings: warningsFromCodes(warningCodes),
    warningCodes: normalizeWarningCodes(warningCodes),
    source: cloneJson(source),
    ...extra,
  };
  return cloneJson(scenario);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isHttpsUrl(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function bonusReasonContract(reason) {
  if (reason === "environmental") return { maximumRate: 0.75, requiredStatus: "environmental" };
  if (reason === "historic") return { maximumRate: 1, requiredStatus: "historic" };
  if (reason === "age_25_plus") return { maximumRate: 1, requiredStatus: "age_25_plus" };
  return null;
}

function validateBonusEligibility({ input, evidence, warningCodes, assumptions }) {
  if (evidence.reason === "environmental" && input.zeroEmissionStatus !== IVTM_ZERO_EMISSION_STATUSES.CONFIRMED) {
    warningCodes.push(IVTM_WARNING_CODES.BONUS_ELIGIBILITY_MISMATCH);
    return false;
  }
  if (evidence.reason === "historic" && input.isHistoricVehicle !== true) {
    warningCodes.push(IVTM_WARNING_CODES.BONUS_ELIGIBILITY_MISMATCH);
    return false;
  }
  if (evidence.reason === "age_25_plus") {
    assumptions.push("La antiguedad minima de 25 anos ha sido acreditada externamente mediante la ordenanza o documentacion aportada.");
  }
  return true;
}

function applyConfirmedBonus({ input, proratedCents, municipalityCode, taxYear, warningCodes, missingFields, assumptions }) {
  if (input.bonusStatus !== IVTM_BONUS_STATUSES.CONFIRMED) {
    return { invalid: false, bonusRate: 0, bonusAmountCents: 0, finalCents: proratedCents };
  }
  const rate = input.confirmedBonusRate;
  if (!Number.isFinite(rate) || rate < 0 || rate > 1) {
    warningCodes.push(IVTM_WARNING_CODES.INVALID_BONUS_RATE);
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }
  const evidence = input.bonusEvidence;
  if (!isPlainObject(evidence)) {
    warningCodes.push(IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED);
    missingFields.push("bonusEvidence");
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }

  const contract = bonusReasonContract(evidence.reason);
  if (!contract) {
    warningCodes.push(evidence.reason ? IVTM_WARNING_CODES.BONUS_REASON_UNSUPPORTED : IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED);
    if (!evidence.reason) missingFields.push("bonusEvidence.reason");
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }

  const missingEvidenceFields = [];
  if (!Number.isFinite(evidence.confirmedRate)) missingEvidenceFields.push("bonusEvidence.confirmedRate");
  if (typeof evidence.municipalityCode !== "string") missingEvidenceFields.push("bonusEvidence.municipalityCode");
  if (!Number.isInteger(evidence.taxYear)) missingEvidenceFields.push("bonusEvidence.taxYear");
  if (!isHttpsUrl(evidence.sourceUrl)) missingEvidenceFields.push("bonusEvidence.sourceUrl");
  if (evidence.eligibilityConfirmed !== true) missingEvidenceFields.push("bonusEvidence.eligibilityConfirmed");
  if (missingEvidenceFields.length > 0) {
    warningCodes.push(evidence.eligibilityConfirmed === false ? IVTM_WARNING_CODES.BONUS_ELIGIBILITY_MISMATCH : IVTM_WARNING_CODES.BONUS_EVIDENCE_REQUIRED);
    missingFields.push(...missingEvidenceFields);
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }

  if (evidence.confirmedRate !== rate || evidence.municipalityCode !== municipalityCode || evidence.taxYear !== taxYear) {
    warningCodes.push(IVTM_WARNING_CODES.BONUS_EVIDENCE_MISMATCH);
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }
  if (!validateBonusEligibility({ input, evidence, warningCodes, assumptions })) {
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }
  if (rate > contract.maximumRate) {
    warningCodes.push(IVTM_WARNING_CODES.INVALID_BONUS_RATE);
    return { invalid: true, bonusRate: null, bonusAmountCents: null, finalCents: null };
  }

  const bonusAmountCents = Math.round(proratedCents * rate);
  return { invalid: false, bonusRate: rate, bonusAmountCents, finalCents: Math.max(0, proratedCents - bonusAmountCents) };
}

function appendBonusScenarios({ input, scenarios, referenceCents, source }) {
  const potentialRate = bonusPotentialRate(input);
  if (potentialRate <= 0 || !Number.isInteger(referenceCents)) return;
  if (![IVTM_BONUS_STATUSES.POSSIBLE, IVTM_BONUS_STATUSES.UNKNOWN].includes(input.bonusStatus)) return;
  const discountedCents = Math.max(0, referenceCents - Math.round(referenceCents * potentialRate));
  scenarios.push(
    buildScenario({
      id: potentialRate === 1 ? "possible_historic_bonus" : "possible_zero_emission_bonus",
      label: potentialRate === 1 ? "Posible bonificacion historico hasta 100%" : "Posible bonificacion cero emisiones hasta 75%",
      taxAmount: centsToEuros(discountedCents),
      bonusRate: potentialRate,
      dataStatus: IVTM_DATA_STATUSES.ESTIMATED_RANGE,
      warningCodes: [IVTM_WARNING_CODES.BONUS_STATUS_UNKNOWN],
      assumptions: ["La bonificacion es solo potencial y exige ordenanza municipal o evidencia externa."],
      source,
    })
  );
}

function missingHorsepowerScenarios({ rate, remainingQuarters, dataStatus, source }) {
  return IVTM_HORSEPOWER_BANDS.map((band) => {
    const amounts = calculateAmountsForBand({ band, rate, remainingQuarters });
    const annualCents = Number.isInteger(amounts.municipalAnnualCents) ? amounts.municipalAnnualCents : amounts.baseAnnualCents * 2;
    const proratedCents = prorateCents(annualCents, remainingQuarters);
    return buildScenario({
      id: `horsepower_${band.key}`,
      label: band.label,
      taxAmount: dataStatus === IVTM_DATA_STATUSES.VERIFIED_MUNICIPAL ? centsToEuros(proratedCents) : null,
      dataStatus,
      assumptions: ["Escenario de tramo IVTM porque falta la potencia fiscal acreditada."],
      source,
      extra: {
        horsepowerBand: cloneJson(band),
        referenceProratedTax: Number.isInteger(amounts.referenceProratedCents) ? centsToEuros(amounts.referenceProratedCents) : null,
        minimumAmount: centsToEuros(amounts.minimumCents),
        maximumAmount: centsToEuros(amounts.maximumCents),
        prudentBudget: centsToEuros(Number.isInteger(amounts.referenceProratedCents) ? amounts.referenceProratedCents : amounts.maximumCents),
      },
    });
  });
}

function finalizeResult(result) {
  const warningCodes = normalizeWarningCodes(result.warningCodes);
  return {
    ...cloneJson(result),
    warnings: warningsFromCodes(warningCodes),
    warningCodes,
    missingFields: uniqueStrings(result.missingFields),
    assumptions: uniqueStrings(result.assumptions),
    legalBasis: cloneJson(result.legalBasis),
    source: cloneJson(result.source),
    scenarios: Array.isArray(result.scenarios) ? result.scenarios.map((scenario) => cloneJson(scenario)) : [],
  };
}

export function calculateMunicipalVehicleTax(input = {}, resolvedData = {}) {
  const warningCodes = [];
  const missingFields = [];
  const assumptions = [];
  const municipalityCode = canonicalMunicipalityCode(input.municipalityCode);
  const taxYear = parseTaxYear(input.taxYear);
  const registrationDate = parseDateOnly(input.spanishRegistrationDate);
  const vehicleType = input.vehicleType;

  if (!municipalityCode) warningCodes.push(IVTM_WARNING_CODES.INVALID_MUNICIPALITY_CODE);
  if (!taxYear) warningCodes.push(IVTM_WARNING_CODES.INVALID_INPUT);
  if (!registrationDate) warningCodes.push(IVTM_WARNING_CODES.INVALID_REGISTRATION_DATE);
  if (vehicleType !== IVTM_VEHICLE_TYPES.PASSENGER_CAR) warningCodes.push(IVTM_WARNING_CODES.VEHICLE_TYPE_UNSUPPORTED);

  const municipality = resolvedData?.municipality?.ineCode === municipalityCode ? resolvedData.municipality : null;
  const rate = municipality && resolvedData?.rate?.ineCode === municipalityCode ? resolvedData.rate : null;
  const metadata = resolvedData?.metadata ?? null;
  const source = buildSource(municipality, rate, metadata);

  if (!municipalityCode || !taxYear || !registrationDate || vehicleType !== IVTM_VEHICLE_TYPES.PASSENGER_CAR) {
    return baseOutput({
      municipalityCode,
      taxYear,
      fiscalHorsepower: Number.isFinite(input.fiscalHorsepower) ? input.fiscalHorsepower : null,
      warningCodes,
      missingFields,
    });
  }

  if (!municipality) {
    return baseOutput({
      municipalityCode,
      taxYear,
      warningCodes: [...warningCodes, IVTM_WARNING_CODES.MUNICIPALITY_NOT_FOUND],
      dataStatus: IVTM_DATA_STATUSES.MISSING,
    });
  }

  const proration = getIvtmProrationFromRegistrationDate(input.spanishRegistrationDate);
  if (registrationDate.year !== taxYear) {
    warningCodes.push(IVTM_WARNING_CODES.TAX_YEAR_DATE_CONFLICT);
  }

  const fiscalHorsepower = input.fiscalHorsepower;
  const hasFiscalHorsepower = fiscalHorsepower !== undefined && fiscalHorsepower !== null && fiscalHorsepower !== "";
  if (hasFiscalHorsepower && (!Number.isFinite(fiscalHorsepower) || fiscalHorsepower <= 0)) {
    warningCodes.push(IVTM_WARNING_CODES.INVALID_FISCAL_HORSEPOWER);
  }

  const bonusStatus = input.bonusStatus;
  if (![IVTM_BONUS_STATUSES.NOT_APPLICABLE, IVTM_BONUS_STATUSES.CONFIRMED, IVTM_BONUS_STATUSES.POSSIBLE, IVTM_BONUS_STATUSES.UNKNOWN].includes(bonusStatus)) {
    warningCodes.push(IVTM_WARNING_CODES.BONUS_STATUS_UNKNOWN);
  }
  if (bonusStatus === IVTM_BONUS_STATUSES.UNKNOWN) warningCodes.push(IVTM_WARNING_CODES.BONUS_STATUS_UNKNOWN);

  let dataStatus = IVTM_DATA_STATUSES.VERIFIED_MUNICIPAL;
  if (!rate) dataStatus = IVTM_DATA_STATUSES.ESTIMATED_RANGE;
  else if (rate.dataStatus === IVTM_DATA_STATUSES.REQUIRES_REVIEW) dataStatus = IVTM_DATA_STATUSES.REQUIRES_REVIEW;
  else if (rate.ratesYear !== taxYear) dataStatus = IVTM_DATA_STATUSES.OUTDATED;

  const common = {
    ...municipalityFields(municipality),
    municipalityCode,
    taxYear,
    ratesYear: rate?.ratesYear ?? null,
    quarter: proration.quarter,
    remainingQuarters: proration.remainingQuarters,
    dataStatus,
    source,
    assumptions,
  };

  if (!hasFiscalHorsepower) {
    warningCodes.push(IVTM_WARNING_CODES.FISCAL_HORSEPOWER_REQUIRED);
    missingFields.push("fiscalHorsepower");
    const scenarios = missingHorsepowerScenarios({ rate, remainingQuarters: proration.remainingQuarters, dataStatus, source });
    const prudent = Math.max(...scenarios.map((scenario) => scenario.prudentBudget ?? 0));
    return baseOutput({
      ...common,
      warningCodes,
      missingFields,
      scenarios,
      minimumAmount: Math.min(...scenarios.map((scenario) => scenario.minimumAmount)),
      maximumAmount: Math.max(...scenarios.map((scenario) => scenario.maximumAmount)),
      prudentBudget: prudent,
      filingRequirement: "required",
      paymentRequirement: "amount_pending",
    });
  }

  if (warningCodes.includes(IVTM_WARNING_CODES.INVALID_FISCAL_HORSEPOWER)) {
    return baseOutput({ ...common, fiscalHorsepower, warningCodes, missingFields: [...missingFields, "fiscalHorsepower"] });
  }

  const band = getIvtmHorsepowerBand(fiscalHorsepower);
  const amounts = calculateAmountsForBand({ band, rate, remainingQuarters: proration.remainingQuarters });
  const baseAnnualQuota = centsToEuros(amounts.baseAnnualCents);
  const minimumAmount = centsToEuros(amounts.minimumCents);
  const maximumAmount = centsToEuros(amounts.maximumCents);
  const municipalAnnualQuota = Number.isInteger(amounts.municipalAnnualCents) ? centsToEuros(amounts.municipalAnnualCents) : null;
  const referenceProratedTax = Number.isInteger(amounts.referenceProratedCents) ? centsToEuros(amounts.referenceProratedCents) : null;
  const municipalCoefficient = Number.isInteger(amounts.municipalAnnualCents)
    ? Number((amounts.municipalAnnualCents / amounts.baseAnnualCents).toFixed(4))
    : null;
  const scenarios = [];

  if (!rate) {
    warningCodes.push(IVTM_WARNING_CODES.MUNICIPAL_RATE_NOT_AVAILABLE);
    return baseOutput({
      ...common,
      fiscalHorsepower,
      horsepowerBand: band,
      baseAnnualQuota,
      minimumAmount,
      maximumAmount,
      prudentBudget: maximumAmount,
      warningCodes,
      missingFields,
      filingRequirement: "required",
      paymentRequirement: "amount_pending",
    });
  }

  if (rate.dataStatus === IVTM_DATA_STATUSES.REQUIRES_REVIEW) {
    warningCodes.push(IVTM_WARNING_CODES.MUNICIPAL_RATE_REQUIRES_REVIEW);
    return baseOutput({
      ...common,
      fiscalHorsepower,
      horsepowerBand: band,
      baseAnnualQuota,
      municipalAnnualQuota,
      municipalCoefficient,
      referenceAnnualTax: municipalAnnualQuota,
      referenceProratedTax,
      minimumAmount,
      maximumAmount,
      prudentBudget: maximumAmount,
      warningCodes,
      missingFields,
      assumptions: [...assumptions, "La cuota publicada se conserva como referencia y no se clampa."],
      filingRequirement: "required",
      paymentRequirement: "amount_pending",
    });
  }

  if (rate.ratesYear !== taxYear) {
    warningCodes.push(IVTM_WARNING_CODES.MUNICIPAL_RATE_YEAR_OUTDATED);
    scenarios.push(
      buildScenario({
        id: `reference_${rate.ratesYear}_municipal_rate`,
        label: `Referencia municipal ${rate.ratesYear}, no confirmada para ${taxYear}`,
        taxAmount: referenceProratedTax,
        dataStatus: IVTM_DATA_STATUSES.OUTDATED,
        warningCodes: [IVTM_WARNING_CODES.MUNICIPAL_RATE_YEAR_OUTDATED],
        assumptions: ["La tarifa municipal disponible no se usa como cuota exacta del ejercicio solicitado."],
        source,
      })
    );
    return baseOutput({
      ...common,
      fiscalHorsepower,
      horsepowerBand: band,
      baseAnnualQuota,
      municipalAnnualQuota,
      municipalCoefficient,
      referenceAnnualTax: municipalAnnualQuota,
      referenceProratedTax,
      minimumAmount,
      maximumAmount,
      prudentBudget: maximumAmount,
      scenarios,
      warningCodes,
      missingFields,
      filingRequirement: "required",
      paymentRequirement: "amount_pending",
    });
  }

  const proratedCents = amounts.referenceProratedCents;
  const bonus = applyConfirmedBonus({ input, proratedCents, municipalityCode, taxYear, warningCodes, missingFields, assumptions });
  appendBonusScenarios({ input: { ...input, bonusStatus }, scenarios, referenceCents: proratedCents, source });
  if ([IVTM_BONUS_STATUSES.POSSIBLE, IVTM_BONUS_STATUSES.UNKNOWN].includes(bonusStatus)) {
    warningCodes.push(IVTM_WARNING_CODES.BONUS_STATUS_UNKNOWN);
  }
  if (registrationDate.year !== taxYear) {
    return baseOutput({
      ...common,
      fiscalHorsepower,
      horsepowerBand: band,
      baseAnnualQuota,
      municipalAnnualQuota,
      municipalCoefficient,
      grossAnnualTax: municipalAnnualQuota,
      proratedTax: centsToEuros(proratedCents),
      referenceAnnualTax: municipalAnnualQuota,
      referenceProratedTax,
      minimumAmount,
      maximumAmount,
      prudentBudget: centsToEuros(proratedCents),
      scenarios,
      warningCodes,
      missingFields,
      filingRequirement: "required",
      paymentRequirement: "amount_pending",
    });
  }
  if (bonus.invalid) {
    return baseOutput({
      ...common,
      fiscalHorsepower,
      horsepowerBand: band,
      baseAnnualQuota,
      municipalAnnualQuota,
      municipalCoefficient,
      grossAnnualTax: municipalAnnualQuota,
      proratedTax: centsToEuros(proratedCents),
      referenceAnnualTax: municipalAnnualQuota,
      referenceProratedTax,
      minimumAmount,
      maximumAmount,
      prudentBudget: centsToEuros(proratedCents),
      scenarios,
      warningCodes,
      missingFields,
      filingRequirement: "required",
      paymentRequirement: "amount_pending",
    });
  }

  const finalTax = centsToEuros(bonus.finalCents);
  return baseOutput({
    ...common,
    supportedCalculation: true,
    taxAmount: finalTax,
    fiscalHorsepower,
    horsepowerBand: band,
    baseAnnualQuota,
    municipalAnnualQuota,
    municipalCoefficient,
    grossAnnualTax: municipalAnnualQuota,
    proratedTax: centsToEuros(proratedCents),
    bonusRate: bonus.bonusRate,
    bonusAmount: centsToEuros(bonus.bonusAmountCents),
    finalTax,
    referenceAnnualTax: municipalAnnualQuota,
    referenceProratedTax,
    minimumAmount,
    maximumAmount,
    prudentBudget: centsToEuros(proratedCents),
    scenarios,
    warningCodes,
    missingFields,
    filingRequirement: "required",
    paymentRequirement: "required",
    assumptions: bonus.bonusRate > 0 ? [...assumptions, "La bonificacion procede de evidencia externa estructurada no incluida en los datasets Hacienda."] : assumptions,
  });
}