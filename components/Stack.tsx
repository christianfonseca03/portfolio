'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import type { Copy } from '@/lib/i18n'
import { STACK } from '@/lib/data'
import { cn } from '@/lib/utils'
import { RevealTitle, SectionLabel } from './SectionHead'

const COMMANDS = ['whoami', 'ls frontend/', 'ls backend/', 'ls design/', 'cat soft_skills.txt', 'clear'] as const
type Command = (typeof COMMANDS)[number]

type Line = { txt: string; kind: 'cmd' | 'out' | 'dim' }
const MAX_LINES = 14

const LINE_COLOR: Record<Line['kind'], string> = {
  cmd: 'text-acc-l',
  out: 'text-paper',
  dim: 'text-[#8a8a8a]',
}

const ls = (items: string[]) => items.map((x) => `drwx  ${x.toLowerCase().replace(/\s+/g, '_')}/`)

export default function Stack({ c, revealed }: { c: Copy; revealed: boolean }) {
  const [lines, setLines] = useState<Line[]>([])
  const [last, setLast] = useState<Command | null>(null)
  const typing = useRef<ReturnType<typeof setInterval>>(undefined)

  const run = (cmd: Command) => {
    clearInterval(typing.current)
    if (cmd === 'clear') {
      setLines([])
      return
    }
    const out = {
      'whoami': ['christian fonseca', 'full-stack developer', 'porto alegre, br // utc-3'],
      'ls frontend/': ls(STACK.frontend),
      'ls backend/': ls(STACK.backend),
      'ls design/': ls(STACK.design),
      'cat soft_skills.txt': c.soft.map((s) => `+ ${s}`),
    }[cmd]
    const queue: Line[] = [
      { txt: `$ ${cmd}`, kind: 'cmd' },
      ...out.map((txt) => ({ txt, kind: 'out' as const })),
      { txt: `-- ${out.length} ok`, kind: 'dim' },
    ]
    const push = () => {
      const line = queue.shift()
      if (!line) return clearInterval(typing.current)
      setLines((l) => [...l, line].slice(-MAX_LINES))
    }
    push()
    setLast(cmd)
    typing.current = setInterval(push, 70)
  }

  const boot = useEffectEvent(() => run('whoami'))
  useEffect(() => {
    const t = setTimeout(() => boot(), 600)
    const timer = typing
    return () => {
      clearTimeout(t)
      clearInterval(timer.current)
    }
  }, [])

  return (
    <section id="stack" className="flex flex-col gap-[18px] border-t border-ink px-(--gutter) py-(--sy) md:gap-7">
      <SectionLabel n="03">{c.secs[2]}</SectionLabel>
      <RevealTitle revealed={revealed}>Stack_</RevealTitle>

      {/* Computador: terminal à esquerda, comandos à direita */}
      <div className="flex flex-col gap-[18px] lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
        <div className="border border-ink bg-ink text-paper">
          <div className="flex items-center justify-between border-b border-white/20 px-3 py-2 text-[11px] tracking-[0.06em]">
            <span>cf@poa:~</span>
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-[9px] border border-paper" />
              <span className="size-[9px] border border-paper" />
              <span className="size-[9px] bg-acc-l" />
            </span>
          </div>
          <div aria-live="polite" className="flex h-[290px] flex-col justify-end gap-[3px] overflow-hidden px-3 pt-2.5 pb-3 text-[13px] leading-[19px] md:h-[340px] lg:h-[400px] lg:px-4 lg:text-sm lg:leading-5">
            {lines.map((l, i) => (
              <div key={i} className={cn('wrap-anywhere whitespace-pre-wrap', LINE_COLOR[l.kind])}>{l.txt}</div>
            ))}
            <div>
              <span className="text-acc-l">$</span>{' '}
              <span className="inline-block h-[15px] w-2 animate-blink bg-paper align-[-2px]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          <span className="text-[11px] tracking-[0.08em] text-mute uppercase">{c.termHint}</span>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
            {COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => run(cmd)}
                className={cn(
                  'inline-flex min-h-11 items-center border border-ink px-3 text-[12.5px] active:bg-acc active:text-white lg:min-h-12 lg:px-4',
                  last === cmd ? 'bg-ink text-bg' : 'bg-transparent text-ink hover:bg-panel',
                )}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
