'use client'

import { ProjectLayout } from '@/lib/common-exports'
import { Button } from '@/components/ui/button'
import { Plus, Filter, X, Clock, Package, CheckCircle, XCircle, FileText, BookOpen, AlertTriangle, ShieldAlert, ShoppingBag } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@spark/core'
import { DateRangeFilter } from '@spark/core'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { mockPurchaseOrders, mockAIAlerts, type PurchaseOrder } from '@/lib/mock-data'
import { DynamicTitle } from '@spark/core'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'draft': return <FileText className="h-4 w-4 text-gray-600" />
    case 'issued': return <Clock className="h-4 w-4 text-blue-600" />
    case 'partially_received': return <Package className="h-4 w-4 text-yellow-600" />
    case 'received': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />
    default: return null
  }
}

export default function PurchasingPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })

  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    poNumber: '',
    status: 'all',
    vendor: '',
    dateFrom: '',
    dateTo: ''
  })

  const [showAlerts, setShowAlerts] = React.useState(true)

  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'purchasing',
    initialCriteria: {
      poNumber: '',
      status: 'all',
      vendor: '',
      dateFrom: '',
      dateTo: ''
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            PO Number
          </Label>
          <Input
            placeholder="Search PO..."
            value={criteria.poNumber}
            onChange={(e) => setCriteria('poNumber', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Status
          </Label>
          <Select value={criteria.status} onValueChange={(v) => setCriteria('status', v)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="issued">Issued</SelectItem>
              <SelectItem value="partially_received">Partially Received</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Vendor</Label>
          <Input
            placeholder="Search vendor..."
            value={criteria.vendor}
            onChange={(e) => setCriteria('vendor', e.target.value)}
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
        {criteria.poNumber && (
          <Badge variant="outline" className="gap-1">
            PO: {criteria.poNumber}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('poNumber', ''); }} />
          </Badge>
        )}
        {criteria.status !== 'all' && (
          <Badge variant="outline" className="gap-1">
            Status: {criteria.status}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('status', 'all'); }} />
          </Badge>
        )}
        {criteria.vendor && (
          <Badge variant="outline" className="gap-1">
            Vendor: {criteria.vendor}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('vendor', ''); }} />
          </Badge>
        )}
      </>
    )
  }

  const filteredData = React.useMemo(() => {
    return mockPurchaseOrders.filter(po => {
      const matchesPO = !filterCriteria.poNumber || po.poNumber.toLowerCase().includes(filterCriteria.poNumber.toLowerCase())
      const matchesStatus = filterCriteria.status === 'all' || po.status === filterCriteria.status
      const matchesVendor = !filterCriteria.vendor || po.vendorName.toLowerCase().includes(filterCriteria.vendor.toLowerCase())
      const matchesDateFrom = !filterCriteria.dateFrom || po.poDate >= filterCriteria.dateFrom
      const matchesDateTo = !filterCriteria.dateTo || po.poDate <= filterCriteria.dateTo
      return matchesPO && matchesStatus && matchesVendor && matchesDateFrom && matchesDateTo
    })
  }, [filterCriteria])

  const [data, setData] = React.useState<PurchaseOrder[]>(filteredData)

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const totalAmount = React.useMemo(() => {
    return filteredData.reduce((sum, po) => sum + po.grandTotal, 0)
  }, [filteredData])

  const columns = React.useMemo<ColumnDef<PurchaseOrder>[]>(
    () => [
      {
        id: 'poNumber',
        accessorKey: 'poNumber',
        header: 'PO Number',
        minSize: 120,
        meta: { label: 'PO Number', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <button
            onClick={() => router.push(`/${params.locale}/company/${projectId}/purchasing/${row.original.id}`)}
            className="text-blue-600 hover:underline pl-2"
          >
            {row.original.poNumber}
          </button>
        ),
      },
      {
        id: 'vendorName',
        accessorKey: 'vendorName',
        header: 'Vendor',
        minSize: 180,
        meta: { label: 'Vendor', cell: { variant: 'short-text' } },
      },
      {
        id: 'poDate',
        accessorKey: 'poDate',
        header: 'PO Date',
        minSize: 110,
        meta: { label: 'PO Date', cell: { variant: 'short-text' } },
      },
      {
        id: 'deliveryDate',
        accessorKey: 'deliveryDate',
        header: 'Delivery',
        minSize: 110,
        meta: { label: 'Delivery Date', cell: { variant: 'short-text' } },
      },
      {
        id: 'grandTotal',
        accessorKey: 'grandTotal',
        header: 'Amount',
        minSize: 100,
        meta: { label: 'Amount', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">฿{row.original.grandTotal.toLocaleString()}</div>
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
                <p>{row.original.status.replace('_', ' ')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
      <DynamicTitle pageTitle="Purchasing" />
      <div className="w-full h-full">
        <div className="p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-3 lg:space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                  Purchasing
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">The Gatekeeper - Control every baht going out 💸</p>
              </div>
              <div className="flex gap-2">
                <Link href="/guide?tab=materials">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
                <Button
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto sm:shrink-0 sm:min-w-fit shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/${params.locale}/company/${projectId}/purchasing/new`)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>New PO</span>
                </Button>
              </div>
            </div>
          </div>

          {mockAIAlerts.length > 0 && showAlerts && (
            <Card className="border-primary/20 bg-red-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    AI Gatekeeper Alerts ({mockAIAlerts.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAlerts(false)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockAIAlerts.map(alert => (
                  <div key={alert.id} className={`border rounded-lg p-3 ${alert.severity === 'critical' ? 'bg-red-100 border-red-300' : 'bg-yellow-50 border-yellow-300'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{alert.title}</p>
                        <p className="text-xs mt-1">{alert.message}</p>
                      </div>
                      {alert.action && (
                        <Button size="sm" variant="destructive" className="ml-2">
                          {alert.action.label}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="w-full">
            <FilterPanel
              config={filterConfig}
              criteria={filterCriteria}
              onCriteriaChange={setFilterCriteria}
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-3 text-sm w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
                <span className="text-xs sm:text-sm text-gray-600">Total Amount: </span>
                <span className="text-base sm:text-lg font-bold text-primary">฿{totalAmount.toLocaleString()}</span>
              </div>
              <div role="toolbar" className="flex items-center gap-2 shrink-0">
                <DataGridSortMenu table={table} align="end" />
                <DataGridRowHeightMenu table={table} align="end" />
                <DataGridViewMenu table={table} align="end" />
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <DataGrid {...dataGridProps} table={table} height={height} />
            </div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
