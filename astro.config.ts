import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"

export default defineConfig(
  rimelightAstroConfig({
    domain: "octavianmironescu.com",
    seo: {
      name: "Octavian Mironescu",
      description: "Personal website of Octavian Mironescu",
      author: "Octavian Mironescu",
      branding: {
        logo: {
          alt: "Octavian Mironescu"
        },
        colors: {
          themeColor: "#ffffff",
          backgroundColor: "#ffffff"
        }
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
    },
    solid: true,
    auth: true,
    ui: true,
    security: true,
    i18n: {
      locales: ["en", "ro", "pt-br"],
      defaultLocale: "en"
    },
    integrations: [mdx()]
  })
)
