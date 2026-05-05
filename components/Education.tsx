import { EDUCATION_DATA } from '@/lib/data'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = {
  t:    Dictionary['education']
  lang: string
}
const revealClass =
  'reveal opacity-0 translate-y-6 transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [transition-delay:var(--delay,0s)] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [&.in-view]:opacity-100 [&.in-view]:translate-y-0'

export default function Education({ t, lang }: Props) {
  return (
    <section id="education" className="px-6 py-[clamp(112px,16vw,240px)] md:px-10 xl:px-16 2xl:px-20">
      <div className="max-w-[1240px] mx-auto">

        {/* Section head */}
        <div className={`${revealClass} mb-[clamp(48px,8vw,80px)] max-w-[720px]`}>
          <span className="block font-mono text-xs tracking-[0.12em] uppercase mb-4 text-accent">
            {t.kicker}
          </span>
          <h2
            className="font-display font-medium leading-none tracking-[-0.03em] text-balance"
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

        {/* Timeline */}
        <div
          className={`${revealClass} relative pl-7`}
          style={{ '--delay': '0.1s' } as React.CSSProperties}
        >
          {/* Vertical rail */}
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-linear-to-b from-white/16 to-transparent" />

          {EDUCATION_DATA.map((item, i) => (
            <div
              key={item.school + item.title_en}
              className="relative py-6 border-b border-white/8 last:border-0"
            >
              {/* Timeline dot */}
              <div
                className={[
                  'absolute left-[-28px] top-[30px] w-[11px] h-[11px] rounded-full border-2 border-bg',
                  item.status === 'progress'
                    ? 'bg-accent animate-[pulse-dot-ring_2s_ease-in-out_infinite]'
                    : 'bg-fg-dim shadow-[0_0_0_1px_rgba(255,255,255,0.16)]',
                ].join(' ')}
              />

              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-[11px] text-fg-dim uppercase tracking-[0.08em]">
                  {lang === 'pt' ? item.period_pt : item.period}
                </span>
                <span
                  className={[
                    'font-mono text-[10px] px-2 py-[3px] rounded-full border border-white/8 uppercase tracking-[0.06em]',
                    item.status === 'progress' ? 'text-accent' : 'text-fg-dim',
                  ].join(' ')}
                >
                  {item.status === 'progress' ? t.status_progress : t.status_done}
                </span>
              </div>

              <h3
                className="font-display font-medium tracking-[-0.015em] mb-1"
                style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
              >
                {lang === 'pt' ? item.title_pt : item.title_en}
              </h3>
              <p className="text-fg-muted text-sm">{item.school}</p>
            </div>
          ))}
        </div>

        {/* Continuous learning callout */}
        <div
          className={`${revealClass} mt-12 rounded-[14px] border border-white/8 bg-bg-elev p-7`}
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        >
          <p className="font-mono text-sm uppercase tracking-[0.06em] text-fg-muted mb-2">
            {t.extra_title}
          </p>
          <p className="text-[15px] leading-relaxed max-w-[72ch] text-pretty">{t.extra_body}</p>
        </div>

      </div>
    </section>
  )
}
