# Build and QA status — 2026-11-01

## New globe + typography update

- `three-globe` and `three` integration implemented in a dynamically loaded client-side component.
- Uses local static equirectangular Earth texture and a geographic Iran polygon.
- Airplane-shaped mesh markers animate along spherical paths; globe auto-rotates and supports user controls.
- `src/app/globe.css` applies Miremad to major RTL page and section titles.
- Site remains a static Next.js export and uses no database or mapping API.

## Local checks

- The new TSX files were transpile-parse-checked using TypeScript (no syntax diagnostics).
- Iran GeoJSON polygon was checked with Shapely: valid, closed, bounds inside Iran region, containing Tehran.
- Dependency-free globe tests and content tests can be run using `node --test tests/globe.test.mjs`.

## Not verified in this workspace

- A full Next.js production build and browser-based WebGL visual check require installing the newly added npm packages. npm registry access is unavailable in the current workspace.
- On Windows: `pnpm install`, then `pnpm test`, then `pnpm run build`. Deployment remains unchanged: Cloudflare Pages publishes `out/`.

2026-11-01: Globe update: 7 routes from multiple Iranian cities, synchronized fast plane/trail animation, upright orientation, no overlays, lower-half CSS gradient fade. Tests and Markdown validation pass. Full Next.js build not run (dependencies unavailable in workspace).

2026-11-01: Removed obsolete single-origin `ORIGIN` reference in `trade-globe.tsx` (line 101); all route origins are now sourced from `ROUTES`. Full Next.js build not verified locally; dependencies unavailable.

## 2026-11-01 — Long-flight and smooth-rotation iteration

- Seven illustrated long-haul routes now leave different Iranian cities (all arcs span at least 30° of great-circle distance).
- Each aircraft finishes its route in 5.4 seconds, with the visible line's endpoint explicitly following the plane's interpolated position.
- Airplane icon faces the viewer and points in the projected flight direction to avoid sideways-looking aircraft on globe edges.
- Rotation speed changed from 0.008 to 0.012 radians/second (+50%). Absolute, timestamp-derived rotation around screen-up preserves north/south upright orientation.
- Eliminated `setPointOfView(camera)` from every animation frame; it runs only when the camera projection is initialized/resized.
- Retained noninteractive controls, label-free globe, lower-half transparency gradient, local Earth texture, and existing font files in the working project.
- Validation: 15 Node tests pass, six Markdown posts pass content validation, TSX parse/transpile checks pass.
- Full Next.js build and real WebGL browser verification remain unverified because npm registry DNS/network access fails in this environment.
