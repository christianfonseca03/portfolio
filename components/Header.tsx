'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/app/[lang]/dictionaries'

const FlagUS = () => (
  <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
    <rect width="20" height="14" fill="#B22234" />
    <rect y="1.08"  width="20" height="1.08" fill="#fff" />
    <rect y="3.23"  width="20" height="1.08" fill="#fff" />
    <rect y="5.38"  width="20" height="1.08" fill="#fff" />
    <rect y="7.54"  width="20" height="1.08" fill="#fff" />
    <rect y="9.69"  width="20" height="1.08" fill="#fff" />
    <rect y="11.85" width="20" height="1.08" fill="#fff" />
    <rect width="8" height="7.54" fill="#3C3B6E" />
  </svg>
)

const FlagBR = () => (
  <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
    <rect width="20" height="14" fill="#009C3B" />
    <polygon points="10,1.4 18.6,7 10,12.6 1.4,7" fill="#FFDF00" />
    <circle cx="10" cy="7" r="3.2" fill="#002776" />
    <rect x="6.8" y="6.5" width="6.4" height="1" fill="white" rx="0.5" />
  </svg>
)

type Props = {
  lang: string
  t: Dictionary
}

export default function Header({ lang, t }: Props) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navLinks = [
    { label: t.nav.about,     href: '#about'     },
    { label: t.nav.stack,     href: '#stack'     },
    { label: t.nav.projects,  href: '#projects'  },
    { label: t.nav.education, href: '#education' },
    { label: t.nav.contact,   href: '#contact'   },
  ]

  const mobileNums = ['01', '02', '03', '04', '05']

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-[var(--gutter)] py-4 transition-all duration-300 border-b border-transparent',
          scrolled && 'header-scrolled',
        )}
      >
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-6">

          {/* Brand */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#00ff88] shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-semibold text-[15px] tracking-tight text-fg">Christian Fonseca</span>
              <span className="font-mono text-[11px] text-fg-dim uppercase tracking-[0.06em] mt-0.5">
                Full-stack developer
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden min-[880px]:flex gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-sm text-fg-muted rounded-full transition-colors hover:text-fg hover:bg-bg-elev"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 p-1 bg-bg-elev border border-white/8 rounded-full">
              <Link
                href="/en"
                aria-label="English"
                className={cn(
                  'w-8 h-6 flex items-center justify-center rounded-full transition-all',
                  lang === 'en'
                    ? 'bg-bg-elev-2 shadow-[0_0_0_1px_rgba(255,255,255,0.16)]'
                    : 'opacity-50 hover:opacity-85',
                )}
              >
                <FlagUS />
              </Link>
              <Link
                href="/pt"
                aria-label="Português"
                className={cn(
                  'w-8 h-6 flex items-center justify-center rounded-full transition-all',
                  lang === 'pt'
                    ? 'bg-bg-elev-2 shadow-[0_0_0_1px_rgba(255,255,255,0.16)]'
                    : 'opacity-50 hover:opacity-85',
                )}
              >
                <FlagBR />
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-elev border border-white/8 min-[880px]:hidden"
            >
              <span className={cn('burger', menuOpen && 'open')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'mobile-menu fixed inset-x-0 top-[64px] bottom-0 z-40 px-[var(--gutter)] py-8',
          'bg-[rgba(10,10,10,0.96)] backdrop-blur-xl',
          menuOpen && 'open',
        )}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-[18px] py-[18px] font-display text-[clamp(28px,7vw,40px)] font-medium tracking-tight border-b border-white/8 transition-all hover:text-accent hover:pl-2"
            >
              <span className="font-mono text-xs text-fg-dim">{mobileNums[i]}</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
