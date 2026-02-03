'use client'

import { useState } from 'react'
import { ProjectLayout } from '@/lib/common-exports'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Sparkles, Package, AlertTriangle, TrendingUp, Zap, Clock, CheckCircle, ShoppingCart, BookOpen, FileText, Calendar, Network } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { mockMRPRequirements, mockAIRecommendations, MRPRequirement, AIRecommendation } from '@/modules/manufacturing/lib/mock-data'
import { FloatingUndo, StatusIndicator } from '@/components/feedback'
import { useTranslations } from 'next-intl'
import { DynamicTitle } from '@/core/layout/dynamic-title'

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
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [undoAction, setUndoAction] = useState<{ message: string; action: () => void } | null>(null)
  const [groupBy, setGroupBy] = useState<'priority' | 'vendor' | 'date'>('priority')

  const handleRunMRP = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
    }, 2000)
  }

  const handleApplyRecommendation = (recId: string) => {
    const oldRecs = [...recommendations]
    setRecommendations(prev => prev.filter(r => r.id !== recId))
    setUndoAction({
      message: 'Recommendation applied',
      action: () => setRecommendations(oldRecs)
    })
  }

  const handleCreatePR = (items: MRPRequirement[]) => {
    const oldReqs = [...requirements]
    setRequirements(requirements.map(r => 
      items.find(i => i.id === r.id) ? { ...r, status: 'ordered' as const } : r
    ))
    setSelectedItems([])
    setUndoAction({
      message: `PR created for ${items.length} item(s)`,
      action: () => setRequirements(oldReqs)
    })
  }

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    const shortageIds = requirements.filter(r => r.status === 'shortage').map(r => r.id)
    setSelectedItems(prev => prev.length === shortageIds.length ? [] : shortageIds)
  }

  const stats = {
    totalItems: requirements.length,
    shortages: requirements.filter(r => r.status === 'shortage').length,
    totalValue: requirements.reduce((sum, r) => sum + r.estimatedCost, 0),
    urgentItems: requirements.filter(r => r.priority === 'urgent').length
  }

  const groupedRequirements = () => {
    const shortages = requirements.filter(r => r.status === 'shortage')
    if (groupBy === 'priority') {
      return {
        urgent: shortages.filter(r => r.priority === 'urgent'),
        high: shortages.filter(r => r.priority === 'high'),
        normal: shortages.filter(r => r.priority === 'normal')
      }
    } else if (groupBy === 'vendor') {
      const byVendor: Record<string, MRPRequirement[]> = {}
      shortages.forEach(r => {
        if (!byVendor[r.suggestedVendor]) byVendor[r.suggestedVendor] = []
        byVendor[r.suggestedVendor].push(r)
      })
      return byVendor
    } else {
      const byDate: Record<string, MRPRequirement[]> = {}
      shortages.forEach(r => {
        if (!byDate[r.suggestedOrderDate]) byDate[r.suggestedOrderDate] = []
        byDate[r.suggestedOrderDate].push(r)
      })
      return byDate
    }
  }

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="MRP" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Network className="h-8 w-8 text-primary" />
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
              className="bg-primary hover:bg-primary/90"
            >
              {isRunning ? <StatusIndicator status="loading" size="sm" /> : <Sparkles className="h-4 w-4 mr-2" />}
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
                <Package className="h-8 w-8 text-primary" />
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
                <AlertTriangle className="h-8 w-8 text-primary" />
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
                <ShoppingCart className="h-8 w-8 text-primary" />
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
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* AI Recommendations Bar */}
          {recommendations.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">AI Supply Commander:</span>
                  <span className="text-sm text-gray-600">{recommendations.length} recommendations</span>
                </div>
                <div className="flex gap-2">
                  {recommendations.slice(0, 2).map((rec) => {
                    const Icon = aiIcons[rec.type]
                    return (
                      <Button
                        key={rec.id}
                        size="sm"
                        variant="outline"
                        onClick={() => handleApplyRecommendation(rec.id)}
                        className="text-xs"
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {rec.action?.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{selectedItems.length} items selected</span>
                <Button
                  size="sm"
                  onClick={() => handleCreatePR(requirements.filter(r => selectedItems.includes(r.id)))}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create PR for Selected
                </Button>
              </div>
            </div>
          )}

          {/* Group By */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Group by:</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={groupBy === 'priority' ? 'default' : 'outline'}
                onClick={() => setGroupBy('priority')}
              >
                Priority
              </Button>
              <Button
                size="sm"
                variant={groupBy === 'vendor' ? 'default' : 'outline'}
                onClick={() => setGroupBy('vendor')}
              >
                Vendor
              </Button>
              <Button
                size="sm"
                variant={groupBy === 'date' ? 'default' : 'outline'}
                onClick={() => setGroupBy('date')}
              >
                Order Date
              </Button>
            </div>
            <Button size="sm" variant="outline" onClick={toggleSelectAll} className="ml-auto">
              Select All Shortages
            </Button>
          </div>

          {/* Requirements by Group */}
          {Object.entries(groupedRequirements()).map(([group, items]) => (
            <Card key={group}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="capitalize">{group} ({items.length})</span>
                  {groupBy === 'vendor' && (
                    <span className="text-sm font-normal text-gray-600">
                      Total: ฿{items.reduce((sum, i) => sum + i.estimatedCost, 0).toLocaleString()}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map(req => (
                  <div
                    key={req.id}
                    className={`border rounded-lg p-4 ${
                      selectedItems.includes(req.id) ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedItems.includes(req.id)}
                        onCheckedChange={() => toggleSelect(req.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{req.productName}</h3>
                          <Badge className={priorityColors[req.priority]}>{req.priority}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Shortage: <span className="font-bold text-red-600">{req.shortageQty}</span></p>
                            <p className="text-gray-600">Cost: <span className="font-medium">฿{req.estimatedCost.toLocaleString()}</span></p>
                          </div>
                          <div>
                            <p className="text-gray-600">Order by: <span className="font-medium">{new Date(req.suggestedOrderDate).toLocaleDateString()}</span></p>
                            <p className="text-gray-600">Lead time: <span className="font-medium">{req.leadTimeDays}d</span></p>
                          </div>
                          <div>
                            <p className="text-gray-600">Vendor: <span className="font-medium">{req.suggestedVendor}</span></p>
                          </div>
                        </div>
                        {/* Traceability */}
                        <div className="border-t pt-2">
                          <p className="text-xs font-medium text-gray-700 mb-1">Used in:</p>
                          <div className="flex flex-wrap gap-2">
                            {req.allocations.map((alloc, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {alloc.salesOrderNumber} ({alloc.customerName}) → {alloc.productionOrderNumber}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {undoAction && (
        <FloatingUndo
          message={undoAction.message}
          onUndo={undoAction.action}
          onDismiss={() => setUndoAction(null)}
        />
      )}
    </ProjectLayout>
  )
}
