import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, locales } from '@/lib/i18n'
import '@/app/tailwind.css'

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  adjustFontFallback: false,
  variable: '--font-big-shoulders',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  title: 'Christian Fonseca — Full-stack developer',
  description: 'Full-stack developer building products that ship. Available for remote work.',
  openGraph: {
    title: 'Christian Fonseca — Full-stack developer',
    description: 'Full-stack developer building products that ship. Available for remote work.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Fonseca — Full-stack developer',
    description: 'Full-stack developer building products that ship. Available for remote work.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html lang={lang} className={`${bigShoulders.variable} ${plexMono.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
