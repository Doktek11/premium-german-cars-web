const getFirstParamValue = (
  searchParams: URLSearchParams,
  paramNames: string[]
) =>
  paramNames
    .map((paramName) => searchParams.get(paramName))
    .find((value) => value !== null && value.trim() !== "");

const getFirstParamEntry = (
  searchParams: URLSearchParams,
  paramNames: string[]
) => {
  for (const paramName of paramNames) {
    const value = searchParams.get(paramName);

    if (value !== null) {
      return { paramName, value };
    }
  }

  return null;
};

export type InitialNumberParam =
  | { status: "absent"; value: number; rawValue: null; paramName: null }
  | { status: "valid"; value: number; rawValue: string; paramName: string }
  | { status: "invalid"; value: null; rawValue: string; paramName: string };

export type InitialOptionalNumberParam =
  | { status: "absent"; value: null; rawValue: null; paramName: null }
  | { status: "valid"; value: number; rawValue: string; paramName: string }
  | { status: "invalid"; value: null; rawValue: string; paramName: string };

export const getInitialStringValue = (
  searchParams: URLSearchParams,
  paramNames: string[]
) => getFirstParamValue(searchParams, paramNames)?.trim() ?? "";

export const parseCalculatorNumberInput = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim().replace(",", ".");

  if (normalized === "") {
    return null;
  }

  const numericValue = Number(normalized);
  return Number.isFinite(numericValue) ? numericValue : null;
};

export const getInitialNumberParam = (
  searchParams: URLSearchParams,
  paramNames: string[],
  defaultValue: number
): InitialNumberParam => {
  const entry = getFirstParamEntry(searchParams, paramNames);

  if (!entry) {
    return { status: "absent", value: defaultValue, rawValue: null, paramName: null };
  }

  const numericValue = parseCalculatorNumberInput(entry.value);

  if (numericValue === null) {
    return {
      status: "invalid",
      value: null,
      rawValue: entry.value,
      paramName: entry.paramName,
    };
  }

  return {
    status: "valid",
    value: numericValue,
    rawValue: entry.value,
    paramName: entry.paramName,
  };
};

export const getInitialNumberInputValue = (parsed: InitialNumberParam) =>
  parsed.status === "invalid" ? parsed.rawValue : String(parsed.value);

export const getInitialIntegerParam = (
  searchParams: URLSearchParams,
  paramNames: string[],
  defaultValue: number
): InitialNumberParam => {
  const entry = getFirstParamEntry(searchParams, paramNames);

  if (!entry) {
    return { status: "absent", value: defaultValue, rawValue: null, paramName: null };
  }

  const numericValue = parseCalculatorNumberInput(entry.value);

  if (numericValue === null || !Number.isInteger(numericValue) || numericValue < 0) {
    return {
      status: "invalid",
      value: null,
      rawValue: entry.value,
      paramName: entry.paramName,
    };
  }

  return {
    status: "valid",
    value: numericValue,
    rawValue: entry.value,
    paramName: entry.paramName,
  };
};

export const getInitialRateParam = (
  searchParams: URLSearchParams,
  paramNames: string[]
): InitialOptionalNumberParam => {
  const entry = getFirstParamEntry(searchParams, paramNames);

  if (!entry) {
    return { status: "absent", value: null, rawValue: null, paramName: null };
  }

  const numericValue = parseCalculatorNumberInput(entry.value);

  if (numericValue === null) {
    return {
      status: "invalid",
      value: null,
      rawValue: entry.value,
      paramName: entry.paramName,
    };
  }

  return {
    status: "valid",
    value: numericValue,
    rawValue: entry.value,
    paramName: entry.paramName,
  };
};


export const getInitialSpecialCase = (searchParams: URLSearchParams) => {
  const specialCaseValue = getFirstParamValue(searchParams, [
    "supuesto_especial",
    "emisiones_no_acreditadas",
    "sin_emisiones_acreditadas",
  ]);
  const normalizedSpecialCase = specialCaseValue?.trim().toLocaleLowerCase("es-ES");

  return ["1", "true", "si", "s??", "s????"].includes(normalizedSpecialCase ?? "");
};

export const isRegistrationDateValue = (value: string) => /^\d{4}-\d{2}(-\d{2})?$/.test(value);

export const getInitialFirstRegistrationDate = (searchParams: URLSearchParams) =>
  getInitialStringValue(searchParams, [
    "fecha_primera_matriculacion",
    "firstRegistrationDate",
    "first_registration_date",
  ]);

export const getInitialVehicleCondition = (searchParams: URLSearchParams) => {
  const value = getInitialStringValue(searchParams, ["condicion", "vehicleCondition"]);
  const normalized = value.trim().toLocaleLowerCase("es-ES");

  if (["usado_importado", "used_imported"].includes(normalized)) {
    return "usado_importado";
  }

  if (["nuevo_o_no_matriculado", "nuevo", "new", "not_previously_registered"].includes(normalized)) {
    return "nuevo_o_no_matriculado";
  }

  if (["desconocido", "unknown", "no_estoy_seguro"].includes(normalized)) {
    return "desconocido";
  }

  return "usado_importado";
};

export const getInitialEmissionsStandard = (searchParams: URLSearchParams) => {
  const value = getInitialStringValue(searchParams, ["norma_emisiones", "emissionsStandard"]);
  const normalized = value.trim().toLocaleLowerCase("es-ES");

  return ["nedc", "wltp", "unknown"].includes(normalized) ? normalized : "unknown";
};
