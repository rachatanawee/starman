'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { List, X } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'
import { mockJobHistory, JobHistoryRecord } from '@/lib/job-history-data'
import { useDataGrid } from '@/components/tablecn/hooks/use-data-grid'
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { ColumnDef } from '@tanstack/react-table'

export default function JobsLogPage() {
  const params = useParams()
  const projectId = params.id as string
  const [jobs] = useState<JobHistoryRecord[]>(mockJobHistory)
  const [selectedJob, setSelectedJob] = useState<JobHistoryRecord | null>(null)
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)

  const columns: ColumnDef<JobHistoryRecord>[] = [
    {
      accessorKey: 'productionOrderNo',
      header: 'Order No.',
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedJob(row.original)
            setDetailDrawerOpen(true)
          }}
          className="font-semibold text-primary hover:underline"
        >
          {row.original.productionOrderNo}
        </button>
      )
    },
    {
      accessorKey: 'productName',
      header: 'Product',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.productName}</p>
          <p className="text-xs text-gray-500">{row.original.productSku}</p>
        </div>
      )
    },
    {
      accessorKey: 'customer',
      header: 'Customer'
    },
    {
      accessorKey: 'completedQty',
      header: 'Qty',
      cell: ({ row }) => `${row.original.completedQty}/${row.original.targetQty}`
    },
    {
      accessorKey: 'yieldRate',
      header: 'Yield',
      cell: ({ row }) => (
        <Badge className={row.original.yieldRate >= 98 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
          {row.original.yieldRate}%
        </Badge>
      )
    },
    {
      accessorKey: 'totalActualCost',
      header: 'Total Cost',
      cell: ({ row }) => `฿${row.original.totalActualCost.toLocaleString()}`
    },
    {
      accessorKey: 'costVariance',
      header: 'Variance',
      cell: ({ row }) => (
        <span className={row.original.costVariance > 0 ? 'text-orange-600 font-semibold' : 'text-green-600 font-semibold'}>
          {row.original.costVariance > 0 ? '+' : ''}฿{row.original.costVariance.toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: 'efficiency',
      header: 'Efficiency',
      cell: ({ row }) => `${row.original.efficiency}%`
    },
    {
      accessorKey: 'onTimeDelivery',
      header: 'On-Time',
      cell: ({ row }) => (
        <Badge className={row.original.onTimeDelivery ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {row.original.onTimeDelivery ? 'Yes' : 'No'}
        </Badge>
      )
    },
    {
      accessorKey: 'completionDate',
      header: 'Completed',
      cell: ({ row }) => new Date(row.original.completionDate).toLocaleDateString()
    }
  ]

  const dataGridProps = useDataGrid({
    data: jobs,
    columns
  })

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <List className="h-8 w-8 text-primary" />
              Jobs Log
            </h1>
            <p className="text-gray-600 mt-1">Complete history of all production jobs</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <DataGrid {...dataGridProps} />
          </CardContent>
        </Card>

        {detailDrawerOpen && selectedJob && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setDetailDrawerOpen(false)}
            />
            <div className="fixed top-0 right-0 bottom-0 w-96 bg-white z-50 shadow-xl overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Job Details</h2>
                  <Button variant="ghost" size="icon" onClick={() => setDetailDrawerOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Production Order</p>
                    <p className="font-bold text-lg">{selectedJob.productionOrderNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Product</p>
                    <p className="font-semibold">{selectedJob.productName}</p>
                    <p className="text-xs text-gray-500">{selectedJob.productSku}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Customer</p>
                    <p className="text-sm">{selectedJob.customer}</p>
                    <p className="text-xs text-gray-500">SO: {selectedJob.salesOrderNo}</p>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Quantity</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold">{selectedJob.completedQty}/{selectedJob.targetQty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yield Rate</span>
                        <span className="font-semibold text-green-600">{selectedJob.yieldRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Cost</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Actual</span>
                        <span className="font-bold">฿{selectedJob.totalActualCost.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between font-semibold ${
                        selectedJob.costVariance > 0 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        <span>Variance</span>
                        <span>{selectedJob.costVariance > 0 ? '+' : ''}฿{selectedJob.costVariance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Performance</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Efficiency</span>
                          <span className="font-semibold">{selectedJob.efficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedJob.efficiency}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">On-Time:</span>
                      <Badge className={selectedJob.onTimeDelivery ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {selectedJob.onTimeDelivery ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProjectLayout>
  )
}
