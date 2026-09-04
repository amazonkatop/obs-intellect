import { createSession, postMessage } from "../../backend/chat/service.mjs";

function json(status, body) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  const url = String(event.rawUrl || event.path || "");
  const method = event.httpMethod || "GET";
  let payload = {};
  if (event.body) {
    try {
      payload = JSON.parse(event.body);
    } catch {
      return json(400, { ok: false, code: "invalid", message: "Invalid JSON" });
    }
  }

  try {
    if (method === "POST" && url.includes("/session")) {
      const session = await createSession();
      return json(200, { ok: true, session_id: session.id });
    }
    if (method === "POST" && url.includes("/message")) {
      const result = await postMessage(payload.session_id, payload.message, payload.locale);
      return json(result.ok ? 200 : result.code === "invalid" ? 400 : 503, result);
    }
    return json(404, { error: "Not found" });
  } catch {
    return json(503, {
      ok: false,
      code: "unavailable",
      message: "Ассистент временно недоступен, напишите нам напрямую",
      contacts: "/ru/contacts",
    });
  }
}
