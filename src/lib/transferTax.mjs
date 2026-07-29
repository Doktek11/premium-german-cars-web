import {
  getTransferTaxTerritoryRule,
  getTransferTaxTerritoryRules,
  normalizeTransferTaxTerritoryKey,
  TRANSFER_TAX_TERRITORY_STATUSES,
} from "../data/transferTaxRules.mjs";

export const SELLER_TYPES = {
  PRIVATE: "private",
  PROFESSIONAL: "professional",
  UNKNOWN: "unknown",
};

export const BUYER_TYPES = {
  PRIVATE: "private",
  PROFESSIONAL: "professional",
  VEHICLE_RESELLER: "vehicle_reseller",
  UNKNOWN: "unknown",
};

export const DOCUMENT_TYPES = {
  PRIVATE_SALE_CONTRACT: "private_sale_contract",
  INVOICE: "invoice",
  UNKNOWN: "unknown",
};

export const VAT_REGIMES = {
  NOT_APPLICABLE_PRIVATE_SALE: "not_applicable_private_sale",
  GENERAL_VAT: "general_vat",
  REBU: "rebu",
  VAT_NOT_ITEMIZED: "vat_not_itemized",
  UNKNOWN: "unknown",
};

export const ZERO_EMISSION_STATUSES = {
  CONFIRMED: "confirmed",
  NOT_ZERO_EMISSION: "not_zero_emission",
  UNKNOWN: "unknown",
};

export const TRANSFER_TAX_FILING_REQUIREMENTS = {
  REQUIRED: "required",
  NOT_REQUIRED: "not_required",
  CONDITIONAL: "conditional",
  UNKNOWN: "unknown",
};

export const TRANSFER_TAX_APPLICABILITY = {
  TAXABLE: "taxable",
  BONIFIED: "bonified",
  NOT_SUBJECT: "not_subject",
  FILING_NOT_REQUIRED: "filing_not_required",
  SCENARIO_REQUIRED: "scenario_required",
  REVIEW_REQUIRED: "review_required",
};

export const TRANSFER_TAX_WARNING_CODES = {
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_BUYER_REGION: "MISSING_BUYER_REGION",
  INVALID_BUYER_REGION: "INVALID_BUYER_REGION",
  MISSING_PURCHASE_PRICE: "MISSING_PURCHASE_PRICE",
  MISSING_OFFICIAL_MARKET_VALUE: "MISSING_OFFICIAL_MARKET_VALUE",
  UNKNOWN_SELLER_TYPE: "UNKNOWN_SELLER_TYPE",
  UNKNOWN_VAT_REGIME: "UNKNOWN_VAT_REGIME",
  TERRITORY_REQUIRES_REVIEW: "TERRITORY_REQUIRES_REVIEW",
  BUYER_PROVINCE_REQUIRED: "BUYER_PROVINCE_REQUIRED",
  INVALID_BUYER_PROVINCE: "INVALID_BUYER_PROVINCE",
  BUYER_REGION_PROVINCE_CONFLICT: "BUYER_REGION_PROVINCE_CONFLICT",
  RESELLER_EXEMPTION_REQUIRES_EVIDENCE: "RESELLER_EXEMPTION_REQUIRES_EVIDENCE",
  VEHICLE_CATEGORY_UNSUPPORTED: "VEHICLE_CATEGORY_UNSUPPORTED",
  MISSING_FIRST_REGISTRATION_DATE: "MISSING_FIRST_REGISTRATION_DATE",
  BUYER_TAX_RESIDENCE_CONFLICT: "BUYER_TAX_RESIDENCE_CONFLICT",
  INVALID_SELLER_COUNTRY: "INVALID_SELLER_COUNTRY",
  INVALID_BUYER_TAX_RESIDENCE_COUNTRY: "INVALID_BUYER_TAX_RESIDENCE_COUNTRY",
  OPERATION_CLASSIFICATION_CONFLICT: "OPERATION_CLASSIFICATION_CONFLICT",
  TERRITORY_RULE_NOT_EFFECTIVE: "TERRITORY_RULE_NOT_EFFECTIVE",
  FUTURE_TRANSACTION_DATE: "FUTURE_TRANSACTION_DATE",
  INVALID_OR_MISSING_TRANSACTION_DATE: "INVALID_OR_MISSING_TRANSACTION_DATE",
  HISTORIC_VEHICLE_REQUIRES_REVIEW: "HISTORIC_VEHICLE_REQUIRES_REVIEW",
  CATALONIA_ZERO_EMISSION_STATUS_REQUIRED: "CATALONIA_ZERO_EMISSION_STATUS_REQUIRED",
  CATALONIA_ORIGINAL_BOE_VALUE_REQUIRED: "CATALONIA_ORIGINAL_BOE_VALUE_REQUIRED",
  CATALONIA_HISTORIC_STATUS_REQUIRED: "CATALONIA_HISTORIC_STATUS_REQUIRED",
  CATALONIA_AGE_CALCULATION_ASSUMPTION: "CATALONIA_AGE_CALCULATION_ASSUMPTION",
  CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW: "CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW",
  CATALONIA_ZERO_EMISSION_NO_FILING_PRECEDENCE_REVIEW: "CATALONIA_ZERO_EMISSION_NO_FILING_PRECEDENCE_REVIEW",
  ANDALUSIA_ZERO_EMISSION_STATUS_REQUIRED: "ANDALUSIA_ZERO_EMISSION_STATUS_REQUIRED",
  ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED: "ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED",
  ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED: "ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED",
  BALEARIC_FISCAL_HORSEPOWER_REQUIRED: "BALEARIC_FISCAL_HORSEPOWER_REQUIRED",
  VALENCIA_END_OF_LIFE_STATUS_REQUIRED: "VALENCIA_END_OF_LIFE_STATUS_REQUIRED",
  VALENCIA_ENGINE_DISPLACEMENT_REQUIRED: "VALENCIA_ENGINE_DISPLACEMENT_REQUIRED",
  TERRITORY_HISTORIC_STATUS_REQUIRED: "TERRITORY_HISTORIC_STATUS_REQUIRED",
  GALICIA_ZERO_EMISSION_STATUS_REQUIRED: "GALICIA_ZERO_EMISSION_STATUS_REQUIRED",
  GALICIA_ENGINE_DISPLACEMENT_REQUIRED: "GALICIA_ENGINE_DISPLACEMENT_REQUIRED",
  MURCIA_ENGINE_DISPLACEMENT_REQUIRED: "MURCIA_ENGINE_DISPLACEMENT_REQUIRED",
  CANARY_ENGINE_DISPLACEMENT_REQUIRED: "CANARY_ENGINE_DISPLACEMENT_REQUIRED",
  MADRID_REDUCED_VALUATION_STATUS_REQUIRED: "MADRID_REDUCED_VALUATION_STATUS_REQUIRED",
  INVALID_EVIDENCE: "INVALID_EVIDENCE",
};

const WARNING_MESSAGES_BY_CODE = {
  [TRANSFER_TAX_WARNING_CODES.INVALID_INPUT]:
    "Los datos introducidos no permiten calcular el ITP con seguridad.",
  [TRANSFER_TAX_WARNING_CODES.MISSING_BUYER_REGION]:
    "Falta la comunidad autonoma competente por residencia fiscal del comprador.",
  [TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_REGION]:
    "La comunidad autonoma indicada no existe en la matriz territorial ITP.",
  [TRANSFER_TAX_WARNING_CODES.MISSING_PURCHASE_PRICE]:
    "Falta el precio o contraprestacion declarada; si supera el valor fiscal, la base ITP cambiaria.",
  [TRANSFER_TAX_WARNING_CODES.MISSING_OFFICIAL_MARKET_VALUE]:
    "Falta comprobar el valor fiscal BOE depreciado; el precio declarado no se toma como base confirmada.",
  [TRANSFER_TAX_WARNING_CODES.UNKNOWN_SELLER_TYPE]:
    "No consta si el vendedor actua como particular o profesional; se conservan escenarios separados.",
  [TRANSFER_TAX_WARNING_CODES.UNKNOWN_VAT_REGIME]:
    "El regimen de IVA de la factura profesional queda pendiente de revision documental.",
  [TRANSFER_TAX_WARNING_CODES.TERRITORY_REQUIRES_REVIEW]:
    "La regla autonomica de ITP para este territorio requiere revision antes de automatizar una cuota.",
  [TRANSFER_TAX_WARNING_CODES.BUYER_PROVINCE_REQUIRED]:
    "Pais Vasco o un regimen foral requiere provincia o territorio historico para decidir la regla aplicable.",
  [TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_PROVINCE]:
    "La provincia o territorio historico indicado no esta reconocido para resolver el regimen foral vasco.",
  [TRANSFER_TAX_WARNING_CODES.BUYER_REGION_PROVINCE_CONFLICT]:
    "La comunidad o territorio indicado y la provincia declarada se contradicen; no se elige administracion foral en silencio.",
  [TRANSFER_TAX_WARNING_CODES.RESELLER_EXEMPTION_REQUIRES_EVIDENCE]:
    "La exencion de revendedor es provisional y exige acreditar compraventa habitual, destino a reventa y venta en plazo.",
  [TRANSFER_TAX_WARNING_CODES.VEHICLE_CATEGORY_UNSUPPORTED]:
    "Esta primera fase solo automatiza turismos, todoterrenos y vehiculos mixtos adaptables.",
  [TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE]:
    "Falta la primera matriculacion para aplicar posibles cuotas fijas por antiguedad.",
  [TRANSFER_TAX_WARNING_CODES.BUYER_TAX_RESIDENCE_CONFLICT]:
    "La residencia fiscal extranjera del comprador entra en conflicto con la comunidad autonoma espanola indicada.",
  [TRANSFER_TAX_WARNING_CODES.INVALID_SELLER_COUNTRY]:
    "El pais del vendedor no se ha podido normalizar y queda pendiente de revision documental.",
  [TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_TAX_RESIDENCE_COUNTRY]:
    "La residencia fiscal del comprador no se ha podido normalizar y queda pendiente de revision documental.",
  [TRANSFER_TAX_WARNING_CODES.OPERATION_CLASSIFICATION_CONFLICT]:
    "Los datos de vendedor, documento y regimen de IVA se contradicen; no se elige una clasificacion fiscal en silencio.",
  [TRANSFER_TAX_WARNING_CODES.TERRITORY_RULE_NOT_EFFECTIVE]:
    "No existe una regla territorial versionada aplicable en la fecha de operacion indicada.",
  [TRANSFER_TAX_WARNING_CODES.FUTURE_TRANSACTION_DATE]:
    "La fecha de operacion es futura y no permite confirmar la cuota ITP vigente.",
  [TRANSFER_TAX_WARNING_CODES.INVALID_OR_MISSING_TRANSACTION_DATE]:
    "Falta una fecha de operacion valida para seleccionar la regla territorial versionada.",
  [TRANSFER_TAX_WARNING_CODES.HISTORIC_VEHICLE_REQUIRES_REVIEW]:
    "La fuente territorial excluye los vehiculos historicos de la cuota fija automatizada y exige revision antes de confirmar una cuota.",
  [TRANSFER_TAX_WARNING_CODES.CATALONIA_ZERO_EMISSION_STATUS_REQUIRED]:
    "Cataluna exige confirmar si el vehiculo tiene distintivo ambiental 0 emisiones para elegir entre tipo 0% y tipo general.",
  [TRANSFER_TAX_WARNING_CODES.CATALONIA_ORIGINAL_BOE_VALUE_REQUIRED]:
    "Cataluna exige el valor BOE original sin depreciacion para decidir la no obligacion de presentar en vehiculos de diez anos o mas.",
  [TRANSFER_TAX_WARNING_CODES.CATALONIA_HISTORIC_STATUS_REQUIRED]:
    "Cataluna excluye los vehiculos historicos de la no obligacion de presentar y no se asume estado no historico sin evidencia.",
  [TRANSFER_TAX_WARNING_CODES.CATALONIA_AGE_CALCULATION_ASSUMPTION]:
    "Cataluna no cierra en la fuente auditada el computo exacto de diez anos; se usa provisionalmente aniversario exacto y se conservan escenarios si falta el dia.",
  [TRANSFER_TAX_WARNING_CODES.CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW]:
    "La interaccion entre tipo 0% de Cataluna y la regla de no obligacion de presentar para vehiculos antiguos requiere revision; se conservan escenarios de obligacion formal.",
  [TRANSFER_TAX_WARNING_CODES.CATALONIA_ZERO_EMISSION_NO_FILING_PRECEDENCE_REVIEW]:
    "La interaccion entre tipo 0% de Cataluna y la regla de no obligacion de presentar para vehiculos antiguos requiere revision; se conservan escenarios.",
  [TRANSFER_TAX_WARNING_CODES.ANDALUSIA_ZERO_EMISSION_STATUS_REQUIRED]:
    "Andalucia exige confirmar el distintivo ambiental 0 emisiones para elegir entre tipo reducido 1% y la regla ordinaria o incrementada.",
  [TRANSFER_TAX_WARNING_CODES.ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED]:
    "Andalucia exige potencia fiscal para decidir si el turismo o todoterreno supera 15 CVF y tributa al 8%.",
  [TRANSFER_TAX_WARNING_CODES.ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED]:
    "Andalucia tiene un tipo excepcional 0% para reposicion de vehiculos danados por DANA con devengo hasta 2025-12-31; falta evidencia de cumplimiento o descarte.",
  [TRANSFER_TAX_WARNING_CODES.BALEARIC_FISCAL_HORSEPOWER_REQUIRED]:
    "Illes Balears exige potencia fiscal para decidir si el turismo o todoterreno supera 15 CVF y tributa al 8%.",
  [TRANSFER_TAX_WARNING_CODES.VALENCIA_END_OF_LIFE_STATUS_REQUIRED]:
    "Comunitat Valenciana exige evidencia de fin de vida util cuando puede aplicar el tipo especial del 2%; no se asume estado negativo.",
  [TRANSFER_TAX_WARNING_CODES.VALENCIA_ENGINE_DISPLACEMENT_REQUIRED]:
    "Comunitat Valenciana exige cilindrada para decidir entre cuota fija, tipo general o tipo incrementado.",
  [TRANSFER_TAX_WARNING_CODES.TERRITORY_HISTORIC_STATUS_REQUIRED]:
    "La regla territorial cambia si el vehiculo ha sido calificado como historico; se conservan escenarios historico/no historico.",
  [TRANSFER_TAX_WARNING_CODES.GALICIA_ZERO_EMISSION_STATUS_REQUIRED]:
    "Galicia exige confirmar el distintivo ambiental 0 emisiones para elegir entre tipo 0% y la regla ordinaria o cuota fija.",
  [TRANSFER_TAX_WARNING_CODES.GALICIA_ENGINE_DISPLACEMENT_REQUIRED]:
    "Galicia exige cilindrada para decidir la cuota fija de turismos o todoterrenos con uso igual o superior a quince anos.",
  [TRANSFER_TAX_WARNING_CODES.MURCIA_ENGINE_DISPLACEMENT_REQUIRED]:
    "Murcia exige cilindrada para decidir la cuota fija de vehiculos con mas de doce anos y si existe no obligacion de presentar.",
  [TRANSFER_TAX_WARNING_CODES.CANARY_ENGINE_DISPLACEMENT_REQUIRED]:
    "Canarias exige cilindrada para decidir la cuota fija de turismos a motor usados con mas de diez anos.",
  [TRANSFER_TAX_WARNING_CODES.MADRID_REDUCED_VALUATION_STATUS_REQUIRED]:
    "Madrid reduce al 70% el valor ministerial si el vehiculo fue taxi, autoescuela o alquiler sin conductor durante mas de seis meses; falta evidencia de cumplimiento o descarte.",
  [TRANSFER_TAX_WARNING_CODES.INVALID_EVIDENCE]:
    "La evidencia documental no es JSON serializable y se ha descartado sin alterar el calculo fiscal.",
};

const SUPPORTED_VEHICLE_CATEGORIES = new Set([
  "passenger_car",
  "turismo",
  "suv",
  "todoterreno",
  "mixed_adaptable",
  "vehiculo_mixto_adaptable",
]);

const CATEGORY_ALIASES = new Map([
  ["turismo", "passenger_car"],
  ["passenger_car", "passenger_car"],
  ["suv", "suv"],
  ["todoterreno", "suv"],
  ["mixed_adaptable", "mixed_adaptable"],
  ["vehiculo_mixto_adaptable", "mixed_adaptable"],
]);

const BASQUE_PROVINCE_RULE_IDS = new Set(["alava", "bizkaia", "gipuzkoa"]);

const COUNTRY_ALIASES = new Map([
  ["es", "ES"],
  ["espana", "ES"],
  ["reino_de_espana", "ES"],
  ["spain", "ES"],
  ["de", "DE"],
  ["alemania", "DE"],
  ["germany", "DE"],
  ["deutschland", "DE"],
  ["republica_federal_de_alemania", "DE"],
]);
export function calculateTransferTax(input = {}) {
  const evidenceResult = sanitizeEvidence(input.evidence);
  const evidence = evidenceResult.value;
  const globalWarningCodes = [];
  const globalAssumptions = [];
  const globalMissingFields = [];
  const sellerType = normalizeEnum(input.sellerType, Object.values(SELLER_TYPES), SELLER_TYPES.UNKNOWN);
  const buyerType = normalizeEnum(input.buyerType, Object.values(BUYER_TYPES), BUYER_TYPES.UNKNOWN);
  const documentType = normalizeEnum(input.documentType, Object.values(DOCUMENT_TYPES), DOCUMENT_TYPES.UNKNOWN);
  const vatRegime = normalizeEnum(input.vatRegime, Object.values(VAT_REGIMES), VAT_REGIMES.UNKNOWN);
  const zeroEmissionStatus = normalizeEnum(input.zeroEmissionStatus, Object.values(ZERO_EMISSION_STATUSES), ZERO_EMISSION_STATUSES.UNKNOWN);
  const vehicleCategory = normalizeVehicleCategory(input.vehicleCategory);
  const purchasePrice = parsePositiveMoney(input.purchasePrice);
  const officialMarketValue = parsePositiveMoney(input.officialMarketValue);
  const originalBoeValue = parsePositiveMoney(input.originalBoeValue);
  const engineDisplacement = parsePositiveNumber(input.engineDisplacement);
  const fiscalHorsepower = parsePositiveNumber(input.fiscalHorsepower);
  const buyerTaxResidenceCountry = normalizeCountry(input.buyerTaxResidenceCountry);
  const sellerCountry = normalizeCountry(input.sellerCountry);
  const territoryContext = resolveTerritoryContext(input.buyerRegion, input.buyerProvince, input.transactionDate);
  const normalizedCountries = {
    buyerTaxResidenceCountry: buyerTaxResidenceCountry.code,
    sellerCountry: sellerCountry.code,
  };

  if (evidenceResult.invalid) {
    globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_EVIDENCE);
  }

  addInvalidIfPresent(globalWarningCodes, "purchasePrice", input.purchasePrice, purchasePrice);
  addInvalidIfPresent(globalWarningCodes, "officialMarketValue", input.officialMarketValue, officialMarketValue);
  addInvalidIfPresent(globalWarningCodes, "originalBoeValue", input.originalBoeValue, originalBoeValue);
  addInvalidIfPresent(globalWarningCodes, "engineDisplacement", input.engineDisplacement, engineDisplacement);
  addInvalidIfPresent(globalWarningCodes, "fiscalHorsepower", input.fiscalHorsepower, fiscalHorsepower);

  if (sellerCountry.invalid) {
    globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_SELLER_COUNTRY);
  } else if (sellerCountry.code) {
    globalAssumptions.push(`Pais del vendedor normalizado como ${sellerCountry.code}; no altera por si solo la cuota ITP.`);
  }

  if (buyerTaxResidenceCountry.invalid) {
    globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_TAX_RESIDENCE_COUNTRY);
  } else if (!buyerTaxResidenceCountry.code && territoryContext.hasRecognizedSpanishRegion) {
    globalAssumptions.push("Se infiere provisionalmente residencia fiscal espanola del comprador a partir de la comunidad autonoma declarada.");
  } else if (buyerTaxResidenceCountry.code === "ES") {
    globalAssumptions.push("Residencia fiscal del comprador normalizada como ES.");
  }

  const buyerResidenceConflict =
    buyerTaxResidenceCountry.code !== null &&
    buyerTaxResidenceCountry.code !== "ES" &&
    territoryContext.hasRecognizedSpanishRegion;
  if (buyerResidenceConflict) {
    globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.BUYER_TAX_RESIDENCE_CONFLICT);
  }

  const operationConflict = getOperationClassificationConflict({ sellerType, documentType, vatRegime });
  if (operationConflict) {
    globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.OPERATION_CLASSIFICATION_CONFLICT);
    globalAssumptions.push(operationConflict);
  }

  const calculationContext = {
    input,
    territoryContext,
    vehicleCategory,
    purchasePrice,
    officialMarketValue,
    originalBoeValue,
    zeroEmissionStatus,
    engineDisplacement,
    fiscalHorsepower,
    evidence,
    normalizedCountries,
  };

  if (operationConflict) {
    return buildScenarioRequiredResult({
      territoryContext,
      scenarios: buildPrivateAndProfessionalScenarios({
        ...calculationContext,
        privateScenarioId: "operation_private_sale",
        privateScenarioLabel: "Escenario si la operacion fuera entre particulares",
        professionalScenarioId: "operation_professional_sale",
        professionalScenarioLabel: "Escenario si la operacion fuera profesional",
      }),
      warningCodes: globalWarningCodes,
      assumptions: globalAssumptions,
      missingFields: globalMissingFields,
      evidence,
      normalizedCountries,
    });
  }

  if (buyerResidenceConflict || buyerTaxResidenceCountry.invalid) {
    const conditionalPrivateScenario = calculateTaxableScenario({
      ...calculationContext,
      scenarioId: "buyer_spanish_tax_residence_condition",
      scenarioLabel: "Escenario condicional si el comprador fuera residente fiscal en Espana",
      additionalAssumptions: ["Escenario solo presupuestario; no confirma sujecion con la residencia fiscal extranjera indicada."],
    });

    return buildScenarioRequiredResult({
      territoryContext,
      scenarios: [conditionalPrivateScenario],
      warningCodes: globalWarningCodes,
      assumptions: globalAssumptions,
      missingFields: globalMissingFields,
      evidence,
      normalizedCountries,
    });
  }

  if (sellerType === SELLER_TYPES.PROFESSIONAL) {
    if (vatRegime === VAT_REGIMES.UNKNOWN || vatRegime === VAT_REGIMES.VAT_NOT_ITEMIZED) {
      globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.UNKNOWN_VAT_REGIME);
    }

    const professionalResult = buildProfessionalScenario({
      id: null,
      label: null,
      territoryContext,
      evidence,
      normalizedCountries,
    });

    return buildResult({
      applicability: professionalResult.applicability,
      supportedCalculation: professionalResult.supportedCalculation,
      taxAmount: professionalResult.taxAmount,
      probableAmount: professionalResult.probableAmount,
      minimumAmount: professionalResult.minimumAmount,
      maximumAmount: professionalResult.maximumAmount,
      prudentBudget: professionalResult.prudentBudget,
      taxableBase: professionalResult.taxableBase,
      rate: professionalResult.rate,
      fixedFee: professionalResult.fixedFee,
      territoryRule: territoryContext.rule,
      legalBasis: professionalResult.legalBasis,
      scenarios: [],
      filingRequirement: professionalResult.filingRequirement,
      filingForm: professionalResult.filingForm,
      assumptions: [
        ...globalAssumptions,
        "Vendedor profesional confirmado; la operacion queda fuera de TPO aunque la factura aplique regimen general, REBU o IVA no desglosado.",
      ],
      warnings: getWarningsFromCodes(globalWarningCodes),
      warningCodes: dedupeWarningCodes(globalWarningCodes),
      missingFields: globalMissingFields,
      evidence,
      normalizedCountries,
    });
  }

  if (sellerType === SELLER_TYPES.UNKNOWN) {
    globalWarningCodes.push(TRANSFER_TAX_WARNING_CODES.UNKNOWN_SELLER_TYPE);
    return buildScenarioRequiredResult({
      territoryContext,
      scenarios: buildPrivateAndProfessionalScenarios({
        ...calculationContext,
        privateScenarioId: "seller_private",
        privateScenarioLabel: "Vendedor particular",
        professionalScenarioId: "seller_professional",
        professionalScenarioLabel: "Vendedor profesional",
      }),
      warningCodes: globalWarningCodes,
      assumptions: globalAssumptions,
      missingFields: globalMissingFields,
      evidence,
      normalizedCountries,
    });
  }

  const taxableScenario = calculateTaxableScenario({
    ...calculationContext,
    scenarioId: "confirmed_private_sale",
    scenarioLabel: "Vendedor particular",
  });

  if (buyerType === BUYER_TYPES.VEHICLE_RESELLER || input.intendedForResale === true) {
    const resellerWarningCodes = dedupeWarningCodes([
      ...globalWarningCodes,
      ...taxableScenario.warningCodes,
      TRANSFER_TAX_WARNING_CODES.RESELLER_EXEMPTION_REQUIRES_EVIDENCE,
    ]);
    const exemptionScenario = buildScenario({
      id: "reseller_provisional_exemption",
      label: "Posible exencion provisional de revendedor",
      applicability: TRANSFER_TAX_APPLICABILITY.SCENARIO_REQUIRED,
      supportedCalculation: false,
      taxAmount: null,
      probableAmount: null,
      minimumAmount: 0,
      maximumAmount: 0,
      prudentBudget: 0,
      taxableBase: taxableScenario.taxableBase,
      rate: 0,
      fixedFee: null,
      filingRequirement: TRANSFER_TAX_FILING_REQUIREMENTS.REQUIRED,
      filingForm: "620",
      territoryRule: taxableScenario.territoryRule,
      territoryStatus: taxableScenario.territoryStatus,
      legalBasis: [legalBasis("TRLITPAJD", "Articulo 45.I.B.17", "Exencion provisional para empresarios dedicados habitualmente a la compraventa de vehiculos usados que adquieren para reventa.")],
      assumptions: ["La exencion estatal solo se eleva a definitiva si se acredita la venta del vehiculo dentro del ano siguiente."],
      warnings: getWarningsFromCodes([TRANSFER_TAX_WARNING_CODES.RESELLER_EXEMPTION_REQUIRES_EVIDENCE]),
      warningCodes: [TRANSFER_TAX_WARNING_CODES.RESELLER_EXEMPTION_REQUIRES_EVIDENCE],
      missingFields: [],
      evidence,
      normalizedCountries,
    });
    const scenarios = [...(taxableScenario.alternativeScenarios ?? [taxableScenario]), exemptionScenario];

    return buildResult({
      applicability: TRANSFER_TAX_APPLICABILITY.SCENARIO_REQUIRED,
      supportedCalculation: false,
      taxAmount: null,
      probableAmount: null,
      minimumAmount: minScenarioAmount(scenarios),
      maximumAmount: maxScenarioAmount(scenarios),
      prudentBudget: maxScenarioAmount(scenarios),
      taxableBase: taxableScenario.taxableBase,
      rate: taxableScenario.rate,
      fixedFee: taxableScenario.fixedFee,
      territoryRule: territoryContext.rule,
      legalBasis: taxableScenario.legalBasis,
      scenarios,
      filingRequirement: mergeScenarioFilingRequirement(scenarios),
      filingForm: mergeScenarioFilingForm(scenarios),
      assumptions: [...globalAssumptions, ...taxableScenario.assumptions],
      warnings: getWarningsFromCodes(resellerWarningCodes),
      warningCodes: resellerWarningCodes,
      missingFields: uniqueStrings([...globalMissingFields, ...taxableScenario.missingFields]),
      evidence,
      normalizedCountries,
    });
  }

  const resultWarningCodes = dedupeWarningCodes([...globalWarningCodes, ...taxableScenario.warningCodes]);
  if (taxableScenario.alternativeScenarios) {
    const scenarios = taxableScenario.alternativeScenarios;
    return buildResult({
      applicability: TRANSFER_TAX_APPLICABILITY.SCENARIO_REQUIRED,
      supportedCalculation: false,
      taxAmount: null,
      probableAmount: null,
      minimumAmount: minScenarioAmount(scenarios),
      maximumAmount: maxScenarioAmount(scenarios),
      prudentBudget: maxScenarioAmount(scenarios),
      taxableBase: taxableScenario.taxableBase,
      rate: null,
      fixedFee: null,
      territoryRule: territoryContext.rule,
      legalBasis: taxableScenario.legalBasis,
      scenarios,
      filingRequirement: mergeScenarioFilingRequirement(scenarios),
      filingForm: mergeScenarioFilingForm(scenarios),
      assumptions: [...globalAssumptions, ...taxableScenario.assumptions],
      warnings: getWarningsFromCodes(resultWarningCodes),
      warningCodes: resultWarningCodes,
      missingFields: uniqueStrings([...globalMissingFields, ...taxableScenario.missingFields]),
      evidence,
      normalizedCountries,
    });
  }

  return buildResult({
    applicability: taxableScenario.applicability,
    supportedCalculation: taxableScenario.supportedCalculation,
    taxAmount: taxableScenario.taxAmount,
    probableAmount: taxableScenario.probableAmount,
    minimumAmount: taxableScenario.minimumAmount,
    maximumAmount: taxableScenario.maximumAmount,
    prudentBudget: taxableScenario.prudentBudget,
    taxableBase: taxableScenario.taxableBase,
    rate: taxableScenario.rate,
    fixedFee: taxableScenario.fixedFee,
    territoryRule: territoryContext.rule,
    legalBasis: taxableScenario.legalBasis,
    scenarios: [],
    filingRequirement: taxableScenario.filingRequirement,
    filingForm: taxableScenario.filingForm,
    assumptions: [...globalAssumptions, ...taxableScenario.assumptions],
    warnings: getWarningsFromCodes(resultWarningCodes),
    warningCodes: resultWarningCodes,
    missingFields: uniqueStrings([...globalMissingFields, ...taxableScenario.missingFields]),
    evidence,
    normalizedCountries,
  });
}
function buildPrivateAndProfessionalScenarios({
  privateScenarioId,
  privateScenarioLabel,
  professionalScenarioId,
  professionalScenarioLabel,
  ...calculationContext
}) {
  return [
    calculateTaxableScenario({
      ...calculationContext,
      scenarioId: privateScenarioId,
      scenarioLabel: privateScenarioLabel,
    }),
    buildProfessionalScenario({
      id: professionalScenarioId,
      label: professionalScenarioLabel,
      territoryContext: calculationContext.territoryContext,
      evidence: calculationContext.evidence,
      normalizedCountries: calculationContext.normalizedCountries,
    }),
  ];
}

function buildScenarioRequiredResult({
  territoryContext,
  scenarios,
  warningCodes,
  assumptions,
  missingFields,
  evidence,
  normalizedCountries,
  filingRequirement,
  filingForm,
}) {
  return buildResult({
    applicability: TRANSFER_TAX_APPLICABILITY.SCENARIO_REQUIRED,
    supportedCalculation: false,
    taxAmount: null,
    probableAmount: null,
    minimumAmount: minScenarioAmount(scenarios),
    maximumAmount: maxScenarioAmount(scenarios),
    prudentBudget: maxScenarioAmount(scenarios),
    taxableBase: null,
    rate: null,
    fixedFee: null,
    territoryRule: territoryContext.rule,
    legalBasis: [],
    scenarios,
    filingRequirement: mergeScenarioFilingRequirement(scenarios),
    filingForm: mergeScenarioFilingForm(scenarios),
    assumptions,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    evidence,
    normalizedCountries,
  });
}

function buildProfessionalScenario({ id, label, territoryContext, evidence, normalizedCountries }) {
  return buildScenario({
    id,
    label,
    applicability: TRANSFER_TAX_APPLICABILITY.NOT_SUBJECT,
    supportedCalculation: true,
    taxAmount: 0,
    probableAmount: 0,
    minimumAmount: 0,
    maximumAmount: 0,
    prudentBudget: 0,
    taxableBase: null,
    rate: null,
    fixedFee: null,
    territoryRule: territoryContext.rule?.id ?? null,
    territoryStatus: territoryContext.rule?.status ?? null,
    legalBasis: [legalBasis("TRLITPAJD", "Articulo 7.5", "No sujecion de operaciones realizadas por empresarios o profesionales.")],
    assumptions: [
      "Operacion no sujeta a TPO si el vendedor actua como profesional en el ejercicio de su actividad.",
      "El modelo 620 puede utilizarse con cuota cero para acreditar la no sujecion ante DGT cuando sea necesario para el cambio de titularidad.",
    ],
    filingRequirement: TRANSFER_TAX_FILING_REQUIREMENTS.CONDITIONAL,
    filingForm: "620",
    warnings: [],
    warningCodes: [],
    missingFields: [],
    evidence,
    normalizedCountries,
  });
}

function calculateTaxableScenario({
  input,
  territoryContext,
  vehicleCategory,
  purchasePrice,
  officialMarketValue,
  originalBoeValue,
  zeroEmissionStatus,
  engineDisplacement,
  fiscalHorsepower,
  evidence,
  normalizedCountries,
  scenarioId,
  scenarioLabel,
  additionalAssumptions = [],
}) {
  const warningCodes = [...territoryContext.warningCodes];
  const missingFields = [...territoryContext.missingFields];
  const assumptions = [...additionalAssumptions];
  const territoryRule = territoryContext.rule;
  const legalBasisItems = [legalBasis("TRLITPAJD", "Articulos 7.1.A, 8.a y 10", "Operacion sujeta entre particulares, sujeto pasivo adquirente y base por mayor valor aplicable.")];

  if (territoryRule?.requiresProvince && !normalizeOptionalString(input.buyerProvince)) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.BUYER_PROVINCE_REQUIRED);
    missingFields.push("buyerProvince");
  }

  if (!territoryRule || territoryRule.status === TRANSFER_TAX_TERRITORY_STATUSES.REQUIRES_REVIEW) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.TERRITORY_REQUIRES_REVIEW);
  }

  if (vehicleCategory === null) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.VEHICLE_CATEGORY_UNSUPPORTED);
    missingFields.push("vehicleCategory");
  }

  if (purchasePrice === null) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.MISSING_PURCHASE_PRICE);
    missingFields.push("purchasePrice");
  }

  if (officialMarketValue === null) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.MISSING_OFFICIAL_MARKET_VALUE);
    missingFields.push("officialMarketValue");
  }

  const hasInvalidInput = [
    ["purchasePrice", input.purchasePrice, purchasePrice],
    ["officialMarketValue", input.officialMarketValue, officialMarketValue],
    ["originalBoeValue", input.originalBoeValue, originalBoeValue],
    ["engineDisplacement", input.engineDisplacement, engineDisplacement],
    ["fiscalHorsepower", input.fiscalHorsepower, fiscalHorsepower],
  ].some(([, rawValue, parsedValue]) => isPresent(rawValue) && parsedValue === null);

  if (hasInvalidInput) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_INPUT);
  }

  const territoryCanCalculate = Boolean(
    territoryRule &&
    territoryContext.canUseEffectiveRule &&
    !territoryRule.requiresProvince &&
    [TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED, TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS].includes(territoryRule.status) &&
    territoryRule.generalRate !== null
  );
  const baseResult = getTaxableBase({ purchasePrice, officialMarketValue });
  const foralScenarioRules = uniqueRules([
    ...(territoryContext.provincialRules ?? []),
    ...(territoryContext.conflictRules ?? []),
  ]);

  if (foralScenarioRules.length > 0) {
    return buildForalScenarioContainer({
      input,
      territoryRule,
      scenarioRules: foralScenarioRules,
      vehicleCategory,
      baseResult,
      warningCodes,
      missingFields,
      assumptions,
      legalBasisItems,
      hasInvalidInput,
      evidence,
      normalizedCountries,
      scenarioId,
      scenarioLabel,
    });
  }

  if (territoryRule?.id === "cataluna") {
    return calculateCataloniaTaxableScenario({
      input,
      territoryRule,
      territoryCanCalculate,
      vehicleCategory,
      purchasePrice,
      officialMarketValue,
      originalBoeValue,
      zeroEmissionStatus,
      baseResult,
      warningCodes,
      missingFields,
      assumptions,
      legalBasisItems,
      hasInvalidInput,
      evidence,
      normalizedCountries,
      scenarioId,
      scenarioLabel,
    });
  }

  if (["andalucia", "baleares", "comunidad_valenciana", "galicia", "murcia", "canarias", "madrid", "ceuta", "melilla"].includes(territoryRule?.id)) {
    return calculateExpandedTerritoryTaxableScenario({
      input,
      territoryRule,
      territoryCanCalculate,
      vehicleCategory,
      purchasePrice,
      officialMarketValue,
      zeroEmissionStatus,
      engineDisplacement,
      fiscalHorsepower,
      baseResult,
      warningCodes,
      missingFields,
      assumptions,
      legalBasisItems,
      hasInvalidInput,
      evidence,
      normalizedCountries,
      scenarioId,
      scenarioLabel,
    });
  }
  const appliedRule = territoryCanCalculate && vehicleCategory !== null
    ? getApplicableTerritoryRule({
        territoryRule,
        vehicleCategory,
        engineDisplacement,
        fiscalHorsepower,
        firstRegistrationDate: input.firstRegistrationDate,
        transactionDate: input.transactionDate,
        isHistoricVehicle: input.isHistoricVehicle === true,
      })
    : null;

  if (appliedRule?.warningCode) {
    warningCodes.push(appliedRule.warningCode);
    if (appliedRule.warningCode === TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE) {
      missingFields.push("firstRegistrationDate");
    }
  }

  const calculationBlockedBySpecialRule = appliedRule?.blocksCalculation === true;
  const rate = !calculationBlockedBySpecialRule && appliedRule?.rate !== undefined
    ? appliedRule.rate
    : (!calculationBlockedBySpecialRule && territoryCanCalculate ? territoryRule.generalRate : null);
  const fixedFee = !calculationBlockedBySpecialRule ? appliedRule?.fixedFee ?? null : null;
  const canConfirm = Boolean(
    !hasInvalidInput &&
    !calculationBlockedBySpecialRule &&
    territoryCanCalculate &&
    vehicleCategory !== null &&
    baseResult.confirmed &&
    (fixedFee !== null || rate !== null)
  );
  const canCalculateProvisional = Boolean(
    !hasInvalidInput &&
    !calculationBlockedBySpecialRule &&
    territoryCanCalculate &&
    vehicleCategory !== null &&
    baseResult.value !== null &&
    (fixedFee !== null || rate !== null)
  );
  const amount = canCalculateProvisional ? calculateAmount(baseResult.value, rate, fixedFee) : null;
  const minimumAmount = purchasePrice !== null && canCalculateProvisional
    ? calculateAmount(purchasePrice, rate, fixedFee)
    : amount;

  if (purchasePrice !== null && officialMarketValue !== null) {
    assumptions.push("Base ITP calculada como mayor entre precio declarado y valor fiscal oficial depreciado.");
  } else if (purchasePrice !== null) {
    assumptions.push("El precio declarado se conserva solo como escenario minimo hasta comprobar el valor fiscal oficial.");
  } else if (officialMarketValue !== null) {
    assumptions.push("Calculo provisional con valor fiscal oficial; falta confirmar que el precio declarado no sea superior.");
  }

  const valuationAssumption = getTerritoryValuationAssumption(territoryRule);
  if (valuationAssumption) {
    assumptions.push(valuationAssumption);
  }

  if (territoryRule?.source?.url) {
    legalBasisItems.push(...getTerritoryLegalBasisItems(territoryRule, "Regla territorial versionada para ITP de bienes muebles o vehiculos usados."));
  }

  return buildScenario({
    id: scenarioId,
    label: scenarioLabel,
    applicability: canConfirm ? TRANSFER_TAX_APPLICABILITY.TAXABLE : TRANSFER_TAX_APPLICABILITY.REVIEW_REQUIRED,
    supportedCalculation: canConfirm,
    taxAmount: canConfirm ? amount : null,
    probableAmount: !canConfirm && canCalculateProvisional && officialMarketValue !== null ? amount : null,
    minimumAmount: canConfirm ? amount : minimumAmount,
    maximumAmount: canConfirm ? amount : null,
    prudentBudget: canConfirm ? amount : amount,
    taxableBase: baseResult.value,
    rate: fixedFee === null ? rate : null,
    fixedFee,
    territoryRule: territoryRule ? territoryRule.id : null,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis: legalBasisItems,
    assumptions,
    filingRequirement: canCalculateProvisional ? TRANSFER_TAX_FILING_REQUIREMENTS.REQUIRED : TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN,
    filingForm: canCalculateProvisional ? "620" : null,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    evidence,
    normalizedCountries,
  });
}
function buildForalScenarioContainer({
  territoryRule,
  scenarioRules,
  vehicleCategory,
  baseResult,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  scenarioId,
  scenarioLabel,
}) {
  const scenarios = scenarioRules.map((rule) => {
    const valuationAssumption = getTerritoryValuationAssumption(rule);
    return buildExpandedRateScenario({
      scenarioId: `${scenarioId}_${rule.id}`,
      scenarioLabel: `${scenarioLabel}: ${getTerritoryScenarioLabel(rule.id)}`,
      territoryRule: rule,
      territoryCanCalculate: isSupportedTerritoryRule(rule),
      vehicleCategory,
      baseResult,
      rate: rule.generalRate,
      warningCodes: [],
      missingFields: [],
      assumptions: [
        ...assumptions,
        `Escenario condicionado a que la administracion competente sea ${getTerritoryScenarioLabel(rule.id)}.`,
        ...(valuationAssumption ? [valuationAssumption] : []),
      ],
      legalBasisItems: [
        ...legalBasisItems,
        ...getTerritoryLegalBasisItems(rule, "Regla foral versionada para ITP de vehiculos usados."),
      ],
      hasInvalidInput,
      evidence,
      normalizedCountries,
    });
  });

  return buildExpandedScenarioContainer({
    scenarioId,
    scenarioLabel,
    territoryRule,
    baseResult,
    warningCodes,
    missingFields,
    assumptions,
    legalBasisItems,
    evidence,
    normalizedCountries,
    scenarios,
  });
}

function isSupportedTerritoryRule(rule) {
  return Boolean(
    rule &&
    [TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED, TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS].includes(rule.status) &&
    rule.generalRate !== null
  );
}

function getTerritoryValuationAssumption(rule) {
  return rule?.valuationSource
    ? `El valor fiscal oficial usado debe corresponder a la fuente territorial aplicable: ${rule.valuationSource}`
    : null;
}

function getTerritoryScenarioLabel(ruleId) {
  return ({
    alava: "Alava/Araba",
    bizkaia: "Bizkaia",
    gipuzkoa: "Gipuzkoa",
    navarra: "Navarra",
  })[ruleId] ?? ruleId;
}
function calculateExpandedTerritoryTaxableScenario({
  input,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  purchasePrice,
  officialMarketValue,
  zeroEmissionStatus,
  engineDisplacement,
  fiscalHorsepower,
  baseResult,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  scenarioId,
  scenarioLabel,
}) {
  if (purchasePrice !== null && officialMarketValue !== null) {
    assumptions.push("Base ITP calculada como mayor entre precio declarado y valor fiscal oficial depreciado.");
  } else if (purchasePrice !== null) {
    assumptions.push("El precio declarado se conserva solo como escenario minimo hasta comprobar el valor fiscal oficial.");
  } else if (officialMarketValue !== null) {
    assumptions.push("Calculo provisional con valor fiscal oficial; falta confirmar que el precio declarado no sea superior.");
  }

  legalBasisItems.push(...getTerritoryLegalBasisItems(territoryRule, "Regla territorial versionada para ITP de vehiculos usados."));
  const context = {
    input,
    territoryRule,
    territoryCanCalculate,
    vehicleCategory,
    purchasePrice,
    officialMarketValue,
    baseResult,
    warningCodes,
    missingFields,
    assumptions,
    legalBasisItems,
    hasInvalidInput,
    evidence,
    normalizedCountries,
    scenarioId,
    scenarioLabel,
  };

  switch (territoryRule.id) {
    case "canarias":
      return calculateCanaryScenario({ ...context, engineDisplacement });
    case "madrid":
      return calculateMadridScenario(context);
    case "ceuta":
    case "melilla":
      return calculateCeutaMelillaScenario(context);
    case "andalucia":
      return calculateAndalusiaScenario({ ...context, zeroEmissionStatus, fiscalHorsepower });
    case "baleares":
      return calculateBalearicScenario({ ...context, fiscalHorsepower });
    case "comunidad_valenciana":
      return calculateValenciaScenario({ ...context, engineDisplacement });
    case "galicia":
      return calculateGaliciaScenario({ ...context, zeroEmissionStatus, engineDisplacement });
    case "murcia":
      return calculateMurciaScenario({ ...context, engineDisplacement });
    default:
      return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
  }
}

function calculateCanaryScenario(context) {
  const { input, territoryRule, vehicleCategory, engineDisplacement } = context;
  const ageMonths = getMonthsBetween(input.firstRegistrationDate, input.transactionDate);
  const isCanaryFixedCandidate = vehicleCategory === "passenger_car" && ageMonths !== null && ageMonths > 120;

  if (ageMonths === null && vehicleCategory === "passenger_car") {
    const scenarios = [
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_general_or_historic`, scenarioLabel: "Canarias: tipo general o vehiculo historico", rate: territoryRule.generalRate }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_fixed_up_to_1000`, scenarioLabel: "Canarias: cuota fija hasta 1000 cc", fixedFee: 40 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_fixed_1001_1500`, scenarioLabel: "Canarias: cuota fija 1001-1500 cc", fixedFee: 70 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_fixed_1501_2000`, scenarioLabel: "Canarias: cuota fija 1501-2000 cc", fixedFee: 115 }),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE],
      missingFields: [...context.missingFields, "firstRegistrationDate"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }

  if (!isCanaryFixedCandidate || input.isHistoricVehicle === true) {
    return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
  }

  if (input.isHistoricVehicle !== false) {
    const nonHistoricScenario = calculateCanaryScenario({
      ...context,
      warningCodes: [],
      missingFields: [],
      input: { ...input, isHistoricVehicle: false },
      scenarioId: `${context.scenarioId}_canarias_non_historic`,
      scenarioLabel: "Canarias: turismo no historico",
    });
    const historicScenario = calculateCanaryScenario({
      ...context,
      warningCodes: [],
      missingFields: [],
      input: { ...input, isHistoricVehicle: true },
      scenarioId: `${context.scenarioId}_canarias_historic`,
      scenarioLabel: "Canarias: turismo historico",
    });
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.TERRITORY_HISTORIC_STATUS_REQUIRED],
      missingFields: [...context.missingFields, "isHistoricVehicle"],
      scenarios: [nonHistoricScenario, historicScenario],
      rate: territoryRule.generalRate,
    });
  }

  if (engineDisplacement === null) {
    const scenarios = [
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_fixed_up_to_1000`, scenarioLabel: "Canarias: cuota fija hasta 1000 cc", fixedFee: 40 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_fixed_1001_1500`, scenarioLabel: "Canarias: cuota fija 1001-1500 cc", fixedFee: 70 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_fixed_1501_2000`, scenarioLabel: "Canarias: cuota fija 1501-2000 cc", fixedFee: 115 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_canarias_general_over_2000`, scenarioLabel: "Canarias: mas de 2000 cc", rate: territoryRule.generalRate }),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.CANARY_ENGINE_DISPLACEMENT_REQUIRED],
      missingFields: [...context.missingFields, "engineDisplacement"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }

  if (engineDisplacement <= 1000) return buildExpandedRateScenario({ ...context, fixedFee: 40 });
  if (engineDisplacement <= 1500) return buildExpandedRateScenario({ ...context, fixedFee: 70 });
  if (engineDisplacement <= 2000) return buildExpandedRateScenario({ ...context, fixedFee: 115 });
  return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
}

function calculateMadridScenario(context) {
  const status = getMadridReducedValuationStatus(context.evidence);
  if (status === true) {
    return buildMadridRateScenario({
      ...context,
      useReducedOfficialValue: true,
      assumptions: [...context.assumptions, "Uso exclusivo como taxi, autoescuela o alquiler sin conductor durante mas de seis meses acreditado: Madrid reduce al 70% el valor ministerial antes de comparar con el precio pactado."],
    });
  }
  if (status === false) {
    return buildMadridRateScenario(context);
  }

  const scenarios = [
    buildMadridRateScenario({
      ...context,
      warningCodes: [],
      missingFields: [],
      scenarioId: `${context.scenarioId}_madrid_regular_value`,
      scenarioLabel: "Madrid: valor ordinario",
    }),
    buildMadridRateScenario({
      ...context,
      warningCodes: [],
      missingFields: [],
      scenarioId: `${context.scenarioId}_madrid_reduced_value`,
      scenarioLabel: "Madrid: valor reducido al 70%",
      useReducedOfficialValue: true,
    }),
  ];
  return buildExpandedScenarioContainer({
    ...context,
    warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.MADRID_REDUCED_VALUATION_STATUS_REQUIRED],
    missingFields: [...context.missingFields, "evidence.madridReducedValuationUse"],
    scenarios,
    rate: context.territoryRule.generalRate,
  });
}

function buildMadridRateScenario(context) {
  const baseResult = context.useReducedOfficialValue === true
    ? getTaxableBase({
        purchasePrice: context.purchasePrice,
        officialMarketValue: context.officialMarketValue === null ? null : roundMoney(context.officialMarketValue * 0.7),
      })
    : context.baseResult;
  return buildExpandedRateScenario({ ...context, baseResult, rate: context.territoryRule.generalRate });
}

function getMadridReducedValuationStatus(evidence) {
  if (evidence && typeof evidence === "object" && !Array.isArray(evidence)) {
    const value = evidence.madridReducedValuationUse;
    if (value === true || value === false) {
      return value;
    }
  }
  return "unknown";
}

function calculateCeutaMelillaScenario(context) {
  return buildBonifiedRateScenario({
    ...context,
    rate: context.territoryRule.generalRate,
    bonificationRate: 0.5,
    assumptions: [...context.assumptions, "Bonificacion estatal del 50% aplicada sobre la cuota TPO por residencia habitual o domicilio fiscal del comprador en Ceuta o Melilla."],
  });
}

function buildBonifiedRateScenario({
  scenarioId,
  scenarioLabel,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  baseResult,
  rate,
  bonificationRate,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  hasInvalidInput,
  evidence,
  normalizedCountries,
}) {
  const canCalculateProvisional = Boolean(
    !hasInvalidInput &&
    territoryCanCalculate &&
    vehicleCategory !== null &&
    baseResult.value !== null &&
    rate !== null
  );
  const canConfirm = Boolean(canCalculateProvisional && baseResult.confirmed);
  const amount = canCalculateProvisional ? roundMoney(baseResult.value * rate * (1 - bonificationRate)) : null;
  return buildScenario({
    id: scenarioId,
    label: scenarioLabel,
    applicability: canConfirm ? TRANSFER_TAX_APPLICABILITY.BONIFIED : TRANSFER_TAX_APPLICABILITY.REVIEW_REQUIRED,
    supportedCalculation: canConfirm,
    taxAmount: canConfirm ? amount : null,
    probableAmount: !canConfirm && canCalculateProvisional ? amount : null,
    minimumAmount: canConfirm ? amount : amount,
    maximumAmount: canConfirm ? amount : null,
    prudentBudget: canConfirm ? amount : amount,
    taxableBase: baseResult.value,
    rate,
    fixedFee: null,
    territoryRule: territoryRule ? territoryRule.id : null,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis: legalBasisItems,
    assumptions,
    filingRequirement: canCalculateProvisional ? TRANSFER_TAX_FILING_REQUIREMENTS.REQUIRED : TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN,
    filingForm: canCalculateProvisional ? "620" : null,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    evidence,
    normalizedCountries,
  });
}
function calculateAndalusiaScenario(context) {
  const transactionDate = parseTransactionDate(context.input.transactionDate).date;
  const danaStatus = getAndalusiaDanaReplacementStatus(context.evidence);
  if (transactionDate >= "2024-10-29" && transactionDate <= "2025-12-31") {
    if (danaStatus === true) {
      return buildExpandedRateScenario({
        ...context,
        rate: 0,
        assumptions: [...context.assumptions, "Reposicion de vehiculo danado por DANA acreditada dentro del periodo excepcional andaluz: tipo 0% sujeto a autoliquidacion."],
      });
    }
    if (danaStatus !== false) {
      const ordinaryScenario = calculateAndalusiaOrdinaryScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_andalucia_ordinary`,
        scenarioLabel: "Andalucia: regla ordinaria sin beneficio DANA",
      });
      const scenarios = [
        buildExpandedRateScenario({
          ...context,
          warningCodes: [],
          missingFields: [],
          scenarioId: `${context.scenarioId}_andalucia_dana_replacement`,
          scenarioLabel: "Andalucia: reposicion DANA acreditada",
          rate: 0,
        }),
        ...(ordinaryScenario.alternativeScenarios ?? [ordinaryScenario]),
      ];
      return buildExpandedScenarioContainer({
        ...context,
        warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED],
        missingFields: [...context.missingFields, "evidence.andalusiaDanaReplacement"],
        scenarios,
        rate: context.territoryRule.generalRate,
      });
    }
  }

  return calculateAndalusiaOrdinaryScenario(context);
}

function calculateAndalusiaOrdinaryScenario(context) {
  const { zeroEmissionStatus, fiscalHorsepower, vehicleCategory, territoryRule } = context;
  if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.CONFIRMED && vehicleCategory === "passenger_car") {
    return buildExpandedRateScenario({
      ...context,
      rate: 0.01,
      assumptions: [...context.assumptions, "Turismo con distintivo ambiental 0 emisiones confirmado: Andalucia aplica tipo reducido 1% y excluye el tipo incrementado del articulo 47."],
    });
  }

  if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.UNKNOWN && vehicleCategory === "passenger_car") {
    const warningCodes = [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.ANDALUSIA_ZERO_EMISSION_STATUS_REQUIRED];
    const missingFields = [...context.missingFields, "zeroEmissionStatus"];
    const nonZeroScenarios = buildAndalusiaNonZeroScenarios({ ...context, warningCodes: [], missingFields: [] });
    const scenarios = [
      buildExpandedRateScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_andalucia_zero_emission`,
        scenarioLabel: "Andalucia: turismo con distintivo ambiental 0 emisiones",
        rate: 0.01,
      }),
      ...(Array.isArray(nonZeroScenarios) ? nonZeroScenarios : [nonZeroScenarios]),
    ];
    return buildExpandedScenarioContainer({ ...context, warningCodes, missingFields, scenarios, rate: territoryRule.generalRate });
  }

  const scenarios = buildAndalusiaNonZeroScenarios(context);
  if (Array.isArray(scenarios)) {
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED],
      missingFields: [...context.missingFields, "fiscalHorsepower"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }
  return scenarios;
}

function buildAndalusiaNonZeroScenarios(context) {
  const { fiscalHorsepower, vehicleCategory, territoryRule } = context;
  const mayHaveHighPowerRate = ["passenger_car", "suv"].includes(vehicleCategory);
  if (!mayHaveHighPowerRate) {
    return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
  }
  if (fiscalHorsepower === null) {
    const warningCodes = [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED];
    const missingFields = [...context.missingFields, "fiscalHorsepower"];
    return [
      buildExpandedRateScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_andalucia_up_to_15_cvf`,
        scenarioLabel: "Andalucia: hasta 15 CVF",
        rate: territoryRule.generalRate,
      }),
      buildExpandedRateScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_andalucia_over_15_cvf`,
        scenarioLabel: "Andalucia: mas de 15 CVF",
        rate: 0.08,
      }),
    ].map((scenario) => ({ ...scenario, warningCodes, warnings: getWarningsFromCodes(warningCodes), missingFields: uniqueStrings(missingFields) }));
  }
  return buildExpandedRateScenario({ ...context, rate: fiscalHorsepower > 15 ? 0.08 : territoryRule.generalRate });
}

function getAndalusiaDanaReplacementStatus(evidence) {
  if (evidence && typeof evidence === "object" && !Array.isArray(evidence)) {
    const value = evidence.andalusiaDanaReplacement;
    if (value === true || value === false) {
      return value;
    }
  }
  return "unknown";
}
function calculateBalearicScenario(context) {
  const { fiscalHorsepower, vehicleCategory, territoryRule } = context;
  const mayHaveHighPowerRate = ["passenger_car", "suv"].includes(vehicleCategory);
  if (!mayHaveHighPowerRate) {
    return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
  }
  if (fiscalHorsepower === null) {
    const warningCodes = [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.BALEARIC_FISCAL_HORSEPOWER_REQUIRED];
    const missingFields = [...context.missingFields, "fiscalHorsepower"];
    const scenarios = [
      buildExpandedRateScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_balears_up_to_15_cvf`,
        scenarioLabel: "Illes Balears: hasta 15 CVF",
        rate: territoryRule.generalRate,
      }),
      buildExpandedRateScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_balears_over_15_cvf`,
        scenarioLabel: "Illes Balears: mas de 15 CVF",
        rate: 0.08,
      }),
    ];
    return buildExpandedScenarioContainer({ ...context, warningCodes, missingFields, scenarios, rate: territoryRule.generalRate });
  }
  return buildExpandedRateScenario({ ...context, rate: fiscalHorsepower > 15 ? 0.08 : territoryRule.generalRate });
}

function calculateValenciaScenario(context) {
  if (context.input.isEndOfLifeVehicle === true) {
    return buildExpandedRateScenario({
      ...context,
      rate: 0.02,
      assumptions: [...context.assumptions, "Vehiculo adquirido al final de su vida util para valorizacion y eliminacion: Comunitat Valenciana aplica tipo 2% con evidencia documental."],
    });
  }

  if (context.input.isEndOfLifeVehicle !== false) {
    const normalScenario = calculateValenciaNonEndOfLifeScenario({
      ...context,
      warningCodes: [],
      missingFields: [],
      input: { ...context.input, isEndOfLifeVehicle: false },
      scenarioId: `${context.scenarioId}_valencia_not_end_of_life`,
      scenarioLabel: "Comunitat Valenciana: no fin de vida util",
    });
    const scenarios = [
      buildExpandedRateScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        scenarioId: `${context.scenarioId}_valencia_end_of_life`,
        scenarioLabel: "Comunitat Valenciana: fin de vida util acreditado",
        rate: 0.02,
      }),
      ...(normalScenario.alternativeScenarios ?? [normalScenario]),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.VALENCIA_END_OF_LIFE_STATUS_REQUIRED],
      missingFields: [...context.missingFields, "isEndOfLifeVehicle"],
      scenarios,
      rate: context.territoryRule.generalRate,
    });
  }

  return calculateValenciaNonEndOfLifeScenario(context);
}

function calculateValenciaNonEndOfLifeScenario(context) {
  const { input, baseResult, engineDisplacement, territoryRule, vehicleCategory } = context;
  const ageMonths = getMonthsBetween(input.firstRegistrationDate, input.transactionDate);
  if (ageMonths === null) {
    return buildExpandedRateScenario({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE],
      missingFields: [...context.missingFields, "firstRegistrationDate"],
      rate: territoryRule.generalRate,
      forceReview: true,
    });
  }

  const value = baseResult.value;
  const isHistoricVehicle = input.isHistoricVehicle === true;
  const historicUnknown = input.isHistoricVehicle !== true && input.isHistoricVehicle !== false;
  const canUseFixedByValueAndAge = value !== null && value < 20000 && ageMonths > 60;
  if (historicUnknown && canUseFixedByValueAndAge) {
    const scenarios = [
      calculateValenciaNonEndOfLifeScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        input: { ...input, isHistoricVehicle: false },
        scenarioId: `${context.scenarioId}_valencia_non_historic`,
        scenarioLabel: "Comunitat Valenciana: vehiculo no historico",
      }),
      calculateValenciaNonEndOfLifeScenario({
        ...context,
        warningCodes: [],
        missingFields: [],
        input: { ...input, isHistoricVehicle: true },
        scenarioId: `${context.scenarioId}_valencia_historic`,
        scenarioLabel: "Comunitat Valenciana: vehiculo historico",
      }),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.TERRITORY_HISTORIC_STATUS_REQUIRED],
      missingFields: [...context.missingFields, "isHistoricVehicle"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }

  if (value !== null && value >= 20000) {
    return buildExpandedRateScenario({ ...context, rate: 0.08 });
  }

  const supportsValenciaVehicleRules = ["passenger_car", "suv", "mixed_adaptable"].includes(vehicleCategory);
  if (supportsValenciaVehicleRules && !isHistoricVehicle && value !== null && value < 20000 && ageMonths > 60) {
    if (engineDisplacement === null) {
      const scenarios = ageMonths > 144
        ? [
            buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_fixed_up_to_1500`, scenarioLabel: "Comunitat Valenciana: cuota fija hasta 1500 cc", fixedFee: 40 }),
            buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_fixed_1501_2000`, scenarioLabel: "Comunitat Valenciana: cuota fija 1501-2000 cc", fixedFee: 60 }),
            buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_fixed_over_2000`, scenarioLabel: "Comunitat Valenciana: cuota fija mas de 2000 cc", fixedFee: 140 }),
          ]
        : [
            buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_fixed_up_to_1500`, scenarioLabel: "Comunitat Valenciana: cuota fija hasta 1500 cc", fixedFee: 120 }),
            buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_fixed_1501_2000`, scenarioLabel: "Comunitat Valenciana: cuota fija 1501-2000 cc", fixedFee: 180 }),
            buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_fixed_over_2000`, scenarioLabel: "Comunitat Valenciana: cuota fija mas de 2000 cc", fixedFee: 280 }),
          ];
      return buildExpandedScenarioContainer({
        ...context,
        warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.VALENCIA_ENGINE_DISPLACEMENT_REQUIRED],
        missingFields: [...context.missingFields, "engineDisplacement"],
        scenarios,
        rate: territoryRule.generalRate,
      });
    }
    return buildExpandedRateScenario({ ...context, fixedFee: getValenciaFixedFee(ageMonths, engineDisplacement) });
  }

  if (supportsValenciaVehicleRules && value !== null && value < 20000 && ageMonths <= 60) {
    if (engineDisplacement === null) {
      const scenarios = [
        buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_general_cc_unknown`, scenarioLabel: "Comunitat Valenciana: hasta 2000 cc", rate: territoryRule.generalRate }),
        buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_valencia_over_2000_cc_unknown`, scenarioLabel: "Comunitat Valenciana: mas de 2000 cc", rate: 0.08 }),
      ];
      return buildExpandedScenarioContainer({
        ...context,
        warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.VALENCIA_ENGINE_DISPLACEMENT_REQUIRED],
        missingFields: [...context.missingFields, "engineDisplacement"],
        scenarios,
        rate: territoryRule.generalRate,
      });
    }
    if (engineDisplacement > 2000) {
      return buildExpandedRateScenario({ ...context, rate: 0.08 });
    }
  }

  return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
}

function getValenciaFixedFee(ageMonths, engineDisplacement) {
  const oldVehicle = ageMonths > 144;
  if (engineDisplacement <= 1500) return oldVehicle ? 40 : 120;
  if (engineDisplacement <= 2000) return oldVehicle ? 60 : 180;
  return oldVehicle ? 140 : 280;
}

function calculateGaliciaScenario(context) {
  const { input, territoryRule, zeroEmissionStatus, engineDisplacement, vehicleCategory } = context;
  if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.CONFIRMED) {
    return buildExpandedRateScenario({
      ...context,
      rate: 0,
      assumptions: [...context.assumptions, "Vehiculo con distintivo ambiental 0 emisiones confirmado: Galicia aplica tipo 0%, operacion sujeta y modelo 620."],
    });
  }
  if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.UNKNOWN) {
    const nonZeroScenario = calculateGaliciaScenario({
      ...context,
      warningCodes: [],
      missingFields: [],
      zeroEmissionStatus: ZERO_EMISSION_STATUSES.NOT_ZERO_EMISSION,
      scenarioId: `${context.scenarioId}_galicia_not_zero_emission`,
      scenarioLabel: "Galicia: sin distintivo ambiental 0 emisiones",
    });
    const scenarios = [
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_galicia_zero_emission`, scenarioLabel: "Galicia: distintivo ambiental 0 emisiones", rate: 0 }),
      ...(nonZeroScenario.alternativeScenarios ?? [nonZeroScenario]),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.GALICIA_ZERO_EMISSION_STATUS_REQUIRED],
      missingFields: [...context.missingFields, "zeroEmissionStatus"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }

  const ageMonths = getMonthsBetween(input.firstRegistrationDate, input.transactionDate);
  const hasOldFixedFee = ["passenger_car", "suv"].includes(vehicleCategory) && ageMonths !== null && ageMonths >= 180;
  if (!hasOldFixedFee) {
    if (ageMonths === null) {
      return buildExpandedRateScenario({
        ...context,
        warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE],
        missingFields: [...context.missingFields, "firstRegistrationDate"],
        rate: territoryRule.generalRate,
        forceReview: true,
      });
    }
    return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
  }

  if (engineDisplacement === null) {
    const scenarios = [
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_galicia_fixed_up_to_1199`, scenarioLabel: "Galicia: cuota fija hasta 1199 cc", fixedFee: 22 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_galicia_fixed_1200_1599`, scenarioLabel: "Galicia: cuota fija 1200-1599 cc", fixedFee: 38 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_galicia_general_over_1599`, scenarioLabel: "Galicia: mas de 1599 cc", rate: territoryRule.generalRate }),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.GALICIA_ENGINE_DISPLACEMENT_REQUIRED],
      missingFields: [...context.missingFields, "engineDisplacement"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }

  if (engineDisplacement <= 1199) return buildExpandedRateScenario({ ...context, fixedFee: 22 });
  if (engineDisplacement <= 1599) return buildExpandedRateScenario({ ...context, fixedFee: 38 });
  return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
}

function calculateMurciaScenario(context) {
  const { input, territoryRule, engineDisplacement } = context;
  const ageMonths = getMonthsBetween(input.firstRegistrationDate, input.transactionDate);
  if (ageMonths === null) {
    return buildExpandedRateScenario({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE],
      missingFields: [...context.missingFields, "firstRegistrationDate"],
      rate: territoryRule.generalRate,
      forceReview: true,
    });
  }
  if (ageMonths <= 144) {
    return buildExpandedRateScenario({ ...context, rate: territoryRule.generalRate });
  }
  if (engineDisplacement === null) {
    const scenarios = [
      buildExpandedNoFilingScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_murcia_up_to_1000`, scenarioLabel: "Murcia: mas de 12 anos hasta 1000 cc" }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_murcia_1001_1500`, scenarioLabel: "Murcia: mas de 12 anos 1001-1500 cc", fixedFee: 30 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_murcia_1501_2000`, scenarioLabel: "Murcia: mas de 12 anos 1501-2000 cc", fixedFee: 50 }),
      buildExpandedRateScenario({ ...context, warningCodes: [], missingFields: [], scenarioId: `${context.scenarioId}_murcia_over_2000`, scenarioLabel: "Murcia: mas de 12 anos mas de 2000 cc", fixedFee: 75 }),
    ];
    return buildExpandedScenarioContainer({
      ...context,
      warningCodes: [...context.warningCodes, TRANSFER_TAX_WARNING_CODES.MURCIA_ENGINE_DISPLACEMENT_REQUIRED],
      missingFields: [...context.missingFields, "engineDisplacement"],
      scenarios,
      rate: territoryRule.generalRate,
    });
  }
  if (engineDisplacement <= 1000) return buildExpandedNoFilingScenario(context);
  if (engineDisplacement <= 1500) return buildExpandedRateScenario({ ...context, fixedFee: 30 });
  if (engineDisplacement <= 2000) return buildExpandedRateScenario({ ...context, fixedFee: 50 });
  return buildExpandedRateScenario({ ...context, fixedFee: 75 });
}

function buildExpandedRateScenario({
  scenarioId,
  scenarioLabel,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  baseResult,
  rate = null,
  fixedFee = null,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  forceReview = false,
}) {
  const needsBase = fixedFee === null;
  const canCalculateProvisional = Boolean(
    !hasInvalidInput &&
    !forceReview &&
    territoryCanCalculate &&
    vehicleCategory !== null &&
    (!needsBase || baseResult.value !== null) &&
    (fixedFee !== null || rate !== null)
  );
  const canConfirm = Boolean(canCalculateProvisional && (!needsBase || baseResult.confirmed));
  const amount = canCalculateProvisional
    ? (fixedFee !== null ? fixedFee : calculateAmount(baseResult.value, rate, null))
    : null;

  return buildScenario({
    id: scenarioId,
    label: scenarioLabel,
    applicability: canConfirm ? TRANSFER_TAX_APPLICABILITY.TAXABLE : TRANSFER_TAX_APPLICABILITY.REVIEW_REQUIRED,
    supportedCalculation: canConfirm,
    taxAmount: canConfirm ? amount : null,
    probableAmount: !canConfirm && canCalculateProvisional ? amount : null,
    minimumAmount: canConfirm ? amount : amount,
    maximumAmount: canConfirm ? amount : null,
    prudentBudget: canConfirm ? amount : amount,
    taxableBase: baseResult.value,
    rate: fixedFee === null ? rate : null,
    fixedFee,
    territoryRule: territoryRule ? territoryRule.id : null,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis: legalBasisItems,
    assumptions,
    filingRequirement: canCalculateProvisional ? TRANSFER_TAX_FILING_REQUIREMENTS.REQUIRED : TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN,
    filingForm: canCalculateProvisional ? "620" : null,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    evidence,
    normalizedCountries,
  });
}

function buildExpandedNoFilingScenario({
  scenarioId,
  scenarioLabel,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  baseResult,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  hasInvalidInput,
  evidence,
  normalizedCountries,
}) {
  const canConfirm = Boolean(!hasInvalidInput && territoryCanCalculate && vehicleCategory !== null);
  return buildScenario({
    id: scenarioId,
    label: scenarioLabel,
    applicability: canConfirm ? TRANSFER_TAX_APPLICABILITY.FILING_NOT_REQUIRED : TRANSFER_TAX_APPLICABILITY.REVIEW_REQUIRED,
    supportedCalculation: canConfirm,
    taxAmount: canConfirm ? 0 : null,
    probableAmount: canConfirm ? 0 : null,
    minimumAmount: canConfirm ? 0 : null,
    maximumAmount: canConfirm ? 0 : null,
    prudentBudget: canConfirm ? 0 : null,
    taxableBase: baseResult.value,
    rate: null,
    fixedFee: 0,
    territoryRule: territoryRule ? territoryRule.id : null,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis: legalBasisItems,
    assumptions,
    filingRequirement: canConfirm ? TRANSFER_TAX_FILING_REQUIREMENTS.NOT_REQUIRED : TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN,
    filingForm: null,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    evidence,
    normalizedCountries,
  });
}

function buildExpandedScenarioContainer({
  scenarioId,
  scenarioLabel,
  territoryRule,
  baseResult,
  rate = null,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  evidence,
  normalizedCountries,
  scenarios,
}) {
  const container = buildScenario({
    id: scenarioId,
    label: scenarioLabel,
    applicability: TRANSFER_TAX_APPLICABILITY.SCENARIO_REQUIRED,
    supportedCalculation: false,
    taxAmount: null,
    probableAmount: null,
    minimumAmount: minScenarioAmount(scenarios),
    maximumAmount: maxScenarioAmount(scenarios),
    prudentBudget: maxScenarioAmount(scenarios),
    taxableBase: baseResult.value,
    rate,
    fixedFee: null,
    territoryRule: territoryRule ? territoryRule.id : null,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis: legalBasisItems,
    assumptions,
    filingRequirement: mergeScenarioFilingRequirement(scenarios),
    filingForm: mergeScenarioFilingForm(scenarios),
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    evidence,
    normalizedCountries,
  });
  container.alternativeScenarios = scenarios;
  return container;
}
function calculateCataloniaTaxableScenario({
  input,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  purchasePrice,
  officialMarketValue,
  originalBoeValue,
  zeroEmissionStatus,
  baseResult,
  warningCodes,
  missingFields,
  assumptions,
  legalBasisItems,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  scenarioId,
  scenarioLabel,
}) {
  void purchasePrice;
  void officialMarketValue;
  legalBasisItems.push(...getTerritoryLegalBasisItems(territoryRule, "Regla catalana verificada para transmisiones de vehiculos usados, tipo 0 emisiones y no obligacion de presentar."));
  const transactionDate = parseTransactionDate(input.transactionDate).date;
  const oldVehicleStatus = getCataloniaTenYearsStatus(input.firstRegistrationDate, transactionDate);

  if (oldVehicleStatus === "ambiguous") {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_AGE_CALCULATION_ASSUMPTION);
    missingFields.push("firstRegistrationDate");
    const ageAssumptions = [
      ...assumptions,
      "La fuente catalana auditada no cierra si los diez anos se computan por aniversario exacto o por otro criterio; se modelan escenarios porque falta el dia de primera matriculacion.",
    ];
    const scenarios = [
      ...asScenarioList(buildCataloniaNoFilingCandidateOrTaxableScenario({
        input,
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        originalBoeValue,
        zeroEmissionStatus,
        warningCodes,
        missingFields,
        assumptions: [...ageAssumptions, "Escenario si en la fecha de transmision el vehiculo ya hubiera cumplido diez anos."],
        legalBasis: legalBasisItems,
        hasInvalidInput,
        evidence,
        normalizedCountries,
        scenarioId: "cataluna_age_reaches_ten_years",
        scenarioLabel: "Cataluna: cumple diez anos",
      })),
      ...asScenarioList(buildCataloniaEmissionScenario({
        input,
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        zeroEmissionStatus,
        warningCodes,
        missingFields,
        assumptions: [...ageAssumptions, "Escenario si en la fecha de transmision el vehiculo todavia no hubiera cumplido diez anos."],
        legalBasis: legalBasisItems,
        hasInvalidInput,
        evidence,
        normalizedCountries,
        scenarioId: "cataluna_age_not_yet_ten_years",
        scenarioLabel: "Cataluna: todavia no cumple diez anos",
      })),
    ];
    return buildCataloniaScenarioContainer({
      id: scenarioId,
      label: scenarioLabel,
      territoryRule,
      baseResult,
      warningCodes,
      missingFields,
      assumptions: ageAssumptions,
      legalBasis: legalBasisItems,
      evidence,
      normalizedCountries,
      scenarios,
    });
  }

  if (oldVehicleStatus === "missing") {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE);
    missingFields.push("firstRegistrationDate");
    return buildCataloniaRateScenario({
      id: scenarioId,
      label: scenarioLabel,
      territoryRule,
      territoryCanCalculate,
      vehicleCategory,
      baseResult,
      rate: territoryRule.generalRate,
      forceReview: true,
      warningCodes,
      missingFields,
      assumptions,
      legalBasis: legalBasisItems,
      hasInvalidInput,
      evidence,
      normalizedCountries,
    });
  }

  if (oldVehicleStatus === true) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_AGE_CALCULATION_ASSUMPTION);
    assumptions.push("Se aplica provisionalmente el criterio de aniversario exacto entre primera matriculacion y transmision para determinar los diez anos de antiguedad.");
    const historicStatus = getHistoricStatus(input.isHistoricVehicle);
    if (historicStatus === "unknown") {
      warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_HISTORIC_STATUS_REQUIRED);
      missingFields.push("isHistoricVehicle");
      const scenarios = [
        ...asScenarioList(buildCataloniaNoFilingCandidateOrTaxableScenario({
          input,
          territoryRule,
          territoryCanCalculate,
          vehicleCategory,
          baseResult,
          originalBoeValue,
          zeroEmissionStatus,
          warningCodes,
          missingFields,
          assumptions: [...assumptions, "Escenario si el vehiculo no estuviera calificado como historico."],
          legalBasis: legalBasisItems,
          hasInvalidInput,
          evidence,
          normalizedCountries,
          scenarioId: "cataluna_old_vehicle_not_historic",
          scenarioLabel: "Cataluna: vehiculo antiguo no historico",
        })),
        ...asScenarioList(buildCataloniaEmissionScenario({
          input,
          territoryRule,
          territoryCanCalculate,
          vehicleCategory,
          baseResult,
          zeroEmissionStatus,
          warningCodes,
          missingFields,
          assumptions: [...assumptions, "Escenario si el vehiculo estuviera calificado como historico."],
          legalBasis: legalBasisItems,
          hasInvalidInput,
          evidence,
          normalizedCountries,
          scenarioId: "cataluna_old_vehicle_historic",
          scenarioLabel: "Cataluna: vehiculo historico",
        })),
      ];
      return buildCataloniaScenarioContainer({
        id: scenarioId,
        label: scenarioLabel,
        territoryRule,
        baseResult,
        warningCodes,
        missingFields,
        assumptions,
        legalBasis: legalBasisItems,
        evidence,
        normalizedCountries,
        scenarios,
      });
    }

    if (historicStatus === false) {
      return buildCataloniaNoFilingCandidateOrTaxableScenario({
        input,
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        originalBoeValue,
        zeroEmissionStatus,
        warningCodes,
        missingFields,
        assumptions,
        legalBasis: legalBasisItems,
        hasInvalidInput,
        evidence,
        normalizedCountries,
        scenarioId,
        scenarioLabel,
      });
    }

    assumptions.push("Vehiculo historico confirmado; no se aplica la regla catalana de no obligacion de presentar para vehiculos de diez anos o mas.");
  }

  return buildCataloniaEmissionScenario({
    input,
    territoryRule,
    territoryCanCalculate,
    vehicleCategory,
    baseResult,
    zeroEmissionStatus,
    warningCodes,
    missingFields,
    assumptions,
    legalBasis: legalBasisItems,
    hasInvalidInput,
    evidence,
    normalizedCountries,
    scenarioId,
    scenarioLabel,
  });
}

function buildCataloniaNoFilingCandidateOrTaxableScenario({
  input,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  baseResult,
  originalBoeValue,
  zeroEmissionStatus,
  warningCodes,
  missingFields,
  assumptions,
  legalBasis,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  scenarioId,
  scenarioLabel,
}) {
  if (originalBoeValue === null) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_ORIGINAL_BOE_VALUE_REQUIRED);
    missingFields.push("originalBoeValue");
    const noFilingScenario = buildCataloniaNoFilingScenario({
      id: "cataluna_old_vehicle_original_boe_below_40000",
      label: "Cataluna: valor BOE original inferior a 40000 euros",
      territoryRule,
      vehicleCategory,
      assumptions: [...assumptions, "Escenario si el valor BOE original sin depreciacion fuera inferior a 40000 euros."],
      warningCodes,
      missingFields,
      legalBasis,
      evidence,
      normalizedCountries,
    });
    const taxableScenario = buildCataloniaEmissionScenario({
      input,
      territoryRule,
      territoryCanCalculate,
      vehicleCategory,
      baseResult,
      zeroEmissionStatus,
      warningCodes,
      missingFields,
      assumptions: [...assumptions, "Escenario si el valor BOE original sin depreciacion fuera igual o superior a 40000 euros."],
      legalBasis,
      hasInvalidInput,
      evidence,
      normalizedCountries,
      scenarioId: "cataluna_old_vehicle_original_boe_40000_or_more",
      scenarioLabel: "Cataluna: valor BOE original igual o superior a 40000 euros",
    });
    const scenarios = [noFilingScenario, ...asScenarioList(taxableScenario)];
    return buildCataloniaScenarioContainer({
      id: scenarioId,
      label: scenarioLabel,
      territoryRule,
      baseResult,
      warningCodes,
      missingFields,
      assumptions,
      legalBasis,
      evidence,
      normalizedCountries,
      scenarios,
    });
  }

  if (originalBoeValue < 40000) {
    assumptions.push("Vehiculo de diez anos o mas, no historico, con valor BOE original inferior a 40000 euros: Cataluna exonera de presentar el modelo 620 sin establecer exencion ni no sujecion.");
    if (isCataloniaZeroEmissionEffective(input.transactionDate) && zeroEmissionStatus !== ZERO_EMISSION_STATUSES.NOT_ZERO_EMISSION) {
      warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW);
      if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.UNKNOWN) {
        warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_ZERO_EMISSION_STATUS_REQUIRED);
        missingFields.push("zeroEmissionStatus");
      }
      const noFilingScenario = buildCataloniaNoFilingScenario({
        id: "cataluna_old_vehicle_no_filing",
        label: "Cataluna: no obligacion de presentar por antiguedad",
        territoryRule,
        vehicleCategory,
        assumptions,
        warningCodes,
        missingFields,
        legalBasis,
        evidence,
        normalizedCountries,
      });
      const zeroEmissionScenario = buildCataloniaRateScenario({
        id: "cataluna_zero_emission_required_filing",
        label: "Cataluna: tipo 0 emisiones con modelo 620",
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        rate: 0,
        warningCodes,
        missingFields,
        assumptions: [...assumptions, "Escenario si prevalece la obligacion formal asociada al tipo 0% de vehiculos 0 emisiones."],
        legalBasis,
        hasInvalidInput,
        evidence,
        normalizedCountries,
      });
      return buildCataloniaScenarioContainer({
        id: scenarioId,
        label: scenarioLabel,
        territoryRule,
        baseResult,
        warningCodes,
        missingFields,
        assumptions,
        legalBasis,
        evidence,
        normalizedCountries,
        scenarios: [noFilingScenario, zeroEmissionScenario],
      });
    }

    return buildCataloniaNoFilingScenario({
      id: scenarioId,
      label: scenarioLabel,
      territoryRule,
      vehicleCategory,
      assumptions,
      warningCodes,
      missingFields,
      legalBasis,
      evidence,
      normalizedCountries,
    });
  }

  assumptions.push("Valor BOE original sin depreciacion igual o superior a 40000 euros; Cataluna exige presentacion y calculo ordinario. El umbral incluye exactamente 40000 euros.");
  return buildCataloniaEmissionScenario({
    input,
    territoryRule,
    territoryCanCalculate,
    vehicleCategory,
    baseResult,
    zeroEmissionStatus,
    warningCodes,
    missingFields,
    assumptions,
    legalBasis,
    hasInvalidInput,
    evidence,
    normalizedCountries,
    scenarioId,
    scenarioLabel,
  });
}

function buildCataloniaEmissionScenario({
  input,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  baseResult,
  zeroEmissionStatus,
  warningCodes,
  missingFields,
  assumptions,
  legalBasis,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  scenarioId,
  scenarioLabel,
}) {
  if (isCataloniaZeroEmissionEffective(input.transactionDate)) {
    if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.UNKNOWN) {
      warningCodes.push(TRANSFER_TAX_WARNING_CODES.CATALONIA_ZERO_EMISSION_STATUS_REQUIRED);
      missingFields.push("zeroEmissionStatus");
      const zeroScenario = buildCataloniaRateScenario({
        id: "cataluna_zero_emission_confirmed",
        label: "Cataluna: vehiculo con distintivo ambiental 0 emisiones",
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        rate: 0,
        warningCodes,
        missingFields,
        assumptions: [...assumptions, "Escenario si se confirma distintivo ambiental 0 emisiones desde 2025-06-27."],
        legalBasis,
        hasInvalidInput,
        evidence,
        normalizedCountries,
      });
      const generalScenario = buildCataloniaRateScenario({
        id: "cataluna_not_zero_emission",
        label: "Cataluna: vehiculo sin distintivo ambiental 0 emisiones",
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        rate: territoryRule.generalRate,
        warningCodes,
        missingFields,
        assumptions: [...assumptions, "Escenario si no se confirma distintivo ambiental 0 emisiones."],
        legalBasis,
        hasInvalidInput,
        evidence,
        normalizedCountries,
      });
      return buildCataloniaScenarioContainer({
        id: scenarioId,
        label: scenarioLabel,
        territoryRule,
        baseResult,
        warningCodes,
        missingFields,
        assumptions,
        legalBasis,
        evidence,
        normalizedCountries,
        scenarios: [zeroScenario, generalScenario],
      });
    }

    if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.CONFIRMED) {
      assumptions.push("Distintivo ambiental 0 emisiones confirmado; desde 2025-06-27 Cataluna aplica tipo 0%, con operacion sujeta y modelo 620 obligatorio.");
      return buildCataloniaRateScenario({
        id: scenarioId,
        label: scenarioLabel,
        territoryRule,
        territoryCanCalculate,
        vehicleCategory,
        baseResult,
        rate: 0,
        warningCodes,
        missingFields,
        assumptions,
        legalBasis,
        hasInvalidInput,
        evidence,
        normalizedCountries,
      });
    }
  } else if (zeroEmissionStatus === ZERO_EMISSION_STATUSES.CONFIRMED) {
    assumptions.push("El distintivo ambiental 0 emisiones no genera tipo 0% antes del 2025-06-27; se aplica el tipo general verificado para la fecha.");
  }

  return buildCataloniaRateScenario({
    id: scenarioId,
    label: scenarioLabel,
    territoryRule,
    territoryCanCalculate,
    vehicleCategory,
    baseResult,
    rate: territoryRule.generalRate,
    warningCodes,
    missingFields,
    assumptions,
    legalBasis,
    hasInvalidInput,
    evidence,
    normalizedCountries,
  });
}

function buildCataloniaRateScenario({
  id,
  label,
  territoryRule,
  territoryCanCalculate,
  vehicleCategory,
  baseResult,
  rate,
  warningCodes,
  missingFields,
  assumptions,
  legalBasis,
  hasInvalidInput,
  evidence,
  normalizedCountries,
  forceReview = false,
}) {
  const canConfirm = Boolean(
    !forceReview &&
    !hasInvalidInput &&
    territoryCanCalculate &&
    vehicleCategory !== null &&
    baseResult.confirmed &&
    rate !== null
  );
  const canCalculateProvisional = Boolean(
    !hasInvalidInput &&
    territoryCanCalculate &&
    vehicleCategory !== null &&
    baseResult.value !== null &&
    rate !== null
  );
  const amount = canCalculateProvisional ? calculateAmount(baseResult.value, rate, null) : null;

  return buildScenario({
    id,
    label,
    applicability: canConfirm ? TRANSFER_TAX_APPLICABILITY.TAXABLE : TRANSFER_TAX_APPLICABILITY.REVIEW_REQUIRED,
    supportedCalculation: canConfirm,
    taxAmount: canConfirm ? amount : null,
    probableAmount: !canConfirm && canCalculateProvisional ? amount : null,
    minimumAmount: canConfirm ? amount : amount,
    maximumAmount: canConfirm ? amount : null,
    prudentBudget: canConfirm ? amount : amount,
    taxableBase: baseResult.value,
    rate,
    fixedFee: null,
    territoryRule,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis,
    assumptions,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    filingRequirement: canCalculateProvisional ? TRANSFER_TAX_FILING_REQUIREMENTS.REQUIRED : TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN,
    filingForm: canCalculateProvisional ? "620" : null,
    evidence,
    normalizedCountries,
  });
}

function buildCataloniaNoFilingScenario({
  id,
  label,
  territoryRule,
  vehicleCategory,
  assumptions,
  warningCodes,
  missingFields,
  legalBasis,
  evidence,
  normalizedCountries,
  filingRequirement,
  filingForm,
}) {
  const canConfirm = Boolean(vehicleCategory !== null);
  return buildScenario({
    id,
    label,
    applicability: TRANSFER_TAX_APPLICABILITY.FILING_NOT_REQUIRED,
    supportedCalculation: canConfirm,
    taxAmount: 0,
    probableAmount: 0,
    minimumAmount: 0,
    maximumAmount: 0,
    prudentBudget: 0,
    taxableBase: null,
    rate: null,
    fixedFee: null,
    territoryRule,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis,
    assumptions,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    filingRequirement: TRANSFER_TAX_FILING_REQUIREMENTS.NOT_REQUIRED,
    filingForm: null,
    evidence,
    normalizedCountries,
  });
}

function buildCataloniaScenarioContainer({
  id,
  label,
  territoryRule,
  baseResult,
  warningCodes,
  missingFields,
  assumptions,
  legalBasis,
  evidence,
  normalizedCountries,
  scenarios,
}) {
  const scenario = buildScenario({
    id,
    label,
    applicability: TRANSFER_TAX_APPLICABILITY.SCENARIO_REQUIRED,
    supportedCalculation: false,
    taxAmount: null,
    probableAmount: null,
    minimumAmount: minScenarioAmount(scenarios),
    maximumAmount: maxScenarioAmount(scenarios),
    prudentBudget: maxScenarioAmount(scenarios),
    taxableBase: baseResult.value,
    rate: null,
    fixedFee: null,
    territoryRule,
    territoryStatus: territoryRule?.status ?? null,
    legalBasis,
    assumptions,
    warnings: getWarningsFromCodes(warningCodes),
    warningCodes: dedupeWarningCodes(warningCodes),
    missingFields: uniqueStrings(missingFields),
    filingRequirement: mergeScenarioFilingRequirement(scenarios),
    filingForm: mergeScenarioFilingForm(scenarios),
    evidence,
    normalizedCountries,
  });
  scenario.alternativeScenarios = scenarios;
  return scenario;
}

function asScenarioList(scenario) {
  return scenario.alternativeScenarios ?? [scenario];
}

function getHistoricStatus(value) {
  if (value === true) return true;
  if (value === false) return false;
  return "unknown";
}

function isCataloniaZeroEmissionEffective(transactionDate) {
  const date = parseTransactionDate(transactionDate).date;
  return date !== null && date >= "2025-06-27";
}

function getCataloniaTenYearsStatus(firstRegistrationDate, transactionDate) {
  const firstDate = parseCataloniaVehicleDate(firstRegistrationDate);
  const transferDate = parseCataloniaVehicleDate(transactionDate);
  if (!firstDate || !transferDate || transferDate.day === null) {
    return "missing";
  }

  const transfer = new Date(Date.UTC(transferDate.year, transferDate.month - 1, transferDate.day));

  if (firstDate.day === null) {
    const earliestAnniversary = new Date(Date.UTC(firstDate.year + 10, firstDate.month - 1, 1));
    const latestAnniversary = new Date(Date.UTC(firstDate.year + 10, firstDate.month, 0));
    if (transfer < earliestAnniversary) {
      return false;
    }
    if (transfer >= latestAnniversary) {
      return true;
    }
    return "ambiguous";
  }

  const tenYearAnniversary = new Date(Date.UTC(firstDate.year + 10, firstDate.month - 1, firstDate.day));
  return transfer >= tenYearAnniversary;
}

function parseCataloniaVehicleDate(value) {
  if (typeof value !== "string") {
    return null;
  }
  const exactMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (exactMatch) {
    const year = Number(exactMatch[1]);
    const month = Number(exactMatch[2]);
    const day = Number(exactMatch[3]);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));
    if (
      parsedDate.getUTCFullYear() !== year ||
      parsedDate.getUTCMonth() !== month - 1 ||
      parsedDate.getUTCDate() !== day
    ) {
      return null;
    }
    return { year, month, day };
  }

  const monthMatch = value.match(/^(\d{4})-(\d{2})$/);
  if (!monthMatch) {
    return null;
  }
  const year = Number(monthMatch[1]);
  const month = Number(monthMatch[2]);
  if (!Number.isInteger(year) || month < 1 || month > 12) {
    return null;
  }
  return { year, month, day: null };
}

function resolveTerritoryContext(buyerRegion, buyerProvince, transactionDate) {
  const normalizedRegion = normalizeTransferTaxTerritoryKey(buyerRegion);
  const rules = getTransferTaxTerritoryRules(buyerRegion);
  const latestRule = getTransferTaxTerritoryRule(buyerRegion);
  const dateResult = parseTransactionDate(transactionDate);
  const warningCodes = [];
  const missingFields = [];

  if (!normalizedRegion) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.MISSING_BUYER_REGION);
    missingFields.push("buyerRegion");
  } else if (rules.length === 0) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_REGION);
    missingFields.push("buyerRegion");
  }

  if (!dateResult.date) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_OR_MISSING_TRANSACTION_DATE);
    missingFields.push("transactionDate");
  } else if (dateResult.date > getTodayIsoDate()) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.FUTURE_TRANSACTION_DATE);
  }

  const hasDateBlockingIssue = !dateResult.date || dateResult.date > getTodayIsoDate();
  const effectiveRule = !hasDateBlockingIssue ? selectEffectiveTerritoryRule(rules, dateResult.date) : null;
  const provinceResolution = resolveBasqueProvinceRule(buyerProvince, dateResult.date, hasDateBlockingIssue);
  const regionAsBasqueProvince = resolveBasqueProvinceRule(buyerRegion, dateResult.date, hasDateBlockingIssue);
  let selectedRule = effectiveRule;
  let selectedLatestRule = latestRule;
  let canUseEffectiveRule = Boolean(effectiveRule && !hasDateBlockingIssue);
  let provincialRules = [];
  let conflictRules = [];

  if (effectiveRule?.id === "pais_vasco") {
    if (!normalizeOptionalString(buyerProvince)) {
      warningCodes.push(TRANSFER_TAX_WARNING_CODES.BUYER_PROVINCE_REQUIRED);
      missingFields.push("buyerProvince");
      provincialRules = getBasqueProvinceRules(dateResult.date, hasDateBlockingIssue);
      canUseEffectiveRule = false;
    } else if (!provinceResolution.rule) {
      warningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_PROVINCE);
      missingFields.push("buyerProvince");
      canUseEffectiveRule = false;
    } else {
      selectedRule = provinceResolution.rule;
      selectedLatestRule = provinceResolution.latestRule;
      canUseEffectiveRule = Boolean(provinceResolution.rule && !hasDateBlockingIssue);
    }
  } else if (provinceResolution.rawPresent && provinceResolution.rule) {
    const comparableRegionRule = regionAsBasqueProvince.rule ?? effectiveRule;
    if (comparableRegionRule && comparableRegionRule.id !== provinceResolution.rule.id) {
      warningCodes.push(TRANSFER_TAX_WARNING_CODES.BUYER_REGION_PROVINCE_CONFLICT);
      conflictRules = uniqueRules([comparableRegionRule, provinceResolution.rule]);
      canUseEffectiveRule = false;
    }
  } else if (provinceResolution.rawPresent && !provinceResolution.rule) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_BUYER_PROVINCE);
    missingFields.push("buyerProvince");
  }

  if (rules.length > 0 && !hasDateBlockingIssue && !effectiveRule) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.TERRITORY_RULE_NOT_EFFECTIVE);
  }

  return {
    rule: selectedRule ?? selectedLatestRule,
    canUseEffectiveRule: Boolean(canUseEffectiveRule),
    hasRecognizedSpanishRegion: rules.length > 0,
    warningCodes,
    missingFields,
    provincialRules,
    conflictRules,
  };
}

function resolveBasqueProvinceRule(value, transactionDate, hasDateBlockingIssue) {
  const rawPresent = Boolean(normalizeOptionalString(value));
  const rules = getTransferTaxTerritoryRules(value);
  const latestRule = getTransferTaxTerritoryRule(value);
  const effectiveRule = !hasDateBlockingIssue ? selectEffectiveTerritoryRule(rules, transactionDate) : null;
  const candidateRule = effectiveRule ?? latestRule;

  if (!candidateRule || !BASQUE_PROVINCE_RULE_IDS.has(candidateRule.id)) {
    return { rawPresent, rule: null, latestRule: null };
  }

  return { rawPresent, rule: effectiveRule, latestRule };
}

function getBasqueProvinceRules(transactionDate, hasDateBlockingIssue) {
  if (hasDateBlockingIssue) {
    return [];
  }

  return ["alava", "bizkaia", "gipuzkoa"]
    .map((territory) => selectEffectiveTerritoryRule(getTransferTaxTerritoryRules(territory), transactionDate))
    .filter(Boolean);
}

function uniqueRules(rules) {
  const seen = new Set();
  const output = [];
  for (const rule of rules) {
    if (!rule || seen.has(rule.id)) continue;
    seen.add(rule.id);
    output.push(rule);
  }
  return output;
}

function selectEffectiveTerritoryRule(rules, transactionDate) {
  return [...rules]
    .sort((left, right) => String(right.effectiveFrom ?? "").localeCompare(String(left.effectiveFrom ?? "")))
    .find((rule) => {
      const effectiveFrom = rule.effectiveFrom ?? "0000-01-01";
      const effectiveTo = rule.effectiveTo ?? "9999-12-31";
      return transactionDate >= effectiveFrom && transactionDate <= effectiveTo;
    }) ?? null;
}

function parseTransactionDate(value) {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return { date: value.toISOString().slice(0, 10) };
  }

  if (typeof value !== "string") {
    return { date: null };
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return { date: null };
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  const canonicalDate = parsedDate.toISOString().slice(0, 10);

  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day ||
    canonicalDate !== value
  ) {
    return { date: null };
  }

  return { date: canonicalDate };
}

function getTaxableBase({ purchasePrice, officialMarketValue }) {
  if (purchasePrice !== null && officialMarketValue !== null) {
    return { value: Math.max(purchasePrice, officialMarketValue), confirmed: true };
  }

  if (officialMarketValue !== null) {
    return { value: officialMarketValue, confirmed: false };
  }

  if (purchasePrice !== null) {
    return { value: purchasePrice, confirmed: false };
  }

  return { value: null, confirmed: false };
}

function getApplicableTerritoryRule({
  territoryRule,
  vehicleCategory,
  engineDisplacement,
  fiscalHorsepower,
  firstRegistrationDate,
  transactionDate,
  isHistoricVehicle,
}) {
  for (const specialRule of territoryRule.specialRules) {
    if (!ruleVehicleMatches(specialRule, vehicleCategory)) continue;
    if (!ruleFiscalHorsepowerMatches(specialRule, fiscalHorsepower)) continue;
    if (!ruleEngineMatches(specialRule, engineDisplacement)) continue;

    const ageMatches = ruleAgeMatches(specialRule, firstRegistrationDate, transactionDate);
    if (ageMatches === "missing") {
      return { warningCode: TRANSFER_TAX_WARNING_CODES.MISSING_FIRST_REGISTRATION_DATE, blocksCalculation: true };
    }
    if (!ageMatches) continue;

    if (specialRule.excludesHistoricVehicle && isHistoricVehicle) {
      return {
        warningCode: TRANSFER_TAX_WARNING_CODES.HISTORIC_VEHICLE_REQUIRES_REVIEW,
        blocksCalculation: true,
      };
    }

    return specialRule;
  }

  return null;
}

function ruleVehicleMatches(rule, vehicleCategory) {
  return !rule.vehicleCategories || rule.vehicleCategories.includes(vehicleCategory);
}

function ruleFiscalHorsepowerMatches(rule, fiscalHorsepower) {
  if (rule.minFiscalHorsepowerExclusive === undefined) return true;
  return fiscalHorsepower !== null && fiscalHorsepower > rule.minFiscalHorsepowerExclusive;
}

function ruleEngineMatches(rule, engineDisplacement) {
  if (rule.minEngineDisplacement === undefined && rule.maxEngineDisplacement === undefined) {
    return true;
  }

  if (engineDisplacement === null) {
    return false;
  }

  if (rule.minEngineDisplacement !== undefined && engineDisplacement <= rule.minEngineDisplacement) {
    return false;
  }

  if (rule.maxEngineDisplacement !== undefined && engineDisplacement > rule.maxEngineDisplacement) {
    return false;
  }

  return true;
}

function ruleAgeMatches(rule, firstRegistrationDate, transactionDate) {
  if (rule.minAgeMonthsExclusive === undefined) return true;
  const months = getMonthsBetween(firstRegistrationDate, transactionDate);

  if (months === null) {
    return "missing";
  }

  return months > rule.minAgeMonthsExclusive;
}

function getMonthsBetween(firstRegistrationDate, transactionDate) {
  const firstMonth = parseYearMonth(firstRegistrationDate);
  const transactionMonth = parseYearMonth(transactionDate);

  if (!firstMonth || !transactionMonth) {
    return null;
  }

  return transactionMonth.year * 12 + transactionMonth.month - (firstMonth.year * 12 + firstMonth.month);
}

function parseYearMonth(value) {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return { year: value.getUTCFullYear(), month: value.getUTCMonth() };
  }

  if (typeof value !== "string") {
    return null;
  }

  const match = value.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (!Number.isInteger(year) || month < 1 || month > 12) {
    return null;
  }

  return { year, month: month - 1 };
}
function calculateAmount(base, rate, fixedFee) {
  if (fixedFee !== null && fixedFee !== undefined) {
    return fixedFee;
  }

  if (rate === null || rate === undefined) {
    return null;
  }

  return roundMoney(base * rate);
}

function sanitizeEvidence(value) {
  if (value === undefined || value === null) {
    return { value: null, invalid: false };
  }

  const cloned = cloneJsonSerializable(value);
  return cloned.invalid ? { value: null, invalid: true } : cloned;
}

function cloneJsonSerializable(value, seen = new WeakSet()) {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return { value, invalid: false };
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? { value, invalid: false } : { value: null, invalid: true };
  }

  if (typeof value !== "object") {
    return { value: null, invalid: true };
  }

  if (seen.has(value)) {
    return { value: null, invalid: true };
  }

  if (Array.isArray(value)) {
    seen.add(value);
    let invalid = false;
    const items = value.map((item) => {
      const cloned = cloneJsonSerializable(item, seen);
      invalid = invalid || cloned.invalid;
      return cloned.value;
    });
    seen.delete(value);
    return { value: items, invalid };
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    return { value: null, invalid: true };
  }

  seen.add(value);
  let invalid = false;
  const output = {};
  for (const [key, item] of Object.entries(value)) {
    const cloned = cloneJsonSerializable(item, seen);
    invalid = invalid || cloned.invalid;
    if (cloned.value !== undefined) {
      output[key] = cloned.value;
    }
  }
  seen.delete(value);

  return { value: output, invalid };
}

function cloneStringArray(values) {
  return Array.isArray(values) ? [...values] : [];
}

function cloneArrayOfJsonObjects(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values.map((value) => cloneJsonSerializable(value).value).filter((value) => value !== null);
}

function cloneScenarios(scenarios) {
  if (!Array.isArray(scenarios)) {
    return [];
  }

  return scenarios.map((scenario) => buildScenario(scenario));
}

function buildOutcome({
  applicability,
  supportedCalculation,
  taxAmount,
  probableAmount,
  minimumAmount,
  maximumAmount,
  prudentBudget,
  taxableBase,
  rate,
  fixedFee,
  territoryRule,
  territoryStatus,
  legalBasis,
  assumptions,
  warnings,
  warningCodes,
  missingFields,
  evidence,
  normalizedCountries,
  filingRequirement,
  filingForm,
}) {
  return {
    applicability,
    supportedCalculation: Boolean(supportedCalculation),
    taxAmount: finiteMoneyOrNull(taxAmount),
    probableAmount: finiteMoneyOrNull(probableAmount),
    minimumAmount: finiteMoneyOrNull(minimumAmount),
    maximumAmount: finiteMoneyOrNull(maximumAmount),
    prudentBudget: finiteMoneyOrNull(prudentBudget),
    taxableBase: finiteMoneyOrNull(taxableBase),
    rate: typeof rate === "number" && Number.isFinite(rate) ? rate : null,
    fixedFee: finiteMoneyOrNull(fixedFee),
    territoryRule: typeof territoryRule === "string" ? territoryRule : territoryRule?.id ?? null,
    territoryStatus: territoryStatus ?? (typeof territoryRule === "string" ? null : territoryRule?.status ?? null),
    legalBasis: cloneArrayOfJsonObjects(legalBasis),
    assumptions: cloneStringArray(assumptions),
    warnings: cloneStringArray(warnings),
    warningCodes: cloneStringArray(dedupeWarningCodes(Array.isArray(warningCodes) ? warningCodes : [])),
    missingFields: cloneStringArray(uniqueStrings(Array.isArray(missingFields) ? missingFields : [])),
    evidence: cloneJsonSerializable(evidence).value,
    normalizedCountries: cloneJsonSerializable(normalizedCountries).value ?? { buyerTaxResidenceCountry: null, sellerCountry: null },
    filingRequirement: normalizeFilingRequirement(filingRequirement),
    filingForm: filingForm === "620" ? "620" : null,
  };
}

function buildResult(input) {
  const outcome = buildOutcome(input);

  return {
    applicability: outcome.applicability,
    supportedCalculation: outcome.supportedCalculation,
    taxAmount: outcome.taxAmount,
    probableAmount: outcome.probableAmount,
    minimumAmount: outcome.minimumAmount,
    maximumAmount: outcome.maximumAmount,
    prudentBudget: outcome.prudentBudget,
    taxableBase: outcome.taxableBase,
    rate: outcome.rate,
    fixedFee: outcome.fixedFee,
    territoryRule: outcome.territoryRule,
    territoryStatus: outcome.territoryStatus,
    legalBasis: outcome.legalBasis,
    scenarios: cloneScenarios(input.scenarios),
    assumptions: outcome.assumptions,
    warnings: outcome.warnings,
    warningCodes: outcome.warningCodes,
    missingFields: outcome.missingFields,
    evidence: outcome.evidence,
    normalizedCountries: outcome.normalizedCountries,
    filingRequirement: outcome.filingRequirement,
    filingForm: outcome.filingForm,
  };
}

function buildScenario({
  id,
  label,
  applicability,
  supportedCalculation,
  taxAmount,
  probableAmount,
  minimumAmount,
  maximumAmount,
  prudentBudget,
  taxableBase,
  rate,
  fixedFee,
  territoryRule,
  territoryStatus,
  legalBasis,
  assumptions,
  warnings,
  warningCodes,
  missingFields,
  evidence,
  normalizedCountries,
  filingRequirement,
  filingForm,
}) {
  const outcome = buildOutcome({
    applicability,
    supportedCalculation,
    taxAmount,
    probableAmount,
    minimumAmount,
    maximumAmount,
    prudentBudget,
    taxableBase,
    rate,
    fixedFee,
    territoryRule,
    territoryStatus,
    legalBasis,
    assumptions,
    warnings,
    warningCodes,
    missingFields,
    evidence,
    normalizedCountries,
    filingRequirement,
    filingForm,
  });

  return {
    id,
    label,
    applicability: outcome.applicability,
    supportedCalculation: outcome.supportedCalculation,
    taxAmount: outcome.taxAmount,
    probableAmount: outcome.probableAmount,
    minimumAmount: outcome.minimumAmount,
    maximumAmount: outcome.maximumAmount,
    prudentBudget: outcome.prudentBudget,
    taxableBase: outcome.taxableBase,
    rate: outcome.rate,
    fixedFee: outcome.fixedFee,
    territoryRule: outcome.territoryRule,
    territoryStatus: outcome.territoryStatus,
    legalBasis: outcome.legalBasis,
    assumptions: outcome.assumptions,
    warnings: outcome.warnings,
    warningCodes: outcome.warningCodes,
    missingFields: outcome.missingFields,
    evidence: outcome.evidence,
    normalizedCountries: outcome.normalizedCountries,
    filingRequirement: outcome.filingRequirement,
    filingForm: outcome.filingForm,
  };
}

function getTerritoryLegalBasisItems(territoryRule, summary) {
  const sources = Array.isArray(territoryRule?.sources) ? territoryRule.sources : (territoryRule?.source ? [territoryRule.source] : []);
  return sources
    .filter((source) => source?.url)
    .map((source) => legalBasis(source.title, source.article, summary, source.url));
}

function normalizeFilingRequirement(value) {
  return Object.values(TRANSFER_TAX_FILING_REQUIREMENTS).includes(value)
    ? value
    : TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN;
}

function mergeScenarioFilingRequirement(scenarios) {
  const requirements = uniqueStrings((Array.isArray(scenarios) ? scenarios : []).map((scenario) => scenario.filingRequirement));
  if (requirements.length === 0) return TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN;
  if (requirements.length === 1) return requirements[0];
  if (requirements.includes(TRANSFER_TAX_FILING_REQUIREMENTS.REQUIRED)) return TRANSFER_TAX_FILING_REQUIREMENTS.CONDITIONAL;
  if (requirements.includes(TRANSFER_TAX_FILING_REQUIREMENTS.CONDITIONAL)) return TRANSFER_TAX_FILING_REQUIREMENTS.CONDITIONAL;
  return TRANSFER_TAX_FILING_REQUIREMENTS.UNKNOWN;
}

function mergeScenarioFilingForm(scenarios) {
  return (Array.isArray(scenarios) ? scenarios : []).some((scenario) => scenario.filingForm === "620") ? "620" : null;
}

function legalBasis(source, article, summary, url = "https://www.boe.es/buscar/act.php?id=BOE-A-1993-25359") {
  return { source, article, summary, url };
}

function getOperationClassificationConflict({ sellerType, documentType, vatRegime }) {
  const conflicts = [];

  if (sellerType === SELLER_TYPES.PRIVATE && documentType === DOCUMENT_TYPES.INVOICE) {
    conflicts.push("vendedor particular con factura");
  }
  if (sellerType === SELLER_TYPES.PROFESSIONAL && documentType === DOCUMENT_TYPES.PRIVATE_SALE_CONTRACT) {
    conflicts.push("vendedor profesional con contrato privado");
  }
  if (sellerType === SELLER_TYPES.PRIVATE && vatRegime === VAT_REGIMES.GENERAL_VAT) {
    conflicts.push("vendedor particular con IVA general");
  }
  if (sellerType === SELLER_TYPES.PRIVATE && vatRegime === VAT_REGIMES.REBU) {
    conflicts.push("vendedor particular con REBU");
  }
  if (sellerType === SELLER_TYPES.PROFESSIONAL && vatRegime === VAT_REGIMES.NOT_APPLICABLE_PRIVATE_SALE) {
    conflicts.push("vendedor profesional con regimen propio de compraventa particular");
  }

  return conflicts.length > 0
    ? `Clasificacion fiscal contradictoria: ${conflicts.join("; ")}.`
    : null;
}

function parsePositiveMoney(value) {
  const numericValue = parsePositiveNumber(value);
  return numericValue === null ? null : roundMoney(numericValue);
}

function parsePositiveNumber(value) {
  if (!isPresent(value)) {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(String(value).trim().replace(",", "."));
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
}

function addInvalidIfPresent(warningCodes, fieldName, rawValue, parsedValue) {
  if (fieldName && isPresent(rawValue) && parsedValue === null) {
    warningCodes.push(TRANSFER_TAX_WARNING_CODES.INVALID_INPUT);
  }
}

function isPresent(value) {
  return value !== null && value !== undefined && value !== "";
}

function normalizeEnum(value, allowedValues, fallback) {
  const normalizedValue = String(value ?? "").trim().toLocaleLowerCase("es-ES");
  return allowedValues.includes(normalizedValue) ? normalizedValue : fallback;
}

function normalizeVehicleCategory(value) {
  const normalizedValue = String(value ?? "").trim().toLocaleLowerCase("es-ES");
  return CATEGORY_ALIASES.get(normalizedValue) ?? null;
}

function normalizeCountry(value) {
  if (!isPresent(value)) {
    return { code: null, invalid: false };
  }

  const normalizedValue = String(value)
    .trim()
    .toLocaleLowerCase("es-ES")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const code = COUNTRY_ALIASES.get(normalizedValue) ?? null;

  return { code, invalid: code === null };
}

function normalizeOptionalString(value) {
  const normalizedValue = String(value ?? "").trim();
  return normalizedValue || null;
}

function getWarningsFromCodes(codes) {
  return dedupeWarningCodes(codes).map((code) => WARNING_MESSAGES_BY_CODE[code]);
}

function dedupeWarningCodes(codes) {
  return uniqueStrings(codes.filter((code) => code && WARNING_MESSAGES_BY_CODE[code]));
}

function uniqueStrings(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function minScenarioAmount(scenarios) {
  const amounts = scenarios
    .map((scenario) => scenario.taxAmount ?? scenario.minimumAmount)
    .filter((amount) => typeof amount === "number" && Number.isFinite(amount));
  return amounts.length > 0 ? Math.min(...amounts) : null;
}

function maxScenarioAmount(scenarios) {
  const amounts = scenarios
    .map((scenario) => scenario.taxAmount ?? scenario.prudentBudget ?? scenario.maximumAmount)
    .filter((amount) => typeof amount === "number" && Number.isFinite(amount));
  return amounts.length > 0 ? Math.max(...amounts) : null;
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function finiteMoneyOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
