import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localePrefix: 'always'
})

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  if (pathname.startsWith('/api') || pathname.startsWith(`${basePath}/api`)) {
    return NextResponse.next()
  }

  if (pathname === basePath || pathname === `${basePath}/`) {
    return NextResponse.redirect(new URL(`${basePath}/en/login`, request.url))
  }

  // Prototype: No authentication required
  // All pages are accessible without login
  
  const response = intlMiddleware(request)
  return response
}

export const config = {
  matcher: [
    '/',
    '/crmpredict',
    '/crmpredict/',
    '/((?!api|_next|.*\\..*).*)'
  ]
}
