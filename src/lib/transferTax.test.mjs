import test from "node:test";
import assert from "node:assert/strict";

import { TRANSFER_TAX_TERRITORY_RULES } from "../data/transferTaxRules.mjs";
import {
  BUYER_TYPES,
  calculateTransferTax,
  SELLER_TYPES,
  TRANSFER_TAX_WARNING_CODES,
  VAT_REGIMES,
} from "./transferTax.mjs";

const baseInput = {
  transactionDate: "2026-07-01",
  buyerRegion: "asturias",
  sellerType: SELLER_TYPES.PRIVATE,
  buyerType: BUYER_TYPES.PRIVATE,
  documentType: "private_sale_contract",
  vatRegime: VAT_REGIMES.NOT_APPLICABLE_PRIVATE_SALE,
  purchasePrice: 12000,
  officialMarketValue: 10000,
  vehicleCategory: "passenger_car",
  engineDisplacement: 1995,
  fiscalHorsepower: 14.7,
  firstRegistrationDate: "2018-06-01",
};

test("particular espanol sujeto calcula ITP en comunidad soportada", () => {
  const result = calculateTransferTax(baseInput);

  assert.equal(result.applicability, "taxable");
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxableBase, 12000);
  assert.equal(result.rate, 0.04);
  assert.equal(result.taxAmount, 480);
  assert.equal(result.territoryRule, "asturias");
});

test("particular aleman con comprador residente en Espana puede quedar sujeto", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerCountry: "DE",
    buyerTaxResidenceCountry: "ES",
    buyerRegion: "castilla_leon",
    purchasePrice: 10000,
    officialMarketValue: 15000,
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxableBase, 15000);
  assert.equal(result.rate, 0.05);
  assert.equal(result.taxAmount, 750);
});

test("profesional con factura general queda no sujeto con cuota cero", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.PROFESSIONAL,
    documentType: "invoice",
    vatRegime: VAT_REGIMES.GENERAL_VAT,
  });

  assert.equal(result.applicability, "not_subject");
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxAmount, 0);
  assert.equal(result.probableAmount, 0);
  assert.equal(result.warningCodes.includes("UNKNOWN_VAT_REGIME"), false);
});

test("profesional REBU queda no sujeto con cuota cero", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.PROFESSIONAL,
    documentType: "invoice",
    vatRegime: VAT_REGIMES.REBU,
  });

  assert.equal(result.applicability, "not_subject");
  assert.equal(result.taxAmount, 0);
});

test("profesional con IVA no desglosado queda no sujeto y advierte regimen pendiente", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.PROFESSIONAL,
    documentType: "invoice",
    vatRegime: VAT_REGIMES.VAT_NOT_ITEMIZED,
  });

  assert.equal(result.taxAmount, 0);
  assert.ok(result.warningCodes.includes("UNKNOWN_VAT_REGIME"));
});

test("vendedor desconocido devuelve escenario particular y profesional sin probableAmount", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.UNKNOWN,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.taxAmount, null);
  assert.equal(result.probableAmount, null);
  assert.equal(result.scenarios.length, 2);
  assert.equal(result.scenarios[0].id, "seller_private");
  assert.equal(result.scenarios[0].taxAmount, 480);
  assert.equal(result.scenarios[1].id, "seller_professional");
  assert.equal(result.scenarios[1].taxAmount, 0);
  assert.equal(result.prudentBudget, 480);
});

test("precio superior al valor oficial define la base imponible", () => {
  const result = calculateTransferTax({
    ...baseInput,
    purchasePrice: 22000,
    officialMarketValue: 18000,
  });

  assert.equal(result.taxableBase, 22000);
  assert.equal(result.taxAmount, 880);
});

test("valor oficial superior al precio define la base imponible", () => {
  const result = calculateTransferTax({
    ...baseInput,
    purchasePrice: 12000,
    officialMarketValue: 18000,
  });

  assert.equal(result.taxableBase, 18000);
  assert.equal(result.taxAmount, 720);
});

test("falta de valor oficial no confirma cuota y conserva escenario minimo", () => {
  const result = calculateTransferTax({
    ...baseInput,
    officialMarketValue: undefined,
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(result.minimumAmount, 480);
  assert.ok(result.warningCodes.includes("MISSING_OFFICIAL_MARKET_VALUE"));
});

test("falta de precio usa valor oficial como provisional y marca dato pendiente", () => {
  const result = calculateTransferTax({
    ...baseInput,
    purchasePrice: undefined,
    officialMarketValue: 15000,
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(result.probableAmount, 600);
  assert.equal(result.taxableBase, 15000);
  assert.ok(result.missingFields.includes("purchasePrice"));
  assert.ok(result.warningCodes.includes("MISSING_PURCHASE_PRICE"));
});

test("inputs cero negativos NaN Infinity y texto invalido no generan cuota confirmada", () => {
  for (const invalidValue of [0, -1, Number.NaN, Infinity, "abc"]) {
    const result = calculateTransferTax({
      ...baseInput,
      purchasePrice: invalidValue,
    });

    assert.equal(result.supportedCalculation, false);
    assert.equal(result.taxAmount, null);
    assert.ok(result.warningCodes.includes("INVALID_INPUT"));
  }
});

test("comunidad soportada aplica frontera exacta de potencia fiscal", () => {
  const lowPower = calculateTransferTax({
    ...baseInput,
    buyerRegion: "asturias",
    fiscalHorsepower: 15,
  });
  const highPower = calculateTransferTax({
    ...baseInput,
    buyerRegion: "asturias",
    fiscalHorsepower: 15.01,
  });

  assert.equal(lowPower.rate, 0.04);
  assert.equal(lowPower.taxAmount, 480);
  assert.equal(highPower.rate, 0.08);
  assert.equal(highPower.taxAmount, 960);
});

test("aragon aplica cuotas fijas de mas de 10 anos con fronteras exactas", () => {
  const notMoreThanTenYears = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    transactionDate: "2026-07-01",
    firstRegistrationDate: "2016-07-01",
    engineDisplacement: 1000,
  });
  const upTo1000 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 1000,
  });
  const upTo1500 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 1500,
  });
  const upTo2000 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 2000,
  });

  assert.equal(notMoreThanTenYears.taxAmount, 480);
  assert.equal(upTo1000.fixedFee, 0);
  assert.equal(upTo1000.taxAmount, 0);
  assert.equal(upTo1500.taxAmount, 20);
  assert.equal(upTo2000.taxAmount, 30);
});

test("cantabria aplica cuotas fijas de mas de 10 anos con fronteras exactas", () => {
  const upTo999 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "cantabria",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 999,
  });
  const from1000 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "cantabria",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 1000,
  });
  const from1500 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "cantabria",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 1500,
  });
  const over1999 = calculateTransferTax({
    ...baseInput,
    buyerRegion: "cantabria",
    firstRegistrationDate: "2016-06-01",
    engineDisplacement: 2000,
  });

  assert.equal(upTo999.taxAmount, 55);
  assert.equal(from1000.taxAmount, 75);
  assert.equal(from1500.taxAmount, 115);
  assert.equal(over1999.rate, 0.08);
  assert.equal(over1999.taxAmount, 960);
});

test("Navarra aplica tipo foral general 4 por ciento", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerRegion: "navarra",
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxableBase, 12000);
  assert.equal(result.rate, 0.04);
  assert.equal(result.taxAmount, 480);
  assert.equal(result.territoryStatus, "SUPPORTED_WITH_CONDITIONS");
  assert.ok(result.assumptions.some((assumption) => assumption.includes("fuente territorial aplicable")));
});

test("Pais Vasco sin provincia requiere territorio foral", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerRegion: "pais_vasco",
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("BUYER_PROVINCE_REQUIRED"));
});

test("revendedor sin evidencia suficiente conserva escenario ordinario y posible exencion", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerType: BUYER_TYPES.VEHICLE_RESELLER,
    intendedForResale: true,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.taxAmount, null);
  assert.equal(result.scenarios.length, 2);
  assert.equal(result.scenarios[0].taxAmount, 480);
  assert.equal(result.scenarios[1].id, "reseller_provisional_exemption");
  assert.ok(result.warningCodes.includes("RESELLER_EXEMPTION_REQUIRES_EVIDENCE"));
  assert.equal(result.prudentBudget, 480);
});

test("no confunde cuota no calculable con cuota cero de no sujecion", () => {
  const review = calculateTransferTax({
    ...baseInput,
    buyerRegion: "pais_vasco",
  });
  const professional = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.PROFESSIONAL,
    documentType: "invoice",
    vatRegime: VAT_REGIMES.GENERAL_VAT,
  });

  assert.equal(review.taxAmount, null);
  assert.equal(professional.taxAmount, 0);
});

test("fuentes y fechas versionadas presentes en reglas automatizadas", () => {
  const automatedRules = TRANSFER_TAX_TERRITORY_RULES.filter((rule) => ["SUPPORTED", "SUPPORTED_WITH_CONDITIONS"].includes(rule.status));

  assert.ok(automatedRules.length >= 1);
  for (const rule of automatedRules) {
    assert.ok(rule.effectiveFrom);
    assert.ok(rule.source.title);
    assert.ok(rule.source.url);
    assert.ok(rule.source.article);
    assert.match(rule.source.verifiedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("no muta los argumentos de entrada", () => {
  const input = {
    ...baseInput,
    evidence: { document: "contract.pdf", page: 1 },
  };
  const before = JSON.stringify(input);

  calculateTransferTax(input);

  assert.equal(JSON.stringify(input), before);
});

test("region invalida no devuelve boolean null ni usa territorio por defecto", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerRegion: "does_not_exist",
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(typeof result.supportedCalculation, "boolean");
  assert.ok(result.warningCodes.includes("INVALID_BUYER_REGION"));
});

test("falta de buyerRegion conserva warning explicito", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerRegion: undefined,
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("MISSING_BUYER_REGION"));
});

test("comprador ES y vendedor DE calcula con paises normalizados", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerTaxResidenceCountry: "ES",
    sellerCountry: "Alemania",
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxAmount, 480);
  assert.deepEqual(result.normalizedCountries, {
    buyerTaxResidenceCountry: "ES",
    sellerCountry: "DE",
  });
});

test("comprador DE con region espanola queda como conflicto condicional", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerTaxResidenceCountry: "DE",
    buyerRegion: "asturias",
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(result.prudentBudget, 480);
  assert.ok(result.warningCodes.includes("BUYER_TAX_RESIDENCE_CONFLICT"));
  assert.equal(result.scenarios[0].id, "buyer_spanish_tax_residence_condition");
});

test("pais comprador ausente con region espanola infiere residencia de forma explicita", () => {
  const result = calculateTransferTax(baseInput);

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxAmount, 480);
  assert.ok(result.assumptions.some((assumption) => assumption.includes("infiere provisionalmente residencia fiscal espanola")));
});

test("sellerCountry invalido advierte pero no cambia el importe", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerCountry: "Narnia",
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxAmount, 480);
  assert.ok(result.warningCodes.includes("INVALID_SELLER_COUNTRY"));
});

test("particular aleman con comprador residente en Espana mantiene calculo ITP", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerCountry: "DE",
    buyerTaxResidenceCountry: "Espana",
    buyerRegion: "castilla_leon",
    purchasePrice: 10000,
    officialMarketValue: 15000,
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxableBase, 15000);
  assert.equal(result.rate, 0.05);
  assert.equal(result.taxAmount, 750);
  assert.equal(result.normalizedCountries.sellerCountry, "DE");
});

test("contradicciones documentales no confirman cuota y generan escenarios", () => {
  const contradictoryInputs = [
    { sellerType: SELLER_TYPES.PRIVATE, documentType: "invoice" },
    { sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "private_sale_contract", vatRegime: VAT_REGIMES.GENERAL_VAT },
    { sellerType: SELLER_TYPES.PRIVATE, vatRegime: VAT_REGIMES.GENERAL_VAT },
    { sellerType: SELLER_TYPES.PRIVATE, vatRegime: VAT_REGIMES.REBU },
    { sellerType: SELLER_TYPES.PROFESSIONAL, vatRegime: VAT_REGIMES.NOT_APPLICABLE_PRIVATE_SALE, documentType: "invoice" },
  ];

  for (const patch of contradictoryInputs) {
    const result = calculateTransferTax({
      ...baseInput,
      ...patch,
    });

    assert.equal(result.applicability, "scenario_required");
    assert.equal(result.supportedCalculation, false);
    assert.equal(result.taxAmount, null);
    assert.equal(result.scenarios.length, 2);
    assert.equal(result.prudentBudget, 480);
    assert.ok(result.warningCodes.includes("OPERATION_CLASSIFICATION_CONFLICT"));
  }
});

test("regla territorial versionada respeta effectiveFrom", () => {
  const before = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    transactionDate: "2005-09-26",
    firstRegistrationDate: "1990-01-01",
    engineDisplacement: 1200,
  });
  const exact = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    transactionDate: "2005-09-27",
    firstRegistrationDate: "1990-01-01",
    engineDisplacement: 1200,
  });

  assert.equal(before.supportedCalculation, false);
  assert.equal(before.taxAmount, null);
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
  assert.equal(exact.supportedCalculation, true);
  assert.equal(exact.taxAmount, 20);
});

test("Aragon en 2000 no aplica cuota fija posterior", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    transactionDate: "2000-01-01",
    firstRegistrationDate: "1980-01-01",
    engineDisplacement: 1200,
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(result.fixedFee, null);
  assert.ok(result.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("fecha futura no confirma calculo ITP", () => {
  const result = calculateTransferTax({
    ...baseInput,
    transactionDate: "2999-01-01",
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("FUTURE_TRANSACTION_DATE"));
});

test("fecha invalida o ausente no aplica regla versionada", () => {
  for (const transactionDate of ["not-a-date", undefined]) {
    const result = calculateTransferTax({
      ...baseInput,
      transactionDate,
    });

    assert.equal(result.supportedCalculation, false);
    assert.equal(result.taxAmount, null);
    assert.ok(result.warningCodes.includes("INVALID_OR_MISSING_TRANSACTION_DATE"));
  }
});

test("falta de primera matriculacion bloquea cuota fija por antiguedad", () => {
  const result = calculateTransferTax({
    ...baseInput,
    buyerRegion: "aragon",
    transactionDate: "2026-07-01",
    firstRegistrationDate: undefined,
    engineDisplacement: 1000,
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("MISSING_FIRST_REGISTRATION_DATE"));
});

test("categoria de vehiculo no soportada queda pendiente", () => {
  const result = calculateTransferTax({
    ...baseInput,
    vehicleCategory: "truck",
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("VEHICLE_CATEGORY_UNSUPPORTED"));
});

test("vendedor desconocido conserva warning estable", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.UNKNOWN,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("UNKNOWN_SELLER_TYPE"));
});

test("Cantabria historico excluye cuota fija y queda en revision", () => {
  const ordinary = calculateTransferTax({
    ...baseInput,
    buyerRegion: "cantabria",
    transactionDate: "2026-07-01",
    firstRegistrationDate: "2000-01-01",
    engineDisplacement: 999,
    isHistoricVehicle: false,
  });
  const historic = calculateTransferTax({
    ...baseInput,
    buyerRegion: "cantabria",
    transactionDate: "2026-07-01",
    firstRegistrationDate: "2000-01-01",
    engineDisplacement: 999,
    isHistoricVehicle: true,
  });

  assert.equal(ordinary.supportedCalculation, true);
  assert.equal(ordinary.fixedFee, 55);
  assert.equal(ordinary.taxAmount, 55);
  assert.equal(historic.supportedCalculation, false);
  assert.equal(historic.taxAmount, null);
  assert.equal(historic.fixedFee, null);
  assert.ok(historic.warningCodes.includes("HISTORIC_VEHICLE_REQUIRES_REVIEW"));
});


const cataloniaInput = {
  ...baseInput,
  transactionDate: "2025-06-27",
  buyerRegion: "cataluna",
  sellerType: SELLER_TYPES.PRIVATE,
  buyerType: BUYER_TYPES.PRIVATE,
  documentType: "private_sale_contract",
  vatRegime: VAT_REGIMES.NOT_APPLICABLE_PRIVATE_SALE,
  purchasePrice: 25000,
  officialMarketValue: 28000,
  originalBoeValue: 50000,
  vehicleCategory: "passenger_car",
  firstRegistrationDate: "2020-01-01",
  isHistoricVehicle: false,
  zeroEmissionStatus: "not_zero_emission",
};

test("Cataluna antes del 27/06/2025 no aplica tipo cero aunque este confirmado", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    transactionDate: "2025-06-26",
    zeroEmissionStatus: "confirmed",
  });

  assert.equal(result.applicability, "taxable");
  assert.equal(result.rate, 0.05);
  assert.equal(result.taxableBase, 28000);
  assert.equal(result.taxAmount, 1400);
  assert.equal(result.filingRequirement, "required");
  assert.equal(result.filingForm, "620");
});

test("Cataluna desde 27/06/2025 con cero emisiones confirmado aplica tipo 0 sujeto y modelo 620", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    zeroEmissionStatus: "confirmed",
  });

  assert.equal(result.applicability, "taxable");
  assert.equal(result.supportedCalculation, true);
  assert.equal(result.rate, 0);
  assert.equal(result.taxAmount, 0);
  assert.equal(result.taxableBase, 28000);
  assert.equal(result.filingRequirement, "required");
  assert.equal(result.filingForm, "620");
});

test("Cataluna desde 27/06/2025 sin cero emisiones aplica el 5 por ciento", () => {
  const result = calculateTransferTax(cataloniaInput);

  assert.equal(result.applicability, "taxable");
  assert.equal(result.rate, 0.05);
  assert.equal(result.taxAmount, 1400);
  assert.equal(result.filingRequirement, "required");
  assert.equal(result.filingForm, "620");
});

test("Cataluna con cero emisiones desconocido conserva escenarios 0 y 5 por ciento", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    zeroEmissionStatus: "unknown",
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.taxAmount, null);
  assert.equal(result.probableAmount, null);
  assert.equal(result.prudentBudget, 1400);
  assert.ok(result.warningCodes.includes("CATALONIA_ZERO_EMISSION_STATUS_REQUIRED"));
  assert.deepEqual(result.scenarios.map((scenario) => scenario.id), ["cataluna_zero_emission_confirmed", "cataluna_not_zero_emission"]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.taxAmount), [0, 1400]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.filingRequirement), ["required", "required"]);
});

test("Cataluna usa el mayor entre precio y valor fiscal depreciado", () => {
  const officialHigher = calculateTransferTax(cataloniaInput);
  const priceHigher = calculateTransferTax({
    ...cataloniaInput,
    purchasePrice: 31000,
    officialMarketValue: 28000,
  });

  assert.equal(officialHigher.taxableBase, 28000);
  assert.equal(officialHigher.taxAmount, 1400);
  assert.equal(priceHigher.taxableBase, 31000);
  assert.equal(priceHigher.taxAmount, 1550);
});

test("Cataluna particular aleman con comprador residente en Espana queda sujeto", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    sellerCountry: "DE",
    buyerTaxResidenceCountry: "ES",
  });

  assert.equal(result.supportedCalculation, true);
  assert.equal(result.taxableBase, 28000);
  assert.equal(result.taxAmount, 1400);
  assert.equal(result.normalizedCountries.sellerCountry, "DE");
});

test("Cataluna profesional REBU queda no sujeto con uso acreditativo condicional del modelo 620", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    sellerType: SELLER_TYPES.PROFESSIONAL,
    documentType: "invoice",
    vatRegime: VAT_REGIMES.REBU,
  });

  assert.equal(result.applicability, "not_subject");
  assert.equal(result.taxAmount, 0);
  assert.equal(result.filingRequirement, "conditional");
  assert.equal(result.filingForm, "620");
});

test("Cataluna aplica frontera exacta de diez anos por aniversario", () => {
  const before = calculateTransferTax({
    ...cataloniaInput,
    transactionDate: "2025-06-26",
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
  });
  const exact = calculateTransferTax({
    ...cataloniaInput,
    transactionDate: "2025-06-27",
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
  });

  assert.equal(before.applicability, "taxable");
  assert.equal(before.taxAmount, 1400);
  assert.equal(exact.applicability, "filing_not_required");
  assert.equal(exact.taxAmount, 0);
  assert.equal(exact.filingRequirement, "not_required");
  assert.equal(exact.filingForm, null);
});

test("Cataluna vehiculo antiguo usa el valor BOE original con umbral inclusivo de 40000", () => {
  const below = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
  });
  const exact = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 40000,
  });
  const above = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 40001,
  });

  assert.equal(below.applicability, "filing_not_required");
  assert.equal(below.taxAmount, 0);
  assert.equal(exact.applicability, "taxable");
  assert.equal(exact.taxAmount, 1400);
  assert.equal(above.applicability, "taxable");
  assert.equal(above.taxAmount, 1400);
});

test("Cataluna historico queda excluido de la no obligacion de presentar", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
    isHistoricVehicle: true,
  });

  assert.equal(result.applicability, "taxable");
  assert.equal(result.taxAmount, 1400);
  assert.equal(result.filingRequirement, "required");
  assert.equal(result.filingForm, "620");
});

test("Cataluna estado historico desconocido genera escenarios", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
    isHistoricVehicle: undefined,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.ok(result.warningCodes.includes("CATALONIA_HISTORIC_STATUS_REQUIRED"));
  assert.ok(result.scenarios.some((scenario) => scenario.applicability === "filing_not_required"));
  assert.ok(result.scenarios.some((scenario) => scenario.applicability === "taxable"));
  assert.equal(result.prudentBudget, 1400);
});

test("Cataluna originalBoeValue ausente genera escenarios y presupuesto prudente", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: undefined,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.ok(result.warningCodes.includes("CATALONIA_ORIGINAL_BOE_VALUE_REQUIRED"));
  assert.ok(result.missingFields.includes("originalBoeValue"));
  assert.ok(result.scenarios.some((scenario) => scenario.applicability === "filing_not_required"));
  assert.ok(result.scenarios.some((scenario) => scenario.taxAmount === 1400));
  assert.equal(result.prudentBudget, 1400);
});

test("Cataluna con mes de primera matriculacion ambiguo genera escenarios de frontera de diez anos", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    transactionDate: "2025-06-15",
    firstRegistrationDate: "2015-06",
    originalBoeValue: 39999,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.taxAmount, null);
  assert.equal(result.prudentBudget, 1400);
  assert.ok(result.warningCodes.includes("CATALONIA_AGE_CALCULATION_ASSUMPTION"));
  assert.ok(result.missingFields.includes("firstRegistrationDate"));
  assert.ok(result.scenarios.some((scenario) => scenario.id === "cataluna_age_reaches_ten_years" && scenario.applicability === "filing_not_required"));
  assert.ok(result.scenarios.some((scenario) => scenario.id === "cataluna_age_not_yet_ten_years" && scenario.taxAmount === 1400));
});

test("Cataluna interseccion antiguedad y cero emisiones confirmado conserva escenarios formales", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
    zeroEmissionStatus: "confirmed",
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.taxAmount, null);
  assert.equal(result.prudentBudget, 0);
  assert.equal(result.filingRequirement, "conditional");
  assert.equal(result.filingForm, "620");
  assert.ok(result.warningCodes.includes("CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW"));
  assert.deepEqual(result.scenarios.map((scenario) => scenario.id), ["cataluna_old_vehicle_no_filing", "cataluna_zero_emission_required_filing"]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.applicability), ["filing_not_required", "taxable"]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.filingRequirement), ["not_required", "required"]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.filingForm), [null, "620"]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.taxAmount), [0, 0]);
});

test("Cataluna interseccion antiguedad y cero emisiones desconocido exige estado ambiental", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    firstRegistrationDate: "2015-06-27",
    originalBoeValue: 39999,
    zeroEmissionStatus: undefined,
  });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.filingRequirement, "conditional");
  assert.equal(result.filingForm, "620");
  assert.ok(result.warningCodes.includes("CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW"));
  assert.ok(result.warningCodes.includes("CATALONIA_ZERO_EMISSION_STATUS_REQUIRED"));
  assert.ok(result.missingFields.includes("zeroEmissionStatus"));
  assert.deepEqual(result.scenarios.map((scenario) => scenario.id), ["cataluna_old_vehicle_no_filing", "cataluna_zero_emission_required_filing"]);
});
test("Cataluna antes del periodo respaldado no aplica regla retroactiva", () => {
  const result = calculateTransferTax({
    ...cataloniaInput,
    transactionDate: "2024-12-31",
  });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
  assert.equal(result.filingRequirement, "unknown");
});

const expandedTerritoryInput = {
  ...baseInput,
  transactionDate: "2026-07-01",
  purchasePrice: 25000,
  officialMarketValue: 28000,
  firstRegistrationDate: "2020-01-01",
  engineDisplacement: 1995,
  fiscalHorsepower: 14.9,
  zeroEmissionStatus: "not_zero_emission",
  isHistoricVehicle: false,
  isEndOfLifeVehicle: false,
};

test("Andalucia aplica general, 8 por ciento solo si supera 15 CVF y 1 por ciento cero emisiones", () => {
  const normal = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", fiscalHorsepower: 15 });
  const highPower = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", fiscalHorsepower: 15.01 });
  const zeroEmission = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", fiscalHorsepower: 16, zeroEmissionStatus: "confirmed" });
  const before = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", transactionDate: "2021-12-31" });

  assert.equal(normal.rate, 0.04);
  assert.equal(normal.taxAmount, 1120);
  assert.equal(highPower.rate, 0.08);
  assert.equal(highPower.taxAmount, 2240);
  assert.equal(zeroEmission.rate, 0.01);
  assert.equal(zeroEmission.taxAmount, 280);
  assert.equal(zeroEmission.filingRequirement, "required");
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Andalucia conserva escenario excepcional DANA hasta 31/12/2025 si falta evidencia", () => {
  const unknown = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", transactionDate: "2025-12-31", evidence: {} });
  const confirmed = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", transactionDate: "2025-12-31", evidence: { andalusiaDanaReplacement: true } });
  const discarded = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", transactionDate: "2025-12-31", evidence: { andalusiaDanaReplacement: false } });
  const after = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", transactionDate: "2026-01-01", evidence: {} });

  assert.equal(unknown.applicability, "scenario_required");
  assert.deepEqual(unknown.scenarios.map((scenario) => scenario.taxAmount), [0, 1120]);
  assert.equal(unknown.prudentBudget, 1120);
  assert.ok(unknown.warningCodes.includes("ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED"));
  assert.equal(confirmed.rate, 0);
  assert.equal(confirmed.taxAmount, 0);
  assert.equal(confirmed.filingRequirement, "required");
  assert.equal(discarded.taxAmount, 1120);
  assert.equal(after.warningCodes.includes("ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED"), false);
});
test("Andalucia abre escenarios si falta estado cero emisiones o potencia fiscal", () => {
  const zeroUnknown = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", zeroEmissionStatus: "unknown", fiscalHorsepower: 14 });
  const hpMissing = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", fiscalHorsepower: undefined });

  assert.equal(zeroUnknown.applicability, "scenario_required");
  assert.deepEqual(zeroUnknown.scenarios.map((scenario) => scenario.taxAmount), [280, 1120]);
  assert.equal(zeroUnknown.prudentBudget, 1120);
  assert.ok(zeroUnknown.warningCodes.includes("ANDALUSIA_ZERO_EMISSION_STATUS_REQUIRED"));
  assert.equal(hpMissing.applicability, "scenario_required");
  assert.deepEqual(hpMissing.scenarios.map((scenario) => scenario.taxAmount), [1120, 2240]);
  assert.equal(hpMissing.prudentBudget, 2240);
  assert.ok(hpMissing.warningCodes.includes("ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED"));
});

test("Illes Balears aplica 8 por ciento solo por encima de 15 CVF y escenarios si falta potencia", () => {
  const exact = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "illes_balears", fiscalHorsepower: 15 });
  const above = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "illes_balears", fiscalHorsepower: 15.01 });
  const missing = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "illes_balears", fiscalHorsepower: undefined });
  const before = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "illes_balears", transactionDate: "2014-06-07" });

  assert.equal(exact.rate, 0.04);
  assert.equal(exact.taxAmount, 1120);
  assert.equal(above.rate, 0.08);
  assert.equal(above.taxAmount, 2240);
  assert.equal(missing.applicability, "scenario_required");
  assert.equal(missing.prudentBudget, 2240);
  assert.ok(missing.warningCodes.includes("BALEARIC_FISCAL_HORSEPOWER_REQUIRED"));
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Comunitat Valenciana aplica general 6 por ciento e incrementado por valor y cilindrada", () => {
  const general = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2023-01-01", engineDisplacement: 1999 });
  const valueBelow = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 19999, officialMarketValue: 18000, firstRegistrationDate: "2023-01-01", engineDisplacement: 1999 });
  const valueExact = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 20000, officialMarketValue: 18000, firstRegistrationDate: "2023-01-01", engineDisplacement: 1999 });
  const youngHighCc = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2023-01-01", engineDisplacement: 2001 });

  assert.equal(general.rate, 0.06);
  assert.equal(general.taxAmount, 1080);
  assert.equal(valueBelow.taxAmount, 1199.94);
  assert.equal(valueExact.rate, 0.08);
  assert.equal(valueExact.taxAmount, 1600);
  assert.equal(youngHighCc.rate, 0.08);
  assert.equal(youngHighCc.taxAmount, 1440);
});

test("Comunitat Valenciana aplica cuotas fijas por antiguedad valor y cilindrada excluyendo historicos", () => {
  const old1500 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "valencia", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2010-06-01", engineDisplacement: 1500 });
  const old1501 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "valencia", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2010-06-01", engineDisplacement: 1501 });
  const old2001 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "valencia", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2010-06-01", engineDisplacement: 2001 });
  const mid2001 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "valencia", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2018-06-01", engineDisplacement: 2001 });
  const historic = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "valencia", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2010-06-01", engineDisplacement: 1500, isHistoricVehicle: true });

  assert.equal(old1500.fixedFee, 40);
  assert.equal(old1501.fixedFee, 60);
  assert.equal(old2001.fixedFee, 140);
  assert.equal(mid2001.fixedFee, 280);
  assert.equal(historic.rate, 0.06);
  assert.equal(historic.taxAmount, 1080);
});

test("Comunitat Valenciana abre escenarios por fin de vida cilindrada e historico desconocidos", () => {
  const endOfLifeUnknown = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2023-01-01", engineDisplacement: 2001, isEndOfLifeVehicle: undefined });
  const engineMissing = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2010-06-01", engineDisplacement: undefined });
  const historicUnknown = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 18000, officialMarketValue: 18000, firstRegistrationDate: "2010-06-01", engineDisplacement: 1500, isHistoricVehicle: undefined });

  assert.equal(endOfLifeUnknown.applicability, "scenario_required");
  assert.equal(endOfLifeUnknown.prudentBudget, 1440);
  assert.ok(endOfLifeUnknown.warningCodes.includes("VALENCIA_END_OF_LIFE_STATUS_REQUIRED"));
  assert.equal(engineMissing.applicability, "scenario_required");
  assert.equal(engineMissing.prudentBudget, 140);
  assert.ok(engineMissing.warningCodes.includes("VALENCIA_ENGINE_DISPLACEMENT_REQUIRED"));
  assert.equal(historicUnknown.applicability, "scenario_required");
  assert.equal(historicUnknown.prudentBudget, 1080);
  assert.ok(historicUnknown.warningCodes.includes("TERRITORY_HISTORIC_STATUS_REQUIRED"));
});

test("Comunitat Valenciana aplica tipo 2 por ciento a fin de vida acreditado", () => {
  const result = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", purchasePrice: 18000, officialMarketValue: 18000, isEndOfLifeVehicle: true });
  const before = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "comunitat_valenciana", transactionDate: "2024-12-31" });

  assert.equal(result.rate, 0.02);
  assert.equal(result.taxAmount, 360);
  assert.equal(result.filingRequirement, "required");
  assert.equal(result.filingForm, "620");
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Galicia aplica tipo general 3 por ciento, 0 emisiones y cuotas fijas de 15 anos", () => {
  const general = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "not_zero_emission" });
  const zero = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "confirmed" });
  const fixed22 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "not_zero_emission", firstRegistrationDate: "2011-07-01", engineDisplacement: 1199 });
  const fixed38 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "not_zero_emission", firstRegistrationDate: "2011-07-01", engineDisplacement: 1200 });
  const over1599 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "not_zero_emission", firstRegistrationDate: "2011-07-01", engineDisplacement: 1600 });
  const before = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", transactionDate: "2024-12-31" });

  assert.equal(general.rate, 0.03);
  assert.equal(general.taxAmount, 840);
  assert.equal(zero.rate, 0);
  assert.equal(zero.taxAmount, 0);
  assert.equal(zero.filingRequirement, "required");
  assert.equal(fixed22.fixedFee, 22);
  assert.equal(fixed38.fixedFee, 38);
  assert.equal(over1599.rate, 0.03);
  assert.equal(over1599.taxAmount, 840);
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Galicia abre escenarios por cero emisiones o cilindrada desconocidos", () => {
  const zeroUnknown = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "unknown" });
  const engineMissing = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", zeroEmissionStatus: "not_zero_emission", firstRegistrationDate: "2011-07-01", engineDisplacement: undefined });

  assert.equal(zeroUnknown.applicability, "scenario_required");
  assert.deepEqual(zeroUnknown.scenarios.map((scenario) => scenario.taxAmount), [0, 840]);
  assert.ok(zeroUnknown.warningCodes.includes("GALICIA_ZERO_EMISSION_STATUS_REQUIRED"));
  assert.equal(engineMissing.applicability, "scenario_required");
  assert.equal(engineMissing.prudentBudget, 840);
  assert.ok(engineMissing.warningCodes.includes("GALICIA_ENGINE_DISPLACEMENT_REQUIRED"));
});

test("Murcia aplica general 4 por ciento y cuotas fijas de mas de 12 anos", () => {
  const general = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", firstRegistrationDate: "2015-07-01", engineDisplacement: 1995 });
  const noFiling = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", firstRegistrationDate: "2014-06-01", engineDisplacement: 1000 });
  const fixed30 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", firstRegistrationDate: "2014-06-01", engineDisplacement: 1001 });
  const fixed50 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", firstRegistrationDate: "2014-06-01", engineDisplacement: 1501 });
  const fixed75 = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", firstRegistrationDate: "2014-06-01", engineDisplacement: 2001 });
  const before = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", transactionDate: "2024-12-31" });

  assert.equal(general.rate, 0.04);
  assert.equal(general.taxAmount, 1120);
  assert.equal(noFiling.applicability, "filing_not_required");
  assert.equal(noFiling.taxAmount, 0);
  assert.equal(noFiling.filingRequirement, "not_required");
  assert.equal(noFiling.filingForm, null);
  assert.equal(fixed30.fixedFee, 30);
  assert.equal(fixed50.fixedFee, 50);
  assert.equal(fixed75.fixedFee, 75);
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Murcia abre escenarios si falta cilindrada en vehiculo antiguo", () => {
  const result = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", firstRegistrationDate: "2014-06-01", engineDisplacement: undefined });

  assert.equal(result.applicability, "scenario_required");
  assert.deepEqual(result.scenarios.map((scenario) => scenario.taxAmount), [0, 30, 50, 75]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.filingRequirement), ["not_required", "required", "required", "required"]);
  assert.equal(result.prudentBudget, 75);
  assert.ok(result.warningCodes.includes("MURCIA_ENGINE_DISPLACEMENT_REQUIRED"));
});

test("territorios ampliados mantienen comprador espanol con vendedor aleman profesional REBU y revendedor", () => {
  const privateGermanSeller = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "galicia", sellerCountry: "DE", buyerTaxResidenceCountry: "ES" });
  const professionalRebu = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "murcia", sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU });
  const reseller = calculateTransferTax({ ...expandedTerritoryInput, buyerRegion: "andalucia", buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true });

  assert.equal(privateGermanSeller.supportedCalculation, true);
  assert.equal(privateGermanSeller.taxAmount, 840);
  assert.equal(privateGermanSeller.normalizedCountries.sellerCountry, "DE");
  assert.equal(professionalRebu.applicability, "not_subject");
  assert.equal(professionalRebu.taxAmount, 0);
  assert.equal(reseller.applicability, "scenario_required");
  assert.equal(reseller.scenarios.at(-1).id, "reseller_provisional_exemption");
  assert.equal(reseller.prudentBudget, 1120);
});
const secondExpansionInput = {
  ...baseInput,
  transactionDate: "2026-07-01",
  purchasePrice: 25000,
  officialMarketValue: 28000,
  vehicleCategory: "passenger_car",
  engineDisplacement: 1500,
  fiscalHorsepower: 14,
  firstRegistrationDate: "2020-01-01",
  isHistoricVehicle: false,
  evidence: { madridReducedValuationUse: false },
};

test("Canarias aplica general 5,5 por ciento y cuotas fijas de turismos antiguos", () => {
  const recent = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2016-07-01", engineDisplacement: 1500 });
  const exactTenYears = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2016-07-01", engineDisplacement: 1000 });
  const upTo1000 = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: 1000, isHistoricVehicle: false });
  const upTo1500 = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: 1500, isHistoricVehicle: false });
  const upTo2000 = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: 2000, isHistoricVehicle: false });
  const over2000 = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: 2001, isHistoricVehicle: false });
  const before = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", transactionDate: "2024-12-31" });

  assert.equal(recent.rate, 0.055);
  assert.equal(recent.taxAmount, 1540);
  assert.equal(exactTenYears.rate, 0.055);
  assert.equal(exactTenYears.taxAmount, 1540);
  assert.equal(upTo1000.fixedFee, 40);
  assert.equal(upTo1000.taxAmount, 40);
  assert.equal(upTo1500.fixedFee, 70);
  assert.equal(upTo1500.taxAmount, 70);
  assert.equal(upTo2000.fixedFee, 115);
  assert.equal(upTo2000.taxAmount, 115);
  assert.equal(over2000.rate, 0.055);
  assert.equal(over2000.taxAmount, 1540);
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Canarias historico datos ausentes particular aleman y profesional REBU", () => {
  const historic = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: 1000, isHistoricVehicle: true });
  const historicUnknown = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: 1000, isHistoricVehicle: undefined });
  const engineMissing = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", firstRegistrationDate: "2015-06-01", engineDisplacement: undefined, isHistoricVehicle: false });
  const foreignSeller = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", sellerCountry: "DE", buyerTaxResidenceCountry: "ES" });
  const professionalRebu = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "canarias", sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU });

  assert.equal(historic.rate, 0.055);
  assert.equal(historic.taxAmount, 1540);
  assert.equal(historicUnknown.applicability, "scenario_required");
  assert.deepEqual(historicUnknown.scenarios.map((scenario) => scenario.taxAmount), [40, 1540]);
  assert.equal(historicUnknown.prudentBudget, 1540);
  assert.ok(historicUnknown.warningCodes.includes("TERRITORY_HISTORIC_STATUS_REQUIRED"));
  assert.equal(engineMissing.applicability, "scenario_required");
  assert.deepEqual(engineMissing.scenarios.map((scenario) => scenario.taxAmount), [40, 70, 115, 1540]);
  assert.equal(engineMissing.prudentBudget, 1540);
  assert.ok(engineMissing.warningCodes.includes("CANARY_ENGINE_DISPLACEMENT_REQUIRED"));
  assert.equal(foreignSeller.taxAmount, 1540);
  assert.equal(foreignSeller.normalizedCountries.sellerCountry, "DE");
  assert.equal(professionalRebu.applicability, "not_subject");
  assert.equal(professionalRebu.taxAmount, 0);
});

test("Castilla-La Mancha aplica tipo general 6 por ciento y modelo 620", () => {
  const result = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "castilla_la_mancha" });
  const alias = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "castilla_mancha" });
  const before = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "castilla_la_mancha", transactionDate: "2024-12-31" });

  assert.equal(result.rate, 0.06);
  assert.equal(result.taxAmount, 1680);
  assert.equal(result.filingRequirement, "required");
  assert.equal(result.filingForm, "620");
  assert.equal(alias.territoryRule, "castilla_la_mancha");
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Extremadura aplica 6 por ciento a turismos normales y no aplica regla comercial", () => {
  const result = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "extremadura" });
  const reseller = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "extremadura", buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true });

  assert.equal(result.rate, 0.06);
  assert.equal(result.taxAmount, 1680);
  assert.equal(reseller.applicability, "scenario_required");
  assert.equal(reseller.prudentBudget, 1680);
});

test("Madrid aplica 4 por ciento y excluye vehiculos de bonificacion de escaso valor", () => {
  const result = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "madrid", purchasePrice: 400, officialMarketValue: 400 });
  const foreignSeller = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "comunidad_madrid", sellerCountry: "DE", buyerTaxResidenceCountry: "ES" });

  assert.equal(result.applicability, "taxable");
  assert.equal(result.rate, 0.04);
  assert.equal(result.taxAmount, 16);
  assert.equal(result.filingRequirement, "required");
  assert.equal(foreignSeller.taxAmount, 1120);
  assert.equal(foreignSeller.normalizedCountries.sellerCountry, "DE");
});

test("Madrid reduce el valor ministerial al 70 por ciento con evidencia y crea escenarios si falta", () => {
  const reduced = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "madrid", purchasePrice: 10000, officialMarketValue: 28000, evidence: { madridReducedValuationUse: true } });
  const regular = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "madrid", purchasePrice: 10000, officialMarketValue: 28000, evidence: { madridReducedValuationUse: false } });
  const unknown = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "madrid", purchasePrice: 10000, officialMarketValue: 28000, evidence: {} });

  assert.equal(reduced.taxableBase, 19600);
  assert.equal(reduced.taxAmount, 784);
  assert.equal(regular.taxableBase, 28000);
  assert.equal(regular.taxAmount, 1120);
  assert.equal(unknown.applicability, "scenario_required");
  assert.deepEqual(unknown.scenarios.map((scenario) => scenario.taxAmount), [1120, 784]);
  assert.equal(unknown.prudentBudget, 1120);
  assert.ok(unknown.warningCodes.includes("MADRID_REDUCED_VALUATION_STATUS_REQUIRED"));
});

test("La Rioja aplica tipo general 4 por ciento y modelo 620", () => {
  const result = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "la_rioja" });
  const alias = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "rioja" });
  const professional = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "la_rioja", sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU });

  assert.equal(result.rate, 0.04);
  assert.equal(result.taxAmount, 1120);
  assert.equal(result.filingForm, "620");
  assert.equal(alias.territoryRule, "la_rioja");
  assert.equal(professional.applicability, "not_subject");
});

test("Ceuta y Melilla aplican bonificacion estatal del 50 por ciento sobre cuota", () => {
  const ceuta = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "ceuta" });
  const melilla = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "melilla" });
  const before = calculateTransferTax({ ...secondExpansionInput, buyerRegion: "ceuta", transactionDate: "2024-12-31" });

  assert.equal(ceuta.applicability, "bonified");
  assert.equal(ceuta.rate, 0.04);
  assert.equal(ceuta.taxAmount, 560);
  assert.equal(ceuta.filingRequirement, "required");
  assert.equal(ceuta.filingForm, "620");
  assert.equal(melilla.applicability, "bonified");
  assert.equal(melilla.taxAmount, 560);
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});
const foralInput = {
  ...baseInput,
  transactionDate: "2026-07-01",
  purchasePrice: 25000,
  officialMarketValue: 28000,
  buyerTaxResidenceCountry: "ES",
  sellerCountry: "DE",
  vehicleCategory: "passenger_car",
  firstRegistrationDate: "2020-01-01",
  isHistoricVehicle: false,
};

test("Navarra aplica base mayor alias bilingue filing y compra a particular aleman", () => {
  const officialHigher = calculateTransferTax({ ...foralInput, buyerRegion: "navarra" });
  const priceHigher = calculateTransferTax({ ...foralInput, buyerRegion: "nafarroa", purchasePrice: 31000, officialMarketValue: 28000 });
  const before = calculateTransferTax({ ...foralInput, buyerRegion: "navarra", transactionDate: "2024-12-31" });

  assert.equal(officialHigher.territoryRule, "navarra");
  assert.equal(officialHigher.taxableBase, 28000);
  assert.equal(officialHigher.rate, 0.04);
  assert.equal(officialHigher.taxAmount, 1120);
  assert.equal(officialHigher.filingRequirement, "required");
  assert.equal(officialHigher.filingForm, "620");
  assert.equal(officialHigher.normalizedCountries.sellerCountry, "DE");
  assert.equal(priceHigher.taxableBase, 31000);
  assert.equal(priceHigher.taxAmount, 1240);
  assert.ok(before.warningCodes.includes("TERRITORY_RULE_NOT_EFFECTIVE"));
});

test("Navarra profesional REBU no sujeto y revendedor conserva exencion provisional", () => {
  const professional = calculateTransferTax({ ...foralInput, buyerRegion: "navarra", sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU });
  const reseller = calculateTransferTax({ ...foralInput, buyerRegion: "navarra", buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true });

  assert.equal(professional.applicability, "not_subject");
  assert.equal(professional.taxAmount, 0);
  assert.equal(professional.filingRequirement, "conditional");
  assert.equal(reseller.applicability, "scenario_required");
  assert.equal(reseller.prudentBudget, 1120);
  assert.equal(reseller.scenarios.at(-1).id, "reseller_provisional_exemption");
});

test("Pais Vasco sin provincia genera escenarios provinciales sin seleccionar defecto", () => {
  const result = calculateTransferTax({ ...foralInput, buyerRegion: "pais_vasco", buyerProvince: undefined });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.equal(result.prudentBudget, 1120);
  assert.ok(result.warningCodes.includes("BUYER_PROVINCE_REQUIRED"));
  assert.deepEqual(result.scenarios.map((scenario) => scenario.territoryRule), ["alava", "bizkaia", "gipuzkoa"]);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.taxAmount), [1120, 1120, 1120]);
});

test("Pais Vasco provincia invalida no calcula cuota", () => {
  const result = calculateTransferTax({ ...foralInput, buyerRegion: "pais_vasco", buyerProvince: "bilbao" });

  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("INVALID_BUYER_PROVINCE"));
  assert.ok(result.missingFields.includes("buyerProvince"));
});

test("Pais Vasco resuelve aliases forales de Alava Bizkaia y Gipuzkoa", () => {
  const alava = calculateTransferTax({ ...foralInput, buyerRegion: "pais_vasco", buyerProvince: "araba" });
  const bizkaia = calculateTransferTax({ ...foralInput, buyerRegion: "vizcaya" });
  const gipuzkoa = calculateTransferTax({ ...foralInput, buyerRegion: "guipuzcoa" });

  assert.equal(alava.territoryRule, "alava");
  assert.equal(alava.taxAmount, 1120);
  assert.equal(bizkaia.territoryRule, "bizkaia");
  assert.equal(bizkaia.taxAmount, 1120);
  assert.equal(gipuzkoa.territoryRule, "gipuzkoa");
  assert.equal(gipuzkoa.taxAmount, 1120);
  assert.equal(alava.filingForm, "620");
  assert.equal(bizkaia.filingForm, "620");
  assert.equal(gipuzkoa.filingForm, "620");
});

test("Pais Vasco region y provincia contradictorias genera escenarios y warning", () => {
  const result = calculateTransferTax({ ...foralInput, buyerRegion: "alava", buyerProvince: "bizkaia" });

  assert.equal(result.applicability, "scenario_required");
  assert.equal(result.supportedCalculation, false);
  assert.equal(result.taxAmount, null);
  assert.ok(result.warningCodes.includes("BUYER_REGION_PROVINCE_CONFLICT"));
  assert.deepEqual(result.scenarios.map((scenario) => scenario.territoryRule), ["alava", "bizkaia"]);
  assert.equal(result.prudentBudget, 1120);
});

test("Forales vascas mantienen profesional REBU revendedor e historico sin regla especial", () => {
  const professional = calculateTransferTax({ ...foralInput, buyerRegion: "bizkaia", sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU });
  const reseller = calculateTransferTax({ ...foralInput, buyerRegion: "gipuzkoa", buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true });
  const historic = calculateTransferTax({ ...foralInput, buyerRegion: "alava", isHistoricVehicle: true });

  assert.equal(professional.applicability, "not_subject");
  assert.equal(professional.taxAmount, 0);
  assert.equal(reseller.applicability, "scenario_required");
  assert.equal(reseller.prudentBudget, 1120);
  assert.equal(historic.applicability, "taxable");
  assert.equal(historic.taxAmount, 1120);
});
test("todos los resultados y escenarios exponen filingRequirement y filingForm", () => {
  const cases = [
    calculateTransferTax(baseInput),
    calculateTransferTax({ ...baseInput, sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU }),
    calculateTransferTax({ ...baseInput, sellerType: SELLER_TYPES.UNKNOWN }),
    calculateTransferTax(cataloniaInput),
    calculateTransferTax({ ...cataloniaInput, zeroEmissionStatus: "unknown" }),
    calculateTransferTax({ ...cataloniaInput, firstRegistrationDate: "2015-06-27", originalBoeValue: 39999 }),
  ];

  for (const result of cases) {
    assert.ok(["required", "not_required", "conditional", "unknown"].includes(result.filingRequirement));
    assert.ok(result.filingForm === "620" || result.filingForm === null);
    for (const scenario of result.scenarios) {
      assert.ok(["required", "not_required", "conditional", "unknown"].includes(scenario.filingRequirement));
      assert.ok(scenario.filingForm === "620" || scenario.filingForm === null);
    }
  }
});
test("warning codes de ITP son unicos y los nuevos codigos estan cubiertos", () => {
  const values = Object.values(TRANSFER_TAX_WARNING_CODES);

  assert.equal(new Set(values).size, values.length);
  for (const code of [
    "MISSING_BUYER_REGION",
    "INVALID_BUYER_REGION",
    "UNKNOWN_SELLER_TYPE",
    "VEHICLE_CATEGORY_UNSUPPORTED",
    "MISSING_FIRST_REGISTRATION_DATE",
    "BUYER_TAX_RESIDENCE_CONFLICT",
    "INVALID_SELLER_COUNTRY",
    "OPERATION_CLASSIFICATION_CONFLICT",
    "TERRITORY_RULE_NOT_EFFECTIVE",
    "FUTURE_TRANSACTION_DATE",
    "HISTORIC_VEHICLE_REQUIRES_REVIEW",
    "CATALONIA_ZERO_EMISSION_STATUS_REQUIRED",
    "CATALONIA_ORIGINAL_BOE_VALUE_REQUIRED",
    "CATALONIA_HISTORIC_STATUS_REQUIRED",
    "CATALONIA_AGE_CALCULATION_ASSUMPTION",
    "CATALONIA_RULE_PRECEDENCE_REQUIRES_REVIEW",
    "ANDALUSIA_ZERO_EMISSION_STATUS_REQUIRED",
    "ANDALUSIA_FISCAL_HORSEPOWER_REQUIRED",
    "ANDALUSIA_DANA_REPLACEMENT_STATUS_REQUIRED",
    "BALEARIC_FISCAL_HORSEPOWER_REQUIRED",
    "VALENCIA_END_OF_LIFE_STATUS_REQUIRED",
    "VALENCIA_ENGINE_DISPLACEMENT_REQUIRED",
    "TERRITORY_HISTORIC_STATUS_REQUIRED",
    "GALICIA_ZERO_EMISSION_STATUS_REQUIRED",
    "GALICIA_ENGINE_DISPLACEMENT_REQUIRED",
    "MURCIA_ENGINE_DISPLACEMENT_REQUIRED",
    "CANARY_ENGINE_DISPLACEMENT_REQUIRED",
    "MADRID_REDUCED_VALUATION_STATUS_REQUIRED",
    "INVALID_EVIDENCE",
  ]) {
    assert.ok(values.includes(code));
  }
});

const canonicalTransferTaxOutcomeKeys = [
  "applicability",
  "supportedCalculation",
  "taxAmount",
  "probableAmount",
  "minimumAmount",
  "maximumAmount",
  "prudentBudget",
  "taxableBase",
  "rate",
  "fixedFee",
  "territoryRule",
  "territoryStatus",
  "legalBasis",
  "assumptions",
  "warnings",
  "warningCodes",
  "missingFields",
  "evidence",
  "normalizedCountries",
  "filingRequirement",
  "filingForm",
];

const canonicalTransferTaxResultKeys = [...canonicalTransferTaxOutcomeKeys, "scenarios"].sort();
const canonicalTransferTaxScenarioKeys = ["id", "label", ...canonicalTransferTaxOutcomeKeys].sort();

const topLevelPrivateKeys = ["id", "label", "source", "effectiveFrom", "effectiveTo", "scenarioType"];
const scenarioPrivateRuleKeys = ["source", "effectiveFrom", "effectiveTo", "scenarioType"];
const moneyFields = ["taxAmount", "probableAmount", "minimumAmount", "maximumAmount", "prudentBudget", "taxableBase", "fixedFee"];

function assertCanonicalTopLevelResult(result) {
  assert.deepEqual(Object.keys(result).sort(), canonicalTransferTaxResultKeys);
  assert.equal(Object.keys(result).length, 22);
  assert.ok(Array.isArray(result.scenarios));
  for (const key of topLevelPrivateKeys) {
    assert.equal(Object.hasOwn(result, key), false);
  }
}

function assertCanonicalScenario(scenario) {
  assert.deepEqual(Object.keys(scenario).sort(), canonicalTransferTaxScenarioKeys);
  assert.equal(Object.keys(scenario).length, 23);
  assert.equal(typeof scenario.id, "string");
  assert.equal(typeof scenario.label, "string");
  assert.ok(scenario.id.length > 0);
  assert.ok(scenario.label.length > 0);
  assert.equal(Object.hasOwn(scenario, "scenarios"), false);
  for (const key of scenarioPrivateRuleKeys) {
    assert.equal(Object.hasOwn(scenario, key), false);
  }
}

function assertCanonicalTransferTaxResult(result) {
  assertCanonicalTopLevelResult(result);
  for (const scenario of result.scenarios) {
    assertCanonicalScenario(scenario);
  }
}

function assertJsonRoundTrip(value) {
  assert.deepEqual(JSON.parse(JSON.stringify(value)), value);
}

test("todos los resultados superiores representativos mantienen claves canonicas", () => {
  const representativeInputs = [
    { name: "particular sujeto", input: baseInput, expected: { taxAmount: 480, warningCodes: [] } },
    { name: "profesional no sujeto", input: { ...baseInput, sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU }, expected: { taxAmount: 0, warningCodes: [] } },
    { name: "vendedor desconocido", input: { ...baseInput, sellerType: SELLER_TYPES.UNKNOWN, documentType: "unknown", vatRegime: VAT_REGIMES.UNKNOWN }, expected: { taxAmount: null, warningCodes: ["UNKNOWN_SELLER_TYPE"] } },
    { name: "conflicto documental", input: { ...baseInput, sellerType: SELLER_TYPES.PRIVATE, documentType: "invoice" }, expected: { taxAmount: null, warningCodes: ["OPERATION_CLASSIFICATION_CONFLICT"] } },
    { name: "conflicto residencia", input: { ...baseInput, buyerTaxResidenceCountry: "DE" }, expected: { taxAmount: null, warningCodes: ["BUYER_TAX_RESIDENCE_CONFLICT"] } },
    { name: "region invalida", input: { ...baseInput, buyerRegion: "does_not_exist" }, expected: { taxAmount: null, warningCodes: ["INVALID_BUYER_REGION"] } },
    { name: "pais vasco sin provincia", input: { ...baseInput, buyerRegion: "pais_vasco" }, expected: { taxAmount: null, warningCodes: ["BUYER_PROVINCE_REQUIRED"] } },
    { name: "fuera de vigencia", input: { ...baseInput, buyerRegion: "aragon", transactionDate: "2000-01-01", firstRegistrationDate: "1980-01-01", engineDisplacement: 1200 }, expected: { taxAmount: null, warningCodes: ["TERRITORY_RULE_NOT_EFFECTIVE"] } },
    { name: "input invalido", input: { ...baseInput, purchasePrice: Number.NaN }, expected: { taxAmount: null, warningCodes: ["INVALID_INPUT"] } },
    { name: "cantabria historico", input: { ...baseInput, buyerRegion: "cantabria", firstRegistrationDate: "2000-01-01", engineDisplacement: 999, isHistoricVehicle: true }, expected: { taxAmount: null, warningCodes: ["HISTORIC_VEHICLE_REQUIRES_REVIEW"] } },
    { name: "revendedor sin evidencia", input: { ...baseInput, buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true }, expected: { taxAmount: null, warningCodes: ["RESELLER_EXEMPTION_REQUIRES_EVIDENCE"] } },
    { name: "falta precio", input: { ...baseInput, purchasePrice: undefined }, expected: { taxAmount: null, warningCodes: ["MISSING_PURCHASE_PRICE"] } },
    { name: "falta valor oficial", input: { ...baseInput, officialMarketValue: undefined }, expected: { taxAmount: null, warningCodes: ["MISSING_OFFICIAL_MARKET_VALUE"] } },
  ];

  for (const { name, input, expected } of representativeInputs) {
    const before = JSON.stringify(input);
    const result = calculateTransferTax(input);

    assertCanonicalTransferTaxResult(result);
    assertJsonRoundTrip(result);
    assert.equal(result.taxAmount, expected.taxAmount, name);
    for (const warningCode of expected.warningCodes) {
      assert.ok(result.warningCodes.includes(warningCode), name);
    }
    assert.equal(JSON.stringify(input), before, name);
  }
});

test("los escenarios tienen contrato propio sin scenarios anidados", () => {
  const result = calculateTransferTax({
    ...baseInput,
    sellerType: SELLER_TYPES.UNKNOWN,
    documentType: "unknown",
    vatRegime: VAT_REGIMES.UNKNOWN,
  });

  assertCanonicalTransferTaxResult(result);
  assertJsonRoundTrip(result);
  assert.equal(result.scenarios.length, 2);
  assert.deepEqual(result.scenarios.map((scenario) => scenario.id), ["seller_private", "seller_professional"]);
});

test("todos los generadores de escenarios usan la forma canonica", () => {
  const cases = [
    {
      name: "vendedor desconocido",
      input: { ...baseInput, sellerType: SELLER_TYPES.UNKNOWN, documentType: "unknown", vatRegime: VAT_REGIMES.UNKNOWN },
      scenarioIds: ["seller_private", "seller_professional"],
      taxAmounts: [480, 0],
    },
    {
      name: "conflicto documental particular/profesional",
      input: { ...baseInput, sellerType: SELLER_TYPES.PRIVATE, documentType: "invoice" },
      scenarioIds: ["operation_private_sale", "operation_professional_sale"],
      taxAmounts: [480, 0],
    },
    {
      name: "residencia fiscal condicionada",
      input: { ...baseInput, buyerTaxResidenceCountry: "DE" },
      scenarioIds: ["buyer_spanish_tax_residence_condition"],
      taxAmounts: [480],
    },
    {
      name: "revendedor ordinario y exencion provisional",
      input: { ...baseInput, buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true },
      scenarioIds: ["confirmed_private_sale", "reseller_provisional_exemption"],
      taxAmounts: [480, null],
    },
    {
      name: "falta valor oficial conserva escenario revisable",
      input: { ...baseInput, officialMarketValue: undefined, sellerType: SELLER_TYPES.UNKNOWN },
      scenarioIds: ["seller_private", "seller_professional"],
      taxAmounts: [null, 0],
    },
    {
      name: "pais vasco sin provincia en escenario privado",
      input: { ...baseInput, buyerRegion: "pais_vasco", sellerType: SELLER_TYPES.UNKNOWN },
      scenarioIds: ["seller_private", "seller_professional"],
      taxAmounts: [null, 0],
    },
  ];

  for (const { name, input, scenarioIds, taxAmounts } of cases) {
    const before = JSON.stringify(input);
    const result = calculateTransferTax(input);

    assertCanonicalTransferTaxResult(result);
    assertJsonRoundTrip(result);
    assert.deepEqual(result.scenarios.map((scenario) => scenario.id), scenarioIds, name);
    assert.deepEqual(result.scenarios.map((scenario) => scenario.taxAmount), taxAmounts, name);
    assert.equal(JSON.stringify(input), before, name);
  }
});

function topLevelMutableSnapshot(result) {
  return JSON.stringify({
    legalBasis: result.legalBasis,
    assumptions: result.assumptions,
    warnings: result.warnings,
    warningCodes: result.warningCodes,
    missingFields: result.missingFields,
    evidence: result.evidence,
    normalizedCountries: result.normalizedCountries,
  });
}

function collectObjectReferences(value, references = new Set(), seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value)) {
    return references;
  }

  seen.add(value);
  references.add(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      collectObjectReferences(item, references, seen);
    }
  } else {
    for (const item of Object.values(value)) {
      collectObjectReferences(item, references, seen);
    }
  }

  return references;
}

function sharedReferenceCount(left, right) {
  const leftReferences = collectObjectReferences(left);
  const rightReferences = collectObjectReferences(right);
  let count = 0;
  for (const reference of leftReferences) {
    if (rightReferences.has(reference)) {
      count += 1;
    }
  }
  return count;
}

function assertNoSharedReferences(left, right, message) {
  assert.equal(sharedReferenceCount(left, right), 0, message);
}

function publicTopLevelMutableFields(result) {
  return {
    legalBasis: result.legalBasis,
    assumptions: result.assumptions,
    warnings: result.warnings,
    warningCodes: result.warningCodes,
    missingFields: result.missingFields,
    evidence: result.evidence,
    normalizedCountries: result.normalizedCountries,
  };
}

function nestedEvidence() {
  return {
    document: "contract.pdf",
    page: 1,
    meta: {
      reviewer: "audit",
      flags: ["signed", { source: "scan", pages: [1, 2] }],
    },
  };
}

test("evidence se clona en profundidad y se sanea si no es JSON serializable", () => {
  const nested = nestedEvidence();
  const nestedResult = calculateTransferTax({ ...baseInput, evidence: nested });

  assert.deepEqual(nestedResult.evidence, nested);
  assert.notEqual(nestedResult.evidence, nested);
  assert.notEqual(nestedResult.evidence.meta, nested.meta);
  assert.notEqual(nestedResult.evidence.meta.flags, nested.meta.flags);
  assert.equal(nestedResult.warningCodes.includes("INVALID_EVIDENCE"), false);

  const emptyEvidence = {};
  const emptyResult = calculateTransferTax({ ...baseInput, evidence: emptyEvidence });
  assert.deepEqual(emptyResult.evidence, {});
  assert.notEqual(emptyResult.evidence, emptyEvidence);
  assert.equal(emptyResult.warningCodes.includes("INVALID_EVIDENCE"), false);

  const functionResult = calculateTransferTax({ ...baseInput, evidence: { document: "contract.pdf", parse: () => null } });
  assert.equal(functionResult.evidence, null);
  assert.ok(functionResult.warningCodes.includes("INVALID_EVIDENCE"));
  assert.equal(functionResult.taxAmount, 480);

  const circularEvidence = { document: "contract.pdf" };
  circularEvidence.self = circularEvidence;
  const circularResult = calculateTransferTax({ ...baseInput, evidence: circularEvidence });
  assert.equal(circularResult.evidence, null);
  assert.ok(circularResult.warningCodes.includes("INVALID_EVIDENCE"));
  assert.equal(circularResult.taxAmount, 480);
});

test("resultados y escenarios no comparten referencias mutables", () => {
  const cases = [
    { name: "vendedor desconocido", input: { ...baseInput, sellerType: SELLER_TYPES.UNKNOWN, evidence: nestedEvidence() } },
    { name: "conflicto documental", input: { ...baseInput, sellerType: SELLER_TYPES.PRIVATE, documentType: "invoice", evidence: nestedEvidence() } },
    { name: "conflicto residencia", input: { ...baseInput, buyerTaxResidenceCountry: "DE", evidence: nestedEvidence() } },
    { name: "revendedor", input: { ...baseInput, buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true, evidence: nestedEvidence() } },
    { name: "profesional REBU", input: { ...baseInput, sellerType: SELLER_TYPES.PROFESSIONAL, documentType: "invoice", vatRegime: VAT_REGIMES.REBU, evidence: nestedEvidence() } },
    { name: "pais vasco sin provincia", input: { ...baseInput, buyerRegion: "pais_vasco", sellerType: SELLER_TYPES.UNKNOWN, evidence: nestedEvidence() } },
    { name: "Cataluna cero emisiones desconocido", input: { ...cataloniaInput, zeroEmissionStatus: "unknown", evidence: nestedEvidence() } },
    { name: "Cataluna antiguedad y cero emisiones", input: { ...cataloniaInput, firstRegistrationDate: "2015-06-27", originalBoeValue: 39999, zeroEmissionStatus: "confirmed", evidence: nestedEvidence() } },
  ];

  for (const { name, input } of cases) {
    const result = calculateTransferTax(input);
    const secondResult = calculateTransferTax(input);

    assertCanonicalTransferTaxResult(result);
    assertNoSharedReferences(input, result, `${name}: input/result`);
    assertNoSharedReferences(result, secondResult, `${name}: llamadas independientes`);
    assertNoSharedReferences(result, TRANSFER_TAX_TERRITORY_RULES, `${name}: reglas internas`);
    assert.notEqual(result, secondResult, name);
    assert.notEqual(result.evidence, secondResult.evidence, name);
    assert.notEqual(result.normalizedCountries, secondResult.normalizedCountries, name);
    assert.notEqual(result.scenarios, secondResult.scenarios, name);

    for (let index = 0; index < result.scenarios.length; index += 1) {
      assert.notEqual(result.scenarios[index], secondResult.scenarios[index], name);
      assertNoSharedReferences(publicTopLevelMutableFields(result), result.scenarios[index], `${name}: resultado/escenario ${index}`);
      for (let otherIndex = index + 1; otherIndex < result.scenarios.length; otherIndex += 1) {
        assertNoSharedReferences(result.scenarios[index], result.scenarios[otherIndex], `${name}: escenario ${index}/${otherIndex}`);
      }
    }
  }
});

test("mutar el resultado superior no altera input escenarios segunda llamada ni reglas", () => {
  const input = { ...baseInput, buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true, evidence: nestedEvidence() };
  const result = calculateTransferTax(input);
  const secondResult = calculateTransferTax(input);
  const inputBefore = JSON.stringify(input);
  const scenarioSnapshots = result.scenarios.map((scenario) => JSON.stringify(scenario));
  const secondBefore = JSON.stringify(secondResult);
  const rulesBefore = JSON.stringify(TRANSFER_TAX_TERRITORY_RULES);

  result.evidence.document = "mutated.pdf";
  result.evidence.meta.flags[1].pages.push(99);
  result.normalizedCountries.sellerCountry = "ES";
  result.legalBasis.push({ source: "mutated", article: "mutated", summary: "mutated", url: "https://example.invalid" });
  result.warnings.push("mutated warning");
  result.warningCodes.push("MUTATED_WARNING");
  result.assumptions.push("mutated assumption");
  result.missingFields.push("mutatedField");

  assert.equal(JSON.stringify(input), inputBefore);
  assert.deepEqual(result.scenarios.map((scenario) => JSON.stringify(scenario)), scenarioSnapshots);
  assert.equal(JSON.stringify(secondResult), secondBefore);
  assert.equal(JSON.stringify(TRANSFER_TAX_TERRITORY_RULES), rulesBefore);
});

test("mutar un escenario no altera resultado superior otros escenarios input segunda llamada ni reglas", () => {
  const input = { ...baseInput, buyerType: BUYER_TYPES.VEHICLE_RESELLER, intendedForResale: true, evidence: nestedEvidence() };
  const result = calculateTransferTax(input);
  const secondResult = calculateTransferTax(input);
  const inputBefore = JSON.stringify(input);
  const topLevelBefore = topLevelMutableSnapshot(result);
  const otherScenarioBefore = JSON.stringify(result.scenarios[1]);
  const secondBefore = JSON.stringify(secondResult);
  const rulesBefore = JSON.stringify(TRANSFER_TAX_TERRITORY_RULES);

  result.scenarios[0].evidence.document = "scenario-mutated.pdf";
  result.scenarios[0].evidence.meta.flags[1].pages.push(88);
  result.scenarios[0].normalizedCountries.buyerTaxResidenceCountry = "DE";
  result.scenarios[0].legalBasis.push({ source: "scenario", article: "scenario", summary: "scenario", url: "https://example.invalid" });
  result.scenarios[0].warnings.push("scenario warning");
  result.scenarios[0].warningCodes.push("SCENARIO_WARNING");
  result.scenarios[0].assumptions.push("scenario assumption");
  result.scenarios[0].missingFields.push("scenarioField");

  assert.equal(JSON.stringify(input), inputBefore);
  assert.equal(topLevelMutableSnapshot(result), topLevelBefore);
  assert.equal(JSON.stringify(result.scenarios[1]), otherScenarioBefore);
  assert.equal(JSON.stringify(secondResult), secondBefore);
  assert.equal(JSON.stringify(TRANSFER_TAX_TERRITORY_RULES), rulesBefore);
});

test("mutar el array scenarios no altera otra llamada ni el input", () => {
  const input = { ...baseInput, sellerType: SELLER_TYPES.UNKNOWN, evidence: nestedEvidence() };
  const result = calculateTransferTax(input);
  const secondResult = calculateTransferTax(input);
  const inputBefore = JSON.stringify(input);
  const secondBefore = JSON.stringify(secondResult);

  result.scenarios.push({ ...result.scenarios[0], id: "mutated", label: "mutated" });

  assert.equal(JSON.stringify(input), inputBefore);
  assert.equal(JSON.stringify(secondResult), secondBefore);
  assert.equal(secondResult.scenarios.length, 2);
});
test("comprobacion sistematica de formas superiores y escenarios", () => {
  const sellerTypes = [SELLER_TYPES.PRIVATE, SELLER_TYPES.PROFESSIONAL, SELLER_TYPES.UNKNOWN, "invalid"];
  const documentTypes = ["private_sale_contract", "invoice", "unknown"];
  const vatRegimes = Object.values(VAT_REGIMES);
  const buyerRegions = ["asturias", "andalucia", "illes_balears", "comunitat_valenciana", "galicia", "murcia", "canarias", "castilla_la_mancha", "extremadura", "madrid", "la_rioja", "ceuta", "melilla", "navarra", "pais_vasco", "alava", "bizkaia", "gipuzkoa", "does_not_exist", undefined];
  const buyerTaxResidenceCountries = ["ES", "DE", undefined, "Narnia"];
  const amounts = [[12000, 10000], [0, 10000], [12000, undefined], [Number.NaN, 10000]];
  const transactionDates = ["2026-07-01", undefined, "not-a-date", "2999-01-01"];
  const historicFlags = [false, true];
  let combinations = 0;

  for (const sellerType of sellerTypes) {
    for (const documentType of documentTypes) {
      for (const vatRegime of vatRegimes) {
        for (const buyerRegion of buyerRegions) {
          for (const buyerTaxResidenceCountry of buyerTaxResidenceCountries) {
            for (const [purchasePrice, officialMarketValue] of amounts) {
              for (const transactionDate of transactionDates) {
                for (const isHistoricVehicle of historicFlags) {
                  const input = {
                    ...baseInput,
                    sellerType,
                    documentType,
                    vatRegime,
                    buyerRegion,
                    buyerTaxResidenceCountry,
                    purchasePrice,
                    officialMarketValue,
                    transactionDate,
                    isHistoricVehicle,
                  };
                  const result = calculateTransferTax(input);

                  assertCanonicalTransferTaxResult(result);
                  assertJsonRoundTrip(result);
                  assert.equal(typeof result.supportedCalculation, "boolean");
                  for (const field of moneyFields) {
                    assert.ok(result[field] === null || (Number.isFinite(result[field]) && result[field] >= 0), field);
                    for (const scenario of result.scenarios) {
                      assert.ok(scenario[field] === null || (Number.isFinite(scenario[field]) && scenario[field] >= 0), field);
                    }
                  }
                  combinations += 1;
                }
              }
            }
          }
        }
      }
    }
  }

  assert.equal(combinations, 153600);
});
