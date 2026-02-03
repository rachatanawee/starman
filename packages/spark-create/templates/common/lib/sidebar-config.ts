import { installedModules } from '@/lib/modules.config'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, FileText, ListTodo, DollarSign, GitBranch,
  BarChart3, Calendar, Settings, Network, ShoppingBag, Package2,
  Building2, Users2, History, Calculator
} from 'lucide-react'

export interface MenuItem {
  href?: string
  icon?: LucideIcon
  label?: string
  section?: string
  isBack?: boolean
  isGuide?: boolean
  module?: keyof typeof installedModules
}

export function getProjectMenuItems(locale: string, projectId: string): MenuItem[] {
  const allItems: MenuItem[] = [
    { href: `/${locale}/company?select=true`, icon: GitBranch, label: '← All Companies', isBack: true },
    { href: `/${locale}/guide`, icon: FileText, label: 'User Guide', isGuide: true },
  ]

  // Sales & Purchasing Module
  if (installedModules.sales) {
    allItems.push(
      { section: 'Sales' },
      { href: `/${locale}/company/${projectId}/quotation`, icon: FileText, label: 'Quotation', module: 'sales' },
      { href: `/${locale}/company/${projectId}/sales-order`, icon: ListTodo, label: 'Sales Order', module: 'sales' },
      { href: `/${locale}/company/${projectId}/sales-invoice`, icon: DollarSign, label: 'Sales Invoice', module: 'sales' },
      { section: 'Purchasing' },
      { href: `/${locale}/company/${projectId}/purchasing`, icon: ShoppingBag, label: 'Purchasing', module: 'sales' },
    )
  }

  // Manufacturing Module
  if (installedModules.manufacturing) {
    allItems.push(
      { section: 'Production' },
      { href: `/${locale}/company/${projectId}/bom`, icon: GitBranch, label: 'BOM', module: 'manufacturing' },
      { href: `/${locale}/company/${projectId}/production-planning`, icon: BarChart3, label: 'Production Planning', module: 'manufacturing' },
      { href: `/${locale}/company/${projectId}/production-order`, icon: Calendar, label: 'Production Order', module: 'manufacturing' },
      { href: `/${locale}/company/${projectId}/manufacturing`, icon: Settings, label: 'Manufacturing', module: 'manufacturing' },
      { href: `/${locale}/company/${projectId}/mrp`, icon: Network, label: 'MRP', module: 'manufacturing' },
    )
  }

  // Inventory Module
  if (installedModules.inventory) {
    allItems.push(
      { section: 'Materials' },
      { href: `/${locale}/company/${projectId}/inventory`, icon: Package2, label: 'Inventory', module: 'inventory' },
    )
  }

  // Factory Operations Module
  if (installedModules.factoryOps) {
    allItems.push(
      { section: 'Reports' },
      { href: `/${locale}/company/${projectId}/dashboard`, icon: LayoutDashboard, label: 'Dashboard', module: 'factoryOps' },
      { href: `/${locale}/company/${projectId}/factory-capacity`, icon: Building2, label: 'Factory Capacity', module: 'factoryOps' },
      { href: `/${locale}/company/${projectId}/worker-allowance`, icon: Users2, label: 'Worker Allowance', module: 'factoryOps' },
      { href: `/${locale}/company/${projectId}/job-history`, icon: History, label: 'Job History', module: 'factoryOps' },
    )
  }

  // Accounting Module
  if (installedModules.accounting) {
    allItems.push(
      { section: 'Finance' },
      { href: `/${locale}/company/${projectId}/wip-costing`, icon: DollarSign, label: 'WIP Costing', module: 'accounting' },
      { href: `/${locale}/company/${projectId}/accounting`, icon: Calculator, label: 'Accounting', module: 'accounting' },
    )
  }

  // Always show Settings
  allItems.push(
    { section: 'Settings' },
    { href: `/${locale}/company/${projectId}/settings`, icon: Settings, label: 'Settings' },
  )

  return allItems
}
