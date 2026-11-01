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
  assert.match(source, /const planeShape = new THREE\.Shape/);
  assert.match(source, /const geometry = new THREE\.BufferGeometry/);
  assert.match(source, /line\.geometry\.setDrawRange/);
  assert.match(source, /globe\.quaternion\.copy\(spin\)\.multiply\(initialOrientation\)/);
  assert.doesNotMatch(source, /globe\.rotateOnWorldAxis/);
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

// Keep this type-critical call aligned with the three-globe API.
test('point of view is updated with the camera object', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.match(source, /globe\.setPointOfView\(camera\)/);
  assert.doesNotMatch(source, /globe\.setPointOfView\(camera\.position\)/);
});


test('globe is noninteractive and initially centered on Iran', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.doesNotMatch(source, /OrbitControls/);
  assert.match(source, /pointer-events:none/);
  assert.match(source, /const IRAN_CENTER/);
  assert.match(source, /geoVector\(IRAN_CENTER\.lat, IRAN_CENTER\.lng\)/);
  assert.match(source, /quaternion\.setFromRotationMatrix\(localOrientation\)\.invert\(\)\.normalize\(\)/);
});

test('simultaneous short flights originate from cities across Iran and each plane stays at its arc head', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.match(source, /const FLIGHT_DURATION_MS = 5400/);
  assert.equal((source.match(/originLat:/g) || []).length, 8, 'Seven Iranian origins plus type');
  assert.match(source, /flightPaths\.forEach\(flight =>/);
  assert.match(source, /tip\.copy\(points\[head\]\)\.lerp\(points\[head \+ 1\]/);
  assert.match(source, /positions\.setXYZ\(partialIndex, tip\.x, tip\.y, tip\.z\)/);
  assert.match(source, /line\.geometry\.setDrawRange\(tail, head - tail \+ 2\)/);
  assert.doesNotMatch(source, /arcDashAnimateTime/);
});

test('no globe labels and a lower-half gradient fade', () => {
  const css = read('src/app/globe.css');
  const component = read('src/components/trade-globe.tsx');
  assert.doesNotMatch(component, /trade-globe__topline|trade-globe__caption|IRAN ORIGIN|GLOBAL REACH|Auto-rotating/);
  assert.match(css, /mask-image: linear-gradient\(to bottom/);
});


test('routes span longer distances, animation is at most six seconds', () => {
  const source = read('src/components/trade-globe.tsx');
  const duration = Number(source.match(/const FLIGHT_DURATION_MS = (\d+)/)?.[1]);
  assert.ok(duration > 0 && duration <= 6000);
  const routes = [...source.matchAll(/originLat: ([-\d.]+), originLng: ([-\d.]+), endLat: ([-\d.]+), endLng: ([-\d.]+), phase:/g)];
  assert.equal(routes.length, 7);
  for (const route of routes) {
    const [a, b, c, d] = route.slice(1).map(value => Number(value) * Math.PI / 180);
    const cosine = Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(d - b);
    const angularDistance = Math.acos(Math.min(1, Math.max(-1, cosine))) * 180 / Math.PI;
    assert.ok(angularDistance >= 30, `Expected long-haul arc, got ${angularDistance.toFixed(1)} degrees`);
  }
});

test('plane heading tracks screen-space motion instead of rolling over the globe', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.match(source, /screenBefore\.copy/);
  assert.match(source, /screenAfter\.copy/);
  assert.match(source, /Math\.atan2\(-dx, dy\)/);
  assert.match(source, /plane\.quaternion\.copy\(inverseGlobe\)\.multiply\(camera\.quaternion\)\.multiply\(planeRoll\)/);
});

test('50 percent faster smooth rotation does not recalculate stationary camera every frame', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.match(source, /const ROTATION_RAD_PER_SECOND = 0\.012/);
  assert.match(source, /const tick = \(timestamp: number\) =>/);
  assert.match(source, /globe\.quaternion\.copy\(spin\)\.multiply\(initialOrientation\)/);
  assert.equal((source.match(/globe\.setPointOfView\(camera\)/g) || []).length, 1);
});

// Three.js getAttribute() can return InterleavedBufferAttribute, which lacks setUsage().
// Keep the concrete BufferAttribute reference when configuring animated route geometry.
test('animated route positions use an explicitly typed dynamic BufferAttribute', () => {
  const source = read('src/components/trade-globe.tsx');
  assert.match(source, /const positions = new THREE\.BufferAttribute\(/);
  assert.match(source, /positions\.setUsage\(THREE\.DynamicDrawUsage\)/);
  assert.match(source, /new THREE\.BufferGeometry\(\)\.setAttribute\("position", positions\)/);
  assert.match(source, /return \{ route, points, geometry, positions, line, plane/);
  assert.doesNotMatch(source, /getAttribute\("position"\)\.setUsage\(/);
});

test('locally supplied fonts are optional during build but synced when present', () => {
  const script = read('scripts/sync-fonts.mjs');
  const css = read('src/app/globals.css');
  for (const font of ['Dirooz.ttf', 'Miremad.ttf']) {
    assert.match(script, new RegExp(font.replace('.', '\\.')));
    assert.ok(css.includes(`/fonts/${font}`));
  }
  assert.match(script, /existsSync/);
});
