// Starman ERP: Production Order Mock Data - Phase 2

export type ProductionStatus = 'created' | 'released' | 'in_progress' | 'completed' | 'closed' | 'cancelled'

export interface ProductionMaterial {
  id: string
  componentId: string
  componentName: string
  componentSku: string
  requiredQuantity: number
  issuedQuantity: number
  uom: string
  status: 'pending' | 'partial' | 'fully_issued'
}

export interface ProductionOperation {
  id: string
  sequenceNo: number
  operationName: string
  workCenterId: string
  workCenterName: string
  status: 'pending' | 'in_progress' | 'completed'
  plannedSetupTime: number
  plannedRunTime: number
  actualSetupTime: number
  actualRunTime: number
  completedQty: number
  scrapQty: number
}

export interface ProductionOrder {
  id: string
  orderNumber: string
  salesOrderIds: string[]  // Multiple SO can be combined
  planningId?: string  // Link to production planning
  productId: string
  productName: string
  productSku: string
  bomId: string
  routingId: string
  plannedQuantity: number
  producedQuantity: number
  scrapQuantity: number
  startDate: string
  dueDate: string
  actualStartDate?: string
  actualFinishDate?: string
  status: ProductionStatus
  priority: 'normal' | 'high' | 'urgent'
  notes?: string
  materials: ProductionMaterial[]
  operations: ProductionOperation[]
  createdAt: string
  updatedAt: string
}

export const mockProductionOrders: ProductionOrder[] = [
  {
    id: 'po-1',
    orderNumber: 'PO-2024-001',
    salesOrderIds: ['SO-2024-001', 'SO-2024-002'],  // Combined from 2 SOs
    planningId: 'plan-1',
    productId: 'prod-1',
    productName: 'C-Channel 100x50x20x2.0mm',
    productSku: 'FG-CCHAN-100',
    bomId: 'bom-1',
    routingId: 'route-1',
    plannedQuantity: 500,
    producedQuantity: 350,
    scrapQuantity: 8,
    startDate: '2024-02-15',
    dueDate: '2024-02-20',
    actualStartDate: '2024-02-15T08:00:00Z',
    status: 'in_progress',
    priority: 'high',
    notes: 'Combined from SO-2024-001 (300 pcs) + SO-2024-002 (200 pcs)',
    materials: [
      {
        id: 'mat-1',
        componentId: 'comp-1',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
        componentSku: 'RM-COIL-2.0',
        requiredQuantity: 2550,
        issuedQuantity: 1785,
        uom: 'kg',
        status: 'partial'
      }
    ],
    operations: [
      {
        id: 'op-1',
        sequenceNo: 10,
        operationName: 'Slit Coil to Width',
        workCenterId: 'wc-1',
        workCenterName: 'Slitting Machine',
        status: 'completed',
        plannedSetupTime: 20,
        plannedRunTime: 150,
        actualSetupTime: 22,
        actualRunTime: 158,
        completedQty: 500,
        scrapQty: 5
      },
      {
        id: 'op-2',
        sequenceNo: 20,
        operationName: 'Shear to Length',
        workCenterId: 'wc-2',
        workCenterName: 'Shearing Machine',
        status: 'completed',
        plannedSetupTime: 10,
        plannedRunTime: 100,
        actualSetupTime: 12,
        actualRunTime: 105,
        completedQty: 495,
        scrapQty: 2
      },
      {
        id: 'op-3',
        sequenceNo: 30,
        operationName: 'Form C-Channel Profile',
        workCenterId: 'wc-3',
        workCenterName: 'Press Brake',
        status: 'in_progress',
        plannedSetupTime: 15,
        plannedRunTime: 250,
        actualSetupTime: 16,
        actualRunTime: 175,
        completedQty: 350,
        scrapQty: 1
      }
    ],
    createdAt: '2024-02-14T10:30:00Z',
    updatedAt: '2024-02-18T14:20:00Z'
  },
  {
    id: 'po-2',
    orderNumber: 'PO-2024-002',
    salesOrderIds: ['SO-2024-003'],
    planningId: 'plan-2',
    productId: 'prod-2',
    productName: 'Electrical Panel Door 600x400mm',
    productSku: 'FG-PANEL-600',
    bomId: 'bom-2',
    routingId: 'route-2',
    plannedQuantity: 200,
    producedQuantity: 200,
    scrapQuantity: 4,
    startDate: '2024-02-10',
    dueDate: '2024-02-14',
    actualStartDate: '2024-02-10T07:30:00Z',
    actualFinishDate: '2024-02-14T16:45:00Z',
    status: 'completed',
    priority: 'normal',
    notes: 'From SO-2024-003',
    materials: [
      {
        id: 'mat-2',
        componentId: 'comp-2',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 1.2mm',
        componentSku: 'RM-COIL-1.2',
        requiredQuantity: 576,
        issuedQuantity: 576,
        uom: 'kg',
        status: 'fully_issued'
      },
      {
        id: 'mat-3',
        componentId: 'comp-3',
        componentName: 'Piano Hinge 400mm',
        componentSku: 'HW-HINGE-001',
        requiredQuantity: 200,
        issuedQuantity: 200,
        uom: 'pcs',
        status: 'fully_issued'
      },
      {
        id: 'mat-4',
        componentId: 'comp-4',
        componentName: 'Panel Lock',
        componentSku: 'HW-LOCK-001',
        requiredQuantity: 200,
        issuedQuantity: 200,
        uom: 'pcs',
        status: 'fully_issued'
      }
    ],
    operations: [
      {
        id: 'op-4',
        sequenceNo: 10,
        operationName: 'Cut Blank',
        workCenterId: 'wc-2',
        workCenterName: 'Shearing Machine',
        status: 'completed',
        plannedSetupTime: 8,
        plannedRunTime: 300,
        actualSetupTime: 10,
        actualRunTime: 315,
        completedQty: 202,
        scrapQty: 2
      },
      {
        id: 'op-5',
        sequenceNo: 20,
        operationName: 'Bend Edges',
        workCenterId: 'wc-3',
        workCenterName: 'Press Brake',
        status: 'completed',
        plannedSetupTime: 12,
        plannedRunTime: 800,
        actualSetupTime: 15,
        actualRunTime: 820,
        completedQty: 200,
        scrapQty: 2
      }
    ],
    createdAt: '2024-02-09T09:15:00Z',
    updatedAt: '2024-02-14T16:45:00Z'
  },
  {
    id: 'po-3',
    orderNumber: 'PO-2024-003',
    salesOrderIds: ['SO-2024-004'],
    planningId: 'plan-3',
    productId: 'prod-3',
    productName: 'Heavy Duty Mounting Bracket',
    productSku: 'FG-BRKT-HD-001',
    bomId: 'bom-3',
    routingId: 'route-3',
    plannedQuantity: 1000,
    producedQuantity: 0,
    scrapQuantity: 0,
    startDate: '2024-02-22',
    dueDate: '2024-02-28',
    status: 'released',
    priority: 'urgent',
    notes: 'From SO-2024-004 - Material reserved, ready to start',
    materials: [
      {
        id: 'mat-5',
        componentId: 'comp-5',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 3.0mm',
        componentSku: 'RM-COIL-3.0',
        requiredQuantity: 3600,
        issuedQuantity: 0,
        uom: 'kg',
        status: 'pending'
      },
      {
        id: 'mat-6',
        componentId: 'comp-6',
        componentName: 'Hex Bolt M10x30mm',
        componentSku: 'HW-BOLT-M10',
        requiredQuantity: 4000,
        issuedQuantity: 0,
        uom: 'pcs',
        status: 'pending'
      },
      {
        id: 'mat-7',
        componentId: 'comp-7',
        componentName: 'Hex Nut M10',
        componentSku: 'HW-NUT-M10',
        requiredQuantity: 4000,
        issuedQuantity: 0,
        uom: 'pcs',
        status: 'pending'
      }
    ],
    operations: [
      {
        id: 'op-6',
        sequenceNo: 10,
        operationName: 'Cut Blank',
        workCenterId: 'wc-2',
        workCenterName: 'Shearing Machine',
        status: 'pending',
        plannedSetupTime: 15,
        plannedRunTime: 500,
        actualSetupTime: 0,
        actualRunTime: 0,
        completedQty: 0,
        scrapQty: 0
      },
      {
        id: 'op-7',
        sequenceNo: 20,
        operationName: 'Bend L-Shape',
        workCenterId: 'wc-3',
        workCenterName: 'Press Brake',
        status: 'pending',
        plannedSetupTime: 20,
        plannedRunTime: 1000,
        actualSetupTime: 0,
        actualRunTime: 0,
        completedQty: 0,
        scrapQty: 0
      }
    ],
    createdAt: '2024-02-20T11:00:00Z',
    updatedAt: '2024-02-20T11:00:00Z'
  },
  {
    id: 'po-4',
    orderNumber: 'PO-2024-004',
    salesOrderIds: [],  // Stock production, no SO
    planningId: 'plan-4',
    productId: 'prod-1',
    productName: 'C-Channel 100x50x20x2.0mm',
    productSku: 'FG-CCHAN-100',
    bomId: 'bom-1',
    routingId: 'route-1',
    plannedQuantity: 300,
    producedQuantity: 0,
    scrapQuantity: 0,
    startDate: '2024-02-25',
    dueDate: '2024-03-01',
    status: 'created',
    priority: 'normal',
    notes: 'Stock production - No SO linked',
    materials: [
      {
        id: 'mat-8',
        componentId: 'comp-1',
        componentName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
        componentSku: 'RM-COIL-2.0',
        requiredQuantity: 1530,
        issuedQuantity: 0,
        uom: 'kg',
        status: 'pending'
      }
    ],
    operations: [
      {
        id: 'op-8',
        sequenceNo: 10,
        operationName: 'Slit Coil to Width',
        workCenterId: 'wc-1',
        workCenterName: 'Slitting Machine',
        status: 'pending',
        plannedSetupTime: 20,
        plannedRunTime: 90,
        actualSetupTime: 0,
        actualRunTime: 0,
        completedQty: 0,
        scrapQty: 0
      },
      {
        id: 'op-9',
        sequenceNo: 20,
        operationName: 'Shear to Length',
        workCenterId: 'wc-2',
        workCenterName: 'Shearing Machine',
        status: 'pending',
        plannedSetupTime: 10,
        plannedRunTime: 60,
        actualSetupTime: 0,
        actualRunTime: 0,
        completedQty: 0,
        scrapQty: 0
      },
      {
        id: 'op-10',
        sequenceNo: 30,
        operationName: 'Form C-Channel Profile',
        workCenterId: 'wc-3',
        workCenterName: 'Press Brake',
        status: 'pending',
        plannedSetupTime: 15,
        plannedRunTime: 150,
        actualSetupTime: 0,
        actualRunTime: 0,
        completedQty: 0,
        scrapQty: 0
      }
    ],
    createdAt: '2024-02-19T13:45:00Z',
    updatedAt: '2024-02-19T13:45:00Z'
  }
]
