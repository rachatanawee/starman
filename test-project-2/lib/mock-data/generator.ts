/**
 * Mock Data Generator Utilities
 * Generic utilities for generating mock data
 */

export const mockDataGenerator = {
  // Generate random ID
  id: (prefix = 'item') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  // Generate random date
  date: (daysOffset = 0) => {
    const date = new Date()
    date.setDate(date.getDate() + daysOffset)
    return date.toISOString().split('T')[0]
  },

  // Generate random number in range
  number: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,

  // Generate random amount
  amount: (min = 1000, max = 100000) => mockDataGenerator.number(min, max),

  // Generate random status from array
  status: <T extends string>(statuses: T[]): T => statuses[Math.floor(Math.random() * statuses.length)],

  // Generate random name
  name: (prefix = 'Item') => `${prefix} ${mockDataGenerator.number(1, 999)}`,

  // Generate array of items
  array: <T>(generator: (index: number) => T, count: number): T[] => 
    Array.from({ length: count }, (_, i) => generator(i)),
}

// Common status lists
export const commonStatuses = {
  document: ['Draft', 'Pending', 'Approved', 'Rejected', 'Cancelled'] as const,
  payment: ['Paid', 'Partially Paid', 'Unpaid', 'Overdue'] as const,
  order: ['Draft', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Completed', 'Cancelled'] as const,
  production: ['Planned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'] as const,
}

// Sample data pools
export const sampleData = {
  companies: [
    'Acme Corp',
    'Tech Solutions',
    'Global Industries',
    'Smart Systems',
    'Digital Dynamics',
    'Innovate Ltd',
    'Future Tech',
    'Mega Corp',
    'Prime Solutions',
    'Alpha Industries',
  ],
  
  products: [
    'Product A',
    'Product B',
    'Product C',
    'Widget X',
    'Widget Y',
    'Component Z',
    'Module Alpha',
    'Module Beta',
    'Assembly Kit',
    'Standard Unit',
  ],

  workCenters: [
    'Work Center 1',
    'Work Center 2',
    'Work Center 3',
    'Assembly Line A',
    'Assembly Line B',
  ],
}
