# TODO

## Priority: AI audit chat on `/ru/ai-audit`

Sitewide primary CTA **«Запустить AI-аудит» / «Start an AI audit»** now points to `/ru/ai-audit` (English: `/ai-audit`).

That page is still a marketing landing. **The working AI chat is not implemented.** The old footer stub («Чат-ассистент появится здесь») was removed so visitors are not sent to a fake widget.

Remaining work:

- Embed the assistant on `/ai-audit` (and the Russian locale page).
- Connect the DeepSeek API (server-side; do not expose the key in the static Astro bundle).
- Keep `/contacts` as the human alternative («Написать команде»), not a second AI entry.

Until this ships, every main CTA lands on a page that describes the audit but cannot run it.

## T-Kassa / express session (UI only)

Checkout pages and legal drafts are on the site. The bank API is **not** connected.

- Stub: `backend/pulse/payment.ts` (`/api/payment/init`, `/api/payment/webhook`).
- Do not activate Init/webhook until `TKASSA_TERMINAL_KEY` and `TKASSA_SECRET_KEY` are on the Pulse server and Token verification is implemented.
- Legal copy in `[square brackets]` still needs a lawyer.


## Review (do not change without confirmation)

Some pages may work better with **one** lead button instead of the sitewide pair. Candidates:

- `/ai-audit` — primary CTA currently points at itself
- `/contacts` — the form is the action; no closing `CtaBand`
- `/business-audit`, `/ai-business`, and other narrow landings
- Case articles (`/cases/[slug]`)
- `/ru/svedeniya-ob-it-organizacii` (legal, no marketing CTAs)
- Startup landings that previously used a different CTA («idea»)
