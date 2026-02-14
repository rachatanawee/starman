import { OrderItem, OrderSummary } from '../types'

export function calculateOrderSummary(
  items: OrderItem[],
  globalDiscount: number = 0,
  shippingCost: number = 0,
  taxRate: number = 7
): OrderSummary {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * globalDiscount) / 100
  const taxableAmount = subtotal - discountAmount
  const taxAmount = (taxableAmount * taxRate) / 100
  const grandTotal = taxableAmount + taxAmount + shippingCost

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    shippingCost,
    grandTotal
  }
}

export function calculateLineTotal(
  quantity: number,
  unitPrice: number,
  discount: number = 0
): number {
  const lineTotal = (quantity * unitPrice) - discount
  return Math.max(0, lineTotal)
}
