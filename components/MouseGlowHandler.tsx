'use client'

import { useEffect } from 'react'

export default function MouseGlowHandler() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('.project-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }, [])

  return null
}
