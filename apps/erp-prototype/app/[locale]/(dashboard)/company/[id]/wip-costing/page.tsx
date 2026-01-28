'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, TrendingUp, AlertTriangle, Clock, 
  Sparkles, BookOpen, Package, Activity, Target
} from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  mockWIPBalances, 
  mockCostLedger, 
  mockAIFinancialAlerts,
  costAllocationRules,
  WIPBalance,
  CostLedgerEntry,
  AIFinancialAlert
} from '@/lib/wip-costing-data'
import { toast } from 'sonner'

const statusColors = {
  in_progress: 'bg-blue-100 text-blue-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800'
}

const severityColors = {
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  critical: 'bg-red-100 text-red-800 border-red-300'
}

const costTypeColors = {
  DM: 'bg-purple-100 text-purple-800',
  DL: 'bg-blue-100 text-blue-800',
  OH: 'bg-orange-100 text-orange-800'
}

export default function WIPCostingPage() {
  const params = useParams()
  const projectId = params.id as string
  const [wipBalances, setWipBalances] = useState<WIPBalance[]>(mockWIPBalances)
  const [costLedger] = useState<CostLedgerEntry[]>(mockCostLedger)
  const [alerts, setAlerts] = useState<AIFinancialAlert[]>(mockAIFinancialAlerts)
  const [selectedOrder, setSelectedOrder] = useState<WIPBalance | null>(null)

  const stats = {
    totalWIPValue: wipBalances.reduce((sum, w) => sum + w.totalWIPValue, 0),
    activeJobs: wipBalances.filter(w => w.status === 'in_progress').length,
    avgVariance: wipBalances.reduce((sum, w) => sum + w.variancePercent, 0) / wipBalances.length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length
  }

  const handleApplyRecommendation = (alert: AIFinancialAlert) => {
    // Simulate different actions based on alert type
    switch (alert.type) {
      case 'margin_erosion':
        toast.success('🔧 Quality check scheduled for Cutting Machine', {
          description: 'Maintenance team notified. Operator training session booked for tomorrow.'
        })
        break
      case 'variance_spike':
        toast.success('🛠️ Preventive maintenance scheduled', {
          description: 'Bending Machine #2 hydraulic system inspection added to work queue.'
        })
        break
      case 'wip_aging':
        toast.success('▶️ Production resumed', {
          description: `${alert.productionOrderNo} moved to priority queue. Estimated completion: 2 days.`
        })
        // Update WIP status
        setWipBalances(prev => prev.map(w => 
          w.productionOrderNo === alert.productionOrderNo 
            ? { ...w, status: 'in_progress' as const }
            : w
        ))
        break
      case 'pricing_suggestion':
        toast.success('💰 Price list updated', {
          description: 'Steel Beam +8%, Channel Steel +10%. New prices effective next quotation.'
        })
        break
    }
    
    // Remove alert after applying
    setAlerts(prev => prev.filter(a => a.id !== alert.id))
  }

  const orderLedger = selectedOrder 
    ? costLedger.filter(c => c.productionOrderNo === selectedOrder.productionOrderNo)
    : []

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              WIP Costing
            </h1>
            <p className="text-gray-600 mt-1">Real-time job costing and variance analysis</p>
          </div>
          <div className="flex gap-2">
            <Link href="/guide?tab=reports">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Sparkles className="h-4 w-4 mr-2" />
              The Financial Analyst
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total WIP Value</p>
                  <p className="text-2xl font-bold mt-1">฿{stats.totalWIPValue.toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold mt-1">{stats.activeJobs}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Variance</p>
                  <p className="text-2xl font-bold mt-1 text-orange-600">
                    {stats.avgVariance.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold mt-1 text-red-600">{stats.criticalAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Alerts */}
        {alerts.length > 0 && (
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                🤖 The Financial Analyst - AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-4 bg-white ${severityColors[alert.severity]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">{alert.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {alert.productionOrderNo}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">{alert.description}</p>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Impact:</span> {alert.impact}
                      </p>
                      <p className="text-sm text-blue-700 mb-2">
                        <span className="font-semibold">💡 Recommendation:</span> {alert.recommendation}
                      </p>
                      {alert.estimatedSavings && (
                        <p className="text-sm text-green-700 font-semibold">
                          💰 Potential Savings: ฿{alert.estimatedSavings.toLocaleString()}
                        </p>
                      )}
                    </div>
                    {alert.actionable && (
                      <Button
                        size="sm"
                        onClick={() => handleApplyRecommendation(alert)}
                        className="ml-4"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left: WIP Balances */}
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>WIP Balances (งานระหว่างทำ)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {wipBalances.map(wip => (
                    <div
                      key={wip.id}
                      onClick={() => setSelectedOrder(wip)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedOrder?.id === wip.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      } ${wip.variancePercent > 10 ? 'border-l-4 border-l-red-500' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold">{wip.productionOrderNo}</h3>
                            <Badge className={statusColors[wip.status]}>
                              {wip.status.replace('_', ' ')}
                            </Badge>
                            {wip.daysInWIP > 7 && (
                              <Badge variant="outline" className="text-orange-600 border-orange-300">
                                <Clock className="h-3 w-3 mr-1" />
                                {wip.daysInWIP}d
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{wip.productName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">฿{wip.totalWIPValue.toLocaleString()}</p>
                          <p className={`text-sm font-semibold ${
                            wip.costVariance > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {wip.costVariance > 0 ? '+' : ''}฿{wip.costVariance.toLocaleString()} 
                            ({wip.variancePercent > 0 ? '+' : ''}{wip.variancePercent.toFixed(1)}%)
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress: {wip.completedQty}/{wip.targetQty}</span>
                          <span>{wip.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                            style={{ width: `${wip.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Cost Breakdown */}
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600 text-xs">DM (Material)</p>
                          <p className="font-semibold">฿{wip.totalDMCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">DL (Labor)</p>
                          <p className="font-semibold">฿{wip.totalDLCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">OH (Overhead)</p>
                          <p className="font-semibold">฿{wip.totalOHCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Unit Cost</p>
                          <p className="font-semibold">฿{wip.unitActualCost.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {selectedOrder ? 'Job Cost Details' : 'Select a Job'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedOrder ? (
                  <Tabs defaultValue="ledger">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="ledger">Ledger</TabsTrigger>
                      <TabsTrigger value="variance">Variance</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="ledger" className="space-y-2 mt-4">
                      <h4 className="font-semibold text-sm mb-2">Cost Ledger Entries</h4>
                      {orderLedger.map(entry => (
                        <div key={entry.id} className="border rounded p-2 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <Badge className={costTypeColors[entry.costType]} variant="outline">
                              {entry.costType}
                            </Badge>
                            <span className="font-bold">฿{entry.amount.toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700 mb-1">{entry.description}</p>
                          <p className="text-gray-500">
                            {entry.quantityUsed} × ฿{entry.unitCostAtTime} = ฿{entry.amount}
                          </p>
                          <p className="text-gray-400 text-[10px] mt-1">
                            {new Date(entry.transactionDate).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="variance" className="mt-4">
                      <div className="space-y-3">
                        <div className="border rounded p-3">
                          <p className="text-xs text-gray-600 mb-1">Standard Cost</p>
                          <p className="text-lg font-bold">
                            ฿{selectedOrder.standardCostEstimate.toLocaleString()}
                          </p>
                        </div>
                        <div className="border rounded p-3">
                          <p className="text-xs text-gray-600 mb-1">Actual Cost</p>
                          <p className="text-lg font-bold">
                            ฿{selectedOrder.totalWIPValue.toLocaleString()}
                          </p>
                        </div>
                        <div className={`border rounded p-3 ${
                          selectedOrder.costVariance > 0 ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
                        }`}>
                          <p className="text-xs text-gray-600 mb-1">Variance</p>
                          <p className={`text-lg font-bold ${
                            selectedOrder.costVariance > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {selectedOrder.costVariance > 0 ? '+' : ''}฿{selectedOrder.costVariance.toLocaleString()}
                            <span className="text-sm ml-2">
                              ({selectedOrder.variancePercent > 0 ? '+' : ''}{selectedOrder.variancePercent.toFixed(1)}%)
                            </span>
                          </p>
                        </div>
                        {selectedOrder.costVariance > 0 && (
                          <div className="bg-yellow-50 border border-yellow-300 rounded p-3">
                            <p className="text-xs font-semibold text-yellow-800 mb-1">
                              ⚠️ Over Budget
                            </p>
                            <p className="text-xs text-yellow-700">
                              This job is running {selectedOrder.variancePercent.toFixed(1)}% over standard cost. 
                              Review material usage and machine efficiency.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select a production order to view cost details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Allocation Rules */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">OH Allocation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {costAllocationRules.map((rule, idx) => (
                    <div key={idx} className="text-xs border-b pb-2">
                      <p className="font-semibold">{rule.workCenter}</p>
                      <p className="text-gray-600">
                        ฿{rule.ohRatePerHour}/hr ({rule.type.replace('_', ' ')})
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
