'use client'

import { ProjectLayout, DynamicTitle, Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, useParams, useState } from '@/lib/common-exports'
import { 
  History, CheckCircle, TrendingUp, Award, 
  BookOpen, Search, Calendar, DollarSign, List
} from 'lucide-react'
import Link from 'next/link'
import { 
  mockJobHistory, 
  calculateJobHistoryStats,
  getTopPerformers,
  JobHistoryRecord
} from '@/lib/mock-data'

export default function JobHistoryPage() {
  const params = useParams()
  const projectId = params.id as string
  const locale = params.locale as string
  const [jobs] = useState<JobHistoryRecord[]>(mockJobHistory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<JobHistoryRecord | null>(null)

  const stats = calculateJobHistoryStats(jobs)
  const topPerformers = getTopPerformers(jobs)

  const filteredJobs = jobs.filter(job => 
    job.productionOrderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Job History" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <History className="h-8 w-8 text-primary" />
              Job History
            </h1>
            <p className="text-gray-600 mt-1">Completed production orders and performance analysis</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/${locale}/company/${projectId}/job-history/jobs-log`}>
              <Button variant="outline">
                <List className="h-4 w-4 mr-2" />
                Jobs Log
              </Button>
            </Link>
            <Link href="/guide?tab=reports">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalJobs}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Yield Rate</p>
                  <p className="text-2xl font-bold mt-1">{stats.avgYieldRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">On-Time Rate</p>
                  <p className="text-2xl font-bold mt-1">{stats.onTimeRate.toFixed(0)}%</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold mt-1">฿{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order number, product, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Completed Jobs ({filteredJobs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredJobs.map(job => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedJob?.id === job.id
                          ? 'border-purple-500 bg-primary/5'
                          : 'border-gray-200 hover:border-purple-300'
                      } ${job.costVariance > 0 ? 'border-l-4 border-l-orange-500' : 'border-l-4 border-l-green-500'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold">{job.productionOrderNo}</h3>
                            {job.onTimeDelivery ? (
                              <Badge className="bg-green-100 text-green-800">On Time</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Late</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{job.productName}</p>
                          <p className="text-xs text-gray-500">{job.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">฿{job.totalActualCost.toLocaleString()}</p>
                          <p className={`text-sm font-semibold ${
                            job.costVariance > 0 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {job.costVariance > 0 ? '+' : ''}฿{job.costVariance.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className="text-gray-600">Qty</p>
                          <p className="font-semibold">{job.completedQty}/{job.targetQty}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Yield</p>
                          <p className="font-semibold">{job.yieldRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Quality</p>
                          <p className="font-semibold">{job.qualityScore}/100</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Efficiency</p>
                          <p className="font-semibold">{job.efficiency}%</p>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                        <span>{new Date(job.startDate).toLocaleDateString()}</span>
                        <span className="mx-2">→</span>
                        <span>{new Date(job.completionDate).toLocaleDateString()}</span>
                        <span className="ml-2">({job.durationDays} days)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {selectedJob ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Production Order</p>
                    <p className="font-bold">{selectedJob.productionOrderNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Product</p>
                    <p className="font-semibold text-sm">{selectedJob.productName}</p>
                    <p className="text-xs text-gray-500">{selectedJob.productSku}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Customer</p>
                    <p className="text-sm">{selectedJob.customer}</p>
                    <p className="text-xs text-gray-500">SO: {selectedJob.salesOrderNo}</p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Cost Breakdown</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Direct Material</span>
                        <span className="font-semibold">฿{selectedJob.actualDMCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Direct Labor</span>
                        <span className="font-semibold">฿{selectedJob.actualDLCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overhead</span>
                        <span className="font-semibold">฿{selectedJob.actualOHCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Actual</span>
                        <span className="font-bold">฿{selectedJob.totalActualCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Standard Cost</span>
                        <span>฿{selectedJob.standardCost.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between font-semibold ${
                        selectedJob.costVariance > 0 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        <span>Variance</span>
                        <span>{selectedJob.costVariance > 0 ? '+' : ''}฿{selectedJob.costVariance.toLocaleString()} ({selectedJob.variancePercent.toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Unit Cost</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Actual</span>
                        <span className="font-semibold">฿{selectedJob.unitActualCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Standard</span>
                        <span>฿{selectedJob.unitStandardCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Production Details</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operator</span>
                        <span className="font-semibold">{selectedJob.primaryOperator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Work Center</span>
                        <span>{selectedJob.workCenter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Machine Hours</span>
                        <span>{selectedJob.machineHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Labor Hours</span>
                        <span>{selectedJob.laborHours}h</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500 py-8">
                    <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select a job to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.slice(0, 5).map((performer, idx) => (
                    <div key={performer.operator} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                        idx === 1 ? 'bg-gray-100 text-gray-800' :
                        idx === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{performer.operator}</p>
                        <p className="text-xs text-gray-600">
                          {performer.jobsCompleted} jobs • {performer.avgEfficiency.toFixed(0)}% efficiency
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          {performer.avgQuality.toFixed(0)}
                        </p>
                        <p className="text-xs text-gray-500">quality</p>
                      </div>
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
