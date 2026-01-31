'use client'

import { useSettings } from '@/lib/settings-context'

export function SettingsAwareTitle({ children }: { children: string }) {
  const settings = useSettings()
  
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold">{children}</h2>
    </div>
  )
}
