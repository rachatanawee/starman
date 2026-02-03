'use client'

import { useEffect } from 'react'
import { useSettings } from '../lib/settings-context'

export function ThemeLoader() {
  const settings = useSettings()

  useEffect(() => {
    const theme = settings.theme_name || 'tangerine'
    console.log('🎨 Loading theme:', theme)
    
    document.documentElement.setAttribute('data-theme', theme)

    const existingLink = document.querySelector('link[data-theme-link]')
    if (existingLink) {
      existingLink.remove()
    }

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${basePath}/themes/${theme}.css`
    link.setAttribute('data-theme-link', 'true')
    
    link.onload = () => {
      console.log('✅ Theme loaded successfully:', theme)
    }
    
    link.onerror = () => {
      console.error('❌ Failed to load theme:', theme)
    }
    
    document.head.appendChild(link)

    // Add smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease'
  }, [settings.theme_name])

  return null
}
