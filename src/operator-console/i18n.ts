import { I18n } from 'i18n-js'

export const i18n = new I18n()

export const loadTranslations = async locale => {
  const res = await fetch(`locales/${locale}.json`)
  const data = await res.json()
  i18n.store(data)
}

export const isValidLocale = locale => ['en', 'ja'].includes(locale)

export const DEFAULT_LOCALE = 'en'
