import { type Component, createEffect, createSignal, For, onSettled, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { getLocaleUrl } from "@rimelight/i18n";
import { SOCIAL_LINKS } from "./SocialLinks";

export interface SidebarSection {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  { id: "about", label: "About", subtitle: "Story & background", icon: "i-lucide-user" },
  { id: "skills", label: "Skills", subtitle: "Stack & capabilities", icon: "i-lucide-sparkles" },
  {
    id: "projects",
    label: "Projects",
    subtitle: "Selected builds",
    icon: "i-lucide-folder-git-2",
  },
  { id: "contact", label: "Services", subtitle: "Work together", icon: "i-lucide-briefcase" },
];

export const AppSidebar: Component = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = createSignal(false);
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
      class={[
        "hidden lg:flex flex-col shrink-0 sticky top-[var(--rl-header-height,4.5rem)] self-start h-[calc(100vh-var(--rl-header-height,4.5rem))] border-r-2 border-primary-700/70 bg-neutral-50/85 text-neutral-950 backdrop-blur-xl transition-[width] duration-300 ease-out z-30",
        collapsed() ? "w-[4.5rem]" : "w-64",
      ]}
    >
      {/* Top header + collapse toggle */}
      <div
        class={[
          "flex items-center border-b border-primary-700/40 px-4 py-4",
          collapsed() ? "justify-center" : "justify-between",
        ]}
      >
        <Show when={!collapsed()}>
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              class="size-2 shrink-0 rounded-full bg-primary-400 shadow-[0_0_10px_var(--rl-primary-400)]"
              aria-hidden="true"
            />
            <span class="truncate text-[11px] font-bold uppercase tracking-[0.25em] text-primary-400">
              Sections
            </span>
          </div>
        </Show>

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed() ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed() ? "true" : "false"}
          title={collapsed() ? "Expand sidebar" : "Collapse sidebar"}
          class="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary-600/40 bg-neutral-100/80 text-neutral-950/75 transition-all duration-200 hover:border-primary-400 hover:bg-primary-900/40 hover:text-primary-300 focus-visible:outline-2 focus-visible:outline-primary-400"
        >
          <span
            class={[
              "inline-block size-4",
              collapsed() ? "i-lucide-panel-left-open" : "i-lucide-panel-left-close",
            ]}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Section links */}
      <nav aria-label="Home sections" class="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
        <For each={SIDEBAR_SECTIONS}>
          {(section) => {
            const isActive = () => activeId() === section.id;

            return (
              <a
                href={getLocaleUrl(`/#${section.id}`)}
                title={collapsed() ? section.label : undefined}
                aria-label={collapsed() ? section.label : undefined}
                aria-current={isActive() ? "location" : undefined}
                class={[
                  "group relative flex items-center rounded-xl border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary-400",
                  collapsed() ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
                  isActive()
                    ? "border-primary-500/70 bg-primary-500/12 text-neutral-950 shadow-[0_4px_16px_var(--rl-primary-950)]"
                    : "border-transparent text-neutral-950/75 hover:border-primary-600/40 hover:bg-primary-900/25 hover:text-neutral-950",
                ]}
              >
                <span
                  class={[
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200",
                    isActive()
                      ? "border-primary-400 bg-primary-500 text-black"
                      : "border-primary-600/35 bg-neutral-100 text-primary-400 group-hover:border-primary-400/70 group-hover:text-primary-300",
                  ]}
                >
                  <span class={`${section.icon} inline-block size-4`} aria-hidden="true" />
                </span>

                <Show when={!collapsed()}>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="truncate text-sm font-bold tracking-wide">{section.label}</span>
                      <span
                        class={[
                          "i-mdi-arrow-top-right inline-block size-3.5 shrink-0 transition-all duration-200",
                          isActive()
                            ? "text-primary-400 opacity-100"
                            : "text-primary-400 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100",
                        ]}
                        aria-hidden="true"
                      />
                    </div>
                    <p class="truncate text-[11px] text-neutral-950/50">{section.subtitle}</p>
                  </div>
                </Show>
              </a>
            );
          }}
        </For>
      </nav>

      {/* Bottom status & quick social links */}
      <div class="mt-auto border-t border-primary-700/40 p-3">
        <Show
          when={!collapsed()}
          fallback={
            <div class="flex flex-col items-center gap-2">
              <For
                each={SOCIAL_LINKS.filter(
                  (link) => link.ariaLabel === "GitHub" || link.ariaLabel === "LinkedIn",
                )}
              >
                {(link) => (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    title={link.ariaLabel}
                    class="flex size-9 items-center justify-center rounded-lg border border-primary-600/40 bg-neutral-100/80 text-primary-400 transition-colors hover:border-primary-400 hover:bg-primary-900/40 hover:text-primary-300"
                  >
                    <span class={`${link.icon} inline-block size-4`} aria-hidden="true" />
                  </a>
                )}
              </For>
            </div>
          }
        >
          <div class="rounded-xl border border-primary-600/40 bg-neutral-100/70 p-3">
            <div class="flex items-center gap-2 text-xs font-semibold text-neutral-950/85">
              <span
                class="size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]"
                aria-hidden="true"
              />
              <span class="truncate">Bucharest · EET</span>
            </div>
            <div class="mt-2.5 flex items-center gap-2">
              <For
                each={SOCIAL_LINKS.filter(
                  (link) => link.ariaLabel === "GitHub" || link.ariaLabel === "LinkedIn",
                )}
              >
                {(link) => (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary-600/35 bg-neutral-50/80 px-2.5 py-1.5 text-xs font-semibold text-neutral-950/80 transition-colors hover:border-primary-400 hover:bg-primary-900/35 hover:text-primary-300"
                  >
                    <span
                      class={`${link.icon} inline-block size-3.5 text-primary-400`}
                      aria-hidden="true"
                    />
                    <span>{link.ariaLabel}</span>
                  </a>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </aside>
  );
};

export default AppSidebar;
