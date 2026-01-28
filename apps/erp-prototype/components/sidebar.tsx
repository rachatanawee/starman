'use client'

import { LayoutDashboard, Users, Settings, LogOut, ChevronLeft, ChevronRight, Languages, User, FileText, TrendingUp, BarChart3, GitCompare, BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { logout } from '@/lib/actions/auth'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'
import { useSettings } from '@/lib/settings-context'
import { createClient } from '@/lib/supabase/client'
import { isAdmin, isManager } from '@/lib/permissions'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const t = useTranslations('dashboard')
  const tAuth = useTranslations('auth')
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const locale = params.locale as string
  const [isPending, startTransition] = useTransition()

  const [userIsAdmin, setUserIsAdmin] = useState(true)
  const [userIsManager, setUserIsManager] = useState(true)
  const [userRoles, setUserRoles] = useState<string[]>(['admin'])

  useEffect(() => {
    const checkRoles = async () => {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user) {
          // Try to load from sessionStorage
          const storedUserData = sessionStorage.getItem('crm_user_data')
          if (storedUserData) {
            const userData = JSON.parse(storedUserData)
            setUserIsAdmin(userData.roles?.includes('admin') || false)
            setUserIsManager(userData.roles?.includes('manager') || false)
            setUserRoles(userData.roles || [])
          }
          return
        }

        const user = session.user

        // Store user data in sessionStorage
        sessionStorage.setItem('crm_user_data', JSON.stringify({
          id: user.id,
          email: user.email,
          app_metadata: user.app_metadata,
          roles: user.app_metadata?.roles
        }))

        setUserIsAdmin(isAdmin(user))
        setUserIsManager(isManager(user))
        setUserRoles(user?.app_metadata?.roles || [])
      } catch (error) {
        // Silently handle error and try sessionStorage
        const storedUserData = sessionStorage.getItem('crm_user_data')
        if (storedUserData) {
          const userData = JSON.parse(storedUserData)
          setUserIsAdmin(userData.roles?.includes('admin') || false)
          setUserIsManager(userData.roles?.includes('manager') || false)
          setUserRoles(userData.roles || [])
        }
      }
    }
    checkRoles()
  }, [])

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'th' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

  const settings = useSettings()

  return (
    <div className={`fixed left-0 top-0 flex h-screen flex-col border-r transition-all duration-300 ease-in-out z-50 ${collapsed ? 'w-16' : 'w-52'}`} style={{ backgroundColor: 'var(--sidebar)' }}>
      <div className="flex items-center justify-between border-b p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {settings?.logo_url && <img src={settings.logo_url} alt="Logo" className="h-6 w-6" />}
            <h2 className="text-xl font-bold">{settings?.app_title || t('title')}</h2>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className={collapsed ? 'mx-auto' : ''}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        <Link href={`/${locale}/dashboard`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/dashboard` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
          <LayoutDashboard className="h-5 w-5" />
          {!collapsed && t('overview')}
        </Link>
        {userIsAdmin && (
          <Link href={`/${locale}/users`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/users` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <Users className="h-5 w-5" />
            {!collapsed && 'User Management'}
          </Link>
        )}
        <Link href={`/${locale}/guide`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/guide` ? 'bg-blue-600 text-white rounded-lg' : 'rounded-lg hover:bg-blue-50 text-blue-600 border border-blue-200'} ${collapsed ? 'justify-center' : ''}`}>
          <BookOpen className="h-5 w-5" />
          {!collapsed && t('userGuide')}
        </Link>
        {userIsAdmin && (
          <Link href={`/${locale}/form-builder`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname.includes(`/${locale}/form-builder`) ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <FileText className="h-5 w-5" />
            {!collapsed && t('formBuilder')}
          </Link>
        )}
        {(userIsAdmin || userIsManager) && (
          <Link href={`/${locale}/prediction`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/prediction` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <TrendingUp className="h-5 w-5" />
            {!collapsed && t('predictions')}
          </Link>
        )}
        {(userIsAdmin || userIsManager) && (
          <Link href={`/${locale}/opportunities`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/opportunities` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <FileText className="h-5 w-5" />
            {!collapsed && t('opportunities')}
          </Link>
        )}
        {(userIsAdmin || userIsManager) && (
          <Link href={`/${locale}/compare`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/compare` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <GitCompare className="h-5 w-5" />
            {!collapsed && t('compare')}
          </Link>
        )}
        {userIsAdmin && (
          <Link href={`/${locale}/data-grid-demo`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/data-grid-demo` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <LayoutDashboard className="h-5 w-5" />
            {!collapsed && t('dataGridDemo')}
          </Link>
        )}
        {(userIsAdmin || userIsManager) && (
          <Link href={`/${locale}/customer-analysis`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname.includes(`/${locale}/customer-analysis`) ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <BarChart3 className="h-5 w-5" />
            {!collapsed && t('customerAnalysis')}
          </Link>
        )}
        <Link href={`/${locale}/profile`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/profile` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
          <User className="h-5 w-5" />
          {!collapsed && t('profile')}
        </Link>
        {userIsAdmin && (
          <Link href={`/${locale}/settings`} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === `/${locale}/settings` ? 'bg-primary text-primary-foreground rounded-lg' : 'rounded-lg hover:bg-accent/50'} ${collapsed ? 'justify-center' : ''}`}>
            <Settings className="h-5 w-5" />
            {!collapsed && t('settings')}
          </Link>
        )}
      </nav>
      <div className="border-t p-2 space-y-1">
        {!collapsed && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-3 py-2 text-sm text-muted-foreground truncate cursor-default">
                  {settings?.user_email || 'user@example.com'}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="text-xs">
                  <div className="font-semibold mb-1">Roles:</div>
                  {userRoles.length > 0 ? (
                    userRoles.map(role => (
                      <div key={role}>• {role}</div>
                    ))
                  ) : (
                    <div>• user</div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Button variant="ghost" size="sm" className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start'}`} onClick={switchLocale}>
          <Languages className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
          {!collapsed && (locale === 'en' ? 'ไทย' : 'EN')}
        </Button>
        <Button
          variant="ghost"
          className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start'}`}
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-2'}`} />
          {!collapsed && tAuth('logout')}
        </Button>
      </div>
    </div>
  )
}
