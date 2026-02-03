'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@spark/core'
import { Button } from '@spark/core'
import { Input } from '@spark/core'
import { Label } from '@spark/core'
import { Switch } from '@spark/core'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@spark/core'
import { ArrowLeft, Save, Plus, Trash2, ExternalLink } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { mockIntegration, mockAccountMappings, type ProviderType, type SourceType } from '@/lib/mock-data'
import { useState } from 'react'

const providers = [
  { value: 'peak', label: 'PEAK Accounting' },
  { value: 'flowaccount', label: 'FlowAccount' },
  { value: 'trcloud', label: 'TRCLOUD' },
  { value: 'express_export', label: 'Express (File Export)' }
]

const sourceTypes = [
  { value: 'product_category', label: 'Product Category' },
  { value: 'payment_method', label: 'Payment Method' },
  { value: 'tax_code', label: 'Tax Code' },
  { value: 'adjustment_reason', label: 'Adjustment Reason' }
]

export default function AccountingConfigurePage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [provider, setProvider] = useState<ProviderType>(mockIntegration.providerName)
  const [apiEndpoint, setApiEndpoint] = useState(mockIntegration.apiEndpoint || '')
  const [apiKey, setApiKey] = useState('••••••••••••••••')
  const [isActive, setIsActive] = useState(mockIntegration.isActive)
  const [autoSync, setAutoSync] = useState(mockIntegration.autoSync)
  const [mappings, setMappings] = useState(mockAccountMappings)

  const handleAddMapping = () => {
    const newMapping = {
      id: Date.now(),
      sourceType: 'product_category' as SourceType,
      sourceLabel: '',
      externalAccountCode: '',
      externalAccountName: ''
    }
    setMappings([...mappings, newMapping])
  }

  const handleDeleteMapping = (id: number) => {
    setMappings(mappings.filter(m => m.id !== id))
  }

  const handleMappingChange = (id: number, field: string, value: string) => {
    setMappings(mappings.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ))
  }

  return (
    
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Integration Configuration</h1>
              <p className="text-gray-600 mt-1">Connect to Thai accounting software</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Connection Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Connection Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select value={provider} onValueChange={(v) => setProvider(v as ProviderType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {provider !== 'express_export' && (
                <>
                  <div className="space-y-2">
                    <Label>API Endpoint</Label>
                    <Input 
                      value={apiEndpoint} 
                      onChange={(e) => setApiEndpoint(e.target.value)}
                      placeholder="https://api.example.com/v1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>API Key / Client ID</Label>
                    <Input 
                      type="password"
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter API key"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>API Secret (Optional)</Label>
                    <Input 
                      type="password"
                      placeholder="Enter API secret"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="space-y-1">
                <Label>Enable Integration</Label>
                <p className="text-sm text-gray-500">Activate connection to accounting software</p>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <Label>Auto-Sync</Label>
                <p className="text-sm text-gray-500">Automatically sync when documents are approved</p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
          </CardContent>
        </Card>

        {/* Account Mappings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Chart of Accounts Mapping</span>
              <Button variant="outline" size="sm" onClick={handleAddMapping}>
                <Plus className="h-4 w-4 mr-2" />
                Add Mapping
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {mappings.map((mapping) => (
                <div key={mapping.id} className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Source Type</Label>
                      <Select 
                        value={mapping.sourceType} 
                        onValueChange={(v) => handleMappingChange(mapping.id, 'sourceType', v)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sourceTypes.map(st => (
                            <SelectItem key={st.value} value={st.value}>{st.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Source Label (Starman)</Label>
                      <Input 
                        className="h-9"
                        value={mapping.sourceLabel}
                        onChange={(e) => handleMappingChange(mapping.id, 'sourceLabel', e.target.value)}
                        placeholder="e.g. Steel Products"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Account Code</Label>
                      <Input 
                        className="h-9 font-mono"
                        value={mapping.externalAccountCode}
                        onChange={(e) => handleMappingChange(mapping.id, 'externalAccountCode', e.target.value)}
                        placeholder="e.g. 4100-01"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Account Name (Thai)</Label>
                      <Input 
                        className="h-9"
                        value={mapping.externalAccountName}
                        onChange={(e) => handleMappingChange(mapping.id, 'externalAccountName', e.target.value)}
                        placeholder="e.g. รายได้จากการขาย"
                      />
                    </div>

                    <div className="flex items-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => handleDeleteMapping(mapping.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  {mapping.description && (
                    <p className="text-sm text-gray-500">{mapping.description}</p>
                  )}
                </div>
              ))}
            </div>

            {mappings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No account mappings configured</p>
                <p className="text-sm mt-1">Click "Add Mapping" to create your first mapping</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Common Mappings Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Common Mapping Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-4 font-semibold pb-2 border-b">
                <span>Starman Item</span>
                <span>Account Code</span>
                <span>Thai Account Name</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span>Product Sales</span>
                <span className="font-mono">4100-01</span>
                <span>รายได้จากการขายสินค้า</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span>Raw Materials</span>
                <span className="font-mono">1130-01</span>
                <span>วัตถุดิบคงเหลือ</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span>Cash Payment</span>
                <span className="font-mono">1100-01</span>
                <span>เงินสดในมือ</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span>Bank Transfer</span>
                <span className="font-mono">1110-01</span>
                <span>เงินฝากธนาคาร</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span>VAT 7%</span>
                <span className="font-mono">2135-01</span>
                <span>ภาษีขายรอเรียกเก็บ</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span>WHT 3%</span>
                <span className="font-mono">1140-03</span>
                <span>ภาษีหัก ณ ที่จ่าย</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    
  )
}
