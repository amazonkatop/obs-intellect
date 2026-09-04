import type { FaqItem } from "./faq";
import { SITE_FAQ } from "./faq";

export type Localized = { en: string; ru: string };

export interface LandingItem {
  title: Localized;
  text: Localized;
}

export interface LandingSection {
  h2: Localized;
  body?: Localized;
  items?: LandingItem[];
  numbered?: boolean;
}

export interface Landing {
  slug: string;
  cluster: "ai" | "ops" | "build" | "startup" | "method";
  nav: Localized;
  title: Localized;
  description: Localized;
  kicker?: Localized;
  h1: Localized;
  lead: Localized;
  sections: LandingSection[];
  related: string[];
  faqIds: number[];
  cta: "audit" | "idea" | "project";
  showRussia?: boolean;
}

const L = (en: string, ru: string): Localized => ({ en, ru });

export const LANDINGS: Landing[] = [
  {
    slug: "business-audit",
    cluster: "ops",
    nav: L("Business audit", "Аудит бизнеса"),
    title: L(
      "Business process audit",
      "Аудит бизнес-процессов",
    ),
    description: L(
      "OBS Intellect starts with a business process audit: we digitize how the company works, find bottlenecks and growth points, then decide which technology has economic sense.",
      "Аудит бизнес-процессов в ООО «ОБС Интеллект»: оцифровываем, как работает компания, находим узкие места и точки роста, затем решаем, какие технологии имеют экономический смысл.",
    ),
    kicker: L("Diagnosis before development", "Диагностика до разработки"),
    h1: L(
      "We start with the business process, not with the technology",
      "Мы начинаем с бизнес-процесса, а не с технологии",
    ),
    lead: L(
      "Mid-market companies already have people, CRM, ERP, sites, telephony, documents, and several IT systems — and still work less productively than they could. An audit is how we find out why, before anyone writes code.",
      "У среднего бизнеса уже есть сотрудники, CRM, ERP / 1С, сайты, телефония, документы, базы и несколько IT-систем — и при этом компания работает не так, как могла бы. Аудит отвечает, почему, до того как кто-то пишет код.",
    ),
    sections: [
      {
        h2: L("What the audit covers", "Что входит в аудит"),
        body: L(
          "We study how the company earns money, where losses appear, which processes slow growth, and how the current IT landscape is arranged. The output is a digital model of key processes, a list of bottlenecks, and a sequenced map of change.",
          "Изучаем, как компания зарабатывает, где возникают потери, какие процессы замедляют рост и как устроена IT-инфраструктура. На выходе — цифровая модель ключевых процессов, перечень узких мест и карта изменений с последовательностью внедрения.",
        ),
        items: [
          { title: L("Business model", "Бизнес-модель"), text: L("How value is created and captured today.", "Как сегодня создаётся и захватывается ценность.") },
          { title: L("Processes and organisation", "Процессы и организация"), text: L("Owners, hand-offs, waiting, duplication.", "Владельцы, передачи, ожидание, дублирование.") },
          { title: L("Data", "Данные"), text: L("What is trusted, what is missing, what cannot yet feed automation.", "Чему можно доверять, чего не хватает, что пока не потянуть автоматизацией.") },
          { title: L("IT systems", "IT-системы"), text: L("CRM, ERP, BI, APIs, documents — and the gaps between them.", "CRM, ERP, 1С, BI, API, документы — и разрывы между ними.") },
        ],
      },
      {
        h2: L("Why this comes before AI", "Почему это раньше, чем AI"),
        body: L(
          "Buying a model does not fix a process that has no owner, no baseline, and no clean data. Research on enterprise AI keeps returning to the same point: the effect appears when the work is redesigned, not when a tool is added to the existing queue. We baseline the metric first. If the case is weak, we recommend not to build.",
          "Купить модель — не значит исправить процесс без владельца, без базовой метрики и без данных. Наибольший эффект возникает при перепроектировании процесса, а не при добавлении инструмента к существующей очереди. Сначала снимаем метрику. Если экономический смысл слабый, рекомендуем не строить.",
        ),
      },
      {
        h2: L("What you leave with", "Что вы забираете"),
        body: L(
          "A process map, a digital model of key flows, scored opportunities, and a statement of work you can take in-house. The audit is useful even if you later build with another team.",
          "Карта процессов, цифровая модель ключевых потоков, оценка возможностей и ТЗ, которое можно забрать внутрь компании. Аудит полезен даже если разработку потом ведёт другая команда.",
        ),
      },
    ],
    related: ["ai-audit", "digital-transformation", "automation", "integration"],
    faqIds: [0, 1, 2, 10],
    cta: "audit",
  },
  {
    slug: "ai-audit",
    cluster: "ai",
    nav: L("AI audit", "AI-аудит"),
    title: L("AI business audit", "AI-аудит бизнеса"),
    description: L(
      "AI business audit: we find the processes where artificial intelligence will produce a real effect — and where it will not. Not every process should be automated.",
      "AI-аудит бизнеса: найдём процессы, где искусственный интеллект даст реальный эффект. Не каждый процесс нужно автоматизировать.",
    ),
    kicker: L("AI where it pays", "AI там, где окупается"),
    h1: L(
      "AI business audit: find the processes where artificial intelligence will actually pay off",
      "AI-аудит бизнеса: найдём процессы, где искусственный интеллект даст реальный эффект",
    ),
    lead: L(
      "Not every process should be automated. Not every company needs an AI agent. We analyse the company’s processes, estimate the automation potential, and set an implementation priority.",
      "Не каждый процесс нужно автоматизировать. Не каждому бизнесу нужен AI-агент. Мы анализируем процессы компании, определяем потенциал автоматизации и рассчитываем приоритет внедрения.",
    ),
    sections: [
      {
        h2: L("What an AI audit is for", "Зачем нужен AI-аудит"),
        body: L(
          "Mid-market companies already run experiments. The next question is how to turn separate trials into a business effect. An AI audit answers which workflows have data, owners, and a measurable baseline — and which would only add another chat on the side.",
          "Средний бизнес уже ставит эксперименты. Следующий вопрос — как превратить отдельные пробы в бизнес-эффект. AI-аудит отвечает, у каких процессов есть данные, владелец и измеримая база — и где появится только ещё один чат рядом с работой.",
        ),
      },
      {
        h2: L("How we score opportunities", "Как оцениваем возможности"),
        numbered: true,
        items: [
          { title: L("Process", "Процесс"), text: L("Volume, waiting, manual steps, cost of error.", "Объём, ожидание, ручные шаги, цена ошибки.") },
          { title: L("Data", "Данные"), text: L("Quality, access, residency, and whether a model can be grounded.", "Качество, доступ, резидентность и можно ли опереть модель на факты.") },
          { title: L("Systems", "Системы"), text: L("Can the result write back into CRM, ERP, or documents.", "Можно ли записать результат обратно в CRM, ERP, 1С или документы.") },
          { title: L("People", "Люди"), text: L("Who reviews, who owns exceptions, who is accountable.", "Кто проверяет, кто владеет исключениями, кто отвечает за результат.") },
          { title: L("Economics", "Экономика"), text: L("Payback versus the cost of build, tokens, and change.", "Окупаемость против стоимости сборки, вызовов модели и изменений.") },
        ],
      },
      {
        h2: L("Output", "На выходе"),
        body: L(
          "A short list of processes with a recommended path: assistant, agent, automation, analytics — or do not touch. Plus a pilot scope you can start without replacing the systems of record.",
          "Короткий список процессов с рекомендуемым путём: ассистент, агент, автоматизация, аналитика — или не трогать. Плюс объём пилота, который можно начать без замены систем учёта.",
        ),
      },
    ],
    related: ["ai-business", "ai-agents", "business-audit", "automation"],
    faqIds: [4, 9, 10, 11],
    cta: "audit",
  },
  {
    slug: "ai-business",
    cluster: "ai",
    nav: L("AI for business", "ИИ для бизнеса"),
    title: L(
      "Implementing artificial intelligence in business",
      "Внедрение искусственного интеллекта в бизнес",
    ),
    description: L(
      "Implementing AI in business for mid-market companies: assistants, agents, automation, and integration into existing processes. We start with an audit, not with a model.",
      "Внедрение ИИ в бизнес для среднего рынка: ассистенты, агенты, автоматизация и интеграция в действующие процессы. Начинаем с аудита, а не с модели.",
    ),
    kicker: L("AI for the operating model", "AI для операционной модели"),
    h1: L(
      "Implementing artificial intelligence in the business",
      "Внедрение искусственного интеллекта в бизнес",
    ),
    lead: L(
      "AI is already in mid-market operations. The remaining question is how to turn separate experiments into a systemic effect: a changed process, a better decision, or a different customer experience.",
      "AI уже внедряется в среднем бизнесе. Остаётся вопрос, как превратить отдельные эксперименты в системный эффект: изменённый процесс, более точное решение или другой клиентский опыт.",
    ),
    sections: [
      {
        h2: L("What AI can change", "Что AI может изменить"),
        items: [
          { title: L("Sales", "Продажи"), text: L("Qualify, draft, route, and keep the CRM true.", "Квалификация, черновики, маршрутизация, актуальная CRM.") },
          { title: L("Support", "Поддержка"), text: L("Grounded answers, classification, escalation to a human.", "Ответы с опорой на базу, классификация, эскалация человеку.") },
          { title: L("Analytics", "Аналитика"), text: L("Hypotheses, anomalies, explanations of what the chart actually shows.", "Гипотезы, аномалии, объяснение того, что показывает график.") },
          { title: L("Documents", "Документы"), text: L("Extract, check, and post into the system of record.", "Извлечение, проверка, проводка в систему учёта.") },
          { title: L("HR", "HR"), text: L("Screening, internal answers, routine personnel flows.", "Отбор, внутренние ответы, рутинные кадровые потоки.") },
          { title: L("Marketing", "Маркетинг"), text: L("Research, variants, and briefs tied to real product data.", "Исследование, варианты и брифы, связанные с данными продукта.") },
          { title: L("Finance", "Финансы"), text: L("Reconciliation, policy checks, draft memos — with a reviewer.", "Сверки, проверка по регламенту, черновики — с проверкой человеком.") },
          { title: L("Internal knowledge", "Внутренние знания"), text: L("Answers from your documents, not from a generic model.", "Ответы из ваших документов, а не из общей модели.") },
          { title: L("Engineering", "Разработка"), text: L("Faster analysis and delivery on our platform and in client work.", "Ускорение анализа и поставки на нашей платформе и в проектах клиента.") },
          { title: L("Operations", "Операционные процессы"), text: L("Less waiting between departments, fewer re-keys, clearer queues.", "Меньше ожидания между отделами, меньше повторного ввода, понятнее очереди.") },
        ],
      },
      {
        h2: L("How we implement AI", "Как мы внедряем AI"),
        body: L(
          "AI helps specialists analyse data faster, find patterns, form hypotheses, and build solutions. It does not “fully automate the company”. We keep a human in the loop where the cost of error is high.",
          "AI помогает специалистам быстрее анализировать данные, находить закономерности, формировать гипотезы и создавать решения. Он не «полностью автоматизирует компанию». Там, где цена ошибки высока, в контуре остаётся человек.",
        ),
        numbered: true,
        items: [
          { title: L("Audit", "Audit"), text: L("Process, data, systems, baseline metric.", "Процесс, данные, системы, базовая метрика.") },
          { title: L("Use case", "Use Case"), text: L("One workflow with a named owner.", "Один процесс с именованным владельцем.") },
          { title: L("Business case", "Business Case"), text: L("Effect versus cost of build and run.", "Эффект против стоимости сборки и эксплуатации.") },
          { title: L("Pilot", "Pilot"), text: L("A working slice in the live process.", "Рабочий срез в живом процессе.") },
          { title: L("Integration", "Integration"), text: L("Write-back to CRM, ERP, documents, APIs.", "Запись обратно в CRM, ERP, 1С, документы, API.") },
          { title: L("Scale", "Scale"), text: L("Next processes on the same discipline.", "Следующие процессы на той же дисциплине.") },
        ],
      },
    ],
    related: ["ai-audit", "ai-agents", "automation", "business-audit"],
    faqIds: [3, 4, 5, 9, 11],
    cta: "audit",
    showRussia: true,
  },
  {
    slug: "ai-agents",
    cluster: "ai",
    nav: L("AI agents", "AI-агенты"),
    title: L("AI agents for business", "AI-агенты для бизнеса"),
    description: L(
      "AI agents for business: task-level agents inside CRM, ERP, support, and documents. Classify, extract, draft, route, escalate — with a reviewer where it matters.",
      "AI-агенты для бизнеса: агенты уровня задачи внутри CRM, ERP, 1С, поддержки и документов. Классификация, извлечение, черновик, маршрутизация, эскалация — с проверкой человеком там, где это важно.",
    ),
    kicker: L("Agents in the workflow", "Агенты в процессе"),
    h1: L("AI agents for business", "AI-агенты для бизнеса"),
    lead: L(
      "An agent is useful when it performs a repeatable step in a real workflow: classify a case, extract a field, draft a reply, open a ticket, write a record. It is not useful as a chat that sits beside the work and invents policy.",
      "Агент полезен, когда выполняет повторяемый шаг в реальном процессе: классифицирует обращение, извлекает поле, готовит черновик, открывает тикет, пишет запись. Он бесполезен как чат рядом с работой, который выдумывает политику.",
    ),
    sections: [
      {
        h2: L("Where agents belong", "Где агентам место"),
        body: L(
          "Support, HR, finance, and internal operations are the patterns that already show up in production. We place the agent inside the system of record, with observability, cost caps, and a path to a human.",
          "Поддержка, HR, финансы и внутренние операции — сценарии, которые уже встречаются в промышленной среде. Ставим агента внутрь системы учёта, с наблюдаемостью, лимитами стоимости и путём к человеку.",
        ),
      },
      {
        h2: L("What we do not promise", "Чего мы не обещаем"),
        body: L(
          "We do not promise that “our AI will fully automate your business”. We promise a scored process, a bounded agent, and a measured change in cycle time, cost, or error rate — or a documented decision not to build.",
          "Мы не обещаем, что «наш AI полностью автоматизирует ваш бизнес». Обещаем оценённый процесс, ограниченного агента и измеренное изменение цикла, стоимости или ошибок — либо документированный отказ от разработки.",
        ),
      },
    ],
    related: ["ai-business", "automation", "ai-audit", "integration"],
    faqIds: [3, 4, 8, 11],
    cta: "project",
  },
  {
    slug: "automation",
    cluster: "ops",
    nav: L("Automation", "Автоматизация"),
    title: L("Business process automation", "Автоматизация бизнес-процессов"),
    description: L(
      "Business process automation for mid-market companies: remove routine, connect systems, and automate only the steps that have economic sense.",
      "Автоматизация бизнес-процессов для среднего бизнеса: убрать рутину, соединить системы и автоматизировать только те шаги, у которых есть экономический смысл.",
    ),
    kicker: L("Routine out of the path", "Рутина с пути"),
    h1: L("Business process automation", "Автоматизация бизнес-процессов"),
    lead: L(
      "Automation is not a synonym for AI, and AI is not a synonym for automation. We digitize the process first, then decide which steps a rule, an integration, or a model should take.",
      "Автоматизация — не синоним AI, а AI — не синоним автоматизации. Сначала оцифровываем процесс, затем решаем, какие шаги закрывает правило, интеграция или модель.",
    ),
    sections: [
      {
        h2: L("When automation is worth it", "Когда автоматизация имеет смысл"),
        body: L(
          "High volume, stable rules, a trusted system of record, and a cost of waiting you can name. If the process changes every week or the data is not there, we say so before anyone buys another licence.",
          "Большой объём, устойчивые правила, надёжная система учёта и цена ожидания, которую можно назвать. Если процесс меняется каждую неделю или данных нет, мы скажем это до покупки ещё одной лицензии.",
        ),
      },
      {
        h2: L("What we automate", "Что автоматизируем"),
        items: [
          { title: L("Hand-offs", "Передачи"), text: L("Between CRM, documents, ERP, and people.", "Между CRM, документами, ERP / 1С и людьми.") },
          { title: L("Re-keying", "Повторный ввод"), text: L("The same field typed in three systems.", "Одно и то же поле в трёх системах.") },
          { title: L("Routing", "Маршрутизация"), text: L("Who should see the case next.", "Кто должен увидеть обращение следующим.") },
          { title: L("Checks", "Проверки"), text: L("Policy, completeness, master-data match.", "Регламент, комплектность, сверка со справочником.") },
        ],
      },
    ],
    related: ["business-audit", "ai-agents", "integration", "digital-transformation"],
    faqIds: [1, 2, 9, 10],
    cta: "audit",
  },
  {
    slug: "software-development",
    cluster: "build",
    nav: L("Custom software", "Разработка ПО"),
    title: L("Custom software development", "Разработка программного обеспечения"),
    description: L(
      "Custom software for mid-market business models: corporate platforms, web applications, internal systems. We design around the process, then we build and integrate.",
      "Разработка ПО под бизнес-модель среднего рынка: корпоративные платформы, web-приложения, внутренние системы. Сначала процесс, затем разработка и интеграция.",
    ),
    kicker: L("Software around the model", "ПО вокруг модели"),
    h1: L(
      "Software built around your business model",
      "Система под вашу бизнес-модель",
    ),
    lead: L(
      "We are not a shop that starts from a screen layout. After the audit we build the SaaS, corporate platform, web application, or internal system the operating model actually needs — and we connect it to what you already run.",
      "Мы не студия, которая начинает с макета экрана. После аудита создаём SaaS, корпоративную платформу, web-приложение или внутреннюю систему, которая нужна операционной модели — и подключаем её к тому, что уже работает.",
    ),
    sections: [
      {
        h2: L("What we build", "Что разрабатываем"),
        items: [
          { title: L("Internal systems", "Внутренние системы"), text: L("The workflow the off-the-shelf suite cannot hold.", "Процесс, который не удерживает готовый пакет.") },
          { title: L("Customer platforms", "Клиентские платформы"), text: L("A digital product that can become a revenue line.", "Цифровой продукт, который может стать линией выручки.") },
          { title: L("Web applications", "Web-приложения"), text: L("Operator and customer surfaces on a durable stack.", "Интерфейсы для операторов и клиентов на устойчивом стеке.") },
          { title: L("SaaS for the client", "SaaS для клиента"), text: L("When the business itself is a software product.", "Когда сам бизнес является программным продуктом.") },
        ],
      },
      {
        h2: L("How delivery works", "Как идёт поставка"),
        body: L(
          "Analysts and the product team stay with engineering for the whole project. We do not throw a specification over the wall. Code stays in your tenant unless the engagement is our own product.",
          "Аналитики и продуктовая команда остаются с разработкой на всём проекте. Мы не перебрасываем ТЗ через стену. Код остаётся у заказчика, если речь не о нашем собственном продукте.",
        ),
      },
    ],
    related: ["saas-development", "integration", "digital-transformation", "startup-mvp"],
    faqIds: [12, 8, 2, 13],
    cta: "project",
  },
  {
    slug: "business-analytics",
    cluster: "ops",
    nav: L("Analytics", "Аналитика"),
    title: L("Business analytics", "Бизнес-аналитика"),
    description: L(
      "Business analytics for mid-market companies: BI, dashboards, AI analytics, forecasting, and anomaly detection — tied to decisions, not to unused reports.",
      "Бизнес-аналитика для среднего бизнеса: BI, дашборды, AI-аналитика, прогнозирование и поиск аномалий — связанные с решениями, а не с нечитаемыми отчётами.",
    ),
    kicker: L("Data into decisions", "Данные в решения"),
    h1: L("Turn data into decisions", "Превратить данные в решения"),
    lead: L(
      "Most mid-market companies already store history in CRM, ERP, and files. The gap is not another warehouse slide. The gap is a trusted metric on the desk of the person who can change the process.",
      "У большинства компаний среднего рынка история уже лежит в CRM, ERP и файлах. Разрыв — не ещё один слайд про хранилище. Разрыв — в доверенной метрике на столе у того, кто может изменить процесс.",
    ),
    sections: [
      {
        h2: L("What we put in place", "Что ставим"),
        items: [
          { title: L("BI and dashboards", "BI и дашборды"), text: L("The few charts operators will actually open.", "Те графики, которые операторы реально откроют.") },
          { title: L("AI analytics", "AI-аналитика"), text: L("Formulas, explanations, hypotheses, anomaly search — with a trail.", "Формулы, объяснения, гипотезы, поиск аномалий — с следом проверки.") },
          { title: L("Forecasting", "Прогнозирование"), text: L("Demand, load, and cash — exceptions in the queue, not a pretty line.", "Спрос, нагрузка, деньги — исключения в очереди, а не красивая линия.") },
          { title: L("Anomalies", "Аномалии"), text: L("What broke the pattern, who should see it, what happens next.", "Что сломало паттерн, кто должен это увидеть, что дальше.") },
        ],
      },
      {
        h2: L("Grounded in the process", "Привязка к процессу"),
        body: L(
          "Analytics without a write-back path becomes a weekly meeting. We connect numbers to the same systems that run the work, and we say which questions a model may answer and which stay with a person.",
          "Аналитика без пути обратно в процесс становится еженедельным совещанием. Связываем цифры с теми же системами, в которых идёт работа, и фиксируем, на какие вопросы модель может отвечать, а какие остаются за человеком.",
        ),
      },
    ],
    related: ["business-audit", "ai-business", "integration", "saas-development"],
    faqIds: [1, 6, 10, 3],
    cta: "audit",
  },
  {
    slug: "integration",
    cluster: "build",
    nav: L("Integration", "Интеграция"),
    title: L("IT systems integration", "Интеграция IT-систем"),
    description: L(
      "Integration of CRM, ERP, BI, APIs, telephony, documents, and databases. The value is not another system — it is connecting technology to the business you already run.",
      "Интеграция CRM, ERP, 1С, BI, API, телефонии, документов и баз данных. Ценность — не ещё одна система, а соединение технологий с уже работающим бизнесом.",
    ),
    kicker: L("Connect what you have", "Соединить то, что есть"),
    h1: L(
      "Unite the systems you already run",
      "Объединить существующие системы",
    ),
    lead: L(
      "Many companies already use several IT products and still lose time on re-keying, conflicting records, and hand-offs that live in chat. The integrator’s job is not to add a seventh logo. It is to make the landscape serve the process.",
      "У многих компаний уже несколько IT-продуктов, и всё равно теряется время на повторный ввод, расходящиеся записи и передачи в мессенджере. Задача интегратора — не добавить седьмой логотип. Задача — заставить ландшафт служить процессу.",
    ),
    sections: [
      {
        h2: L("Typical connections", "Типовые соединения"),
        items: [
          { title: L("CRM", "CRM"), text: L("Opportunities, cases, and the customer record.", "Сделки, обращения и карточка клиента.") },
          { title: L("ERP / accounting", "ERP / 1С"), text: L("Items, stock, invoices, postings.", "Номенклатура, склад, счета, проводки.") },
          { title: L("BI", "BI"), text: L("Trusted extracts instead of spreadsheet exports.", "Доверенные выгрузки вместо экспорта в таблицы.") },
          { title: L("API", "API"), text: L("Events and contracts between services.", "События и контракты между сервисами.") },
          { title: L("Telephony and documents", "Телефония и документы"), text: L("Calls, files, and the case they belong to.", "Звонки, файлы и обращение, к которому они относятся.") },
        ],
      },
      {
        h2: L("Resilience of the landscape", "Устойчивость ландшафта"),
        body: L(
          "We design with security, long-term support, and the market’s infrastructure in mind. Replacing a system of record is a last resort. Hybrid architectures are normal when one contour cannot hold everything.",
          "Проектируем с учётом безопасности, долгосрочной поддержки и инфраструктуры рынка. Замена системы учёта — крайняя мера. Гибридная архитектура — нормальный ответ, если один контур не удерживает всё.",
        ),
      },
    ],
    related: ["business-audit", "automation", "software-development", "ai-business"],
    faqIds: [2, 3, 7, 8],
    cta: "project",
    showRussia: true,
  },
  {
    slug: "saas-development",
    cluster: "build",
    nav: L("SaaS platform", "SaaS-платформа"),
    title: L("SaaS and AI platform for business", "SaaS и AI-платформа для бизнеса"),
    description: L(
      "OBS Intellect SaaS platform: we use our own AI business-analytics platform to turn audit findings into working digital products faster. We also build SaaS products for clients.",
      "SaaS-платформа ООО «ОБС Интеллект»: собственная AI-платформа помогает быстрее превращать результаты аудита в работающие цифровые продукты. Также разрабатываем SaaS для клиентов.",
    ),
    kicker: L("Platform as an accelerator", "Платформа как ускоритель"),
    h1: L(
      "Our SaaS platform shortens the path from analysis to a working product",
      "Наша SaaS-платформа ускоряет путь от анализа до работающего продукта",
    ),
    lead: L(
      "The platform helps our analysts and engineers turn data and business requirements into working digital solutions. We describe it through the result, not through a public architecture diagram: that layer is our IP.",
      "Платформа помогает нашим аналитикам и разработчикам быстрее превращать данные и бизнес-требования в работающие цифровые решения. Рассказываем через результат, а не через публичную схему архитектуры: этот слой — наш IP.",
    ),
    sections: [
      {
        h2: L("What it changes in delivery", "Что меняется в поставке"),
        items: [
          { title: L("Faster", "Быстрее"), text: L("Less routine in analysis and in preparing a solution.", "Меньше рутины в анализе и в подготовке решения.") },
          { title: L("More precise", "Точнее"), text: L("The audit is the input to design, not a separate PDF.", "Аудит — вход в проектирование, а не отдельный PDF.") },
          { title: L("More systemic", "Системнее"), text: L("Analysis, product, and engineering in one loop.", "Аналитика, продукт и разработка в одном контуре.") },
        ],
      },
      {
        h2: L("Digital twin of the business", "Цифровой двойник бизнеса"),
        body: L(
          "The same platform is used to build a digital twin of the operating model — the layer on which OBS Intellect’s own infrastructure runs, including the OBS Pulse line (currently in research and development). For clients we can apply the same discipline without exposing the internals.",
          "На той же платформе строится цифровой двойник операционной модели — слой, на котором стоит инфраструктура ОБС Интеллект, включая линейку OBS Pulse (стадия НИОКР). Для заказчиков применяем ту же дисциплину, не раскрывая внутреннее устройство.",
        ),
      },
      {
        h2: L("SaaS for your customers", "SaaS для ваших клиентов"),
        body: L(
          "When the company itself needs a software product — a customer platform or a billed service — we design and build it as a product, not as a one-off site. Hypothesis first, then the smallest version that can be charged for and measured.",
          "Когда самой компании нужен программный продукт — клиентская платформа или услуга по подписке — проектируем и собираем его как продукт, а не как разовый сайт. Сначала гипотеза, затем наименьшая версия, которую можно тарифицировать и измерить.",
        ),
      },
    ],
    related: ["software-development", "business-audit", "ai-business", "startup-mvp"],
    faqIds: [12, 6, 8, 13],
    cta: "project",
  },
  {
    slug: "digital-transformation",
    cluster: "method",
    nav: L("Method", "Метод"),
    title: L(
      "Business audit and digital transformation",
      "Аудит и цифровая трансформация бизнеса",
    ),
    description: L(
      "Digital transformation methodology: we start from the business process, digitize it, find growth points, then build, integrate, and grow the system. AI is a means, not the brand.",
      "Методология цифровой трансформации: начинаем с бизнес-процесса, оцифровываем, находим точки роста, затем создаём, внедряем и развиваем систему. AI — средство, а не бренд.",
    ),
    kicker: L("Method", "Методология"),
    h1: L(
      "We start with the business process, not with the technology",
      "Мы начинаем с бизнес-процесса, а не с технологии",
    ),
    lead: L(
      "Digital transformation is not a package of licences. It is a change in how the company works: diagnosis, a digital model of processes, a sequenced plan, software and AI where they pay, integration into the landscape you already have, and support after launch.",
      "Цифровая трансформация — не пакет лицензий. Это изменение того, как работает компания: диагностика, цифровая модель процессов, план по шагам, software и AI там, где они окупаются, интеграция в уже существующий ландшафт и поддержка после запуска.",
    ),
    sections: [
      {
        h2: L("The loop we run", "Контур, который мы ведём"),
        numbered: true,
        items: [
          { title: L("Understand", "Понять"), text: L("How the business earns, where it loses, who owns the work.", "Как бизнес зарабатывает, где теряет, кто владеет работой.") },
          { title: L("Digitize", "Оцифровать"), text: L("A model of processes, data, and systems.", "Модель процессов, данных и систем.") },
          { title: L("Find growth points", "Найти точки роста"), text: L("Bottlenecks with an economic case.", "Узкие места с экономическим смыслом.") },
          { title: L("Create", "Создать"), text: L("The product, automation, or AI service required.", "Нужный продукт, автоматизация или AI-сервис.") },
          { title: L("Implement", "Внедрить"), text: L("Into CRM, ERP, APIs, and people’s queues.", "В CRM, ERP, 1С, API и очереди людей.") },
          { title: L("Grow", "Развивать"), text: L("Measure, support, take the next process.", "Измерить, сопровождать, взять следующий процесс.") },
        ],
      },
      {
        h2: L("Why this beats buying a tool", "Почему это сильнее покупки инструмента"),
        body: L(
          "Enterprise AI is moving from one-off prompts to repeatable workflows and agents that complete tasks. The largest effect still comes from redesigning the process, not from adding a model to the existing pile of work. That is why we sell the sequence, not the logo of a model vendor.",
          "Корпоративный AI сдвигается от разовых запросов к повторяемым workflow и агентному выполнению задач. Наибольший эффект по-прежнему даёт перепроектирование процесса, а не добавление модели к существующей куче работы. Поэтому мы продаём последовательность, а не логотип поставщика модели.",
        ),
      },
      {
        h2: L("Who this is for", "Для кого это"),
        body: L(
          "Owners, CEOs, COOs, commercial directors, CIOs, and heads of digital transformation in companies that already have staff, processes, and several IT systems. The typical sentence we hear: we already have a lot of IT, and the business still does not run as well as it could.",
          "Собственники, CEO, генеральные и операционные директора, коммерческие директора, CIO и руководители цифровой трансформации в компаниях, где уже есть сотрудники, процессы и несколько IT-систем. Типовая фраза: IT уже много, а бизнес всё равно работает не так, как мог бы.",
        ),
      },
    ],
    related: ["business-audit", "ai-business", "automation", "saas-development"],
    faqIds: [1, 9, 10, 11],
    cta: "audit",
    showRussia: true,
  },
  {
    slug: "startup-mvp",
    cluster: "startup",
    nav: L("MVP", "MVP"),
    title: L("From idea to a working product", "От идеи до работающего продукта"),
    description: L(
      "From idea to MVP: we research the market, shape the business model, test hypotheses, design the MVP, and launch with real users. We do not build an MVP for its own sake.",
      "От идеи до MVP: исследуем рынок, формируем бизнес-модель, проверяем гипотезы, проектируем MVP и запускаем на реальных пользователях. Мы не разрабатываем MVP ради MVP.",
    ),
    kicker: L("Idea to product", "От идеи к продукту"),
    h1: L(
      "You have an idea. We will help turn it into a business.",
      "Есть идея. Мы поможем превратить её в бизнес.",
    ),
    lead: L(
      "We research the market, shape the business model, test hypotheses, design the MVP, and launch the product with real users. We do not build an MVP for its own sake. First we check the business hypothesis and decide what actually needs to be proven on the market. Only then we build the product.",
      "Исследуем рынок, формируем бизнес-модель, проверяем гипотезы, проектируем MVP и запускаем продукт на реальных пользователях. Мы не разрабатываем MVP ради MVP. Сначала проверяем бизнес-гипотезу и определяем, что действительно необходимо проверить на рынке. Только после этого строим продукт.",
    ),
    sections: [
      {
        h2: L("The path", "Путь"),
        numbered: true,
        items: [
          { title: L("Idea", "Idea"), text: L("We structure the idea so it can be tested.", "Формируем и структурируем идею.") },
          { title: L("Market", "Market"), text: L("Market, competitors, audience.", "Изучаем рынок, конкурентов и аудиторию.") },
          { title: L("Business model", "Business Model"), text: L("How the product will create and capture value.", "Как продукт будет создавать и захватывать ценность.") },
          { title: L("Product", "Product"), text: L("MVP scope and a product roadmap.", "Формируем MVP и product roadmap.") },
          { title: L("Build", "Build"), text: L("We develop the product.", "Разрабатываем продукт.") },
          { title: L("Launch", "Launch"), text: L("We launch and collect real data.", "Запускаем и собираем реальные данные.") },
        ],
      },
      {
        h2: L("Who this is for", "Для кого"),
        body: L(
          "Founders who have an idea, a market problem, a product hypothesis, investment, a team or expertise — and do not yet have a full business model, a product strategy, a technical team, an MVP, or a clear roadmap.",
          "Предприниматели, у которых есть идея, проблема рынка, продуктовая гипотеза, инвестиции, команда или экспертиза — и ещё нет полноценной бизнес-модели, product strategy, технической команды, MVP или понятного roadmap.",
        ),
      },
    ],
    related: ["startup-business-model", "saas-development", "software-development", "digital-transformation"],
    faqIds: [14, 11, 12, 13],
    cta: "idea",
  },
  {
    slug: "startup-business-model",
    cluster: "startup",
    nav: L("Business model", "Бизнес-модель"),
    title: L("Startup business model", "Бизнес-модель стартапа"),
    description: L(
      "We help founders shape a business model, test hypotheses, and only then decide what the MVP must prove. Product-market fit before a pile of features.",
      "Помогаем основателям сформировать бизнес-модель, проверить гипотезы и только затем решить, что должен доказать MVP. Product-market fit раньше груды функций.",
    ),
    kicker: L("Model before code", "Модель до кода"),
    h1: L(
      "A business model you can test, not a feature list you can demo",
      "Бизнес-модель, которую можно проверить, а не список функций для демо",
    ),
    lead: L(
      "An MVP that does not test a paying behaviour is just software. We work on how the product creates and captures value, which hypothesis is fatal if false, and what the smallest launch must measure.",
      "MVP, который не проверяет платёжное поведение, — просто программа. Работаем над тем, как продукт создаёт и захватывает ценность, какая гипотеза смертельна, если она ложна, и что должен измерить самый маленький запуск.",
    ),
    sections: [
      {
        h2: L("What we clarify", "Что проясняем"),
        items: [
          { title: L("Customer and problem", "Клиент и проблема"), text: L("Who hurts, how they solve it now, what they already pay.", "Кому больно, как решают сейчас, за что уже платят.") },
          { title: L("Value and capture", "Ценность и захват"), text: L("The offer, the price logic, the channel.", "Предложение, логика цены, канал.") },
          { title: L("Hypotheses", "Гипотезы"), text: L("What must be true, how we will know, what we will not build yet.", "Что должно быть правдой, как узнаем, чего пока не строим.") },
          { title: L("MVP boundary", "Граница MVP"), text: L("The smallest product that can collect that evidence.", "Наименьший продукт, который соберёт эти доказательства.") },
        ],
      },
      {
        h2: L("Then we build — or we wait", "Затем строим — или ждём"),
        body: L(
          "If the model is still a wish, more code will not save it. If the hypothesis is sharp, we design the product and the launch so that real users produce a number you can take to the next decision.",
          "Если модель всё ещё желание, дополнительный код её не спасёт. Если гипотеза острая, проектируем продукт и запуск так, чтобы реальные пользователи дали цифру для следующего решения.",
        ),
      },
    ],
    related: ["startup-mvp", "saas-development", "business-audit", "digital-transformation"],
    faqIds: [14, 11, 0, 13],
    cta: "idea",
  },
];

export const LANDING_BY_SLUG = Object.fromEntries(LANDINGS.map((item) => [item.slug, item])) as Record<
  string,
  Landing
>;

export const LANDING_SLUGS = LANDINGS.map((item) => item.slug);

export function landingFaq(landing: Landing, locale: "en" | "ru"): FaqItem[] {
  const source = SITE_FAQ[locale];
  return landing.faqIds.map((id) => source[id]).filter(Boolean);
}

export const INSIGHT_CLUSTERS = [
  {
    id: "ai",
    title: L("AI for business", "AI для бизнеса"),
    slugs: ["ai-business", "ai-audit", "ai-agents", "automation"],
  },
  {
    id: "ops",
    title: L("Digitization", "Цифровизация"),
    slugs: ["business-audit", "digital-transformation", "business-analytics", "integration"],
  },
  {
    id: "build",
    title: L("Software and SaaS", "ПО и SaaS"),
    slugs: ["software-development", "saas-development"],
  },
  {
    id: "startup",
    title: L("Startup", "Стартапам"),
    slugs: ["startup-mvp", "startup-business-model"],
  },
] as const;
