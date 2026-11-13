import { Show, createMemo } from "solid-js";
import { useParams, useSearchParams } from "@solidjs/router";
import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { PageRenderer, content, type PublicEntry } from "@rimelight/cms/solid";
import { RLDate } from "@rimelight/ui/components/date/RLDate.tsx";
import { t, getCurrentLocale, getLocaleUrl } from "@rimelight/i18n";
import { blogCover } from "#components/app/blogCovers";
import { findExtraBlogPost } from "#components/app/extraBlogs";

/**
 * A blog post, read from the CMS delivery API (`/api/content/collections/blog/:slug`) or
 * the bundled static articles. `?preview=` shows a CMS draft preview.
 */
export default function BlogPostPage() {
  const params = useParams<{ locale: string; slug?: string }>();
  const [search] = useSearchParams<{ preview?: string }>();
  const activeLocale = () => getCurrentLocale();

  const post = createMemo<PublicEntry | null>(
    async () => {
      const slug = params.slug?.replace(/\/+$/, "");
      if (!slug) return null;
      if (!search.preview) {
        const local = findExtraBlogPost(slug);
        if (local) return local;
      }
      return (await content.entry("blog", slug, search.preview)) ?? findExtraBlogPost(slug);
    },
    { loadingValue: null },
  );

  const title = () => {
    const p = post();
    return p ? t.localize(p.title) || "Blog Post" : "Blog Post";
  };
  const description = () => {
    const p = post();
    return p ? t.localize(p.description ?? {}) || p.properties?.["excerpt"] || "" : "";
  };

  useHead(() => createPageHead({ title: title(), description: description() }));

  return (
    <Show
      when={post()}
      fallback={<div class="p-16 text-center text-neutral-400">{t("app.loading.post")}</div>}
    >
      <article class="mx-auto max-w-5xl px-5 py-20 sm:px-8 md:py-28">
        <a
          href={getLocaleUrl("/blog")}
          class="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-400 transition-colors hover:text-primary-300"
        >
          <span class="i-lucide-chevron-left size-4" aria-hidden="true" />
          <span>{t("page.blog.meta.title")}</span>
        </a>
        <header class="mb-12">
          <div class="mb-4 text-xs font-semibold uppercase tracking-[.3em] text-primary-400">
            <RLDate date={post()?.publishedAt || post()?.updatedAt || new Date()} />
          </div>
          <h1 class="mb-4 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
            {title()}
          </h1>
          <p class="max-w-3xl text-lg leading-8 text-neutral-950/60">{description()}</p>
        </header>
        <img
          src={blogCover(post()?.slug ?? "", post()?.properties?.["cover"])}
          alt=""
          class="mb-12 aspect-video w-full rounded-2xl border-2 border-primary-600/60 object-cover"
        />
        <div class="border-t-2 border-primary-600/40 pt-8">
          <PageRenderer blocks={post()?.blocks ?? []} locale={activeLocale()} />
        </div>
      </article>
    </Show>
  );
}
