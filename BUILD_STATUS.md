# Build and QA status — 2026-11-01

## User's Windows test (Next.js 16.4.3)

- `pnpm i` succeeded; 107 packages installed.
- `pnpm run build` validated six Markdown posts, compiled successfully, and completed TypeScript.
- The build then failed collecting `/robots.txt` because Next.js 16 static export requires `dynamic = 'force-static'` for generated metadata routes.

## Fix included in this revision

- Added `export const dynamic = 'force-static';` to **both** `src/app/robots.ts` and `src/app/sitemap.ts`.
- Added a regression test to ensure those declarations remain in both files.

## Tests completed in this workspace

- `node --test tests/*.test.mjs`: all tests passed (5/5).
- `node scripts/check-content.mjs`: six Markdown posts validated.
- Both metadata route files statically inspected for the new export.

## Verification still required

This workspace cannot install the project's Next.js dependencies from the npm registry, so it has **not** run a fresh full production build. On the user's Windows machine:

```powershell
pnpm run build
Test-Path .\out\robots.txt
Test-Path .\out\sitemap.xml
```

Both `Test-Path` results should be `True`. Uploading to Cloudflare Pages is not done yet.
