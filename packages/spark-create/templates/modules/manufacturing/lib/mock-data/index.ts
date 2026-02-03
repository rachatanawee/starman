/**
 * Mock Data Index - Manufacturing Module
 * Central export for manufacturing mock data
 */

export * from './generator'
export * from './generic-data'
export * from './bom-data'
export * from './manufacturing-data'
export * from './mrp-data'
export * from './production-order-data'
export * from './production-planning-data'

// Re-export for convenience
export { mockDataGenerator as generator } from './generator'
export { 
  generateDocuments,
  generateTransactions,
  generateTasks,
  generateItems,
} from './generic-data'
