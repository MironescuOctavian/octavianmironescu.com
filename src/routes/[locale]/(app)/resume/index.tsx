import { For, Show } from "solid-js";
import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { getLocaleUrl, t } from "@rimelight/i18n";
import SocialLinks from "#components/app/SocialLinks";

export interface LanguageSkill {
  nameKey: string;
  levelKey: string;
  score: number;
}

export interface SkillItem {
  icon: string;
  title: string;
  description: string;
}

export interface TechItem {
  label: string;
  icon: string;
  href: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export interface TechGroup {
  title: string;
  categories: TechCategory[];
}

export interface ExperienceItem {
  role: string;
  company?: string;
  "company-url"?: string;
  image?: string;
  period: string;
  location?: string;
  summary?: string;
  responsibilities?: string[];
  tags?: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export interface DatePeriod {
  start: string;
  end: string;
}

export interface ResumeProject {
  name: string;
  role?: string;
  period: DatePeriod;
  href?: string;
  "image-src"?: string;
  summary?: string;
  highlights?: string[];
  tags?: string[];
}

const AVATAR_SRC = "/images/avatar.jpg";

const RESUME_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Mironescu Octavian",
    jobTitle: "Java & Full-Stack Web Developer",
    url: "https://octavianmironescu.com",
    image: "https://octavianmironescu.com/images/avatar.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bucharest",
      addressCountry: "RO",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ovidius University of Constanța",
    },
    knowsAbout: [
      "Java",
      "Kotlin",
      "Spring Boot",
      "TypeScript",
      "SolidJS",
      "Vue",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "Docker",
      "Cloudflare",
      "Amazon Web Services",
    ],
    sameAs: [
      "https://github.com/MironescuOctavian",
      "https://www.linkedin.com/in/octavian-mironescu/",
    ],
  },
});

export default function ResumePage() {
  const age = () => {
    const d = new Date();
    return (
      d.getFullYear() -
      1999 -
      (d.getMonth() < 7 || (d.getMonth() === 7 && d.getDate() < 10) ? 1 : 0)
    );
  };

  const aboutDetails = () => [
    {
      label: t("page.resume.sidebar.workModeLabel"),
      value: t("page.resume.sidebar.workModeValue"),
    },
    {
      label: t("page.resume.sidebar.timezoneLabel"),
      value: t("page.resume.sidebar.timezoneValue"),
    },
    {
      label: t("page.resume.about.nationality.label"),
      value: t("page.resume.about.nationality.value"),
    },
    {
      label: t("page.resume.about.age.label"),
      value: `${age()} ${t("page.resume.about.age.value")}`,
    },
  ];

  const languages: readonly LanguageSkill[] = [
    { nameKey: "lang_english", levelKey: "level_fluent", score: 100 },
    { nameKey: "lang_romanian", levelKey: "level_fluent", score: 100 },
    { nameKey: "lang_german", levelKey: "level_basic", score: 25 },
  ];

  const skills = (): SkillItem[] => [
    {
      icon: "i-logos-java",
      title: t("page.resume.skills.java.title"),
      description: t("page.resume.skills.java.description"),
    },
    {
      icon: "i-logos-typescript-icon",
      title: t("page.resume.skills.web.title"),
      description: t("page.resume.skills.web.description"),
    },
    {
      icon: "i-lucide-palette",
      title: t("page.resume.skills.design.title"),
      description: t("page.resume.skills.design.description"),
    },
  ];

  const techGroups = (): TechGroup[] => [
    {
      title: t("page.resume.tech.group.web-dev") ?? "Technical Tooling",
      categories: [
        {
          title: t("page.resume.tech.cat.languages") ?? "Languages & Frameworks",
          items: [
            {
              label: t("app.text.java") ?? "Java",
              icon: "i-logos-java",
              href: "https://www.java.com/",
            },
            {
              label: t("app.text.spring-boot") ?? "Spring Boot",
              icon: "i-logos-spring-icon",
              href: "https://spring.io/projects/spring-boot",
            },
            {
              label: t("app.text.typescript") ?? "TypeScript",
              icon: "i-logos-typescript-icon",
              href: "https://www.typescriptlang.org/",
            },
            { label: t("app.text.vue") ?? "Vue", icon: "i-logos-vue", href: "https://vuejs.org/" },
            {
              label: t("app.text.solidjs") ?? "SolidJS",
              icon: "i-logos-solidjs-icon",
              href: "https://www.solidjs.com/",
            },
            {
              label: t("app.text.unocss") ?? "UnoCSS",
              icon: "i-logos-unocss",
              href: "https://unocss.dev/",
            },
          ],
        },
        {
          title: t("page.resume.tech.cat.environment") ?? "Environments & Editors",
          items: [
            {
              label: t("app.text.intellij") ?? "IntelliJ IDEA",
              icon: "i-logos-intellij-idea",
              href: "https://www.jetbrains.com/idea/",
            },
            {
              label: t("app.text.visual-studio-code") ?? "VS Code",
              icon: "i-logos-visual-studio-code",
              href: "https://code.visualstudio.com/",
            },
            {
              label: t("app.text.webstorm") ?? "WebStorm",
              icon: "i-logos-webstorm",
              href: "https://www.jetbrains.com/webstorm/",
            },
          ],
        },
        {
          title: t("page.resume.tech.cat.build") ?? "Build Systems & Package Management",
          items: [
            {
              label: t("app.text.gradle") ?? "Gradle",
              icon: "i-logos-gradle",
              href: "https://gradle.org/",
            },
            {
              label: t("app.text.vite-plus") ?? "Vite+",
              icon: "i-logos-vitejs",
              href: "https://viteplus.dev/",
            },
            { label: "pnpm", icon: "i-logos-pnpm", href: "https://pnpm.io/" },
          ],
        },
        {
          title: t("page.resume.tech.cat.deployment") ?? "Cloud & Deployment",
          items: [
            {
              label: t("app.text.docker") ?? "Docker",
              icon: "i-logos-docker-icon",
              href: "https://www.docker.com/",
            },
            {
              label: t("app.text.cloudflare") ?? "Cloudflare",
              icon: "i-logos-cloudflare-icon",
              href: "https://cloudflare.com/",
            },
          ],
        },
      ],
    },
  ];

  const careerHighlights = () => [
    {
      href: "#experience",
      icon: "i-mdi-layers-outline",
      label: t("page.resume.highlights.items.experience.label"),
      value: t("page.resume.highlights.items.experience.value"),
      detail: t("page.resume.highlights.items.experience.detail"),
    },
    {
      href: "#skills",
      icon: "i-mdi-server-outline",
      label: t("page.resume.highlights.items.backend.label"),
      value: t("page.resume.highlights.items.backend.value"),
      detail: t("page.resume.highlights.items.backend.detail"),
    },
    {
      href: "#tech",
      icon: "i-mdi-cloud-cog-outline",
      label: t("page.resume.highlights.items.web.label"),
      value: t("page.resume.highlights.items.web.value"),
      detail: t("page.resume.highlights.items.web.detail"),
    },
    {
      href: "#education",
      icon: "i-mdi-certificate-outline",
      label: t("page.resume.highlights.items.education.label"),
      value: t("page.resume.highlights.items.education.value"),
      detail: t("page.resume.highlights.items.education.detail"),
    },
  ];

  const experiences = () => t.raw<ExperienceItem[]>("page.resume.experiences", []);
  const education = () => t.raw<EducationItem[]>("page.resume.education", []);
  const certifications = () => t.raw<CertificationItem[]>("page.resume.certifications", []);
  const projects = () => t.raw<ResumeProject[]>("page.resume.projects", []);

  useHead(() =>
    createPageHead({
      title: t("page.resume.meta.title"),
      description: t("page.resume.meta.description"),
    }),
  );

  return (
    <div class="w-full overflow-hidden text-neutral-950 selection:bg-primary-400/30">
      <script type="application/ld+json" innerHTML={RESUME_JSON_LD} />
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 space-y-20 md:space-y-28">
        {/* Profile Hero Section */}
        <section class="resume-hero grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Executive Summary & Career Snapshot */}
          <div class="flex flex-col justify-between lg:col-span-7">
            <div>
              <div class="mb-4 flex flex-wrap items-center gap-3">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold tracking-[.28em] text-primary-400 uppercase">
                  <span
                    class="i-mdi-file-document-outline inline-block size-4"
                    aria-hidden="true"
                  />
                  {t("page.resume.hero.eyebrow")}
                </span>
                <span class="hidden h-3.5 w-px bg-primary-600/40 sm:inline-block" />
                <span class="inline-flex items-center gap-2 rounded-full border border-primary-600/50 bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-300">
                  <span class="size-2 rounded-full bg-primary-400 shadow-[0_0_8px_var(--rl-primary-400)]" />
                  {t("page.resume.hero.availability")}
                </span>
              </div>

              <h1 class="text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                {t("page.resume.sidebar.name")}
                <span class="text-primary-500">.</span>
              </h1>
              <p class="mt-2.5 text-lg font-semibold text-primary-400 sm:text-xl">
                {t("page.resume.sidebar.title")}
              </p>
              <p class="mt-4 max-w-2xl text-base leading-7 text-neutral-950/75 sm:text-lg sm:leading-8">
                {t("page.resume.hero.description")}
              </p>

              <div class="resume-no-print mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={getLocaleUrl("/contact")}
                  class="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-400 hover:shadow-[0_8px_28px_var(--rl-primary-700)] sm:text-base"
                >
                  {t("page.resume.hero.action.hire")}
                  <span class="i-mdi-send-outline inline-block size-5" aria-hidden="true" />
                </a>
                <a
                  href={getLocaleUrl("/projects")}
                  class="group inline-flex items-center gap-2 rounded-xl border-2 border-primary-600 bg-neutral-100/80 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/20 sm:text-base"
                >
                  {t("page.resume.hero.action.projects")}
                  <span
                    class="i-mdi-arrow-top-right inline-block size-5 text-primary-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  class="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary-600/70 bg-neutral-50/70 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/20"
                >
                  <span
                    class="i-mdi-file-document-outline inline-block size-4.5 text-primary-400"
                    aria-hidden="true"
                  />
                  <span>{t("page.resume.hero.action.print")}</span>
                </button>
              </div>

              <div class="resume-no-print mt-5">
                <SocialLinks />
              </div>
            </div>

            {/* Career Snapshot Grid */}
            <div class="mt-9">
              <div class="mb-3.5 flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-[.24em] text-primary-400">
                  {t("page.resume.highlights.heading")}
                </span>
                <span class="h-px flex-1 bg-primary-600/30" aria-hidden="true" />
              </div>

              <div class="grid gap-3.5 sm:grid-cols-2">
                <For each={careerHighlights()}>
                  {(item) => (
                    <a
                      href={item.href}
                      class="resume-highlight-card group relative flex flex-col justify-between rounded-2xl border-2 border-primary-600/70 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center gap-2.5">
                          <span class="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary-500/40 bg-primary-500/10 text-primary-400">
                            <span class={`inline-block size-5 ${item.icon}`} aria-hidden="true" />
                          </span>
                          <span class="text-xs font-bold uppercase tracking-wider text-primary-400">
                            {item.label}
                          </span>
                        </div>
                        <span
                          class="i-mdi-arrow-top-right inline-block size-4 text-neutral-950/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-400"
                          aria-hidden="true"
                        />
                      </div>

                      <div class="mt-3">
                        <p class="text-lg font-bold tracking-tight text-neutral-950 group-hover:text-primary-300 transition-colors">
                          {item.value}
                        </p>
                        <p class="mt-1 text-xs leading-5 text-neutral-950/65">{item.detail}</p>
                      </div>
                    </a>
                  )}
                </For>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Dossier Card */}
          <div class="lg:col-span-5">
            <div class="resume-dossier flex h-full flex-col justify-between rounded-2xl border-2 border-primary-600 p-6 sm:p-7">
              <div>
                {/* Dossier Header with Larger Lower-Res Portrait */}
                <div class="flex flex-col items-center gap-4 border-b border-primary-600/25 pb-6 text-center">
                  <div class="resume-portrait-frame">
                    <img
                      src={AVATAR_SRC}
                      alt={t("page.resume.sidebar.name")}
                      width="220"
                      height="220"
                      fetchpriority="high"
                      decoding="async"
                      class="aspect-square w-full rounded-2xl border border-primary-500/50 object-cover shadow-xl"
                    />
                  </div>

                  <div>
                    <span class="inline-block text-[11px] font-bold uppercase tracking-[.22em] text-primary-400">
                      {t("page.resume.sidebar.badge")}
                    </span>
                    <h2 class="mt-0.5 text-xl font-bold text-neutral-950 sm:text-2xl">
                      {t("page.resume.sidebar.name")}
                    </h2>
                    <p class="text-xs font-medium text-neutral-950/65 sm:text-sm">
                      {t("page.resume.sidebar.title")}
                    </p>
                    <div class="mt-2 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-semibold text-primary-400">
                      <a
                        href="https://en.wikipedia.org/wiki/Bucharest"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1 hover:underline"
                      >
                        <span class="i-lucide-map-pin size-3.5 shrink-0" aria-hidden="true" />
                        <span>{t("page.resume.sidebar.location")}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Professional & Profile Metadata Grid */}
                <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <For each={aboutDetails()}>
                    {(detail) => (
                      <div class="rounded-xl border border-primary-600/25 bg-neutral-50/70 px-3.5 py-2.5">
                        <span class="block text-[11px] font-semibold uppercase tracking-wider text-neutral-950/50">
                          {detail.label}
                        </span>
                        <span class="mt-0.5 block font-bold text-neutral-950">{detail.value}</span>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* Spoken Languages */}
              <div class="mt-5 border-t border-primary-600/25 pt-5">
                <div class="mb-3 flex items-center justify-between">
                  <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-primary-400">
                    <span class="i-lucide-globe size-4" aria-hidden="true" />
                    {t("page.resume.languages.heading")}
                  </span>
                </div>

                <div class="space-y-2.5">
                  <For each={languages}>
                    {(lang) => (
                      <div class="rounded-xl border border-primary-600/20 bg-neutral-50/60 px-3.5 py-2.5">
                        <div class="mb-2 flex items-center justify-between text-xs">
                          <span class="font-bold text-neutral-950">
                            {t(`page.resume.${lang.nameKey.replace(/_/g, ".")}`)}
                          </span>
                          <span class="rounded-full border border-primary-600/40 bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary-400">
                            {t(`page.resume.${lang.levelKey.replace(/_/g, ".")}`)}
                          </span>
                        </div>
                        <div class="grid grid-cols-5 gap-1.5" aria-hidden="true">
                          <For each={[20, 40, 60, 80, 100]}>
                            {(threshold) => (
                              <span
                                class={`h-1.5 rounded-full transition-colors ${
                                  lang.score >= threshold
                                    ? "bg-gradient-to-r from-primary-500 to-primary-400"
                                    : "bg-neutral-200 dark:bg-neutral-800"
                                }`}
                              />
                            )}
                          </For>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section with Vertical Timeline Spine */}
        <section
          id="experience"
          aria-labelledby="resume-experience-heading"
          class="resume-section-lazy scroll-mt-28"
        >
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("page.resume.experience.eyebrow")}
            </p>
            <h2
              id="resume-experience-heading"
              class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl"
            >
              {t("page.resume.experience.heading")}
            </h2>
            <h3 class="text-2xl sm:text-3xl font-semibold leading-snug">
              {t("page.resume.experience.subheading")}
            </h3>
          </div>

          <div class="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-primary-400 before:via-primary-600/50 before:to-transparent sm:before:left-4">
            <For each={experiences()}>
              {(exp, index) => (
                <div class="relative pl-9 sm:pl-12">
                  {/* Timeline Node */}
                  <span
                    class={` absolute top-7 left-1.5 size-3.5 rounded-full border-2 sm:left-2.5 ${
                      index() === 0
                        ? "border-primary-300 bg-primary-400 shadow-[0_0_12px_var(--rl-primary-400)]"
                        : "border-primary-500 bg-neutral-100"
                    }`}
                    aria-hidden="true"
                  />

                  <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 sm:p-8 transition-colors duration-300 hover:border-primary-500">
                    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 class="text-xl sm:text-2xl font-bold text-neutral-950">
                          {exp.role}
                          <Show when={exp.company}>
                            <span class="text-primary-400"> @ </span>
                            <span class="text-neutral-950/90">{exp.company}</span>
                          </Show>
                        </h4>
                        <Show when={exp.location}>
                          <div class="mt-1 flex items-center gap-1.5 text-xs font-medium text-neutral-950/60">
                            <span class="i-lucide-map-pin size-3.5 text-primary-400" />
                            <span>{exp.location}</span>
                          </div>
                        </Show>
                      </div>

                      <span class="self-start sm:self-auto rounded-full border border-primary-600 bg-neutral-50 px-3.5 py-1 text-xs font-semibold text-primary-400 shadow-sm">
                        {exp.period}
                      </span>
                    </div>

                    <Show when={exp.summary}>
                      <p class="mt-4 text-base leading-7 text-neutral-950/70">{exp.summary}</p>
                    </Show>

                    <Show when={exp.responsibilities && exp.responsibilities.length > 0}>
                      <div class="mt-4">
                        <span class="block text-xs font-bold uppercase tracking-wider text-primary-400 mb-2">
                          {t("page.resume.exp.responsibilities.label")}:
                        </span>
                        <ul class="space-y-2 pl-5 text-sm leading-6 marker:text-primary-400 list-disc text-neutral-950/80">
                          <For each={exp.responsibilities}>{(resp) => <li>{resp}</li>}</For>
                        </ul>
                      </div>
                    </Show>

                    <Show when={exp.tags && exp.tags.length > 0}>
                      <div class="mt-6 flex flex-wrap gap-2">
                        <For each={exp.tags}>
                          {(tag) => (
                            <span class="rounded-full border border-primary-600/70 bg-primary-900/20 px-3 py-1 text-xs font-semibold text-primary-300">
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </Show>
                  </div>
                </div>
              )}
            </For>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          aria-labelledby="resume-skills-heading"
          class="resume-section-lazy scroll-mt-28"
        >
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("page.resume.skills.eyebrow")}
            </p>
            <h2
              id="resume-skills-heading"
              class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl"
            >
              {t("page.resume.skills.heading")}
            </h2>
            <h3 class="text-2xl sm:text-3xl font-semibold leading-snug">
              {t("page.resume.skills.subheading")}
            </h3>
          </div>

          <div class="grid items-stretch gap-6 md:grid-cols-3">
            <For each={skills()}>
              {(skill) => (
                <div class="flex flex-col justify-between rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 sm:p-8 transition-colors duration-300 hover:border-primary-500">
                  <div>
                    <div class="mb-4 flex size-12 items-center justify-center rounded-xl border border-primary-500/50 bg-primary-500/10 shadow-sm">
                      <span class={`inline-block size-7 ${skill.icon}`} />
                    </div>
                    <h4 class="text-xl font-bold text-neutral-950">{skill.title}</h4>
                    <p class="mt-3 text-sm leading-6 text-neutral-950/70">{skill.description}</p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </section>

        {/* Technologies & Tools Section */}
        <section
          id="tech"
          aria-labelledby="resume-tech-heading"
          class="resume-section-lazy scroll-mt-28"
        >
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("page.resume.tech.eyebrow")}
            </p>
            <h2
              id="resume-tech-heading"
              class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl"
            >
              {t("page.resume.tech.heading")}
            </h2>
            <h3 class="text-2xl sm:text-3xl font-semibold leading-snug">
              {t("page.resume.tech.subheading")}
            </h3>
          </div>

          <For each={techGroups()}>
            {(group) => (
              <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <For each={group.categories}>
                  {(cat) => (
                    <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 transition-colors duration-300 hover:border-primary-500">
                      <h4 class="mb-4 text-sm font-bold uppercase tracking-wider text-primary-400">
                        {cat.title}
                      </h4>
                      <ul class="space-y-2.5">
                        <For each={cat.items}>
                          {(item) => (
                            <li>
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-primary-950/20"
                              >
                                <span class={`inline-block size-6 shrink-0 ${item.icon}`} />
                                <span class="text-sm font-semibold text-neutral-950 transition-colors group-hover:text-primary-300">
                                  {item.label}
                                </span>
                              </a>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  )}
                </For>
              </div>
            )}
          </For>
        </section>

        {/* Education & Projects Section */}
        <div class="resume-section-lazy grid gap-10 md:grid-cols-2">
          {/* Education */}
          <section id="education" aria-labelledby="resume-education-heading" class="scroll-mt-28">
            <div class="mb-6">
              <p class="mb-2 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                {t("page.resume.headings.academicsEyebrow")}
              </p>
              <h2
                id="resume-education-heading"
                class="text-3xl font-bold tracking-tight text-primary-500"
              >
                {t("page.resume.headings.education")}
              </h2>
            </div>

            <div class="space-y-4">
              <For each={education()}>
                {(edu) => (
                  <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 transition-colors duration-300 hover:border-primary-500">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h4 class="text-lg font-bold text-neutral-950">{edu.degree}</h4>
                        <p class="mt-1 text-sm text-neutral-950/65">{edu.school}</p>
                      </div>
                      <span class="rounded-full border border-primary-600 bg-neutral-50 px-3 py-1 text-xs font-semibold text-primary-400 shrink-0">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                )}
              </For>
            </div>

            <Show when={certifications().length > 0}>
              <div class="mt-8 space-y-4">
                <p class="text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                  {t("page.resume.headings.certificationsEyebrow")}
                </p>
                <For each={certifications()}>
                  {(cert) => (
                    <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 transition-colors duration-300 hover:border-primary-500">
                      <h4 class="text-lg font-bold text-neutral-950">{cert.title}</h4>
                      <p class="mt-1 text-sm text-neutral-950/65">{cert.issuer}</p>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </section>

          {/* Projects */}
          <section id="projects" aria-labelledby="resume-projects-heading" class="scroll-mt-28">
            <div class="mb-6">
              <p class="mb-2 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                {t("page.resume.headings.portfolioEyebrow")}
              </p>
              <h2
                id="resume-projects-heading"
                class="text-3xl font-bold tracking-tight text-primary-500"
              >
                {t("page.resume.headings.projects")}
              </h2>
            </div>

            <div class="space-y-4">
              <For each={projects()}>
                {(proj) => (
                  <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 transition-colors duration-300 hover:border-primary-500">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h4 class="text-lg font-bold text-neutral-950">
                          <Show when={proj.href} fallback={proj.name}>
                            <a
                              href={proj.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="group inline-flex items-center gap-1.5 transition-colors hover:text-primary-400"
                            >
                              <span>{proj.name}</span>
                              <span
                                class="i-mdi-arrow-top-right inline-block size-4 text-primary-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            </a>
                          </Show>
                        </h4>
                        <Show when={proj.role}>
                          <p class="mt-1 text-sm font-medium text-primary-400/90">{proj.role}</p>
                        </Show>
                      </div>
                      <span class="rounded-full border border-primary-600 bg-neutral-50 px-3 py-1 text-xs font-semibold text-primary-400 shrink-0">
                        {typeof proj.period === "string" ? proj.period : proj.period.start}
                      </span>
                    </div>

                    <Show when={proj.summary}>
                      <p class="mt-3 text-sm leading-6 text-neutral-950/70">{proj.summary}</p>
                    </Show>

                    <Show when={proj.tags && proj.tags.length > 0}>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <For each={proj.tags}>
                          {(tag) => (
                            <span class="rounded-full border border-primary-600/70 bg-primary-900/20 px-3 py-0.5 text-xs font-semibold text-primary-300">
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
