import { t } from "@rimelight/i18n";
import {
  RLThemeSelector,
  RLLocaleSelector,
  RLLink,
  RLLinkGroup,
  type RLLinkProps,
} from "@rimelight/ui";
import { SocialLinks } from "./SocialLinks";

export default function AppFooter() {
  const exploreLinks = (): RLLinkProps[] => [
    {
      label: t("app.header.nav.home") ?? "Home",
      href: "/",
      leadingIcon: "i-mdi-home-outline",
    },
    {
      label: t("app.header.nav.blog") ?? "Blog",
      href: "/blog",
      leadingIcon: "i-mdi-post-outline",
    },
    {
      label: t("app.header.nav.resume") ?? "Resume",
      href: "/resume",
      leadingIcon: "i-mdi-file-account-outline",
    },
  ];

  const contactLinks = (): RLLinkProps[] => [
    {
      label: t("home.sections.contact.action") ?? "Contact Form",
      href: "/contact",
      leadingIcon: "i-mdi-message-text-outline",
    },
    {
      label: "omironescu@gmail.com",
      href: "mailto:omironescu@gmail.com",
      leadingIcon: "i-mdi-email-outline",
      external: true,
      noExternalIcon: true,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/40729616906",
      leadingIcon: "i-mdi-whatsapp",
      target: "_blank",
      rel: "noopener noreferrer",
      external: true,
      noExternalIcon: true,
    },
  ];

  const legalLinks = (): RLLinkProps[] => [
    {
      label: t("app.text.privacy-policy") ?? "Privacy Policy",
      href: "/legal/privacy-policy",
      leadingIcon: "i-mdi-file-document-outline",
    },
  ];

  const footerLinkGroupUi = {
    root: () => "flex flex-col items-center gap-4 sm:items-start",
    title: () =>
      "m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-400 [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:text-primary-400",
    list: () => "m-0 flex list-none flex-col gap-2.5 p-0 items-center sm:items-start",
    link: () =>
      "group flex items-center justify-center gap-2.5 text-sm font-medium text-neutral-950/80 transition-colors duration-300 hover:text-primary-300 sm:justify-start [&_[data-slot=leading-icon]]:text-primary-400 group-hover:[&_[data-slot=leading-icon]]:text-primary-200",
  };

  return (
    <footer class="site-footer w-full border-t-2 border-primary-700 bg-neutral-50 text-neutral-950">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 md:flex-row md:items-stretch md:gap-14 lg:px-10 lg:py-20">
        {/* Left Section: Logo, Tagline, Copyright with justify-between & bottom-left placement */}
        <div class="order-last flex flex-col items-center justify-between gap-8 text-center md:order-1 md:self-stretch md:items-start md:text-left">
          <RLLink
            raw
            href="/"
            class="group inline-flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"
            aria-label="Octavian Mironescu home"
          >
            <span
              class="i-lucide-code-xml size-8 text-primary-400 transition-colors group-hover:text-primary-200"
              aria-hidden="true"
            />
            <span class="text-lg font-bold tracking-wide transition-colors group-hover:text-primary-300">
              Mironescu Octavian<span class="text-primary-300">.</span>
            </span>
          </RLLink>

          <div class="flex flex-col gap-1 items-center md:items-start">
            <p class="text-sm font-medium text-neutral-950/80">{t("app.footer.tagline")}</p>
            <p class="text-xs text-neutral-950/55">
              © {new Date().getFullYear()} octavianmironescu.com
            </p>
          </div>
        </div>

        {/* Center Section: Navigation Categories via RLLinkGroup */}
        <div class="order-2 flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-12 md:order-2">
          {/* Quick Links Category */}
          <RLLinkGroup
            label="Explore"
            leadingIcon="i-mdi-compass-outline"
            links={exploreLinks()}
            ui={footerLinkGroupUi}
          />

          {/* Contact Category */}
          <RLLinkGroup
            label={t("app.header.nav.contact") ?? "Contact"}
            leadingIcon="i-mdi-send-outline"
            links={contactLinks()}
            ui={footerLinkGroupUi}
          />

          {/* Legal Category */}
          <RLLinkGroup
            label={t("app.text.legal") ?? "Legal"}
            leadingIcon="i-mdi-shield-check-outline"
            links={legalLinks()}
            ui={footerLinkGroupUi}
          />
        </div>

        {/* Right Section: Theme/Locale Selectors & Social Links */}
        <div class="order-first flex flex-col items-center justify-between gap-8 md:order-3 md:self-stretch md:items-end">
          <div class="flex items-center gap-3">
            <RLThemeSelector mode="icon" size="sm" color="primary" />
            <RLLocaleSelector
              mode="icon"
              size="sm"
              leadingIcon="i-lucide-languages"
              color="primary"
            />
          </div>

          <SocialLinks class="mt-2" />
        </div>
      </div>
    </footer>
  );
}
