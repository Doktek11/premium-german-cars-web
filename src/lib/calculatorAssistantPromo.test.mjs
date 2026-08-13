import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageSource = readFileSync(new URL("../pages/CalculadoraImpuestos.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../index.css", import.meta.url), "utf8");

const getPrimaryAssistantBlock = () => {
  const match = pageSource.match(/<section\s+data-assistant-pgc-block="primary"[\s\S]*?<\/section>/);
  assert.ok(match, "primary assistant block should exist");
  return match[0];
};

const getManualDisclosureBlock = () => {
  const titleIndex = pageSource.indexOf("¿Prefieres calcular manualmente el IEDMT?");
  const start = pageSource.lastIndexOf("<section", titleIndex);
  const end = pageSource.indexOf("Como calcula esta herramienta");

  assert.notEqual(titleIndex, -1, "manual calculator disclosure should exist");
  assert.notEqual(start, -1, "manual calculator disclosure section should exist");
  assert.notEqual(end, -1, "lower informational content should remain after manual calculator");
  assert.ok(start < end, "manual calculator should appear before lower content");

  return pageSource.slice(start, end);
};

const getOpenStateHelperSource = () => {
  const match = pageSource.match(/const hasManualCalculatorUrlParameters = \(params: URLSearchParams\) => ([^;]+);/);
  assert.ok(match, "manual calculator URL helper should exist");
  return match[1];
};

const countMatches = (source, pattern) => source.match(pattern)?.length ?? 0;

test("sigue existiendo un unico H1 con el texto SEO actual", () => {
  assert.equal(countMatches(pageSource, /<h1\b/g), 1);
  assert.match(pageSource, /<h1[^>]*>Calculadora de impuesto de matriculacion para coches importados<\/h1>/);
});

test("metadatos SEO esenciales permanecen intactos", () => {
  assert.match(pageSource, /<SEO title="Calculadora Impuesto Matriculacion 2026 \| Coche Importado Alemania"/);
  assert.match(pageSource, /description="Calcula el impuesto de matriculacion de un coche usado importado segun Valor BOE, primera matriculacion, CO2, territorio y base imponible fiscal\."/);
  assert.match(pageSource, /canonical="https:\/\/www\.premiumgermancars\.com\/calculadora-impuesto-matriculacion"/);
  assert.match(pageSource, /jsonLd=\{calculatorJsonLd\}/);
  assert.match(pageSource, /Como calcula esta herramienta/);
  assert.match(pageSource, /Ejemplos orientativos/);
  assert.match(pageSource, /Preguntas frecuentes sobre la calculadora/);
});

test("existe un unico bloque principal del Asistente PGC con textos fusionados", () => {
  assert.equal(countMatches(pageSource, /data-assistant-pgc-block="primary"/g), 1);

  const block = getPrimaryAssistantBlock();
  assert.match(block, /NUEVO · ASISTENTE FISCAL PGC/);
  assert.match(block, /Prueba nuestra nueva calculadora mejorada/);
  assert.match(block, /¿Ya tienes un coche visto\?/);
  assert.match(block, /Calcula los impuestos de matriculación de un vehículo importado\./);
  assert.match(block, /COC, la documentación alemana o el contrato de compraventa/);
});

test("solo existe un CTA principal que reutiliza abrirAsistenteIA", () => {
  const block = getPrimaryAssistantBlock();

  assert.equal(countMatches(pageSource, /onClick=\{abrirAsistenteIA\}/g), 1);
  assert.equal(countMatches(block, /onClick=\{abrirAsistenteIA\}/g), 1);
  assert.match(block, /CALCULAR CON EL ASISTENTE PGC/);
});

test("el CTA del asistente conserva destino y tracking sin doble ejecucion", () => {
  const handlerMatch = pageSource.match(/const abrirAsistenteIA = \(\) => \{([\s\S]*?)\};\r?\n  const handleWhatsAppVerification/);
  const block = getPrimaryAssistantBlock();

  assert.ok(handlerMatch, "assistant click handler should exist");
  assert.equal(countMatches(handlerMatch[1], /trackLeadEvent/g), 1);
  assert.match(handlerMatch[1], /trackLeadEvent\("lead_followup_click"/);
  assert.match(handlerMatch[1], /leadType: "calculadora-impuestos"/);
  assert.match(handlerMatch[1], /channel: "assistant"/);
  assert.match(handlerMatch[1], /cta: "calculator_ai_assistant"/);
  assert.match(handlerMatch[1], /\.\.\.commonAnalytics/);
  assert.match(handlerMatch[1], /context: leadContext/);
  assert.match(handlerMatch[1], /window\.open\("https:\/\/chatgpt\.com\/g\/g-6a1be090eecc8191861cf1da04ae2a44-pgc-asistente-de-valoracion-oficial", "_blank"\)/);
  assert.equal(countMatches(block, /<button\b/g), 1);
});

test("no hay controles interactivos anidados", () => {
  const buttonBlocks = [...pageSource.matchAll(/<button\b[\s\S]*?<\/button>/g)].map((match) => match[0]);

  assert.ok(buttonBlocks.length > 0);
  for (const buttonBlock of buttonBlocks) {
    assert.doesNotMatch(buttonBlock.replace(/^<button\b/, ""), /<button\b|<a\b/);
  }
});

test("las instrucciones compactas aparecen antes de la calculadora manual", () => {
  const firstStepIndex = pageSource.indexOf("Indica el modelo o adjunta la documentación");
  const secondStepIndex = pageSource.indexOf("Explica quién compra, quién vende y el municipio");
  const thirdStepIndex = pageSource.indexOf("Recibe la estimación de IEDMT, ITP/TPO, IVTM y DGT");
  const manualIndex = pageSource.indexOf("¿Prefieres calcular manualmente el IEDMT?");

  assert.ok(firstStepIndex !== -1 && secondStepIndex !== -1 && thirdStepIndex !== -1 && manualIndex !== -1);
  assert.ok(firstStepIndex < secondStepIndex);
  assert.ok(secondStepIndex < thirdStepIndex);
  assert.ok(thirdStepIndex < manualIndex);
});

test("la calculadora manual esta cerrada en una URL limpia y los ejemplos no la abren", () => {
  const helperSource = getOpenStateHelperSource();

  assert.match(pageSource, /const \[isManualCalculatorOpen, setIsManualCalculatorOpen\] = useState\(\(\) => hasManualCalculatorUrlParameters\(searchParams\)\)/);
  assert.match(helperSource, /CALCULATOR_PREFILL_PARAM_NAMES\.some\(\(paramName\) => params\.has\(paramName\)\)/);
  assert.doesNotMatch(helperSource, /PRECIO_DEFAULT|EMISIONES_DEFAULT|MESES_DEFAULT|result|examples|calculateRegistrationTax/);
});

test("solo parametros compatibles abren la calculadora manual", () => {
  for (const paramName of ["valor_boe", "co2", "antiguedad_meses", "territoryId", "tramo"]) {
    assert.match(pageSource, new RegExp(`"${paramName}"`));
  }

  const helperSource = getOpenStateHelperSource();
  assert.match(helperSource, /params\.has\(paramName\)/);
  assert.doesNotMatch(helperSource, /params\.size|Array\.from\(params|params\.keys/);
});

test("un parametro compatible invalido tambien abre el panel por presencia", () => {
  assert.match(pageSource, /const initialBoeValueParam = getInitialNumberParam\(searchParams, BOE_PARAM_NAMES, PRECIO_DEFAULT\)/);
  assert.match(pageSource, /const initialEmissionsParam = getInitialNumberParam\(searchParams, CO2_PARAM_NAMES, EMISIONES_DEFAULT\)/);
  assert.match(pageSource, /const initialMonthsParam = getInitialIntegerParam\(searchParams, MONTH_PARAM_NAMES, MESES_DEFAULT\)/);
  assert.match(getOpenStateHelperSource(), /params\.has\(paramName\)/);
});

test("el control del desplegable expone aria y el contenido cerrado no se renderiza", () => {
  const block = getManualDisclosureBlock();

  assert.match(block, /<button type="button" aria-expanded=\{isManualCalculatorOpen\} aria-controls=\{MANUAL_CALCULATOR_PANEL_ID\}/);
  assert.match(block, /id=\{MANUAL_CALCULATOR_PANEL_ID\}/);
  assert.match(block, /\{isManualCalculatorOpen && \(/);
  assert.match(block, /ABRIR CALCULADORA MANUAL/);
  assert.match(block, /CERRAR CALCULADORA MANUAL/);
  assert.match(block, /focus-visible:ring-2/);
});

test("los controles manuales siguen dentro del panel desplegable", () => {
  const block = getManualDisclosureBlock();

  assert.match(block, /id="calculadora-inputs"/);
  assert.match(block, /setBoeValueInput\(event\.target\.value\)/);
  assert.match(block, /setEmissionsInput\(event\.target\.value\)/);
  assert.match(block, /setFirstRegistrationDate\(event\.target\.value\)/);
  assert.match(block, /setTerritoryId\(event\.target\.value\)/);
  assert.match(block, /CalculatorLeadCapture/);
  assert.match(block, /handleWhatsAppVerification/);
  assert.match(block, /resetCalculadora/);
});

test("no se altera el parser ni el resultado fiscal central", () => {
  assert.match(pageSource, /getInitialNumberParam\(searchParams, BOE_PARAM_NAMES, PRECIO_DEFAULT\)/);
  assert.match(pageSource, /getInitialRateParam\(searchParams, \["tramo"\]\)/);
  assert.match(pageSource, /calculateRegistrationTax\(\{ boeValue: boeValue \?\? Number\.NaN, emissions: emissions \?\? Number\.NaN/);
  assert.match(pageSource, /getCalculatorActionState\(\{ hasInvalidBoeValue, hasInvalidEmissions, hasInvalidLegacyMonths, hasInvalidFirstRegistrationDate/);
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

test("el bloque principal y el desplegable incluyen restricciones responsive", () => {
  const assistantBlock = getPrimaryAssistantBlock();
  const manualBlock = getManualDisclosureBlock();

  assert.match(assistantBlock, /max-w-full/);
  assert.match(assistantBlock, /overflow-hidden/);
  assert.match(assistantBlock, /grid gap-5/);
  assert.match(assistantBlock, /w-full/);
  assert.match(manualBlock, /flex flex-col/);
  assert.match(manualBlock, /w-full/);
  assert.match(manualBlock, /md:w-auto/);
});
