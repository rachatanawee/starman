'use client'

import { Package, MapPin, User, Calendar, DollarSign } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Asset } from '../types'
import { formatUtils } from '@/shared/lib/business-utils'

interface AssetCardProps {
  asset: Asset
  onClick?: () => void
}

const statusColors = {
  active: 'bg-green-100 text-green-800 border-green-200',
  maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  retired: 'bg-gray-100 text-gray-800 border-gray-200',
  lost: 'bg-red-100 text-red-800 border-red-200'
}

const categoryIcons = {
  equipment: Package,
  vehicle: Package,
  furniture: Package,
  electronics: Package,
  other: Package
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
  const CategoryIcon = categoryIcons[asset.category]

  return (
    <Card
      className="p-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
            <CategoryIcon className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base truncate">{asset.name}</h3>
            <Badge className={statusColors[asset.status]}>
              {asset.status}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-2">{asset.code}</p>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{asset.location}</span>
            </div>

            {asset.assignedTo && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{asset.assignedTo}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{formatUtils.currency(asset.currentValue)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
