import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { OrderItem } from '../types'

interface OrderItemsTableProps {
  items: OrderItem[]
  onAddItem: () => void
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, field: keyof OrderItem, value: string | number) => void
}

export function OrderItemsTable({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem
}: OrderItemsTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Order Items</h3>
        <Button type="button" variant="outline" size="sm" onClick={onAddItem} data-testid="add-item-row">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

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
                    onChange={(e) => onUpdateItem(item.id, 'sku', e.target.value)}
                    placeholder="SKU"
                    className="h-8"
                  />
                </td>
                <td className="p-2">
                  <Input 
                    value={item.productName} 
                    onChange={(e) => onUpdateItem(item.id, 'productName', e.target.value)}
                    placeholder="Product name"
                    className="h-8"
                  />
                </td>
                <td className="p-2">
                  <Input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
                    className="h-8 text-right"
                    min="1"
                  />
                </td>
                <td className="p-2">
                  <Input 
                    type="number" 
                    value={item.unitPrice} 
                    onChange={(e) => onUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                    className="h-8 text-right"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="p-2">
                  <Input 
                    type="number" 
                    value={item.discount} 
                    onChange={(e) => onUpdateItem(item.id, 'discount', Number(e.target.value))}
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
                    onClick={() => onRemoveItem(item.id)}
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
    </div>
  )
}
