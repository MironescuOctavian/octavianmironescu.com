import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { RLButton, RLMarquee, RLContainer } from "@rimelight/ui";
import { t } from "@rimelight/i18n";
import { RLLink } from "@rimelight/ui";
import SocialLinks from "#components/app/SocialLinks";
import { createSignal, onSettled, For } from "solid-js";

const tech = [
  { name: "Java", icon: "i-logos-java" },
  { name: "Spring Boot", icon: "i-logos-spring-icon" },
  { name: "Kotlin", icon: "i-logos-kotlin-icon" },
  { name: "TypeScript", icon: "i-logos-typescript-icon" },
  { name: "Vue", icon: "i-logos-vue" },
  { name: "SolidJS", icon: "i-logos-solidjs-icon" },
  { name: "MongoDB", icon: "i-logos-mongodb-icon" },
  { name: "PostgreSQL", icon: "i-logos-postgresql" },
  { name: "Docker", icon: "i-logos-docker-icon" },
  { name: "Cloudflare", icon: "i-logos-cloudflare-icon" },
  { name: "Vite", icon: "i-logos-vitejs" },
  { name: "pnpm", icon: "i-logos-pnpm" },
];

const techGroups = [
  {
    title: "languages",
    items: [
      { name: "Java", icon: "i-logos-java" },
      { name: "Kotlin", icon: "i-logos-kotlin-icon" },
      { name: "TypeScript", icon: "i-logos-typescript-icon" },
      { name: "JavaScript", icon: "i-logos-javascript" },
      { name: "SQL", icon: "i-mdi-database-outline" },
      { name: "Python", icon: "i-logos-python" },
    ],
  },
  {
    title: "frameworks",
    items: [
      { name: "Spring Boot", icon: "i-logos-spring-icon" },
      { name: "SolidJS", icon: "i-logos-solidjs-icon" },
      { name: "Vue", icon: "i-logos-vue" },
      { name: "UnoCSS", icon: "i-logos-unocss" },
      { name: "HTML & CSS", icon: "i-logos-html-5" },
    ],
  },
  {
    title: "data",
    items: [
      { name: "MongoDB", icon: "i-logos-mongodb-icon" },
      { name: "PostgreSQL", icon: "i-logos-postgresql" },
      { name: "REST APIs", icon: "i-mdi-api" },
      { name: "GraphQL", icon: "i-logos-graphql" },
    ],
  },
  {
    title: "tools",
    items: [
      { name: "Git", icon: "i-logos-git-icon" },
      { name: "Docker", icon: "i-logos-docker-icon" },
      { name: "Cloudflare", icon: "i-logos-cloudflare-icon" },
      { name: "Vite+", icon: "i-logos-vitejs" },
      { name: "pnpm", icon: "i-logos-pnpm" },
      { name: "Gradle", icon: "i-logos-gradle" },
    ],
  },
];

const projects = [
  {
    title: "octavianmironescu.com",
    type: "portfolio",
    status: "live",
    image: "https://placehold.co/900x600/111111/ffbf00?text=octavianmironescu.com",
    href: "https://github.com/MironescuOctavian/octavianmironescu.com",
    featured: true,
  },
  {
    title: "backendTitle",
    type: "backend",
    status: "comingSoon",
    image: "https://placehold.co/900x600/111111/ffbf00?text=Backend+Systems",
    href: "https://github.com/MironescuOctavian",
  },
  {
    title: "platformTitle",
    type: "application",
    status: "comingSoon",
    image: "https://placehold.co/900x600/111111/ffbf00?text=Full-stack+Platform",
    href: "https://github.com/MironescuOctavian",
  },
];

const packages = [
  "@rimelight/ui",
  "@rimelight/i18n",
  "@rimelight/seo",
  "@rimelight/auth",
  "@rimelight/security",
  "@rimelight/cms",
];

export default function HomePage() {
  const techLabel = (key: string) => t.raw<string>(`home.sections.technologies.labels.${key}`, key);
  const projectLabel = (key: string) => t.raw<string>(`home.sections.work.labels.${key}`, key);
  const [activeTechGroup, setActiveTechGroup] = createSignal<string>("All");
  const getBucharestTime = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Bucharest",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  const [clockTime, setClockTime] = createSignal(getBucharestTime());
  onSettled(() => {
    const id = setInterval(() => setClockTime(getBucharestTime()), 1000);
    return () => clearInterval(id);
  });
  const graphItems = () =>
    techGroups.flatMap((group, groupIndex) =>
      group.items.map((item) => ({ ...item, group: group.title, groupIndex })),
    );
  const point = (index: number, count: number, radius: number) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return { x: 400 + radius * Math.cos(angle), y: 400 + radius * Math.sin(angle) };
  };

  useHead(() =>
    createPageHead({
      title: t("app.text.octavian-mironescu"),
      description: t("app.text.personal-website-of-octavian-mironescu"),
    }),
  );

  return (
    <div class="w-full overflow-hidden bg-neutral-50 text-neutral-950 selection:bg-primary-400/30">
      <style>{`
        @keyframes service-reveal {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-card[open] .service-content { animation: service-reveal 250ms ease-out; }
        @supports (interpolate-size: allow-keywords) {
          .service-card { interpolate-size: allow-keywords; }
          .service-card::details-content {
            block-size: 0;
            opacity: 0;
            overflow: clip;
            transition: block-size 300ms ease, opacity 220ms ease, content-visibility 300ms allow-discrete;
          }
          .service-card[open]::details-content { block-size: auto; opacity: 1; }
          .service-card[open] .service-content { animation: none; }
        }
        @keyframes content-reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tech-results { animation: content-reveal 350ms ease-out; }
        .tech-graph { animation-duration: 800ms; }
        .tech-graph:has([data-branch="0"]:is(:hover, :focus-visible)) [data-branch]:not([data-branch="0"]),
        .tech-graph:has([data-branch="1"]:is(:hover, :focus-visible)) [data-branch]:not([data-branch="1"]),
        .tech-graph:has([data-branch="2"]:is(:hover, :focus-visible)) [data-branch]:not([data-branch="2"]),
        .tech-graph:has([data-branch="3"]:is(:hover, :focus-visible)) [data-branch]:not([data-branch="3"]) { opacity: .12; }
        .tech-graph [data-branch] { transition: opacity 200ms ease; }
        .tech-graph [data-branch] line { stroke-width: 12px; stroke: transparent; pointer-events: stroke; }
        .tech-graph [data-branch] .branch-line { stroke-width: 1.5px; stroke: var(--rl-primary-500); pointer-events: none; }
        .tech-graph [data-branch]:is(:hover, :focus-visible) .branch-line { stroke-width: 3px; }
        .graph-description { display: none; }
        .tech-graph:has([data-branch="0"]:is(:hover, :focus-visible)) [data-description="0"],
        .tech-graph:has([data-branch="1"]:is(:hover, :focus-visible)) [data-description="1"],
        .tech-graph:has([data-branch="2"]:is(:hover, :focus-visible)) [data-description="2"],
        .tech-graph:has([data-branch="3"]:is(:hover, :focus-visible)) [data-description="3"] { display: block; }
        .tech-view input { position: absolute; opacity: 0; }
        .tech-view label { display: inline-flex; align-items: center; gap: .5rem; padding: .5rem .75rem; border-radius: .5rem; cursor: pointer; color: var(--rl-neutral-950); }
        .tech-view input:checked + label { background: var(--rl-primary-500); color: #000; }
        .tech-view input:focus-visible + label { outline: 2px solid var(--rl-primary-400); }
        #skills:has(#tech-graph:checked) .tech-grid { display: none; }
        #skills:has(#tech-grid:checked) .tech-graph { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .service-card[open] .service-content, .tech-results { animation: none; }
          .service-card::details-content { transition: none; }
        }
      `}</style>
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <section class="scroll-mt-28 py-20 md:py-28">
          <div class="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* Left: text content */}
            <div class="max-w-2xl">
              <p class="mb-4 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                {t("home.sections.hero.eyebrow")}
              </p>
              <h1 class="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Hi, I'm <span class="text-primary-500">Mironescu Octavian</span>.
              </h1>
              <p class="mt-5 max-w-xl text-base leading-7 text-neutral-950/55 sm:text-lg sm:leading-8">
                {t("home.sections.hero.description")}
              </p>
              <div class="mt-8 flex flex-wrap gap-3">
                <RLButton
                  href="#projects"
                  trailingIcon="i-mdi-arrow-down-right"
                  color="primary"
                  size="lg"
                  class="rounded-lg bg-primary-500 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-400 hover:shadow-[0_8px_28px_var(--rl-primary-700)]"
                >
                  {t("home.sections.hero.explore")}
                </RLButton>
                <RLButton
                  href="/resume"
                  leadingIcon="i-mdi-download"
                  color="primary"
                  variant="outline"
                  size="lg"
                  class="rounded-lg border-2 border-primary-600 bg-transparent font-semibold text-neutral-950 transition-all duration-300 hover:border-primary-400 hover:bg-primary-900/10"
                >
                  {t("home.sections.hero.download")}
                </RLButton>
              </div>
              {/* Live clock */}
              <div class="mt-7 inline-flex h-12 items-center gap-3 rounded-xl border-2 border-primary-500 bg-primary-500/10 px-4 text-neutral-950 shadow-[0_2px_12px_var(--rl-primary-950)]">
                <span
                  class="i-mdi-clock-outline inline-block size-6 shrink-0 text-primary-400"
                  aria-hidden="true"
                />
                <div class="flex items-baseline gap-2">
                  <span class="font-mono text-sm font-bold tabular-nums text-neutral-950">
                    {clockTime()}
                  </span>
                  <span class="text-xs font-semibold uppercase tracking-wider text-primary-400">
                    EET · Bucharest
                  </span>
                </div>
              </div>
              {/* Social icons */}
              <SocialLinks class="mt-4" />
            </div>

            {/* Right: floating dev icon panel */}
            <div class="hero-icons relative hidden h-[420px] w-[340px] lg:block" aria-hidden="true">
              <style>{`
                @keyframes hero-float-a {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
                @keyframes hero-float-b {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(8px); }
                }
                @keyframes hero-float-c {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-7px) rotate(3deg); }
                }
                .hero-icon-a { animation: hero-float-a 4s ease-in-out infinite; }
                .hero-icon-b { animation: hero-float-b 5s ease-in-out infinite; }
                .hero-icon-c { animation: hero-float-c 6s ease-in-out infinite; }
                .hero-icon-d { animation: hero-float-a 3.5s ease-in-out infinite 0.8s; }
                .hero-icon-e { animation: hero-float-b 4.5s ease-in-out infinite 1.2s; }
                .hero-icon-f { animation: hero-float-c 5.5s ease-in-out infinite 0.4s; }
                .hero-icon-g { animation: hero-float-a 4.8s ease-in-out infinite 1.6s; }
                @media (prefers-reduced-motion: reduce) {
                  .hero-icon-a, .hero-icon-b, .hero-icon-c, .hero-icon-d,
                  .hero-icon-e, .hero-icon-f, .hero-icon-g { animation: none; }
                }
              `}</style>
              {/* Glowing backdrop blob */}
              <div class="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_50%,var(--rl-primary-900),transparent_70%)] opacity-40" />
              {/* Central big icon */}
              <div class="hero-icon-a absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div class="flex size-24 items-center justify-center rounded-2xl border-2 border-primary-500 bg-neutral-50 shadow-[0_0_40px_var(--rl-primary-800)]">
                  <span class="i-logos-java inline-block size-14" />
                </div>
              </div>
              {/* Orbit icons */}
              <div class="hero-icon-b absolute left-4 top-10">
                <div class="flex size-16 items-center justify-center rounded-xl border border-primary-600/60 bg-neutral-50/90 shadow-md">
                  <span class="i-logos-spring-icon inline-block size-8" />
                </div>
              </div>
              <div class="hero-icon-c absolute right-6 top-8">
                <div class="flex size-16 items-center justify-center rounded-xl border border-primary-600/60 bg-neutral-50/90 shadow-md">
                  <span class="i-logos-typescript-icon inline-block size-8" />
                </div>
              </div>
              <div class="hero-icon-d absolute right-2 top-1/2 -translate-y-1/2">
                <div class="flex size-14 items-center justify-center rounded-xl border border-primary-600/60 bg-neutral-50/90 shadow-md">
                  <span class="i-logos-solidjs-icon inline-block size-7" />
                </div>
              </div>
              <div class="hero-icon-e absolute bottom-16 right-8">
                <div class="flex size-14 items-center justify-center rounded-xl border border-primary-600/60 bg-neutral-50/90 shadow-md">
                  <span class="i-logos-docker-icon inline-block size-7" />
                </div>
              </div>
              <div class="hero-icon-f absolute bottom-12 left-6">
                <div class="flex size-16 items-center justify-center rounded-xl border border-primary-600/60 bg-neutral-50/90 shadow-md">
                  <span class="i-logos-postgresql inline-block size-8" />
                </div>
              </div>
              <div class="hero-icon-g absolute left-2 top-1/2 -translate-y-8">
                <div class="flex size-12 items-center justify-center rounded-xl border border-primary-600/60 bg-neutral-50/90 shadow-md">
                  <span class="i-logos-mongodb-icon inline-block size-6" />
                </div>
              </div>
              {/* Small accent dots */}
              <div class="absolute right-20 top-28 size-2 rounded-full bg-primary-400 opacity-60" />
              <div class="absolute bottom-28 left-24 size-1.5 rounded-full bg-primary-300 opacity-50" />
              <div class="absolute bottom-36 right-16 size-2.5 rounded-full bg-primary-500 opacity-40" />
            </div>
          </div>
        </section>

        <RLContainer>
          <section
            aria-label={t("home.sections.technologies.stack")}
            class="overflow-hidden py-8 rounded-3xl border-2 border-primary-500 bg-primary-950/30"
          >
            <RLMarquee direction="left" speed={45}>
              {tech.map((item) => (
                <span class="mx-3 inline-flex shrink-0 items-center gap-3 rounded-full border-2 border-primary-600 bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950/90 shadow-[0_0_20px_var(--rl-primary-900)] transition hover:border-primary-400 hover:bg-primary-900">
                  <span class={`inline-block size-7 shrink-0 ${item.icon}`} />
                  {item.name}
                </span>
              ))}
            </RLMarquee>
          </section>
        </RLContainer>

        <section
          id="about"
          class="grid scroll-mt-28 gap-10 py-20 md:grid-cols-[.7fr_1.3fr] md:py-24"
        >
          <div>
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("home.sections.about.eyebrow")}
            </p>
            <h2 class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
              {t("page.resume.about.heading")}
            </h2>
            <h3 class="text-3xl font-semibold leading-snug">
              {t("home.sections.about.title")}
              <br />
              <span class="text-neutral-950/35">{t("home.sections.about.titleTail")}</span>
            </h3>
          </div>
          <div class="space-y-4 text-base leading-relaxed text-neutral-950/60 sm:text-[1.0625rem]">
            <p>{t("home.sections.about.paragraph1")}</p>
            <p>{t("home.sections.about.paragraph2")}</p>
            <p class="mt-2 text-sm italic text-neutral-950/35">
              {t("home.sections.about.approach")}
            </p>
          </div>
        </section>

        <section id="skills" class="scroll-mt-28 border-t-2 border-primary-600/40 py-20 md:py-24">
          <div class="mb-8">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("home.sections.services.eyebrow")}
            </p>
            <h2 class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
              {t("page.resume.skills.heading")}
            </h2>
            <h3 class="text-3xl font-semibold leading-snug">
              {t("home.sections.services.title")}
              <br />
              <span class="text-neutral-950/35">{t("home.sections.services.titleTail")}</span>
            </h3>
          </div>
          <div class="grid items-start gap-4 md:grid-cols-3">
            {[
              {
                i: "i-mdi-web",
                n: t("home.sections.services.web.title"),
                d: t("home.sections.services.web.description"),
                points: t.array<string>("home.sections.services.web.points"),
              },
              {
                i: "i-mdi-server-outline",
                n: t("home.sections.services.backend.title"),
                d: t("home.sections.services.backend.description"),
                points: t.array<string>("home.sections.services.backend.points"),
              },
              {
                i: "i-mdi-cloud-cog-outline",
                n: t("home.sections.services.delivery.title"),
                d: t("home.sections.services.delivery.description"),
                points: t.array<string>("home.sections.services.delivery.points"),
              },
            ].map((s) => (
              <details class="service-card group overflow-hidden rounded-2xl border-2 border-primary-600 bg-neutral-100 transition-colors duration-300 hover:border-primary-500 open:border-primary-500 open:bg-primary-950/50">
                <summary class="flex min-h-24 cursor-pointer list-none items-center gap-4 p-6 transition-colors hover:bg-primary-900/40 [&::-webkit-details-marker]:hidden">
                  <span class={`inline-block size-8 shrink-0 text-primary-400 ${s.i}`} />
                  <span class="flex-1 text-lg font-medium">{s.n}</span>
                  <span class="i-mdi-plus inline-block size-6 text-primary-400 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div class="service-content">
                  <div class="px-6 pb-6 text-neutral-950/70">
                    <p class="leading-7">{s.d}</p>
                    <ul class="mt-4 space-y-3 pl-5 text-sm leading-6 marker:text-primary-400 list-disc">
                      {s.points.map((point) => (
                        <li>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <h3 class="mb-2 mt-16 text-2xl font-bold tracking-tight text-neutral-950">
            {t("home.sections.technologies.title")}
          </h3>
          <p class="text-sm leading-6 text-neutral-950/55">
            {t("home.sections.technologies.description")}
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-600 bg-neutral-100 p-3 sm:p-4">
            <div
              class="flex flex-wrap gap-2"
              role="group"
              aria-label={t("home.sections.technologies.categories")}
            >
              <For each={["All", ...techGroups.map((group) => group.title)]}>
                {(category) => (
                  <RLButton
                    type="button"
                    raw={true}
                    label={
                      category === "All" ? t("home.sections.technologies.all") : techLabel(category)
                    }
                    active={activeTechGroup() === category}
                    aria-pressed={activeTechGroup() === category}
                    onClick={() => setActiveTechGroup(category)}
                    class={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-400 ${activeTechGroup() === category ? "border-primary-500 bg-primary-500 text-black shadow-[0_4px_16px_var(--rl-primary-800)]" : "border-primary-600 bg-neutral-50 text-neutral-950/80 hover:border-primary-400 hover:bg-primary-900/40 hover:text-neutral-950"}`}
                  />
                )}
              </For>
            </div>
            <div
              class="tech-view flex rounded-xl border border-primary-600 p-1"
              aria-label={t("home.sections.technologies.display")}
            >
              <input type="radio" id="tech-grid" name="tech-view" checked />
              <label for="tech-grid">
                <span class="i-mdi-view-grid inline-block size-4" />
                {t("home.sections.technologies.grid")}
              </label>
              <input type="radio" id="tech-graph" name="tech-view" />
              <label for="tech-graph">
                <span class="i-mdi-graph-outline inline-block size-4" />
                {t("home.sections.technologies.graph")}
              </label>
            </div>
          </div>
          <div class="tech-graph tech-results mt-6 grid w-full items-center gap-6 overflow-hidden bg-neutral-50 py-4 lg:grid-cols-[minmax(0,3fr)_minmax(15rem,2fr)] lg:gap-10">
            <div class="min-w-0 overflow-x-auto">
              <svg
                viewBox="0 0 800 800"
                class="mx-auto block w-full min-w-[480px] max-w-[650px]"
                role="img"
                aria-label={t("home.sections.technologies.graph")}
              >
                <circle
                  cx="400"
                  cy="400"
                  r="250"
                  fill="none"
                  stroke="var(--rl-primary-700)"
                  stroke-opacity=".35"
                />
                {graphItems().map((item, index) => {
                  const outer = point(index, graphItems().length, 250);
                  const inner = point(item.groupIndex, techGroups.length, 105);
                  const right = outer.x >= 400;
                  return (
                    <g
                      data-branch={item.groupIndex}
                      tabindex="0"
                      role="button"
                      aria-label={`${item.name}: ${techLabel(item.group)}`}
                    >
                      <line
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        class="branch-line"
                        stroke-opacity=".6"
                      />
                      <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} />
                      <circle cx={outer.x} cy={outer.y} r="5" fill="var(--rl-primary-400)" />
                      <text
                        x={outer.x + (right ? 10 : -10)}
                        y={outer.y + 4}
                        text-anchor={right ? "start" : "end"}
                        fill="var(--rl-neutral-950)"
                        font-size="16"
                        font-weight="600"
                      >
                        {item.name}
                      </text>
                    </g>
                  );
                })}
                {techGroups.map((group, index) => {
                  const pos = point(index, techGroups.length, 105);
                  return (
                    <g
                      data-branch={index}
                      tabindex="0"
                      role="button"
                      aria-label={techLabel(group.title)}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="25"
                        fill="var(--rl-neutral-50)"
                        stroke="var(--rl-primary-500)"
                        stroke-width="2"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        text-anchor="middle"
                        fill="var(--rl-primary-300)"
                        font-size="11"
                        font-weight="700"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </text>
                      <title>{techLabel(group.title)}</title>
                    </g>
                  );
                })}
                <text
                  x="400"
                  y="395"
                  text-anchor="middle"
                  fill="var(--rl-neutral-950)"
                  font-size="28"
                  font-weight="700"
                >
                  {graphItems().length}
                </text>
                <text
                  x="400"
                  y="418"
                  text-anchor="middle"
                  fill="var(--rl-primary-300)"
                  font-size="12"
                >
                  {t("home.sections.technologies.toolCount")}
                </text>
              </svg>
            </div>
            <div class="px-2 pb-4 sm:px-4 lg:px-0">
              <h4 class="text-xl font-bold text-neutral-950">
                {t("home.sections.technologies.graphTitle")}
              </h4>
              <p class="mt-2 text-sm leading-6 text-neutral-950/80">
                {t("home.sections.technologies.graphExplanation")}
              </p>
              <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {techGroups.map((group, index) => (
                  <span
                    data-branch={index}
                    tabindex="0"
                    class="inline-flex cursor-default items-center gap-2 text-sm font-semibold text-neutral-950"
                  >
                    <span class="inline-flex size-8 items-center justify-center rounded-full border border-primary-500 text-xs text-primary-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {techLabel(group.title)}
                    <span class="text-neutral-950/60">({group.items.length})</span>
                  </span>
                ))}
              </div>
              <div class="mt-5 min-h-12 text-sm leading-6 text-neutral-950/80" aria-live="polite">
                {techGroups.map((group, index) => (
                  <p class="graph-description" data-description={index}>
                    <strong class="text-primary-300">{techLabel(group.title)}:</strong>{" "}
                    {t.raw<string>(`home.sections.technologies.descriptions.${group.title}`, "")}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div class="tech-grid tech-results mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {techGroups
              .filter((group) => activeTechGroup() === "All" || activeTechGroup() === group.title)
              .map((group) =>
                group.items.map((item) => (
                  <div class="group flex items-center gap-3 rounded-xl border border-primary-600/60 bg-neutral-100 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/20 hover:shadow-[0_6px_20px_var(--rl-primary-950)]">
                    <span class={`inline-block size-7 shrink-0 ${item.icon}`} aria-hidden="true" />
                    <div class="min-w-0 flex-1">
                      <p class="truncate font-bold text-neutral-950">{item.name}</p>
                      <p class="truncate text-xs font-semibold uppercase tracking-wide text-primary-400">
                        {techLabel(group.title)}
                      </p>
                    </div>
                  </div>
                )),
              )}
          </div>
        </section>

        <section
          aria-label={t("home.sections.highlights.title")}
          class="my-8 grid overflow-hidden rounded-2xl border border-primary-600 bg-neutral-50 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              n: "X",
              label: t("home.sections.highlights.projects"),
              note: t("home.sections.highlights.projectsNote"),
              icon: "i-mdi-layers-outline",
            },
            {
              n: "X",
              label: t("home.sections.highlights.certificates"),
              note: t("home.sections.highlights.certificatesNote"),
              icon: "i-mdi-certificate-outline",
            },
            {
              n: "X",
              label: t("home.sections.highlights.badges"),
              note: t("home.sections.highlights.badgesNote"),
              icon: "i-lucide-award",
            },
            {
              n: "2+",
              label: t("home.sections.highlights.years"),
              note: t("home.sections.highlights.yearsNote"),
              icon: "i-mdi-calendar-outline",
            },
          ].map((stat) => (
            <div class="border-t border-primary-600/30 p-6 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 lg:p-8">
              <span class="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary-700/20 text-primary-400">
                <span class={`inline-block size-5 ${stat.icon}`} aria-hidden="true" />
              </span>
              <p class="text-3xl font-bold">{stat.n}</p>
              <p class="mt-1.5 text-sm font-medium text-neutral-950/80">{stat.label}</p>
              <p class="mt-2 text-xs text-neutral-950/50">{stat.note}</p>
            </div>
          ))}
        </section>

        <section id="projects" class="scroll-mt-28 border-t-2 border-primary-600/40 py-20 md:py-24">
          <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                {t("home.sections.work.eyebrow")}
              </p>
              <h2 class="text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
                {t("home.sections.work.title")}
              </h2>
              <p class="mt-3 text-sm text-neutral-950/50">{t("home.sections.work.description")}</p>
            </div>
            <a
              href="https://github.com/MironescuOctavian?tab=repositories"
              class="text-sm text-neutral-950/60 transition hover:text-primary-200"
            >
              {t("home.sections.work.repositories")}{" "}
              <span class="i-mdi-arrow-top-right ml-1 inline-block" />
            </a>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <a
                href={p.href}
                class={`group overflow-hidden rounded-2xl border-2 border-primary-600 bg-neutral-950/[.02] transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-[0_12px_32px_var(--rl-primary-950)] ${p.featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}
              >
                <div class="overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.featured ? p.title : projectLabel(p.title)} — ${t("home.sections.work.preview")}`}
                    loading="lazy"
                    class="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div class="flex flex-col justify-center p-6">
                  <p class="text-xs uppercase tracking-widest text-primary-200">
                    {projectLabel(p.type)} · {projectLabel(p.status)}
                  </p>
                  <h3 class="mt-3 text-2xl font-semibold">
                    {p.featured ? p.title : projectLabel(p.title)}
                  </h3>
                  <p class="mt-3 text-sm leading-6 text-neutral-950/45">
                    {p.featured
                      ? t("home.sections.work.portfolioDescription")
                      : t("home.sections.work.comingDescription")}
                  </p>
                  <span class="mt-6 text-sm text-neutral-950/65">
                    {t("home.sections.work.view")}{" "}
                    <span class="i-mdi-arrow-top-right ml-1 inline-block" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section class="border-t-2 border-primary-600 py-20">
          <div class="grid items-center gap-8 rounded-3xl border-2 border-primary-600 bg-[radial-gradient(ellipse_at_90%_20%,var(--rl-secondary-800),transparent_45%),rgba(255,255,255,.02)] p-8 md:grid-cols-[1fr_auto] md:p-12">
            <div>
              <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                PACKAGES
              </p>
              <h2 class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
                My packages
              </h2>
              <h3 class="text-3xl font-semibold leading-snug">NPM</h3>
              <p class="mt-3 max-w-xl text-sm leading-relaxed text-neutral-950/50">
                {t("home.sections.packages.description")}
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                {packages.map((name) => (
                  <span class="rounded-full border border-primary-500 px-3 py-2 text-[0.7rem] font-medium text-neutral-950">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="https://www.npmjs.com/search?q=%40rimelight"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-400/30 px-5 py-3 text-sm text-primary-100 transition hover:bg-primary-400/10"
            >
              {t("home.sections.packages.explore")} <span class="i-mdi-arrow-top-right" />
            </a>
          </div>
        </section>

        <section id="blog" class="scroll-mt-28 border-t-2 border-primary-600/40 py-20 md:py-24">
          <div class="grid gap-8 md:grid-cols-[.7fr_1.3fr]">
            <div>
              <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                {t("home.sections.blog.eyebrow")}
              </p>
              <h2 class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
                {t("app.header.nav.blog")}
              </h2>
              <h3 class="text-3xl font-semibold leading-snug">{t("home.sections.blog.title")}</h3>
              <p class="mt-4 text-sm leading-relaxed text-neutral-950/50">
                {t("home.sections.blog.description")}
              </p>
            </div>
            <div class="flex flex-col justify-center rounded-2xl border-2 border-dashed border-primary-600 bg-neutral-950/[.015] p-8">
              <span class="i-mdi-notebook-outline text-3xl text-primary-300" />
              <p class="mt-5 text-xl font-medium">{t("home.sections.blog.firstPost")}</p>
              <p class="mt-2 text-sm leading-6 text-neutral-950/40">
                {t("home.sections.blog.empty")}
              </p>
              <RLLink
                raw
                href="/blog"
                class="mt-5 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-primary-100"
              >
                {t("home.sections.blog.visit")} <span class="i-mdi-arrow-top-right" />
              </RLLink>
            </div>
          </div>
        </section>

        <section id="github" class="scroll-mt-28 border-t-2 border-primary-600/40 py-20 md:py-24">
          <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                {t("home.sections.activity.eyebrow")}
              </p>
              <h2 class="text-4xl font-bold tracking-tight">{t("home.sections.activity.title")}</h2>
              <p class="mt-2 text-sm text-neutral-950/50">
                {t("home.sections.activity.description")}
              </p>
            </div>
            <a
              href="https://github.com/MironescuOctavian"
              class="text-sm text-neutral-950/60 hover:text-primary-200"
            >
              @MironescuOctavian <span class="i-mdi-arrow-top-right ml-1 inline-block" />
            </a>
          </div>
          <div class="overflow-x-auto rounded-2xl border-2 border-primary-600 bg-[#17130b] p-5 sm:p-8">
            <img
              src="https://ghchart.rshah.org/ffbf00/MironescuOctavian"
              alt={t("home.sections.activity.calendarAlt")}
              loading="lazy"
              class="mx-auto min-w-[700px] max-w-full sepia-30"
            />
          </div>
        </section>

        <section id="contact" class="scroll-mt-28 border-t-2 border-primary-600/40 py-20 md:py-24">
          <div class="relative overflow-hidden rounded-3xl border border-primary-600/50 bg-[radial-gradient(ellipse_at_50%_0%,var(--rl-secondary-800),transparent_55%),var(--rl-neutral-50)] p-8 md:p-12">
            <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <div class="flex w-full flex-col items-center">
                <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
                  {t("home.sections.contact.eyebrow")}
                </p>
                <h2 class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
                  {t("app.header.nav.contact")}
                </h2>
                <h3 class="mx-auto max-w-2xl text-3xl font-semibold leading-snug md:text-4xl">
                  {t("home.sections.contact.title")}
                </h3>
                <p class="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-950/55">
                  {t("home.sections.contact.description")}
                </p>
                <div class="mt-8 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-neutral-950/80">
                  <a
                    href="mailto:omironescu@gmail.com"
                    class="flex items-center gap-3 hover:text-primary-200"
                  >
                    <span class="i-mdi-email-outline text-lg text-primary-300" />
                    omironescu@gmail.com
                  </a>
                  <a
                    href="https://wa.me/40729616906"
                    class="flex items-center gap-3 hover:text-primary-200"
                  >
                    <span class="i-mdi-whatsapp text-lg text-primary-300" />
                    WhatsApp · +40 729 616 906
                  </a>
                  <span class="flex items-center gap-3">
                    <span class="i-mdi-discord text-lg text-primary-300" />
                    Discord · octamusic
                  </span>
                </div>
              </div>
              <RLButton
                href="/contact"
                trailingIcon="i-mdi-arrow-top-right"
                color="primary"
                size="xl"
                class="mt-10 rounded-xl bg-primary-500 px-9 py-5 text-lg font-semibold text-black shadow-[0_8px_32px_var(--rl-primary-900)] transition hover:scale-[1.02] hover:bg-primary-400"
              >
                {t("home.sections.contact.action")}
              </RLButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
