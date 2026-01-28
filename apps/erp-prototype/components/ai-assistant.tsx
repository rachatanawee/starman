'use client'

import * as React from 'react'
import { Sparkles, X, Loader2, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAI } from '@/lib/ai-context'

interface AIAssistantProps {
  context: string
  data?: any
  position?: 'inline' | 'floating'
  compact?: boolean
}

export function AIAssistant({ context, data, position = 'inline', compact = false }: AIAssistantProps) {
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
        className="gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
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
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">AI Assistant</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Beta
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-3">
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Analyzing data...</span>
            </div>
          ) : suggestion ? (
            <>
              {suggestion.suggestedPrice && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Pricing Recommendation</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">
                        ${suggestion.suggestedPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.reasoning}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2 rounded-full"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {(suggestion.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}

              {suggestion.insights && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Key Insights
                  </div>
                  <ul className="space-y-1">
                    {suggestion.insights.map((insight: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {suggestion.recommendedStock && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-violet-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Stock Optimization</p>
                      <p className="text-lg font-bold text-violet-600 mt-1">
                        {suggestion.recommendedStock} units
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.reasoning}</p>
                      {suggestion.savings && (
                        <p className="text-xs text-green-600 font-medium mt-1">
                          Potential savings: ${suggestion.savings.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {suggestion.message && (
                <div className="text-sm text-gray-600 italic">
                  {suggestion.message}
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">
              No AI suggestions available
            </div>
          )}
        </div>

        <div className="bg-white/50 px-4 py-2 border-t border-indigo-200">
          <p className="text-xs text-gray-500 text-center">
            AI-powered insights to help you make better decisions
          </p>
        </div>
      </div>
    </div>
  )
}
