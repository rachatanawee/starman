'use client'

import { Sidebar } from './sidebar'
import { useState } from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={`flex-1 h-screen overflow-auto bg-gray-50 p-6 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-52'}`}>
        {children}
      </main>
    </div>
  )
}
