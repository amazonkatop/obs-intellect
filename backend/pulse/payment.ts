/**
 * OBS Pulse payment handlers — not mounted on the static Astro site.
 *
 * Wire later on the Pulse backend:
 *   POST /api/payment/init     — create a T-Kassa payment (server-side amount)
 *   POST /api/payment/webhook  — T-Kassa notification
 *
 * Do not import this module from `src/`. The marketing site stays `output: "static"`.
 */

export const SESSION_AMOUNT_KOPECKS = 500_000;

export type PaymentInitInput = {
  sessionId: string;
  clientId: string;
};

export type WebhookResult =
  | { ok: true; ignored?: boolean }
  | { ok: false; status: number; error: string };

/**
 * Create a T-Kassa payment. Amount is taken from SESSION_AMOUNT_KOPECKS, never from the browser.
 */
export async function createSessionPayment(_input: PaymentInitInput): Promise<{ paymentUrl?: string; error: string }> {
  const terminalKey = process.env.TKASSA_TERMINAL_KEY;
  const secret = process.env.TKASSA_SECRET_KEY;
  if (!terminalKey || !secret) {
    return {
      error:
        "T-Kassa keys are not set. Refusing to start a payment. Set TKASSA_TERMINAL_KEY and TKASSA_SECRET_KEY on the Pulse server — not in the static site, not in chat.",
    };
  }

  // TODO: POST https://securepay.tinkoff.ru/v2/Init with TerminalKey, Amount = SESSION_AMOUNT_KOPECKS,
  // OrderId = sessionId, Description, NotificationURL = {PULSE_PUBLIC_URL}/api/payment/webhook,
  // SuccessURL / FailURL, Token = SHA-256 of sorted params + secret (see T-Kassa docs).
  return { error: "T-Kassa Init is not implemented yet. Keys are present but the API call is intentionally inactive." };
}

/**
 * T-Kassa notification endpoint.
 *
 * TODO (required before going live): verify the bank request signature (Token) using TKASSA_SECRET_KEY.
 * Without that check anyone can POST `{Status: "CONFIRMED"}` and mark a client card as paid.
 */
export async function handlePaymentWebhook(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, status: 405, error: "Method not allowed" }, 405);
  }

  const secret = process.env.TKASSA_SECRET_KEY;
  if (!secret) {
    return json(
      {
        ok: false,
        status: 503,
        error: "Webhook inactive: TKASSA_SECRET_KEY is not configured. No client card will be updated.",
      },
      503,
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, status: 400, error: "Invalid JSON" }, 400);
  }

  // TODO: verifyTKassaToken(payload, secret) — compute Token from all fields except Token, compare.
  // Until this is implemented, refuse to trust the body.
  void payload;
  return json(
    {
      ok: false,
      status: 501,
      error:
        "Signature verification is not implemented. Refusing to mark the payment as paid. See T-Kassa Notification docs (Token).",
    },
    501,
  );

  // After signature verification:
  // 1. Read OrderId / session_id and Status (CONFIRMED / REJECTED / REFUNDED).
  // 2. Update the OBS Pulse client card. Never take Amount from this site’s query string.
  // 3. Respond according to T-Kassa (typically HTTP 200 with {"Status":"OK"}).
}

function json(body: WebhookResult, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
