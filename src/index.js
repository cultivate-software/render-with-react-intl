import { IntlProvider } from 'react-intl'

export const withMessages = (messages, locale = 'en', defaultLocale = 'en') => node =>
  <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>{node}</IntlProvider>

export const configureWithIntl = (translations, defaultLocale = 'en') => {
  if (typeof translations === 'function')
    return (locale = defaultLocale) => withMessages(translations(locale), locale, defaultLocale)

  if (typeof translations === 'object')
    return (locale = defaultLocale) => withMessages(translations[locale], locale, defaultLocale)

  throw new TypeError('Passed argument "translations" must be either' +
    ' an object mapping locales to messages' +
    ' or a function returning messages for a given local.')
}