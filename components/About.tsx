import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = { t: Dictionary['about'] }
const revealClass =
  'reveal opacity-0 translate-y-6 transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [transition-delay:var(--delay,0s)] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [&.in-view]:opacity-100 [&.in-view]:translate-y-0'

const PersonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function About({ t }: Props) {
  return (
    <section id="about" className="px-6 py-[clamp(112px,16vw,240px)] md:px-10 xl:px-16 2xl:px-20">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid gap-14 min-[880px]:grid-cols-[1.15fr_0.85fr] min-[880px]:gap-20 items-start">

          {/* Text column */}
          <div className="min-[880px]:order-1 flex flex-col gap-10">
            <div className={revealClass}>
              <span className="block font-mono text-xs tracking-[0.12em] uppercase mb-4 text-accent">
                {t.kicker}
              </span>
              <h2
                className="font-display font-medium leading-none tracking-[-0.03em] text-balance"
                style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
              >
                {t.title}
              </h2>
            </div>

            <div className={revealClass} style={{ '--delay': '0.1s' } as React.CSSProperties}>
              <p
                className="font-display leading-[1.35] tracking-[-0.015em] mb-6 text-pretty"
                style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
              >
                {t.p1}
              </p>
              <p
                className="text-fg-muted mb-4 leading-relaxed max-w-[60ch] text-pretty"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
              >
                {t.p2}
              </p>
              <p
                className="text-fg-muted leading-relaxed max-w-[60ch] text-pretty"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
              >
                {t.p3}
              </p>
            </div>

            {/* Facts row */}
            <div
              className={`${revealClass} grid grid-cols-2 self-start overflow-hidden rounded-[14px] border border-white/8 bg-white/8 min-[720px]:grid-cols-4`}
              style={{ '--delay': '0.2s' } as React.CSSProperties}
            >
              {t.facts.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 p-[18px_22px] bg-bg">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">{f.k}</span>
                  <span className="text-[15px] font-medium">{f.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait column */}
          <div
            className={`${revealClass} sticky top-[100px] flex flex-col gap-3.5 min-[880px]:order-2`}
            style={{ '--delay': '0.15s' } as React.CSSProperties}
          >
            <div className="relative aspect-4/5 bg-bg-elev border border-white/8 rounded-[14px] overflow-hidden group transition-all duration-500 hover:border-white/16 hover:translate-y-[-3px]">

              {/* Diagonal stripe background */}
              <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="portrait-diag" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#portrait-diag)" />
              </svg>

              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-bg-elev-2 to-bg">
                <span className="w-[72px] h-[72px] rounded-full border border-accent flex items-center justify-center text-accent">
                  <PersonIcon />
                </span>
                <span className="font-mono text-xs text-fg-muted tracking-[0.08em]">[ photo ]</span>
              </div>

              {/* Name tag */}
              <div className="absolute left-3.5 bottom-3.5 inline-flex items-center gap-2 px-3 py-[7px] bg-[rgba(10,10,10,0.7)] backdrop-blur-[10px] border border-white/16 rounded-full font-mono text-[11px] tracking-[0.04em]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Christian Fonseca
              </div>
            </div>

            <div className="flex justify-between font-mono text-[10px] text-fg-dim uppercase tracking-widest">
              <span>/ portrait</span>
              <span>2026</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
