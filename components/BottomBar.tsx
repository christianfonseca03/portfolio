// Barra fixa inferior — fora de uso por enquanto (ainda em avaliação).
import type { Copy } from '@/lib/i18n'
import { pad } from '@/lib/utils'
import ReadingProgress from './ReadingProgress'

type Props = { c: Copy; cur: number; onMenu: () => void }

export default function BottomBar({ c, cur, onMenu }: Props) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 box-border grid grid-cols-[auto_minmax(0,1fr)_auto_auto] border-t border-ink bg-bg pb-[env(safe-area-inset-bottom)]">
      <span className="flex items-center gap-[7px] px-3 text-[10.5px] tracking-[0.06em] uppercase md:px-6">
        <span className="size-[7px] animate-blink-slow rounded-full bg-acc" />
        <span className="hidden min-[400px]:inline">{c.secure}</span>
      </span>
      <button
        type="button"
        onClick={onMenu}
        className="flex min-h-[52px] items-center justify-center gap-2 overflow-hidden bg-acc text-[12.5px] font-semibold tracking-[0.1em] whitespace-nowrap text-white uppercase"
      >
        &gt; {c.secs[cur]}
        <span className="animate-blink">_</span>
      </button>
      <ReadingProgress label={c.progress} className="pl-3 md:pl-6" />
      <span className="flex items-center px-3 text-[10.5px] tracking-[0.06em] tabular-nums md:px-6">SCN: {pad(cur + 1)}</span>
    </nav>
  )
}
