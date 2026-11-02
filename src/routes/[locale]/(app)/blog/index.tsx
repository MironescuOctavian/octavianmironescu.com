import { For, Loading, Show, createMemo } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { getRequestEvent, useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { t, getCurrentLocale, getLocaleUrl } from "@rimelight/i18n";
import { RLGrid } from "@rimelight/ui";
import { content, type PublicEntry, type PublicTerm } from "@rimelight/cms/solid";
import { blogCover } from "#components/app/blogCovers";

/**
 * Published blog posts, newest first, filterable by category. Categories are CMS taxonomy
 * terms (managed in the dashboard under Taxonomies → category, or via MCP) — nothing is
 * hardcoded here. The active filter lives in the URL (`?category=engineering`) so it's linkable.
 */
export default function BlogIndexPage() {
  const [search, setSearch] = useSearchParams<{ category?: string }>();
  const active = () => search.category || "";
  const locale = () => getCurrentLocale();
  const label = (l: PublicTerm["label"]) => (typeof l === "string" ? l : t.localize(l));

  /** Only categories that have published posts. */
  const categories = createMemo<PublicTerm[]>(
    async () => (await content.terms("category")).filter((c) => c.count > 0),
    { loadingValue: [] },
  );

  const posts = createMemo<PublicEntry[]>(async () => {
    const params = new URLSearchParams({ limit: "50", locale: locale() });
    if (active()) {
      params.set("taxonomy", "category");
      params.set("term", active());
    }
    const request = getRequestEvent()?.request;
    const path = `/api/content/collections/blog?${params}`;
    const url = request ? new URL(path, request.url).toString() : path;
    const response = await fetch(url, {
      headers: request?.headers.get("cookie") ? { cookie: request.headers.get("cookie")! } : {},
    });
    if (!response.ok) throw new Error(`Blog request failed (${response.status})`);
    return ((await response.json()) as { entries: PublicEntry[] }).entries;
  });

  useHead(() =>
    createPageHead({
      title: t("page.blog.meta.title"),
      description: t("page.blog.meta.description"),
    }),
  );

  const chip = (slug: string, text: string, count?: number) => (
    <button
      type="button"
      aria-pressed={active() === slug ? "true" : "false"}
      class={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active() === slug
          ? "border-primary-500 bg-primary-500/15 text-primary-300"
          : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
      }`}
      onClick={() => setSearch({ category: slug || undefined })}
    >
      {text}
      <Show when={count !== undefined}>
        <span class="ml-1.5 text-xs opacity-60">{count}</span>
      </Show>
    </button>
  );

  return (
    <main class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <header class="max-w-3xl">
        <p class="mb-4 text-xs font-semibold uppercase tracking-[.3em] text-primary-400">
          Insights
        </p>
        <h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {t("page.blog.meta.title")}
          <span class="text-primary-500">.</span>
        </h1>
        <p class="mt-5 text-base leading-7 text-neutral-950/55 sm:text-lg">
          {t("page.blog.meta.description")}
        </p>
      </header>
      <div class="mt-12 border-t-2 border-primary-600/40 pt-10">
        <Show when={categories().length > 0}>
          <nav
            aria-label={t("page.blog.categories.aria-label")}
            class="mb-10 flex flex-wrap justify-center gap-2"
          >
            {chip("", "All")}
            <For each={categories()}>{(c) => chip(c.slug, label(c.label), c.count)}</For>
          </nav>
        </Show>

        <Loading fallback={<p class="py-12 text-center text-neutral-500">Loading posts…</p>}>
          <RLGrid cols={3}>
            <For each={posts() || []}>
              {(post) => {
                const category = post.terms?.find((x) => x.taxonomy === "category")?.label;
                const date = post.publishedAt || post.updatedAt;
                return (
                  <a
                    href={getLocaleUrl(`/blog/${post.slug}/`)}
                    class="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary-600/60 bg-neutral-100 transition duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-[0_8px_28px_var(--rl-primary-900)]"
                  >
                    <img
                      src={blogCover(post.slug, post.properties?.["cover"])}
                      alt=""
                      class="aspect-video w-full object-cover"
                      loading="lazy"
                    />
                    <div class="flex flex-1 flex-col p-6">
                      <p class="text-xs font-semibold uppercase tracking-wider text-primary-400">
                        {category ? label(category) : "Technology"}
                        {date
                          ? ` · ${new Date(date).toLocaleDateString(locale(), { year: "numeric", month: "short", day: "numeric" })}`
                          : ""}
                      </p>
                      <h2 class="mt-3 text-xl font-bold text-neutral-950 transition-colors group-hover:text-primary-500">
                        {t.localize(post.title)}
                      </h2>
                      <p class="mt-3 flex-1 text-sm leading-6 text-neutral-950/60">
                        {t.localize(post.description ?? {}) || post.properties?.["excerpt"] || ""}
                      </p>
                      <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-400">
                        Read article{" "}
                        <span class="i-lucide-arrow-up-right size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                );
              }}
            </For>
          </RLGrid>

          <Show when={!posts() || posts()!.length === 0}>
            <p class="text-center text-neutral-500 py-12">{t("page.blog.empty")}</p>
          </Show>
        </Loading>
      </div>
    </main>
  );
}
