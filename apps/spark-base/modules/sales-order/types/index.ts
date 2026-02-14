export interface SalesOrder {
  id: string
  orderNumber: string
  customer: string
  date: string
  deliveryDate?: string
  amount: number
  status: 'Draft' | 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled'
  items: number
  refNumber?: string
  billingAddress?: string
  shippingAddress?: string
  paymentTerms?: string
  notes?: string
}

export interface OrderItem {
  id: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  discount: number
  total: number
}

export interface OrderSummary {
  subtotal: number
  discountAmount: number
  taxableAmount: number
  taxAmount: number
  shippingCost: number
  grandTotal: number
}

export type OrderStatus = SalesOrder['status']
