'use client'

import { 
  LayoutDashboard, ChevronLeft, ChevronRight,
  Star, Users, BookOpen, ChevronDown, GitBranch
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { QuickSearch } from '@/core/layout/quick-search'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import { useSettings } from '@/core/settings/settings-context'
import { getProjectMenuItems, type MenuItem } from '@/modules/common/lib/sidebar-config'

interface ProjectSidebarProps {
  collapsed: boolean
  onToggle: () => void
  projectId?: string
}

export function ProjectSidebar({ collapsed, onToggle, projectId }: ProjectSidebarProps) {
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string
  const settings = useSettings()
  const appName = settings.app_name || 'Starman ERP'
  const appIcon = settings.app_icon || 'GitBranch'
  const AppIcon = (LucideIcons as any)[appIcon] || (LucideIcons as any).GitBranch
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar_collapsed_sections')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse saved sections', e)
        }
      }
    }
    return {}
  })
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const [showTopFade, setShowTopFade] = useState(false)
  const [showBottomFade, setShowBottomFade] = useState(false)

  // Set mounted flag
  useEffect(() => {
    setMounted(true)
  }, [])

  // Restore scroll position from localStorage on mount
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const savedScrollPosition = localStorage.getItem('sidebar_scroll_position')
    if (savedScrollPosition) {
      const scrollPos = parseInt(savedScrollPosition, 10)
      if (!isNaN(scrollPos)) {
        // Use requestAnimationFrame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
          nav.scrollTop = scrollPos
        })
      }
    }
  }, [])

  // Save scroll position to localStorage on every scroll
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      // Debounce to avoid too many localStorage writes
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        localStorage.setItem('sidebar_scroll_position', nav.scrollTop.toString())
      }, 100)
    }

    nav.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      nav.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle fade indicators on scroll
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const updateFadeIndicators = () => {
      const { scrollTop, scrollHeight, clientHeight } = nav
      setShowTopFade(scrollTop > 10)
      setShowBottomFade(scrollTop + clientHeight < scrollHeight - 10)
    }

    // Initial check with a small delay to ensure DOM is ready
    const timer = setTimeout(updateFadeIndicators, 100)
    
    nav.addEventListener('scroll', updateFadeIndicators, { passive: true })
    
    return () => {
      clearTimeout(timer)
      nav.removeEventListener('scroll', updateFadeIndicators)
    }
  }, [mounted, collapsed, collapsedSections])

  const toggleSection = (section: string) => {
    setCollapsedSections((prev: Record<string, boolean>) => {
      const newState = { ...prev, [section]: !prev[section] }
      localStorage.setItem('sidebar_collapsed_sections', JSON.stringify(newState))
      return newState
    })
  }

  const menuItems = useMemo(() => projectId ? getProjectMenuItems(locale, projectId) : [
    { href: `/${locale}/company`, icon: GitBranch, label: 'Companies' },
    { href: `/${locale}/users`, icon: Users, label: 'User Management' },
    { href: `/${locale}/guide`, icon: BookOpen, label: 'User Guide', isGuide: true },
  ], [locale, projectId])

  return (
    <div 
      className={`hidden lg:block flex-shrink-0 h-screen border-r bg-white transition-all duration-300 ease-in-out sticky top-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <AppIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">{appName}</h2>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className={collapsed ? 'mx-auto' : ''}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Quick Search */}
      {!collapsed && projectId && (
        <div className="p-2 border-b">
          <QuickSearch />
        </div>
      )}

      {/* Navigation */}
      <div className="relative flex-1 overflow-hidden">
        {/* Top fade overlay */}
        <div 
          className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            showTopFade ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <nav ref={navRef} className="absolute inset-0 space-y-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {menuItems.map((item, index) => {
          const menuItem = item as MenuItem
          
          if (menuItem.section) {
            const sectionName = menuItem.section
            const isCollapsed = mounted ? collapsedSections[sectionName] : false
            return !collapsed ? (
              <div key={index}>
                <button
                  onClick={() => toggleSection(sectionName)}
                  className="w-full flex items-center justify-between px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                >
                  <span>{sectionName}</span>
                  {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
              </div>
            ) : (
              <div key={index} className="border-t my-2"></div>
            )
          }

          if (!menuItem.href || !menuItem.icon) return null
          
          const Icon = menuItem.icon
          const isActive = pathname === menuItem.href || pathname.startsWith(menuItem.href + '/')
          const isBackButton = menuItem.isBack
          const isGuideButton = menuItem.isGuide
          const section = menuItems.slice(0, index).reverse().find(i => (i as MenuItem).section) as MenuItem
          const sectionName = section?.section || ''
          const isSectionCollapsed = mounted && sectionName ? collapsedSections[sectionName] : false
          
          if (isSectionCollapsed && !collapsed) return null
          
          return (
            <div key={menuItem.href}>
              {isBackButton && <div className="border-b my-2"></div>}
              <Link
                href={menuItem.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : isBackButton
                    ? 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                    : isGuideButton
                    ? 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{menuItem.label}</span>}
              </Link>
              {(isBackButton || isGuideButton) && <div className="border-b my-2"></div>}
            </div>
          )
        })}
      </nav>
      
      {/* Bottom fade overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
          showBottomFade ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
      </div>
    </div>
  )
}
