# TODO

## AI audit chat

Working skeleton is on `/ru/ai-audit` (English `/ai-audit`): session + message API, history in `data/chat/store.json` without Postgres or in PostgreSQL when `DATABASE_URL` is set, admin Integrations + Dialogs.

Not in this slice (separate design later):

- Full check-up script with growth points and potential score (OBS Pulse)
- Payment and call booking from the chat
- Pulse sync (`pulse_sync_status` / `pulse_client_id` columns are reserved, unused)

## T-Kassa / express session (UI only)

Checkout pages and legal drafts are on the site. The bank API is **not** connected.

- Stub: `backend/pulse/payment.ts` (`/api/payment/init`, `/api/payment/webhook`).
- Do not activate Init/webhook until `TKASSA_TERMINAL_KEY` and `TKASSA_SECRET_KEY` are on the Pulse server and Token verification is implemented.
- Legal copy in `[square brackets]` still needs a lawyer.

## Review (do not change without confirmation)

Some pages may work better with **one** lead button instead of the sitewide pair. Candidates:

- `/ai-audit` — the page **is** the chat; no extra CTA band
- `/contacts` — the form is the action; no closing `CtaBand`
- `/business-audit`, `/ai-business`, and other narrow landings
- Case articles (`/cases/[slug]`)
- `/ru/svedeniya-ob-it-organizacii` (legal, no marketing CTAs)
- Startup landings that previously used a different CTA («idea»)
