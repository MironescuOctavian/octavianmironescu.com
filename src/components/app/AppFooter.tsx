import { getLocaleUrl, t } from "@rimelight/i18n";
import { RLThemeSelector, RLLocaleSelector } from "@rimelight/ui";
import { languages } from "#components/app/languages";

interface SocialLink {
  icon: string;
  href: string;
  ariaLabel: string;
}

interface ContactLink {
  icon: string;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: "i-mdi-instagram",
    href: "https://www.instagram.com/notoctamusic/",
    ariaLabel: "Instagram",
  },
  {
    icon: "i-mdi-discord",
    href: "https://discord.com/users/402152425756295178",
    ariaLabel: "Discord",
  },
  {
    icon: "i-mdi-spotify",
    href: "https://open.spotify.com/user/goldydalion?si=598f3277e5b54442",
    ariaLabel: "Spotify",
  },
  {
    icon: "i-mdi-github",
    href: "https://github.com/MironescuOctavian",
    ariaLabel: "GitHub",
  },
  {
    icon: "i-mdi-linkedin",
    href: "https://www.linkedin.com/in/octavian-mironescu-a605b921a/",
    ariaLabel: "LinkedIn",
  },
];

export default function Footer() {
  const contactLinks = (): ContactLink[] => [
    {
      icon: "i-mdi-message-text-outline",
      label: t("home.sections.contact.action"),
      href: getLocaleUrl("/contact"),
    },
    {
      icon: "i-mdi-email-outline",
      label: "omironescu@gmail.com",
      href: "mailto:omironescu@gmail.com",
    },
    {
      icon: "i-mdi-whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/40729616906",
    },
  ];

  return (
    <footer class="site-footer w-full border-t-2 border-primary-700 bg-neutral-50 text-neutral-950">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 md:flex-row md:items-start md:gap-14 lg:px-10 lg:py-20">
        {/* Left Section: Logo, Tagline, Copyright */}
        <div class="order-last flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:text-left">
          <a
            href={getLocaleUrl("/")}
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
          </a>
          <p class="text-sm text-neutral-950 font-medium">{t("app.footer.tagline")}</p>
          <p class="text-xs text-neutral-950/55">
            © {new Date().getFullYear()} octavianmironescu.com
          </p>
        </div>

        {/* Center Section: Contact, Legal & Spotify */}
        <div class="order-2 flex flex-col items-center gap-10 md:order-2 md:flex-row md:items-start md:gap-12">
          {/* Contact */}
          <div class="flex flex-col items-center gap-4 md:items-start">
            <h2 class="m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
              <span class="i-mdi-send-outline size-4 shrink-0" aria-hidden="true" />
              {t("app.header.nav.contact")}
            </h2>
            <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
              {contactLinks().map((link) => (
                <li>
                  <a
                    href={link.href}
                    class="group flex items-center justify-center gap-2.5 text-sm font-medium text-neutral-950/80 transition-colors duration-300 hover:text-primary-300 md:justify-start"
                  >
                    <span
                      class={`inline-block size-4 shrink-0 text-primary-400 transition-colors group-hover:text-primary-200 ${link.icon}`}
                      aria-hidden="true"
                    />
                    <span class="min-w-0 break-words">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div class="flex flex-col items-center gap-4 md:items-start">
            <h2 class="m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
              <span class="i-mdi-shield-check-outline size-4 shrink-0" aria-hidden="true" />
              {t("app.text.legal")}
            </h2>
            <a
              href={getLocaleUrl("/legal/privacy-policy")}
              class="group flex items-center justify-center gap-2.5 text-sm font-medium text-neutral-950/80 transition-colors duration-300 hover:text-primary-300 md:justify-start"
            >
              <span
                class="i-mdi-file-document-outline size-4 shrink-0 text-primary-400 transition-colors group-hover:text-primary-200"
                aria-hidden="true"
              />
              <span>{t("app.text.privacy-policy")}</span>
            </a>
          </div>

          {/* Spotify On Repeat Widget */}
          <div class="flex w-full max-w-[280px] flex-col gap-3">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
              <span class="i-mdi-spotify size-4 shrink-0 text-[#1DB954]" aria-hidden="true" />
              <span>On Repeat</span>
            </div>
            <div class="overflow-hidden rounded-xl border-2 border-primary-500 bg-neutral-950 shadow-md shadow-primary-950/20">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1EpjyopqzLdRBI?utm_source=generator&theme=0"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                class="block w-full border-0"
                title="Spotify On Repeat Playlist"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div class="order-first flex flex-col items-center gap-5 md:order-3 md:items-end">
          <div class="flex items-center gap-3">
            <RLThemeSelector
              mode="icon"
              size="sm"
              class="[&_.rl-select]:!h-10 [&_.rl-select]:!w-12 [&_.rl-select]:!p-0 [&_.rl-select]:!flex [&_.rl-select]:!items-center [&_.rl-select]:!justify-center [&_.rl-select]:!border-primary-500 [&_.rl-select]:!rounded-full hover:[&_.rl-select]:!border-primary-300"
              ui={{
                select:
                  "!border-primary-700 !bg-primary-950/30 !text-neutral-950 hover:!border-primary-400",
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
                  "!border-primary-700 !bg-primary-950/30 !text-neutral-950 hover:!border-primary-400",
              }}
            />
          </div>

          <ul class="m-0 mt-2 flex list-none flex-row items-center gap-3 p-0">
            {socialLinks.map((socialLink) => (
              <li aria-label={socialLink.ariaLabel}>
                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.ariaLabel}
                  class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary-700 bg-primary-950/30 text-primary-400 transition-colors hover:border-primary-400 hover:bg-primary-900/50 hover:text-primary-200"
                >
                  <span
                    class={`inline-block size-4.5 shrink-0 ${socialLink.icon}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
