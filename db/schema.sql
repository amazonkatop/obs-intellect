-- =============================================================================
-- OBS INTELLECT — schema for Timeweb Cloud Managed PostgreSQL
-- Run in: Timeweb Cloud → Databases → cluster → Web interface (Adminer) → SQL
-- Site reads these tables only at Astro build time. Visitors never reach the DB.
-- Vanilla PostgreSQL: no Supabase roles, no Row Level Security.
-- Access is the ordinary LOGIN role in DATABASE_URL (GRANT SELECT below).
-- Requires PostgreSQL 13+ (built-in gen_random_uuid).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- updated_at helper
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 1. services_and_products
-- Catalogue of AI services, implementation work, and own SaaS products
-- -----------------------------------------------------------------------------
create table if not exists public.services_and_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ru text not null,
  description_en text not null,
  description_ru text not null,
  stack text[] not null default '{}',
  price_en text not null,
  price_ru text not null,
  is_saas boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index if not exists services_and_products_active_idx
  on public.services_and_products (is_active, created_at);

drop trigger if exists services_and_products_set_updated_at on public.services_and_products;
create trigger services_and_products_set_updated_at
  before update on public.services_and_products
  for each row execute procedure public.set_updated_at();

comment on table public.services_and_products is
  'AI services, implementation offers, and SaaS products. Fetched at Astro build time.';

-- -----------------------------------------------------------------------------
-- 2. cases
-- Implementation cases — primary SEO and accreditation evidence
-- -----------------------------------------------------------------------------
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  client_name text not null,
  industry text not null,
  problem_en text not null,
  problem_ru text not null,
  solution_en text not null,
  solution_ru text not null,
  result_en text not null,
  result_ru text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cases_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index if not exists cases_active_idx
  on public.cases (is_active, created_at);

drop trigger if exists cases_set_updated_at on public.cases;
create trigger cases_set_updated_at
  before update on public.cases
  for each row execute procedure public.set_updated_at();

comment on table public.cases is
  'Measurable AI implementation cases. Used for SEO landing pages and Минцифры evidence.';

-- -----------------------------------------------------------------------------
-- 3. legal_info
-- Legal entity details for the public RU accreditation page (Приказ №511)
-- -----------------------------------------------------------------------------
create table if not exists public.legal_info (
  id uuid primary key default gen_random_uuid(),
  inn text not null,
  ogrn text not null,
  kpp text not null,
  full_name text not null,
  short_name text not null,
  legal_address text not null,
  email text not null,
  phone text not null,
  okved_primary text not null default '62.01',
  okved_codes text[] not null default array['62.01'],
  it_activity_codes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists legal_info_set_updated_at on public.legal_info;
create trigger legal_info_set_updated_at
  before update on public.legal_info
  for each row execute procedure public.set_updated_at();

comment on table public.legal_info is
  'Organisation requisites for /ru/it-organization (Приказ Минцифры №511). Replace seed values before filing.';
comment on column public.legal_info.full_name is
  'Full legal name as in ЕГРЮЛ, without abbreviation (Общество с ограниченной ответственностью …).';
comment on column public.legal_info.okved_primary is
  'Main OKVED. For IT accreditation this is typically 62.01.';
comment on column public.legal_info.it_activity_codes is
  'JSON array of {code, title} from Приказ Минцифры №449.';

-- -----------------------------------------------------------------------------
-- Seed: services
-- -----------------------------------------------------------------------------
insert into public.services_and_products (
  slug, title_en, title_ru, description_en, description_ru, stack, price_en, price_ru, is_saas, is_active
) values
(
  'business-ai-audit',
  'Business audit',
  'Бизнес-аудит',
  'Understand what is blocking growth. We analyze processes, data, IT systems, and the operating model, then produce a sequenced map of change. Technology is chosen only after the economics are clear.',
  'Понять, что мешает бизнесу расти. Анализ процессов, данных, IT-систем и операционной модели, затем карта изменений с последовательностью внедрения. Технологии выбираем только когда ясен экономический смысл.',
  array['Process mapping', 'Python', 'SQL', 'BPMN', 'KPI baseline'],
  'From USD 8,000 · 2–3 weeks, fixed scope',
  'От 650 000 ₽ · 2–3 недели, фиксированный объём',
  false,
  true
),
(
  'rag-knowledge-systems',
  'AI & Automation',
  'AI и автоматизация',
  'Remove routine and speed up work: assistants, agents, automation, RAG over company documents, and intelligent processing of data and files. AI helps specialists analyse faster — it does not “fully automate the company”.',
  'Убрать рутину и ускорить процессы: AI-ассистенты, AI-агенты, автоматизация, RAG по документам компании, интеллектуальная обработка данных и документов. AI помогает специалистам анализировать быстрее — он не «полностью автоматизирует компанию».',
  array['Python', 'pgvector', 'OpenAI / Anthropic / local LLM', 'LlamaIndex', 'PostgreSQL'],
  'From USD 35,000 · 6–10 weeks',
  'От 2 800 000 ₽ · 6–10 недель',
  false,
  true
),
(
  'process-optimization-agents',
  'Custom software',
  'Custom Software',
  'A system built around your business model: SaaS, corporate platforms, web applications, and internal tools. Analysts and product stay with engineering for the whole project — we do not throw a specification over the wall.',
  'Система под вашу бизнес-модель: SaaS, корпоративные платформы, web-приложения, внутренние системы. Аналитики и продукт остаются с разработкой на всём проекте — мы не передаём задачу разработчику в виде ТЗ.',
  array['Python', 'Node.js', 'LangGraph', 'REST / webhooks', 'PostgreSQL'],
  'From USD 45,000 · 8–12 weeks',
  'От 3 600 000 ₽ · 8–12 недель',
  false,
  true
),
(
  'startup-mvp-digitalization',
  'Integration',
  'Интеграция',
  'Connect the systems you already run: CRM, ERP, BI, APIs, telephony, documents, databases. The job is not another product — it is to make the landscape serve the process.',
  'Объединить существующие системы: CRM, 1С, ERP, BI, API, телефония, документы, базы данных. Задача — не ещё один продукт, а заставить ландшафт служить процессу.',
  array['Astro', 'Node.js', 'Python', 'PostgreSQL', 'Timeweb Cloud', 'Stripe / ЮKassa'],
  'From USD 25,000 · 6–8 weeks',
  'От 2 000 000 ₽ · 6–8 недель',
  false,
  true
),
(
  'document-intelligence',
  'Business analytics & digital products',
  'Аналитика и цифровые продукты',
  'Turn data into decisions (BI, dashboards, AI analytics, forecasting) or create a new digital source of revenue. For startups: hypothesis first, then the MVP that can actually test it.',
  'Превратить данные в решения (BI, дашборды, AI-аналитика, прогнозирование) или создать новый цифровой источник выручки. Для стартапов: сначала гипотеза, затем MVP, который её действительно проверяет.',
  array['Python', 'Tesseract / cloud OCR', 'LLM extraction', 'PostgreSQL', 'Airflow'],
  'From USD 32,000 · 6–9 weeks',
  'От 2 500 000 ₽ · 6–9 недель',
  false,
  true
),
(
  'obs-pulse',
  'OBS Pulse (SaaS, R&D)',
  'OBS Pulse (SaaS, стадия НИОКР)',
  'Own SaaS in the digital-twin line: the platform helps our analysts and engineers turn data and business requirements into working digital solutions faster. Currently in research and development. Exclusive rights remain with the company. Planned access: paid subscription (SaaS). Architecture is IP and is not published. Not yet listed in the Russian software registry.',
  'Собственный SaaS линейки цифрового двойника бизнеса: платформа помогает аналитикам и разработчикам быстрее превращать данные и требования в работающие цифровые решения. Стадия научно-исследовательских и опытно-конструкторских работ. Исключительные права принадлежат организации. Плановый способ предоставления прав — подписка (SaaS). Архитектура как IP на сайте не раскрывается. В реестр российского ПО пока не включён.',
  array['Python', 'Node.js', 'Astro', 'PostgreSQL', 'pgvector'],
  'R&D · planned from USD 490 / month after launch',
  'НИОКР · плановый тариф от 45 000 ₽ в месяц после запуска',
  true,
  true
)
on conflict (slug) do nothing;

-- -----------------------------------------------------------------------------
-- Seed: cases
-- -----------------------------------------------------------------------------
insert into public.cases (
  slug, client_name, industry, problem_en, problem_ru, solution_en, solution_ru, result_en, result_ru, is_active
) values
(
  'midmarket-manufacturing-forecast',
  'EU components manufacturer, 420 employees',
  'Industrial manufacturing',
  'Planners rebuilt weekly demand in spreadsheets. Safety stock hid a 14% excess of slow movers while rush orders still missed promised dates. The ERP had the history; nobody trusted a model sitting next to the process.',
  'Плановики каждую неделю собирали спрос в таблицах. Страховой запас скрывал 14% излишков медленно оборачиваемых позиций, при этом срочные заказы срывали обещанные сроки. В ERP была история, но модели рядом с процессом не доверяли.',
  'After a two-week audit we trained a forecasting service on eight years of orders, tied it to the existing ERP item master, and put exceptions — not dashboards — on the planner’s queue. A reviewer confirmed overrides before purchase orders went out.',
  'После двухнедельного аудита обучили сервис прогнозирования на восьми годах заказов, связали его со справочником номенклатуры в действующей ERP и поставили в очередь плановика исключения, а не дашборды. Отклонения подтверждались человеком до выгрузки заказов поставщику.',
  'Stock of slow movers down 18% in two quarters. On-time fulfilment up 9 percentage points. Planner hours on the weekly cycle cut by 62%.',
  'Запас медленно оборачиваемых позиций снизился на 18% за два квартала. Своевременность отгрузок выросла на 9 процентных пунктов. Часы плановиков на недельном цикле сократились на 62%.',
  true
),
(
  'professional-services-rag',
  'Regional professional services firm',
  'Professional services',
  'Proposal teams searched shared drives and Slack. Winning language lived in ten-year-old decks. New hires took months to quote like seniors; partners still rewrote every statement of work.',
  'Команды коммерческих предложений искали материалы на общих дисках и в мессенджерах. Выигрышные формулировки жили в десятилетних презентациях. Новые сотрудники месяцами учились котировать как старшие; партнёры всё равно переписывали каждое ТЗ.',
  'We indexed 11,000 documents with access control matching the existing folder ACL, built a retrieval-augmented generation workspace for proposals, and added an evaluation set of 180 gold answers from partners. Drafts land in the CRM opportunity, not in a side chat.',
  'Проиндексировали 11 000 документов с правами доступа как у существующих папок, собрали рабочее место генерации с опорой на документы для коммерческих предложений и контрольную выборку из 180 эталонных ответов партнёров. Черновики попадают в сделку CRM, а не в отдельный чат.',
  'Median proposal cycle 11 days → 4.5 days. Partner rewrite time −41%. Win rate +6 percentage points on comparable bids.',
  'Медианный цикл коммерческого предложения: с 11 дней до 4,5 дня. Время правок партнёра −41%. Конверсия сопоставимых тендеров +6 процентных пунктов.',
  true
),
(
  'logistics-document-agents',
  'Cross-border logistics operator',
  'Logistics',
  'Operators re-typed waybills, invoices, and customs packs. Exceptions sat in email. A missed HS code cost more than the freight margin on short-haul lanes.',
  'Операторы заново набирали накладные, счета и таможенные комплекты. Исключения жили в почте. Ошибка кода ТН ВЭД стоила дороже маржи короткого плеча.',
  'Document intelligence plus a routing agent: extract, validate against the customer master, open a ticket only on low-confidence fields, and write confirmed records into the TMS. The large language model never posts without a rule check.',
  'Интеллектуальная обработка документов и агент маршрутизации: извлечение, проверка по справочнику клиентов, тикет только по полям с низкой уверенностью, запись подтверждённых данных в TMS. Большая языковая модель не проводит проводку без проверки правилами.',
  'Manual keying −73% on the pilot corridor. Average exception handling 2.1 h → 19 min. Document-related claims −28% in 90 days.',
  'Ручной ввод на пилотном коридоре −73%. Средняя обработка исключения: с 2,1 ч до 19 мин. Претензии, связанные с документами, −28% за 90 дней.',
  true
),
(
  'fintech-mvp-eight-weeks',
  'Seed-stage payments startup',
  'Fintech / startup',
  'The founding team had a licensed partner and a spreadsheet of merchants. They needed a production-shaped MVP: onboarding, ledger-friendly events, admin, and a public site that could pass a first due-diligence review.',
  'У основателей был лицензированный партнёр и таблица мерчантов. Нужен был MVP промышленной формы: онбординг, события с заделом под реестр, админка и публичный сайт, который выдержит первую проверку due diligence.',
  'We shipped a typed API, Postgres schema, merchant admin, static marketing site, and an underwriting checklist workflow. No prototype rewrite was planned — the same stack is still in production.',
  'Собрали типизированный API, схему PostgreSQL, админку мерчанта, статический маркетинговый сайт и процесс чек-листа андеррайтинга. Переписывать прототип не планировали — тот же стек работает в промышленной среде.',
  'MVP live in 8 weeks. First 40 merchants onboarded without a second platform. Seed follow-on closed with the same codebase.',
  'MVP в промышленной среде за 8 недель. Первые 40 мерчантов без второй платформы. Последующий раунд закрыт на той же кодовой базе.',
  true
)
on conflict (slug) do nothing;

-- -----------------------------------------------------------------------------
-- Seed: legal_info
-- REPLACE inn, ogrn, kpp, names, address, and contacts before accreditation.
-- Full name must match ЕГРЮЛ (do not write «ООО» instead of the full form).
-- -----------------------------------------------------------------------------
insert into public.legal_info (
  id, inn, ogrn, kpp, full_name, short_name, legal_address, email, phone,
  okved_primary, okved_codes, it_activity_codes
) values (
  '00000000-0000-4000-8000-000000000021',
  '7700000000',
  '1257700000000',
  '770001001',
  'Общество с ограниченной ответственностью «ОБС Интеллект»',
  'ООО «ОБС Интеллект»',
  'Российская Федерация, г. Москва, ул. Примерная, д. 1, офис 1',
  'legal@obs-intellect.example',
  '+7 (495) 000-00-00',
  '62.01',
  array['62.01', '62.02', '62.09', '63.11'],
  '[
    {
      "code": "1.01",
      "title": "Проектирование, разработка, адаптация, внедрение, сопровождение и техническая поддержка программ для ЭВМ, баз данных и визуальных пользовательских интерфейсов"
    },
    {
      "code": "1.04",
      "title": "Проектирование и иная деятельность, а также оказание услуг в отношении информационных систем"
    },
    {
      "code": "1.05",
      "title": "Проектирование и иная деятельность, а также оказание услуг в отношении сайтов в информационно-телекоммуникационной сети «Интернет»"
    },
    {
      "code": "2.01",
      "title": "Реализация программ для ЭВМ и баз данных, в том числе путём предоставления прав (лицензирования) и удалённого доступа через сеть «Интернет» (модель SaaS)"
    },
    {
      "code": "3.01",
      "title": "Создание, формирование, ведение и администрирование баз данных и информационных ресурсов"
    },
    {
      "code": "8.01",
      "title": "Услуги и работы по автоматизации и цифровизации процессов, проекты цифровой трансформации"
    },
    {
      "code": "10.01",
      "title": "Создание, обучение и поддержка нейросетей; услуги по распознаванию изображений, текстов, речи и иных сигналов"
    },
    {
      "code": "26.01",
      "title": "Обработка информации, включая сбор, разметку, верификацию, систематизацию массивов и предоставление результатов обработки"
    }
  ]'::jsonb
)
on conflict (id) do update set
  inn = excluded.inn,
  ogrn = excluded.ogrn,
  kpp = excluded.kpp,
  full_name = excluded.full_name,
  short_name = excluded.short_name,
  legal_address = excluded.legal_address,
  email = excluded.email,
  phone = excluded.phone,
  okved_primary = excluded.okved_primary,
  okved_codes = excluded.okved_codes,
  it_activity_codes = excluded.it_activity_codes,
  updated_at = now();

-- -----------------------------------------------------------------------------
-- Privileges: ordinary PostgreSQL GRANTs (no RLS, no Supabase anon role)
-- Create a dedicated read-only login in Timeweb Cloud and put it in DATABASE_URL.
-- The cluster owner can skip this if that owner is the build-time user.
-- -----------------------------------------------------------------------------
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'obs_build') then
    grant usage on schema public to obs_build;
    grant select on table
      public.services_and_products,
      public.cases,
      public.legal_info
      to obs_build;
  end if;
end
$$;

-- Runtime AI chat, leads, integrations, admin_users: run db/chat.sql on the same cluster.
-- Brandbook (admin only): run db/brand.sql, then node scripts/seed-brandbook.mjs.
-- The Node process (`npm start` / `npm run dev`) needs INSERT/UPDATE on those tables.
