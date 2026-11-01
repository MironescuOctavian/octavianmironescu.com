import { For, Show, createMemo } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { t, getCurrentLocale, getLocaleUrl } from "@rimelight/i18n";
import { RLPageSection, RLGrid, RLPost } from "@rimelight/ui";
import { content, type PublicEntry, type PublicTerm } from "@rimelight/cms/solid";

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

  const posts = createMemo<PublicEntry[]>(
    async () =>
      (
        await content.entries("blog", {
          limit: 50,
          locale: locale(),
          ...(active() ? { taxonomy: "category", term: active() } : {}),
        })
      ).entries,
    { loadingValue: [] },
  );

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
    <RLPageSection
      title={t("page.blog.meta.title")}
      description={t("page.blog.meta.description")}
      class="py-16"
    >
      <div class="max-w-7xl mx-auto w-full px-4 mt-8">
        <Show when={categories().length > 0}>
          <nav
            aria-label={t("page.blog.categories.aria-label")}
            class="mb-10 flex flex-wrap justify-center gap-2"
          >
            {chip("", "All")}
            <For each={categories()}>{(c) => chip(c.slug, label(c.label), c.count)}</For>
          </nav>
        </Show>

        <RLGrid cols={3}>
          <For each={posts() || []}>
            {(post) => {
              const category = post.terms?.find((x) => x.taxonomy === "category")?.label;
              const date = post.publishedAt || post.updatedAt;
              return (
                <RLPost
                  title={t.localize(post.title)}
                  description={
                    t.localize(post.description ?? {}) || post.properties?.["excerpt"] || ""
                  }
                  date={date ? new Date(date) : undefined}
                  image={post.properties?.["cover"] as string | Record<string, any> | undefined}
                  badge={category ? label(category) : undefined}
                  to={getLocaleUrl(`/blog/${post.slug}/`)}
                  variant="ghost"
                />
              );
            }}
          </For>
        </RLGrid>

        <Show when={!posts() || posts()!.length === 0}>
          <p class="text-center text-neutral-500 py-12">{t("page.blog.empty")}</p>
        </Show>
      </div>
    </RLPageSection>
  );
}
