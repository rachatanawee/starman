'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, Sparkles, AlertTriangle, TrendingDown, Zap, Clock, CheckCircle, Lock, BookOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { mockAIInsights, mockPlanItems, AIInsight, PlanItem, InsightType, Severity } from '@/lib/production-planning-data'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

const insightIcons: Record<InsightType, any> = {
  capacity_conflict: AlertTriangle,
  material_risk: TrendingDown,
  cost_optimization: Zap,
  deadline_risk: Clock
}

const severityColors: Record<Severity, string> = {
  low: 'bg-blue-100 text-blue-800 border-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300'
}

const statusColors = {
  scheduled: 'bg-green-100 text-green-800',
  adjusted: 'bg-yellow-100 text-yellow-800',
  conflict: 'bg-red-100 text-red-800'
}

export default function ProductionPlanningPage() {
  const params = useParams()
  const projectId = params.id as string
  const t = useTranslations('productionPlanning')
  const [insights, setInsights] = useState<AIInsight[]>(mockAIInsights)
  const [planItems, setPlanItems] = useState<PlanItem[]>(mockPlanItems)
  const [isRunningAI, setIsRunningAI] = useState(false)

  const handleResolveInsight = (insightId: string) => {
    setInsights(insights.map(i => i.id === insightId ? { ...i, isResolved: true } : i))
    toast.success('Action applied successfully')
  }

  const handleRunAI = () => {
    setIsRunningAI(true)
    setTimeout(() => {
      setIsRunningAI(false)
      toast.success('AI analysis completed')
    }, 2000)
  }

  const unresolvedInsights = insights.filter(i => !i.isResolved)
  const criticalCount = unresolvedInsights.filter(i => i.severity === 'critical' || i.severity === 'high').length

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/guide?tab=production&section=production-planning">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('learnMore')}
              </Button>
            </Link>
            <Button
              onClick={handleRunAI}
              disabled={isRunningAI}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isRunningAI ? t('analyzing') : t('runAIPlanning')}
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              {t('newPlan')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Panel: Schedule */}
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {t('productionSchedule')}
                  </CardTitle>
                  {criticalCount > 0 && (
                    <Badge variant="destructive">
                      {criticalCount} {t('criticalIssues')}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {planItems.map(item => {
                    const Icon = item.status === 'conflict' ? AlertTriangle : item.status === 'adjusted' ? Zap : CheckCircle
                    
                    return (
                      <div
                        key={item.id}
                        className={`border rounded-lg p-4 ${
                          item.status === 'conflict' ? 'border-red-300 bg-red-50' :
                          item.status === 'adjusted' ? 'border-yellow-300 bg-yellow-50' :
                          'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${
                                item.status === 'conflict' ? 'text-red-600' :
                                item.status === 'adjusted' ? 'text-yellow-600' :
                                'text-green-600'
                              }`} />
                              <h3 className="font-semibold">{item.orderNumber}</h3>
                              <Badge className={statusColors[item.status]}>
                                {t(item.status)}
                              </Badge>
                              {item.isLocked && (
                                <Lock className="h-3 w-3 text-gray-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{item.productName}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-gray-600">Qty: {item.quantity}</span>
                              <span className="text-gray-600">
                                {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                              </span>
                              <span className="text-gray-600">WC: {item.workCenter}</span>
                            </div>
                            {item.salesOrderIds.length > 0 && (
                              <p className="text-xs text-blue-600 mt-2">
                                📋 From: {item.salesOrderIds.join(', ')}
                              </p>
                            )}
                            {item.aiAdjustedReason && (
                              <p className="text-xs text-yellow-700 mt-2 italic">
                                🤖 {item.aiAdjustedReason}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('capacityOverview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Press Brake</span>
                      <span className="font-semibold text-red-600">150%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Shearing Machine</span>
                      <span className="font-semibold text-green-600">75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Slitting Machine</span>
                      <span className="font-semibold text-yellow-600">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '90%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: AI Strategist */}
          <div className="space-y-6">
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  {t('theStrategist')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unresolvedInsights.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-700">
                        🤖 Detected {unresolvedInsights.length} {t('issuesDetected')}
                      </p>
                      {unresolvedInsights.map((insight, index) => {
                        const Icon = insightIcons[insight.type]
                        
                        return (
                          <div
                            key={insight.id}
                            className={`border rounded-lg p-3 ${severityColors[insight.severity]}`}
                          >
                            <div className="flex items-start gap-2">
                              <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">{index + 1}. {insight.title}</p>
                                <p className="text-xs mt-1">{insight.message}</p>
                                {insight.suggestedAction && (
                                  <Button
                                    size="sm"
                                    className="mt-2 w-full"
                                    onClick={() => handleResolveInsight(insight.id)}
                                  >
                                    {insight.suggestedAction.label}
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
                      <p className="text-sm text-gray-700">{t('allClear')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('quickStats')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">{t('totalOrders')}</p>
                  <p className="text-2xl font-bold">{planItems.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('conflicts')}</p>
                  <p className="text-2xl font-bold text-red-600">
                    {planItems.filter(p => p.status === 'conflict').length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">{t('aiAdjusted')}</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {planItems.filter(p => p.status === 'adjusted').length}
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
