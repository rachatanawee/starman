// Starman ERP: Inventory Mock Data - The Warehouse Guardian

export interface InventoryItem {
  id: string
  productId: string
  productName: string
  productSku: string
  category: 'raw_material' | 'finished_goods' | 'hardware' | 'consumable'
  warehouseId: string
  warehouseName: string
  locationId: string
  locationCode: string
  quantity: number
  reservedQuantity: number
  availableQuantity: number
  uom: string
  unitCost: number
  totalValue: number
  lotNumber?: string
  expiryDate?: string
  lastMovementDate: string
  daysStagnant: number
  attributes?: Record<string, string>
  description?: string
  minStock?: number
  maxStock?: number
}

export interface StockTransaction {
  id: string
  transactionDate: string
  productId: string
  productName: string
  productSku: string
  transactionType: 'purchase_receive' | 'sale_delivery' | 'mfg_issue' | 'mfg_receive' | 'transfer' | 'adjust'
  fromLocation: string
  toLocation: string
  quantity: number
  uom: string
  lotNumber?: string
  referenceDoc: string
  createdBy: string
}

export interface AIGuardianAlert {
  id: string
  type: 'dead_stock' | 'negative_stock' | 'expiring_soon' | 'low_turnover'
  severity: 'info' | 'warning' | 'critical'
  title: string
  message: string
  productId?: string
  action?: {
    label: string
    type: string
  }
}

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-1',
    productId: 'rm-001',
    productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
    productSku: 'RM-COIL-2.0',
    category: 'raw_material',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-1',
    locationCode: 'BIN-A-01',
    quantity: 1500,
    reservedQuantity: 550,
    availableQuantity: 950,
    uom: 'kg',
    unitCost: 50,
    totalValue: 75000,
    lotNumber: 'LOT-2026-001',
    lastMovementDate: '2026-02-15',
    daysStagnant: 5,
    description: 'Cold rolled steel coil for general forming applications',
    minStock: 500,
    maxStock: 3000,
    attributes: {
      'Material Grade': 'JIS G3141 SPCC-SD',
      'Thickness': '2.0mm',
      'Width': '1000mm',
      'Surface Finish': 'Dull',
      'Coating': 'None',
      'Origin': 'Thailand'
    }
  },
  {
    id: 'inv-2',
    productId: 'rm-002',
    productName: 'Steel Coil JIS G3141 SPCC-SD 1.2mm',
    productSku: 'RM-COIL-1.2',
    category: 'raw_material',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-2',
    locationCode: 'BIN-A-02',
    quantity: 800,
    reservedQuantity: 0,
    availableQuantity: 800,
    uom: 'kg',
    unitCost: 46,
    totalValue: 36800,
    lotNumber: 'LOT-2026-002',
    lastMovementDate: '2026-02-10',
    daysStagnant: 10
  },
  {
    id: 'inv-3',
    productId: 'hw-001',
    productName: 'Piano Hinge 400mm',
    productSku: 'HW-HINGE-001',
    category: 'hardware',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-3',
    locationCode: 'BIN-B-01',
    quantity: 150,
    reservedQuantity: 0,
    availableQuantity: 150,
    uom: 'pcs',
    unitCost: 50,
    totalValue: 7500,
    lastMovementDate: '2026-02-10',
    daysStagnant: 10
  },
  {
    id: 'inv-4',
    productId: 'hw-002',
    productName: 'Hex Bolt M10x30mm',
    productSku: 'HW-BOLT-M10',
    category: 'hardware',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-4',
    locationCode: 'BIN-B-02',
    quantity: 1000,
    reservedQuantity: 3000,
    availableQuantity: -2000,
    uom: 'pcs',
    unitCost: 2,
    totalValue: 2000,
    lastMovementDate: '2026-02-17',
    daysStagnant: 3
  },
  {
    id: 'inv-5',
    productId: 'fg-001',
    productName: 'C-Channel 100x50x20x2.0mm',
    productSku: 'FG-CCHAN-100',
    category: 'finished_goods',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-5',
    locationCode: 'BIN-C-01',
    quantity: 350,
    reservedQuantity: 150,
    availableQuantity: 200,
    uom: 'pcs',
    unitCost: 127.50,
    totalValue: 44625,
    lastMovementDate: '2026-02-18',
    daysStagnant: 2
  },
  {
    id: 'inv-6',
    productId: 'fg-002',
    productName: 'Electrical Panel Door 600x400mm',
    productSku: 'FG-PANEL-600',
    category: 'finished_goods',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-6',
    locationCode: 'BIN-C-02',
    quantity: 200,
    reservedQuantity: 0,
    availableQuantity: 200,
    uom: 'pcs',
    unitCost: 67.32,
    totalValue: 13464,
    lastMovementDate: '2026-02-14',
    daysStagnant: 6
  },
  {
    id: 'inv-7',
    productId: 'cons-001',
    productName: 'Cutting Oil 5L',
    productSku: 'CONS-OIL-5L',
    category: 'consumable',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    locationId: 'loc-7',
    locationCode: 'BIN-D-01',
    quantity: 5,
    reservedQuantity: 0,
    availableQuantity: 5,
    uom: 'bottle',
    unitCost: 450,
    totalValue: 2250,
    expiryDate: '2026-08-20',
    lastMovementDate: '2025-08-20',
    daysStagnant: 183
  }
]

export const mockStockTransactions: StockTransaction[] = [
  {
    id: 'txn-1',
    transactionDate: '2026-02-15T14:30:00Z',
    productId: 'rm-001',
    productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
    productSku: 'RM-COIL-2.0',
    transactionType: 'purchase_receive',
    fromLocation: 'Supplier',
    toLocation: 'BIN-A-01',
    quantity: 1500,
    uom: 'kg',
    lotNumber: 'LOT-2026-001',
    referenceDoc: 'GR-2026-001',
    createdBy: 'John Smith'
  },
  {
    id: 'txn-2',
    transactionDate: '2026-02-10T16:00:00Z',
    productId: 'hw-001',
    productName: 'Piano Hinge 400mm',
    productSku: 'HW-HINGE-001',
    transactionType: 'purchase_receive',
    fromLocation: 'Supplier',
    toLocation: 'BIN-B-01',
    quantity: 150,
    uom: 'pcs',
    referenceDoc: 'GR-2026-002',
    createdBy: 'Mike Johnson'
  },
  {
    id: 'txn-3',
    transactionDate: '2026-02-18T10:15:00Z',
    productId: 'rm-001',
    productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
    productSku: 'RM-COIL-2.0',
    transactionType: 'mfg_issue',
    fromLocation: 'BIN-A-01',
    toLocation: 'Production Line 1',
    quantity: 500,
    uom: 'kg',
    lotNumber: 'LOT-2026-001',
    referenceDoc: 'PO-2026-001',
    createdBy: 'System'
  },
  {
    id: 'txn-4',
    transactionDate: '2026-02-18T16:30:00Z',
    productId: 'fg-001',
    productName: 'C-Channel 100x50x20x2.0mm',
    productSku: 'FG-CCHAN-100',
    transactionType: 'mfg_receive',
    fromLocation: 'Production Line 1',
    toLocation: 'BIN-C-01',
    quantity: 350,
    uom: 'pcs',
    referenceDoc: 'PO-2026-001',
    createdBy: 'System'
  },
  {
    id: 'txn-5',
    transactionDate: '2026-02-14T11:00:00Z',
    productId: 'fg-002',
    productName: 'Electrical Panel Door 600x400mm',
    productSku: 'FG-PANEL-600',
    transactionType: 'mfg_receive',
    fromLocation: 'Production Line 2',
    toLocation: 'BIN-C-02',
    quantity: 200,
    uom: 'pcs',
    referenceDoc: 'PO-2026-002',
    createdBy: 'System'
  }
]

export const mockAIGuardianAlerts: AIGuardianAlert[] = [
  {
    id: 'alert-1',
    type: 'negative_stock',
    severity: 'critical',
    title: 'Negative Stock Detected',
    message: 'Hex Bolt M10x30mm (HW-BOLT-M10) has negative available quantity (-2,000 pcs). This indicates missing GR or incorrect lot tracking.',
    productId: 'hw-002',
    action: {
      label: 'Adjust Stock',
      type: 'adjust_stock'
    }
  },
  {
    id: 'alert-2',
    type: 'dead_stock',
    severity: 'warning',
    title: 'Dead Stock Alert',
    message: 'Cutting Oil 5L (CONS-OIL-5L) has been stagnant for 183 days with ฿2,250 tied up. Consider promotion or write-off.',
    productId: 'cons-001',
    action: {
      label: 'Create Promotion',
      type: 'create_promotion'
    }
  },
  {
    id: 'alert-3',
    type: 'expiring_soon',
    severity: 'warning',
    title: 'Expiring Soon',
    message: 'Cutting Oil 5L (CONS-OIL-5L) will expire on 2026-08-20 (6 months). Use or dispose before expiry.',
    productId: 'cons-001'
  }
]

export const mockWarehouses = [
  { id: 'wh-1', code: 'WH-MAIN', name: 'Main Warehouse' },
  { id: 'wh-2', code: 'WH-SCRAP', name: 'Scrap Warehouse' }
]

export const mockLocations = [
  { id: 'loc-1', warehouseId: 'wh-1', code: 'BIN-A-01', name: 'Raw Material Zone A - Bin 01' },
  { id: 'loc-2', warehouseId: 'wh-1', code: 'BIN-A-02', name: 'Raw Material Zone A - Bin 02' },
  { id: 'loc-3', warehouseId: 'wh-1', code: 'BIN-B-01', name: 'Hardware Zone B - Bin 01' },
  { id: 'loc-4', warehouseId: 'wh-1', code: 'BIN-B-02', name: 'Hardware Zone B - Bin 02' },
  { id: 'loc-5', warehouseId: 'wh-1', code: 'BIN-C-01', name: 'Finished Goods Zone C - Bin 01' },
  { id: 'loc-6', warehouseId: 'wh-1', code: 'BIN-C-02', name: 'Finished Goods Zone C - Bin 02' },
  { id: 'loc-7', warehouseId: 'wh-1', code: 'BIN-D-01', name: 'Consumables Zone D - Bin 01' }
]
