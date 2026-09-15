import type { APIRoute } from "astro"
import { buildSitemapUrls, buildSitemapXml } from "@rimelight/seo"
import { SEO_LOCALES, seoEntries } from "#config/seo.config"

export const GET: APIRoute = async () => {
  const entries = await seoEntries()
  const urls = buildSitemapUrls(entries, SEO_LOCALES)
  const xml = buildSitemapXml(urls)

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  })
}
