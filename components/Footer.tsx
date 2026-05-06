'use client'

import { useState, useEffect } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = {
  t:       Dictionary['footer']
}

export default function Footer({ t }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <footer className="border-t border-white/8 px-6 py-8 md:px-10 xl:px-16 2xl:px-20">
        <div className="max-w-[1240px] mx-auto flex justify-between items-center gap-6 flex-wrap font-mono text-[11px] text-fg-dim tracking-[0.04em]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{t.year}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{t.built}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
