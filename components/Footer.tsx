import type { Copy } from '@/lib/i18n'
import { SECTIONS } from '@/lib/data'
import { pad } from '@/lib/utils'
import type { NavHandler } from './Portfolio'

export default function Footer({ c, nav }: { c: Copy; nav: NavHandler }) {
  return (
    <footer className="flex flex-col gap-5 border-t border-ink px-(--gutter) pt-[26px] pb-8 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-16 md:gap-y-8 md:pt-12 md:pb-12">
      <div className="flex items-end justify-between gap-4 md:flex-col md:items-start md:justify-start">
        <span className="font-display text-[44px] leading-[0.9] md:text-[72px]">CF<span className="text-acc">_</span></span>
        <span aria-hidden="true" className="h-[34px] w-[120px] bg-barcode" />
      </div>
      <nav className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-3 lg:grid-cols-4 md:self-end">
        {SECTIONS.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={nav(id)}
            className="flex min-h-8 items-center gap-2 text-xs tracking-[0.06em] uppercase hover:text-acc"
          >
            <span className="text-acc">{pad(i + 1)}</span>
            {c.secs[i]}
          </a>
        ))}
      </nav>
      <span className="text-[11px] leading-[17px] text-mute md:col-span-2 md:border-t md:border-line md:pt-5">{c.copyright}</span>
    </footer>
  )
}
