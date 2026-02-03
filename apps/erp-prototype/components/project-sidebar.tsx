'use client'

import { 
  LayoutDashboard, ChevronLeft, ChevronRight,
  Star, ListTodo, FileText, DollarSign, Users2,
  BarChart3, Users, Settings, Calendar, BookOpen, Network,
  Package2, ShoppingBag, Building2, History, Calculator, GitBranch, ChevronDown
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Button } from '@spark/core'
import { QuickSearch } from '@spark/core'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import { useSettings } from '@spark/core'

interface ProjectSidebarProps {
  collapsed: boolean
  onToggle: () => void
  projectId?: string
}

interface MenuItem {
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  label?: string
  section?: string
  isBack?: boolean
  isGuide?: boolean
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

  const menuItems = useMemo(() => projectId ? [
    { href: `/${locale}/company?select=true`, icon: GitBranch, label: '← All Companies', isBack: true },
    { href: `/${locale}/guide`, icon: BookOpen, label: 'User Guide', isGuide: true },
    { section: 'Sales' },
    { href: `/${locale}/company/${projectId}/quotation`, icon: FileText, label: 'Quotation' },
    { href: `/${locale}/company/${projectId}/sales-order`, icon: ListTodo, label: 'Sales Order' },
    { href: `/${locale}/company/${projectId}/sales-invoice`, icon: DollarSign, label: 'Sales Invoice' },
    { section: 'Production' },
    { href: `/${locale}/company/${projectId}/bom`, icon: GitBranch, label: 'BOM' },
    { href: `/${locale}/company/${projectId}/production-planning`, icon: BarChart3, label: 'Production Planning' },
    { href: `/${locale}/company/${projectId}/production-order`, icon: Calendar, label: 'Production Order' },
    { href: `/${locale}/company/${projectId}/manufacturing`, icon: Settings, label: 'Manufacturing' },
    { section: 'Materials' },
    { href: `/${locale}/company/${projectId}/mrp`, icon: Network, label: 'MRP' },
    { href: `/${locale}/company/${projectId}/purchasing`, icon: ShoppingBag, label: 'Purchasing' },
    { href: `/${locale}/company/${projectId}/inventory`, icon: Package2, label: 'Inventory' },
    { section: 'Reports' },
    { href: `/${locale}/company/${projectId}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
    { href: `/${locale}/company/${projectId}/factory-capacity`, icon: Building2, label: 'Factory Capacity' },
    { href: `/${locale}/company/${projectId}/worker-allowance`, icon: Users2, label: 'Worker Allowance' },
    { href: `/${locale}/company/${projectId}/wip-costing`, icon: DollarSign, label: 'WIP Costing' },
    { href: `/${locale}/company/${projectId}/job-history`, icon: History, label: 'Job History' },
    { section: 'Finance' },
    { href: `/${locale}/company/${projectId}/accounting`, icon: Calculator, label: 'Accounting' },
    { section: 'Settings' },
    { href: `/${locale}/company/${projectId}/settings`, icon: Settings, label: 'Settings' },
    { href: `/${locale}/company/${projectId}/ui-patterns`, icon: Star, label: 'UI Patterns' },
  ] : [
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
