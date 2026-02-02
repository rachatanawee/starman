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
export * from './accounting-data'
export * from './bom-data'
export * from './wip-costing-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
