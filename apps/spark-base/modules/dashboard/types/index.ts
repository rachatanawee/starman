export interface DashboardStats {
  inventory: InventoryStats
  production: ProductionStats
  sales: SalesStats
}

export interface InventoryStats {
  totalItems: number
  lowStock: number
  outOfStock: number
  inTransit: number
}

export interface ProductionStats {
  activeOrders: number
  completed: number
  pending: number
  delayed: number
  efficiency: number
}

export interface SalesStats {
  monthlyRevenue: number
  revenueGrowth: number
  totalOrders: number
}

export interface SalesDataPoint {
  month: string
  sales: number
  orders: number
}

export interface InventoryCategory {
  name: string
  value: number
  color: string
}

export interface ProductionTrendPoint {
  week: string
  planned: number
  actual: number
}

export interface TopProduct {
  name: string
  units: number
  revenue: number
}

export interface Alert {
  id: string
  type: 'error' | 'warning' | 'success' | 'info'
  title: string
  message: string
  timestamp: string
}

export interface Activity {
  id: string
  type: 'order' | 'production' | 'inventory' | 'worker'
  title: string
  description: string
  timestamp: string
  icon: string
}
