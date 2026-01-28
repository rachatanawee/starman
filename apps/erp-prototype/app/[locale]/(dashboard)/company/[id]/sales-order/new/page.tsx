'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import * as React from 'react'

interface OrderItem {
  id: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  discount: number
  total: number
}

export default function NewSalesOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [items, setItems] = React.useState<OrderItem[]>([
    { id: '1', productName: '', sku: '', quantity: 1, unitPrice: 0, discount: 0, total: 0 }
  ])
  const [globalDiscount, setGlobalDiscount] = React.useState(0)
  const [shippingCost, setShippingCost] = React.useState(0)
  const [taxRate] = React.useState(7) // VAT 7%

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * globalDiscount) / 100
  const taxableAmount = subtotal - discountAmount
  const taxAmount = (taxableAmount * taxRate) / 100
  const grandTotal = taxableAmount + taxAmount + shippingCost

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      productName: '', 
      sku: '', 
      quantity: 1, 
      unitPrice: 0, 
      discount: 0, 
      total: 0 
    }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        const lineTotal = (updated.quantity * updated.unitPrice) - updated.discount
        updated.total = Math.max(0, lineTotal)
        return updated
      }
      return item
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${params.locale}/company/${projectId}/sales-order`)
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">New Sales Order</h1>
            <p className="text-gray-600 mt-1">Create a new customer order</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Information */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input id="orderNumber" placeholder="SO-2026-XXX" required data-testid="order-number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input id="orderDate" type="date" required data-testid="order-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input id="deliveryDate" type="date" data-testid="delivery-date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger data-testid="customer-select">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Acme Corporation</SelectItem>
                      <SelectItem value="2">Tech Solutions Ltd</SelectItem>
                      <SelectItem value="3">Global Trading Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refNumber">Reference No. (PO)</Label>
                  <Input id="refNumber" placeholder="Customer PO Number" data-testid="ref-number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea id="billingAddress" placeholder="Billing address" rows={3} data-testid="billing-address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address</Label>
                  <Textarea id="shippingAddress" placeholder="Shipping address" rows={3} data-testid="shipping-address" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select defaultValue="net30">
                    <SelectTrigger data-testid="payment-terms">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                      <SelectItem value="net90">Net 90</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger data-testid="status-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Items</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addItem} data-testid="add-item-row">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-2 font-medium">SKU</th>
                      <th className="text-left p-2 font-medium">Product Name</th>
                      <th className="text-right p-2 font-medium">Qty</th>
                      <th className="text-right p-2 font-medium">Unit Price</th>
                      <th className="text-right p-2 font-medium">Discount</th>
                      <th className="text-right p-2 font-medium">Total</th>
                      <th className="w-10 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">
                          <Input 
                            value={item.sku} 
                            onChange={(e) => updateItem(item.id, 'sku', e.target.value)}
                            placeholder="SKU"
                            className="h-8"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            value={item.productName} 
                            onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                            placeholder="Product name"
                            className="h-8"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                            className="h-8 text-right"
                            min="1"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number" 
                            value={item.unitPrice} 
                            onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                            className="h-8 text-right"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number" 
                            value={item.discount} 
                            onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
                            className="h-8 text-right"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="p-2 text-right font-medium">
                          {item.total.toFixed(2)}
                        </td>
                        <td className="p-2">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary & Notes */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Internal notes or delivery instructions..."
                  rows={8}
                  data-testid="notes"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-medium">{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Discount (%):</span>
                  <Input 
                    type="number" 
                    value={globalDiscount} 
                    onChange={(e) => setGlobalDiscount(Number(e.target.value))}
                    className="w-24 h-8 text-right"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount Amount:</span>
                  <span className="text-red-600">-{discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxable Amount:</span>
                  <span>{taxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT ({taxRate}%):</span>
                  <span>{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Shipping Cost:</span>
                  <Input 
                    type="number" 
                    value={shippingCost} 
                    onChange={(e) => setShippingCost(Number(e.target.value))}
                    className="w-24 h-8 text-right"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span className="text-purple-600">{grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" data-testid="save-order-btn">
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
          </div>
        </form>
      </div>
    </ProjectLayout>
  )
}
