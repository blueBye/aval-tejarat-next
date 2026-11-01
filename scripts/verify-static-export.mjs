import { existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('out');
const required = [
  'index.html',
  'en/index.html',
  'fa/index.html',
  'ar/index.html',
  'en/blog/index.html',
  'fa/blog/index.html',
  'ar/blog/index.html',
  'en/blog/natural-stone-checklist/index.html',
  'sitemap.xml',
  'robots.txt',
  '_redirects',
  '_headers',
  'fonts/Miremad.ttf',
  'fonts/Dirooz.ttf',
];

const missing = required.filter((item) => {
  const filepath = join(out, item);
  return !existsSync(filepath) || !statSync(filepath).isFile() || statSync(filepath).size === 0;
});

if (missing.length > 0) {
  console.error('[pages] Static export is missing required files:');
  for (const filename of missing) console.error(`  - out/${filename}`);
  process.exitCode = 1;
} else {
  console.log(`[pages] Validated ${required.length} output files. Deploy the out/ directory to Cloudflare Pages.`);
}
