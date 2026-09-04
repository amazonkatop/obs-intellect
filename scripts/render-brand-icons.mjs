import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const fontDir = path.join(root, "scripts", ".fonts");
const fontFile = path.join(fontDir, "PTSerif-Bold.ttf");
const fontUrls = [
  "https://fonts.gstatic.com/s/ptserif/v19/EJRSQgYoZZY2vCFuvAnt65qV.ttf",
];

function markSvg(text, size) {
  const fontSize = Math.round(size * (text.length > 3 ? 0.3 : 0.34));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#fafaf8"/>
  <text x="${size / 2}" y="${Math.round(size * 0.64)}" text-anchor="middle"
    font-family="PT Serif" font-weight="700" font-size="${fontSize}" fill="#12151c">${text}</text>
</svg>`;
}

function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = 32;
  entry[1] = 32;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

function render(text, size) {
  const resvg = new Resvg(markSvg(text, size), {
    fitTo: { mode: "width", value: size },
    font: {
      fontFiles: [fontFile],
      defaultFontFamily: "PT Serif",
      loadSystemFonts: false,
    },
  });
  return resvg.render().asPng();
}

async function ensureFont() {
  if (fs.existsSync(fontFile) && fs.statSync(fontFile).size > 10000) return;
  fs.mkdirSync(fontDir, { recursive: true });
  let lastError;
  for (const url of fontUrls) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (!response.ok) throw new Error(`${url} → ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 10000) throw new Error(`${url} too small`);
      fs.writeFileSync(fontFile, buffer);
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("Could not download PT Serif Bold");
}

await ensureFont();
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), render("OBS", 180));
fs.writeFileSync(path.join(publicDir, "apple-touch-icon-ru.png"), render("ОБС", 180));
fs.writeFileSync(path.join(publicDir, "favicon.ico"), pngToIco(render("OBS", 32)));
console.log("Wrote apple-touch-icon.png, apple-touch-icon-ru.png, favicon.ico");
