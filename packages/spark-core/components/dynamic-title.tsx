'use client'

import { useEffect } from 'react'
import { useSettings } from '../lib/settings-context'

interface DynamicTitleProps {
  pageTitle?: string
}

// SVG icon generator for favicon
const generateIconSVG = (iconName: string, themeName: string = 'tangerine') => {
  // Theme colors
  const themeColors: Record<string, string> = {
    'tangerine': '#f97316',
    'ocean-breeze': '#0ea5e9',
    'claude': '#d97706',
    'forest-green': '#16a34a',
    'royal-purple': '#9333ea',
    'crimson-red': '#dc2626',
    'clean-slate': '#64748b',
    'twitter': '#1d9bf0'
  }
  
  const color = themeColors[themeName] || themeColors.tangerine
  
  const icons: Record<string, string> = {
    GitBranch: `<path d="M6 3v12m12-12v12M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6-6 6-6"/>`,
    Star: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    Zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    Rocket: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`,
    Heart: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
    Sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>`,
    Building2: `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>`,
    Settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
    Shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    Globe: `<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`
  }
  
  const path = icons[iconName] || icons.GitBranch
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`)}`
}

export function DynamicTitle({ pageTitle }: DynamicTitleProps) {
  const settings = useSettings()
  const { app_name, app_icon, theme_name } = settings

  useEffect(() => {
    // Update title
    const savedAppName = localStorage.getItem('app_name')
    const appName = savedAppName || app_name || 'Starman ERP'
    
    if (pageTitle) {
      document.title = `${pageTitle} - ${appName}`
    } else {
      document.title = appName
    }

    // Update favicon
    const savedIcon = localStorage.getItem('app_icon')
    const iconName = savedIcon || app_icon || 'GitBranch'
    const themeName = theme_name || 'tangerine'
    const iconSVG = generateIconSVG(iconName, themeName)
    
    // Remove existing dynamic favicon
    const existingFavicon = document.querySelector('link[rel="icon"][data-dynamic]')
    if (existingFavicon) {
      existingFavicon.remove()
    }
    
    // Add new favicon
    const link = document.createElement('link')
    link.rel = 'icon'
    link.href = iconSVG
    link.setAttribute('data-dynamic', 'true')
    document.head.appendChild(link)
  }, [pageTitle, app_name, app_icon, theme_name])

  return null
}
