/**
 * Business Agnostic Utilities
 * Generic business logic that can be reused across different domains
 */

// Status Management
export const statusUtils = {
  getVariant: (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const statusLower = status.toLowerCase()
    if (['completed', 'approved', 'paid', 'active'].includes(statusLower)) return 'default'
    if (['pending', 'processing', 'partial'].includes(statusLower)) return 'secondary'
    if (['rejected', 'cancelled', 'overdue', 'failed'].includes(statusLower)) return 'destructive'
    return 'outline'
  },

  getColor: (status: string): string => {
    const statusLower = status.toLowerCase()
    if (['completed', 'approved', 'paid'].includes(statusLower)) return 'text-green-600'
    if (['pending', 'processing'].includes(statusLower)) return 'text-yellow-600'
    if (['rejected', 'cancelled', 'overdue'].includes(statusLower)) return 'text-red-600'
    if (['draft'].includes(statusLower)) return 'text-gray-600'
    return 'text-blue-600'
  },
}

// Number Formatting
export const formatUtils = {
  currency: (amount: number, currency = '฿', decimals = 2): string => {
    return `${currency}${amount.toLocaleString(undefined, { 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals 
    })}`
  },

  number: (value: number, decimals = 0): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  },

  percentage: (value: number, decimals = 1): string => {
    return `${value.toFixed(decimals)}%`
  },

  date: (date: string | Date, format: 'short' | 'long' = 'short'): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    if (format === 'long') {
      return d.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    return d.toLocaleDateString()
  },
}

// Filter Utilities
export const filterUtils = {
  matchesText: (value: string, search: string): boolean => {
    return value.toLowerCase().includes(search.toLowerCase())
  },

  matchesDateRange: (date: string, from?: string, to?: string): boolean => {
    const dateValue = date.replace(/\//g, '-')
    const matchesFrom = !from || dateValue >= from
    const matchesTo = !to || dateValue <= to
    return matchesFrom && matchesTo
  },

  matchesStatus: (status: string, filter: string): boolean => {
    return filter === 'all' || status === filter
  },
}

// Calculation Utilities
export const calcUtils = {
  sum: (items: any[], key: string): number => {
    return items.reduce((sum, item) => sum + (item[key] || 0), 0)
  },

  average: (items: any[], key: string): number => {
    if (items.length === 0) return 0
    return calcUtils.sum(items, key) / items.length
  },

  percentage: (value: number, total: number): number => {
    if (total === 0) return 0
    return (value / total) * 100
  },

  growth: (current: number, previous: number): number => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  },
}

// Validation Utilities
export const validationUtils = {
  isEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0
  },

  isPositiveNumber: (value: number): boolean => {
    return !isNaN(value) && value > 0
  },

  isInRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max
  },
}

// Sort Utilities
export const sortUtils = {
  byDate: (a: any, b: any, key: string, desc = false): number => {
    const dateA = new Date(a[key]).getTime()
    const dateB = new Date(b[key]).getTime()
    return desc ? dateB - dateA : dateA - dateB
  },

  byNumber: (a: any, b: any, key: string, desc = false): number => {
    return desc ? b[key] - a[key] : a[key] - b[key]
  },

  byString: (a: any, b: any, key: string, desc = false): number => {
    const comparison = a[key].localeCompare(b[key])
    return desc ? -comparison : comparison
  },
}
