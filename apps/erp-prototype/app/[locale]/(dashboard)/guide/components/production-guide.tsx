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
      <Card>
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

      <Card>
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

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Agent ใน Production</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-3">🏭 Production Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• วางแผนการผลิตอัตโนมัติ</li>
              <li>• เพิ่มประสิทธิภาพการผลิต</li>
              <li>• ลดของเสียและ Downtime</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold mb-3">⚠️ Predictive Maintenance</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• พยากรณ์ความเสี่ยงของเครื่องจักร</li>
              <li>• แจ้งเตือนก่อนเกิดปัญหา</li>
              <li>• วางแผนการบำรุงรักษา</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
