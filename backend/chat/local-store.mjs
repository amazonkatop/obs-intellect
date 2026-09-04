import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function storeFile() {
  try {
    const url = import.meta.url;
    if (typeof url === "string" && url.length > 0) {
      return path.resolve(path.dirname(fileURLToPath(url)), "..", "..", "data", "chat", "store.json");
    }
  } catch {
    // Netlify bundles this module to CJS; import.meta.url is missing there.
  }
  return path.resolve(process.cwd(), "data", "chat", "store.json");
}

function empty() {
  return { sessions: [], messages: [], assistant: null };
}

function read() {
  try {
    if (!fs.existsSync(storeFile())) return empty();
    const data = JSON.parse(fs.readFileSync(storeFile(), "utf8"));
    return {
      sessions: Array.isArray(data.sessions) ? data.sessions : [],
      messages: Array.isArray(data.messages) ? data.messages : [],
      assistant: data.assistant && typeof data.assistant === "object" ? data.assistant : null,
    };
  } catch {
    return empty();
  }
}

function write(data) {
  fs.mkdirSync(path.dirname(storeFile()), { recursive: true });
  fs.writeFileSync(storeFile(), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function now() {
  return new Date().toISOString();
}

function newId() {
  return crypto.randomUUID();
}

export function createSession() {
  const data = read();
  const created = now();
  const session = {
    id: newId(),
    status: "active",
    created_at: created,
    updated_at: created,
    pulse_sync_status: "not_applicable",
    pulse_client_id: null,
  };
  data.sessions.unshift(session);
  write(data);
  return session;
}

export function getSession(id) {
  return read().sessions.find((item) => item.id === id) || null;
}

export function listSessions() {
  const data = read();
  return data.sessions
    .slice()
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, 200)
    .map((session) => {
      const messages = data.messages.filter((item) => item.session_id === session.id);
      const firstUser = messages.find((item) => item.role === "user");
      return {
        ...session,
        message_count: messages.length,
        preview: String(firstUser?.content || "").slice(0, 140),
      };
    });
}

export function getSessionMessages(sessionId) {
  const session = getSession(sessionId);
  if (!session) return null;
  const messages = read()
    .messages.filter((item) => item.session_id === sessionId)
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  return { session, messages };
}

export function insertMessage(sessionId, role, content) {
  const data = read();
  const message = {
    id: newId(),
    session_id: sessionId,
    role,
    content,
    created_at: now(),
  };
  data.messages.push(message);
  const session = data.sessions.find((item) => item.id === sessionId);
  if (session) session.updated_at = message.created_at;
  write(data);
  return message;
}

export function getAssistant() {
  return read().assistant;
}

export function saveAssistant(isEnabled, config) {
  const data = read();
  const current = data.assistant;
  data.assistant = {
    id: current?.id || newId(),
    service_name: "ai_assistant",
    is_enabled: Boolean(isEnabled),
    config,
    updated_at: now(),
  };
  write(data);
  return data.assistant;
}
