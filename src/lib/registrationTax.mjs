export const DEFAULT_TERRITORY_ID = "peninsula_general";

export const TERRITORIES = [
  {
    id: "peninsula_general",
    label: "Resto de la Pen\u00ednsula",
    displayName: "Resto de la Pen\u00ednsula",
    rate: 14.75,
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
    rate: 16,
    aliases: ["asturias", "principado_asturias"],
  },
  {
    id: "baleares",
    label: "Islas Baleares / Illes Balears",
    displayName: "Islas Baleares / Illes Balears",
    rate: 16,
    aliases: ["baleares", "illes_balears", "islas_baleares", "balears"],
  },
  {
    id: "cataluna",
    label: "Catalu\u00f1a / Catalunya",
    displayName: "Catalu\u00f1a / Catalunya",
    rate: 16,
    aliases: ["cataluna", "catalunya", "catalu\u00f1a"],
  },
  {
    id: "comunidad_valenciana",
    label: "Comunidad Valenciana / Comunitat Valenciana",
    displayName: "Comunidad Valenciana / Comunitat Valenciana",
    rate: 16,
    aliases: ["comunidad_valenciana", "valencia", "comunitat_valenciana"],
  },
  {
    id: "murcia",
    label: "Murcia",
    displayName: "Murcia",
    rate: 15.9,
    aliases: ["murcia", "region_murcia", "region_de_murcia"],
  },
  {
    id: "cantabria",
    label: "Cantabria",
    displayName: "Cantabria",
    rate: 15,
    aliases: ["cantabria"],
  },
  {
    id: "canarias",
    label: "Canarias",
    displayName: "Canarias",
    rate: 13.75,
    aliases: ["canarias", "islas_canarias"],
  },
  {
    id: "ceuta_melilla",
    label: "Ceuta y Melilla",
    displayName: "Ceuta y Melilla",
    rate: 0,
    aliases: ["ceuta", "melilla", "ceuta_melilla", "ceuta_y_melilla"],
  },
];

const territoryAliases = new Map(
  TERRITORIES.flatMap((territory) =>
    territory.aliases.map((alias) => [normalizeTerritoryKey(alias), territory])
  )
);

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

export function getRateFromEmissions(emissions) {
  if (emissions <= 120) {
    return 0;
  }

  if (emissions <= 159) {
    return 4.75;
  }

  if (emissions <= 199) {
    return 9.75;
  }

  return null;
}

export function getDepreciationCoefficient(months) {
  if (months <= 12) {
    return 1;
  }

  if (months <= 24) {
    return 0.84;
  }

  if (months <= 36) {
    return 0.67;
  }

  if (months <= 48) {
    return 0.56;
  }

  if (months <= 60) {
    return 0.47;
  }

  if (months <= 72) {
    return 0.39;
  }

  return 0.3;
}

export function calculateRegistrationTax({
  price,
  emissions,
  months,
  territoryId,
  noAccreditedEmissions = false,
  urlRate = null,
}) {
  const selectedTerritory = getTerritoryById(territoryId);
  const defaultTerritory = getTerritoryById(DEFAULT_TERRITORY_ID);
  const territoryForRate = selectedTerritory ?? defaultTerritory;
  const emissionRate = getRateFromEmissions(emissions);
  const needsTerritory = noAccreditedEmissions || emissions >= 200;
  const rate = needsTerritory ? territoryForRate.rate : emissionRate;
  const coefficient = getDepreciationCoefficient(months);
  const taxableBase = price * coefficient;
  const tax = taxableBase * (rate / 100);
  const validatedUrlRate =
    typeof urlRate === "number" && Math.abs(urlRate - rate) < 0.001
      ? urlRate
      : null;

  return {
    taxableBase,
    tax,
    rate,
    coefficient,
    needsTerritory,
    isProvisionalTerritory: needsTerritory && !selectedTerritory,
    territory: selectedTerritory,
    territoryForRate,
    urlRate,
    validatedUrlRate,
    isUrlRateConsistent: urlRate === null || validatedUrlRate !== null,
  };
}
