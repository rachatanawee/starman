/**
 * Mock Data Index - Factory Operations Module
 * Central export for factory operations mock data
 */

export * from './generator'
export * from './generic-data'
export * from './factory-capacity-data'
export * from './job-history-data'
export * from './worker-allowance-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
