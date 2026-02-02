'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { mockPurchaseOrders } from '@/lib/mock-data'

interface POItem {
  id: string
  productName: string
  productSku: string
  quantity: number
  unitPrice: number
  uom: string
}

export default function EditPurchaseOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const poId = params.poId as string

  const po = mockPurchaseOrders.find(p => p.id === poId)

  const [vendor, setVendor] = useState('')
  const [poDate, setPoDate] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<POItem[]>([])

  useEffect(() => {
    if (po) {
      setVendor(po.vendorId)
      setPoDate(po.poDate)
      setDeliveryDate(po.deliveryDate)
      setNotes(po.notes || '')
      setItems(po.items.map(item => ({
        id: item.id,
        productName: item.productName,
        productSku: item.productSku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        uom: item.uom
      })))
    }
  }, [po])

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), productName: '', productSku: '', quantity: 0, unitPrice: 0, uom: 'kg' }])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof POItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  }

  const calculateVAT = () => {
    return calculateSubTotal() * 0.07
  }

  const calculateGrandTotal = () => {
    return calculateSubTotal() + calculateVAT()
  }

  const handleSave = () => {
    if (!vendor || !deliveryDate || items.some(i => !i.productName || i.quantity <= 0 || i.unitPrice <= 0)) {
      toast.error('Please fill all required fields')
      return
    }
    toast.success('Purchase Order updated successfully')
    router.push(`/${params.locale}/company/${projectId}/purchasing/${poId}`)
  }

  if (!po) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="p-6 text-center">
          <p className="text-gray-600">Purchase order not found</p>
        </div>
      </ProjectLayout>
    )
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit {po.poNumber}</h1>
            <p className="text-gray-600 mt-1">Update purchase order details</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PO Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vendor *</Label>
                    <Select value={vendor} onValueChange={setVendor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ven-1">Thai Steel Co., Ltd.</SelectItem>
                        <SelectItem value="ven-2">Hardware Plus Ltd.</SelectItem>
                        <SelectItem value="ven-3">Fastener World Co.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>PO Date *</Label>
                    <Input type="date" value={poDate} onChange={(e) => setPoDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Date *</Label>
                    <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Items</CardTitle>
                  <Button size="sm" onClick={addItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Item {index + 1}</span>
                        {items.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Product Name *</Label>
                          <Input
                            value={item.productName}
                            onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>SKU</Label>
                          <Input
                            value={item.productSku}
                            onChange={(e) => updateItem(item.id, 'productSku', e.target.value)}
                            placeholder="Enter SKU"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Quantity *</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Unit Price *</Label>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>UOM</Label>
                          <Select value={item.uom} onValueChange={(v) => updateItem(item.id, 'uom', v)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="pcs">pcs</SelectItem>
                              <SelectItem value="m">m</SelectItem>
                              <SelectItem value="box">box</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Total</Label>
                          <Input value={(item.quantity * item.unitPrice).toFixed(2)} disabled />
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
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">฿{calculateSubTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (7%)</span>
                  <span className="font-medium">฿{calculateVAT().toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <span className="font-semibold">Grand Total</span>
                  <span className="text-xl font-bold text-primary">฿{calculateGrandTotal().toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Update PO
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
