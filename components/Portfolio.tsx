'use client'

import { useCallback, useEffect, useState } from 'react'
import { COPY, type Locale } from '@/lib/i18n'
import { SECTIONS, type SectionId } from '@/lib/data'
import { useEdition, useReducedMotion } from '@/lib/hooks'
import Header from './Header'
import Boot from './Boot'
import Marquee from './Marquee'
import Protocol from './Protocol'
import Stack from './Stack'
import Work from './Work'
import BuildLog from './BuildLog'
import Blog from './Blog'
import Connect from './Connect'
import Footer from './Footer'
import Menu from './Menu'
import Sheet, { type SheetContent } from './Sheet'

export type NavHandler = (id: SectionId) => (e?: React.MouseEvent) => void

export default function Portfolio({ initialLang }: { initialLang: Locale }) {
  const [lang, setLangState] = useState(initialLang)
  const [menu, setMenu] = useState(false)
  const [sheet, setSheet] = useState<SheetContent | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [cur, setCur] = useState(0)
  const [seen, setSeen] = useState<Partial<Record<SectionId, boolean>>>({})
  const reduce = useReducedMotion()
  const edition = useEdition()
  const c = COPY[lang]

  // Seção atual (topo < 40% da viewport) e seções reveladas (topo < 85%)
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const vh = window.innerHeight
      let current = 0
      const visible: SectionId[] = []
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top
        if (top < vh * 0.4) current = i
        if (top < vh * 0.85) visible.push(id)
      })
      setCur(current)
      setSeen((s) => (visible.every((id) => s[id]) ? s : { ...s, ...Object.fromEntries(visible.map((id) => [id, true])) }))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Trava o scroll da página com menu ou sheet abertos
  useEffect(() => {
    if (!menu && !sheetOpen) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenu(false)
      setSheetOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menu, sheetOpen])

  const go = useCallback((id: SectionId) => {
    setMenu(false)
    document.documentElement.style.overflow = ''
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({
      top: id === 'inicio' ? 0 : el.getBoundingClientRect().top + window.scrollY - 56,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [reduce])

  const nav: NavHandler = (id) => (e) => {
    e?.preventDefault()
    go(id)
  }

  const setLang = (l: Locale) => {
    setLangState(l)
    document.documentElement.lang = l
    document.cookie = `cf-lang=${l}; path=/; max-age=31536000; samesite=lax`
    window.history.replaceState(null, '', `/${l}${window.location.hash}`)
  }

  const openSheet = (content: SheetContent) => {
    setSheet(content)
    setSheetOpen(true)
  }

  const revealed = (id: SectionId) => reduce || !!seen[id]

  return (
    <div className="pal-red cb-root min-h-screen font-mono text-ink">
      <div className="relative min-h-screen overflow-clip bg-bg">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-90 bg-scanlines" />

        <Header c={c} menuOpen={menu} onMenu={() => setMenu((m) => !m)} nav={nav} />

        <main>
          <Boot c={c} edition={edition} reduce={reduce} onWork={nav('work')} onConnect={nav('conexao')} />
          <Marquee words={c.marquee} reduce={reduce} />
          <Protocol c={c} revealed={revealed('protocolo')} />
          <Stack c={c} revealed={revealed('stack')} />
          <Work c={c} lang={lang} revealed={revealed('work')} onOpen={(i) => openSheet({ type: 'work', i })} />
          <BuildLog c={c} lang={lang} revealed={revealed('log')} />
          <Blog c={c} lang={lang} revealed={revealed('blog')} onOpen={(i) => openSheet({ type: 'post', i })} />
          <Connect c={c} revealed={revealed('conexao')} />
        </main>

        <Footer c={c} nav={nav} />

        <Menu
          c={c}
          open={menu}
          cur={cur}
          lang={lang}
          nav={nav}
          onClose={() => setMenu(false)}
          onLang={setLang}
        />
        <Sheet
          c={c}
          lang={lang}
          content={sheet}
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onChange={setSheet}
        />
      </div>
    </div>
  )
}
