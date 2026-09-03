import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

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
    firstExisting([
      target,
      `${target}.html`,
      path.join(target, "index.html"),
    ]) || firstExisting([path.join(root, "404.html")]);
  return file;
}

const server = http.createServer((req, res) => {
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
    "cache-control": ext === ".html" ? "no-cache" : "public, max-age=86400",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, host, () => {
  console.log(`[obs] static site on http://${host}:${port}`);
});
