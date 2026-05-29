import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const distDir = join(projectRoot, "dist");
const rootHtmlPath = join(distDir, "index.html");

const siteUrl = "https://www.premiumgermancars.com";

const routes = [
  {
    path: "/",
    outputPath: rootHtmlPath,
    title: "Premium German Cars | Importación de Coches Premium desde Alemania",
    description:
      "Importación de coches premium desde Alemania con vehículos certificados, gestión integral y entrega llave en mano en España.",
    canonical: `${siteUrl}/`,
    jsonLd: {
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
    },
    body: `
      <div class="min-h-screen bg-black text-white">
        <main class="px-4 py-16 sm:px-6">
          <section class="mx-auto max-w-5xl">
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold-400">Excelencia alemana</p>
            <h1 class="mb-6 font-serif text-4xl font-bold text-white md:text-6xl">Importación de coches premium desde Alemania</h1>
            <p class="max-w-2xl text-lg leading-relaxed text-gray-300">Acceso directo al mercado alemán. Vehículos certificados, gestión integral y entrega llave en mano en España.</p>
          </section>
        </main>
      </div>
    `,
  },
  {
    path: "/calculadora-impuesto-matriculacion",
    outputPath: join(distDir, "calculadora-impuesto-matriculacion", "index.html"),
    title: "Calculadora Impuesto de Matriculación 2025 | Premium German Cars",
    description:
      "Calcula gratis el impuesto de matriculación para coches importados de Alemania. Actualizado 2025, preciso y con IA.",
    canonical: `${siteUrl}/calculadora-impuesto-matriculacion`,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: "Calculadora Impuesto de Matriculación",
          url: `${siteUrl}/calculadora-impuesto-matriculacion`,
          description:
            "Calcula el impuesto de matriculación para coches importados de Alemania. Gratuito y actualizado 2025.",
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
    },
    body: `
      <div class="min-h-screen bg-black text-white">
        <main class="px-4 py-16 sm:px-6">
          <article class="mx-auto max-w-5xl">
            <header class="mb-10">
              <h1 class="mb-4 font-serif text-4xl font-bold uppercase text-white md:text-6xl">Calculadora Impuesto de Matriculación</h1>
              <p class="max-w-3xl text-lg leading-relaxed text-gray-300">Calcula gratis el impuesto de matriculación para coches importados de Alemania. Herramienta basada en tramos de CO2 y tablas de depreciación BOE.</p>
            </header>
            <section class="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 class="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-gold-400">Cómo calcula esta herramienta</h2>
              <ol class="space-y-3 text-sm text-gray-300">
                <li>1. Determina el tramo de impuesto por emisiones de CO2: 0%, 4,75%, 9,75% o 14,75%.</li>
                <li>2. Aplica el coeficiente de depreciación BOE según antigüedad en meses.</li>
                <li>3. Calcula el impuesto estimado sobre la base imponible.</li>
              </ol>
            </section>
            <section class="mb-8 rounded-3xl border border-gold-500/30 bg-black p-6">
              <p class="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">Impuesto Estimado</p>
              <p class="mb-6 font-serif text-5xl font-bold text-white">2.144€</p>
              <dl class="grid gap-3 text-sm text-gray-300">
                <div class="flex justify-between gap-4"><dt>Tramo aplicado</dt><dd class="text-gold-400">4,75%</dd></div>
                <div class="flex justify-between gap-4"><dt>Reducción aplicada</dt><dd>-33%</dd></div>
              </dl>
              <div class="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
                <p class="mb-1 text-sm font-medium text-white">¿Quieres que te avisemos cuando haya coches similares disponibles en Alemania?</p>
                <p class="text-xs text-gray-500">Sin spam. Solo oportunidades reales del mercado alemán.</p>
              </div>
            </section>
            <section class="text-gray-300">
              <h2 class="mb-4 font-serif text-3xl font-bold text-gold-400">Impuesto de matriculación: diésel o gasolina</h2>
              <p>El impuesto no depende del combustible, sino de las emisiones de CO2 homologadas y del valor venal BOE del vehículo.</p>
            </section>
          </article>
        </main>
      </div>
    `,
  },
];

function removeManagedHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel=["']alternate["'][^>]*hreflang=["']es-ES["'][^>]*>\s*/gi, "")
    .replace(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");
}

function renderHead(route) {
  const jsonLd = JSON.stringify(route.jsonLd).replace(/</g, "\\u003c");

  return `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonical}" />
    <link rel="alternate" hreflang="es-ES" href="${route.canonical}" />
    <meta property="og:site_name" content="Premium German Cars" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:image" content="${siteUrl}/og.jpg" />
    <meta property="og:image:alt" content="${route.title}" />
    <meta property="og:locale" content="es_ES" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@premiumgermancars" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${siteUrl}/og.jpg" />
    <script type="application/ld+json">${jsonLd}</script>
  `;
}

function renderHtml(baseHtml, route) {
  const htmlWithHead = removeManagedHeadTags(baseHtml).replace("</head>", `${renderHead(route)}\n  </head>`);

  return htmlWithHead.replace('<div id="root"></div>', `<div id="root">${route.body}</div>`);
}

const baseHtml = await readFile(rootHtmlPath, "utf8");

await Promise.all(
  routes.map(async (route) => {
    await mkdir(dirname(route.outputPath), { recursive: true });
    await writeFile(route.outputPath, renderHtml(baseHtml, route), "utf8");
    console.log(`Prerendered ${route.path}`);
  })
);
