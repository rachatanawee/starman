'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Calendar, ZoomIn, ZoomOut, Save } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import { mockPlanItems, PlanItem } from '@/lib/production-planning-data'
import { toast } from 'sonner'

export default function GanttChartPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const locale = params.locale as string
  const [zoom, setZoom] = useState<'day' | 'week'>('day')
  const [filterWC, setFilterWC] = useState('all')
  const [items, setItems] = useState<PlanItem[]>(mockPlanItems)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const workCenters = ['all', ...Array.from(new Set(items.map(i => i.workCenter)))]
  const filteredItems = filterWC === 'all' ? items : items.filter(i => i.workCenter === filterWC)
  
  const timelineDays = zoom === 'day' ? 7 : 4
  const timelineLabels = zoom === 'day' 
    ? ['Mon 27 Jan', 'Tue 28 Jan', 'Wed 29 Jan', 'Thu 30 Jan', 'Fri 31 Jan', 'Sat 1 Feb', 'Sun 2 Feb']
    : ['W5 (27-28 Jan)', 'W5 (29-31 Jan)', 'W6 (1-2 Feb)', 'W6 (3-4 Feb)']
  const daysPerUnit = zoom === 'day' ? 1 : 2

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetDate: number) => {
    e.preventDefault()
    if (!draggedItem) return

    setItems(prev => prev.map(item => {
      if (item.id === draggedItem) {
        const duration = new Date(item.endDate).getDate() - new Date(item.startDate).getDate()
        const newStartDate = `2026-${targetDate > 31 ? '02' : '01'}-${targetDate > 31 ? String(targetDate - 31).padStart(2, '0') : String(targetDate).padStart(2, '0')}`
        const newEndDate = new Date(newStartDate)
        newEndDate.setDate(newEndDate.getDate() + duration)
        return {
          ...item,
          startDate: newStartDate,
          endDate: newEndDate.toISOString().split('T')[0],
          status: 'adjusted' as const,
          aiAdjustedReason: 'Manually adjusted by user'
        }
      }
      return item
    }))
    setDraggedItem(null)
    setHasChanges(true)
    toast.success('Schedule adjusted')
  }

  const handleSave = () => {
    toast.success('Schedule saved successfully')
    setHasChanges(false)
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push(`/${locale}/company/${projectId}/production-planning`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Production Gantt Chart</h1>
              <p className="text-gray-600 mt-1">Visual timeline of production schedule</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={filterWC} onValueChange={setFilterWC}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {workCenters.map(wc => (
                  <SelectItem key={wc} value={wc}>
                    {wc === 'all' ? 'All Work Centers' : wc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setZoom('day')} disabled={zoom === 'day'}>
              <ZoomIn className="h-4 w-4 mr-2" />
              Day
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom('week')} disabled={zoom === 'week'}>
              <ZoomOut className="h-4 w-4 mr-2" />
              Week
            </Button>
            {hasChanges && (
              <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Production Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 overflow-x-auto">
              {/* Timeline Header */}
              <div className="flex min-w-[800px]">
                <div className="w-64 font-semibold text-sm border-r pr-4">Order / Work Center</div>
                <div className="flex-1 flex text-xs text-center text-gray-600 border-b pb-2">
                  {timelineLabels.map((label, i) => (
                    <div key={i} className="flex-1 border-l px-2">{label}</div>
                  ))}
                </div>
              </div>

              {/* Gantt Rows */}
              <div className="min-w-[800px]">
                {filteredItems.map(item => {
                  const startDay = new Date(item.startDate).getDate()
                  const endDay = new Date(item.endDate).getDate()
                  const duration = endDay - startDay + 1
                  const startCol = startDay - 27
                  
                  return (
                    <div key={item.id} className="flex items-center border-b py-3 hover:bg-gray-50">
                      <div className="w-64 pr-4 border-r">
                        <div className="text-sm font-medium">{item.orderNumber}</div>
                        <div className="text-xs text-gray-600">{item.productName}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.workCenter}</div>
                      </div>
                      <div className="flex-1 relative h-16 px-2">
                        <div className="absolute inset-0 flex">
                          {[...Array(timelineDays)].map((_, i) => {
                            const dayNum = 27 + (i * daysPerUnit)
                            return (
                              <div 
                                key={i} 
                                className="flex-1 border-l hover:bg-blue-50 transition-colors"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, dayNum)}
                              />
                            )
                          })}
                        </div>
                        <div
                          draggable={!item.isLocked}
                          onDragStart={(e) => handleDragStart(e, item.id)}
                          className={`absolute h-10 top-3 rounded-md px-3 flex items-center justify-between text-xs font-medium shadow-sm ${
                            item.status === 'conflict' ? 'bg-red-500 text-white' :
                            item.status === 'adjusted' ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                          } ${!item.isLocked ? 'cursor-move hover:shadow-lg' : 'cursor-not-allowed opacity-75'}`}
                          style={{
                            left: `${(startCol / daysPerUnit / timelineDays) * 100}%`,
                            width: `${(duration / daysPerUnit / timelineDays) * 100}%`,
                            minWidth: '60px',
                            maxWidth: '100%'
                          }}
                        >
                          <span className="truncate">{item.quantity} pcs</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {duration}d
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 pt-4 border-t text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded" />
                  <span>AI Adjusted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span>Conflict</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
