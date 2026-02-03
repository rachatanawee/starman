'use client'

import { useState, useEffect } from 'react'
import { Search, FileText, ListTodo, Users, Settings, Calendar, DollarSign, AlertTriangle } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { useParams, useRouter } from 'next/navigation'

interface SearchItem {
  id: string
  title: string
  description: string
  href: string
  icon: any
  category: string
}

export function QuickSearch() {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const projectId = params.id as string

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const searchItems: SearchItem[] = projectId ? [
    // Sales
    { id: 'quotation', title: 'Quotation', description: 'Manage sales quotations', href: `/${locale}/company/${projectId}/quotation`, icon: FileText, category: 'Sales' },
    { id: 'sales-order', title: 'Sales Order', description: 'Manage customer orders', href: `/${locale}/company/${projectId}/sales-order`, icon: ListTodo, category: 'Sales' },
    { id: 'sales-invoice', title: 'Sales Invoice', description: 'Generate invoices', href: `/${locale}/company/${projectId}/sales-invoice`, icon: DollarSign, category: 'Sales' },
    
    // Production
    { id: 'bom', title: 'BOM', description: 'Bill of Materials', href: `/${locale}/company/${projectId}/bom`, icon: FileText, category: 'Production' },
    { id: 'production-order', title: 'Production Order', description: 'Manufacturing orders', href: `/${locale}/company/${projectId}/production-order`, icon: Calendar, category: 'Production' },
    { id: 'manufacturing', title: 'Manufacturing', description: 'Manufacturing operations', href: `/${locale}/company/${projectId}/manufacturing`, icon: Settings, category: 'Production' },
    
    // Materials
    { id: 'mrp', title: 'MRP', description: 'Material requirements planning', href: `/${locale}/company/${projectId}/mrp`, icon: FileText, category: 'Materials' },
    { id: 'purchasing', title: 'Purchasing', description: 'Purchase orders', href: `/${locale}/company/${projectId}/purchasing`, icon: DollarSign, category: 'Materials' },
    { id: 'inventory', title: 'Inventory', description: 'Inventory management', href: `/${locale}/company/${projectId}/inventory`, icon: Settings, category: 'Materials' },
    
    // Reports
    { id: 'dashboard', title: 'Dashboard', description: 'Company overview', href: `/${locale}/company/${projectId}/dashboard`, icon: Settings, category: 'Reports' },
    { id: 'factory-capacity', title: 'Factory Capacity', description: 'Production capacity', href: `/${locale}/company/${projectId}/factory-capacity`, icon: AlertTriangle, category: 'Reports' },
    
    // Settings
    { id: 'team', title: 'Team', description: 'Manage team members', href: `/${locale}/company/${projectId}/team`, icon: Users, category: 'Settings' },
    { id: 'settings', title: 'Settings', description: 'Company settings', href: `/${locale}/company/${projectId}/settings`, icon: Settings, category: 'Settings' },
  ] : []

  const handleSelect = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full"
      >
        <Search className="h-4 w-4" />
        <span>Quick search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {['Sales', 'Production', 'Materials', 'Reports', 'Settings'].map((category) => {
            const items = searchItems.filter(item => item.category === category)
            if (items.length === 0) return null

            return (
              <CommandGroup key={category} heading={category}>
                {items.map((item) => {
                  const Icon = item.icon
                  return (
                    <CommandItem
                      key={item.id}
                      value={item.title}
                      onSelect={() => handleSelect(item.href)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
