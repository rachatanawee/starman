/**
 * Mock Data Index - Inventory Module
 * Central export for inventory mock data
 */

export * from './generator'
export * from './generic-data'
export * from './inventory-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
