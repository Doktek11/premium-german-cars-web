const getFirstParamValue = (
  searchParams: URLSearchParams,
  paramNames: string[]
) =>
  paramNames
    .map((paramName) => searchParams.get(paramName))
    .find((value) => value !== null && value.trim() !== "");

export const getInitialSliderValue = (
  searchParams: URLSearchParams,
  paramNames: string[],
  defaultValue: number,
  min: number,
  max: number
) => {
  const rawValue = getFirstParamValue(searchParams, paramNames);

  if (rawValue === undefined || rawValue === null) return defaultValue;

  const normalized = rawValue.trim().replace(",", ".");
  const numericValue = Number(normalized);

  if (!Number.isFinite(numericValue)) return defaultValue;

  return Math.min(max, Math.max(min, Math.trunc(numericValue)));
};

export const getInitialSpecialCase = (searchParams: URLSearchParams) => {
  const communityValue = getFirstParamValue(searchParams, [
    "comunidad_incrementada",
    "incrementado",
    "supuesto_especial",
  ]);
  const normalizedCommunity = communityValue?.trim().toLocaleLowerCase("es-ES");

  if (["1", "true", "si", "sí"].includes(normalizedCommunity ?? "")) {
    return true;
  }

  const rawRate = searchParams.get("tramo");
  const rate = rawRate ? Number(rawRate.trim().replace(",", ".")) : Number.NaN;

  return Number.isFinite(rate) && rate >= 16;
};
