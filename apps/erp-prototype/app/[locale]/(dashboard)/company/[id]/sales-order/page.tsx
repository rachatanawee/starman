'use client'

import { ProjectLayout, DynamicTitle, PageTitle, Button, Badge, Input, useParams, useRouter, useTranslations, useState, useMemo, useEffect } from '@/lib/common-exports'
import { Plus, Filter, X, User, Clock, Package, Truck, CheckCircle, XCircle, FileText, BookOpen, ListTodo } from 'lucide-react'
import Link from 'next/link'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { DataGridRowHeightMenu } from '@/components/tablecn/data-grid/data-grid-row-height-menu'
import { DataGridSortMenu } from '@/components/tablecn/data-grid/data-grid-sort-menu'
import { DataGridViewMenu } from '@/components/tablecn/data-grid/data-grid-view-menu'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { useWindowSize } from '@/components/tablecn/hooks/use-window-size'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/components/filter-panel'
import { DateRangeFilter } from '@/components/date-range-filter'
import { mockSalesOrders, type SalesOrder } from '@/lib/mock-data'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Draft': return <FileText className="h-4 w-4 text-gray-600" />
    case 'Pending': return <Clock className="h-4 w-4 text-yellow-600" />
    case 'Confirmed': return <CheckCircle className="h-4 w-4 text-blue-600" />
    case 'Processing': return <Package className="h-4 w-4 text-blue-600" />
    case 'Shipped': return <Truck className="h-4 w-4 text-primary" />
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
  const t = useTranslations('salesOrder')

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
            {t('orderNumber')}
          </Label>
          <Input
            data-testid="filter-order-number"
            placeholder={t('searchOrder')}
            value={criteria.orderNumber}
            onChange={(e) => setCriteria('orderNumber', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t('status')}
          </Label>
          <Select value={criteria.status} onValueChange={(v) => setCriteria('status', v)}>
            <SelectTrigger data-testid="filter-status" className="h-9">
              <SelectValue placeholder={t('allStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatus')}</SelectItem>
              <SelectItem value="Draft">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  {t('draft')}
                </div>
              </SelectItem>
              <SelectItem value="Pending">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  {t('pending')}
                </div>
              </SelectItem>
              <SelectItem value="Confirmed">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  {t('confirmed')}
                </div>
              </SelectItem>
              <SelectItem value="Processing">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  {t('processing')}
                </div>
              </SelectItem>
              <SelectItem value="Shipped">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  {t('shipped')}
                </div>
              </SelectItem>
              <SelectItem value="Completed">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  {t('completed')}
                </div>
              </SelectItem>
              <SelectItem value="Cancelled">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  {t('cancelled')}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <User className="h-3 w-3" />
            {t('customer')}
          </Label>
          <Input
            data-testid="filter-customer"
            placeholder={t('searchCustomer')}
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
            {t('orderNumber')}: {criteria.orderNumber}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('orderNumber', ''); }} />
          </Badge>
        )}
        {criteria.status !== 'all' && (
          <Badge variant="outline" className="gap-1">
            {t('status')}: {criteria.status}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('status', 'all'); }} />
          </Badge>
        )}
        {criteria.customer && (
          <Badge variant="outline" className="gap-1">
            {t('customer')}: {criteria.customer}
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
    return mockSalesOrders.filter(order => {
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
        header: t('orderNumber'),
        minSize: 120,
        meta: { label: t('orderNumber'), cell: { variant: 'short-text' } },
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
        header: t('customer'),
        minSize: 150,
        meta: { label: t('customer'), cell: { variant: 'short-text' } },
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: t('date'),
        minSize: 110,
        meta: { label: t('date'), cell: { variant: 'short-text' } },
      },
      {
        id: 'deliveryDate',
        accessorKey: 'deliveryDate',
        header: t('delivery'),
        minSize: 110,
        meta: { label: t('deliveryDate'), cell: { variant: 'short-text' } },
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: t('amount'),
        minSize: 100,
        meta: { label: t('amount'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.amount.toLocaleString()}</div>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: t('status'),
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
        header: t('items'),
        minSize: 80,
        meta: { label: t('items'), cell: { variant: 'short-text' } },
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
              <PageTitle 
                icon={ListTodo}
                title={t('title')}
                subtitle={t('subtitle')}
              />
              <div className="flex gap-2">
                <Link href="/guide?tab=sales&section=sales-order">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {t('learnMore')}
                  </Button>
                </Link>
                <Link href={`/${params.locale}/company/${projectId}/sales-order/new`}>
                  <Button
                    data-testid="new-order-button"
                    className="bg-primary hover:bg-primary/90 w-full sm:w-auto sm:shrink-0 sm:min-w-fit shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span>{t('newOrder')}</span>
                  </Button>
                </Link>
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
              <span className="text-xs sm:text-sm text-gray-600">{t('totalAmount')}: </span>
              <span className="text-base sm:text-lg font-bold text-primary">{totalAmount.toLocaleString()}</span>
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
