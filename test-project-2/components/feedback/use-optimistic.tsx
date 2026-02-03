'use client'

import { useState, useCallback } from 'react'

interface OptimisticState<T> {
  data: T
  isPending: boolean
  error: Error | null
}

export function useOptimistic<T>(initialData: T) {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isPending: false,
    error: null
  })

  const update = useCallback(async (
    optimisticData: T,
    asyncFn: () => Promise<T>
  ) => {
    // Immediately update UI
    setState({ data: optimisticData, isPending: true, error: null })

    try {
      // Execute async operation
      const result = await asyncFn()
      setState({ data: result, isPending: false, error: null })
      return result
    } catch (error) {
      // Rollback on error
      setState({ data: initialData, isPending: false, error: error as Error })
      throw error
    }
  }, [initialData])

  const reset = useCallback(() => {
    setState({ data: initialData, isPending: false, error: null })
  }, [initialData])

  return { ...state, update, reset }
}
