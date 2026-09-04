export function send(res, status, body, extra = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "content-type": extra.type || (typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8"),
    "cache-control": "no-store",
    ...extra.headers,
  });
  res.end(payload);
}

export function readBody(req, max = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > max) {
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

export async function readJson(req) {
  try {
    return JSON.parse((await readBody(req)).toString("utf8") || "{}");
  } catch {
    return null;
  }
}
