# Nexora — international AI studio site

Astro SSG + Tailwind CSS v4 + Supabase (PostgreSQL) at **build time**. Visitors receive static HTML; the database is not called from the browser.

## 1. Install

```bash
npm install
cp .env.example .env
```

Fill `.env`:

| Variable | Where it is used |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical URLs, Open Graph, `sitemap-index.xml` |
| `SUPABASE_URL` | Build-time fetch only (server) |
| `SUPABASE_ANON_KEY` | Build-time fetch only (anon key + RLS) |
| `PUBLIC_FORM_ENDPOINT` | Optional POST target for `/contacts` |

Without Supabase credentials the build still succeeds: pages use local fallback content from `src/lib/fallback.ts`.

```bash
npm run dev
npm run build
```

## 2. Supabase tables

1. Create a project at [supabase.com](https://supabase.com).
2. SQL Editor → paste and run `supabase/schema.sql`.
3. **Replace** the seed row in `legal_info` with real ЕГРЮЛ data (full name, ИНН, ОГРН, КПП, address, contacts) **before** filing for accreditation.
4. Copy Project URL and `anon` `public` key into `.env` and into Cloudflare Pages environment variables.
5. Do **not** put `service_role` in the Astro project.

Row Level Security allows `SELECT` of active catalogue/cases and of `legal_info` for `anon`. There are no public insert/update policies.

Cloudflare Pages rebuilds the site on git push, so content changes in Supabase appear after the next build — not on every page view.

## 3. Cloudflare Pages + DNS

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: **22**
- Environment variables: the same four keys as `.env`

Move the domain’s DNS to Cloudflare (full setup) so the site resolves both globally and from Russia without a VPN. Pages provides HTTPS. After the first production deploy, set `PUBLIC_SITE_URL` to the real `https://` origin and rebuild so the sitemap uses the correct host.

Submit `https://<domain>/sitemap-index.xml` in Google Search Console and Yandex Webmaster.

## 4. Accreditation page

Russian legal page, always public:

`/ru/it-organization`

It renders `legal_info`, OKVED 62.01, activity codes from Order No. 449, the implementation stack, base tariffs, and the own SaaS product (Nexora Pulse) in R&D. Linked from the footer of every page. No captcha, login, or extra JavaScript.

## 5. Architecture notes

- `output: "static"` — no adapter required for Cloudflare Pages.
- `@astrojs/sitemap` writes `sitemap-index.xml` on every build.
- Images go through `astro:assets` `<Image />` (local SVG case graphics).
- Content pages ship **no client-side JS**. The mobile menu is a CSS checkbox.

Replace placeholder legal identifiers in `legal_info` before any government filing. The seed INN/OGRN are not a real entity.
