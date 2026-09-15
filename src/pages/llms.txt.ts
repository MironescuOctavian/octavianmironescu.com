import { getCollection } from "astro:content"
import { buildLlmsTxt } from "@rimelight/seo"

export const prerender = false

export async function GET(context: { url: URL; site?: URL }) {
  const siteUrl = context.site?.toString() || `${context.url.protocol}//${context.url.host}`

  let posts: any[] = []
  try {
    posts = await getCollection("blog")
  } catch {
    posts = []
  }

  const llmsPages = posts.map((p) => {
    const slug = p.id.replace(/\.(md|mdx)$/, "")
    const url = `${siteUrl}/${slug}`.replace(/\/+$/, "")
    return {
      title: p.data.title,
      description: p.data.description,
      url,
      markdownUrl: `${url}.md`,
      section: "BLOG"
    }
  })

  const body = buildLlmsTxt({
    site: siteUrl,
    title: "Octavian Mironescu",
    description: "AI-friendly content index for octavianmironescu.com.",
    pages: llmsPages
  })

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  })
}
