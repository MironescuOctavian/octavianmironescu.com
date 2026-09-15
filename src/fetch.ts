import { Hono } from "hono"
import { cf } from "@astrojs/cloudflare/hono"
import { security } from "@rimelight/security/middleware"
import { i18n } from "@rimelight/i18n/hono"
import { astro } from "astro/hono"

const app = new Hono<{ Bindings: Env }>()

// Middlewares
app.use(cf())
app.use(security())

// Localization & Astro Pipeline
app.use(i18n())
app.use(astro())

export default {
  fetch: app.fetch
}
