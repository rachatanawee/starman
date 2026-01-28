'use client'

import { Button } from '@/components/ui/button'
import { Plus, Filter, X, User, Clock, Package, Truck, CheckCircle, XCircle, FileText, BookOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { DataGridRowHeightMenu } from '@/components/tablecn/data-grid/data-grid-row-height-menu'
import { DataGridSortMenu } from '@/components/tablecn/data-grid/data-grid-sort-menu'
import { DataGridViewMenu } from '@/components/tablecn/data-grid/data-grid-view-menu'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { useWindowSize } from '@/components/tablecn/hooks/use-window-size'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/components/filter-panel'
import { DateRangeFilter } from '@/components/date-range-filter'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

interface SalesOrder {
  id: string
  orderNumber: string
  customer: string
  date: string
  deliveryDate: string
  amount: number
  status: string
  items: number
}

const mockData: SalesOrder[] = [
  { id: '1', orderNumber: 'SO-2026-001', customer: 'Acme Corp', date: '2026/01/15', deliveryDate: '2026/01/20', amount: 15000, status: 'Confirmed', items: 5 },
  { id: '2', orderNumber: 'SO-2026-002', customer: 'Tech Solutions', date: '2026/01/16', deliveryDate: '2026/01/22', amount: 28500, status: 'Processing', items: 8 },
  { id: '3', orderNumber: 'SO-2026-003', customer: 'Global Industries', date: '2026/01/17', deliveryDate: '2026/01/25', amount: 42000, status: 'Pending', items: 12 },
  { id: '4', orderNumber: 'SO-2026-004', customer: 'Smart Systems', date: '2026/01/18', deliveryDate: '2026/01/23', amount: 19800, status: 'Completed', items: 6 },
  { id: '5', orderNumber: 'SO-2026-005', customer: 'Digital Dynamics', date: '2026/01/19', deliveryDate: '2026/01/26', amount: 33600, status: 'Shipped', items: 10 },
  { id: '6', orderNumber: 'SO-2026-006', customer: 'Innovate Ltd', date: '2026/01/20', deliveryDate: '2026/01/27', amount: 25000, status: 'Processing', items: 7 },
  { id: '7', orderNumber: 'SO-2026-007', customer: 'Future Tech', date: '2026/01/21', deliveryDate: '2026/01/28', amount: 18500, status: 'Draft', items: 4 },
  { id: '8', orderNumber: 'SO-2026-008', customer: 'Mega Corp', date: '2026/01/22', deliveryDate: '2026/01/30', amount: 52000, status: 'Completed', items: 15 },
  { id: '9', orderNumber: 'SO-2026-009', customer: 'Prime Solutions', date: '2026/01/23', deliveryDate: '2026/01/31', amount: 31200, status: 'Shipped', items: 9 },
  { id: '10', orderNumber: 'SO-2026-010', customer: 'Alpha Industries', date: '2026/01/24', deliveryDate: '2026/02/01', amount: 22500, status: 'Confirmed', items: 6 },
  { id: '11', orderNumber: 'SO-2026-011', customer: 'Beta Systems', date: '2026/01/25', deliveryDate: '2026/02/02', amount: 38000, status: 'Completed', items: 11 },
  { id: '12', orderNumber: 'SO-2026-012', customer: 'Gamma Tech', date: '2026/01/26', deliveryDate: '2026/02/03', amount: 16800, status: 'Pending', items: 5 },
  { id: '13', orderNumber: 'SO-2026-013', customer: 'Delta Corp', date: '2026/01/27', deliveryDate: '2026/02/05', amount: 45000, status: 'Shipped', items: 13 },
  { id: '14', orderNumber: 'SO-2026-014', customer: 'Epsilon Ltd', date: '2026/01/28', deliveryDate: '2026/02/06', amount: 27500, status: 'Processing', items: 8 },
  { id: '15', orderNumber: 'SO-2026-015', customer: 'Zeta Industries', date: '2026/01/29', deliveryDate: '2026/02/07', amount: 35000, status: 'Completed', items: 10 },
  { id: '16', orderNumber: 'SO-2026-016', customer: 'Omega Solutions', date: '2026/01/30', deliveryDate: '2026/02/08', amount: 29800, status: 'Draft', items: 7 },
  { id: '17', orderNumber: 'SO-2026-017', customer: 'Nexus Corp', date: '2026/01/31', deliveryDate: '2026/02/09', amount: 41000, status: 'Confirmed', items: 12 },
  { id: '18', orderNumber: 'SO-2026-018', customer: 'Vertex Systems', date: '2026/02/01', deliveryDate: '2026/02/10', amount: 23500, status: 'Shipped', items: 6 },
  { id: '19', orderNumber: 'SO-2026-019', customer: 'Quantum Tech', date: '2026/02/02', deliveryDate: '2026/02/12', amount: 36000, status: 'Completed', items: 10 },
  { id: '20', orderNumber: 'SO-2026-020', customer: 'Stellar Industries', date: '2026/02/03', deliveryDate: '2026/02/13', amount: 48500, status: 'Processing', items: 14 },
  { id: '21', orderNumber: 'SO-2026-021', customer: 'Horizon Ltd', date: '2026/02/04', deliveryDate: '2026/02/14', amount: 21000, status: 'Pending', items: 5 },
  { id: '22', orderNumber: 'SO-2026-022', customer: 'Apex Solutions', date: '2026/02/05', deliveryDate: '2026/02/15', amount: 32500, status: 'Shipped', items: 9 },
  { id: '23', orderNumber: 'SO-2026-023', customer: 'Pinnacle Corp', date: '2026/02/06', deliveryDate: '2026/02/16', amount: 26800, status: 'Completed', items: 7 },
  { id: '24', orderNumber: 'SO-2026-024', customer: 'Summit Tech', date: '2026/02/07', deliveryDate: '2026/02/17', amount: 39000, status: 'Confirmed', items: 11 },
  { id: '25', orderNumber: 'SO-2026-025', customer: 'Zenith Industries', date: '2026/02/08', deliveryDate: '2026/02/18', amount: 44500, status: 'Shipped', items: 13 },
]

const statuses = ['Draft', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Completed', 'Cancelled']

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Draft': return <FileText className="h-4 w-4 text-gray-600" />
    case 'Pending': return <Clock className="h-4 w-4 text-yellow-600" />
    case 'Confirmed': return <CheckCircle className="h-4 w-4 text-blue-600" />
    case 'Processing': return <Package className="h-4 w-4 text-blue-600" />
    case 'Shipped': return <Truck className="h-4 w-4 text-purple-600" />
    case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'Cancelled': return <XCircle className="h-4 w-4 text-red-600" />
    default: return null
  }
}

export default function SalesOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })

  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    orderNumber: '',
    status: 'all',
    customer: '',
    dateFrom: '',
    dateTo: ''
  })

  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'salesOrder',
    initialCriteria: {
      orderNumber: '',
      status: 'all',
      customer: '',
      dateFrom: '',
      dateTo: ''
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Order Number
          </Label>
          <Input
            data-testid="filter-order-number"
            placeholder="Search order..."
            value={criteria.orderNumber}
            onChange={(e) => setCriteria('orderNumber', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Status
          </Label>
          <Select value={criteria.status} onValueChange={(v) => setCriteria('status', v)}>
            <SelectTrigger data-testid="filter-status" className="h-9">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Draft">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  Draft
                </div>
              </SelectItem>
              <SelectItem value="Pending">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  Pending
                </div>
              </SelectItem>
              <SelectItem value="Confirmed">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Confirmed
                </div>
              </SelectItem>
              <SelectItem value="Processing">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  Processing
                </div>
              </SelectItem>
              <SelectItem value="Shipped">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-purple-600" />
                  Shipped
                </div>
              </SelectItem>
              <SelectItem value="Completed">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Completed
                </div>
              </SelectItem>
              <SelectItem value="Cancelled">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Cancelled
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <User className="h-3 w-3" />
            Customer
          </Label>
          <Input
            data-testid="filter-customer"
            placeholder="Search customer..."
            value={criteria.customer}
            onChange={(e) => setCriteria('customer', e.target.value)}
            className="h-9"
          />
        </div>
        <DateRangeFilter
          dateFrom={criteria.dateFrom}
          dateTo={criteria.dateTo}
          onDateFromChange={(value) => setCriteria('dateFrom', value)}
          onDateToChange={(value) => setCriteria('dateTo', value)}
        />
      </div>
    ),
    renderBadges: (criteria, setCriteria) => (
      <>
        {criteria.orderNumber && (
          <Badge variant="outline" className="gap-1">
            Order: {criteria.orderNumber}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('orderNumber', ''); }} />
          </Badge>
        )}
        {criteria.status !== 'all' && (
          <Badge variant="outline" className="gap-1">
            Status: {criteria.status}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('status', 'all'); }} />
          </Badge>
        )}
        {criteria.customer && (
          <Badge variant="outline" className="gap-1">
            Customer: {criteria.customer}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('customer', ''); }} />
          </Badge>
        )}
        {criteria.dateFrom && (
          <Badge variant="outline" className="gap-1">
            From: {criteria.dateFrom}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('dateFrom', ''); }} />
          </Badge>
        )}
        {criteria.dateTo && (
          <Badge variant="outline" className="gap-1">
            To: {criteria.dateTo}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('dateTo', ''); }} />
          </Badge>
        )}
      </>
    )
  }

  const filteredData = React.useMemo(() => {
    return mockData.filter(order => {
      const matchesOrderNumber = !filterCriteria.orderNumber || order.orderNumber.toLowerCase().includes(filterCriteria.orderNumber.toLowerCase())
      const matchesStatus = filterCriteria.status === 'all' || order.status === filterCriteria.status
      const matchesCustomer = !filterCriteria.customer || order.customer.toLowerCase().includes(filterCriteria.customer.toLowerCase())
      const orderDate = order.date.replace(/\//g, '-')
      const matchesDateFrom = !filterCriteria.dateFrom || orderDate >= filterCriteria.dateFrom
      const matchesDateTo = !filterCriteria.dateTo || orderDate <= filterCriteria.dateTo
      return matchesOrderNumber && matchesStatus && matchesCustomer && matchesDateFrom && matchesDateTo
    })
  }, [filterCriteria])

  const [data, setData] = React.useState<SalesOrder[]>(filteredData)

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const totalAmount = React.useMemo(() => {
    return filteredData.reduce((sum, order) => sum + order.amount, 0)
  }, [filteredData])

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
            className="text-blue-600 hover:underline pl-2"
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
        id: 'deliveryDate',
        accessorKey: 'deliveryDate',
        header: 'Delivery',
        minSize: 110,
        meta: { label: 'Delivery Date', cell: { variant: 'short-text' } },
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
        minSize: 80,
        meta: { label: 'Status', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  {getStatusIcon(row.original.status)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.status}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
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
    [params.locale, projectId, router]
  )

  const { table, ...dataGridProps } = useDataGrid({
    columns,
    data,
    onDataChange: setData,
    getRowId: (row) => row.id,
    enableSearch: true,
  })

  const height = Math.max(400, windowSize.height - 200)

  return (
    <ProjectLayout projectId={projectId}>
      <div className="w-full h-full">
        <div className="p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-3 lg:space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Sales Order</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage customer orders</p>
              </div>
              <div className="flex gap-2">
                <Link href="/guide?tab=sales&section=sales-order">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
                <Button 
                  data-testid="new-order-button"
                  className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto sm:shrink-0 sm:min-w-fit shadow-md hover:shadow-lg transition-shadow" 
                  onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-order/new`)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>New Order</span>
                </Button>
              </div>
            </div>
          </div>

        <div className="w-full">
          <FilterPanel
            config={filterConfig}
            criteria={filterCriteria}
            onCriteriaChange={setFilterCriteria}
          />
        </div>

        <div className="flex flex-col gap-3 sm:gap-3 text-sm w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div data-testid="total-amount" className="bg-gradient-to-r from-purple-50 to-blue-50 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
              <span className="text-xs sm:text-sm text-gray-600">Total Amount: </span>
              <span className="text-base sm:text-lg font-bold text-purple-600">{totalAmount.toLocaleString()}</span>
            </div>
            <div role="toolbar" className="flex items-center gap-2 shrink-0">
              <DataGridSortMenu table={table} align="end" />
              <DataGridRowHeightMenu table={table} align="end" />
              <DataGridViewMenu table={table} align="end" />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <DataGrid data-testid="sales-order-grid" {...dataGridProps} table={table} height={height} />
          </div>
        </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
