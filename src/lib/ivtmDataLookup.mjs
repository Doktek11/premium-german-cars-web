import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { calculateMunicipalVehicleTax } from "./municipalVehicleTax.mjs";

const DEFAULT_DATA_URLS = {
  municipalities: new URL("../data/ivtm/municipalities-2026.json", import.meta.url),
  rates: new URL("../data/ivtm/municipal-rates-2025.json", import.meta.url),
  metadata: new URL("../data/ivtm/metadata.json", import.meta.url),
};

let defaultCachePromise = null;

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function canonicalMunicipalityCode(value) {
  if (typeof value !== "string") return null;
  const code = value.trim();
  return /^\d{5}$/.test(code) ? code : null;
}

async function readJson(url) {
  const text = await readFile(fileURLToPath(url), "utf8");
  return JSON.parse(text);
}

function assertUniqueCodes(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item?.ineCode || seen.has(item.ineCode)) {
      throw new Error(`Duplicated or empty ${label} code: ${item?.ineCode ?? ""}`);
    }
    seen.add(item.ineCode);
  }
}

function buildLookup({ municipalities, rates, metadata }) {
  if (!Array.isArray(municipalities) || !Array.isArray(rates)) {
    throw new Error("Invalid IVTM dataset shape");
  }
  assertUniqueCodes(municipalities, "municipality");
  assertUniqueCodes(rates, "rate");
  const municipalitiesByCode = new Map(municipalities.map((municipality) => [municipality.ineCode, cloneJson(municipality)]));
  const ratesByCode = new Map(rates.map((rate) => [rate.ineCode, cloneJson(rate)]));
  for (const code of ratesByCode.keys()) {
    if (!municipalitiesByCode.has(code)) throw new Error(`Rate without municipality: ${code}`);
  }

  return Object.freeze({
    counts: Object.freeze({ municipalities: municipalitiesByCode.size, rates: ratesByCode.size }),
    metadata: cloneJson(metadata),
    resolveMunicipalityCode(code) {
      const municipalityCode = canonicalMunicipalityCode(code);
      if (!municipalityCode) return { ok: false, reason: "invalid_code", municipalityCode: null, municipality: null, rate: null, metadata: cloneJson(metadata) };
      const municipality = municipalitiesByCode.get(municipalityCode) ?? null;
      if (!municipality) return { ok: false, reason: "not_found", municipalityCode, municipality: null, rate: null, metadata: cloneJson(metadata) };
      return {
        ok: true,
        reason: ratesByCode.has(municipalityCode) ? "rate_found" : "rate_missing",
        municipalityCode,
        municipality: cloneJson(municipality),
        rate: cloneJson(ratesByCode.get(municipalityCode) ?? null),
        metadata: cloneJson(metadata),
      };
    },
  });
}

export async function loadIvtmData(options = {}) {
  const urls = {
    municipalities: options.municipalitiesUrl ?? DEFAULT_DATA_URLS.municipalities,
    rates: options.ratesUrl ?? DEFAULT_DATA_URLS.rates,
    metadata: options.metadataUrl ?? DEFAULT_DATA_URLS.metadata,
  };
  const usesDefaultUrls = !options.municipalitiesUrl && !options.ratesUrl && !options.metadataUrl;
  if (usesDefaultUrls && defaultCachePromise) return defaultCachePromise;
  const promise = Promise.all([readJson(urls.municipalities), readJson(urls.rates), readJson(urls.metadata)]).then(
    ([municipalities, rates, metadata]) => buildLookup({ municipalities, rates, metadata })
  );
  if (usesDefaultUrls) defaultCachePromise = promise;
  return promise;
}

export async function resolveIvtmMunicipalityData(municipalityCode, options = {}) {
  const lookup = await loadIvtmData(options);
  return lookup.resolveMunicipalityCode(municipalityCode);
}

export async function calculateMunicipalVehicleTaxWithLookup(input, options = {}) {
  const resolved = await resolveIvtmMunicipalityData(input?.municipalityCode, options);
  return calculateMunicipalVehicleTax(input, resolved);
}

export function clearIvtmDataCacheForTests() {
  defaultCachePromise = null;
}