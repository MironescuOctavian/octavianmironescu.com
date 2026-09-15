import en from "./src/translations/en.json"
import ro from "./src/translations/ro.json"
import ptBr from "./src/translations/pt-br.json"
import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"

export default defineConfig(
  rimelightAstroConfig({
    domain: "octavianmironescu.com",
    solid: true,
    ui: true,
    security: true,
    i18n: {
      translations: { en, ro, "pt-br": ptBr }
    },
    integrations: [mdx()]
  })
)
