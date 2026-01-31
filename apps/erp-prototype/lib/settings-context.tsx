'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface Settings {
  theme_name: string
}

interface SettingsContextType {
  settings: Settings
  updateTheme: (theme: string) => void
}

const SettingsContext = createContext<SettingsContextType>({
  settings: { theme_name: 'tangerine' },
  updateTheme: () => {},
})

export function useSettings() {
  const context = useContext(SettingsContext)
  return context.settings
}

export function useSettingsActions() {
  const context = useContext(SettingsContext)
  return { updateTheme: context.updateTheme }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ theme_name: 'tangerine' })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_name')
    if (savedTheme) {
      setSettings({ theme_name: savedTheme })
    }
  }, [])

  const updateTheme = (theme: string) => {
    console.log('🔄 Updating theme to:', theme)
    setSettings({ theme_name: theme })
    localStorage.setItem('theme_name', theme)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateTheme }}>
      {children}
    </SettingsContext.Provider>
  )
}
