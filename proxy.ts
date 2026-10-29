import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasLocale, locales } from '@/lib/i18n'

const defaultLocale = 'en'

function getPreferredLocale(request: NextRequest): string {
  // Idioma escolhido no menu do site (cookie gravado pelo cliente)
  const saved = request.cookies.get('cf-lang')?.value
  if (saved && hasLocale(saved)) return saved

  const acceptLang = request.headers.get('accept-language') ?? ''
  if (acceptLang.toLowerCase().includes('pt')) return 'pt'
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  const locale = getPreferredLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\..*).*)',],
}
