'use client'

import { useState, useEffect } from 'react'
import { Asset } from '../types'
import { mockAssets } from '../lib/data'

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAssets(mockAssets)
      setLoading(false)
    }, 500)
  }, [])

  const getAssetByCode = (code: string): Asset | undefined => {
    return assets.find(asset => asset.qrCode === code || asset.code === code)
  }

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, ...updates, updatedAt: new Date().toISOString() } : asset
    ))
  }

  return {
    assets,
    loading,
    getAssetByCode,
    updateAsset
  }
}
