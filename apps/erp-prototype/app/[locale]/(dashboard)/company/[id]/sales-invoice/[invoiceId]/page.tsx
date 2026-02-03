'use client'

import { Button } from '@spark/core'
import { Card, CardContent, CardHeader, CardTitle } from '@spark/core'
import { Input } from '@spark/core'
import { Label } from '@spark/core'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@spark/core'
import { Textarea } from '@spark/core'
import { Badge } from '@spark/core'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Receipt, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import * as React from 'react'

export default function EditSalesInvoicePage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const invoiceId = params.invoiceId as string

  const [items, setItems] = React.useState([
    { id: 1, product: 'Product A', quantity: 5, unitPrice: 3000, discount: 0, total: 15000 }
  ])

  const [formData, setFormData] = React.useState({
    invoiceNumber: 'INV-2026-001',
    salesOrderId: 'SO-2026-055',
    quotationId: 'QT-2026-001',
    customer: 'acme',
    customerTaxId: '0-1234-56789-01-2',
    customerBranch: 'Head Office',
    billingAddress: '123 Business St, Bangkok 10110',
    invoiceDate: '2026-01-15',
    paymentTerms: 'Net 30',
    dueDate: '2026-02-14',
    paymentStatus: 'Paid',
    vatRate: 7,
    isVatIncluded: false,
    whtRate: 3,
    totalPaid: 16050,
    notes: 'Thank you for your business'
  })

  const addItem = () => {
    setItems([...items, { id: Date.now(), product: '', quantity: 1, unitPrice: 0, discount: 0, total: 0 }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        updated.total = (updated.quantity * updated.unitPrice) - updated.discount
        return updated
      }
      return item
    }))
  }

  const subTotal = items.reduce((sum, item) => sum + item.total, 0)
  const vatAmount = formData.isVatIncluded ? 0 : (subTotal * formData.vatRate / 100)
  const whtAmount = subTotal * formData.whtRate / 100
  const grandTotal = subTotal + vatAmount
  const balanceDue = grandTotal - formData.totalPaid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated Invoice Data:', { formData, items, subTotal, vatAmount, whtAmount, grandTotal })
    router.push(`/${params.locale}/company/${projectId}/sales-invoice`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>
      case 'Partially Paid':
        return <Badge className="bg-blue-100 text-blue-800"><DollarSign className="h-3 w-3 mr-1" />Partially Paid</Badge>
      case 'Unpaid':
        return <Badge className="bg-yellow-100 text-yellow-800"><DollarSign className="h-3 w-3 mr-1" />Unpaid</Badge>
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>
      default:
        return null
    }
  }

  return (
    
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{formData.invoiceNumber}</h1>
                {getStatusBadge(formData.paymentStatus)}
              </div>
              <p className="text-gray-600 mt-1">Edit invoice details</p>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Receipt className="h-5 w-5" />
              Document Chain
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <span className="text-xs font-bold text-blue-700">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Quotation</span>
                    <button
                      type="button"
                      onClick={() => router.push(`/${params.locale}/company/${projectId}/quotation/QT-001`)}
                      className="text-blue-600 hover:underline text-sm font-mono"
                    >
                      QT-2026-001
                    </button>
                    <Badge variant="outline" className="text-xs">Accepted</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">2026-01-10 - Initial quote created</p>
                </div>
              </div>
              <div className="ml-6 border-l-2 border-blue-300 h-4"></div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Sales Order</span>
                    <button
                      type="button"
                      onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-order/SO-001`)}
                      className="text-primary hover:underline text-sm font-mono"
                    >
                      SO-2026-055
                    </button>
                    <Badge variant="outline" className="text-xs">Completed</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">2026-01-12 - Order confirmed from QT-2026-001</p>
                </div>
              </div>
              <div className="ml-6 border-l-2 border-blue-300 h-4"></div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <span className="text-xs font-bold text-green-700">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Sales Invoice</span>
                    <span className="text-green-600 text-sm font-mono font-bold">{formData.invoiceNumber}</span>
                    {getStatusBadge(formData.paymentStatus)}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">2026-01-15 - Invoice created from SO-2026-055</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer *</Label>
                  <Select value={formData.customer} onValueChange={(v) => setFormData({...formData, customer: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="tech">Tech Solutions</SelectItem>
                      <SelectItem value="global">Global Industries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <Input value={formData.customerTaxId} onChange={(e) => setFormData({...formData, customerTaxId: e.target.value})} placeholder="0-0000-00000-00-0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Input value={formData.customerBranch} onChange={(e) => setFormData({...formData, customerBranch: e.target.value})} placeholder="Head Office / Branch 001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Billing Address *</Label>
                <Textarea value={formData.billingAddress} onChange={(e) => setFormData({...formData, billingAddress: e.target.value})} placeholder="Enter billing address" rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Date *</Label>
                  <Input type="date" value={formData.invoiceDate} onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Payment Terms</Label>
                  <Select value={formData.paymentTerms} onValueChange={(v) => setFormData({...formData, paymentTerms: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 7">Net 7</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date *</Label>
                  <Input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Status</Label>
                  <Select value={formData.paymentStatus} onValueChange={(v) => setFormData({...formData, paymentStatus: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Total Paid</Label>
                  <Input type="number" value={formData.totalPaid} onChange={(e) => setFormData({...formData, totalPaid: Number(e.target.value)})} min="0" step="0.01" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Line Items</span>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-4 space-y-2">
                      <Label>Product</Label>
                      <Input value={item.product} onChange={(e) => updateItem(item.id, 'product', e.target.value)} placeholder="Product name" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Quantity</Label>
                      <Input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} min="1" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Unit Price</Label>
                      <Input type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))} min="0" step="0.01" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Discount</Label>
                      <Input type="number" value={item.discount} onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))} min="0" step="0.01" />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <Label>Total</Label>
                      <div className="font-semibold text-right">{item.total.toFixed(2)}</div>
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={items.length === 1}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>VAT Rate (%)</Label>
                  <Input type="number" value={formData.vatRate} onChange={(e) => setFormData({...formData, vatRate: Number(e.target.value)})} min="0" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>WHT Rate (%)</Label>
                  <Input type="number" value={formData.whtRate} onChange={(e) => setFormData({...formData, whtRate: Number(e.target.value)})} min="0" step="0.01" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-semibold">฿{subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT ({formData.vatRate}%):</span>
                  <span className="font-semibold">฿{vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>WHT ({formData.whtRate}%):</span>
                  <span className="font-semibold">-฿{whtAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Grand Total:</span>
                  <span className="text-green-600">฿{grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-blue-600">
                  <span>Total Paid:</span>
                  <span className="font-semibold">฿{formData.totalPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Balance Due:</span>
                  <span className={balanceDue > 0 ? 'text-red-600' : 'text-green-600'}>฿{balanceDue.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Additional notes..." rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Receipt className="h-4 w-4 mr-2" />
              Update Invoice
            </Button>
          </div>
        </form>
      </div>
    
  )
}
