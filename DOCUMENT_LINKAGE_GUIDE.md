# Document Linkage Guide: Quotation → Sales Order → Sales Invoice

## Overview

การเชื่อมโยงข้อมูล (Data Linkage) ระหว่าง **Quotation (QT)** → **Sales Order (SO)** → **Sales Invoice (INV)** ถือเป็น "กระดูกสันหลัง" ของระบบ ERP เพื่อให้สามารถทำ **Traceability** ได้สมบูรณ์ (ตรวจสอบย้อนกลับได้ว่าบิลนี้มาจากออเดอร์ไหน และออเดอร์นี้มาจากใบเสนอราคาไหน)

## Architecture: Forward Linking Model

ใช้โมเดล **"Forward Linking"** (เอกสารใหม่ อ้างอิงเอกสารเก่า)

```
Quotation (QT-2026-001)
    ↓ quotation_id
Sales Order (SO-2026-055)
    ↓ sales_order_id
Sales Invoice (INV-2026-001)
```

---

## Level 1: Header Level Linking

### 1. Quotation → Sales Order

**เมื่อลูกค้าตกลงซื้อ (Won):**
- กดปุ่ม "Convert to Order"
- ระบบสร้าง Sales Order ใหม่ โดยดึงข้อมูลจาก Quotation

**Database Schema:**
```sql
ALTER TABLE sales_orders 
ADD COLUMN quotation_id INTEGER REFERENCES quotations(id);
```

**Business Logic:**
```typescript
// Convert Quotation to Sales Order
const convertToOrder = async (quotationId: string) => {
  const quotation = await getQuotation(quotationId)
  
  const salesOrder = await createSalesOrder({
    quotation_id: quotationId,
    customer_id: quotation.customer_id,
    items: quotation.items,
    // ... copy other fields
  })
  
  // Update quotation status
  await updateQuotation(quotationId, { status: 'accepted' })
  
  return salesOrder
}
```

### 2. Sales Order → Sales Invoice

**เมื่อถึงเวลาเก็บเงิน (วางบิล):**
- กดปุ่ม "Create Invoice"
- ระบบสร้าง Sales Invoice ใหม่

**Database Schema:**
```sql
ALTER TABLE sales_invoices 
ADD COLUMN sales_order_id INTEGER REFERENCES sales_orders(id);
```

**Note:** 1 Sales Order อาจแตกเป็นหลาย Invoice ได้ (Many-to-One)

---

## Level 2: Item Level Linking (Advanced)

สำหรับรองรับ **Partial Shipment** หรือ **Partial Billing**

### Scenario
- ลูกค้าสั่งของ 100 ชิ้น (SO)
- ส่งของไปก่อน 50 ชิ้น → วางบิล 50 ชิ้น (INV #1)
- อีก 50 ชิ้นวางบิลทีหลัง (INV #2)

### Database Schema

```sql
-- Track billed quantity at order item level
ALTER TABLE sales_order_items 
ADD COLUMN billed_quantity INTEGER DEFAULT 0,
ADD COLUMN remaining_quantity INTEGER GENERATED ALWAYS AS (quantity - billed_quantity) STORED;

-- Link invoice items to order items
ALTER TABLE sales_invoice_items
ADD COLUMN sales_order_item_id INTEGER REFERENCES sales_order_items(id);
```

---

## Business Logic Flow

### Step 1: Convert Quotation (QT → SO)

```typescript
// User clicks "Create Sales Order" from Quotation
const handleConvertToOrder = async (quotationId: string) => {
  // 1. Copy customer + items data
  const quotation = await getQuotation(quotationId)
  
  // 2. Create new Sales Order
  const salesOrder = await createSalesOrder({
    quotation_id: quotationId,
    customer_id: quotation.customer_id,
    items: quotation.items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      billed_quantity: 0, // Initialize tracking
    }))
  })
  
  // 3. Update Quotation status
  await updateQuotation(quotationId, { 
    status: 'accepted',
    converted_to_order_id: salesOrder.id 
  })
  
  return salesOrder
}
```

### Step 2: Create Invoice (SO → INV)

```typescript
// User clicks "Create Invoice" from Sales Order
const handleCreateInvoice = async (salesOrderId: string, billingPercentage: number = 100) => {
  const salesOrder = await getSalesOrder(salesOrderId)
  
  // Calculate billing amount
  const itemsToBill = salesOrder.items.map(item => {
    const quantityToBill = Math.floor(item.remaining_quantity * (billingPercentage / 100))
    return {
      sales_order_item_id: item.id,
      product_id: item.product_id,
      quantity: quantityToBill,
      unit_price: item.unit_price,
    }
  })
  
  // Create Invoice
  const invoice = await createInvoice({
    sales_order_id: salesOrderId,
    quotation_id: salesOrder.quotation_id, // Inherit from SO
    customer_id: salesOrder.customer_id,
    items: itemsToBill,
  })
  
  // Update billed_quantity in sales_order_items
  for (const item of itemsToBill) {
    await updateOrderItem(item.sales_order_item_id, {
      billed_quantity: item.quantity
    })
  }
  
  return invoice
}
```

---

## UI Implementation: Document Chain

### Component Structure

```tsx
// Document Chain Card
<Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
  <CardHeader>
    <CardTitle>Document Chain</CardTitle>
  </CardHeader>
  <CardContent>
    <Timeline>
      {/* Step 1: Quotation */}
      <TimelineItem
        number={1}
        type="Quotation"
        documentNumber="QT-2026-001"
        status="Accepted"
        date="2026-01-10"
        onClick={() => router.push(`/quotation/${quotationId}`)}
      />
      
      {/* Step 2: Sales Order */}
      <TimelineItem
        number={2}
        type="Sales Order"
        documentNumber="SO-2026-055"
        status="Completed"
        date="2026-01-12"
        note="Created from QT-2026-001"
        onClick={() => router.push(`/sales-order/${salesOrderId}`)}
      />
      
      {/* Step 3: Sales Invoice */}
      <TimelineItem
        number={3}
        type="Sales Invoice"
        documentNumber="INV-2026-001"
        status="Paid"
        date="2026-01-15"
        note="Created from SO-2026-055"
        current
      />
    </Timeline>
  </CardContent>
</Card>
```

### Visual Timeline Example

```
Mission Log:
[2026-01-10] 📄 Quotation QT-2026-001 created (Draft)
[2026-01-12] ✅ Quotation Accepted
      ↓
[2026-01-12] 📦 Sales Order SO-2026-055 Created from QT-2026-001
      ↓
[2026-01-15] 💰 Invoice INV-2026-901 (Deposit 30%) created (Status: Paid)
[2026-01-30] 💰 Invoice INV-2026-950 (Final 70%) created (Status: Pending)
```

---

## Database Schema Summary

### Complete DDL

```sql
-- 1. Quotations Table (Base)
CREATE TABLE quotations (
  id SERIAL PRIMARY KEY,
  quotation_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER NOT NULL,
  status TEXT DEFAULT 'draft',
  converted_to_order_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Sales Orders Table (Links to Quotation)
CREATE TABLE sales_orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  quotation_id INTEGER REFERENCES quotations(id), -- Link to Quotation
  customer_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Sales Order Items (Track billing progress)
CREATE TABLE sales_order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES sales_orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  billed_quantity INTEGER DEFAULT 0,
  remaining_quantity INTEGER GENERATED ALWAYS AS (quantity - billed_quantity) STORED,
  unit_price DECIMAL(10, 2) NOT NULL
);

-- 4. Sales Invoices Table (Links to Sales Order)
CREATE TABLE sales_invoices (
  id SERIAL PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  sales_order_id INTEGER REFERENCES sales_orders(id), -- Link to Sales Order
  quotation_id INTEGER REFERENCES quotations(id), -- Inherited from SO
  customer_id INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'unpaid',
  grand_total DECIMAL(10, 2) NOT NULL,
  total_paid DECIMAL(10, 2) DEFAULT 0,
  balance_due DECIMAL(10, 2) GENERATED ALWAYS AS (grand_total - total_paid) STORED,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Sales Invoice Items (Links to Order Items)
CREATE TABLE sales_invoice_items (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER REFERENCES sales_invoices(id) ON DELETE CASCADE,
  sales_order_item_id INTEGER REFERENCES sales_order_items(id), -- Link to Order Item
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_orders_quotation ON sales_orders(quotation_id);
CREATE INDEX idx_invoices_order ON sales_invoices(sales_order_id);
CREATE INDEX idx_invoice_items_order_item ON sales_invoice_items(sales_order_item_id);
```

---

## Benefits

### 1. Complete Traceability
- ตรวจสอบย้อนกลับได้ว่าบิลมาจากออเดอร์ไหน
- เห็นประวัติการเปลี่ยนแปลงทั้งหมด

### 2. Partial Billing Support
- รองรับการเก็บเงินแบบแบ่งงวด
- Track ว่าเก็บเงินไปเท่าไหร่แล้ว

### 3. Data Consistency
- ข้อมูลลูกค้าถูก snapshot ไว้ในแต่ละเอกสาร
- ป้องกันปัญหาข้อมูลเปลี่ยนแปลงย้อนหลัง

### 4. Business Intelligence
- วิเคราะห์ conversion rate (QT → SO → INV)
- ดู sales cycle time
- Track payment collection efficiency

---

## Implementation Checklist

- [ ] เพิ่ม `quotation_id` ใน `sales_orders` table
- [ ] เพิ่ม `sales_order_id` ใน `sales_invoices` table
- [ ] เพิ่ม `sales_order_item_id` ใน `sales_invoice_items` table
- [ ] เพิ่ม `billed_quantity` tracking ใน `sales_order_items`
- [ ] สร้าง "Convert to Order" button ในหน้า Quotation
- [ ] สร้าง "Create Invoice" button ในหน้า Sales Order
- [ ] สร้าง Document Chain component
- [ ] เพิ่ม validation ป้องกันการเปิดบิลเกินจำนวน
- [ ] สร้าง API endpoints สำหรับ conversion
- [ ] เพิ่ม unit tests สำหรับ business logic

---

## Next Steps

1. **Payment Tracking**: เชื่อมต่อกับ Payment Receipts
2. **Delivery Notes**: เพิ่ม Delivery Note ระหว่าง SO และ INV
3. **Credit Notes**: รองรับการคืนเงิน/ลดหนี้
4. **AI Insights**: วิเคราะห์ conversion rate และแนะนำการปรับปรุง

---

## References

- [PostgreSQL Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html)
- [ERP Best Practices: Document Flow](https://www.odoo.com/documentation/16.0/applications/sales.html)
- [Traceability in ERP Systems](https://en.wikipedia.org/wiki/Traceability)
