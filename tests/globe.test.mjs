import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = file => readFileSync(file, 'utf8');

test('globe has a valid Iran-only highlight polygon', () => {
  const feature = JSON.parse(read('src/data/iran-border.json'));
  assert.equal(feature.properties.iso_a3, 'IRN');
  assert.equal(feature.geometry.type, 'Polygon');
  const ring = feature.geometry.coordinates[0];
  assert.ok(ring.length > 50, 'Iran outline must have detailed geographic coordinates');
  assert.deepEqual(ring[0], ring.at(-1), 'polygon must be closed');
  assert.ok(ring.every(([longitude, latitude]) => longitude > 40 && longitude < 65 && latitude > 24 && latitude < 41));
});

test('globe ships with a local texture and no runtime geography services', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.match(source, /three-globe/);
  assert.match(source, /\.globeImageUrl\("\/images\/globe-earth-dark\.png"\)/);
  assert.match(source, /\.polygonsData\(\[iran\]\)/);
  assert.match(source, /\.arcDashAnimateTime/);
  assert.match(source, /const planeShape = new THREE\.Shape/);
  assert.match(source, /\.autoRotateSpeed/);
  assert.match(source, /prefers-reduced-motion/);
  assert.ok(readFileSync('public/images/globe-earth-dark.png').length > 10000);
});

test('large FA/AR headings consistently use Miremad font', () => {
  const css = read('src/app/globe.css');
  for (const selector of [
    '.hero h1', '.page-hero h1', '.sector-detail-inner h1',
    '.article-head-inner h1', '.section-title', '.cta-panel h2',
  ]) {
    assert.ok(css.includes(`html[dir="rtl"] ${selector}`), `Missing Miremad selector: ${selector}`);
  }
  assert.match(css, /font-family:\s*var\(--font-miremad\)/);
});
