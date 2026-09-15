import { languages } from "#config/i18n.config"
import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"

export default defineConfig(
  rimelightAstroConfig({
    domain: "octavianmironescu.com",
    seo: true,
    solid: true,
    ui: true,
    security: true,
    i18n: {
      locales: languages,
      defaultLocale: "en"
    },
    integrations: [mdx()]
  })
)
