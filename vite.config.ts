import { defineConfig } from "vite-plus"
import { fileRoutes } from "filesystem-routing/vite"
import { rimelightConfig } from "@rimelight/config/vite-plus/base"
import { cloudflare } from "@cloudflare/vite-plugin"
import solid from "@solidjs/vite-plugin"
import { ui } from "@rimelight/ui/plugin"
import { seo } from "@rimelight/seo/plugin"
import { security } from "@rimelight/security/plugin"
import { auth } from "@rimelight/auth/plugin"
import { i18n } from "@rimelight/i18n/plugin"
import { rimelightSolidConfig } from "@rimelight/config/solid"
import en from "./src/i18n/en.json"
import ro from "./src/i18n/ro.json"
import ptBr from "./src/i18n/pt-br.json"

const site = rimelightSolidConfig({
  domain: "octavianmironescu.com",
  security: {}
})

export default defineConfig({
  ...rimelightConfig(),
  plugins: [
    cloudflare({
      viteEnvironment: {
        name: "ssr"
      }
    }),

    solid({
      start: {
        devtools: false
      },
      ssr: true,
      extensions: [".jsx", ".tsx"]
    }),

    fileRoutes({ types: true }),

    ui({
      logos: {
        logomark: {
          color: "https://cdn.octavianmironescu.com/logos/logomark_color.svg",
          white: "https://cdn.octavianmironescu.com/logos/logomark_white.svg",
          black: "https://cdn.octavianmironescu.com/logos/logomark_black.svg"
        },
        logotype: {
          color: "https://cdn.octavianmironescu.com/logos/logotype_color.svg",
          white: "https://cdn.octavianmironescu.com/logos/logotype_white.svg",
          black: "https://cdn.octavianmironescu.com/logos/logotype_black.svg"
        }
      }
    }),

    seo({
      id: "octavianmironescu.com",
      url: "https://octavianmironescu.com",
      name: "Octavian Mironescu",
      description: "Personal website of Octavian Mironescu",
      author: "Octavian Mironescu",
      branding: {
        logo: { alt: "Octavian Mironescu" },
        favicon: { svg: "https://cdn.octavianmironescu.com/logos/logomark_color.svg" },
        appleTouchIcon: "https://cdn.octavianmironescu.com/logos/logomark_color.svg",
        colors: { themeColor: "#ffffff", backgroundColor: "#ffffff" }
      },
      titleTemplate: "%s | Octavian Mironescu",
      locales: {
        "en": "en-US",
        "ro": "ro-RO",
        "pt-br": "pt-BR"
      },
      privatePathPrefixes: [
        "/dashboard",
        "/admin",
        "/cms",
        "/internal",
        "/api",
        "/dev",
        "/og",
        "/open-graph",
        "/auth"
      ]
    }),

    security(site.securityOptions ?? {}),

    auth(),

    i18n({
      locales: ["en", "ro", "pt-br"],
      defaultLocale: "en",
      translations: { en, ro, "pt-br": ptBr }
    })
  ]
})
