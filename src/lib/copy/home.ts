export const METHOD_STEPS = [
  {
    n: "01",
    title: { en: "Diagnosis", ru: "Диагностика" },
    text: {
      en: "We study the business model, processes, organisation, data, and the IT systems already in place.",
      ru: "Изучаем бизнес-модель, процессы, организацию, данные и существующие IT-системы.",
    },
  },
  {
    n: "02",
    title: { en: "Digitization", ru: "Оцифровка" },
    text: {
      en: "We build a digital model of the key processes and how they connect inside the company.",
      ru: "Формируем цифровую модель ключевых процессов и взаимосвязей внутри бизнеса.",
    },
  },
  {
    n: "03",
    title: { en: "Analysis", ru: "Аналитика" },
    text: {
      en: "We find bottlenecks, manual work, lost time, duplication, and points of growth.",
      ru: "Находим узкие места, ручные операции, потери времени, дублирование и точки роста.",
    },
  },
  {
    n: "04",
    title: { en: "Strategy", ru: "Стратегия" },
    text: {
      en: "We decide which changes will produce the greatest effect — and in which order to implement them.",
      ru: "Определяем, какие изменения дадут максимальный эффект и в какой последовательности их внедрять.",
    },
  },
  {
    n: "05",
    title: { en: "Build", ru: "Разработка" },
    text: {
      en: "We create the digital products, AI services, automation, and internal systems the plan requires.",
      ru: "Создаём необходимые digital products, AI-сервисы, автоматизацию и корпоративные системы.",
    },
  },
  {
    n: "06",
    title: { en: "Integration", ru: "Интеграция" },
    text: {
      en: "We connect new solutions to CRM, ERP, BI, APIs, and the rest of the client’s stack.",
      ru: "Соединяем новые решения с CRM, ERP, 1С, BI, API и другими системами клиента.",
    },
  },
  {
    n: "07",
    title: { en: "Support", ru: "Поддержка" },
    text: {
      en: "We stay after launch: we operate, measure the result, and keep developing the system.",
      ru: "Остаёмся после запуска: сопровождаем, измеряем результат и развиваем систему.",
    },
  },
] as const;

export const CHANGE_OFFERS = [
  {
    href: "/business-audit",
    title: { en: "Business audit", ru: "Бизнес-аудит" },
    text: {
      en: "See what is blocking growth. Analysis of processes, data, IT systems, and the operating model.",
      ru: "Понять, что мешает бизнесу расти. Анализ процессов, данных, IT-систем и операционной модели.",
    },
  },
  {
    href: "/ai-business",
    title: { en: "AI & Automation", ru: "AI & Automation" },
    text: {
      en: "Remove routine and speed up work. Assistants, agents, automation, RAG, and intelligent document processing.",
      ru: "Убрать рутину и ускорить процессы. AI-ассистенты, AI-агенты, автоматизация, RAG, интеллектуальная обработка данных и документов.",
    },
  },
  {
    href: "/software-development",
    title: { en: "Custom software", ru: "Custom Software" },
    text: {
      en: "Build a system around your business model. SaaS, corporate platforms, web applications, internal tools.",
      ru: "Создать систему под вашу бизнес-модель. SaaS, корпоративные платформы, web-приложения, внутренние системы.",
    },
  },
  {
    href: "/integration",
    title: { en: "Integration", ru: "Integration" },
    text: {
      en: "Connect the systems you already have. CRM, ERP, BI, APIs, telephony, documents, databases.",
      ru: "Объединить существующие системы. CRM, 1С, ERP, BI, API, телефония, документы, базы данных.",
    },
  },
  {
    href: "/business-analytics",
    title: { en: "Business analytics", ru: "Business Analytics" },
    text: {
      en: "Turn data into decisions. BI, dashboards, AI analytics, forecasting, anomaly detection.",
      ru: "Превратить данные в решения. BI, dashboards, AI-аналитика, прогнозирование, поиск аномалий.",
    },
  },
  {
    href: "/startup-mvp",
    title: { en: "Digital products", ru: "Digital Products" },
    text: {
      en: "Create a new digital source of revenue. New services, products, and customer platforms.",
      ru: "Создать новый цифровой источник выручки. Новые сервисы, продукты и клиентские платформы.",
    },
  },
] as const;

export const WHY_ROLES = [
  {
    title: { en: "Business analysts", ru: "Business Analysts" },
    text: { en: "understand the business.", ru: "понимают бизнес." },
  },
  {
    title: { en: "Product managers", ru: "Product Managers" },
    text: { en: "turn problems into solutions.", ru: "превращают проблемы в решения." },
  },
  {
    title: { en: "AI specialists", ru: "AI Specialists" },
    text: { en: "decide where AI is actually needed.", ru: "определяют, где AI действительно нужен." },
  },
  {
    title: { en: "Software engineers", ru: "Software Engineers" },
    text: { en: "build the system.", ru: "создают систему." },
  },
  {
    title: { en: "Integration engineers", ru: "Integration Engineers" },
    text: { en: "connect it to the existing infrastructure.", ru: "подключают её к существующей инфраструктуре." },
  },
  {
    title: { en: "Support", ru: "Support" },
    text: { en: "stay after launch.", ru: "остаются после запуска." },
  },
] as const;

export const HERO_METRICS = [
  {
    value: "−32%",
    label: {
      en: "manual load on the first process taken into production",
      ru: "ручной нагрузки на первом процессе, выведенном в промышленный контур",
    },
  },
  {
    value: "6–12",
    unit: { en: "weeks", ru: "недель" },
    label: {
      en: "from audit to a production slice with integrations",
      ru: "от аудита до промышленного среза с интеграциями",
    },
  },
  {
    value: "39%",
    label: {
      en: "of companies already use AI assistants (SberAnalytics, 2025)",
      ru: "компаний уже используют AI-ассистентов (СберАналитика, 2025)",
    },
  },
] as const;

export const PLATFORM_POINTS = [
  {
    title: { en: "Faster", ru: "Быстрее" },
    text: {
      en: "AI helps analysts and engineers cut routine work and prepare solutions sooner.",
      ru: "AI помогает аналитикам и разработчикам сокращать рутинную работу и ускорять подготовку решений.",
    },
  },
  {
    title: { en: "More precise", ru: "Точнее" },
    text: {
      en: "Business-analysis results become the basis for design — not a separate document that dies in a folder.",
      ru: "Результаты бизнес-анализа становятся основой для дальнейшего проектирования.",
    },
  },
  {
    title: { en: "More systemic", ru: "Системнее" },
    text: {
      en: "Analysis, product management, and engineering work in one loop.",
      ru: "Аналитика, product management и разработка работают в едином контуре.",
    },
  },
] as const;

export const HOME = {
  en: {
    title: "Business-first technology transformation",
    description:
      "OBS Intellect is a business transformation partner for mid-market companies. We analyze how the business works, find points of growth, and build AI and software that change operations — then we implement and own the result.",
    h1: "First we understand the business. Then we build the technology.",
    lead: "We run a deep business audit, digitize processes, find points of growth, and create technology with AI and our own SaaS platform.",
    kicker: "Business analysis · AI · Software · Integration · Support",
    ctaPrimary: "Start a business audit",
    ctaHeader: "Start an audit",
    ctaSecondary: "Discuss a project",
    startPointH2: "Your business is the starting point",
    startPoint:
      "We do not offer technology before we understand the task. First we study how the company earns money, where losses appear, which processes slow growth, and how the existing IT landscape is arranged. Then we draw a map of change and choose the technologies that have economic sense.",
    startCta: "About the audit",
    howH2: "From a business problem to a working system",
    platformH2: "Our own AI platform shortens the path from analysis to build",
    platform:
      "Inside the company we use our own SaaS platform that combines business analysis, work with data, and AI tools for design and development. That lets us turn audit findings into concrete solutions faster — from hypotheses and prototypes to working digital products.",
    changeH2: "What we can change in your business",
    techH2: "We choose technology by the task, not by fashion",
    tech:
      "For a mid-market company the question is not only what a technology can do, but whether it is available, stable, secure, integrable, and supportable over years. We design durable solutions around the IT landscape, security requirements, and infrastructure of the market you operate in.",
    techItems: [
      { title: "AI and cloud platforms", text: "Selected for the market, the data policy, and the workload." },
      { title: "Corporate systems", text: "CRM, ERP, and the systems of record you already trust." },
      { title: "API integrations", text: "New capability sits inside existing flows, not beside them." },
      { title: "On-premise / cloud", text: "Hosting follows policy, latency, and cost — not a default slogan." },
      { title: "Hybrid architecture", text: "When one contour cannot hold the whole operating model." },
    ],
    whyH2: "One team from diagnosis to operations",
    differentiatorH2: "The task does not stop at a specification",
    differentiator:
      "We do not hand a business problem to an engineer as a technical brief and walk away. Analysts and the product team work with developers for the whole project. That is how a diagnosis becomes a system that actually runs.",
    manifestoH2: "Technology has no value on its own",
    manifesto:
      "Value appears when technology changes a business process, a decision, or a customer experience. So we do not start with “which technology should we implement?” We start with: how should your business work in order to become more productive?",
    formula: "Understand → Analyze → Design → Build → Integrate → Grow",
    casesH2: "Cases: problem, insight, solution, result",
    faqH2: "Questions companies actually ask",
    teamH2: "People who stay with the work",
    teamLink: "Full team",
    casesLink: "All cases",
    startupH2: "If you are still at the idea",
    startup:
      "Idea → business model → hypothesis tests → MVP → launch. We do not build an MVP for its own sake. First we check what the market must prove.",
    startupCta: "Talk about the idea",
    finalH2: "Not sure where your business needs AI?",
    final:
      "That is normal. We will not start with a tool. We will start with an analysis of your business.",
    checkup:
      "After a short brief we name 3–5 processes where automation and AI are most likely to move the number that matters.",
  },
  ru: {
    title: "Сначала бизнес. Потом технологии",
    description:
      "ООО «ОБС Интеллект» — партнёр по трансформации среднего бизнеса. Анализируем действующий бизнес, оцифровываем процессы, находим точки роста и создаём AI и software solutions, затем сами внедряем изменения и отвечаем за результат.",
    h1: "Сначала разбираемся в бизнесе. Потом строим технологии.",
    lead: "Проводим глубокий бизнес-аудит, оцифровываем процессы, выявляем точки роста и создаём технологические решения с помощью AI и собственной SaaS-платформы.",
    kicker: "Business analysis · AI · Software · Integration · Support",
    ctaPrimary: "Провести аудит бизнеса",
    ctaHeader: "Провести аудит",
    ctaSecondary: "Обсудить проект",
    startPointH2: "Ваш бизнес — наша точка отсчёта",
    startPoint:
      "Мы не предлагаем технологии до того, как понимаем задачу. Сначала изучаем, как компания зарабатывает, где возникают потери, какие процессы замедляют рост и как устроена существующая IT-инфраструктура. Затем формируем карту изменений и выбираем технологии, которые действительно имеют экономический смысл.",
    startCta: "Узнать об аудите",
    howH2: "От бизнес-задачи до работающей системы",
    platformH2: "Собственная AI-платформа ускоряет путь от анализа до разработки",
    platform:
      "Внутри компании мы используем собственную SaaS-платформу, объединяющую бизнес-аналитику, работу с данными и AI-инструменты для проектирования и разработки. Это позволяет быстрее переводить результаты бизнес-аудита в конкретные решения — от гипотез и прототипов до работающих цифровых продуктов.",
    changeH2: "Что мы можем изменить в вашем бизнесе",
    techH2: "Выбираем технологии не по моде, а по задаче",
    tech:
      "Для российского бизнеса важны не только возможности технологии, но и её доступность, устойчивость, безопасность, интегрируемость и возможность долгосрочной эксплуатации. При разработке решений учитываем существующий IT-ландшафт, требования к информационной безопасности, доступность российских облачных и AI-сервисов и необходимость долгосрочной поддержки.",
    techItems: [
      { title: "Российские AI и cloud platforms", text: "Когда задаче нужны доступность и предсказуемая поддержка на рынке РФ." },
      { title: "Корпоративные системы", text: "CRM, ERP, 1С и другие системы учёта, которые уже ведут правду." },
      { title: "API-интеграции", text: "Новая возможность встаёт в существующие потоки, а не рядом с ними." },
      { title: "On-premise / cloud", text: "Контур размещения следует из политики, задержки и стоимости." },
      { title: "Гибридная архитектура", text: "Когда один контур не удерживает всю операционную модель." },
    ],
    russiaH2: "Технологии, рассчитанные на российский бизнес",
    russia:
      "При разработке решений для российских компаний мы учитываем существующий IT-ландшафт, требования к информационной безопасности, доступность российских облачных и AI-сервисов и необходимость долгосрочной поддержки. В зависимости от задачи используем российские технологические платформы, международные технологии и их комбинации. Технологическая независимость — без потери бизнес-эффективности. Это одна из возможностей продукта, а не вся его ценность.",
    proof:
      "AI уже внедряется в российском среднем бизнесе. Следующий вопрос — как превратить отдельные эксперименты в системный бизнес-эффект. По данным СберАналитики за 2025 год, AI-ассистентов и AI-агентов используют 39% российских компаний; среди внедряющих заметна доля среднего бизнеса. Исследования Высшей школы экономики показывают: барьеры — стоимость, отсутствие данных и недостаточная IT-инфраструктура. Бизнесу недостаточно купить AI. Сначала нужно подготовить процессы, данные и контур.",
    whyH2: "Одна команда от диагностики до эксплуатации",
    differentiatorH2: "Бизнес-задачу не передаём разработчику в виде ТЗ",
    differentiator:
      "Мы не передаём бизнес-задачу разработчику в виде технического задания. Наши аналитики и продуктовая команда работают вместе с разработчиками на протяжении всего проекта. Так диагностика становится системой, которая реально работает.",
    manifestoH2: "Технология сама по себе не создаёт ценность",
    manifesto:
      "Ценность появляется тогда, когда технология меняет бизнес-процесс, решение или клиентский опыт. Поэтому мы начинаем не с вопроса «какую технологию внедрить?». Мы начинаем с вопроса: «Как должен работать ваш бизнес, чтобы стать эффективнее?»",
    formula: "Понять → Оцифровать → Найти точки роста → Создать → Внедрить → Развивать",
    casesH2: "Кейсы: проблема, инсайт, решение, результат",
    faqH2: "Вопросы, которые задают собственники и директора",
    teamH2: "Люди, которые остаются с работой",
    teamLink: "Вся команда",
    casesLink: "Все кейсы",
    startupH2: "Если вы ещё на стадии идеи",
    startup:
      "Идея → бизнес-модель → проверка гипотез → MVP → запуск. Мы не разрабатываем MVP ради MVP. Сначала проверяем бизнес-гипотезу и определяем, что действительно необходимо проверить на рынке.",
    startupCta: "Обсудить идею",
    finalH2: "Не знаете, где вашему бизнесу нужен AI?",
    final: "Это нормально. Мы начнём не с технологии, а с анализа вашего бизнеса.",
    checkup:
      "По короткому брифу определим 3–5 процессов, где автоматизация и AI потенциально могут дать наибольший эффект.",
  },
} as const;
