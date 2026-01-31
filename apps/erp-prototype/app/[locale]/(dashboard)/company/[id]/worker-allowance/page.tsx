'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { DollarSign, Users, TrendingUp, AlertTriangle, CheckCircle, X, Sparkles, Trophy, Target, History, Users2 } from 'lucide-react'
import { mockDailyAllowanceSummary, mockAllowanceTransactions, mockAICoachingAlerts, AICoachingAlert, DailyAllowanceSummary } from '@/lib/worker-allowance-data'
import { toast } from 'sonner'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  paid: 'bg-blue-100 text-blue-800'
}

const severityColors = {
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  critical: 'bg-red-100 text-red-800 border-red-300'
}

const alertIcons = {
  gamification: Target,
  fraud_detection: AlertTriangle,
  performance_insight: Trophy
}

export default function WorkerAllowancePage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [summaries, setSummaries] = useState<DailyAllowanceSummary[]>(mockDailyAllowanceSummary)
  const [alerts, setAlerts] = useState<AICoachingAlert[]>([])
  const [showAlerts, setShowAlerts] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null)

  const handleRunAI = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setAlerts(mockAICoachingAlerts)
      setShowAlerts(true)
      setIsAnalyzing(false)
      toast.success('AI Analysis completed')
    }, 2000)
  }

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId))
  }

  const handleApprove = (summaryId: string) => {
    setSummaries(prev => prev.map(s => 
      s.id === summaryId ? { ...s, status: 'approved' as const } : s
    ))
    toast.success('Allowance approved')
  }

  const handleReject = (summaryId: string) => {
    toast.error('Allowance rejected - requires review')
  }

  const stats = {
    totalWorkers: new Set(summaries.map(s => s.userId)).size,
    totalAmount: summaries.reduce((sum, s) => sum + s.totalAmount, 0),
    pendingCount: summaries.filter(s => s.status === 'pending').length,
    avgPerWorker: summaries.reduce((sum, s) => sum + s.totalAmount, 0) / new Set(summaries.map(s => s.userId)).size
  }

  const transactions = selectedSummary 
    ? mockAllowanceTransactions.filter(t => t.summaryId === selectedSummary)
    : []

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users2 className="h-8 w-8 text-primary" />
              Worker Allowance
            </h1>
            <p className="text-gray-600 mt-1">The Performance Coach - ขวัญและกำลังใจ 💰</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => router.push(`/${params.locale}/company/${projectId}/worker-allowance/history`)}
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </Button>
            <Button 
              onClick={handleRunAI}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Run AI Coach'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Workers</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalWorkers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold mt-1">฿{stats.totalAmount.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg/Worker</p>
                  <p className="text-2xl font-bold mt-1">฿{stats.avgPerWorker.toFixed(0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold mt-1 text-orange-600">{stats.pendingCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {showAlerts && alerts.length > 0 && (
          <Card className="border-primary/20 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Performance Coach Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map(alert => {
                const Icon = alertIcons[alert.type]
                return (
                  <div key={alert.id} className={`border rounded-lg p-4 bg-white ${severityColors[alert.severity]}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <Icon className="h-5 w-5 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <Badge variant="outline" className="text-xs">{alert.workerName}</Badge>
                          </div>
                          <p className="text-sm mb-2">{alert.message}</p>
                          {alert.suggestedAction && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {alert.suggestedAction}
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => handleDismissAlert(alert.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Allowance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {summaries.map(summary => (
                    <div 
                      key={summary.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedSummary === summary.id ? 'border-purple-500 bg-primary/5' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSummary(summary.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{summary.workerName}</h3>
                          <Badge className={statusColors[summary.status]}>{summary.status}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{summary.date}</p>
                          <p className="text-lg font-bold text-green-600">฿{summary.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-600">Shift</p>
                          <p className="font-medium">{summary.shiftName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Hours</p>
                          <p className="font-medium">{summary.totalWorkHours}h {summary.otHours > 0 && `(+${summary.otHours}h OT)`}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Good Qty</p>
                          <p className="font-medium text-green-600">{summary.totalGoodQty}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Scrap</p>
                          <p className={`font-medium ${summary.totalScrapQty > 5 ? 'text-red-600' : 'text-gray-700'}`}>
                            {summary.totalScrapQty}
                          </p>
                        </div>
                      </div>
                      {summary.status === 'pending' && (
                        <div className="flex gap-2 pt-3 border-t">
                          <Button size="sm" onClick={(e) => { e.stopPropagation(); handleApprove(summary.id) }}>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleReject(summary.id) }}>
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSummary ? (
                  <div className="space-y-3">
                    {transactions.map(txn => (
                      <div key={txn.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{txn.allowanceType}</h4>
                          <Badge variant="outline" className={txn.category === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {txn.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{txn.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{txn.quantity} × ฿{txn.rate}</span>
                          <span className={`font-bold ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {txn.amount >= 0 ? '+' : ''}฿{txn.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold text-green-600">
                          ฿{transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">Select a worker to view transaction details</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
