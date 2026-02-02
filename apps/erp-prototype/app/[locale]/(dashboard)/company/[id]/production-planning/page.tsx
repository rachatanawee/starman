'use client'

import { ProjectLayout, DynamicTitle, Card, CardContent, CardHeader, CardTitle, Button, Badge, useParams, useTranslations, useState } from '@/lib/common-exports'
import { Plus, Sparkles, AlertTriangle, TrendingDown, Zap, Clock, CheckCircle, BookOpen, Package, Factory, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { mockAIInsights, mockPlanItems, AIInsight, PlanItem, InsightType, Severity } from '@/lib/production-planning-data'
import { FloatingUndo, StatusIndicator } from '@/components/feedback'

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
  const locale = (params.locale as string) || 'en'
  const t = useTranslations('productionPlanning')
  const [insights, setInsights] = useState<AIInsight[]>(mockAIInsights)
  const [planItems, setPlanItems] = useState<PlanItem[]>(mockPlanItems)
  const [isRunningAI, setIsRunningAI] = useState(false)
  const [draggedItem, setDraggedItem] = useState<PlanItem | null>(null)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [newOrder, setNewOrder] = useState({ orderNumber: '', productName: '', quantity: '', workCenter: 'Press Brake' })
  const [weekOffset, setWeekOffset] = useState(0)
  const [filterWorkCenter, setFilterWorkCenter] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchPO, setSearchPO] = useState('')
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')
  const [undoAction, setUndoAction] = useState<{ message: string; action: () => void } | null>(null)
  const [aiStatus, setAIStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleResolveInsight = (insightId: string) => {
    const oldInsights = [...insights]
    setInsights(insights.map(i => i.id === insightId ? { ...i, isResolved: true } : i))
    setUndoAction({
      message: 'AI insight resolved',
      action: () => setInsights(oldInsights)
    })
  }

  const handleRunAI = () => {
    setAIStatus('loading')
    setTimeout(() => {
      const oldItems = [...planItems]
      const updated = planItems.map(item => {
        if (!item.startDate) {
          const bestDate = weekDates.reduce((best, date) => {
            const capacity = getCapacityForDate(date)
            const bestCapacity = getCapacityForDate(best)
            return capacity < bestCapacity ? date : best
          })
          return {
            ...item,
            startDate: bestDate,
            endDate: new Date(new Date(bestDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'adjusted' as const,
            aiAdjustedReason: 'AI optimized for capacity balance'
          }
        }
        return item
      })
      setPlanItems(updated)
      setAIStatus('success')
      setTimeout(() => setAIStatus('idle'), 2000)
      setUndoAction({
        message: 'AI scheduled 2 orders',
        action: () => setPlanItems(oldItems)
      })
    }, 2000)
  }

  const handleDragStart = (item: PlanItem) => {
    setDraggedItem(item)
  }

  const handleDrop = (date: string) => {
    if (!draggedItem || !draggedItem.startDate || !draggedItem.endDate) return
    const oldItems = [...planItems]
    const duration = new Date(draggedItem.endDate).getTime() - new Date(draggedItem.startDate).getTime()
    const newEndDate = new Date(new Date(date).getTime() + duration).toISOString().split('T')[0]
    setPlanItems(planItems.map(item => 
      item.id === draggedItem.id 
        ? { ...item, startDate: date, endDate: newEndDate, status: 'adjusted' as const }
        : item
    ))
    setDraggedItem(null)
    setUndoAction({
      message: `${draggedItem.orderNumber} moved to ${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      action: () => setPlanItems(oldItems)
    })
  }

  const handleCreateOrder = () => {
    if (!newOrder.orderNumber || !newOrder.productName || !newOrder.quantity) return
    const order: PlanItem = {
      id: `plan-${Date.now()}`,
      orderNumber: newOrder.orderNumber,
      salesOrderIds: [],
      productName: newOrder.productName,
      quantity: parseInt(newOrder.quantity),
      startDate: '',
      endDate: '',
      workCenter: newOrder.workCenter,
      status: 'scheduled',
      isLocked: false
    }
    const oldItems = [...planItems]
    setPlanItems([...planItems, order])
    setNewOrder({ orderNumber: '', productName: '', quantity: '', workCenter: 'Press Brake' })
    setShowNewOrder(false)
    setUndoAction({
      message: `${order.orderNumber} created`,
      action: () => setPlanItems(oldItems)
    })
  }

  const unresolvedInsights = insights.filter(i => !i.isResolved)
  const criticalCount = unresolvedInsights.filter(i => i.severity === 'critical' || i.severity === 'high').length

  // Generate dates based on view mode
  const dates = viewMode === 'week' 
    ? Array.from({ length: 7 }, (_, i) => {
        const date = new Date('2026-01-27')
        date.setDate(date.getDate() + i + (weekOffset * 7))
        return date.toISOString().split('T')[0]
      })
    : (() => {
        const year = 2026
        const month = weekOffset
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        return Array.from({ length: lastDay.getDate() }, (_, i) => {
          const date = new Date(year, month, i + 1)
          return date.toISOString().split('T')[0]
        })
      })()

  const weekDates = dates
  const periodStart = new Date(dates[0])
  const periodEnd = new Date(dates[dates.length - 1])
  const periodLabel = viewMode === 'week'
    ? `${periodStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${periodEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${periodStart.getFullYear()}`
    : `${periodStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`

  const filteredItems = planItems.filter(item => {
    if (filterWorkCenter !== 'All' && item.workCenter !== filterWorkCenter) return false
    if (filterStatus !== 'All' && item.status !== filterStatus) return false
    if (searchPO && !item.orderNumber.toLowerCase().includes(searchPO.toLowerCase())) return false
    return true
  })

  const unplannedItems = filteredItems.filter(item => !item.startDate)
  const getItemsForDate = (date: string) => filteredItems.filter(item => item.startDate === date)
  const getCapacityForDate = (date: string) => {
    const items = getItemsForDate(date)
    const load = items.length * 30
    return Math.min(load, 150)
  }
  const getCapacityColor = (capacity: number) => {
    if (capacity >= 100) return '🔴'
    if (capacity >= 80) return '🟡'
    return '🟢'
  }

  const materialStatus = (item: PlanItem) => {
    if (item.status === 'conflict') return { icon: '🔴', label: 'Missing' }
    if (item.status === 'adjusted') return { icon: '🟡', label: 'Partial' }
    return { icon: '🟢', label: 'Ready' }
  }

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Production Planning" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              Production Planning Board
            </h1>
            <p className="text-gray-600 mt-1">{viewMode === 'week' ? `Week ${5 + weekOffset}` : ''} {periodLabel}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-lg">
              <Button 
                variant={viewMode === 'week' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('week')}
                className="rounded-r-none"
              >
                Week
              </Button>
              <Button 
                variant={viewMode === 'month' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('month')}
                className="rounded-l-none"
              >
                Month
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset - 1)}>
              ← Prev
            </Button>
            <Button variant="outline" size="sm" onClick={() => setWeekOffset(0)} disabled={weekOffset === 0}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset + 1)}>
              Next →
            </Button>
            <Link href="/guide?tab=production&section=production-planning">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </Link>
            <Button
              onClick={handleRunAI}
              disabled={aiStatus === 'loading'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {aiStatus === 'loading' ? (
                <StatusIndicator status="loading" size="sm" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {aiStatus === 'loading' ? 'Analyzing...' : 'Run AI Planning'}
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-5 gap-3">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{filteredItems.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Unplanned</p>
              <p className="text-2xl font-bold text-gray-600">{unplannedItems.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-green-600">{filteredItems.filter(p => p.status === 'scheduled').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Conflicts</p>
              <p className="text-2xl font-bold text-red-600">{filteredItems.filter(p => p.status === 'conflict').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">AI Adjusted</p>
              <p className="text-2xl font-bold text-yellow-600">{filteredItems.filter(p => p.status === 'adjusted').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search PO..."
            value={searchPO}
            onChange={(e) => setSearchPO(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm w-48"
          />
          <select
            value={filterWorkCenter}
            onChange={(e) => setFilterWorkCenter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option>All Work Centers</option>
            <option>Press Brake</option>
            <option>Shearing Machine</option>
            <option>Slitting Machine</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option>All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="adjusted">AI Adjusted</option>
            <option value="conflict">Conflict</option>
          </select>
        </div>

        {/* AI Insights Bar */}
        {unresolvedInsights.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Insights:</span>
                <Badge variant="destructive">{criticalCount} Critical</Badge>
                <span className="text-sm text-gray-600">{unresolvedInsights.length} total issues</span>
              </div>
              <div className="flex gap-2">
                {unresolvedInsights.slice(0, 2).map((insight) => {
                  const Icon = insightIcons[insight.type]
                  return (
                    <Button
                      key={insight.id}
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolveInsight(insight.id)}
                      className="text-xs"
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {insight.suggestedAction?.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Planning Board */}
        {viewMode === 'week' ? (
          <div className="flex gap-3 overflow-x-auto pb-4">
            {/* Unplanned Column */}
            <div className="flex-shrink-0 w-64">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Unplanned</CardTitle>
                  <p className="text-xs text-gray-500">{unplannedItems.length} orders</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {unplannedItems.map(item => {
                    const material = materialStatus(item)
                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="border rounded-lg p-3 bg-white hover:shadow-md cursor-move transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold text-sm">{item.orderNumber}</span>
                          <Badge variant="outline" className="text-xs">{item.quantity}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{item.productName}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1">
                            <Factory className="h-3 w-3" />
                            {item.workCenter}
                          </span>
                          <span>{material.icon} {material.label}</span>
                        </div>
                      </div>
                    )
                  })}
                  {showNewOrder ? (
                    <div className="border rounded-lg p-3 bg-blue-50 border-blue-300 space-y-2">
                      <input
                        placeholder="PO Number"
                        value={newOrder.orderNumber}
                        onChange={(e) => setNewOrder({...newOrder, orderNumber: e.target.value})}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                      <input
                        placeholder="Product Name"
                        value={newOrder.productName}
                        onChange={(e) => setNewOrder({...newOrder, productName: e.target.value})}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={newOrder.quantity}
                        onChange={(e) => setNewOrder({...newOrder, quantity: e.target.value})}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                      <select
                        value={newOrder.workCenter}
                        onChange={(e) => setNewOrder({...newOrder, workCenter: e.target.value})}
                        className="w-full px-2 py-1 text-sm border rounded"
                      >
                        <option>Press Brake</option>
                        <option>Shearing Machine</option>
                        <option>Slitting Machine</option>
                      </select>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleCreateOrder} className="flex-1">Create</Button>
                        <Button size="sm" variant="outline" onClick={() => setShowNewOrder(false)} className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setShowNewOrder(true)}>
                      <Plus className="h-3 w-3 mr-1" />
                      New Order
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Date Columns */}
            {dates.map((date, index) => {
              const items = getItemsForDate(date)
              const capacity = getCapacityForDate(date)
              const capacityIcon = getCapacityColor(capacity)
              const dateObj = new Date(date)
              const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
              const dayNum = dateObj.getDate()

              return (
                <div key={date} className="flex-shrink-0 w-64">
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">{dayName} {dayNum}</CardTitle>
                      <p className="text-xs text-gray-500">
                        {capacityIcon} {capacity}%
                      </p>
                    </CardHeader>
                    <CardContent
                      className="space-y-2 min-h-[400px]"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(date)}
                    >
                      {items.map(item => {
                        const material = materialStatus(item)
                        const duration = Math.ceil((new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
                        
                        return (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(item)}
                            className={`border rounded-lg p-3 cursor-move hover:shadow-md transition-shadow ${
                              item.status === 'conflict' ? 'bg-red-50 border-red-300' :
                              item.status === 'adjusted' ? 'bg-yellow-50 border-yellow-300' :
                              'bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-semibold text-sm">{item.orderNumber}</span>
                              <Badge variant="outline" className="text-xs">{item.quantity}</Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{item.productName}</p>
                            <div className="mb-2">
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    item.status === 'conflict' ? 'bg-red-500' :
                                    item.status === 'adjusted' ? 'bg-yellow-500' :
                                    'bg-blue-500'
                                  }`}
                                  style={{ width: `${(duration / 7) * 100}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{duration}d duration</p>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1">
                                <Factory className="h-3 w-3" />
                                {item.workCenter}
                              </span>
                              <span>{material.icon}</span>
                            </div>
                            {item.aiAdjustedReason && (
                              <p className="text-xs text-primary mt-2 italic">🤖 AI adjusted</p>
                            )}
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">{day}</div>
            ))}
            {Array.from({ length: new Date(dates[0]).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="border rounded-lg bg-gray-50 min-h-[120px]" />
            ))}
            {dates.map(date => {
              const items = getItemsForDate(date)
              const capacity = getCapacityForDate(date)
              const capacityIcon = getCapacityColor(capacity)
              const dateObj = new Date(date)
              const dayNum = dateObj.getDate()

              return (
                <div
                  key={date}
                  className="border rounded-lg p-2 min-h-[120px] hover:bg-gray-50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(date)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{dayNum}</span>
                    <span className="text-xs">{capacityIcon}</span>
                  </div>
                  <div className="space-y-1">
                    {items.map(item => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className={`text-xs p-1 rounded cursor-move ${
                          item.status === 'conflict' ? 'bg-red-100' :
                          item.status === 'adjusted' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}
                      >
                        {item.orderNumber}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
