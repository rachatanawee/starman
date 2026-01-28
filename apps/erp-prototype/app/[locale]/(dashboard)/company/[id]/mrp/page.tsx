'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Package, AlertTriangle, TrendingUp, Zap, Clock, CheckCircle, ShoppingCart, BookOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { mockMRPRequirements, mockAIRecommendations, MRPRequirement, AIRecommendation } from '@/lib/mrp-data'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

const priorityColors = {
  urgent: 'bg-red-100 text-red-800 border-red-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  normal: 'bg-blue-100 text-blue-800 border-blue-300',
  low: 'bg-gray-100 text-gray-800 border-gray-300'
}

const statusColors = {
  shortage: 'bg-red-100 text-red-800',
  sufficient: 'bg-green-100 text-green-800',
  ordered: 'bg-blue-100 text-blue-800'
}

const aiIcons = {
  lead_time_warning: AlertTriangle,
  moq_optimization: TrendingUp,
  vendor_switch: Zap,
  auto_po: CheckCircle
}

const severityColors = {
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  critical: 'bg-red-100 text-red-800 border-red-300'
}

export default function MRPPage() {
  const params = useParams()
  const projectId = params.id as string
  const t = useTranslations('mrp')
  const [requirements, setRequirements] = useState<MRPRequirement[]>(mockMRPRequirements)
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(mockAIRecommendations)
  const [isRunning, setIsRunning] = useState(false)

  const handleRunMRP = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      toast.success('MRP calculation completed')
    }, 2000)
  }

  const handleApplyRecommendation = (recId: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== recId))
    toast.success('Recommendation applied')
  }

  const handleCreatePR = (req: MRPRequirement) => {
    toast.success(`Purchase Request created for ${req.productName}`)
  }

  const stats = {
    totalItems: requirements.length,
    shortages: requirements.filter(r => r.status === 'shortage').length,
    totalValue: requirements.reduce((sum, r) => sum + r.estimatedCost, 0),
    urgentItems: requirements.filter(r => r.priority === 'urgent').length
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8 text-purple-600" />
              {t('title')}
            </h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/guide?tab=materials&section=mrp">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('learnMore')}
              </Button>
            </Link>
            <Button
              onClick={handleRunMRP}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isRunning ? t('runningMRP') : t('runMRP')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('totalItems')}</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalItems}</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('shortages')}</p>
                  <p className="text-2xl font-bold mt-1 text-red-600">{stats.shortages}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('totalValue')}</p>
                  <p className="text-2xl font-bold mt-1">฿{stats.totalValue.toLocaleString()}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('urgentItems')}</p>
                  <p className="text-2xl font-bold mt-1 text-orange-600">{stats.urgentItems}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left: Requirements */}
          <div className="col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('materialRequirements')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requirements.map(req => (
                    <div
                      key={req.id}
                      className={`border rounded-lg p-4 ${
                        req.status === 'shortage' ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{req.productName}</h3>
                            <Badge className={statusColors[req.status]}>
                              {t(req.status)}
                            </Badge>
                            <Badge className={priorityColors[req.priority]}>
                              {t(req.priority)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">SKU: {req.productSku}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">{t('required')}: <span className="font-medium">{req.requiredQty}</span></p>
                              <p className="text-gray-600">{t('available')}: <span className="font-medium">{req.availableQty}</span></p>
                              {req.shortageQty > 0 && (
                                <p className="text-red-600">{t('shortage')}: <span className="font-bold">{req.shortageQty}</span></p>
                              )}
                            </div>
                            <div>
                              <p className="text-gray-600">{t('requiredDate')}: <span className="font-medium">{new Date(req.requiredDate).toLocaleDateString()}</span></p>
                              <p className="text-gray-600">{t('leadTime')}: <span className="font-medium">{req.leadTimeDays} days</span></p>
                              <p className="text-blue-600">{t('orderBy')}: <span className="font-bold">{new Date(req.suggestedOrderDate).toLocaleDateString()}</span></p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-gray-600">{t('suggestedVendor')}: <span className="font-medium">{req.suggestedVendor}</span></p>
                            {req.estimatedCost > 0 && (
                              <p className="text-xs text-gray-600">{t('estimatedCost')}: <span className="font-medium">฿{req.estimatedCost.toLocaleString()}</span></p>
                            )}
                          </div>
                        </div>
                        {req.status === 'shortage' && (
                          <Button
                            size="sm"
                            onClick={() => handleCreatePR(req)}
                            className="ml-4"
                          >
                            {t('createPR')}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: AI Recommendations */}
          <div className="space-y-4">
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  {t('theSupplyCommander')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-700">
                        🤖 {recommendations.length} {t('aiRecommendations')}
                      </p>
                      {recommendations.map(rec => {
                        const Icon = aiIcons[rec.type]
                        return (
                          <div
                            key={rec.id}
                            className={`border rounded-lg p-3 ${severityColors[rec.severity]}`}
                          >
                            <div className="flex items-start gap-2">
                              <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">{rec.title}</p>
                                <p className="text-xs mt-1">{rec.message}</p>
                                {rec.action && (
                                  <Button
                                    size="sm"
                                    className="mt-2 w-full"
                                    onClick={() => handleApplyRecommendation(rec.id)}
                                  >
                                    {rec.action.label}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-700">{t('allOptimized')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('quickStats')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">{t('itemsToOrder')}</p>
                  <p className="text-2xl font-bold">{stats.shortages}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('estimatedSpend')}</p>
                  <p className="text-2xl font-bold text-green-600">
                    ฿{stats.totalValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">{t('urgentActions')}</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.urgentItems}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
