'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@spark/core'
import { } from '@spark/core' // dialog'
import { Button } from '@spark/core'
import { } from '@spark/core' // button'
import { Input } from '@spark/core'
import { } from '@spark/core' // input'
import { Label } from '@spark/core'
import { } from '@spark/core' // label'
import { Textarea } from '@spark/core'
import { } from '@spark/core' // textarea'
import { Plus, Trash2 } from 'lucide-react'
import { BOM, BOMItem } from '@/lib/mock-data/bom-data'

interface BOMDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bom?: BOM
  onSave: (bom: Partial<BOM>) => void
}

export function BOMDialog({ open, onOpenChange, bom, onSave }: BOMDialogProps) {
  const [formData, setFormData] = useState<Partial<BOM>>(
    bom || {
      productName: '',
      productSku: '',
      description: '',
      yieldRate: 100,
      items: []
    }
  )

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...(formData.items || []),
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
    const newItems = [...(formData.items || [])]
    newItems.splice(index, 1)
    setFormData({ ...formData, items: newItems })
  }

  const updateItem = (index: number, field: keyof BOMItem, value: any) => {
    const newItems = [...(formData.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    
    if (field === 'quantity' || field === 'unitCost') {
      newItems[index].totalCost = newItems[index].quantity * newItems[index].unitCost
    }
    
    setFormData({ ...formData, items: newItems })
  }

  const calculateEstimatedCost = () => {
    return (formData.items || []).reduce((sum, item) => sum + item.totalCost, 0)
  }

  const handleSave = () => {
    onSave({
      ...formData,
      estimatedCost: calculateEstimatedCost()
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{bom ? 'Edit BOM' : 'Create New BOM'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Product Name *</Label>
              <Input
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g. Oak Work Desk"
              />
            </div>
            <div>
              <Label>Product SKU *</Label>
              <Input
                value={formData.productSku}
                onChange={(e) => setFormData({ ...formData, productSku: e.target.value })}
                placeholder="e.g. DESK-OAK-120"
              />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product details"
                rows={2}
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
                value={calculateEstimatedCost().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* BOM Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-lg">Components</Label>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

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
                      <th className="px-3 py-2 text-center font-medium">Step</th>
                      <th className="px-3 py-2 text-center font-medium w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.items || []).map((item, index) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-3 py-2">
                          <Input
                            value={item.componentSku}
                            onChange={(e) => updateItem(index, 'componentSku', e.target.value)}
                            placeholder="SKU"
                            className="h-8 text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={item.componentName}
                            onChange={(e) => updateItem(index, 'componentName', e.target.value)}
                            placeholder="Component name"
                            className="h-8 text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-right"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={item.uom}
                            onChange={(e) => updateItem(index, 'uom', e.target.value)}
                            placeholder="Unit"
                            className="h-8 text-xs w-20"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.unitCost}
                            onChange={(e) => updateItem(index, 'unitCost', parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-right"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-xs">
                          {item.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={item.operationStep}
                            onChange={(e) => updateItem(index, 'operationStep', parseInt(e.target.value) || 10)}
                            className="h-8 text-xs text-center w-16"
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
                    {(formData.items || []).length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                          No components yet. Click &quot;Add Item&quot; to start
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
