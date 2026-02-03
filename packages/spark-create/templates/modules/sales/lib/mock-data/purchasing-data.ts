// Starman ERP: Purchasing Mock Data - The Gatekeeper

export type POStatus = 'draft' | 'issued' | 'partially_received' | 'received' | 'cancelled'
export type GRStatus = 'completed' | 'cancelled'
export type BillStatus = 'open' | 'paid' | 'voided'

export interface PurchaseOrderItem {
  id: string
  productId: string
  productName: string
  productSku: string
  quantity: number
  receivedQuantity: number
  unitPrice: number
  total: number
  uom: string
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  vendorId: string
  vendorName: string
  poDate: string
  deliveryDate: string
  status: POStatus
  subTotal: number
  vatAmount: number
  grandTotal: number
  items: PurchaseOrderItem[]
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface GoodsReceiptItem {
  id: string
  poItemId: string
  productId: string
  productName: string
  receivedQuantity: number
  rejectedQuantity: number
  uom: string
}

export interface GoodsReceipt {
  id: string
  grNumber: string
  poId: string
  poNumber: string
  vendorName: string
  receivedDate: string
  referenceDocNo?: string
  status: GRStatus
  items: GoodsReceiptItem[]
  receivedBy: string
  notes?: string
  createdAt: string
}

export interface VendorBillItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface VendorBill {
  id: string
  billNumber: string
  vendorInvoiceNumber: string
  vendorId: string
  vendorName: string
  poId: string
  poNumber: string
  billDate: string
  dueDate: string
  subTotal: number
  vatAmount: number
  grandTotal: number
  whtAmount: number
  status: BillStatus
  items: VendorBillItem[]
  aiWarnings?: string[]
  createdAt: string
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2026-001',
    vendorId: 'ven-1',
    vendorName: 'Thai Steel Co., Ltd.',
    poDate: '2026-02-08',
    deliveryDate: '2026-02-15',
    status: 'partially_received',
    subTotal: 102500,
    vatAmount: 7175,
    grandTotal: 109675,
    items: [
      {
        id: 'poi-1',
        productId: 'rm-001',
        productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
        productSku: 'RM-COIL-2.0',
        quantity: 2050,
        receivedQuantity: 1500,
        unitPrice: 50,
        total: 102500,
        uom: 'kg'
      }
    ],
    notes: 'Urgent order for production',
    createdAt: '2026-02-08T09:00:00Z',
    updatedAt: '2026-02-15T14:30:00Z'
  },
  {
    id: 'po-2',
    poNumber: 'PO-2026-002',
    vendorId: 'ven-2',
    vendorName: 'Hardware Plus Ltd.',
    poDate: '2026-02-07',
    deliveryDate: '2026-02-10',
    status: 'received',
    subTotal: 7500,
    vatAmount: 525,
    grandTotal: 8025,
    items: [
      {
        id: 'poi-2',
        productId: 'hw-001',
        productName: 'Piano Hinge 400mm',
        productSku: 'HW-HINGE-001',
        quantity: 150,
        receivedQuantity: 150,
        unitPrice: 50,
        total: 7500,
        uom: 'pcs'
      }
    ],
    createdAt: '2026-02-07T10:15:00Z',
    updatedAt: '2026-02-10T16:00:00Z'
  },
  {
    id: 'po-3',
    poNumber: 'PO-2026-003',
    vendorId: 'ven-3',
    vendorName: 'Fastener World Co.',
    poDate: '2026-02-17',
    deliveryDate: '2026-02-22',
    status: 'issued',
    subTotal: 6000,
    vatAmount: 420,
    grandTotal: 6420,
    items: [
      {
        id: 'poi-3',
        productId: 'hw-002',
        productName: 'Hex Bolt M10x30mm',
        productSku: 'HW-BOLT-M10',
        quantity: 3000,
        receivedQuantity: 0,
        unitPrice: 2,
        total: 6000,
        uom: 'pcs'
      }
    ],
    createdAt: '2026-02-17T11:30:00Z',
    updatedAt: '2026-02-17T11:30:00Z'
  },
  {
    id: 'po-4',
    poNumber: 'PO-2026-004',
    vendorId: 'ven-1',
    vendorName: 'Thai Steel Co., Ltd.',
    poDate: '2026-02-10',
    deliveryDate: '2026-02-17',
    status: 'draft',
    subTotal: 66240,
    vatAmount: 4636.80,
    grandTotal: 70876.80,
    items: [
      {
        id: 'poi-4',
        productId: 'rm-002',
        productName: 'Steel Coil JIS G3141 SPCC-SD 1.2mm',
        productSku: 'RM-COIL-1.2',
        quantity: 1440,
        receivedQuantity: 0,
        unitPrice: 46,
        total: 66240,
        uom: 'kg'
      }
    ],
    notes: 'Pending approval',
    createdAt: '2026-02-10T08:45:00Z',
    updatedAt: '2026-02-10T08:45:00Z'
  }
]

export const mockGoodsReceipts: GoodsReceipt[] = [
  {
    id: 'gr-1',
    grNumber: 'GR-2026-001',
    poId: 'po-1',
    poNumber: 'PO-2026-001',
    vendorName: 'Thai Steel Co., Ltd.',
    receivedDate: '2026-02-15',
    referenceDocNo: 'DN-2026-0215',
    status: 'completed',
    items: [
      {
        id: 'gri-1',
        poItemId: 'poi-1',
        productId: 'rm-001',
        productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
        receivedQuantity: 1500,
        rejectedQuantity: 0,
        uom: 'kg'
      }
    ],
    receivedBy: 'John Smith',
    notes: 'Partial delivery - remaining 550 kg to follow',
    createdAt: '2026-02-15T14:30:00Z'
  },
  {
    id: 'gr-2',
    grNumber: 'GR-2026-002',
    poId: 'po-2',
    poNumber: 'PO-2026-002',
    vendorName: 'Hardware Plus Ltd.',
    receivedDate: '2026-02-10',
    referenceDocNo: 'DN-HP-0210',
    status: 'completed',
    items: [
      {
        id: 'gri-2',
        poItemId: 'poi-2',
        productId: 'hw-001',
        productName: 'Piano Hinge 400mm',
        receivedQuantity: 150,
        rejectedQuantity: 0,
        uom: 'pcs'
      }
    ],
    receivedBy: 'Mike Johnson',
    createdAt: '2026-02-10T16:00:00Z'
  }
]

export const mockVendorBills: VendorBill[] = [
  {
    id: 'bill-1',
    billNumber: 'BILL-2026-001',
    vendorInvoiceNumber: 'INV-TS-2026-0215',
    vendorId: 'ven-1',
    vendorName: 'Thai Steel Co., Ltd.',
    poId: 'po-1',
    poNumber: 'PO-2026-001',
    billDate: '2026-02-15',
    dueDate: '2026-03-15',
    subTotal: 75000,
    vatAmount: 5250,
    grandTotal: 80250,
    whtAmount: 0,
    status: 'open',
    items: [
      {
        id: 'bi-1',
        productId: 'rm-001',
        productName: 'Steel Coil JIS G3141 SPCC-SD 2.0mm',
        quantity: 1500,
        unitPrice: 50,
        total: 75000
      }
    ],
    aiWarnings: [],
    createdAt: '2026-02-15T17:00:00Z'
  },
  {
    id: 'bill-2',
    billNumber: 'BILL-2026-002',
    vendorInvoiceNumber: 'INV-HP-2026-0210',
    vendorId: 'ven-2',
    vendorName: 'Hardware Plus Ltd.',
    poId: 'po-2',
    poNumber: 'PO-2026-002',
    billDate: '2026-02-10',
    dueDate: '2026-03-10',
    subTotal: 8500,
    vatAmount: 595,
    grandTotal: 9095,
    whtAmount: 0,
    status: 'open',
    items: [
      {
        id: 'bi-2',
        productId: 'hw-001',
        productName: 'Piano Hinge 400mm',
        quantity: 150,
        unitPrice: 56.67,
        total: 8500
      }
    ],
    aiWarnings: [
      '⚠️ Price increased by 13% from PO (฿50 → ฿56.67)',
      '⚠️ Total amount exceeds PO by ฿1,070 (14%)'
    ],
    createdAt: '2026-02-10T18:00:00Z'
  }
]

export interface AIGatekeeperAlert {
  id: string
  type: 'price_mismatch' | 'quantity_mismatch' | 'missing_gr' | 'duplicate_bill'
  severity: 'warning' | 'critical'
  title: string
  message: string
  billId?: string
  poId?: string
  action?: {
    label: string
    type: string
  }
}

export const mockAIAlerts: AIGatekeeperAlert[] = [
  {
    id: 'alert-1',
    type: 'price_mismatch',
    severity: 'critical',
    title: '3-Way Matching Failed',
    message: 'BILL-2026-002: Vendor charged ฿56.67/pc but PO price is ฿50/pc (+13%). Total overcharge: ฿1,070',
    billId: 'bill-2',
    poId: 'po-2',
    action: {
      label: 'Block Payment',
      type: 'block_payment'
    }
  },
  {
    id: 'alert-2',
    type: 'quantity_mismatch',
    severity: 'warning',
    title: 'Partial Delivery',
    message: 'PO-2026-001: Only 1,500 kg received out of 2,050 kg ordered (73%). Remaining 550 kg pending.',
    poId: 'po-1'
  }
]
