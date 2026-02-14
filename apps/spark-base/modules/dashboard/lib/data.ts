import type {
  InventoryStats,
  ProductionStats,
  SalesDataPoint,
  InventoryCategory,
  ProductionTrendPoint,
  TopProduct,
  Alert,
  Activity
} from '../types'

export const mockInventoryStats: InventoryStats = {
  totalItems: 1247,
  lowStock: 23,
  outOfStock: 5,
  inTransit: 156
}

export const mockProductionStats: ProductionStats = {
  activeOrders: 45,
  completed: 128,
  pending: 67,
  delayed: 8,
  efficiency: 96
}

export const mockSalesData: SalesDataPoint[] = [
  { month: 'Jan', sales: 450000, orders: 120 },
  { month: 'Feb', sales: 520000, orders: 145 },
  { month: 'Mar', sales: 480000, orders: 132 },
  { month: 'Apr', sales: 610000, orders: 168 },
  { month: 'May', sales: 580000, orders: 155 },
  { month: 'Jun', sales: 720000, orders: 192 },
]

export const mockInventoryByCategory: InventoryCategory[] = [
  { name: 'Raw Materials', value: 450, color: '#3b82f6' },
  { name: 'Work in Progress', value: 280, color: '#f59e0b' },
  { name: 'Finished Goods', value: 380, color: '#10b981' },
  { name: 'Packaging', value: 137, color: '#8b5cf6' },
]

export const mockProductionTrend: ProductionTrendPoint[] = [
  { week: 'W1', planned: 120, actual: 115 },
  { week: 'W2', planned: 130, actual: 128 },
  { week: 'W3', planned: 125, actual: 130 },
  { week: 'W4', planned: 140, actual: 135 },
  { week: 'W5', planned: 135, actual: 140 },
  { week: 'W6', planned: 150, actual: 145 },
]

export const mockTopProducts: TopProduct[] = [
  { name: 'Product A', units: 450, revenue: 225000 },
  { name: 'Product B', units: 380, revenue: 190000 },
  { name: 'Product C', units: 320, revenue: 160000 },
  { name: 'Product D', units: 280, revenue: 140000 },
  { name: 'Product E', units: 250, revenue: 125000 },
]

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'error',
    title: 'Low Stock Alert',
    message: '5 items are out of stock, 23 items below minimum level',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Production Delay',
    message: 'Order #PO-2024-156 is delayed by 2 days',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    type: 'success',
    title: 'Shipment Completed',
    message: 'Order #SO-2024-892 delivered successfully',
    timestamp: '1 day ago'
  }
]

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Sales Order',
    description: 'SO-2024-945 created for 250 units',
    timestamp: '30 minutes ago',
    icon: 'ShoppingCart'
  },
  {
    id: '2',
    type: 'production',
    title: 'Production Completed',
    description: 'Batch #B-2024-089 finished',
    timestamp: '2 hours ago',
    icon: 'Factory'
  },
  {
    id: '3',
    type: 'inventory',
    title: 'Inventory Received',
    description: 'PO-2024-334 - 500 units received',
    timestamp: '4 hours ago',
    icon: 'Package2'
  },
  {
    id: '4',
    type: 'worker',
    title: 'Worker Shift Change',
    description: 'Evening shift started - 15 workers',
    timestamp: '6 hours ago',
    icon: 'Users'
  }
]
