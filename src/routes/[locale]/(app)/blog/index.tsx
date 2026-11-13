import { For, Loading, Show, createMemo } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { getRequestEvent, useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { t, getCurrentLocale, getLocaleUrl } from "@rimelight/i18n";
import { RLGrid } from "@rimelight/ui/components/grid/RLGrid.tsx";
import { content, type PublicEntry, type PublicTerm } from "@rimelight/cms/solid";
import { blogCover } from "#components/app/blogCovers";
import { mergeBlogCategories, mergeBlogPosts } from "#components/app/extraBlogs";

const POSTS_PER_PAGE = 6;

/**
 * Published blog posts, newest first, filterable by category and paginated 6 per page.
 * Merges live CMS entries with static articles; active filter & page live in the URL.
 */
export default function BlogIndexPage() {
  const [search, setSearch] = useSearchParams<{ category?: string; page?: string }>();
  let listSectionRef: HTMLDivElement | undefined;

  const active = () => search.category || "";
  const locale = () => getCurrentLocale();
  const label = (l: PublicTerm["label"]) => (typeof l === "string" ? l : t.localize(l));

  const cmsPosts = createMemo<PublicEntry[]>(async () => {
    const params = new URLSearchParams({ limit: "50", locale: locale() });
    const request = getRequestEvent()?.request;
    const path = `/api/content/collections/blog?${params}`;
    const url = request ? new URL(path, request.url).toString() : path;
    try {
      const response = await fetch(url, {
        headers: request?.headers.get("cookie") ? { cookie: request.headers.get("cookie")! } : {},
      });
      if (!response.ok) return [];
      return ((await response.json()) as { entries: PublicEntry[] }).entries;
    } catch {
      return [];
    }
  });

  const cmsTerms = createMemo<PublicTerm[]>(async () => await content.terms("category"), {
    loadingValue: [],
  });

  const allPosts = () => mergeBlogPosts(cmsPosts() ?? []);
  const categories = () => mergeBlogCategories(cmsTerms() ?? [], allPosts());

  const filteredPosts = () => {
    const cat = active();
    if (!cat) return allPosts();
    return allPosts().filter((post) => {
      const slug = post.terms?.find((x) => x.taxonomy === "category")?.slug ?? "technology";
      return slug === cat;
    });
  };

  const totalPages = () => Math.max(1, Math.ceil(filteredPosts().length / POSTS_PER_PAGE));

  const currentPage = () => {
    const parsed = Number.parseInt(search.page || "1", 10);
    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.min(parsed, totalPages());
  };

  const pagedPosts = () => {
    const start = (currentPage() - 1) * POSTS_PER_PAGE;
    return filteredPosts().slice(start, start + POSTS_PER_PAGE);
  };

  const pageNumbers = () => Array.from({ length: totalPages() }, (_, i) => i + 1);

  const goToPage = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages(), nextPage));
    setSearch({ page: clamped === 1 ? undefined : String(clamped) });
    if (typeof window !== "undefined") {
      listSectionRef?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    }
  };

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
      class={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active() === slug
          ? "border-primary-500 bg-primary-500/15 text-primary-300 font-semibold"
          : "border-primary-600/35 bg-neutral-100 text-neutral-950/70 hover:border-primary-400 hover:text-neutral-950"
      }`}
      onClick={() => setSearch({ category: slug || undefined, page: undefined })}
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

      <div
        ref={(el) => {
          listSectionRef = el;
        }}
        class="mt-12 scroll-mt-24 border-t-2 border-primary-600/40 pt-10"
      >
        <Show when={categories().length > 0}>
          <nav
            aria-label={t("page.blog.categories.aria-label")}
            class="mb-10 flex flex-wrap justify-center gap-2"
          >
            {chip("", "All", allPosts().length)}
            <For each={categories()}>{(c) => chip(c.slug, label(c.label), c.count)}</For>
          </nav>
        </Show>

        <Loading fallback={<p class="py-12 text-center text-neutral-500">Loading posts…</p>}>
          <RLGrid cols={3}>
            <For each={pagedPosts()}>
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

          <Show when={filteredPosts().length === 0}>
            <p class="py-12 text-center text-neutral-500">{t("page.blog.empty")}</p>
          </Show>

          <Show when={totalPages() > 1}>
            <nav
              aria-label="Blog pagination"
              class="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-primary-600/30 pt-8"
            >
              <button
                type="button"
                disabled={currentPage() <= 1}
                onClick={() => goToPage(currentPage() - 1)}
                class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary-600/50 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-950 transition-all hover:border-primary-400 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span class="i-lucide-chevron-left size-4 text-primary-400" aria-hidden="true" />
                <span>Previous</span>
              </button>

              <div class="flex flex-wrap items-center gap-2">
                <For each={pageNumbers()}>
                  {(num) => (
                    <button
                      type="button"
                      aria-label={`Page ${num}`}
                      aria-current={currentPage() === num ? "page" : undefined}
                      onClick={() => goToPage(num)}
                      class={`inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border text-sm font-bold transition-all ${
                        currentPage() === num
                          ? "border-primary-400 bg-primary-500 text-black shadow-[0_0_20px_var(--rl-primary-900)]"
                          : "border-primary-600/40 bg-neutral-100 text-neutral-950/80 hover:border-primary-400 hover:bg-neutral-200 hover:text-neutral-950"
                      }`}
                    >
                      {num}
                    </button>
                  )}
                </For>
                <span class="ml-2 text-xs font-medium text-neutral-950/55">
                  Page {currentPage()} of {totalPages()} · {POSTS_PER_PAGE} / page
                </span>
              </div>

              <button
                type="button"
                disabled={currentPage() >= totalPages()}
                onClick={() => goToPage(currentPage() + 1)}
                class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary-600/50 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-950 transition-all hover:border-primary-400 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Next</span>
                <span class="i-lucide-chevron-right size-4 text-primary-400" aria-hidden="true" />
              </button>
            </nav>
          </Show>
        </Loading>
      </div>
    </main>
  );
}
