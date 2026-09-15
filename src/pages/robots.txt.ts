import type { APIRoute } from "astro"
import { buildRobotsTxt } from "@rimelight/seo"
import { PRIVATE_PATH_PREFIXES } from "#config/seo.config"

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap.xml", site).toString()

  const robots = buildRobotsTxt({
    sitemapUrl: sitemapURL,
    disallow: [
      ...PRIVATE_PATH_PREFIXES,
      "/*/dashboard/",
      "/*/cms/",
      "/*/internal/",
      "/*/api/",
      "/*/og/",
      "/*/open-graph/"
    ],
    allow: ["/"],
    userAgentRules: [
      {
        userAgent: "GPTBot",
        disallow: ["/dashboard/", "/internal/", "/api/", "/og/", "/open-graph/"],
        allow: ["/"]
      },
      {
        userAgent: "ClaudeBot",
        disallow: ["/dashboard/", "/internal/", "/api/", "/og/", "/open-graph/"],
        allow: ["/"]
      }
    ]
  })

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  })
}
