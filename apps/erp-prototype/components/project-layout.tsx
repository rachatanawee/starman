'use client'

import { ProjectSidebar } from './project-sidebar'
import { MobileMenu } from './mobile-menu'
import { Breadcrumbs } from './breadcrumbs'
import { ProjectSwitcher } from './project-switcher'
import { useState, useEffect } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Languages, LogOut, User } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface ProjectLayoutProps {
  children: React.ReactNode
  projectId?: string
}

export function ProjectLayout({ children, projectId }: ProjectLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const locale = params.locale as string
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('mock_user')
    if (user) {
      const userData = JSON.parse(user)
      setUserEmail(userData.email)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('mock_token')
    localStorage.removeItem('mock_user')
    router.push(`/${locale}/login`)
  }

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'th' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex min-h-screen w-full">
      <MobileMenu projectId={projectId} />
      <ProjectSidebar 
        collapsed={collapsed} 
        onToggle={() => setCollapsed(!collapsed)}
        projectId={projectId}
      />
      <main 
        className="flex-1 min-h-screen bg-gray-50 transition-all duration-300 w-full overflow-x-hidden pt-16 lg:pt-0"
      >
        {projectId && (
          <div className="hidden lg:flex items-center justify-between bg-white border-b shadow-md px-4 sm:px-6 py-2 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            <Breadcrumbs />
            
            {/* User Controls */}
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <User className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{userEmail || 'User'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9"
                      onClick={switchLocale}
                    >
                      <Languages className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{locale === 'en' ? 'Switch to Thai' : 'Switch to English'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
