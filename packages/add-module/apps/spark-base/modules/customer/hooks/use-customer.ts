import { useState, useEffect } from 'react'
import type { Customer } from '../types'
import { mockCustomerData } from '../lib/data'

export function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCustomers(mockCustomerData)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getCustomerById = (id: string) => {
    return customers.find(item => item.id === id)
  }

  const getCustomerByCode = (code: string) => {
    return customers.find(item => item.code === code)
  }

  return {
    customers,
    loading,
    getCustomerById,
    getCustomerByCode,
  }
}
