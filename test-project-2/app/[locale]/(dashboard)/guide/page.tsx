'use client'

import { ProjectLayout } from '@/core/layout/project-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { 
  BookOpen, Target, ShoppingCart, Package, Factory, Receipt, BarChart3
} from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import * as React from 'react'
import { OverviewGuide } from './components/overview-guide'
import { SalesGuide } from './components/sales-guide'
import { ProductionGuide } from './components/production-guide'
import { MaterialsGuide } from './components/materials-guide'
import { FinanceGuide } from './components/finance-guide'
import { ReportsGuide } from './components/reports-guide'

export default function GuidePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = React.useState('overview')

  React.useEffect(() => {
    const tab = searchParams.get('tab')
    const section = searchParams.get('section')
    
    if (tab) {
      setActiveTab(tab)
    }
    
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [searchParams])

  return (
    <ProjectLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-gray-900 p-2 sm:p-3 rounded-lg">
                <BookOpen className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Starman ERP Guide</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  คู่มือการใช้งานระบบ ERP แบบครบวงจร
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto gap-2">
              <TabsTrigger value="overview" className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">ภาพรวม</span>
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Sales</span>
              </TabsTrigger>
              <TabsTrigger value="production" className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Factory className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Production</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Materials</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Finance</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Reports</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <OverviewGuide />
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <SalesGuide />
            </TabsContent>

            <TabsContent value="production" className="space-y-6">
              <ProductionGuide />
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <MaterialsGuide />
            </TabsContent>

            <TabsContent value="finance" className="space-y-6">
              <FinanceGuide />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportsGuide />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProjectLayout>
  )
}
