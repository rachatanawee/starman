'use client'

import { ProjectLayout, DynamicTitle, PageTitle, Button, Badge, Input, useParams, useRouter, useTranslations, useState, useMemo } from '@/lib/common-exports'
import { Plus, Filter, X, Package, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { DataGrid } from '@/shared/components/tablecn/data-grid/data-grid'
import { DataGridRowHeightMenu } from '@/shared/components/tablecn/data-grid/data-grid-row-height-menu'
import { DataGridSortMenu } from '@/shared/components/tablecn/data-grid/data-grid-sort-menu'
import { DataGridViewMenu } from '@/shared/components/tablecn/data-grid/data-grid-view-menu'
import { useDataGrid } from '@/shared/components/tablecn/hooks/use-data-grid'
import { useWindowSize } from '@/shared/components/tablecn/hooks/use-window-size'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Label } from '@/shared/components/ui/label'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/shared/components/filter-panel'
import { mockCustomerData } from '@/modules/customer'
import type { Customer } from '@/modules/customer'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

export default function CustomerPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })
  const t = useTranslations('customer')

  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    name: '',
    status: 'all',
    code: ''
  })

  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'customer',
    initialCriteria: {
      name: '',
      status: 'all',
      code: ''
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t('name')}
          </Label>
          <Input
            placeholder={t('search')}
            value={criteria.name}
            onChange={(e) => setCriteria('name', e.target.value)}
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
              <SelectItem value="active">{t('active')}</SelectItem>
              <SelectItem value="inactive">{t('inactive')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">{t('code')}</Label>
          <Input
            placeholder={t('search')}
            value={criteria.code}
            onChange={(e) => setCriteria('code', e.target.value)}
            className="h-9"
          />
        </div>
      </div>
    ),
    renderBadges: (criteria, setCriteria) => (
      <>
        {criteria.name && (
          <Badge variant="outline" className="gap-1">
            {t('name')}: {criteria.name}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('name', ''); }} />
          </Badge>
        )}
        {criteria.status !== 'all' && (
          <Badge variant="outline" className="gap-1">
            {t('status')}: {t(criteria.status as any)}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('status', 'all'); }} />
          </Badge>
        )}
        {criteria.code && (
          <Badge variant="outline" className="gap-1">
            {t('code')}: {criteria.code}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('code', ''); }} />
          </Badge>
        )}
      </>
    )
  }

  const filteredData = React.useMemo(() => {
    return mockCustomerData.filter(item => {
      const matchesName = !filterCriteria.name || item.name.toLowerCase().includes(filterCriteria.name.toLowerCase())
      const matchesStatus = filterCriteria.status === 'all' || item.status === filterCriteria.status
      const matchesCode = !filterCriteria.code || item.code.toLowerCase().includes(filterCriteria.code.toLowerCase())
      return matchesName && matchesStatus && matchesCode
    })
  }, [filterCriteria])

  const [data, setData] = React.useState<Customer[]>(filteredData)

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const activeCount = React.useMemo(() => {
    return filteredData.filter(item => item.status === 'active').length
  }, [filteredData])

  const columns = React.useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: 'code',
        accessorKey: 'code',
        header: t('code'),
        minSize: 120,
        meta: { label: t('code'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <button
            onClick={() => router.push(`/${params.locale}/company/${projectId}/customer/${row.original.id}`)}
            className="text-blue-600 hover:underline pl-2"
          >
            {row.original.code}
          </button>
        ),
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: t('name'),
        minSize: 200,
        meta: { label: t('name'), cell: { variant: 'short-text' } },
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: t('status'),
        minSize: 100,
        meta: { label: t('status'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
            {t(row.original.status as any)}
          </Badge>
        ),
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: t('createdAt'),
        minSize: 120,
        meta: { label: t('createdAt'), cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
        ),
      },
    ],
    [params.locale, projectId, router, t]
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
                icon={Package}
                title={t('title')}
                subtitle={t('subtitle')}
              />
              <div className="flex gap-2">
                <Button
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto sm:shrink-0 sm:min-w-fit shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>{t('add')}</span>
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
              <div className="flex gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
                  <span className="text-xs sm:text-sm text-gray-600">Total: </span>
                  <span className="text-base sm:text-lg font-bold text-blue-900">{filteredData.length}</span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-3 sm:px-4 py-2 rounded-lg border shrink-0">
                  <span className="text-xs sm:text-sm text-gray-600">{t('active')}: </span>
                  <span className="text-base sm:text-lg font-bold text-green-900">{activeCount}</span>
                </div>
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
