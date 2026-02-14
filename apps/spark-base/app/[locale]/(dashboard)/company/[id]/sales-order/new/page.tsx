'use client'

import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { ProjectLayout } from '@/core/layout/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { useState } from 'react'
import { useOrderItems, calculateOrderSummary, OrderItemsTable, OrderSummaryCard } from '@/modules/sales-order'

export default function NewSalesOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const { items, addItem, removeItem, updateItem } = useOrderItems()
  const [globalDiscount, setGlobalDiscount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const taxRate = 7 // VAT 7%

  const summary = calculateOrderSummary(items, globalDiscount, shippingCost, taxRate)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            <CardContent className="pt-6">
              <OrderItemsTable
                items={items}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onUpdateItem={updateItem}
              />
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

            <OrderSummaryCard
              summary={summary}
              globalDiscount={globalDiscount}
              shippingCost={shippingCost}
              taxRate={taxRate}
              onDiscountChange={setGlobalDiscount}
              onShippingChange={setShippingCost}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" data-testid="save-order-btn">
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
          </div>
        </form>
      </div>
    </ProjectLayout>
  )
}
