import { Client } from "pg";
import { fallbackCases, fallbackLegal, fallbackServices } from "./fallback";
import type { CaseRecord, ItActivityCode, LegalInfo, ServiceRecord } from "./types";

function readDatabaseUrl(): string {
  return String(import.meta.env.DATABASE_URL || process.env.DATABASE_URL || "").trim();
}

function shouldUseSsl(url: string): boolean {
  if (/sslmode=disable/i.test(url)) return false;
  return !/localhost|127\.0\.0\.1/i.test(url);
}

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

function parseActivityCodes(value: unknown): ItActivityCode[] {
  if (typeof value === "string") {
    try {
      return parseActivityCodes(JSON.parse(value));
    } catch {
      return fallbackLegal.it_activity_codes;
    }
  }
  if (!Array.isArray(value)) return fallbackLegal.it_activity_codes;
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const rec = item as Record<string, unknown>;
      if (typeof rec.code !== "string" || typeof rec.title !== "string") return null;
      return { code: rec.code, title: rec.title };
    })
    .filter((item): item is ItActivityCode => item !== null);
}

async function query<T extends Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[] | null> {
  const url = readDatabaseUrl();
  if (!url) {
    console.warn("[obs] DATABASE_URL is not set. Using local fallback content for SSG.");
    return null;
  }

  const client = new Client({
    connectionString: url,
    ssl: shouldUseSsl(url) ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    const result = await client.query<T>(sql, params);
    return result.rows;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[obs] PostgreSQL query failed, using fallback:", message);
    return null;
  } finally {
    await client.end().catch(() => {});
  }
}

function mapService(row: Record<string, unknown>): ServiceRecord {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title_en: String(row.title_en),
    title_ru: String(row.title_ru),
    description_en: String(row.description_en),
    description_ru: String(row.description_ru),
    stack: Array.isArray(row.stack) ? row.stack.map(String) : [],
    price_en: String(row.price_en),
    price_ru: String(row.price_ru),
    is_saas: Boolean(row.is_saas),
    is_active: Boolean(row.is_active),
    created_at: asIso(row.created_at),
    updated_at: asIso(row.updated_at),
  };
}

function mapCase(row: Record<string, unknown>): CaseRecord {
  return {
    id: String(row.id),
    slug: String(row.slug),
    client_name: String(row.client_name),
    industry: String(row.industry),
    problem_en: String(row.problem_en),
    problem_ru: String(row.problem_ru),
    solution_en: String(row.solution_en),
    solution_ru: String(row.solution_ru),
    result_en: String(row.result_en),
    result_ru: String(row.result_ru),
    is_active: Boolean(row.is_active),
    created_at: asIso(row.created_at),
    updated_at: asIso(row.updated_at),
  };
}

export async function getServices(): Promise<ServiceRecord[]> {
  const rows = await query(
    `select id, slug, title_en, title_ru, description_en, description_ru, stack,
            price_en, price_ru, is_saas, is_active, created_at, updated_at
       from services_and_products
      where is_active = true
      order by created_at asc`,
  );
  if (!rows?.length) return fallbackServices;
  return rows.map(mapService);
}

export async function getCases(): Promise<CaseRecord[]> {
  const rows = await query(
    `select id, slug, client_name, industry, problem_en, problem_ru, solution_en, solution_ru,
            result_en, result_ru, is_active, created_at, updated_at
       from cases
      where is_active = true
      order by created_at asc`,
  );
  if (!rows?.length) return fallbackCases;
  return rows.map(mapCase);
}

export async function getCaseBySlug(slug: string): Promise<CaseRecord | undefined> {
  const cases = await getCases();
  return cases.find((item) => item.slug === slug);
}

export async function getLegalInfo(): Promise<LegalInfo> {
  const rows = await query(
    `select id, inn, ogrn, kpp, full_name, short_name, legal_address, email, phone,
            okved_primary, okved_codes, it_activity_codes, created_at, updated_at
       from legal_info
      order by updated_at desc
      limit 1`,
  );
  const row = rows?.[0];
  if (!row) return fallbackLegal;

  return {
    id: String(row.id),
    inn: String(row.inn),
    ogrn: String(row.ogrn),
    kpp: String(row.kpp),
    full_name: String(row.full_name),
    short_name: String(row.short_name),
    legal_address: String(row.legal_address),
    email: String(row.email),
    phone: String(row.phone),
    okved_primary: String(row.okved_primary),
    okved_codes: Array.isArray(row.okved_codes) ? row.okved_codes.map(String) : fallbackLegal.okved_codes,
    it_activity_codes: parseActivityCodes(row.it_activity_codes),
    created_at: asIso(row.created_at),
    updated_at: asIso(row.updated_at),
  };
}
