'use client'

import { Button } from '@/shared/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FloatingUndoProps {
  message: string
  onUndo: () => void
  duration?: number
  onDismiss?: () => void
}

export function FloatingUndo({ message, onUndo, duration = 5000, onDismiss }: FloatingUndoProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onDismiss?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-4">
        <span className="text-sm font-medium">{message}</span>
        <Button
          size="sm"
          onClick={() => {
            onUndo()
            setShow(false)
          }}
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          <Undo2 className="h-4 w-4 mr-1" />
          Undo
        </Button>
      </div>
    </div>
  )
}
