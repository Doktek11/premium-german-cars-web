import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Euro,
  FileSearch,
  HelpCircle,
  ListChecks,
  Landmark,
  Send,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SEO } from "../components/SEO";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { trackLeadEvent } from "../lib/analytics";
import { getLeadContext } from "../lib/leadAttribution";
import {
  revisionUnidadFaqs,
  revisionUnidadJsonLd,
} from "../data/corePageSchemas.mjs";

const primaryCta = "Solicitar la revisión — 79 € IVA incluido";
const canonicalUrl =
  "https://www.premiumgermancars.com/revision-unidad-alemania";

const problemItems = [
  "Precio sujeto a financiación.",
  "IVA no deducible.",
  "Garantía limitada al país de origen.",
  "Daños o accidentes declarados.",
  "Equipamiento inferior al esperado.",
  "Ausencia del certificado COC.",
  "Costes de preparación o entrega.",
  "Información contradictoria o pendiente de confirmar.",
];

const reviewItems = [
  {
    title: "Análisis del anuncio",
    text: "Identificamos la versión, motorización, fecha de matriculación, kilometraje, emisiones, equipamiento relevante y condiciones económicas publicadas.",
  },
  {
    title: "Revisión inicial del vendedor",
    text: "Identificamos si se trata de un concesionario oficial, compraventa profesional o vendedor particular. También revisamos la información pública disponible, su presencia comercial y las condiciones que aparecen en el anuncio.",
    note: "Esta revisión inicial no equivale a una certificación jurídica o financiera del vendedor.",
  },
  {
    title: "Impuestos y gastos de matriculación",
    text: "Estimamos el impuesto de matriculación de acuerdo con las emisiones, la antigüedad fiscal, la referencia del Valor BOE y el territorio donde se matriculará el vehículo. También contemplamos otros gastos previsibles, como ITV de importación, placas, IVTM y trámites administrativos.",
    note: "Cuando la versión exacta no pueda identificarse inequívocamente en las tablas fiscales, utilizaremos la aproximación más prudente y lo indicaremos expresamente. No se presenta nunca un Valor BOE aproximado como si estuviera confirmado.",
  },
  {
    title: "Estimación del transporte",
    text: "Calculamos una horquilla prudente según la ubicación del vehículo y el lugar de entrega en España. El precio definitivo dependerá de la disponibilidad, la fecha de recogida, la ruta, las dimensiones del vehículo y las condiciones del transportista.",
  },
  {
    title: "Garantía, IVA y documentación",
    text: "Revisamos la información disponible sobre garantía comercial, IVA deducible o no deducible, certificado de conformidad COC, historial de mantenimiento, accidentes o daños declarados y documentación necesaria para matricular el vehículo.",
    note: "Cuando un dato no pueda confirmarse mediante el anuncio o las fuentes disponibles, quedará señalado expresamente como pendiente de verificar.",
  },
  {
    title: "Comparación con el mercado español",
    text: "Siempre que exista una muestra suficiente, comparamos el coste probable de la operación con unidades de características similares anunciadas en España. La comparación tendrá en cuenta versión, matriculación, kilometraje y equipamiento relevante.",
  },
  {
    title: "Recomendación profesional",
    text: "El informe termina con una conclusión clara: la unidad compensa, solo compensa si se negocia el precio, falta información antes de reservarla o recomendamos descartarla y buscar otra alternativa.",
  },
];

const deliverables = [
  "Resumen de la unidad.",
  "Aspectos favorables y desfavorables.",
  "Coste mínimo, probable y máximo razonable.",
  "Riesgos e información pendiente.",
  "Comparación orientativa con España.",
  "Preguntas que deberían trasladarse al vendedor.",
  "Recomendación final de Premium German Cars.",
];

const notIncluded = [
  "Inspección física del vehículo en Alemania.",
  "Diagnosis mecánica o medición de pintura.",
  "Certificación del kilometraje o de la ausencia de accidentes.",
  "Reserva o negociación del vehículo.",
  "Contacto directo con el vendedor.",
  "Cotización cerrada del transporte.",
  "Comprobación documental completa.",
  "Gestión de pagos, transporte o matriculación.",
];

const audienceItems = [
  "Has encontrado un vehículo en Mobile.de, AutoScout24 o la web de un concesionario.",
  "Quieres saber cuánto podría costar matriculado en España.",
  "No sabes si el precio incluye IVA deducible.",
  "Tienes dudas sobre el vendedor o la garantía.",
  "Quieres comparar la operación con el mercado español.",
  "Estás valorando reservar el coche o realizar una transferencia.",
  "Quieres una segunda opinión antes de tomar la decisión.",
];

const steps = [
  {
    title: "1. Envíanos el anuncio",
    text: "Pega el enlace del coche e indícanos dónde se matriculará.",
  },
  {
    title: "2. Revisamos la operación",
    text: "Analizamos la unidad, la fiscalidad, los gastos probables, el vendedor y los principales riesgos.",
  },
  {
    title: "3. Recibes nuestra conclusión",
    text: "Te entregamos el informe con la estimación económica y nuestra recomendación antes de que reserves o pagues el vehículo.",
  },
  {
    title: "4. Tú decides cómo continuar",
    text: "Puedes comprar por tu cuenta, descartar la unidad o encargarnos las comprobaciones adicionales y la gestión completa de la importación.",
  },
];

const priceItems = [
  "Análisis personalizado de un anuncio.",
  "Estimación fiscal y económica.",
  "Revisión inicial del vendedor y de las condiciones publicadas.",
  "Riesgos y datos pendientes de confirmar.",
  "Comparación orientativa con España.",
  "Recomendación final.",
  "Entrega habitual en 24–48 horas laborables.",
];

const continuationServices = [
  {
    title: "Confirmación con el vendedor",
    text: "Contacto con el concesionario para confirmar disponibilidad, garantía, IVA, historial, documentación, estado declarado y condiciones de venta.",
  },
  {
    title: "Inspección física en Alemania",
    text: "Coordinación de una revisión independiente en origen para comprobar el estado general, posibles repintados, daños, desgaste y coherencia del vehículo antes de comprarlo.",
  },
  {
    title: "Gestión integral de la importación",
    text: "Podemos acompañarte durante todo el proceso: comunicación con el vendedor, comprobaciones, documentación, transporte asegurado, ITV, impuestos y matriculación en España.",
  },
];

const estimationItems = [
  "Coste mínimo razonable.",
  "Coste más probable.",
  "Coste máximo previsto con la información disponible.",
];

const paymentOptions = [
  {
    title: "Bizum",
    text: "Podrás realizar el pago mediante Bizum utilizando la referencia que te facilitaremos al confirmar el encargo.",
    icon: Smartphone,
  },
  {
    title: "Transferencia bancaria",
    text: "También podrás pagar mediante transferencia bancaria. Te enviaremos el titular, el IBAN y el concepto correspondiente a tu solicitud.",
    icon: Landmark,
  },
];

type FormErrors = Partial<
  Record<
    | "announcementUrl"
    | "registrationPlace"
    | "name"
    | "email"
    | "phone"
    | "privacy",
    string
  >
>;

const SectionHeader = ({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  center?: boolean;
}) => (
  <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl mb-10`}>
    {eyebrow ? (
      <span className="text-gold-400 text-xs font-bold tracking-[0.28em] uppercase mb-4 block">
        {eyebrow}
      </span>
    ) : null}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
      {title}
    </h2>
    {children ? (
      <div className="mt-6 space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
        {children}
      </div>
    ) : null}
  </div>
);

const AnchorCta = ({
  children = primaryCta,
  className = "",
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <a
    href="#solicitud-revision"
    onClick={onClick}
    className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
  >
    {children} <ArrowRight size={16} />
  </a>
);

const CheckList = ({ items }: { items: string[] }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {items.map((item) => (
      <li
        key={item}
        className="flex gap-3 border border-white/10 bg-white/[0.03] p-4"
      >
        <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
        <span className="text-gray-300 leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const RevisionRequestForm = () => {
  const [formData, setFormData] = useState({
    announcementUrl: "",
    registrationPlace: "",
    name: "",
    email: "",
    phone: "",
    details: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
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

  const markFormStart = () => {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackLeadEvent("revision_unit_form_start", {
      leadType: "revision-unidad-alemania",
      channel: "form",
      pagePath: location.pathname,
      context: leadContext,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = event.target;
    const checked =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : false;

    markFormStart();
    setSubmitError("");
    setErrors((current) => ({ ...current, [name]: undefined }));
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formData.announcementUrl.trim()) {
      nextErrors.announcementUrl = "Indica el enlace del anuncio.";
    }

    if (!formData.registrationPlace.trim()) {
      nextErrors.registrationPlace = "Indica dónde matricularás el vehículo.";
    }

    if (!formData.name.trim()) {
      nextErrors.name = "Indica tu nombre.";
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      nextErrors.email = "Indica un correo electrónico válido.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Indica un teléfono o WhatsApp.";
    }

    if (!formData.privacy) {
      nextErrors.privacy = "Debes aceptar la política de privacidad.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = () => ({
    leadType: "revision-unidad-alemania",
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    details: formData.details.trim(),
    announcementUrl: formData.announcementUrl.trim(),
    registrationPlace: formData.registrationPlace.trim(),
    service_type: "revision_unidad_alemania",
    servicePrice: "79",
    servicePriceCurrency: "EUR",
    serviceVatIncluded: true,
    requestStatus: "pendiente de comprobar",
    paymentMethods: "Bizum o transferencia bancaria",
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      trackLeadEvent("lead_form_validation_error", {
        leadType: "revision-unidad-alemania",
        channel: "form",
        pagePath: location.pathname,
        reason: "missing_required_fields",
        context: leadContext,
      });
      return;
    }

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
        throw new Error("No se pudo enviar la solicitud.");
      }

      const result = await response.json().catch(() => ({}));

      trackLeadEvent("revision_unit_form_submit", {
        leadType: "revision-unidad-alemania",
        channel: "form",
        pagePath: location.pathname,
        hasDetails: Boolean(formData.details.trim()),
        context: leadContext,
      });
      trackLeadEvent("revision_unit_request_success", {
        leadType: "revision-unidad-alemania",
        channel: "form",
        pagePath: location.pathname,
        context: leadContext,
      });
      navigate("/gracias", {
        state: {
          leadType: "revision-unidad-alemania",
          name: formData.name,
          model: "revisión de una unidad",
          budget: "79",
          leadReference: result.leadId || result.reference || "",
        },
      });
    } catch {
      trackLeadEvent("lead_submit_error", {
        leadType: "revision-unidad-alemania",
        channel: "form",
        pagePath: location.pathname,
        errorType: responseStatus ? "http_error" : "network_error",
        responseStatus: responseStatus || undefined,
        context: leadContext,
      });
      setSubmitError(
        "No pudimos enviar la solicitud ahora mismo. Escríbenos por WhatsApp y te atendemos."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label
            htmlFor="announcementUrl"
            className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
          >
            Enlace del anuncio
          </label>
          <input
            id="announcementUrl"
            name="announcementUrl"
            type="url"
            required
            value={formData.announcementUrl}
            onChange={handleChange}
            aria-invalid={Boolean(errors.announcementUrl)}
            aria-describedby={
              errors.announcementUrl ? "announcementUrl-error" : undefined
            }
            placeholder="https://www.mobile.de/..."
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 min-h-[48px]"
          />
          {errors.announcementUrl ? (
            <p id="announcementUrl-error" className="mt-2 text-sm text-red-300">
              {errors.announcementUrl}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="registrationPlace"
            className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
          >
            Lugar de matriculación
          </label>
          <input
            id="registrationPlace"
            name="registrationPlace"
            type="text"
            required
            value={formData.registrationPlace}
            onChange={handleChange}
            aria-invalid={Boolean(errors.registrationPlace)}
            aria-describedby={
              errors.registrationPlace ? "registrationPlace-error" : undefined
            }
            placeholder="Ej. Madrid, Barcelona, Valencia..."
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 min-h-[48px]"
          />
          {errors.registrationPlace ? (
            <p id="registrationPlace-error" className="mt-2 text-sm text-red-300">
              {errors.registrationPlace}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 min-h-[48px]"
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-red-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 min-h-[48px]"
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-red-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
          >
            Teléfono o WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="+34 600 000 000"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 min-h-[48px]"
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-2 text-sm text-red-300">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="details"
            className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
          >
            ¿Hay algo concreto que quieras comprobar?
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            value={formData.details}
            onChange={handleChange}
            placeholder="Por ejemplo: garantía, IVA deducible, equipamiento, historial o coste total."
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 min-h-[120px] resize-y"
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
        <label className="flex items-start gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            name="privacy"
            checked={formData.privacy}
            onChange={handleChange}
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-gold-400 focus:ring-2 focus:ring-gold-400"
          />
          <span>
            Acepto la{" "}
            <Link
              to="/politica-privacidad"
              className="text-gold-400 underline underline-offset-4 hover:text-white"
            >
              política de privacidad
            </Link>{" "}
            y autorizo a Premium German Cars a contactar conmigo sobre esta
            solicitud.
          </span>
        </label>
        {errors.privacy ? (
          <p id="privacy-error" className="mt-2 text-sm text-red-300">
            {errors.privacy}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full min-h-[52px] items-center justify-center gap-3 rounded-full bg-gold-400 px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-metallic-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando solicitud..." : primaryCta} <Send size={16} />
      </button>

      <p className="text-sm text-gray-400 leading-relaxed">
        Enviar la solicitud no implica ningún cargo ni te obliga a contratar el servicio. El análisis comenzará después de confirmar el encargo, recibir el pago y disponer de todos los datos necesarios.
      </p>
    </form>
  );
};

export const RevisionUnidadAlemania: React.FC = () => {
  const location = useLocation();
  const leadContext = useMemo(
    () =>
      getLeadContext(
        location.pathname,
        location.search,
        typeof document !== "undefined" ? document.title : ""
      ),
    [location.pathname, location.search]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    trackLeadEvent("revision_unit_view", {
      leadType: "revision-unidad-alemania",
      channel: "landing",
      pagePath: location.pathname,
      context: leadContext,
    });
  }, [leadContext, location.pathname]);

  const trackCtaClick = (cta: string) => {
    trackLeadEvent("revision_unit_cta_click", {
      leadType: "revision-unidad-alemania",
      channel: "landing",
      pagePath: location.pathname,
      cta,
      context: leadContext,
    });
  };

  return (
    <>
      <SEO
        title="Revisión de coches en Alemania antes de comprar | PGC"
        description="¿Has encontrado un coche en Alemania? Analizamos el anuncio, vendedor, impuestos, garantía, documentación y coste probable antes de que pagues."
        canonical={canonicalUrl}
        image="https://www.premiumgermancars.com/bmwconcesionario2-1280.webp"
        jsonLd={revisionUnidadJsonLd}
      />

      <Navbar />

      <main className="bg-black text-white">
        <section className="relative min-h-[88vh] overflow-hidden pt-28 sm:pt-32 md:pt-36">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bmwconcesionario2-1280.webp')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
            aria-hidden="true"
          />

          <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl pb-20 sm:pb-24 md:pb-28">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-xs uppercase tracking-[0.2em] text-gray-400"
            >
              <Link to="/" className="hover:text-gold-400">
                Inicio
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gold-400">Revisión de una unidad</span>
            </nav>

            <div className="max-w-4xl">
              <span className="text-gold-400 text-xs font-bold tracking-[0.32em] uppercase mb-6 block">
                Análisis previo a la compra
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 sm:mb-8">
                Revisión de una unidad antes de comprarla en Alemania
              </h1>
              <div className="max-w-3xl space-y-5 text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">
                <p>
                  ¿Has encontrado un coche en Alemania y no sabes si realmente
                  compensa?
                </p>
                <p>
                  Antes de reservarlo o transferir el dinero, analizamos la
                  unidad, el vendedor, los impuestos, la garantía, la
                  documentación y los gastos probables de importación.
                </p>
                <p>
                  Recibirás una valoración profesional con los riesgos
                  detectados, el coste estimado matriculado en España y una
                  conclusión clara: comprar, negociar o descartar.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <AnchorCta onClick={() => trackCtaClick("hero_primary")} />
                <p className="text-sm text-gray-400">
                  Enviar la solicitud no implica ningún cargo. Comprobaremos el anuncio antes de confirmar el encargo.
                </p>
                <p className="max-w-3xl text-sm leading-relaxed text-gold-100">
                  Los 79 € se descuentan íntegramente si posteriormente
                  contratas con Premium German Cars la gestión completa de la
                  importación de la unidad analizada.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="Una buena oferta puede dejar de serlo al sumar todos los gastos">
            <p>El precio anunciado en Alemania es solo el punto de partida.</p>
            <p>
              Para saber si una unidad realmente compensa hay que revisar el
              impuesto de matriculación, el Valor BOE, las emisiones, el
              transporte, la garantía, el tratamiento del IVA, la documentación
              disponible y su precio frente a vehículos equivalentes en España.
            </p>
            <p>
              También es necesario detectar posibles condiciones o costes que no
              siempre resultan evidentes en el anuncio.
            </p>
          </SectionHeader>
          <CheckList items={problemItems} />
          <p className="mt-8 max-w-3xl text-gray-300 leading-relaxed">
            Nuestro análisis reúne estos elementos para ayudarte a decidir antes
            de comprometer una cantidad importante de dinero.
          </p>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader eyebrow="Contenido" title="¿Qué incluye la revisión?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reviewItems.map((item) => (
                <article
                  key={item.title}
                  className="border border-white/10 bg-black/35 p-6"
                >
                  <FileSearch className="mb-4 text-gold-400" size={22} />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{item.text}</p>
                  {item.note ? (
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                      {item.note}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="Un análisis realizado por Premium German Cars">
            <p>
              No recibirás únicamente el resultado de una calculadora
              automática.
            </p>
            <p>
              Revisaremos personalmente el anuncio, la configuración del
              vehículo, su tratamiento fiscal, los gastos previsibles y los
              aspectos que deberían confirmarse con el vendedor antes de avanzar.
            </p>
            <p>
              Aplicamos el mismo criterio que utilizamos al preseleccionar
              vehículos para nuestros clientes de importación desde Alemania.
            </p>
          </SectionHeader>
        </section>

        <section className="bg-metallic-950 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <SectionHeader title="Ejemplo de una conclusión" />
            <article className="border border-gold-400/25 bg-gold-400/5 p-6 sm:p-8 md:p-10">
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                <ClipboardCheck size={16} /> Ejemplo ilustrativo
              </span>
              <h3 className="mb-5 text-2xl font-serif font-bold text-white">
                Resultado: unidad interesante, pendiente de confirmar tres
                puntos.
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  El coste probable matriculado en España se sitúa entre 44.800
                  y 45.600 €, sujeto a la cotización definitiva del transporte.
                  Frente a unidades equivalentes en España, existe un ahorro
                  estimado de entre 2.800 y 3.600 €.
                </p>
                <p>
                  Antes de reservar recomendamos confirmar por escrito la
                  validez de la garantía en España, la entrega del COC original y
                  la ausencia de accidentes estructurales.
                </p>
                <p className="font-semibold text-white">
                  Recomendación: avanzar únicamente si el vendedor confirma
                  estos puntos.
                </p>
              </div>
            </article>
            <p className="mt-5 text-sm text-gray-500">
              Ejemplo ilustrativo. Cada informe se prepara con los datos de la
              unidad analizada.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="¿Qué recibirás?">
            <p>Recibirás un informe personalizado que incluirá:</p>
          </SectionHeader>
          <CheckList items={deliverables} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-gold-400/20 bg-gold-400/5 p-6">
              <h3 className="mb-3 text-lg font-bold text-white">
                Entrega habitual
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Entrega habitual en 24–48 horas laborables desde la recepción
                del pago y de los datos necesarios para realizar el análisis.
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-3 text-lg font-bold text-white">
                Datos adicionales
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Si necesitamos información adicional, nos pondremos en contacto
                contigo antes de iniciar la revisión.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader title="¿Por qué no ofrecemos una cifra totalmente cerrada?">
              <p>
                Porque antes de contratar la importación algunos costes no
                pueden conocerse con absoluta precisión.
              </p>
              <p>
                El transporte puede variar según la ubicación exacta del
                vehículo, la fecha de recogida, la ruta y la disponibilidad del
                transportista. El IVTM depende del municipio y también pueden
                aparecer gastos que el vendedor no haya indicado claramente en
                el anuncio.
              </p>
              <p>
                Por eso presentamos una horquilla económica prudente
                diferenciando entre:
              </p>
            </SectionHeader>
            <CheckList items={estimationItems} />
            <p className="mt-8 max-w-4xl text-gray-300 leading-relaxed">
              Nuestro objetivo no es ofrecer una falsa exactitud, sino darte una
              estimación suficientemente rigurosa para saber si la compra tiene
              sentido y qué debe confirmarse antes de avanzar.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="¿Qué no incluye la revisión inicial?">
            <p>La revisión de 79 € no incluye:</p>
          </SectionHeader>
          <CheckList items={notIncluded} />
          <p className="mt-8 max-w-3xl text-gray-300 leading-relaxed">
            Si el análisis inicial resulta favorable, podremos indicarte qué
            comprobaciones adicionales recomendamos antes de comprar.
          </p>
        </section>

        <section className="bg-metallic-950 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader title="¿Para quién es este servicio?">
              <p>Esta revisión está pensada para ti si:</p>
            </SectionHeader>
            <CheckList items={audienceItems} />
            <p className="mt-8 max-w-4xl text-gray-300 leading-relaxed">
              No necesitas haber iniciado todavía la compra. Basta con enviarnos
              el enlace del anuncio y el lugar donde matricularías el vehículo.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader eyebrow="Proceso" title="¿Cómo funciona?" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {steps.map((step) => (
              <article
                key={step.title}
                className="border border-white/10 bg-white/[0.03] p-6"
              >
                <ListChecks className="mb-4 text-gold-400" size={22} />
                <h3 className="text-lg font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <SectionHeader title="Revisión de una unidad" center />
            <article className="mx-auto max-w-3xl border border-gold-400/30 bg-black p-6 sm:p-8 md:p-10 shadow-2xl shadow-gold-500/10">
              <div className="mb-8 flex flex-col gap-3 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
                  Precio final
                </span>
                <div className="font-serif text-5xl font-bold text-white sm:text-6xl">
                  79 € <span className="text-base font-sans">IVA incluido</span>
                </div>
              </div>
              <CheckList items={priceItems} />
              <p className="mt-8 text-gray-300 leading-relaxed">
                Si posteriormente nos encargas la gestión integral de la unidad
                analizada, descontaremos íntegramente los 79 € de nuestros
                honorarios.
              </p>
              <div className="mt-8 text-center">
                <AnchorCta onClick={() => trackCtaClick("price_card_primary")}>
                  Solicitar la revisión
                </AnchorCta>
                <p className="mt-4 text-sm text-gray-500">
                  Pago mediante Bizum o transferencia bancaria después de confirmar que podemos realizar el análisis. Enviar la solicitud no implica ningún cargo.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="¿Necesitas que vayamos más allá?">
            <p>
              La revisión inicial te permite saber si una unidad merece que
              continúes invirtiendo tiempo y dinero en ella.
            </p>
            <p>
              Si el resultado es favorable, Premium German Cars también puede
              ayudarte con los siguientes pasos.
            </p>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {continuationServices.map((service) => (
              <article
                key={service.title}
                className="border border-white/10 bg-white/[0.03] p-6"
              >
                <ShieldCheck className="mb-4 text-gold-400" size={23} />
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{service.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-gray-300 leading-relaxed">
            Te indicaremos qué servicios recomendamos y su coste antes de
            realizar cualquier gestión adicional. Tú decides hasta dónde quieres
            que te acompañemos.
          </p>
          <Link
            to="/importacion-coches-alemania"
            onClick={() =>
              trackLeadEvent("revision_unit_service_click", {
                leadType: "revision-unidad-alemania",
                channel: "landing",
                pagePath: location.pathname,
                cta: "importacion_integral",
                context: leadContext,
              })
            }
            className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Conocer el servicio completo <ArrowRight size={16} />
          </Link>
        </section>

        <section className="bg-metallic-950 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <SectionHeader title="Nuestro compromiso">
              <p>
                Si al recibir el informe tienes alguna duda sobre nuestras
                conclusiones, podrás consultárnosla sin coste adicional durante
                los siete días siguientes a la entrega.
              </p>
              <p>
                La consulta adicional debe referirse a la misma unidad y al
                contenido del informe entregado.
              </p>
            </SectionHeader>
          </div>
        </section>

        <section className="bg-metallic-950 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader title="¿Cómo se realiza el pago?">
              <p>
                Primero comprobaremos que el anuncio contiene la información necesaria para realizar la revisión. Si podemos efectuar el análisis, te enviaremos personalmente la confirmación del encargo y las instrucciones de pago.
              </p>
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paymentOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <article key={option.title} className="border border-white/10 bg-black/35 p-6">
                    <Icon className="mb-4 text-gold-400" size={24} />
                    <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{option.text}</p>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-gray-500 leading-relaxed">
              Los datos de pago se facilitarán de forma privada después de comprobar la solicitud y confirmar el encargo.
            </p>
          </div>
        </section>
        <section
          id="solicitud-revision"
          className="container mx-auto px-4 sm:px-6 max-w-6xl scroll-mt-28 py-16 sm:py-20 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <SectionHeader title="Envíanos el coche que quieres revisar">
                <p>
                  Introduce el enlace del anuncio y los datos necesarios. Comprobaremos que disponemos de suficiente información y te enviaremos la confirmación del encargo y las instrucciones de pago.
                </p>
              </SectionHeader>
              <div className="border border-gold-400/20 bg-gold-400/5 p-6">
                <Euro className="mb-4 text-gold-400" size={28} />
                <h3 className="text-xl font-bold text-white mb-3">
                  79 € IVA incluido
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Enviar la solicitud no implica ningún cargo. Primero comprobaremos que el anuncio contiene información suficiente para realizar la revisión.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-white/10 bg-metallic-950 p-6 sm:p-8 md:p-10 shadow-2xl">
                <RevisionRequestForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24" id="faq">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader
              title="Preguntas frecuentes sobre la revisión"
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {revisionUnidadFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="border border-white/10 bg-black/35 p-6"
                >
                  <HelpCircle className="mb-4 text-gold-400" size={20} />
                  <h3 className="text-lg font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-16 sm:py-20 md:py-24 text-center">
          <AlertTriangle className="mx-auto mb-6 text-gold-400" size={34} />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
            No reserves un coche solo porque el anuncio parece una buena
            oportunidad
          </h2>
          <div className="mx-auto max-w-3xl space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            <p>
              Una unidad barata puede dejar de serlo después de sumar impuestos,
              transporte, documentación y matriculación.
            </p>
            <p>
              También puede ocurrir lo contrario: un vehículo algo más caro
              puede ser la mejor compra si procede de un vendedor sólido, incluye
              una garantía válida y cuenta con el equipamiento adecuado.
            </p>
            <p>
              Antes de transferir el dinero, asegúrate de saber qué estás
              comprando, qué falta por confirmar y cuánto puede costarte
              realmente.
            </p>
          </div>
          <AnchorCta onClick={() => trackCtaClick("final_primary")} />
          <p className="mt-5 text-sm text-gray-400">
            Primero comprobaremos el anuncio. Después podrás pagar mediante Bizum o transferencia bancaria.
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default RevisionUnidadAlemania;
