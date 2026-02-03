'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Save current page to localStorage (exclude login/logout pages)
    if (pathname && !pathname.includes('/login') && !pathname.includes('/logout')) {
      localStorage.setItem('last_page', pathname)
    }
  }, [pathname])

  return null
}
