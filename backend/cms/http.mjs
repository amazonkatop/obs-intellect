import crypto from "node:crypto";
import { contentCatalog, INTEGRATIONS } from "./catalog.mjs";
import { listUploads, readContent, readIntegrations, saveUpload, writeContent, writeIntegration } from "./store.mjs";
import { getAssistantPublicConfig, getSessionMessages, listSessions, saveAssistantConfig } from "../chat/service.mjs";

const COOKIE = "obs_admin";
const MAX_BODY = 8 * 1024 * 1024;

function password() {
  return String(process.env.ADMIN_PASSWORD || "").trim();
}

function secret() {
  const explicit = String(process.env.ADMIN_SECRET || "").trim();
  if (explicit) return explicit;
  const pass = password();
  return crypto.createHash("sha256").update(`obs-admin:${pass}`).digest("hex");
}

function sign(exp) {
  return crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
}

function cookieHeader(token, maxAge) {
  const parts = [`${COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAge}`];
  if (process.env.PUBLIC_SITE_URL?.startsWith("https://")) parts.push("Secure");
  return parts.join("; ");
}

function readCookie(req) {
  const header = req.headers.cookie || "";
  const match = header.split(/;\s*/).find((part) => part.startsWith(`${COOKIE}=`));
  return match ? match.slice(COOKIE.length + 1) : "";
}

function isAuthed(req) {
  const raw = readCookie(req);
  const [exp, mac] = raw.split(".");
  if (!exp || !mac || !password()) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  try {
    return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
  } catch {
    return false;
  }
}

function send(res, status, body, extra = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "content-type": extra.type || (typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8"),
    "cache-control": "no-store",
    ...extra.headers,
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function maskSecret(value) {
  const text = String(value || "");
  if (text.length < 8) return text ? "••••" : "";
  return `${text.slice(0, 3)}…${text.slice(-4)}`;
}

async function fireBuildHook() {
  const hook = String(readIntegrations().NETLIFY_BUILD_HOOK || process.env.NETLIFY_BUILD_HOOK || "").trim();
  if (!hook) return;
  try {
    await fetch(hook, { method: "POST" });
  } catch {
    /* ignore — local content.json already updated */
  }
}

/**
 * @returns {boolean} true if the request was handled
 */
export async function handleCmsRequest(req, res) {
  const host = req.headers.host || "127.0.0.1";
  let url;
  try {
    url = new URL(req.url || "/", `http://${host}`);
  } catch {
    return false;
  }

  if (url.pathname === "/cms/content.json" && req.method === "GET") {
    send(res, 200, readContent());
    return true;
  }

  if (!url.pathname.startsWith("/api/cms")) return false;

  if (url.pathname === "/api/cms/login" && req.method === "POST") {
    if (!password()) {
      send(res, 503, { error: "Задайте ADMIN_PASSWORD в окружении сервера." });
      return true;
    }
    let body = {};
    try {
      body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    } catch {
      send(res, 400, { error: "Invalid JSON" });
      return true;
    }
    const given = String(body.password || "");
    const expected = password();
    const a = Buffer.from(given);
    const b = Buffer.from(expected);
    const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
    if (!ok) {
      send(res, 401, { error: "Неверный пароль." });
      return true;
    }
    const exp = Date.now() + 1000 * 60 * 60 * 12;
    send(res, 200, { ok: true }, { headers: { "set-cookie": cookieHeader(`${exp}.${sign(exp)}`, 60 * 60 * 12) } });
    return true;
  }

  if (url.pathname === "/api/cms/logout" && req.method === "POST") {
    send(res, 200, { ok: true }, { headers: { "set-cookie": cookieHeader("", 0) } });
    return true;
  }

  if (url.pathname === "/api/cms/me" && req.method === "GET") {
    send(res, isAuthed(req) ? 200 : 401, { ok: isAuthed(req), configured: Boolean(password()) });
    return true;
  }

  if (!isAuthed(req)) {
    send(res, 401, { error: "Нужна авторизация." });
    return true;
  }

  if (url.pathname === "/api/cms/catalog" && req.method === "GET") {
    send(res, 200, { fields: contentCatalog(), values: readContent() });
    return true;
  }

  if (url.pathname === "/api/cms/content" && req.method === "PUT") {
    let body = {};
    try {
      body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    } catch {
      send(res, 400, { error: "Invalid JSON" });
      return true;
    }
    const saved = writeContent(body.entries || body);
    fireBuildHook();
    send(res, 200, { ok: true, count: Object.keys(saved).length });
    return true;
  }

  if (url.pathname === "/api/cms/files" && req.method === "GET") {
    send(res, 200, { files: listUploads() });
    return true;
  }

  if (url.pathname === "/api/cms/files" && req.method === "POST") {
    let body = {};
    try {
      body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    } catch {
      send(res, 400, { error: "Invalid JSON" });
      return true;
    }
    const allowed = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"]);
    const type = String(body.type || "");
    if (!allowed.has(type)) {
      send(res, 400, { error: "Допустимы PNG, JPEG, WebP, SVG и PDF." });
      return true;
    }
    let buffer;
    try {
      buffer = Buffer.from(String(body.data || ""), "base64");
    } catch {
      send(res, 400, { error: "Файл не прочитан." });
      return true;
    }
    if (!buffer.length || buffer.length > MAX_BODY) {
      send(res, 400, { error: "Пустой файл или больше 8 МБ." });
      return true;
    }
    const saved = saveUpload(body.name, buffer);
    send(res, 200, { ok: true, file: saved });
    return true;
  }

  if (url.pathname === "/api/cms/integrations" && req.method === "GET") {
    const stored = readIntegrations();
    send(res, 200, {
      items: INTEGRATIONS.map((item) => ({
        ...item,
        hasValue: Boolean(stored[item.key]),
        preview: item.secret ? maskSecret(stored[item.key]) : stored[item.key] || "",
      })),
    });
    return true;
  }

  if (url.pathname === "/api/cms/integrations" && req.method === "PUT") {
    let body = {};
    try {
      body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    } catch {
      send(res, 400, { error: "Invalid JSON" });
      return true;
    }
    const allowed = new Set(INTEGRATIONS.map((item) => item.key));
    const key = String(body.key || "");
    if (!allowed.has(key)) {
      send(res, 400, { error: "Неизвестный ключ интеграции." });
      return true;
    }
    writeIntegration(key, String(body.value || "").trim());
    send(res, 200, { ok: true });
    return true;
  }

  if (url.pathname === "/api/cms/ai-assistant" && req.method === "GET") {
    try {
      send(res, 200, await getAssistantPublicConfig());
    } catch (error) {
      send(res, 503, { error: "Нет подключения к PostgreSQL. Выполните db/chat.sql и задайте DATABASE_URL." });
    }
    return true;
  }

  if (url.pathname === "/api/cms/ai-assistant" && req.method === "PUT") {
    let body = {};
    try {
      body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    } catch {
      send(res, 400, { error: "Invalid JSON" });
      return true;
    }
    try {
      send(res, 200, { ok: true, item: await saveAssistantConfig(body) });
    } catch (error) {
      send(res, 503, { error: "Не удалось сохранить интеграцию. Проверьте DATABASE_URL и таблицу integrations." });
    }
    return true;
  }

  if (url.pathname === "/api/cms/dialogs" && req.method === "GET") {
    try {
      send(res, 200, { sessions: await listSessions() });
    } catch {
      send(res, 503, { error: "Нет подключения к PostgreSQL." });
    }
    return true;
  }

  const dialogMatch = url.pathname.match(/^\/api\/cms\/dialogs\/([0-9a-f-]{36})$/i);
  if (dialogMatch && req.method === "GET") {
    try {
      const detail = await getSessionMessages(dialogMatch[1]);
      if (!detail) {
        send(res, 404, { error: "Диалог не найден." });
        return true;
      }
      send(res, 200, detail);
    } catch {
      send(res, 503, { error: "Нет подключения к PostgreSQL." });
    }
    return true;
  }

  send(res, 404, { error: "Not found" });
  return true;
}

export function cmsVitePlugin() {
  return {
    name: "obs-cms",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleCmsRequest(req, res).then((handled) => {
          if (!handled) next();
        }).catch((error) => {
          console.error("[obs cms]", error);
          if (!res.headersSent) send(res, 500, { error: "CMS error" });
        });
      });
    },
  };
}
