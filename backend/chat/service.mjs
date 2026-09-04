import crypto from "node:crypto";
import { databaseUrl, query } from "../db.mjs";
import {
  MAX_HISTORY,
  MAX_MESSAGE,
  PROVIDERS,
  SYSTEM_PROMPT,
  UNAVAILABLE,
  WELCOME,
} from "./constants.mjs";
import * as local from "./local-store.mjs";

function localeOf(value) {
  return value === "en" ? "en" : "ru";
}

function unavailable(locale) {
  return { ok: false, code: "unavailable", ...UNAVAILABLE[localeOf(locale)] };
}

function asConfig(value) {
  if (typeof value === "string") {
    try {
      return asConfig(JSON.parse(value));
    } catch {
      return {};
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

function newId() {
  return crypto.randomUUID();
}

function localMode() {
  return !databaseUrl();
}

function envAssistant() {
  const key = String(process.env.DEEPSEEK_API_KEY || process.env.AI_ASSISTANT_API_KEY || "").trim();
  if (!key) return null;
  return {
    id: "env",
    service_name: "ai_assistant",
    is_enabled: true,
    config: {
      provider: String(process.env.AI_ASSISTANT_PROVIDER || "deepseek").trim() || "deepseek",
      model: String(process.env.DEEPSEEK_MODEL || process.env.AI_ASSISTANT_MODEL || "deepseek-chat").trim(),
      api_key: key,
    },
    updated_at: new Date().toISOString(),
  };
}

export async function createSession() {
  if (localMode()) return local.createSession();
  const id = newId();
  const result = await query(
    `insert into ai_chat_sessions (id, status, pulse_sync_status)
     values ($1, 'active', 'not_applicable')
     returning id, status, created_at`,
    [id],
  );
  return result.rows[0];
}

export async function listSessions() {
  if (localMode()) return local.listSessions();
  const result = await query(
    `select s.id, s.status, s.created_at, s.updated_at,
            count(m.id)::int as message_count,
            left(coalesce(
              (select m2.content from ai_chat_messages m2
                where m2.session_id = s.id and m2.role = 'user'
                order by m2.created_at asc limit 1),
              ''
            ), 140) as preview
       from ai_chat_sessions s
  left join ai_chat_messages m on m.session_id = s.id
   group by s.id
   order by s.created_at desc
      limit 200`,
  );
  return result.rows;
}

export async function getSessionMessages(sessionId) {
  if (localMode()) return local.getSessionMessages(sessionId);
  const session = await query(
    `select id, status, created_at, updated_at from ai_chat_sessions where id = $1`,
    [sessionId],
  );
  if (!session.rows[0]) return null;
  const messages = await query(
    `select id, role, content, created_at
       from ai_chat_messages
      where session_id = $1
      order by created_at asc`,
    [sessionId],
  );
  return { session: session.rows[0], messages: messages.rows };
}

export async function getAssistantIntegration() {
  const stored = localMode()
    ? local.getAssistant()
    : (await query(
        `select id, service_name, is_enabled, config, updated_at
           from integrations
          where service_name = 'ai_assistant'
          limit 1`,
      )).rows[0] || null;
  const config = asConfig(stored?.config);
  if (stored?.is_enabled && String(config.api_key || "").trim()) return stored;
  if (localMode()) {
    const fromEnv = envAssistant();
    if (fromEnv) return fromEnv;
  }
  return stored;
}

function maskKey(value) {
  const text = String(value || "");
  if (!text) return "";
  if (text.length < 8) return "••••";
  return `${text.slice(0, 3)}…${text.slice(-4)}`;
}

export async function getAssistantPublicConfig() {
  const row = await getAssistantIntegration();
  const config = asConfig(row?.config);
  const key = String(config.api_key || "");
  return {
    service_name: "ai_assistant",
    is_enabled: Boolean(row?.is_enabled),
    provider: String(config.provider || "deepseek"),
    model: String(config.model || ""),
    hasKey: Boolean(key),
    preview: maskKey(key),
    storage: localMode() ? "local-files" : "postgres",
  };
}

export async function saveAssistantConfig(input) {
  const current = await getAssistantIntegration();
  const prev = asConfig(current?.config);
  const nextKey = String(input.api_key || "").trim();
  const config = {
    provider: String(input.provider || prev.provider || "deepseek").trim() || "deepseek",
    model: String(input.model || "").trim(),
    api_key: nextKey || String(prev.api_key || ""),
  };
  const enabled = Boolean(input.is_enabled);
  if (localMode()) {
    local.saveAssistant(enabled, config);
    return getAssistantPublicConfig();
  }
  if (current && current.id !== "env") {
    await query(
      `update integrations
          set is_enabled = $1,
              config = $2::jsonb,
              updated_at = now()
        where service_name = 'ai_assistant'`,
      [enabled, JSON.stringify(config)],
    );
  } else {
    await query(
      `insert into integrations (id, service_name, is_enabled, config, updated_at)
       values ($1, 'ai_assistant', $2, $3::jsonb, now())`,
      [newId(), enabled, JSON.stringify(config)],
    );
  }
  return getAssistantPublicConfig();
}

function providerEndpoint(config) {
  const name = String(config.provider || "deepseek").toLowerCase();
  const known = PROVIDERS[name];
  const url = known?.url || "https://api.deepseek.com/chat/completions";
  const model = String(config.model || "").trim() || known?.model || "deepseek-chat";
  return { url, model };
}

async function completeChat(config, history, locale) {
  const { url, model } = providerEndpoint(config);
  const key = String(config.api_key || "").trim();
  if (!url || !key) {
    const error = new Error("missing provider");
    error.code = "UNAVAILABLE";
    throw error;
  }
  const welcome = WELCOME[localeOf(locale)];
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "assistant", content: welcome },
    ...history.map((item) => ({ role: item.role, content: item.content })),
  ];
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages,
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) {
    const error = new Error("provider error");
    error.code = "UNAVAILABLE";
    throw error;
  }
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    const error = new Error("empty completion");
    error.code = "UNAVAILABLE";
    throw error;
  }
  return text.trim();
}

export async function postMessage(sessionId, message, localeHint) {
  const text = String(message || "").trim();
  const locale = localeOf(localeHint);
  if (!sessionId || !text) {
    return { ok: false, code: "invalid", message: locale === "ru" ? "Пустое сообщение." : "Empty message." };
  }
  if (text.length > MAX_MESSAGE) {
    return {
      ok: false,
      code: "invalid",
      message: locale === "ru" ? "Сообщение слишком длинное." : "Message is too long.",
    };
  }

  let historyRows;
  if (localMode()) {
    const found = local.getSession(sessionId);
    if (!found) {
      return { ok: false, code: "invalid", message: locale === "ru" ? "Сессия не найдена." : "Session not found." };
    }
    local.insertMessage(sessionId, "user", text);
  } else {
    const session = await query(`select id, status from ai_chat_sessions where id = $1`, [sessionId]);
    if (!session.rows[0]) {
      return { ok: false, code: "invalid", message: locale === "ru" ? "Сессия не найдена." : "Session not found." };
    }
    await query(
      `insert into ai_chat_messages (id, session_id, role, content) values ($1, $2, 'user', $3)`,
      [newId(), sessionId, text],
    );
    await query(`update ai_chat_sessions set updated_at = now() where id = $1`, [sessionId]);
  }

  const integration = await getAssistantIntegration();
  const config = asConfig(integration?.config);
  if (!integration?.is_enabled || !String(config.api_key || "").trim()) {
    return unavailable(locale);
  }

  if (localMode()) {
    historyRows = (local.getSessionMessages(sessionId)?.messages || []).map((item) => ({
      role: item.role,
      content: item.content,
    }));
  } else {
    const history = await query(
      `select role, content from ai_chat_messages
        where session_id = $1
        order by created_at asc`,
      [sessionId],
    );
    historyRows = history.rows;
  }
  if (historyRows.length > MAX_HISTORY) {
    return unavailable(locale);
  }

  let reply;
  try {
    reply = await completeChat(config, historyRows, locale);
  } catch {
    return unavailable(locale);
  }

  if (localMode()) {
    const saved = local.insertMessage(sessionId, "assistant", reply);
    return { ok: true, reply: saved };
  }
  const saved = await query(
    `insert into ai_chat_messages (id, session_id, role, content)
     values ($1, $2, 'assistant', $3)
     returning id, role, content, created_at`,
    [newId(), sessionId, reply],
  );
  return { ok: true, reply: saved.rows[0] };
}
