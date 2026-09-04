export const WELCOME = {
  ru: "Я AI-аналитик. Расскажите о своём бизнесе и какие проблемы вы видите — я проведу check up вашего бизнеса.",
  en: "I'm an AI analyst. Tell me about your business and the problems you see — I'll run a check-up of your business.",
};

export const SYSTEM_PROMPT =
  "Ты — AI-аналитик компании OBS Intellect. Твоя задача — дружелюбно расспросить пользователя о его бизнесе, отрасли, размере компании и проблемах, которые он видит. Задавай уточняющие вопросы по одному. Полный сценарий диагностики будет добавлен позже — пока веди содержательный, но простой диалог. Отвечай на языке пользователя.";

export const UNAVAILABLE = {
  ru: {
    message: "Ассистент временно недоступен, напишите нам напрямую",
    contacts: "/ru/contacts",
  },
  en: {
    message: "The assistant is temporarily unavailable — write to us directly",
    contacts: "/contacts",
  },
};

export const PROVIDERS = {
  deepseek: {
    url: "https://api.deepseek.com/chat/completions",
    model: "deepseek-chat",
  },
  openai: {
    url: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
  },
};

export const MAX_MESSAGE = 4000;
export const MAX_HISTORY = 80;
