'use client'

import { useEffect } from 'react'
import { useSettings } from '@/lib/settings-context'

interface DynamicTitleProps {
  pageTitle?: string
}

export function DynamicTitle({ pageTitle }: DynamicTitleProps) {
  const settings = useSettings()

  useEffect(() => {
    // Read directly from localStorage to ensure we get the latest value
    const savedAppName = localStorage.getItem('app_name')
    const appName = savedAppName || settings.app_name || 'Starman ERP'
    
    if (pageTitle) {
      document.title = `${pageTitle} - ${appName}`
    } else {
      document.title = appName
    }
  }, [pageTitle, settings.app_name])

  return null
}
