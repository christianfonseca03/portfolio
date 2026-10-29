'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { Copy } from '@/lib/i18n'
import { clamp } from '@/lib/utils'

const COLS = 10
const NCELL = COLS * 12
const NVOX = 18

type Voxel = 'ink' | 'acc' | 'hatch' | 'dots'
const VOXELS: Voxel[] = ['ink', 'acc', 'hatch', 'dots']
const VOX_BG: Record<Voxel, string> = {
  ink: 'var(--ink)',
  acc: 'var(--acc)',
  hatch: 'repeating-linear-gradient(45deg, var(--ink) 0 1.5px, var(--bg) 1.5px 5px)',
  dots: 'radial-gradient(var(--acc) 1.3px, var(--bg) 1.5px) 0 0 / 5px 5px',
}

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Ordem pseudoaleatória de revelação das células + voxels fixos no lado direito. */
function buildGrid(edition: number) {
  const r = rng(edition * 977 + 13)
  const order = Array.from({ length: NCELL }, (_, i) => i).sort(() => r() - 0.5)
  const rank: number[] = []
  order.forEach((cell, i) => { rank[cell] = i })
  const vox: Partial<Record<number, Voxel>> = {}
  for (let i = 0; i < NVOX; i++) {
    const col = 5 + Math.floor(r() * 5)
    const row = Math.floor(r() * 7)
    vox[row * COLS + col] = VOXELS[Math.floor(r() * 4)]
  }
  return { rank, vox }
}

type Props = { c: Copy; edition: number; reduce: boolean }

export default function Scanner({ c, edition, reduce }: Props) {
  const { rank, vox } = useMemo(() => buildGrid(Math.max(edition, 1)), [edition])
  const [scan, setScan] = useState(0)
  const [run, setRun] = useState(0)
  const [cx, setCx] = useState(62)
  const [cy, setCy] = useState(38)

  useEffect(() => {
    if (reduce) return
    let s = 0
    const id = setInterval(() => {
      // Desacelera perto de 80%
      s += s > 96 && s < 102 ? 0.35 : 2
      if (s >= NCELL) {
        s = NCELL
        clearInterval(id)
      }
      setScan(s)
    }, 30)
    return () => clearInterval(id)
  }, [reduce, run])

  const shown = reduce ? NCELL : Math.floor(scan)
  const pct = Math.round((shown / NCELL) * 100)

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setCx(Math.round(clamp((e.clientX - r.left) / r.width, 0, 1) * 1000) / 10)
    setCy(Math.round(clamp((e.clientY - r.top) / r.height, 0, 1) * 1000) / 10)
  }

  const rescan = () => {
    setScan(0)
    setRun((n) => n + 1)
  }

  return (
    <div
      onPointerMove={track}
      onPointerDown={track}
      className="relative aspect-[4/5] touch-none border border-ink select-none"
    >
      <div className="absolute inset-0 grayscale contrast-125 brightness-105">
        <Image
          src="/ChristianFonseca.png"
          alt="Christian Fonseca"
          fill
          preload
          sizes="(max-width: 767px) 100vw, 560px"
          className="object-cover"
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-halftone opacity-[0.18]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-12">
        {rank.map((rk, i) => {
          const done = rk < shown
          const v = vox[i]
          return (
            <span
              key={i}
              className="shadow-[inset_0_0_0_0.5px_var(--line)] transition-opacity duration-180 ease-linear"
              style={{
                background: v && done ? VOX_BG[v] : 'var(--bg)',
                opacity: done ? (v ? 1 : 0) : 1,
              }}
            />
          )
        })}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-acc" style={{ left: `${cx}%` }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 h-px bg-acc" style={{ top: `${cy}%` }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -mt-[11px] -ml-[11px] size-[22px] border-[1.5px] border-acc"
        style={{ left: `${cx}%`, top: `${cy}%` }}
      />

      <div className="absolute top-2.5 left-2.5 border border-ink bg-bg px-[9px] py-1.5 text-[11px] leading-[15px] tracking-[0.06em] uppercase">
        <div>&gt; {pct >= 100 ? c.renderOk : c.rendering}</div>
        <div className="font-semibold tabular-nums">{pct}%</div>
      </div>

      <div className="absolute -right-px bottom-11 border border-acc bg-bg px-2.5 py-2 text-[11px] leading-[17px] tabular-nums">
        <div>X_{(-30.0346 + (cx - 50) / 400).toFixed(4)}</div>
        <div>Y_{(-51.2177 + (cy - 50) / 400).toFixed(4)}</div>
        <div>Z_{(10 + cx * 0.37 + cy * 0.21).toFixed(4)}</div>
      </div>

      <button
        type="button"
        onClick={rescan}
        className="absolute bottom-2.5 left-2.5 inline-flex min-h-9 items-center gap-2 bg-ink px-3 text-[11px] tracking-[0.08em] text-bg uppercase"
      >
        ↻ {c.rescan}
      </button>
      <span className="absolute right-2.5 bottom-3 text-[11px] tracking-[0.06em]">{'//SCN_01'}</span>
    </div>
  )
}
