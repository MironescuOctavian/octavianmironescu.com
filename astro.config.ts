import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"
import { languages } from "#config/i18n.config"

export default defineConfig(
  rimelightAstroConfig({
    domain: "octavianmironescu.com",
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
