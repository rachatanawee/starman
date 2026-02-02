'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { appConfig } from './app.config'

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
  settings: { theme_name: appConfig.themes[0].id },
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
  const [settings, setSettings] = useState<Settings>({ theme_name: appConfig.themes[0].id })

  useEffect(() => {
    const savedTheme = localStorage.getItem(appConfig.storage.theme)
    const savedCompany = localStorage.getItem(appConfig.storage.lastCompany)
    const savedAppName = localStorage.getItem(appConfig.storage.appName)
    const savedAppIcon = localStorage.getItem(appConfig.storage.appIcon)
    setSettings({ 
      theme_name: savedTheme || appConfig.themes[0].id,
      last_company_id: savedCompany || undefined,
      app_name: savedAppName || appConfig.app.defaultName,
      app_icon: savedAppIcon || appConfig.app.defaultIcon
    })
  }, [])

  const updateTheme = (theme: string) => {
    setSettings(prev => ({ ...prev, theme_name: theme }))
    localStorage.setItem(appConfig.storage.theme, theme)
  }

  const updateLastCompany = (companyId: string) => {
    setSettings(prev => ({ ...prev, last_company_id: companyId }))
    localStorage.setItem(appConfig.storage.lastCompany, companyId)
  }

  const updateAppName = (name: string) => {
    setSettings(prev => ({ ...prev, app_name: name }))
    localStorage.setItem(appConfig.storage.appName, name)
  }

  const updateAppIcon = (icon: string) => {
    setSettings(prev => ({ ...prev, app_icon: icon }))
    localStorage.setItem(appConfig.storage.appIcon, icon)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateTheme, updateLastCompany, updateAppName, updateAppIcon }}>
      {children}
    </SettingsContext.Provider>
  )
}
