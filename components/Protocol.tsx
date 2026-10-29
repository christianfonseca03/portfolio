'use client'

import { useState } from 'react'
import type { Copy } from '@/lib/i18n'
import { cn, pad, snapIndex } from '@/lib/utils'
import { RevealTitle, SectionLabel } from './SectionHead'

const GLYPH_SIZES = [26, 16, 8]

export default function Protocol({ c, revealed }: { c: Copy; revealed: boolean }) {
  const [active, setActive] = useState(0)

  return (
    <section id="protocolo" className="relative flex flex-col gap-5 py-(--sy) md:gap-7">
      <div aria-hidden="true" className="pointer-events-none absolute top-[26px] -right-10 flex h-[120px] w-[150px] flex-col gap-2.5 opacity-95 md:top-16 md:right-0 md:w-[220px] md:gap-3.5">
        <span className="h-[34px] bg-acc clip-parallelogram md:h-12" />
        <span className="ml-[30px] h-[34px] bg-acc clip-parallelogram md:ml-11 md:h-12" />
        <span className="ml-[60px] h-[34px] bg-ink clip-parallelogram md:ml-22 md:h-12" />
      </div>

      <SectionLabel n="02" className="px-(--gutter)">{c.secs[1]}</SectionLabel>
      <RevealTitle revealed={revealed} className="px-(--gutter)">{c.aboutT}</RevealTitle>

      {/* Mobile: carrossel com snap. Tablet+: grade de 3 cards. */}
      <div
        onScroll={(e) => setActive(snapIndex(e.currentTarget, c.aboutP.length))}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-(--gutter) gap-3 overflow-x-auto px-(--gutter) pt-1 pb-1.5 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible lg:gap-6"
      >
        {c.aboutP.map((txt, i) => (
          <article key={i} className="flex w-[82%] flex-none snap-start flex-col border border-ink bg-bg md:w-auto">
            <div className="flex items-center justify-between border-b border-ink px-3 py-2.5 text-[11px] tracking-[0.08em] uppercase">
              <span>PROTO_{pad(i + 1)}</span>
              <span className="text-acc">+</span>
            </div>
            <div className="flex flex-col gap-3.5 px-3.5 pt-4 pb-[18px] lg:px-5 lg:pt-6 lg:pb-7">
              <div aria-hidden="true" className="grid size-[46px] place-items-center border-[1.5px] border-ink">
                <span
                  className={cn('border-[1.5px] border-ink', i === 1 && 'bg-acc')}
                  style={{ width: GLYPH_SIZES[i] ?? 12, height: GLYPH_SIZES[i] ?? 12 }}
                />
              </div>
              <h3 className="m-0 text-[15px] font-semibold tracking-[0.06em] text-acc uppercase">{c.protoLabels[i]}</h3>
              <p className="m-0 text-[13.5px] leading-[21px] lg:text-[14.5px] lg:leading-6">{txt}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-(--gutter) md:hidden">
        <div className="flex gap-1.5">
          {c.aboutP.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 transition-[width,background-color] duration-300',
                i === active ? 'w-[26px] bg-acc' : 'w-1.5 bg-ink',
              )}
            />
          ))}
        </div>
        <span className="text-[11px] tracking-[0.08em] text-mute">{c.swipe}</span>
      </div>

      <div className="mx-(--gutter) mt-1.5 grid border border-ink md:grid-cols-2">
        {c.facts.map(([k, v], i) => (
          <div
            key={k}
            className={cn(
              'grid min-h-11 grid-cols-[36px_minmax(0,1fr)_auto] items-center text-[12.5px] md:min-h-14',
              i > 0 && 'border-t border-ink',
              i === 1 && 'md:border-t-0',
              i % 2 === 1 && 'md:border-l md:border-ink',
            )}
          >
            <span className="grid self-stretch place-items-center border-r border-ink text-[11px] text-acc">{pad(i + 1)}</span>
            <span className="px-2.5 tracking-[0.04em] text-mute uppercase">{k}</span>
            <span className="px-3 text-right font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
