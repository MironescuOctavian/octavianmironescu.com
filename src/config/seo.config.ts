import type { SeoEntry, LocaleConfig } from "@rimelight/seo"
import { getCollection } from "astro:content"

/**
 * SEO locale configuration
 */
export const SEO_LOCALES: LocaleConfig = {
  site: "https://octavianmironescu.com",
  locales: {
    "en": "en-US",
    "ro": "ro-RO",
    "pt-br": "pt-BR"
  },
  defaultLocale: "en",
  trailingSlash: "never"
}

/**
 * Static marketing/company paths
 */
const STATIC_PATHS = ["/", "/about", "/blog", "/legal"]

/**
 * Private path prefixes to exclude from sitemap
 */
export const PRIVATE_PATH_PREFIXES = [
  "/dashboard",
  "/admin",
  "/cms",
  "/internal",
  "/api",
  "/dev",
  "/og",
  "/open-graph"
]

/**
 * Gather all SEO entries for the site
 */
export async function seoEntries(): Promise<SeoEntry[]> {
  const entries: SeoEntry[] = []

  // Static paths
  for (const path of STATIC_PATHS) {
    entries.push({ path })
  }

  // Blog entries from Content Collections
  try {
    const blogPosts = await getCollection("blog")
    for (const post of blogPosts) {
      const slug = post.id.replace(/^(en|ro|pt-br)\//, "").replace(/\.(md|mdx)$/, "")
      const lastmod = post.data.updatedDate ?? post.data.pubDate
      entries.push({
        path: `/blog/${slug}`,
        ...(lastmod ? { lastmod } : {}),
        changefreq: "weekly"
      })
    }
  } catch {}

  // Legal entries from Content Collections
  try {
    const legalPages = await getCollection("legal")
    for (const page of legalPages) {
      const slug = page.id.replace(/^(en|ro|pt-br)\//, "").replace(/\.(md|mdx)$/, "")
      const lastmod = page.data.updatedDate ?? page.data.pubDate
      entries.push({
        path: `/legal/${slug}`,
        ...(lastmod ? { lastmod } : {})
      })
    }
  } catch {}

  // Filter out private paths
  return entries.filter(
    (entry) => !PRIVATE_PATH_PREFIXES.some((prefix) => entry.path.startsWith(prefix))
  )
}
