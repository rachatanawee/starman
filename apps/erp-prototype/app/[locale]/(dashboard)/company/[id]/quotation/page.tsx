'use client'

import { ProjectLayout, DynamicTitle, PageTitle, Button, Badge, Input, useParams, useRouter, useTranslations, useState, useMemo, useEffect } from '@/lib/common-exports'
import { Plus, Filter, X, User, CheckCircle, FileText, Send, Ban, CalendarX, Sparkles, BookOpen, Trash2, AlertCircle, Check } from 'lucide-react'
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
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@spark/core'
import { DateRangeFilter } from '@spark/core'
import { AIInsightsBadge } from '@/components/ai-insights-badge'
import { mockQuotations, type Quotation } from '@/lib/mock-data'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { toast } from 'sonner'

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
    return mockQuotations.filter(quotation => {
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
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null)

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
      {
        id: 'actions',
        header: '',
        size: 100,
        cell: ({ row }) => (
          deleteConfirmId === row.original.id ? (
            <div className="flex items-center gap-1">
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => {
                  setData(prev => prev.filter(q => q.id !== row.original.id))
                  toast.success('Quotation deleted', {
                    action: {
                      label: 'Undo',
                      onClick: () => {
                        setData(filteredData)
                        toast.info('Quotation restored')
                      }
                    },
                    duration: 5000
                  })
                  setDeleteConfirmId(null)
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setDeleteConfirmId(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setDeleteConfirmId(row.original.id)}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          )
        ),
      },
    ],
    [params.locale, projectId, router, deleteConfirmId, filteredData]
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
      <div className="w-full h-full">
        <div className="p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-3 lg:space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <PageTitle 
                icon={FileText}
                title={t('title')}
                subtitle={t('subtitle')}
                badge={
                  <AIInsightsBadge
                    type="positive"
                    message="Top customers: Acme Corp (+45%), Tech Solutions (+32%)"
                    confidence={0.92}
                  />
                }
              />
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
