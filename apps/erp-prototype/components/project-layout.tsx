'use client'

import { ProjectSidebar } from './project-sidebar'
import { Breadcrumbs } from './breadcrumbs'
import { ProjectSwitcher } from './project-switcher'
import { useState } from 'react'

interface ProjectLayoutProps {
  children: React.ReactNode
  projectId?: string
}

export function ProjectLayout({ children, projectId }: ProjectLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <ProjectSidebar 
        collapsed={collapsed} 
        onToggle={() => setCollapsed(!collapsed)}
        projectId={projectId}
      />
      <main 
        className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {projectId && (
          <div className="bg-white border-b px-6 py-4">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
