'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Rocket, BarChart3, Users, Zap, BookOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { mockJobTickets, mockWorkCenters, JobTicket } from '@/lib/manufacturing-data'
import { OperatorCockpit } from '@/components/operator-cockpit'
import { SupervisorDashboard } from '@/components/supervisor-dashboard'

export default function ManufacturingPage() {
  const params = useParams()
  const projectId = params.id as string
  const [selectedJobTicket, setSelectedJobTicket] = useState<JobTicket | null>(null)
  const [jobTickets, setJobTickets] = useState(mockJobTickets)

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

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Rocket className="h-8 w-8 text-purple-600" />
              Manufacturing Execution (The Launch)
            </h1>
            <p className="text-gray-600 mt-1">Shop floor control and real-time monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/guide?tab=production&section=manufacturing-execution">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </Link>
            <Badge variant="outline" className="text-sm">
              🤖 The Co-Pilot Active
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="operator" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="operator" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Operator Cockpit
            </TabsTrigger>
            <TabsTrigger value="supervisor" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Supervisor Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Operator Cockpit Tab */}
          <TabsContent value="operator" className="space-y-6">
            {!selectedJobTicket ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Mission Queue - Select Your Job
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobTickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                        onClick={() => setSelectedJobTicket(ticket)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-bold text-lg">{ticket.productName}</p>
                              <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
                            </div>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Work Center:</span>
                              <span className="font-medium">{ticket.workCenterName}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Target Qty:</span>
                              <span className="font-medium">{ticket.targetQty} {ticket.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Due Date:</span>
                              <span className="font-medium">{new Date(ticket.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status.replace('_', ' ').toUpperCase()}
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
                  ← Back to Mission Queue
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
            <SupervisorDashboard workCenters={mockWorkCenters} />
          </TabsContent>
        </Tabs>
      </div>
    </ProjectLayout>
  )
}
