import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync, gzipSync, inflateRawSync } from "node:zlib";

export const GENERATOR_VERSION = "ivtm-data-importer-v1";
export const DEFAULT_DOWNLOAD_TIMEOUT_MS = 30_000;
export const DEFAULT_MAX_SOURCE_BYTES = 64 * 1024 * 1024;

export const DEFAULT_SOURCES = {
  ine: "https://www.ine.es/daco/daco42/codmun/diccionario26.xlsx",
  hacienda: "https://serviciostelematicosext.hacienda.gob.es/SGFAL/ConsultaTipos/aspx/ImpuestosExcel.aspx?provincia=TODAS&anosel=2025",
  ineLanding: "https://ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&idp=1254734710990",
  ineMunicipalityXlsx: "https://www.ine.es/daco/daco42/codmun/26codmun.xlsx",
  ineCcaaProvinceCodes: "https://www.ine.es/daco/daco42/codmun/cod_ccaa_provincia.htm",
  haciendaLanding: "https://serviciostelematicosext.hacienda.gob.es/SGFAL/ConsultaTipos/aspx/listado_municipiosm.aspx",
  trlrhl: "https://www.boe.es/eli/es/rdlg/2004/03/05/2/con",
};

export const STATE_TOURISM_QUOTAS_CENTS = {
  lt8: 1262,
  from8To11_99: 3408,
  from12To15_99: 7194,
  from16To19_99: 8961,
  gte20: 11200,
};

const MAX_MUNICIPAL_COEFFICIENT = 2;
const ROUNDING_TOLERANCE_CENTS = 1;

const AUTONOMOUS_COMMUNITIES = {
  "01": "Andaluc\u00eda",
  "02": "Arag\u00f3n",
  "03": "Asturias, Principado de",
  "04": "Balears, Illes",
  "05": "Canarias",
  "06": "Cantabria",
  "07": "Castilla y Le\u00f3n",
  "08": "Castilla-La Mancha",
  "09": "Catalu\u00f1a",
  "10": "Comunitat Valenciana",
  "11": "Extremadura",
  "12": "Galicia",
  "13": "Madrid, Comunidad de",
  "14": "Murcia, Regi\u00f3n de",
  "15": "Navarra, Comunidad Foral de",
  "16": "Pa\u00eds Vasco",
  "17": "Rioja, La",
  "18": "Ceuta",
  "19": "Melilla",
};

const PROVINCES = {
  "01": { name: "Araba/\u00c1lava", autonomousCommunityCode: "16" },
  "02": { name: "Albacete", autonomousCommunityCode: "08" },
  "03": { name: "Alicante/Alacant", autonomousCommunityCode: "10" },
  "04": { name: "Almer\u00eda", autonomousCommunityCode: "01" },
  "05": { name: "\u00c1vila", autonomousCommunityCode: "07" },
  "06": { name: "Badajoz", autonomousCommunityCode: "11" },
  "07": { name: "Balears, Illes", autonomousCommunityCode: "04" },
  "08": { name: "Barcelona", autonomousCommunityCode: "09" },
  "09": { name: "Burgos", autonomousCommunityCode: "07" },
  "10": { name: "C\u00e1ceres", autonomousCommunityCode: "11" },
  "11": { name: "C\u00e1diz", autonomousCommunityCode: "01" },
  "12": { name: "Castell\u00f3n/Castell\u00f3", autonomousCommunityCode: "10" },
  "13": { name: "Ciudad Real", autonomousCommunityCode: "08" },
  "14": { name: "C\u00f3rdoba", autonomousCommunityCode: "01" },
  "15": { name: "Coru\u00f1a, A", autonomousCommunityCode: "12" },
  "16": { name: "Cuenca", autonomousCommunityCode: "08" },
  "17": { name: "Girona", autonomousCommunityCode: "09" },
  "18": { name: "Granada", autonomousCommunityCode: "01" },
  "19": { name: "Guadalajara", autonomousCommunityCode: "08" },
  "20": { name: "Gipuzkoa", autonomousCommunityCode: "16" },
  "21": { name: "Huelva", autonomousCommunityCode: "01" },
  "22": { name: "Huesca", autonomousCommunityCode: "02" },
  "23": { name: "Ja\u00e9n", autonomousCommunityCode: "01" },
  "24": { name: "Le\u00f3n", autonomousCommunityCode: "07" },
  "25": { name: "Lleida", autonomousCommunityCode: "09" },
  "26": { name: "Rioja, La", autonomousCommunityCode: "17" },
  "27": { name: "Lugo", autonomousCommunityCode: "12" },
  "28": { name: "Madrid", autonomousCommunityCode: "13" },
  "29": { name: "M\u00e1laga", autonomousCommunityCode: "01" },
  "30": { name: "Murcia", autonomousCommunityCode: "14" },
  "31": { name: "Navarra", autonomousCommunityCode: "15" },
  "32": { name: "Ourense", autonomousCommunityCode: "12" },
  "33": { name: "Asturias", autonomousCommunityCode: "03" },
  "34": { name: "Palencia", autonomousCommunityCode: "07" },
  "35": { name: "Palmas, Las", autonomousCommunityCode: "05" },
  "36": { name: "Pontevedra", autonomousCommunityCode: "12" },
  "37": { name: "Salamanca", autonomousCommunityCode: "07" },
  "38": { name: "Santa Cruz de Tenerife", autonomousCommunityCode: "05" },
  "39": { name: "Cantabria", autonomousCommunityCode: "06" },
  "40": { name: "Segovia", autonomousCommunityCode: "07" },
  "41": { name: "Sevilla", autonomousCommunityCode: "01" },
  "42": { name: "Soria", autonomousCommunityCode: "07" },
  "43": { name: "Tarragona", autonomousCommunityCode: "09" },
  "44": { name: "Teruel", autonomousCommunityCode: "02" },
  "45": { name: "Toledo", autonomousCommunityCode: "08" },
  "46": { name: "Valencia/Val\u00e8ncia", autonomousCommunityCode: "10" },
  "47": { name: "Valladolid", autonomousCommunityCode: "07" },
  "48": { name: "Bizkaia", autonomousCommunityCode: "16" },
  "49": { name: "Zamora", autonomousCommunityCode: "07" },
  "50": { name: "Zaragoza", autonomousCommunityCode: "02" },
  "51": { name: "Ceuta", autonomousCommunityCode: "18" },
  "52": { name: "Melilla", autonomousCommunityCode: "19" },
};
const EXPECTED_HACIENDA_COLUMNS = [
  ["Datos  2025", "Cod. entidad", "CCAA-Prov-Ayto"],
  ["Datos  2025", "Ayuntamiento"],
  ["Datos  2025", "Provincia"],
  ["Datos  2025", "Poblacion"],
  ["IBI", "Urbana"],
  ["IBI", "Coef. de Actualizacion"],
  ["IBI", "Rev. Catastral"],
  ["IBI", "Rustica"],
  ["IBI", "Caract. Esp."],
  ["I.A.E", "Coef situacion max"],
  ["I.A.E", "Coef situacion min"],
  ["IVTM", "Turismos", "< 8 CV"],
  ["IVTM", "Turismos", "De 8 a 11,99 CV"],
  ["IVTM", "Turismos", "De 12 a 15,99 CV"],
  ["IVTM", "Turismos", "De 16 a 19,99 CV"],
  ["IVTM", "Turismos", "> 20 CV"],
  ["IVTM", "Autobuses", "Aut < 21 plazas"],
  ["IVTM", "Autobuses", "Aut De 21 a 50 plazas"],
  ["IVTM", "Autobuses", "Aut > 50 plazas"],
  ["IVTM", "Camiones", "Cam < 1000 Kg util"],
  ["IVTM", "Camiones", "Cam De 1000 a 2999 Kg util"],
  ["IVTM", "Camiones", "Cam De > 2999 a 9999 Kg util"],
  ["IVTM", "Camiones", "Cam > 9999 Kg util"],
  ["IVTM", "Tractores", "Tra. < 16 CV"],
  ["IVTM", "Tractores", "Tra. De 16 a 25 CV"],
  ["IVTM", "Tractores", "Tra. > 25 CV"],
  ["IVTM", "Remolques", "Rem. <1000 a >750 Kg util"],
  ["IVTM", "Remolques", "Rem. 1000 a 2999 Kg util"],
  ["IVTM", "Remolques", "Rem. >2999 Kg util"],
  ["IVTM", "Otros vehiculos", "Ciclomotor"],
  ["IVTM", "Otros vehiculos", "Motocicleta hasta 125 c.c."],
  ["IVTM", "Otros vehiculos", "Motocicleta >125 a 250 c.c."],
  ["IVTM", "Otros vehiculos", "Motocicleta >250 a 500 c.c."],
  ["IVTM", "Otros vehiculos", "Motocicleta >500 a 1000 c.c."],
  ["IVTM", "Otros vehiculos", "Motocicleta >1000 c.c."],
  ["I.V.T.N.U.", "% hasta 5 anos"],
  ["I.V.T.N.U.", "Tipo hasta 5 anos"],
  ["I.V.T.N.U.", "% hasta 10 anos"],
  ["I.V.T.N.U.", "Tipo hasta 10 anos"],
  ["I.V.T.N.U.", "% hasta 15 anos"],
  ["I.V.T.N.U.", "Tipo hasta 15 anos"],
  ["I.V.T.N.U.", "% hasta 20 anos"],
  ["I.V.T.N.U.", "Tipo hasta 20 anos"],
  ["I.V.T.N.U.", "% reduccion"],
  ["ICIO", "Tipo Gravamen"],
];
const TOURISM_COLUMN_TO_KEY = [
  [11, "lt8"],
  [12, "from8To11_99"],
  [13, "from12To15_99"],
  [14, "from16To19_99"],
  [15, "gte20"],
];

const FORAL_PROVINCE_GROUPS = {
  navarra: ["31"],
  alava: ["01"],
  gipuzkoa: ["20"],
  bizkaia: ["48"],
};

function usage() {
  return [
    "Usage: node scripts/import-ivtm-data.mjs [options]",
    "",
    "Options:",
    "  --ine-source <path-or-url>       INE source; default is official diccionario26.xlsx",
    "  --hacienda-source <path-or-url>  Hacienda source; default is official 2025 all-municipalities Excel/HTML",
    "  --output-dir <path>              Output directory; default src/data/ivtm",
    "  --catalog-year <year>            Catalog year; default 2026",
    "  --rates-year <year>              Rates year; default 2025",
    "  --allow-structural-change        Accept counts different from the current checked contract",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    ineSource: DEFAULT_SOURCES.ine,
    haciendaSource: DEFAULT_SOURCES.hacienda,
    outputDir: "src/data/ivtm",
    catalogYear: 2026,
    ratesYear: 2025,
    allowStructuralChange: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--allow-structural-change") {
      args.allowStructuralChange = true;
      continue;
    }
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for ${arg}`);
    }
    if (arg === "--ine-source") args.ineSource = next;
    else if (arg === "--hacienda-source") args.haciendaSource = next;
    else if (arg === "--output-dir") args.outputDir = next;
    else if (arg === "--catalog-year") args.catalogYear = Number(next);
    else if (arg === "--rates-year") args.ratesYear = Number(next);
    else throw new Error(`Unknown argument: ${arg}`);
    i += 1;
  }

  if (!Number.isInteger(args.catalogYear) || !Number.isInteger(args.ratesYear)) {
    throw new Error("catalog-year and rates-year must be integers");
  }
  return args;
}

export function normalizeSearchName(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("es-ES")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeHeader(value) {
  return normalizeSearchName(value).replace(/\s+/g, " ");
}

function sha256Buffer(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function sha256Text(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function isUrl(value) {
  return /^https?:\/\//i.test(value);
}

function assertHttpsSource(source) {
  const url = new URL(source);
  if (url.protocol !== "https:") {
    throw new Error(`Remote source must use HTTPS: ${source}`);
  }
  return url;
}

function assertContentLengthWithinLimit(response, maxDownloadBytes, source) {
  const contentLength = response.headers.get("content-length");
  if (!contentLength) return;
  const bytes = Number(contentLength);
  if (!Number.isFinite(bytes) || bytes < 0) {
    throw new Error(`Invalid Content-Length for ${source}: ${contentLength}`);
  }
  if (bytes > maxDownloadBytes) {
    throw new Error(`Remote source exceeds size limit before download: ${source} (${bytes} bytes)`);
  }
}

async function responseBufferWithinLimit(response, { source, maxDownloadBytes }) {
  const reader = response.body?.getReader();
  if (!reader) {
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length > maxDownloadBytes) {
      throw new Error(`Remote source exceeds size limit during download: ${source} (${buffer.length} bytes)`);
    }
    return buffer;
  }

  const chunks = [];
  let total = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = Buffer.from(value);
    total += chunk.length;
    if (total > maxDownloadBytes) {
      await reader.cancel();
      throw new Error(`Remote source exceeds size limit during download: ${source} (${total} bytes)`);
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks, total);
}

export async function readSource(source, options = {}) {
  const {
    downloadTimeoutMs = DEFAULT_DOWNLOAD_TIMEOUT_MS,
    maxDownloadBytes = DEFAULT_MAX_SOURCE_BYTES,
    fetchImpl = fetch,
  } = options;
  if (isUrl(source)) {
    assertHttpsSource(source);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), downloadTimeoutMs);
    try {
      const response = await fetchImpl(source, {
        headers: {
          "user-agent": "premium-german-cars-ivtm-data-importer/1.0",
        },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Failed to download ${source}: ${response.status} ${response.statusText}`);
      }
      if (response.url) assertHttpsSource(response.url);
      assertContentLengthWithinLimit(response, maxDownloadBytes, source);
      const buffer = await responseBufferWithinLimit(response, { source, maxDownloadBytes });
      return { source, sourceType: "url", buffer, sha256: sha256Buffer(buffer) };
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error(`Timed out downloading ${source} after ${downloadTimeoutMs} ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  const resolved = isAbsolute(source) ? source : resolve(process.cwd(), source);
  const buffer = readFileSync(resolved);
  return { source: resolved, sourceType: "file", buffer, sha256: sha256Buffer(buffer) };
}

function findEndOfCentralDirectory(buffer) {
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 65558); i -= 1) {
    if (buffer.readUInt32LE(i) === 0x06054b50) return i;
  }
  throw new Error("Invalid XLSX: end of central directory not found");
}

function readZipEntries(buffer) {
  const eocdOffset = findEndOfCentralDirectory(buffer);
  const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
  const centralDirectoryOffset = buffer.readUInt32LE(eocdOffset + 16);
  const entries = new Map();
  let offset = centralDirectoryOffset;

  for (let i = 0; i < totalEntries; i += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error("Invalid XLSX: central directory entry signature mismatch");
    }
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString("utf8", offset + 46, offset + 46 + fileNameLength);

    if (buffer.readUInt32LE(localHeaderOffset) !== 0x04034b50) {
      throw new Error(`Invalid XLSX: local header not found for ${name}`);
    }
    const localNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataOffset, dataOffset + compressedSize);
    let data;
    if (method === 0) data = compressed;
    else if (method === 8) data = inflateRawSync(compressed);
    else throw new Error(`Unsupported XLSX compression method ${method} for ${name}`);
    if (data.length !== uncompressedSize) {
      throw new Error(`Invalid XLSX: uncompressed size mismatch for ${name}`);
    }
    entries.set(name, data);
    offset += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function decodeXml(value) {
  return String(value ?? "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function parseSharedStrings(xml) {
  const strings = [];
  for (const siMatch of xml.matchAll(/<si\b[\s\S]*?<\/si>/g)) {
    const si = siMatch[0];
    const pieces = [...si.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((match) => decodeXml(match[1]));
    strings.push(pieces.join(""));
  }
  return strings;
}

function columnLettersToIndex(ref) {
  const letters = String(ref).match(/[A-Z]+/i)?.[0]?.toUpperCase();
  if (!letters) return null;
  let index = 0;
  for (const char of letters) index = index * 26 + char.charCodeAt(0) - 64;
  return index - 1;
}

function parseSheetRows(xml, sharedStrings) {
  const rows = [];
  for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const row = [];
    const rowXml = rowMatch[1];
    for (const cellMatch of rowXml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>|<c\b([^>]*)\/>/g)) {
      const attrs = cellMatch[1] ?? cellMatch[3] ?? "";
      const body = cellMatch[2] ?? "";
      const ref = attrs.match(/\br="([^"]+)"/)?.[1];
      const type = attrs.match(/\bt="([^"]+)"/)?.[1];
      const columnIndex = columnLettersToIndex(ref);
      if (columnIndex === null) continue;
      const rawValue = body.match(/<v>([\s\S]*?)<\/v>/)?.[1];
      const inlineString = body.match(/<is\b[^>]*>([\s\S]*?)<\/is>/)?.[1];
      let value = "";
      if (type === "s" && rawValue !== undefined) {
        value = sharedStrings[Number(rawValue)] ?? "";
      } else if (type === "inlineStr" && inlineString !== undefined) {
        value = [...inlineString.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((match) => decodeXml(match[1])).join("");
      } else if (rawValue !== undefined) {
        value = decodeXml(rawValue);
      }
      row[columnIndex] = value;
    }
    rows.push(row.map((value) => value ?? ""));
  }
  return rows;
}

export function parseXlsxFirstSheet(buffer) {
  const entries = readZipEntries(buffer);
  const workbookXml = entries.get("xl/workbook.xml")?.toString("utf8");
  const relsXml = entries.get("xl/_rels/workbook.xml.rels")?.toString("utf8");
  if (!workbookXml || !relsXml) throw new Error("Invalid XLSX: missing workbook metadata");

  const firstSheet = workbookXml.match(/<sheet\b[^>]*r:id="([^"]+)"/);
  if (!firstSheet) throw new Error("Invalid XLSX: no worksheet found");
  const relationshipId = firstSheet[1];
  const relationship = [...relsXml.matchAll(/<Relationship\b([^>]*)\/>/g)]
    .map((match) => match[1])
    .find((attrs) => attrs.includes(`Id="${relationshipId}"`));
  const target = relationship?.match(/\bTarget="([^"]+)"/)?.[1];
  if (!target) throw new Error("Invalid XLSX: first worksheet relationship not found");
  const normalizedTarget = target.startsWith("/") ? target.slice(1) : `xl/${target}`;
  const sheetXml = entries.get(normalizedTarget)?.toString("utf8");
  if (!sheetXml) throw new Error(`Invalid XLSX: worksheet not found at ${normalizedTarget}`);

  const sharedStringsXml = entries.get("xl/sharedStrings.xml")?.toString("utf8");
  const sharedStrings = sharedStringsXml ? parseSharedStrings(sharedStringsXml) : [];
  return parseSheetRows(sheetXml, sharedStrings);
}

function splitCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells;
}

function parseCsvRows(text) {
  return text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map(splitCsvLine);
}

function rowObjectFromHeaders(headers, row) {
  const object = {};
  headers.forEach((header, index) => {
    object[String(header).trim().toUpperCase()] = String(row[index] ?? "").trim();
  });
  return object;
}

export function parseIneMunicipalities(buffer, { catalogYear = 2026 } = {}) {
  const head = buffer.subarray(0, 4).toString("latin1");
  const rows = head.startsWith("PK\u0003\u0004")
    ? parseXlsxFirstSheet(buffer)
    : parseCsvRows(buffer.toString("utf8"));
  const headerIndex = rows.findIndex((row) => row.map((cell) => String(cell).trim().toUpperCase()).includes("CMUN"));
  if (headerIndex === -1) throw new Error("INE source contract mismatch: CMUN header not found");
  const headers = rows[headerIndex].map((cell) => String(cell).trim());
  const requiredHeaders = ["CODAUTO", "CPRO", "CMUN", "DC", "NOMBRE"];
  for (const header of requiredHeaders) {
    if (!headers.map((value) => value.toUpperCase()).includes(header)) {
      throw new Error(`INE source contract mismatch: missing ${header} column`);
    }
  }

  const municipalities = [];
  for (const row of rows.slice(headerIndex + 1)) {
    const item = rowObjectFromHeaders(headers, row);
    if (!item.CPRO && !item.CMUN && !item.NOMBRE) continue;
    const provinceCode = item.CPRO.padStart(2, "0");
    const municipalityCode = item.CMUN.padStart(3, "0");
    const autonomousCommunityCode = item.CODAUTO.padStart(2, "0");
    const name = item.NOMBRE.trim();
    if (!/^\d{2}$/.test(provinceCode) || !/^\d{3}$/.test(municipalityCode)) {
      throw new Error(`INE source contract mismatch: invalid municipality code ${item.CPRO}-${item.CMUN}`);
    }
    if (!name) throw new Error(`INE source contract mismatch: empty name for ${provinceCode}${municipalityCode}`);
    const province = PROVINCES[provinceCode];
    if (!province) throw new Error(`INE source contract mismatch: unknown province ${provinceCode}`);
    if (province.autonomousCommunityCode !== autonomousCommunityCode) {
      throw new Error(
        `INE source contract mismatch: province ${provinceCode} belongs to ${province.autonomousCommunityCode}, got ${autonomousCommunityCode}`
      );
    }
    municipalities.push({
      ineCode: `${provinceCode}${municipalityCode}`,
      provinceCode,
      municipalityCode,
      name,
      normalizedName: normalizeSearchName(name),
      provinceName: province.name,
      autonomousCommunityCode,
      autonomousCommunityName: AUTONOMOUS_COMMUNITIES[autonomousCommunityCode],
      catalogYear,
    });
  }

  municipalities.sort((a, b) => a.ineCode.localeCompare(b.ineCode));
  validateUniqueCodes(municipalities, "INE municipality", "ineCode");
  return municipalities;
}

const HTML_ENTITY_MAP = {
  aacute: "\u00e1",
  eacute: "\u00e9",
  iacute: "\u00ed",
  oacute: "\u00f3",
  uacute: "\u00fa",
  Aacute: "\u00c1",
  Eacute: "\u00c9",
  Iacute: "\u00cd",
  Oacute: "\u00d3",
  Uacute: "\u00da",
  agrave: "\u00e0",
  egrave: "\u00e8",
  igrave: "\u00ec",
  ograve: "\u00f2",
  ugrave: "\u00f9",
  Agrave: "\u00c0",
  Egrave: "\u00c8",
  Igrave: "\u00cc",
  Ograve: "\u00d2",
  Ugrave: "\u00d9",
  ntilde: "\u00f1",
  Ntilde: "\u00d1",
  ccedil: "\u00e7",
  Ccedil: "\u00c7",
  uuml: "\u00fc",
  Uuml: "\u00dc",
  ordm: "\u00ba",
  ordf: "\u00aa",
  nbsp: " ",
};
function decodeHtmlEntities(value) {
  return decodeXml(String(value ?? ""))
    .replace(/&#160;/g, " ")
    .replace(/&([A-Za-z][A-Za-z0-9]+);/g, (_, entity) => HTML_ENTITY_MAP[entity] ?? `&${entity};`);
}

function stripHtml(value) {
  return decodeHtmlEntities(
    String(value ?? "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function parseHtmlTableRows(html) {
  const tableMatch = String(html).match(/<table\b[\s\S]*?<\/table>/i);
  if (!tableMatch) throw new Error("Hacienda source contract mismatch: no table found");
  const rows = [];
  for (const trMatch of tableMatch[0].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const row = [];
    for (const cellMatch of trMatch[1].matchAll(/<t[dh]\b([^>]*)>([\s\S]*?)<\/t[dh]>/gi)) {
      const attrs = cellMatch[1] ?? "";
      const value = stripHtml(cellMatch[2]);
      const colspan = Number(attrs.match(/\bcolspan=["']?(\d+)/i)?.[1] ?? 1);
      for (let i = 0; i < Math.max(1, colspan); i += 1) row.push(value);
    }
    if (row.some((cell) => cell !== "")) rows.push(row);
  }
  return rows;
}

function parseHaciendaText(buffer) {
  const decodedBuffer = buffer.subarray(0, 2).equals(Buffer.from([0x1f, 0x8b])) ? gunzipSync(buffer) : buffer;
  const utf8 = decodedBuffer.toString("utf8");
  const text = utf8.includes("\uFFFD") ? decodedBuffer.toString("latin1") : utf8;
  if (!/<!DOCTYPE HTML|<html/i.test(text)) {
    throw new Error("Hacienda source contract mismatch: expected HTML served as .xls");
  }
  return text;
}

function assertIncludesAt(row, index, expected, label) {
  const actual = normalizeHeader(row[index] ?? "");
  const normalizedExpected = normalizeHeader(expected);
  if (actual !== normalizedExpected) {
    throw new Error(`Hacienda source contract mismatch at ${label}: expected "${normalizedExpected}", got "${actual}"`);
  }
}

function assertHaciendaHeaders(rows) {
  if (rows.length < 4) throw new Error("Hacienda source contract mismatch: not enough rows");
  const headerRows = rows.slice(0, 3);
  const dataWidth = rows[3]?.length ?? 0;
  if (dataWidth !== 45) throw new Error(`Hacienda source contract mismatch: expected 45 data columns, got ${dataWidth}`);

  const headerWidths = headerRows.map((row) => row.length).join(",");
  const isExpandedFixture = headerWidths === "45,45,45";
  const isOfficialGroupedHeader = headerWidths === "45,28,42";
  if (!isExpandedFixture && !isOfficialGroupedHeader) {
    throw new Error(`Hacienda source contract mismatch: unexpected header widths ${headerWidths}`);
  }

  if (isExpandedFixture) {
    for (let columnIndex = 0; columnIndex < EXPECTED_HACIENDA_COLUMNS.length; columnIndex += 1) {
      const expectedParts = EXPECTED_HACIENDA_COLUMNS[columnIndex].map(normalizeHeader);
      const actualParts = headerRows.map((row) => normalizeHeader(row[columnIndex] ?? "")).filter(Boolean);
      for (const expectedPart of expectedParts) {
        if (!actualParts.includes(expectedPart)) {
          throw new Error(
            `Hacienda source contract mismatch at column ${columnIndex}: expected "${expectedPart}", got "${actualParts.join(" | ")}"`
          );
        }
      }
    }
    return;
  }

  assertIncludesAt(headerRows[0], 0, "Datos 2025", "header row 1 column 0");
  assertIncludesAt(headerRows[0], 4, "IBI", "header row 1 column 4");
  assertIncludesAt(headerRows[0], 9, "I.A.E", "header row 1 column 9");
  assertIncludesAt(headerRows[0], 11, "IVTM", "header row 1 column 11");
  assertIncludesAt(headerRows[0], 35, "I.V.T.N.U.", "header row 1 column 35");
  assertIncludesAt(headerRows[0], 44, "ICIO", "header row 1 column 44");

  assertIncludesAt(headerRows[1], 0, "Cod. entidad", "header row 2 column 0");
  assertIncludesAt(headerRows[1], 1, "Ayuntamiento", "header row 2 column 1");
  assertIncludesAt(headerRows[1], 2, "Provincia", "header row 2 column 2");
  assertIncludesAt(headerRows[1], 3, "Poblacion", "header row 2 column 3");
  assertIncludesAt(headerRows[1], 4, "Turismos", "header row 2 column 4");
  assertIncludesAt(headerRows[1], 9, "Autobuses", "header row 2 column 9");
  assertIncludesAt(headerRows[1], 12, "Camiones", "header row 2 column 12");
  assertIncludesAt(headerRows[1], 16, "Tractores", "header row 2 column 16");
  assertIncludesAt(headerRows[1], 19, "Remolques", "header row 2 column 19");
  assertIncludesAt(headerRows[1], 22, "Otros vehiculos", "header row 2 column 22");

  assertIncludesAt(headerRows[2], 0, "CCAA-Prov-Ayto", "header row 3 column 0");
  assertIncludesAt(headerRows[2], 1, "Urbana", "header row 3 column 1");
  assertIncludesAt(headerRows[2], 8, "< 8 CV", "header row 3 column 8");
  assertIncludesAt(headerRows[2], 9, "De 8 a 11,99 CV", "header row 3 column 9");
  assertIncludesAt(headerRows[2], 10, "De 12 a 15,99 CV", "header row 3 column 10");
  assertIncludesAt(headerRows[2], 11, "De 16 a 19,99 CV", "header row 3 column 11");
  assertIncludesAt(headerRows[2], 12, "> 20 CV", "header row 3 column 12");
}
function parseQuotaToCents(value, context) {
  const text = String(value ?? "").trim();
  if (!text) throw new Error(`Missing quota in ${context}`);
  const normalized = text.replace(/\./g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    throw new Error(`Invalid quota "${text}" in ${context}`);
  }
  const number = Number(normalized);
  if (!Number.isFinite(number)) throw new Error(`Invalid finite quota "${text}" in ${context}`);

  // Hacienda stores euro-cent amounts as integer strings in the HTML export.
  if (!text.includes(",") && !text.includes(".") && Number.isInteger(number)) {
    return number;
  }
  return Math.round(number * 100);
}

function validateQuotaInterval(quotas) {
  const reviewReasons = [];
  for (const [key, cents] of Object.entries(quotas)) {
    const stateCents = STATE_TOURISM_QUOTAS_CENTS[key];
    const maximumCents = stateCents * MAX_MUNICIPAL_COEFFICIENT;
    if (!Number.isInteger(cents) || !Number.isFinite(cents)) {
      reviewReasons.push(`${key}: quota is not a finite integer amount of cents`);
    } else if (cents < 0) {
      reviewReasons.push(`${key}: negative quota ${cents} cents`);
    } else if (cents < stateCents - ROUNDING_TOLERANCE_CENTS) {
      reviewReasons.push(`${key}: ${cents} cents below state quota ${stateCents} cents`);
    } else if (cents > maximumCents + ROUNDING_TOLERANCE_CENTS) {
      reviewReasons.push(`${key}: ${cents} cents above legal maximum ${maximumCents} cents`);
    }
  }
  return reviewReasons;
}

export function parseHaciendaRates(buffer, { ratesYear = 2025 } = {}) {
  const text = parseHaciendaText(buffer);
  const rows = parseHtmlTableRows(text);
  assertHaciendaHeaders(rows);
  const dataRows = rows.slice(3).filter((row) => row.some((cell) => cell !== ""));
  const rates = [];

  for (const row of dataRows) {
    if (row.length !== 45) throw new Error(`Hacienda source contract mismatch: expected 45 data columns, got ${row.length}`);
    const rawCode = row[0].trim();
    const match = rawCode.match(/^(\d{2})-(\d{2})-(\d{3})$/);
    if (!match) throw new Error(`Invalid Hacienda municipal code "${rawCode}"`);
    const ineCode = `${match[2]}${match[3]}`;
    const annualQuotaCents = {};
    for (const [columnIndex, key] of TOURISM_COLUMN_TO_KEY) {
      annualQuotaCents[key] = parseQuotaToCents(row[columnIndex], `${rawCode} ${key}`);
    }
    const reviewReasons = validateQuotaInterval(annualQuotaCents);
    rates.push({
      ineCode,
      ratesYear,
      annualQuotaCents,
      dataStatus: reviewReasons.length > 0 ? "requires_review" : "verified_municipal",
      sourceId: "hacienda-ivtm-2025-all-municipalities",
      rawMunicipalityName: row[1].trim(),
      ...(reviewReasons.length > 0 ? { reviewReasons } : {}),
    });
  }

  rates.sort((a, b) => a.ineCode.localeCompare(b.ineCode));
  validateUniqueCodes(rates, "Hacienda rate", "ineCode");
  return rates;
}

function validateUniqueCodes(items, label, key) {
  const seen = new Set();
  for (const item of items) {
    const value = item[key];
    if (!value) throw new Error(`${label} has empty ${key}`);
    if (seen.has(value)) throw new Error(`${label} has duplicated ${key}: ${value}`);
    seen.add(value);
  }
}

function countDuplicateNames(municipalities) {
  const counts = new Map();
  for (const municipality of municipalities) {
    counts.set(municipality.name, (counts.get(municipality.name) ?? 0) + 1);
  }
  return [...counts.values()].filter((count) => count > 1).length;
}

function groupBy(items, getKey) {
  const groups = {};
  for (const item of items) {
    const key = getKey(item);
    groups[key] = (groups[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)));
}

function buildMissingBreakdown(municipalities, rates) {
  const rateCodes = new Set(rates.map((rate) => rate.ineCode));
  const missing = municipalities.filter((municipality) => !rateCodes.has(municipality.ineCode));
  const byProvince = groupBy(missing, (municipality) => municipality.provinceCode);
  const byAutonomousCommunity = groupBy(missing, (municipality) => municipality.autonomousCommunityCode);
  const navarra = missing.filter((municipality) => FORAL_PROVINCE_GROUPS.navarra.includes(municipality.provinceCode)).length;
  const alava = missing.filter((municipality) => FORAL_PROVINCE_GROUPS.alava.includes(municipality.provinceCode)).length;
  const bizkaia = missing.filter((municipality) => FORAL_PROVINCE_GROUPS.bizkaia.includes(municipality.provinceCode)).length;
  const gipuzkoa = missing.filter((municipality) => FORAL_PROVINCE_GROUPS.gipuzkoa.includes(municipality.provinceCode)).length;
  const paisVasco = alava + bizkaia + gipuzkoa;
  const foral = navarra + paisVasco;
  return {
    total: missing.length,
    foral,
    navarra,
    paisVasco,
    alava,
    bizkaia,
    gipuzkoa,
    commonRegime: missing.length - foral,
    byProvince,
    byAutonomousCommunity,
  };
}

function assertFullContract({ municipalities, rates, allowStructuralChange = false }) {
  const municipalityCodes = new Set(municipalities.map((municipality) => municipality.ineCode));
  const unknownRates = rates.filter((rate) => !municipalityCodes.has(rate.ineCode));
  const partialRates = rates.filter((rate) => Object.values(rate.annualQuotaCents).some((value) => !Number.isInteger(value)));
  const missing = municipalities.length - rates.length;
  const anomalies = rates.filter((rate) => rate.dataStatus === "requires_review").length;

  if (unknownRates.length) throw new Error(`Found ${unknownRates.length} Hacienda rates without INE municipality`);
  if (partialRates.length) throw new Error(`Found ${partialRates.length} Hacienda rates with partial quotas`);
  if (!allowStructuralChange) {
    const expected = { municipalities: 8132, rates: 7399, missing: 733, anomalies: 9 };
    const actual = { municipalities: municipalities.length, rates: rates.length, missing, anomalies };
    for (const key of Object.keys(expected)) {
      if (actual[key] !== expected[key]) {
        throw new Error(
          `Structural data change detected for ${key}: expected ${expected[key]}, got ${actual[key]}. ` +
            "Use --allow-structural-change only after reviewing official-source changes."
        );
      }
    }
  }
}

function buildMetadata({
  catalogYear,
  ratesYear,
  ineSource,
  haciendaSource,
  municipalities,
  rates,
  sourceChecksums,
  datasetChecksums,
}) {
  const missingBreakdown = buildMissingBreakdown(municipalities, rates);
  const anomalies = rates
    .filter((rate) => rate.dataStatus === "requires_review")
    .map((rate) => ({
      ineCode: rate.ineCode,
      rawMunicipalityName: rate.rawMunicipalityName,
      reviewReasons: rate.reviewReasons,
    }));
  const coverage = {
    exactMunicipalRates: {
      count: rates.length,
      totalMunicipalities: municipalities.length,
      percent: Number(((rates.length / municipalities.length) * 100).toFixed(4)),
    },
    legalRangeFallback: {
      count: municipalities.length,
      percent: 100,
    },
  };

  return {
    catalogYear,
    ratesYear,
    generatedAt: "deterministic-source-snapshot",
    generatedAtPolicy:
      "This value is intentionally stable. Reproducibility is tracked by sourceSha256, datasetSha256 and generatorVersion; no wall-clock timestamp is embedded in generated datasets.",
    generatorVersion: GENERATOR_VERSION,
    sources: {
      ineCatalog: {
        id: "ine-municipality-catalog-2026",
        url: ineSource,
        landingUrl: DEFAULT_SOURCES.ineLanding,
        supplementaryMunicipalityXlsxUrl: DEFAULT_SOURCES.ineMunicipalityXlsx,
        ccaaProvinceCodesUrl: DEFAULT_SOURCES.ineCcaaProvinceCodes,
        sha256: sourceChecksums.ine,
        format: "XLSX official INE workbook; CSV with equivalent headers is accepted for local tests",
      },
      haciendaRates: {
        id: "hacienda-ivtm-2025-all-municipalities",
        url: haciendaSource,
        landingUrl: DEFAULT_SOURCES.haciendaLanding,
        sha256: sourceChecksums.hacienda,
        format: "HTML table served as .xls with 45 columns",
        declaredClosingDate: "2025-09-01",
      },
      trlrhlArticle95: {
        id: "trlrhl-art-95",
        url: DEFAULT_SOURCES.trlrhl,
        purpose: "State IVTM tourism quotas and maximum municipal coefficient validation",
      },
    },
    datasetSha256: datasetChecksums,
    counts: {
      municipalities: municipalities.length,
      municipalRates: rates.length,
      missingRates: missingBreakdown.total,
      anomalies: anomalies.length,
      duplicateExactMunicipalityNames: countDuplicateNames(municipalities),
      rateRowsWithoutIneMunicipality: 0,
      partialRateRows: 0,
    },
    coverage,
    missingRates: missingBreakdown,
    anomalies,
    stateReferenceQuotasCents: STATE_TOURISM_QUOTAS_CENTS,
    maxMunicipalCoefficient: MAX_MUNICIPAL_COEFFICIENT,
    roundingToleranceCents: ROUNDING_TOLERANCE_CENTS,
    scopeNotes: [
      "The municipality catalog is the INE official relation at 01/01/2026.",
      "The municipal IVTM rates are from Hacienda exercise 2025 and must not be treated automatically as exact 2026 rates.",
      "Municipal rates store official annual quotas in integer cents; derived coefficients are validation aids only.",
      "Municipalities without Hacienda rates remain only in the catalog and must be handled by ordinance verification or legal range fallback.",
      "Navarra and Pa\u00eds Vasco are absent from the common-regime Hacienda rate export and require foral or municipal-source completion.",
    ],
    licenseAndAttribution: {
      ine: "INE reuse conditions are linked from the INE legal notice and datos.gob.es catalog entry.",
      hacienda: "Ministerio de Hacienda official public consultation export; retain source URL, source checksum and exercise.",
      boe: "BOE consolidated legislation used only as legal validation basis.",
    },
    warning: "Tarifas municipales IVTM 2025 no equivalen automaticamente a tarifas exactas 2026.",
  };
}

function prepareJsonOutput(path, value) {
  const text = stableJson(value);
  JSON.parse(text);
  return { path, text, sha256: sha256Text(text) };
}

function writeTempJsonOutput(output) {
  mkdirSync(dirname(output.path), { recursive: true });
  const suffix = `${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const tempPath = join(dirname(output.path), `.${basename(output.path)}.${suffix}.tmp`);
  writeFileSync(tempPath, output.text, "utf8");
  const persisted = readFileSync(tempPath, "utf8");
  JSON.parse(persisted);
  const persistedSha256 = sha256Text(persisted);
  if (persistedSha256 !== output.sha256) {
    throw new Error(`Hash mismatch while preparing ${output.path}`);
  }
  return tempPath;
}

function replaceJsonOutputsAtomically(outputs, { simulateFailureBeforeRename = false } = {}) {
  const tempPaths = [];
  const backups = [];
  try {
    for (const output of outputs) {
      tempPaths.push({ output, tempPath: writeTempJsonOutput(output) });
    }
    if (simulateFailureBeforeRename) {
      throw new Error("Simulated failure before atomic rename");
    }
    for (const { output, tempPath } of tempPaths) {
      const backupPath = existsSync(output.path) ? `${output.path}.bak-${process.pid}-${Date.now()}` : null;
      if (backupPath) renameSync(output.path, backupPath);
      backups.push({ targetPath: output.path, backupPath, replaced: false });
      renameSync(tempPath, output.path);
      backups[backups.length - 1].replaced = true;
    }
  } catch (error) {
    for (let i = backups.length - 1; i >= 0; i -= 1) {
      const backup = backups[i];
      try {
        if (backup.replaced && existsSync(backup.targetPath)) rmSync(backup.targetPath, { force: true });
        if (backup.backupPath && existsSync(backup.backupPath)) renameSync(backup.backupPath, backup.targetPath);
      } catch {
        // Preserve the original failure; cleanup is best-effort.
      }
    }
    throw error;
  } finally {
    for (const { tempPath } of tempPaths) {
      try {
        if (existsSync(tempPath)) rmSync(tempPath, { force: true });
      } catch {
        // Best-effort temp cleanup.
      }
    }
    for (const backup of backups) {
      try {
        if (backup.backupPath && existsSync(backup.backupPath)) rmSync(backup.backupPath, { force: true });
      } catch {
        // Best-effort backup cleanup.
      }
    }
  }
}

export async function generateIvtmDatasets(options = {}) {
  const {
    ineSource = DEFAULT_SOURCES.ine,
    haciendaSource = DEFAULT_SOURCES.hacienda,
    outputDir = "src/data/ivtm",
    catalogYear = 2026,
    ratesYear = 2025,
    allowStructuralChange = false,
  } = options;
  const resolvedOutputDir = isAbsolute(outputDir) ? outputDir : resolve(process.cwd(), outputDir);

  const readOptions = { downloadTimeoutMs: options.downloadTimeoutMs, maxDownloadBytes: options.maxDownloadBytes };
  const [ine, hacienda] = await Promise.all([readSource(ineSource, readOptions), readSource(haciendaSource, readOptions)]);
  const municipalities = parseIneMunicipalities(ine.buffer, { catalogYear });
  const rates = parseHaciendaRates(hacienda.buffer, { ratesYear });
  assertFullContract({ municipalities, rates, allowStructuralChange });

  const municipalityPath = join(resolvedOutputDir, `municipalities-${catalogYear}.json`);
  const ratesPath = join(resolvedOutputDir, `municipal-rates-${ratesYear}.json`);
  const metadataPath = join(resolvedOutputDir, "metadata.json");
  const municipalityOutput = prepareJsonOutput(municipalityPath, municipalities);
  const ratesOutput = prepareJsonOutput(ratesPath, rates);
  const metadata = buildMetadata({
    catalogYear,
    ratesYear,
    ineSource: ine.source,
    haciendaSource: hacienda.source,
    municipalities,
    rates,
    sourceChecksums: { ine: ine.sha256, hacienda: hacienda.sha256 },
    datasetChecksums: {
      [`municipalities-${catalogYear}.json`]: municipalityOutput.sha256,
      [`municipal-rates-${ratesYear}.json`]: ratesOutput.sha256,
    },
  });
  const metadataOutput = prepareJsonOutput(metadataPath, metadata);
  replaceJsonOutputsAtomically([municipalityOutput, ratesOutput, metadataOutput], {
    simulateFailureBeforeRename: options.simulateFailureBeforeRename,
  });
  const municipalitiesSha256 = municipalityOutput.sha256;
  const ratesSha256 = ratesOutput.sha256;
  const metadataSha256 = metadataOutput.sha256;

  return {
    municipalities,
    rates,
    metadata,
    files: {
      municipalities: municipalityPath,
      rates: ratesPath,
      metadata: metadataPath,
    },
    checksums: {
      sources: { ine: ine.sha256, hacienda: hacienda.sha256 },
      datasets: {
        municipalities: municipalitiesSha256,
        rates: ratesSha256,
        metadata: metadataSha256,
      },
    },
  };
}

function sizeLine(path) {
  const bytes = statSync(path).size;
  const gzipBytes = gzipSync(readFileSync(path)).length;
  return `${path}: ${bytes} bytes, gzip estimate ${gzipBytes} bytes`;
}
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await generateIvtmDatasets(args);
  const missing = result.metadata.missingRates;
  const anomalies = result.metadata.anomalies;
  console.log("IVTM data import completed");
  console.log(`- municipalities: ${result.municipalities.length}`);
  console.log(`- rates: ${result.rates.length}`);
  console.log(`- missing rates: ${missing.total} (foral ${missing.foral}, common regime ${missing.commonRegime})`);
  console.log(`- anomalies: ${anomalies.length}`);
  console.log(`- INE source sha256: ${result.checksums.sources.ine}`);
  console.log(`- Hacienda source sha256: ${result.checksums.sources.hacienda}`);
  console.log(`- ${sizeLine(result.files.municipalities)}`);
  console.log(`- ${sizeLine(result.files.rates)}`);
  console.log(`- ${sizeLine(result.files.metadata)}`);
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || String(error));
    process.exit(1);
  });
}
