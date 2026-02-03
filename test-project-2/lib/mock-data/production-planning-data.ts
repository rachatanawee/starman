// Starman ERP: Production Planning Mock Data with AI Strategist

export type InsightType = 'capacity_conflict' | 'material_risk' | 'cost_optimization' | 'deadline_risk'
export type Severity = 'low' | 'medium' | 'high' | 'critical'

export interface AIInsight {
  id: string
  type: InsightType
  severity: Severity
  title: string
  message: string
  suggestedAction?: {
    label: string
    action: string
    payload: any
  }
  isResolved: boolean
}

export interface PlanItem {
  id: string
  orderNumber: string
  salesOrderIds: string[]  // Multiple SO can be combined
  productName: string
  quantity: number
  startDate: string
  endDate: string
  workCenter: string
  status: 'scheduled' | 'adjusted' | 'conflict'
  isLocked: boolean
  aiAdjustedReason?: string
}

export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-1',
    type: 'capacity_conflict',
    severity: 'high',
    title: 'Machine Overload Warning',
    message: 'Work Center "Press Brake" is loaded at 150% on Feb 15. This will cause delays.',
    suggestedAction: {
      label: 'Reschedule PO-88',
      action: 'reschedule',
      payload: { orderId: 'po-88', newDate: '2026-02-16' }
    },
    isResolved: false
  },
  {
    id: 'insight-2',
    type: 'material_risk',
    severity: 'critical',
    title: 'Steel Shortage Risk',
    message: 'Steel Coil 2.0mm inventory will be insufficient for large orders next week. Supplier A typically delays by 3 days.',
    suggestedAction: {
      label: 'Create Rush PO',
      action: 'create_po',
      payload: { componentId: 'comp-1', quantity: 5000, urgent: true }
    },
    isResolved: false
  },
  {
    id: 'insight-3',
    type: 'cost_optimization',
    severity: 'medium',
    title: 'Setup Time Optimization',
    message: 'Swapping Order A and Order B sequence will reduce setup time by 30 minutes and save $45 in labor costs.',
    suggestedAction: {
      label: 'Re-sequence Orders',
      action: 'resequence',
      payload: { orderIds: ['po-1', 'po-2'] }
    },
    isResolved: false
  },
  {
    id: 'insight-4',
    type: 'deadline_risk',
    severity: 'high',
    title: 'Deadline at Risk',
    message: 'PO-2024-003 is scheduled too tight. Current plan shows 95% probability of missing deadline by 1 day.',
    suggestedAction: {
      label: 'Add OT Shift',
      action: 'add_overtime',
      payload: { orderId: 'po-3', hours: 4 }
    },
    isResolved: false
  }
]

export const mockPlanItems: PlanItem[] = [
  {
    id: 'plan-1',
    orderNumber: 'PO-2024-001',
    salesOrderIds: ['SO-2024-001', 'SO-2024-002'],
    productName: 'C-Channel 100x50x20x2.0mm',
    quantity: 500,
    startDate: '2026-01-27',
    endDate: '2026-01-29',
    workCenter: 'Press Brake',
    status: 'conflict',
    isLocked: false
  },
  {
    id: 'plan-2',
    orderNumber: 'PO-2024-002',
    salesOrderIds: ['SO-2024-003'],
    productName: 'Electrical Panel Door',
    quantity: 200,
    startDate: '2026-01-27',
    endDate: '2026-01-28',
    workCenter: 'Shearing Machine',
    status: 'scheduled',
    isLocked: false
  },
  {
    id: 'plan-3',
    orderNumber: 'PO-2024-003',
    salesOrderIds: ['SO-2024-004'],
    productName: 'Heavy Duty Mounting Bracket',
    quantity: 1000,
    startDate: '2026-01-30',
    endDate: '2026-02-02',
    workCenter: 'Press Brake',
    status: 'scheduled',
    isLocked: false
  },
  {
    id: 'plan-4',
    orderNumber: 'PO-2024-004',
    salesOrderIds: [],
    productName: 'Steel Plate 1200x600x3mm',
    quantity: 300,
    startDate: '2026-01-28',
    endDate: '2026-01-30',
    workCenter: 'Slitting Machine',
    status: 'adjusted',
    isLocked: false,
    aiAdjustedReason: 'Moved to avoid capacity conflict on Press Brake'
  },
  {
    id: 'plan-5',
    orderNumber: 'PO-2024-005',
    salesOrderIds: ['SO-2024-005'],
    productName: 'L-Angle 75x75x6mm',
    quantity: 800,
    startDate: '2026-01-29',
    endDate: '2026-01-31',
    workCenter: 'Press Brake',
    status: 'scheduled',
    isLocked: false
  },
  {
    id: 'plan-6',
    orderNumber: 'PO-2024-006',
    salesOrderIds: ['SO-2024-006'],
    productName: 'Perforated Sheet 1000x2000',
    quantity: 150,
    startDate: '2026-01-31',
    endDate: '2026-02-01',
    workCenter: 'Shearing Machine',
    status: 'scheduled',
    isLocked: false
  },
  {
    id: 'plan-7',
    orderNumber: 'PO-2024-007',
    salesOrderIds: ['SO-2024-007', 'SO-2024-008'],
    productName: 'U-Channel 120x60x3mm',
    quantity: 600,
    startDate: '2026-02-01',
    endDate: '2026-02-02',
    workCenter: 'Press Brake',
    status: 'adjusted',
    isLocked: false,
    aiAdjustedReason: 'Optimized for material batch processing'
  },
  {
    id: 'plan-8',
    orderNumber: 'PO-2024-008',
    salesOrderIds: ['SO-2024-009'],
    productName: 'Flat Bar 50x10mm',
    quantity: 400,
    startDate: '2026-01-28',
    endDate: '2026-01-29',
    workCenter: 'Slitting Machine',
    status: 'scheduled',
    isLocked: false
  },
  {
    id: 'plan-9',
    orderNumber: 'PO-2024-009',
    salesOrderIds: [],
    productName: 'Square Tube 40x40x2mm',
    quantity: 250,
    startDate: '',
    endDate: '',
    workCenter: 'Shearing Machine',
    status: 'scheduled',
    isLocked: false
  },
  {
    id: 'plan-10',
    orderNumber: 'PO-2024-010',
    salesOrderIds: ['SO-2024-010'],
    productName: 'Grating Panel 600x1000',
    quantity: 180,
    startDate: '',
    endDate: '',
    workCenter: 'Slitting Machine',
    status: 'conflict',
    isLocked: false
  }
]
