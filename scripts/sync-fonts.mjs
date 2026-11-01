import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Copies user-provided, locally licensed font files into static export assets.
// No font downloads, hosted font APIs or hidden dependencies.
const source = resolve('src/app/fonts');
const destination = resolve('public/fonts');
mkdirSync(destination, { recursive: true });
for (const name of ['Dirooz.ttf', 'Miremad.ttf']) {
  const original = resolve(source, name);
  if (!existsSync(original)) {
    console.warn(`[fonts] ${name} not present locally. CSS fallback will be used until the owner adds it to ${source}.`);
    continue;
  }
  copyFileSync(original, resolve(destination, name));
  console.log(`[fonts] Prepared ${name} for static export.`);
}
