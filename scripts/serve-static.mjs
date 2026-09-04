import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleApiRequest } from "../backend/api.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const root = path.join(projectRoot, "dist");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

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

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".map": "application/json",
};

function safeJoin(urlPath) {
  const decoded = decodeURIComponent((urlPath || "/").split("?")[0]);
  const normalized = path.posix.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "/");
  return path.join(root, normalized);
}

function firstExisting(candidates) {
  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    try {
      if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
    } catch {
      /* ignore */
    }
  }
  return null;
}

function resolveFile(urlPath) {
  const target = safeJoin(urlPath);
  const file =
    firstExisting([target, `${target}.html`, path.join(target, "index.html")]) ||
    firstExisting([path.join(root, "404.html")]);
  return file;
}

const server = http.createServer(async (req, res) => {
  try {
    if (await handleApiRequest(req, res)) return;
  } catch (error) {
    console.error("[obs api]", error);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "API error" }));
    }
    return;
  }

  const file = resolveFile(req.url || "/");
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const status = file.endsWith(`${path.sep}404.html`) ? 404 : 200;
  res.writeHead(status, {
    "content-type": mime[ext] || "application/octet-stream",
    "cache-control": ext === ".html" || ext === ".json" ? "no-cache" : "public, max-age=86400",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, host, () => {
  console.log(`[obs] static site on http://${host}:${port}`);
});
