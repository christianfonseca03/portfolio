'use client'

import { useEffect, useRef } from 'react'

export default function Marquee({ words, reduce }: { words: string[]; reduce: boolean }) {
  const track = useRef<HTMLDivElement>(null)

  // Desloca com o scroll direto no DOM, sem re-render a cada frame
  useEffect(() => {
    const el = track.current
    if (!el) return
    if (reduce) {
      el.style.transform = ''
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      el.style.transform = `translateX(${-((window.scrollY * 0.4) % 900)}px)`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduce])

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-ink bg-acc py-[9px] text-white">
      <div
        ref={track}
        className="flex gap-[22px] text-[13px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase"
      >
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i}>{w} ✱</span>
        ))}
      </div>
    </div>
  )
}
