import { PROJECT_DATA } from '@/lib/data'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = {
  t:    Dictionary['projects']
  lang: string
}
const revealClass =
  'reveal opacity-0 translate-y-6 transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [transition-delay:var(--delay,0s)] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [&.in-view]:opacity-100 [&.in-view]:translate-y-0'

const DiagonalSVG = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="proj-diag" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#proj-diag)" />
  </svg>
)

export default function Projects({ t, lang }: Props) {
  return (
    <section id="projects" className="px-6 py-[clamp(112px,16vw,240px)] md:px-10 xl:px-16 2xl:px-20">
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

        {/* Cards grid */}
        <div className="grid gap-6 min-[720px]:grid-cols-2">
          {PROJECT_DATA.map((project, i) => (
            <a
              key={project.name}
              href={`https://github.com/christianfonseca03`}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group ${revealClass} relative block overflow-hidden rounded-[14px] border border-white/8 bg-bg-elev transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/16`}
              style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              {/* Glow layer */}
              <div className="pointer-events-none absolute -inset-px z-1 rounded-[inherit] opacity-0 mix-blend-screen transition-opacity duration-400 group-hover:opacity-[0.18] [background:radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),#00ff88_0%,transparent_30%)]" />

              <div className="relative z-10 p-6 flex flex-col gap-[18px] h-full">
                {/* Head: number + year */}
                <div className="flex justify-between font-mono text-[11px] text-fg-dim uppercase tracking-widest">
                  <span className="text-accent">0{i + 1}</span>
                  <span>{project.year}</span>
                </div>

                {/* Visual placeholder */}
                <div className="relative aspect-video bg-bg-elev-2 border border-white/8 rounded-[8px] overflow-hidden flex items-center justify-center transition-transform duration-600 group-hover:scale-[1.02]">
                  <DiagonalSVG />
                  <span className="relative font-mono text-[11px] text-fg-dim tracking-wider">
                    [ project preview ]
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-2.5 flex-1">
                  <h3 className="font-display text-[22px] font-medium tracking-[-0.02em] transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed text-pretty">
                    {lang === 'pt' ? project.desc_pt : project.desc_en}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-1 bg-bg-elev-2 border border-white/8 rounded-full text-fg-muted tracking-[0.02em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-auto pt-3 border-t border-white/8">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted tracking-[0.04em] transition-all group-hover:text-accent group-hover:gap-3">
                    {t.view} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
