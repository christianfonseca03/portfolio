'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Copy, Locale } from '@/lib/i18n'
import { PROJECTS } from '@/lib/data'
import { cn, pad, snapIndex } from '@/lib/utils'
import { RevealTitle, SectionLabel } from './SectionHead'

type Props = { c: Copy; lang: Locale; revealed: boolean; onOpen: (i: number) => void }

export default function Work({ c, lang, revealed, onOpen }: Props) {
  const [active, setActive] = useState(0)

  return (
    <section id="work" className="flex flex-col gap-[18px] border-t border-ink bg-bg bg-dots py-(--sy) md:gap-7">
      <div className="flex items-baseline justify-between gap-2.5 px-(--gutter) text-xs tracking-[0.06em] uppercase">
        <SectionLabel n="04">{c.secs[3]}</SectionLabel>
        <span className="tabular-nums lg:hidden">{pad(active + 1)} / {pad(PROJECTS.length)}</span>
      </div>
      <RevealTitle revealed={revealed} className="px-(--gutter)">{c.workT}</RevealTitle>

      <div
        onScroll={(e) => setActive(snapIndex(e.currentTarget, PROJECTS.length))}
        // Mobile/tablet: carrossel com snap. Computador: grade de 3 colunas.
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-(--gutter) gap-3 overflow-x-auto px-(--gutter) pt-1 pb-2 md:gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
      >
        {PROJECTS.map((p, i) => (
          <button
            key={p.code}
            type="button"
            onClick={() => onOpen(i)}
            className={cn(
              'group flex w-[78%] flex-none snap-start flex-col border border-ink bg-bg text-left transition-transform duration-400 ease-snap md:w-[46%] lg:w-auto lg:translate-y-0 lg:hover:-translate-y-1.5',
              i === active ? 'translate-y-0' : 'translate-y-2',
            )}
          >
            <div className="relative aspect-[16/11] w-full border-b border-ink bg-panel">
              <Image
                src={p.image}
                alt={p.title[lang]}
                fill
                sizes="(max-width: 767px) 78vw, (max-width: 1023px) 46vw, 400px"
                className="object-cover object-top grayscale contrast-115 transition-[filter] duration-300 lg:group-hover:grayscale-0"
              />
              <span className="absolute top-2 left-2 bg-ink px-[7px] py-[3px] text-[10.5px] tracking-[0.08em] text-bg">{p.year}</span>
            </div>
            <div className="flex w-full items-end justify-between gap-2.5 p-3">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-sm font-semibold tracking-[0.04em] wrap-anywhere">{p.code}</span>
                <span className="text-[11px] tracking-[0.08em] text-mute">{c.cats[i]}</span>
              </div>
              <span className="text-[22px] leading-none text-acc">↗</span>
            </div>
          </button>
        ))}
      </div>

      <div className="relative mx-(--gutter) h-1.5 border border-ink lg:hidden">
        <span
          className="absolute inset-y-0 bg-acc transition-[left] duration-300"
          style={{ left: `${(active / PROJECTS.length) * 100}%`, width: `${100 / PROJECTS.length}%` }}
        />
      </div>
    </section>
  )
}
