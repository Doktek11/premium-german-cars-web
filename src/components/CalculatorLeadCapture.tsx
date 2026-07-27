import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";
import type { EmissionsStandard, RegistrationTaxResult, VehicleCondition } from "../lib/registrationTax.mjs";

type CalculatorLeadCaptureProps = {
  boeValue: number;
  emissions: number;
  firstRegistrationDate: string;
  vehicleCondition: VehicleCondition;
  emissionsStandard: EmissionsStandard;
  result: RegistrationTaxResult;
  externalWarnings?: string[];
  externalWarningCodes?: string[];
};

const rounded = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? Math.round(value) : undefined;

const fixedRate = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? Number((value * 100).toFixed(4)) : undefined;

export const CalculatorLeadCapture = ({
  boeValue,
  emissions,
  firstRegistrationDate,
  vehicleCondition,
  emissionsStandard,
  result,
  externalWarnings = [],
  externalWarningCodes = [],
}: CalculatorLeadCaptureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const leadContext = useMemo(
    () =>
      getLeadContext(
        location.pathname,
        location.search,
        typeof document !== "undefined" ? document.title : ""
      ),
    [location.pathname, location.search]
  );

  const territorySummary = result.territoryForRate?.displayName
    ? result.isProvisionalTerritory
      ? "Territorio pendiente de seleccion; se ha usado el supuesto visible de Peninsula/Baleares."
      : `Territorio: ${result.territoryForRate.displayName}.`
    : "";

  const combinedWarnings = [...result.warnings, ...externalWarnings];
  const combinedWarningCodes = [...result.warningCodes, ...externalWarningCodes];

  const calculationSummary = result.supportedCalculation
    ? `${emissions} g/km · ${result.months ?? "-"} meses · cuota ${rounded(result.tax) ?? "pendiente"} EUR`
    : `Revision fiscal individual: ${result.exclusionReason || "caso fuera de la matriz automatica"}`;

  const validateContact = () => {
    if (!email.trim() || !email.includes("@")) {
      trackLeadEvent("lead_form_validation_error", {
        leadType: "calculadora-impuestos",
        channel: "form",
        pagePath: location.pathname,
        reason: "missing_valid_email",
        context: leadContext,
      });
      setError("Necesitamos un email valido para enviarte el desglose.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!validateContact()) {
      return;
    }

    setIsSubmitting(true);
    let responseStatus = 0;

    try {
      const payload = {
        leadType: "calculadora-impuestos",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        budget: String(Math.round(boeValue)),
        details: notes.trim(),
        calculatorSupportedCalculation: result.supportedCalculation,
        calculatorScope: result.scope,
        calculatorBoeValue: boeValue,
        calculatorPrice: boeValue,
        calculatorEmissions: emissions,
        calculatorFirstRegistrationDate: firstRegistrationDate || result.firstRegistrationDate || undefined,
        calculatorVehicleCondition: vehicleCondition,
        calculatorEmissionsStandard: emissionsStandard,
        calculatorMonths: result.months ?? undefined,
        calculatorDepreciationCoefficient: result.depreciationCoefficient ?? undefined,
        calculatorMarketValue: rounded(result.marketValue),
        calculatorTerritory: result.territoryForRate?.displayName || undefined,
        calculatorTerritoryId: result.territoryForRate?.id || undefined,
        calculatorTerritoryIsProvisional: result.isProvisionalTerritory || undefined,
        calculatorIndirectTaxName: result.indirectTaxName || undefined,
        calculatorIndirectTaxRate: fixedRate(result.indirectTaxRate),
        calculatorResidualRegistrationTaxRate: fixedRate(result.residualRegistrationTaxRate),
        calculatorOtherIndirectTaxRate: fixedRate(result.otherIndirectTaxRate),
        calculatorTaxableBase: result.supportedCalculation ? rounded(result.taxableBase) : null,
        calculatorCurrentRegistrationTaxRate: fixedRate(result.currentRegistrationTaxRate),
        calculatorRate: result.supportedCalculation ? result.rate : undefined,
        calculatorTax: result.supportedCalculation ? rounded(result.tax) : null,
        calculatorAssumptions: result.assumptions.join(" | "),
        calculatorWarnings: combinedWarnings.join(" | "),
        calculatorWarningCodes: combinedWarningCodes.join(","),
        calculatorExclusionReason: result.supportedCalculation ? undefined : result.exclusionReason,
        sourcePath: leadContext.sourcePath,
        sourceQuery: leadContext.sourceQuery,
        sourceTitle: leadContext.sourceTitle,
        entryPath: leadContext.entryPath,
        entryQuery: leadContext.entryQuery,
        firstReferrer: leadContext.firstReferrer,
        firstSeenAt: leadContext.firstSeenAt,
        lastPath: leadContext.lastPath,
        lastQuery: leadContext.lastQuery,
        lastSeenAt: leadContext.lastSeenAt,
        utmSource: leadContext.utmSource,
        utmMedium: leadContext.utmMedium,
        utmCampaign: leadContext.utmCampaign,
        utmTerm: leadContext.utmTerm,
        utmContent: leadContext.utmContent,
        sessionId: leadContext.sessionId,
      };

      const response = await fetch("/api/import-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      responseStatus = response.status;

      if (!response.ok) {
        throw new Error("No se pudo enviar la solicitud.");
      }

      trackLeadEvent("lead_submit_success", {
        leadType: "calculadora-impuestos",
        channel: "form",
        pagePath: location.pathname,
        calculationSupported: result.supportedCalculation,
        calculationScope: result.scope,
        calculatorTerritoryId: result.territoryForRate?.id,
        calculatorTerritoryIsProvisional: result.isProvisionalTerritory || undefined,
        vehicleCondition,
        emissionsStandard,
        warningCodes: combinedWarningCodes.join(",") || undefined,
        calculatorRate: result.supportedCalculation ? result.rate : undefined,
        calculatorTax: result.supportedCalculation ? rounded(result.tax) : undefined,
        hasNotes: Boolean(notes.trim()),
        context: leadContext,
      });
      navigate("/gracias", {
        state: {
          leadType: "calculadora-impuestos",
          budget: String(Math.round(boeValue)),
          calculationSupported: result.supportedCalculation,
          estimatedTax: result.supportedCalculation ? String(rounded(result.tax)) : undefined,
          calculationSummary: [calculationSummary, territorySummary].filter(Boolean).join(" · "),
        },
      });
    } catch {
      trackLeadEvent("lead_submit_error", {
        leadType: "calculadora-impuestos",
        channel: "form",
        pagePath: location.pathname,
        errorType: responseStatus ? "http_error" : "network_error",
        responseStatus: responseStatus || undefined,
        context: leadContext,
      });
      setError("No pudimos enviar el desglose ahora mismo. Prueba de nuevo en unos segundos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-white/10 pt-6 space-y-4 text-left">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-bold">
        Recibe tu desglose
      </p>
      <p className="text-sm text-gray-300 leading-relaxed">
        Te enviamos el resumen por email con la cuota estimada o, si el caso queda fuera de la matriz automatica, el motivo de revision fiscal.
      </p>
      {territorySummary && (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-gray-300">
          {territorySummary}
        </p>
      )}
      {!result.supportedCalculation && (
        <p className="rounded-xl border border-gold-400/20 bg-gold-400/[0.08] p-3 text-xs leading-relaxed text-gold-100">
          {result.exclusionReason || "Este caso requiere revision individual antes de estimar una cuota."}
        </p>
      )}

      <input
        type="text"
        value={name}
        onChange={(event) => {
          setError("");
          setName(event.target.value);
        }}
        placeholder="Nombre (opcional)"
        className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-sm min-h-[44px]"
      />

      <input
        type="email"
        required
        value={email}
        onChange={(event) => {
          setError("");
          setEmail(event.target.value);
        }}
        placeholder="Email"
        className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-sm min-h-[44px]"
      />

      <input
        type="tel"
        value={phone}
        onChange={(event) => {
          setError("");
          setPhone(event.target.value);
        }}
        placeholder="Telefono"
        className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-sm min-h-[44px]"
      />

      <textarea
        value={notes}
        onChange={(event) => {
          setError("");
          setNotes(event.target.value);
        }}
        rows={2}
        placeholder="Contexto rapido (opcional): modelo, uso, ciudad..."
        className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors resize-none text-sm min-h-[44px]"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gold-400 text-black font-extrabold rounded-xl hover:bg-white transition-all uppercase text-[11px] tracking-[0.15em] flex items-center justify-center gap-3 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Recibir desglose"} <Send size={14} />
      </button>
    </form>
  );
};

export default CalculatorLeadCapture;

