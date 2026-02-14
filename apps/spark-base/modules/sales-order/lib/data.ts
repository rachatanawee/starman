import { SalesOrder } from '../types'

export const mockSalesOrders: SalesOrder[] = [
  {
    id: '1',
    orderNumber: 'SO-2024-001',
    customer: 'Acme Corp',
    date: '2024/01/15',
    deliveryDate: '2024/01/25',
    amount: 15000,
    status: 'Completed',
    items: 5,
    paymentTerms: 'Net 30'
  },
  {
    id: '2',
    orderNumber: 'SO-2024-002',
    customer: 'Tech Solutions',
    date: '2024/01/16',
    deliveryDate: '2024/01/26',
    amount: 28500,
    status: 'Processing',
    items: 8,
    paymentTerms: 'Net 30'
  },
  {
    id: '3',
    orderNumber: 'SO-2024-003',
    customer: 'Global Industries',
    date: '2024/01/17',
    deliveryDate: '2024/01/27',
    amount: 42000,
    status: 'Pending',
    items: 12,
    paymentTerms: 'Net 60'
  },
  {
    id: '4',
    orderNumber: 'SO-2024-004',
    customer: 'Smart Systems',
    date: '2024/01/18',
    deliveryDate: '2024/01/28',
    amount: 19800,
    status: 'Completed',
    items: 6,
    paymentTerms: 'Net 30'
  },
  {
    id: '5',
    orderNumber: 'SO-2024-005',
    customer: 'Digital Dynamics',
    date: '2024/01/19',
    deliveryDate: '2024/01/29',
    amount: 33600,
    status: 'Shipped',
    items: 10,
    paymentTerms: 'Cash'
  }
]
