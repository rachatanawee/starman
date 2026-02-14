export interface Asset {
  id: string
  code: string
  name: string
  category: 'equipment' | 'vehicle' | 'furniture' | 'electronics' | 'other'
  status: 'active' | 'maintenance' | 'retired' | 'lost'
  location: string
  department: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  assignedTo?: string
  qrCode: string
  imageUrl?: string
  description?: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AssetScanResult {
  code: string
  timestamp: string
  location?: string
}
