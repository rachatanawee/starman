'use client'

import { ProjectLayout, DynamicTitle, Card, CardContent, CardHeader, CardTitle, Button, useParams, useRouter, useTranslations, useState } from '@/lib/common-exports'
import {
  Package2, ShoppingCart, DollarSign, TrendingUp,
  Factory, Users, AlertCircle, CheckCircle2, Clock, RefreshCw, Printer, Building2, Sparkles, LayoutDashboard, Maximize, Minimize, Download
} from 'lucide-react'
import { mockProjectsAPI, type MockProject } from '@/lib/mock-data'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import {
  StatCard,
  AlertCard,
  TopProductsList,
  ActivityItem,
  mockInventoryStats,
  mockProductionStats,
  mockSalesData,
  mockInventoryByCategory,
  mockProductionTrend,
  mockTopProducts,
  mockAlerts,
  mockActivities,
  exportDashboardCSV,
  toggleFullscreen as toggleFullscreenUtil
} from '@/modules/dashboard'

export default function CompanyDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const t = useTranslations('dashboard')

  const [project] = useState<MockProject | null>(mockProjectsAPI.getSync(projectId))
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    const newState = toggleFullscreenUtil()
    setIsFullscreen(newState)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    exportDashboardCSV(project?.name || '', {
      inventory: mockInventoryStats,
      production: mockProductionStats
    })
  }

  if (!project) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('companyNotFound')}</h2>
            <Button onClick={() => router.push('/en/company')}>{t('backToCompanies')}</Button>
          </div>
        </div>
      </ProjectLayout>
    )
  }

  const currentRevenue = mockSalesData[mockSalesData.length - 1].sales

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Dashboard" />
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print-break {
            page-break-after: always;
          }
        }
      `}</style>
      <div className="p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b mb-6 -m-6 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-xl shadow-lg ring-2 ring-primary/20">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {project.name}
                </h1>
                <p className="text-sm text-gray-600">ERP Dashboard - {project.description}</p>
              </div>
            </div>
            <div className="flex gap-2 no-print">
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-4 w-4 mr-2" /> : <Maximize className="h-4 w-4 mr-2" />}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                {t('printReport')}
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('refresh')}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('totalInventory')}
            value={mockInventoryStats.totalItems}
            subtitle={`${mockInventoryStats.lowStock} low stock items`}
            subtitleColor="text-red-600"
            icon={Package2}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
            borderColor="border-l-blue-500"
          />

          <StatCard
            title={t('activeOrders')}
            value={mockProductionStats.activeOrders}
            subtitle={`${mockProductionStats.pending} pending`}
            icon={ShoppingCart}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            borderColor="border-l-green-500"
          />

          <StatCard
            title={t('monthlyRevenue')}
            value={`฿${currentRevenue.toLocaleString()}`}
            subtitle="+12% from last month"
            subtitleColor="text-green-600"
            icon={DollarSign}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
            borderColor="border-l-primary"
          />

          <StatCard
            title={t('productionRate')}
            value={`${mockProductionStats.efficiency}%`}
            subtitle="Efficiency this week"
            icon={Factory}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
            borderColor="border-l-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('salesTrend')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `฿${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} name="Sales (฿)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inventory Distribution */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Package2 className="h-5 w-5 text-primary" />
                {t('inventoryDistribution')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockInventoryByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockInventoryByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Production Performance */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-primary" />
                {t('productionPerformance')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockProductionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planned" fill="#6b7280" name="Planned" />
                  <Bar dataKey="actual" fill="#10b981" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t('topProducts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TopProductsList products={mockTopProducts} />
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                {t('alertsNotifications')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivity')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="no-print">
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/inventory`)}>
                <Package2 className="h-5 w-5" />
                <span className="text-sm">{t('inventory')}</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-order`)}>
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm">{t('salesOrder')}</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/production-order`)}>
                <Factory className="h-5 w-5" />
                <span className="text-sm">{t('production')}</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/accounting`)}>
                <DollarSign className="h-5 w-5" />
                <span className="text-sm">{t('accounting')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
