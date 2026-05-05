'use client'

import { useState, useEffect } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = {
  t:       Dictionary['footer']
  easterT: Dictionary['easter']
}

export default function Footer({ t, easterT }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <footer className="border-t border-white/8 px-[var(--gutter)] py-8">
        <div className="max-w-[1240px] mx-auto flex justify-between items-center gap-6 flex-wrap font-mono text-[11px] text-fg-dim tracking-[0.04em]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{t.year}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{t.built}</span>
            <button
              onClick={() => setOpen(true)}
              aria-label="Easter egg"
              className="w-7 h-7 rounded-full border border-white/8 bg-bg-elev flex items-center justify-center text-xs transition-all hover:text-accent hover:border-accent hover:rotate-90"
            >
              ✦
            </button>
          </div>
        </div>
      </footer>

      {/* Easter egg modal */}
      <div
        className={`easter-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
      >
        <div
          className="easter-modal bg-bg-elev border border-white/8 rounded-[14px] p-10 max-w-[440px] w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-5xl mb-4 text-accent inline-block [animation:spin-slow_6s_linear_infinite]">✦</div>
          <h3 className="font-display text-[28px] font-medium tracking-[-0.02em] mb-3">{easterT.title}</h3>
          <p className="text-fg-muted text-[15px] leading-relaxed mb-6">{easterT.body}</p>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 px-[22px] py-3 text-sm font-semibold bg-accent text-black rounded-full transition-all hover:-translate-y-0.5"
          >
            {easterT.close}
          </button>
        </div>
      </div>
    </>
  )
}
