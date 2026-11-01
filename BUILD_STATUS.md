# Build and verification status — 2026-11-01

## Verification completed in this workspace

- `node scripts/check-content.mjs`: PASS (21 articles, five new stone guides in each of three languages).
- `node --test tests/*.test.mjs`: PASS (20 tests).
- Global TypeScript `transpileModule` syntax pass on 30 TS/TSX source files: PASS (no parse diagnostics). **This is not TypeScript semantic checking.**
- YAML parse with Python PyYAML for all 21 Markdown files: PASS.
- Confirmed both original fonts are present at `src/app/fonts/Miremad.ttf` and `src/app/fonts/Dirooz.ttf`.
- Confirmed new `/insights/` route and `/journal/` Cloudflare redirects, SEO sitemap, image credit metadata.

## Production build attempt

The complete `npm run build` **was attempted but could not run Next.js**: this environment does not have `node_modules` and npm registry access fails with `EAI_AGAIN` (DNS resolution unavailable). `next: not found` occurs before Next.js compilation.

**A successful `pnpm run build` is NOT claimed.** On a connected machine run:

```sh
pnpm install
pnpm test
pnpm run build
pnpm dev
```

If a build error appears, do not deploy until corrected.

## Editorial imagery

New guide cover images are linked remotely from Wikimedia Commons; the ZIP includes the source and license/attribution metadata, not the photo JPEGs themselves. To download and self-host the photos on Cloudflare, run `pnpm run images:cache` on a network-connected machine, then commit the updated `content/articles/*.md` and `public/images/insights/*.jpg` before deploying. This optional command is not run by builds.

Photos are editorial examples, not evidence of Iranian products or available inventory.
