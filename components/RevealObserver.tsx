'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    const observePending = () => {
      const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in-view)')
      els.forEach((el) => obs.observe(el))
    }

    observePending()

    // Captura elementos inseridos/renderizados após transições de rota/idioma.
    const mo = new MutationObserver(() => observePending())
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      mo.disconnect()
      obs.disconnect()
    }
  }, [pathname])

  return null
}
