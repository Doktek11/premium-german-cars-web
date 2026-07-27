export type CalculatorActionStateInput = {
  hasInvalidBoeValue?: boolean;
  hasInvalidEmissions?: boolean;
  hasInvalidLegacyMonths?: boolean;
  hasInvalidFirstRegistrationDate?: boolean;
  supportedCalculation?: boolean;
};

export const getCalculatorActionBlockReasons = ({
  hasInvalidBoeValue = false,
  hasInvalidEmissions = false,
  hasInvalidLegacyMonths = false,
  hasInvalidFirstRegistrationDate = false,
  supportedCalculation = false,
}: CalculatorActionStateInput) => {
  const reasons: string[] = [];

  if (hasInvalidBoeValue) reasons.push("invalid_boe_value");
  if (hasInvalidEmissions) reasons.push("invalid_emissions");
  if (hasInvalidLegacyMonths) reasons.push("invalid_legacy_months");
  if (hasInvalidFirstRegistrationDate) reasons.push("invalid_first_registration_date");
  if (!supportedCalculation) reasons.push("unsupported_calculation");

  return reasons;
};

export const getCalculatorActionState = (input: CalculatorActionStateInput) => {
  const reasons = getCalculatorActionBlockReasons(input);

  return {
    blocked: reasons.length > 0,
    reasons,
  };
};