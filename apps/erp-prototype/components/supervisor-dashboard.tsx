'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@spark/core'
import { } from '@spark/core' // card'
import { Badge } from '@spark/core'
import { } from '@spark/core' // badge'
import { AlertCircle, Activity, TrendingUp, Clock } from 'lucide-react'
import { WorkCenter, mockOEEData } from '@/lib/mock-data'
import { Progress } from '@spark/core'
import { } from '@spark/core' // progress'

interface SupervisorDashboardProps {
  workCenters: WorkCenter[]
}

export function SupervisorDashboard({ workCenters }: SupervisorDashboardProps) {
  const getStatusColor = (status: WorkCenter['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500'
      case 'idle': return 'bg-yellow-500'
      case 'down': return 'bg-red-500'
      case 'setup': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusLabel = (status: WorkCenter['status']) => {
    switch (status) {
      case 'running': return 'Running'
      case 'idle': return 'Idle'
      case 'down': return 'Down'
      case 'setup': return 'Setup'
      default: return 'Unknown'
    }
  }

  const runningCount = workCenters.filter(wc => wc.status === 'running').length
  const downCount = workCenters.filter(wc => wc.status === 'down').length
  const idleCount = workCenters.filter(wc => wc.status === 'idle').length
  const setupCount = workCenters.filter(wc => wc.status === 'setup').length

  const alerts = [
    {
      id: 1,
      type: 'critical',
      message: 'Welding Station 1 down for 25 minutes',
      time: '5 min ago',
      workCenter: 'WLD-01'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Press Brake 1 efficiency below 80%',
      time: '12 min ago',
      workCenter: 'PRS-01'
    },
    {
      id: 3,
      type: 'info',
      message: 'Slitting Line 1 completed JOB-2026-001',
      time: '18 min ago',
      workCenter: 'SLT-01'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Running</p>
                <p className="text-3xl font-bold text-green-600">{runningCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Idle</p>
                <p className="text-3xl font-bold text-yellow-600">{idleCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Setup</p>
                <p className="text-3xl font-bold text-orange-600">{setupCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-orange-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Down</p>
                <p className="text-3xl font-bold text-red-600">{downCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-red-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Factory Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Factory Map - Live View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-50 rounded-lg p-6 h-[400px] border-2 border-gray-200 overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-4 grid-rows-4 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>

              {/* Work Centers */}
              {workCenters.map((wc) => (
                <div
                  key={wc.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${wc.position.x}%`, top: `${wc.position.y}%` }}
                >
                  <div className={`${getStatusColor(wc.status)} rounded-lg p-3 shadow-lg min-w-[120px] cursor-pointer hover:scale-105 transition-transform`}>
                    <p className="text-white font-bold text-xs">{wc.code}</p>
                    <p className="text-white text-[10px] mt-1">{wc.name}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                      <p className="text-white text-[10px]">{getStatusLabel(wc.status)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border">
                <p className="text-xs font-semibold mb-2">Status</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Running</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Idle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs">Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Down</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OEE Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              OEE Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall OEE */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Overall Equipment Effectiveness</p>
              <div className="flex items-end gap-2">
                <p className="text-5xl font-bold text-blue-600">{mockOEEData.oee}%</p>
                <p className="text-sm text-gray-500 mb-2">Target: 85%</p>
              </div>
              <Progress value={mockOEEData.oee} className="mt-3 h-3" />
            </div>

            {/* OEE Components */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Availability</span>
                  <span className="text-sm font-bold text-green-600">{mockOEEData.availability}%</span>
                </div>
                <Progress value={mockOEEData.availability} className="h-2 bg-green-100" />
                <p className="text-xs text-gray-500 mt-1">Actual Run Time / Planned Production Time</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Performance</span>
                  <span className="text-sm font-bold text-blue-600">{mockOEEData.performance}%</span>
                </div>
                <Progress value={mockOEEData.performance} className="h-2 bg-blue-100" />
                <p className="text-xs text-gray-500 mt-1">Actual Output / Standard Output</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Quality</span>
                  <span className="text-sm font-bold text-primary">{mockOEEData.quality}%</span>
                </div>
                <Progress value={mockOEEData.quality} className="h-2 bg-primary/10" />
                <p className="text-xs text-gray-500 mt-1">Good Qty / Total Qty</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Alert Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${
                  alert.type === 'critical'
                    ? 'bg-red-50 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <AlertCircle
                  className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'critical'
                      ? 'text-red-500'
                      : alert.type === 'warning'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {alert.workCenter}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
