import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import { SITE_DESCRIPTION, SITE_TITLE } from "#consts.ts"

export async function GET(context) {
  const activeLocale = context.params.locale || "en"
  const posts = (await getCollection("blog")).filter((post) =>
    post.id.startsWith(`${activeLocale}/`)
  )
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      const slug = post.id.replace(new RegExp(`^${activeLocale}/`), "")
      return {
        ...post.data,
        link: `/${activeLocale}/blog/${slug}/`
      }
    })
  })
}
