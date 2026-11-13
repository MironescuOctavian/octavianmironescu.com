import { For } from "solid-js";
import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { getLocaleUrl, t } from "@rimelight/i18n";
import { projects } from "#components/app/projects";
import { rimelightPackages } from "#components/app/packages";

export default function ProjectsPage() {
  useHead(() =>
    createPageHead({
      title: t("page.projects.title"),
      description: t("page.projects.description"),
    }),
  );

  return (
    <div class="mx-auto max-w-7xl px-5 py-20 text-neutral-950 sm:px-8 md:py-28">
      <header class="max-w-3xl">
        <p class="mb-4 text-xs font-semibold uppercase tracking-[.3em] text-primary-400">
          {t("page.projects.eyebrow")}
        </p>
        <h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {t("page.projects.title")}
          <span class="text-primary-500">.</span>
        </h1>
        <p class="mt-5 text-base leading-7 text-neutral-950/55 sm:text-lg">
          {t("page.projects.description")}
        </p>
      </header>
      <div class="mt-10 grid gap-4 border-t-2 border-primary-600/40 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        <For each={projects}>
          {(project) => (
            <a
              id={project.id}
              href={project.href.startsWith("/") ? getLocaleUrl(project.href) : project.href}
              class="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-xl border border-primary-600/60 bg-neutral-100 transition duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-[0_8px_24px_var(--rl-primary-900)]"
            >
              <div class="relative flex h-36 items-center justify-center overflow-hidden border-b border-primary-600/30 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--rl-primary-500)_10%,transparent),var(--rl-neutral-50))]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span
                    class={`${project.icon} inline-block size-10 text-primary-400 transition-transform duration-300 group-hover:scale-110`}
                    aria-hidden="true"
                  />
                )}
                <span class="absolute bottom-2.5 left-3 rounded-full border border-primary-600/40 bg-neutral-50/95 px-2.5 py-0.5 text-[11px] font-semibold text-primary-400">
                  {project.category}
                </span>
                {project.status && (
                  <span class="absolute right-3 top-2.5 rounded-full border border-primary-500/35 bg-neutral-50/95 px-2 py-0.5 text-[10px] font-medium tracking-wide text-primary-300 backdrop-blur-sm">
                    {project.status}
                  </span>
                )}
              </div>
              <div class="flex flex-1 flex-col p-4 sm:p-5">
                <h2 class="break-words text-base font-bold transition-colors group-hover:text-primary-500 sm:text-lg">
                  {project.title}
                </h2>
                <p class="mt-2 flex-1 text-xs leading-relaxed text-neutral-950/60 line-clamp-3 sm:text-sm">
                  {project.description}
                </p>
                <div class="mt-3.5 flex flex-wrap gap-1.5">
                  <For each={project.tags}>
                    {(tag) => (
                      <span class="rounded-full border border-primary-600/30 bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-950/75">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
                <span class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 sm:text-sm">
                  {t("page.projects.view")}{" "}
                  <span
                    class="i-mdi-arrow-top-right inline-block size-3.5 sm:size-4"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          )}
        </For>
      </div>
      <section
        id="packages"
        aria-labelledby="packages-heading"
        class="mt-16 scroll-mt-28 border-t-2 border-primary-600/40 pt-10"
      >
        <p class="mb-3 text-xs font-semibold uppercase tracking-[.3em] text-primary-400">
          NPM / RIMELIGHT
        </p>
        <h2 id="packages-heading" class="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("page.projects.packagesTitle")}
          <span class="text-primary-500">.</span>
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-950/55 sm:text-base">
          {t("home.sections.packages.description")}
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <For each={rimelightPackages}>
            {(pkg) => (
              <a
                href={`https://www.npmjs.com/package/${pkg.name}`}
                class="group flex flex-col rounded-xl border border-primary-600/40 bg-neutral-100 p-5 transition duration-200 hover:-translate-y-1 hover:border-primary-400"
              >
                <div class="mb-4 flex items-center justify-between">
                  <span class="flex size-9 items-center justify-center rounded-lg border border-primary-600/30 bg-primary-500/10 text-primary-400">
                    <span class={`${pkg.icon} inline-block size-5`} aria-hidden="true" />
                  </span>
                  <span
                    class="i-mdi-arrow-top-right inline-block size-4 text-primary-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 class="font-mono text-base font-bold group-hover:text-primary-400">
                  {pkg.name}
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-neutral-950/60 sm:text-sm">
                  {t(`page.projects.packages.${pkg.key}`)}
                </p>
              </a>
            )}
          </For>
        </div>
      </section>
    </div>
  );
}
