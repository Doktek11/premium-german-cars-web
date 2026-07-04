import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { SEO } from "../../components/SEO";
import { SeoIntentLinks, seoIntentLinks } from "../../components/SeoIntentLinks";

const articleUrl =
  "https://www.premiumgermancars.com/blog/que-motor-elegir-importar-alemania-2026";
const metaTitle =
  "Diésel o Gasolina en 2026: Impuesto, CO₂ y Qué Motor Conviene | PGC";
const metaDescription =
  "Compara diésel, gasolina, MHEV y PHEV para importar de Alemania en 2026. Descubre cómo influyen el CO₂, el uso real y el impuesto de matriculación.";
const comparisonWhatsAppUrl =
  "https://wa.me/34603743608?text=Hola,%20tengo%20un%20di%C3%A9sel%20y%20un%20gasolina%20vistos%20en%20Alemania%20y%20quiero%20comparar%20impuesto,%20CO2,%20documentaci%C3%B3n%20y%20coste%20final%20puesto%20en%20Espa%C3%B1a.";
const valuationWhatsAppUrl =
  "https://wa.me/34603743608?text=Hola,%20tengo%20un%20coche%20visto%20en%20Alemania%20y%20quiero%20saber%20si%20compensa%20importarlo.";

const quickSummary = [
  ["Diésel moderno", "Autopista, viajes largos y kilometraje anual elevado."],
  ["Gasolina", "Uso ocasional, pocos kilómetros o conducción más emocional."],
  ["MHEV", "Uso mixto cuando la unidad obtiene distintivo ECO."],
  ["Híbrido", "Ciudad y uso diario con recorridos variables."],
  ["PHEV", "Uso con posibilidad real de carga frecuente."],
];

const comparisonRows = [
  [
    "Diésel moderno",
    "Autopista y muchos kilómetros",
    "Habitualmente C en unidades recientes",
    "Variable según CO₂",
    "Buena opción para largos recorridos",
  ],
  [
    "Gasolina",
    "Uso ocasional o deportivo",
    "Habitualmente C en unidades recientes",
    "Puede subir en motores potentes",
    "Interesante si compensa el coste total",
  ],
  [
    "MHEV",
    "Uso mixto",
    "Habitualmente ECO",
    "Depende del CO₂ oficial",
    "Equilibrio entre uso, etiqueta y reventa",
  ],
  [
    "Híbrido",
    "Ciudad y uso diario",
    "Habitualmente ECO",
    "Suele ser contenido, pero hay que calcular",
    "Buena opción para uso urbano",
  ],
  [
    "PHEV",
    "Ciudad y carga frecuente",
    "ECO o 0 según autonomía registrada",
    "Depende de emisiones y documentación",
    "Interesa si se carga con regularidad",
  ],
];

const faqItems = [
  {
    question: "¿Paga más impuesto un gasolina que un diésel?",
    answer:
      "No siempre. El impuesto de matriculación depende principalmente del CO₂ oficial y de la base imponible, no del combustible. Un gasolina potente puede pagar más que un diésel eficiente, pero una versión gasolina electrificada puede tener emisiones inferiores y quedar en otro tramo.",
  },
  {
    question: "¿Un diésel moderno suele pagar menos impuesto?",
    answer:
      "Puede ocurrir en modelos donde el diésel homologa menos CO₂ que el gasolina equivalente, pero no es una regla absoluta. Hay que revisar las emisiones y calcular cada unidad.",
  },
  {
    question: "¿Qué motor conviene más para importar de Alemania?",
    answer:
      "Depende del uso. Para muchos kilómetros y autopista puede encajar un diésel moderno. Para ciudad o uso mixto pueden interesar un híbrido, MHEV, PHEV bien utilizado o gasolina eficiente. La decisión debe incluir impuesto, historial y coste final.",
  },
  {
    question: "¿El CO₂ del anuncio sirve para calcular el impuesto?",
    answer:
      "Puede servir como orientación, pero no debería ser la única referencia. Antes de comprar conviene verificar las emisiones con documentación técnica, ficha oficial o Certificado de Conformidad.",
  },
  {
    question: "¿Qué pasa si el coche no acredita bien las emisiones?",
    answer:
      "Puede complicar el cálculo fiscal y la matriculación. Por eso conviene revisar la documentación y el dato homologado antes de reservar o pagar el coche.",
  },
  {
    question: "¿Merece la pena importar un gasolina aunque pague más impuesto?",
    answer:
      "Puede merecer la pena si el precio en Alemania, el estado, el historial, el kilometraje, el equipamiento o la demanda futura compensan la diferencia fiscal.",
  },
  {
    question: "¿Qué es mejor para ciudad, diésel o gasolina?",
    answer:
      "Para ciudad pura normalmente conviene valorar antes un híbrido, MHEV, PHEV con carga disponible o gasolina eficiente. Un diésel utilizado casi siempre en trayectos cortos puede no encajar por su sistema anticontaminación y patrón de uso.",
  },
  {
    question: "¿Qué es mejor para autopista?",
    answer:
      "Para muchos kilómetros por autopista, un diésel moderno sigue siendo una opción lógica por consumo y autonomía, siempre que la unidad, el historial y la documentación estén bien revisados.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.premiumgermancars.com/#organization",
      name: "Premium German Cars",
      url: "https://www.premiumgermancars.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.premiumgermancars.com/logoPGC.svg",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${articleUrl}#webpage`,
      url: articleUrl,
      name: metaTitle,
      description: metaDescription,
      inLanguage: "es-ES",
      datePublished: "2026-03-27",
      dateModified: "2026-07-04",
      breadcrumb: { "@id": `${articleUrl}#breadcrumb` },
      mainEntity: { "@id": `${articleUrl}#article` },
      hasPart: { "@id": `${articleUrl}#faq` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://www.premiumgermancars.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://www.premiumgermancars.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Diésel o gasolina en 2026",
          item: articleUrl,
        },
      ],
    },
    {
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      headline:
        "Diésel o gasolina en 2026: qué motor conviene e impuesto de matriculación",
      description: metaDescription,
      image: ["https://www.premiumgermancars.com/logoPGC.svg"],
      datePublished: "2026-03-27",
      dateModified: "2026-07-04",
      inLanguage: "es-ES",
      author: { "@id": "https://www.premiumgermancars.com/#organization" },
      publisher: { "@id": "https://www.premiumgermancars.com/#organization" },
      mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
      about: [
        { "@type": "Thing", name: "Impuesto de matriculación" },
        { "@type": "Thing", name: "Coches diésel" },
        { "@type": "Thing", name: "Coches de gasolina" },
        { "@type": "Thing", name: "Vehículos híbridos" },
        { "@type": "Thing", name: "Importación de coches desde Alemania" },
      ],
      keywords: [
        "diésel o gasolina 2026",
        "qué motor conviene",
        "impuesto de matriculación",
        "CO₂ coche importado",
        "MHEV",
        "PHEV",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-3 border border-white/10 bg-white/[0.025] p-4 text-sm leading-relaxed text-gray-300"
      >
        <CheckCircle2
          className="mt-0.5 shrink-0 text-gold-400"
          size={17}
          aria-hidden="true"
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CalculatorCta = ({ text }: { text: string }) => (
  <div className="not-prose my-10 border border-gold-400/30 bg-gold-400/[0.08] p-6 sm:p-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 max-w-xl font-serif text-lg italic leading-snug text-white">
        {text}
      </p>
      <Link
        to="/calculadora-impuesto-matriculacion"
        className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 bg-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-white"
      >
        Calcular impuesto <Calculator size={17} aria-hidden="true" />
      </Link>
    </div>
  </div>
);

export const EleccionMotor2026: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={articleUrl}
        article={true}
        image="/logoPGC.svg"
        jsonLd={articleJsonLd}
      />

      <Navbar />

      <main className="bg-black pb-12 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-20 md:pt-32">
        <header className="container mx-auto mb-12 max-w-4xl px-4 text-center sm:mb-16 sm:px-6">
          <nav
            aria-label="Migas de pan"
            className="mb-7 text-xs uppercase tracking-[0.16em] text-gray-500"
          >
            <Link to="/" className="transition-colors hover:text-gold-400">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="transition-colors hover:text-gold-400">
              Blog
            </Link>
          </nav>
          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.35em] text-gold-400">
            Guía de compra 2026
          </span>
          <h1 className="mb-6 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Diésel o gasolina en 2026: qué motor conviene e impuesto de matriculación
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Compara diésel, gasolina, MHEV, híbrido y PHEV antes de importar un coche de Alemania. El motor correcto depende del uso, el CO₂ y el coste final puesto en España.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
            <span>Premium German Cars</span>
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            <time dateTime="2026-07-04">Actualizado: 4 Jul, 2026</time>
          </div>
        </header>

        <article className="prose prose-invert prose-gold mx-auto max-w-4xl px-4 text-gray-300 sm:px-6">
          <p className="border-l-4 border-gold-400 pl-6 text-lg font-light italic leading-relaxed text-gray-200 sm:text-xl">
            Elegir entre un coche diésel o gasolina en 2026 no es solo una cuestión de consumo o sensaciones. Al importar desde Alemania, la decisión también afecta al impuesto de matriculación, la etiqueta ambiental, el mantenimiento y el valor futuro.
          </p>
          <p>
            La respuesta corta a “¿qué conviene más?” es que depende de la unidad concreta. Un diésel moderno puede quedar en un tramo fiscal inferior si homologa menos CO₂, mientras que un gasolina puede compensar por precio, kilometraje, historial, equipamiento o demanda futura.
          </p>
          <p>
            Antes de elegir motor conviene cruzar dos decisiones: qué tecnología encaja con tu uso real y cuánto costará matricular ese coche específico en España.
          </p>

          <CalculatorCta text="¿Ya tienes un coche visto en Alemania? Calcula el impuesto antes de comparar motores o pagar una reserva." />

          <h2>Resumen rápido: diésel o gasolina, ¿cuál conviene más?</h2>
          <p>No existe una respuesta universal. Como orientación inicial:</p>
          <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickSummary.map(([title, text]) => (
              <div key={title} className="border border-white/10 bg-white/[0.025] p-5">
                <h3 className="mb-2 text-base font-bold text-white">{title}</h3>
                <p className="m-0 text-sm leading-relaxed text-gray-400">{text}</p>
              </div>
            ))}
          </div>
          <p>
            Fiscalmente, el matiz decisivo es que el impuesto no depende directamente de si el coche es diésel o gasolina. Se determina por su clasificación según emisiones oficiales de CO₂ y por la base imponible aplicable. En usados importados, la Agencia Tributaria indica que debe tomarse el valor de mercado en la fecha de devengo, con las reglas previstas para vehículos previamente matriculados en el extranjero.
          </p>

          <h2>¿Paga más impuesto de matriculación un diésel o un gasolina?</h2>
          <p>
            No necesariamente paga más por ser gasolina ni menos por ser diésel. En Península y Baleares, los tipos estatales de referencia se distribuyen por tramos de emisiones: hasta 120 g/km, más de 120 y menos de 160 g/km, desde 160 y menos de 200 g/km, y desde 200 g/km. Las comunidades autónomas pueden aprobar tipos propios, por lo que el cálculo debe ajustarse al lugar de matriculación y a los datos vigentes.
          </p>
          <BulletList
            items={[
              "Un diésel eficiente puede quedar en un tramo bajo.",
              "Un gasolina potente puede entrar en un tramo superior.",
              "Dos versiones del mismo modelo pueden pagar importes diferentes.",
              "Un coche sin CO₂ acreditado puede complicar la matriculación.",
            ]}
          />
          <p>
            La pregunta útil no es solo “¿diésel o gasolina?”, sino “¿qué CO₂ oficial tiene esta unidad y sobre qué base se calculará el impuesto?”. Puedes consultar el procedimiento general del Modelo 576 en la{" "}
            <a
              href="https://sede.agenciatributaria.gob.es/Sede/vehiculos-embarcaciones/primera-matriculacion-medios-transporte/modelo-576.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agencia Tributaria
            </a>
            .
          </p>

          <h2>Ejemplo orientativo: mismo modelo, distinto motor</h2>
          <p>
            Este ejemplo simplificado muestra por qué dos versiones con el mismo valor pueden acabar en cuotas distintas. No es una liquidación ni sustituye el cálculo con la documentación real.
          </p>
          <div className="not-prose my-8 overflow-x-auto border border-white/10">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-white/[0.06] text-gray-200">
                <tr>
                  {[
                    "Versión",
                    "Valor inicial orientativo",
                    "CO₂",
                    "Antigüedad",
                    "Tipo orientativo",
                    "Cuota orientativa",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-4 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-4 font-semibold text-white">Diésel moderno</td>
                  <td className="px-4 py-4 text-gray-300">30.000 €</td>
                  <td className="px-4 py-4 text-gray-300">135 g/km</td>
                  <td className="px-4 py-4 text-gray-300">36 meses</td>
                  <td className="px-4 py-4 text-gray-300">4,75%</td>
                  <td className="px-4 py-4 text-gold-400">955 € aprox.</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-4 font-semibold text-white">Gasolina equivalente</td>
                  <td className="px-4 py-4 text-gray-300">30.000 €</td>
                  <td className="px-4 py-4 text-gray-300">168 g/km</td>
                  <td className="px-4 py-4 text-gray-300">36 meses</td>
                  <td className="px-4 py-4 text-gray-300">9,75%</td>
                  <td className="px-4 py-4 text-gold-400">1.960 € aprox.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400">
            Cálculo ilustrativo usando el mismo valor inicial y una depreciación orientativa. La cuota real depende de la fecha exacta, el valor de mercado o referencia aplicable, la comunidad autónoma, las emisiones acreditadas y la situación fiscal del vehículo.
          </p>
          <p>
            En este supuesto, el gasolina pagaría alrededor de 1.000 € más. Aun así, podría ser mejor compra si cuesta menos, tiene mejor historial, menos kilómetros o un equipamiento más valioso. La comparación correcta se hace con el coste total puesto en España.
          </p>

          <h2>Qué motor elegir en 2026 según tu uso</h2>
          <h3>Uso urbano diario</h3>
          <p>
            Para ciudad, trayectos cortos y circulación habitual en zonas con restricciones, suele tener sentido comparar híbridos, MHEV, PHEV si puedes cargar y gasolina eficientes. Un diésel usado casi siempre en recorridos cortos puede no encajar por el funcionamiento del filtro de partículas, la EGR y otros sistemas anticontaminación.
          </p>

          <h3>Uso mixto</h3>
          <p>
            Si combinas ciudad, rondas, carretera y viajes ocasionales, el equilibrio puede estar en un MHEV, un híbrido, un gasolina eficiente o un diésel moderno si la parte de carretera y el kilometraje son relevantes. Aquí pesan especialmente el distintivo ambiental, el consumo real y la reventa.
          </p>

          <h3>Muchos kilómetros al año</h3>
          <p>
            A partir de unos 20.000 o 25.000 km anuales, especialmente en autopista, un diésel moderno todavía puede tener sentido. Alemania ofrece unidades premium como BMW 320d, Audi A4 TDI, Audi Q5 TDI, Mercedes Clase C diésel o Volkswagen Tiguan TDI, pero hay que validar historial, kilometraje, vendedor, CO₂ y coste fiscal.
          </p>

          <h3>Uso ocasional o conducción emocional</h3>
          <p>
            Para fines de semana, pocos kilómetros o coches más pasionales, el gasolina puede ser la opción lógica por tacto, sonido y prestaciones. En motores potentes, SUV grandes o versiones deportivas, conviene comprobar el CO₂ porque el impuesto puede cambiar mucho la operación.
          </p>

          <CalculatorCta text="Antes de elegir entre dos unidades, compara el impuesto estimado de cada una con sus datos reales." />

          <h2>Comparativa de motores en 2026</h2>
          <div className="not-prose my-8 overflow-x-auto border border-white/10">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="bg-white/[0.06] text-gray-200">
                <tr>
                  {[
                    "Motor",
                    "Mejor uso",
                    "Etiqueta habitual",
                    "Coste fiscal",
                    "Lectura práctica",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-4 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="border-t border-white/10">
                    {row.map((cell, index) => (
                      <td
                        key={cell}
                        className={`px-4 py-4 ${index === 0 ? "font-semibold text-white" : "text-gray-300"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400">
            La tabla es orientativa. El distintivo definitivo debe comprobarse en el Registro de Vehículos y el impuesto depende del CO₂ oficial y la base imponible, no del nombre comercial de la tecnología.
          </p>

          <h2>Por qué el CO₂ pesa más que el combustible</h2>
          <p>
            A efectos del impuesto de matriculación, las emisiones oficiales determinan el epígrafe fiscal. Por eso dos coches aparentemente similares pueden pagar cuotas distintas. Un diésel moderno puede homologar menos CO₂ que un gasolina equivalente, pero un gasolina electrificado también puede quedar por debajo de un diésel más antiguo o pesado.
          </p>
          <p>
            Al comprar en Alemania no basta con mirar precio, kilómetros, potencia y equipamiento. También hay que revisar el CO₂ homologado, el COC, la documentación alemana y el valor aplicable. Una unidad barata puede dejar de serlo después de impuestos y trámites.
          </p>

          <h2>Qué datos necesitas antes de decidir</h2>
          <h3>CO₂ homologado</h3>
          <p>
            Es el dato que sitúa el vehículo en su tramo fiscal. No conviene depender de una ficha comercial genérica: debe contrastarse con la documentación técnica, el COC o la ficha oficial.
          </p>
          <h3>Valor de mercado o referencia fiscal</h3>
          <p>
            En vehículos usados, la Agencia Tributaria parte del valor de mercado en la fecha de devengo. También permite utilizar los precios medios de venta oficiales vigentes para determinar ese valor bajo las condiciones indicadas por la propia Administración.
          </p>
          <h3>Fecha de primera matriculación</h3>
          <p>
            La antigüedad influye en la valoración. Dos coches con el mismo CO₂ pueden arrojar cuotas distintas si su fecha de primera matriculación y su valor aplicable no coinciden.
          </p>
          <h3>Documentación alemana y COC</h3>
          <BulletList
            items={[
              "Zulassungsbescheinigung Teil I y Teil II.",
              "Factura o contrato y número de bastidor.",
              "Historial de mantenimiento y coherencia del kilometraje.",
              "COC o documentación técnica con emisiones oficiales.",
              "Condición fiscal de la venta cuando corresponda.",
              "Coherencia entre anuncio, vendedor y documentación.",
            ]}
          />
          <p>
            Si tienes dudas sobre este documento, consulta nuestra guía del{" "}
            <Link to="/blog/certificado-conformidad-coc-itv-matriculacion">
              Certificado de Conformidad, ITV y matriculación
            </Link>
            .
          </p>

          <h2>Diésel en 2026: cuándo puede interesar</h2>
          <p>
            Un diésel moderno puede ser una buena compra si haces muchos kilómetros, utilizas principalmente autopista, buscas autonomía y encuentras una unidad moderna con historial claro. El precio alemán debe compensar frente al mercado español después de sumar impuesto y costes de importación.
          </p>
          <BulletList
            items={[
              "Kilometraje coherente y mantenimiento documentado.",
              "Uso anterior compatible con el sistema anticontaminación.",
              "Estado de FAP, EGR y AdBlue cuando corresponda.",
              "Emisiones acreditadas y tramo fiscal razonable.",
              "Vendedor fiable y documentación completa.",
              "Demanda futura suficiente para ese modelo.",
            ]}
          />

          <h2>Gasolina en 2026: cuándo puede interesar</h2>
          <p>
            El gasolina puede encajar si haces pocos kilómetros, buscas una conducción refinada o deportiva, o quieres una versión difícil de encontrar en España. También puede compensar cuando la unidad tiene mejor precio, historial o equipamiento que las alternativas diésel.
          </p>
          <p>
            El punto delicado es el CO₂: en gasolina potentes y SUV grandes, el impuesto puede subir. La diferencia fiscal debe compararse con el precio de compra y el valor futuro, no analizarse de forma aislada.
          </p>

          <h2>MHEV, híbrido y PHEV: alternativas a valorar</h2>
          <h3>MHEV</h3>
          <p>
            El mild hybrid puede ofrecer un buen equilibrio para uso mixto. Muchas unidades obtienen distintivo ECO, pero conviene comprobar la clasificación concreta y no deducirla solo por las siglas comerciales.
          </p>
          <h3>Híbrido no enchufable</h3>
          <p>
            Suele funcionar bien en ciudad y uso diario. Para quien no dispone de enchufe, puede ser una opción cómoda por su gestión automática del sistema híbrido.
          </p>
          <h3>PHEV</h3>
          <p>
            Un híbrido enchufable puede ser interesante si puedes cargarlo con frecuencia y sus recorridos encajan con la autonomía eléctrica. Si no se carga, pierde buena parte de su ventaja y añade peso y complejidad. La DGT diferencia entre etiqueta 0 y ECO según la autonomía eléctrica registrada y los requisitos aplicables.
          </p>
          <p>
            Puedes verificar los criterios actuales en la página de{" "}
            <a
              href="https://www.dgt.es/nuestros-servicios/tu-vehiculo/tus-vehiculos/distintivo-ambiental/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              distintivos ambientales de la DGT
            </a>
            .
          </p>

          <h2>El error más común: decidir solo por el precio de Alemania</h2>
          <p>El precio anunciado no es el coste real. Una comparación completa incluye:</p>
          <div className="not-prose my-8 border border-white/10 bg-metallic-900 p-6 sm:p-8">
            <p className="m-0 text-center font-serif text-lg font-semibold leading-relaxed text-white sm:text-xl">
              Precio de compra + impuesto + transporte + ITV + matriculación + revisión documental + margen para riesgos
            </p>
          </div>
          <p>
            Un gasolina puede ser más barato y pagar más impuesto; un diésel puede tributar menos y tener más kilómetros; un PHEV puede parecer atractivo y ocultar una batería degradada. La unidad solo compensa cuando el conjunto sigue teniendo sentido.
          </p>

          <h2>Cuánto cuesta elegir mal el motor</h2>
          <p>
            La elección afecta durante años al impuesto inicial, consumo, mantenimiento, posibles averías, restricciones urbanas, distintivo ambiental y valor de reventa. Un coche no es buena compra solo porque sea barato en Alemania, sino porque después de revisar todos esos factores continúa siendo adecuado para su propietario.
          </p>

          <h2>Qué motor mantiene mejor el valor en España</h2>
          <p>
            No hay una tecnología que conserve mejor el valor en todos los segmentos. La reventa depende de la etiqueta, el consumo, la fiabilidad, la demanda del modelo y la calidad de la unidad. Los híbridos y MHEV pueden resultar atractivos en uso urbano; los diésel modernos mantienen demanda en modelos premium de carretera; y determinados gasolina deportivos conservan un público específico.
          </p>

          <h2>Cómo decidir entre dos unidades concretas</h2>
          <BulletList
            items={[
              "Precio, año y kilometraje.",
              "CO₂ y valor fiscal aplicable.",
              "Impuesto estimado y costes de transporte.",
              "Historial, garantía y reputación del vendedor.",
              "Equipamiento, estado real y documentación.",
              "ITV, matriculación y demanda futura en España.",
            ]}
          />
          <div className="not-prose my-10 border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="mb-2 font-serif text-xl font-bold text-white">
                  ¿Tienes dos coches vistos en Alemania?
                </h3>
                <p className="m-0 max-w-xl text-sm leading-relaxed text-gray-400">
                  Envíanos los enlaces y revisamos qué unidad tiene más sentido por impuesto, documentación y coste final puesto en España.
                </p>
              </div>
              <a
                href={comparisonWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 bg-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-white"
              >
                Comparar dos unidades <MessageCircle size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <h2>Cómo lo analizamos en Premium German Cars</h2>
          <p>
            No recomendamos un motor de forma genérica. Analizamos uso real, kilómetros anuales, ciudad o carretera, modelo, precio en Alemania, historial, vendedor, documentación, CO₂, impuesto, transporte, ITV, matriculación y valor futuro en España.
          </p>
          <p>
            La pregunta correcta no es solo “¿qué motor me gusta más?”, sino “¿qué unidad tiene más sentido económico, técnico y fiscal puesta en España?”. Antes de pagar una reserva también puedes ver cómo trabajamos para{" "}
            <Link to="/blog/revision-coche-alemania-protocolo-auditoria">
              revisar un coche en Alemania
            </Link>
            .
          </p>
        </article>

        <SeoIntentLinks
          title="Cruza motor, coste e importación"
          intro="La elección de motor debe validarse con impuestos, modelos disponibles y riesgos documentales antes de comprar en Alemania."
          links={seoIntentLinks.motor}
        />

        <section className="bg-metallic-900 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
              Respuestas directas
            </span>
            <h2 className="mb-8 font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
              Preguntas frecuentes sobre diésel, gasolina e impuesto de matriculación
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.question} className="border border-white/10 bg-black/30 p-6">
                  <h3 className="mb-3 text-lg font-bold text-white">{faq.question}</h3>
                  <p className="m-0 text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="mb-6 font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
            Conclusión: no elijas motor sin calcular el coste final
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-gray-300">
            <p>
              En 2026, elegir entre diésel o gasolina exige valorar uso, kilómetros, etiqueta, consumo, CO₂, impuesto, documentación, precio en Alemania y reventa.
            </p>
            <p>
              Un diésel puede ser la mejor compra en un caso y una mala decisión en otro. Un gasolina puede pagar más impuesto y aun así compensar. Un híbrido o MHEV puede ser el equilibrio adecuado para muchos conductores. La clave es calcular y revisar antes de reservar.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/calculadora-impuesto-matriculacion"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-gold-400 px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-white"
            >
              Usar calculadora de matriculación <Calculator size={17} aria-hidden="true" />
            </Link>
            <a
              href={valuationWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Enviar coche para valoración <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default EleccionMotor2026;
