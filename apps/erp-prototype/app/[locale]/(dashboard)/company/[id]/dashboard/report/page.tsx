'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  GitBranch, Users, DollarSign, AlertTriangle, 
  CheckCircle2, Clock, Printer, ArrowLeft, Brain, TrendingUp, AlertCircle, Code2, FileCode, Bug, TrendingDown, Wallet
} from 'lucide-react'
import { mockProjectsAPI, mockTasksAPI, type MockProject, type MockTask } from '@/lib/mock-data'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ProjectReportPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project] = useState<MockProject | null>(() => mockProjectsAPI.getSync(projectId))
  const [tasks] = useState<MockTask[]>(() => mockTasksAPI.listSync(projectId))

  const handlePrint = () => {
    window.print()
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h2>
          <Button onClick={() => router.back()}>Back</Button>
        </div>
      </div>
    )
  }

  const taskStats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    blocked: tasks.filter(t => t.status === 'blocked').length
  }

  const budgetPercentage = Math.round((project.spent / project.budget) * 100)
  const progressPercentage = Math.round((taskStats.done / taskStats.total) * 100)
  
  const workloadData = projectId === '2' ? [
    { name: 'Diana Prince', tasks: 8, hours: 64 },
    { name: 'Clark Kent', tasks: 6, hours: 48 },
    { name: 'Barry Allen', tasks: 8, hours: 64 },
    { name: 'Hal Jordan', tasks: 5, hours: 40 },
    { name: 'Oliver Queen', tasks: 4, hours: 32 },
  ] : [
    { name: 'Alice', tasks: 12, hours: 96 },
    { name: 'Bob', tasks: 8, hours: 64 },
    { name: 'Charlie', tasks: 10, hours: 80 },
  ]
  
  const taskStatusData = [
    { name: 'Done', value: taskStats.done, color: '#10b981' },
    { name: 'In Progress', value: taskStats.inProgress, color: '#3b82f6' },
    { name: 'To Do', value: taskStats.todo, color: '#6b7280' },
    { name: 'Blocked', value: taskStats.blocked, color: '#ef4444' },
  ].filter(item => item.value > 0)

  const risks = projectId === '2' ? [
    { title: 'Integration Delays', impact: 'High', probability: 'Medium', status: 'Active' },
    { title: 'Resource Shortage', impact: 'Medium', probability: 'Low', status: 'Mitigated' },
    { title: 'Scope Creep', impact: 'High', probability: 'Medium', status: 'Monitoring' },
  ] : [
    { title: 'Technical Debt', impact: 'Medium', probability: 'High', status: 'Active' },
    { title: 'Timeline Risk', impact: 'High', probability: 'Medium', status: 'Monitoring' },
  ]

  const recentActivities = [
    { type: 'completed', title: 'Setup Authentication System', time: '2 hours ago' },
    { type: 'started', title: 'Design Dashboard UI', time: '5 hours ago' },
    { type: 'member', title: 'Barry Allen joined the team', time: '1 day ago' },
    { type: 'completed', title: 'Database Schema Design', time: '2 days ago' },
    { type: 'started', title: 'API Development', time: '3 days ago' },
  ]

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-page-break {
            page-break-after: always;
          }
          .print-avoid-break {
            page-break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      `}</style>

      {/* Screen-only Header */}
      <div className="no-print bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Project Status Report</h1>
          </div>
          <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white">
        {/* Report Header */}
        <div className="mb-8 print-avoid-break">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <GitBranch className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-200 py-3 mt-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Report Date:</span>
                <span className="ml-2 font-semibold">21 มกราคม 2026</span>
              </div>
              <div>
                <span className="text-gray-600">Project ID:</span>
                <span className="ml-2 font-semibold">{projectId}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-semibold text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8 print-avoid-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            สรุปผู้บริหาร (Executive Summary)
          </h2>
          
          {/* AI Insights Section */}
          <div className="mb-6 bg-gradient-to-br from-purple-50 to-white border-2 border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900">AI Project Analysis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-100">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Project Health: Good</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Project is on track with {progressPercentage}% completion. 
                      Budget utilization is healthy at {budgetPercentage}%. 
                      Team velocity is {taskStats.inProgress > 5 ? 'high' : 'moderate'} with {taskStats.inProgress} active tasks.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Risk Assessment</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {taskStats.blocked > 0 ? `${taskStats.blocked} blocked tasks detected. ` : 'No blocked tasks. '}
                      {risks.length} active risks require monitoring. 
                      {budgetPercentage > 80 ? 'Budget approaching limit - review spending.' : 'Budget is within acceptable range.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-100">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm mb-2">AI Recommendations</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {taskStats.todo > 10 ? 'Consider adding resources for upcoming sprint. ' : ''}
                      {taskStats.blocked > 0 ? 'Prioritize unblocking tasks to maintain velocity. ' : ''}
                      {budgetPercentage > 75 ? 'Review cost optimization opportunities.' : 'Continue current resource allocation.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code Analysis */}
            <div className="bg-white p-4 rounded-lg border border-purple-100 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-sm">Code Quality Metrics</h4>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">A</div>
                  <div className="text-xs text-gray-600 mt-1">Quality Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">72%</div>
                  <div className="text-xs text-gray-600 mt-1">Test Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">18.5K</div>
                  <div className="text-xs text-gray-600 mt-1">Lines of Code</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-xs text-gray-600 mt-1">Critical Issues</div>
                </div>
              </div>
            </div>
            
            {/* Cost Analysis */}
            <div className="bg-white p-4 rounded-lg border border-purple-100 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-sm">Cost Efficiency Analysis</h4>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{budgetPercentage > 90 ? 'Critical' : budgetPercentage > 75 ? 'Warning' : 'Healthy'}</div>
                  <div className="text-xs text-gray-600 mt-1">Budget Health</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">฿{Math.round(project.spent / 6).toLocaleString()}</div>
                  <div className="text-xs text-gray-600 mt-1">Burn Rate/mo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">฿{Math.round(project.spent / taskStats.done).toLocaleString()}</div>
                  <div className="text-xs text-gray-600 mt-1">Cost per Task</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">฿{Math.round(project.spent * 1.15).toLocaleString()}</div>
                  <div className="text-xs text-gray-600 mt-1">Projected Total</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">Progress</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{progressPercentage}%</div>
              <div className="text-xs text-gray-600 mt-1">{taskStats.done}/{taskStats.total} tasks</div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600">Budget</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{budgetPercentage}%</div>
              <div className="text-xs text-gray-600 mt-1">
                ฿{project.spent.toLocaleString()} / ฿{project.budget.toLocaleString()}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600">Team</span>
              </div>
              <div className="text-3xl font-bold text-primary">{project.members}</div>
              <div className="text-xs text-gray-600 mt-1">Active members</div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600">Risks</span>
              </div>
              <div className="text-3xl font-bold text-orange-600">{risks.length}</div>
              <div className="text-xs text-gray-600 mt-1">Active risks</div>
            </div>
          </div>
        </div>

        {/* Task Status Breakdown */}
        <div className="mb-8 print-avoid-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            สถานะงาน (Task Status)
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Completed</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{taskStats.done}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold">In Progress</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold">To Do</span>
                </div>
                <span className="text-2xl font-bold text-gray-600">{taskStats.todo}</span>
              </div>
              {taskStats.blocked > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 border border-primary/20 rounded">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">Blocked</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{taskStats.blocked}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Break */}
        <div className="print-page-break"></div>

        {/* Team Workload */}
        <div className="mb-8 print-avoid-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            ภาระงานทีม (Team Workload)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workloadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks" />
              <Bar dataKey="hours" fill="#3b82f6" name="Hours" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Management */}
        <div className="mb-8 print-avoid-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            การจัดการความเสี่ยง (Risk Management)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 font-semibold">Risk</th>
                  <th className="text-left p-3 font-semibold">Impact</th>
                  <th className="text-left p-3 font-semibold">Probability</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="p-3">{risk.title}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        risk.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        risk.probability === 'High' ? 'bg-red-100 text-red-700' : 
                        risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {risk.probability}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        risk.status === 'Active' ? 'bg-orange-100 text-orange-700' : 
                        risk.status === 'Mitigated' ? 'bg-green-100 text-green-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {risk.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8 print-avoid-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            กิจกรรมล่าสุด (Recent Activity)
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
                <div className={`p-2 rounded-full ${
                  activity.type === 'completed' ? 'bg-green-100' :
                  activity.type === 'started' ? 'bg-blue-100' :
                  'bg-primary/10'
                }`}>
                  {activity.type === 'completed' ? (
                    <CheckCircle2 className={`h-4 w-4 ${
                      activity.type === 'completed' ? 'text-green-600' : ''
                    }`} />
                  ) : activity.type === 'started' ? (
                    <Clock className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Users className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Summary */}
        <div className="mb-8 print-avoid-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            สรุปงบประมาณ (Budget Summary)
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Allocation</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Budget</span>
                    <span className="font-semibold">฿{project.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Spent</span>
                    <span className="font-semibold text-green-600">฿{project.spent.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${budgetPercentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-semibold text-blue-600">฿{(project.budget - project.spent).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${100 - budgetPercentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Burn Rate</span>
                  <span className="text-lg font-bold text-gray-900">฿{Math.round(project.spent / 6).toLocaleString()}/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Projected Completion</span>
                  <span className="text-lg font-bold text-gray-900">June 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Budget Status</span>
                  <span className={`text-lg font-bold ${
                    budgetPercentage > 90 ? 'text-red-600' : 
                    budgetPercentage > 75 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {budgetPercentage > 90 ? 'At Risk' : budgetPercentage > 75 ? 'Warning' : 'On Track'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>ProjectFlow - Project Status Report</p>
          <p className="mt-1">Generated on 21 มกราคม 2026</p>
          <p className="mt-1 text-xs text-gray-500">This report is confidential and intended for internal use only.</p>
        </div>
      </div>
    </>
  )
}
