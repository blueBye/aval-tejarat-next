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
