/**
 * Mock Data Index - Accounting Module
 * Central export for accounting mock data
 */

export * from './generator'
export * from './generic-data'
export * from './accounting-data'
export * from './wip-costing-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
