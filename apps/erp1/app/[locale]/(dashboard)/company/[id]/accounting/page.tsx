'use client'

import { ProjectLayout, DynamicTitle, Card, CardContent, CardHeader, CardTitle, Button, Badge, useParams, useRouter, useState } from '@/lib/common-exports'
import { RefreshCw, Settings, AlertTriangle, CheckCircle2, Clock, XCircle, FileText, TrendingUp, Zap, ExternalLink, Calculator } from 'lucide-react'
import { mockIntegration, mockSyncLogs, mockAIAlerts as mockAccountingAlerts, mockTaxSummary, mockAccountMappings, getSyncStats } from '@/lib/mock-data/accounting-data'

export default function AccountingPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const stats = getSyncStats()
  const [alerts, setAlerts] = useState(mockAccountingAlerts)
  const [syncing, setSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncMessage, setSyncMessage] = useState('')

  const handleAutoFix = (alertId: number) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId))
  }

  const handleDismiss = (alertId: number) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId))
  }

  const handleSync = async () => {
    setSyncing(true)
    setSyncProgress(0)
    
    const steps = [
      { progress: 20, message: 'Connecting to FlowAccount API...' },
      { progress: 40, message: 'Validating account mappings...' },
      { progress: 60, message: 'Syncing pending documents...' },
      { progress: 80, message: 'Updating sync logs...' },
      { progress: 100, message: 'Sync completed successfully!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setSyncProgress(step.progress)
      setSyncMessage(step.message)
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    setSyncing(false)
    setSyncProgress(0)
    setSyncMessage('')
  }

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Accounting" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              Accounting Interface
            </h1>
            <p className="text-gray-600 mt-1">Bridge to Thai accounting software (Pre-Accounting Hub)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/company/${projectId}/accounting/configure`)}>
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSync} disabled={syncing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        {syncing && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{syncMessage}</span>
                  <span className="text-sm font-semibold text-primary">{syncProgress}%</span>
                </div>
                <div className="w-full bg-primary/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Integration Status
              </span>
              <Badge variant={mockIntegration.connectionStatus === 'online' ? 'default' : 'destructive'} className="bg-green-500">
                {mockIntegration.connectionStatus === 'online' ? '● Online' : '● Offline'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{mockIntegration.providerLabel}</p>
                <p className="text-sm text-gray-500">Last sync: {mockIntegration.lastSyncAt?.toLocaleString('th-TH')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Auto-sync: {mockIntegration.autoSync ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sync Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Sync</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                </div>
                <XCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Synced</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.success}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary font-medium">AI Alerts</p>
                  <p className="text-2xl font-bold text-primary">{alerts.length}</p>
                </div>
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Reconciliation Alerts */}
        {alerts.length > 0 && (
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-primary">AI Reconciliation Agent</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`border rounded-lg p-4 space-y-2 ${
                  alert.severity === 'high' ? 'border-primary/20 bg-red-50' :
                  alert.severity === 'medium' ? 'border-primary/20 bg-orange-50' : 'border-yellow-200 bg-yellow-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                        alert.severity === 'high' ? 'text-red-500' :
                        alert.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        {alert.documentRef && (
                          <p className="text-sm text-primary mt-1">📄 {alert.documentRef}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">💡 {alert.suggestedAction}</p>
                      </div>
                    </div>
                      <div className="flex gap-2">
                      {alert.canAutoFix && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleAutoFix(alert.id)}>
                          Auto-Fix
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleDismiss(alert.id)}>
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Tax Staging */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tax Staging - {mockTaxSummary.month}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-500">VAT Sales</p>
                <p className="text-lg font-semibold text-green-600">฿{mockTaxSummary.vatSales.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">VAT Purchase</p>
                <p className="text-lg font-semibold text-blue-600">฿{mockTaxSummary.vatPurchase.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">VAT Payable</p>
                <p className="text-lg font-semibold text-red-600">฿{mockTaxSummary.vatPayable.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">WHT Issued</p>
                <p className="text-lg font-semibold">฿{mockTaxSummary.whtIssued.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">WHT Received</p>
                <p className="text-lg font-semibold">฿{mockTaxSummary.whtReceived.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export VAT Report
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export WHT List (50 ทวิ)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sync Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sync Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockSyncLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      log.syncStatus === 'success' ? 'bg-green-500' :
                      log.syncStatus === 'failed' ? 'bg-red-500' :
                      log.syncStatus === 'pending' ? 'bg-orange-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium">{log.documentNumber}</p>
                      <p className="text-sm text-gray-500">
                        {log.documentType} • {log.syncAction} • ฿{log.amount.toLocaleString()}
                      </p>
                      {log.errorMessage && (
                        <p className="text-sm text-red-600 mt-1">⚠️ {log.errorMessage}</p>
                      )}
                      {log.externalRefId && (
                        <p className="text-sm text-primary mt-1">🔗 {log.externalRefId}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={log.syncStatus === 'success' ? 'default' : log.syncStatus === 'failed' ? 'destructive' : 'secondary'}>
                      {log.syncStatus}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{log.syncedAt.toLocaleTimeString('th-TH')}</p>
                    {log.retryCount > 0 && (
                      <p className="text-xs text-orange-600">Retry: {log.retryCount}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Mappings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>GL Account Mappings</span>
              <Button variant="outline" size="sm" onClick={() => router.push(`/company/${projectId}/accounting/configure`)}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Mappings
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAccountMappings.map(mapping => (
                <div key={mapping.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{mapping.sourceLabel}</p>
                    <p className="text-sm text-gray-500">{mapping.sourceType}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold">{mapping.externalAccountCode}</p>
                    <p className="text-sm text-gray-600">{mapping.externalAccountName}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
