'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ProjectLayout } from '@/components/project-layout'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { mockProductionOrders } from '@/lib/mock-data'
import { mockBOMs } from '@/lib/mock-data'

export default function EditProductionOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const orderId = params.orderId as string

  const [order, setOrder] = useState(() => mockProductionOrders.find(o => o.id === orderId))
  const [formData, setFormData] = useState({
    plannedQuantity: order?.plannedQuantity || 0,
    startDate: order?.startDate || '',
    dueDate: order?.dueDate || '',
    priority: order?.priority || 'normal' as 'normal' | 'high' | 'urgent',
    notes: order?.notes || ''
  })

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

  const selectedBOM = mockBOMs.find(b => b.id === order.bomId)
  const canEdit = order.status === 'created' || order.status === 'released'

  const handleSave = () => {
    if (formData.plannedQuantity <= 0) {
      toast.error('Planned quantity must be greater than 0')
      return
    }
    
    toast.success('Production Order updated successfully')
    router.push(`/${params.locale}/company/${projectId}/production-order`)
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Production Order</h1>
              <p className="text-gray-600 mt-1">{order.orderNumber}</p>
            </div>
          </div>
          {canEdit && (
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>

        {!canEdit && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Order cannot be edited</p>
              <p className="text-sm text-yellow-700 mt-1">
                This order is {order.status}. Only orders in Created or Released status can be edited.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Product</Label>
                    <Input value={order.productName} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>SKU</Label>
                    <Input value={order.productSku} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>BOM</Label>
                    <Input value={order.bomId} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>Routing</Label>
                    <Input value={order.routingId} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>Planned Quantity *</Label>
                    <Input
                      type="number"
                      value={formData.plannedQuantity}
                      onChange={(e) => setFormData({ ...formData, plannedQuantity: parseInt(e.target.value) || 0 })}
                      disabled={!canEdit}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label>Produced Quantity</Label>
                    <Input value={order.producedQuantity} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <Label>Due Date *</Label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm disabled:bg-gray-50"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      disabled={!canEdit}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Input value={order.status} disabled className="bg-gray-50 capitalize" />
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={!canEdit}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Materials ({order.materials.length})</CardTitle>
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
                          <td className="px-3 py-2">{mat.componentName}</td>
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
                <CardTitle>Operations ({order.operations.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {order.operations.map(op => (
                    <div key={op.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{op.sequenceNo}. {op.operationName}</p>
                          <p className="text-sm text-gray-600">{op.workCenterName}</p>
                        </div>
                        <Badge variant={op.status === 'completed' ? 'default' : 'secondary'}>
                          {op.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                        <div>
                          <p className="text-gray-600">Completed</p>
                          <p className="font-medium">{op.completedQty} pcs</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Scrap</p>
                          <p className="font-medium">{op.scrapQty} pcs</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Time</p>
                          <p className="font-medium">{op.actualRunTime || 0} min</p>
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
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Progress</p>
                  <p className="font-semibold text-lg">
                    {order.producedQuantity} / {order.plannedQuantity}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round((order.producedQuantity / order.plannedQuantity) * 100)}% complete
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Scrap</p>
                  <p className="font-medium">{order.scrapQuantity} pcs</p>
                </div>
                <div>
                  <p className="text-gray-600">Estimated Cost</p>
                  <p className="font-semibold text-lg">
                    ${selectedBOM ? (selectedBOM.estimatedCost * order.plannedQuantity).toFixed(2) : '0.00'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
