'use client'

import { ProjectLayout, DynamicTitle, Button, Badge, Input, useParams, useRouter, useTranslations, useState, useMemo, useEffect } from '@/lib/common-exports'
import { Plus, Filter, X, User, CheckCircle, FileText, Send, Ban, CalendarX, Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { DataGridRowHeightMenu } from '@/components/tablecn/data-grid/data-grid-row-height-menu'
import { DataGridSortMenu } from '@/components/tablecn/data-grid/data-grid-sort-menu'
import { DataGridViewMenu } from '@/components/tablecn/data-grid/data-grid-view-menu'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { useWindowSize } from '@/components/tablecn/hooks/use-window-size'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/components/filter-panel'
import { DateRangeFilter } from '@/components/date-range-filter'
import { AIInsightsBadge } from '@/components/ai-insights-badge'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

interface Quotation {
  id: string
  quotationNumber: string
  customer: string
  date: string
  validUntil: string
  amount: number
  status: string
  items: number
}

const mockData: Quotation[] = [
  { id: '1', quotationNumber: 'QT-2026-001', customer: 'Acme Corp', date: '2026/01/15', validUntil: '2026/02/15', amount: 15000, status: 'Sent', items: 5 },
  { id: '2', quotationNumber: 'QT-2026-002', customer: 'Tech Solutions', date: '2026/01/16', validUntil: '2026/02/16', amount: 28500, status: 'Draft', items: 8 },
  { id: '3', quotationNumber: 'QT-2026-003', customer: 'Global Industries', date: '2026/01/17', validUntil: '2026/02/17', amount: 42000, status: 'Accepted', items: 12 },
  { id: '4', quotationNumber: 'QT-2026-004', customer: 'Smart Systems', date: '2026/01/18', validUntil: '2026/02/18', amount: 19800, status: 'Sent', items: 6 },
  { id: '5', quotationNumber: 'QT-2026-005', customer: 'Digital Dynamics', date: '2026/01/19', validUntil: '2026/02/19', amount: 33600, status: 'Rejected', items: 10 },
  { id: '6', quotationNumber: 'QT-2026-006', customer: 'Innovate Ltd', date: '2026/01/20', validUntil: '2026/02/20', amount: 25000, status: 'Draft', items: 7 },
  { id: '7', quotationNumber: 'QT-2026-007', customer: 'Future Tech', date: '2026/01/21', validUntil: '2026/02/21', amount: 18500, status: 'Sent', items: 4 },
  { id: '8', quotationNumber: 'QT-2026-008', customer: 'Mega Corp', date: '2026/01/22', validUntil: '2026/02/22', amount: 52000, status: 'Accepted', items: 15 },
  { id: '9', quotationNumber: 'QT-2026-009', customer: 'Prime Solutions', date: '2026/01/23', validUntil: '2026/02/23', amount: 31200, status: 'Expired', items: 9 },
  { id: '10', quotationNumber: 'QT-2026-010', customer: 'Alpha Industries', date: '2026/01/24', validUntil: '2026/02/24', amount: 22500, status: 'Sent', items: 6 },
  { id: '11', quotationNumber: 'QT-2026-011', customer: 'Beta Systems', date: '2026/01/25', validUntil: '2026/02/25', amount: 38000, status: 'Accepted', items: 11 },
  { id: '12', quotationNumber: 'QT-2026-012', customer: 'Gamma Tech', date: '2026/01/26', validUntil: '2026/02/26', amount: 16800, status: 'Draft', items: 5 },
  { id: '13', quotationNumber: 'QT-2026-013', customer: 'Delta Corp', date: '2026/01/27', validUntil: '2026/02/27', amount: 45000, status: 'Sent', items: 13 },
  { id: '14', quotationNumber: 'QT-2026-014', customer: 'Epsilon Ltd', date: '2026/01/28', validUntil: '2026/02/28', amount: 27500, status: 'Rejected', items: 8 },
  { id: '15', quotationNumber: 'QT-2026-015', customer: 'Zeta Industries', date: '2026/01/29', validUntil: '2026/03/01', amount: 35000, status: 'Accepted', items: 10 },
  { id: '16', quotationNumber: 'QT-2026-016', customer: 'Omega Solutions', date: '2026/01/30', validUntil: '2026/03/02', amount: 29800, status: 'Draft', items: 7 },
  { id: '17', quotationNumber: 'QT-2026-017', customer: 'Nexus Corp', date: '2026/01/31', validUntil: '2026/03/03', amount: 41000, status: 'Sent', items: 12 },
  { id: '18', quotationNumber: 'QT-2026-018', customer: 'Vertex Systems', date: '2026/02/01', validUntil: '2026/03/04', amount: 23500, status: 'Expired', items: 6 },
  { id: '19', quotationNumber: 'QT-2026-019', customer: 'Quantum Tech', date: '2026/02/02', validUntil: '2026/03/05', amount: 36000, status: 'Accepted', items: 10 },
  { id: '20', quotationNumber: 'QT-2026-020', customer: 'Stellar Industries', date: '2026/02/03', validUntil: '2026/03/06', amount: 48500, status: 'Sent', items: 14 },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Draft': return <FileText className="h-4 w-4 text-gray-600" />
    case 'Sent': return <Send className="h-4 w-4 text-blue-600" />
    case 'Accepted': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'Rejected': return <Ban className="h-4 w-4 text-red-600" />
    case 'Expired': return <CalendarX className="h-4 w-4 text-orange-600" />
    default: return null
  }
}

export default function QuotationPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })
  const t = useTranslations('quotation')

  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    quotationNumber: '',
    status: 'all',
    customer: '',
    dateFrom: '',
    dateTo: ''
  })



  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'quotation',
    initialCriteria: {
      quotationNumber: '',
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
            {t('quotationNumber')}
          </Label>
          <Input
            placeholder={t('searchQuotation')}
            value={criteria.quotationNumber}
            onChange={(e) => setCriteria('quotationNumber', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t('status')}
          </Label>
          <Select value={criteria.status} onValueChange={(v) => setCriteria('status', v)}>
            <SelectTrigger className="h-9">
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
              <SelectItem value="Sent">
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-blue-600" />
                  {t('sent')}
                </div>
              </SelectItem>
              <SelectItem value="Accepted">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  {t('accepted')}
                </div>
              </SelectItem>
              <SelectItem value="Rejected">
                <div className="flex items-center gap-2">
                  <Ban className="h-4 w-4 text-red-600" />
                  {t('rejected')}
                </div>
              </SelectItem>
              <SelectItem value="Expired">
                <div className="flex items-center gap-2">
                  <CalendarX className="h-4 w-4 text-orange-600" />
                  {t('expired')}
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
        {criteria.quotationNumber && (
          <Badge variant="outline" className="gap-1">
            {t('quotationNumber')}: {criteria.quotationNumber}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('quotationNumber', ''); }} />
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
    return mockData.filter(quotation => {
      const matchesQuotationNumber = !filterCriteria.quotationNumber || quotation.quotationNumber.toLowerCase().includes(filterCriteria.quotationNumber.toLowerCase())
      const matchesStatus = filterCriteria.status === 'all' || quotation.status === filterCriteria.status
      const matchesCustomer = !filterCriteria.customer || quotation.customer.toLowerCase().includes(filterCriteria.customer.toLowerCase())
      const quotationDate = quotation.date.replace(/\//g, '-')
      const matchesDateFrom = !filterCriteria.dateFrom || quotationDate >= filterCriteria.dateFrom
      const matchesDateTo = !filterCriteria.dateTo || quotationDate <= filterCriteria.dateTo
      return matchesQuotationNumber && matchesStatus && matchesCustomer && matchesDateFrom && matchesDateTo
    })
  }, [filterCriteria])

  const [data, setData] = React.useState<Quotation[]>(filteredData)

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const totalAmount = React.useMemo(() => {
    return filteredData.reduce((sum, quotation) => sum + quotation.amount, 0)
  }, [filteredData])

  const columns = React.useMemo<ColumnDef<Quotation>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              className="bg-white"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        id: 'quotationNumber',
        accessorKey: 'quotationNumber',
        header: t('quotationNumber'),
        minSize: 120,
        cell: ({ row }) => (
          <button
            onClick={() => router.push(`/${params.locale}/company/${projectId}/quotation/${row.original.id}`)}
            className="text-blue-600 hover:underline pl-2"
          >
            {row.original.quotationNumber}
          </button>
        ),
      },
      {
        id: 'customer',
        accessorKey: 'customer',
        header: t('customer'),
        minSize: 150,
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: t('date'),
        minSize: 110,
      },
      {
        id: 'validUntil',
        accessorKey: 'validUntil',
        header: t('validUntil'),
        minSize: 110,
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: t('amount'),
        minSize: 100,
        cell: ({ row }) => (
          <div className="text-right">{row.original.amount.toLocaleString()}</div>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: t('status'),
        minSize: 80,
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
    enableRowSelection: true,
  })

  const height = Math.max(400, windowSize.height - 200)

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Quotation" />
      <div className="w-full h-full">
        <div className="p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-3 lg:space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{t('title')}</h1>
                  <AIInsightsBadge
                    type="positive"
                    message="Top customers: Acme Corp (+45%), Tech Solutions (+32%)"
                    confidence={0.92}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{t('subtitle')}</p>
              </div>
              <div className="flex gap-2">
                <Link href="/guide?tab=sales&section=quotation">
                  <Button variant="outline" size="sm" className="transition-all hover:scale-105 active:scale-95">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {t('learnMore')}
                  </Button>
                </Link>

                <Link href={`/${params.locale}/company/${projectId}/quotation/new`}>
                  <Button
                    className="bg-primary hover:bg-primary/90 w-full sm:w-auto sm:shrink-0 sm:min-w-fit shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span>{t('newQuotation')}</span>
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
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
              <span className="text-xs sm:text-sm text-gray-600">{t('totalAmount')}: </span>
              <span className="text-base sm:text-lg font-bold text-primary">{totalAmount.toLocaleString()}</span>
              <AIInsightsBadge
                type="positive"
                message="Customer retention rate: 87% | Avg order value trending up 15%"
                confidence={0.88}
                compact
              />
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
