/**
 * Generic Mock Data Types
 * Reusable data structures for any business application
 */

import { mockDataGenerator, commonStatuses, sampleData } from './generator'

// Generic Document
export interface GenericDocument {
  id: string
  documentNumber: string
  date: string
  status: string
  amount?: number
  notes?: string
}

// Generic Item
export interface GenericItem {
  id: string
  name: string
  code: string
  quantity: number
  unit: string
  price?: number
}

// Generic Transaction
export interface GenericTransaction {
  id: string
  transactionNumber: string
  date: string
  party: string
  amount: number
  status: string
  items: number
}

// Generic Task
export interface GenericTask {
  id: string
  taskNumber: string
  title: string
  assignedTo?: string
  startDate: string
  endDate: string
  status: string
  progress: number
}

// Mock Data Generators
export const generateDocument = (index: number): GenericDocument => ({
  id: mockDataGenerator.id('doc'),
  documentNumber: `DOC-${String(index + 1).padStart(4, '0')}`,
  date: mockDataGenerator.date(-index),
  status: mockDataGenerator.status([...commonStatuses.document]),
  amount: mockDataGenerator.amount(),
  notes: '',
})

export const generateTransaction = (index: number): GenericTransaction => ({
  id: mockDataGenerator.id('txn'),
  transactionNumber: `TXN-${String(index + 1).padStart(4, '0')}`,
  date: mockDataGenerator.date(-index),
  party: mockDataGenerator.status(sampleData.companies),
  amount: mockDataGenerator.amount(10000, 500000),
  status: mockDataGenerator.status([...commonStatuses.order]),
  items: mockDataGenerator.number(1, 15),
})

export const generateTask = (index: number): GenericTask => ({
  id: mockDataGenerator.id('task'),
  taskNumber: `TASK-${String(index + 1).padStart(4, '0')}`,
  title: `Task ${index + 1}`,
  startDate: mockDataGenerator.date(index),
  endDate: mockDataGenerator.date(index + mockDataGenerator.number(1, 7)),
  status: mockDataGenerator.status([...commonStatuses.production]),
  progress: mockDataGenerator.number(0, 100),
})

export const generateItem = (index: number): GenericItem => ({
  id: mockDataGenerator.id('item'),
  name: mockDataGenerator.status(sampleData.products),
  code: `ITEM-${String(index + 1).padStart(4, '0')}`,
  quantity: mockDataGenerator.number(1, 1000),
  unit: 'PCS',
  price: mockDataGenerator.amount(100, 10000),
})

// Bulk generators
export const generateDocuments = (count: number) => mockDataGenerator.array(generateDocument, count)
export const generateTransactions = (count: number) => mockDataGenerator.array(generateTransaction, count)
export const generateTasks = (count: number) => mockDataGenerator.array(generateTask, count)
export const generateItems = (count: number) => mockDataGenerator.array(generateItem, count)
