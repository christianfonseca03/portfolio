'use client'

import type { Copy } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { NavHandler } from './Portfolio'
import ReadingProgress from './ReadingProgress'

// Matriz 3×3 em cruz: 0 = vazio, 1 = ink, 2 = acento
const LOGO = [0, 1, 0, 1, 2, 1, 0, 1, 0]

type Props = {
  c: Copy
  menuOpen: boolean
  onMenu: () => void
  nav: NavHandler
}

export default function Header({ c, menuOpen, onMenu, nav }: Props) {
  return (
    <header className="sticky top-0 z-40 grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-stretch border-b border-ink bg-bg">
      <a
        href="#inicio"
        onClick={nav('inicio')}
        className="flex items-center gap-2 px-4 font-display text-[26px] tracking-[0.02em] md:px-6"
      >
        <span aria-hidden="true" className="grid grid-cols-[repeat(3,5px)] gap-px">
          {LOGO.map((v, i) => (
            <span key={i} className={cn('size-[5px]', v === 1 && 'bg-ink', v === 2 && 'bg-acc')} />
          ))}
        </span>
        <span>CF<span className="text-acc">_</span></span>
      </a>

      <span />

      <ReadingProgress label={c.progress} className="px-3.5 md:px-6" />

      <button
        type="button"
        onClick={onMenu}
        aria-label={c.menu}
        aria-expanded={menuOpen}
        className="flex min-h-14 w-[60px] flex-col items-center justify-center gap-[5px] bg-ink"
      >
        <span className={cn('h-0.5 w-[22px] bg-bg transition-transform duration-300', menuOpen && 'translate-y-[7px] rotate-45')} />
        <span className={cn('h-0.5 w-[22px] bg-acc transition-opacity duration-200', menuOpen && 'opacity-0')} />
        <span className={cn('h-0.5 w-[22px] bg-bg transition-transform duration-300', menuOpen && '-translate-y-[7px] -rotate-45')} />
      </button>
    </header>
  )
}
