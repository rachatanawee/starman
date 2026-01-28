'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Package } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'

export default function BOMPage() {
  const params = useParams()
  const projectId = params.id as string

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Bill of Materials (BOM)</h1>
            <p className="text-gray-600 mt-1">Manage product components and materials</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New BOM
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              BOM List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">BOM management interface - Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
