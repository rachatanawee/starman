'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { Filter, X, ArrowLeft } from 'lucide-react'
import { mockDailyAllowanceSummary, DailyAllowanceSummary } from '@/lib/worker-allowance-data'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { DataGridRowHeightMenu } from '@/components/tablecn/data-grid/data-grid-row-height-menu'
import { DataGridSortMenu } from '@/components/tablecn/data-grid/data-grid-sort-menu'
import { DataGridViewMenu } from '@/components/tablecn/data-grid/data-grid-view-menu'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { useWindowSize } from '@/components/tablecn/hooks/use-window-size'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/components/filter-panel'
import { DateRangeFilter } from '@/components/date-range-filter'
import type { ColumnDef } from '@tanstack/react-table'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  paid: 'bg-blue-100 text-blue-800'
}

export default function WorkerAllowanceHistoryPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    workerName: '',
    status: 'all',
    dateFrom: '',
    dateTo: ''
  })

  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'workerAllowanceHistory',
    initialCriteria: {
      workerName: '',
      status: 'all',
      dateFrom: '',
      dateTo: ''
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Worker Name
          </Label>
          <Input
            placeholder="Search worker..."
            value={criteria.workerName}
            onChange={(e) => setCriteria('workerName', e.target.value)}
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
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
        {criteria.workerName && (
          <Badge variant="outline" className="gap-1">
            Worker: {criteria.workerName}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('workerName', ''); }} />
          </Badge>
        )}
        {criteria.status !== 'all' && (
          <Badge variant="outline" className="gap-1">
            Status: {criteria.status}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('status', 'all'); }} />
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

  const filteredData = useMemo(() => {
    return mockDailyAllowanceSummary.filter(summary => {
      const matchesWorker = !filterCriteria.workerName || summary.workerName.toLowerCase().includes(filterCriteria.workerName.toLowerCase())
      const matchesStatus = filterCriteria.status === 'all' || summary.status === filterCriteria.status
      const matchesDateFrom = !filterCriteria.dateFrom || summary.date >= filterCriteria.dateFrom
      const matchesDateTo = !filterCriteria.dateTo || summary.date <= filterCriteria.dateTo
      return matchesWorker && matchesStatus && matchesDateFrom && matchesDateTo
    })
  }, [filterCriteria])

  const [data, setData] = useState<DailyAllowanceSummary[]>(filteredData)

  useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const totalAmount = useMemo(() => {
    return filteredData.reduce((sum, s) => sum + s.totalAmount, 0)
  }, [filteredData])

  const columns = useMemo<ColumnDef<DailyAllowanceSummary>[]>(
    () => [
      {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        minSize: 110,
        meta: { label: 'Date', cell: { variant: 'short-text' } },
      },
      {
        id: 'workerName',
        accessorKey: 'workerName',
        header: 'Worker',
        minSize: 150,
        meta: { label: 'Worker', cell: { variant: 'short-text' } },
      },
      {
        id: 'shiftName',
        accessorKey: 'shiftName',
        header: 'Shift',
        minSize: 100,
        meta: { label: 'Shift', cell: { variant: 'short-text' } },
      },
      {
        id: 'totalWorkHours',
        accessorKey: 'totalWorkHours',
        header: 'Hours',
        minSize: 80,
        meta: { label: 'Hours', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.totalWorkHours}h</div>
        ),
      },
      {
        id: 'otHours',
        accessorKey: 'otHours',
        header: 'OT',
        minSize: 70,
        meta: { label: 'OT', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.otHours > 0 ? `${row.original.otHours}h` : '-'}</div>
        ),
      },
      {
        id: 'totalGoodQty',
        accessorKey: 'totalGoodQty',
        header: 'Good Qty',
        minSize: 90,
        meta: { label: 'Good Qty', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right text-green-600">{row.original.totalGoodQty}</div>
        ),
      },
      {
        id: 'totalScrapQty',
        accessorKey: 'totalScrapQty',
        header: 'Scrap',
        minSize: 70,
        meta: { label: 'Scrap', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className={`text-right ${row.original.totalScrapQty > 5 ? 'text-red-600' : 'text-gray-700'}`}>
            {row.original.totalScrapQty}
          </div>
        ),
      },
      {
        id: 'totalAmount',
        accessorKey: 'totalAmount',
        header: 'Amount',
        minSize: 100,
        meta: { label: 'Amount', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right font-semibold text-green-600">฿{row.original.totalAmount.toLocaleString()}</div>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        minSize: 100,
        meta: { label: 'Status', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <Badge className={statusColors[row.original.status]}>{row.original.status}</Badge>
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
                <div className="flex items-center gap-3 mb-2">
                  <Button variant="ghost" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Worker Allowance History
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 ml-12">Complete payment history and records</p>
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
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
                <span className="text-xs sm:text-sm text-gray-600">Total Amount: </span>
                <span className="text-base sm:text-lg font-bold text-purple-600">฿{totalAmount.toLocaleString()}</span>
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
