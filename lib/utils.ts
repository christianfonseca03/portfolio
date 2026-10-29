export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export const pad = (n: number) => String(n).padStart(2, '0')

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export function vibrate(pattern: number | number[]) {
  try { navigator.vibrate?.(pattern) } catch {}
}

/** Índice do card mais próximo num carrossel horizontal com scroll-snap. */
export function snapIndex(el: HTMLElement, count: number) {
  const max = el.scrollWidth - el.clientWidth
  return max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0
}
