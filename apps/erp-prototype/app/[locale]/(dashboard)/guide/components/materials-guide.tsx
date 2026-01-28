'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package } from 'lucide-react'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function MaterialsGuide() {
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
            <Package className="h-5 w-5" />
            Materials Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            จัดการสต็อกสินค้า วัตถุดิบ และการเคลื่อนไหวของสินค้า
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-2">ฟีเจอร์หลัก</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• ตรวจสอบสต็อกแบบ Real-time</li>
              <li>• แจ้งเตือนสินค้าใกล้หมด</li>
              <li>• ติดตามการเคลื่อนไหวสินค้า</li>
              <li>• จัดการคลังสินค้าหลายแห่ง</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef1} className="mermaid">
            {`graph TB
              A[Purchase Order<br/>สั่งซื้อ] --> B[Goods Receipt<br/>รับของ]
              B --> C[Quality Check<br/>ตรวจสอบ]
              C --> D[Stock In<br/>เข้าคลัง]
              D --> E[Production Use<br/>ใช้ผลิต]
              D --> F[Sales Delivery<br/>ส่งขาย]
              
              style A fill:#bbf7d0
              style B fill:#d1fae5
              style C fill:#fef3c7
              style D fill:#a7f3d0
              style E fill:#bfdbfe
              style F fill:#e9d5ff`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Process Sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef2} className="mermaid">
            {`sequenceDiagram
              participant V as Vendor
              participant AI as 🤖 AI Agent
              participant P as Purchasing
              participant W as Warehouse
              participant Q as Quality
              participant Prod as Production
              
              P->>AI: ตรวจสอบสต็อก
              AI-->>P: แนะนำสินค้าที่ต้องสั่งซื้อ
              P->>V: สั่งซื้อสินค้า
              V->>W: ส่งสินค้า
              W->>Q: ส่งตรวจสอบ
              Q->>AI: วิเคราะห์คุณภาพ
              AI-->>Q: ผลการตรวจสอบ
              Q->>Q: ตรวจคุณภาพ
              Q->>W: ผ่านการตรวจ
              W->>W: รับเข้าสต็อก
              Prod->>W: ขอเบิกวัตถุดิบ
              W->>AI: ตรวจสอบสต็อก
              AI-->>W: ยืนยันสต็อกเพียงพอ
              W->>Prod: จ่ายวัตถุดิบ`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Agent ใน Materials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-3">📦 Inventory Prediction</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• พยากรณ์ความต้องการสินค้า</li>
              <li>• แนะนำจุดสั่งซื้อที่เหมาะสม</li>
              <li>• เพิ่มประสิทธิภาพการจัดการสต็อก</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200">
            <h4 className="font-semibold mb-3">📊 Stock Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• วิเคราะห์สินค้าค้างและช้าเคลื่อนที่</li>
              <li>• ลดต้นทุนการเก็บสินค้า</li>
              <li>• เพิ่ม Turnover Rate</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
