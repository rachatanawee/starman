// Starman ERP: BOM Mock Data & Types - Steel Service Center

export interface BOMItem {
  id: string
  componentId: string
  componentSku: string
  componentName: string
  quantity: number
  uom: string
  scrapFactor: number
  unitCost: number
  totalCost: number
  operationStep: number
  notes?: string
}

export interface BOM {
  id: string
  bomNumber: string
  productId: string
  productName: string
  productSku: string
  revision: string
  isActive: boolean
  isDefault: boolean
  description: string
  yieldRate: number
  estimatedCost: number
  items: BOMItem[]
  createdAt: string
  updatedAt: string
}

export interface WorkCenter {
  id: string
  code: string
  name: string
  type: 'machine' | 'human'
  costPerHour: number
  overheadCostPerHour: number
  capacityPerDay: number
  efficiencyRate: number
  isActive: boolean
}

export interface RoutingOperation {
  id: string
  sequenceNo: number
  workCenterId: string
  workCenterName: string
  operationName: string
  description: string
  setupTime: number
  runTime: number
  moveTime: number
  isBackflushPoint: boolean
}

export interface Routing {
  id: string
  routingNumber: string
  productId: string
  productName: string
  isDefault: boolean
  isActive: boolean
  operations: RoutingOperation[]
}

// Mock Work Centers - Steel Service Center
export const mockWorkCenters: WorkCenter[] = [
  {
    id: 'wc-1',
    code: 'WC-SLIT-01',
    name: 'Slitting Machine',
    type: 'machine',
    costPerHour: 800,
    overheadCostPerHour: 150,
    capacityPerDay: 16,
    efficiencyRate: 92,
    isActive: true
  },
  {
    id: 'wc-2',
    code: 'WC-SHEAR-01',
    name: 'Shearing Machine',
    type: 'machine',
    costPerHour: 600,
    overheadCostPerHour: 120,
    capacityPerDay: 16,
    efficiencyRate: 95,
    isActive: true
  },
  {
    id: 'wc-3',
    code: 'WC-BEND-01',
    name: 'Press Brake / Bending Machine',
    type: 'machine',
    costPerHour: 750,
    overheadCostPerHour: 140,
    capacityPerDay: 16,
    efficiencyRate: 90,
    isActive: true
  }
]

// Mock BOMs - Steel Service Center Products
export const mockBOMs: BOM[] = [
  {
    id: 'bom-1',
    bomNumber: 'BOM-CCHAN-001',
    productId: 'prod-1',
    productName: 'C-Channel 100x50x20x2.0mm',
    productSku: 'FG-CCHAN-100',
    revision: '1.0',
    isActive: true,
    isDefault: true,
    description: 'C-Channel profile made from 2.0mm steel coil, used for structural support',
    yieldRate: 96,
    estimatedCost: 127.50,
    items: [
      {
        id: 'item-1',
        componentId: 'comp-1',
        componentSku: 'RM-COIL-2.0',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
        quantity: 5.1,
        uom: 'kg',
        scrapFactor: 2,
        unitCost: 25,
        totalCost: 127.50,
        operationStep: 10,
        notes: 'Approx 5kg per piece + 2% scrap allowance'
      }
    ],
    createdAt: '2025-11-15T08:30:00Z',
    updatedAt: '2025-11-15T08:30:00Z'
  },
  {
    id: 'bom-2',
    bomNumber: 'BOM-PANEL-001',
    productId: 'prod-2',
    productName: 'Electrical Panel Door 600x400mm',
    productSku: 'FG-PANEL-600',
    revision: '2.0',
    isActive: true,
    isDefault: true,
    description: 'Electrical control panel door with bended edges, 1.2mm thickness',
    yieldRate: 98,
    estimatedCost: 67.32,
    items: [
      {
        id: 'item-2',
        componentId: 'comp-2',
        componentSku: 'RM-COIL-1.2',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 1.2mm',
        quantity: 2.88,
        uom: 'kg',
        scrapFactor: 3,
        unitCost: 23,
        totalCost: 66.24,
        operationStep: 10,
        notes: 'Weight calc: 0.6m x 0.4m x 1.2mm x 7.85g/cm³ + 3% scrap'
      },
      {
        id: 'item-3',
        componentId: 'comp-3',
        componentSku: 'HW-HINGE-001',
        componentName: 'Piano Hinge 400mm',
        quantity: 1,
        uom: 'pcs',
        scrapFactor: 0,
        unitCost: 0.80,
        totalCost: 0.80,
        operationStep: 20,
        notes: 'Attached after bending'
      },
      {
        id: 'item-4',
        componentId: 'comp-4',
        componentSku: 'HW-LOCK-001',
        componentName: 'Panel Lock',
        quantity: 1,
        uom: 'pcs',
        scrapFactor: 0,
        unitCost: 0.28,
        totalCost: 0.28,
        operationStep: 20
      }
    ],
    createdAt: '2025-11-10T09:15:00Z',
    updatedAt: '2026-01-08T14:20:00Z'
  },
  {
    id: 'bom-3',
    bomNumber: 'BOM-BRKT-001',
    productId: 'prod-3',
    productName: 'Heavy Duty Mounting Bracket',
    productSku: 'FG-BRKT-HD-001',
    revision: '1.0',
    isActive: true,
    isDefault: true,
    description: 'L-shaped mounting bracket 150x100mm, 3.0mm thick steel',
    yieldRate: 95,
    estimatedCost: 105.60,
    items: [
      {
        id: 'item-5',
        componentId: 'comp-5',
        componentSku: 'RM-COIL-3.0',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 3.0mm',
        quantity: 3.6,
        uom: 'kg',
        scrapFactor: 5,
        unitCost: 28,
        totalCost: 100.80,
        operationStep: 10,
        notes: 'Heavier gauge requires higher scrap allowance'
      },
      {
        id: 'item-6',
        componentId: 'comp-6',
        componentSku: 'HW-BOLT-M10',
        componentName: 'Hex Bolt M10x30mm',
        quantity: 4,
        uom: 'pcs',
        scrapFactor: 0,
        unitCost: 0.15,
        totalCost: 0.60,
        operationStep: 20,
        notes: 'Pre-drilled holes'
      },
      {
        id: 'item-7',
        componentId: 'comp-7',
        componentSku: 'HW-NUT-M10',
        componentName: 'Hex Nut M10',
        quantity: 4,
        uom: 'pcs',
        scrapFactor: 0,
        unitCost: 0.05,
        totalCost: 0.20,
        operationStep: 20
      },
      {
        id: 'item-8',
        componentId: 'comp-8',
        componentSku: 'COAT-ZINC-001',
        componentName: 'Zinc Coating (per kg)',
        quantity: 0.15,
        uom: 'kg',
        scrapFactor: 10,
        unitCost: 28,
        totalCost: 4.00,
        operationStep: 30,
        notes: 'Anti-corrosion coating'
      }
    ],
    createdAt: '2026-01-01T10:45:00Z',
    updatedAt: '2026-01-01T10:45:00Z'
  }
]

// Mock Routings
export const mockRoutings: Routing[] = [
  {
    id: 'route-1',
    routingNumber: 'RT-CCHAN-001',
    productId: 'prod-1',
    productName: 'C-Channel 100x50x20x2.0mm',
    isDefault: true,
    isActive: true,
    operations: [
      {
        id: 'op-1',
        sequenceNo: 10,
        workCenterId: 'wc-1',
        workCenterName: 'Slitting Machine',
        operationName: 'Slit Coil to Width',
        description: 'Slit 2.0mm coil to required width for C-channel profile',
        setupTime: 20,
        runTime: 3,
        moveTime: 2,
        isBackflushPoint: true
      },
      {
        id: 'op-2',
        sequenceNo: 20,
        workCenterId: 'wc-2',
        workCenterName: 'Shearing Machine',
        operationName: 'Shear to Length',
        description: 'Cut strip to required length',
        setupTime: 10,
        runTime: 2,
        moveTime: 1,
        isBackflushPoint: false
      },
      {
        id: 'op-3',
        sequenceNo: 30,
        workCenterId: 'wc-3',
        workCenterName: 'Press Brake / Bending Machine',
        operationName: 'Form C-Channel Profile',
        description: 'Bend flat blank into C-channel shape using press brake',
        setupTime: 15,
        runTime: 5,
        moveTime: 2,
        isBackflushPoint: true
      }
    ]
  },
  {
    id: 'route-2',
    routingNumber: 'RT-PANEL-001',
    productId: 'prod-2',
    productName: 'Electrical Panel Door 600x400mm',
    isDefault: true,
    isActive: true,
    operations: [
      {
        id: 'op-4',
        sequenceNo: 10,
        workCenterId: 'wc-2',
        workCenterName: 'Shearing Machine',
        operationName: 'Cut Blank',
        description: 'Shear 1.2mm coil to 600x400mm blank',
        setupTime: 8,
        runTime: 1.5,
        moveTime: 1,
        isBackflushPoint: true
      },
      {
        id: 'op-5',
        sequenceNo: 20,
        workCenterId: 'wc-3',
        workCenterName: 'Press Brake / Bending Machine',
        operationName: 'Bend Edges',
        description: 'Form 90-degree bends on all four edges for rigidity',
        setupTime: 12,
        runTime: 4,
        moveTime: 1,
        isBackflushPoint: true
      }
    ]
  }
]
