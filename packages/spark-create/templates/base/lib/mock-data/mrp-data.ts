// Starman ERP: MRP Mock Data - The Supply Commander

export interface MRPRequirement {
  id: string
  productId: string
  productName: string
  productSku: string
  requiredQty: number
  availableQty: number
  shortageQty: number
  requiredDate: string
  leadTimeDays: number
  suggestedOrderDate: string
  suggestedVendor: string
  estimatedCost: number
  priority: 'urgent' | 'high' | 'normal' | 'low'
  status: 'shortage' | 'sufficient' | 'ordered'
  sourceType: 'production' | 'sales' | 'forecast'
  sourceRef: string
  // Traceability: แสดงว่า material นี้ใช้กับ SO ไหนบ้าง
  allocations: {
    salesOrderId: string
    salesOrderNumber: string
    customerName: string
    productionOrderId: string
    productionOrderNumber: string
    allocatedQty: number
  }[]
}

export interface AIRecommendation {
  id: string
  type: 'lead_time_warning' | 'moq_optimization' | 'vendor_switch' | 'auto_po'
  severity: 'info' | 'warning' | 'critical'
  title: string
  message: string
  action?: {
    label: string
    type: string
    payload: any
  }
}

export const mockMRPRequirements: MRPRequirement[] = [
  {
    id: 'mrp-1',
    productId: 'rm-001',
    productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
    productSku: 'RM-COIL-2.0',
    requiredQty: 2550,
    availableQty: 500,
    shortageQty: 2050,
    requiredDate: '2026-02-15',
    leadTimeDays: 7,
    suggestedOrderDate: '2026-02-08',
    suggestedVendor: 'Thai Steel Co., Ltd.',
    estimatedCost: 102500,
    priority: 'urgent',
    status: 'shortage',
    sourceType: 'production',
    sourceRef: 'PO-2026-001',
    allocations: [
      {
        salesOrderId: 'so-001',
        salesOrderNumber: 'SO-2026-001',
        customerName: 'ABC Construction',
        productionOrderId: 'po-1',
        productionOrderNumber: 'PO-2026-001',
        allocatedQty: 1530 // 300 pcs C-Channel
      },
      {
        salesOrderId: 'so-002',
        salesOrderNumber: 'SO-2026-002',
        customerName: 'XYZ Engineering',
        productionOrderId: 'po-1',
        productionOrderNumber: 'PO-2026-001',
        allocatedQty: 1020 // 200 pcs C-Channel
      }
    ]
  },
  {
    id: 'mrp-2',
    productId: 'rm-002',
    productName: 'Steel Coil JIS G3141 SPCC-SD 1.2mm',
    productSku: 'RM-COIL-1.2',
    requiredQty: 576,
    availableQty: 800,
    shortageQty: 0,
    requiredDate: '2026-02-10',
    leadTimeDays: 7,
    suggestedOrderDate: '2026-02-03',
    suggestedVendor: 'Thai Steel Co., Ltd.',
    estimatedCost: 0,
    priority: 'normal',
    status: 'sufficient',
    sourceType: 'production',
    sourceRef: 'PO-2026-002',
    allocations: [
      {
        salesOrderId: 'so-003',
        salesOrderNumber: 'SO-2026-003',
        customerName: 'Delta Industries',
        productionOrderId: 'po-2',
        productionOrderNumber: 'PO-2026-002',
        allocatedQty: 576
      }
    ]
  },
  {
    id: 'mrp-3',
    productId: 'hw-001',
    productName: 'Piano Hinge 400mm',
    productSku: 'HW-HINGE-001',
    requiredQty: 200,
    availableQty: 50,
    shortageQty: 150,
    requiredDate: '2026-02-10',
    leadTimeDays: 3,
    suggestedOrderDate: '2026-02-07',
    suggestedVendor: 'Hardware Plus Ltd.',
    estimatedCost: 7500,
    priority: 'high',
    status: 'shortage',
    sourceType: 'production',
    sourceRef: 'PO-2026-002',
    allocations: [
      {
        salesOrderId: 'so-003',
        salesOrderNumber: 'SO-2026-003',
        customerName: 'Delta Industries',
        productionOrderId: 'po-2',
        productionOrderNumber: 'PO-2026-002',
        allocatedQty: 200
      }
    ]
  },
  {
    id: 'mrp-4',
    productId: 'hw-002',
    productName: 'Hex Bolt M10x30mm',
    productSku: 'HW-BOLT-M10',
    requiredQty: 4000,
    availableQty: 1000,
    shortageQty: 3000,
    requiredDate: '2026-02-22',
    leadTimeDays: 5,
    suggestedOrderDate: '2026-02-17',
    suggestedVendor: 'Fastener World Co.',
    estimatedCost: 6000,
    priority: 'normal',
    status: 'shortage',
    sourceType: 'production',
    sourceRef: 'PO-2026-003',
    allocations: [
      {
        salesOrderId: 'so-004',
        salesOrderNumber: 'SO-2026-004',
        customerName: 'Mega Factory Ltd.',
        productionOrderId: 'po-3',
        productionOrderNumber: 'PO-2026-003',
        allocatedQty: 4000
      }
    ]
  }
]

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'ai-1',
    type: 'lead_time_warning',
    severity: 'critical',
    title: 'Vendor Delay Risk',
    message: 'Thai Steel Co. has been delivering 3 days late on average in the past month. Suggest ordering 10 days in advance instead of 7 days.',
    action: {
      label: 'Adjust Lead Time',
      type: 'adjust_lead_time',
      payload: { vendorId: 'ven-001', newLeadTime: 10 }
    }
  },
  {
    id: 'ai-2',
    type: 'moq_optimization',
    severity: 'info',
    title: 'MOQ Optimization Opportunity',
    message: 'Ordering 500 more kg of Steel Coil 2.0mm will unlock Tier 2 pricing (฿45/kg → ฿42/kg), saving ฿6,150. You will need this material next month anyway.',
    action: {
      label: 'Increase Order Qty',
      type: 'optimize_moq',
      payload: { itemId: 'rm-001', suggestedQty: 2550 }
    }
  },
  {
    id: 'ai-3',
    type: 'vendor_switch',
    severity: 'warning',
    title: 'Alternative Vendor Available',
    message: 'Hardware Plus Ltd. has 30% higher price than Fastener World Co. for Piano Hinges. Consider switching to save ฿2,250.',
    action: {
      label: 'Switch Vendor',
      type: 'switch_vendor',
      payload: { itemId: 'hw-001', newVendorId: 'ven-003' }
    }
  },
  {
    id: 'ai-4',
    type: 'auto_po',
    severity: 'info',
    title: 'Auto-PO Ready',
    message: 'Hex Bolts M10 (low-value item) can be auto-ordered. AI will create PO and send to vendor automatically if approved.',
    action: {
      label: 'Enable Auto-PO',
      type: 'enable_auto_po',
      payload: { itemId: 'hw-002' }
    }
  }
]
