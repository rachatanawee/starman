'use client'

import { Button } from '@/components/ui/button'
import { Plus, Filter, X, Calendar, User, ChevronDown, Save, FolderOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { DataGridRowHeightMenu } from '@/components/tablecn/data-grid/data-grid-row-height-menu'
import { DataGridSortMenu } from '@/components/tablecn/data-grid/data-grid-sort-menu'
import { DataGridViewMenu } from '@/components/tablecn/data-grid/data-grid-view-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { useWindowSize } from '@/components/tablecn/hooks/use-window-size'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

interface SalesOrder {
  id: string
  orderNumber: string
  customer: string
  date: string
  amount: number
  status: string
  items: number
}

const mockData: SalesOrder[] = [
  { id: '1', orderNumber: 'SO-2024-001', customer: 'Acme Corp', date: '2024/01/15', amount: 15000, status: 'Completed', items: 5 },
  { id: '2', orderNumber: 'SO-2024-002', customer: 'Tech Solutions', date: '2024/01/16', amount: 28500, status: 'Processing', items: 8 },
  { id: '3', orderNumber: 'SO-2024-003', customer: 'Global Industries', date: '2024/01/17', amount: 42000, status: 'Pending', items: 12 },
  { id: '4', orderNumber: 'SO-2024-004', customer: 'Smart Systems', date: '2024/01/18', amount: 19800, status: 'Completed', items: 6 },
  { id: '5', orderNumber: 'SO-2024-005', customer: 'Digital Dynamics', date: '2024/01/19', amount: 33600, status: 'Shipped', items: 10 },
  { id: '6', orderNumber: 'SO-2024-006', customer: 'Innovate Ltd', date: '2024/01/20', amount: 25000, status: 'Processing', items: 7 },
  { id: '7', orderNumber: 'SO-2024-007', customer: 'Future Tech', date: '2024/01/21', amount: 18500, status: 'Pending', items: 4 },
  { id: '8', orderNumber: 'SO-2024-008', customer: 'Mega Corp', date: '2024/01/22', amount: 52000, status: 'Completed', items: 15 },
  { id: '9', orderNumber: 'SO-2024-009', customer: 'Prime Solutions', date: '2024/01/23', amount: 31200, status: 'Shipped', items: 9 },
  { id: '10', orderNumber: 'SO-2024-010', customer: 'Alpha Industries', date: '2024/01/24', amount: 22500, status: 'Processing', items: 6 },
  { id: '11', orderNumber: 'SO-2024-011', customer: 'Beta Systems', date: '2024/01/25', amount: 38000, status: 'Completed', items: 11 },
  { id: '12', orderNumber: 'SO-2024-012', customer: 'Gamma Tech', date: '2024/01/26', amount: 16800, status: 'Pending', items: 5 },
  { id: '13', orderNumber: 'SO-2024-013', customer: 'Delta Corp', date: '2024/01/27', amount: 45000, status: 'Shipped', items: 13 },
  { id: '14', orderNumber: 'SO-2024-014', customer: 'Epsilon Ltd', date: '2024/01/28', amount: 27500, status: 'Processing', items: 8 },
  { id: '15', orderNumber: 'SO-2024-015', customer: 'Zeta Industries', date: '2024/01/29', amount: 35000, status: 'Completed', items: 10 },
  { id: '16', orderNumber: 'SO-2024-016', customer: 'Omega Solutions', date: '2024/01/30', amount: 29800, status: 'Pending', items: 7 },
  { id: '17', orderNumber: 'SO-2024-017', customer: 'Nexus Corp', date: '2024/01/31', amount: 41000, status: 'Processing', items: 12 },
  { id: '18', orderNumber: 'SO-2024-018', customer: 'Vertex Systems', date: '2024/02/01', amount: 23500, status: 'Shipped', items: 6 },
  { id: '19', orderNumber: 'SO-2024-019', customer: 'Quantum Tech', date: '2024/02/02', amount: 36000, status: 'Completed', items: 10 },
  { id: '20', orderNumber: 'SO-2024-020', customer: 'Stellar Industries', date: '2024/02/03', amount: 48500, status: 'Processing', items: 14 },
  { id: '21', orderNumber: 'SO-2024-021', customer: 'Horizon Ltd', date: '2024/02/04', amount: 21000, status: 'Pending', items: 5 },
  { id: '22', orderNumber: 'SO-2024-022', customer: 'Apex Solutions', date: '2024/02/05', amount: 32500, status: 'Shipped', items: 9 },
  { id: '23', orderNumber: 'SO-2024-023', customer: 'Pinnacle Corp', date: '2024/02/06', amount: 26800, status: 'Completed', items: 7 },
  { id: '24', orderNumber: 'SO-2024-024', customer: 'Summit Tech', date: '2024/02/07', amount: 39000, status: 'Processing', items: 11 },
  { id: '25', orderNumber: 'SO-2024-025', customer: 'Zenith Industries', date: '2024/02/08', amount: 44500, status: 'Shipped', items: 13 },
]

const statuses = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled']

export default function SalesOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [data, setData] = React.useState<SalesOrder[]>(mockData)
  const [statusFilter, setStatusFilter] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('salesOrder_statusFilter') || 'all'
    }
    return 'all'
  })
  const [customerFilter, setCustomerFilter] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('salesOrder_customerFilter') || ''
    }
    return ''
  })
  const [dateFrom, setDateFrom] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('salesOrder_dateFrom') || ''
    }
    return ''
  })
  const [dateTo, setDateTo] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('salesOrder_dateTo') || ''
    }
    return ''
  })
  const [isFilterOpen, setIsFilterOpen] = React.useState(true)
  const [savedFilters, setSavedFilters] = React.useState<Array<{name: string, filters: any}>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salesOrder_savedFilters')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [filterName, setFilterName] = React.useState('')
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false)
  const [isLoadDialogOpen, setIsLoadDialogOpen] = React.useState(false)
  const windowSize = useWindowSize({ defaultHeight: 760 })

  React.useEffect(() => {
    localStorage.setItem('salesOrder_statusFilter', statusFilter)
  }, [statusFilter])

  React.useEffect(() => {
    localStorage.setItem('salesOrder_customerFilter', customerFilter)
  }, [customerFilter])

  React.useEffect(() => {
    localStorage.setItem('salesOrder_dateFrom', dateFrom)
  }, [dateFrom])

  React.useEffect(() => {
    localStorage.setItem('salesOrder_dateTo', dateTo)
  }, [dateTo])

  const filteredData = React.useMemo(() => {
    return mockData.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesCustomer = !customerFilter || order.customer.toLowerCase().includes(customerFilter.toLowerCase())
      const orderDate = order.date.replace(/\//g, '-')
      const matchesDateFrom = !dateFrom || orderDate >= dateFrom
      const matchesDateTo = !dateTo || orderDate <= dateTo
      return matchesStatus && matchesCustomer && matchesDateFrom && matchesDateTo
    })
  }, [statusFilter, customerFilter, dateFrom, dateTo])

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const hasActiveFilters = statusFilter !== 'all' || customerFilter || dateFrom || dateTo

  const clearFilters = () => {
    setStatusFilter('all')
    setCustomerFilter('')
    setDateFrom('')
    setDateTo('')
  }

  const totalAmount = React.useMemo(() => {
    return filteredData.reduce((sum, order) => sum + order.amount, 0)
  }, [filteredData])

  const saveFilter = () => {
    if (!filterName.trim()) return
    const newFilter = {
      name: filterName,
      filters: { statusFilter, customerFilter, dateFrom, dateTo }
    }
    const updated = [...savedFilters, newFilter]
    setSavedFilters(updated)
    localStorage.setItem('salesOrder_savedFilters', JSON.stringify(updated))
    setFilterName('')
    setIsSaveDialogOpen(false)
  }

  const loadFilter = (filters: any) => {
    setStatusFilter(filters.statusFilter)
    setCustomerFilter(filters.customerFilter)
    setDateFrom(filters.dateFrom)
    setDateTo(filters.dateTo)
    setIsLoadDialogOpen(false)
  }

  const deleteFilter = (index: number) => {
    const updated = savedFilters.filter((_, i) => i !== index)
    setSavedFilters(updated)
    localStorage.setItem('salesOrder_savedFilters', JSON.stringify(updated))
  }

  const columns = React.useMemo<ColumnDef<SalesOrder>[]>(
    () => [
      {
        id: 'orderNumber',
        accessorKey: 'orderNumber',
        header: 'Order Number',
        minSize: 120,
        meta: { label: 'Order Number', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <button
            onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-order/${row.original.id}`)}
            className="text-blue-600 hover:underline"
          >
            {row.original.orderNumber}
          </button>
        ),
      },
      {
        id: 'customer',
        accessorKey: 'customer',
        header: 'Customer',
        minSize: 150,
        meta: { label: 'Customer', cell: { variant: 'short-text' } },
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        minSize: 110,
        meta: { label: 'Date', cell: { variant: 'short-text' } },
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        minSize: 100,
        meta: { label: 'Amount', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.amount.toLocaleString()}</div>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        minSize: 110,
        meta: {
          label: 'Status',
          cell: {
            variant: 'select',
            options: statuses.map((s) => ({ label: s, value: s })),
          },
        },
      },
      {
        id: 'items',
        accessorKey: 'items',
        header: 'Items',
        minSize: 80,
        meta: { label: 'Items', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.items}</div>
        ),
      },
    ],
    []
  )

  const { table, ...dataGridProps } = useDataGrid({
    columns,
    data,
    onDataChange: setData,
    getRowId: (row) => row.id,
    initialState: { 
      rowHeight: 'sm'
    },
    enableSearch: true,
  })

  const height = Math.max(400, windowSize.height - 200)

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales Order</h1>
            <p className="text-gray-600 mt-1">Manage customer orders</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-order/new`)}>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {[statusFilter !== 'all', customerFilter, dateFrom, dateTo].filter(Boolean).length} active
                  </Badge>
                )}
                {!isFilterOpen && hasActiveFilters && (
                  <div className="flex items-center gap-2 ml-2 flex-wrap">
                    {statusFilter !== 'all' && (
                      <Badge variant="outline" className="gap-1">
                        Status: {statusFilter}
                        <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setStatusFilter('all'); }} />
                      </Badge>
                    )}
                    {customerFilter && (
                      <Badge variant="outline" className="gap-1">
                        Customer: {customerFilter}
                        <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCustomerFilter(''); }} />
                      </Badge>
                    )}
                    {dateFrom && (
                      <Badge variant="outline" className="gap-1">
                        From: {dateFrom}
                        <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setDateFrom(''); }} />
                      </Badge>
                    )}
                    {dateTo && (
                      <Badge variant="outline" className="gap-1">
                        To: {dateTo}
                        <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setDateTo(''); }} />
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <>
                    <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()} className="h-8 text-xs">
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Save Filter</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Filter name"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveFilter()}
                          />
                          <Button onClick={saveFilter} className="w-full">Save</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); clearFilters(); }} className="h-8 text-xs">
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  </>
                )}
                <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()} className="h-8 text-xs">
                      <FolderOpen className="h-3 w-3 mr-1" />
                      Load
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Load Saved Filter</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      {savedFilters.length === 0 ? (
                        <p className="text-sm text-gray-500">No saved filters</p>
                      ) : (
                        savedFilters.map((saved, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                            <button onClick={() => loadFilter(saved.filters)} className="flex-1 text-left">
                              {saved.name}
                            </button>
                            <Button variant="ghost" size="sm" onClick={() => deleteFilter(index)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>
          {isFilterOpen && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    Status
                  </Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Customer
                  </Label>
                  <Input
                    placeholder="Search customer..."
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    From Date
                  </Label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    To Date
                  </Label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-lg border">
              <span className="text-sm text-gray-600">Total Amount: </span>
              <span className="text-lg font-bold text-purple-600">{totalAmount.toLocaleString()}</span>
            </div>
            <div role="toolbar" className="flex items-center gap-2">
              <DataGridSortMenu table={table} align="end" />
              <DataGridRowHeightMenu table={table} align="end" />
              <DataGridViewMenu table={table} align="end" />
            </div>
          </div>
          <style jsx global>{`
            [data-slot='grid-header-cell'] > div { padding: 0.25rem 0.5rem !important; }
            [data-slot='grid-cell'] > div { padding: 0.25rem 0.5rem !important; }
          `}</style>
          <DataGrid {...dataGridProps} table={table} height={height} />
        </div>
      </div>
    </ProjectLayout>
  )
}
