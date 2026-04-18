import React, { useMemo, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";

export const ImportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    budget: "",
    email: "",
    phone: "",
    details: "",
  });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSubmitError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMessageBody = () => {
    const vehicleLabel = [formData.brand, formData.model]
      .filter(Boolean)
      .join(" ")
      .trim();

    return `Solicitud de importacion - Premium German Cars

Tipo de lead: busqueda personalizada
Vehiculo: ${vehicleLabel || "Sin definir"}
Presupuesto maximo: ${formData.budget} EUR

Datos de contacto:
Email: ${formData.email}
Telefono: ${formData.phone}

Detalles especificos:
${formData.details || "Sin detalles adicionales"}`;
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      model: "",
      budget: "",
      email: "",
      phone: "",
      details: "",
    });
  };

  const buildPayload = () => ({
    ...formData,
    leadType: "busqueda-personalizada",
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
  });

  const goToThankYouPage = () => {
    navigate("/gracias", {
      state: {
        leadType: "busqueda-personalizada",
        brand: formData.brand,
        model: formData.model,
        budget: formData.budget,
      },
    });
  };

  const getBudgetTier = () => {
    const numericBudget = Number(formData.budget);

    if (!Number.isFinite(numericBudget) || numericBudget <= 0) {
      return "unknown";
    }

    if (numericBudget < 30000) {
      return "sub_30k";
    }

    if (numericBudget < 60000) {
      return "30k_60k";
    }

    if (numericBudget < 90000) {
      return "60k_90k";
    }

    return "90k_plus";
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    let responseStatus = 0;

    try {
      const response = await fetch("/api/import-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      });
      responseStatus = response.status;

      if (!response.ok) {
        throw new Error("No se pudo enviar tu solicitud. Intentalo de nuevo.");
      }

      trackLeadEvent("lead_submit_success", {
        leadType: "busqueda-personalizada",
        channel: "form",
        pagePath: location.pathname,
        budgetTier: getBudgetTier(),
        hasDetails: Boolean(formData.details.trim()),
        context: leadContext,
      });
      resetForm();
      goToThankYouPage();
    } catch {
      trackLeadEvent("lead_submit_error", {
        leadType: "busqueda-personalizada",
        channel: "form",
        pagePath: location.pathname,
        errorType: responseStatus ? "http_error" : "network_error",
        responseStatus: responseStatus || undefined,
        context: leadContext,
      });
      setSubmitError(
        "No pudimos enviar el formulario ahora mismo. Escribenos por WhatsApp y te atendemos al instante."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    setSubmitError("");

    if (!formData.brand || !formData.model || !formData.phone) {
      trackLeadEvent("lead_form_validation_error", {
        leadType: "busqueda-personalizada",
        channel: "whatsapp",
        pagePath: location.pathname,
        reason: "missing_brand_model_phone",
        context: leadContext,
      });
      setSubmitError(
        "Para WhatsApp, rellena al menos Marca, Modelo y Telefono."
      );
      return;
    }

    const whatsappNumber = "34603743608";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      generateMessageBody()
    )}`;

    trackLeadEvent("lead_followup_click", {
      leadType: "busqueda-personalizada",
      channel: "whatsapp",
      pagePath: location.pathname,
      cta: "import_form_whatsapp",
      budgetTier: getBudgetTier(),
      context: leadContext,
    });
    window.open(whatsappLink, "_blank");
    goToThankYouPage();
  };

  return (
    <section
      id="import"
      className="py-20 sm:py-24 md:py-32 bg-metallic-950 relative border-t border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold mb-4 block">
              Busqueda a la carta
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              No encuentras lo que buscas?
            </h2>
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-8">
              Dinos que coche buscas y nosotros rastreamos las unidades
              oficiales disponibles en Alemania por ti.
            </p>
            <div className="border-l border-gold-400 pl-6 py-2">
              <p className="text-white font-serif italic text-xl">
                "Tu coche ideal existe. Nosotros sabemos donde esta."
              </p>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-metallic-900 border border-white/10 p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <form onSubmit={handleEmailSubmit} className="space-y-8">
                <input type="hidden" name="leadType" value="busqueda-personalizada" />
                <input type="hidden" name="sourcePath" value={leadContext.sourcePath} />
                <input type="hidden" name="sourceQuery" value={leadContext.sourceQuery} />
                <input type="hidden" name="sourceTitle" value={leadContext.sourceTitle} />
                <input type="hidden" name="entryPath" value={leadContext.entryPath} />
                <input type="hidden" name="entryQuery" value={leadContext.entryQuery} />
                <input type="hidden" name="firstReferrer" value={leadContext.firstReferrer} />
                <input type="hidden" name="firstSeenAt" value={leadContext.firstSeenAt} />
                <input type="hidden" name="lastPath" value={leadContext.lastPath} />
                <input type="hidden" name="lastQuery" value={leadContext.lastQuery} />
                <input type="hidden" name="lastSeenAt" value={leadContext.lastSeenAt} />
                <input type="hidden" name="utmSource" value={leadContext.utmSource} />
                <input type="hidden" name="utmMedium" value={leadContext.utmMedium} />
                <input type="hidden" name="utmCampaign" value={leadContext.utmCampaign} />
                <input type="hidden" name="utmTerm" value={leadContext.utmTerm} />
                <input type="hidden" name="utmContent" value={leadContext.utmContent} />
                <input type="hidden" name="sessionId" value={leadContext.sessionId} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">
                      Marca
                    </label>
                    <input
                      required
                      name="brand"
                      type="text"
                      placeholder="Ej. Audi"
                      className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-base min-h-[44px] touch-manipulation"
                      onChange={handleChange}
                      value={formData.brand}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">
                      Modelo
                    </label>
                    <input
                      required
                      name="model"
                      type="text"
                      placeholder="Ej. RS3 Sportback"
                      className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-base min-h-[44px] touch-manipulation"
                      onChange={handleChange}
                      value={formData.model}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">
                      Presupuesto (EUR)
                    </label>
                    <input
                      required
                      name="budget"
                      type="number"
                      placeholder="Ej. 65000"
                      className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-base min-h-[44px] touch-manipulation"
                      onChange={handleChange}
                      value={formData.budget}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">
                      Email
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-base min-h-[44px] touch-manipulation"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">
                      Telefono
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="+34 603 743 608"
                      className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors text-base min-h-[44px] touch-manipulation"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 group-focus-within:text-gold-400">
                    Extras y preferencias
                  </label>
                  <textarea
                    name="details"
                    rows={2}
                    placeholder="Techo panoramico, acabado mate, menos de 50.000km..."
                    className="w-full bg-transparent border-b border-gray-700 text-white pb-3 focus:border-gold-400 focus:outline-none transition-colors resize-none text-base min-h-[44px] touch-manipulation"
                    onChange={handleChange}
                    value={formData.details}
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation active:scale-95"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitud"}{" "}
                    <Send size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="flex-1 px-8 py-4 bg-[#25D366] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/10 min-h-[48px] touch-manipulation active:scale-95"
                  >
                    Contactar WhatsApp <MessageCircle size={14} />
                  </button>
                </div>

                {submitError && (
                  <p className="text-xs text-red-400 text-center">{submitError}</p>
                )}

                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest opacity-50">
                  Premium German Cars - Gestion Directa
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
