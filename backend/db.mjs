import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Pool } = pg;

function loadLocalEnv() {
  if (String(process.env.DATABASE_URL || "").trim()) return;
  try {
    const text = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // .env is optional
  }
}

loadLocalEnv();

let pool;

function shouldUseSsl(url) {
  if (/sslmode=disable/i.test(url)) return false;
  return !/localhost|127\.0\.0\.1/i.test(url);
}

export function databaseUrl() {
  return String(process.env.DATABASE_URL || "").trim();
}

export function getPool() {
  const url = databaseUrl();
  if (!url) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      ssl: shouldUseSsl(url) ? { rejectUnauthorized: false } : false,
      max: 5,
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const client = getPool();
  if (!client) {
    const error = new Error("DATABASE_URL is not set");
    error.code = "NO_DATABASE";
    throw error;
  }
  return client.query(sql, params);
}
