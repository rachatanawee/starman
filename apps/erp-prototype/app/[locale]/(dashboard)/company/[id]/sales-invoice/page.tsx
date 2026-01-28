'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Receipt } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'

export default function SalesInvoicePage() {
  const params = useParams()
  const projectId = params.id as string

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales Invoice</h1>
            <p className="text-gray-600 mt-1">Generate and track invoices</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Invoice List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Invoice management interface - Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
