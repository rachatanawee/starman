export interface Purchases {
  id: string
  name: string
  code: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface PurchasesFormData {
  name: string
  code: string
  status: 'active' | 'inactive'
}
