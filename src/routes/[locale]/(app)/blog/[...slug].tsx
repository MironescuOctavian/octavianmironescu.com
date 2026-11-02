import { Show, createMemo } from "solid-js";
import { useParams, useSearchParams } from "@solidjs/router";
import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { PageRenderer, content, type PublicEntry } from "@rimelight/cms/solid";
import { RLDate } from "@rimelight/ui";
import { t, getCurrentLocale } from "@rimelight/i18n";
import { blogCover } from "#components/app/blogCovers";

/**
 * A blog post, read from the CMS delivery API (`/api/content/collections/blog/:slug`). Mentions
 * arrive already resolved (colour + link), so PageRenderer needs no extra setup. `?preview=`
 * (from the dashboard's "Open draft preview") shows the draft instead of the published version.
 */
export default function BlogPostPage() {
  const params = useParams<{ locale: string; slug?: string }>();
  const [search] = useSearchParams<{ preview?: string }>();
  const activeLocale = () => getCurrentLocale();

  const post = createMemo<PublicEntry | null>(
    async () => {
      const slug = params.slug?.replace(/\/+$/, "");
      if (!slug) return null;
      return content.entry("blog", slug, search.preview);
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
