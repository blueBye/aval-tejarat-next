# Cloudflare Pages deployment — Aval Tejarat Persian

This site is a **Next.js static export**, not a running Next.js server. Cloudflare Pages installs dependencies, runs the build and serves the contents of `out/` through its CDN. You **do not** configure a start command, `next start`, `serve`, Workers deployment, vinext, or Wrangler.

Official guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

## 1. Verify locally (Windows PowerShell)

```powershell
pnpm install
pnpm test
pnpm run build
```

The build checks Markdown, generates the static export and validates the output: localized home and blog pages, redirects, headers, sitemap, robots, and **both fonts**. The source font files are at `src/app/fonts/` and the build copies them into `public/fonts/`.

## 2. Push to GitHub

The project source files must be at the repository root. Add and commit **the two font files** if your font licenses permit using them in a private repository, along with any blog images cached under `public/images/blog`. Git must not include `.env.local`, `.next`, `node_modules`, or `out`. Commit your lockfile (`pnpm-lock.yaml`) if you use pnpm.

```powershell
git init
git add .
git commit -m "Initial Cloudflare Pages deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aval-tejarat-persian.git
git push -u origin main
```

Create the private GitHub repository first and replace `YOUR_USERNAME`. If Git is already initialized, skip its initialization commands.

## 3. Create a **Pages**, not a Workers, project

Cloudflare dashboard → Workers & Pages → Create application → **Pages** → Import an existing Git repository → choose your repository. If the UI asks for a separate deploy command, you are in the Workers flow; go back and choose Pages.

| Setting | Value |
| --- | --- |
| Framework | Next.js (Static HTML Export) |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js | `22` |
| Start or deploy command | **None** |

`npm run build` works even if you use `pnpm` locally and executes the repository's full validation script. If you have committed a `pnpm-lock.yaml` and Cloudflare uses pnpm, you may instead configure `pnpm run build` and set `PNPM_VERSION=12.16.1` in Pages environment variables to match your local version.

Set environment variables in the **Pages build** settings (Production, and Preview if needed):

```text
NODE_VERSION=22
NEXT_PUBLIC_SITE_URL=https://avaltejaratpersian.com
NEXT_PUBLIC_WHATSAPP_NUMBER=<YOUR_REAL_NUMBER_WITH_COUNTRY_CODE>
```

The WhatsApp number must be digits only, without a leading `+`; never use the sample number. The app does not store user inquiries. Public variables are embedded at build time, so changing them requires a fresh build. The canonical domain can remain the intended production domain even for initial `pages.dev` previews.

Cloudflare Pages builds and publishes from `main`; it doesn't execute `pnpm start` or `pnpm dlx serve`. You can preview the published site at `https://<YOUR_PAGES_PROJECT>.pages.dev` once deployment succeeds. Test `/fa/`, `/en/`, `/ar/`, Blog pages, the globe and WhatsApp.

## 4. Connect the domain

Cloudflare Pages project → Custom domains → `avaltejaratpersian.com`. Follow Cloudflare's DNS guidance; preserve existing mail records before changing nameservers. Configure `www` separately if desired.

## 5. Publish Markdown articles

Add/edit Markdown files in `content/articles/`, set `language: en`, `fa`, or `ar`, commit and push. Every push to `main` triggers a Pages rebuild and deployment. No database, CMS process, server, or container is needed.

### Troubleshooting

- **Workers expects a deploy command:** create a Pages Git integration instead.
- **Pages cannot find `out/`:** set the correct root, output `out`, and use `npm run build` rather than only `next start`.
- **Fonts missing:** the ZIP contains `src/app/fonts/Miremad.ttf` and `Dirooz.ttf`; make sure your Git repository includes them.
- **WhatsApp disabled:** configure `NEXT_PUBLIC_WHATSAPP_NUMBER` in Pages and redeploy.
- **Build failure:** review the full Cloudflare build logs. `pnpm test` passing does not prove the Next.js production build succeeded.

## Local preview (optional)

`pnpm dev` runs Next.js locally. `pnpm run build && pnpm start` previews the static output using the `serve` package on your own computer. Cloudflare Pages never uses that local server.
