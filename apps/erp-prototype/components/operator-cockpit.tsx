'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Square, Plus, Minus, AlertTriangle, Clock, Target, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { JobTicket, mockDefectCodes, mockDowntimeReasons } from '@/lib/manufacturing-data'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface OperatorCockpitProps {
  jobTicket: JobTicket
  onUpdateStatus: (status: JobTicket['status']) => void
  onReportOutput: (type: 'good' | 'scrap', qty: number) => void
  onReportDowntime: (reasonCode: string, remark: string) => void
}

export function OperatorCockpit({ jobTicket, onUpdateStatus, onReportOutput, onReportDowntime }: OperatorCockpitProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [goodQty, setGoodQty] = useState(0)
  const [scrapQty, setScrapQty] = useState(0)
  const [showDefectDialog, setShowDefectDialog] = useState(false)
  const [showDowntimeDialog, setShowDowntimeDialog] = useState(false)
  const [selectedDefectCode, setSelectedDefectCode] = useState('')
  const [selectedDowntimeCode, setSelectedDowntimeCode] = useState('')
  const [remark, setRemark] = useState('')

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (jobTicket.status === 'in_progress') {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [jobTicket.status])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((jobTicket.actualGoodQty + jobTicket.actualScrapQty) / jobTicket.targetQty) * 100
  const isOnTime = elapsedTime <= jobTicket.standardTimeMin * 60

  const handleStart = () => {
    onUpdateStatus('in_progress')
  }

  const handlePause = () => {
    setShowDowntimeDialog(true)
  }

  const handleStop = () => {
    onUpdateStatus('completed')
  }

  const handleReportGood = () => {
    if (goodQty > 0) {
      onReportOutput('good', goodQty)
      setGoodQty(0)
    }
  }

  const handleReportScrap = () => {
    if (scrapQty > 0) {
      setShowDefectDialog(true)
    }
  }

  const handleDefectSubmit = () => {
    if (selectedDefectCode && scrapQty > 0) {
      onReportOutput('scrap', scrapQty)
      setScrapQty(0)
      setSelectedDefectCode('')
      setShowDefectDialog(false)
    }
  }

  const handleDowntimeSubmit = () => {
    if (selectedDowntimeCode) {
      onReportDowntime(selectedDowntimeCode, remark)
      onUpdateStatus('paused')
      setSelectedDowntimeCode('')
      setRemark('')
      setShowDowntimeDialog(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="space-y-4">
      {/* Job Info Header */}
      <Card className="border-2 border-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{jobTicket.productName}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {jobTicket.ticketNumber} • {jobTicket.workCenterName}
              </p>
            </div>
            <Badge className={`${getPriorityColor(jobTicket.priority)} text-white text-lg px-4 py-2`}>
              {jobTicket.priority.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Target</p>
              <p className="text-3xl font-bold">{jobTicket.targetQty}</p>
              <p className="text-xs text-gray-500">{jobTicket.unit}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{jobTicket.actualGoodQty}</p>
              <p className="text-xs text-gray-500">{progress.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Due Date</p>
              <p className="text-xl font-bold">{new Date(jobTicket.dueDate).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500">{new Date(jobTicket.dueDate).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timer & Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className={`text-6xl font-mono font-bold ${isOnTime ? 'text-green-600' : 'text-red-600'}`}>
              {formatTime(elapsedTime)}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Standard Time: {jobTicket.standardTimeMin} min
              {!isOnTime && <span className="text-red-600 ml-2">⚠️ Behind Schedule</span>}
            </p>
          </div>

          {/* Big Control Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button
              size="lg"
              className="h-24 text-xl bg-green-600 hover:bg-green-700"
              onClick={handleStart}
              disabled={jobTicket.status === 'in_progress' || jobTicket.status === 'completed'}
            >
              <Play className="h-8 w-8 mr-2" />
              START
            </Button>
            <Button
              size="lg"
              className="h-24 text-xl bg-yellow-600 hover:bg-yellow-700"
              onClick={handlePause}
              disabled={jobTicket.status !== 'in_progress'}
            >
              <Pause className="h-8 w-8 mr-2" />
              PAUSE
            </Button>
            <Button
              size="lg"
              className="h-24 text-xl bg-red-600 hover:bg-red-700"
              onClick={handleStop}
              disabled={jobTicket.status === 'completed'}
            >
              <Square className="h-8 w-8 mr-2" />
              STOP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Report Output
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Good Quantity */}
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="text-sm font-medium mb-2">Good Quantity</p>
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="h-16 w-16"
                onClick={() => setGoodQty(Math.max(0, goodQty - 1))}
              >
                <Minus className="h-6 w-6" />
              </Button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={goodQty}
                  onChange={(e) => setGoodQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="text-4xl font-bold text-center w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <Button
                size="lg"
                variant="outline"
                className="h-16 w-16"
                onClick={() => setGoodQty(goodQty + 1)}
              >
                <Plus className="h-6 w-6" />
              </Button>
              <Button
                size="lg"
                className="h-16 bg-green-600 hover:bg-green-700"
                onClick={handleReportGood}
                disabled={goodQty === 0}
              >
                <CheckCircle2 className="h-6 w-6 mr-2" />
                Report
              </Button>
            </div>
          </div>

          {/* Scrap Quantity */}
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <p className="text-sm font-medium mb-2">Scrap Quantity</p>
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="h-16 w-16"
                onClick={() => setScrapQty(Math.max(0, scrapQty - 1))}
              >
                <Minus className="h-6 w-6" />
              </Button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={scrapQty}
                  onChange={(e) => setScrapQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="text-4xl font-bold text-center w-full bg-transparent border-none focus:outline-none"
                />
              </div>
              <Button
                size="lg"
                variant="outline"
                className="h-16 w-16"
                onClick={() => setScrapQty(scrapQty + 1)}
              >
                <Plus className="h-6 w-6" />
              </Button>
              <Button
                size="lg"
                className="h-16 bg-red-600 hover:bg-red-700"
                onClick={handleReportScrap}
                disabled={scrapQty === 0}
              >
                <AlertTriangle className="h-6 w-6 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Defect Dialog */}
      <Dialog open={showDefectDialog} onOpenChange={setShowDefectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Defect</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Defect Code</label>
              <Select value={selectedDefectCode} onValueChange={setSelectedDefectCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select defect code" />
                </SelectTrigger>
                <SelectContent>
                  {mockDefectCodes.map((code) => (
                    <SelectItem key={code.code} value={code.code}>
                      {code.code} - {code.name} ({code.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Quantity: {scrapQty}</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDefectDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDefectSubmit} disabled={!selectedDefectCode}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Downtime Dialog */}
      <Dialog open={showDowntimeDialog} onOpenChange={setShowDowntimeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Downtime</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Reason Code</label>
              <Select value={selectedDowntimeCode} onValueChange={setSelectedDowntimeCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason code" />
                </SelectTrigger>
                <SelectContent>
                  {mockDowntimeReasons.map((reason) => (
                    <SelectItem key={reason.code} value={reason.code}>
                      {reason.code} - {reason.name} ({reason.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Remark</label>
              <Textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Additional details..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDowntimeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDowntimeSubmit} disabled={!selectedDowntimeCode}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
