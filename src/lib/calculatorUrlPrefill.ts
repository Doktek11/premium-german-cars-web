const getFirstParamValue = (
  searchParams: URLSearchParams,
  paramNames: string[]
) =>
  paramNames
    .map((paramName) => searchParams.get(paramName))
    .find((value) => value !== null && value.trim() !== "");

export const getInitialStringValue = (
  searchParams: URLSearchParams,
  paramNames: string[]
) => getFirstParamValue(searchParams, paramNames)?.trim() ?? "";

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
  const specialCaseValue = getFirstParamValue(searchParams, [
    "supuesto_especial",
    "emisiones_no_acreditadas",
    "sin_emisiones_acreditadas",
  ]);
  const normalizedSpecialCase = specialCaseValue?.trim().toLocaleLowerCase("es-ES");

  return ["1", "true", "si", "sí", "sÃ­"].includes(normalizedSpecialCase ?? "");
};
