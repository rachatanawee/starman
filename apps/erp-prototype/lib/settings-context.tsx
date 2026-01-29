'use client'

import { createContext, useContext } from 'react'

const SettingsContext = createContext<Record<string, string>>({})

export function useSettings() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  return <SettingsContext.Provider value={{}}>{children}</SettingsContext.Provider>
}
