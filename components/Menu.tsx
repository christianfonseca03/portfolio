import type { Copy, Locale } from '@/lib/i18n'
import { SECTIONS } from '@/lib/data'
import { cn, pad } from '@/lib/utils'
import type { NavHandler } from './Portfolio'

type Props = {
  c: Copy
  open: boolean
  cur: number
  lang: Locale
  nav: NavHandler
  onClose: () => void
  onLang: (l: Locale) => void
}

function Segment({ active, first, onClick, children }: {
  active: boolean
  first?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex min-h-11 flex-1 items-center justify-center gap-1.5 border border-paper text-xs',
        !first && 'border-l-0',
        active ? 'bg-paper text-[#0b0b0c]' : 'bg-transparent text-paper',
      )}
    >
      {children}
    </button>
  )
}

export default function Menu({ c, open, cur, lang, nav, onClose, onLang }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={c.menu}
      className="fixed inset-0 z-60 overflow-y-auto bg-ink text-paper"
      style={{
        clipPath: `inset(0 0 ${open ? '0%' : '100%'} 0)`,
        visibility: open ? 'visible' : 'hidden',
        transition: `clip-path 600ms cubic-bezier(.7,0,.2,1), visibility 0ms linear ${open ? '0ms' : '600ms'}`,
      }}
    >
      <div className="flex flex-col gap-[26px] px-(--gutter) pt-[18px] pb-[120px] md:gap-10 md:pt-6">
        <div className="flex items-center justify-between text-[11px] tracking-[0.08em] uppercase">
          <span>cf-os // {c.menu}</span>
          <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center border border-paper px-3.5">
            {c.close} ✕
          </button>
        </div>

        <nav className="flex flex-col md:grid md:grid-cols-2 md:gap-x-10">
          {SECTIONS.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={nav(id)}
              className="flex items-baseline gap-3.5 border-b border-paper/18 py-1.5"
              style={{
                opacity: open ? 1 : 0,
                transform: `translateX(${open ? 0 : -30}px)`,
                transition: `opacity 300ms ease ${open ? 200 + i * 45 : 0}ms, transform 500ms cubic-bezier(.2,.7,.2,1) ${open ? 200 + i * 45 : 0}ms`,
              }}
            >
              <span className="min-w-[26px] text-xs text-acc-l">{pad(i + 1)}</span>
              <span className={cn('font-display text-[46px] leading-none uppercase md:text-[64px] lg:text-[84px]', i === cur ? 'text-acc-l' : 'text-paper')}>
                {c.secs[i]}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 md:max-w-[320px]">
          <span className="text-[11px] tracking-[0.08em] text-paper-dim">{c.lang}</span>
          <div className="flex">
            <Segment first active={lang === 'pt'} onClick={() => onLang('pt')}>PT</Segment>
            <Segment active={lang === 'en'} onClick={() => onLang('en')}>EN</Segment>
          </div>
        </div>
      </div>
    </div>
  )
}
