'use client'

import { useEffect, useRef, useState } from 'react'
import type { Copy } from '@/lib/i18n'
import { CHANNELS, EMAIL, ZONES } from '@/lib/data'
import { useNow } from '@/lib/hooks'
import { clamp, cn, pad, vibrate } from '@/lib/utils'
import { RevealTitle, SectionLabel } from './SectionHead'

const HOLD_MS = 1200
const DECAY = 0.06

export default function Connect({ c, revealed }: { c: Copy; revealed: boolean }) {
  const [hold, setHold] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [copied, setCopied] = useState(false)
  const raf = useRef(0)
  const now = useNow()

  useEffect(() => {
    const frame = raf
    return () => cancelAnimationFrame(frame.current)
  }, [])

  const unlock = () => {
    cancelAnimationFrame(raf.current)
    setUnlocked(true)
    setHold(1)
    vibrate([20, 40, 20])
  }

  const holdStart = (e: React.PointerEvent) => {
    if (unlocked) return
    e.preventDefault()
    const t0 = performance.now() - hold * HOLD_MS
    const step = (t: number) => {
      const h = clamp((t - t0) / HOLD_MS, 0, 1)
      setHold(h)
      if (h >= 1) return unlock()
      raf.current = requestAnimationFrame(step)
    }
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(step)
  }

  const holdEnd = () => {
    cancelAnimationFrame(raf.current)
    if (unlocked) return
    let h = hold
    const decay = () => {
      h = Math.max(0, h - DECAY)
      setHold(h)
      if (h > 0) raf.current = requestAnimationFrame(decay)
    }
    raf.current = requestAnimationFrame(decay)
  }

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const zoneTime = (tz: string) =>
    now === null ? '--:--' : new Date(now).toLocaleTimeString('pt-BR', { timeZone: tz, hour: '2-digit', minute: '2-digit' })

  const holdLabel = unlocked ? c.granted : hold > 0 ? `${c.holding} ${Math.round(hold * 100)}%` : c.hold

  return (
    <section id="conexao" className="flex flex-col gap-[18px] border-t border-ink bg-ink px-(--gutter) pt-(--sy) pb-10 text-paper md:gap-7 md:pb-(--sy) lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
      <div className="flex flex-col gap-[18px] md:gap-7">
      <SectionLabel n="07" numberClassName="text-acc-l">{c.secs[6]}</SectionLabel>
      <RevealTitle revealed={revealed} className="leading-[0.84]" size="text-[76px] md:text-[112px] lg:text-[136px]">
        <span className="block">{c.connT1}</span>
        <span className="block text-acc-l">{c.connT2}</span>
      </RevealTitle>
      <p className="m-0 max-w-[48ch] text-[13.5px] leading-[21px] lg:text-[15px] lg:leading-[25px]">{c.contactSub}</p>

      <button
        type="button"
        onPointerDown={holdStart}
        onPointerUp={holdEnd}
        onPointerLeave={holdEnd}
        onPointerCancel={holdEnd}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return
          e.preventDefault()
          if (!unlocked) unlock()
        }}
        onContextMenu={(e) => e.preventDefault()}
        className="relative flex min-h-16 touch-none items-center justify-center overflow-hidden border border-paper select-none [-webkit-touch-callout:none]"
      >
        <span className="absolute inset-y-0 left-0 bg-acc" style={{ width: `${Math.round(hold * 100)}%` }} />
        <span aria-live="polite" className="relative text-[13px] font-semibold tracking-[0.12em] uppercase">{holdLabel}</span>
      </button>
      {!unlocked && (
        <button
          type="button"
          onClick={unlock}
          className="min-h-9 self-end text-[11px] tracking-[0.08em] text-paper-dim uppercase underline underline-offset-[3px]"
        >
          {c.skip} ›
        </button>
      )}
      </div>

      <div className="flex flex-col gap-[18px] md:gap-7">

      <div className="flex flex-col border border-paper-line">
        {CHANNELS.map((ch, i) => (
          <a
            key={ch.name}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!unlocked}
            tabIndex={unlocked ? undefined : -1}
            className={cn(
              'grid min-h-14 grid-cols-[40px_minmax(0,1fr)_auto] items-center active:bg-acc',
              i > 0 && 'border-t border-paper-line',
              !unlocked && 'pointer-events-none',
            )}
          >
            <span className="grid self-stretch place-items-center border-r border-paper-line text-[11px] text-acc-l">{pad(i + 1)}</span>
            <span className="flex min-w-0 flex-col gap-0.5 px-3">
              <span className="text-[11px] tracking-[0.08em] text-paper-dim uppercase">{ch.name}</span>
              <span
                className={cn('text-[13px] wrap-anywhere text-paper transition-colors duration-300', unlocked ? 'bg-transparent' : 'bg-paper')}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                {ch.handle}
              </span>
            </span>
            <span className={cn('px-3.5 text-lg text-acc-l', !unlocked && 'opacity-30')}>↗</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={copyEmail}
        className="flex min-h-12 items-center justify-center border border-paper text-xs tracking-[0.1em] uppercase active:bg-paper active:text-[#0b0b0c]"
      >
        {copied ? c.copied : c.copy}
      </button>

      <div className="flex flex-col gap-2.5 pt-[18px]">
        <span className="text-[11px] tracking-[0.08em] text-paper-dim uppercase">{c.nodeT}</span>
        <div className="grid grid-cols-4 border border-paper-line">
          {ZONES.map(([code, tz], i) => (
            <div
              key={code}
              className={cn('flex flex-col gap-1 px-2 py-2.5', i > 0 && 'border-l border-paper-line', i === 0 && 'bg-paper/10')}
            >
              <span className="flex items-center gap-[5px] text-[11px] tracking-[0.06em]">
                <span className={cn('size-1.5 rounded-full', i === 0 ? 'bg-acc-l' : 'bg-[#6b6b6b]')} />
                {code}
              </span>
              <span className="text-[13px] font-semibold tabular-nums">{zoneTime(tz)}</span>
            </div>
          ))}
        </div>
        <span className="text-[11px] text-paper-dim">● POA = {c.here}</span>
      </div>
      </div>
    </section>
  )
}
