import type { Purchases } from '../types'

export const mockPurchasesData: Purchases[] = [
  {
    id: '1',
    name: 'Sample Purchases 1',
    code: 'PURCHASES-001',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sample Purchases 2',
    code: 'PURCHASES-002',
    status: 'active',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Sample Purchases 3',
    code: 'PURCHASES-003',
    status: 'inactive',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
]
