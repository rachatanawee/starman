'use client'

import { 
  LayoutDashboard, LogOut, ChevronLeft, ChevronRight, Languages,
  GitBranch, ListTodo, FileText, DollarSign, Users2,
  BarChart3, Users, Settings, Calendar, BookOpen, Network,
  Package2, ShoppingBag, Building2, History, Calculator
} from 'lucide-react'
import { Button } from './ui/button'
import { QuickSearch } from './quick-search'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface ProjectSidebarProps {
  collapsed: boolean
  onToggle: () => void
  projectId?: string
}

export function ProjectSidebar({ collapsed, onToggle, projectId }: ProjectSidebarProps) {
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

  const menuItems = projectId ? [
    { href: `/${locale}/company`, icon: GitBranch, label: '← All Companies', isBack: true },
    { href: `/${locale}/guide`, icon: BookOpen, label: 'User Guide', isGuide: true },
    { section: 'Sales' },
    { href: `/${locale}/company/${projectId}/quotation`, icon: FileText, label: 'Quotation' },
    { href: `/${locale}/company/${projectId}/sales-order`, icon: ListTodo, label: 'Sales Order' },
    { href: `/${locale}/company/${projectId}/sales-invoice`, icon: DollarSign, label: 'Sales Invoice' },
    { section: 'Production' },
    { href: `/${locale}/company/${projectId}/bom`, icon: GitBranch, label: 'BOM' },
    { href: `/${locale}/company/${projectId}/production-order`, icon: Calendar, label: 'Production Order' },
    { href: `/${locale}/company/${projectId}/production-planning`, icon: BarChart3, label: 'Production Planning' },
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
    { href: `/${locale}/company/${projectId}/team`, icon: Users, label: 'Team' },
    { href: `/${locale}/company/${projectId}/settings`, icon: Settings, label: 'Settings' },
  ] : [
    { href: `/${locale}/company`, icon: GitBranch, label: 'Companies' },
    { href: `/${locale}/guide`, icon: BookOpen, label: 'User Guide', isGuide: true },
  ]

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
            <div className="bg-purple-500 p-1.5 rounded-lg">
              <GitBranch className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">ERP System</h2>
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
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          if ((item as any).section) {
            return !collapsed ? (
              <div key={index} className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {(item as any).section}
              </div>
            ) : (
              <div key={index} className="border-t my-2"></div>
            )
          }

          if (!item.href || !item.icon) return null
          
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const isBackButton = (item as any).isBack
          const isGuideButton = (item as any).isGuide
          
          return (
            <div key={item.href}>
              {isBackButton && <div className="border-b my-2"></div>}
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'bg-purple-100 text-purple-700'
                    : isBackButton
                    ? 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                    : isGuideButton
                    ? 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
              {(isBackButton || isGuideButton) && <div className="border-b my-2"></div>}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-2 space-y-1">
        {!collapsed && userEmail && (
          <div className="px-3 py-2 text-xs text-gray-600 truncate">
            {userEmail}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start'}`}
          onClick={switchLocale}
        >
          <Languages className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
          {!collapsed && (locale === 'en' ? 'ไทย' : 'EN')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start'}`}
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
          {!collapsed && 'Logout'}
        </Button>
      </div>
      </div>
    </div>
  )
}
