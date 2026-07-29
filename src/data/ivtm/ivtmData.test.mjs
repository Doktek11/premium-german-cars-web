import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

import {
  generateIvtmDatasets,
  readSource,
  parseHaciendaRates,
  parseIneMunicipalities,
  STATE_TOURISM_QUOTAS_CENTS,
} from "../../../scripts/import-ivtm-data.mjs";

const dataDir = new URL("./", import.meta.url);
const fixturesDir = new URL("./fixtures/", import.meta.url);
const municipalitiesPath = new URL("./municipalities-2026.json", dataDir);
const ratesPath = new URL("./municipal-rates-2025.json", dataDir);
const metadataPath = new URL("./metadata.json", dataDir);

function readJson(url) {
  return JSON.parse(readFileSync(url, "utf8"));
}

function sha256File(url) {
  return createHash("sha256").update(readFileSync(url)).digest("hex");
}

function gzipSize(url) {
  return gzipSync(readFileSync(url)).length;
}

const municipalities = readJson(municipalitiesPath);
const rates = readJson(ratesPath);
const metadata = readJson(metadataPath);
const municipalityCodes = new Set(municipalities.map((municipality) => municipality.ineCode));
const rateCodes = new Set(rates.map((rate) => rate.ineCode));

test("catalogo IVTM contiene los 8.132 municipios INE ordenados por codigo", () => {
  assert.equal(municipalities.length, 8132);
  assert.equal(municipalityCodes.size, 8132);

  let previous = "";
  for (const municipality of municipalities) {
    assert.match(municipality.ineCode, /^\d{5}$/);
    assert.match(municipality.provinceCode, /^\d{2}$/);
    assert.match(municipality.municipalityCode, /^\d{3}$/);
    assert.equal(municipality.ineCode, `${municipality.provinceCode}${municipality.municipalityCode}`);
    assert.ok(municipality.name);
    assert.ok(municipality.normalizedName);
    assert.ok(municipality.provinceName);
    assert.match(municipality.autonomousCommunityCode, /^\d{2}$/);
    assert.ok(municipality.autonomousCommunityName);
    assert.equal(municipality.catalogYear, 2026);
    assert.equal(municipality.ineCode > previous, true);
    previous = municipality.ineCode;
  }
});

test("tarifas Hacienda IVTM contienen 7.399 registros completos en centimos", () => {
  assert.equal(rates.length, 7399);
  assert.equal(rateCodes.size, 7399);

  let previous = "";
  for (const rate of rates) {
    assert.match(rate.ineCode, /^\d{5}$/);
    assert.equal(municipalityCodes.has(rate.ineCode), true);
    assert.equal(rate.ratesYear, 2025);
    assert.equal(rate.sourceId, "hacienda-ivtm-2025-all-municipalities");
    assert.ok(["verified_municipal", "requires_review"].includes(rate.dataStatus));
    assert.deepEqual(Object.keys(rate.annualQuotaCents), [
      "lt8",
      "from8To11_99",
      "from12To15_99",
      "from16To19_99",
      "gte20",
    ]);
    for (const cents of Object.values(rate.annualQuotaCents)) {
      assert.equal(Number.isInteger(cents), true);
      assert.equal(Number.isNaN(cents), false);
      assert.equal(cents >= 0, true);
    }
    assert.equal(rate.ineCode > previous, true);
    previous = rate.ineCode;
  }
});

test("ausencias y territorios especiales coinciden con la auditoria", () => {
  const missing = municipalities.filter((municipality) => !rateCodes.has(municipality.ineCode));
  const countMissing = (provinceCode) => missing.filter((municipality) => municipality.provinceCode === provinceCode).length;

  assert.equal(missing.length, 733);
  assert.equal(countMissing("31"), 272);
  assert.equal(countMissing("01"), 51);
  assert.equal(countMissing("20"), 88);
  assert.equal(countMissing("48"), 113);
  assert.equal(countMissing("31") + countMissing("01") + countMissing("20") + countMissing("48"), 524);
  assert.equal(missing.length - 524, 209);

  assert.equal(municipalityCodes.has("51001"), true);
  assert.equal(municipalityCodes.has("52001"), true);
  assert.equal(rateCodes.has("51001"), true);
  assert.equal(rateCodes.has("52001"), true);
});

test("nombres duplicados exactos se conservan pero no son clave primaria", () => {
  const counts = new Map();
  for (const municipality of municipalities) {
    counts.set(municipality.name, (counts.get(municipality.name) ?? 0) + 1);
  }
  const duplicateGroups = [...counts.values()].filter((count) => count > 1).length;
  assert.equal(duplicateGroups, 17);
});

test("anomalias Hacienda quedan marcadas y no se corrigen silenciosamente", () => {
  const anomalies = rates.filter((rate) => rate.dataStatus === "requires_review");
  assert.equal(anomalies.length, 9);
  assert.deepEqual(anomalies.map((rate) => rate.ineCode), [
    "02012",
    "02047",
    "28002",
    "28099",
    "28151",
    "28153",
    "44065",
    "44219",
    "50165",
  ]);

  for (const anomaly of anomalies) {
    assert.ok(Array.isArray(anomaly.reviewReasons));
    assert.equal(anomaly.reviewReasons.length > 0, true);
    const hasOutOfRangeValue = Object.entries(anomaly.annualQuotaCents).some(([key, cents]) => {
      const min = STATE_TOURISM_QUOTAS_CENTS[key];
      const max = min * 2;
      return cents < min - 1 || cents > max + 1;
    });
    assert.equal(hasOutOfRangeValue, true);
  }
});

test("metadata es coherente con datasets y checksums", () => {
  assert.equal(metadata.catalogYear, 2026);
  assert.equal(metadata.ratesYear, 2025);
  assert.equal(metadata.generatorVersion, "ivtm-data-importer-v1");
  assert.equal(metadata.counts.municipalities, municipalities.length);
  assert.equal(metadata.counts.municipalRates, rates.length);
  assert.equal(metadata.counts.missingRates, 733);
  assert.equal(metadata.counts.anomalies, 9);
  assert.equal(metadata.counts.duplicateExactMunicipalityNames, 17);
  assert.equal(metadata.missingRates.navarra, 272);
  assert.equal(metadata.missingRates.paisVasco, 252);
  assert.equal(metadata.missingRates.alava, 51);
  assert.equal(metadata.missingRates.bizkaia, 113);
  assert.equal(metadata.missingRates.gipuzkoa, 88);
  assert.equal(metadata.missingRates.commonRegime, 209);
  assert.equal(metadata.coverage.exactMunicipalRates.percent, 90.9862);
  assert.deepEqual(metadata.stateReferenceQuotasCents, STATE_TOURISM_QUOTAS_CENTS);
  assert.equal(metadata.maxMunicipalCoefficient, 2);
  assert.match(metadata.sources.ineCatalog.sha256, /^[a-f0-9]{64}$/);
  assert.match(metadata.sources.haciendaRates.sha256, /^[a-f0-9]{64}$/);
  assert.equal(metadata.datasetSha256["municipalities-2026.json"], sha256File(municipalitiesPath));
  assert.equal(metadata.datasetSha256["municipal-rates-2025.json"], sha256File(ratesPath));
  assert.equal(metadata.warning.includes("2025 no equivalen automaticamente a tarifas exactas 2026"), true);
});

test("fixtures minimos prueban parser INE y parser Hacienda", () => {
  const ineFixture = readFileSync(new URL("./ine-valid.csv", fixturesDir));
  const haciendaFixture = readFileSync(new URL("./hacienda-valid.html", fixturesDir));
  const parsedMunicipalities = parseIneMunicipalities(ineFixture, { catalogYear: 2026 });
  const parsedRates = parseHaciendaRates(haciendaFixture, { ratesYear: 2025 });

  assert.equal(parsedMunicipalities.length, 1);
  assert.equal(parsedMunicipalities[0].ineCode, "51001");
  assert.equal(parsedRates.length, 1);
  assert.equal(parsedRates[0].ineCode, "51001");
  assert.deepEqual(parsedRates[0].annualQuotaCents, STATE_TOURISM_QUOTAS_CENTS);
});

test("parser Hacienda rechaza encabezado cambiado, codigo duplicado, tarifa parcial e invalida", () => {
  const valid = readFileSync(new URL("./hacienda-valid.html", fixturesDir), "latin1");

  assert.throws(() => parseHaciendaRates(Buffer.from(valid.replace("Turismos", "Coches"), "latin1")), /contract mismatch/);
  assert.throws(() => {
    const duplicate = valid.replace("</table>", valid.match(/<tr><td>18-51-001[\s\S]*?<\/tr>/)[0] + "</table>");
    parseHaciendaRates(Buffer.from(duplicate, "latin1"));
  }, /duplicated/);
  assert.throws(() => parseHaciendaRates(Buffer.from(valid.replace("<td>1262</td>", "<td></td>"), "latin1")), /Missing quota/);
  assert.throws(() => parseHaciendaRates(Buffer.from(valid.replace("<td>1262</td>", "<td>abc</td>"), "latin1")), /Invalid quota/);
});

test("parser Hacienda acepta coma decimal y conserva centimos enteros", () => {
  const valid = readFileSync(new URL("./hacienda-valid.html", fixturesDir), "latin1");
  const decimal = valid.replace("<td>1262</td>", "<td>12,62</td>");
  const parsedRates = parseHaciendaRates(Buffer.from(decimal, "latin1"));
  assert.equal(parsedRates[0].annualQuotaCents.lt8, 1262);
});

test("regeneracion con fixtures locales es determinista", async () => {
  const firstDir = mkdtempSync(join(tmpdir(), "ivtm-fixture-a-"));
  const secondDir = mkdtempSync(join(tmpdir(), "ivtm-fixture-b-"));
  const ineSource = fileURLToPath(new URL("./ine-valid.csv", fixturesDir));
  const haciendaSource = fileURLToPath(new URL("./hacienda-valid.html", fixturesDir));

  const first = await generateIvtmDatasets({
    ineSource,
    haciendaSource,
    outputDir: firstDir,
    allowStructuralChange: true,
  });
  const second = await generateIvtmDatasets({
    ineSource,
    haciendaSource,
    outputDir: secondDir,
    allowStructuralChange: true,
  });

  assert.deepEqual(first.checksums, second.checksums);
  assert.equal(readFileSync(first.files.municipalities, "utf8"), readFileSync(second.files.municipalities, "utf8"));
  assert.equal(readFileSync(first.files.rates, "utf8"), readFileSync(second.files.rates, "utf8"));
  assert.equal(readFileSync(first.files.metadata, "utf8"), readFileSync(second.files.metadata, "utf8"));
});

test("tamano bruto y gzip de datasets es medible sin dependencias externas", () => {
  for (const url of [municipalitiesPath, ratesPath, metadataPath]) {
    assert.equal(statSync(url).size > 0, true);
    assert.equal(gzipSize(url) > 0, true);
  }
});

test("readSource acepta archivo local valido y rechaza HTTP remoto", async () => {
  const ineFixturePath = fileURLToPath(new URL("./ine-valid.csv", fixturesDir));
  const local = await readSource(ineFixturePath);
  assert.equal(local.sourceType, "file");
  assert.equal(local.buffer.length > 0, true);
  assert.match(local.sha256, /^[a-f0-9]{64}$/);

  await assert.rejects(() => readSource("http://example.com/ivtm.xls"), /HTTPS/);
});

test("readSource rechaza status no OK y Content-Length excesivo", async () => {
  await assert.rejects(
    () =>
      readSource("https://example.com/error.xls", {
        fetchImpl: async () => new Response("error", { status: 503, statusText: "Service Unavailable" }),
      }),
    /503 Service Unavailable/
  );

  await assert.rejects(
    () =>
      readSource("https://example.com/huge.xls", {
        maxDownloadBytes: 5,
        fetchImpl: async () =>
          new Response("small", {
            status: 200,
            headers: { "content-length": "6" },
          }),
      }),
    /size limit before download/
  );
});

test("readSource detiene stream al superar limite y aplica timeout", async () => {
  await assert.rejects(
    () =>
      readSource("https://example.com/stream.xls", {
        maxDownloadBytes: 5,
        fetchImpl: async () => new Response("123456", { status: 200 }),
      }),
    /size limit during download/
  );

  await assert.rejects(
    () =>
      readSource("https://example.com/timeout.xls", {
        downloadTimeoutMs: 10,
        fetchImpl: async (_url, init) =>
          new Promise((_resolve, reject) => {
            init.signal.addEventListener("abort", () => {
              const error = new Error("aborted");
              error.name = "AbortError";
              reject(error);
            });
          }),
      }),
    /Timed out downloading/
  );
});

test("fallo antes del rename conserva datasets anteriores y limpia temporales", async () => {
  const outputDir = mkdtempSync(join(tmpdir(), "ivtm-fail-before-rename-"));
  const ineSource = fileURLToPath(new URL("./ine-valid.csv", fixturesDir));
  const haciendaSource = fileURLToPath(new URL("./hacienda-valid.html", fixturesDir));
  const existingMunicipalities = "[{\"sentinel\":\"municipalities\"}]\n";
  const existingRates = "[{\"sentinel\":\"rates\"}]\n";
  const existingMetadata = "{\"sentinel\":\"metadata\"}\n";
  const municipalityFile = join(outputDir, "municipalities-2026.json");
  const ratesFile = join(outputDir, "municipal-rates-2025.json");
  const metadataFile = join(outputDir, "metadata.json");
  writeFileSync(municipalityFile, existingMunicipalities, "utf8");
  writeFileSync(ratesFile, existingRates, "utf8");
  writeFileSync(metadataFile, existingMetadata, "utf8");

  await assert.rejects(
    () =>
      generateIvtmDatasets({
        ineSource,
        haciendaSource,
        outputDir,
        allowStructuralChange: true,
        simulateFailureBeforeRename: true,
      }),
    /Simulated failure before atomic rename/
  );

  assert.equal(readFileSync(municipalityFile, "utf8"), existingMunicipalities);
  assert.equal(readFileSync(ratesFile, "utf8"), existingRates);
  assert.equal(readFileSync(metadataFile, "utf8"), existingMetadata);
  assert.deepEqual(
    readdirSync(outputDir).filter((name) => name.includes(".tmp") || name.includes(".bak-")),
    []
  );
});

test("datasets y metadata no contienen secuencias mojibake tipicas", () => {
  const suspicious = [/Ãƒ/, /Ã‚/, /ï¿½/];
  for (const url of [municipalitiesPath, ratesPath, metadataPath]) {
    const text = readFileSync(url, "utf8");
    for (const pattern of suspicious) {
      assert.equal(pattern.test(text), false, `${fileURLToPath(url)} contains ${pattern}`);
    }
  }
});