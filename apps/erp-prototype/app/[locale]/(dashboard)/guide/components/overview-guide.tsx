'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export function OverviewGuide() {
  const mermaidRef1 = useRef<HTMLDivElement>(null)
  const mermaidRef2 = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const renderDiagram = async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      const nodes = [mermaidRef1.current, mermaidRef2.current].filter((node): node is HTMLDivElement => node !== null)
      if (nodes.length > 0) {
        try {
          nodes.forEach(node => node.removeAttribute('data-processed'))
          mermaid.initialize({ startOnLoad: false, theme: 'default' })
          await mermaid.run({ nodes })
        } catch (error) {
          console.error('Mermaid render error:', error)
        }
      }
    }
    
    renderDiagram()
  }, [mounted])

  return (
    <>
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Starman ERP: Your Business Ground Control</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Navigate your business through the chaos. Let our AI-powered Ground Control handle the systems, so you can focus on the mission.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
              <span>🚀 Mission Ready</span>
              <span>•</span>
              <span>🤖 AI-Powered</span>
              <span>•</span>
              <span>🎯 Ground Control</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ERP คือ อะไร?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            <strong>ERP (Enterprise Resource Planning)</strong> คือระบบบริหารทรัพยากรองค์กรแบบครบวงจร ที่รวมการทำงานของทุกแผนกเข้าด้วยกัน ไม่ว่าจะเป็น การขาย การผลิต คลังสินค้า และการเงิน ให้ทำงานบนฐานข้อมูลเดียวกัน
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2">ประโยชน์ของ ERP</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• ลดความซ้ำซ้อนของข้อมูล</li>
              <li>• เพิ่มความแม่นยำในการทำงาน</li>
              <li>• ติดตามสถานะงานแบบ Real-time</li>
              <li>• ตัดสินใจได้เร็วขึ้นด้วยข้อมูลที่ถูกต้อง</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>โมดูลหลักใน Starman ERP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2">Sales Module</h4>
              <p className="text-sm text-gray-600">จัดการใบเสนอราคา ใบสั่งขาย และใบแจ้งหนี้</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2">Production Module</h4>
              <p className="text-sm text-gray-600">วางแผนและควบคุมการผลิต</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2">Materials Module</h4>
              <p className="text-sm text-gray-600">จัดการสต็อกและวัตถุดิบ</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2">Finance Module</h4>
              <p className="text-sm text-gray-600">บันทึกบัญชีและรายงานทางการเงิน</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ภาพรวมการทำงานของระบบ</CardTitle>
        </CardHeader>
        <CardContent>
          {mounted && (
            <div ref={mermaidRef1} className="mermaid" style={{ minHeight: '600px' }}>
              {`%%{init: {'theme':'base', 'themeVariables': { 'fontSize':'16px'}}}%%
              flowchart TB
                subgraph Sales["💼 Sales"]
                  S1["📋 เสนอราคา<br/>Quotation"]
                  S2["📝 สั่งขาย<br/>Sales Order"]
                  S3["🚚 ส่งสินค้า<br/>Delivery"]
                  S1 --> S2 --> S3
                end
                
                subgraph Production["🏭 Production"]
                  P1["⚙️ คำสั่งผลิต<br/>Production Order"]
                  P2["🔧 ผลิตสินค้า<br/>Manufacturing"]
                  P1 --> P2
                end
                
                subgraph Materials["📦 Materials"]
                  M1["📤 เบิกวัตถุดิบ<br/>Material Request"]
                  M2["📥 รับเข้าสต็อก<br/>Stock In"]
                  M1 --> M2
                end
                
                subgraph Finance["💰 Finance"]
                  F1["🧾 แจ้งหนี้<br/>Invoice"]
                  F2["✅ ชำระเงิน<br/>Payment"]
                  F1 --> F2
                end
                
                S2 -.->|"สั่งผลิต"| P1
                P1 -.->|"ขอวัตถุดิบ"| M1
                P2 -.->|"สินค้าสำเร็จ"| M2
                M2 -.->|"พร้อมส่ง"| S3
                S3 ==>|"ออกบิล"| F1
                F2 ==>|"เสร็จสิ้น"| S1
                
                classDef salesStyle fill:#f3e8ff,stroke:#9333ea,stroke-width:4px,color:#581c87,font-size:14px
                classDef prodStyle fill:#dbeafe,stroke:#2563eb,stroke-width:4px,color:#1e40af,font-size:14px
                classDef matStyle fill:#d1fae5,stroke:#059669,stroke-width:4px,color:#065f46,font-size:14px
                classDef finStyle fill:#fed7aa,stroke:#ea580c,stroke-width:4px,color:#9a3412,font-size:14px
                
                class S1,S2,S3 salesStyle
                class P1,P2 prodStyle
                class M1,M2 matStyle
                class F1,F2 finStyle
                
                style Sales fill:#faf5ff,stroke:#9333ea,stroke-width:3px
                style Production fill:#eff6ff,stroke:#2563eb,stroke-width:3px
                style Materials fill:#f0fdf4,stroke:#059669,stroke-width:3px
                style Finance fill:#fff7ed,stroke:#ea580c,stroke-width:3px`}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ลำดับการทำงานระหว่าง Modules</CardTitle>
        </CardHeader>
        <CardContent>
          {mounted && (
            <div ref={mermaidRef2} className="mermaid">
              {`sequenceDiagram
                participant C as ลูกค้า
                participant AI as 🤖 AI Agent
                participant S as Sales
                participant P as Production
                participant M as Materials
                participant F as Finance
                
                C->>S: สอบถามสินค้า
                S->>AI: วิเคราะห์ความต้องการ
                AI-->>S: แนะนำสินค้าที่เหมาะสม
                S->>C: ส่งใบเสนอราคา
                C->>S: ยืนยันสั่งซื้อ
                S->>S: สร้าง Sales Order
                S->>P: สั่งผลิตสินค้า
                P->>AI: ขอแผนการผลิต
                AI-->>P: แนะนำกำหนดการผลิต
                P->>M: ขอเบิกวัตถุดิบ
                M->>AI: ตรวจสอบสต็อก
                AI-->>M: แจ้งสถานะสต็อก
                M->>P: จ่ายวัตถุดิบ
                P->>P: ผลิตสินค้า
                P->>M: สินค้าสำเร็จ
                M->>M: รับเข้าสต็อก
                M->>S: แจ้งสินค้าพร้อม
                S->>C: จัดส่งสินค้า
                S->>F: สร้างใบแจ้งหนี้
                F->>AI: ตรวจสอบเครดิต
                AI-->>F: อนุมัติเครดิต
                F->>C: ส่งใบแจ้งหนี้
                C->>F: ชำระเงิน
                F->>S: แจ้งรับชำระเงิน
                
                Note over AI: AI Agent คอยวิเคราะห์<br/>และให้คำแนะนำ<br/>ตลอดกระบวนการ`}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Ground Control: ผู้ช่วยอัจฉริยะของคุณ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            <strong>AI Agent</strong> เป็น Ground Control ของธุรกิจคุณ คอยวิเคราะห์ข้อมูล หารูปแบบ และให้คำแนะนำที่ช่วยให้คุณตัดสินใจได้ดีขึ้น เร็วขึ้น และแม่นยำขึ้น เหมือนมี Ground Control คอยดูแลระบบให้ คุณจึงสามารถมุ่งเน้นไปที่ Mission หลักขอนธุรกิจได้
          </p>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🚀</span>
              <span>AI Ground Control ทำอะไรให้คุณ</span>
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>วิเคราะห์สถานการณ์</strong> - ตรวจสอบทุกระบบและแจ้งเตือนเมื่อมีปัญหา</li>
              <li>• <strong>คาดการณ์อนาคต</strong> - พยากรณ์แนวโน้มและโอกาสที่จะเกิดขึ้น</li>
              <li>• <strong>แนะนำอัตโนมัติ</strong> - เสนอแนะการดำเนินการที่เหมาะสมที่สุด</li>
              <li>• <strong>เพิ่มประสิทธิภาพ</strong> - หาจุดที่สามารถปรับปรุงและเพิ่มผลลัพธ์</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🎯 AI Agent ในแต่ละโมดูล</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            AI Agent เป็นผู้ช่วยอัจฉริยะที่ใช้ AI วิเคราะห์ข้อมูล หารูปแบบ และให้คำแนะนำที่ช่วยให้ตัดสินใจได้ดีขึ้น เร็วขึ้น และแม่นยำขึ้น
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2">📊 Sales Insights</h4>
              <p className="text-sm text-gray-600 mb-2">วิเคราะห์พฤติกรรมลูกค้า แนะนำกลยุทธ์การขาย</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• พยากรณ์ยอดขาย</li>
                <li>• แนะนำสินค้าที่เหมาะสม</li>
                <li>• วิเคราะห์ความต้องการลูกค้า</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2">🏭 Production Optimization</h4>
              <p className="text-sm text-gray-600 mb-2">เพิ่มประสิทธิภาพการผลิต ลดของเสีย</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• วางแผนการผลิตอัตโนมัติ</li>
                <li>• ลด Downtime และของเสีย</li>
                <li>• บำรุงรักษาเชิงพยากรณ์</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2">📦 Inventory Prediction</h4>
              <p className="text-sm text-gray-600 mb-2">พยากรณ์ความต้องการสินค้า จัดการสต็อก</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• แจ้งเตือนสินค้าใกล้หมด</li>
                <li>• แนะนำจุดสั่งซื้อที่เหมาะสม</li>
                <li>• ลดสินค้าค้างและช้าเคลื่อนที่</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2">💰 Financial Analysis</h4>
              <p className="text-sm text-gray-600 mb-2">วิเคราะห์กระแสเงินสด คาดการณ์รายได้</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• ตรวจสอบลูกหนี้ค้างชำระ</li>
                <li>• วิเคราะห์ความเสี่ยงทางการเงิน</li>
                <li>• แนะนำการวางแผนงบประมาณ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
