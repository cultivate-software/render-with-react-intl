import { Decorator } from '@render-with/decorators'

export type Messages = { [id: string]: string }

export type Translations = { [locale: string]: Messages }

export type getMessagesForLocale = (locale: string) => Messages

export type withIntl = (locale?: string) => Decorator

export function withMessages(messages: Messages, locale?: string, defaultLocale?: string): Decorator

export function configureWithIntl(translations: Translations | getMessagesForLocale, defaultLocale?: string): withIntl