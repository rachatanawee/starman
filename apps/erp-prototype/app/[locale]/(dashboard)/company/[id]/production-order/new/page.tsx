'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@spark/core'
import { Button } from '@spark/core'
import { Input } from '@spark/core'
import { Label } from '@spark/core'
import { Select } from '@spark/core'
import { Textarea } from '@spark/core'
import { ProjectLayout } from '@spark/core'
import { ArrowLeft, Save, Package, Calendar, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { mockBOMs } from '@/lib/mock-data/bom-data'

export default function NewProductionOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [formData, setFormData] = useState({
    productId: '',
    bomId: '',
    plannedQuantity: 0,
    startDate: '',
    dueDate: '',
    priority: 'normal' as 'normal' | 'high' | 'urgent',
    notes: ''
  })

  const handleSave = () => {
    if (!formData.productId || !formData.bomId || formData.plannedQuantity <= 0) {
      toast.error('Please fill in all required fields')
      return
    }
    
    toast.success('Production Order created successfully')
    router.push(`/${params.locale}/company/${projectId}/production-order`)
  }

  return (
    
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create Production Order</h1>
              <p className="text-gray-600 mt-1">Schedule a new manufacturing order</p>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Product / BOM *</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm"
                      value={formData.bomId}
                      onChange={(e) => {
                        const bom = mockBOMs.find(b => b.id === e.target.value)
                        setFormData({
                          ...formData,
                          bomId: e.target.value,
                          productId: bom?.productId || ''
                        })
                      }}
                    >
                      <option value="">Select a product...</option>
                      {mockBOMs.map(bom => (
                        <option key={bom.id} value={bom.id}>
                          {bom.productName} ({bom.productSku})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Planned Quantity *</Label>
                    <Input
                      type="number"
                      value={formData.plannedQuantity || ''}
                      onChange={(e) => setFormData({ ...formData, plannedQuantity: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Due Date *</Label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes or instructions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {formData.bomId && (
              <Card>
                <CardHeader>
                  <CardTitle>BOM Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const selectedBOM = mockBOMs.find(b => b.id === formData.bomId)
                    if (!selectedBOM) return null
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                          <div>
                            <p className="font-semibold">{selectedBOM.productName}</p>
                            <p className="text-sm text-gray-600">{selectedBOM.productSku}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Estimated Cost</p>
                            <p className="font-semibold">${selectedBOM.estimatedCost.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left">Component</th>
                                <th className="px-3 py-2 text-right">Qty/Unit</th>
                                <th className="px-3 py-2 text-right">Total Needed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedBOM.items.map(item => (
                                <tr key={item.id} className="border-t">
                                  <td className="px-3 py-2">{item.componentName}</td>
                                  <td className="px-3 py-2 text-right">{item.quantity} {item.uom}</td>
                                  <td className="px-3 py-2 text-right font-medium">
                                    {(item.quantity * formData.plannedQuantity).toFixed(2)} {item.uom}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-medium">Created (Draft)</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Cost Estimate</p>
                  <p className="font-semibold text-lg">
                    {formData.bomId && formData.plannedQuantity > 0
                      ? `$${((mockBOMs.find(b => b.id === formData.bomId)?.estimatedCost || 0) * formData.plannedQuantity).toFixed(2)}`
                      : '$0.00'}
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    After creating, you can release the order to reserve materials and start production.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    
  )
}
