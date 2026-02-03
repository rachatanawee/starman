'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ProjectLayout } from '@/components/project-layout'
import { ArrowLeft, Edit, Clock, Package, AlertCircle, CheckCircle2, PlayCircle, ShoppingCart, FileText, GitBranch, Warehouse, Factory } from 'lucide-react'
import { mockProductionOrders, ProductionStatus } from '@/lib/mock-data'
import { mockBOMs } from '@/lib/mock-data/bom-data'

const statusConfig: Record<ProductionStatus, { label: string; color: string; icon: any }> = {
  created: { label: 'Created', color: 'bg-gray-500', icon: Clock },
  released: { label: 'Released', color: 'bg-blue-500', icon: PlayCircle },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500', icon: Factory },
  completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'bg-primary/50', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: AlertCircle }
}

export default function ProductionOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const orderId = params.orderId as string

  const order = mockProductionOrders.find(o => o.id === orderId)
  const selectedBOM = order ? mockBOMs.find(b => b.id === order.bomId) : null

  if (!order) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Production order not found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push(`/${params.locale}/company/${projectId}/production-order`)}
            >
              Back to Orders
            </Button>
          </div>
        </div>
      </ProjectLayout>
    )
  }

  const StatusIcon = statusConfig[order.status].icon
  const progress = order.plannedQuantity > 0 ? Math.round((order.producedQuantity / order.plannedQuantity) * 100) : 0

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
              <p className="text-gray-600 mt-1">{order.productName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className={statusConfig[order.status].color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig[order.status].label}
            </Badge>
            <Button
              variant="outline"
              onClick={() => router.push(`/${params.locale}/company/${projectId}/production-order/${order.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Product</p>
                    <p className="font-medium">{order.productName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">SKU</p>
                    <p className="font-medium">{order.productSku}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Planned Quantity</p>
                    <p className="font-medium">{order.plannedQuantity} pcs</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Produced Quantity</p>
                    <p className="font-medium">{order.producedQuantity} pcs</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{new Date(order.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Due Date</p>
                    <p className="font-medium">{new Date(order.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Priority</p>
                    <p className="font-medium capitalize">{order.priority}</p>
                  </div>
                  {order.salesOrderIds.length > 0 && (
                    <div>
                      <p className="text-gray-600">Sales Orders</p>
                      <p className="font-medium flex items-center gap-1">
                        <ShoppingCart className="h-3 w-3" />
                        {order.salesOrderIds.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
                {order.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-600 text-sm">Notes</p>
                    <p className="text-sm mt-1">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  Materials ({order.materials.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Component</th>
                        <th className="px-3 py-2 text-right">Required</th>
                        <th className="px-3 py-2 text-right">Issued</th>
                        <th className="px-3 py-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.materials.map(mat => (
                        <tr key={mat.id} className="border-t">
                          <td className="px-3 py-2">
                            <p className="font-medium">{mat.componentName}</p>
                            <p className="text-xs text-gray-500">{mat.componentSku}</p>
                          </td>
                          <td className="px-3 py-2 text-right">{mat.requiredQuantity} {mat.uom}</td>
                          <td className="px-3 py-2 text-right">{mat.issuedQuantity} {mat.uom}</td>
                          <td className="px-3 py-2 text-center">
                            <Badge variant={mat.status === 'fully_issued' ? 'default' : 'secondary'}>
                              {mat.status.replace('_', ' ')}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="h-5 w-5" />
                  Operations ({order.operations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.operations.map(op => (
                    <div key={op.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{op.sequenceNo}. {op.operationName}</p>
                          <p className="text-sm text-gray-600">{op.workCenterName}</p>
                        </div>
                        <Badge variant={op.status === 'completed' ? 'default' : op.status === 'in_progress' ? 'secondary' : 'outline'}>
                          {op.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Completed</p>
                          <p className="font-medium">{op.completedQty} pcs</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Scrap</p>
                          <p className="font-medium text-orange-600">{op.scrapQty} pcs</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Setup Time</p>
                          <p className="font-medium">{op.actualSetupTime || 0} / {op.plannedSetupTime} min</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Run Time</p>
                          <p className="font-medium">{op.actualRunTime || 0} / {op.plannedRunTime} min</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Production Progress</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    {order.producedQuantity} of {order.plannedQuantity} completed
                  </p>
                </div>
                {order.scrapQuantity > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600">Scrap Quantity</p>
                    <p className="text-lg font-semibold text-orange-600">{order.scrapQuantity} pcs</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Unit Cost</p>
                    <p className="font-medium">${selectedBOM?.estimatedCost.toFixed(2) || '0.00'}</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-gray-600">Total Estimated Cost</p>
                    <p className="text-xl font-bold">
                      ${selectedBOM ? (selectedBOM.estimatedCost * order.plannedQuantity).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">BOM</p>
                    <p className="font-medium">{order.bomId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Routing</p>
                    <p className="font-medium">{order.routingId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
