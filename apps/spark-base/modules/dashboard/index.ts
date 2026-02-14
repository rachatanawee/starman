// Components
export { StatCard } from './components/stat-card'
export { AlertCard } from './components/alert-card'
export { TopProductsList } from './components/top-products-list'
export { ActivityItem } from './components/activity-item'

// Types
export type {
  DashboardStats,
  InventoryStats,
  ProductionStats,
  SalesStats,
  SalesDataPoint,
  InventoryCategory,
  ProductionTrendPoint,
  TopProduct,
  Alert,
  Activity
} from './types'

// Utils
export { exportDashboardCSV, toggleFullscreen } from './lib/utils'

// Data
export {
  mockInventoryStats,
  mockProductionStats,
  mockSalesData,
  mockInventoryByCategory,
  mockProductionTrend,
  mockTopProducts,
  mockAlerts,
  mockActivities
} from './lib/data'
