'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Package2, Radio } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function InventoryPage() {
  const params = useParams()
  const projectId = params.id as string
  const t = useTranslations('inventory')

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              {t('title')}
              <Badge variant="secondary" className="flex items-center gap-1">
                <Radio className="h-3 w-3" />
                {t('rfidEnabled')}
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('addItem')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              {t('inventoryItems')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{t('comingSoon')}</p>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
