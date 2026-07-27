import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";

type ThankYouState = {
  leadType?: string;
  name?: string;
  brand?: string;
  model?: string;
  budget?: string;
  estimatedTax?: string;
  calculationSupported?: boolean;
  calculationSummary?: string;
  leadReference?: string;
};

function buildWhatsAppMessage(state: ThankYouState) {
  if (state.leadType === "calculadora-impuestos") {
    return "Hola, acabo de enviar mi resultado de la calculadora y quiero validar si esta importación compensa.";
  }

  if (state.leadType === "revision-unidad-alemania") {
    return "Hola, acabo de enviar mi solicitud de revisión de una unidad y quiero esperar vuestra confirmación del encargo.";
  }

  const vehicleLabel = [state.brand, state.model].filter(Boolean).join(" ").trim();

  if (vehicleLabel) {
    return `Hola, acabo de enviar mi solicitud para ${vehicleLabel} y quiero avanzar con los siguientes pasos.`;
  }

  return "Hola, acabo de enviar mi solicitud desde la web y quiero avanzar con los siguientes pasos.";
}

export const ThankYouPage = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as ThankYouState;
  const leadContext = useMemo(
    () =>
      getLeadContext(
        location.pathname,
        location.search,
        typeof document !== "undefined" ? document.title : ""
      ),
    [location.pathname, location.search]
  );
  const phoneNumber = "34603743608";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(state)
  )}`;
  const vehicleLabel = [state.brand, state.model].filter(Boolean).join(" ").trim();
  const isCalculatorLead = state.leadType === "calculadora-impuestos";
  const isRevisionUnitLead = state.leadType === "revision-unidad-alemania";
  const estimatedTaxNumber = Number(state.estimatedTax);
  const hasSupportedEstimatedTax = state.calculationSupported !== false && Number.isFinite(estimatedTaxNumber);
  const headingText = isRevisionUnitLead
    ? "Hemos recibido tu solicitud"
    : isCalculatorLead
      ? "Gracias. Ya tenemos tu solicitud de cálculo."
      : "Gracias. Ya tenemos tu solicitud.";
  const introText = isCalculatorLead
    ? "Hemos registrado tu resultado para revisarlo con enfoque estratégico y ayudarte a decidir si esta unidad compensa."
    : "Hemos registrado tu interes y revisaremos el caso para responderte con criterio, no con una respuesta generica.";
  const stepText = isRevisionUnitLead
    ? "Revisaremos el enlace enviado. Si podemos efectuar el análisis, recibirás la confirmación del encargo y las instrucciones de pago por correo electrónico o WhatsApp."
    : isCalculatorLead
      ? "Enviarnos por WhatsApp el enlace del anuncio o la ficha del coche para darte una validacion completa sobre coste total y riesgo de compra."
      : "Enviarnos por WhatsApp una o varias referencias concretas, el uso que le vas a dar al coche y cualquier condicion que no quieras negociar.";

  useEffect(() => {
    trackLeadEvent("thank_you_view", {
      leadType: state.leadType || "desconocido",
      channel: "landing",
      pagePath: location.pathname,
      hasVehicleContext: Boolean(vehicleLabel),
      isCalculatorLead,
      isRevisionUnitLead,
      context: leadContext,
    });
  }, [isCalculatorLead, isRevisionUnitLead, leadContext, location.pathname, state.leadType, vehicleLabel]);

  return (
    <>
      <SEO
        title="Gracias | Premium German Cars"
        description="Hemos recibido tu solicitud. Te indicamos el siguiente paso para avanzar con tu compra o búsqueda."
        canonical="https://www.premiumgermancars.com/gracias"
        noIndex={true}
      />

      <Navbar />

      <main className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <section className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="bg-metallic-950 border border-white/10 p-8 sm:p-10 md:p-14 shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
                Solicitud recibida
              </span>

              <CheckCircle2 className="text-gold-400 mb-6" size={56} />

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                {headingText}
              </h1>

              {isRevisionUnitLead ? (
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed mb-10">
                  <p>
                    Comprobaremos que el anuncio contiene la información necesaria para realizar la revisión.
                  </p>
                  <p>
                    Si podemos efectuar el análisis, recibirás por correo electrónico o WhatsApp la confirmación del encargo y las instrucciones para pagar los 79 € IVA incluido mediante Bizum o transferencia bancaria.
                  </p>
                  <p>
                    El plazo habitual de entrega es de 24–48 horas laborables desde la recepción del pago y de todos los datos necesarios.
                  </p>
                  <p>
                    Enviar esta solicitud no implica ningún cargo ni te obliga a contratar el servicio.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {introText}
                  </p>

                  <p className="text-gray-400 text-base leading-relaxed mb-10">
                    Tiempo objetivo de respuesta: menos de 24 horas laborables. Si quieres acelerar el proceso, el mejor siguiente paso es escribirnos ahora por WhatsApp y compartir cualquier referencia adicional.
                  </p>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackLeadEvent("lead_followup_click", {
                      leadType: state.leadType || "desconocido",
                      channel: "whatsapp",
                      pagePath: location.pathname,
                      cta: "thank_you_whatsapp",
                      context: leadContext,
                    })
                  }
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-bold uppercase text-[11px] tracking-[0.15em] hover:bg-[#128C7E] transition-colors min-h-[48px]"
                >
                  Seguir por WhatsApp <MessageCircle size={16} />
                </a>

                <a
                  href={`tel:+${phoneNumber}`}
                  onClick={() =>
                    trackLeadEvent("lead_followup_click", {
                      leadType: state.leadType || "desconocido",
                      channel: "phone",
                      pagePath: location.pathname,
                      cta: "thank_you_phone",
                      context: leadContext,
                    })
                  }
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 border border-white/15 text-white font-bold uppercase text-[11px] tracking-[0.15em] hover:bg-white hover:text-black transition-colors min-h-[48px]"
                >
                  Llamar ahora <Phone size={16} />
                </a>
              </div>

              <div className="border border-white/10 bg-black/40 p-6 mb-10">
                <h2 className="text-lg font-bold text-white mb-4">Siguiente paso recomendado</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {stepText}
                </p>
                {isRevisionUnitLead && state.leadReference && (
                  <p className="text-sm text-gold-400">
                    Referencia de solicitud: {state.leadReference}
                  </p>
                )}
                {vehicleLabel && !isRevisionUnitLead && (
                  <p className="text-sm text-gold-400">
                    Solicitud enviada para: {vehicleLabel}
                    {state.budget ? ` - presupuesto maximo ${state.budget} EUR` : ""}
                  </p>
                )}
                {isCalculatorLead && (
                  <p className="text-sm text-gold-400">
                    {hasSupportedEstimatedTax
                      ? `Calculo enviado: valor ${state.budget || "N/A"} EUR - impuesto estimado ${state.estimatedTax} EUR`
                      : `Calculo fiscal pendiente de revision individual.`}
                    {state.calculationSummary ? ` - ${state.calculationSummary}` : ""}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold-400 text-black font-bold uppercase text-[11px] tracking-[0.15em] hover:bg-white transition-colors min-h-[48px]"
                >
                  Volver al inicio <ArrowRight size={16} />
                </Link>

                <Link
                  to="/importacion-coches-alemania"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/15 text-white font-bold uppercase text-[11px] tracking-[0.15em] hover:bg-white hover:text-black transition-colors min-h-[48px]"
                >
                  Ver proceso completo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default ThankYouPage;