'use client'

import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import * as React from 'react'

const mockData = {
  '1': { orderNumber: 'SO-2024-001', customer: 'Acme Corp', date: '2024/01/15', amount: 15000, status: 'Completed', items: 5 },
  '2': { orderNumber: 'SO-2024-002', customer: 'Tech Solutions', date: '2024/01/16', amount: 28500, status: 'Processing', items: 8 },
  '3': { orderNumber: 'SO-2024-003', customer: 'Global Industries', date: '2024/01/17', amount: 42000, status: 'Pending', items: 12 },
  '4': { orderNumber: 'SO-2024-004', customer: 'Smart Systems', date: '2024/01/18', amount: 19800, status: 'Completed', items: 6 },
  '5': { orderNumber: 'SO-2024-005', customer: 'Digital Dynamics', date: '2024/01/19', amount: 33600, status: 'Shipped', items: 10 },
}

export default function EditSalesOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const orderId = params.orderId as string
  const order = mockData[orderId as keyof typeof mockData]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${params.locale}/company/${projectId}/sales-order`)
  }

  if (!order) {
    return (
      
        <div className="p-6">Order not found</div>
      
    )
  }

  return (
    
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Sales Order</h1>
            <p className="text-gray-600 mt-1">Update order details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input id="orderNumber" defaultValue={order.orderNumber} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input id="customer" defaultValue={order.customer} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={order.date} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={order.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" defaultValue={order.amount} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="items">Items</Label>
                  <Input id="items" type="number" defaultValue={order.items} required />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Update Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    
  )
}
