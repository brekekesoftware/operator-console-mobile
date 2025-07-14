import { I18n } from 'i18n-js'

import en from '../../src/assets/intl-en-oc.json'
import ja from '../../src/assets/intl-ja-oc.json'

export const i18n = new I18n()

i18n.translations = {
  en,
  ja,
}

export const isValidLocale = locale => ['en', 'ja'].includes(locale)

export const DEFAULT_LOCALE = 'en'
