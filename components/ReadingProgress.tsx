'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/** Barra + porcentagem de quanto da página já foi rolado. */
export default function ReadingProgress({ label, className }: { label: string; className?: string }) {
  const meter = useRef<HTMLSpanElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  // Atualiza direto no DOM, sem re-render a cada scroll
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.round(Math.min(1, Math.max(0, window.scrollY / max)) * 100) : 0
      if (fill.current) fill.current.style.width = `${pct}%`
      if (text.current) text.current.textContent = `${pct} %`
      meter.current?.setAttribute('aria-valuenow', String(pct))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <span
      ref={meter}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className={cn('flex items-center gap-2 text-[10.5px] tracking-[0.06em] tabular-nums md:gap-3', className)}
    >
      <span className="relative h-1.5 w-10 border border-ink md:w-24 lg:w-32">
        <span ref={fill} className="absolute inset-y-0 left-0 w-0 bg-ink" />
      </span>
      <span ref={text} className="min-w-[5ch] text-right">0 %</span>
    </span>
  )
}
