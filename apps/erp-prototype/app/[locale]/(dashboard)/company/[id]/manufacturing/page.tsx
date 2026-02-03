'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@spark/core'
import { Button } from '@spark/core'
import { Badge } from '@spark/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@spark/core'
import { Progress } from '@spark/core'
import { Input } from '@spark/core'
import { Label } from '@spark/core'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@spark/core'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@spark/core'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@spark/core'
import { Rocket, BarChart3, Users, Zap, BookOpen, Settings, Plus, Edit, Trash2, Factory, Power, AlertCircle, CheckCircle2, Clock, Wrench, X } from 'lucide-react'
import { ProjectLayout } from '@spark/core'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { mockJobTickets, mockWorkCenters, JobTicket, WorkCenter } from '@/lib/mock-data'
import { OperatorCockpit } from '@/components/operator-cockpit'
import { SupervisorDashboard } from '@/components/supervisor-dashboard'
import { useTranslations } from 'next-intl'
import { DynamicTitle } from '@spark/core'

export default function ManufacturingPage() {
  const params = useParams()
  const projectId = params.id as string
  const t = useTranslations('manufacturing')
  const [selectedJobTicket, setSelectedJobTicket] = useState<JobTicket | null>(null)
  const [jobTickets, setJobTickets] = useState(mockJobTickets)
  const [workCenters, setWorkCenters] = useState<WorkCenter[]>(mockWorkCenters)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingWorkCenter, setEditingWorkCenter] = useState<WorkCenter | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newWorkCenter, setNewWorkCenter] = useState({
    name: '',
    code: '',
    status: 'idle' as WorkCenter['status'],
    efficiency: 100,
    description: '',
    capacity: '',
    location: '',
  })

  const handleUpdateStatus = (ticketId: string, status: JobTicket['status']) => {
    setJobTickets(prev => prev.map(jt => 
      jt.id === ticketId ? { ...jt, status } : jt
    ))
  }

  const handleReportOutput = (ticketId: string, type: 'good' | 'scrap', qty: number) => {
    setJobTickets(prev => prev.map(jt => {
      if (jt.id === ticketId) {
        return {
          ...jt,
          actualGoodQty: type === 'good' ? jt.actualGoodQty + qty : jt.actualGoodQty,
          actualScrapQty: type === 'scrap' ? jt.actualScrapQty + qty : jt.actualScrapQty
        }
      }
      return jt
    }))
  }

  const handleReportDowntime = (ticketId: string, reasonCode: string, remark: string) => {
    console.log('Downtime reported:', { ticketId, reasonCode, remark })
  }

  const handleAddWorkCenter = () => {
    if (!newWorkCenter.name || !newWorkCenter.code) return
    
    // Generate random position within safe bounds (20-80% for both x and y)
    const randomX = Math.floor(Math.random() * 60) + 20
    const randomY = Math.floor(Math.random() * 60) + 20
    
    const newWC: WorkCenter = {
      id: `wc-${Date.now()}`,
      name: newWorkCenter.name,
      code: newWorkCenter.code,
      status: newWorkCenter.status,
      efficiency: newWorkCenter.efficiency,
      position: { x: randomX, y: randomY }
    }
    setWorkCenters(prev => [...prev, newWC])
    setIsAddingNew(false)
    setNewWorkCenter({
      name: '',
      code: '',
      status: 'idle',
      efficiency: 100,
      description: '',
      capacity: '',
      location: '',
    })
  }

  const handleCancelAdd = () => {
    setIsAddingNew(false)
    setNewWorkCenter({
      name: '',
      code: '',
      status: 'idle',
      efficiency: 100,
      description: '',
      capacity: '',
      location: '',
    })
  }

  const handleEditWorkCenter = (wc: WorkCenter) => {
    setEditingWorkCenter(wc)
    setIsEditDialogOpen(true)
  }

  const handleUpdateWorkCenter = () => {
    if (editingWorkCenter) {
      setWorkCenters(prev => prev.map(wc => 
        wc.id === editingWorkCenter.id ? editingWorkCenter : wc
      ))
      setIsEditDialogOpen(false)
      setEditingWorkCenter(null)
    }
  }

  const handleDeleteWorkCenter = (id: string) => {
    if (confirm('Are you sure you want to delete this work center?')) {
      setWorkCenters(prev => prev.filter(wc => wc.id !== id))
    }
  }

  const handleChangeStatus = (id: string, status: WorkCenter['status']) => {
    setWorkCenters(prev => prev.map(wc => 
      wc.id === id ? { ...wc, status } : wc
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      default: return 'bg-blue-500 text-white'
    }
  }

  const getWorkCenterStatusColor = (status: WorkCenter['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500'
      case 'idle': return 'bg-gray-400'
      case 'down': return 'bg-red-500'
      case 'setup': return 'bg-yellow-500'
      default: return 'bg-gray-400'
    }
  }

  const getWorkCenterStatusIcon = (status: WorkCenter['status']) => {
    switch (status) {
      case 'running': return CheckCircle2
      case 'idle': return Clock
      case 'down': return AlertCircle
      case 'setup': return Wrench
      default: return Clock
    }
  }

  const workCenterStats = {
    total: workCenters.length,
    running: workCenters.filter(wc => wc.status === 'running').length,
    idle: workCenters.filter(wc => wc.status === 'idle').length,
    down: workCenters.filter(wc => wc.status === 'down').length,
    avgEfficiency: Math.round(workCenters.reduce((sum, wc) => sum + wc.efficiency, 0) / workCenters.length)
  }

  return (
    
      <DynamicTitle pageTitle="Manufacturing" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="h-8 w-8 text-primary" />
              {t('title')}
            </h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/guide?tab=production&section=manufacturing-execution">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('learnMore')}
              </Button>
            </Link>
            <div className="relative group">
              <Badge variant="outline" className="text-sm bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300 text-purple-700 cursor-help flex items-center gap-1.5">
                <span className="text-base">🤖</span>
                <span>{t('coPilotActive')}</span>
              </Badge>
              <div className="absolute right-0 top-full mt-2 w-80 p-4 bg-white rounded-lg shadow-xl border-2 border-purple-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <h4 className="font-semibold text-purple-700 mb-2">AI Co-Pilot Assistant</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Your intelligent shop floor assistant that provides:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time performance monitoring</li>
                  <li>• Problem detection & alerts</li>
                  <li>• Smart suggestions for optimization</li>
                  <li>• Quality control recommendations</li>
                  <li>• Schedule adherence tracking</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    The Co-Pilot analyzes your work in real-time and provides actionable insights to improve efficiency and quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="operator" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="operator" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('operatorCockpit')}
            </TabsTrigger>
            <TabsTrigger value="supervisor" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t('supervisorDashboard')}
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Factory className="h-4 w-4" />
              Work Centers Setup
            </TabsTrigger>
          </TabsList>

          {/* Operator Cockpit Tab */}
          <TabsContent value="operator" className="space-y-6">
            {!selectedJobTicket ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {t('missionQueue')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobTickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
                        onClick={() => setSelectedJobTicket(ticket)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-bold text-lg">{ticket.productName}</p>
                              <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
                            </div>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {t(ticket.priority)}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{t('workCenter')}:</span>
                              <span className="font-medium">{ticket.workCenterName}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{t('targetQty')}:</span>
                              <span className="font-medium">{ticket.targetQty} {ticket.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{t('dueDate')}:</span>
                              <span className="font-medium">{new Date(ticket.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{t('status')}:</span>
                              <Badge className={getStatusColor(ticket.status)}>
                                {t(ticket.status)}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedJobTicket(null)}
                >
                  ← {t('backToMissionQueue')}
                </Button>
                <OperatorCockpit
                  jobTicket={selectedJobTicket}
                  onUpdateStatus={(status) => handleUpdateStatus(selectedJobTicket.id, status)}
                  onReportOutput={(type, qty) => handleReportOutput(selectedJobTicket.id, type, qty)}
                  onReportDowntime={(reasonCode, remark) => handleReportDowntime(selectedJobTicket.id, reasonCode, remark)}
                />
              </div>
            )}
          </TabsContent>

          {/* Supervisor Dashboard Tab */}
          <TabsContent value="supervisor">
            <SupervisorDashboard workCenters={workCenters} />
          </TabsContent>

          {/* Work Centers Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Work Centers</p>
                      <p className="text-3xl font-bold mt-1">{workCenterStats.total}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Factory className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Running</p>
                      <p className="text-3xl font-bold mt-1">{workCenterStats.running}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-gray-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Idle</p>
                      <p className="text-3xl font-bold mt-1">{workCenterStats.idle}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Down</p>
                      <p className="text-3xl font-bold mt-1">{workCenterStats.down}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Efficiency</p>
                      <p className="text-3xl font-bold mt-1">{workCenterStats.avgEfficiency}%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Work Centers Table */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-primary" />
                      Work Centers Management
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Configure and manage your production work centers
                    </CardDescription>
                  </div>
                  {!isAddingNew && (
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setIsAddingNew(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Work Center
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Work Center</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Current Job</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Add New Row */}
                      {isAddingNew && (
                        <TableRow className="bg-primary/5">
                          <TableCell>
                            <Input
                              placeholder="Work Center Name"
                              value={newWorkCenter.name}
                              onChange={(e) => setNewWorkCenter({ ...newWorkCenter, name: e.target.value })}
                              className="h-9"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Code"
                              value={newWorkCenter.code}
                              onChange={(e) => setNewWorkCenter({ ...newWorkCenter, code: e.target.value })}
                              className="h-9"
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={newWorkCenter.status}
                              onValueChange={(value: WorkCenter['status']) => setNewWorkCenter({ ...newWorkCenter, status: value })}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="idle">Idle</SelectItem>
                                <SelectItem value="running">Running</SelectItem>
                                <SelectItem value="setup">Setup</SelectItem>
                                <SelectItem value="down">Down</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="100"
                              value={newWorkCenter.efficiency}
                              onChange={(e) => setNewWorkCenter({ ...newWorkCenter, efficiency: parseInt(e.target.value) || 100 })}
                              className="h-9 w-20"
                            />
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-400">-</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={handleAddWorkCenter}
                                disabled={!newWorkCenter.name || !newWorkCenter.code}
                                className="bg-primary hover:bg-primary/90"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelAdd}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}

                      {/* Existing Work Centers */}
                      {workCenters.map((wc) => {
                        const StatusIcon = getWorkCenterStatusIcon(wc.status)
                        const currentJob = jobTickets.find(jt => jt.id === wc.currentJobTicket)
                        
                        return (
                          <TableRow key={wc.id} className="hover:bg-primary/5">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full ${getWorkCenterStatusColor(wc.status)} bg-opacity-20 flex items-center justify-center`}>
                                  <Factory className={`h-5 w-5 ${getWorkCenterStatusColor(wc.status).replace('bg-', 'text-')}`} />
                                </div>
                                <div>
                                  <div className="font-medium">{wc.name}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{wc.code}</Badge>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={wc.status}
                                onValueChange={(value: WorkCenter['status']) => handleChangeStatus(wc.id, value)}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <div className="flex items-center gap-2">
                                    <StatusIcon className="h-4 w-4" />
                                    <SelectValue />
                                  </div>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="idle">
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      Idle
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="running">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle2 className="h-4 w-4" />
                                      Running
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="setup">
                                    <div className="flex items-center gap-2">
                                      <Wrench className="h-4 w-4" />
                                      Setup
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="down">
                                    <div className="flex items-center gap-2">
                                      <AlertCircle className="h-4 w-4" />
                                      Down
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                  <span>{wc.efficiency}%</span>
                                </div>
                                <Progress value={wc.efficiency} className="h-2" />
                              </div>
                            </TableCell>
                            <TableCell>
                              {currentJob ? (
                                <div className="text-sm">
                                  <div className="font-medium">{currentJob.ticketNumber}</div>
                                  <div className="text-xs text-gray-500">{currentJob.productName}</div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">No active job</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditWorkCenter(wc)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteWorkCenter(wc.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {workCenters.length === 0 && !isAddingNew && (
                  <div className="text-center py-12 text-gray-500">
                    <Factory className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No work centers configured</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => setIsAddingNew(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Work Center
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Work Center</DialogTitle>
                  <DialogDescription>
                    Update work center information
                  </DialogDescription>
                </DialogHeader>
                {editingWorkCenter && (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Work Center Name</Label>
                        <Input
                          id="edit-name"
                          value={editingWorkCenter.name}
                          onChange={(e) => setEditingWorkCenter({ ...editingWorkCenter, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-code">Code</Label>
                        <Input
                          id="edit-code"
                          value={editingWorkCenter.code}
                          onChange={(e) => setEditingWorkCenter({ ...editingWorkCenter, code: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select
                          value={editingWorkCenter.status}
                          onValueChange={(value: WorkCenter['status']) => setEditingWorkCenter({ ...editingWorkCenter, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="idle">Idle</SelectItem>
                            <SelectItem value="running">Running</SelectItem>
                            <SelectItem value="setup">Setup</SelectItem>
                            <SelectItem value="down">Down</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-efficiency">Efficiency Target (%)</Label>
                        <Input
                          id="edit-efficiency"
                          type="number"
                          min="0"
                          max="100"
                          value={editingWorkCenter.efficiency}
                          onChange={(e) => setEditingWorkCenter({ ...editingWorkCenter, efficiency: parseInt(e.target.value) || 100 })}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateWorkCenter} className="bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    
  )
}
