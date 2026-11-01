import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const read = file => readFileSync(file, 'utf8');

test('Cloudflare Pages builds a static Next.js export, without Worker deployment', () => {
  const nextConfig = read('next.config.ts');
  const pkg = JSON.parse(read('package.json'));
  assert.match(nextConfig, /output:\s*['"]export['"]/);
  assert.match(pkg.scripts.build, /next build/);
  assert.match(pkg.scripts.build, /verify:export/);
  assert.equal(existsSync('wrangler.jsonc'), false);
  assert.equal(existsSync('wrangler.toml'), false);
  assert.equal(existsSync('vite.config.ts'), false);
});

test('Pages preserves redirects and both supplied local font files', () => {
  const redirects = read('public/_redirects');
  assert.match(redirects, /^\/ \/en\/ 302/m);
  assert.match(redirects, /\/fa\/journal/);
  for (const font of ['Miremad.ttf', 'Dirooz.ttf']) {
    for (const dir of ['src/app/fonts', 'public/fonts']) {
      const file = `${dir}/${font}`;
      assert.ok(existsSync(file), `Missing ${file}`);
      assert.ok(statSync(file).size > 20000, `Font appears truncated: ${file}`);
    }
  }
});

test('Docs configure Pages Git integration and no server startup', () => {
  const guide = read('DEPLOY_CLOUDFLARE_PAGES.md');
  assert.match(guide, /Static HTML Export/);
  assert.match(guide, /Build output directory\s*\| `out`/);
  assert.match(guide, /Start or deploy command\s*\| \*\*None\*\*/);
});
