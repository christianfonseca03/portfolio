'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Copy, Locale } from '@/lib/i18n'
import { POSTS, PROJECTS } from '@/lib/data'
import { pad } from '@/lib/utils'

export type SheetContent = { type: 'work' | 'post'; i: number }

type Props = {
  c: Copy
  lang: Locale
  content: SheetContent | null
  open: boolean
  onClose: () => void
  onChange: (content: SheetContent) => void
}

const CLOSE_DRAG = 110

export default function Sheet({ c, lang, content, open, onClose, onChange }: Props) {
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const touch = useRef({ ok: false, y0: 0 })

  // Volta ao topo ao abrir ou trocar de projeto
  useEffect(() => {
    if (open && panel.current) panel.current.scrollTop = 0
  }, [open, content])

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touch.current = { ok: e.currentTarget.scrollTop <= 0, y0: e.touches[0].clientY }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current.ok) return
    const dy = e.touches[0].clientY - touch.current.y0
    if (dy > 0) {
      setDrag(dy)
      setDragging(true)
    }
  }
  const onTouchEnd = () => {
    if (!touch.current.ok) return
    if (drag > CLOSE_DRAG) onClose()
    setDrag(0)
    setDragging(false)
  }

  const n = PROJECTS.length
  const work = content?.type === 'work' ? content.i : null
  const post = content?.type === 'post' ? POSTS[content.i] : null
  const project = work !== null ? PROJECTS[work] : null
  const kicker = work !== null
    ? `${c.project} ${pad(work + 1)} / ${pad(n)}`
    : content ? `${c.post} ${pad(content.i + 1)}` : ''

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-70 bg-black/55 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={kicker}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="fixed bottom-0 left-1/2 z-71 box-border max-h-[88vh] w-[min(100%,480px)] md:w-[min(100%,720px)] overflow-y-auto overscroll-contain border border-b-0 border-ink bg-bg"
        style={{
          transform: `translateX(-50%) translateY(${open ? `${drag}px` : '105%'})`,
          transition: dragging
            ? 'none'
            : `transform 500ms cubic-bezier(.2,.8,.2,1), visibility 0ms linear ${open ? '0ms' : '500ms'}`,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <div className="sticky top-0 z-2 flex items-center justify-between border-b border-ink bg-bg pl-3.5">
          <span className="flex items-center gap-2.5 text-[11px] tracking-[0.08em] uppercase">
            <span className="h-1 w-9 bg-ink" />
            {kicker}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={c.close}
            className="grid size-[52px] place-items-center bg-ink text-base text-bg"
          >
            ✕
          </button>
        </div>

        {project && work !== null && (
          <div className="flex flex-col">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[16/11] border-b border-ink bg-panel"
            >
              <Image
                src={project.image}
                alt={project.title[lang]}
                fill
                sizes="(max-width: 720px) 100vw, 720px"
                className="object-cover object-top grayscale contrast-115"
              />
            </a>
            <div className="flex flex-col gap-3.5 px-4 pt-[18px] pb-[30px] md:px-8 md:pt-7 md:pb-10">
              <span className="text-[11px] tracking-[0.08em] text-acc uppercase">{`${c.cats[work]} // ${project.year}`}</span>
              <h3 className="m-0 font-display text-[44px] leading-[0.9] wrap-anywhere uppercase md:text-[64px]">{project.code}</h3>
              <p className="m-0 text-sm leading-[22px]">{project.desc[lang]}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-ink px-2 py-[5px] text-[11px] tracking-[0.04em]">{tag}</span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-between bg-ink px-3.5 text-xs font-semibold tracking-[0.08em] text-bg uppercase active:bg-acc"
              >
                <span>{c.visit}</span>
                <span className="text-lg text-acc-l">↗</span>
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onChange({ type: 'work', i: (work + n - 1) % n })}
                  className="flex min-h-11 items-center justify-center border border-ink text-xs tracking-[0.06em]"
                >
                  ← {PROJECTS[(work + n - 1) % n].code}
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ type: 'work', i: (work + 1) % n })}
                  className="flex min-h-11 items-center justify-center border border-ink text-xs tracking-[0.06em]"
                >
                  {PROJECTS[(work + 1) % n].code} →
                </button>
              </div>
            </div>
          </div>
        )}

        {post && (
          <article className="flex flex-col gap-4 px-4 pt-5 pb-10 md:px-8 md:pt-8 md:pb-14">
            <span className="text-[11px] tracking-[0.08em] text-acc uppercase">
              {`${post.date[lang]} // ${post.tag[lang]} // ${post.read[lang]}`}
            </span>
            <h3 className="m-0 font-display text-[40px] leading-[0.95] uppercase md:text-[56px]">{post.title[lang]}</h3>
            <p className="m-0 text-sm leading-[22px] font-semibold">{post.dek[lang]}</p>
            <span aria-hidden="true" className="h-2.5 bg-dashes" />
            {post.body[lang].map((p, i) => (
              <p key={i} className="m-0 text-[14.5px] leading-6">{p}</p>
            ))}
          </article>
        )}
      </div>
    </>
  )
}
