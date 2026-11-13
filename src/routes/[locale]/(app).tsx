import CodeAtmosphere from "#components/app/CodeAtmosphere";
import type { RouteSectionProps } from "@solidjs/router";
import { onSettled } from "solid-js";
import AppHeader from "#components/app/AppHeader";
import AppSidebar from "#components/app/AppSidebar";
import AppFooter from "#components/app/AppFooter";
import { RLMain } from "@rimelight/ui/components/main/RLMain.tsx";
import { RLScrollToTop } from "@rimelight/ui/components/scroll-to-top/RLScrollToTop.tsx";
import { RLShortcuts } from "@rimelight/ui/components/shortcuts/RLShortcuts.tsx";
import { RLToaster } from "@rimelight/ui/components/toaster/RLToaster.tsx";
import { RLRouteAnnouncer } from "@rimelight/ui/components/route-announcer/RLRouteAnnouncer.tsx";
import { RLLayoutGrid } from "@rimelight/ui/components/layout-grid/RLLayoutGrid.tsx";

// Primary application route layout wrapping header, footer, and ambient backdrop.
export default function AppRouteLayout(props: RouteSectionProps) {
  onSettled(() => {
    const normalizePath = (p: string) => p.replace(/\/+$/, "") || "/";

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      )
        return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        normalizePath(url.pathname) !== normalizePath(window.location.pathname)
      )
        return;

      const id = decodeURIComponent(url.hash.slice(1));
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      event.stopPropagation();
      history.pushState(window.history.state, "", url.hash);
      section.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  });

  return (
    <div class="isolate flex flex-col min-h-screen">
      <div class="site-atmosphere" aria-hidden="true">
        <div class="site-atmosphere-grid" />
        <div class="site-atmosphere-aurora" />
        <div class="site-atmosphere-orbits">
          <span />
          <span />
          <span />
        </div>
        <div class="site-atmosphere-stars" />
        <CodeAtmosphere />
      </div>
      <AppHeader />
      <div class="flex flex-1 pt-[var(--rl-header-height,4rem)] md:pt-[var(--rl-header-height,4.5rem)]">
        <AppSidebar />
        <RLMain class="min-w-0 !pt-0 !min-h-[calc(100vh-var(--rl-header-height,4.5rem))]">
          {props.children}
        </RLMain>
      </div>
      <AppFooter />
      <RLScrollToTop />
      <RLShortcuts />
      <RLToaster />
      <RLRouteAnnouncer />
      <RLLayoutGrid />
    </div>
  );
}
