import { useState, useEffect } from 'react'
import type { Purchases } from '../types'
import { mockPurchasesData } from '../lib/data'

export function usePurchases() {
  const [purchasess, setPurchasess] = useState<Purchases[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPurchasess(mockPurchasesData)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getPurchasesById = (id: string) => {
    return purchasess.find(item => item.id === id)
  }

  const getPurchasesByCode = (code: string) => {
    return purchasess.find(item => item.code === code)
  }

  return {
    purchasess,
    loading,
    getPurchasesById,
    getPurchasesByCode,
  }
}
