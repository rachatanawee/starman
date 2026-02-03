'use client'

import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { useEffect, useState } from 'react'

type FeedbackType = 'success' | 'error' | 'warning' | 'info'

interface InlineFeedbackProps {
  type: FeedbackType
  message: string
  duration?: number
  onDismiss?: () => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200'
}

export function InlineFeedback({ type, message, duration = 3000, onDismiss }: InlineFeedbackProps) {
  const [show, setShow] = useState(true)
  const Icon = icons[type]

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setShow(false)
        onDismiss?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  if (!show) return null

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${styles[type]} animate-in fade-in slide-in-from-top-2 duration-200`}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
