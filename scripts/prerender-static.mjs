import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  organizationReference,
  SITE_URL,
} from "../src/lib/structuredData.mjs";
import {
  BLOG_ARTICLES,
  getBlogArticleJsonLd,
} from "../src/data/blogArticleSchemas.mjs";
import {
  calculatorJsonLd,
  homeJsonLd,
  importacionJsonLd,
  revisionUnidadJsonLd,
} from "../src/data/corePageSchemas.mjs";
import {
  CAR_PAGE_METADATA,
  getCarPageJsonLd,
} from "../src/data/carPageSchemas.mjs";
import {
  blogIndexJsonLd,
  faqPageJsonLd,
} from "../src/data/structuralPageSchemas.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const distDir = join(projectRoot, "dist");
const rootHtmlPath = join(distDir, "index.html");
const sitemapPath = join(projectRoot, "public", "sitemap.xml");

const siteUrl = SITE_URL;
const defaultImage = `${siteUrl}/og.jpg`;

const privacyPolicyPrerenderSections = Object.freeze([
  {
    heading: "Responsable y contacto",
    paragraphs: [
      "Premium German Cars, NIF B39923112, con domicilio en Cambrils 43850, Tarragona, es el responsable del tratamiento. El canal de contacto para ejercer derechos ante PGC es info@premiumgermancars.com.",
    ],
  },
  {
    heading: "Finalidad y Asistente PGC",
    paragraphs: [
      "Esta política informa sobre el tratamiento de datos personales en solicitudes de información, presupuestos, importación, revisión, fiscalidad y matriculación de vehículos.",
      "El Asistente PGC puede preparar una estimación fiscal reducida mediante una GPT Action conectada a /api/vehicle-tax-estimate-action. El cálculo es orientativo y no sustituye una liquidación oficial ni asesoramiento profesional.",
    ],
  },
  {
    heading: "OpenAI, GPT Action y minimización",
    paragraphs: [
      [
        "OpenAI/ChatGPT procesa la conversación conforme a sus propias políticas y controles. Premium German Cars recibe únicamente el DTO fiscal estructurado que la GPT Action transmite al endpoint de PGC, y no controla toda la conservación interna de las conversaciones o datos dentro de ChatGPT/OpenAI. Para consultar, gestionar o solicitar la supresión de datos conservados exclusivamente por OpenAI, el usuario debe utilizar los controles y canales oficiales de OpenAI, sin que esta política anticipe un resultado concreto de esas solicitudes: ",
        { href: "https://openai.com/policies/privacy-policy/", text: "política de privacidad de OpenAI" },
        " y ",
        { href: "https://privacy.openai.com/", text: "portal de privacidad de OpenAI" },
        ".",
      ],
      "La Action debe usar identificadores opacos y enviar solo datos técnicos y fiscales necesarios: vehículo, fechas, precio o Valor BOE, CO2, clasificación de vendedor/comprador/documento y destino territorial. No debe enviar nombres, DNI, email, teléfono, dirección, IBAN, firma, VIN completo, matrícula, documentos, OCR, texto bruto, credenciales ni secretos.",
    ],
  },
  {
    heading: "Derechos y reclamaciones",
    paragraphs: [
      [
        "El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación, portabilidad y, cuando proceda, a no ser objeto de decisiones individuales automatizadas escribiendo a info@premiumgermancars.com. También puede presentar una reclamación ante la ",
        { href: "https://www.aepd.es", text: "Agencia Española de Protección de Datos (AEPD)" },
        ".",
      ],
    ],
  },
]);

const carRoutes = CAR_PAGE_METADATA.map((car) => ({
  path: car.path,
  title: car.title,
  description: car.seoDescription,
  h1: `${car.make} ${car.model}`,
  eyebrow: car.status === "Vendido" ? "Vehículo vendido" : "Vehículo disponible",
  image: `${siteUrl}${car.image}`,
  jsonLd: getCarPageJsonLd(car.slug),
}));

const articleRoutes = BLOG_ARTICLES.map((article) => ({
  path: article.path,
  title: article.title,
  description: article.description,
  h1: article.headline,
  image: article.image,
  article: true,
  eyebrow: "Blog Premium",
  jsonLd: getBlogArticleJsonLd(article.path),
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
    path: "/revision-unidad-alemania",
    title: "Revisión de coches en Alemania antes de comprar | PGC",
    description:
      "¿Has encontrado un coche en Alemania? Analizamos el anuncio, vendedor, impuestos, garantía, documentación y coste probable antes de que pagues.",
    h1: "Revisión de una unidad antes de comprarla en Alemania",
    eyebrow: "Análisis previo a la compra",
    image: `${siteUrl}/bmwconcesionario2-1280.webp`,
    jsonLd: revisionUnidadJsonLd,
  },
  {
    path: "/calculadora-impuesto-matriculacion",
    title: "Calculadora Impuesto Matriculación 2026 | Coche Importado Alemania",
    description:
      "Estima el impuesto de matriculacion de un coche usado importado con Valor BOE, primera matriculacion, CO2, territorio y base imponible fiscal.",
    h1: "Calculadora de impuesto de matriculación para coches importados",
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
    jsonLd: faqPageJsonLd,
  },
  {
    path: "/blog",
    title: "Blog Premium German Cars | Importación de coches desde Alemania",
    description:
      "Actualidad, protocolos de importación y análisis estratégico del mercado automotriz alemán para clientes de Premium German Cars.",
    h1: "Blog Premium",
    eyebrow: "Guías y actualidad",
    jsonLd: blogIndexJsonLd,
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
    description: "Información sobre tratamiento de datos personales, Asistente PGC y GPT Action.",
    h1: "Política de Privacidad",
    eyebrow: "Privacidad",
    noIndex: true,
    prerenderSections: privacyPolicyPrerenderSections,
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


function webPageJsonLd(route) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url: route.canonical,
    inLanguage: "es-ES",
    publisher: organizationReference(),
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
  const jsonLd = route.jsonLd ?? (route.canonical ? webPageJsonLd(route) : undefined);
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

function renderInlineContent(content) {
  const items = Array.isArray(content) ? content : [content];
  return items
    .map((item) => {
      if (typeof item === "string") return escapeHtml(item);
      return `<a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer" class="text-gold-400 underline underline-offset-4 hover:text-white">${escapeHtml(item.text)}</a>`;
    })
    .join("");
}

function renderPrerenderSections(route) {
  if (!Array.isArray(route.prerenderSections) || route.prerenderSections.length === 0) return "";

  const sections = route.prerenderSections
    .map((section) => {
      const paragraphs = section.paragraphs
        .map((paragraph) => `<p class="text-sm leading-relaxed text-gray-300">${renderInlineContent(paragraph)}</p>`)
        .join("\n              ");

      return `<section class="space-y-3 border-t border-white/10 pt-6">
              <h2 class="text-xs font-bold uppercase tracking-[0.24em] text-white">${escapeHtml(section.heading)}</h2>
              ${paragraphs}
            </section>`;
    })
    .join("\n            ");

  return `
            <div class="mt-10 space-y-8">${sections}
            </div>`;
}

function renderBody(route) {
  const Wrapper = route.article ? "article" : "section";

  return `
      <div class="min-h-screen bg-black text-white">
        <main class="px-4 py-16 sm:px-6">
          <${Wrapper} class="mx-auto max-w-5xl">
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold-400">${escapeHtml(route.eyebrow ?? "Premium German Cars")}</p>
            <h1 class="mb-6 font-serif text-4xl font-bold text-white md:text-6xl">${escapeHtml(route.h1 ?? route.title)}</h1>
            <p class="max-w-3xl text-lg leading-relaxed text-gray-300">${escapeHtml(route.description)}</p>${renderPrerenderSections(route)}
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
