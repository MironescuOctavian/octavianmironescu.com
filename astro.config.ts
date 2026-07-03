import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import UnoCSS from "@unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://octavianmironescu.com",
  integrations: [mdx(), sitemap(), UnoCSS()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans",
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Serif",
      cssVariable: "--font-serif",
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
    },
  ],
  i18n: {
    locales: ["en", "ro", "pt-br"],
    defaultLocale: "en",
    fallback: {
      ro: "en",
      "pt-br": "en",
    },
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
      fallbackType: "rewrite",
    },
  },
  output: "server",
  adapter: cloudflare(),
});
