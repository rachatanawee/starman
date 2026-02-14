export interface Customer {
  id: string
  name: string
  code: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface CustomerFormData {
  name: string
  code: string
  status: 'active' | 'inactive'
}
