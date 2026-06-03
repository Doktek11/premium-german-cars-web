import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, CheckCircle2, Search } from "lucide-react";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SEO } from "../components/SEO";
import { WhatsAppButton } from "../components/WhatsAppButton";

const contactUrl =
  "https://wa.me/34603743608?text=Hola,%20quiero%20solicitar%20una%20b%C3%BAsqueda%20personalizada%20de%20coche%20en%20Alemania.";

const reviewUrl =
  "https://wa.me/34603743608?text=Hola,%20he%20visto%20un%20coche%20en%20Alemania%20y%20quiero%20saber%20si%20merece%20la%20pena%20antes%20de%20pagar%20una%20se%C3%B1al.";

const processSteps = [
  {
    title: "Definimos el coche objetivo",
    text: "Antes de buscar, concretamos marca, modelo, presupuesto, kilometraje, año, equipamiento, tipo de uso y preferencias del cliente. No es lo mismo importar un BMW Serie 3 Touring familiar que un Porsche Macan, un Audi Q5 o un Mercedes-Benz Clase E.",
  },
  {
    title: "Buscamos unidades viables en Alemania",
    text: "Filtramos unidades en el mercado alemán priorizando historial, vendedor, configuración, precio realista y viabilidad de importación. No recomendamos una unidad únicamente porque sea barata.",
  },
  {
    title: "Revisamos historial, documentación y vendedor",
    text: "Analizamos la información disponible antes de avanzar: kilometraje, mantenimiento, documentación alemana, coherencia del anuncio, tipo de vendedor y posibles señales de riesgo.",
  },
  {
    title: "Calculamos costes antes de comprar",
    text: "Estimamos los costes asociados a la importación: transporte, ITV, tasas, gestoría, impuesto de matriculación si aplica y otros gastos necesarios para matricular el coche en España.",
    link: {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular impuesto de matriculación de un coche importado",
    },
  },
  {
    title: "Gestionamos compra, transporte e ITV",
    text: "Coordinamos el proceso de compra, la logística de transporte hasta España y los trámites necesarios para que el vehículo pueda pasar por ITV y continuar con la matriculación.",
  },
  {
    title: "Matriculamos y entregamos el coche en España",
    text: "El objetivo es que el cliente reciba el coche listo para circular, con el proceso gestionado de principio a fin y con una explicación clara de cada fase.",
  },
];

const risks = [
  "Kilometraje incoherente o difícil de verificar.",
  "Historial de mantenimiento incompleto.",
  "Daños previos no declarados.",
  "Documentación alemana incompleta.",
  "Cálculo incorrecto del impuesto de matriculación.",
  "Emisiones de CO2 no revisadas antes de comprar.",
  "Coches aparentemente baratos que dejan de ser rentables al traerlos a España.",
];

const brands = [
  {
    title: "Importar Audi de Alemania",
    text: "Modelos como Audi A3, A5 Sportback, Q5, A6 Avant o versiones S y RS pueden ser interesantes cuando existe historial claro, buen equipamiento y una diferencia real frente al mercado español.",
  },
  {
    title: "Importar BMW de Alemania",
    text: "BMW Serie 3, Serie 5, X3, X5 o versiones M Performance suelen tener demanda entre compradores que buscan configuración, motorización y equipamiento concreto.",
  },
  {
    title: "Importar Mercedes-Benz de Alemania",
    text: "Mercedes Clase C, Clase E, GLC, GLE o versiones AMG requieren especial atención al historial, mantenimiento, emisiones y estado general de la unidad.",
  },
  {
    title: "Importar Porsche de Alemania",
    text: "En modelos como Porsche Macan, Cayenne, Panamera o 911, la documentación, el mantenimiento y la trazabilidad son especialmente importantes antes de recomendar una compra.",
  },
  {
    title: "Importar Volkswagen de Alemania",
    text: "Volkswagen Golf GTI o R, Tiguan, Touareg y Arteon pueden ser opciones interesantes si la unidad está bien configurada y el coste total de importación encaja.",
  },
];

const criteria = [
  "Descartamos unidades con historial poco claro.",
  "Revisamos documentación antes de avanzar.",
  "Calculamos costes reales antes de comprar.",
  "Priorizamos coches con mantenimiento verificable.",
  "Explicamos los riesgos antes de tomar una decisión.",
  "Buscamos unidades que tengan sentido para el cliente, no solo anuncios atractivos.",
];

const faqs = [
  {
    question: "¿Cuánto cuesta importar un coche de Alemania a España?",
    answer:
      "Depende del precio del vehículo, transporte, ITV, tasas, gestoría, emisiones de CO2, antigüedad y posible impuesto de matriculación. Por eso conviene calcular el coste total antes de reservar una unidad.",
  },
  {
    question: "¿Qué impuestos se pagan al matricular un coche alemán en España?",
    answer:
      "Puede aplicarse impuesto de matriculación según emisiones de CO2, además de tasas y otros costes administrativos. Cada caso debe revisarse con datos actualizados del vehículo.",
  },
  {
    question: "¿Merece la pena importar un BMW, Audi o Mercedes desde Alemania?",
    answer:
      "Puede merecer la pena si la unidad tiene buen historial, equipamiento interesante, precio coherente y costes de importación controlados. No todos los coches alemanes son una buena compra.",
  },
  {
    question: "¿Podéis revisar un coche que he encontrado en Mobile.de?",
    answer:
      "Sí. Podemos ayudarte a valorar una unidad concreta antes de pagar una señal, revisando anuncio, vendedor, documentación disponible, precio, kilometraje y viabilidad de importación.",
  },
  {
    question: "¿Cuánto tarda importar y matricular un coche de Alemania?",
    answer:
      "El plazo depende de la unidad, la documentación, el transporte, la ITV y la matriculación. Es mejor valorar cada operación individualmente para evitar expectativas poco realistas.",
  },
  {
    question: "¿Qué documentación necesita un coche alemán para matricularse en España?",
    answer:
      "Se necesita documentación alemana correcta, factura o contrato, datos técnicos y documentación necesaria para ITV y matriculación. Antes de comprar, conviene verificar que todo esté disponible.",
  },
];

const landingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.premiumgermancars.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Importar coche de Alemania a España",
          item: "https://www.premiumgermancars.com/importacion-coches-alemania",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Importar coche de Alemania a España",
      description:
        "Servicio de búsqueda, verificación, compra, transporte, ITV y matriculación de coches premium importados desde Alemania a España.",
      serviceType: "Importación de coches premium desde Alemania",
      areaServed: ["España", "Cambrils", "Tarragona", "Cataluña"],
      provider: {
        "@type": "AutoDealer",
        name: "Premium German Cars",
        url: "https://www.premiumgermancars.com/",
        logo: "https://www.premiumgermancars.com/logoPGC.svg",
        address: {
          "@type": "PostalAddress",
          addressCountry: "ES",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

const SectionHeader = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="max-w-3xl mb-10 sm:mb-12">
    {eyebrow ? (
      <span className="text-gold-400 text-xs font-bold tracking-[0.28em] uppercase mb-4 block">
        {eyebrow}
      </span>
    ) : null}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
      {title}
    </h2>
    {children ? (
      <div className="mt-6 space-y-4 text-gray-300 text-lg leading-relaxed">
        {children}
      </div>
    ) : null}
  </div>
);

const ContactButton = ({
  href = contactUrl,
  children,
  variant = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      variant === "primary"
        ? "inline-flex items-center justify-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
        : "inline-flex items-center justify-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
    }
  >
    {children}
  </a>
);

export const ImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importar coche de Alemania a España | Premium German Cars"
        description="Importa tu coche premium desde Alemania con búsqueda, verificación, transporte, ITV y matriculación. Servicio en España desde Cambrils."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
        jsonLd={landingJsonLd}
      />

      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <section className="container mx-auto px-4 sm:px-6 max-w-5xl text-center mb-16 sm:mb-20 md:mb-24">
          <span className="text-gold-400 text-xs font-bold tracking-[0.32em] uppercase mb-6 block">
            Servicio de importación premium
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
            Importar coche de Alemania a España con gestión integral
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed mb-6">
            Especialistas en coches premium de importación desde Alemania para clientes en Cambrils, Tarragona, Cataluña y toda España.
          </p>
          <div className="max-w-4xl mx-auto space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>
              Importamos coches premium desde Alemania para clientes que buscan una unidad concreta, bien verificada y con todos los trámites gestionados: búsqueda, revisión documental, compra, transporte, ITV, impuestos y matriculación en España.
            </p>
            <p>
              Trabajamos con marcas como Audi, BMW, Mercedes-Benz, Porsche y Volkswagen, priorizando unidades con historial claro, configuración interesante y sentido económico real.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ContactButton>
              Solicitar búsqueda personalizada <Search size={16} />
            </ContactButton>
            <Link
              to="/calculadora-impuesto-matriculacion"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
            >
              Calcular impuesto de matriculación <Calculator size={16} />
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <SectionHeader title="Importación de coches premium desde Alemania, sin improvisar">
            <p>
              En Premium German Cars no buscamos coches al azar ni perseguimos supuestas gangas. Analizamos cada unidad con criterio comercial, técnico y documental para saber si realmente merece la pena traerla a España.
            </p>
            <p>
              Nuestro trabajo empieza antes de comprar: revisamos el vendedor, el historial disponible, la configuración, el kilometraje, las emisiones, la documentación y los costes estimados de matriculación. Solo avanzamos cuando la operación tiene sentido para el cliente.
            </p>
          </SectionHeader>
        </section>

        <section className="bg-metallic-900 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <SectionHeader
              eyebrow="Proceso"
              title="Cómo funciona nuestro servicio de importación desde Alemania"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {processSteps.map((step) => (
                <article key={step.title} className="border border-white/10 bg-black/30 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.text}</p>
                  {step.link ? (
                    <Link
                      to={step.link.href}
                      className="inline-flex mt-4 text-gold-400 underline underline-offset-4 hover:text-white"
                    >
                      {step.link.label}
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
            <div className="mt-10">
              <ContactButton>
                Solicitar búsqueda personalizada <ArrowRight size={16} />
              </ContactButton>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <SectionHeader title="Cuánto cuesta importar un coche de Alemania">
            <p>
              El coste de importar un coche desde Alemania depende de varios factores: precio de compra, transporte, ITV, tasas, gestoría, emisiones de CO2, antigüedad, comunidad autónoma y posible impuesto de matriculación.
            </p>
            <p>
              Por eso, antes de reservar una unidad, es importante estimar el coste total de la operación. Un coche que parece interesante en Alemania puede dejar de serlo si las emisiones, el transporte o la matriculación encarecen demasiado el proceso.
            </p>
            <p>
              También puedes revisar nuestro desglose sobre{" "}
              <Link
                to="/blog/cuanto-cuesta-importar-coche-alemania-2026"
                className="text-gold-400 underline underline-offset-4 hover:text-white"
              >
                cuánto cuesta importar un coche de Alemania
              </Link>
              .
            </p>
          </SectionHeader>
          <Link
            to="/calculadora-impuesto-matriculacion"
            className="inline-flex items-center justify-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
          >
            Calcular impuesto de matriculación <Calculator size={16} />
          </Link>
        </section>

        <section className="bg-metallic-950 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <SectionHeader title="Riesgos de comprar un coche en Alemania sin asesoramiento">
              <p>
                Comprar un coche en Alemania puede ser una buena decisión, pero también implica riesgos si no se revisa correctamente la operación. Los errores más habituales suelen aparecer antes de pagar la señal: unidades con historial incompleto, kilometraje poco coherente, documentación insuficiente, costes mal calculados o vendedores que no ofrecen garantías suficientes.
              </p>
            </SectionHeader>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {risks.map((risk) => (
                <li key={risk} className="flex gap-3 border border-white/10 bg-black/30 p-4">
                  <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-300">{risk}</span>
                </li>
              ))}
            </ul>
            <div className="border border-gold-400/25 bg-gold-400/5 p-6 sm:p-8">
              <p className="text-xl font-serif text-white mb-5">
                ¿Has visto un coche en Mobile.de? Revisamos si merece la pena antes de que pagues una señal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ContactButton href={reviewUrl}>
                  Revisar una unidad <Search size={16} />
                </ContactButton>
                <Link
                  to="/blog/5-riesgos-importar-coche-alemania"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
                >
                  Riesgos de importar un coche de Alemania
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-5xl mb-16 sm:mb-20 md:mb-24">
          <SectionHeader title="Qué coches premium merece la pena importar desde Alemania" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {brands.map((brand) => (
              <article key={brand.title} className="border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-bold text-white mb-3">{brand.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{brand.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-gray-300">
            Para comparar opciones con criterio, revisa también nuestra guía de{" "}
            <Link
              to="/blog/mejores-modelos-importar-alemania-2026"
              className="text-gold-400 underline underline-offset-4 hover:text-white"
            >
              mejores coches para importar de Alemania
            </Link>
            .
          </p>
        </section>

        <section className="bg-metallic-900 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <SectionHeader title="Nuestro criterio antes de recomendar una unidad">
              <p>
                No recomendamos coches solo por precio. Nuestro criterio se basa en revisar la operación completa: estado, historial, vendedor, configuración, documentación, emisiones, costes y viabilidad de matriculación en España.
              </p>
            </SectionHeader>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {criteria.map((item) => (
                <li key={item} className="flex gap-3 border border-white/10 bg-black/30 p-4">
                  <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <SectionHeader title="Importación de coches desde Alemania en Cambrils, Tarragona y Cataluña">
            <p>
              Premium German Cars está en Cambrils, Tarragona, y trabaja con clientes de Cataluña y de toda España que quieren importar un coche premium desde Alemania con una gestión profesional y transparente.
            </p>
            <p>
              Si estás en Cambrils, Tarragona, Reus, Salou, Barcelona, Girona, Lleida o cualquier otra zona de España, podemos ayudarte a valorar si una unidad alemana merece la pena antes de iniciar el proceso.
            </p>
          </SectionHeader>
        </section>

        <section className="bg-metallic-950 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <SectionHeader title="Preguntas frecuentes sobre importar coches de Alemania" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {faqs.map((faq) => (
                <article key={faq.question} className="border border-white/10 bg-black/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <span className="text-gold-400 text-xs font-bold tracking-[0.28em] uppercase mb-4 block">
            Búsqueda personalizada
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
            Hablar con Premium German Cars
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Cuéntanos qué coche estás buscando o envíanos la unidad que ya has encontrado. Revisamos si encaja por historial, documentación, costes y viabilidad antes de dar el siguiente paso.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ContactButton>
              Solicitar búsqueda personalizada <ArrowRight size={16} />
            </ContactButton>
            <ContactButton href={reviewUrl} variant="secondary">
              Revisar una unidad que he encontrado <Search size={16} />
            </ContactButton>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
