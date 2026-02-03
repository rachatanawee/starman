'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Receipt } from 'lucide-react'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function FinanceGuide() {
  const mermaidRef1 = useRef<HTMLDivElement>(null)
  const mermaidRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' })
    const nodes = [mermaidRef1.current, mermaidRef2.current].filter((node): node is HTMLDivElement => node !== null)
    if (nodes.length > 0) {
      mermaid.run({ nodes })
    }
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Finance Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            บันทึกบัญชี จัดการรายรับ-รายจ่าย และสร้างรายงานทางการเงิน
          </p>
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2">ฟีเจอร์หลัก</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• บันทึกรายรับ-รายจ่าย</li>
              <li>• ออกใบแจ้งหนี้และใบเสร็จ</li>
              <li>• ติดตามการชำระเงิน</li>
              <li>• รายงานทางการเงิน</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Finance Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef1} className="mermaid">
            {`graph LR
              A[Sales Invoice<br/>ใบแจ้งหนี้] --> B[Payment<br/>รับชำระเงิน]
              B --> C[Receipt<br/>ใบเสร็จ]
              C --> D[Accounting<br/>บันทึกบัญชี]
              D --> E[Financial Report<br/>รายงานการเงิน]
              
              style A fill:#fed7aa
              style B fill:#fde68a
              style C fill:#d9f99d
              style D fill:#bfdbfe
              style E fill:#ddd6fe`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Finance Process Sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef2} className="mermaid">
            {`sequenceDiagram
              participant C as ลูกค้า
              participant S as Sales
              participant AI as 🤖 AI Agent
              participant F as Finance
              participant A as Accounting
              
              S->>F: สร้างใบแจ้งหนี้
              F->>AI: ตรวจสอบเครดิต
              AI-->>F: อนุมัติเครดิต
              F->>C: ส่งใบแจ้งหนี้
              C->>F: ชำระเงิน
              F->>AI: วิเคราะห์การชำระเงิน
              AI-->>F: ยืนยันความถูกต้อง
              F->>F: บันทึกการรับเงิน
              F->>C: ออกใบเสร็จ
              F->>A: บันทึกบัญชี
              A->>AI: วิเคราะห์กระแสเงินสด
              AI-->>A: แนะนำการวางแผน
              A->>A: ปิดงบการเงิน
              A->>F: สร้างรายงาน`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Agent ใน Finance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3">💰 Financial Analysis</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• วิเคราะห์กระแสเงินสด</li>
              <li>• คาดการณ์รายได้-รายจ่าย</li>
              <li>• แนะนำการวางแผนงบประมาณ</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold mb-3">⚠️ Risk Detection</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• ตรวจสอบลูกหนี้ค้างชำระ</li>
              <li>• แจ้งเตือนค่าใช้จ่ายผิดปกติ</li>
              <li>• วิเคราะห์ความเสี่ยงทางการเงิน</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
