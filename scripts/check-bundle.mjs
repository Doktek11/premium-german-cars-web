import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");
const assetsDir = join(distDir, "assets");
const manifestPath = join(distDir, ".vite", "manifest.json");
const maxInitialKb = Number(process.env.MAX_INITIAL_JS_KB || 280);
const isStrict = process.env.BUNDLE_CHECK_STRICT === "1";

function toKb(bytes) {
  return bytes / 1024;
}

function loadManifest() {
  try {
    return JSON.parse(readFileSync(manifestPath, "utf-8"));
  } catch {
    return null;
  }
}

function collectInitialFilesFromManifest(manifest) {
  const entries = Object.values(manifest).filter((item) => item && item.isEntry);
  const initialJs = new Set();

  const visit = (item) => {
    if (!item) return;

    if (item.file && item.file.endsWith(".js")) {
      initialJs.add(item.file);
    }

    if (Array.isArray(item.imports)) {
      for (const importedKey of item.imports) {
        visit(manifest[importedKey]);
      }
    }
  };

  for (const entry of entries) {
    visit(entry);
  }

  return [...initialJs];
}

function collectInitialFilesFromHtml() {
  try {
    const html = readFileSync(join(distDir, "index.html"), "utf-8");
    const matches = [
      ...html.matchAll(
        /<script[^>]+src=["'](?:\/?assets\/)([^"']+\.js)["'][^>]*>/g
      ),
    ];
    return matches.map((match) => match[1]);
  } catch {
    return [];
  }
}

function measureAllJsFiles() {
  const jsFiles = readdirSync(assetsDir).filter((file) => file.endsWith(".js"));
  return jsFiles.map((file) => {
    const fullPath = join(assetsDir, file);
    return { file, sizeKb: toKb(statSync(fullPath).size) };
  });
}

const measured = measureAllJsFiles();
const manifest = loadManifest();

let initialChunks = [];
let mode = "manifest";

if (manifest) {
  const initialFromManifest = collectInitialFilesFromManifest(manifest);
  initialChunks = measured.filter((item) => initialFromManifest.includes(item.file));
} else {
  const initialFromHtml = collectInitialFilesFromHtml();

  if (initialFromHtml.length > 0) {
    mode = "fallback-index-html";
    initialChunks = measured.filter((item) => initialFromHtml.includes(item.file));
  } else {
    mode = "fallback-all-js";
    initialChunks = measured;
  }
}

const initialTotalKb = initialChunks.reduce((acc, item) => acc + item.sizeKb, 0);

const measuredSorted = [...measured].sort((a, b) => b.sizeKb - a.sizeKb);
const initialSorted = [...initialChunks].sort((a, b) => b.sizeKb - a.sizeKb);

console.log("\nBundle report (JS):");
for (const item of measuredSorted) {
  console.log(`- ${item.file}: ${item.sizeKb.toFixed(2)} KB`);
}

console.log(`\nInitial detection mode: ${mode}`);
console.log("Initial chunks:");
for (const chunk of initialSorted) {
  console.log(`- ${chunk.file}: ${chunk.sizeKb.toFixed(2)} KB`);
}

console.log(
  `\nInitial JS estimate: ${initialTotalKb.toFixed(2)} KB (threshold: ${maxInitialKb} KB)`
);

if (mode !== "manifest" && isStrict) {
  console.error(
    `❌ Strict mode enabled and manifest is unavailable (mode=${mode}). ` +
      "Build should expose manifest for deterministic checks."
  );
  process.exit(1);
}

if (initialTotalKb > maxInitialKb) {
  console.error(
    `❌ Initial JS exceeded threshold by ${(initialTotalKb - maxInitialKb).toFixed(
      2
    )} KB. Review lazy loading / dependencies.`
  );
  process.exit(1);
}

console.log("✅ Initial JS is within threshold.");
