# Aval Tejarat Persian — Next.js + Markdown + Cloudflare Pages

A static, multilingual natural-stone sourcing and export website. Built without a database, hosted server, CMS login, API endpoints, or paid SaaS dependency.

**Languages:** English (`/en/`), Persian (`/fa/`, RTL), Arabic (`/ar/`, RTL).  
**Pages:** Home, About, Sectors, Sector details, Process, Blog, Article, Contact.  
**Inquiries:** Visitors fill a sourcing brief and WhatsApp opens with a prefilled message; nothing is stored on this website.

## Quick start

Requirements: Node.js 22, npm or pnpm, Git.

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local
npm run dev
```

Visit `http://localhost:3000/en/`, `/fa/`, or `/ar/`.

To verify changes:

```bash
npm test
npm run content:check
npm run typecheck
npm run build
```

Static HTML and assets will be in `out/`. The build does **not** require a server at runtime.

## Publishing new blog posts

Create a Markdown file in `content/articles/` (filename can be anything ending in `.md`). The `language` **frontmatter** field selects the language. Examples for all three languages are already present.

```md
---
title: "Travertine procurement checklist"
description: "A practical guide to specifying, sampling and inspecting Iranian travertine."
language: en
slug: travertine-buyers-checklist
translationKey: travertine-buyers-checklist
date: 2026-10-29
category: Natural stone
cover: /illustrations/travertine.svg
featured: false
draft: false
---

# Your article title

Write your **Markdown** here.

## What to check

- Product specifications
- Stone finishing and tolerances
- Stone samples and inspection
```

- `language`: `en`, `fa`, or `ar` (required).
- `slug`: ASCII lowercase kebab-case URL path; must be unique within each language.
- `translationKey`: same value for translations of one article (not necessarily the slug).
- `date`: `YYYY-MM-DD` publication date, required.
- `title`, `description`, `category`: required strings.
- `draft: true`: suppresses an article from navigation, sitemap and generated pages; `false` publishes it.
- `featured`: reserved editorial flag; currently recent articles are shown on the home page.
- `cover`: public asset path, optionally `/illustrations/stone.svg` or a photo you put under `public/images/`. Prefer locally hosted optimized images for performance.

### Adding translations

Make two more `.md` files with the **same `translationKey`** and `language: fa` and `language: ar`, with translated title, description and body. You can use the same slug in all languages; the language switch opens the matching translation if available, or returns to the target language's blog index if the article has not been translated. Every new committed article triggers a fresh static build.

### Publication workflow

1. Create/edit Markdown in the repository (GitHub web editor or locally).
2. Set `draft: false` when ready.
3. Commit/push to `main`. GitHub Actions checks the content and runs a build; when Cloudflare Pages is connected to the repository, it independently builds and deploys `main` automatically.
4. A Pull Request can be used to preview or review content before publishing.

No administration panel exists: GitHub **is** the editing and approval interface.

## WhatsApp contact

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the real business phone number in full international format, without plus sign, spaces or dashes. **Example only:** `971501234567` (do not use the example in production).

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=<REAL_BUSINESS_NUMBER>
NEXT_PUBLIC_SITE_URL=https://avaltejaratpersian.com
```

On the contact page, the required fields are name, stone type, and destination. Sending prepares a localized message and opens `https://wa.me/<number>?text=<encoded-message>` in a new tab. Optional values are included only when entered. No data is submitted to our servers. A working WhatsApp app/account and browser support are required to complete sending; the visitor must still press Send within WhatsApp.

If `NEXT_PUBLIC_WHATSAPP_NUMBER` is blank, the send button is disabled and a configuration warning is shown. This is intentional — we never send visitors to an invented number. **This variable is compiled into the public JS bundle and must not be secret.** After changing it, trigger a new Cloudflare build.

## Deploy on Cloudflare Pages (Git integration)

1. Push the source to a new GitHub repository (see commands below).
2. In Cloudflare Dashboard: **Workers & Pages → Create application → Pages → Import existing Git repository**.
3. Select the GitHub repository, production branch `main`.
4. Choose framework preset **Next.js (Static HTML Export)**. Follow `DEPLOY_CLOUDFLARE_PAGES.md` for complete setup. Set:

   | Setting | Value |
   |---|---|
   | Root directory | `/` |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Node.js version | `22` (set `NODE_VERSION=22` when needed) |
   | Environment variables | `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` |
   | Deploy / start command | **None — Pages publishes `out/` automatically** |

5. Deploy. Cloudflare gives a `*.pages.dev` preview URL. Add `avaltejaratpersian.com` in **Custom domains** after validating the preview and DNS settings.
6. Future pushes to `main` automatically rebuild and deploy. Pull requests receive preview builds when enabled.

The `/` route redirects to `/en/` on Cloudflare using `public/_redirects`; static HTML has a fallback language selector for other hosts.

**Cloudflare Pages is hosting the prebuilt `out/` files, not running Next.js at request time.** This architecture supports only build-time features. If you later need account management, private CRM, database-backed posts, payments or server-side submissions, add server capabilities then.

### First push

```bash
git init
git add .
git commit -m "Build multilingual static sourcing website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

You need to create the target GitHub repository first and have permission to push to it.

## Next.js 16 static export note

With `output: 'export'`, generated metadata routes `src/app/robots.ts` and
`src/app/sitemap.ts` must include `export const dynamic = 'force-static';`.
The regression test in `tests/content.test.mjs` checks both files.
Otherwise `pnpm run build` may fail while collecting data for `/robots.txt`
or `/sitemap.xml` even after successful compilation and TypeScript checking.

```bash
pnpm run build
```

The build now validates the Pages output automatically, including `out/robots.txt`, `out/sitemap.xml`, localized pages and both fonts.

## Architecture

- `src/app/(localized)/[locale]/` — localized static Next.js pages
- `src/components/` — reusable UI + animations + WhatsApp inquiry form
- `src/lib/i18n.ts` — all UI translations (not article bodies)
- `src/lib/articles.ts` — filesystem Markdown loader, sanitized HTML, publishing rules
- `content/articles/` — all blog posts, each with language frontmatter
- `public/` — SVG assets, Cloudflare redirects and security headers
- `scripts/check-content.mjs` — prebuild content validation
- `.github/workflows/check.yml` — CI tests and static build

## Important editorial notes

Supplier availability, shipment feasibility, legal eligibility, prices, and quality are **not guaranteed**. This positioning matches the existing business site. The 18 included stone articles are editorial examples; have the business owner review them before publishing under the company name.

## 3D animated globe and display typography

The home page now contains a client-side **three-globe / Three.js** visualization. This keeps the site compatible with `output: 'export'` and Cloudflare Pages (no server runtime, no map API). The local `public/images/globe-earth-dark.png` is a geographic texture generated from the bundled Basemap/Natural Earth outlines. `src/data/iran-border.json` is the simplified GeoJSON boundary for Iran; **only Iran** receives a gold polygon overlay. Other countries remain dark.

Animated arcs are illustrative (not live flights or confirmed routes). The animated airplane silhouettes follow spherical paths above the globe. The globe auto-rotates smoothly; pointer-based interaction is disabled and reduced-motion preferences are respected. WebGL-unavailable devices see a CSS fallback.

To customize destinations, edit the `flights` array in `src/components/trade-globe.tsx`. All coordinates are decimal latitude/longitude. Additional destinations do not require new database records or API keys.

### Fonts

- Miremad (`src/app/fonts/Miremad.ttf`): homepage display title, sector and green-background page titles, major section headings and selected callouts in Persian and Arabic.
- Dirooz (`src/app/fonts/Dirooz.ttf`): body copy and interface text.
- English display titles: classical serif fallbacks (Georgia / Palatino / Iowan Old Style).
- The font stacks and local `@font-face` declarations live in `src/app/globals.css`, with heading rules in `src/app/globe.css`. `scripts/sync-fonts.mjs` copies locally supplied files from `src/app/fonts/` to `public/fonts/` before development and production builds.

**The complete project ZIP provided here contains both of your supplied font files** in `src/app/fonts/`. Keep them in your private Git repository if the licenses allow it; the build also copies them to `public/fonts/`.

### Local verification

```powershell
pnpm install
pnpm test
pnpm run build
pnpm dev
```

The new `three` and `three-globe` dependencies will download during `pnpm install`. Please test the globe with a hardware-accelerated browser on both desktop and mobile; automated tests check the source and the geographic data but do not verify WebGL rendering visually.

### Globe animation settings (Nov 2026)

The globe component lives in `src/components/trade-globe.tsx`.
It currently uses seven illustrative long-haul routes with 5.4-second flight cycles, camera-facing plane icons, and 50% faster automatic rotation than the previous revision. The airplane and the leading endpoint of its golden arc share the same interpolated position; globe interaction stays disabled. The lower hemisphere gradient fade is controlled by `src/app/globe.css`.

Both original font files are included in this complete project and required by the static-export verification. When updating the source tree, preserve `src/app/fonts/` and commit both files to your private repository if the licenses allow.

## Stone blog and photographs

The editorial section is now `/en/blog/`, `/fa/blog/`, and `/ar/blog/`.
Old `/insights/` and `/journal/` URLs redirect to `/blog/` on Cloudflare Pages via `public/_redirects`.

Five stone buyer guides each have English, Persian, and Arabic Markdown translations.
Cover images use reusable Wikimedia Commons photographs, **not actual Aval Tejarat
Persian inventory or Iranian supply documentation**. The URL, photographer,
license and attribution are included in the frontmatter of each post and
`content/IMAGE_CREDITS.json`. The default covers are served from Wikimedia
Commons and require image access in a visitor's browser.

To serve images directly from your Cloudflare Pages deployment instead:

```sh
pnpm run images:cache
pnpm run content:check
pnpm run build
```

This is an **optional, one-time, network-dependent** download. It writes
`public/images/blog/*.jpg` and rewrites the new article frontmatter
to local image paths. Commit both the images and Markdown changes. It does not
run automatically during `pnpm build` (CI remains offline/static).

Images use photographers' open licenses. Keep visible attribution for the
CC BY-SA licensed photographs, including links to the image information pages.

The reading layout uses `padding-inline` instead of direction-specific
left/right paddings; it applies evenly to all languages.
