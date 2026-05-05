'use client'

import { useEffect, useState } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = { t: Dictionary['hero'] }
const revealClass =
  'reveal opacity-0 translate-y-6 transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [transition-delay:var(--delay,0s)] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [&.in-view]:opacity-100 [&.in-view]:translate-y-0'

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span>POA {time}</span>
}

export default function Hero({ t }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden px-6 pt-[clamp(120px,18vh,180px)] pb-[clamp(80px,12vh,120px)] md:px-10 xl:px-16 2xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 min-[960px]:grid-cols-[1.1fr_0.9fr] min-[960px]:gap-16">

        {/* Left column */}
        <div className="flex flex-col">
          {/* Status pill */}
          <div
            className={`${revealClass} inline-flex w-fit items-center gap-2.5 rounded-full border border-white/8 bg-bg-elev px-3.5 py-2 font-mono text-xs text-fg-muted`}
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-[pulse-status_2s_ease-in-out_infinite]" />
            {t.status}
          </div>

          {/* Headline */}
          <h1
            className={`${revealClass} mt-7 font-display font-medium leading-[0.95] tracking-[-0.035em]`}
            style={{
              fontSize: 'clamp(44px, 9vw, 110px)',
              '--delay': '0.1s',
            } as React.CSSProperties}
          >
            <span>{t.title_pre}</span>{' '}
            <span className="italic font-normal text-fg-muted">{t.title_main}</span>
            <br />
            <span>{t.title_post}</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`${revealClass} mt-6 max-w-[540px] text-pretty leading-relaxed text-fg-muted`}
            style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              '--delay': '0.2s',
            } as React.CSSProperties}
          >
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div
            className={`${revealClass} mt-9 flex flex-wrap gap-3`}
            style={{ '--delay': '0.3s' } as React.CSSProperties}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-[22px] py-3.5 text-sm font-semibold bg-accent text-black rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_#00ff88]"
            >
              {t.cta_primary}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/16 px-[22px] py-3.5 text-sm text-fg transition-all hover:border-fg-muted hover:bg-bg-elev"
            >
              {t.cta_secondary}
            </a>
          </div>
        </div>

        {/* Right column — terminal card */}
        <div
          className={revealClass}
          style={{ '--delay': '0.15s' } as React.CSSProperties}
        >
          <div className="bg-linear-to-br from-[#141414] to-[#0c0c0c] border border-white/8 rounded-[14px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] font-mono text-[13px]">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-white/2">
              <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[11px] text-fg-dim">~/christian — zsh</span>
            </div>

            {/* Terminal body */}
            <div className="p-5 leading-[1.7]">
              <div>
                <span className="text-accent">$</span>
                <span className="ml-2 text-fg">whoami</span>
              </div>
              <div className="text-fg-muted pl-[18px] mb-1">christian fonseca</div>

              <div>
                <span className="text-accent">$</span>
                <span className="ml-2 text-fg">cat role.txt</span>
              </div>
              <div className="text-fg-muted pl-[18px] mb-1">Full-stack developer</div>

              <div>
                <span className="text-accent">$</span>
                <span className="ml-2 text-fg">ls skills/</span>
              </div>
              <div className="text-fg-muted pl-[18px] mb-1">
                react/&nbsp; next.js/&nbsp; node/&nbsp; typescript/&nbsp; python/
              </div>

              <div>
                <span className="text-accent">$</span>
                <span className="ml-2 text-fg">echo $STATUS</span>
              </div>
              <div className="text-fg-muted pl-[18px] mb-2">open to remote work</div>

              <div>
                <span className="text-accent">$</span>
                <span className="ml-2" />
                <span
                  className="inline-block h-[14px] w-2 animate-[cursor-blink_1s_steps(2)_infinite] bg-accent align-middle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-[clamp(20px,4vh,40px)] left-6 right-6 flex flex-wrap justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-dim md:left-10 md:right-10 xl:left-16 xl:right-16 2xl:left-20 2xl:right-20">
        <span>{t.based}</span>
        <Clock />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[clamp(60px,10vh,100px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-fg-dim uppercase tracking-[0.15em]">
        <span>{t.scroll}</span>
        <span className="h-12 w-px bg-linear-to-b from-fg-dim to-transparent animate-[scroll-pulse_2s_ease-in-out_infinite]" />
      </div>
    </section>
  )
}
