import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const distDir = join(projectRoot, "dist");
const rootHtmlPath = join(distDir, "index.html");
const sitemapPath = join(projectRoot, "public", "sitemap.xml");

const siteUrl = "https://www.premiumgermancars.com";
const defaultImage = `${siteUrl}/og.jpg`;

const autoDealerJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Premium German Cars",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description:
    "Importación de coches premium desde Alemania con garantía, historial certificado y entrega llave en mano en España.",
  image: `${siteUrl}/amggtr-mobile.webp`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ES",
  },
  areaServed: {
    "@type": "Country",
    name: "Spain",
  },
  inLanguage: "es-ES",
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Premium German Cars",
      url: siteUrl,
      logo: `${siteUrl}/logoPGC.svg`,
    },
    {
      "@type": "AutoDealer",
      name: "Premium German Cars",
      url: siteUrl,
      logo: `${siteUrl}/logoPGC.svg`,
      image: `${siteUrl}/amggtr-mobile.webp`,
      description:
        "Importacion de coches premium desde Alemania con busqueda, verificacion, transporte, ITV, matriculacion y entrega llave en mano en Espana.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
      areaServed: ["Espana", "Cambrils", "Tarragona", "Cataluna"],
      inLanguage: "es-ES",
    },
    {
      "@type": "Service",
      name: "Importacion de coches premium desde Alemania a Espana",
      description:
        "Servicio de busqueda, verificacion, transporte, ITV, matriculacion y entrega llave en mano de coches premium importados desde Alemania.",
      provider: {
        "@type": "Organization",
        name: "Premium German Cars",
        url: siteUrl,
      },
      areaServed: ["Espana", "Cambrils", "Tarragona", "Cataluna"],
      serviceType: "Importacion de vehiculos",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
      ],
    },
  ],
};

const importacionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Importar coche de Alemania a España",
          item: `${siteUrl}/importacion-coches-alemania`,
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
        url: siteUrl,
        logo: `${siteUrl}/logoPGC.svg`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "ES",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        [
          "¿Cuánto cuesta importar un coche de Alemania a España?",
          "Depende del precio del vehículo, transporte, ITV, tasas, gestoría, emisiones de CO2, antigüedad y posible impuesto de matriculación. Por eso conviene calcular el coste total antes de reservar una unidad.",
        ],
        [
          "¿Qué impuestos se pagan al matricular un coche alemán en España?",
          "Puede aplicarse impuesto de matriculación según emisiones de CO2, además de tasas y otros costes administrativos. Cada caso debe revisarse con datos actualizados del vehículo.",
        ],
        [
          "¿Merece la pena importar un BMW, Audi o Mercedes desde Alemania?",
          "Puede merecer la pena si la unidad tiene buen historial, equipamiento interesante, precio coherente y costes de importación controlados. No todos los coches alemanes son una buena compra.",
        ],
        [
          "¿Podéis revisar un coche que he encontrado en Mobile.de?",
          "Sí. Podemos ayudarte a valorar una unidad concreta antes de pagar una señal, revisando anuncio, vendedor, documentación disponible, precio, kilometraje y viabilidad de importación.",
        ],
        [
          "¿Cuánto tarda importar y matricular un coche de Alemania?",
          "El plazo depende de la unidad, la documentación, el transporte, la ITV y la matriculación. Es mejor valorar cada operación individualmente para evitar expectativas poco realistas.",
        ],
        [
          "¿Qué documentación necesita un coche alemán para matricularse en España?",
          "Se necesita documentación alemana correcta, factura o contrato, datos técnicos y documentación necesaria para ITV y matriculación. Antes de comprar, conviene verificar que todo esté disponible.",
        ],
      ].map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: {
          "@type": "Answer",
          text,
        },
      })),
    },
  ],
};

const calculatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Calculadora Diésel o Gasolina Impuesto de Matriculación",
      url: `${siteUrl}/calculadora-impuesto-matriculacion`,
      description:
        "Calcula si paga más impuesto de matriculación un coche diésel o gasolina según CO2, valor, antigüedad y tablas BOE 2026.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "es-ES",
      isAccessibleForFree: true,
      dateModified: "2026-04-05",
      featureList: [
        "Cálculo por tramos de emisiones CO2",
        "Aplicación de depreciación BOE por meses",
        "Estimación del impuesto de matriculación en España",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      author: {
        "@type": "Organization",
        name: "Premium German Cars",
        url: siteUrl,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Diésel o gasolina paga más impuesto de matriculación?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depende del CO2 homologado. El impuesto no discrimina por combustible; paga más el coche que emite más.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo calcular el impuesto según CO2?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Se aplica el tramo de emisiones CO2 y la depreciación BOE sobre el valor venal del vehículo.",
          },
        },
      ],
    },
  ],
};

const carRoutes = [
  {
    path: "/car/bmw-serie-1-116i",
    title: "BMW Serie 1 116i importado de Alemania | Premium German Cars",
    description:
      "BMW Serie 1 116i importado de Alemania con historial verificado, kilómetros certificados y opción de buscar unidades similares de reestreno.",
    h1: "BMW Serie 1 116i",
    eyebrow: "Vehículo disponible",
    image: `${siteUrl}/bmwconcesionario.webp`,
  },
  {
    path: "/car/audi-rs6-avant",
    title: "Audi RS6 Avant en venta | Importado desde Alemania",
    description:
      "Compra Audi RS6 Avant importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.",
    h1: "Audi RS6 Avant",
    eyebrow: "Vehículo vendido",
    image: `${siteUrl}/rs6dos.webp`,
  },
  {
    path: "/car/mercedes-benz-c63-amg",
    title: "Mercedes-Benz C63 AMG en venta | Importado desde Alemania",
    description:
      "Compra Mercedes-Benz C63 AMG importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.",
    h1: "Mercedes-Benz C63 AMG",
    eyebrow: "Vehículo vendido",
    image: `${siteUrl}/mercedes1.webp`,
  },
  {
    path: "/car/audi-a3-sportback-35-tfsi",
    title: "Audi A3 Sportback 35 TFSI en venta | Importado desde Alemania",
    description:
      "Compra Audi A3 Sportback 35 TFSI importado desde Alemania. Kilómetros certificados, historial verificado y entrega llave en mano en España.",
    h1: "Audi A3 Sportback 35 TFSI",
    eyebrow: "Vehículo vendido",
    image: `${siteUrl}/audi1.webp`,
  },
];

const articleRoutes = [
  {
    path: "/blog/certificado-conformidad-coc-itv-matriculacion",
    title: "Certificado de Conformidad (COC): Qué es y cómo conseguirlo | PGC",
    description:
      "Evita la homologación individual. Guía completa sobre el Certificado de Conformidad (COC) para matricular coches de Alemania en España sin errores.",
    h1: "Certificado de Conformidad (COC): guía para una matriculación sin errores",
  },
  {
    path: "/blog/importar-coche-aleman-guia-importacion-alemania",
    title: "¿Por qué Importar de Alemania es la Mejor Opción en 2026? | PGC",
    description:
      "Descubre por qué la importación de coches desde Alemania es la decisión más inteligente en 2026. Calidad, ahorro real y garantía oficial con el método PGC.",
    h1: "Importación de Alemania: por qué es la mejor forma de comprar tu coche premium en 2026",
  },
  {
    path: "/blog/revision-coche-alemania-protocolo-auditoria",
    title: "Protocolo de Auditoría Técnica en Alemania | Premium German Cars",
    description:
      "Revisión de coches en Alemania: nuestro protocolo incluye historial digital oficial, medición de pintura y test en Autobahn para una importación 100% segura.",
    h1: "Protocolo de auditoría técnica de Premium German Cars",
  },
  {
    path: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
    title: "Coste real de importar coche de Alemania en 2026 | PGC",
    description:
      "Transporte, impuestos, fiscalidad y ejemplos reales. Descubre el coste total antes de comprar y evita sorpresas.",
    h1: "Cuánto cuesta realmente importar un coche de Alemania en 2026",
  },
  {
    path: "/blog/que-motor-elegir-importar-alemania-2026",
    title: "Diésel o Gasolina en 2026: Qué Motor Conviene Según Tu Uso | Guía PGC",
    description:
      "Guía comparativa 2026 de diésel vs gasolina: cuándo conviene cada motor, costes fiscales y cómo decidir según tu uso real.",
    h1: "Qué motor elegir al importar de Alemania en 2026",
  },
  {
    path: "/blog/guia-calculo-impuesto-matriculacion-boe-2025",
    title: "Guía: Cómo calcular el impuesto de matriculación BOE 2025 | Premium German Cars",
    description:
      "Aprende a usar nuestra calculadora con IA para obtener valores BOE exactos y calcular la depreciación real mes a mes de tu coche de importación.",
    h1: "Cómo calcular el impuesto de matriculación según el BOE 2025",
  },
  {
    path: "/blog/bmw-alpina-nueva-era-lujo-aleman",
    title: "BMW y Alpina: El futuro del Lujo Automotriz en 2026 | PGC",
    description:
      "Análisis de la integración de Alpina en BMW Group. Qué significa para el mercado de importación y por qué las unidades pre-2026 son una inversión clave.",
    h1: "BMW y Alpina: una nueva era en el lujo automotriz alemán",
  },
  {
    path: "/blog/5-riesgos-importar-coche-alemania",
    title: "Importar coche de Alemania: 5 riesgos reales en 2026 | PGC",
    description:
      "Conoce los 5 riesgos más frecuentes al importar un coche de Alemania y cómo evitarlos con un protocolo de verificación profesional.",
    h1: "Los 5 riesgos más comunes al importar un coche de Alemania",
  },
  {
    path: "/blog/como-importar-coche-alemania",
    title: "Guía 2026: Importar Coche de Alemania a España sin Sorpresas | PGC",
    description:
      "Protocolo experto 2026 para la importación de vehículos premium. Aprenda a gestionar fiscalidad, emisiones de CO2 y logística profesional con Premium German Cars.",
    h1: "Importar un coche de Alemania sin sorpresas fiscales",
  },
  {
    path: "/blog/mejores-modelos-importar-alemania-2026",
    title: "Mejores coches para importar de Alemania en 2026 | Guía PGC",
    description:
      "Modelos con alta demanda en España, baja depreciación y buena reventa. Criterio real para elegir sin perder dinero.",
    h1: "Mejores coches para importar de Alemania en 2026",
  },
  {
    path: "/blog/motores-bmw-en-mercedes-2027",
    title: "¿Motores BMW en Mercedes-Benz? Análisis del Pacto Alemán | Premium German Cars",
    description:
      "Analizamos el rumor del siglo: ¿Llevarán los futuros Mercedes motores BMW? Qué significa para el valor de reventa y la inversión en coches premium.",
    h1: "¿Motores BMW en Mercedes-Benz? Análisis del pacto alemán",
  },
  {
    path: "/blog/bmw-reestreno-alemania-2026",
    title: "BMW de Reestreno en Alemania 2026: Guía de Compra | Premium German Cars",
    description:
      "Claves para importar un BMW de reestreno desde Alemania en 2026: garantía oficial, tecnología Live Cockpit y cómo evitar coches de flota.",
    h1: "BMW de reestreno en Alemania 2026",
  },
  {
    path: "/blog/coche-segunda-mano-reus-tarragona",
    title: "Coches de segunda mano en Reus y Tarragona | Premium German Cars",
    description:
      "¿Buscas un coche de ocasión en Tarragona o Reus? Descubre por qué la importación de reestreno premium en Cambrils es tu mejor opción.",
    h1: "Coches de segunda mano en Reus y Tarragona",
  },
].map((route) => ({
  ...route,
  article: true,
  eyebrow: "Blog Premium",
}));

const routes = [
  {
    path: "/",
    title: "Importacion de coches premium desde Alemania a Espana | Premium German Cars",
    description:
      "Importa tu coche premium desde Alemania con verificacion, transporte, ITV y matriculacion en Espana. Busqueda personalizada y entrega llave en mano.",
    h1: "Importacion de coches premium desde Alemania a Espana",
    eyebrow: "Excelencia alemana",
    image: `${siteUrl}/amggtr-mobile.webp`,
    jsonLd: homeJsonLd,
  },
  {
    path: "/importacion-coches-alemania",
    title: "Importar coche de Alemania a España | Premium German Cars",
    description:
      "Importa tu coche premium desde Alemania con búsqueda, verificación, transporte, ITV y matriculación. Servicio en España desde Cambrils.",
    h1: "Importar coche de Alemania a España con gestión integral",
    eyebrow: "Servicio de importación premium",
    jsonLd: importacionJsonLd,
  },
  {
    path: "/calculadora-impuesto-matriculacion",
    title: "Diésel o gasolina: impuesto de matriculación 2026 | PGC",
    description:
      "Calcula si paga más impuesto de matriculación un coche diésel o gasolina según CO2, valor, antigüedad y tablas BOE 2026.",
    h1: "Diésel o gasolina: calcula el impuesto de matriculación 2026",
    eyebrow: "Herramienta gratuita",
    image: `${siteUrl}/calculadora-impuesto-matriculacion-2026.webp`,
    jsonLd: calculatorJsonLd,
  },
  {
    path: "/preguntas-frecuentes",
    title: "Preguntas frecuentes sobre importar coche de Alemania | PGC",
    description:
      "Respuestas claras sobre importación de coches desde Alemania: impuestos, documentación, transporte, plazos y riesgos.",
    h1: "Preguntas frecuentes sobre importar coche de Alemania",
    eyebrow: "Centro de ayuda",
  },
  {
    path: "/blog",
    title: "Blog Premium German Cars | Importación de coches desde Alemania",
    description:
      "Actualidad, protocolos de importación y análisis estratégico del mercado automotriz alemán para clientes de Premium German Cars.",
    h1: "Blog Premium",
    eyebrow: "Guías y actualidad",
  },
  ...articleRoutes,
  ...carRoutes,
  {
    path: "/aviso-legal",
    title: "Aviso Legal | Premium German Cars",
    description: "Información legal y condiciones de uso de Premium German Cars.",
    h1: "Aviso Legal",
    eyebrow: "Información legal",
    noIndex: true,
  },
  {
    path: "/politica-privacidad",
    title: "Política de Privacidad | Premium German Cars",
    description: "Información sobre el tratamiento de datos personales.",
    h1: "Política de Privacidad",
    eyebrow: "Privacidad",
    noIndex: true,
  },
  {
    path: "/gracias",
    title: "Gracias | Premium German Cars",
    description: "Hemos recibido tu solicitud. Te indicamos el siguiente paso para avanzar con tu compra o búsqueda.",
    h1: "Solicitud recibida",
    eyebrow: "Gracias",
    noIndex: true,
  },
].map(normalizeRoute);

const notFoundRoute = normalizeRoute({
  path: "/404",
  title: "404 | Página no encontrada",
  description: "La URL solicitada no existe.",
  h1: "404 - Página no encontrada",
  eyebrow: "No encontrado",
  noIndex: true,
  canonical: null,
  outputPath: join(distDir, "404.html"),
});

function normalizeRoute(route) {
  const canonical =
    route.canonical === null
      ? undefined
      : route.canonical ?? `${siteUrl}${route.path === "/" ? "/" : route.path}`;

  return {
    ...route,
    canonical,
    image: route.image ?? defaultImage,
    outputPath: route.outputPath ?? outputPathFor(route.path),
  };
}

function outputPathFor(routePath) {
  if (routePath === "/") {
    return rootHtmlPath;
  }

  return join(distDir, ...routePath.slice(1).split("/"), "index.html");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/<\/script/gi, "<\\/script");
}

function articleJsonLd(route) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: route.h1,
    description: route.description,
    image: [route.image],
    inLanguage: "es-ES",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": route.canonical,
    },
    author: {
      "@type": "Organization",
      name: "Premium German Cars",
    },
    publisher: {
      "@type": "Organization",
      name: "Premium German Cars",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logoPGC.svg`,
      },
    },
  };
}

function webPageJsonLd(route) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url: route.canonical,
    inLanguage: "es-ES",
    publisher: {
      "@type": "Organization",
      name: "Premium German Cars",
    },
  };
}

function removeManagedHeadTags(html) {
  return html
    .replace(/<title[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name=["']googlebot["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel=["']alternate["'][^>]*hreflang=["']es-ES["'][^>]*>\s*/gi, "")
    .replace(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");
}

function renderHead(route) {
  const robotsContent = route.noIndex ? "noindex, nofollow" : "index, follow";
  const ogType = route.article ? "article" : "website";
  const jsonLd = route.jsonLd ?? (route.article ? articleJsonLd(route) : route.canonical ? webPageJsonLd(route) : undefined);
  const canonicalTags = route.canonical
    ? `
    <link data-rh="true" rel="canonical" href="${escapeHtml(route.canonical)}" />
    <link data-rh="true" rel="alternate" hreflang="es-ES" href="${escapeHtml(route.canonical)}" />`
    : "";
  const jsonLdTag = jsonLd
    ? `
    <script data-rh="true" type="application/ld+json">${safeJsonLd(jsonLd)}</script>`
    : "";

  return `
    <title data-rh="true">${escapeHtml(route.title)}</title>
    <meta data-rh="true" name="description" content="${escapeHtml(route.description)}" />
    <meta data-rh="true" name="robots" content="${robotsContent}" />
    <meta data-rh="true" name="googlebot" content="${robotsContent}" />${canonicalTags}
    <meta data-rh="true" property="og:site_name" content="Premium German Cars" />
    <meta data-rh="true" property="og:type" content="${ogType}" />
    <meta data-rh="true" property="og:title" content="${escapeHtml(route.title)}" />
    <meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}" />
    ${route.canonical ? `<meta data-rh="true" property="og:url" content="${escapeHtml(route.canonical)}" />` : ""}
    <meta data-rh="true" property="og:image" content="${escapeHtml(route.image)}" />
    <meta data-rh="true" property="og:image:alt" content="${escapeHtml(route.title)}" />
    <meta data-rh="true" property="og:locale" content="es_ES" />
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:site" content="@premiumgermancars" />
    <meta data-rh="true" name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta data-rh="true" name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta data-rh="true" name="twitter:image" content="${escapeHtml(route.image)}" />${jsonLdTag}
  `;
}

function renderBody(route) {
  const Wrapper = route.article ? "article" : "section";

  return `
      <div class="min-h-screen bg-black text-white">
        <main class="px-4 py-16 sm:px-6">
          <${Wrapper} class="mx-auto max-w-5xl">
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold-400">${escapeHtml(route.eyebrow ?? "Premium German Cars")}</p>
            <h1 class="mb-6 font-serif text-4xl font-bold text-white md:text-6xl">${escapeHtml(route.h1 ?? route.title)}</h1>
            <p class="max-w-3xl text-lg leading-relaxed text-gray-300">${escapeHtml(route.description)}</p>
          </${Wrapper}>
        </main>
      </div>
    `;
}

function renderHtml(baseHtml, route) {
  const htmlWithHead = removeManagedHeadTags(baseHtml).replace("</head>", `${renderHead(route)}\n  </head>`);
  return htmlWithHead.replace('<div id="root"></div>', `<div id="root">${renderBody(route)}</div>`);
}

async function assertSitemapCoverage() {
  const sitemapXml = await readFile(sitemapPath, "utf8");
  const sitemapPaths = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)).map(([, loc]) => new URL(loc).pathname);
  const routePaths = new Set(routes.map((route) => route.path));
  const missingRoutes = sitemapPaths.filter((path) => !routePaths.has(path));

  if (missingRoutes.length > 0) {
    throw new Error(`Missing prerender routes for sitemap URLs: ${missingRoutes.join(", ")}`);
  }
}

await assertSitemapCoverage();

const baseHtml = await readFile(rootHtmlPath, "utf8");

await Promise.all(
  [...routes, notFoundRoute].map(async (route) => {
    await mkdir(dirname(route.outputPath), { recursive: true });
    await writeFile(route.outputPath, renderHtml(baseHtml, route), "utf8");
    console.log(`Prerendered ${route.path}`);
  })
);
