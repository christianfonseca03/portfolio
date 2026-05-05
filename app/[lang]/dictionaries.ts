import type en from '@/messages/en.json'

export type Dictionary = typeof en

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('@/messages/en.json').then((m) => m.default),
  pt: () => import('@/messages/pt.json').then((m) => m.default as Dictionary),
}

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
