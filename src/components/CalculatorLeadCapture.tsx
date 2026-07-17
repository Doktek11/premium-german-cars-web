import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";

type CalculatorLeadCaptureProps = {
  precio: number;
  emisiones: number;
  meses: number;
  tramo: number;
  impuesto: number;
  reduccion: string;
  territoryLabel?: string;
  isProvisionalTerritory?: boolean;
};

export const CalculatorLeadCapture = ({
  precio,
  emisiones,
  meses,
  tramo,
  impuesto,
  reduccion,
  territoryLabel = "",
  isProvisionalTerritory = false,
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

  const territorySummary = territoryLabel
    ? isProvisionalTerritory
      ? "Territorio pendiente de selección; tipo provisional aplicado: 14,75 %."
      : `Territorio: ${territoryLabel}.`
    : "";

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
        budget: String(Math.round(precio)),
        details: notes.trim(),
        calculatorPrice: precio,
        calculatorEmissions: emisiones,
        calculatorMonths: meses,
        calculatorRate: tramo,
        calculatorTax: Math.round(impuesto),
        calculatorReduction: reduccion,
        calculatorTerritory: territoryLabel || undefined,
        calculatorTerritoryIsProvisional: territoryLabel ? isProvisionalTerritory : undefined,
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
        calculatorRate: tramo,
        calculatorTax: Math.round(impuesto),
        calculatorTerritory: territoryLabel || undefined,
        calculatorTerritoryIsProvisional: territoryLabel ? isProvisionalTerritory : undefined,
        hasNotes: Boolean(notes.trim()),
        context: leadContext,
      });
      navigate("/gracias", {
        state: {
          leadType: "calculadora-impuestos",
          budget: String(Math.round(precio)),
          estimatedTax: String(Math.round(impuesto)),
          calculationSummary: [`${emisiones} g/km · ${meses} meses · tramo ${tramo}%`, territorySummary]
            .filter(Boolean)
            .join(" · "),
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
        Te enviamos el cálculo por email con recomendaciones para decidir si esta unidad compensa importar.
      </p>
      {territorySummary && (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-gray-300">
          {territorySummary}
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
        placeholder="Teléfono"
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
        {isSubmitting ? "Enviando..." : "Recibir Desglose"} <Send size={14} />
      </button>
    </form>
  );
};

export default CalculatorLeadCapture;
