import { getLocaleUrl, t } from "@rimelight/i18n";
import { RLLogo, RLThemeSelector, RLLocaleSelector } from "@rimelight/ui";

interface SocialLink {
  icon: string;
  href: string;
  ariaLabel: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkColumn {
  title: string;
  links: FooterLink[];
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
  const footerLinkColumns = (): FooterLinkColumn[] => [
    {
      title: t("app.text.legal"),
      links: [
        {
          label: t("app.text.privacy-policy"),
          href: getLocaleUrl("/legal/privacy-policy"),
        },
        {
          label: t("app.text.other-documents"),
          href: getLocaleUrl("/legal"),
        },
      ],
    },
  ];

  return (
    <footer class="w-full bg-black text-gray border-t border-green-900">
      <div class="px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Left Section: Logo, Tagline, Copyright */}
        <div class="flex flex-col gap-3 items-center md:items-start text-center md:text-left order-last md:order-1">
          <RLLogo variant="logotype" class="h-8 w-auto" mode="white" />
          <p class="text-sm text-white font-medium">{t("app.footer.tagline")}</p>
          <p class="text-xs text-gray">© {new Date().getFullYear()} octavianmironescu.com</p>
        </div>

        {/* Center Section: Resources & Legal */}
        <div class="flex flex-col md:flex-row items-center md:items-start gap-12 text-sm order-2 md:order-2">
          {footerLinkColumns().map((column) => (
            <div class="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
              <h2 class="font-bold text-white text-base m-0">{column.title}</h2>
              <div class="flex flex-col gap-2 items-center md:items-start">
                {column.links.map((link) => (
                  <a href={link.href} class="text-gray hover:text-white transition-colors block">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div class="flex flex-col items-center md:items-end gap-4 order-first md:order-3">
          <RLThemeSelector class="min-w-44" />
          <RLLocaleSelector class="min-w-44" />

          <ul class="flex flex-row items-center gap-4 list-none p-0 m-0 mt-1">
            {socialLinks.map((socialLink) => (
              <li aria-label={socialLink.ariaLabel}>
                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.ariaLabel}
                  class="flex items-center justify-center text-gray hover:text-white transition-colors"
                >
                  <span class={`text-xl ${socialLink.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
