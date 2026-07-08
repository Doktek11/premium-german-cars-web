import {
  createBreadcrumbSchema,
  createFaqSchema,
  createGraph,
  createWebPageSchema,
  SITE_URL,
} from "../lib/structuredData.mjs";

const blogUrl = `${SITE_URL}/blog`;
const faqUrl = `${SITE_URL}/preguntas-frecuentes`;

export const faqPageItems = [
  {
    question: "1. ¿Cómo afecta la normativa del BOE 2026 a la importación de coches desde Alemania?",
    answer: "La normativa publicada en el BOE ha redefinido los tramos del Impuesto de Matriculación en 2026, ajustándolos a las emisiones reales de CO₂ (WLTP). Esto afecta directamente al coste final de importar un coche desde Alemania a España.",
  },
  {
    question: "2. ¿Es posible comprar coches en Alemania sin IVA (Netto)?",
    answer: "Sí. La compra de coches Netto (sin IVA) es posible para empresas y autónomos con NIF intracomunitario (VIES) activo. El vehículo debe tener el IVA deducible (MwSt. ausweisbar).",
  },
  {
    question: "3. ¿Qué garantía tienen los coches importados de Alemania?",
    answer: "Los coches seleccionados pueden contar con garantía oficial de la marca si sigue vigente a nivel europeo y garantía europea de 12 meses en especialistas certificados.",
  },
  {
    question: "4. ¿Aceptáis pagos en criptomonedas como Bitcoin o USDC?",
    answer: "Sí. La operación se estructura bajo la normativa legal y fiscal vigente, con trazabilidad y justificación del origen de fondos.",
  },
  {
    question: "5. ¿Cuánto tiempo tarda el proceso de importación?",
    answer: "El plazo medio indicado es de 15 a 20 días, incluyendo inspección técnica en origen, transporte, ITV de importación y matriculación definitiva.",
  },
  {
    question: "6. ¿Cómo verificáis que los kilómetros de los coches alemanes son reales?",
    answer: "Se revisan el historial digital de mantenimiento, los informes de la TÜV y la diagnosis electrónica de centralitas. Las unidades con inconsistencias se descartan.",
  },
  {
    question: "7. ¿Puedo importar un coche con etiqueta ECO desde Alemania?",
    answer: "Sí. Los modelos Mild Hybrid (MHEV) alemanes pueden obtener la etiqueta ECO de la DGT cuando su documentación y homologación cumplen los requisitos aplicables.",
  },
  {
    question: "8. ¿El servicio incluye el transporte del coche hasta mi domicilio?",
    answer: "Sí. Se gestiona transporte internacional especializado con entrega puerta a puerta en la península o Baleares.",
  },
  {
    question: "9. ¿Importáis versiones especiales como Alpina frente a BMW M?",
    answer: "Sí. Premium German Cars trabaja con versiones especiales como Alpina y otras configuraciones premium del mercado alemán.",
  },
  {
    question: "10. ¿Es obligatorio pasar la ITV al importar un coche desde Alemania?",
    answer: "Sí. Para matricular un coche alemán es necesaria la ITV de importación para emitir la ficha técnica española.",
  },
  {
    question: "11. ¿Cómo puedo saber el coste exacto del Impuesto de Matriculación?",
    answer: "El importe depende de las emisiones de CO₂, el valor fiscal, la antigüedad y los tramos fiscales aplicables. La calculadora ofrece una estimación que debe verificarse con documentación oficial.",
  },
  {
    question: "12. ¿Qué ocurre si el coche no supera la inspección previa en Alemania?",
    answer: "Si se detecta una anomalía mecánica o estructural, la unidad se descarta y se buscan alternativas que cumplan los criterios de selección.",
  },
  {
    question: "13. ¿Es seguro importar un coche desde Alemania sin viajar allí?",
    answer: "El proceso puede gestionarse a distancia mediante reportes fotográficos, vídeos, informes técnicos y acompañamiento durante la operación.",
  },
  {
    question: "14. ¿Por qué elegir Premium German Cars?",
    answer: "El servicio incluye búsqueda, revisión del vendedor y del vehículo, transporte y gestión de los trámites necesarios para importar desde Alemania.",
  },
];

export const blogIndexJsonLd = createGraph([
  createWebPageSchema({
    type: "CollectionPage",
    url: blogUrl,
    name: "Blog Premium German Cars | Importación de coches desde Alemania",
    description:
      "Actualidad, protocolos de importación y análisis estratégico del mercado automotriz alemán para clientes de Premium German Cars.",
    breadcrumbId: `${blogUrl}#breadcrumb`,
  }),
  createBreadcrumbSchema({
    url: blogUrl,
    items: [
      { name: "Inicio", url: `${SITE_URL}/` },
      { name: "Blog", url: blogUrl },
    ],
  }),
]);

export const faqPageJsonLd = createGraph([
  createWebPageSchema({
    url: faqUrl,
    name: "Preguntas frecuentes sobre importar coche de Alemania | PGC",
    description:
      "Respuestas claras sobre importación de coches desde Alemania: impuestos, documentación, transporte, plazos y riesgos.",
    breadcrumbId: `${faqUrl}#breadcrumb`,
    mainEntityId: `${faqUrl}#faq`,
  }),
  createBreadcrumbSchema({
    url: faqUrl,
    items: [
      { name: "Inicio", url: `${SITE_URL}/` },
      { name: "Preguntas frecuentes", url: faqUrl },
    ],
  }),
  createFaqSchema({ url: faqUrl, faqs: faqPageItems }),
]);
