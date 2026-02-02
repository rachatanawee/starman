'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface Settings {
  theme_name: string
  last_company_id?: string
}

interface SettingsContextType {
  settings: Settings
  updateTheme: (theme: string) => void
  updateLastCompany: (companyId: string) => void
}

const SettingsContext = createContext<SettingsContextType>({
  settings: { theme_name: 'tangerine' },
  updateTheme: () => {},
  updateLastCompany: () => {},
})

export function useSettings() {
  const context = useContext(SettingsContext)
  return context.settings
}

export function useSettingsActions() {
  const context = useContext(SettingsContext)
  return { updateTheme: context.updateTheme, updateLastCompany: context.updateLastCompany }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ theme_name: 'tangerine' })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_name')
    const savedCompany = localStorage.getItem('last_company_id')
    setSettings({ 
      theme_name: savedTheme || 'tangerine',
      last_company_id: savedCompany || undefined
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

  return (
    <SettingsContext.Provider value={{ settings, updateTheme, updateLastCompany }}>
      {children}
    </SettingsContext.Provider>
  )
}
