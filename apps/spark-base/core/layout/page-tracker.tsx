'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views here if needed
    console.log('Page view:', pathname)
  }, [pathname])

  return null
}
