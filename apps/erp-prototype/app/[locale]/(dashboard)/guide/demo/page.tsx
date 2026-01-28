'use client'

import { ProjectLayout } from '@/components/project-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  PlayCircle, Clock, Users, Target, Sparkles, GitBranch, 
  BarChart3, CheckSquare, FileText, Calendar,
  TrendingUp, Video, Lightbulb, ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'

export default function DemoGuidePage() {
  const params = useParams()
  const router = useRouter()

  return (
    <ProjectLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <PlayCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Demo Walkthrough</h1>
                  <p className="text-gray-600 text-base mt-1">
                    คู่มือสำหรับการ Demo ProjectFlow แบบ Step-by-Step (15 นาที)
                  </p>
                </div>
              </div>
              <Button 
                variant="outline"
                onClick={() => router.push(`/${params.locale}/guide`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับไปคู่มือ
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Overview */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Target className="h-5 w-5 text-gray-700" />
                ภาพรวม Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <Clock className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">ระยะเวลา</h3>
                  <p className="text-sm text-gray-600">15 นาที (แบ่งเป็น 6 ส่วน)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <Users className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">กลุ่มเป้าหมาย</h3>
                  <p className="text-sm text-gray-600">PM, SA, Dev Team, ผู้บริหาร</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <Sparkles className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">จุดเด่น</h3>
                  <p className="text-sm text-gray-600">AI + GitLab Integration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Flow */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <PlayCircle className="h-5 w-5 text-gray-700" />
                ขั้นตอนการ Demo (6 ส่วน)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {[
                {
                  num: 1,
                  time: '2 นาที',
                  title: 'Introduction',
                  icon: Target,
                  color: 'blue',
                  content: [
                    'แสดงหน้า Login และ Projects list',
                    'เน้น 3 sample projects พร้อม metrics',
                    'อธิบาย: "ProjectFlow เชื่อมต่อการวางแผนกับ GitLab"'
                  ]
                },
                {
                  num: 2,
                  time: '3 นาที',
                  title: 'Project Dashboard',
                  icon: BarChart3,
                  color: 'green',
                  content: [
                    'เข้า WMS Project → Dashboard',
                    'แสดง Charts: Task distribution, Team workload, Burndown',
                    'เน้น: "Real-time data จาก GitLab, ไม่ต้อง update ด้วยตนเอง"'
                  ]
                },
                {
                  num: 3,
                  time: '3 นาที',
                  title: 'AI Requirements Analyzer',
                  icon: Sparkles,
                  color: 'purple',
                  content: [
                    'ไปหน้า Requirements',
                    'Paste meeting transcript ในช่อง AI Analyzer',
                    'คลิก "Analyze with AI"',
                    'แสดง Requirements + Acceptance Criteria ที่ AI สร้าง',
                    'เน้น: "ประหยัดเวลา 2-3 วัน → 30 นาที"'
                  ]
                },
                {
                  num: 4,
                  time: '4 นาที',
                  title: 'AI Task Generation',
                  icon: CheckSquare,
                  color: 'orange',
                  content: [
                    'ไปหน้า Tasks',
                    'Copy Requirements จากหน้า Requirements',
                    'Paste ใน AI Task Generator',
                    'ตั้ง Sprint Start Date และ Duration',
                    'คลิก "Generate" → แสดง Tasks พร้อม estimates',
                    'คลิก "Review & Submit to GitLab"',
                    'เน้น: "AI แบ่งงานและประมาณเวลาอัตโนมัติ"'
                  ]
                },
                {
                  num: 5,
                  time: '2 นาที',
                  title: 'Gantt Chart & Timeline',
                  icon: Calendar,
                  color: 'indigo',
                  content: [
                    'ไปหน้า Gantt Chart',
                    'แสดง Interactive timeline',
                    'ทดสอบ Zoom in/out, Collapse/Expand milestones',
                    'เน้น: "Sync จาก GitLab Milestones อัตโนมัติ"'
                  ]
                },
                {
                  num: 6,
                  time: '1 นาที',
                  title: 'Additional Features',
                  icon: TrendingUp,
                  color: 'teal',
                  content: [
                    'Quick tour: Epics, Costs, Risks, Team, Acceptance',
                    'เน้น: "ครบทุกฟีเจอร์ที่ต้องการ, เชื่อมกับ GitLab ทั้งหมด"'
                  ]
                }
              ].map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className={`bg-${step.color}-50 border-2 border-${step.color}-200 rounded-lg p-6`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${step.color}-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0`}>
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className={`h-6 w-6 text-${step.color}-600`} />
                          <h3 className="font-bold text-xl text-gray-900">{step.title}</h3>
                          <Badge className={`bg-${step.color}-100 text-${step.color}-700`}>{step.time}</Badge>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {step.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Sample Meeting Transcript */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <FileText className="h-5 w-5 text-gray-700" />
                Sample Meeting Transcript สำหรับ Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap">{`Meeting Notes - WMS Project
Date: January 15, 2026
Attendees: PM, SA, Dev Team

Requirements Discussion:

1. Inventory Management
   - Real-time stock tracking
   - Low stock alerts
   - Barcode scanning support
   - Multi-warehouse support

2. Order Fulfillment
   - Pick, pack, ship workflow
   - Order prioritization
   - Shipping label generation
   - Tracking number integration

3. Reporting
   - Inventory reports
   - Order history
   - Performance metrics
   - Export to Excel/PDF

4. User Management
   - Role-based access control
   - Warehouse staff accounts
   - Activity logging
   - Permission management`}</pre>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                💡 Copy ข้อความด้านบนแล้ว Paste ในช่อง AI Requirements Analyzer
              </p>
            </CardContent>
          </Card>

          {/* Key Messages */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Lightbulb className="h-5 w-5 text-gray-700" />
                Key Messages สำหรับแต่ละกลุ่ม
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'สำหรับ Project Manager',
                    icon: Users,
                    color: 'blue',
                    messages: [
                      'ใช้เวลาวางแผนน้อยลง มีเวลาจัดการความเสี่ยงมากขึ้น',
                      'รู้สถานะโปรเจกต์แบบ Real-time ไม่ต้องถามทีม',
                      'AI ช่วยประมาณการและวางแผน Resource'
                    ]
                  },
                  {
                    title: 'สำหรับ System Analyst',
                    icon: FileText,
                    color: 'purple',
                    messages: [
                      'แปลงบันทึกการประชุมเป็น Requirements อัตโนมัติ',
                      'Acceptance Criteria ถูกสร้างให้อัตโนมัติ',
                      'Traceability ครบถ้วนจาก Requirements ถึง Code'
                    ]
                  },
                  {
                    title: 'สำหรับ Development Team',
                    icon: GitBranch,
                    color: 'green',
                    messages: [
                      'ทำงานใน GitLab ตามปกติ ไม่ต้องเรียนรู้เครื่องมือใหม่',
                      'Tasks ชัดเจน มี estimates และ priorities',
                      'Requirements ไม่คลุมเครืออีกต่อไป'
                    ]
                  },
                  {
                    title: 'สำหรับผู้บริหาร',
                    icon: TrendingUp,
                    color: 'orange',
                    messages: [
                      'มองเห็นสถานะโปรเจกต์แบบ Real-time',
                      'ติดตามงบประมาณและ Forecast',
                      'ROI: ลดเวลาวางแผน 60%, ประมาณการแม่นยำขึ้น'
                    ]
                  }
                ].map((group, idx) => {
                  const Icon = group.icon
                  return (
                    <div key={idx} className={`bg-${group.color}-50 border border-${group.color}-200 rounded-lg p-5`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`h-5 w-5 text-${group.color}-600`} />
                        <h3 className="font-semibold text-gray-900">{group.title}</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {group.messages.map((msg, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{msg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Demo Tips */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Video className="h-5 w-5 text-gray-700" />
                Tips สำหรับการ Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">✅ ควรทำ</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>เตรียม meeting transcript ไว้ copy-paste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>ทดสอบ AI generation ก่อน demo จริง</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>เปิด browser แบบ incognito/private</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>เน้นประโยชน์ที่ได้รับ ไม่ใช่แค่ฟีเจอร์</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>เตรียม backup screenshots ไว้</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">❌ ไม่ควรทำ</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>อธิบายเทคนิคเกินไป (เน้นประโยชน์)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>ใช้เวลานานเกิน 15 นาที</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>แสดงฟีเจอร์ทุกอย่าง (เลือกที่สำคัญ)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>พูดเร็วเกินไป ให้เวลาผู้ชมดูหน้าจอ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>ลืมเตรียมคำตอบสำหรับคำถามที่พบบ่อย</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Questions */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <CheckSquare className="h-5 w-5 text-gray-700" />
                คำถามที่พบบ่อยและคำตอบ
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    q: 'ProjectFlow แทนที่ GitLab หรือเปล่า?',
                    a: 'ไม่ครับ ProjectFlow เป็นเครื่องมือเสริม GitLab ข้อมูลทั้งหมดอยู่ใน GitLab ProjectFlow เป็นแค่ layer สำหรับวางแผนและแสดงผล'
                  },
                  {
                    q: 'ถ้าไม่ใช้ GitLab ใช้ได้ไหม?',
                    a: 'ปัจจุบันต้องใช้ GitLab CE การรองรับ GitHub อยู่ใน roadmap'
                  },
                  {
                    q: 'AI แม่นยำแค่ไหน?',
                    a: 'AI สร้าง Tasks ได้แม่นยำ 70-80% ในช่วงแรก และจะแม่นยำขึ้นเรื่อยๆ เมื่อเรียนรู้จากโปรเจกต์ของคุณ คุณสามารถปรับแต่งได้แบบ iterative'
                  },
                  {
                    q: 'ข้อมูลปลอดภัยไหม?',
                    a: 'ปลอดภัยครับ GitLab credentials ถูก encrypt AI providers ประมวลผลผ่าน API แต่ไม่เก็บข้อมูล'
                  },
                  {
                    q: 'ราคาเท่าไหร่?',
                    a: 'นี่เป็น Prototype สำหรับ Demo ราคาจริงขึ้นอยู่กับขนาดทีมและฟีเจอร์ที่ต้องการ ติดต่อทีมขายเพื่อขอใบเสนอราคา'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">Q:</span>
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-sm text-gray-700 ml-6">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <BarChart3 className="h-5 w-5 text-gray-700" />
                Key Metrics ที่ควรเน้น
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'ลดเวลาวางแผน', value: '60%', desc: '2-3 วัน → 30 นาที', color: 'blue' },
                  { label: 'ประมาณการแม่นยำ', value: '70-80%', desc: 'และดีขึ้นเรื่อยๆ', color: 'green' },
                  { label: 'Real-time Sync', value: '100%', desc: 'ไม่ต้อง update เอง', color: 'purple' },
                  { label: 'Developer Adoption', value: 'สูง', desc: 'ใช้ GitLab ต่อได้', color: 'orange' }
                ].map((metric, idx) => (
                  <div key={idx} className={`bg-${metric.color}-50 border border-${metric.color}-200 rounded-lg p-4 text-center`}>
                    <div className={`text-3xl font-bold text-${metric.color}-600 mb-1`}>{metric.value}</div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{metric.label}</div>
                    <div className="text-xs text-gray-600">{metric.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProjectLayout>
  )
}
