'use client'

import * as React from 'react'

interface AIContextType {
  isAIEnabled: boolean
  toggleAI: () => void
  aiSuggestions: Record<string, any>
  getAISuggestion: (context: string, data: any) => Promise<any>
  isLoading: boolean
}

const AIContext = React.createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isAIEnabled, setIsAIEnabled] = React.useState(true)
  const [aiSuggestions, setAISuggestions] = React.useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  const toggleAI = () => {
    setIsAIEnabled(prev => !prev)
  }

  const getAISuggestion = async (context: string, data: any) => {
    if (!isAIEnabled) return null
    
    setIsLoading(true)
    try {
      // Mock AI API call - replace with actual AI service
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const suggestion = generateMockSuggestion(context, data)
      setAISuggestions(prev => ({ ...prev, [context]: suggestion }))
      return suggestion
    } catch (error) {
      console.error('AI suggestion error:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AIContext.Provider value={{ isAIEnabled, toggleAI, aiSuggestions, getAISuggestion, isLoading }}>
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = React.useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within AIProvider')
  }
  return context
}

// Mock AI suggestion generator
function generateMockSuggestion(context: string, data: any) {
  const suggestions: Record<string, any> = {
    'quotation-pricing': {
      suggestedPrice: data.basePrice * 1.15,
      confidence: 0.85,
      reasoning: 'Based on market trends and competitor pricing',
      alternatives: [
        { price: data.basePrice * 1.12, reason: 'Conservative approach' },
        { price: data.basePrice * 1.18, reason: 'Premium positioning' }
      ]
    },
    'dashboard-insights': {
      confidence: 0.89,
      insights: [
        'Revenue growth accelerating - projected ฿850K next month (+18%)',
        'Production efficiency at 96% - best performance this quarter',
        'Recommend auto-ordering 5 items to prevent stockouts',
        '8 delayed orders - suggest shifting resources from Product E to Product A',
        'Raw materials inventory optimal - no action needed',
        'Work-in-progress trending up - consider adding evening shift'
      ],
      message: `Dashboard Analysis: ฿${data.totalRevenue?.toLocaleString() || 0} revenue, ${data.productionEfficiency || 0}% efficiency, ${data.lowStockItems || 0} items need attention, ${data.activeOrders || 0} active orders`
    },
    'customer-trends': {
      confidence: 0.92,
      insights: [
        `Top ${data.topCustomers?.length || 3} customers account for 65% of total revenue`,
        'Customer retention rate increased by 12% this quarter',
        'Average order value trending up 15% month-over-month',
        'Acme Corp shows 45% growth potential based on order history',
        'Tech Solutions has consistent monthly orders - ideal for subscription model'
      ],
      message: `Analyzing ${data.customerCount || 0} customers with total revenue of $${data.totalRevenue?.toLocaleString() || 0}`
    },
    'sales-forecast': {
      predictedRevenue: data.currentRevenue * 1.23,
      confidence: 0.78,
      trend: 'upward',
      insights: [
        'Q1 shows strong growth potential',
        'Customer retention rate is improving',
        'New market segment showing interest'
      ]
    },
    'inventory-optimization': {
      recommendedStock: Math.ceil(data.currentStock * 0.85),
      confidence: 0.92,
      reasoning: 'Optimize based on demand patterns',
      savings: data.currentStock * 0.15 * data.unitCost
    },
    'production-schedule': {
      optimizedSchedule: 'Shift production to off-peak hours',
      confidence: 0.88,
      estimatedSavings: '15% reduction in energy costs',
      timeline: '2 weeks implementation'
    }
  }

  return suggestions[context] || {
    message: 'AI analysis in progress',
    confidence: 0.5
  }
}
