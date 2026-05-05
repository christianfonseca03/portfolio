'use client'

import { useState } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Props = { t: Dictionary['contact'] }

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const channels = [
  {
    id:    'whatsapp',
    label: 'WhatsApp',
    value: '+55 51 99347-7433',
    href:  'https://wa.me/5551993477433?text=Hi%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20chat!',
    Icon:  WhatsAppIcon,
  },
  {
    id:    'linkedin',
    label: 'LinkedIn',
    value: 'christian-germano-fonseca',
    href:  'https://www.linkedin.com/in/christian-germano-fonseca',
    Icon:  LinkedInIcon,
  },
  {
    id:    'email',
    label: 'Email',
    value: 'chrisgfwheller@hotmail.com',
    href:  'mailto:chrisgfwheller@hotmail.com',
    Icon:  MailIcon,
  },
  {
    id:    'github',
    label: 'GitHub',
    value: 'christianfonseca03',
    href:  'https://github.com/christianfonseca03',
    Icon:  GitHubIcon,
  },
]

export default function Contact({ t }: Props) {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('chrisgfwheller@hotmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="py-[var(--section-pad)] pb-[clamp(120px,16vw,200px)] px-[var(--gutter)]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="reveal relative bg-gradient-to-b from-bg-elev to-bg border border-white/8 rounded-[clamp(20px,3vw,32px)] p-[clamp(40px,6vw,80px)] overflow-hidden">

          {/* Accent radial */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(0,255,136,0.08),transparent_50%)]" />

          {/* Head */}
          <div className="relative mb-12 max-w-[600px]">
            <span className="block font-mono text-xs tracking-[0.12em] uppercase mb-4 text-accent">
              {t.kicker}
            </span>
            <h2
              className="font-display font-medium leading-[1] tracking-[-0.03em] mt-4 text-balance"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
            >
              {t.title}
            </h2>
            <p
              className="text-fg-muted mt-4 text-pretty"
              style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
            >
              {t.subtitle}
            </p>
          </div>

          {/* Channels */}
          <div className="relative grid gap-px bg-white/8 border border-white/8 rounded-[14px] overflow-hidden mb-8 min-[720px]:grid-cols-2">
            {channels.map(({ id, label, value, href, Icon }) => (
              <a
                key={id}
                href={href}
                target={id !== 'email' ? '_blank' : undefined}
                rel={id !== 'email' ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 px-6 py-5 bg-bg transition-all duration-200 hover:bg-bg-elev hover:pl-7"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-[8px] bg-bg-elev-2 border border-white/8 text-fg shrink-0 transition-all group-hover:text-accent group-hover:border-accent">
                  <Icon />
                </span>
                <span className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-mono text-[13px] text-fg-dim uppercase tracking-[0.06em]">{label}</span>
                  <span className="text-[15px] text-fg truncate">{value}</span>
                </span>
                <span className="text-fg-dim text-base transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="relative flex gap-3 flex-wrap">
            <a
              href="https://wa.me/5551993477433?text=Hi%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20chat!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-[22px] py-3.5 text-sm font-semibold bg-accent text-black rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_#00ff88]"
            >
              {t.cta} →
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2.5 px-[22px] py-3.5 text-sm text-fg border border-white/[16%] rounded-full transition-all hover:bg-bg-elev hover:border-fg-muted"
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>

          {/* Response time */}
          <div className="relative mt-8 flex items-center gap-2.5 font-mono text-xs text-fg-dim">
            <span className="w-2 h-2 rounded-full bg-accent [animation:pulse-status_2s_ease-in-out_infinite]" />
            {t.response}
          </div>

        </div>
      </div>
    </section>
  )
}
