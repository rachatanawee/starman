'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@spark/core'
import { } from '@spark/core' // card'
import { Package } from 'lucide-react'
import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export function MaterialsGuide() {
  const mermaidRef1 = useRef<HTMLDivElement>(null)
  const mermaidRef2 = useRef<HTMLDivElement>(null)
  const mermaidRef3 = useRef<HTMLDivElement>(null)
  const mermaidRef4 = useRef<HTMLDivElement>(null)
  const mermaidRef5 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' })
    const nodes = [mermaidRef1.current, mermaidRef2.current, mermaidRef3.current, mermaidRef4.current, mermaidRef5.current].filter((node): node is HTMLDivElement => node !== null)
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
          <CardTitle>วิธีเพิ่ม SKU เข้าสู่ Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Inventory ไม่ได้สร้าง SKU โดยตรง แต่เป็นผลลัพธ์จากการเคลื่อนไหวของสินค้า (Transaction-Based)
          </p>
          
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                จาก Purchasing (รับของ)
              </h4>
              <p className="text-sm text-gray-700 ml-8">
                สร้าง Purchase Order → รับของผ่าน Goods Receipt (GR) → ระบบสร้าง Transaction และอัปเดตสต็อกอัตโนมัติ
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                จาก Manufacturing (ผลิตเสร็จ)
              </h4>
              <p className="text-sm text-gray-700 ml-8">
                Production Order เสร็จ → รับสินค้าสำเร็จรูปเข้าคลัง → สร้าง Transaction (type: mfg_receive)
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                Stock Adjustment (ปรับยอด)
              </h4>
              <p className="text-sm text-gray-700 ml-8">
                กรณีนับสต็อกจริง, พบของเพิ่ม, หรือตัดยอดของเสีย → ใช้ Stock Adjustment เพื่อปรับยอดให้ตรงกับความเป็นจริง
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
            <h4 className="font-semibold mb-2">💡 หมายเหตุสำคัญ</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• SKU ถูกสร้างที่ <strong>Product Master</strong> หรือ <strong>BOM</strong> ก่อน</li>
              <li>• Inventory แค่บันทึก <strong>การเคลื่อนไหว</strong> ของ SKU ที่มีอยู่แล้ว</li>
              <li>• ทุก Transaction ต้องมี <strong>Reference Document</strong> (GR, PO, DO) เพื่อ Audit Trail</li>
              <li>• ห้ามแก้ตัวเลขสต็อกโดยตรง ต้องผ่าน Transaction เท่านั้น</li>
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
          <CardTitle>SKU Entry Methods - Sequence Diagrams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-700">1️⃣ จาก Purchasing (รับของ)</h4>
              <div ref={mermaidRef3} className="mermaid">
                {`sequenceDiagram
                  participant V as Vendor
                  participant P as Purchasing
                  participant W as Warehouse
                  participant I as Inventory
                  participant DB as Database
                  
                  P->>P: สร้าง Purchase Order
                  P->>V: ส่ง PO
                  V->>W: ส่งของมา
                  W->>W: ตรวจนับของ
                  W->>I: สร้าง Goods Receipt (GR)
                  I->>DB: INSERT inventory_transaction<br/>(type: purchase_receive)
                  I->>DB: UPDATE inventory_levels<br/>(quantity +)
                  DB-->>I: ✓ Stock Updated
                  I-->>W: ✓ รับของเสร็จสิ้น`}
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-3 text-green-700">2️⃣ จาก Manufacturing (ผลิตเสร็จ)</h4>
              <div ref={mermaidRef4} className="mermaid">
                {`sequenceDiagram
                  participant Prod as Production
                  participant I as Inventory
                  participant DB as Database
                  
                  Prod->>Prod: เบิกวัตถุดิบ (Issue)
                  I->>DB: INSERT transaction<br/>(type: mfg_issue)<br/>quantity -
                  Prod->>Prod: ผลิตสินค้า
                  Prod->>I: รายงานสินค้าสำเร็จรูป
                  I->>DB: INSERT transaction<br/>(type: mfg_receive)<br/>quantity +
                  DB-->>I: ✓ FG Stock Updated
                  I-->>Prod: ✓ รับเข้าคลังเสร็จสิ้น`}
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-3 text-orange-700">3️⃣ Stock Adjustment (ปรับยอด)</h4>
              <div ref={mermaidRef5} className="mermaid">
                {`sequenceDiagram
                  participant U as User
                  participant W as Warehouse
                  participant I as Inventory
                  participant DB as Database
                  
                  U->>W: นับสต็อกจริง
                  W->>I: สร้าง Stock Adjustment
                  I->>DB: SELECT inventory_levels<br/>(ยอดในระบบ)
                  DB-->>I: System Qty: 100
                  I->>I: เปรียบเทียบ<br/>Counted: 95<br/>Diff: -5
                  I->>DB: INSERT transaction<br/>(type: adjust)<br/>quantity -5
                  I->>DB: UPDATE inventory_levels
                  DB-->>I: ✓ Adjusted
                  I-->>U: ✓ ปรับยอดเสร็จสิ้น`}
              </div>
            </div>
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
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-lg border border-primary/20">
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
