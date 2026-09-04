const HOME_FIELDS = [
  ["h1", "Заголовок H1", "textarea"],
  ["lead", "Лид под заголовком", "textarea"],
  ["title", "Title вкладки браузера", "text"],
  ["description", "Meta description", "textarea"],
  ["kicker", "Плашки над лидом", "text"],
  ["ctaPrimary", "Основная кнопка", "text"],
  ["ctaSecondary", "Вторичная кнопка", "text"],
  ["formula", "Формула (моно)", "text"],
  ["manifestoH2", "Манифест — заголовок", "text"],
  ["manifesto", "Манифест — текст", "textarea"],
  ["startPointH2", "Блок «точка отсчёта» — заголовок", "text"],
  ["startPoint", "Блок «точка отсчёта» — текст", "textarea"],
  ["startCta", "Ссылка про аудит", "text"],
  ["howH2", "Метод — заголовок", "text"],
  ["platformH2", "Платформа — заголовок", "text"],
  ["platform", "Платформа — текст", "textarea"],
  ["changeH2", "Офферы — заголовок", "text"],
  ["techH2", "Технологии — заголовок", "text"],
  ["tech", "Технологии — текст", "textarea"],
  ["whyH2", "Команда — заголовок", "text"],
  ["differentiatorH2", "Отличие — заголовок", "text"],
  ["differentiator", "Отличие — текст", "textarea"],
  ["casesH2", "Кейсы — заголовок", "text"],
  ["faqH2", "FAQ — заголовок", "text"],
  ["teamH2", "Люди — заголовок", "text"],
  ["startupH2", "Стартап-блок — заголовок", "text"],
  ["startup", "Стартап-блок — текст", "textarea"],
  ["startupCta", "Ссылка про идею", "text"],
  ["finalH2", "Закрывающий блок — заголовок", "text"],
  ["final", "Закрывающий блок — текст", "textarea"],
];

export const LANDING_SLUGS = [
  ["business-audit", "Аудит бизнеса"],
  ["ai-audit", "AI-аудит"],
  ["ai-business", "ИИ для бизнеса"],
  ["ai-agents", "AI-агенты"],
  ["automation", "Автоматизация"],
  ["digital-transformation", "Цифровая трансформация"],
  ["software-development", "Разработка ПО"],
  ["business-analytics", "Аналитика"],
  ["integration", "Интеграция"],
  ["saas-development", "SaaS"],
  ["startup-mvp", "MVP"],
  ["startup-business-model", "Бизнес-модель"],
];

export function contentCatalog() {
  const fields = [];
  for (const locale of ["ru", "en"]) {
    const group = locale === "ru" ? "Главная · RU" : "Home · EN";
    for (const [id, label, kind] of HOME_FIELDS) {
      fields.push({ key: `home.${locale}.${id}`, label, kind, group, locale, visual: id });
    }
  }
  for (const [slug, name] of LANDING_SLUGS) {
    for (const locale of ["ru", "en"]) {
      const group = `Лендинг · ${name} · ${locale.toUpperCase()}`;
      fields.push({ key: `landing.${slug}.${locale}.h1`, label: "H1", kind: "textarea", group, locale });
      fields.push({ key: `landing.${slug}.${locale}.lead`, label: "Лид", kind: "textarea", group, locale });
      fields.push({ key: `landing.${slug}.${locale}.title`, label: "Title", kind: "text", group, locale });
      fields.push({
        key: `landing.${slug}.${locale}.description`,
        label: "Description",
        kind: "textarea",
        group,
        locale,
      });
    }
  }
  return fields;
}

export const INTEGRATIONS = [
  {
    key: "TKASSA_TERMINAL_KEY",
    label: "Т-Касса TerminalKey",
    group: "Оплата",
    secret: false,
    help: "Идентификатор терминала после одобрения заявки банком.",
  },
  {
    key: "TKASSA_SECRET_KEY",
    label: "Т-Касса секрет (Password)",
    group: "Оплата",
    secret: true,
    help: "Секрет для подписи Init и вебхука. Не вставляйте в чат.",
  },
  {
    key: "TKASSA_API_URL",
    label: "Т-Касса API URL",
    group: "Оплата",
    secret: false,
    help: "Боевой: https://securepay.tinkoff.ru/v2",
  },
  {
    key: "PUBLIC_FORM_ENDPOINT",
    label: "Endpoint формы /contacts",
    group: "Заявки",
    secret: false,
    help: "HTTPS-адрес приёма формы. Пусто — форма открывает почтовый клиент.",
  },
  {
    key: "PUBLIC_PULSE_API_URL",
    label: "Публичный URL API OBS Pulse",
    group: "OBS Pulse",
    secret: false,
    help: "Откуда кнопка оплаты и чат будут вызывать init (без секретов банка).",
  },
  {
    key: "PULSE_PUBLIC_URL",
    label: "Origin Pulse (вебхуки)",
    group: "OBS Pulse",
    secret: false,
    help: "База для NotificationURL Т-Кассы, например https://pulse.example.com",
  },
  {
    key: "NETLIFY_BUILD_HOOK",
    label: "Netlify build hook",
    group: "Публикация",
    secret: true,
    help: "Опционально: после сохранения текстов дернуть пересборку тестового деплоя. Мгновенное обновление идёт через /cms/content.json на этом сервере.",
  },
];
