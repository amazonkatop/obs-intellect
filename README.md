# OBS Intellect / ООО «ОБС Интеллект»

Marketing site for a business-first technology partner. English at `/`, Russian at `/ru/`.

**Stack:** Astro 5 (static HTML) + Tailwind CSS v4 + PostgreSQL on a virtual server (read at **build time**) + **Netlify** for the public site. Timeweb Cloud is not in use. Visitors never call the database from the browser.

Test URL: [https://obs-intellect.netlify.app](https://obs-intellect.netlify.app)

## 1. Install

```bash
npm install
cp .env.example .env
```

| Variable | Where it is used |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical URLs, Open Graph, `sitemap-index.xml` |
| `DATABASE_URL` | PostgreSQL on the VPS (`pg`). Used at build time and by `/api/chat/*`. Not exposed to the client |
| `PUBLIC_FORM_ENDPOINT` | Optional POST target for `/contacts` |

Without `DATABASE_URL` the build still succeeds: pages use local fallback content from `src/lib/fallback.ts`.

```bash
npm run dev
npm run build
```

Dev server: `http://127.0.0.1:4321/` (`npm run dev`, not `astro preview`).

## 2. PostgreSQL (virtual server)

Postgres runs in Docker on the VPS (`obs-postgres`, database `obs`). Timeweb managed databases are not used.

1. Apply `db/schema.sql`, then `db/chat.sql`, then `db/brand.sql`.
2. **Replace** the seed row in `legal_info` with real ЕГРЮЛ data (full name, ИНН, ОГРН, КПП, address, contacts) **before** filing for accreditation.
3. Put the connection string in local `.env` as `DATABASE_URL`. For a Docker Postgres without TLS use `?sslmode=disable`.
4. Copy the same `DATABASE_URL` into Netlify → Environment variables, scope **Builds** and **Functions**.

A catalogue change in PostgreSQL appears on the next site build, not on every page view. Chat history and integrations use the same database at runtime.

## 3. Test hosting: Netlify

Git push to `main` triggers a production build (GitHub Action → Netlify).

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: **22**
- Environment: `PUBLIC_SITE_URL`, `DATABASE_URL` (VPS Postgres), optional `PUBLIC_FORM_ENDPOINT`

After the first deploy, set `PUBLIC_SITE_URL` to `https://obs-intellect.netlify.app` (or the custom domain) and rebuild so the sitemap uses the correct host.

Admin CMS writes to disk (`data/cms/`, `public/uploads/`). Netlify’s filesystem is read-only at runtime, so `/ru/admin` for saving texts and files is used locally (`npm run dev`) until a Node host with a writable disk is added.

## 4. Production hosting (later)

Timeweb Cloud Apps is **not** the current target. The public site stays on Netlify; Postgres stays on the VPS. `npm start` can still serve `dist/` plus `/api` from any Node 22 host if that is needed later.

## 5. Accreditation page

Russian legal page, always public:

`/ru/svedeniya-ob-it-organizacii`

(alias `/ru/it-organization`)

It renders `legal_info`, OKVED 62.01, activity codes from Order No. 449, the implementation stack, base tariffs, and the own SaaS product (OBS Pulse) in R&D. Linked from the footer. No captcha, login, or extra JavaScript.

## 6. Architecture notes

- `output: "static"` — marketing pages are static HTML. Chat API is a Netlify function (`/api/chat/*`) or the Vite/Node plugin in `npm run dev` / `npm start`.
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

Local without PostgreSQL: leave `DATABASE_URL` empty. Sessions and the assistant key go to `data/chat/store.json` (gitignored). In admin → Интеграции choose a provider (ProxyAPI, VseGPT, GigaChat, YandexGPT, DeepSeek, OpenAI), paste the key and enable the card. Optional env fallback: `PROXYAPI_API_KEY`, `GIGACHAT_API_KEY`, `YANDEXGPT_API_KEY`, `VSEGPT_API_KEY`, `DEEPSEEK_API_KEY`, or `AI_ASSISTANT_API_KEY`.

With PostgreSQL: run `db/chat.sql` (after `db/schema.sql`). The AI assistant card writes `integrations` where `service_name = 'ai_assistant'`. Brandbook: run `db/brand.sql`, then `npm run seed:brandbook`. Edit it at `/ru/admin/brandbook` — it is not a public page.

Then `/ru/ai-audit` talks to the model via `POST /api/chat/message`. Chat API is served by `npm run dev` (Vite plugin) and by the Netlify `/api/chat/*` function. Set `DATABASE_URL` in the Netlify **runtime** environment, not only at build.

