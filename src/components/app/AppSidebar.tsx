import { type Component, createEffect, createSignal, For, onSettled } from "solid-js";
import { useLocation } from "@solidjs/router";
import { getLocaleUrl } from "@rimelight/i18n";

export interface SidebarSection {
  id: string;
  label: string;
  icon: string;
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  { id: "about", label: "About", icon: "i-lucide-user" },
  { id: "skills", label: "Skills", icon: "i-lucide-sparkles" },
  { id: "projects", label: "Projects", icon: "i-lucide-folder-git-2" },
  { id: "contact", label: "Services", icon: "i-lucide-briefcase" },
];

export const AppSidebar: Component = () => {
  const location = useLocation();
  const [activeId, setActiveId] = createSignal<string | null>(null);

  const updateActiveSection = () => {
    const sections = SIDEBAR_SECTIONS.map((s) => ({
      id: s.id,
      el: document.getElementById(s.id),
    })).filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

    if (sections.length === 0) {
      setActiveId(null);
      return;
    }

    const offset = 180;
    let current: string | null = null;
    for (const section of sections) {
      if (section.el.getBoundingClientRect().top <= offset) {
        current = section.id;
      }
    }
    setActiveId(current);
  };

  onSettled(() => {
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  });

  createEffect(
    () => location.pathname,
    () => {
      requestAnimationFrame(updateActiveSection);
    },
  );

  return (
    <aside
      aria-label="Section navigation"
      class="hidden xl:flex flex-col justify-center fixed left-[max(0.75rem,calc(50%-50.5rem))] top-[var(--rl-header-height,4.5rem)] h-[calc(100vh-var(--rl-header-height,4.5rem))] w-40 bg-transparent text-neutral-950 z-30 pointer-events-none"
    >
      <nav
        aria-label="Home sections"
        class="pointer-events-auto flex w-full flex-col items-stretch justify-center gap-1.5 rounded-2xl border border-primary-600/55 bg-black/65 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        <For each={SIDEBAR_SECTIONS}>
          {(section) => {
            const isActive = () => activeId() === section.id;

            return (
              <a
                href={getLocaleUrl(`/#${section.id}`)}
                aria-current={isActive() ? "location" : undefined}
                class={[
                  "group flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary-400",
                  isActive()
                    ? "border-primary-500/75 bg-neutral-100/90 text-neutral-950 shadow-[0_0_20px_var(--rl-primary-950)]"
                    : "border-transparent bg-transparent text-neutral-950/85 hover:border-primary-600/45 hover:bg-neutral-100/80 hover:text-neutral-950",
                ]}
              >
                <span
                  class={[
                    "flex size-7 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200",
                    isActive()
                      ? "border-primary-400 bg-primary-500 text-black"
                      : "border-primary-600/45 bg-neutral-100/90 text-primary-400 group-hover:border-primary-400/75 group-hover:text-primary-300",
                  ]}
                >
                  <span class={`${section.icon} inline-block size-3.5`} aria-hidden="true" />
                </span>
                <span class="truncate tracking-wide">{section.label}</span>
              </a>
            );
          }}
        </For>
      </nav>
    </aside>
  );
};

export default AppSidebar;
