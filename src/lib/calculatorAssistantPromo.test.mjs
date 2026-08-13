import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageSource = readFileSync(new URL("../pages/CalculadoraImpuestos.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../index.css", import.meta.url), "utf8");

const getPromoBlock = () => {
  const match = pageSource.match(/<button\s+[\s\S]*?className="pgc-assistant-promo[\s\S]*?<\/button>/);
  assert.ok(match, "promo assistant banner should be rendered as one clickable button");
  return match[0];
};

test("banner promocional muestra el texto principal solicitado", () => {
  const promoBlock = getPromoBlock();

  assert.match(promoBlock, /Prueba nuestra nueva calculadora mejorada/);
  assert.match(promoBlock, /Calcula IEDMT, ITP\/TPO, IVTM y tasa DGT con ayuda del Asistente PGC\./);
  assert.match(promoBlock, />NUEVO<|>NUEVO<\/span>/);
});

test("CTA del banner conserva destino y tracking actuales del Asistente PGC", () => {
  const promoBlock = getPromoBlock();
  const handlerMatch = pageSource.match(/const abrirAsistenteIA = \(\) => \{([\s\S]*?)\};\r?\n  const handleWhatsAppVerification/);

  assert.ok(handlerMatch, "assistant click handler should exist");
  assert.match(promoBlock, /onClick=\{abrirAsistenteIA\}/);
  assert.match(promoBlock, /Probar el Asistente PGC/);

  const handlerSource = handlerMatch[1];
  assert.match(handlerSource, /trackLeadEvent\("lead_followup_click"/);
  assert.match(handlerSource, /leadType: "calculadora-impuestos"/);
  assert.match(handlerSource, /channel: "assistant"/);
  assert.match(handlerSource, /pagePath: location\.pathname/);
  assert.match(handlerSource, /cta: "calculator_ai_assistant"/);
  assert.match(handlerSource, /\.\.\.commonAnalytics/);
  assert.match(handlerSource, /context: leadContext/);
  assert.match(handlerSource, /window\.open\("https:\/\/chatgpt\.com\/g\/g-6a1be090eecc8191861cf1da04ae2a44-pgc-asistente-de-valoracion-oficial", "_blank"\)/);
});

test("el banner no introduce otro H1", () => {
  const h1Count = pageSource.match(/<h1\b/g)?.length ?? 0;

  assert.equal(h1Count, 1);
  assert.doesNotMatch(getPromoBlock(), /<h1\b/);
});

test("el componente promocional es accesible mediante teclado", () => {
  const promoBlock = getPromoBlock();

  assert.match(promoBlock, /<button/);
  assert.match(promoBlock, /type="button"/);
  assert.match(promoBlock, /aria-label="Probar el Asistente PGC: Prueba nuestra nueva calculadora mejorada\./);
  assert.match(promoBlock, /focus-visible:ring-2/);
});

test("la animacion inicial respeta prefers-reduced-motion", () => {
  assert.match(cssSource, /@keyframes pgc-assistant-promo-enter/);
  assert.match(cssSource, /@media \(prefers-reduced-motion: no-preference\)[\s\S]*\.pgc-assistant-promo[\s\S]*animation: pgc-assistant-promo-enter/);
  assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.pgc-assistant-promo[\s\S]*animation: none/);
});

test("la animacion horizontal no puede provocar overflow movil por desplazamiento inicial", () => {
  const keyframesMatch = cssSource.match(/@keyframes pgc-assistant-promo-enter\s*\{([\s\S]*?)\n\}/);

  assert.ok(keyframesMatch, "promo animation keyframes should exist");
  assert.doesNotMatch(keyframesMatch[1], /translateX\(-18px\)/);

  const translateXMatch = keyframesMatch[1].match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
  assert.ok(translateXMatch, "promo animation should keep a horizontal translateX entry");
  assert.ok(Math.abs(Number(translateXMatch[1])) <= 8);
});

test("la solucion no introduce clipping horizontal global", () => {
  assert.doesNotMatch(cssSource, /\b(?:html|body|main)\s*\{[\s\S]*overflow-x\s*:\s*(?:hidden|clip)/);
  assert.doesNotMatch(cssSource, /(?:overflow-x-hidden|overflow-x-clip)/);
});

test("el banner incluye restricciones responsive para no romper movil", () => {
  const promoBlock = getPromoBlock();

  assert.match(promoBlock, /w-full/);
  assert.match(promoBlock, /max-w-full/);
  assert.match(promoBlock, /overflow-hidden/);
  assert.match(promoBlock, /flex-col/);
  assert.match(promoBlock, /min-w-0/);
  assert.match(promoBlock, /sm:w-auto/);
});