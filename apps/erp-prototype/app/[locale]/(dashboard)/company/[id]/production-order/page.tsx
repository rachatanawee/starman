'use client'

import { useState, useMemo } from 'react'
import { ProjectLayout } from '@/lib/common-exports'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Factory, Search, Filter, X, Clock, Package, AlertCircle, CheckCircle2, PlayCircle, ShoppingCart, FileText, GitBranch, Warehouse, Edit, Eye, BookOpen, Calendar, MoreVertical, Download, Printer, RefreshCw, ArrowUpDown, ChevronDown, Maximize } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { mockProductionOrders, ProductionOrder, ProductionStatus } from '@/lib/mock-data'
import { useTranslations } from 'next-intl'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/react-table'
import { DynamicTitle } from '@spark/core'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@spark/core'

const statusConfig: Record<ProductionStatus, { label: string; color: string; icon: any }> = {
  created: { label: 'Created', color: 'bg-gray-500', icon: Clock },
  released: { label: 'Released', color: 'bg-blue-500', icon: PlayCircle },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500', icon: Factory },
  completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'bg-primary/50', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: X }
}

const priorityConfig = {
  normal: { label: 'Normal', color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-400' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800', dotColor: 'bg-orange-500' },
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' }
}

export default function ProductionOrderPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const locale = params.locale as string
  const t = useTranslations('productionOrder')
  
  const [orders] = useState<ProductionOrder[]>(mockProductionOrders)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  const getProgress = (order: ProductionOrder) => {
    if (order.plannedQuantity === 0) return 0
    return Math.round((order.producedQuantity / order.plannedQuantity) * 100)
  }

  const handleStatusChange = (orderId: string, newStatus: ProductionStatus) => {
    console.log(`Changing order ${orderId} to status ${newStatus}`)
    // In real app, this would call an API
  }

  const handleExport = () => {
    console.log('Exporting production orders...')
    // In real app, this would export to CSV/Excel
  }

  const handlePrint = () => {
    window.print()
  }

  const columns: ColumnDef<ProductionOrder>[] = [
    {
      accessorKey: 'orderNumber',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-primary/5"
          >
            Order Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const order = row.original
        return (
          <div className="font-medium">
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">{order.orderNumber}</span>
              {order.salesOrderIds.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  {order.salesOrderIds.length} SO
                </Badge>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'productName',
      header: 'Product',
      cell: ({ row }) => {
        const order = row.original
        return (
          <div>
            <div className="font-medium">{order.productName}</div>
            <div className="text-xs text-gray-500">SKU: {order.productSku}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        const StatusIcon = statusConfig[status].icon
        return (
          <Badge className={`${statusConfig[status].color} text-white`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {t(status)}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value === 'all' || row.getValue(id) === value
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.original.priority
        return (
          <Badge className={priorityConfig[priority].color}>
            <span className={`h-2 w-2 rounded-full ${priorityConfig[priority].dotColor} mr-1.5`} />
            {t(priority)}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'plannedQuantity',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-primary/5"
          >
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const order = row.original
        const progress = getProgress(order)
        return (
          <div className="min-w-[180px]">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>{order.producedQuantity} / {order.plannedQuantity}</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {order.scrapQuantity > 0 && (
              <div className="text-xs text-orange-600 mt-1">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                Scrap: {order.scrapQuantity}
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-primary/5"
          >
            Due Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const dueDate = new Date(row.original.dueDate)
        const today = new Date()
        const isOverdue = dueDate < today && row.original.status !== 'completed' && row.original.status !== 'closed'
        const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        
        return (
          <div>
            <div className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {dueDate.toLocaleDateString()}
            </div>
            {isOverdue && (
              <div className="text-xs text-red-600">Overdue</div>
            )}
            {!isOverdue && daysUntilDue <= 3 && row.original.status !== 'completed' && (
              <div className="text-xs text-orange-600">{daysUntilDue} days left</div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'materials',
      header: 'Resources',
      cell: ({ row }) => {
        const order = row.original
        return (
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center gap-1">
              <Warehouse className="h-3 w-3" />
              {order.materials.length} materials
            </div>
            <div className="flex items-center gap-1">
              <Factory className="h-3 w-3" />
              {order.operations.length} operations
            </div>
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/${locale}/company/${projectId}/production-order/${order.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/${locale}/company/${projectId}/production-order/${order.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Order
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              {order.status === 'created' && (
                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'released')}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Release Order
                </DropdownMenuItem>
              )}
              {order.status === 'released' && (
                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'in_progress')}>
                  <Factory className="h-4 w-4 mr-2" />
                  Start Production
                </DropdownMenuItem>
              )}
              {order.status === 'in_progress' && (
                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'completed')}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Completed
                </DropdownMenuItem>
              )}
              {order.status === 'completed' && (
                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'closed')}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Close Order
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(order.id, 'cancelled')}>
                <X className="h-4 w-4 mr-2" />
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filteredData = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter
      return matchesStatus && matchesPriority
    })
  }, [orders, statusFilter, priorityFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  const stats = {
    total: orders.length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'created' || o.status === 'released').length
  }

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Production Order" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              {t('title')}
            </h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/guide?tab=production&section=production-order">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('learnMore')}
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              onClick={() => router.push(`/${locale}/company/${projectId}/production-order/new`)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('newProductionOrder')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('totalOrders')}</p>
                  <p className="text-3xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Factory className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('inProgress')}</p>
                  <p className="text-3xl font-bold mt-1">{stats.inProgress}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('completed')}</p>
                  <p className="text-3xl font-bold mt-1">{stats.completed}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('pending')}</p>
                  <p className="text-3xl font-bold mt-1">{stats.pending}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-primary" />
                Production Orders
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                >
                  {viewMode === 'table' ? 'Card View' : 'Table View'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by order number, product name, or SKU..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {globalFilter && (
                    <button
                      onClick={() => setGlobalFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="released">Released</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(globalFilter || statusFilter !== 'all' || priorityFilter !== 'all') && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Showing {table.getFilteredRowModel().rows.length} of {orders.length} orders
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setGlobalFilter('')
                      setStatusFilter('all')
                      setPriorityFilter('all')
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className="hover:bg-primary/5 cursor-pointer"
                        onClick={() => router.push(`/${locale}/company/${projectId}/production-order/${row.original.id}`)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Factory className="h-12 w-12 mb-3 text-gray-400" />
                          <p>No production orders found</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={() => {
                              setGlobalFilter('')
                              setStatusFilter('all')
                              setPriorityFilter('all')
                            }}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-gray-600">
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="text-sm text-gray-600">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
