'use client'

import { ProjectLayout, DynamicTitle, Button, Badge, Input, useParams, useRouter, useTranslations, useState, useMemo, useEffect } from '@/lib/common-exports'
import { Plus, Filter, X, User, Receipt, DollarSign, AlertCircle, CheckCircle, Clock, BookOpen } from 'lucide-react'
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
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

interface SalesInvoice {
  id: string
  invoiceNumber: string
  salesOrderId?: string
  quotationId?: string
  customer: string
  invoiceDate: string
  dueDate: string
  grandTotal: number
  totalPaid: number
  balanceDue: number
  paymentStatus: string
}

const mockData: SalesInvoice[] = [
  { id: '1', invoiceNumber: 'INV-2026-001', salesOrderId: 'SO-2026-001', quotationId: 'QT-2026-001', customer: 'Acme Corp', invoiceDate: '2026/01/15', dueDate: '2026/02/14', grandTotal: 16050, totalPaid: 16050, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '2', invoiceNumber: 'INV-2026-002', salesOrderId: 'SO-2026-002', quotationId: 'QT-2026-002', customer: 'Tech Solutions', invoiceDate: '2026/01/16', dueDate: '2026/02/15', grandTotal: 30495, totalPaid: 15000, balanceDue: 15495, paymentStatus: 'Partially Paid' },
  { id: '3', invoiceNumber: 'INV-2026-003', salesOrderId: 'SO-2026-003', customer: 'Global Industries', invoiceDate: '2026/01/17', dueDate: '2026/02/16', grandTotal: 44940, totalPaid: 0, balanceDue: 44940, paymentStatus: 'Unpaid' },
  { id: '4', invoiceNumber: 'INV-2026-004', salesOrderId: 'SO-2026-004', customer: 'Smart Systems', invoiceDate: '2026/01/18', dueDate: '2026/02/17', grandTotal: 21186, totalPaid: 21186, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '5', invoiceNumber: 'INV-2026-005', salesOrderId: 'SO-2026-005', customer: 'Digital Dynamics', invoiceDate: '2026/01/19', dueDate: '2026/02/18', grandTotal: 35952, totalPaid: 35952, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '6', invoiceNumber: 'INV-2026-006', salesOrderId: 'SO-2026-006', customer: 'Innovate Ltd', invoiceDate: '2026/01/20', dueDate: '2026/01/25', grandTotal: 26750, totalPaid: 0, balanceDue: 26750, paymentStatus: 'Overdue' },
  { id: '7', invoiceNumber: 'INV-2026-007', customer: 'Future Tech', invoiceDate: '2026/01/21', dueDate: '2026/02/20', grandTotal: 19795, totalPaid: 0, balanceDue: 19795, paymentStatus: 'Unpaid' },
  { id: '8', invoiceNumber: 'INV-2026-008', salesOrderId: 'SO-2026-008', customer: 'Mega Corp', invoiceDate: '2026/01/22', dueDate: '2026/02/21', grandTotal: 55640, totalPaid: 55640, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '9', invoiceNumber: 'INV-2026-009', salesOrderId: 'SO-2026-009', customer: 'Prime Solutions', invoiceDate: '2026/01/23', dueDate: '2026/02/22', grandTotal: 33384, totalPaid: 20000, balanceDue: 13384, paymentStatus: 'Partially Paid' },
  { id: '10', invoiceNumber: 'INV-2026-010', salesOrderId: 'SO-2026-010', customer: 'Alpha Industries', invoiceDate: '2026/01/24', dueDate: '2026/01/29', grandTotal: 24075, totalPaid: 0, balanceDue: 24075, paymentStatus: 'Overdue' },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Paid': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'Partially Paid': return <Clock className="h-4 w-4 text-blue-600" />
    case 'Unpaid': return <DollarSign className="h-4 w-4 text-yellow-600" />
    case 'Overdue': return <AlertCircle className="h-4 w-4 text-red-600" />
    default: return null
  }
}

export default function SalesInvoicePage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })
  const t = useTranslations('salesInvoice')

  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    invoiceNumber: '',
    paymentStatus: 'all',
    customer: '',
    dateFrom: '',
    dateTo: ''
  })

  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'salesInvoice',
    initialCriteria: {
      invoiceNumber: '',
      paymentStatus: 'all',
      customer: '',
      dateFrom: '',
      dateTo: ''
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t('invoiceNumber')}
          </Label>
          <Input
            data-testid="filter-invoice-number"
            placeholder={t('searchInvoice')}
            value={criteria.invoiceNumber}
            onChange={(e) => setCriteria('invoiceNumber', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t('paymentStatus')}
          </Label>
          <Select value={criteria.paymentStatus} onValueChange={(v) => setCriteria('paymentStatus', v)}>
            <SelectTrigger data-testid="filter-payment-status" className="h-9">
              <SelectValue placeholder={t('allStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatus')}</SelectItem>
              <SelectItem value="Paid">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  {t('paid')}
                </div>
              </SelectItem>
              <SelectItem value="Partially Paid">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  {t('partiallyPaid')}
                </div>
              </SelectItem>
              <SelectItem value="Unpaid">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                  {t('unpaid')}
                </div>
              </SelectItem>
              <SelectItem value="Overdue">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  {t('overdue')}
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
        {criteria.invoiceNumber && (
          <Badge variant="outline" className="gap-1">
            {t('invoiceNumber')}: {criteria.invoiceNumber}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('invoiceNumber', ''); }} />
          </Badge>
        )}
        {criteria.paymentStatus !== 'all' && (
          <Badge variant="outline" className="gap-1">
            {t('paymentStatus')}: {criteria.paymentStatus}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('paymentStatus', 'all'); }} />
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
    return mockData.filter(invoice => {
      const matchesInvoiceNumber = !filterCriteria.invoiceNumber || invoice.invoiceNumber.toLowerCase().includes(filterCriteria.invoiceNumber.toLowerCase())
      const matchesStatus = filterCriteria.paymentStatus === 'all' || invoice.paymentStatus === filterCriteria.paymentStatus
      const matchesCustomer = !filterCriteria.customer || invoice.customer.toLowerCase().includes(filterCriteria.customer.toLowerCase())
      const invoiceDate = invoice.invoiceDate.replace(/\//g, '-')
      const matchesDateFrom = !filterCriteria.dateFrom || invoiceDate >= filterCriteria.dateFrom
      const matchesDateTo = !filterCriteria.dateTo || invoiceDate <= filterCriteria.dateTo
      return matchesInvoiceNumber && matchesStatus && matchesCustomer && matchesDateFrom && matchesDateTo
    })
  }, [filterCriteria])

  const [data, setData] = React.useState<SalesInvoice[]>(filteredData)

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const totalAmount = React.useMemo(() => {
    return filteredData.reduce((sum, invoice) => sum + invoice.grandTotal, 0)
  }, [filteredData])

  const totalOutstanding = React.useMemo(() => {
    return filteredData.reduce((sum, invoice) => sum + invoice.balanceDue, 0)
  }, [filteredData])

  const columns = React.useMemo<ColumnDef<SalesInvoice>[]>(
    () => [
      {
        id: 'invoiceNumber',
        accessorKey: 'invoiceNumber',
        header: t('invoiceNumber'),
        minSize: 130,
        meta: { label: t('invoiceNumber'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <button
            onClick={() => router.push(`/${params.locale}/company/${projectId}/sales-invoice/${row.original.id}`)}
            className="text-blue-600 hover:underline pl-2"
          >
            {row.original.invoiceNumber}
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
        id: 'invoiceDate',
        accessorKey: 'invoiceDate',
        header: t('invoiceDate'),
        minSize: 110,
        meta: { label: t('invoiceDate'), cell: { variant: 'short-text' } },
      },
      {
        id: 'dueDate',
        accessorKey: 'dueDate',
        header: t('dueDate'),
        minSize: 110,
        meta: { label: t('dueDate'), cell: { variant: 'short-text' } },
      },
      {
        id: 'grandTotal',
        accessorKey: 'grandTotal',
        header: t('grandTotal'),
        minSize: 100,
        meta: { label: t('grandTotal'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.grandTotal.toLocaleString()}</div>
        ),
      },
      {
        id: 'balanceDue',
        accessorKey: 'balanceDue',
        header: t('balanceDue'),
        minSize: 100,
        meta: { label: t('balanceDue'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right font-semibold">{row.original.balanceDue.toLocaleString()}</div>
        ),
      },
      {
        id: 'paymentStatus',
        accessorKey: 'paymentStatus',
        header: t('paymentStatus'),
        minSize: 80,
        meta: { label: t('paymentStatus'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  {getStatusIcon(row.original.paymentStatus)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.paymentStatus}</p>
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
      <DynamicTitle pageTitle="Sales Invoice" />
      <div className="w-full h-full">
        <div className="p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-3 lg:space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 text-gray-900">
                  <DollarSign className="h-8 w-8 text-primary flex-shrink-0" />
                  <span>{t('title')}</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{t('subtitle')}</p>
              </div>
              <div className="flex gap-2">
                <Link href="/guide?tab=sales&section=sales-invoice">
                  <Button variant="outline" size="sm" className="transition-all hover:scale-105 active:scale-95">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {t('learnMore')}
                  </Button>
                </Link>
                <Link href={`/${params.locale}/company/${projectId}/sales-invoice/new`}>
                  <Button
                    data-testid="new-invoice-button"
                    className="bg-primary hover:bg-primary/90 w-full sm:w-auto sm:shrink-0 sm:min-w-fit shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span>{t('newInvoice')}</span>
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
            <div className="flex gap-3">
              <div data-testid="total-amount" className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
                <span className="text-xs sm:text-sm text-gray-600">{t('totalAmount')}: </span>
                <span className="text-base sm:text-lg font-bold text-green-600">฿{totalAmount.toLocaleString()}</span>
              </div>
              <div data-testid="total-outstanding" className="bg-gradient-to-r from-red-50 to-orange-50 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
                <span className="text-xs sm:text-sm text-gray-600">{t('totalOutstanding')}: </span>
                <span className="text-base sm:text-lg font-bold text-red-600">฿{totalOutstanding.toLocaleString()}</span>
              </div>
            </div>
            <div role="toolbar" className="flex items-center gap-2 shrink-0">
              <DataGridSortMenu table={table} align="end" />
              <DataGridRowHeightMenu table={table} align="end" />
              <DataGridViewMenu table={table} align="end" />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <DataGrid data-testid="sales-invoice-grid" {...dataGridProps} table={table} height={height} />
          </div>
        </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
