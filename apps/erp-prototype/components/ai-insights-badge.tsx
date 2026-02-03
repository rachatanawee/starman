'use client'

import * as React from 'react'
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { Badge } from '@spark/core'
import { } from '@spark/core' // badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@spark/core'
import { } from '@spark/core' // tooltip'

interface AIInsightsBadgeProps {
  type: 'positive' | 'negative' | 'warning' | 'neutral'
  message: string
  confidence?: number
  compact?: boolean
}

export function AIInsightsBadge({ type, message, confidence, compact = false }: AIInsightsBadgeProps) {
  const icons = {
    positive: <TrendingUp className="h-3 w-3" />,
    negative: <TrendingDown className="h-3 w-3" />,
    warning: <AlertTriangle className="h-3 w-3" />,
    neutral: <Sparkles className="h-3 w-3" />
  }

  const colors = {
    positive: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    negative: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    neutral: 'bg-primary/5 text-primary border-primary/20 hover:bg-primary/10'
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={`gap-1 cursor-help ${colors[type]}`}
          >
            {icons[type]}
            {!compact && <span className="text-xs">AI</span>}
            {confidence && !compact && (
              <span className="text-xs font-medium">{(confidence * 100).toFixed(0)}%</span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="text-sm font-medium">AI Insight</p>
            <p className="text-xs text-gray-600">{message}</p>
            {confidence && (
              <p className="text-xs text-gray-500">Confidence: {(confidence * 100).toFixed(0)}%</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
