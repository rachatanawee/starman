'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Package2, ShoppingCart, DollarSign, TrendingUp, 
  Factory, Users, AlertCircle, CheckCircle2, Clock, RefreshCw, Printer, Building2
} from 'lucide-react'
import { mockProjectsAPI, type MockProject } from '@/lib/mock-data'
import { ProjectLayout } from '@/components/project-layout'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function CompanyDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project] = useState<MockProject | null>(mockProjectsAPI.getSync(projectId))

  if (!project) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Company not found</h2>
            <Button onClick={() => router.push('/en/company')}>Back to Companies</Button>
          </div>
        </div>
      </ProjectLayout>
    )
  }

  // ERP Mock Data
  const inventoryStats = {
    totalItems: 1247,
    lowStock: 23,
    outOfStock: 5,
    inTransit: 156
  }

  const productionStats = {
    activeOrders: 45,
    completed: 128,
    pending: 67,
    delayed: 8
  }

  const salesData = [
    { month: 'Jan', sales: 450000, orders: 120 },
    { month: 'Feb', sales: 520000, orders: 145 },
    { month: 'Mar', sales: 480000, orders: 132 },
    { month: 'Apr', sales: 610000, orders: 168 },
    { month: 'May', sales: 580000, orders: 155 },
    { month: 'Jun', sales: 720000, orders: 192 },
  ]

  const inventoryByCategory = [
    { name: 'Raw Materials', value: 450, color: '#3b82f6' },
    { name: 'Work in Progress', value: 280, color: '#f59e0b' },
    { name: 'Finished Goods', value: 380, color: '#10b981' },
    { name: 'Packaging', value: 137, color: '#8b5cf6' },
  ]

  const productionTrend = [
    { week: 'W1', planned: 120, actual: 115 },
    { week: 'W2', planned: 130, actual: 128 },
    { week: 'W3', planned: 125, actual: 130 },
    { week: 'W4', planned: 140, actual: 135 },
    { week: 'W5', planned: 135, actual: 140 },
    { week: 'W6', planned: 150, actual: 145 },
  ]

  const topProducts = [
    { name: 'Product A', units: 450, revenue: 225000 },
    { name: 'Product B', units: 380, revenue: 190000 },
    { name: 'Product C', units: 320, revenue: 160000 },
    { name: 'Product D', units: 280, revenue: 140000 },
    { name: 'Product E', units: 250, revenue: 125000 },
  ]

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6">
        {/* Header */}
        <div className="bg-white border-b mb-6 -m-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-sm text-gray-600">ERP Dashboard - {project.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push(`/${params.locale}/company/${projectId}/dashboard/report`)}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Report
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Inventory</CardTitle>
              <Package2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
              <p className="text-xs text-red-600 mt-1">{inventoryStats.lowStock} low stock items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{productionStats.activeOrders}</div>
              <p className="text-xs text-gray-600 mt-1">{productionStats.pending} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">฿{salesData[salesData.length - 1].sales.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Production Rate</CardTitle>
              <Factory className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">96%</div>
              <p className="text-xs text-gray-600 mt-1">Efficiency this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
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
          <Card>
            <CardHeader>
              <CardTitle>Inventory Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Production Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Production Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productionTrend}>
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
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{product.name}</span>
                        <span className="text-sm text-gray-600">{product.units} units</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(product.units / topProducts[0].units) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-purple-600 ml-4">
                      ฿{product.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
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
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Low Stock Alert</p>
                    <p className="text-xs text-red-700">5 items are out of stock, 23 items below minimum level</p>
                    <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-900">Production Delay</p>
                    <p className="text-xs text-orange-700">Order #PO-2024-156 is delayed by 2 days</p>
                    <p className="text-xs text-orange-600 mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">Shipment Completed</p>
                    <p className="text-xs text-green-700">Order #SO-2024-892 delivered successfully</p>
                    <p className="text-xs text-green-600 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Sales Order</p>
                    <p className="text-xs text-gray-600">SO-2024-945 created for 250 units</p>
                    <p className="text-xs text-gray-400 mt-1">30 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Factory className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Production Completed</p>
                    <p className="text-xs text-gray-600">Batch #B-2024-089 finished</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Package2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Inventory Received</p>
                    <p className="text-xs text-gray-600">PO-2024-334 - 500 units received</p>
                    <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Worker Shift Change</p>
                    <p className="text-xs text-gray-600">Evening shift started - 15 workers</p>
                    <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/inventory`)}>
                <Package2 className="h-5 w-5" />
                <span className="text-sm">Inventory</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-order`)}>
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm">Sales Order</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/production-order`)}>
                <Factory className="h-5 w-5" />
                <span className="text-sm">Production</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => router.push(`/${params.locale}/company/${projectId}/accounting`)}>
                <DollarSign className="h-5 w-5" />
                <span className="text-sm">Accounting</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
