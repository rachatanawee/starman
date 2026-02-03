'use client'

import { useState, useMemo, useEffect } from 'react'
import { ProjectLayout } from '@/lib/common-exports'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, Package, AlertCircle, CheckCircle2, Info, XCircle, Sparkles, HelpCircle, Search, Filter, Trash2, Undo2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { ColumnDef } from '@tanstack/react-table'

type SampleData = {
  id: number
  order: string
  customer: string
  amount: number
  status: string
}

const sampleData: SampleData[] = [
  { id: 1, order: 'SO-001', customer: 'ABC Corp', amount: 125000, status: 'Pending' },
  { id: 2, order: 'SO-002', customer: 'XYZ Ltd', amount: 89500, status: 'Completed' },
  { id: 3, order: 'SO-003', customer: 'Tech Inc', amount: 156000, status: 'Pending' },
  { id: 4, order: 'SO-004', customer: 'Global Co', amount: 203000, status: 'Completed' },
]

export default function UIPatternsPage() {
  const params = useParams()
  const projectId = params.id as string
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [activeTab, setActiveTab] = useState('basics')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [showInlineConfirm, setShowInlineConfirm] = useState(false)
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const filteredData = useMemo(() => {
    return statusFilter === 'all' 
      ? sampleData 
      : sampleData.filter(item => item.status.toLowerCase() === statusFilter)
  }, [statusFilter])

  const [data, setData] = useState<SampleData[]>(filteredData)

  useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const columns = useMemo<ColumnDef<SampleData>[]>(() => [
    { accessorKey: 'order', header: 'Order No.' },
    { accessorKey: 'customer', header: 'Customer' },
    { 
      accessorKey: 'amount', 
      header: 'Amount',
      cell: ({ row }) => `฿${row.original.amount.toLocaleString()}`
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: ({ row }) => (
        <Badge className={row.original.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}>
          {row.original.status}
        </Badge>
      )
    },
  ], [])

  const { table, ...dataGridProps } = useDataGrid({
    columns,
    data,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    enableSorting: true,
  })

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          UI Patterns Demo
        </h1>
        <p className="text-gray-600 mt-1">Standard UI patterns for the template</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basic Patterns</TabsTrigger>
          <TabsTrigger value="data">Data & Tables</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & States</TabsTrigger>
          <TabsTrigger value="forms">Forms & Input</TabsTrigger>
        </TabsList>

        {/* Basic Patterns Tab */}
        <TabsContent value="basics" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tabs Pattern</CardTitle>
              <CardDescription>Display multiple sections in one page</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList>
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Product Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium">PRD-001</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Recent activity logs...</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Configuration options...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
              <CardDescription>Expand details without navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4" />
                      <span>Order #SO-2024-001</span>
                      <Badge>Pending</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-7 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer:</span>
                        <span>ABC Company</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Side Drawer</CardTitle>
              <CardDescription>Quick view details without navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
            </CardContent>
          </Card>

          {drawerOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setDrawerOpen(false)}
              />
              <div className="fixed top-0 right-0 bottom-0 w-96 bg-white z-50 shadow-xl overflow-y-auto">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Order Details</h2>
                    <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Order Number</p>
                      <p className="font-bold text-lg">#SO-2024-001</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Popover</CardTitle>
              <CardDescription>Show additional info on click</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Click for Info
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Additional Information</h4>
                    <p className="text-sm text-gray-600">
                      This is a popover with detailed information.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data & Tables Tab */}
        <TabsContent value="data" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Grid (Table)</CardTitle>
              <CardDescription>Display tabular data with sorting</CardDescription>
            </CardHeader>
            <CardContent>
              <DataGrid {...dataGridProps} table={table} height={400} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter Component</CardTitle>
              <CardDescription>Filter data with dropdowns and inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Status Filter</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search orders..." className="pl-10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-600">Showing {filteredData.length} of {sampleData.length} orders</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback & States Tab */}
        <TabsContent value="feedback" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Empty States</CardTitle>
              <CardDescription>Display when no data available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => setHasData(!hasData)} variant="outline">
                Toggle Data
              </Button>
              
              {hasData ? (
                <div className="border rounded-lg p-4">
                  <p className="text-sm">5 items found</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get started by creating your first order
                  </p>
                  <Button>Create Order</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Display while loading data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={simulateLoading} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Trigger Loading'
                )}
              </Button>

              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              ) : (
                <div className="border rounded-lg p-4">
                  <p className="text-sm">Content loaded successfully</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
              <CardDescription>Feedback after actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => toast('Your changes have been saved.')}>
                  Default Toast
                </Button>
                <Button variant="outline" onClick={() => toast.success('Order created successfully.')}>
                  Success
                </Button>
                <Button variant="destructive" onClick={() => toast.error('Something went wrong.')}>
                  Error
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confirmation Patterns</CardTitle>
              <CardDescription>Different ways to confirm actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">1. Inline Confirmation (Recommended)</h4>
                <p className="text-xs text-gray-600 mb-3">Best for: Non-critical deletes, undo available</p>
                {showInlineConfirm ? (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm flex-1">Delete this item?</span>
                    <Button size="sm" variant="destructive" onClick={() => {
                      toast.success('Item deleted')
                      setShowInlineConfirm(false)
                    }}>
                      Confirm
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowInlineConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button variant="destructive" onClick={() => setShowInlineConfirm(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Item
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">2. Toast with Undo</h4>
                <p className="text-xs text-gray-600 mb-3">Best for: Quick actions with undo option</p>
                <Button variant="destructive" onClick={() => {
                  toast.success('Item deleted', {
                    action: {
                      label: 'Undo',
                      onClick: () => toast.info('Item restored')
                    },
                    duration: 5000
                  })
                }}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete with Undo
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">3. Alert Dialog</h4>
                <p className="text-xs text-gray-600 mb-3">Best for: Critical actions, permanent deletes</p>
                <Button variant="destructive" onClick={() => setShowAlertDialog(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Permanently
                </Button>
              </div>
            </CardContent>
          </Card>

          {showAlertDialog && (
            <>
              <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAlertDialog(false)} />
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 w-96 shadow-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Delete Order?</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      This will permanently delete order #SO-001 and all related data. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setShowAlertDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => {
                    toast.success('Order deleted permanently')
                    setShowAlertDialog(false)
                  }}>
                    Delete Permanently
                  </Button>
                </div>
              </div>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Inline Alerts</CardTitle>
              <CardDescription>In-page notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is an informational message.</AlertDescription>
              </Alert>

              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Warning</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Please review your settings before proceeding.
                </AlertDescription>
              </Alert>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your order has been processed successfully.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forms & Input Tab */}
        <TabsContent value="forms" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Inputs</CardTitle>
              <CardDescription>Standard form input patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="search" placeholder="Search..." className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multi-step Form</CardTitle>
              <CardDescription>Multi-step forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>1</div>
                    <span className={currentStep >= 1 ? 'font-medium' : 'text-gray-600'}>Basic Info</span>
                  </div>
                  <div className={`flex-1 h-px mx-4 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>2</div>
                    <span className={currentStep >= 2 ? 'font-medium' : 'text-gray-600'}>Details</span>
                  </div>
                  <div className={`flex-1 h-px mx-4 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>3</div>
                    <span className={currentStep >= 3 ? 'font-medium' : 'text-gray-600'}>Review</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  {currentStep === 1 && <p className="text-sm text-gray-600">Step 1: Enter basic information...</p>}
                  {currentStep === 2 && <p className="text-sm text-gray-600">Step 2: Add detailed information...</p>}
                  {currentStep === 3 && <p className="text-sm text-gray-600">Step 3: Review and submit...</p>}
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={() => {
                      if (currentStep < 3) {
                        setCurrentStep(currentStep + 1)
                      } else {
                        toast.success('Form submitted!')
                        setCurrentStep(1)
                      }
                    }}
                  >
                    {currentStep === 3 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </ProjectLayout>
  )
}
