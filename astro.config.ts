import en from "./src/translations/en.json"
import ro from "./src/translations/ro.json"
import ptBr from "./src/translations/pt-br.json"
import mdx from "@astrojs/mdx"
import { ui } from "@rimelight/ui"
import { i18n } from "@rimelight/i18n"
import sitemap from "@astrojs/sitemap"
import { defineConfig, fontProviders } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import solid from "@astrojs/solid-js"
import { cacheCloudflare } from "@astrojs/cloudflare/cache"

export default defineConfig({
  site: "https://octavianmironescu.com",
  prefetch: {
    prefetchAll: true
  },

  output: "server",
  session: false,
  adapter: cloudflare(),
  cache: {
    provider: cacheCloudflare()
  },
  routeRules: {
    "/api/[...path]": {
      swr: 600 // 10 minutes stale-while-revalidate
    },
    "/[...path]": {
      maxAge: 300 // 5 minutes cache
    }
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans",
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"]
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Serif",
      cssVariable: "--font-serif",
      fallbacks: ["serif"]
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"]
    }
  ],

  image: {
    domains: ["octavianmironescu.com"],
    layout: "constrained",
    responsiveStyles: true
  },

  markdown: {
    syntaxHighlight: "prism"
  },

  integrations: [
    mdx(),
    sitemap(),
    solid({
      include: ["**/solid/**", "**/*.tsx"]
    })
  ],

  vite: {
    plugins: [
      ui(),
      i18n({
        locales: ["en", "ro", "pt-br"],
        defaultLocale: "en",
        prefixDefaultLocale: true,
        translations: { en, ro, "pt-br": ptBr }
      })
    ]
  }
})
