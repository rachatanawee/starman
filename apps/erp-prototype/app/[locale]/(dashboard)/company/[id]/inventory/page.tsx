'use client'

import { Button } from '@/components/ui/button'
import { Plus, Filter, X, Package2, AlertTriangle, BookOpen, ShieldCheck } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/components/filter-panel'
import type { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { mockInventoryItems, mockAIGuardianAlerts, type InventoryItem } from '@/lib/inventory-data'

export default function InventoryPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const windowSize = useWindowSize({ defaultHeight: 760 })

  const [showAlerts, setShowAlerts] = React.useState(true)
  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    sku: '',
    category: 'all',
    warehouse: 'all',
    stockStatus: 'all'
  })

  const filterConfig: FilterConfig = {
    name: 'Filters',
    storageKey: 'inventory',
    initialCriteria: {
      sku: '',
      category: 'all',
      warehouse: 'all',
      stockStatus: 'all'
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            SKU / Product
          </Label>
          <Input
            placeholder="Search SKU or product..."
            value={criteria.sku}
            onChange={(e) => setCriteria('sku', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Category</Label>
          <Select value={criteria.category} onValueChange={(v) => setCriteria('category', v)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="raw_material">Raw Material</SelectItem>
              <SelectItem value="finished_goods">Finished Goods</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="consumable">Consumable</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Warehouse</Label>
          <Select value={criteria.warehouse} onValueChange={(v) => setCriteria('warehouse', v)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Warehouses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              <SelectItem value="wh-1">Main Warehouse</SelectItem>
              <SelectItem value="wh-2">Scrap Warehouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Stock Status</Label>
          <Select value={criteria.stockStatus} onValueChange={(v) => setCriteria('stockStatus', v)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
    renderBadges: (criteria, setCriteria) => (
      <>
        {criteria.sku && (
          <Badge variant="outline" className="gap-1">
            SKU: {criteria.sku}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('sku', ''); }} />
          </Badge>
        )}
        {criteria.category !== 'all' && (
          <Badge variant="outline" className="gap-1">
            Category: {criteria.category}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('category', 'all'); }} />
          </Badge>
        )}
      </>
    )
  }

  const filteredData = React.useMemo(() => {
    return mockInventoryItems.filter(item => {
      const matchesSKU = !filterCriteria.sku || 
        item.productSku.toLowerCase().includes(filterCriteria.sku.toLowerCase()) ||
        item.productName.toLowerCase().includes(filterCriteria.sku.toLowerCase())
      const matchesCategory = filterCriteria.category === 'all' || item.category === filterCriteria.category
      const matchesWarehouse = filterCriteria.warehouse === 'all' || item.warehouseId === filterCriteria.warehouse
      
      let matchesStockStatus = true
      if (filterCriteria.stockStatus === 'in_stock') matchesStockStatus = item.availableQuantity > 0
      if (filterCriteria.stockStatus === 'low_stock') matchesStockStatus = item.availableQuantity > 0 && item.availableQuantity < 100
      if (filterCriteria.stockStatus === 'out_of_stock') matchesStockStatus = item.availableQuantity <= 0
      
      return matchesSKU && matchesCategory && matchesWarehouse && matchesStockStatus
    })
  }, [filterCriteria])

  const [data, setData] = React.useState<InventoryItem[]>(filteredData)

  React.useEffect(() => {
    setData(filteredData)
  }, [filteredData])

  const totalValue = React.useMemo(() => {
    return filteredData.reduce((sum, item) => sum + item.totalValue, 0)
  }, [filteredData])

  const columns = React.useMemo<ColumnDef<InventoryItem>[]>(
    () => [
      {
        id: 'productSku',
        accessorKey: 'productSku',
        header: 'SKU',
        minSize: 120,
        meta: { label: 'SKU', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <button
            onClick={() => router.push(`/${params.locale}/company/${projectId}/inventory/${row.original.id}`)}
            className="text-blue-600 hover:underline pl-2"
          >
            {row.original.productSku}
          </button>
        ),
      },
      {
        id: 'productName',
        accessorKey: 'productName',
        header: 'Product',
        minSize: 200,
        meta: { label: 'Product', cell: { variant: 'short-text' } },
      },
      {
        id: 'locationCode',
        accessorKey: 'locationCode',
        header: 'Location',
        minSize: 100,
        meta: { label: 'Location', cell: { variant: 'short-text' } },
      },
      {
        id: 'quantity',
        accessorKey: 'quantity',
        header: 'Qty',
        minSize: 80,
        meta: { label: 'Quantity', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">{row.original.quantity} {row.original.uom}</div>
        ),
      },
      {
        id: 'availableQuantity',
        accessorKey: 'availableQuantity',
        header: 'Available',
        minSize: 100,
        meta: { label: 'Available', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className={`text-right ${row.original.availableQuantity < 0 ? 'text-red-600 font-bold' : ''}`}>
            {row.original.availableQuantity} {row.original.uom}
          </div>
        ),
      },
      {
        id: 'totalValue',
        accessorKey: 'totalValue',
        header: 'Value',
        minSize: 100,
        meta: { label: 'Value', cell: { variant: 'short-text' } },
        cell: ({ row }) => (
          <div className="text-right">฿{row.original.totalValue.toLocaleString()}</div>
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
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
                  <Package2 className="h-8 w-8 text-primary" />
                  Inventory
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">The Warehouse Guardian - Real-time visibility 🏦</p>
              </div>
              <div className="flex gap-2">
                <Link href="/guide?tab=materials">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
                <Button
                  className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/${params.locale}/company/${projectId}/inventory/adjust`)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Stock Adjustment
                </Button>
              </div>
            </div>
          </div>

          {mockAIGuardianAlerts.length > 0 && showAlerts && (
            <Card className="border-primary/20 bg-orange-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <ShieldCheck className="h-5 w-5" />
                    AI Guardian Alerts ({mockAIGuardianAlerts.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAlerts(false)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockAIGuardianAlerts.map(alert => (
                  <div key={alert.id} className={`border rounded-lg p-3 ${alert.severity === 'critical' ? 'bg-red-100 border-red-300' : 'bg-yellow-50 border-yellow-300'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{alert.title}</p>
                        <p className="text-xs mt-1">{alert.message}</p>
                      </div>
                      {alert.action && (
                        <Button size="sm" variant="outline" className="ml-2">
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
                <span className="text-xs sm:text-sm text-gray-600">Total Value: </span>
                <span className="text-base sm:text-lg font-bold text-primary">฿{totalValue.toLocaleString()}</span>
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
