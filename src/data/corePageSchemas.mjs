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
    question: "Como se calcula el impuesto de matriculacion en la calculadora?",
    answer:
      "Para vehiculos usados importados previamente matriculados, la herramienta parte del Valor BOE del vehiculo nuevo, aplica el coeficiente oficial por antiguedad, estima el valor de mercado y obtiene la base imponible minorando los impuestos indirectos residuales cuando el supuesto esta soportado.",
  },
  {
    question: "Que datos necesito para usar la calculadora?",
    answer:
      "Necesitas Valor BOE del vehiculo nuevo, fecha de primera matriculacion, emisiones oficiales de CO2 acreditadas, territorio de matriculacion, condicion del vehiculo y norma de emisiones si consta en la documentacion.",
  },
  {
    question: "La cuota es definitiva?",
    answer:
      "No. Es una estimacion orientativa dentro de una matriz fiscal concreta. Debe validarse con COC, ficha tecnica, documentacion, Modelo 576 y normativa vigente antes de comprar o matricular.",
  },
  {
    question: "Que casos no calcula automaticamente?",
    answer:
      "La calculadora deriva a revision individual vehiculos nuevos, casos sin CO2 acreditado, fechas fuera de la matriz historica implementada y territorios con fiscalidad indirecta especifica como Canarias, Ceuta o Melilla.",
  },
  {
    question: "Que CO2 debo introducir?",
    answer:
      "Debes introducir las emisiones oficiales acreditadas para la unidad concreta. Conviene comprobarlas en el COC, ficha tecnica o documentacion oficial y no depender solo del anuncio.",
  },
  {
    question: "Por que la base imponible no coincide con el valor BOE depreciado?",
    answer:
      "En usados previamente matriculados en el extranjero, la base imponible puede obtenerse retirando del valor de mercado el importe residual de impuestos indirectos incluidos en ese valor, segun el esquema fiscal aplicable.",
  },
];

export const revisionUnidadFaqs = [
  {
    question: "¿El coste final que recibiré será exacto?",
    answer:
      "Recibirás una estimación prudente basada en la información disponible. Cuando un gasto no pueda confirmarse, mostraremos una horquilla e indicaremos por qué puede variar. El presupuesto definitivo solo puede cerrarse después de verificar la documentación, las condiciones del vendedor y el transporte.",
  },
  {
    question: "¿Contactáis con el concesionario?",
    answer:
      "La revisión de 79 € se basa inicialmente en el anuncio y en la información públicamente disponible. Si es necesario contactar con el vendedor, solicitar documentación o confirmar por escrito las condiciones de compra, te indicaremos el siguiente paso antes de realizar gestiones adicionales.",
  },
  {
    question: "¿Comprobáis si el coche ha tenido accidentes?",
    answer:
      "Revisamos lo que el vendedor declara y detectamos posibles señales o contradicciones en el anuncio. La confirmación técnica del estado del vehículo requiere documentación adicional o una inspección física independiente en Alemania.",
  },
  {
    question: "¿Incluye una inspección física?",
    answer:
      "No. La inspección física en origen es un servicio independiente. Si la unidad resulta interesante, podemos ayudarte a coordinar una revisión realizada por un perito externo antes de la compra.",
  },
  {
    question: "¿Qué ocurre si recomendáis descartar el coche?",
    answer:
      "El servicio se considera realizado porque el objetivo del análisis es ayudarte a evitar una mala compra. Descubrir a tiempo que una unidad no compensa puede evitarte una pérdida muy superior al precio de la revisión.",
  },
  {
    question: "¿Qué ocurre si el anuncio no contiene información suficiente?",
    answer:
      "Comprobaremos el enlace antes de confirmar el encargo y solicitar el pago. Si necesitamos algún dato adicional, nos pondremos en contacto contigo. Si no fuera posible realizar razonablemente el análisis, no tendrás que contratar el servicio.",
  },
  {
    question: "¿Qué ocurre si el coche se vende durante la revisión?",
    answer:
      "Si el anuncio deja de estar disponible antes de que iniciemos el análisis, podrás enviarnos otra unidad. Si la revisión ya se ha iniciado, te entregaremos la información que haya podido analizarse y te indicaremos las alternativas disponibles.",
  },
  {
    question: "¿Puedo enviar más de un coche?",
    answer:
      "La tarifa de 79 € corresponde al análisis de una unidad. Si estás comparando varios vehículos, podemos prepararte una propuesta específica de búsqueda o preselección.",
  },
  {
    question: "¿Se descuentan los 79 € si contrato la importación?",
    answer:
      "Sí. Si posteriormente encargas a Premium German Cars la gestión integral de la unidad analizada, descontaremos íntegramente los 79 € de nuestros honorarios.",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer:
      "Después de recibir la solicitud comprobaremos que el anuncio permite realizar el análisis. Si podemos efectuarlo, te enviaremos la confirmación del encargo y las instrucciones para pagar mediante Bizum o transferencia bancaria. El análisis comenzará después de confirmar el pago.",
  },
  {
    question: "¿Cuánto tardaré en recibir el análisis?",
    answer:
      "El plazo habitual es de 24–48 horas laborables desde la recepción del pago y de todos los datos necesarios para realizar la revisión.",
  },
];
const homeUrl = `${SITE_URL}/`;
const importacionUrl = `${SITE_URL}/importacion-coches-alemania`;
const calculatorUrl = `${SITE_URL}/calculadora-impuesto-matriculacion`;
const revisionUnidadUrl = `${SITE_URL}/revision-unidad-alemania`;

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
      "Estima el impuesto de matriculacion de un coche usado importado con Valor BOE, primera matriculacion, CO2, territorio y base imponible fiscal.",
    dateModified: "2026-07-27",
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
      "Herramienta para estimar el impuesto de matriculacion de un coche usado importado segun Valor BOE, primera matriculacion, CO2, territorio y base imponible fiscal.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "es-ES",
    isAccessibleForFree: true,
    dateModified: "2026-07-27",
    featureList: [
      "Calculo por tramos de emisiones CO2",
      "Estimacion desde Valor BOE y coeficiente oficial de antiguedad",
      "Estimacion de base imponible descontando impuestos indirectos residuales",
      "Tipos autonomicos para territorios soportados",
      "Revision individual visible para casos no soportados",
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

export const revisionUnidadJsonLd = createGraph([
  {
    ...createWebPageSchema({
      url: revisionUnidadUrl,
      name: "Revisión de una unidad antes de comprarla en Alemania",
      description:
        "Revisión personalizada del anuncio, vendedor, fiscalidad, documentación, costes probables y viabilidad de compra antes de reservar un coche en Alemania.",
      datePublished: "2026-07-19",
      dateModified: "2026-07-19",
      breadcrumbId: `${revisionUnidadUrl}#breadcrumb`,
      mainEntityId: `${revisionUnidadUrl}#service`,
      hasPartIds: [`${revisionUnidadUrl}#faq`],
    }),
    about: organizationReference(),
    provider: organizationReference(),
  },
  createBreadcrumbSchema({
    url: revisionUnidadUrl,
    items: [
      { name: "Inicio", url: homeUrl },
      { name: "Revisión de una unidad", url: revisionUnidadUrl },
    ],
  }),
  {
    ...createServiceSchema({
      id: `${revisionUnidadUrl}#service`,
      url: revisionUnidadUrl,
      name: "Revisión de una unidad antes de comprarla en Alemania",
      description:
        "Revisión personalizada del anuncio, vendedor, fiscalidad, documentación, costes probables y viabilidad de compra.",
      serviceType: "Análisis previo de vehículos localizados en Alemania",
      areaServed: ["España"],
    }),
    mainEntityOfPage: { "@id": `${revisionUnidadUrl}#webpage` },
    offers: {
      "@type": "Offer",
      "@id": `${revisionUnidadUrl}#offer`,
      url: revisionUnidadUrl,
      price: "79",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      description: "Precio final con IVA incluido para la revisión de una unidad.",
      seller: organizationReference(),
    },
  },
  createFaqSchema({ url: revisionUnidadUrl, faqs: revisionUnidadFaqs }),
]);
