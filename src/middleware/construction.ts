import { defineMiddleware } from "astro/middleware";
import { langArray } from "@/i18n/ui.ts";

// Routes to be skipped by the middleware
const WHITELIST = ["/construction"];

// If construction mode is enabled, redirects any non-whitelisted page to 'construction.astro'
export const construction = defineMiddleware((context, next) => {
  const constructionMode =
    (import.meta.env.CONSTRUCTION_MODE ?? process.env.CONSTRUCTION_MODE) === "true";

  if (!constructionMode) {
    return next();
  }

  const isSkippedPath = WHITELIST.some((path) => context.url.pathname.includes(path));

  if (isSkippedPath) {
    return next();
  }

  const localePrefix = langArray.find((loc) => context.url.pathname.startsWith(`/${loc}/`)) ?? "en";
  return context.redirect(`/${localePrefix}/construction`);
});
