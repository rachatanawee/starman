'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface Settings {
  theme_name: string
  last_company_id?: string
  app_name?: string
  app_icon?: string
}

interface SettingsContextType {
  settings: Settings
  updateTheme: (theme: string) => void
  updateLastCompany: (companyId: string) => void
  updateAppName: (name: string) => void
  updateAppIcon: (icon: string) => void
}

const SettingsContext = createContext<SettingsContextType>({
  settings: { theme_name: 'tangerine' },
  updateTheme: () => {},
  updateLastCompany: () => {},
  updateAppName: () => {},
  updateAppIcon: () => {},
})

export function useSettings() {
  const context = useContext(SettingsContext)
  return context.settings
}

export function useSettingsActions() {
  const context = useContext(SettingsContext)
  return { 
    updateTheme: context.updateTheme, 
    updateLastCompany: context.updateLastCompany,
    updateAppName: context.updateAppName,
    updateAppIcon: context.updateAppIcon
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ theme_name: 'tangerine' })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_name')
    const savedCompany = localStorage.getItem('last_company_id')
    const savedAppName = localStorage.getItem('app_name')
    const savedAppIcon = localStorage.getItem('app_icon')
    setSettings({ 
      theme_name: savedTheme || 'tangerine',
      last_company_id: savedCompany || undefined,
      app_name: savedAppName || 'Starman ERP',
      app_icon: savedAppIcon || 'GitBranch'
    })
  }, [])

  const updateTheme = (theme: string) => {
    console.log('🔄 Updating theme to:', theme)
    setSettings(prev => ({ ...prev, theme_name: theme }))
    localStorage.setItem('theme_name', theme)
  }

  const updateLastCompany = (companyId: string) => {
    setSettings(prev => ({ ...prev, last_company_id: companyId }))
    localStorage.setItem('last_company_id', companyId)
  }

  const updateAppName = (name: string) => {
    setSettings(prev => ({ ...prev, app_name: name }))
    localStorage.setItem('app_name', name)
  }

  const updateAppIcon = (icon: string) => {
    setSettings(prev => ({ ...prev, app_icon: icon }))
    localStorage.setItem('app_icon', icon)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateTheme, updateLastCompany, updateAppName, updateAppIcon }}>
      {children}
    </SettingsContext.Provider>
  )
}
