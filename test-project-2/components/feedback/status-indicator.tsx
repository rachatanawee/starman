'use client'

import { Loader2, CheckCircle, XCircle } from 'lucide-react'

type StatusType = 'loading' | 'success' | 'error' | 'idle'

interface StatusIndicatorProps {
  status: StatusType
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const icons = {
  loading: Loader2,
  success: CheckCircle,
  error: XCircle,
  idle: null
}

const sizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
}

const colors = {
  loading: 'text-blue-600',
  success: 'text-green-600',
  error: 'text-red-600',
  idle: 'text-gray-400'
}

export function StatusIndicator({ status, message, size = 'md' }: StatusIndicatorProps) {
  const Icon = icons[status]
  
  if (status === 'idle') return null

  return (
    <div className="flex items-center gap-2">
      {Icon && (
        <Icon 
          className={`${sizes[size]} ${colors[status]} ${status === 'loading' ? 'animate-spin' : ''}`} 
        />
      )}
      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  )
}
