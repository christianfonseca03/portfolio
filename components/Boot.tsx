'use client'

import { useEffect, useState } from 'react'
import type { Copy } from '@/lib/i18n'
import { useNow } from '@/lib/hooks'
import { vibrate } from '@/lib/utils'
import Scanner from './Scanner'

type Props = {
  c: Copy
  edition: number
  reduce: boolean
  onWork: (e?: React.MouseEvent) => void
  onConnect: (e?: React.MouseEvent) => void
}

function Name({ accent }: { accent?: boolean }) {
  return (
    <>
      <span className="block">Christian</span>
      <span className="block">Fonseca{accent ? <span className="text-acc">_</span> : '_'}</span>
    </>
  )
}

export default function Boot({ c, edition, reduce, onWork, onConnect }: Props) {
  const [glitch, setGlitch] = useState(false)
  const now = useNow()

  const doGlitch = () => {
    if (glitch) return
    setGlitch(true)
    setTimeout(() => setGlitch(false), 380)
    vibrate(12)
  }

  // Glitch automático a cada 7s
  useEffect(() => {
    if (reduce) return
    let off: ReturnType<typeof setTimeout>
    const id = setInterval(() => {
      setGlitch(true)
      off = setTimeout(() => setGlitch(false), 380)
    }, 7000)
    return () => {
      clearInterval(id)
      clearTimeout(off)
    }
  }, [reduce])

  return (
    <section
      id="inicio"
      // Mobile: coluna única (texto → scanner → CTAs). Tablet+: texto e CTAs à esquerda, scanner à direita.
      className="relative flex flex-col gap-5 pt-[22px] pr-(--gutter) pb-(--sy) pl-[calc(var(--gutter)+26px)] md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:grid-rows-[repeat(5,auto)_1fr] md:gap-x-10 md:pt-12 lg:gap-x-14"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 flex w-[30px] flex-col items-center justify-between border-r border-line py-5"
      >
        <span className="h-10 w-px bg-[repeating-linear-gradient(var(--acc)_0_4px,transparent_4px_8px)]" />
        <span className="rotate-180 text-[10px] tracking-[0.18em] text-acc uppercase [writing-mode:vertical-rl]">
          portfolio_2026 // cf-os
        </span>
        <span className="rotate-180 text-[13px] font-semibold [writing-mode:vertical-rl]">
          {now === null ? '' : new Date(now).getFullYear()}
        </span>
      </div>

      <div className="flex items-baseline justify-between text-xs tracking-[0.06em] md:col-start-1">
        <span className="text-acc">/01</span>
        <span className="text-mute">SCN_{String(Math.max(edition, 1)).padStart(4, '0')}</span>
      </div>

      <h1
        onClick={doGlitch}
        className="relative m-0 cursor-pointer font-display text-[min(19vw,92px)] leading-[0.84] tracking-[-0.005em] uppercase select-none md:col-start-1 md:text-[min(11vw,140px)]"
      >
        <Name accent />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-acc [clip-path:inset(12%_0_58%_0)]"
          style={{ transform: `translateX(${glitch ? -7 : 0}px)`, opacity: glitch ? 1 : 0 }}
        >
          <Name />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-bg text-ink [clip-path:inset(62%_0_14%_0)]"
          style={{ transform: `translateX(${glitch ? 6 : 0}px)`, opacity: glitch ? 1 : 0 }}
        >
          <Name />
        </span>
      </h1>

      <p className="m-0 text-sm leading-[21px] font-semibold tracking-[0.04em] text-acc uppercase md:col-start-1 lg:text-base lg:leading-6">
        {c.h1a}. {c.h1b} {c.h1c}
      </p>
      <p className="m-0 text-sm leading-[22px] md:col-start-1 md:max-w-[52ch] lg:text-[15px] lg:leading-[25px]">{c.sub}</p>

      <div className="md:col-start-2 md:row-[1/-1] md:self-start">
        <Scanner c={c} edition={edition} reduce={reduce} />
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:col-start-1 md:mt-2 lg:max-w-[460px]">
        <a
          href="#work"
          onClick={onWork}
          className="flex min-h-[52px] items-center justify-between bg-ink px-3.5 text-xs font-semibold tracking-[0.08em] text-bg uppercase active:bg-acc"
        >
          <span>{c.ctaWork}</span>
          <span className="text-lg text-acc-l">↗</span>
        </a>
        <a
          href="#conexao"
          onClick={onConnect}
          className="flex min-h-[52px] items-center justify-between border border-ink px-3.5 text-xs font-semibold tracking-[0.08em] uppercase active:bg-panel"
        >
          <span>{c.ctaContact}</span>
          <span className="text-sm">[ ]</span>
        </a>
      </div>
    </section>
  )
}
