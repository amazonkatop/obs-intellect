import { createSession, postMessage } from "./service.mjs";
import { readJson, send } from "../http-util.mjs";

function pathnameOf(req) {
  try {
    return new URL(req.url || "/", "http://127.0.0.1").pathname;
  } catch {
    return "";
  }
}

/**
 * @returns {Promise<boolean>}
 */
export async function handleChatRequest(req, res) {
  const pathname = pathnameOf(req);

  if (pathname === "/api/chat/session" && req.method === "POST") {
    try {
      const session = await createSession();
      send(res, 200, { ok: true, session_id: session.id });
    } catch (error) {
      const code = error && error.code;
      if (code === "NO_DATABASE") {
        send(res, 503, { ok: false, code: "unavailable", message: "Ассистент временно недоступен, напишите нам напрямую", contacts: "/ru/contacts" });
        return true;
      }
      console.error("[obs chat] session", error);
      send(res, 503, { ok: false, code: "unavailable", message: "Ассистент временно недоступен, напишите нам напрямую", contacts: "/ru/contacts" });
    }
    return true;
  }

  if (pathname === "/api/chat/message" && req.method === "POST") {
    const body = await readJson(req);
    if (!body) {
      send(res, 400, { ok: false, code: "invalid", message: "Invalid JSON" });
      return true;
    }
    try {
      const result = await postMessage(body.session_id, body.message, body.locale);
      send(res, result.ok ? 200 : result.code === "invalid" ? 400 : 503, result);
    } catch (error) {
      const code = error && error.code;
      if (code !== "NO_DATABASE") console.error("[obs chat] message", error);
      send(res, 503, {
        ok: false,
        code: "unavailable",
        message: "Ассистент временно недоступен, напишите нам напрямую",
        contacts: "/ru/contacts",
      });
    }
    return true;
  }

  return false;
}
