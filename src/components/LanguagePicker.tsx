import { getRelativeLocaleUrl, getLocales } from "@rimelight/i18n";
import { useLocation } from "@solidjs/router";

const languageLabels: Record<string, string> = {
  en: "English",
  ro: "Română",
  pt: "Português",
};

export default function LanguagePicker() {
  const location = useLocation();
  const currentPath = () => location.pathname.replace(/^\/[^/]+/, "") || "/";

  return (
    <ul>
      {getLocales().map((lang: string) => (
        <li>
          <a href={getRelativeLocaleUrl(currentPath(), { locale: lang })}>
            {languageLabels[lang] || lang}
          </a>
        </li>
      ))}
    </ul>
  );
}
