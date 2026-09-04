export const WELCOME = {
  ru: "Я AI-аналитик. Расскажите о своём бизнесе и какие проблемы вы видите — я проведу check up вашего бизнеса.",
  en: "I'm an AI analyst. Tell me about your business and the problems you see — I'll run a check-up of your business.",
};

export const SYSTEM_PROMPT =
  "Ты — AI-аналитик компании ОБС Интеллект. Твоя задача — дружелюбно расспросить пользователя о его бизнесе, отрасли, размере компании и проблемах, которые он видит. Задавай уточняющие вопросы по одному. Полный сценарий диагностики будет добавлен позже — пока веди содержательный, но простой диалог. Отвечай на языке пользователя.";

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
    label: "DeepSeek",
    url: "https://api.deepseek.com/chat/completions",
    model: "deepseek-chat",
    kind: "openai",
    help: "Прямой API DeepSeek.",
  },
  openai: {
    label: "OpenAI",
    url: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    kind: "openai",
    help: "Прямой API OpenAI. Из РФ часто недоступен без прокси.",
  },
  proxyapi: {
    label: "ProxyAPI",
    url: "https://api.proxyapi.ru/openai/v1/chat/completions",
    model: "gpt-4o-mini",
    kind: "openai",
    help: "Шлюз из РФ к OpenAI и другим моделям. Оплата в рублях. Модель — как в кабинете ProxyAPI. Для DeepSeek через тот же ключ укажите Base URL https://api.proxyapi.ru/deepseek/v1",
  },
  vsegpt: {
    label: "VseGPT",
    url: "https://api.vsegpt.ru/v1/chat/completions",
    model: "openai/gpt-4o-mini",
    kind: "openai",
    help: "Российский агрегатор OpenAI-совместимого API. Можно указать gigachat/gigachat или yandex/yandexgpt.",
  },
  gigachat: {
    label: "GigaChat (Сбер)",
    url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
    model: "GigaChat",
    kind: "gigachat",
    help: "Ключ авторизации из studio.gigachat.devices.sberbank.ru (Basic). Модель: GigaChat, GigaChat-Pro, GigaChat-Max. Если сертификат Сбера не принимается Node — выберите VseGPT и модель gigachat/gigachat.",
  },
  yandexgpt: {
    label: "YandexGPT",
    url: "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
    model: "yandexgpt/latest",
    kind: "yandex",
    help: "Api-Key сервисного аккаунта Yandex Cloud. В модели укажите modelUri: gpt://<folder-id>/yandexgpt/latest.",
  },
};

export function providerList() {
  return Object.entries(PROVIDERS).map(([id, item]) => ({
    id,
    label: item.label,
    model: item.model,
    help: item.help,
    kind: item.kind,
  }));
}

export const MAX_MESSAGE = 4000;
export const MAX_HISTORY = 80;
