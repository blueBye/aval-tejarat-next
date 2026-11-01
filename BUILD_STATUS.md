# Build and release verification — Cloudflare Pages edition

## Current scope

- Static Next.js App Router export (`output: 'export'`, `trailingSlash: true`) for Cloudflare **Pages** Git integration.
- No Cloudflare Worker runtime, Wrangler deployment command, vinext, separate Node server, API database, or server process.
- Source content: 18 Markdown articles across Persian, Arabic and English, all stone-related.
- Both owner-provided fonts (`Miremad.ttf`, `Dirooz.ttf`) are INCLUDED in `src/app/fonts/` and `public/fonts/` in the delivered full project.

## Verified here

- Automated tests: **25 passed** using `node --test tests/*.test.mjs`.
- Markdown validation: **18 articles passed** using `node scripts/check-content.mjs`.
- Font synchronization: **both fonts copied and checked**, no missing files.
- Static-export verification script added; it runs after `next build` and fails if any required exported routes or assets are missing.
- Code and metadata configuration inspected for the Pages build path.

## Not verified here

- **Full Next.js production build: NOT VERIFIED.** `npm run build` was attempted. It performed font sync and Markdown validation, then stopped at `next: not found` because dependencies are not installed. Npm registry connectivity test returned `EAI_AGAIN` (DNS failure). This is not a compiled build, and the project must not be treated as production verified.
- Cloudflare's remote Git deployment is not started and its build logs have not been observed.
- WebGL visual appearance and contact handoff require browser checks after deployment.

## Verify in a network-enabled environment

```powershell
pnpm install
pnpm test
pnpm run build
```

After build succeeds, `out/` will contain all localized pages, redirects, headers, sitemap, robots and fonts. Upload this repository to GitHub, create a **Cloudflare Pages** Git project, set build command `npm run build`, output directory `out`, and configure the real WhatsApp number. See `DEPLOY_CLOUDFLARE_PAGES.md`.
