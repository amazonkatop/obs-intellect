import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const COOKIE = "obs_admin";
const MIN_PASSWORD = 8;
const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "data", "cms", "admin.json");

export function recoveryEmail() {
  return String(process.env.ADMIN_EMAIL || "bottegadisegno@gmail.com").trim().toLowerCase();
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function safeEqualString(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  const size = Math.max(a.length, b.length, 1);
  const paddedA = Buffer.alloc(size);
  const paddedB = Buffer.alloc(size);
  a.copy(paddedA);
  b.copy(paddedB);
  return crypto.timingSafeEqual(paddedA, paddedB) && a.length === b.length;
}

function emailMatches(given) {
  return safeEqualString(normalizeEmail(given), recoveryEmail());
}

function readRecord() {
  try {
    if (!fs.existsSync(file)) return null;
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    const hash = String(data.password_hash || "").trim();
    if (!hash) return null;
    return { password_hash: hash, email: normalizeEmail(data.email), updated_at: data.updated_at };
  } catch {
    return null;
  }
}

function hashPassword(plain) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(plain, salt, 64);
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
}

function verifyPassword(plain, stored) {
  const parts = String(stored || "").split(":");
  if (parts[0] !== "scrypt" || parts.length !== 3) return false;
  try {
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    if (!salt.length || expected.length !== 64) return false;
    const actual = crypto.scryptSync(plain, salt, expected.length);
    return crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function writePassword(plain) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `${JSON.stringify(
      {
        email: recoveryEmail(),
        password_hash: hashPassword(plain),
        updated_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function secret() {
  const explicit = String(process.env.ADMIN_SECRET || "").trim();
  if (explicit) return explicit;
  const hash = readRecord()?.password_hash || "unconfigured";
  return crypto.createHash("sha256").update(`obs-admin:${hash}`).digest("hex");
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

export function isConfigured() {
  return Boolean(readRecord());
}

export function isAuthed(req) {
  if (!isConfigured()) return false;
  const raw = readCookie(req);
  const [exp, mac] = raw.split(".");
  if (!exp || !mac) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  try {
    return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function sessionCookie() {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  return cookieHeader(`${exp}.${sign(exp)}`, 60 * 60 * 12);
}

export function clearCookie() {
  return cookieHeader("", 0);
}

function passwordError(password, repeat) {
  const plain = String(password || "");
  if (plain.length < MIN_PASSWORD) {
    return `Пароль не короче ${MIN_PASSWORD} символов.`;
  }
  if (repeat !== undefined && plain !== String(repeat || "")) {
    return "Пароли не совпадают.";
  }
  return "";
}

export function login(password) {
  const record = readRecord();
  if (!record) return { ok: false, status: 409, error: "Сначала задайте пароль на этой странице." };
  if (!verifyPassword(String(password || ""), record.password_hash)) {
    return { ok: false, status: 401, error: "Неверный пароль." };
  }
  return { ok: true };
}

export function setup({ email, password, repeat }) {
  if (isConfigured()) {
    return { ok: false, status: 409, error: "Пароль уже задан. Если забыли — сбросьте по почте." };
  }
  const pwdError = passwordError(password, repeat);
  if (pwdError) return { ok: false, status: 400, error: pwdError };
  if (!emailMatches(email)) {
    return { ok: false, status: 401, error: "Неверная почта." };
  }
  writePassword(password);
  return { ok: true };
}

export function reset({ email, password, repeat }) {
  if (!isConfigured()) {
    return { ok: false, status: 409, error: "Сначала задайте пароль на этой странице." };
  }
  const pwdError = passwordError(password, repeat);
  if (pwdError) return { ok: false, status: 400, error: pwdError };
  if (!emailMatches(email)) {
    return { ok: false, status: 401, error: "Неверная почта." };
  }
  writePassword(password);
  return { ok: true };
}
