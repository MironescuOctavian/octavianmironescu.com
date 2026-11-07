import type { RouteSectionProps } from "@solidjs/router";
import { onSettled } from "solid-js";
import AppHeader from "#components/app/AppHeader";
import AppFooter from "#components/app/AppFooter";
import { RLMain } from "@rimelight/ui/components/main/RLMain.tsx";
import { RLScrollToTop } from "@rimelight/ui/components/scroll-to-top/RLScrollToTop.tsx";
import { RLShortcuts } from "@rimelight/ui/components/shortcuts/RLShortcuts.tsx";
import { RLToaster } from "@rimelight/ui/components/toaster/RLToaster.tsx";
import { RLRouteAnnouncer } from "@rimelight/ui/components/route-announcer/RLRouteAnnouncer.tsx";
import { RLLayoutGrid } from "@rimelight/ui/components/layout-grid/RLLayoutGrid.tsx";

export default function AppRouteLayout(props: RouteSectionProps) {
  onSettled(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname)
        return;

      const id = decodeURIComponent(url.hash.slice(1));
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      section.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  });

  return (
    <div class="isolate flex flex-col min-h-screen">
      <AppHeader />
      <RLMain>{props.children}</RLMain>
      <AppFooter />
      <RLScrollToTop />
      <RLShortcuts />
      <RLToaster />
      <RLRouteAnnouncer />
      <RLLayoutGrid />
    </div>
  );
}
