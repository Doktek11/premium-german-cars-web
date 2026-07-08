import {
  createBreadcrumbSchema,
  createFaqSchema,
  createGraph,
  createOrganizationSchema,
  createServiceSchema,
  createWebPageSchema,
  organizationReference,
  SITE_URL,
} from "../lib/structuredData.mjs";
import { IMPORT_SERVICE_SCHEMA_INPUT } from "./commercialServices.mjs";

export const homeFaqs = [
  ["¿Cuánto cuesta importar un coche de Alemania a España?", "Depende del precio del coche, transporte, ITV, impuesto de matriculación, tasas, documentación y servicio de gestión. Antes de comprar, conviene calcular el coste total y no fijarse solo en el precio anunciado."],
  ["¿Qué impuestos hay que pagar al importar un coche de Alemania?", "Puede intervenir el impuesto de matriculación, el impuesto de circulación y, según el tipo de operación, IVA, ITP u otros conceptos. La fiscalidad depende del coche, vendedor, factura y emisiones."],
  ["¿Puedo importar un coche de Alemania si ya he encontrado uno en Mobile.de?", "Sí. Puedes enviarnos el enlace y revisamos si la unidad es recomendable antes de avanzar."],
  ["¿Cuánto tarda el proceso de importación?", "El plazo depende de disponibilidad, documentación, transporte, ITV y matriculación. Es mejor valorar cada caso de forma individual."],
  ["¿Qué marcas merece más la pena importar desde Alemania?", "Suelen tener interés BMW, Audi, Mercedes-Benz, Porsche y Volkswagen, especialmente en versiones equipadas, reestreno o configuraciones difíciles de encontrar en España."],
  ["¿Qué documentación necesita un coche alemán para matricularse en España?", "Se revisan titularidad, factura o contrato, documentación alemana, certificado COC o ficha técnica equivalente, ITV y justificantes fiscales necesarios."],
  ["¿Siempre es más barato importar un coche de Alemania?", "No. Puede compensar por precio, equipamiento o disponibilidad, pero hay casos donde impuestos, transporte o documentación complicada no lo hacen recomendable."],
  ["¿Premium German Cars gestiona todo el proceso?", "Sí. El servicio cubre búsqueda, verificación, compra, transporte, ITV, matriculación y entrega final en España."],
];

export const importacionFaqs = [
  {
    question: "¿Cuánto cuesta importar un coche de Alemania a España?",
    answer:
      "Depende del precio del vehículo, transporte, ITV, tasas, gestoría, emisiones de CO₂, antigüedad y posible impuesto de matriculación. Por eso conviene calcular el coste total antes de reservar una unidad.",
  },
  {
    question: "¿Qué impuestos se pagan al matricular un coche alemán en España?",
    answer:
      "Puede aplicarse impuesto de matriculación según emisiones de CO₂, además de tasas y otros costes administrativos. Cada caso debe revisarse con datos actualizados del vehículo.",
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

export const calculatorFaqs = [
  {
    question: "¿Cómo se calcula el impuesto de matriculación?",
    answer:
      "La calculadora identifica el tramo según las emisiones oficiales de CO₂, aplica una depreciación orientativa por antigüedad al valor fiscal y estima la cuota sobre la base resultante.",
  },
  {
    question: "¿Qué datos necesito para usar la calculadora?",
    answer:
      "Necesitas el valor fiscal o valor BOE aproximado del vehículo, las emisiones oficiales de CO₂ y la antigüedad expresada en meses.",
  },
  {
    question: "¿El resultado es definitivo?",
    answer:
      "No. Es una estimación orientativa que debe verificarse con el COC, la ficha técnica, la documentación del vehículo y la normativa fiscal vigente.",
  },
  {
    question: "¿Qué CO₂ debo introducir?",
    answer:
      "Debes introducir las emisiones oficiales acreditadas para la unidad concreta. Conviene comprobarlas en el COC, la ficha técnica o documentación oficial y no depender solo del anuncio.",
  },
  {
    question: "¿Sirve para coches importados de Alemania?",
    answer:
      "Sí. Está orientada a estimar el impuesto de matriculación de coches importados de Alemania antes de comprar y matricular en España.",
  },
  {
    question: "¿Paga más un diésel o un gasolina?",
    answer:
      "No depende directamente del combustible. Depende principalmente de las emisiones oficiales de CO₂, el valor fiscal y la antigüedad.",
  },
];

const homeUrl = `${SITE_URL}/`;
const importacionUrl = `${SITE_URL}/importacion-coches-alemania`;
const calculatorUrl = `${SITE_URL}/calculadora-impuesto-matriculacion`;

export const homeJsonLd = createGraph([
  createOrganizationSchema(),
  createServiceSchema(IMPORT_SERVICE_SCHEMA_INPUT),
  createFaqSchema({
    url: homeUrl,
    faqs: homeFaqs.map(([question, answer]) => ({ question, answer })),
  }),
  createBreadcrumbSchema({
    url: homeUrl,
    items: [{ name: "Inicio", url: homeUrl }],
  }),
]);

export const importacionJsonLd = createGraph([
  createBreadcrumbSchema({
    url: importacionUrl,
    items: [
      { name: "Inicio", url: homeUrl },
      { name: "Importar coche de Alemania a España", url: importacionUrl },
    ],
  }),
  createServiceSchema(IMPORT_SERVICE_SCHEMA_INPUT),
  createFaqSchema({ url: importacionUrl, faqs: importacionFaqs }),
]);

export const calculatorJsonLd = createGraph([
  createOrganizationSchema(),
  createWebPageSchema({
    url: calculatorUrl,
    name: "Calculadora Impuesto Matriculación 2026 | Coche Importado Alemania",
    description:
      "Calcula el impuesto de matriculación de un coche importado de Alemania según CO₂, valor fiscal y antigüedad. Estimación orientativa antes de comprar.",
    dateModified: "2026-07-04",
    breadcrumbId: `${calculatorUrl}#breadcrumb`,
    mainEntityId: `${calculatorUrl}#calculator`,
    hasPartIds: [`${calculatorUrl}#faq`],
  }),
  createBreadcrumbSchema({
    url: calculatorUrl,
    items: [
      { name: "Inicio", url: homeUrl },
      { name: "Calculadora de impuesto de matriculación", url: calculatorUrl },
    ],
  }),
  {
    "@type": "SoftwareApplication",
    "@id": `${calculatorUrl}#calculator`,
    name: "Calculadora de impuesto de matriculación para coches importados",
    url: calculatorUrl,
    description:
      "Herramienta para estimar el impuesto de matriculación de un coche importado según CO₂, valor fiscal y antigüedad.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "es-ES",
    isAccessibleForFree: true,
    dateModified: "2026-07-04",
    featureList: [
      "Cálculo por tramos de emisiones CO₂",
      "Estimación por valor fiscal del vehículo",
      "Aplicación de depreciación orientativa por antigüedad",
      "Estimación del impuesto de matriculación en España",
      "Orientación para coches importados de Alemania",
      "Prefill de valores mediante parámetros de URL",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: organizationReference(),
    provider: organizationReference(),
    mainEntityOfPage: { "@id": `${calculatorUrl}#webpage` },
  },
  createFaqSchema({ url: calculatorUrl, faqs: calculatorFaqs }),
]);
