import { TopProduct } from '../types'

interface TopProductsListProps {
  products: TopProduct[]
}

export function TopProductsList({ products }: TopProductsListProps) {
  const maxUnits = products[0]?.units || 1

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{product.name}</span>
              <span className="text-sm text-gray-600">{product.units} units</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(product.units / maxUnits) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-semibold text-primary ml-4">
            ฿{product.revenue.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}
