import type React from "react";
import { homeFaqs } from "../data/homeSeo";

const whatsappReviewUrl =
  "https://wa.me/34603743608?text=Hola!%20He%20visto%20una%20unidad%20en%20Alemania%20y%20me%20gustaria%20que%20la%20revisarais.";

const brands = [
  {
    title: "BMW de Alemania",
    text: "Serie 1, Serie 3, Serie 4, Serie 5, X1, X3, X5, M Performance y versiones de reestreno con buen historial de mantenimiento.",
  },
  {
    title: "Audi de Alemania",
    text: "A3, A4, A5, A6, Q3, Q5, Q7, S line, TFSI, TDI, hibridos enchufables y unidades con alto nivel de equipamiento.",
  },
  {
    title: "Mercedes-Benz de Alemania",
    text: "Clase A, CLA, Clase C, Clase E, GLC, GLE, AMG Line y unidades procedentes de concesionario o renting premium.",
  },
  {
    title: "Porsche de Alemania",
    text: "Macan, Cayenne, Panamera, 911 y unidades especiales donde trazabilidad, historial y configuracion son especialmente importantes.",
  },
  {
    title: "Volkswagen premium y de reestreno",
    text: "Golf GTI, Golf GTD, Golf R, Tiguan, Touareg, Arteon y seminuevos con buena relacion entre precio, equipamiento y kilometraje.",
  },
];

const processSteps = [
  ["1. Definimos el coche que realmente te interesa", "Concretamos marca, modelo, presupuesto, ano minimo, kilometraje maximo, combustible, cambio, extras imprescindibles y uso previsto."],
  ["2. Buscamos unidades en el mercado aleman", "Localizamos coches priorizando vendedores fiables, historial documentado, coherencia de precio y documentacion completa."],
  ["3. Verificamos documentacion, historial y fiscalidad", "Revisamos factura, IVA/MwSt., documentacion alemana, kilometraje, mantenimiento, CO2, COC, posibles danos y coste estimado de matriculacion."],
  ["4. Coordinamos compra, transporte y entrega", "Una vez validada la unidad, gestionamos la operacion, el transporte profesional hasta Espana y los tramites necesarios."],
  ["5. ITV, matriculacion y entrega final", "Gestionamos ITV, impuestos, tasas, matriculacion y entrega final con una vision clara del coste real."],
];

const importCosts = [
  "Precio de compra del vehiculo.",
  "Transporte desde Alemania hasta Espana.",
  "ITV de importacion o ficha tecnica espanola.",
  "Impuesto de matriculacion, segun emisiones y caso concreto.",
  "Impuesto de circulacion municipal.",
  "Tasas administrativas y matriculacion.",
  "Placas, seguro y posibles gestiones adicionales.",
  "Servicio profesional de busqueda, verificacion y gestion.",
];

const risks = [
  ["Kilometraje o historial poco claro", "Un kilometraje razonable debe estar respaldado por mantenimientos, facturas, revisiones, inspecciones y coherencia general."],
  ["Factura incorrecta o dudas con el IVA", "Hay diferencias entre comprar a particular, concesionario, empresa, vehiculo con IVA deducible o regimen de margen."],
  ["CO2 mal interpretado", "Una unidad puede parecer barata hasta que se calcula correctamente el impuesto de matriculacion."],
  ["Falta de COC o documentacion tecnica", "Si falta el COC o hay problemas de homologacion, matricular en Espana puede complicarse."],
  ["Danos, reparaciones o procedencia dudosa", "Revisamos procedencia, historial, mantenimientos, posibles danos, vendedor y coherencia del precio."],
];

const reasons = [
  ["Especialistas en coches premium alemanes", "Conocemos el mercado aleman y los puntos criticos de BMW, Audi, Mercedes-Benz, Porsche y Volkswagen."],
  ["Busqueda personalizada, no catalogo generico", "Buscamos segun presupuesto, modelo, motor, kilometraje, color, equipamiento y objetivo de compra."],
  ["Gestion integral hasta la entrega", "Te acompanamos desde la busqueda inicial hasta la entrega final en Espana."],
  ["Vision clara del coste real", "Analizamos costes que pueden afectar a la operacion antes de recomendar avanzar."],
  ["Servicio desde Cambrils, Tarragona y toda Espana", "Trabajamos para clientes de Cambrils, Tarragona, Cataluna y el resto de Espana."],
];

const reviewPoints = [
  "Precio frente al mercado.",
  "Kilometraje e historial.",
  "Mantenimiento documentado.",
  "Tipo de vendedor.",
  "Factura e IVA/MwSt.",
  "Emisiones de CO2.",
  "Coste estimado de matriculacion.",
  "Riesgos de documentacion.",
  "Viabilidad de transporte y matriculacion en Espana.",
];

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
    {eyebrow && (
      <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
      {title}
    </h2>
    {children && <div className="mt-6 text-gray-300 leading-relaxed space-y-4">{children}</div>}
  </div>
);

export const HomeLandingSeo = () => {
  return (
    <>
      <section className="py-16 sm:py-20 md:py-28 bg-metallic-950 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Importar un coche de Alemania con seguridad, no solo encontrar un buen precio">
            <p>
              Comprar un coche en Alemania puede ser una gran oportunidad, pero
              no deberia basarse solo en comparar precios en Mobile.de o
              AutoScout24. En una importacion intervienen CO2, impuesto de
              matriculacion, IVA o MwSt., documentacion alemana, COC, ITV,
              transporte y estado real del vehiculo.
            </p>
            <p>
              En Premium German Cars analizamos cada operacion antes de avanzar.
              El objetivo no es importar cualquier unidad, sino encontrar un
              coche que tenga sentido por precio, estado, fiscalidad,
              equipamiento y seguridad documental.
            </p>
          </SectionHeader>
          <a href={whatsappReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center border border-gold-400/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-gold-400 transition hover:bg-gold-400 hover:text-black">
            Revisar una unidad de Mobile.de
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Que tipo de coches importamos desde Alemania">
            <p>
              Trabajamos principalmente con vehiculos premium, seminuevos, de
              reestreno y unidades con configuraciones dificiles de encontrar en Espana.
            </p>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {brands.map((brand) => (
              <article key={brand.title} className="border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-bold text-white mb-4">{brand.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{brand.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-metallic-950">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Proceso llave en mano" title="Nuestro proceso de importacion llave en mano" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {processSteps.map(([title, text]) => (
              <article key={title} className="border border-white/10 bg-black/30 p-6">
                <h3 className="text-base font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader title="Cuanto cuesta importar un coche de Alemania a Espana">
              <p>
                El coste final depende de varios factores. Antes de reservar una
                unidad conviene calcular el coste completo y no quedarse solo
                con el precio anunciado.
              </p>
            </SectionHeader>
            <h3 className="text-xl font-bold text-white mb-4">Costes habituales en una importacion</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {importCosts.map((item) => (
                <li key={item} className="border-l border-gold-400/40 pl-4">{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-gold-400/20 bg-gold-400/5 p-6 sm:p-8 self-start">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">El CO2 puede cambiar la operacion</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              En SUVs, deportivos, motores gasolina potentes, V6, V8 o versiones
              AMG, M, S o RS, el impuesto de matriculacion puede tener impacto
              importante. Por eso revisamos emisiones y documentacion antes de
              recomendar la compra.
            </p>
            <a href="/calculadora-impuesto-matriculacion" className="text-gold-400 underline underline-offset-4 hover:text-white">
              calcular el impuesto de matriculacion
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-metallic-950">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Riesgos que evitamos al importar coches de Alemania">
            <p>
              Importar por cuenta propia puede salir bien, pero tambien puede
              generar problemas si no se revisan los detalles adecuados antes de pagar.
            </p>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {risks.map(([title, text]) => (
              <article key={title} className="border border-white/10 p-6">
                <h3 className="text-base font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
          <a href="/blog/5-riesgos-importar-coche-alemania" className="text-gold-400 underline underline-offset-4 hover:text-white">
            riesgos de importar un coche de Alemania
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Por que elegir Premium German Cars" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-10">
            {reasons.map(([title, text]) => (
              <article key={title} className="border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-base font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
          <p className="text-gray-300 max-w-3xl mb-6">
            Conoce nuestro{" "}
            <a href="/importacion-coches-alemania" className="text-gold-400 underline underline-offset-4 hover:text-white">
              servicio de importacion de coches desde Alemania en Cambrils
            </a>{" "}
            o solicita una busqueda personalizada y analizamos que unidades encajan con tu presupuesto.
          </p>
          <a href="#import" className="inline-flex min-h-[48px] items-center justify-center bg-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-white">
            Solicitar busqueda personalizada
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-metallic-950">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader title="Merece la pena importar un coche premium de Alemania?">
              <p>
                Depende del modelo, ano, kilometraje, equipamiento, estado y
                coste de matriculacion. Alemania ofrece variedad y buenas
                configuraciones, pero no siempre compensa.
              </p>
            </SectionHeader>
            <p className="text-gray-300 mb-6">
              Suele tener sentido cuando buscas una configuracion concreta, un
              coche de reestreno bien equipado, historial oficial o una unidad
              dificil de encontrar en Espana.
            </p>
            <a href="/blog/como-importar-coche-alemania" className="text-gold-400 underline underline-offset-4 hover:text-white">
              guia para importar un coche de Alemania
            </a>
          </div>
          <div className="border border-white/10 p-6 sm:p-8 bg-black/30">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Revisa una unidad antes de comprarla en Alemania</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Si ya has encontrado un coche en Mobile.de, AutoScout24 o en la
              web de un concesionario aleman, podemos ayudarte a revisarlo antes de decidir.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400 mb-6">
              {reviewPoints.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href={whatsappReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center border border-gold-400/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-gold-400 transition hover:bg-gold-400 hover:text-black">
              Enviar una unidad para revisar
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Ejemplos de coches importados o disponibles">
            <p>
              Una forma practica de valorar una importacion es analizar unidades
              concretas: precio, kilometraje, equipamiento, emisiones,
              documentacion y coste final en Espana.
            </p>
            <p>
              Revisa nuestros{" "}
              <a href="/car/bmw-serie-1-116i" className="text-gold-400 underline underline-offset-4 hover:text-white">
                coches disponibles o unidades importadas
              </a>{" "}
              o solicita una busqueda por marca, modelo, presupuesto y equipamiento.
            </p>
          </SectionHeader>
          <a href="#stock" className="inline-flex min-h-[48px] items-center justify-center border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black">
            Ver coches disponibles
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-metallic-950">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Preguntas frecuentes sobre importar coches de Alemania" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeFaqs.map(([question, answer]) => (
              <article key={question} className="border border-white/10 bg-black/30 p-6">
                <h3 className="font-bold text-white mb-3">{question}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{answer}</p>
              </article>
            ))}
          </div>
          <p className="text-gray-300 mt-8">
            Tambien puedes consultar nuestras{" "}
            <a href="/preguntas-frecuentes" className="text-gold-400 underline underline-offset-4 hover:text-white">
              preguntas frecuentes sobre importar coche de Alemania
            </a>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-gold-400 text-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
              Solicita tu busqueda personalizada
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Cuentanos que coche estas buscando y analizamos el mercado aleman
              por ti: modelos, presupuesto, disponibilidad, costes de importacion
              y viabilidad de matriculacion en Espana.
            </p>
            <a href="#import" className="inline-flex min-h-[48px] items-center justify-center bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black">
              Solicitar busqueda personalizada
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
