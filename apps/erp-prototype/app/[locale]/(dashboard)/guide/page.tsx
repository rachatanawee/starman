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
                  <h1 className="text-3xl font-bold text-gray-900">คู่มือการใช้งาน ERP System</h1>
                  <p className="text-gray-600 text-base mt-1">
                    ระบบบริหารทรัพยากรองค์กร (Enterprise Resource Planning)
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
ภาพรวมระบบ ERP
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ERP System คืออะไร?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold text-gray-900">ERP (Enterprise Resource Planning)</span> เป็นระบบบริหารทรัพยากรองค์กรแบบครบวงจร 
                  ที่รวมการทำงานของทุกแผนกเข้าด้วยกัน ตั้งแต่การขาย การจัดซื้อ สต็อกสินค้า การผลิต การเงิน และทรัพยากรบุคคล 
                  ช่วยให้ข้อมูลทั้งหมดอยู่ในที่เดียว ลดความซ้ำซ้อน และเพิ่มประสิทธิภาพการทำงาน
                </p>
                
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 mb-4">
                  <div className="flex items-start gap-3">
                    <Workflow className="h-7 w-7 text-purple-700 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base mb-2">ระบบบูรณาการทุกแผนก</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        ERP เชื่อมโยงการทำงานของทุกแผนกเข้าด้วยกัน ทำให้ข้อมูลไหลลื่นและทันสมัยตลอดเวลา:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Sales</span>
                          <span>จัดการใบเสนอราคา ใบสั่งขาย และติดตามสถานะการขายแบบ Real-time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Purchase</span>
                          <span>สั่งซื้อสินค้า ติดตามใบสั่งซื้อ และจัดการกับซัพพลายเออร์</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Inventory</span>
                          <span>ตรวจสอบสต็อกสินค้า ติดตามการเคลื่อนไหว และแจ้งเตือนเมื่อสินค้าใกล้หมด</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Finance</span>
                          <span>บันทึกรายรับ-รายจ่าย ออกใบแจ้งหนี้ และสร้างรายงานทางการเงิน</span>
                        </li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-xs text-gray-600">
                          <strong>ประโยชน์:</strong> ลดเวลาการทำงานซ้ำซ้อน ข้อมูลถูกต้องและทันสมัย 
                          ตัดสินใจได้เร็วขึ้นด้วยข้อมูลที่แม่นยำ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-7 w-7 text-blue-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base mb-2">ข้อมูลรวมศูนย์ ตัดสินใจได้เร็ว</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      ข้อมูลทั้งหมดอยู่ในที่เดียว ทำให้ผู้บริหารเห็นภาพรวมและตัดสินใจได้อย่างรวดเร็ว:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Dashboard</span>
                        <span>ดูภาพรวมยอดขาย สต็อก และการเงินแบบ Real-time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Reports</span>
                        <span>สร้างรายงานต่างๆ ได้ทันที ไม่ต้องรวบรวมข้อมูลจากหลายที่</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Tracking</span>
                        <span>ติดตามสถานะใบสั่งขาย ใบสั่งซื้อ และการจัดส่งได้ทุกที่ทุกเวลา</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium mt-0.5">Integration</span>
                        <span>เชื่อมต่อกับระบบอื่นๆ เช่น ระบบบัญชี ระบบ CRM ได้อย่างง่ายดาย</span>
                      </li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs text-gray-600">
                        <strong>เปรียบเทียบ:</strong> แทนที่การใช้ Excel หลายไฟล์ ด้วยระบบเดียวที่ข้อมูลเชื่อมโยงกันอัตโนมัติ 
                        ลดความผิดพลาดและประหยัดเวลา
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
                      <span><strong>ลดความซ้ำซ้อน</strong> ข้อมูลอยู่ในที่เดียว ไม่ต้องกรอกซ้ำหลายที่</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>เพิ่มความแม่นยำ</strong> ลดข้อผิดพลาดจากการกรอกข้อมูลด้วยมือ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ประหยัดเวลา</strong> ลดเวลาการทำงานด้านเอกสารและรายงาน</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ตัดสินใจเร็วขึ้น</strong> มีข้อมูลที่ถูกต้องและทันสมัยเสมอ</span>
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
                      <span><strong>ฝ่ายขาย</strong> - จัดการใบเสนอราคาและใบสั่งขาย</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ฝ่ายจัดซื้อ</strong> - สั่งซื้อสินค้าและจัดการซัพพลายเออร์</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ฝ่ายคลังสินค้า</strong> - ตรวจสอบและจัดการสต็อก</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span><strong>ฝ่ายบัญชี</strong> - บันทึกรายรับ-รายจ่ายและสร้างรายงาน</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                  <DollarSign className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Sales & Purchase</h3>
                  <p className="text-xs text-gray-600">จัดการการขายและการซื้ออย่างมีประสิทธิภาพ</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                  <ListTodo className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Inventory Management</h3>
                  <p className="text-xs text-gray-600">ควบคุมสต็อกสินค้าแบบ Real-time</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                  <BarChart3 className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Financial Reports</h3>
                  <p className="text-xs text-gray-600">รายงานทางการเงินที่ถูกต้องและทันสมัย</p>
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
                  title: 'รับคำสั่งซื้อ (Sales Order)',
                  role: 'ฝ่ายขาย',
                  desc: 'สร้างใบเสนอราคาและใบสั่งขาย',
                  details: 'ฝ่ายขายรับคำสั่งซื้อจากลูกค้า สร้างใบเสนอราคา และออกใบสั่งขายในระบบ ข้อมูลจะถูกส่งต่อไปยังฝ่ายอื่นๆ อัตโนมัติ',
                  items: [
                    { icon: FileText, title: 'Quotation', desc: 'สร้างใบเสนอราคาให้ลูกค้า' },
                    { icon: CheckSquare, title: 'Sales Order', desc: 'ออกใบสั่งขายเมื่อลูกค้าตกลง' }
                  ]
                },
                {
                  num: 2,
                  color: 'blue',
                  title: 'จัดซื้อสินค้า (Purchase)',
                  role: 'ฝ่ายจัดซื้อ',
                  desc: 'สั่งซื้อสินค้าจากซัพพลายเออร์',
                  details: 'ฝ่ายจัดซื้อตรวจสอบสต็อกสินค้า สร้างใบสั่งซื้อ และติดตามการจัดส่งจากซัพพลายเออร์ ระบบจะแจ้งเตือนเมื่อสินค้าใกล้หมด',
                  steps: [
                    'ตรวจสอบสต็อกสินค้าคงเหลือ',
                    'สร้างใบสั่งซื้อ (Purchase Order)',
                    'ส่งใบสั่งซื้อให้ซัพพลายเออร์',
                    'ติดตามการจัดส่ง',
                    '✅ รับสินค้าเข้าคลัง'
                  ]
                },
                {
                  num: 3,
                  color: 'green',
                  title: 'จัดการคลังสินค้า (Inventory)',
                  role: 'ฝ่ายคลัง',
                  desc: 'ตรวจสอบและจัดการสต็อกสินค้า',
                  details: 'ฝ่ายคลังรับสินค้าเข้า จัดเก็บ และเบิกสินค้าออกตามใบสั่งขาย ระบบจะอัพเดทสต็อกแบบ Real-time',
                  items: [
                    { icon: ListTodo, title: 'Stock In', desc: 'รับสินค้าเข้าคลังและอัพเดทสต็อก' },
                    { icon: Calendar, title: 'Stock Out', desc: 'เบิกสินค้าออกตามใบสั่งขาย' },
                    { icon: CheckSquare, title: 'Stock Count', desc: 'ตรวจนับสต็อกและปรับยอด' }
                  ]
                },
                {
                  num: 4,
                  color: 'orange',
                  title: 'บันทึกบัญชี (Accounting)',
                  role: 'ฝ่ายบัญชี',
                  desc: 'บันทึกรายรับ-รายจ่ายและสร้างรายงาน',
                  details: 'ฝ่ายบัญชีบันทึกรายรับจากการขาย รายจ่ายจากการซื้อ ออกใบแจ้งหนี้ และสร้างรายงานทางการเงิน',
                  items: [
                    { icon: BarChart3, title: 'Invoice', desc: 'ออกใบแจ้งหนี้ให้ลูกค้า' },
                    { icon: DollarSign, title: 'Payment', desc: 'บันทึกการรับชำระเงิน' },
                    { icon: AlertTriangle, title: 'Reports', desc: 'สร้างรายงานทางการเงิน' }
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
                    icon: DollarSign,
                    color: 'purple',
                    title: 'Sales Order Management',
                    desc: 'จัดการใบเสนอราคาและใบสั่งขายอย่างมีประสิทธิภาพ ติดตามสถานะแบบ Real-time',
                    benefits: ['สร้างใบเสนอราคาและใบสั่งขาย', 'ติดตามสถานะการขาย', 'เชื่อมโยงกับสต็อกและบัญชีอัตโนมัติ']
                  },
                  {
                    icon: ListTodo,
                    color: 'blue',
                    title: 'Purchase Order Management',
                    desc: 'สั่งซื้อสินค้าและจัดการซัพพลายเออร์ได้อย่างง่ายดาย',
                    benefits: ['สร้างใบสั่งซื้ออัตโนมัติ', 'ติดตามการจัดส่งจากซัพพลายเออร์', 'เชื่อมโยงกับสต็อกและบัญชี']
                  },
                  {
                    icon: BarChart3,
                    color: 'green',
                    title: 'Inventory Control',
                    desc: 'ควบคุมสต็อกสินค้าแบบ Real-time พร้อมแจ้งเตือนเมื่อสินค้าใกล้หมด',
                    benefits: ['ตรวจสอบสต็อกแบบ Real-time', 'แจ้งเตือนสินค้าใกล้หมด', 'ติดตามการเคลื่อนไหวสินค้า']
                  },
                  {
                    icon: FileText,
                    color: 'orange',
                    title: 'Financial Accounting',
                    desc: 'บันทึกรายรับ-รายจ่าย ออกใบแจ้งหนี้ และสร้างรายงานทางการเงิน',
                    benefits: ['บันทึกบัญชีอัตโนมัติ', 'ออกใบแจ้งหนี้และใบเสร็จ', 'รายงานทางการเงินครบถ้วน']
                  },
                  {
                    icon: Users,
                    color: 'indigo',
                    title: 'Customer & Supplier Management',
                    desc: 'จัดการข้อมูลลูกค้าและซัพพลายเออร์อย่างเป็นระบบ',
                    benefits: ['ข้อมูลลูกค้าและซัพพลายเออร์', 'ประวัติการซื้อขาย', 'วงเงินเครดิตและเงื่อนไขการชำระ']
                  },
                  {
                    icon: Shield,
                    color: 'red',
                    title: 'Multi-Company Support',
                    desc: 'รองรับการทำงานหลายบริษัทในระบบเดียว แยกข้อมูลชัดเจน',
                    benefits: ['จัดการหลายบริษัทในระบบเดียว', 'แยกข้อมูลแต่ละบริษัทชัดเจน', 'รายงานรวมและแยกตามบริษัท']
                  },
                  {
                    icon: Calendar,
                    color: 'teal',
                    title: 'Dashboard & Reports',
                    desc: 'ภาพรวมธุรกิจแบบ Real-time พร้อมรายงานที่ครบถ้วน',
                    benefits: ['Dashboard แสดงภาพรวมธุรกิจ', 'รายงานยอดขาย สต็อก การเงิน', 'Export รายงานเป็น PDF และ Excel']
                  },
                  {
                    icon: Download,
                    color: 'pink',
                    title: 'Data Export & Integration',
                    desc: 'Export ข้อมูลและเชื่อมต่อกับระบบอื่นได้ง่าย',
                    benefits: ['Export ข้อมูลเป็น Excel, PDF', 'API สำหรับเชื่อมต่อระบบอื่น', 'Import ข้อมูลจากไฟล์ Excel']
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
                  title: 'สร้างบริษัทและตั้งค่าระบบ',
                  desc: 'เริ่มต้นด้วยการสร้างบริษัทและตั้งค่าพื้นฐานของระบบ',
                  details: ['ข้อมูลบริษัท (ชื่อ ที่อยู่ เลขที่ภาษี)', 'สกุลเงินและหน่วยเงิน', 'ข้อมูลลูกค้าและซัพพลายเออร์', 'ข้อมูลสินค้าและหมวดหมู่สินค้า']
                },
                {
                  num: 2,
                  color: 'purple',
                  title: 'สร้างใบสั่งขายแรก',
                  desc: 'ไปที่หน้า Sales Order และสร้างใบสั่งขายให้ลูกค้า',
                  details: [
                    'คลิก New Order เพื่อสร้างใบสั่งขายใหม่',
                    'เลือกลูกค้า วันที่ส่ง และวันที่จัดส่ง',
                    'เพิ่มรายการสินค้าที่ต้องการขาย',
                    'ระบบจะคำนวณยอดรวมและอัพเดทสต็อกอัตโนมัติ',
                    'บันทึกและส่งใบสั่งขายให้ลูกค้า'
                  ]
                },
                {
                  num: 3,
                  color: 'blue',
                  title: 'จัดซื้อสินค้า',
                  desc: 'ไปที่หน้า Purchase Order เพื่อสั่งซื้อสินค้าจากซัพพลายเออร์',
                  details: ['คลิก New Purchase Order', 'เลือกซัพพลายเออร์และสินค้าที่ต้องการซื้อ', 'ระบบคำนวณยอดรวมและส่งใบสั่งซื้อ', 'ติดตามสถานะการจัดส่ง', 'รับสินค้าเข้าคลังและอัพเดทสต็อก']
                },
                {
                  num: 4,
                  color: 'green',
                  title: 'ติดตามและสร้างรายงาน',
                  desc: 'ใช้ Dashboard และรายงานต่างๆ เพื่อติดตามธุรกิจ',
                  details: ['Dashboard: ภาพรวมยอดขาย สต็อก การเงิน', 'Sales Report: รายงานการขาย', 'Inventory Report: รายงานสต็อกสินค้า', 'Financial Report: รายงานทางการเงิน']
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
                    q: 'ERP System เหมาะกับธุรกิจขนาดไหน?',
                    a: 'ระบบ ERP เหมาะกับธุรกิจทุกขนาด ตั้งแต่ SME ไปจนถึงองค์กรขนาดใหญ่ สามารถปรับแต่งฟีเจอร์ตามความต้องการของแต่ละธุรกิจได้'
                  },
                  {
                    q: 'ใช้เวลานานแค่ไหนในการติดตั้งระบบ?',
                    a: 'ขึ้นอยู่กับขนาดและความซับซ้อนของธุรกิจ โดยทั่วไปใช้เวลา 1-3 เดือนสำหรับการติดตั้งและฝึกอบรมพนักงาน รวมถึงการ migrate ข้อมูลเดิม'
                  },
                  {
                    q: 'ข้อมูลเก่าจากระบบเดิมสามารถย้ายมาได้ไหม?',
                    a: 'ได้ครับ ระบบรองรับการ Import ข้อมูลจากไฟล์ Excel และสามารถเชื่อมต่อกับระบบเดิมผ่าน API เพื่อย้ายข้อมูลมาได้อย่างปลอดภัย'
                  },
                  {
                    q: 'พนักงานต้องเรียนรู้ระบบนานไหม?',
                    a: 'ระบบออกแบบให้ใช้งานง่าย โดยทั่วไปพนักงานสามารถเริ่มใช้งานได้ภายใน 1-2 สัปดาห์ พร้อมทั้งมีคู่มือและการฝึกอบรมให้'
                  },
                  {
                    q: 'สามารถใช้งานผ่านมือถือได้ไหม?',
                    a: 'ได้ครับ ระบบรองรับการใช้งานผ่าน Web Browser บนมือถือและแท็บเล็ต สามารถเข้าถึงข้อมูลได้ทุกที่ทุกเวลา'
                  },
                  {
                    q: 'ข้อมูลปลอดภัยแค่ไหน?',
                    a: 'ระบบมีการเข้ารหัสข้อมูล (Encryption) และระบบสำรองข้อมูล (Backup) อัตโนมัติทุกวัน พร้อมระบบควบคุมสิทธิ์การเข้าถึงข้อมูลตามบทบาทของผู้ใช้'
                  },
                  {
                    q: 'ราคาเท่าไหร่? คิดตาม User หรือ Module?',
                    a: 'ราคาขึ้นอยู่กับจำนวน User และ Module ที่ต้องการใช้งาน กรุณาติดต่อทีมขายเพื่อขอใบเสนอราคาที่เหมาะกับธุรกิจของคุณ'
                  },
                  {
                    q: 'มีการอัพเดทระบบบ่อยแค่ไหน?',
                    a: 'ระบบมีการอัพเดทฟีเจอร์ใหม่และแก้ไขบั๊กเป็นประจำทุกเดือน โดยไม่มีค่าใช้จ่ายเพิ่มเติมสำหรับลูกค้าที่มี Support Package'
                  },
                  {
                    q: 'สามารถปรับแต่งระบบตามความต้องการได้ไหม?',
                    a: 'ได้ครับ ระบบรองรับการปรับแต่ง (Customization) ตามความต้องการของแต่ละธุรกิจ ทั้งการเพิ่มฟีลด์ การปรับรายงาน และการเชื่อมต่อกับระบบอื่น'
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
