import { defineMiddleware } from "astro/middleware"
import { languages } from "#config/i18n.config.ts"
import { currentLocale } from "@rimelight/i18n"

// Routes to be skipped by the middleware
const WHITELIST = ["/construction"]

// If construction mode is enabled, redirects any non-whitelisted page to 'construction.astro'
export const construction = defineMiddleware((context, next) => {
  const localeMatch = languages.find(
    (loc: string) =>
      context.url.pathname === `/${loc}` || context.url.pathname.startsWith(`/${loc}/`)
  )
  if (localeMatch) {
    currentLocale.set(localeMatch)
  }

  const constructionMode =
    (import.meta.env["CONSTRUCTION_MODE"] ?? process.env["CONSTRUCTION_MODE"]) === "true"

  if (!constructionMode) {
    return next()
  }

  const isSkippedPath = WHITELIST.some((path) => context.url.pathname.includes(path))

  if (isSkippedPath) {
    return next()
  }

  const localePrefix = localeMatch ?? "en"
  return context.redirect(`/${localePrefix}/construction`)
})
