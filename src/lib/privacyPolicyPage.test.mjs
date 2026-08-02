import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const readSource = (sourcePath) => readFileSync(new URL("../../" + sourcePath, import.meta.url), "utf8");
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const policySource = readSource("src/pages/Legal/PoliticaPrivacidad.tsx");
const policyText = normalize(policySource);

test("politica de privacidad publica cubre Asistente PGC y GPT Action sin promesas absolutas", () => {
  assert.match(policySource, /canonical="https:\/\/www\.premiumgermancars\.com\/politica-privacidad"/);
  assert.match(policySource, /noIndex=\{true\}/);
  assert.match(policySource, /Información sobre tratamiento de datos personales, Asistente PGC y GPT Action\./);

  for (const expected of [
    "Asistente PGC",
    "GPT Action",
    "/api/vehicle-tax-estimate-action",
    "OpenAI",
    "Vercel",
    "minimización",
    "Agencia Española de Protección de Datos",
    "https://www.aepd.es",
    "https://openai.com/policies/privacy-policy/",
    "https://privacy.openai.com/",
  ]) {
    assert.ok(policySource.includes(expected), "falta contenido esperado: " + expected);
  }

  for (const forbidden of [
    "anonimato absoluto",
    "almacenamiento cero",
    "no existe ningun tratamiento",
    "no existe ningún tratamiento",
    "no se registra nada",
    "no guardamos nada",
  ]) {
    assert.ok(!policyText.includes(normalize(forbidden)), "promesa absoluta prohibida: " + forbidden);
  }
});

test("politica distingue conversacion OpenAI de DTO recibido por PGC", () => {
  for (const expected of [
    "OpenAI/ChatGPT procesa la conversación conforme a sus propias políticas y controles",
    "Premium German Cars recibe únicamente el DTO fiscal estructurado que la GPT Action transmite al endpoint de PGC",
    "no controla toda la conservación interna de las conversaciones o datos dentro de ChatGPT/OpenAI",
    "controles y canales oficiales de OpenAI",
    "sin que esta política anticipe un resultado concreto de esas solicitudes",
  ]) {
    assert.ok(policySource.includes(expected), "falta distincion OpenAI/PGC: " + expected);
  }

  for (const forbidden of [
    "Premium German Cars controla toda la conservación interna de ChatGPT",
    "Premium German Cars puede borrar directamente información almacenada exclusivamente por OpenAI",
    "PGC puede borrar directamente datos almacenados exclusivamente por OpenAI",
    "garantiza automáticamente una supresión",
  ]) {
    assert.ok(!policyText.includes(normalize(forbidden)), "afirmacion prohibida sobre control/supresion OpenAI: " + forbidden);
  }
});

test("enlaces externos con target blank usan rel seguro", () => {
  const externalLinks = [...policySource.matchAll(/<a\s+[^>]*href="https:\/\/[^"]+"[^>]*>/g)].map(([link]) => link);
  assert.ok(externalLinks.length >= 3, "deben existir enlaces externos oficiales de AEPD y OpenAI");

  for (const link of externalLinks.filter((value) => value.includes('target="_blank"'))) {
    assert.match(link, /rel="noopener noreferrer"/, "enlace target blank sin rel seguro: " + link);
  }
});

test("politica de privacidad mantiene minimizacion de la Action y evita datos sensibles", () => {
  for (const forbidden of [
    "VIN completo",
    "matrícula",
    "documentos",
    "binarios",
    "OCR",
    "texto bruto",
    "fragmentos documentales",
    "credenciales",
    "secretos",
  ]) {
    assert.ok(policySource.includes(forbidden), "la politica debe excluir " + forbidden);
  }

  const apiPaths = [...policySource.matchAll(/\/api\/[A-Za-z0-9/_-]+/g)].map(([apiPath]) => apiPath);
  assert.deepEqual([...new Set(apiPaths)], ["/api/vehicle-tax-estimate-action"]);
  assert.doesNotMatch(policySource, /VEHICLE_TAX_ESTIMATE_API_KEY|sk-[A-Za-z0-9_-]+|Bearer\s+[A-Za-z0-9._~-]+/);
});

test("ruta, footer y prerender exponen la politica de privacidad de forma coherente", () => {
  const appSource = readSource("src/App.tsx");
  const footerSource = readSource("src/components/Footer.tsx");
  const prerenderSource = readSource("scripts/prerender-static.mjs");
  const sitemapXml = readSource("public/sitemap.xml");

  assert.match(appSource, /path="\/politica-privacidad"/);
  assert.match(footerSource, /to="\/politica-privacidad"/);
  assert.match(prerenderSource, /path:\s*"\/politica-privacidad"/);
  assert.match(prerenderSource, /Información sobre tratamiento de datos personales, Asistente PGC y GPT Action\./);
  assert.match(prerenderSource, /noIndex:\s*true/);
  assert.ok(!sitemapXml.includes("/politica-privacidad"), "las paginas legales noindex no deben entrar en sitemap.xml");
});

test("fuente de prerender genera contenido legal visible para la politica", () => {
  const prerenderSource = readSource("scripts/prerender-static.mjs");

  for (const expected of [
    "prerenderSections: privacyPolicyPrerenderSections",
    "function renderPrerenderSections(route)",
    "Premium German Cars, NIF B39923112",
    "info@premiumgermancars.com",
    "OpenAI/ChatGPT procesa la conversación conforme a sus propias políticas y controles",
    "Premium German Cars recibe únicamente el DTO fiscal estructurado",
    "no controla toda la conservación interna de las conversaciones o datos dentro de ChatGPT/OpenAI",
    "https://www.aepd.es",
    "https://openai.com/policies/privacy-policy/",
    "https://privacy.openai.com/",
  ]) {
    assert.ok(prerenderSource.includes(expected), "falta contenido prerender esperado: " + expected);
  }

  assert.ok(prerenderSource.includes('<a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer"'));
  assert.doesNotMatch(prerenderSource, /display:\s*none|hidden|<script[^>]*>.*aepd|<noscript/i);
  assert.doesNotMatch(prerenderSource, /VEHICLE_TAX_ESTIMATE_API_KEY|sk-[A-Za-z0-9_-]+|Bearer\s+[A-Za-z0-9._~-]+/);
});

test("contrato documental apunta a la URL de privacidad sin tratarla aun como desplegada", () => {
  const contract = readSource("docs/asistente-pgc-action-contract.md");

  assert.match(contract, /https:\/\/www\.premiumgermancars\.com\/politica-privacidad/);
  assert.match(contract, /pendiente de commit, despliegue y verificacion HTTP 200/);
  assert.match(contract, /no considerarla operativa para publicar el GPT hasta que el cambio este committeado, desplegado y verificado con HTTP 200/);
  assert.doesNotMatch(contract, /Configuracion real del GPT, OpenAPI publicado, privacidad publica y Vercel en esta subfase/);
});
