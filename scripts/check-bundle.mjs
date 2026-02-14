import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const assetsDir = join(process.cwd(), 'dist', 'assets');
const maxInitialKb = Number(process.env.MAX_INITIAL_JS_KB || 280);

const jsFiles = readdirSync(assetsDir).filter((file) => file.endsWith('.js'));

const measured = jsFiles.map((file) => {
  const fullPath = join(assetsDir, file);
  const sizeKb = statSync(fullPath).size / 1024;
  return { file, sizeKb };
});

const initialChunks = measured.filter((item) => /index|react|ui/.test(item.file));
const initialTotalKb = initialChunks.reduce((acc, item) => acc + item.sizeKb, 0);

console.log('\nBundle report (JS):');
for (const item of measured.sort((a, b) => b.sizeKb - a.sizeKb)) {
  console.log(`- ${item.file}: ${item.sizeKb.toFixed(2)} KB`);
}

console.log(`\nInitial JS estimate: ${initialTotalKb.toFixed(2)} KB (threshold: ${maxInitialKb} KB)`);

if (initialTotalKb > maxInitialKb) {
  console.error(
    `❌ Initial JS exceeded threshold by ${(initialTotalKb - maxInitialKb).toFixed(2)} KB. ` +
      'Review lazy loading / dependencies.'
  );
  process.exit(1);
}

console.log('✅ Initial JS is within threshold.');
