/**
 * Mock Data Index
 * Central export for all mock data utilities
 */

export * from './generator'
export * from './generic-data'
export * from './projects'
export * from './user-data'
export * from './worker-allowance-data'
export * from './sales'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
