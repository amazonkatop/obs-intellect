export const EXPRESS_SESSION = {
  id: "express-session",
  priceRub: 5000,
  durationMin: 30,
  currency: "RUB",
} as const;

export const PAYABLE_OFFERS = [
  {
    id: "express-session",
    priceRub: 5000,
    durationMin: 30,
    title: {
      ru: "Экспресс-сессия с бизнес-аналитиком",
      en: "Express session with a business analyst",
    },
    text: {
      ru: "30 минут — разбор результатов вашего AI-чекапа и рекомендации по дальнейшим шагам.",
      en: "30 minutes: a review of your AI check-up and next-step recommendations.",
    },
  },
] as const;

export type PayableOfferId = (typeof PAYABLE_OFFERS)[number]["id"];

export const LEGAL_PATHS = {
  refund: "/ru/legal/refund-policy",
  offer: "/ru/legal/offer",
  privacy: "/ru/legal/privacy",
} as const;

export const PAY_PATHS = {
  storeRu: "/ru/pay",
  storeEn: "/pay",
  sessionRu: "/ru/pay/session",
  sessionEn: "/pay/session",
  successRu: "/ru/pay/success",
  successEn: "/pay/success",
} as const;

export function formatRub(amount: number, locale: "en" | "ru"): string {
  const value = amount.toLocaleString("ru-RU");
  return locale === "ru" ? `${value} ₽` : `${value} RUB`;
}

export function formatSessionPrice(locale: "en" | "ru"): string {
  return formatRub(EXPRESS_SESSION.priceRub, locale);
}

export function offerById(id: string | null | undefined) {
  return PAYABLE_OFFERS.find((item) => item.id === id) ?? PAYABLE_OFFERS[0];
}

export function chatReturnHref(locale: "en" | "ru", sessionId: string): string {
  const base = locale === "ru" ? "/ru/ai-audit" : "/ai-audit";
  const params = new URLSearchParams();
  if (sessionId) params.set("session_id", sessionId);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}
