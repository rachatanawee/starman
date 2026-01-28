'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ProjectLayout } from '@/components/project-layout'
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import { BOMItem } from '@/lib/bom-data'

export default function BOMNewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [formData, setFormData] = useState({
    productName: '',
    productSku: '',
    description: '',
    yieldRate: 100,
    items: [] as BOMItem[]
  })

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: `temp-${Date.now()}`,
          componentId: '',
          componentSku: '',
          componentName: '',
          quantity: 1,
          uom: 'pcs',
          scrapFactor: 0,
          unitCost: 0,
          totalCost: 0,
          operationStep: 10
        }
      ]
    })
  }

  const removeItem = (index: number) => {
    const newItems = [...formData.items]
    newItems.splice(index, 1)
    setFormData({ ...formData, items: newItems })
  }

  const updateItem = (index: number, field: keyof BOMItem, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    if (field === 'quantity' || field === 'unitCost') {
      newItems[index].totalCost = newItems[index].quantity * newItems[index].unitCost
    }
    
    setFormData({ ...formData, items: newItems })
  }

  const calculateEstimatedCost = () => {
    return formData.items.reduce((sum, item) => sum + item.totalCost, 0)
  }

  const handleSave = () => {
    if (!formData.productName || !formData.productSku) {
      toast.error('Please fill in required fields')
      return
    }
    
    toast.success('BOM created successfully')
    router.push(`/${params.locale}/company/${projectId}/bom`)
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
              <h1 className="text-3xl font-bold">Create New BOM</h1>
              <p className="text-gray-600 mt-1">Define product structure and components</p>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="h-4 w-4 mr-2" />
            Save BOM
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Product Name *</Label>
                <Input
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="e.g. C-Channel 100x50x20x2.0mm"
                />
              </div>
              <div>
                <Label>Product SKU *</Label>
                <Input
                  value={formData.productSku}
                  onChange={(e) => setFormData({ ...formData, productSku: e.target.value })}
                  placeholder="e.g. FG-CCHAN-100"
                />
              </div>
              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product details and specifications"
                  rows={3}
                />
              </div>
              <div>
                <Label>Yield Rate (%)</Label>
                <Input
                  type="number"
                  value={formData.yieldRate}
                  onChange={(e) => setFormData({ ...formData, yieldRate: parseFloat(e.target.value) })}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label>Estimated Cost</Label>
                <Input
                  value={`$${calculateEstimatedCost().toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  disabled
                  className="bg-gray-50 font-semibold"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Components & Materials</CardTitle>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Component
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">SKU</th>
                      <th className="px-3 py-2 text-left font-medium">Component Name</th>
                      <th className="px-3 py-2 text-right font-medium">Qty</th>
                      <th className="px-3 py-2 text-left font-medium">UOM</th>
                      <th className="px-3 py-2 text-right font-medium">Unit Cost</th>
                      <th className="px-3 py-2 text-right font-medium">Total</th>
                      <th className="px-3 py-2 text-center font-medium">Scrap %</th>
                      <th className="px-3 py-2 text-center font-medium">Step</th>
                      <th className="px-3 py-2 text-center font-medium w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-3 py-2">
                          <Input
                            value={item.componentSku}
                            onChange={(e) => updateItem(index, 'componentSku', e.target.value)}
                            placeholder="RM-COIL-2.0"
                            className="h-9 text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={item.componentName}
                            onChange={(e) => updateItem(index, 'componentName', e.target.value)}
                            placeholder="Steel Coil 2.0mm"
                            className="h-9 text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                            className="h-9 text-xs text-right w-24"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={item.uom}
                            onChange={(e) => updateItem(index, 'uom', e.target.value)}
                            placeholder="kg"
                            className="h-9 text-xs w-16"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.unitCost}
                            onChange={(e) => updateItem(index, 'unitCost', parseFloat(e.target.value) || 0)}
                            className="h-9 text-xs text-right w-24"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-xs font-medium">
                          ${item.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.scrapFactor}
                            onChange={(e) => updateItem(index, 'scrapFactor', parseFloat(e.target.value) || 0)}
                            className="h-9 text-xs text-center w-16"
                            step="0.1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.operationStep}
                            onChange={(e) => updateItem(index, 'operationStep', parseInt(e.target.value) || 10)}
                            className="h-9 text-xs text-center w-16"
                            step="10"
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {formData.items.length === 0 && (
                      <tr>
                        <td colSpan={9} className="px-3 py-12 text-center text-gray-500">
                          No components added yet. Click &quot;Add Component&quot; to start building your BOM
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
