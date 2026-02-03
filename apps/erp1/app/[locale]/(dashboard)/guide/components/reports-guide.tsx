import { Card, CardContent, CardHeader, CardTitle } from '@spark/core'
import { } from '@spark/core' // card'
import { BarChart3, Building2, Users2, DollarSign, History } from 'lucide-react'

export function ReportsGuide() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Reports & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            รายงานและการวิเคราะห์ข้อมูลธุรกิจแบบ Real-time สำหรับการตัดสินใจที่แม่นยำ
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📊 Production Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Factory Capacity (กำลังการผลิต)</h4>
            </div>
            <p className="text-sm text-gray-700 mb-2">วิเคราะห์กำลังการผลิตและการใช้งานเครื่องจักร</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Capacity Utilization - อัตราการใช้กำลังการผลิต (%)</li>
              <li>• Machine Availability - เวลาเครื่องจักรพร้อมใช้งาน</li>
              <li>• Bottleneck Analysis - จุดคอขวดในสายการผลิต</li>
              <li>• Load Balancing - การกระจายงานระหว่างเครื่องจักร</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Users2 className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Worker Allowance (ค่าแรงคนงาน)</h4>
            </div>
            <p className="text-sm text-gray-700 mb-2">รายงานค่าแรงและประสิทธิภาพพนักงาน</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Labor Cost per Job - ต้นทุนแรงงานต่องาน</li>
              <li>• Productivity Rate - อัตราผลิตภาพต่อชั่วโมง</li>
              <li>• Overtime Analysis - การทำงานล่วงเวลา</li>
              <li>• Skill-based Performance - ประสิทธิภาพตามทักษะ</li>
            </ul>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">WIP Costing (ต้นทุนงานระหว่างทำ)</h4>
            </div>
            <p className="text-sm text-gray-700 mb-2">รายงานต้นทุนการผลิตแบบ Real-time</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• WIP Value by Order - มูลค่างานระหว่างทำแต่ละ Order</li>
              <li>• Cost Variance Analysis - วิเคราะห์ต้นทุนเบี่ยงเบน</li>
              <li>• DM/DL/OH Breakdown - แยกต้นทุนวัตถุดิบ/แรงงาน/โสหุ้ย</li>
              <li>• Unit Cost Tracking - ต้นทุนต่อหน่วยแบบ Real-time</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <History className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Job History (ประวัติการผลิต)</h4>
            </div>
            <p className="text-sm text-gray-700 mb-2">รายงานผลการผลิตที่เสร็จสมบูรณ์</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Completed Jobs Summary - สรุปงานที่เสร็จแล้ว</li>
              <li>• Yield Rate Analysis - วิเคราะห์อัตราผลผลิต</li>
              <li>• On-Time Delivery Rate - อัตราส่งมอบตรงเวลา</li>
              <li>• Top Performers Ranking - จัดอันดับพนักงานดีเด่น</li>
              <li>• Cost vs Standard Comparison - เปรียบเทียบต้นทุนจริงกับมาตรฐาน</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI-Powered Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3">📈 The Financial Analyst</h4>
            <p className="text-sm text-gray-700 mb-2">AI วิเคราะห์ต้นทุนและกำไร</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Margin Erosion Alert</strong> - เตือนเมื่อกำไรหด (ต้นทุนบาน)</li>
              <li>• <strong>Variance Root Cause</strong> - หาสาเหตุต้นทุนสูงกว่ามาตรฐาน</li>
              <li>• <strong>Dynamic Pricing</strong> - แนะนำปรับราคาขายตามต้นทุนจริง</li>
              <li>• <strong>Cost Optimization</strong> - เสนอแนะลดต้นทุนการผลิต</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3">🎯 The Strategist</h4>
            <p className="text-sm text-gray-700 mb-2">AI วางแผนการผลิต</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Capacity Conflict Detection</strong> - ตรวจจับเครื่องจักรโอเวอร์โหลด</li>
              <li>• <strong>Material Risk Analysis</strong> - คาดการณ์วัตถุดิบขาดแคลน</li>
              <li>• <strong>Cost Optimization</strong> - แนะนำลดเวลา Setup</li>
              <li>• <strong>Deadline Risk Alert</strong> - เตือนความเสี่ยงส่งของช้า</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
            <h4 className="font-semibold mb-3">🧠 The Co-Pilot</h4>
            <p className="text-sm text-gray-700 mb-2">AI ช่วยแก้ปัญหาในสายการผลิต</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Downtime Diagnosis</strong> - วินิจฉัยสาเหตุเครื่องจักรหยุด</li>
              <li>• <strong>Defect Prediction</strong> - คาดการณ์ของเสียก่อนเกิด</li>
              <li>• <strong>Quick Fix Actions</strong> - แนะนำวิธีแก้ไขแบบ One-Click</li>
              <li>• <strong>Preventive Maintenance</strong> - แนะนำบำรุงรักษาเชิงป้องกัน</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>💡 Key Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">✅ Real-time Visibility</h4>
              <p className="text-sm text-gray-700">เห็นข้อมูลทันที ไม่ต้องรอปิดงวด</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">📊 Data-Driven Decisions</h4>
              <p className="text-sm text-gray-700">ตัดสินใจด้วยข้อมูลจริง ไม่ใช่ประสบการณ์</p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">🎯 Proactive Management</h4>
              <p className="text-sm text-gray-700">แก้ปัญหาก่อนเกิด ไม่ใช่หลังเกิด</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2 text-orange-800">💰 Cost Control</h4>
              <p className="text-sm text-gray-700">ควบคุมต้นทุนแบบ Real-time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
