import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import Portfolio from '@/components/Portfolio'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return <Portfolio initialLang={lang} />
}
