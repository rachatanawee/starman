'use client'

import { useEffect } from 'react'
import { useSettings } from '@/lib/settings-context'

export function ThemeLoader() {
  const settings = useSettings()

  useEffect(() => {
    // Remove existing theme link
    const existingLink = document.getElementById('theme-stylesheet')
    if (existingLink) {
      existingLink.remove()
    }

    // Add new theme CSS if not default
    if (settings.theme_name && settings.theme_name !== 'default' && settings.theme_name !== 'tangerine') {
      const link = document.createElement('link')
      link.id = 'theme-stylesheet'
      link.rel = 'stylesheet'
      link.href = `/themes/${settings.theme_name}.css`
      document.head.appendChild(link)
    }
  }, [settings.theme_name])

  return null
}
