import type { CaseRecord, LegalInfo, ServiceRecord } from "./types";

const now = "2026-01-15T00:00:00.000Z";

export const fallbackServices: ServiceRecord[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    slug: "business-ai-audit",
    title_en: "Business audit",
    title_ru: "Бизнес-аудит",
    description_en:
      "Understand what is blocking growth. We analyze processes, data, IT systems, and the operating model, then produce a sequenced map of change. Technology is chosen only after the economics are clear.",
    description_ru:
      "Понять, что мешает бизнесу расти. Анализ процессов, данных, IT-систем и операционной модели, затем карта изменений с последовательностью внедрения. Технологии выбираем только когда ясен экономический смысл.",
    stack: ["Process mapping", "Python", "SQL", "BPMN", "KPI baseline"],
    price_en: "From USD 8,000 · 2–3 weeks, fixed scope",
    price_ru: "От 650 000 ₽ · 2–3 недели, фиксированный объём",
    is_saas: false,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    slug: "rag-knowledge-systems",
    title_en: "AI & Automation",
    title_ru: "AI и автоматизация",
    description_en:
      "Remove routine and speed up work: assistants, agents, automation, RAG over company documents, and intelligent processing of data and files. AI helps specialists analyse faster — it does not “fully automate the company”.",
    description_ru:
      "Убрать рутину и ускорить процессы: AI-ассистенты, AI-агенты, автоматизация, RAG по документам компании, интеллектуальная обработка данных и документов. AI помогает специалистам анализировать быстрее — он не «полностью автоматизирует компанию».",
    stack: ["Python", "pgvector", "OpenAI / Anthropic / local LLM", "LlamaIndex", "PostgreSQL"],
    price_en: "From USD 35,000 · 6–10 weeks",
    price_ru: "От 2 800 000 ₽ · 6–10 недель",
    is_saas: false,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    slug: "process-optimization-agents",
    title_en: "Custom software",
    title_ru: "Custom Software",
    description_en:
      "A system built around your business model: SaaS, corporate platforms, web applications, and internal tools. Analysts and product stay with engineering for the whole project — we do not throw a specification over the wall.",
    description_ru:
      "Система под вашу бизнес-модель: SaaS, корпоративные платформы, web-приложения, внутренние системы. Аналитики и продукт остаются с разработкой на всём проекте — мы не передаём задачу разработчику в виде ТЗ.",
    stack: ["Python", "Node.js", "LangGraph", "REST / webhooks", "PostgreSQL"],
    price_en: "From USD 45,000 · 8–12 weeks",
    price_ru: "От 3 600 000 ₽ · 8–12 недель",
    is_saas: false,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    slug: "startup-mvp-digitalization",
    title_en: "Integration",
    title_ru: "Интеграция",
    description_en:
      "Connect the systems you already run: CRM, ERP, BI, APIs, telephony, documents, databases. The job is not another product — it is to make the landscape serve the process.",
    description_ru:
      "Объединить существующие системы: CRM, 1С, ERP, BI, API, телефония, документы, базы данных. Задача — не ещё один продукт, а заставить ландшафт служить процессу.",
    stack: ["Astro", "Node.js", "Python", "PostgreSQL", "Timeweb Cloud", "Stripe / ЮKassa"],
    price_en: "From USD 25,000 · 6–8 weeks",
    price_ru: "От 2 000 000 ₽ · 6–8 недель",
    is_saas: false,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    slug: "document-intelligence",
    title_en: "Business analytics & digital products",
    title_ru: "Аналитика и цифровые продукты",
    description_en:
      "Turn data into decisions (BI, dashboards, AI analytics, forecasting) or create a new digital source of revenue. For startups: hypothesis first, then the MVP that can actually test it.",
    description_ru:
      "Превратить данные в решения (BI, дашборды, AI-аналитика, прогнозирование) или создать новый цифровой источник выручки. Для стартапов: сначала гипотеза, затем MVP, который её действительно проверяет.",
    stack: ["Python", "Tesseract / cloud OCR", "LLM extraction", "PostgreSQL", "Airflow"],
    price_en: "From USD 32,000 · 6–9 weeks",
    price_ru: "От 2 500 000 ₽ · 6–9 недель",
    is_saas: false,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    slug: "nexora-pulse",
    title_en: "OBS Pulse (SaaS, R&D)",
    title_ru: "OBS Pulse (SaaS, стадия НИОКР)",
    description_en:
      "Own SaaS in the digital-twin line: the platform helps our analysts and engineers turn data and business requirements into working digital solutions faster. Currently in research and development. Exclusive rights remain with the company. Planned access: paid subscription (SaaS). Architecture is IP and is not published. Not yet listed in the Russian software registry.",
    description_ru:
      "Собственный SaaS линейки цифрового двойника бизнеса: платформа помогает аналитикам и разработчикам быстрее превращать данные и требования в работающие цифровые решения. Стадия научно-исследовательских и опытно-конструкторских работ. Исключительные права принадлежат организации. Плановый способ предоставления прав — подписка (SaaS). Архитектура как IP на сайте не раскрывается. В реестр российского ПО пока не включён.",
    stack: ["Python", "Node.js", "Astro", "PostgreSQL", "pgvector"],
    price_en: "R&D · planned from USD 490 / month after launch",
    price_ru: "НИОКР · плановый тариф от 45 000 ₽ в месяц после запуска",
    is_saas: true,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
];

export const fallbackCases: CaseRecord[] = [
  {
    id: "00000000-0000-4000-8000-000000000011",
    slug: "midmarket-manufacturing-forecast",
    client_name: "Manufacturing company, 420 employees",
    industry: "Industrial manufacturing",
    problem_en:
      "Planners rebuilt weekly demand in spreadsheets. Safety stock hid a 14% excess of slow movers while rush orders still missed promised dates. The ERP already held the history.",
    problem_ru:
      "Производственная компания, 420 сотрудников. Плановики каждую неделю собирали спрос в таблицах. Страховой запас скрывал 14% излишков медленно оборачиваемых позиций, при этом срочные заказы срывали сроки. История уже была в ERP.",
    solution_en:
      "What we found: the weekly cycle was a coordination problem, not a missing algorithm. Forty percent of SKUs did not need a new forecast every week.\n\nSolution: a forecasting service on eight years of orders, tied to the ERP item master, with exceptions — not dashboards — on the planner’s queue. A reviewer confirmed overrides before purchase orders went out. Stack: AI · ERP · API.",
    solution_ru:
      "Что обнаружили: недельный цикл был проблемой согласования, а не «отсутствующей модели». Около 40% позиций не требовали нового прогноза каждую неделю.\n\nРешение: сервис прогнозирования на восьми годах заказов, связь со справочником ERP, в очередь плановика — исключения, а не дашборды. Отклонения подтверждает человек до заказа поставщику. Технологии: AI · ERP · API.",
    result_en:
      "Stock of slow movers down 18% in two quarters. On-time fulfilment up 9 percentage points. Planner hours on the weekly cycle cut by 62%.",
    result_ru:
      "Запас медленно оборачиваемых позиций снизился на 18% за два квартала. Своевременность отгрузок выросла на 9 процентных пунктов. Часы плановиков на недельном цикле сократились на 62%.",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000012",
    slug: "professional-services-rag",
    client_name: "Professional services firm, 180 employees",
    industry: "Professional services",
    problem_en:
      "Proposal teams searched shared drives and chat. Winning language lived in ten-year-old decks. New hires took months to quote like seniors; partners still rewrote every statement of work.",
    problem_ru:
      "Компания профессиональных услуг, 180 сотрудников. Команды коммерческих предложений искали материалы на дисках и в мессенджерах. Выигрышные формулировки жили в старых презентациях. Новые сотрудники месяцами учились котировать как старшие; партнёры переписывали каждое ТЗ.",
    solution_en:
      "What we found: the knowledge already existed — it was not retrievable at the moment of the bid. Partners were used as a search engine.\n\nSolution: indexed 11,000 documents with the existing access rules, a retrieval workspace for proposals, 180 gold answers from partners. Drafts land in the CRM opportunity. Stack: AI · RAG · CRM · API.",
    solution_ru:
      "Что обнаружили: знания уже были — их нельзя было достать в момент сделки. Партнёры работали как поисковая система.\n\nРешение: индекс 11 000 документов с действующими правами доступа, рабочее место генерации с опорой на документы, 180 эталонных ответов партнёров. Черновики попадают в сделку CRM. Технологии: AI · RAG · CRM · API.",
    result_en:
      "Median proposal cycle 11 days → 4.5 days. Partner rewrite time −41%. Win rate +6 percentage points on comparable bids.",
    result_ru:
      "Медианный цикл коммерческого предложения: с 11 дней до 4,5 дня. Время правок партнёра −41%. Конверсия сопоставимых тендеров +6 процентных пунктов.",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000013",
    slug: "logistics-document-agents",
    client_name: "Cross-border logistics operator, 260 employees",
    industry: "Logistics",
    problem_en:
      "Operators re-typed waybills, invoices, and customs packs. Exceptions sat in email. A missed HS code cost more than the freight margin on short-haul lanes.",
    problem_ru:
      "Логистический оператор, 260 сотрудников. Операторы заново набирали накладные, счета и таможенные комплекты. Исключения жили в почте. Ошибка кода ТН ВЭД стоила дороже маржи короткого плеча.",
    solution_en:
      "What we found: most fields were already on the page — the work was re-keying and chasing exceptions, not judgement.\n\nSolution: document intelligence plus a routing agent: extract, validate against the customer master, open a ticket only on low-confidence fields, write confirmed records into the TMS. The model never posts without a rule check. Stack: AI · automation · TMS · API.",
    solution_ru:
      "Что обнаружили: большинство полей уже было на странице — работа состояла в повторном вводе и охоте за исключениями, а не в экспертном суждении.\n\nРешение: обработка документов и агент маршрутизации: извлечение, проверка по справочнику, тикет только по полям с низкой уверенностью, запись в TMS. Модель не проводит проводку без проверки правилами. Технологии: AI · автоматизация · TMS · API.",
    result_en:
      "Manual keying −73% on the pilot corridor. Average exception handling 2.1 h → 19 min. Document-related claims −28% in 90 days.",
    result_ru:
      "Ручной ввод на пилотном коридоре −73%. Средняя обработка исключения: с 2,1 ч до 19 мин. Претензии, связанные с документами, −28% за 90 дней.",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "00000000-0000-4000-8000-000000000014",
    slug: "fintech-mvp-eight-weeks",
    client_name: "Seed-stage payments startup",
    industry: "Fintech / startup",
    problem_en:
      "The founding team had a licensed partner and a spreadsheet of merchants. They asked for a fast MVP. What they lacked was a business model sharp enough to know what the first product had to prove.",
    problem_ru:
      "Платежный стартап на стадии seed. У основателей был лицензированный партнёр и таблица мерчантов. Просили «быстрый MVP». Не хватало бизнес-модели, из которой ясно, что должен доказать первый продукт.",
    solution_en:
      "What we found: building every screen on the wishlist would not test whether merchants would complete onboarding.\n\nSolution: we did not build an MVP for its own sake. After the hypothesis was set, we shipped a typed API, Postgres schema, merchant admin, static site, and an underwriting checklist. Same stack still in production. Stack: SaaS · API · product.",
    solution_ru:
      "Что обнаружили: сборка всех экранов из wishlist не проверяла, дойдут ли мерчанты до онбординга.\n\nРешение: мы не разрабатывали MVP ради MVP. После фиксации гипотезы собрали типизированный API, схему PostgreSQL, админку, статический сайт и чек-лист андеррайтинга. Тот же стек в промышленной среде. Технологии: SaaS · API · продукт.",
    result_en:
      "MVP live in 8 weeks. First 40 merchants onboarded without a second platform. Seed follow-on closed with the same codebase.",
    result_ru:
      "MVP в промышленной среде за 8 недель. Первые 40 мерчантов без второй платформы. Последующий раунд закрыт на той же кодовой базе.",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
];

export const fallbackLegal: LegalInfo = {
  id: "00000000-0000-4000-8000-000000000021",
  inn: "7700000000",
  ogrn: "1257700000000",
  kpp: "770001001",
  full_name: "Общество с ограниченной ответственностью «ОБС Интеллект»",
  short_name: "ООО «ОБС Интеллект»",
  legal_address: "Российская Федерация, г. Москва, ул. Примерная, д. 1, офис 1",
  email: "legal@nexora.example",
  phone: "+7 (495) 000-00-00",
  okved_primary: "62.01",
  okved_codes: ["62.01", "62.02", "62.09", "63.11"],
  it_activity_codes: [
    {
      code: "1.01",
      title:
        "Проектирование, разработка, адаптация, внедрение, сопровождение и техническая поддержка программ для ЭВМ, баз данных и визуальных пользовательских интерфейсов",
    },
    {
      code: "1.04",
      title: "Проектирование и иная деятельность, а также оказание услуг в отношении информационных систем",
    },
    {
      code: "1.05",
      title:
        "Проектирование и иная деятельность, а также оказание услуг в отношении сайтов в информационно-телекоммуникационной сети «Интернет»",
    },
    {
      code: "2.01",
      title:
        "Реализация программ для ЭВМ и баз данных, в том числе путём предоставления прав (лицензирования) и удалённого доступа через сеть «Интернет» (модель SaaS)",
    },
    {
      code: "3.01",
      title: "Создание, формирование, ведение и администрирование баз данных и информационных ресурсов",
    },
    {
      code: "8.01",
      title: "Услуги и работы по автоматизации и цифровизации процессов, проекты цифровой трансформации",
    },
    {
      code: "10.01",
      title:
        "Создание, обучение и поддержка нейросетей; услуги по распознаванию изображений, текстов, речи и иных сигналов",
    },
    {
      code: "26.01",
      title:
        "Обработка информации, включая сбор, разметку, верификацию, систематизацию массивов и предоставление результатов обработки",
    },
  ],
  created_at: now,
  updated_at: now,
};

export const okvedTitles: Record<string, string> = {
  "62.01": "Разработка компьютерного программного обеспечения",
  "62.02": "Деятельность консультативная и работы в области компьютерных технологий",
  "62.09":
    "Деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая",
  "63.11":
    "Деятельность по обработке данных, предоставление услуг по размещению информации и связанная с этим деятельность",
};

export const techStack = [
  { name: "Python", noteRu: "серверная логика, обучение и вызов моделей, обработка данных" },
  { name: "Node.js", noteRu: "интерфейсы прикладного программирования и интеграции" },
  { name: "TypeScript", noteRu: "типизированная разработка клиентских и серверных приложений" },
  { name: "Astro", noteRu: "статическая генерация сайтов (SSG) без лишнего JavaScript" },
  { name: "PostgreSQL", noteRu: "основная реляционная база данных, в том числе векторный поиск pgvector" },
  { name: "Timeweb Cloud", noteRu: "хостинг сайта и управляемый PostgreSQL, данные читаются на этапе сборки" },
  {
    name: "LLM / RAG",
    noteRu:
      "большие языковые модели и генерация с опорой на документы компании (RAG — retrieval-augmented generation)",
  },
  { name: "LangGraph / LlamaIndex", noteRu: "оркестрация агентов и контуры извлечения знаний" },
] as const;
