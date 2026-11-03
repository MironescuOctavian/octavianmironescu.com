import { For, Show } from "solid-js";
import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { t } from "@rimelight/i18n";
import { RLLink } from "@rimelight/ui/components/link/RLLink.tsx";
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

const AVATAR_SRC = "https://cdn.octavianmironescu.com/images/image0.jpg";

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
      label: t("page.resume.about.gender.label"),
      value: t("page.resume.about.gender.value"),
    },
    {
      label: t("page.resume.about.pronouns.label"),
      value: t("page.resume.about.pronouns.value"),
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
    <div class="w-full overflow-hidden bg-neutral-50 text-neutral-950 selection:bg-primary-400/30">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 space-y-20 md:space-y-28">
        {/* Profile Hero Section */}
        <section class="grid items-start gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
          {/* Left Column: Introduction & Core Information */}
          <div class="flex flex-col">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("page.resume.hero.title") ?? "CURRICULUM VITAE"}
            </p>
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("page.resume.sidebar.name")}
              <span class="text-primary-500">.</span>
            </h1>
            <p class="mt-2 text-xl font-semibold text-primary-400">
              {t("page.resume.sidebar.title")}
            </p>
            <p class="mt-4 max-w-xl text-base leading-7 text-neutral-950/65 sm:text-lg sm:leading-8">
              {t("page.resume.hero.description")}
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <RLLink
                raw
                href="/contact"
                class="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-5 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-400 hover:shadow-[0_8px_28px_var(--rl-primary-700)]"
              >
                {t("page.resume.hero.action.hire") ?? "Hire me"}
                <span class="i-mdi-send-outline inline-block size-5" />
              </RLLink>
              <a
                href="https://github.com/MironescuOctavian"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 bg-transparent px-5 py-3 font-semibold text-neutral-950 transition-all duration-300 hover:border-primary-400 hover:bg-primary-900/10"
              >
                <span class="i-mdi-github inline-block size-5 text-primary-400 transition-transform group-hover:scale-110" />
                {t("app.text.github") ?? "GitHub"}
              </a>
            </div>

            {/* Social Icons */}
            <div class="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Profile Card with Details & Languages */}
          <div>
            <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 sm:p-8 shadow-[0_4px_24px_var(--rl-primary-950)]">
              <div class="flex flex-col items-center gap-5 border-b-2 border-primary-600/30 pb-6 sm:flex-row sm:gap-6">
                <img
                  src={AVATAR_SRC}
                  alt={t("page.resume.sidebar.name")}
                  class="size-28 shrink-0 rounded-2xl border-2 border-primary-500 object-cover object-[60%_15%] shadow-[0_0_24px_var(--rl-primary-900)] sm:size-32"
                />
                <div class="text-center sm:text-left">
                  <h2 class="text-2xl font-bold text-neutral-950">
                    {t("page.resume.sidebar.name")}
                  </h2>
                  <p class="text-sm font-medium text-neutral-950/60">
                    {t("page.resume.sidebar.title")}
                  </p>
                  <div class="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400">
                    <span class="i-lucide-map-pin size-3.5" />
                    <a
                      href="https://en.wikipedia.org/wiki/Bucharest"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:underline"
                    >
                      {t("page.resume.sidebar.location")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div class="mt-6 flex flex-col gap-2.5 text-sm">
                <For each={aboutDetails()}>
                  {(detail) => (
                    <div class="flex items-center justify-between py-1 border-b border-primary-600/20">
                      <span class="font-medium text-neutral-950/60">{detail.label}</span>
                      <span class="font-semibold text-neutral-950">{detail.value}</span>
                    </div>
                  )}
                </For>
              </div>

              {/* Languages */}
              <div class="mt-6 pt-2">
                <p class="mb-3 text-xs font-bold uppercase tracking-wider text-primary-400">
                  {t("page.resume.languages.heading")}
                </p>
                <div class="space-y-3">
                  <For each={languages}>
                    {(lang) => (
                      <div>
                        <div class="mb-1 flex justify-between text-xs font-medium">
                          <span class="text-neutral-950">
                            {t(`page.resume.${lang.nameKey.replace(/_/g, ".")}`)}
                          </span>
                          <span class="text-primary-400 font-semibold">
                            {t(`page.resume.${lang.levelKey.replace(/_/g, ".")}`)}
                          </span>
                        </div>
                        <div class="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                          <div
                            class="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-500"
                            style={{ width: `${lang.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section aria-labelledby="resume-experience-heading" class="scroll-mt-28">
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              EXPERIENCE
            </p>
            <h2
              id="resume-experience-heading"
              class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl"
            >
              {t("page.resume.experience.heading")}
            </h2>
            <h3 class="text-2xl sm:text-3xl font-semibold leading-snug">
              Professional journey & technical roles
            </h3>
          </div>

          <div class="space-y-6">
            <For each={[...experiences()].reverse()}>
              {(exp) => (
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
              )}
            </For>
          </div>
        </section>

        {/* Skills Section */}
        <section aria-labelledby="resume-skills-heading" class="scroll-mt-28">
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              COMPETENCIES
            </p>
            <h2
              id="resume-skills-heading"
              class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl"
            >
              {t("page.resume.skills.heading")}
            </h2>
            <h3 class="text-2xl sm:text-3xl font-semibold leading-snug">
              Core areas of focus & development
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
        <section aria-labelledby="resume-tech-heading" class="scroll-mt-28">
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              ECOSYSTEM
            </p>
            <h2
              id="resume-tech-heading"
              class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl"
            >
              {t("page.resume.tech.heading")}
            </h2>
            <h3 class="text-2xl sm:text-3xl font-semibold leading-snug">
              Frameworks, libraries, and tooling
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
        <div class="grid gap-10 md:grid-cols-2">
          {/* Education */}
          <section aria-labelledby="resume-education-heading">
            <div class="mb-6">
              <p class="mb-2 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                ACADEMICS
              </p>
              <h2
                id="resume-education-heading"
                class="text-3xl font-bold tracking-tight text-primary-500"
              >
                {t("page.resume.headings.education")}
              </h2>
            </div>

            <div class="space-y-4">
              <For each={[...education()].reverse()}>
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
                  CERTIFICATIONS
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
          <section aria-labelledby="resume-projects-heading">
            <div class="mb-6">
              <p class="mb-2 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                PORTFOLIO
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
                        <h4 class="text-lg font-bold text-neutral-950">{proj.name}</h4>
                        <Show when={proj.role}>
                          <p class="mt-1 text-sm text-neutral-950/65">{proj.role}</p>
                        </Show>
                      </div>
                      <span class="rounded-full border border-primary-600 bg-neutral-50 px-3 py-1 text-xs font-semibold text-primary-400 shrink-0">
                        {typeof proj.period === "string" ? proj.period : proj.period.start}
                      </span>
                    </div>
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
