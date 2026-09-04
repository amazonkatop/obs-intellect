import analystPhoto from "../assets/team/analyst.png";
import developerPhoto from "../assets/team/developer.png";
import founderPhoto from "../assets/team/founder.jpg";
import type { ImageMetadata } from "astro";
import type { Locale } from "./i18n";

export interface TeamMember {
  id: string;
  photo: ImageMetadata;
  nameEn: string;
  nameRu: string;
  roleEn: string;
  roleRu: string;
  bioEn: string;
  bioRu: string;
  focusEn: string[];
  focusRu: string[];
}

export const TEAM: TeamMember[] = [
  {
    id: "founder",
    photo: founderPhoto,
    nameEn: "Valentina Mochalova",
    nameRu: "Валентина Мочалова",
    roleEn: "Founder",
    roleRu: "Основатель",
    bioEn:
      "Valentina founded OBS Intellect as a business transformation partner: understand the company first, then use the firm’s own SaaS and AI to speed analysis and delivery, then implement the change and own the result. She sets development strategy and authored the digital-twin SaaS the company’s infrastructure runs on, including OBS Pulse.",
    bioRu:
      "Валентина основала ОБС Интеллект как партнёра по трансформации бизнеса: сначала понять компанию, затем с помощью собственной SaaS-платформы и AI ускорить аналитику и разработку, после этого реализовать изменения и отвечать за результат. Ведёт стратегию развития. Автор SaaS цифрового двойника бизнеса — на этой основе работает инфраструктура компании, включая линейку OBS Pulse.",
    focusEn: ["Company strategy", "Digital twin SaaS", "Product architecture", "Market demand"],
    focusRu: ["Стратегия развития", "SaaS цифрового двойника", "Продуктовая архитектура", "Рыночный спрос"],
  },
  {
    id: "analyst",
    photo: analystPhoto,
    nameEn: "Anna Volkova",
    nameRu: "Анна Волкова",
    roleEn: "Systems analyst",
    roleRu: "Системный аналитик",
    bioEn:
      "Anna owns the first weeks of every engagement: who waits on whom, which field in the CRM or ERP is actually trusted, and where hours leak. She maps the operating process with operators — not only sponsors — then scores AI use-cases against data readiness, access rules, and payback. Output is a process map, a labelled sample, and a fixed-scope statement of work, or a documented decision not to build.",
    bioRu:
      "Анна ведёт первые недели каждого проекта: кто кого ждёт, какому полю в CRM или ERP можно доверять, где теряются часы. Карту процесса снимает с операторов, а не только со спонсоров, и оценивает сценарии ИИ по готовности данных, правам доступа и сроку окупаемости. На выходе — карта процесса, размеченная выборка и фиксированное ТЗ — либо документированный отказ от разработки.",
    focusEn: ["Process mapping", "KPI baseline", "Data readiness", "Statement of work"],
    focusRu: ["Карта процесса", "Базовая метрика", "Готовность данных", "ТЗ на сборку"],
  },
  {
    id: "developer",
    photo: developerPhoto,
    nameEn: "Dmitry Orlov",
    nameRu: "Дмитрий Орлов",
    roleEn: "Lead developer",
    roleRu: "Главный разработчик",
    bioEn:
      "Dmitry puts the model inside the system of record. He designs the production slice: typed APIs, PostgreSQL, retrieval or document extraction, and a human reviewer in the same workflow. Evaluation sets and cost caps are part of the build, not a later phase. Code and schema stay in the client tenant unless the engagement is the future OBS Pulse product.",
    bioRu:
      "Дмитрий встраивает модель в систему учёта. Проектирует промышленный контур: типизированные API, PostgreSQL, поиск по документам или извлечение реквизитов и проверку человеком в том же процессе. Контрольные выборки и лимиты стоимости входят в сборку, а не в «следующую фазу». Код и схема остаются у заказчика, если только речь не о будущем продукте OBS Pulse.",
    focusEn: ["Python / Node.js", "RAG and agents", "ERP / CRM integrations", "Evaluation harness"],
    focusRu: ["Python / Node.js", "RAG и агенты", "Интеграции ERP / CRM", "Контур оценки качества"],
  },
];

export function teamCopy(member: TeamMember, locale: Locale) {
  return {
    name: locale === "ru" ? member.nameRu : member.nameEn,
    role: locale === "ru" ? member.roleRu : member.roleEn,
    bio: locale === "ru" ? member.bioRu : member.bioEn,
    focus: locale === "ru" ? member.focusRu : member.focusEn,
  };
}
