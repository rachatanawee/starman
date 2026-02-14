'use client'

import { X, Package, MapPin, User, Calendar, DollarSign, FileText, Wrench, QrCode } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Asset } from '../types'
import { formatUtils } from '@/shared/lib/business-utils'

interface AssetDetailProps {
  asset: Asset
  onClose: () => void
}

const statusColors = {
  active: 'bg-green-100 text-green-800 border-green-200',
  maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  retired: 'bg-gray-100 text-gray-800 border-gray-200',
  lost: 'bg-red-100 text-red-800 border-red-200'
}

export function AssetDetail({ asset, onClose }: AssetDetailProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:flex lg:items-center lg:justify-center">
      <div className="h-full lg:h-auto lg:max-h-[90vh] w-full lg:max-w-2xl bg-white lg:rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <h2 className="text-lg font-bold">Asset Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Status Badge */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">{asset.name}</h3>
              <p className="text-gray-600">{asset.code}</p>
            </div>
            <Badge className={statusColors[asset.status]}>
              {asset.status}
            </Badge>
          </div>

          {/* QR Code */}
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border-2">
                <QrCode className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">QR Code</p>
                <p className="font-mono font-semibold">{asset.qrCode}</p>
              </div>
            </div>
          </Card>

          {/* Basic Info */}
          <Card className="p-4 space-y-3">
            <h4 className="font-semibold text-sm text-gray-500 uppercase">Basic Information</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Package className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium capitalize">{asset.category}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium">{asset.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="font-medium">{asset.department}</p>
                </div>
              </div>

              {asset.assignedTo && (
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Assigned To</p>
                    <p className="font-medium">{asset.assignedTo}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Financial Info */}
          <Card className="p-4 space-y-3">
            <h4 className="font-semibold text-sm text-gray-500 uppercase">Financial Information</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Purchase Date</p>
                  <p className="font-medium">{formatUtils.date(asset.purchaseDate)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Purchase Price</p>
                  <p className="font-medium">{formatUtils.currency(asset.purchasePrice)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Current Value</p>
                  <p className="font-medium text-primary">{formatUtils.currency(asset.currentValue)}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Maintenance Info */}
          {(asset.lastMaintenanceDate || asset.nextMaintenanceDate) && (
            <Card className="p-4 space-y-3">
              <h4 className="font-semibold text-sm text-gray-500 uppercase flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Maintenance
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {asset.lastMaintenanceDate && (
                  <div>
                    <p className="text-xs text-gray-500">Last Maintenance</p>
                    <p className="font-medium">{formatUtils.date(asset.lastMaintenanceDate)}</p>
                  </div>
                )}

                {asset.nextMaintenanceDate && (
                  <div>
                    <p className="text-xs text-gray-500">Next Maintenance</p>
                    <p className="font-medium">{formatUtils.date(asset.nextMaintenanceDate)}</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Description */}
          {asset.description && (
            <Card className="p-4">
              <h4 className="font-semibold text-sm text-gray-500 uppercase mb-2">Description</h4>
              <p className="text-gray-700">{asset.description}</p>
            </Card>
          )}

          {/* Notes */}
          {asset.notes && (
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <h4 className="font-semibold text-sm text-yellow-800 uppercase mb-2">Notes</h4>
              <p className="text-yellow-900">{asset.notes}</p>
            </Card>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-gray-50 flex gap-2">
          <Button variant="outline" className="flex-1">Edit</Button>
          <Button className="flex-1">Update Status</Button>
        </div>
      </div>
    </div>
  )
}
