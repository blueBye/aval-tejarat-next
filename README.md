# Aval Tejarat Persian — Next.js + Markdown + Cloudflare Pages

A static, multilingual corporate website for an Iranian buyer-led sourcing/export coordination business. Built without a database, hosted server, CMS login, API endpoints, or paid SaaS dependency.

**Languages:** English (`/en/`), Persian (`/fa/`, RTL), Arabic (`/ar/`, RTL).  
**Pages:** Home, About, Sectors, Sector details, Process, Journal, Article, Contact.  
**Inquiries:** Visitors fill a sourcing brief and WhatsApp opens with a prefilled message; nothing is stored on this website.

## Quick start

Requirements: Node.js 22 recommended, npm, Git.

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
title: "Practical questions before sourcing food products"
description: "A short introduction to evaluating packaged food inquiries."
language: en
slug: food-sourcing-questions
translationKey: food-sourcing-questions
date: 2026-10-29
category: Food products
cover: /illustrations/food.svg
featured: false
draft: false
---

# Your article title

Write your **Markdown** here.

## What to check

- Product specifications
- Packaging and shelf life
- Import requirements in the destination country
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

Make two more `.md` files with the **same `translationKey`** and `language: fa` and `language: ar`, with translated title, description and body. You can use the same slug in all languages; the language switch opens the matching translation if available, or returns to the target language's journal index if the article has not been translated. Every new committed article triggers a fresh static build.

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

On the contact page, the required fields are name, product, and destination. Sending prepares a localized message and opens `https://wa.me/<number>?text=<encoded-message>` in a new tab. Optional values are included only when entered. No data is submitted to our servers. A working WhatsApp app/account and browser support are required to complete sending; the visitor must still press Send within WhatsApp.

If `NEXT_PUBLIC_WHATSAPP_NUMBER` is blank, the send button is disabled and a configuration warning is shown. This is intentional — we never send visitors to an invented number. **This variable is compiled into the public JS bundle and must not be secret.** After changing it, trigger a new Cloudflare build.

## Deploy on Cloudflare Pages (Git integration)

1. Push the source to a new GitHub repository (see commands below).
2. In Cloudflare Dashboard: **Workers & Pages → Create application → Pages → Import existing Git repository**.
3. Select the GitHub repository, production branch `main`.
4. Choose framework preset **Next.js (Static HTML Export)**. Set:

   | Setting | Value |
   |---|---|
   | Root directory | `/` |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Node.js version | `22` (set `NODE_VERSION=22` when needed) |
   | Environment variables | `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` |

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

For Cloudflare Pages, deploy only after `out/robots.txt` and `out/sitemap.xml`
have been generated successfully.

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

Supplier availability, shipment feasibility, legal eligibility, prices, and quality are **not guaranteed**. This positioning matches the existing business site. The six included articles are starter editorial examples; have the business owner review them before publishing under the company name.
