// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { apiVitePlugin } from "./backend/api.mjs";

const site = process.env.PUBLIC_SITE_URL || "https://obs-intellect.netlify.app";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  compressHTML: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          ru: "ru-RU",
        },
      },
      serialize(item) {
        if (item.url.includes("/pay/session") || item.url.includes("/pay/success") || item.url.includes("/admin")) {
          return undefined;
        }
        if (item.url.includes("/svedeniya-ob-it-organizacii") || item.url.includes("/ru/it-organization")) {
          item.priority = 0.9;
        } else if (item.url.endsWith("/") || item.url === site) {
          item.priority = 1;
        } else if (
          /\/(business-audit|ai-business|ai-audit|digital-transformation)\/?$/.test(item.url)
        ) {
          item.priority = 0.85;
        } else if (item.url.includes("/cases/")) {
          item.priority = 0.8;
        } else if (item.url.includes("/legal/")) {
          item.priority = 0.6;
        } else {
          item.priority = 0.7;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss(), apiVitePlugin()],
  },
});
