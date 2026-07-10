import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SEO } from "../components/SEO";
import { WhatsAppButton } from "../components/WhatsAppButton";
import {
  importacionFaqs as faqs,
  importacionJsonLd,
} from "../data/corePageSchemas.mjs";

const reviewUrl =
  "https://wa.me/34603743608?text=Hola,%20he%20visto%20un%20coche%20en%20Alemania%20y%20quiero%20saber%20si%20merece%20la%20pena%20antes%20de%20pagar%20una%20se%C3%B1al.";

const searchUrl =
  "https://wa.me/34603743608?text=Hola,%20quiero%20solicitar%20una%20b%C3%BAsqueda%20personalizada%20de%20coche%20en%20Alemania.";

const leadCards = [
  {
    title: "Ya has encontrado un coche",
    text: "Nos envías el enlace del anuncio y revisamos si merece la pena antes de pagar señal: precio, vendedor, historial, documentación, CO₂, COC, transporte, ITV e impuesto.",
    cta: "Revisar una unidad",
    href: reviewUrl,
    icon: ClipboardCheck,
  },
  {
    title: "Quieres que busquemos por ti",
    text: "Definimos el coche objetivo y buscamos unidades en Alemania que encajen por presupuesto, equipamiento, kilometraje, historial y coste final en España.",
    cta: "Solicitar búsqueda personalizada",
    href: searchUrl,
    icon: Search,
  },
];

const processSteps = [
  {
    title: "Definimos el coche objetivo",
    text: "Concretamos marca, modelo, presupuesto, kilometraje, año, equipamiento, uso previsto y margen real de compra.",
  },
  {
    title: "Buscamos unidades viables en Alemania",
    text: "Filtramos anuncios por historial, vendedor, configuración, precio y viabilidad de importación a España.",
  },
  {
    title: "Revisamos vendedor, historial y documentación",
    text: "Comprobamos coherencia del anuncio, kilometraje, mantenimiento, titularidad, documentación alemana y señales de riesgo.",
  },
  {
    title: "Calculamos el coste total antes de comprar",
    text: "Estimamos transporte, ITV, tasas, gestoría, placas, CO₂ e impuesto para saber si la unidad sigue compensando.",
    link: {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular impuesto de matriculación",
    },
  },
  {
    title: "Coordinamos compra, transporte e ITV",
    text: "Acompañamos la compra y organizamos la logística hasta España con la documentación preparada para ITV.",
  },
  {
    title: "Matriculación y entrega en España",
    text: "Cerramos los trámites de matriculación y entrega para que el coche quede listo para circular.",
  },
];

const costItems = [
  "Precio de compra en Alemania",
  "Transporte Alemania-España",
  "ITV de importación",
  "Impuesto de matriculación",
  "Tasas, placas y trámites DGT",
  "Gestión y revisión previa",
];

const documents = [
  "Zulassungsbescheinigung Teil I",
  "Zulassungsbescheinigung Teil II",
  "COC",
  "Factura o contrato de compraventa",
  "Historial de mantenimiento",
  "Dato oficial de CO₂",
];

const risks = [
  "Kilometraje incoherente o difícil de verificar.",
  "Historial de mantenimiento incompleto.",
  "Daños previos no declarados.",
  "Documentación alemana incompleta o incorrecta.",
  "COC ausente o datos técnicos que no cuadran.",
  "Cálculo incorrecto del impuesto de matriculación.",
  "Emisiones de CO₂ no revisadas antes de reservar el coche.",
  "Vendedor poco transparente o sin garantías suficientes.",
  "Coches aparentemente baratos que dejan de compensar al traerlos a España.",
  "Diferencias entre precio anunciado y coste real matriculado en España.",
];

const sellerTypes = [
  {
    title: "Concesionario oficial",
    text: "Suele ofrecer mayor trazabilidad, documentación más ordenada y mejor respaldo de garantía, aunque no elimina la necesidad de revisar la unidad.",
  },
  {
    title: "Compraventa profesional",
    text: "Puede ser una buena vía si el vendedor es solvente, transparente y aporta historial, factura, garantía y datos técnicos completos.",
  },
  {
    title: "Particular",
    text: "Exige más cautela: cambian la garantía, la seguridad jurídica, la documentación disponible y la capacidad de reclamar si aparece un problema.",
  },
];

const brands = [
  "Importar Audi de Alemania",
  "Importar BMW de Alemania",
  "Importar Mercedes-Benz de Alemania",
  "Importar Porsche de Alemania",
  "Importar Volkswagen de Alemania",
];

const criteria = [
  "Descartamos unidades con historial poco claro.",
  "Revisamos documentación antes de pagar una señal.",
  "Calculamos costes reales antes de comprar.",
  "Priorizamos coches con mantenimiento verificable.",
  "Analizamos CO₂, COC, ITV e impuesto de matriculación.",
  "Revisamos si el vendedor ofrece garantías suficientes.",
  "Comparamos el precio alemán con el coste final matriculado en España.",
  "Buscamos unidades que tengan sentido para el cliente, no solo anuncios atractivos.",
];

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
  <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl mb-10 sm:mb-12`}>
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

const WhatsAppCta = ({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      variant === "primary"
        ? "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
        : "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
    }
  >
    {children}
  </a>
);

const InternalCta = ({
  to,
  children,
  variant = "secondary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => (
  <Link
    to={to}
    className={
      variant === "primary"
        ? "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
        : "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
    }
  >
    {children}
  </Link>
);

export const ImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importar coche de Alemania a España 2026 | Coste, ITV y Matriculación"
        description="Servicio para importar coches premium desde Alemania a España. Revisamos anuncio, historial, CO₂, COC, costes, transporte, ITV e impuesto de matriculación antes de comprar."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
        image="https://www.premiumgermancars.com/bmwconcesionario-1280.webp"
        jsonLd={importacionJsonLd}
      />

      <Navbar />

      <main className="bg-black text-white">
        <section className="relative min-h-[86vh] overflow-hidden pt-28 sm:pt-32 md:pt-36">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bmwconcesionario-1280.webp')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />

          <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl pb-20 sm:pb-24 md:pb-28">
            <div className="max-w-4xl">
              <span className="text-gold-400 text-xs font-bold tracking-[0.32em] uppercase mb-6 block">
                Servicio de importación premium
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 sm:mb-8">
                Importar coche de Alemania a España con revisión, transporte,
                ITV y matriculación
              </h1>
              <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">
                Ayudamos a compradores de España a encontrar, revisar y matricular
                coches premium procedentes de Alemania evitando errores de
                documentación, CO₂, impuesto de matriculación y coste final.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppCta href={reviewUrl}>
                  Revisar una unidad antes de comprar <Search size={16} />
                </WhatsAppCta>
                <InternalCta to="/calculadora-impuesto-matriculacion">
                  Calcular impuesto de matriculación <Calculator size={16} />
                </InternalCta>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {leadCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="border border-white/10 bg-white/[0.04] p-6 sm:p-8"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-gold-400 text-black">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-4">
                    {card.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{card.text}</p>
                  <WhatsAppCta href={card.href} variant="secondary">
                    {card.cta} <ArrowRight size={16} />
                  </WhatsAppCta>
                </article>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl pb-16 sm:pb-20 md:pb-24">
          <SectionHeader title="Importación de coches premium desde Alemania, sin improvisar">
            <p>
              Comprar un coche en Alemania puede ser una gran oportunidad, pero
              solo si la operación está bien calculada. El precio anunciado no es
              el coste real. Hay que comprobar documentación, emisiones,
              fiscalidad, transporte, ITV, garantía, vendedor y matriculación en
              España.
            </p>
            <p>
              Nuestro trabajo empieza antes de pagar una señal. Revisamos la
              unidad, detectamos riesgos y calculamos el coste total para que
              sepas si el coche sigue siendo interesante cuando ya está
              matriculado en España.
            </p>
          </SectionHeader>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader
              eyebrow="Proceso"
              title="Cómo funciona nuestro servicio de importación desde Alemania"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {processSteps.map((step, index) => (
                <article key={step.title} className="border border-white/10 bg-black/35 p-6">
                  <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">
                    Paso {index + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-gray-300 leading-relaxed">{step.text}</p>
                  {step.link ? (
                    <Link
                      to={step.link.href}
                      className="mt-4 inline-flex text-gold-400 underline underline-offset-4 transition-colors hover:text-white"
                    >
                      {step.link.label}
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="Cuánto cuesta importar un coche de Alemania a España">
            <p>
              El coste final depende del precio de compra, transporte, ITV, tasas,
              gestoría, emisiones de CO₂, antigüedad, comunidad autónoma e
              impuesto de matriculación. Por eso no basta con comparar el precio
              alemán con el precio español.
            </p>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {costItems.map((item) => (
              <div key={item} className="flex gap-3 border border-white/10 bg-white/[0.03] p-5">
                <Calculator className="mt-0.5 shrink-0 text-gold-400" size={18} />
                <h3 className="font-semibold text-white">{item}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <InternalCta to="/calculadora-impuesto-matriculacion" variant="primary">
              Calcular impuesto de matriculación <Calculator size={16} />
            </InternalCta>
            <InternalCta to="/blog/cuanto-cuesta-importar-coche-alemania-2026">
              Ver desglose de costes <ArrowRight size={16} />
            </InternalCta>
          </div>
        </section>

        <section className="bg-metallic-950 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader title="Documentos que revisamos antes de importar un coche">
              <p>
                Muchos problemas aparecen cuando el coche ya está pagado. Por eso
                revisamos la documentación antes de avanzar, especialmente si la
                unidad viene de Alemania y necesita ITV de importación y
                matriculación española.
              </p>
            </SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((document) => (
                <article key={document} className="border border-white/10 bg-black/35 p-5">
                  <FileText className="mb-4 text-gold-400" size={22} />
                  <h3 className="font-semibold text-white">{document}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="Riesgos de comprar un coche en Alemania sin asesoramiento" />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {risks.map((risk) => (
              <li key={risk} className="flex gap-3 border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                <span className="text-gray-300">{risk}</span>
              </li>
            ))}
          </ul>
          <div className="border border-gold-400/25 bg-gold-400/5 p-6 sm:p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              ¿Has visto un coche en Mobile.de o AutoScout24?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Revisamos si merece la pena antes de que pagues una señal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppCta href={reviewUrl}>
                Revisar una unidad <Search size={16} />
              </WhatsAppCta>
              <InternalCta to="/blog/5-riesgos-importar-coche-alemania">
                Ver riesgos habituales <ArrowRight size={16} />
              </InternalCta>
            </div>
          </div>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader title="Concesionario oficial, compraventa o particular: no todos tienen el mismo riesgo">
              <p>
                Cambia la garantía, la trazabilidad, la documentación y la
                seguridad de la operación. Por eso valoramos el tipo de vendedor
                antes de recomendar una unidad.
              </p>
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sellerTypes.map((seller) => (
                <article key={seller.title} className="border border-white/10 bg-black/35 p-6">
                  <ShieldCheck className="mb-4 text-gold-400" size={24} />
                  <h3 className="text-xl font-bold text-white mb-3">{seller.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{seller.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="Qué coches premium merece la pena importar desde Alemania" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {brands.map((brand) => (
              <article key={brand} className="border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-white">{brand}</h3>
              </article>
            ))}
          </div>
          <p className="mt-8 text-gray-300 leading-relaxed">
            Para comparar marcas, versiones y oportunidades reales, revisa nuestra
            guía de{" "}
            <Link
              to="/blog/mejores-modelos-importar-alemania-2026"
              className="text-gold-400 underline underline-offset-4 transition-colors hover:text-white"
            >
              mejores modelos para importar desde Alemania
            </Link>
            .
          </p>
        </section>

        <section className="bg-metallic-950 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader title="Nuestro criterio antes de recomendar una unidad" />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {criteria.map((item) => (
                <li key={item} className="flex gap-3 border border-white/10 bg-black/35 p-4">
                  <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-16 sm:py-20 md:py-24">
          <SectionHeader title="Importación de coches desde Alemania en Cambrils, Tarragona y Cataluña">
            <p>
              Premium German Cars está en Cambrils, Tarragona, y trabaja con
              clientes de Cataluña y de toda España que quieren importar un coche
              premium desde Alemania con una gestión profesional, transparente y
              calculada antes de comprar.
            </p>
            <p>
              Atendemos operaciones desde Cambrils, Tarragona, Reus, Salou,
              Barcelona, Girona, Lleida y resto de España.
            </p>
          </SectionHeader>
        </section>

        <section className="bg-metallic-900 py-16 sm:py-20 md:py-24" id="faq">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <SectionHeader
              title="Preguntas frecuentes sobre importar coches de Alemania"
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {faqs.map((faq) => (
                <article key={faq.question} className="border border-white/10 bg-black/35 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-16 sm:py-20 md:py-24 text-center">
          <span className="text-gold-400 text-xs font-bold tracking-[0.28em] uppercase mb-4 block">
            Decisión previa a la compra
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
            Antes de importar un coche de Alemania, revisa si realmente compensa
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            Cuéntanos qué coche estás buscando o envíanos la unidad que ya has
            encontrado. Revisamos precio, vendedor, historial, documentación,
            CO₂, COC, transporte, ITV, impuesto y coste final antes de que tomes
            una decisión.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <WhatsAppCta href={reviewUrl}>
              Revisar una unidad que he encontrado <Search size={16} />
            </WhatsAppCta>
            <WhatsAppCta href={searchUrl} variant="secondary">
              Solicitar búsqueda personalizada <ArrowRight size={16} />
            </WhatsAppCta>
          </div>
          <Link
            to="/calculadora-impuesto-matriculacion"
            className="text-gold-400 underline underline-offset-4 transition-colors hover:text-white"
          >
            calculadora de impuesto de matriculación
          </Link>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
