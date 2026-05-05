import { STACK_DATA } from '@/lib/data'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = { t: Dictionary['stack'] }

const groups = [
  { key: 'frontend' as const, num: '01' },
  { key: 'backend'  as const, num: '02' },
  { key: 'design'   as const, num: '03' },
  { key: 'soft'     as const, num: '04' },
]

export default function Stack({ t }: Props) {
  return (
    <section id="stack" className="py-[var(--section-pad)] px-[var(--gutter)]">
      <div className="max-w-[1240px] mx-auto">

        {/* Section head */}
        <div className="mb-[clamp(48px,8vw,80px)] max-w-[720px] reveal">
          <span className="block font-mono text-xs tracking-[0.12em] uppercase mb-4 text-accent">
            {t.kicker}
          </span>
          <h2
            className="font-display font-medium leading-[1] tracking-[-0.03em] text-balance"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            {t.title}
          </h2>
          <p
            className="text-fg-muted mt-5 text-pretty max-w-[56ch]"
            style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div
          className="reveal grid gap-8 min-[720px]:grid-cols-2 min-[720px]:gap-px min-[720px]:bg-white/8 min-[720px]:border min-[720px]:border-white/8 min-[720px]:rounded-[14px] min-[720px]:overflow-hidden min-[1100px]:grid-cols-4"
          style={{ '--delay': '0.1s' } as React.CSSProperties}
        >
          {groups.map(({ key, num }) => (
            <div
              key={key}
              className="bg-bg p-8 border border-white/8 rounded-[14px] min-[720px]:border-0 min-[720px]:rounded-none"
            >
              <div className="flex items-baseline gap-2.5 mb-5 pb-4 border-b border-white/8">
                <span className="font-mono text-[11px] text-fg-dim">{num}</span>
                <span className="text-sm font-medium tracking-tight">{t.groups[key]}</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {STACK_DATA[key].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-fg-muted transition-all hover:text-fg hover:translate-x-1"
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-accent opacity-60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
