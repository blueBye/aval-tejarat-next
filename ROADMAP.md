# Aval Tejarat Persian — project roadmap

## Phase 1 — Architecture and editorial data — completed
- [x] Static Next.js export; no server or database
- [x] Git-based multilingual Markdown articles with YAML frontmatter
- [x] Published/draft status; per-language article and content validation
- [x] English/Persian/Arabic UI translations

## Phase 2 — Corporate website — implemented (build verification pending)
- [x] Responsive landing, about, sectors, sector details, process, blog, contact
- [x] RTL support and accessible navigation
- [x] Motion design with reduced-motion support
- [x] Article pages generated from Markdown
- [x] SEO metadata, multilingual canonical URLs and sitemap

## Phase 3 — Inquiries — implemented (verify with real number before launch)
- [x] WhatsApp link builder with URL-safe Unicode message
- [x] Client-only sourcing brief form, no backend and no storage
- [ ] Set real WhatsApp business number in Cloudflare build environment
- [ ] Verify end-to-end handoff on iOS, Android and desktop

## Phase 4 — Release and operational QA — pending connected build environment
- [x] GitHub Actions checks and static Cloudflare Pages output config
- [x] Dependency-free tests / content validation
- [ ] Install packages in a network-enabled environment and run npm run build
- [ ] Connect GitHub repository to Cloudflare Pages and configure custom domain
- [ ] Review sample articles with the business owner before making the site live
- [ ] Test multilingual display and typography in physical mobile browsers

## Optional future enhancements (still without a database)
- [ ] RSS feed
- [ ] Article topic filtering
- [ ] Generated Open Graph thumbnails
- [ ] Cookie-free analytics (Cloudflare Web Analytics)

## Visual refresh — Globe and typography (Nov 2026)
- [x] Apply Miremad to every major Persian/Arabic display heading (home, green page heroes, sectors, articles, calls to action)
- [x] Replace illustrative transport map with a Three.js / three-globe 3D Earth
- [x] Highlight only Iran using real GeoJSON coordinates
- [x] Render animated international links with airplane-shaped moving markers
- [x] Keep Earth texture local; no runtime mapping service or database
- [x] Support automatic rotation without pointer dragging, and reduced-motion settings
- [x] Add source/data regression checks
- [ ] Verify a full `pnpm run build` after installing new packages in a network-enabled environment
- [ ] Visually validate interactive WebGL behavior on desktop and mobile


## November 2026 stone-only scope clarification

- [x] Replace “Insights” with **Blog / وبلاگ / المدونة** in navigation, URLs, sitemap and headings.
- [x] Remove general non-stone blog posts; retain six natural-stone posts per language.
- [x] Replace food/industrial sector cards with natural stone, travertine, marble and granite.
- [x] Keep previous journal/insights URLs redirected to the new Blog paths.
- [x] Preserve client-side WhatsApp inquiries; no database.
- [x] Content checks, 25 regression tests and TSX syntax checks.
- [ ] Verify `pnpm run build` in a dependency-installed environment.

## Cloudflare Pages release setup (Nov 1, 2026)

- [x] Use Cloudflare **Pages** Git integration, not Workers Builds or a Node container.
- [x] Keep `next.config.ts` static export, `out/`, `trailingSlash`.
- [x] Build automatically validates generated localized routes, metadata, redirects, and font assets.
- [x] Include both supplied font binaries in the private full-project ZIP.
- [x] Document GitHub push, Pages settings, build-time variables and custom domain.
- [ ] Run complete Next.js build in a network-enabled environment (npm registry unavailable here).
- [ ] Verify first Pages build and actual deployed `pages.dev` routes.
