import {
  createBlogPostingGraph,
  createServiceSchema,
  SITE_URL,
} from "../lib/structuredData.mjs";
import { AUDIT_REVIEW_SERVICE_SCHEMA_INPUT } from "./commercialServices.mjs";

const defaultArticleImage = `${SITE_URL}/logoPGC.svg`;

const motorFaqs = [
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

const auditFaqs = [
  {
    question: "¿Puede Premium German Cars revisar un coche anunciado en Mobile.de?",
    answer:
      "Sí. Podemos ayudarte a valorar una unidad concreta antes de pagar una señal, revisando anuncio, vendedor, historial disponible, documentación, precio, CO₂ y viabilidad de importación a España.",
  },
  {
    question: "¿Qué datos necesito enviar para revisar una unidad?",
    answer:
      "Lo ideal es enviar el enlace del anuncio, modelo, año, kilometraje, precio, vendedor y cualquier documentación o información adicional que tengas. Con eso se puede hacer una primera valoración.",
  },
  {
    question: "¿La revisión incluye el cálculo del coste de importación?",
    answer:
      "La revisión puede incluir una estimación del coste total, teniendo en cuenta transporte, ITV, tasas, matriculación e impuesto de matriculación si aplica. Para una referencia inicial, también puedes usar la calculadora de impuesto de matriculación.",
  },
  {
    question: "¿Cómo sé si un vendedor alemán es fiable?",
    answer:
      "Hay que valorar si el vendedor está correctamente identificado, si facilita documentación, si responde con claridad, si el precio es coherente y si permite verificar la unidad antes de reservar.",
  },
  {
    question: "¿Qué pasa si la unidad no merece la pena?",
    answer:
      "En ese caso, la recomendación es no comprar. Descartar una unidad dudosa forma parte del proceso. El objetivo no es cerrar cualquier operación, sino evitar errores caros.",
  },
  {
    question: "¿Puedo comprar un coche en Alemania sin viajar?",
    answer:
      "Sí, pero conviene hacerlo con una revisión previa seria y una gestión documental correcta. Comprar sin viajar puede ser viable, siempre que el vendedor, la documentación y el proceso estén bien controlados.",
  },
  {
    question: "¿Qué riesgos hay al comprar un coche en Alemania sin asesoramiento?",
    answer:
      "Los principales riesgos son kilometraje incoherente, historial incompleto, documentación insuficiente, daños no declarados, problemas de IVA, cálculo incorrecto del impuesto y costes finales superiores a lo previsto.",
  },
  {
    question: "¿Premium German Cars solo trabaja en Tarragona?",
    answer:
      "No. Premium German Cars está en Cambrils, Tarragona, pero ofrece servicio de importación de coches desde Alemania para clientes de toda España.",
  },
];

export const BLOG_ARTICLES = [
  {
    path: "/blog/certificado-conformidad-coc-itv-matriculacion",
    title: "Certificado de Conformidad (COC): Qué es y cómo conseguirlo | PGC",
    description:
      "Evita la homologación individual. Guía completa sobre el Certificado de Conformidad (COC) para matricular coches de Alemania en España sin errores.",
    headline: "Certificado de Conformidad (COC): qué es, por qué lo necesitas y cómo evitar problemas en la ITV",
    datePublished: "2026-01-29",
    dateModified: "2026-01-29",
    image: defaultArticleImage,
  },
  {
    path: "/blog/importar-coche-aleman-guia-importacion-alemania",
    title: "¿Por qué Importar de Alemania es la Mejor Opción en 2026? | PGC",
    description:
      "Descubre por qué la importación de coches desde Alemania es la decisión más inteligente en 2026. Calidad, ahorro real y garantía oficial con el método PGC.",
    headline: "Importación de Alemania: ¿La mejor forma de comprar tu premium?",
    datePublished: "2026-01-27",
    dateModified: "2026-01-27",
    image: defaultArticleImage,
  },
  {
    path: "/blog/revision-coche-alemania-protocolo-auditoria",
    title: "Revisar coche en Alemania antes de comprar | Evita riesgos",
    description:
      "¿Has visto un coche en Mobile.de? Revisamos vendedor, historial, CO₂, documentos y coste real antes de pagar una señal.",
    schemaDescription:
      "Revisamos coches anunciados en Alemania antes de comprar: vendedor, historial, documentación, CO₂ y coste real de importación.",
    headline: "Revisar un coche en Alemania antes de comprarlo",
    datePublished: "2026-01-19",
    dateModified: "2026-06-05",
    image: defaultArticleImage,
    faqs: auditFaqs,
    service: AUDIT_REVIEW_SERVICE_SCHEMA_INPUT,
  },
  {
    path: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
    title: "Coste real de importar coche de Alemania en 2026 | PGC",
    description:
      "Transporte, impuestos, fiscalidad y ejemplos reales. Descubre el coste total antes de comprar y evita sorpresas.",
    headline: "¿Cuánto cuesta realmente importar un coche de Alemania en 2026? (La verdad que nadie te cuenta)",
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    image: defaultArticleImage,
  },
  {
    path: "/blog/que-motor-elegir-importar-alemania-2026",
    title: "Diésel o Gasolina en 2026: Impuesto, CO₂ y Qué Motor Conviene | PGC",
    description:
      "Compara diésel, gasolina, MHEV y PHEV para importar de Alemania en 2026. Descubre cómo influyen el CO₂, el uso real y el impuesto de matriculación.",
    headline: "Diésel o gasolina en 2026: qué motor conviene e impuesto de matriculación",
    datePublished: "2026-03-27",
    dateModified: "2026-07-04",
    image: defaultArticleImage,
    faqs: motorFaqs,
    keywords: [
      "diésel o gasolina 2026",
      "qué motor conviene",
      "impuesto de matriculación",
      "CO₂ coche importado",
      "MHEV",
      "PHEV",
    ],
    about: [
      { "@type": "Thing", name: "Impuesto de matriculación" },
      { "@type": "Thing", name: "Coches diésel" },
      { "@type": "Thing", name: "Coches de gasolina" },
      { "@type": "Thing", name: "Vehículos híbridos" },
      { "@type": "Thing", name: "Importación de coches desde Alemania" },
    ],
  },
  {
    path: "/blog/guia-calculo-impuesto-matriculacion-boe-2025",
    title: "Guía: Cómo calcular el impuesto de matriculación BOE 2025 | Premium German Cars",
    description:
      "Aprende a usar la calculadora para estimar el impuesto con Valor BOE, fecha de primera matriculacion, CO2, territorio y revision de casos no automaticos.",
    headline: "Guía definitiva: cómo calcular el impuesto de matriculación según el BOE 2025 (paso a paso)",
    datePublished: "2026-01-13",
    dateModified: "2026-01-13",
    image: `${SITE_URL}/calculadora-impuesto-matriculacion-2026.webp`,
  },
  {
    path: "/blog/bmw-alpina-nueva-era-lujo-aleman",
    title: "BMW y Alpina: El futuro del Lujo Automotriz en 2026 | PGC",
    description:
      "Análisis de la integración de Alpina en BMW Group. Qué significa para el mercado de importación y por qué las unidades pre-2026 son una inversión clave.",
    headline: "BMW y Alpina: el nacimiento de una nueva era en el lujo alemán",
    datePublished: "2026-01-09",
    dateModified: "2026-01-09",
    image: defaultArticleImage,
  },
  {
    path: "/blog/5-riesgos-importar-coche-alemania",
    title: "Importar coche de Alemania: 5 riesgos reales en 2026 | PGC",
    description:
      "Conoce los 5 riesgos más frecuentes al importar un coche de Alemania y cómo evitarlos con un protocolo de verificación profesional.",
    headline: "Importar Coche de Alemania: 5 Riesgos Reales y Cómo Evitarlos en 2026",
    datePublished: "2026-01-07",
    dateModified: "2026-01-07",
    image: defaultArticleImage,
  },
  {
    path: "/blog/como-importar-coche-alemania",
    title: "Guía 2026: Importar Coche de Alemania a España sin Sorpresas | PGC",
    description:
      "Protocolo experto 2026 para la importación de vehículos premium. Aprenda a gestionar fiscalidad, emisiones de CO₂ y logística profesional con Premium German Cars.",
    headline: "Guía 2026 para Importar de Alemania sin Sorpresas Fiscales",
    datePublished: "2026-01-05",
    dateModified: "2026-01-05",
    image: defaultArticleImage,
  },
  {
    path: "/blog/mejores-modelos-importar-alemania-2026",
    title: "Mejores coches para importar de Alemania en 2026 | Guía PGC",
    description:
      "Modelos con alta demanda en España, baja depreciación y buena reventa. Criterio real para elegir sin perder dinero.",
    headline: "Mejores Coches para Importar de Alemania en 2026 (Guía para Acertar y No Perder Dinero)",
    datePublished: "2026-03-23",
    dateModified: "2026-03-23",
    image: defaultArticleImage,
  },
  {
    path: "/blog/motores-bmw-en-mercedes-2027",
    title: "¿Motores BMW en Mercedes-Benz? Análisis del Pacto Alemán | Premium German Cars",
    description:
      "Analizamos el rumor del siglo: ¿Llevarán los futuros Mercedes motores BMW? Qué significa para el valor de reventa y la inversión en coches premium.",
    headline: "¿Corazón BMW en un Mercedes? El debate de motores para 2027 y cómo afecta a tu inversión",
    datePublished: "2025-12-17",
    dateModified: "2025-12-17",
    image: defaultArticleImage,
  },
  {
    path: "/blog/bmw-reestreno-alemania-2026",
    title: "BMW de Reestreno en Alemania 2026: Guía de Compra | Premium German Cars",
    description:
      "Claves para importar un BMW de reestreno desde Alemania en 2026: garantía oficial, tecnología Live Cockpit y cómo evitar coches de flota.",
    headline: "Guía para comprar un BMW de reestreno en 2026: claves al importar desde Alemania",
    datePublished: "2026-01-01",
    dateModified: "2026-01-01",
    image: defaultArticleImage,
  },
  {
    path: "/blog/coche-segunda-mano-reus-tarragona",
    title: "Coches de segunda mano en Reus y Tarragona | Premium German Cars",
    description:
      "¿Buscas un coche de ocasión en Tarragona o Reus? Descubre por qué la importación de reestreno premium en Cambrils es tu mejor opción. Ahorro y garantía oficial.",
    headline: "¿Buscas un coche de segunda mano en Reus o Tarragona? Descubre por qué somos tu mejor opción",
    datePublished: "2025-12-10",
    dateModified: "2025-12-10",
    image: `${SITE_URL}/amggtr-mobile.webp`,
  },
].map((article) => ({
  ...article,
  url: `${SITE_URL}${article.path}`,
}));

export const getBlogArticleMetadata = (path) => {
  const article = BLOG_ARTICLES.find((candidate) => candidate.path === path);

  if (!article) {
    throw new Error(`Missing blog article structured-data metadata for: ${path}`);
  }

  return article;
};

export const getBlogArticleJsonLd = (path) => {
  const article = getBlogArticleMetadata(path);

  return createBlogPostingGraph({
    url: article.url,
    title: article.title,
    headline: article.headline,
    description: article.schemaDescription ?? article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    breadcrumbName: article.headline,
    faqs: article.faqs ?? [],
    keywords: article.keywords ?? [],
    about: article.about ?? [],
    additionalNodes: article.service
      ? [
          createServiceSchema(article.service),
        ]
      : [],
  });
};
