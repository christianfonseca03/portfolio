import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stack from '@/components/Stack'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'
import MouseGlowHandler from '@/components/MouseGlowHandler'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <RevealObserver />
      <MouseGlowHandler />
      <Header lang={lang} t={dict} />
      <main>
        <Hero t={dict.hero} />
        <About t={dict.about} />
        <Stack t={dict.stack} />
        <Projects t={dict.projects} lang={lang} />
        <Education t={dict.education} lang={lang} />
        <Contact t={dict.contact} />
      </main>
      <Footer t={dict.footer} easterT={dict.easter} />
    </>
  )
}
