export interface ServiceRecord {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  stack: string[];
  price_en: string;
  price_ru: string;
  is_saas: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseRecord {
  id: string;
  slug: string;
  client_name: string;
  industry: string;
  problem_en: string;
  problem_ru: string;
  solution_en: string;
  solution_ru: string;
  result_en: string;
  result_ru: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ItActivityCode {
  code: string;
  title: string;
}

export interface LegalInfo {
  id: string;
  inn: string;
  ogrn: string;
  kpp: string;
  full_name: string;
  short_name: string;
  legal_address: string;
  email: string;
  phone: string;
  okved_primary: string;
  okved_codes: string[];
  it_activity_codes: ItActivityCode[];
  created_at: string;
  updated_at: string;
}

export const SITE = {
  name: "OBS Intellect",
  legalShort: "ООО «ОБС Интеллект»",
  tagline: "First the business. Then the technology.",
  description:
    "OBS Intellect is a business transformation partner for mid-market companies: we analyze how the business works, find growth points, and build AI and software that change operations. Own SaaS platform OBS Pulse is in R&D.",
  descriptionRu:
    "ООО «ОБС Интеллект» — партнёр по трансформации среднего бизнеса: анализируем действующий бизнес, находим точки роста и создаём AI и software solutions, затем сами внедряем изменения. Собственная SaaS-платформа OBS Pulse — на стадии НИОКР.",
  email: "hello@nexora.example",
  defaultOgLocale: "en_US",
} as const;
