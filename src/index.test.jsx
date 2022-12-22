import { screen } from '@testing-library/react'
import { render } from '@render-with/decorators'
import { FormattedMessage as T } from 'react-intl'
import { withMessages, configureWithIntl } from './index'

const TRANSLATIONS = {
  'en': {
    greeting: 'World',
  },
  'de': {
    greeting: 'Welt',
  },
}

const getMessagesForLocale = locale => TRANSLATIONS[locale]

describe('withMessages', () => {
  it('decorates component that requires messages using "en" as locale and default locale', () => {
    render(<T id='greeting' />, withMessages(TRANSLATIONS['en']))
    expect(screen.getByText('World')).toBeInTheDocument()
    expect(screen.queryByText('Welt')).not.toBeInTheDocument()
  })

  it('decorates component that requires messages using given locale and "en" as default locale', () => {
    render(<T id='greeting' />, withMessages(TRANSLATIONS['de'], 'de'))
    expect(screen.getByText('Welt')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })

  it('decorates component that requires messages using given locale and default locale', () => {
    render(<T id='greeting' />, withMessages(TRANSLATIONS['de'], 'de', 'de'))
    expect(screen.getByText('Welt')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })
})

describe('configureWithIntl', () => {
  it('creates withIntl decorator with translations using "en" as default locale', () => {
    const withIntl = configureWithIntl(TRANSLATIONS)
    render(<T id='greeting' />, withIntl())
    expect(screen.getByText('World')).toBeInTheDocument()
    expect(screen.queryByText('Welt')).not.toBeInTheDocument()
  })

  it('creates withIntl decorator with translations using given locale as default locale', () => {
    const withIntl = configureWithIntl(TRANSLATIONS, 'de')
    render(<T id='greeting' />, withIntl())
    expect(screen.getByText('Welt')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })

  it('creates withIntl decorator with translations using given locale', () => {
    const withIntl = configureWithIntl(TRANSLATIONS)
    render(<T id='greeting' />, withIntl('de'))
    expect(screen.getByText('Welt')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })

  it('creates withIntl decorator with function that returns messages using "en" as default locale', () => {
    const withIntl = configureWithIntl(getMessagesForLocale)
    render(<T id='greeting' />, withIntl())
    expect(screen.getByText('World')).toBeInTheDocument()
    expect(screen.queryByText('Welt')).not.toBeInTheDocument()
  })

  it('creates withIntl decorator with function that returns messages using given locale as default locale', () => {
    const withIntl = configureWithIntl(getMessagesForLocale, 'de')
    render(<T id='greeting' />, withIntl())
    expect(screen.getByText('Welt')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })

  it('creates withIntl decorator with function that returns messages using given locale', () => {
    const withIntl = configureWithIntl(getMessagesForLocale)
    render(<T id='greeting' />, withIntl('de'))
    expect(screen.getByText('Welt')).toBeInTheDocument()
    expect(screen.queryByText('World')).not.toBeInTheDocument()
  })

  it('throws error when translations is neither function nor object', () => {
    expect(() => configureWithIntl(undefined)).toThrow(/translations/i)
  })
})