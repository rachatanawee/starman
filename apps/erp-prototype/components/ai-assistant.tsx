'use client'

import * as React from 'react'
import { Sparkles, X, Loader2, TrendingUp, AlertCircle, Lightbulb, Users, DollarSign, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAI } from '@/lib/ai-context'

interface AIAssistantProps {
  context: string
  data?: any
  position?: 'inline' | 'floating'
  compact?: boolean
  title?: string
}

export function AIAssistant({ context, data, position = 'inline', compact = false, title = 'AI Customer Insights' }: AIAssistantProps) {
  const { isAIEnabled, aiSuggestions, getAISuggestion, isLoading } = useAI()
  const [isExpanded, setIsExpanded] = React.useState(true)
  const [isVisible, setIsVisible] = React.useState(true)
  const [suggestion, setSuggestion] = React.useState<any>(null)

  React.useEffect(() => {
    if (isAIEnabled && data) {
      getAISuggestion(context, data).then(setSuggestion)
    }
  }, [context, data, isAIEnabled])

  if (!isAIEnabled || !isVisible) return null

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Sparkles className="h-4 w-4" />
        AI Insights
      </Button>
    )
  }

  const containerClass = position === 'floating'
    ? 'fixed bottom-6 right-6 z-50 w-96 shadow-2xl'
    : 'w-full'

  return (
    <div className={containerClass}>
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">{title}</span>
            <Badge variant="secondary" className="bg-white/30 text-white border-0 backdrop-blur-sm">
              Live
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white hover:bg-white/20 rounded-lg"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-5 space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Loader2 className="h-12 w-12 animate-spin text-amber-600 relative" />
              </div>
              <span className="text-sm font-medium text-amber-700">Analyzing customer data...</span>
            </div>
          ) : suggestion ? (
            <>
              {/* Summary Stats */}
              {suggestion.message && (
                <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Overview</span>
                  </div>
                  <p className="text-sm text-gray-700">{suggestion.message}</p>
                  
                  {/* Confidence Bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Analysis Confidence</span>
                      <span className="font-bold text-amber-700">
                        {(suggestion.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Key Insights */}
              {suggestion.insights && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-1.5 rounded-lg">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">Key Insights</span>
                  </div>
                  <div className="space-y-2">
                    {suggestion.insights.map((insight: string, index: number) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-lg p-3 border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-full p-1.5 mt-0.5">
                            <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full"></div>
                          </div>
                          <p className="text-sm text-gray-700 flex-1 leading-relaxed">{insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Recommendation */}
              {suggestion.suggestedPrice && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Pricing Recommendation</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${suggestion.suggestedPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">{suggestion.reasoning}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stock Optimization */}
              {suggestion.recommendedStock && (
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border-2 border-violet-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-violet-500 p-2 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Stock Optimization</p>
                      <p className="text-2xl font-bold text-violet-600">
                        {suggestion.recommendedStock} units
                      </p>
                      <p className="text-xs text-gray-600 mt-2">{suggestion.reasoning}</p>
                      {suggestion.savings && (
                        <div className="mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium inline-block">
                          💰 Potential savings: ${suggestion.savings.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-3 border-2 border-amber-200">
                <Sparkles className="h-8 w-8 text-amber-400" />
              </div>
              <p className="text-sm text-gray-500">No AI insights available</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-3 border-t-2 border-amber-200">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <p className="text-xs text-amber-800 font-medium">
              AI-powered insights • Updated in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
