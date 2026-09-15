import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { SITE_DESCRIPTION, SITE_TITLE } from "#consts.ts"

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("blog")
  const siteUrl = context.site?.toString() || context.url.origin

  const response = await rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: siteUrl,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom"
    },
    customData: `
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${new URL("/rss.xml", siteUrl)}" rel="self" type="application/rss+xml" />
    `,
    items: posts.map((post) => {
      const slug = post.id.replace(/\.(md|mdx)$/, "")
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${slug}/`
      }
    })
  })

  response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600")
  return response
}
