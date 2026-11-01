import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

test('all Markdown articles have valid frontmatter', () => {
  assert.match(execFileSync(process.execPath, ['scripts/check-content.mjs'], { encoding: 'utf8' }), /Validated \d+ Markdown articles/);
});
test('Cloudflare deployment is static and database-free', () => {
  const config=readFileSync('next.config.ts','utf8');
  assert.match(config, /output:\s*'export'/);
  const manifest=JSON.parse(readFileSync('package.json','utf8'));
  assert.equal(manifest.scripts.build.includes('next build'),true);
  assert.equal('prisma' in manifest.dependencies,false);
  assert.equal('drizzle-orm' in manifest.dependencies,false);
});
test('WhatsApp number is not hard-coded', () => {
  const source=readFileSync('src/lib/whatsapp.ts','utf8');
  assert.match(source,/NEXT_PUBLIC_WHATSAPP_NUMBER/);
  assert.match(source,/encodeURIComponent/);
});
