/**
 * Mock Data Index - Common
 * Central export for common mock data
 */

export * from './generator'
export * from './generic-data'
export * from './projects'
export * from './user-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
