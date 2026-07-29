export const REGISTRATION_FEE_PROCEDURES = {
  ORDINARY_VEHICLE_REGISTRATION: "ordinary_vehicle_registration",
};

export const REGISTRATION_FEE_VEHICLE_TYPES = {
  PASSENGER_CAR: "passenger_car",
};

export const REGISTRATION_FEE_CURRENCIES = {
  EUR: "EUR",
};

export const REGISTRATION_FEE_RULES = [
  {
    procedure: REGISTRATION_FEE_PROCEDURES.ORDINARY_VEHICLE_REGISTRATION,
    vehicleType: REGISTRATION_FEE_VEHICLE_TYPES.PASSENGER_CAR,
    feeCode: "1.1",
    label: "Matriculacion o rehabilitacion de vehiculos",
    description: "Expedicion de permisos de circulacion",
    amount: 99.77,
    currency: REGISTRATION_FEE_CURRENCIES.EUR,
    feeYear: 2026,
    verifiedAt: "2026-07-29",
    sourceType: "official",
    source: {
      id: "dgt-sede-catalogo-tasas-2026",
      label: "Sede DGT catalogo oficial de tasas",
      url: "https://sedeclave.dgt.gob.es/WEB_Tasas7/jsp/tasas/catalogo.jspx",
      accessedAt: "2026-07-29",
      note: "Importe oficial consultado y vigente en 2026; la fuente no publica una fecha historica effectiveFrom verificable.",
    },
    legalBasis: [
      {
        source: "Sede Electronica DGT",
        article: "Catalogo de tasas, Grupo 1, tasa 1.1",
        summary: "Matriculacion o rehabilitacion de vehiculos; expedicion de permisos de circulacion.",
        url: "https://sedeclave.dgt.gob.es/WEB_Tasas7/jsp/tasas/catalogo.jspx",
      },
      {
        source: "Sede Electronica DGT",
        article: "Matriculacion ordinaria de vehiculos",
        summary: "Para tramitar la matriculacion de un vehiculo excepto ciclomotores se adquiere la tasa 1.1.",
        url: "https://sede.dgt.gob.es/gl/vehiculos/matriculaciones-de-vehiculos/matriculacion-ordinaria/",
      },
    ],
    assumptions: [
      "Importe oficial consultado y vigente en 2026; no se inventa una fecha effectiveFrom historica no publicada por la fuente oficial.",
      "La excepcion de ciclomotores y tasa 1.2 queda fuera del alcance de turismos.",
    ],
  },
];

export function findRegistrationFeeRule({ procedure, vehicleType, feeYear, currency }) {
  return (
    REGISTRATION_FEE_RULES.find(
      (rule) =>
        rule.procedure === procedure &&
        rule.vehicleType === vehicleType &&
        rule.feeYear === feeYear &&
        rule.currency === currency
    ) ?? null
  );
}

export function latestRegistrationFeeRule({ procedure, vehicleType, currency }) {
  const matches = REGISTRATION_FEE_RULES.filter(
    (rule) => rule.procedure === procedure && rule.vehicleType === vehicleType && rule.currency === currency
  ).sort((left, right) => right.feeYear - left.feeYear);
  return matches[0] ?? null;
}