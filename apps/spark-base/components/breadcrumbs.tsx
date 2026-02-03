'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumbs() {
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string
  const projectId = params.id as string
  const [projectName, setProjectName] = useState<string>('')

  useEffect(() => {
    // Load company name from mock data
    if (projectId) {
      const mockCompanies = [
        { id: '1', name: 'ABC Manufacturing Co.' },
        { id: '2', name: 'XYZ Automotive Parts' },
        { id: '3', name: 'Global Textiles Ltd.' },
        { id: '4', name: 'Pacific Foods Inc.' }
      ]
      const project = mockCompanies.find(p => p.id === projectId)
      if (project) {
        setProjectName(project.name)
      }
    }
  }, [projectId])

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []

    // Always start with Companies
    breadcrumbs.push({
      label: 'Companies',
      href: `/${locale}/company?select=true`
    })

    // If we're in a project, add project name
    if (projectId && projectName) {
      // Add current page
      const pathParts = pathname.split('/').filter(Boolean)
      const lastPart = pathParts[pathParts.length - 1]
      
      const pageNames: Record<string, string> = {
        'dashboard': 'Dashboard',
        'quotation': 'Quotation',
        'sales-order': 'Sales Order',
        'sales-invoice': 'Sales Invoice',
        'bom': 'BOM',
        'production-order': 'Production Order',
        'production-planning': 'Production Planning',
        'manufacturing': 'Manufacturing',
        'mrp': 'MRP',
        'purchasing': 'Purchasing',
        'inventory': 'Inventory',
        'factory-capacity': 'Factory Capacity',
        'worker-allowance': 'Worker Allowance',
        'wip-costing': 'WIP Costing',
        'job-history': 'Job History',
        'accounting': 'Accounting',
        'team': 'Team',
        'settings': 'Settings'
      }

      // If we're on dashboard, just show company name
      if (lastPart === 'dashboard') {
        breadcrumbs.push({
          label: projectName,
          href: `/${locale}/company/${projectId}/dashboard`
        })
      } else {
        // Otherwise show company name as link and current page
        breadcrumbs.push({
          label: projectName,
          href: `/${locale}/company/${projectId}/dashboard`
        })
        
        if (lastPart && pageNames[lastPart]) {
          breadcrumbs.push({
            label: pageNames[lastPart],
            href: pathname
          })
        }
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link 
        href={`/${locale}/company?select=true`}
        className="hover:text-gray-900 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((item, index) => (
        <div key={`${item.href}-${index}`} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900">{item.label}</span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
