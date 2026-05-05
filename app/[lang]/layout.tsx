import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { hasLocale } from './dictionaries'
import { notFound } from 'next/navigation'
import '@/app/tailwind.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
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
    <html
      lang={lang}
      className={`${geist.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-bg text-fg font-sans antialiased overflow-x-hidden leading-normal font-features-['ss01','cv11']">
        {children}
      </body>
    </html>
  )
}
