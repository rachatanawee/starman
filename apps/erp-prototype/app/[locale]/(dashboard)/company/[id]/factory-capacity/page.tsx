'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, TrendingUp } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'

export default function FactoryCapacityPage() {
  const params = useParams()
  const projectId = params.id as string

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Factory Capacity</h1>
          <p className="text-gray-600 mt-1">Monitor production capacity and utilization</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Capacity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Factory capacity monitoring interface - Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Utilization Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Capacity utilization charts and analytics - Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
