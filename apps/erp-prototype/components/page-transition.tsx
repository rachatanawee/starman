'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.opacity = '1'
        }
      })
    }
  }, [pathname])

  return (
    <div ref={ref} className="transition-opacity duration-200" style={{ opacity: 1 }}>
      {children}
    </div>
  )
}
