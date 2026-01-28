import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

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
            รายงานและการวิเคราะห์ข้อมูลธุรกิจ
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2">Sales Reports</h4>
              <p className="text-sm text-gray-600">รายงานการขายและยอดขาย</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2">Inventory Reports</h4>
              <p className="text-sm text-gray-600">รายงานสต็อกและการเคลื่อนไหว</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold mb-2">Financial Reports</h4>
              <p className="text-sm text-gray-600">รายงานทางการเงิน</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold mb-2">Production Reports</h4>
              <p className="text-sm text-gray-600">รายงานการผลิต</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI-Powered Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold mb-3">📈 Predictive Analytics</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• พยากรณ์ยอดขายในอนาคต</li>
              <li>• วิเคราะห์แนวโน้มตลาด</li>
              <li>• คาดการณ์ความเสี่ยงทางธุรกิจ</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
            <h4 className="font-semibold mb-3">🎯 Performance Insights</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• วิเคราะห์ KPI และตัวชี้วัด</li>
              <li>• เปรียบเทียบผลการดำเนินงาน</li>
              <li>• แนะนำจุดปรับปรุง</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
            <h4 className="font-semibold mb-3">🧠 Smart Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• แนะนำกลยุทธ์เพิ่มยอดขาย</li>
              <li>• เสนอแนะการลดต้นทุน</li>
              <li>• วิเคราะห์โอกาสทางธุรกิจ</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
