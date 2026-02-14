import type { Customer } from '../types'

export const mockCustomerData: Customer[] = [
  {
    id: '1',
    name: 'Sample Customer 1',
    code: 'CUSTOMER-001',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sample Customer 2',
    code: 'CUSTOMER-002',
    status: 'active',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Sample Customer 3',
    code: 'CUSTOMER-003',
    status: 'inactive',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
]
