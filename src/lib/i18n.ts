import type { CaseRecord, ServiceRecord } from "./types";
import { casePresentation } from "./copy/cases";

export type Locale = "en" | "ru";

export const MANUAL_LOCALE_KEY = "obs-intellect-locale-manual";

export function pathWithoutLocale(pathname: string): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (clean === "/ru") return "/";
  if (clean.startsWith("/ru/")) return clean.slice(3) || "/";
  return clean;
}

export function isRuPath(pathname: string): boolean {
  const clean = pathname.replace(/\/$/, "") || "/";
  return clean === "/ru" || clean.startsWith("/ru/");
}

/** Pages that exist only in the Russian tree. */
export const RU_ONLY_PATHS = new Set([
  "/it-organization",
  "/svedeniya-ob-it-organizacii",
  "/legal/refund-policy",
  "/legal/offer",
  "/legal/privacy",
]);

/** Canonical page for Минцифры accreditation (приказ № 511). */
export const IT_ACCREDITATION_PATH = "/ru/svedeniya-ob-it-organizacii";

export function compactPath(url: string): string {
  if (!url || url === "/") return "/";
  return url.replace(/\/$/, "");
}

export function locText(locale: Locale, value: { en: string; ru: string }): string {
  return locale === "ru" ? value.ru : value.en;
}

export function localeFromAstro(currentLocale: string | undefined, pathname?: string): Locale {
  if (currentLocale === "ru" || currentLocale === "en") return currentLocale;
  if (pathname && isRuPath(pathname)) return "ru";
  return "en";
}

export function serviceFields(service: ServiceRecord, locale: Locale) {
  return {
    title: locale === "ru" ? service.title_ru : service.title_en,
    description: locale === "ru" ? service.description_ru : service.description_en,
    price: locale === "ru" ? service.price_ru : service.price_en,
  };
}

export function caseFields(item: CaseRecord, locale: Locale) {
  const pack = casePresentation(item.slug, locale);
  return {
    problem: locale === "ru" ? item.problem_ru : item.problem_en,
    solution: locale === "ru" ? item.solution_ru : item.solution_en,
    result: locale === "ru" ? item.result_ru : item.result_en,
    clientName: pack?.clientName ?? item.client_name,
    industry: pack?.industry ?? item.industry,
    employees: pack?.employees ?? "",
    title: pack?.title ?? item.client_name,
    subtitle: pack?.subtitle ?? "",
    alt: pack?.alt ?? (locale === "ru" ? `Схема внедрения: ${item.industry}` : `Diagram for the ${item.industry} implementation`),
    description: pack?.description ?? `${item.industry}: ${locale === "ru" ? item.result_ru : item.result_en}`.slice(0, 160),
    metrics: pack?.metrics ?? [],
  };
}
