import type { Copy, Locale } from '@/lib/i18n'
import { EDUCATION } from '@/lib/data'
import { cn } from '@/lib/utils'
import { RevealTitle, SectionLabel } from './SectionHead'

type Props = { c: Copy; lang: Locale; revealed: boolean }

export default function BuildLog({ c, lang, revealed }: Props) {
  return (
    <section id="log" className="flex flex-col gap-[18px] border-t border-ink px-(--gutter) py-(--sy) md:gap-7 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start lg:gap-14">
      <div className="flex flex-col gap-[18px] md:gap-7 lg:sticky lg:top-24">
        <SectionLabel n="05">{c.secs[4]}</SectionLabel>
        <RevealTitle revealed={revealed} size="text-[68px] md:text-[96px] lg:text-[88px]">
          <span className="block leading-[1.12]">{c.logT[0]}</span>
          <span className="block leading-[1.12]">{c.logT[1]}</span>
        </RevealTitle>
      </div>

      <div className="flex flex-col border border-ink">
        {EDUCATION.map((e, i) => {
          const entry = e.learn
            ? { when: c.always, title: c.learnTitle, school: c.learnBody, done: false, running: false }
            : { when: e.when[lang], title: e.title[lang], school: e.school, done: e.done, running: !e.done }
          const delay = 120 + i * 120

          return (
            <div key={i} className={cn('grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[88px_minmax(0,1fr)]', i > 0 && 'border-t border-ink')}>
              <div
                className={cn(
                  'flex flex-col items-center gap-1.5 border-r border-ink py-3.5',
                  entry.done && 'bg-ink text-white',
                  entry.running && 'bg-acc text-white',
                )}
              >
                <span className="font-display text-[26px] leading-none md:text-[34px]">v{EDUCATION.length - i}</span>
              </div>
              <div
                className="flex flex-col gap-2 px-3.5 pt-3.5 pb-4 motion-reduce:transition-none! md:px-6 md:pt-5 md:pb-6"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: `translateX(${revealed ? 0 : 24}px)`,
                  transition: `opacity 500ms ease ${delay}ms, transform 600ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
                }}
              >
                <div className="flex items-center justify-between gap-2 text-[11px] tracking-[0.06em] uppercase">
                  <span className="text-mute">{entry.when}</span>
                  <span className={cn('border px-[7px] py-[3px] whitespace-nowrap', entry.done ? 'border-ink text-ink' : 'border-acc text-acc')}>
                    [{entry.done ? c.done : c.running}]
                  </span>
                </div>
                <h3 className="m-0 text-[15px] leading-[21px] font-semibold md:text-[17px] md:leading-6">{entry.title}</h3>
                <span className="text-[12.5px] leading-[19px]">{entry.school}</span>
                {entry.running && (
                  <span className="relative block h-1 overflow-hidden bg-acc">
                    <span className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-linear-to-r from-transparent via-acc-l to-transparent motion-reduce:hidden" />
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
