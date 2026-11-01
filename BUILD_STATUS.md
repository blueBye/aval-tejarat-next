# Verification status — stone-only Blog revision

- New public route: `/en/blog/`, `/fa/blog/`, `/ar/blog/`. Old `insights` and `journal` URLs redirect on Cloudflare Pages.
- Business catalogue: natural stone, travertine, marble, granite only.
- Published articles: 18 Markdown posts, 6 per language, all about natural stone.
- Automated tests: **22 passed** (`node --test tests/*.test.mjs`).
- Content validator: **18 files passed** (`node scripts/check-content.mjs`).
- TypeScript / TSX syntax transpilation: **30 files, 0 parser diagnostics** (global TypeScript).
- Full Next.js production build: **NOT VERIFIED**. Attempted `npm run build`; dependency installation timed out and `next` is not available in this environment (`sh: next: not found`). Syntax tests are not a substitute for `next build`.
- Font binaries: preserved in the working folder but excluded from the deliverable; the app supports optional local fonts copied by `scripts/sync-fonts.mjs`, with fallback fonts if absent.

Run on your machine after installing dependencies:

```powershell
pnpm install
pnpm test
pnpm run build
```

The package should not be considered a build-verified release until `pnpm run build` completes.
