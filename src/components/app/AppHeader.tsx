import { createSignal, onSettled, type Component } from "solid-js";
import { getLocaleUrl, t } from "@rimelight/i18n";
import { RLLocaleSelector, RLThemeSelector } from "@rimelight/ui";
import { languages } from "#components/app/languages";

export interface AppHeaderProps {
  stackIndex?: number;
}

const sectionLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "skills" },
];

export const AppHeader: Component<AppHeaderProps> = (props) => {
  const indexUrl = () => getLocaleUrl("/");
  const [scrollProgress, setScrollProgress] = createSignal(0);

  onSettled(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollHeight)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  });

  return (
    <header
      class="site-header fixed inset-x-0 top-0 z-50 border-b-2 border-primary-700 bg-neutral-50/95 text-neutral-950 backdrop-blur-xl"
      style={{ "z-index": String(props.stackIndex ?? 50) }}
    >
      <div
        class="scroll-progress pointer-events-none absolute inset-x-0 -bottom-[2px] h-[3px] bg-gradient-to-r from-primary-500 via-primary-400 to-amber-300 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress()})` }}
        aria-hidden="true"
      />
      <style>{`
        .site-header .rl-select [data-slot="leading"],
        .site-footer .rl-select [data-slot="leading"] { 
          color: var(--rl-primary-400); 
          margin: 0 auto;
        }
        .site-header .rl-select[data-variant="icon"] [data-slot="icon"],
        .site-footer .rl-select[data-variant="icon"] [data-slot="icon"] {
          width: 1.25rem;
          height: 1.25rem;
        }
        .site-header .rl-select[data-variant="icon"] [data-slot="select"],
        .site-footer .rl-select[data-variant="icon"] [data-slot="select"] {
          padding: 0 !important;
          height: 2.5rem !important;
          width: 3rem !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .site-header .rl-select::picker-icon,
        .site-footer .rl-select::picker-icon {
          color: var(--rl-primary-400);
          font-size: 1rem;
          margin-inline-start: 0.25rem;
          margin-inline-end: 0.2rem;
        }
        .site-header .rl-select[data-variant="icon"]::picker-icon,
        .site-footer .rl-select[data-variant="icon"]::picker-icon {
          font-size: 1rem;
          margin-inline: 0;
        }
      `}</style>
      <div class="mx-auto flex min-h-20 max-w-[90rem] items-center justify-between gap-4 px-5 py-4 sm:px-8 xl:gap-10 xl:px-10">
        <a
          href={indexUrl()}
          class="group flex shrink-0 items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"
          aria-label="Octavian Mironescu home"
        >
          <span
            class="i-lucide-code-xml size-7 shrink-0 text-primary-400 transition-colors group-hover:text-primary-200 sm:size-8"
            aria-hidden="true"
          />
          <span class="whitespace-nowrap text-sm font-bold tracking-wide text-neutral-950 transition-colors group-hover:text-primary-300 sm:text-base lg:text-lg">
            Mironescu Octavian<span class="text-primary-300">.</span>
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          class="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex"
        >
          {sectionLinks.map((link) => (
            <a
              href={`${indexUrl()}#${link.id}`}
              class="rounded-full px-4 py-2.5 text-sm font-bold tracking-wide text-neutral-950/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-900/60 hover:text-primary-300 focus-visible:outline-2 focus-visible:outline-primary-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div class="ml-auto flex shrink-0 items-center gap-2.5 lg:ml-0 xl:gap-3">
          <a
            href={getLocaleUrl("/blog")}
            class="inline-flex h-10 items-center justify-center rounded-full border border-primary-600/70 px-4 text-xs font-bold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/40 hover:text-primary-300 sm:px-5 sm:text-sm"
          >
            {t("app.header.nav.blog")}
          </a>
          <a
            href={getLocaleUrl("/resume")}
            class="inline-flex h-10 items-center justify-center rounded-full border border-primary-600/70 px-4 text-xs font-bold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/40 hover:text-primary-300 sm:px-5 sm:text-sm"
          >
            {t("app.header.nav.resume")}
          </a>
          <a
            href={getLocaleUrl("/contact")}
            class="inline-flex h-10 items-center justify-center rounded-full bg-primary-500 px-4 text-xs font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-400 hover:shadow-[0_0_18px_var(--rl-primary-700)] sm:px-5 sm:text-sm"
          >
            {t("app.header.nav.contact")}
          </a>
          <RLThemeSelector
            mode="icon"
            size="sm"
            class="[&_.rl-select]:!h-10 [&_.rl-select]:!w-12 [&_.rl-select]:!p-0 [&_.rl-select]:!flex [&_.rl-select]:!items-center [&_.rl-select]:!justify-center [&_.rl-select]:!border-primary-500 [&_.rl-select]:!rounded-full hover:[&_.rl-select]:!border-primary-300"
            ui={{
              select:
                "!border-primary-700 !bg-primary-950/30 !text-neutral-950 hover:!border-primary-400 hover:!bg-primary-900/50",
            }}
          />
          <RLLocaleSelector
            locales={languages}
            mode="icon"
            size="sm"
            leadingIcon="i-lucide-languages"
            class="[&_.rl-select]:!h-10 [&_.rl-select]:!w-12 [&_.rl-select]:!p-0 [&_.rl-select]:!flex [&_.rl-select]:!items-center [&_.rl-select]:!justify-center [&_.rl-select]:!border-primary-500 [&_.rl-select]:!rounded-full hover:[&_.rl-select]:!border-primary-300"
            ui={{
              select:
                "!border-primary-700 !bg-primary-950/30 !text-neutral-950 hover:!border-primary-400 hover:!bg-primary-900/50",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
