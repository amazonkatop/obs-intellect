import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export const paths = {
  root,
  content: path.join(root, "public", "cms", "content.json"),
  contentDist: path.join(root, "dist", "cms", "content.json"),
  integrations: path.join(root, "data", "cms", "integrations.json"),
  uploads: path.join(root, "public", "uploads"),
  uploadsDist: path.join(root, "dist", "uploads"),
};

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function readContent() {
  const data = readJson(paths.content, {});
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

export function writeContent(entries) {
  const clean = {};
  for (const [key, value] of Object.entries(entries || {})) {
    if (typeof key !== "string" || !key || typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed) clean[key] = value;
  }
  writeJson(paths.content, clean);
  if (fs.existsSync(path.join(root, "dist"))) {
    writeJson(paths.contentDist, clean);
  }
  return clean;
}

export function readIntegrations() {
  const data = readJson(paths.integrations, {});
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

export function writeIntegration(key, value) {
  const current = readIntegrations();
  if (!value) delete current[key];
  else current[key] = value;
  writeJson(paths.integrations, current);
  return current;
}

export function listUploads() {
  if (!fs.existsSync(paths.uploads)) return [];
  return fs
    .readdirSync(paths.uploads, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== ".gitkeep")
    .map((entry) => {
      const file = path.join(paths.uploads, entry.name);
      const stat = fs.statSync(file);
      return {
        name: entry.name,
        url: `/uploads/${encodeURIComponent(entry.name)}`,
        size: stat.size,
        updatedAt: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function saveUpload(originalName, buffer) {
  const safe = String(originalName || "file")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const name = `${stamp}-${safe || "file"}`;
  fs.mkdirSync(paths.uploads, { recursive: true });
  fs.writeFileSync(path.join(paths.uploads, name), buffer);
  if (fs.existsSync(path.join(root, "dist"))) {
    fs.mkdirSync(paths.uploadsDist, { recursive: true });
    fs.writeFileSync(path.join(paths.uploadsDist, name), buffer);
  }
  return { name, url: `/uploads/${encodeURIComponent(name)}` };
}
