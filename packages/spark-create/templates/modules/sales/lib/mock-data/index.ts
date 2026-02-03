/**
 * Mock Data Index - Sales Module
 * Central export for sales mock data
 */

export * from './generator'
export * from './generic-data'
export * from './sales'
export * from './purchasing-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
