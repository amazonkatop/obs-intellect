export type FaqItem = { q: string; a: string };

export const SITE_FAQ: { en: FaqItem[]; ru: FaqItem[] } = {
  en: [
    {
      q: "How much does a business audit cost?",
      a: "A fixed-scope diagnostic typically starts from USD 8,000 and takes two to three weeks. The number moves with the number of systems, sites, and process owners involved. We quote the audit before we quote the build.",
    },
    {
      q: "What is included in a business audit?",
      a: "A map of how the company actually earns money; the processes, data, organisation, and IT systems behind it; bottlenecks and growth points; and a sequenced change plan. You leave with a document you can take in-house — not a slide that only we can interpret.",
    },
    {
      q: "Do we have to replace our CRM or ERP?",
      a: "Usually no. We start from the systems you already run. Replacing a system of record is a last resort, not a default. The typical job is to connect new capability to what already holds the truth.",
    },
    {
      q: "Can AI be integrated with our existing systems?",
      a: "Yes, when the process, data, and access rules allow it. We connect to CRM, ERP, BI, telephony, document stores, and APIs. If a system cannot be integrated safely, we say so in the audit instead of forcing a side chatbot.",
    },
    {
      q: "Which AI solutions fit mid-market companies?",
      a: "The ones that change a measured workflow: assistants and agents in sales, support, documents, HR, finance, and internal knowledge; automation of repetitive hand-offs; analytics that operators actually use. Not a model for every department on day one.",
    },
    {
      q: "Can we use local or international AI platforms?",
      a: "We choose the stack from the task: availability, security, data residency, integrability, and long-term support in your market. That can mean local platforms, international models, on-premise, cloud, or a hybrid — not a fashion choice.",
    },
    {
      q: "Where is the data stored?",
      a: "Where the engagement specifies: your tenant, a regional cloud, or a hybrid. We do not move production data into a demo sandbox and leave it there. Residency and access control are part of the design, not an afterthought.",
    },
    {
      q: "Can the solution run in a regional cloud?",
      a: "Yes. We design for the cloud, infrastructure, and security rules of the market you operate in. If the requirement is a specific provider or region, that constraint is in the architecture from the audit.",
    },
    {
      q: "Can we use our own infrastructure?",
      a: "Yes. On-premise and hybrid deployments are a normal option when policy, latency, or cost require it. The product still has to connect to the systems of record — hosting is a decision, not the whole design.",
    },
    {
      q: "How long does an AI implementation take?",
      a: "A pilot on one process is typically weeks, not quarters. A production slice with integrations is often 6–12 weeks after the audit. Scaling to more processes follows measured results, not a big-bang programme.",
    },
    {
      q: "How is ROI calculated?",
      a: "From a baseline taken in the audit: time per task, cost per case, error rate, cycle time, or revenue leakage. We estimate effect on that metric before the build and measure it after go-live. If the case is weak, we recommend not to build.",
    },
    {
      q: "Can we start with a pilot?",
      a: "That is the default. Audit → use case → business case → pilot → integration → scale. A pilot is a working slice in the live process, not a disconnected prototype.",
    },
    {
      q: "Do you develop SaaS products?",
      a: "Yes. We build customer-facing and internal platforms when the business model needs a product, not only an automation. Internally we also run our own SaaS platform to speed analysis and delivery — without handing the full architecture to the market.",
    },
    {
      q: "Do you work with international clients?",
      a: "Yes. The English site is for international mid-market companies and founders. We analyse how the business works, then design and build what the operating model actually needs.",
    },
    {
      q: "Do you help create an MVP?",
      a: "Yes — after we test the business hypothesis. We do not build an MVP for its own sake. First we decide what must be proven on the market; only then we build the smallest product that can prove it.",
    },
  ],
  ru: [
    {
      q: "Сколько стоит аудит бизнеса?",
      a: "Диагностика с фиксированным объёмом обычно начинается от 650 000 ₽ и занимает две-три недели. Сумма зависит от числа систем, площадок и владельцев процессов. Сначала считаем аудит, затем — разработку.",
    },
    {
      q: "Что входит в бизнес-аудит?",
      a: "Как компания зарабатывает; процессы, данные, организация и действующие IT-системы; узкие места и точки роста; карта изменений с последовательностью внедрения. На выходе — документ, который можно забрать внутрь компании.",
    },
    {
      q: "Нужно ли менять существующую CRM или 1С?",
      a: "Как правило, нет. Мы исходим из систем, которые уже ведут учёт. Замена системы учёта — крайняя мера, а не исходная рекомендация. Типовая задача — подключить новое решение к тому, что уже является источником правды.",
    },
    {
      q: "Можно ли интегрировать AI с нашими системами?",
      a: "Да, если позволяют процесс, данные и права доступа. Подключаемся к CRM, ERP, 1С, BI, телефонии, документам и API. Если система не даёт безопасной интеграции, это будет сказано в аудите — а не закрыто отдельным чатом рядом с бизнесом.",
    },
    {
      q: "Какие AI-решения подходят среднему бизнесу?",
      a: "Те, что меняют измеряемый процесс: ассистенты и агенты в продажах, поддержке, документах, HR, финансах и внутренних знаниях; автоматизация повторяющихся передач; аналитика, которой пользуются операторы. Не модель «для всех отделов» в первый месяц.",
    },
    {
      q: "Можно ли использовать российские AI-сервисы?",
      a: "Да, когда это соответствует задаче. Для российского бизнеса важны доступность, устойчивость, безопасность, интегрируемость и долгосрочная поддержка. В зависимости от контура используем российские платформы, международные технологии или их комбинацию. Корпоративные API российских моделей уже можно рассматривать как часть production-архитектуры, а не только как эксперимент.",
    },
    {
      q: "Где хранятся данные?",
      a: "Там, где это задано договором: контур заказчика, российское облако или гибрид. Производственные данные не оставляем в демонстрационной среде. Резидентность и разграничение доступа входят в проект, а не добавляются потом.",
    },
    {
      q: "Можно ли разместить решение в российском облаке?",
      a: "Да. Учитываем IT-ландшафт, требования к информационной безопасности и доступность российских облачных и AI-сервисов. Если нужен конкретный провайдер или контур, это ограничение появляется в архитектуре уже на аудите.",
    },
    {
      q: "Можно ли использовать собственную инфраструктуру?",
      a: "Да. Размещение on-premise и гибридная архитектура — обычный вариант, если так требуют политика, задержка или стоимость. Хостинг — решение, а не вся конструкция: продукт всё равно должен соединяться с системами учёта.",
    },
    {
      q: "Сколько занимает внедрение AI?",
      a: "Пилот на одном процессе — обычно недели, не кварталы. Промышленный срез с интеграциями часто занимает 6–12 недель после аудита. Расширение на следующие процессы идёт по измеренному результату, а не большим взрывом.",
    },
    {
      q: "Как рассчитывается ROI?",
      a: "От базовой метрики, снятой на аудите: время на операцию, стоимость обращения, доля ошибок, длительность цикла, потери выручки. Оцениваем эффект до разработки и измеряем его после запуска. Если экономический смысл слабый, рекомендуем не строить.",
    },
    {
      q: "Можно ли начать с пилотного проекта?",
      a: "Это основной путь: аудит → сценарий → бизнес-кейс → пилот → интеграция → масштаб. Пилот — рабочий срез в живом процессе, а не прототип рядом с ним.",
    },
    {
      q: "Разрабатываете ли вы SaaS?",
      a: "Да. Создаём клиентские и внутренние платформы, когда бизнес-модели нужен продукт, а не только автоматизация. Внутри компании используем собственную SaaS-платформу, чтобы быстрее переводить аудит в решения — без раскрытия полной архитектуры как IP.",
    },
    {
      q: "Работаете ли вы с международными клиентами?",
      a: "Да. Английская версия сайта рассчитана на средний бизнес и основателей за пределами России. Анализируем, как устроен бизнес, затем проектируем и собираем то, что нужно операционной модели.",
    },
    {
      q: "Помогаете ли вы создавать MVP?",
      a: "Да — после проверки бизнес-гипотезы. Мы не разрабатываем MVP ради MVP. Сначала определяем, что действительно нужно проверить на рынке. Только после этого строим продукт.",
    },
  ],
};

/** Shorter set for compact surfaces (about teaser). */
export const HOME_FAQ = {
  en: SITE_FAQ.en.filter((_, i) => [1, 2, 4, 10, 11, 14].includes(i)),
  ru: SITE_FAQ.ru.filter((_, i) => [1, 2, 4, 10, 11, 14].includes(i)),
};
