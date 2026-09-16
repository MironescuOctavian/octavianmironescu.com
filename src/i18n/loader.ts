import { createTranslationLoader } from "@rimelight/i18n"
import en from "#i18n/en.json"
import ro from "#i18n/ro.json"
import ptBr from "#i18n/pt-br.json"

export default createTranslationLoader({ en, ro, "pt-br": ptBr })
