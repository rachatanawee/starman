'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.transform = 'translateY(10px)'
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'translateY(0)'
        }
      })
    }
  }, [pathname])

  return (
    <div ref={ref} className="transition-all duration-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
      {children}
    </div>
  )
}
