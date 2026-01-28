'use client'

import { ProjectLayout } from '@/components/project-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, Users, FileText, GitBranch, ListTodo, Calendar, 
  CheckSquare, DollarSign, AlertTriangle, Sparkles, ArrowRight,
  Target, Workflow, BarChart3, Zap, Shield, TrendingUp, Download, PlayCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'

export default function GuidePage() {
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
                <div className="bg-gray-900 p-3 rounded-lg">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">คู่มือการใช้งาน ProjectFlow</h1>
                  <p className="text-gray-600 text-base mt-1">
                    ระบบบริหารจัดการโปรเจกต์ด้วย AI และ GitLab Integration
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => router.push(`/${params.locale}/guide/demo`)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                Demo Walkthrough
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Executive Summary */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Target className="h-5 w-5 text-gray-700" />
                สรุปสำหรับผู้บริหาร
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ProjectFlow คืออะไร?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold text-gray-900">ProjectFlow</span> เป็นระบบบริหารจัดการโปรเจกต์ที่ใช้ <span className="font-semibold text-gray-900">AI เป็นผู้ช่วยหลัก</span> 
                  ในการจัดการ Requirements, Tasks และ Issues ช่วยลดภาระงานด้านเอกสารและการวางแผนของทีม 
                  โดยเชื่อมต่อกับ GitLab เพื่อให้ทีมพัฒนาทำงานได้อย่างราบรื่น พร้อมระบบรายงานและติดตามแบบ Real-time
                </p>
                
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 mb-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-7 w-7 text-purple-700 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base mb-2">AI ช่วยจัดการงานเอกสารและวางแผน</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        AI ทำหน้าที่เป็น <strong>ผู้ช่วยอัจฉริยะ</strong> ที่ช่วยแปลงความต้องการเป็นแผนงานที่ชัดเจน:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Requirements</span>
                          <span>AI อ่านบันทึกการประชุมและสรุปเป็น Requirements พร้อม Acceptance Criteria อัตโนมัติ</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Tasks</span>
                          <span>AI แบ่งงานเป็น Tasks ย่อยๆ พร้อมประมาณเวลาและลำดับการทำงาน ไม่ต้องนั่งวางแผนเอง</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Issues</span>
                          <span>AI สร้าง GitLab Issues พร้อมมอบหมายงานให้ทีมอัตโนมัติ ลดงานเอกสาร</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Smart</span>
                          <span>AI เรียนรู้จากโปรเจกต์เก่าเพื่อประมาณการที่แม่นยำขึ้นเรื่อยๆ</span>
                        </li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-xs text-gray-600">
                          <strong>ประโยชน์:</strong> ลดเวลาทำเอกสารและวางแผนจาก 2-3 วัน เหลือเพียง 30 นาที 
                          ทีมสามารถเริ่มทำงานได้เร็วขึ้น และมีเวลามากขึ้นสำหรับการพัฒนาจริง
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
                <div className="flex items-start gap-3">
                  <GitBranch className="h-7 w-7 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base mb-2">Single Source of Truth</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      ProjectFlow เชื่อมต่อกับ <strong>GitLab</strong> เพื่อให้ข้อมูลทั้งหมดอยู่ในที่เดียว ลดความซ้ำซ้อนและเพิ่มความแม่นยำ:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Requirements</span>
                        <span>ความต้องการของระบบถูกบันทึกและติดตามใน GitLab Issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Tasks</span>
                        <span>งานทั้งหมดถูกสร้างและมอบหมายผ่าน GitLab พร้อม Timeline</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Progress</span>
                        <span>ความคืบหน้าอัพเดทอัตโนมัติจากการทำงานจริงของทีม</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Traceability</span>
                        <span>ติดตามได้ว่า Requirement ไหนเชื่อมโยงกับ Task และ Code ใด</span>
                      </li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs text-gray-600">
                        <strong>เปรียบเทียบ:</strong> เหมือนการใช้ MS Project ร่วมกับ Excel แต่ข้อมูลทั้งหมดเชื่อมโยงกันอัตโนมัติ 
                        ไม่ต้องอัพเดทหลายที่ และมีการ sync กับงานจริงของทีมพัฒนา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-gray-700" />
                    <h4 className="font-semibold text-gray-900">ประโยชน์ที่ได้รับ</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ลดความซ้ำซ้อน</strong> AI ช่วยให้ Requirements, Tasks และ Tests เชื่อมโยงกันอัตโนมัติ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>เพิ่มความชัดเจน</strong> AI สร้าง Acceptance Criteria ที่ชัดเจนและวัดผลได้</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ลดเวลาวางแผน 60%</strong> AI แปลง Requirements เป็น Tasks ได้ใน 30 นาที</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ประมาณการแม่นยำ</strong> AI เรียนรู้จากโปรเจกต์เก่าเพื่อประมาณเวลาที่ดีขึ้น</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-gray-700" />
                    <h4 className="font-semibold text-gray-900">ผู้ใช้งานหลัก</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>Project Manager (PM)</strong> - วางแผนและติดตามโปรเจกต์</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>System Analyst (SA)</strong> - กำหนด Requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>Development Team</strong> - ทำงานตาม Tasks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                  <Sparkles className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">AI-Powered</h3>
                  <p className="text-xs text-gray-600">สร้าง Tasks และประมาณการอัตโนมัติ</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                  <GitBranch className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">GitLab Integration</h3>
                  <p className="text-xs text-gray-600">เชื่อมต่อกับ GitLab CE แบบ Seamless</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                  <BarChart3 className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Real-time Monitoring</h3>
                  <p className="text-xs text-gray-600">ติดตามความคืบหน้าแบบ Real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Workflow className="h-5 w-5 text-gray-700" />
                ขั้นตอนการทำงาน (Workflow)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {[
                {
                  num: 1,
                  color: 'purple',
                  title: 'ขั้นตอนวางแผน (Planning)',
                  role: 'PM & SA',
                  desc: 'กำหนด Requirements และ Epics',
                  details: 'PM และ SA ร่วมกันกำหนดความต้องการของโปรเจกต์ โดยสามารถ Paste บันทึกการประชุมเพื่อให้ AI สรุป Requirements อัตโนมัติ พร้อม Acceptance Criteria',
                  items: [
                    { icon: FileText, title: 'Requirements', desc: 'อัพโหลดบันทึกการประชุมหรือกำหนด Requirements ด้วยตนเอง' },
                    { icon: GitBranch, title: 'Epics', desc: 'แบ่งโปรเจกต์เป็น Features และ Epics' }
                  ]
                },
                {
                  num: 2,
                  color: 'blue',
                  title: 'สร้าง Tasks ด้วย AI → GitLab',
                  role: 'PM',
                  desc: 'ใช้ AI สร้าง Tasks อัตโนมัติและ Submit ไปยัง GitLab',
                  details: 'PM ใช้ AI Task Generator เพื่อสร้าง Tasks จาก Requirements โดยอัตโนมัติ พร้อมประมาณการเวลา จากนั้น Submit ไปยัง GitLab เพื่อสร้าง Issues และ Milestones',
                  steps: [
                    'ใส่ Requirements ที่ต้องการพัฒนา',
                    'กำหนด Sprint Start Date และ Duration',
                    'AI สร้าง Tasks พร้อมประมาณการ',
                    'ปรับแต่งแบบ Iterative',
                    '✅ Submit to GitLab → สร้าง Issues + Milestones + Assignees'
                  ]
                },
                {
                  num: 3,
                  color: 'green',
                  title: 'ขั้นตอนดำเนินการ (Execution) บน GitLab',
                  role: 'Development Team',
                  desc: 'ทำงานตาม GitLab Issues และอัพเดทสถานะ',
                  details: 'ทีมพัฒนาทำงานตาม GitLab Issues ที่ได้รับมอบหมาย อัพเดทสถานะผ่าน GitLab และระบบจะ Sync อัตโนมัติ',
                  items: [
                    { icon: ListTodo, title: 'Tasks (GitLab Issues)', desc: 'ทำงานและอัพเดทสถานะใน GitLab' },
                    { icon: Calendar, title: 'Gantt Chart', desc: 'แสดง Timeline จาก GitLab Milestones' },
                    { icon: CheckSquare, title: 'Acceptance', desc: 'ติดตาม Acceptance Criteria จาก Issues' }
                  ]
                },
                {
                  num: 4,
                  color: 'orange',
                  title: 'ขั้นตอนติดตาม (Monitoring)',
                  role: 'PM & Stakeholders',
                  desc: 'ติดตามและควบคุมโปรเจกต์',
                  details: 'PM และ Stakeholders ติดตามความคืบหน้า งบประมาณ และความเสี่ยงของโปรเจกต์',
                  items: [
                    { icon: BarChart3, title: 'Dashboard', desc: 'ภาพรวมโปรเจกต์แบบ Real-time' },
                    { icon: DollarSign, title: 'Costs', desc: 'ติดตามงบประมาณและค่าใช้จ่าย' },
                    { icon: AlertTriangle, title: 'Risks', desc: 'ระบุและจัดการความเสี่ยง' }
                  ]
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`bg-${step.color}-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl`}>
                        {step.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`bg-${step.color}-50 border-2 border-${step.color}-200 rounded-lg p-6`}>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`bg-${step.color}-600 text-white text-sm`}>{step.title}</Badge>
                          <Badge variant="outline" className={`text-${step.color}-600 border-${step.color}-300 text-sm`}>{step.role}</Badge>
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{step.desc}</h3>
                        <p className="text-gray-700 mb-4">{step.details}</p>
                        {step.steps && (
                          <ol className="space-y-2 text-sm text-gray-700">
                            {step.steps.map((s, i) => (
                              <li key={i} className="flex gap-2">
                                <span className={`bg-${step.color}-100 text-${step.color}-700 font-bold px-2 py-0.5 rounded text-xs`}>{i + 1}</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                        {step.items && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {step.items.map((item, i) => {
                              const Icon = item.icon
                              return (
                                <div key={i} className={`flex items-start gap-3 bg-white p-4 rounded border border-${step.color}-200`}>
                                  <Icon className={`h-6 w-6 text-${step.color}-600 mt-0.5 flex-shrink-0`} />
                                  <div>
                                    <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {idx < 3 && <div className={`absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-${step.color}-300`}></div>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Sparkles className="h-5 w-5 text-gray-700" />
                ฟีเจอร์หลัก (Key Features)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    icon: Sparkles,
                    color: 'purple',
                    title: 'AI Requirements Analyzer',
                    desc: 'Paste บันทึกการประชุมเพื่อให้ AI วิเคราะห์และสรุป Requirements อัตโนมัติ พร้อม Acceptance Criteria',
                    benefits: ['วิเคราะห์บันทึกการประชุมภาษาไทยและอังกฤษ', 'สร้าง Requirements พร้อม Acceptance Criteria', 'จัดหมวดหมู่และกำหนด Priority อัตโนมัติ']
                  },
                  {
                    icon: Sparkles,
                    color: 'purple',
                    title: 'AI Task Generation',
                    desc: 'สร้าง Tasks จาก Requirements อัตโนมัติด้วย AI พร้อมประมาณการเวลาที่แม่นยำ',
                    benefits: ['ลดเวลาวางแผนจาก 2-3 วัน เหลือ 30 นาที', 'ประมาณการที่แม่นยำกว่า Manual Planning', 'ปรับแต่งได้แบบ Iterative']
                  },
                  {
                    icon: GitBranch,
                    color: 'blue',
                    title: 'GitLab Integration (Core)',
                    desc: 'GitLab CE เป็นแกนหลักในการจัดเก็บ Requirements, Tasks และ Assignments แบบ Real-time',
                    benefits: ['Requirements → GitLab Issues (label: requirement)', 'Tasks → GitLab Issues + Milestones', 'Auto-sync Status จาก GitLab', 'Link กับ Merge Requests และ Commits']
                  },
                  {
                    icon: Calendar,
                    color: 'green',
                    title: 'Interactive Gantt Chart',
                    desc: 'แสดง Timeline โปรเจกต์แบบ Interactive พร้อมฟีเจอร์ย่อ/ขยาย Milestones',
                    benefits: ['Freeze Task Column เมื่อ Scroll', 'Collapse/Expand Milestones', 'Zoom In/Out Timeline']
                  },
                  {
                    icon: BarChart3,
                    color: 'orange',
                    title: 'Real-time Analytics',
                    desc: 'ติดตามความคืบหน้า ค่าใช้จ่าย และความเสี่ยงแบบ Real-time',
                    benefits: ['Progress & Velocity Charts', 'Budget vs Actual Spending', 'Risk Heat Map']
                  },
                  {
                    icon: Shield,
                    color: 'red',
                    title: 'Risk Management',
                    desc: 'ระบุ ติดตาม และจัดการความเสี่ยงของโปรเจกต์อย่างเป็นระบบ',
                    benefits: ['Risk Register & Assessment', 'Mitigation Planning', 'Risk Monitoring & Alerts']
                  },
                  {
                    icon: Users,
                    color: 'indigo',
                    title: 'Team Collaboration',
                    desc: 'จัดการทีม บทบาท และการกระจาย Workload อย่างมีประสิทธิภาพ',
                    benefits: ['Team Member Management', 'Workload Distribution', 'Performance Tracking']
                  },
                  {
                    icon: Download,
                    color: 'teal',
                    title: 'Export SRS Document',
                    desc: 'Export Requirements เป็นเอกสาร SRS (Software Requirements Specification) ในรูปแบบ MS Word',
                    benefits: ['Export เป็น MS Word (.docx)', 'Wizard แบบ Step-by-Step', 'ปรับแต่ง Format และเนื้อหาได้', 'เหมาะสำหรับนำเสนอผู้บริหาร']
                  }
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div key={idx} className={`bg-white p-5 rounded-lg border-2 border-${feature.color}-200 hover:shadow-md transition-shadow`}>
                      <div className="flex items-start gap-3">
                        <div className={`bg-${feature.color}-100 p-3 rounded-lg`}>
                          <Icon className={`h-6 w-6 text-${feature.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{feature.desc}</p>
                          <div className={`bg-${feature.color}-50 p-3 rounded border border-${feature.color}-200`}>
                            <ul className={`text-xs text-${feature.color}-700 space-y-1`}>
                              {feature.benefits.map((b, i) => (
                                <li key={i}>• {b}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Zap className="h-6 w-6 text-blue-600" />
                เริ่มต้นใช้งาน (Getting Started)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {[
                {
                  num: 1,
                  color: 'indigo',
                  title: 'สร้างหรือเลือก Project',
                  desc: 'เริ่มต้นด้วยการสร้าง Project ใหม่หรือเลือก Project ที่มีอยู่จากหน้า Projects',
                  details: ['ชื่อ Project และคำอธิบาย', 'GitLab Project URL และ Access Token', 'งบประมาณและ Timeline', 'AI Provider (OpenAI, Claude, Gemini)']
                },
                {
                  num: 2,
                  color: 'purple',
                  title: 'กำหนด Requirements',
                  desc: 'ไปที่หน้า Requirements และกำหนดความต้องการของโปรเจกต์ โดยสามารถ Paste บันทึกการประชุมให้ AI วิเคราะห์',
                  details: [
                    'Paste บันทึกการประชุม (Meeting Transcript) ในช่อง AI Requirements Analyzer',
                    'คลิก Analyze with AI เพื่อให้ AI สรุป Requirements พร้อม Acceptance Criteria',
                    'ตรวจสอบและแก้ไข Requirements ที่ AI สร้างให้',
                    'กำหนด Epic, Priority และ Category สำหรับแต่ละ Requirement',
                    'คลิก Save เพื่อบันทึก'
                  ]
                },
                {
                  num: 3,
                  color: 'blue',
                  title: 'สร้าง Tasks ด้วย AI และ Submit to GitLab',
                  desc: 'ใช้ AI Task Generator ในหน้า Tasks เพื่อสร้าง Tasks จาก Requirements อัตโนมัติ แล้ว Submit ไปยัง GitLab',
                  details: ['คลิก Generate with AI', 'Copy Requirements จากหน้า Requirements', 'กำหนด Sprint Start Date และ Duration', 'Review Tasks ที่ AI สร้างให้', '✅ Submit to GitLab → สร้าง Issues, Milestones, Assignees']
                },
                {
                  num: 4,
                  color: 'green',
                  title: 'ติดตามความคืบหน้า',
                  desc: 'ใช้ Dashboard, Gantt Chart และเครื่องมืออื่นๆ เพื่อติดตามความคืบหน้าของโปรเจกต์',
                  details: ['Dashboard: ภาพรวมและ Metrics', 'Gantt Chart: Timeline และ Dependencies', 'Costs: งบประมาณและค่าใช้จ่าย', 'Risks: ความเสี่ยงและการจัดการ']
                }
              ].map((step, idx) => (
                <div key={idx} className={`flex items-start gap-4 p-5 bg-${step.color}-50 rounded-lg border-2 border-${step.color}-200`}>
                  <div className={`bg-${step.color}-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-700 mb-3">{step.desc}</p>
                    <div className={`bg-white p-3 rounded border border-${step.color}-200`}>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {step.details.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support */}
          
          {/* FAQ */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <CheckSquare className="h-5 w-5 text-gray-700" />
                คำถามที่พบบ่อย (FAQ)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    q: 'AI สามารถสร้าง Requirements จากบันทึกการประชุมได้จริงหรือ?',
                    a: 'ได้ครับ เพียงแค่ Copy บันทึกการประชุม (ภาษาไทยหรืออังกฤษ) มา Paste ในช่อง AI Requirements Analyzer แล้วคลิก "Analyze with AI" ระบบจะวิเคราะห์และสร้าง Requirements พร้อม Acceptance Criteria ให้อัตโนมัติ คุณสามารถแก้ไขและปรับแต่งได้ตามต้องการ'
                  },
                  {
                    q: 'AI สร้าง Tasks ได้แม่นยำแค่ไหน? ต้องแก้เยอะไหม?',
                    a: 'AI จะสร้าง Tasks พร้อมประมาณการเวลาจาก Requirements ที่คุณให้มา โดยทั่วไปแม่นยำประมาณ 70-80% คุณสามารถปรับแต่งได้แบบ Iterative (กด Generate ซ้ำได้) และ AI จะเรียนรู้จากโปรเจกต์เก่าเพื่อประมาณการที่ดีขึ้นเรื่อยๆ'
                  },
                  {
                    q: 'ต้องใช้ GitLab หรือไม่? ใช้ GitHub ได้ไหม?',
                    a: 'ปัจจุบันระบบรองรับเฉพาะ GitLab CE เท่านั้น เนื่องจากเป็น Core System ที่ใช้จัดเก็บ Requirements, Tasks และ Issues ทั้งหมด การใช้ GitLab ช่วยให้ข้อมูลทั้งหมดอยู่ในที่เดียวและ Sync กันอัตโนมัติ'
                  },
                  {
                    q: 'ถ้าทีมไม่คุ้นเคยกับ GitLab จะใช้งานยากไหม?',
                    a: 'ไม่ยากครับ PM และ SA ใช้งานผ่าน ProjectFlow ส่วนใหญ่ ส่วนทีมพัฒนาจะทำงานผ่าน GitLab ตามปกติ (สร้าง Branch, Commit, Merge Request) ระบบจะ Sync สถานะอัตโนมัติ ไม่ต้องเรียนรู้เครื่องมือใหม่'
                  },
                  {
                    q: 'Gantt Chart แสดงข้อมูลจากไหน?',
                    a: 'Gantt Chart ดึงข้อมูลจาก GitLab Milestones และ Issues โดยตรง แสดง Timeline, Dependencies และความคืบหน้าแบบ Real-time ไม่ต้องอัพเดทด้วยตนเอง'
                  },
                  {
                    q: 'ข้อมูลโปรเจกต์เก่าจะหายไหมถ้าเปลี่ยนมาใช้ระบบนี้?',
                    a: 'ไม่หายครับ เนื่องจากข้อมูลทั้งหมดจัดเก็บใน GitLab ของคุณเอง ProjectFlow เป็นเพียง Interface ที่ช่วยจัดการและแสดงผล ถ้าไม่ใช้ระบบแล้ว ข้อมูลทั้งหมดยังอยู่ใน GitLab'
                  },
                  {
                    q: 'ราคาเท่าไหร่? คิดตาม User หรือ Project?',
                    a: 'ระบบนี้เป็น Prototype สำหรับ Demo ยังไม่มีการเก็บค่าใช้จ่าย สำหรับการใช้งานจริง กรุณาติดต่อทีมขายเพื่อขอใบเสนอราคาตามความต้องการของบริษัทคุณ'
                  },
                  {
                    q: 'สามารถ Export รายงานเป็น PDF หรือ Excel ได้ไหม?',
                    a: 'ได้ครับ ระบบรองรับการ Export Dashboard, Gantt Chart, Cost Report และ Risk Report เป็น PDF และ Excel สำหรับนำเสนอผู้บริหารหรือ Stakeholders'
                  },
                  {
                    q: 'Export SRS Document ทำอย่างไร?',
                    a: 'ไปที่หน้า Requirements แล้วคลิกปุ่ม "Export SRS" ระบบจะพาคุณผ่าน Wizard 4 ขั้นตอน: (1) กรอกข้อมูลเอกสาร (ชื่อ, เวอร์ชัน, ผู้เขียน) (2) เลือกรายการที่ต้องการ Export (Acceptance Criteria, Priority, Category, Epic) (3) Preview เอกสาร (4) Export เป็น MS Word (.docx) เหมาะสำหรับนำเสนอผู้บริหารหรือเก็บเป็นเอกสารอ้างอิง'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-5 last:border-0 last:pb-0">
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
        </div>
      </div>
    </ProjectLayout>
  )
}
