'use client'

import { useState } from 'react'
import { OrderItem } from '../types'
import { calculateLineTotal } from '../lib/utils'

export function useOrderItems(initialItems?: OrderItem[]) {
  const [items, setItems] = useState<OrderItem[]>(
    initialItems || [
      { id: '1', productName: '', sku: '', quantity: 1, unitPrice: 0, discount: 0, total: 0 }
    ]
  )

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      productName: '', 
      sku: '', 
      quantity: 1, 
      unitPrice: 0, 
      discount: 0, 
      total: 0 
    }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        updated.total = calculateLineTotal(updated.quantity, updated.unitPrice, updated.discount)
        return updated
      }
      return item
    }))
  }

  return {
    items,
    addItem,
    removeItem,
    updateItem
  }
}
