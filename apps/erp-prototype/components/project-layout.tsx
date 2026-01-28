'use client'

import { ProjectSidebar } from './project-sidebar'
import { Breadcrumbs } from './breadcrumbs'
import { ProjectSwitcher } from './project-switcher'
import { AIChatWidget } from './ai-chat-widget'
import { useState } from 'react'

interface ProjectLayoutProps {
  children: React.ReactNode
  projectId?: string
}

export function ProjectLayout({ children, projectId }: ProjectLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen w-full">
      <ProjectSidebar 
        collapsed={collapsed} 
        onToggle={() => setCollapsed(!collapsed)}
        projectId={projectId}
      />
      <main 
        className="flex-1 min-h-screen bg-gray-50 transition-all duration-300 min-w-0"
      >
        {projectId && (
          <div className="bg-white border-b shadow-md px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
      <AIChatWidget />
    </div>
  )
}
