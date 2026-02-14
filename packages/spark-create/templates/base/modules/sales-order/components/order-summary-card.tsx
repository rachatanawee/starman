import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { OrderSummary } from '../types'

interface OrderSummaryCardProps {
  summary: OrderSummary
  globalDiscount: number
  shippingCost: number
  taxRate: number
  onDiscountChange: (value: number) => void
  onShippingChange: (value: number) => void
}

export function OrderSummaryCard({
  summary,
  globalDiscount,
  shippingCost,
  taxRate,
  onDiscountChange,
  onShippingChange
}: OrderSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span className="font-medium">{summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Discount (%):</span>
          <Input 
            type="number" 
            value={globalDiscount} 
            onChange={(e) => onDiscountChange(Number(e.target.value))}
            className="w-24 h-8 text-right"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>Discount Amount:</span>
          <span className="text-red-600">-{summary.discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxable Amount:</span>
          <span>{summary.taxableAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>VAT ({taxRate}%):</span>
          <span>{summary.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Shipping Cost:</span>
          <Input 
            type="number" 
            value={shippingCost} 
            onChange={(e) => onShippingChange(Number(e.target.value))}
            className="w-24 h-8 text-right"
            min="0"
            step="0.01"
          />
        </div>
        <div className="border-t pt-3 flex justify-between text-lg font-bold">
          <span>Grand Total:</span>
          <span className="text-primary">{summary.grandTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
