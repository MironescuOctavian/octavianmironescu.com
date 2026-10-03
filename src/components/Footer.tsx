import { getLocale, getRelativeLocaleUrl, locales } from "@rimelight/i18n";
import { useLocation, useParams } from "@solidjs/router";

const languageLabels: Record<string, string> = {
  en: "English",
  ro: "Română",
  pt: "Português",
};

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

interface ThemeOption {
  label: string;
  value: string;
  icon: string;
}

interface LanguageOption {
  code: string;
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

const themeOptions: ThemeOption[] = [
  { label: "System", value: "system", icon: "i-lucide-laptop" },
  { label: "White", value: "white", icon: "i-mdi:white-balance-sunny" },
  { label: "Dark", value: "dark", icon: "i-mdi:weather-night" },
];

export default function Footer() {
  const today = new Date();
  const params = useParams<{ locale?: string }>();
  const location = useLocation();

  const activeLocale = () => params.locale || getLocale() || "en";
  const currentPath = () => location.pathname.replace(/^\/[^/]+/, "") || "/";

  const footerLinkColumns = (): FooterLinkColumn[] => [
    {
      title: "Resources",
      links: [
        {
          label: "Branding",
          href: getRelativeLocaleUrl(activeLocale(), "/branding"),
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          label: "Privacy Policy",
          href: getRelativeLocaleUrl(activeLocale(), "/privacy-policy"),
        },
        {
          label: "Other Documents",
          href: getRelativeLocaleUrl(activeLocale(), "/other-documents"),
        },
      ],
    },
  ];

  const languageOptions = (): LanguageOption[] =>
    locales.map((lang: string) => ({
      code: lang,
      label: languageLabels[lang] || lang,
      href: getRelativeLocaleUrl(lang, currentPath()),
    }));

  return (
    <footer class="w-full bg-black text-gray border-t border-green-900">
      <div class="px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Left Section: Logo, Tagline, Copyright */}
        <div class="flex flex-col gap-3 items-center md:items-start text-center md:text-left order-last md:order-1">
          <a
            href={getRelativeLocaleUrl(activeLocale(), "/")}
            class="inline-flex items-center"
            aria-label="Astro Home"
          >
            <svg
              class="h-8 w-auto text-white"
              viewBox="0 0 512 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="astro-gradient" x1="0%" x2="116.842%" y1="91.269%" y2="41.115%">
                  <stop offset="0%" stop-color="#d83333" />
                  <stop offset="100%" stop-color="#f041ff" />
                </linearGradient>
              </defs>
              <path
                fill="currentColor"
                d="M34.698 114.618c-6.08-5.558-7.854-17.234-5.321-25.693c4.391 5.333 10.476 7.023 16.78 7.976c9.73 1.472 19.286.922 28.325-3.526c1.034-.509 1.99-1.187 3.12-1.872c.847 2.46 1.068 4.944.772 7.473c-.72 6.158-3.785 10.915-8.659 14.52c-1.949 1.442-4.01 2.731-6.024 4.092c-6.184 4.178-7.857 9.08-5.533 16.208c.055.174.105.348.23.772c-3.158-1.413-5.464-3.47-7.221-6.176c-1.856-2.855-2.74-6.014-2.786-9.43c-.023-1.663-.023-3.342-.247-4.98c-.546-3.997-2.422-5.787-5.957-5.89c-3.628-.106-6.498 2.136-7.259 5.669c-.058.27-.142.538-.226.853z"
              />
              <path
                fill="url(#astro-gradient)"
                d="M34.698 114.618c-6.08-5.558-7.854-17.234-5.321-25.693c4.391 5.333 10.476 7.023 16.78 7.976c9.73 1.472 19.286.922 28.325-3.526c1.034-.509 1.99-1.187 3.12-1.872c.847 2.46 1.068 4.944.772 7.473c-.72 6.158-3.785 10.915-8.659 14.52c-1.949 1.442-4.01 2.731-6.024 4.092c-6.184 4.178-7.857 9.08-5.533 16.208c.055.174.105.348.23.772c-3.158-1.413-5.464-3.47-7.221-6.176c-1.856-2.855-2.74-6.014-2.786-9.43c-.023-1.663-.023-3.342-.247-4.98c-.546-3.997-2.422-5.787-5.957-5.89c-3.628-.106-6.498 2.136-7.259 5.669c-.058.27-.142.538-.226.853z"
              />
            </svg>
          </a>
          <p class="text-sm text-white font-medium">Never stop searching.</p>
          <p class="text-xs text-gray">© {today.getFullYear()} octavianmironescu.com</p>
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
          <div class="relative inline-flex items-center">
            <span
              id="theme-select-icon"
              class="absolute left-3 text-green-600 i-lucide-laptop size-4"
            />
            <select
              id="theme-select"
              aria-label="Theme selector"
              class="cursor-pointer appearance-auto rounded-lg border border-green-900 bg-black py-1.5 pl-9 pr-8 text-sm font-medium text-gray hover:text-white hover:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 transition-colors"
            >
              {themeOptions.map((option) => (
                <option
                  value={option.value}
                  class="bg-black text-gray"
                  selected={option.value === "system"}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <span class="pointer-events-none absolute right-2.5 text-gray i-lucide-chevron-down size-4" />
          </div>

          <div class="relative inline-flex items-center">
            <span class="pointer-events-none absolute left-3 text-green-600 i-mdi-translate size-4" />
            <select
              id="footer-language-select"
              aria-label="Language selector"
              onChange={(e) => {
                window.location.href = e.currentTarget.value;
              }}
              class="cursor-pointer appearance-none rounded-lg border border-green-900 bg-black py-1.5 pl-9 pr-8 text-sm font-medium text-gray hover:text-white hover:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 transition-colors"
            >
              {languageOptions().map((option) => (
                <option
                  value={option.href}
                  selected={option.code === activeLocale()}
                  class="bg-black text-gray"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <span class="pointer-events-none absolute right-2.5 text-gray i-lucide-chevron-down size-4" />
          </div>

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
