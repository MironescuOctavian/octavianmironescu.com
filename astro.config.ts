import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"

export default defineConfig(
  rimelightAstroConfig({
    domain: "octavianmironescu.com",
    solid: true,
    ui: true,
    security: true,
    i18n: true,
    integrations: [mdx()]
  })
)
