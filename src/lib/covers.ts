import manufacturing from "../assets/cases/manufacturing.svg";
import services from "../assets/cases/services.svg";
import logistics from "../assets/cases/logistics.svg";
import fintech from "../assets/cases/fintech.svg";

const covers = {
  "midmarket-manufacturing-forecast": manufacturing,
  "professional-services-rag": services,
  "logistics-document-agents": logistics,
  "fintech-mvp-eight-weeks": fintech,
} as const;

export function caseCover(slug: string) {
  return covers[slug as keyof typeof covers] ?? manufacturing;
}
