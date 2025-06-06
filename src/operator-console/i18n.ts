import { I18n } from 'i18n-js'
import * as RNLocalize from 'react-native-localize'

import en from '../../src/assets/intl-en-oc.json'
import ja from '../../src/assets/intl-ja-oc.json'

export const i18n = new I18n()

i18n.translations = {
  en,
  ja,
}

// export const loadTranslations = async locale => {
//   // const res = await fetch(`locales/${locale}.json`)
//   // const data = await res.json()
//   i18n.store(data)
// }

export const isValidLocale = locale => ['en', 'ja'].includes(locale)

export const DEFAULT_LOCALE = 'en'
