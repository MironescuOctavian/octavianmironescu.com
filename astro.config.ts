import mdx from "@astrojs/mdx";
import { ui } from "@rimelight/ui/integrations";
import sitemap from "@astrojs/sitemap";
import {defineConfig, fontProviders} from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://octavianmironescu.com",
  integrations: [mdx(), sitemap(), ui()],
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
  // TODO: Re-enable caching once Astro/Cloudflare adapter immutable headers issue is resolved.
  // Cache headers can be configured at the Cloudflare level via _headers or wrangler.jsonc instead.
  // cache: {
  //   provider: memoryCache()
  // },
  // routeRules: {
  //   "/api/[...path]": {
  //     swr: 600
  //   },
  //   "/[...path]": {
  //     maxAge: 300
  //   }
  // },
  output: "server",
  adapter: cloudflare(),
});
