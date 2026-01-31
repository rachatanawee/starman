'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function SalesGuide() {
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
      <Card id="quotation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Sales Module
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-3">การเชื่อมโยงเอกสาร (Document Linkage)</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 mb-3">
                Quotation → Sales Order → Sales Invoice
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Quotation: ใบเสนอราคาให้ลูกค้า</li>
                <li>• Sales Order: ใบสั่งขายเมื่อลูกค้าตกลง</li>
                <li>• Sales Invoice: ใบแจ้งหนี้เพื่อเก็บเงิน</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">ขั้นตอนการทำงาน</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>1. สร้างใบเสนอราคา (Quotation)</li>
              <li>2. Convert เป็น Sales Order เมื่อลูกค้าตกลง</li>
              <li>3. สร้าง Sales Invoice เพื่อเก็บเงิน</li>
              <li>4. ติดตามการชำระเงิน</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card id="sales-order">
        <CardHeader>
          <CardTitle>Document Flow Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef1} className="mermaid">
            {`graph LR
              A[Quotation<br/>ใบเสนอราคา] --> B[Sales Order<br/>ใบสั่งขาย]
              B --> C[Sales Invoice<br/>ใบแจ้งหนี้]
              C --> D[Payment<br/>รับชำระเงิน]
              
              style A fill:#e9d5ff
              style B fill:#ddd6fe
              style C fill:#c4b5fd
              style D fill:#a78bfa`}
          </div>
        </CardContent>
      </Card>

      <Card id="sales-invoice">
        <CardHeader>
          <CardTitle>Sales Process Sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mermaidRef2} className="mermaid">
            {`sequenceDiagram
              participant C as ลูกค้า
              participant AI as 🤖 AI Agent
              participant S as Sales
              participant P as Production
              participant F as Finance
              
              C->>S: สอบถามสินค้า
              S->>AI: วิเคราะห์ความต้องการ
              AI-->>S: แนะนำสินค้าที่เหมาะสม
              S->>C: ส่งใบเสนอราคา
              C->>S: ยืนยันสั่งซื้อ
              S->>AI: ตรวจสอบโอกาสขาย
              AI-->>S: คาดการณ์ความสำเร็จ
              S->>S: สร้าง Sales Order
              S->>P: แจ้งผลิตสินค้า
              P->>S: แจ้งสินค้าพร้อม
              S->>C: จัดส่งสินค้า
              S->>F: สร้างใบแจ้งหนี้
              F->>C: ส่งใบแจ้งหนี้
              C->>F: ชำระเงิน
              F->>S: แจ้งรับชำระเงิน`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Agent ใน Sales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3">📊 Customer Insights</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• วิเคราะห์พฤติกรรมการซื้อของลูกค้า</li>
              <li>• แนะนำสินค้าที่เหมาะสมกับลูกค้า</li>
              <li>• คาดการณ์โอกาสการขายสำเร็จ</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-3">💰 Price Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• แนะนำราคาที่เหมาะสมตามตลาด</li>
              <li>• วิเคราะห์คู่แข่งและแนวโน้มราคา</li>
              <li>• สร้างใบเสนอราคาอัตโนมัติ</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
