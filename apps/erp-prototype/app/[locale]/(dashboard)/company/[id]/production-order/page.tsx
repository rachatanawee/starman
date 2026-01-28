'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Plus, Factory, Search, Filter, X, Clock, Package, AlertCircle, CheckCircle2, PlayCircle, ShoppingCart, FileText, GitBranch, Warehouse, Edit, Eye, BookOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { mockProductionOrders, ProductionOrder, ProductionStatus } from '@/lib/production-order-data'
import { useTranslations } from 'next-intl'

const statusConfig: Record<ProductionStatus, { label: string; color: string; icon: any }> = {
  created: { label: 'Created', color: 'bg-gray-500', icon: Clock },
  released: { label: 'Released', color: 'bg-blue-500', icon: PlayCircle },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500', icon: Factory },
  completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'bg-purple-500', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: X }
}

const priorityConfig = {
  normal: { label: 'Normal', color: 'bg-gray-100 text-gray-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-800' }
}

export default function ProductionOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const t = useTranslations('productionOrder')
  const [orders] = useState<ProductionOrder[]>(mockProductionOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProductionStatus | 'all'>('all')

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = searchQuery === '' || 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productSku.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [orders, searchQuery, statusFilter])

  const stats = {
    total: orders.length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'created' || o.status === 'released').length
  }

  const getProgress = (order: ProductionOrder) => {
    if (order.plannedQuantity === 0) return 0
    return Math.round((order.producedQuantity / order.plannedQuantity) * 100)
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/guide?tab=production&section=production-order">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('learnMore')}
              </Button>
            </Link>
            <Button
              onClick={() => router.push(`/${params.locale}/company/${projectId}/production-order/new`)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('newProductionOrder')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('totalOrders')}</p>
                  <p className="text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <Factory className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('inProgress')}</p>
                  <p className="text-2xl font-bold mt-1">{stats.inProgress}</p>
                </div>
                <PlayCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('completed')}</p>
                  <p className="text-2xl font-bold mt-1">{stats.completed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('pending')}</p>
                  <p className="text-2xl font-bold mt-1">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              {t('title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('searchOrders')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                  >
                    {t('all')}
                  </Button>
                  <Button
                    variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('in_progress')}
                  >
                    {t('inProgress')}
                  </Button>
                  <Button
                    variant={statusFilter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('completed')}
                  >
                    {t('completed')}
                  </Button>
                </div>
              </div>
              {(searchQuery || statusFilter !== 'all') && (
                <div className="text-sm text-gray-600">
                  Found {filteredOrders.length} of {orders.length} orders
                </div>
              )}
            </div>

            <div className="space-y-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon
                  const progress = getProgress(order)
                  
                  return (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 cursor-pointer" onClick={() => router.push(`/${params.locale}/company/${projectId}/production-order/${order.id}`)}>
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                            <Badge className={statusConfig[order.status].color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {t(order.status)}
                            </Badge>
                            <Badge className={priorityConfig[order.priority].color}>
                              {t(order.priority)}
                            </Badge>
                            {order.salesOrderIds.length > 0 && (
                              <Badge variant="outline" className="text-blue-600 border-blue-300">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                {order.salesOrderIds.length} SO(s)
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Package className="h-4 w-4" />
                              {order.productName}
                            </span>
                            <span>SKU: {order.productSku}</span>
                            <span>Qty: {order.plannedQuantity}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1" title="Bill of Materials">
                              <FileText className="h-3 w-3" />
                              BOM: {order.bomId}
                            </span>
                            <span className="flex items-center gap-1" title="Routing">
                              <GitBranch className="h-3 w-3" />
                              Route: {order.routingId}
                            </span>
                            <span className="flex items-center gap-1" title="Materials">
                              <Warehouse className="h-3 w-3" />
                              {order.materials.length} {t('materials')}
                            </span>
                            <span className="flex items-center gap-1" title="Operations">
                              <Factory className="h-3 w-3" />
                              {order.operations.length} {t('operations')}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex-1 max-w-xs">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>{t('progress')}</span>
                                <span>{order.producedQuantity} / {order.plannedQuantity} ({progress}%)</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">{t('due')}:</span>{' '}
                              <span className="font-medium">{new Date(order.dueDate).toLocaleDateString()}</span>
                            </div>
                            {order.scrapQuantity > 0 && (
                              <div className="text-sm text-orange-600">
                                <AlertCircle className="h-4 w-4 inline mr-1" />
                                {t('scrap')}: {order.scrapQuantity}
                              </div>
                            )}
                          </div>
                          {order.notes && (
                            <p className="text-sm text-gray-600 mt-2 italic">{order.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/${params.locale}/company/${projectId}/production-order/${order.id}`)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {t('view')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/${params.locale}/company/${projectId}/production-order/${order.id}/edit`)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {t('edit')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Factory className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>{t('noOrdersFound')}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('all')
                    }}
                  >
                    {t('clearFilters')}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
