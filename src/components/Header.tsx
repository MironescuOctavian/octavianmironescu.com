import { t, getRelativeLocaleUrl } from "@rimelight/i18n";
import { RLButton, RLHeader, RLNavigationMenu } from "@rimelight/ui";

export default function Header() {
  const homeURL = getRelativeLocaleUrl("/");
  const blogURL = getRelativeLocaleUrl("/blog");
  const resumeURL = getRelativeLocaleUrl("/resume");
  const legalURL = getRelativeLocaleUrl("/legal");
  const aboutURL = getRelativeLocaleUrl("/about");

  const items = [
    { label: t("nav.home"), href: homeURL },
    { label: t("nav.blog"), description: "Blog stuff", href: blogURL },
    { label: t("nav.resume"), description: "Information about myself", href: resumeURL },
    { label: t("nav.legal"), description: "Legal Stuff", href: legalURL },
    { label: t("nav.about"), description: "Information about the website", href: aboutURL },
  ];

  return (
    <RLHeader
      hideOnScroll={true}
      fixed={true}
      left={
        <h2 class="m-0 text-sm sm:text-base md:text-lg">
          <a href="/" class="no-underline">
            Octavian Mironescu
          </a>
        </h2>
      }
      center={
        <div class="internal-links flex items-center">
          <RLNavigationMenu items={items} />
        </div>
      }
      right={
        <div class="social-links flex max-sm:hidden">
          <RLButton
            href="https://m.webtoo.ls/@astro"
            leadingIcon="i-logos-astro-icon"
            variant="ghost"
            size="xl"
          />
          <RLButton
            href="https://twitter.com/astrodotbuild"
            leadingIcon="i-logos-x"
            variant="ghost"
            size="xl"
          />
          <RLButton
            href="https://github.com/withastro/astro"
            leadingIcon="i-logos-github-icon"
            variant="ghost"
            size="xl"
          />
        </div>
      }
    />
  );
}
