# OBS Intellect / ООО «ОБС Интеллект»

Marketing site for a business-first technology partner. English at `/`, Russian at `/ru/`.

**Stack:** Astro 5 (static HTML) + Tailwind CSS v4 + PostgreSQL on Timeweb Cloud (read at **build time**) + **Netlify** for the test deploy. Production target: **Timeweb Cloud Apps** (serve `dist/`). Visitors never call the database from the browser.

Test URL: [https://obs-intellect.netlify.app](https://obs-intellect.netlify.app)

## 1. Install

```bash
npm install
cp .env.example .env
```

| Variable | Where it is used |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical URLs, Open Graph, `sitemap-index.xml` |
| `DATABASE_URL` | Build-time PostgreSQL only (`pg`). Not exposed to the client |
| `PUBLIC_FORM_ENDPOINT` | Optional POST target for `/contacts` |

Without `DATABASE_URL` the build still succeeds: pages use local fallback content from `src/lib/fallback.ts`.

```bash
npm run dev
npm run build
```

Dev server: `http://127.0.0.1:4321/` (`npm run dev`, not `astro preview`).

## 2. PostgreSQL (Timeweb Cloud)

1. Create a Managed PostgreSQL cluster in [Timeweb Cloud](https://timeweb.cloud/).
2. Open the cluster SQL console (Adminer) and run `db/schema.sql`.
3. **Replace** the seed row in `legal_info` with real ЕГРЮЛ data (full name, ИНН, ОГРН, КПП, address, contacts) **before** filing for accreditation.
4. Create a dedicated LOGIN role with **SELECT** only on `services_and_products`, `cases`, and `legal_info` (the script grants this to role `obs_build` if that role exists). Put that user’s connection string in `DATABASE_URL`.
5. There is no Supabase SDK and no Row Level Security. Access is ordinary PostgreSQL privileges on the build user.

Copy `DATABASE_URL` into `.env` and into the host’s build environment (Netlify now, Timeweb Apps later). A content change in PostgreSQL appears on the next site build, not on every page view.

## 3. Test hosting: Netlify

Git push to `main` triggers a production build (GitHub Action → Netlify).

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: **22**
- Environment: the same keys as `.env` (`PUBLIC_SITE_URL`, `DATABASE_URL`, optional `PUBLIC_FORM_ENDPOINT`)

After the first deploy, set `PUBLIC_SITE_URL` to `https://obs-intellect.netlify.app` (or the custom domain) and rebuild so the sitemap uses the correct host.

## 4. Production hosting: Timeweb Cloud Apps

When leaving the test stage:

1. Create a Cloud Apps application, Node **22**, build `npm run build`, publish `dist` (or run `npm start`, which serves `dist` via `scripts/serve-static.mjs`).
2. Set the same environment variables. Point `PUBLIC_SITE_URL` at the Timeweb (or custom) HTTPS origin and rebuild.
3. Attach the domain in Timeweb DNS. Submit `https://<domain>/sitemap-index.xml` in Google Search Console and Yandex Webmaster.

## 5. Accreditation page

Russian legal page, always public:

`/ru/svedeniya-ob-it-organizacii`

(alias `/ru/it-organization`)

It renders `legal_info`, OKVED 62.01, activity codes from Order No. 449, the implementation stack, base tariffs, and the own SaaS product (OBS Pulse) in R&D. Linked from the footer. No captcha, login, or extra JavaScript.

## 6. Architecture notes

- `output: "static"` — no serverless adapter on Netlify or Timeweb.
- `@astrojs/sitemap` writes `sitemap-index.xml` on every build.
- Images go through `astro:assets` `<Image />`.
- Content pages ship **no client-side JS** except locale/theme snippets. The mobile menu is a CSS checkbox.

Replace placeholder legal identifiers in `legal_info` before any government filing. The seed INN/OGRN are not a real entity.

## 7. Sitewide CTAs

Lead buttons are identical on marketing pages: **Start an AI audit / Запустить AI-аудит** → `/ai-audit` (Russian: `/ru/ai-audit`, working chat) and **Write to us / Написать нам** → `/contacts`. They appear twice: in the hero (`CtaPair`) and in the closing band (`CtaBand`). The footer does not add a third button — only a text link to the AI-audit URL.

`/ru/ai-audit` is a full-page chat. Without `DATABASE_URL` the assistant stores sessions in `data/chat/store.json` (local/dev). With PostgreSQL it uses `integrations.config`. The API key is never sent to the browser.

**Still later:** full check-up script, Pulse sync, pay/booking from chat. See `TODO.md`.

## 8. Acquiring / T-Kassa (not live)

Checkout UI (no site header):

- `/ru/pay` — **storefront**: choose a payable service and pay (English: `/pay`)
- `/ru/pay/session` — chat deep-link for a booked slot (`session_id`, `client_id`)
- `/ru/pay/success` — confirmation

Online catalogue currently has one SKU: express session, 5 000 ₽. Larger project tariffs are not charged on this page.

Legal drafts (Russian, placeholders in `[square brackets]`):

- `/ru/legal/refund-policy`
- `/ru/legal/offer`
- `/ru/legal/privacy`

The webhook stub lives in `backend/pulse/payment.ts` and is **not** served by Astro. T-Kassa keys belong on the Pulse server only.

## 9. Admin and AI chat

Admin UI: `/ru/admin`. First visit sets the password on `/ru/admin/login` (plus the administrator email). Forgot password: enter that email and create a new one. Hash is stored in `data/cms/admin.json` (gitignored), not in `.env`.

Local without PostgreSQL: leave `DATABASE_URL` empty. Sessions and the assistant key go to `data/chat/store.json` (gitignored). In admin → Интеграции paste the model key and enable the card, **or** set `DEEPSEEK_API_KEY` in `.env` and skip admin.

With PostgreSQL: run `db/chat.sql` (after `db/schema.sql`). The AI assistant card writes `integrations` where `service_name = 'ai_assistant'`.

Then `/ru/ai-audit` talks to the model via `POST /api/chat/message`. Chat API is served by `npm run dev` (Vite plugin) and Timeweb `npm start`. Netlify test deploys the `/api/chat/*` function; set `DATABASE_URL` in the Netlify **runtime** environment, not only at build.

