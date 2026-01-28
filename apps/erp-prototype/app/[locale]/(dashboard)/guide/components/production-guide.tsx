'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Factory } from 'lucide-react'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function ProductionGuide() {
  const mermaidRef1 = useRef<HTMLDivElement>(null)
  const mermaidRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' })
    const nodes = [mermaidRef1.current, mermaidRef2.current].filter(Boolean)
    if (nodes.length > 0) {
      mermaid.run({ nodes })
    }
  }, [])

  return (
    <>
      <Card id="production-module">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5" />
            Production Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            จัดการคำสั่งผลิต วางแผนการผลิต แลาติดตามสถานะการผลิต
          </p>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold mb-2">ฟีเจอร์หลัก</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• สร้างคำสั่งผลิต (Production Order)</li>
              <li>• วางแผนการผลิต (Production Planning)</li>
              <li>• ติดตามสถานะการผลิต</li>
              <li>• จัดการ Bill of Materials (BOM)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card id="production-flow">
        <CardHeader>
          <CardTitle>Production Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef1} className="mermaid">
            {`graph LR
              A[Sales Order<br/>ใบสั่งขาย] --> B[Production Order<br/>คำสั่งผลิต]
              B --> C[Material Request<br/>เบิกวัตถุดิบ]
              C --> D[Production<br/>ผลิตสินค้า]
              D --> E[Quality Check<br/>ตรวจคุณภาพ]
              E --> F[Finished Goods<br/>สินค้าสำเร็จ]
              
              style A fill:#e9d5ff
              style B fill:#bfdbfe
              style C fill:#bbf7d0
              style D fill:#fed7aa
              style E fill:#fef3c7
              style F fill:#d1fae5`}
          </div>
        </CardContent>
      </Card>

      <Card id="bom">
        <CardHeader>
          <CardTitle>Production Process Sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef2} className="mermaid">
            {`sequenceDiagram
              participant AI as 🤖 AI Agent
              participant S as Sales
              participant P as Production
              participant M as Materials
              participant Q as Quality
              
              S->>P: ส่ง Sales Order
              P->>AI: ขอแผนการผลิต
              AI-->>P: แนะนำกำหนดการผลิต
              P->>P: สร้าง Production Order
              P->>M: ขอเบิกวัตถุดิบ
              M->>AI: ตรวจสอบสต็อก
              AI-->>M: แจ้งสถานะสต็อก
              M->>P: จ่ายวัตถุดิบ
              P->>P: เริ่มผลิต
              P->>Q: ส่งตรวจคุณภาพ
              Q->>AI: วิเคราะห์คุณภาพ
              AI-->>Q: ผลการตรวจสอบ
              Q->>Q: ตรวจสอบสินค้า
              Q->>M: ผ่านการตรวจ
              M->>M: รับเข้าสต็อก
              M->>S: แจ้งสินค้าพร้อม`}
          </div>
        </CardContent>
      </Card>

      <Card id="production-order">
        <CardHeader>
          <CardTitle>🤖 AI Agent ใน Production</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span>🧠</span> The Strategist - AI Production Planner
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              AI Agent ที่ทำหน้าที่เป็น "นักวางกลยุทธ์" ช่วยวางแผนการผลิตอัจฉริยะ
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Capacity Leveling:</strong> เกลี่ยงานอัตโนมัติเมื่อเครื่องจักรล้น</li>
              <li>• <strong>Predictive Shortage:</strong> เตือนวัตถุดิบขาดล่วงหน้า 2 สัปดาห์</li>
              <li>• <strong>Route Optimization:</strong> เลือกเส้นทางการผลิตที่ดีที่สุด</li>
              <li>• <strong>One-Click Fix:</strong> แก้ปัญหาด้วยปุ่มเดียว</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-3">🏭 Production Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• วางแผนการผลิตอัตโนมัติตาม Due Date และ Priority</li>
              <li>• เพิ่มประสิทธิภาพการผลิตด้วย Setup Time Optimization</li>
              <li>• ลดของเสียและ Downtime ด้วย Predictive Analytics</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold mb-3">⚠️ Predictive Maintenance</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• พยากรณ์ความเสี่ยงของเครื่องจักรจาก Historical Data</li>
              <li>• แจ้งเตือนก่อนเกิดปัญหา 3-5 วัน</li>
              <li>• วางแผนการบำรุงรักษาอัตโนมัติ</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card id="production-planning">
        <CardHeader>
          <CardTitle>📊 Production Planning with AI - คู่มือการใช้งาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2">Production Planning คืออะไร?</h4>
            <p className="text-sm text-gray-700 mb-3">
              เป็นระบบวางแผนการผลิตอัจฉริยะที่ช่วยจัดตารางการผลิต (Production Schedule) 
              โดยคำนึงถึงกำลังการผลิต วัตถุดิบ และกำหนดส่งของ พร้อม AI ที่คอยช่วยแก้ปัญหาอัตโนมัติ
            </p>
            <div className="bg-white p-3 rounded border border-blue-300">
              <p className="text-xs font-medium mb-2">ขั้นตอนการทำงาน:</p>
              <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                <li>ระบบดึงข้อมูล Production Orders ทั้งหมดที่ต้องผลิต</li>
                <li>AI วิเคราะห์กำลังการผลิตของแต่ละเครื่องจักร (Work Center)</li>
                <li>ตรวจสอบสต็อกวัตถุดิบว่าพอหรือไม่</li>
                <li>จัดลำดับงานตาม Priority และ Due Date</li>
                <li>แจ้งเตือนปัญหาที่พบพร้อมวิธีแก้ไข</li>
              </ol>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold mb-2">4 ประเภทของ AI Insights</h4>
            <div className="space-y-3 mt-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔴</span>
                <div>
                  <p className="font-medium text-sm">Capacity Conflict (ปัญหากำลังการผลิต)</p>
                  <p className="text-xs text-gray-600 mb-1">เครื่องจักรโหลดเกิน 100% - AI จะแนะนำให้เลื่อนงานหรือเพิ่ม OT</p>
                  <p className="text-xs text-gray-500 italic">ตัวอย่าง: เครื่อง Press Brake มีงาน 12 ชม. แต่ทำได้แค่ 8 ชม./วัน</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📉</span>
                <div>
                  <p className="font-medium text-sm">Material Risk (ความเสี่ยงวัตถุดิบ)</p>
                  <p className="text-xs text-gray-600 mb-1">วัตถุดิบเสี่ยงขาด - AI จะแนะนำให้สั่งซื้อด่วนพร้อมคำนวณ Lead Time</p>
                  <p className="text-xs text-gray-500 italic">ตัวอย่าง: เหล็กแผ่น 2mm เหลือ 50kg แต่ต้องใช้ 150kg ใน 3 วันข้างหน้า</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-medium text-sm">Cost Optimization (ลดต้นทุน)</p>
                  <p className="text-xs text-gray-600 mb-1">ลดต้นทุนได้ - AI จะแนะนำการสลับลำดับงานเพื่อลด Setup Time</p>
                  <p className="text-xs text-gray-500 italic">ตัวอย่าง: ทำงานตัดเหล็กขนาดเดียวกันติดกันจะประหยัดเวลาเปลี่ยนใบมีด</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-medium text-sm">Deadline Risk (เสี่ยงส่งไม่ทัน)</p>
                  <p className="text-xs text-gray-600 mb-1">เสี่ยงส่งไม่ทัน - AI จะแนะนำวิธีแก้ไขเช่น เพิ่ม Shift หรือ Outsource</p>
                  <p className="text-xs text-gray-500 italic">ตัวอย่าง: ลูกค้าต้องการของวันที่ 20 แต่ตารางผลิตเสร็จวันที่ 22</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-2">📝 ตัวอย่างการใช้งานจริง</h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="text-xs font-medium mb-2">สถานการณ์ที่ 1: เครื่องจักรโหลดเกิน</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>🔴 <strong>ปัญหา:</strong> เครื่อง Press Brake โหลด 150% ในวันที่ 15 ก.พ. (มีงาน 12 ชม. แต่ทำได้แค่ 8 ชม.)</p>
                  <p>🤖 <strong>AI แนะนำ:</strong> "เลื่อน PO-88 (Mounting Bracket) ไปทำวันที่ 16 แทน เพราะวันนั้นเครื่องว่าง 6 ชม."</p>
                  <p>✅ <strong>การแก้ไข:</strong> กดปุ่ม "Fix it" → ระบบปรับตารางอัตโนมัติ → โหลดลดเหลือ 100%</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="text-xs font-medium mb-2">สถานการณ์ที่ 2: วัตถุดิบเสี่ยงขาด</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>📉 <strong>ปัญหา:</strong> เหล็กแผ่น 2mm เหลือ 50kg แต่ PO-87 ต้องใช้ 120kg ในวันที่ 18 ก.พ.</p>
                  <p>🤖 <strong>AI แนะนำ:</strong> "สั่งซื้อด่วน 100kg (Lead Time 3 วัน) หรือเลื่อนงานไปวันที่ 21"</p>
                  <p>✅ <strong>การแก้ไข:</strong> เลือก "Order Now" → ระบบสร้าง Purchase Request อัตโนมัติ</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="text-xs font-medium mb-2">สถานการณ์ที่ 3: ลดต้นทุนการผลิต</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>⚡ <strong>โอกาส:</strong> PO-85 และ PO-86 ใช้เครื่อง Slitting ตัดเหล็กขนาดเดียวกัน</p>
                  <p>🤖 <strong>AI แนะนำ:</strong> "ทำติดกันจะประหยัด Setup Time 45 นาที (ประหยัด $30)"</p>
                  <p>✅ <strong>การแก้ไข:</strong> กดปุ่ม "Optimize" → ระบบจัดลำดับงานใหม่</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold mb-2">💡 ประโยชน์ที่ได้รับ</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2 rounded border border-purple-300">
                <p className="font-medium">⏱️ ประหยัดเวลา</p>
                <p className="text-gray-600">ไม่ต้องวางแผนเอง AI ทำให้ใน 5 วินาที</p>
              </div>
              <div className="bg-white p-2 rounded border border-purple-300">
                <p className="font-medium">💰 ลดต้นทุน</p>
                <p className="text-gray-600">ลด Setup Time และ Overtime ได้ 20-30%</p>
              </div>
              <div className="bg-white p-2 rounded border border-purple-300">
                <p className="font-medium">📦 ส่งของทัน</p>
                <p className="text-gray-600">เตือนล่วงหน้าถ้าเสี่ยงส่งไม่ทัน</p>
              </div>
              <div className="bg-white p-2 rounded border border-purple-300">
                <p className="font-medium">🎯 ใช้กำลังเต็มที่</p>
                <p className="text-gray-600">เครื่องจักรไม่ว่างเปล่า ไม่โหลดเกิน</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card id="manufacturing-execution">
        <CardHeader>
          <CardTitle>🚀 Manufacturing Execution (The Launch)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold mb-2">Manufacturing Execution คืออะไร?</h4>
            <p className="text-sm text-gray-700 mb-3">
              เป็นระบบควบคุมการผลิตหน้างานจริง (Shop Floor Control) ที่เชื่อมต่อระหว่าง "แผนการผลิต" กับ "การผลิตจริง" 
              แบ่งเป็น 2 หน้าจอหลัก: <strong>Operator Cockpit</strong> (สำหรับพนักงานหน้าเครื่อง) และ <strong>Supervisor Dashboard</strong> (สำหรับหัวหน้างาน)
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>👨‍🚀</span> Operator Cockpit - หน้าจอพนักงาน
            </h4>
            <p className="text-xs text-gray-600 mb-3">ออกแบบเป็น Kiosk Mode ปุ่มใหญ่ ใช้งานง่าย เหมาะกับจอสัมผัส</p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-blue-300">
                <p className="text-xs font-medium mb-2">1. Mission Queue (เลือกงานที่จะทำ)</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>แสดงรายการ Job Tickets ที่ถูกจัดคิวมาให้</li>
                  <li>เห็นข้อมูล: ชื่อสินค้า, จำนวนเป้าหมาย, Due Date, Priority</li>
                  <li>คลิกเลือกงานที่ต้องการทำ</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-blue-300">
                <p className="text-xs font-medium mb-2">2. Control Panel (ควบคุมการทำงาน)</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Timer:</strong> นับเวลาทำงานจริง เทียบกับเวลามาตรฐาน (แสดงสีเขียว=ทัน, แดง=ช้า)</li>
                  <li><strong>START:</strong> เริ่มงาน (บันทึกเวลาเริ่มต้น)</li>
                  <li><strong>PAUSE:</strong> พักงาน (ต้องระบุสาเหตุ Downtime)</li>
                  <li><strong>STOP:</strong> จบงาน (ปิด Job Ticket)</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-blue-300">
                <p className="text-xs font-medium mb-2">3. Report Output (รายงานผลผลิต)</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Good Qty:</strong> ใส่จำนวนงานดี กดปุ่ม Report → ระบบตัดสต็อกวัตถุดิบอัตโนมัติ</li>
                  <li><strong>Scrap Qty:</strong> ใส่จำนวนของเสีย เลือก Defect Code (เช่น รอยขีดข่วน, ขนาดผิด)</li>
                  <li>ระบบบันทึกทุกอย่างเป็น Log เพื่อคำนวณต้นทุนจริง</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>📡</span> Supervisor Dashboard - หน้าจอหัวหน้างาน
            </h4>
            <p className="text-xs text-gray-600 mb-3">ดูภาพรวมทั้งโรงงานแบบ Real-time</p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="text-xs font-medium mb-2">1. Factory Map (แผนผังโรงงาน)</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>แสดงเครื่องจักรทั้งหมดบนแผนผัง</li>
                  <li>🟢 <strong>Green:</strong> Running (กำลังผลิต)</li>
                  <li>🟡 <strong>Yellow:</strong> Idle (ว่างงาน)</li>
                  <li>🟠 <strong>Orange:</strong> Setup (ตั้งเครื่อง)</li>
                  <li>🔴 <strong>Red:</strong> Down (เครื่องเสีย/หยุด)</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="text-xs font-medium mb-2">2. OEE Monitor (วัดประสิทธิภาพ)</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Availability:</strong> เวลาทำงานจริง / เวลาที่วางแผนไว้</li>
                  <li><strong>Performance:</strong> ผลผลิตจริง / ผลผลิตมาตรฐาน</li>
                  <li><strong>Quality:</strong> งานดี / งานทั้งหมด</li>
                  <li><strong>OEE:</strong> คูณทั้ง 3 ค่า (เป้าหมาย 85%)</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="text-xs font-medium mb-2">3. Alert Feed (แจ้งเตือนปัญหา)</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>🔴 <strong>Critical:</strong> เครื่องหยุดเกิน 15 นาที</li>
                  <li>🟡 <strong>Warning:</strong> ประสิทธิภาพต่ำกว่า 80%</li>
                  <li>🔵 <strong>Info:</strong> งานเสร็จสมบูรณ์</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🤖</span> The Co-Pilot - AI ช่วยแก้ปัญหาหน้างาน
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-orange-300">
                <p className="text-xs font-medium mb-2">1. Downtime Diagnosis (วินิจฉัยสาเหตุเครื่องหยุด)</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p><strong>สถานการณ์:</strong> พนักงานกด PAUSE และเลือก "Motor Heat"</p>
                  <p><strong>AI แนะนำ:</strong> "ลองเช็คพัดลมระบายอากาศด้านหลัง เคยเกิดปัญหานี้เมื่อเดือนที่แล้ว แก้ได้ใน 5 นาที"</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-orange-300">
                <p className="text-xs font-medium mb-2">2. Defect Prediction (ทำนายของเสีย)</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p><strong>สถานการณ์:</strong> เซ็นเซอร์วัดอุณหภูมิเครื่องสูงผิดปกติ</p>
                  <p><strong>AI เตือน:</strong> "อุณหภูมิสูงเกิน! มีความเสี่ยงที่ชิ้นงานจะบิดงอ (Warping) กรุณาพักเครื่อง 10 นาที"</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold mb-2">🔗 การเชื่อมโยงข้อมูล</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2 rounded border border-yellow-300">
                <p className="font-medium mb-1">⬅️ รับข้อมูลจาก:</p>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>Production Order (คำสั่งผลิต)</li>
                  <li>Routing (เวลามาตรฐาน)</li>
                  <li>BOM (วัตถุดิบที่ต้องใช้)</li>
                </ul>
              </div>
              <div className="bg-white p-2 rounded border border-yellow-300">
                <p className="font-medium mb-1">➡️ ส่งข้อมูลไป:</p>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>Inventory (ตัดสต็อกอัตโนมัติ)</li>
                  <li>Costing (คำนวณต้นทุนจริง)</li>
                  <li>Planning (อัปเดตความคืบหน้า)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
