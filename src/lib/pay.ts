export const EXPRESS_SESSION = {
  priceRub: 5000,
  durationMin: 30,
  currency: "RUB",
} as const;

export const LEGAL_PATHS = {
  refund: "/ru/legal/refund-policy",
  offer: "/ru/legal/offer",
  privacy: "/ru/legal/privacy",
} as const;

export const PAY_PATHS = {
  sessionRu: "/ru/pay/session",
  sessionEn: "/pay/session",
  successRu: "/ru/pay/success",
  successEn: "/pay/success",
} as const;

export function formatSessionPrice(locale: "en" | "ru"): string {
  const amount = EXPRESS_SESSION.priceRub.toLocaleString("ru-RU");
  return locale === "ru" ? `${amount} ₽` : `${amount} RUB`;
}

export function chatReturnHref(locale: "en" | "ru", sessionId: string): string {
  const base = locale === "ru" ? "/ru/ai-audit" : "/ai-audit";
  const params = new URLSearchParams();
  if (sessionId) params.set("session_id", sessionId);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}
