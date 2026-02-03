/**
 * Mock Data Index
 * Central export for all mock data utilities
 */

export * from './generator'
export * from './generic-data'
export * from './projects'
export * from './sales'
export * from './user-data'
export * from './inventory-data'
export * from './worker-allowance-data'
export * from './manufacturing-data'
export * from './job-history-data'
export * from './factory-capacity-data'
export * from './production-planning-data'
export * from './production-order-data'
export * from './mrp-data'
export * from './purchasing-data'
export { 
  mockIntegration,
  mockSyncLogs,
  mockAIAlerts as mockAccountingAIAlerts,
  mockTaxSummary,
  mockAccountMappings,
  getSyncStats,
  type ProviderType,
  type SourceType,
  type DocumentType,
  type SyncStatus,
  type AccountingIntegration,
  type AccountMapping,
  type SyncLog,
  type AIReconciliationAlert,
  type TaxSummary
} from './accounting-data'
// Note: bom-data and wip-costing-data not exported to avoid conflicts
// Import directly from those files if needed

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
