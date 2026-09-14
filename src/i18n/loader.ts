import { createTranslationLoader } from "@rimelight/i18n"
import en from "#translations/en.json"
import ro from "#translations/ro.json"
import ptBr from "#translations/pt-br.json"

export default createTranslationLoader({ en, ro, "pt-br": ptBr })
