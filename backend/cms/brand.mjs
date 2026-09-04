import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { databaseUrl, query } from "../db.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const seedFile = path.join(root, "db", "seed", "obs-brandbook.md");
const localFile = path.join(root, "data", "cms", "brand-documents.json");

export const BRANDBOOK_SLUG = "brandbook";
export const BRANDBOOK_TITLE = "Брендбук OBS";
const MAX_MARKDOWN = 200 * 1024;

function readSeedMarkdown() {
  return fs.readFileSync(seedFile, "utf8");
}

function emptyDoc() {
  return {
    id: crypto.randomUUID(),
    slug: BRANDBOOK_SLUG,
    title: BRANDBOOK_TITLE,
    content_markdown: readSeedMarkdown(),
    updated_at: new Date().toISOString(),
  };
}

function readLocal() {
  try {
    if (!fs.existsSync(localFile)) return emptyDoc();
    const data = JSON.parse(fs.readFileSync(localFile, "utf8"));
    if (!data || typeof data !== "object" || data.slug !== BRANDBOOK_SLUG) return emptyDoc();
    return {
      id: String(data.id || crypto.randomUUID()),
      slug: BRANDBOOK_SLUG,
      title: String(data.title || BRANDBOOK_TITLE),
      content_markdown: String(data.content_markdown ?? ""),
      updated_at: String(data.updated_at || new Date().toISOString()),
    };
  } catch {
    return emptyDoc();
  }
}

function writeLocal(doc) {
  fs.mkdirSync(path.dirname(localFile), { recursive: true });
  fs.writeFileSync(localFile, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
  return doc;
}

export function seedPayload() {
  return {
    id: crypto.randomUUID(),
    slug: BRANDBOOK_SLUG,
    title: BRANDBOOK_TITLE,
    content_markdown: readSeedMarkdown(),
    updated_at: new Date().toISOString(),
  };
}

export async function getBrandbook() {
  if (!databaseUrl()) {
    return { ...readLocal(), storage: "local-files" };
  }
  const result = await query(
    `select id, slug, title, content_markdown, updated_at
       from brand_documents
      where slug = $1
      limit 1`,
    [BRANDBOOK_SLUG],
  );
  if (!result.rows[0]) {
    return {
      id: "",
      slug: BRANDBOOK_SLUG,
      title: BRANDBOOK_TITLE,
      content_markdown: "",
      updated_at: null,
      storage: "postgres",
      missing: true,
    };
  }
  return { ...result.rows[0], storage: "postgres" };
}

export async function saveBrandbook(input) {
  const title = String(input.title || "").trim() || BRANDBOOK_TITLE;
  const content = String(input.content_markdown ?? "");
  if (content.length > MAX_MARKDOWN) {
    const error = new Error("too large");
    error.code = "TOO_LARGE";
    throw error;
  }
  if (!databaseUrl()) {
    const current = readLocal();
    return {
      ...writeLocal({
        ...current,
        title,
        content_markdown: content,
        updated_at: new Date().toISOString(),
      }),
      storage: "local-files",
    };
  }
  const existing = await query(`select id from brand_documents where slug = $1 limit 1`, [BRANDBOOK_SLUG]);
  if (existing.rows[0]) {
    const saved = await query(
      `update brand_documents
          set title = $1,
              content_markdown = $2,
              updated_at = now()
        where slug = $3
    returning id, slug, title, content_markdown, updated_at`,
      [title, content, BRANDBOOK_SLUG],
    );
    return { ...saved.rows[0], storage: "postgres" };
  }
  const saved = await query(
    `insert into brand_documents (id, slug, title, content_markdown, updated_at)
     values ($1, $2, $3, $4, now())
 returning id, slug, title, content_markdown, updated_at`,
    [crypto.randomUUID(), BRANDBOOK_SLUG, title, content],
  );
  return { ...saved.rows[0], storage: "postgres" };
}

export async function seedBrandbookOnce() {
  const payload = seedPayload();
  if (!databaseUrl()) {
    if (fs.existsSync(localFile)) {
      const current = readLocal();
      if (String(current.content_markdown || "").trim()) {
        return { ok: true, storage: "local-files", inserted: false };
      }
    }
    writeLocal(payload);
    return { ok: true, storage: "local-files", inserted: true };
  }
  const result = await query(
    `insert into brand_documents (id, slug, title, content_markdown, updated_at)
     values ($1, $2, $3, $4, now())
     on conflict (slug) do nothing
 returning id`,
    [payload.id, BRANDBOOK_SLUG, payload.title, payload.content_markdown],
  );
  return { ok: true, storage: "postgres", inserted: Boolean(result.rows[0]) };
}
