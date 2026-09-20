import { Hono } from "hono"
import { cf } from "@astrojs/cloudflare/hono"
import { security, devOnly, ratelimit, construction } from "@rimelight/security/middleware"
import { authMiddleware } from "@rimelight/auth/middleware"
import { auth } from "@rimelight/auth"
import api from "#api"
import { i18n } from "@rimelight/i18n/hono"
import { getRelativeLocaleUrl } from "@rimelight/i18n"
import { astro } from "astro/hono"

const app = new Hono<{ Bindings: Env }>()

// Middlewares
app.use(cf())
app.use(security())
app.use(devOnly)
app.use(ratelimit())
app.use(construction())
app.use(
  authMiddleware({
    auth,
    roleGuards: {
      "/admin": ["admin", "owner"]
    }
  })
)

// Hono API Routing
app.route("/api", api)

// Localization & Astro Pipeline
app.use(i18n())
app.use(astro())

// Global Error Handler
app.onError((err, c) => {
  console.error("[Hono Server Error]", err)
  const isHtml = (c.req.header("accept") || "").includes("text/html")
  if (isHtml) {
    return c.redirect(getRelativeLocaleUrl("/500"), 302)
  }
  return c.json({ error: "Internal Server Error", message: err.message }, 500)
})

export default {
  fetch: app.fetch
}
