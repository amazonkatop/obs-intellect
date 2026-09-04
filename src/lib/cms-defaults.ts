import { HOME } from "./copy/home";
import { LANDINGS } from "./copy/landings";

const HOME_IDS = [
  "h1",
  "lead",
  "title",
  "description",
  "kicker",
  "ctaPrimary",
  "ctaSecondary",
  "formula",
  "manifestoH2",
  "manifesto",
  "startPointH2",
  "startPoint",
  "startCta",
  "howH2",
  "platformH2",
  "platform",
  "changeH2",
  "techH2",
  "tech",
  "whyH2",
  "differentiatorH2",
  "differentiator",
  "casesH2",
  "faqH2",
  "teamH2",
  "startupH2",
  "startup",
  "startupCta",
  "finalH2",
  "final",
] as const;

export function cmsBuiltInValues(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of ["ru", "en"] as const) {
    const copy = HOME[locale] as Record<string, unknown>;
    for (const id of HOME_IDS) {
      const value = copy[id];
      if (typeof value === "string") out[`home.${locale}.${id}`] = value;
    }
  }
  for (const landing of LANDINGS) {
    for (const locale of ["ru", "en"] as const) {
      out[`landing.${landing.slug}.${locale}.h1`] = landing.h1[locale];
      out[`landing.${landing.slug}.${locale}.lead`] = landing.lead[locale];
      out[`landing.${landing.slug}.${locale}.title`] = landing.title[locale];
      out[`landing.${landing.slug}.${locale}.description`] = landing.description[locale];
    }
  }
  return out;
}
