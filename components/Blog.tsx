'use client'

import { useState } from 'react'
import type { Copy, Locale } from '@/lib/i18n'
import { POSTS, POST_FILTERS, type PostCategory } from '@/lib/data'
import { cn, pad } from '@/lib/utils'
import { RevealTitle, SectionLabel } from './SectionHead'

type Props = { c: Copy; lang: Locale; revealed: boolean; onOpen: (i: number) => void }

export default function Blog({ c, lang, revealed, onOpen }: Props) {
  const [filter, setFilter] = useState<PostCategory | 'all'>('all')
  const visible = POSTS
    .map((post, i) => ({ post, i }))
    .filter(({ post }) => filter === 'all' || post.cat === filter)

  return (
    <section id="blog" className="relative flex flex-col gap-[18px] overflow-clip border-t border-ink px-(--gutter) py-(--sy) md:gap-7 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start lg:gap-14">
      <div aria-hidden="true" className="pointer-events-none absolute top-[30px] -right-[70px] size-[200px] lg:top-16 lg:right-auto lg:left-[30%] lg:size-[220px] rounded-full border border-acc" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[90px] -right-[90px] h-[70px] w-[260px] -rotate-18 lg:top-36 lg:right-auto lg:left-[27%] lg:w-[300px] rounded-full border border-acc" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[70px] right-[30px] size-[54px] md:right-(--gutter) lg:top-28 lg:right-auto lg:left-[37%] lg:size-[64px] bg-ink clip-star" />

      <div className="relative flex flex-col gap-[18px] md:gap-7 lg:sticky lg:top-24">
        <SectionLabel n="06" className="relative">{c.secs[5]}</SectionLabel>
        <RevealTitle revealed={revealed} className="relative">{c.blogT}</RevealTitle>
        <p className="relative m-0 max-w-[30ch] text-[13.5px] leading-[21px]">{c.blogSub}</p>

        {POSTS.length > 0 && (
          <div className="no-scrollbar relative flex gap-1.5 overflow-x-auto lg:flex-wrap">
            {POST_FILTERS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
                className={cn(
                  'inline-flex min-h-10 flex-none items-center border border-ink px-3 text-[11.5px] tracking-[0.06em] uppercase',
                  filter === id ? 'bg-ink text-bg' : 'bg-bg text-ink',
                )}
              >
                {label ? label[lang] : c.all}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex flex-col border border-ink bg-bg">
        {POSTS.length === 0 ? (
          <div className="flex flex-col gap-2 px-3.5 py-6 md:px-6 md:py-8">
            <span className="text-[11px] tracking-[0.06em] text-mute uppercase">{`POST_00 // ${c.blogEmpty}`}</span>
            <span className="text-[15.5px] leading-[22px] font-semibold md:text-lg md:leading-[26px]">
              {c.blogSoon}
              <span className="ml-1 animate-blink text-acc">_</span>
            </span>
          </div>
        ) : (
          visible.map(({ post, i }, k) => (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              className={cn('flex flex-col gap-2 px-3.5 py-4 text-left active:bg-panel md:px-6 md:py-6 lg:hover:bg-panel', k > 0 && 'border-t border-ink')}
            >
              <span className="flex justify-between gap-2 text-[11px] tracking-[0.06em] text-mute uppercase">
                <span>{`POST_${pad(i + 1)} // ${post.date[lang]} // ${post.tag[lang]}`}</span>
                <span className="text-acc">{post.read[lang]} ↗</span>
              </span>
              <span className="text-[15.5px] leading-[22px] font-semibold md:text-lg md:leading-[26px]">{post.title[lang]}</span>
              <span className="text-[12.5px] leading-[19px] text-mute">{post.dek[lang]}</span>
            </button>
          ))
        )}
      </div>
    </section>
  )
}
