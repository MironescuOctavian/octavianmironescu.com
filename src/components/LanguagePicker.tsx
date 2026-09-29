import { getRelativeLocaleUrl, locales } from "@rimelight/i18n"
import { useLocation } from "@solidjs/router"

const languageLabels: Record<string, string> = {
  "en": "English",
  "ro": "Română",
  "pt-br": "Português"
}

export default function LanguagePicker() {
  const location = useLocation()
  const currentPath = () => location.pathname.replace(/^\/[^/]+/, "") || "/"

  return (
    <ul>
      {locales.map((lang: string) => (
        <li>
          <a href={getRelativeLocaleUrl(lang, currentPath())}>{languageLabels[lang] || lang}</a>
        </li>
      ))}
    </ul>
  )
}
