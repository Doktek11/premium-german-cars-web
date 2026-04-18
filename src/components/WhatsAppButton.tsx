import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";

export const WhatsAppButton = () => {
  const location = useLocation();
  const { pathname } = location;
  const phoneNumber = "34603743608";
  const leadContext = useMemo(
    () =>
      getLeadContext(
        location.pathname,
        location.search,
        typeof document !== "undefined" ? document.title : ""
      ),
    [location.pathname, location.search]
  );

  let message =
    "Hola! Vengo de la web de Premium German Cars y me gustaria recibir mas informacion.";

  if (pathname.includes("mejores-modelos-importar-alemania-2026")) {
    message =
      "Hola! He leido vuestro articulo sobre los mejores modelos para importar en 2026 y me gustaria asesoramiento sobre uno de ellos.";
  } else if (pathname.includes("car/")) {
    message =
      "Hola! Estoy interesado en uno de los vehiculos de vuestro stock. Sigue disponible?";
  } else if (pathname.includes("importacion")) {
    message =
      "Hola! Me gustaria solicitar un presupuesto personalizado para importar un coche de Alemania.";
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const pageCategory = pathname.includes("car/")
    ? "car"
    : pathname.includes("calculadora-impuesto-matriculacion")
      ? "calculadora"
      : pathname.includes("blog/")
        ? "blog"
        : pathname.includes("importacion")
          ? "importacion"
          : "otros";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackLeadEvent("lead_followup_click", {
          leadType: "whatsapp-floating",
          channel: "whatsapp",
          pagePath: pathname,
          cta: "floating_whatsapp_button",
          pageCategory,
          context: leadContext,
        })
      }
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 bg-[#25D366] text-white p-4 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center group touch-manipulation min-w-[56px] min-h-[56px]"
    >
      <MessageCircle
        size={24}
        className="sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform"
      />
      <span className="absolute right-16 bg-white text-black text-xs font-bold px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Hablamos?
      </span>
    </a>
  );
};
