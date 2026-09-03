export type CaseMetric = {
  label: string;
  value: string;
  barWidth: number;
};

type Localized = { en: string; ru: string };

type CasePresentation = {
  clientName: Localized;
  industry: Localized;
  employees: Localized;
  /** Descriptive H1 / document title on RU; EN stays the company line. */
  title: Localized;
  subtitle: Localized;
  alt: Localized;
  description: Localized;
  metrics: { label: Localized; value: Localized; barWidth: number }[];
};

export const CASES_INDEX = {
  en: {
    title: "Cases: problem, insight, solution, result",
    description:
      "OBS Intellect cases written as business problem → insight → solution → result. Manufacturing, professional services, logistics, and a startup MVP — measured change, not a tech stack list.",
  },
  ru: {
    title: "Кейсы внедрения ИИ в бизнес",
    description:
      "Кейсы внедрения ИИ в бизнес: производство, логистика, профессиональные услуги. Реальные цифры — от аудита до результата, без списка технологий ради списка.",
  },
} as const;

export const CASE_PRESENTATION: Record<string, CasePresentation> = {
  "midmarket-manufacturing-forecast": {
    clientName: {
      en: "Manufacturing company, 420 employees",
      ru: "Производственная компания, 420 сотрудников",
    },
    industry: {
      en: "Industrial manufacturing",
      ru: "Промышленное производство",
    },
    employees: { en: "420 employees", ru: "420 сотрудников" },
    title: {
      en: "Manufacturing company, 420 employees",
      ru: "Как ИИ-прогнозирование спроса сократило излишки запасов на 18% — кейс для производственной компании",
    },
    subtitle: {
      en: "Demand forecast on ERP history; exceptions, not dashboards, on the planner queue",
      ru: "Прогноз спроса по истории ERP: в очередь плановика — исключения, не дашборды",
    },
    alt: {
      en: "Diagram of demand-forecasting implementation in manufacturing",
      ru: "Схема внедрения ИИ-прогнозирования спроса на производстве",
    },
    description: {
      en: "Industrial manufacturing: slow-mover stock −18%, on-time fulfilment +9 pp, planner hours −62%. From audit to a production slice.",
      ru: "ИИ-прогнозирование спроса на производстве: излишки запасов −18%, отгрузки +9 п.п., часы плановиков −62%. Кейс от аудита ERP до промышленного контура.",
    },
    metrics: [
      { label: { en: "Slow-mover stock", ru: "Излишки запасов" }, value: { en: "−18%", ru: "−18%" }, barWidth: 58 },
      { label: { en: "On-time fulfilment", ru: "Своевременность отгрузок" }, value: { en: "+9 pp", ru: "+9 п.п." }, barWidth: 36 },
      { label: { en: "Planner hours", ru: "Часы плановиков" }, value: { en: "−62%", ru: "−62%" }, barWidth: 88 },
    ],
  },
  "professional-services-rag": {
    clientName: {
      en: "Professional services firm, 180 employees",
      ru: "Компания профессиональных услуг, 180 сотрудников",
    },
    industry: {
      en: "Professional services",
      ru: "Профессиональные услуги",
    },
    employees: { en: "180 employees", ru: "180 сотрудников" },
    title: {
      en: "Professional services firm, 180 employees",
      ru: "Как ИИ-поиск по документам сократил цикл коммерческих предложений с 11 до 4,5 дней — кейс для профессиональных услуг",
    },
    subtitle: {
      en: "11,000-document index with drafts landing in the CRM opportunity",
      ru: "Индекс 11 000 документов и черновики сразу в сделку CRM",
    },
    alt: {
      en: "Diagram of a document RAG workspace for professional-services proposals",
      ru: "Схема внедрения поиска по документам компании в коммерческих предложениях",
    },
    description: {
      en: "Professional services: proposal cycle 11 → 4.5 days, partner rewrite time −41%, win rate +6 pp.",
      ru: "ИИ-поиск по документам в профессиональных услугах: цикл КП с 11 до 4,5 дней, правки партнёра −41%, конверсия +6 п.п. Кейс с измеренным результатом.",
    },
    metrics: [
      { label: { en: "Proposal cycle", ru: "Цикл КП" }, value: { en: "11 → 4.5 days", ru: "11 → 4,5 дня" }, barWidth: 74 },
      { label: { en: "Partner rewrites", ru: "Правки партнёра" }, value: { en: "−41%", ru: "−41%" }, barWidth: 52 },
      { label: { en: "Win rate", ru: "Конверсия тендеров" }, value: { en: "+6 pp", ru: "+6 п.п." }, barWidth: 30 },
    ],
  },
  "logistics-document-agents": {
    clientName: {
      en: "Cross-border logistics operator, 260 employees",
      ru: "Международный логистический оператор, 260 сотрудников",
    },
    industry: {
      en: "Logistics",
      ru: "Логистика",
    },
    employees: { en: "260 employees", ru: "260 сотрудников" },
    title: {
      en: "Cross-border logistics operator, 260 employees",
      ru: "Как обработка документов сократила ручной ввод на 73% — кейс для логистического оператора",
    },
    subtitle: {
      en: "Extract, validate, then write confirmed fields into the TMS",
      ru: "Извлечение полей из накладных и запись в TMS после проверки правилами",
    },
    alt: {
      en: "Diagram of document agents extracting waybills into a TMS",
      ru: "Схема внедрения агентов обработки накладных и таможенных документов",
    },
    description: {
      en: "Logistics: manual keying −73% on the pilot corridor, exceptions 2.1 h → 19 min, document claims −28%.",
      ru: "Обработка документов в логистике: ручной ввод −73%, исключения с 2,1 ч до 19 мин, претензии −28%. Кейс ИИ-агентов от аудита до записи в TMS.",
    },
    metrics: [
      { label: { en: "Manual keying", ru: "Ручной ввод" }, value: { en: "−73%", ru: "−73%" }, barWidth: 90 },
      { label: { en: "Exception handling", ru: "Обработка исключений" }, value: { en: "2.1 h → 19 min", ru: "2,1 ч → 19 мин" }, barWidth: 64 },
      { label: { en: "Document claims", ru: "Претензии по документам" }, value: { en: "−28%", ru: "−28%" }, barWidth: 40 },
    ],
  },
  "fintech-mvp-eight-weeks": {
    clientName: {
      en: "Seed-stage payments startup",
      ru: "Финтех-стартап на посевной стадии",
    },
    industry: {
      en: "Fintech / startup",
      ru: "Финтех / стартап",
    },
    employees: { en: "Seed stage", ru: "посевная стадия" },
    title: {
      en: "Seed-stage payments startup",
      ru: "Как гипотеза и MVP за 8 недель вывели первых 40 мерчантов — кейс финтех-стартапа",
    },
    subtitle: {
      en: "Typed API, Postgres, and merchant admin after the hypothesis was set",
      ru: "Сначала гипотеза, затем типизированный API, PostgreSQL и админка мерчантов",
    },
    alt: {
      en: "Diagram of a payments MVP: API, PostgreSQL, and merchant onboarding",
      ru: "Схема запуска платёжного MVP: API, PostgreSQL и онбординг мерчантов",
    },
    description: {
      en: "Fintech / startup: MVP live in 8 weeks, first 40 merchants on one platform, seed follow-on on the same codebase.",
      ru: "MVP финтех-стартапа за 8 недель: первые 40 мерчантов без второй платформы и последующий раунд на той же кодовой базе. Сначала гипотеза, затем продукт.",
    },
    metrics: [
      { label: { en: "Time to production", ru: "Срок до промышленного контура" }, value: { en: "8 weeks", ru: "8 недель" }, barWidth: 48 },
      { label: { en: "Merchants onboarded", ru: "Первые мерчанты" }, value: { en: "40", ru: "40" }, barWidth: 72 },
      { label: { en: "Codebase", ru: "Кодовая база" }, value: { en: "Same stack", ru: "Та же база" }, barWidth: 34 },
    ],
  },
};

export function casePresentation(slug: string, locale: "en" | "ru") {
  const pack = CASE_PRESENTATION[slug];
  if (!pack) return null;
  const loc = locale === "ru" ? "ru" : "en";
  return {
    clientName: pack.clientName[loc],
    industry: pack.industry[loc],
    employees: pack.employees[loc],
    title: pack.title[loc],
    subtitle: pack.subtitle[loc],
    alt: pack.alt[loc],
    description: pack.description[loc],
    metrics: pack.metrics.map(
      (item): CaseMetric => ({
        label: item.label[loc],
        value: item.value[loc],
        barWidth: item.barWidth,
      }),
    ),
  };
}
