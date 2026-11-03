import { type Component, createSignal, onSettled, For } from "solid-js";
import { RLHeader } from "@rimelight/ui/components/header/RLHeader.tsx";
import { RLNavigationMenu } from "@rimelight/ui/components/navigation-menu/RLNavigationMenu.tsx";
import { RLThemeSelector } from "@rimelight/ui/components/theme-selector/RLThemeSelector.tsx";
import { RLLocaleSelector } from "@rimelight/ui/components/locale-selector/RLLocaleSelector.tsx";
import { RLSlideover } from "@rimelight/ui/components/slideover/RLSlideover.tsx";
import { RLButton } from "@rimelight/ui/components/button/RLButton.tsx";
import { getLocaleUrl, t } from "@rimelight/i18n";

export interface AppHeaderProps {
  stackIndex?: number;
}

const sectionLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "skills" },
];

const headerNavItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#contact" },
];

export const AppHeader: Component<AppHeaderProps> = (props) => {
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
    <RLHeader
      contain={true}
      fixed={true}
      stackIndex={props.stackIndex ?? 50}
      class="border-b-2 border-primary-700 bg-neutral-50/95 text-neutral-950 backdrop-blur-xl"
      leadingSlot={
        <div class="flex items-center gap-4">
          <div
            class="scroll-progress pointer-events-none absolute inset-x-0 -bottom-[2px] h-[3px] bg-gradient-to-r from-primary-500 via-primary-400 to-amber-300 origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress()})` }}
            aria-hidden="true"
          />
          <a
            href={getLocaleUrl("/")}
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
        </div>
      }
      centerSlot={
        <RLNavigationMenu
          items={headerNavItems}
          aria-label="Main navigation"
          class="hidden min-w-0 flex-1 items-center justify-center lg:flex"
          ui={{
            root: () => "hidden min-w-0 flex-1 items-center justify-center lg:flex",
            list: () => "flex items-center justify-center gap-2 list-none m-0 p-0",
            link: () =>
              "rounded-full px-4 py-2 text-sm font-bold tracking-wide text-neutral-950/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-900/40 hover:text-primary-300 focus-visible:outline-2 focus-visible:outline-primary-300",
          }}
        />
      }
      trailingSlot={
        <div class="flex items-center gap-2.5 sm:gap-3">
          <a
            href={getLocaleUrl("/blog")}
            class="hidden md:inline-flex h-9 items-center justify-center rounded-full border border-primary-600/70 px-4 text-xs font-bold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/40 hover:text-primary-300 sm:text-sm"
          >
            {t("app.header.nav.blog")}
          </a>
          <a
            href={getLocaleUrl("/resume")}
            class="hidden md:inline-flex h-9 items-center justify-center rounded-full border border-primary-600/70 px-4 text-xs font-bold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/40 hover:text-primary-300 sm:text-sm"
          >
            {t("app.header.nav.resume")}
          </a>
          <a
            href={getLocaleUrl("/contact")}
            class="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-primary-500 px-4 text-xs font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-400 hover:shadow-[0_0_18px_var(--rl-primary-700)] sm:text-sm"
          >
            {t("app.header.nav.contact")}
          </a>

          <RLThemeSelector mode="icon" size="sm" color="primary" />
          <RLLocaleSelector
            mode="icon"
            size="sm"
            leadingIcon="i-lucide-languages"
            color="primary"
          />

          <div class="block lg:hidden">
            <RLSlideover
              side="right"
              title={t("app.header.menu.title") ?? "Navigation"}
              triggerSlot={
                <RLButton
                  color="neutral"
                  variant="ghost"
                  rounded={true}
                  leadingIcon="i-lucide-menu"
                  aria-label={t("app.header.menu.open") ?? "Open menu"}
                />
              }
            >
              {() => (
                <div class="flex flex-col gap-4 py-4">
                  <nav class="flex flex-col gap-2">
                    <For each={sectionLinks}>
                      {(link) => (
                        <a
                          href={getLocaleUrl(`/#${link.id}`)}
                          class="rounded-lg px-4 py-2.5 text-base font-semibold text-neutral-950 transition-colors hover:bg-primary-500/10 hover:text-primary-400"
                        >
                          {link.label}
                        </a>
                      )}
                    </For>
                    <hr class="my-2 border-primary-500/30" />
                    <a
                      href={getLocaleUrl("/blog")}
                      class="rounded-lg px-4 py-2.5 text-base font-semibold text-neutral-950 transition-colors hover:bg-primary-500/10 hover:text-primary-400"
                    >
                      {t("app.header.nav.blog")}
                    </a>
                    <a
                      href={getLocaleUrl("/resume")}
                      class="rounded-lg px-4 py-2.5 text-base font-semibold text-neutral-950 transition-colors hover:bg-primary-500/10 hover:text-primary-400"
                    >
                      {t("app.header.nav.resume")}
                    </a>
                    <a
                      href={getLocaleUrl("/contact")}
                      class="mt-2 rounded-lg bg-primary-500 px-4 py-2.5 text-center text-base font-bold text-black transition-all hover:bg-primary-400"
                    >
                      {t("app.header.nav.contact")}
                    </a>
                  </nav>
                </div>
              )}
            </RLSlideover>
          </div>
        </div>
      }
    />
  );
};

export default AppHeader;
