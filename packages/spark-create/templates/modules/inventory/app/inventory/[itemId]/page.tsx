'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'
import { ArrowLeft, Edit, Save, Plus, X, Package2, MapPin, TrendingUp, AlertTriangle } from 'lucide-react'
import { mockInventoryItems, mockStockTransactions } from '@/modules/inventory/lib/mock-data'
import { toast } from 'sonner'

export default function InventoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const itemId = params.itemId as string

  const item = mockInventoryItems.find(i => i.id === itemId)
  const transactions = mockStockTransactions.filter(t => t.productId === item?.productId).slice(0, 5)

  const [isEditing, setIsEditing] = useState(false)
  const [attributes, setAttributes] = useState(item?.attributes || {})
  const [newAttrKey, setNewAttrKey] = useState('')
  const [newAttrValue, setNewAttrValue] = useState('')
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  if (!item) {
    return (
      
        <div className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Item not found</p>
          <Button variant="outline" className="mt-4" onClick={() => router.back()}>
            Back to Inventory
          </Button>
        </div>
      
    )
  }

  const handleAddAttribute = () => {
    if (newAttrKey && newAttrValue) {
      setAttributes({ ...attributes, [newAttrKey]: newAttrValue })
      setNewAttrKey('')
      setNewAttrValue('')
    }
  }

  const handleRemoveAttribute = (key: string) => {
    const newAttrs = { ...attributes }
    delete newAttrs[key]
    setAttributes(newAttrs)
  }

  const handleEditAttribute = (key: string) => {
    setEditingKey(key)
    setEditValue(attributes[key])
  }

  const handleSaveEdit = (key: string) => {
    setAttributes({ ...attributes, [key]: editValue })
    setEditingKey(null)
    setEditValue('')
  }

  const handleSave = () => {
    toast.success('SKU updated successfully')
    setIsEditing(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'raw_material': return 'bg-blue-100 text-blue-800'
      case 'finished_goods': return 'bg-green-100 text-green-800'
      case 'hardware': return 'bg-primary/10 text-primary'
      case 'consumable': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{item.productSku}</h1>
              <p className="text-gray-600 mt-1">{item.productName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>SKU</Label>
                    <Input value={item.productSku} disabled className="mt-1" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <div className="mt-1">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label>Product Name</Label>
                    <Input value={item.productName} disabled={!isEditing} className="mt-1" />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={item.description || ''} 
                      disabled={!isEditing} 
                      className="mt-1" 
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>UOM</Label>
                    <Input value={item.uom} disabled={!isEditing} className="mt-1" />
                  </div>
                  <div>
                    <Label>Unit Cost</Label>
                    <Input value={`฿${item.unitCost}`} disabled={!isEditing} className="mt-1" />
                  </div>
                  <div>
                    <Label>Min Stock</Label>
                    <Input value={item.minStock || 0} disabled={!isEditing} className="mt-1" type="number" />
                  </div>
                  <div>
                    <Label>Max Stock</Label>
                    <Input value={item.maxStock || 0} disabled={!isEditing} className="mt-1" type="number" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Attributes</CardTitle>
                  {isEditing && (
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Attribute
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing && (
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Attribute Name"
                        value={newAttrKey}
                        onChange={(e) => setNewAttrKey(e.target.value)}
                      />
                      <Input
                        placeholder="Value"
                        value={newAttrValue}
                        onChange={(e) => setNewAttrValue(e.target.value)}
                      />
                    </div>
                    <Button size="sm" className="mt-3 w-full" onClick={handleAddAttribute}>
                      Add
                    </Button>
                  </div>
                )}
                
                <div className="space-y-2">
                  {Object.entries(attributes).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="flex-1">
                        <span className="font-semibold text-sm">{key}:</span>
                        {isEditing && editingKey === key ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="ml-2 inline-block w-48"
                            autoFocus
                          />
                        ) : (
                          <span className="ml-2 text-sm text-gray-700">{value}</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex gap-1">
                          {editingKey === key ? (
                            <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(key)}>
                              <Save className="h-4 w-4 text-green-600" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" onClick={() => handleEditAttribute(key)}>
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => handleRemoveAttribute(key)}>
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {Object.keys(attributes).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No attributes defined</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map(txn => (
                    <div key={txn.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{txn.transactionType.replace('_', ' ')}</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(txn.transactionDate).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><span className="text-gray-600">From:</span> {txn.fromLocation}</p>
                        <p><span className="text-gray-600">To:</span> {txn.toLocation}</p>
                        <p><span className="text-gray-600">Quantity:</span> {txn.quantity} {txn.uom}</p>
                        <p><span className="text-gray-600">Ref:</span> {txn.referenceDoc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package2 className="h-5 w-5" />
                  Stock Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Quantity</p>
                  <p className="text-3xl font-bold">{item.quantity} {item.uom}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Reserved</p>
                  <p className="text-xl font-semibold text-orange-600">{item.reservedQuantity} {item.uom}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-xl font-semibold text-green-600">{item.availableQuantity} {item.uom}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-xl font-bold text-primary">฿{item.totalValue.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Warehouse</p>
                  <p className="font-medium">{item.warehouseName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location Code</p>
                  <p className="font-medium">{item.locationCode}</p>
                </div>
                {item.lotNumber && (
                  <div>
                    <p className="text-gray-600">Lot Number</p>
                    <p className="font-medium">{item.lotNumber}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Last Movement</p>
                  <p className="font-medium">{new Date(item.lastMovementDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Days Stagnant</p>
                  <p className={`font-medium ${item.daysStagnant > 90 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.daysStagnant} days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    
  )
}
