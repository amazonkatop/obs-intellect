import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedBrandbookOnce } from "../backend/cms/brand.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadDotEnv() {
  const file = path.join(projectRoot, ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

const result = await seedBrandbookOnce();
if (result.inserted) {
  console.log(
    result.storage === "postgres"
      ? "Inserted brandbook into PostgreSQL (slug=brandbook)."
      : "Wrote brandbook to data/cms/brand-documents.json (no DATABASE_URL).",
  );
} else {
  console.log(
    result.storage === "postgres"
      ? "Brandbook already exists in PostgreSQL. Left it unchanged."
      : "Local brandbook already exists. Left it unchanged.",
  );
}
process.exit(0);
