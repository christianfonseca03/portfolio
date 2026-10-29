'use client'

import { useSyncExternalStore } from 'react'

const everySecond = (cb: () => void) => {
  const id = setInterval(cb, 1000)
  return () => clearInterval(id)
}
const currentSecond = () => Math.floor(Date.now() / 1000) * 1000

/** Timestamp atualizado a cada segundo; `null` no servidor/hidratação. */
export function useNow(): number | null {
  return useSyncExternalStore(everySecond, currentSecond, () => null)
}

const REDUCED = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(REDUCED)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  )
}

// Contador de visitas (SCN_NNNN): incrementa uma vez por carregamento da página.
let edition: number | undefined
function readEdition() {
  if (edition === undefined) {
    edition = 1
    try {
      edition = (parseInt(localStorage.getItem('cf-scn') || '0', 10) || 0) + 1
      localStorage.setItem('cf-scn', String(edition))
    } catch {}
  }
  return edition
}
const noSubscribe = () => () => {}

/** Número da visita atual; `0` no servidor/hidratação. */
export function useEdition() {
  return useSyncExternalStore(noSubscribe, readEdition, () => 0)
}
