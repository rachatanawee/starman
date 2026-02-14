'use client'

import { 
  Menu, X, Star, LogOut, Languages, Search,
  LayoutDashboard, ListTodo, FileText, DollarSign, Users2,
  BarChart3, Users, Settings, Calendar, BookOpen, Network,
  Package2, ShoppingBag, Building2, History, Calculator, GitBranch, ChevronDown, ChevronRight, QrCode
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

interface MobileMenuProps {
  projectId?: string
}

export function MobileMenu({ projectId }: MobileMenuProps) {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const locale = params.locale as string
  const [isOpen, setIsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('mobile_sidebar_collapsed')
    if (saved) setCollapsed(JSON.parse(saved))
    
    const user = localStorage.getItem('mock_user')
    if (user) setUserEmail(JSON.parse(user).email)
  }, [])

  const toggleSection = (section: string) => {
    const newState = { ...collapsed, [section]: !collapsed[section] }
    setCollapsed(newState)
    localStorage.setItem('mobile_sidebar_collapsed', JSON.stringify(newState))
  }

  const handleLogout = () => {
    localStorage.removeItem('mock_token')
    localStorage.removeItem('mock_user')
    router.push(`/${locale}/login`)
  }

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'th' : 'en'
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`))
  }

  const menuItems = projectId ? [
    { href: `/${locale}/company?select=true`, icon: GitBranch, label: '← All Companies', isBack: true },
    { href: `/${locale}/guide`, icon: BookOpen, label: 'User Guide', isGuide: true },
    { section: 'Main' },
    { href: `/${locale}/company/${projectId}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
    { href: `/${locale}/company/${projectId}/sales-order`, icon: ListTodo, label: 'Sales Order' },
    { href: `/${locale}/company/${projectId}/assets`, icon: QrCode, label: 'Assets' },
    { section: 'Settings' },
    { href: `/${locale}/company/${projectId}/settings`, icon: Settings, label: 'Settings' },
    { href: `/${locale}/company/${projectId}/ui-patterns`, icon: Star, label: 'UI Patterns' },
  ] : [
    { href: `/${locale}/company`, icon: GitBranch, label: 'Companies' },
    { href: `/${locale}/users`, icon: Users, label: 'User Management' },
    { href: `/${locale}/guide`, icon: BookOpen, label: 'User Guide', isGuide: true },
  ]

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return menuItems
    const query = searchQuery.toLowerCase()
    const filtered: typeof menuItems = []
    let currentSection: any = null

    menuItems.forEach((item) => {
      if ((item as any).section) {
        currentSection = item
      } else if (item.label?.toLowerCase().includes(query)) {
        if (currentSection && !filtered.includes(currentSection)) {
          filtered.push(currentSection)
        }
        filtered.push(item)
      }
    })
    return filtered
  }, [menuItems, searchQuery])

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Star className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Starman ERP</h2>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="lg:hidden fixed top-0 right-0 w-80 max-h-screen bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Star className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Starman ERP</h2>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="flex-shrink-0 p-3 border-b bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 text-base bg-white"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="overflow-y-auto p-3 space-y-0.5">
              {filteredItems.map((item, index) => {
                const section = (item as any).section
                if (section) {
                  return (
                    <button
                      key={index}
                      onClick={() => toggleSection(section)}
                      className="w-full flex items-center justify-between px-3 pt-2.5 pb-1.5 text-sm font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 active:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{section}</span>
                      {collapsed[section] ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  )
                }

                if (!item.href || !item.icon) return null
                
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const isBack = (item as any).isBack
                const isGuide = (item as any).isGuide
                const prevSection = filteredItems.slice(0, index).reverse().find(i => (i as any).section) as any
                if (prevSection && collapsed[prevSection.section]) return null
                
                return (
                  <div key={item.href}>
                    {isBack && <div className="border-b my-1.5" />}
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-base font-medium transition-all rounded-lg active:scale-[0.98] ${
                        isActive ? 'bg-primary/10 text-primary' :
                        isBack ? 'text-gray-600 hover:bg-gray-50 active:bg-gray-100 border border-gray-200' :
                        isGuide ? 'text-blue-600 hover:bg-blue-50 active:bg-blue-100 border border-blue-200' :
                        'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                    {(isBack || isGuide) && <div className="border-b my-1.5" />}
                  </div>
                )
              })}

              {/* User Controls */}
              <div className="pt-2.5 mt-2.5 border-t space-y-1">
                {userEmail && (
                  <div className="px-4 py-2 text-sm text-gray-600 truncate bg-gray-50 rounded-lg border">
                    {userEmail}
                  </div>
                )}
                <button
                  onClick={() => { switchLocale(); setIsOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all active:scale-[0.98]"
                >
                  <Languages className="h-5 w-5 flex-shrink-0" />
                  <span>{locale === 'en' ? 'ไทย' : 'EN'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition-all active:scale-[0.98]"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
