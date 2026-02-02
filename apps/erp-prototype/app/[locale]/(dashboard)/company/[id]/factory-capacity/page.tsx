'use client'

import { ProjectLayout, DynamicTitle, Card, CardContent, CardHeader, CardTitle, Button, Badge, useParams, useState } from '@/lib/common-exports'
import { Clock, Factory, AlertTriangle, TrendingUp, Zap, CheckCircle, X, Sparkles, Building2 } from 'lucide-react'
import { mockWorkCenterCapacity, mockMachineDowntime, mockAICapacityAlerts, AICapacityAlert } from '@/lib/mock-data'
import { toast } from 'sonner'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

const statusColors = {
  normal: 'bg-green-100 text-green-800',
  overload: 'bg-red-100 text-red-800',
  underload: 'bg-blue-100 text-blue-800'
}

const severityColors = {
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  critical: 'bg-red-100 text-red-800 border-red-300'
}

const alertIcons = {
  ot_suggestion: Clock,
  smart_maintenance: CheckCircle,
  bottleneck_detection: AlertTriangle
}

export default function FactoryCapacityPage() {
  const params = useParams()
  const projectId = params.id as string
  const [alerts, setAlerts] = useState<AICapacityAlert[]>([])
  const [showAlerts, setShowAlerts] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId))
  }

  const handleApplyAction = (alert: AICapacityAlert) => {
    toast.success(`Applied: ${alert.suggestedAction}`)
    handleDismissAlert(alert.id)
  }

  const chartData = mockWorkCenterCapacity.map(cap => ({
    name: cap.workCenterName,
    Available: cap.totalAvailableHours,
    Loaded: cap.loadedHours,
    loadPct: cap.loadPercentage
  }))

  const stats = {
    totalCapacity: mockWorkCenterCapacity.reduce((sum, c) => sum + c.totalAvailableHours, 0),
    totalLoad: mockWorkCenterCapacity.reduce((sum, c) => sum + c.loadedHours, 0),
    overloadCount: mockWorkCenterCapacity.filter(c => c.status === 'overload').length,
    downtimeCount: mockMachineDowntime.filter(d => d.status === 'scheduled').length
  }

  const avgLoad = stats.totalCapacity > 0 ? (stats.totalLoad / stats.totalCapacity * 100).toFixed(1) : 0

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Factory Capacity" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              Factory Capacity
            </h1>
            <p className="text-gray-600 mt-1">The Capacity Balancer - ผู้คุมกฎแห่งเวลา ⏱️</p>
          </div>
          <Button 
            onClick={() => {
              setIsAnalyzing(true)
              setTimeout(() => {
                setAlerts(mockAICapacityAlerts)
                setShowAlerts(true)
                setIsAnalyzing(false)
                toast.success('AI Analysis completed')
              }, 2000)
            }}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Capacity</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalCapacity} hrs</p>
                </div>
                <Factory className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Load</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalLoad.toFixed(1)} hrs</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Load</p>
                  <p className={`text-2xl font-bold mt-1 ${Number(avgLoad) > 100 ? 'text-red-600' : 'text-green-600'}`}>
                    {avgLoad}%
                  </p>
                </div>
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overload</p>
                  <p className="text-2xl font-bold mt-1 text-red-600">{stats.overloadCount}</p>
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
                AI Capacity Balancer Alerts
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
                            <Badge variant="outline" className="text-xs">{alert.workCenterName}</Badge>
                          </div>
                          <p className="text-sm mb-2">{alert.message}</p>
                          <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => handleApplyAction(alert)}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {alert.suggestedAction}
                            </Button>
                            <span className="text-xs text-gray-600">{alert.date}</span>
                          </div>
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
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Capacity vs Load</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="Available" fill="#8b5cf6" name="Available Capacity" />
                    <Bar dataKey="Loaded" fill="#3b82f6" name="Loaded Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Center Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockWorkCenterCapacity.map(cap => (
                    <div key={cap.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{cap.workCenterName}</h3>
                          <Badge className={statusColors[cap.status]}>{cap.status}</Badge>
                        </div>
                        <span className="text-sm text-gray-600">{cap.date}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Available</p>
                          <p className="font-semibold">{cap.totalAvailableHours} hrs</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Loaded</p>
                          <p className="font-semibold">{cap.loadedHours} hrs</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Load %</p>
                          <p className={`font-bold ${cap.loadPercentage > 100 ? 'text-red-600' : 'text-green-600'}`}>
                            {cap.loadPercentage}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Variance</p>
                          <p className={`font-semibold ${cap.loadedHours > cap.totalAvailableHours ? 'text-red-600' : 'text-green-600'}`}>
                            {(cap.totalAvailableHours - cap.loadedHours).toFixed(1)} hrs
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${cap.loadPercentage > 100 ? 'bg-red-600' : cap.loadPercentage > 90 ? 'bg-orange-500' : 'bg-green-600'}`}
                            style={{ width: `${Math.min(cap.loadPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Scheduled Downtime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMachineDowntime.filter(d => d.status === 'scheduled').map(dt => (
                    <div key={dt.id} className="border rounded-lg p-3 bg-yellow-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {dt.downtimeType.replace('_', ' ')}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{dt.workCenterName}</h4>
                      <p className="text-xs text-gray-600 mb-2">{dt.reason}</p>
                      <div className="text-xs space-y-1">
                        <p><span className="text-gray-600">Start:</span> {new Date(dt.startTime).toLocaleString()}</p>
                        <p><span className="text-gray-600">Duration:</span> {dt.impactHours} hrs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Downtime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMachineDowntime.filter(d => d.status === 'completed').map(dt => (
                    <div key={dt.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-red-100">
                          {dt.downtimeType}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{dt.workCenterName}</h4>
                      <p className="text-xs text-gray-600 mb-2">{dt.reason}</p>
                      <p className="text-xs text-gray-600">Impact: {dt.impactHours} hrs</p>
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
