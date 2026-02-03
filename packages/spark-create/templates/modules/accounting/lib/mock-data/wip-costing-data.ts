export interface CostLedgerEntry {
  id: string
  transactionDate: string
  productionOrderId: string
  productionOrderNo: string
  productName: string
  costType: 'DM' | 'DL' | 'OH'
  sourceDocType: 'inventory_trx' | 'job_ticket' | 'allocation'
  sourceDocId: string
  description: string
  amount: number
  quantityUsed: number
  unitCostAtTime: number
}

export interface WIPBalance {
  id: string
  productionOrderId: string
  productionOrderNo: string
  productName: string
  status: 'in_progress' | 'paused' | 'completed'
  startDate: string
  targetQty: number
  completedQty: number
  progressPercent: number
  totalDMCost: number
  totalDLCost: number
  totalOHCost: number
  totalWIPValue: number
  standardCostEstimate: number
  costVariance: number
  variancePercent: number
  unitActualCost: number
  daysInWIP: number
}

export interface AIFinancialAlert {
  id: string
  type: 'margin_erosion' | 'variance_spike' | 'wip_aging' | 'pricing_suggestion'
  severity: 'info' | 'warning' | 'critical'
  productionOrderNo: string
  productName: string
  title: string
  description: string
  impact: string
  recommendation: string
  estimatedSavings?: number
  actionable: boolean
}

export const mockCostLedger: CostLedgerEntry[] = [
  // PO-2024-001 - Steel Beam (In Progress)
  {
    id: 'CL-001',
    transactionDate: '2024-01-15T08:00:00',
    productionOrderId: 'po-001',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    costType: 'DM',
    sourceDocType: 'inventory_trx',
    sourceDocId: 'INV-TRX-1001',
    description: 'Steel Plate SS400 - 500kg issued',
    amount: 2500000,
    quantityUsed: 500,
    unitCostAtTime: 5000
  },
  {
    id: 'CL-002',
    transactionDate: '2024-01-15T09:30:00',
    productionOrderId: 'po-001',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    costType: 'DL',
    sourceDocType: 'job_ticket',
    sourceDocId: 'JT-1001',
    description: 'Cutting operation - 3 hours',
    amount: 90000,
    quantityUsed: 3,
    unitCostAtTime: 30000
  },
  {
    id: 'CL-003',
    transactionDate: '2024-01-15T09:30:00',
    productionOrderId: 'po-001',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    costType: 'OH',
    sourceDocType: 'job_ticket',
    sourceDocId: 'JT-1001',
    description: 'Machine overhead - Cutting 3 hours',
    amount: 60000,
    quantityUsed: 3,
    unitCostAtTime: 20000
  },
  {
    id: 'CL-004',
    transactionDate: '2024-01-15T14:00:00',
    productionOrderId: 'po-001',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    costType: 'DM',
    sourceDocType: 'inventory_trx',
    sourceDocId: 'INV-TRX-1002',
    description: 'Re-issue due to scrap - 50kg',
    amount: 250000,
    quantityUsed: 50,
    unitCostAtTime: 5000
  },
  // PO-2024-002 - Channel Steel (High Variance)
  {
    id: 'CL-005',
    transactionDate: '2024-01-14T08:00:00',
    productionOrderId: 'po-002',
    productionOrderNo: 'PO-2024-002',
    productName: 'Channel Steel 150x75mm',
    costType: 'DM',
    sourceDocType: 'inventory_trx',
    sourceDocId: 'INV-TRX-1003',
    description: 'Steel Coil - 800kg issued',
    amount: 4800000,
    quantityUsed: 800,
    unitCostAtTime: 6000
  },
  {
    id: 'CL-006',
    transactionDate: '2024-01-14T10:00:00',
    productionOrderId: 'po-002',
    productionOrderNo: 'PO-2024-002',
    productName: 'Channel Steel 150x75mm',
    costType: 'DL',
    sourceDocType: 'job_ticket',
    sourceDocId: 'JT-1002',
    description: 'Bending operation - 5 hours',
    amount: 150000,
    quantityUsed: 5,
    unitCostAtTime: 30000
  },
  {
    id: 'CL-007',
    transactionDate: '2024-01-14T10:00:00',
    productionOrderId: 'po-002',
    productionOrderNo: 'PO-2024-002',
    productName: 'Channel Steel 150x75mm',
    costType: 'OH',
    sourceDocType: 'job_ticket',
    sourceDocId: 'JT-1002',
    description: 'Machine overhead - Bending 5 hours (Machine breakdown +2hr)',
    amount: 140000,
    quantityUsed: 7,
    unitCostAtTime: 20000
  }
]

export const mockWIPBalances: WIPBalance[] = [
  {
    id: 'wip-001',
    productionOrderId: 'po-001',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    status: 'in_progress',
    startDate: '2024-01-15',
    targetQty: 100,
    completedQty: 45,
    progressPercent: 45,
    totalDMCost: 2750000, // 2500000 + 250000 (re-issue)
    totalDLCost: 90000,
    totalOHCost: 60000,
    totalWIPValue: 2900000,
    standardCostEstimate: 2500000,
    costVariance: 400000,
    variancePercent: 16,
    unitActualCost: 64444, // 2900000 / 45
    daysInWIP: 3
  },
  {
    id: 'wip-002',
    productionOrderId: 'po-002',
    productionOrderNo: 'PO-2024-002',
    productName: 'Channel Steel 150x75mm',
    status: 'in_progress',
    startDate: '2024-01-14',
    targetQty: 200,
    completedQty: 120,
    progressPercent: 60,
    totalDMCost: 4800000,
    totalDLCost: 150000,
    totalOHCost: 140000,
    totalWIPValue: 5090000,
    standardCostEstimate: 4400000,
    costVariance: 690000,
    variancePercent: 15.7,
    unitActualCost: 42417, // 5090000 / 120
    daysInWIP: 4
  },
  {
    id: 'wip-003',
    productionOrderId: 'po-003',
    productionOrderNo: 'PO-2024-003',
    productName: 'Angle Bar 100x100mm',
    status: 'in_progress',
    startDate: '2024-01-10',
    targetQty: 150,
    completedQty: 30,
    progressPercent: 20,
    totalDMCost: 1800000,
    totalDLCost: 60000,
    totalOHCost: 40000,
    totalWIPValue: 1900000,
    standardCostEstimate: 1850000,
    costVariance: 50000,
    variancePercent: 2.7,
    unitActualCost: 63333,
    daysInWIP: 8
  },
  {
    id: 'wip-004',
    productionOrderId: 'po-004',
    productionOrderNo: 'PO-2024-004',
    productName: 'Square Tube 50x50mm',
    status: 'paused',
    startDate: '2024-01-08',
    targetQty: 300,
    completedQty: 80,
    progressPercent: 27,
    totalDMCost: 2400000,
    totalDLCost: 120000,
    totalOHCost: 80000,
    totalWIPValue: 2600000,
    standardCostEstimate: 2400000,
    costVariance: 200000,
    variancePercent: 8.3,
    unitActualCost: 32500,
    daysInWIP: 10
  }
]

export const mockAIFinancialAlerts: AIFinancialAlert[] = [
  {
    id: 'alert-001',
    type: 'margin_erosion',
    severity: 'critical',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    title: '⚠️ Margin Erosion Alert',
    description: 'Cost variance +16% due to material re-issue (scrap)',
    impact: 'If production continues at current rate, gross margin will drop from 25% to 8%',
    recommendation: 'Investigate cutting process quality. Consider operator retraining or blade replacement.',
    estimatedSavings: 400000,
    actionable: true
  },
  {
    id: 'alert-002',
    type: 'variance_spike',
    severity: 'warning',
    productionOrderNo: 'PO-2024-002',
    productName: 'Channel Steel 150x75mm',
    title: '📊 Overhead Variance Spike',
    description: 'Machine overhead +40% due to breakdown (2 extra hours)',
    impact: 'Unit cost increased by ฿24 per piece',
    recommendation: 'Schedule preventive maintenance for Bending Machine #2. Check hydraulic system.',
    estimatedSavings: 140000,
    actionable: true
  },
  {
    id: 'alert-003',
    type: 'wip_aging',
    severity: 'warning',
    productionOrderNo: 'PO-2024-004',
    productName: 'Square Tube 50x50mm',
    title: '⏰ WIP Aging Alert',
    description: 'Job paused for 10 days with ฿26,000 locked in WIP',
    impact: 'Cash flow impact: ฿2.6M tied up. Customer delivery at risk.',
    recommendation: 'Resume production immediately or consider partial shipment of 80 completed units.',
    actionable: true
  },
  {
    id: 'alert-004',
    type: 'pricing_suggestion',
    severity: 'info',
    productionOrderNo: 'ALL',
    productName: 'Steel Products Category',
    title: '💡 Dynamic Pricing Suggestion',
    description: 'Average actual cost increased 12% vs standard (last 30 days)',
    impact: 'Current pricing may not cover actual production costs',
    recommendation: 'Update price list: Steel Beam +8%, Channel Steel +10% to maintain 20% margin target.',
    estimatedSavings: 1500000,
    actionable: true
  }
]

export const costAllocationRules = [
  { workCenter: 'Cutting Machine', ohRatePerHour: 20000, type: 'machine_hour' },
  { workCenter: 'Bending Machine', ohRatePerHour: 20000, type: 'machine_hour' },
  { workCenter: 'Welding Station', ohRatePerHour: 15000, type: 'machine_hour' },
  { workCenter: 'Assembly Line', ohRatePerHour: 10000, type: 'labor_hour' }
]
