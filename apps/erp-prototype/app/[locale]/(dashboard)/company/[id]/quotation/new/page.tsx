'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react'
import * as React from 'react'

interface QuotationItem {
  id: string
  productName: string
  sku: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  total: number
}

interface ParsedItem {
  productName: string
  description: string
  quantity: number
  unitPrice: number
  matchedProduct?: { id: string; name: string; sku: string; price: number }
}

const mockProducts = [
  { id: '1', name: 'Laptop Dell XPS 15', sku: 'LAP-001', price: 45000 },
  { id: '2', name: 'Monitor LG 27"', sku: 'MON-001', price: 8500 },
  { id: '3', name: 'Keyboard Mechanical', sku: 'KEY-001', price: 3200 },
  { id: '4', name: 'Mouse Wireless', sku: 'MOU-001', price: 890 },
  { id: '5', name: 'Webcam HD', sku: 'CAM-001', price: 2500 },
]

export default function NewQuotationPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [items, setItems] = React.useState<QuotationItem[]>([
    { id: '1', productName: '', sku: '', description: '', quantity: 1, unitPrice: 0, discount: 0, total: 0 }
  ])
  const [globalDiscount, setGlobalDiscount] = React.useState(0)
  const [shippingCost, setShippingCost] = React.useState(0)
  const [taxRate] = React.useState(7) // VAT 7%

  // AI Paste Request Dialog State
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [pasteText, setPasteText] = React.useState('')
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [parsedItems, setParsedItems] = React.useState<ParsedItem[]>([])

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * globalDiscount) / 100
  const taxableAmount = subtotal - discountAmount
  const taxAmount = (taxableAmount * taxRate) / 100
  const grandTotal = taxableAmount + taxAmount + shippingCost

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      productName: '', 
      sku: '', 
      description: '',
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

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        const lineTotal = (updated.quantity * updated.unitPrice) - updated.discount
        updated.total = Math.max(0, lineTotal)
        return updated
      }
      return item
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${params.locale}/company/${projectId}/quotation`)
  }

  const simulateAIParsing = async (text: string): Promise<ParsedItem[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock AI parsing - in real app, this would call an AI API
    const lines = text.split('\n').filter(line => line.trim())
    const parsed: ParsedItem[] = []
    
    for (const line of lines) {
      // Simple pattern matching (mock)
      const qtyMatch = line.match(/(\d+)\s*x|x\s*(\d+)|(\d+)\s*ชิ้น|(\d+)\s*เครื่อง/i)
      const quantity = qtyMatch ? parseInt(qtyMatch[1] || qtyMatch[2] || qtyMatch[3] || qtyMatch[4]) : 1
      
      // Try to match with existing products
      const matchedProduct = mockProducts.find(p => 
        line.toLowerCase().includes(p.name.toLowerCase()) ||
        line.toLowerCase().includes(p.sku.toLowerCase())
      )
      
      if (matchedProduct || line.length > 5) {
        parsed.push({
          productName: matchedProduct?.name || line.substring(0, 50),
          description: line,
          quantity,
          unitPrice: matchedProduct?.price || 0,
          matchedProduct
        })
      }
    }
    
    return parsed
  }

  const handlePasteAnalyze = async () => {
    if (!pasteText.trim()) return
    
    setIsProcessing(true)
    try {
      const parsed = await simulateAIParsing(pasteText)
      setParsedItems(parsed)
    } catch (error) {
      console.error('Error parsing text:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirmParsedItems = () => {
    const newItems = parsedItems.map((parsed, index) => {
      const product = parsed.matchedProduct || mockProducts[0]
      const lineTotal = (parsed.quantity * parsed.unitPrice) - 0
      return {
        id: Date.now().toString() + index,
        productName: product.name,
        sku: product.sku,
        description: parsed.description,
        quantity: parsed.quantity,
        unitPrice: parsed.unitPrice,
        discount: 0,
        total: lineTotal
      }
    })
    
    setItems([...items.filter(item => item.productName), ...newItems])
    setIsDialogOpen(false)
    setPasteText('')
    setParsedItems([])
  }

  const updateParsedItemProduct = (index: number, productId: string) => {
    const product = mockProducts.find(p => p.id === productId)
    if (product) {
      setParsedItems(parsedItems.map((item, i) => 
        i === index ? { ...item, matchedProduct: product, unitPrice: product.price } : item
      ))
    }
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">New Quotation</h1>
            <p className="text-gray-600 mt-1">Create a new sales quotation</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Information */}
          <Card>
            <CardHeader>
              <CardTitle>Quotation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quotationNumber">Quotation Number</Label>
                  <Input id="quotationNumber" placeholder="QT-2026-XXX" required data-testid="quotation-number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quotationDate">Quotation Date</Label>
                  <Input id="quotationDate" type="date" required data-testid="quotation-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input id="validUntil" type="date" required data-testid="valid-until" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger data-testid="customer-select">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Acme Corporation</SelectItem>
                      <SelectItem value="2">Tech Solutions Ltd</SelectItem>
                      <SelectItem value="3">Global Trading Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refNumber">Reference No.</Label>
                  <Input id="refNumber" placeholder="Customer Reference" data-testid="ref-number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea id="billingAddress" placeholder="Billing address" rows={3} data-testid="billing-address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address</Label>
                  <Textarea id="shippingAddress" placeholder="Shipping address" rows={3} data-testid="shipping-address" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select defaultValue="net30">
                    <SelectTrigger data-testid="payment-terms">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                      <SelectItem value="net90">Net 90</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger data-testid="status-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quotation Items</CardTitle>
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" size="sm" className="bg-gradient-to-r from-purple-50 to-blue-50">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                      Paste Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        AI Paste Request
                      </DialogTitle>
                    </DialogHeader>
                    
                    {parsedItems.length === 0 ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Paste customer request from LINE/Email</Label>
                          <Textarea
                            value={pasteText}
                            onChange={(e) => setPasteText(e.target.value)}
                            placeholder="Example:\n2x Laptop Dell XPS 15\n1x Monitor LG 27 inch\n5x Mouse Wireless"
                            rows={10}
                            className="font-mono text-sm"
                          />
                        </div>
                        <Button 
                          onClick={handlePasteAnalyze} 
                          disabled={!pasteText.trim() || isProcessing}
                          className="w-full"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Analyze with AI
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <strong>Found {parsedItems.length} items.</strong> Please verify and select the correct product for each item.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          {parsedItems.map((item, index) => (
                            <div key={index} className="border rounded-lg p-3 space-y-2">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Detected Text</Label>
                                  <p className="text-sm font-medium">{item.description}</p>
                                </div>
                                <div>
                                  <Label className="text-xs">Quantity</Label>
                                  <p className="text-sm font-medium">{item.quantity}</p>
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs">Match Product</Label>
                                <Select 
                                  value={item.matchedProduct?.id || ''} 
                                  onValueChange={(value) => updateParsedItemProduct(index, value)}
                                >
                                  <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select product" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockProducts.map(product => (
                                      <SelectItem key={product.id} value={product.id}>
                                        {product.name} ({product.sku}) - ฿{product.price.toLocaleString()}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => { setParsedItems([]); setPasteText(''); }}>
                            Back
                          </Button>
                          <Button onClick={handleConfirmParsedItems}>
                            Add {parsedItems.length} Items
                          </Button>
                        </DialogFooter>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                
                <Button type="button" variant="outline" size="sm" onClick={addItem} data-testid="add-item-row">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-2 font-medium">SKU</th>
                      <th className="text-left p-2 font-medium">Product Name</th>
                      <th className="text-left p-2 font-medium">Description</th>
                      <th className="text-right p-2 font-medium">Qty</th>
                      <th className="text-right p-2 font-medium">Unit Price</th>
                      <th className="text-right p-2 font-medium">Discount</th>
                      <th className="text-right p-2 font-medium">Total</th>
                      <th className="w-10 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">
                          <Input 
                            value={item.sku} 
                            onChange={(e) => updateItem(item.id, 'sku', e.target.value)}
                            placeholder="SKU"
                            className="h-8"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            value={item.productName} 
                            onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                            placeholder="Product name"
                            className="h-8"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            value={item.description} 
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="Description"
                            className="h-8"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                            className="h-8 text-right w-20"
                            min="1"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number" 
                            value={item.unitPrice} 
                            onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                            className="h-8 text-right w-24"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number" 
                            value={item.discount} 
                            onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
                            className="h-8 text-right w-20"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="p-2 text-right font-medium">
                          {item.total.toFixed(2)}
                        </td>
                        <td className="p-2">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Notes & Summary */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Internal notes..."
                    rows={4}
                    data-testid="notes"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="termsConditions">Terms & Conditions</Label>
                  <Textarea 
                    id="termsConditions"
                    placeholder="Terms and conditions for this quotation..."
                    rows={4}
                    data-testid="terms-conditions"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quotation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-medium">{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Discount (%):</span>
                  <Input 
                    type="number" 
                    value={globalDiscount} 
                    onChange={(e) => setGlobalDiscount(Number(e.target.value))}
                    className="w-24 h-8 text-right"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount Amount:</span>
                  <span className="text-red-600">-{discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxable Amount:</span>
                  <span>{taxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT ({taxRate}%):</span>
                  <span>{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Shipping Cost:</span>
                  <Input 
                    type="number" 
                    value={shippingCost} 
                    onChange={(e) => setShippingCost(Number(e.target.value))}
                    className="w-24 h-8 text-right"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span className="text-purple-600">{grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" data-testid="save-quotation-btn">
              <Save className="h-4 w-4 mr-2" />
              Save Quotation
            </Button>
          </div>
        </form>
      </div>
    </ProjectLayout>
  )
}
