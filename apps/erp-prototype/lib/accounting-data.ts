// Accounting Integration Mock Data

export type ProviderType = 'peak' | 'flowaccount' | 'trcloud' | 'express_export'
export type SyncStatus = 'pending' | 'success' | 'failed' | 'skipped'
export type DocumentType = 'invoice' | 'bill' | 'receipt' | 'journal' | 'stock_adjustment'
export type SourceType = 'product_category' | 'payment_method' | 'tax_code' | 'adjustment_reason'

export interface AccountingIntegration {
  id: number
  providerName: ProviderType
  providerLabel: string
  apiEndpoint?: string
  isActive: boolean
  autoSync: boolean
  lastSyncAt?: Date
  connectionStatus: 'online' | 'offline' | 'error'
}

export interface AccountMapping {
  id: number
  sourceType: SourceType
  sourceId?: number
  sourceLabel: string
  externalAccountCode: string
  externalAccountName: string
  description?: string
}

export interface SyncLog {
  id: number
  documentType: DocumentType
  documentId: string
  documentNumber: string
  syncStatus: SyncStatus
  syncAction: 'create' | 'update' | 'void'
  externalRefId?: string
  errorMessage?: string
  syncedAt: Date
  retryCount: number
  amount: number
}

export interface AIReconciliationAlert {
  id: number
  type: 'missing_tax_id' | 'unsynced_document' | 'mapping_error' | 'duplicate_entry'
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  documentRef?: string
  suggestedAction: string
  canAutoFix: boolean
  createdAt: Date
}

export interface TaxSummary {
  month: string
  vatSales: number
  vatPurchase: number
  vatPayable: number
  whtIssued: number
  whtReceived: number
}

// Mock Data
export const mockIntegration: AccountingIntegration = {
  id: 1,
  providerName: 'flowaccount',
  providerLabel: 'FlowAccount',
  apiEndpoint: 'https://api.flowaccount.com/v1',
  isActive: true,
  autoSync: false,
  lastSyncAt: new Date('2024-01-15T14:30:00'),
  connectionStatus: 'online'
}

export const mockAccountMappings: AccountMapping[] = [
  {
    id: 1,
    sourceType: 'product_category',
    sourceId: 1,
    sourceLabel: 'Steel Products',
    externalAccountCode: '4100-01',
    externalAccountName: 'รายได้จากการขายสินค้า',
    description: 'Sales revenue from steel products'
  },
  {
    id: 2,
    sourceType: 'product_category',
    sourceId: 2,
    sourceLabel: 'Raw Materials',
    externalAccountCode: '1130-01',
    externalAccountName: 'วัตถุดิบคงเหลือ',
    description: 'Raw material inventory'
  },
  {
    id: 3,
    sourceType: 'payment_method',
    sourceId: 1,
    sourceLabel: 'Cash',
    externalAccountCode: '1100-01',
    externalAccountName: 'เงินสดในมือ',
    description: 'Cash on hand'
  },
  {
    id: 4,
    sourceType: 'payment_method',
    sourceId: 2,
    sourceLabel: 'Bank Transfer (KBank)',
    externalAccountCode: '1110-02',
    externalAccountName: 'เงินฝากธนาคารกสิกรไทย',
    description: 'KBank account'
  },
  {
    id: 5,
    sourceType: 'tax_code',
    sourceLabel: 'VAT 7%',
    externalAccountCode: 'V7',
    externalAccountName: 'ภาษีมูลค่าเพิ่ม 7%'
  },
  {
    id: 6,
    sourceType: 'tax_code',
    sourceLabel: 'WHT 3%',
    externalAccountCode: 'W3',
    externalAccountName: 'หัก ณ ที่จ่าย 3%'
  }
]

export const mockSyncLogs: SyncLog[] = [
  {
    id: 1,
    documentType: 'invoice',
    documentId: 'INV-2024-001',
    documentNumber: 'INV-2024-001',
    syncStatus: 'success',
    syncAction: 'create',
    externalRefId: 'FA-INV-8821',
    syncedAt: new Date('2024-01-15T10:30:00'),
    retryCount: 0,
    amount: 107000
  },
  {
    id: 2,
    documentType: 'invoice',
    documentId: 'INV-2024-002',
    documentNumber: 'INV-2024-002',
    syncStatus: 'failed',
    syncAction: 'create',
    errorMessage: 'Customer Tax ID missing - Cannot claim VAT',
    syncedAt: new Date('2024-01-15T11:45:00'),
    retryCount: 2,
    amount: 85600
  },
  {
    id: 3,
    documentType: 'bill',
    documentId: 'BILL-2024-015',
    documentNumber: 'BILL-2024-015',
    syncStatus: 'pending',
    syncAction: 'create',
    syncedAt: new Date('2024-01-15T14:20:00'),
    retryCount: 0,
    amount: 45000
  },
  {
    id: 4,
    documentType: 'invoice',
    documentId: 'INV-2024-003',
    documentNumber: 'INV-2024-003',
    syncStatus: 'success',
    syncAction: 'create',
    externalRefId: 'FA-INV-8823',
    syncedAt: new Date('2024-01-15T13:15:00'),
    retryCount: 0,
    amount: 128000
  },
  {
    id: 5,
    documentType: 'stock_adjustment',
    documentId: 'ADJ-2024-008',
    documentNumber: 'ADJ-2024-008',
    syncStatus: 'failed',
    syncAction: 'create',
    errorMessage: 'Account mapping not found for adjustment reason',
    syncedAt: new Date('2024-01-15T09:00:00'),
    retryCount: 1,
    amount: 12500
  }
]

export const mockAIAlerts: AIReconciliationAlert[] = [
  {
    id: 1,
    type: 'missing_tax_id',
    severity: 'high',
    title: 'Missing Tax ID - VAT Claim Risk',
    description: 'Invoice INV-2024-002 has VAT amount ฿5,600 but customer Tax ID is not specified. This will prevent VAT input claim.',
    documentRef: 'INV-2024-002',
    suggestedAction: 'Request Tax ID from customer or convert to non-VAT invoice',
    canAutoFix: false,
    createdAt: new Date('2024-01-15T11:45:00')
  },
  {
    id: 2,
    type: 'unsynced_document',
    severity: 'high',
    title: 'Unsynced Document Detected',
    description: 'Invoice INV-2023-998 was created 45 days ago but still shows "Failed" status. This may cause revenue understatement in financial reports.',
    documentRef: 'INV-2023-998',
    suggestedAction: 'Review error log and retry sync, or manually create in accounting system',
    canAutoFix: false,
    createdAt: new Date('2024-01-15T08:00:00')
  },
  {
    id: 3,
    type: 'mapping_error',
    severity: 'medium',
    title: 'Account Mapping Missing',
    description: 'Stock adjustment ADJ-2024-008 cannot be synced because adjustment reason "Damaged Goods" is not mapped to any GL account.',
    documentRef: 'ADJ-2024-008',
    suggestedAction: 'Configure account mapping for this adjustment reason',
    canAutoFix: false,
    createdAt: new Date('2024-01-15T09:00:00')
  },
  {
    id: 4,
    type: 'duplicate_entry',
    severity: 'low',
    title: 'Potential Duplicate Entry',
    description: 'Invoice INV-2024-003 has same amount and date as external document FA-INV-8820. Please verify if this is a duplicate.',
    documentRef: 'INV-2024-003',
    suggestedAction: 'Review and mark as duplicate if confirmed',
    canAutoFix: true,
    createdAt: new Date('2024-01-15T13:20:00')
  }
]

export const mockTaxSummary: TaxSummary = {
  month: 'January 2024',
  vatSales: 28450,
  vatPurchase: 12300,
  vatPayable: 16150,
  whtIssued: 4500,
  whtReceived: 1200
}

export function getSyncStats() {
  const total = mockSyncLogs.length
  const pending = mockSyncLogs.filter(l => l.syncStatus === 'pending').length
  const failed = mockSyncLogs.filter(l => l.syncStatus === 'failed').length
  const success = mockSyncLogs.filter(l => l.syncStatus === 'success').length
  
  return { total, pending, failed, success }
}
