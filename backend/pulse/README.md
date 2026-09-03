# OBS Pulse — payment (not live)

The marketing site is static Astro. It **must not** host `/api/payment/webhook` and **must not** hold `TKASSA_SECRET_KEY`.

Put these handlers on the Pulse backend (Timeweb app / separate Node service), then:

1. Set env vars on **that** server only (panel → environment). Do not paste keys into chat.
2. Point T-Kassa Notification URL at `https://<pulse-host>/api/payment/webhook`.
3. Implement Token verification in `handlePaymentWebhook` before updating any client card.
4. `createSessionPayment` is the only place that talks to T-Kassa Init. Amount = 5 000 ₽ (500 000 kopecks), not the browser `amount` query.

See `payment.ts`.
