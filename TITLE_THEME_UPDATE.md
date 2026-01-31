# Title & Icon Theme Update

## ✅ การเปลี่ยนแปลงที่ทำ

### 1. Title Icons (h-8 w-8)
แทนที่สี icon ขนาดใหญ่ทั้งหมดให้เป็น `text-primary`:
- ✅ `text-orange-600` → `text-primary`
- ✅ `text-indigo-600` → `text-primary`
- ✅ `text-blue-600` → `text-primary`
- ✅ `text-green-600` → `text-primary`
- ✅ `text-red-600` → `text-primary`
- ✅ `text-yellow-600` → `text-primary`
- ✅ `text-teal-600` → `text-primary`
- ✅ `text-pink-600` → `text-primary`
- ✅ `text-cyan-600` → `text-primary`

### 2. Card Header Icons (h-5 w-5)
แทนที่สี icon ขนาดกลางทั้งหมด:
- ✅ `h-5 w-5 text-green-600` → `h-5 w-5 text-primary`
- ✅ `h-5 w-5 text-teal-600` → `h-5 w-5 text-primary`
- ✅ `h-5 w-5 text-pink-600` → `h-5 w-5 text-primary`
- ✅ `h-5 w-5 text-indigo-600` → `h-5 w-5 text-primary`
- ✅ `h-5 w-5 text-orange-600` → `h-5 w-5 text-primary`
- ✅ `h-5 w-5 text-blue-600` → `h-5 w-5 text-primary`

### 3. Title Text Colors
แทนที่สี text ใน CardTitle:
- ✅ `text-pink-900` → `text-primary`
- ✅ `text-red-900` → `text-primary`
- ✅ `text-orange-900` → `text-primary`
- ✅ `text-teal-900` → `text-primary`
- ✅ `text-indigo-900` → `text-primary`
- ✅ `text-blue-900` → `text-primary`
- ✅ `text-green-900` → `text-primary`

### 4. Card Borders
แทนที่สี border ของ Card:
- ✅ `border-orange-200` → `border-primary/20`
- ✅ `border-teal-200` → `border-primary/20`
- ✅ `border-indigo-200` → `border-primary/20`
- ✅ `border-pink-200` → `border-primary/20`
- ✅ `border-red-200` → `border-primary/20`

## 📄 หน้าที่ได้รับการอัพเดท

### Dashboard Pages
- ✅ Dashboard
- ✅ Dashboard Report
- ✅ Factory Capacity
- ✅ Worker Allowance
- ✅ WIP Costing
- ✅ Job History

### Sales Pages
- ✅ Quotation
- ✅ Sales Order
- ✅ Sales Invoice

### Production Pages
- ✅ BOM
- ✅ Production Planning
- ✅ Production Order
- ✅ Manufacturing

### Materials Pages
- ✅ MRP
- ✅ Purchasing
- ✅ Inventory

### Finance Pages
- ✅ Accounting
- ✅ Accounting Configure

### Settings
- ✅ Settings (รวมถึง Theme selector)

## 🎨 ผลลัพธ์

ตอนนี้ทุกหน้ามีรูปแบบ title ที่สอดคล้องกัน:

```tsx
<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
  <IconComponent className="h-8 w-8 text-primary" />
  Page Title
</h1>
```

และ Card headers:

```tsx
<CardHeader className="bg-gradient-to-r from-[color]-50 to-[color]-50">
  <div className="flex items-center gap-2">
    <IconComponent className="h-5 w-5 text-primary" />
    <CardTitle className="text-primary">Card Title</CardTitle>
  </div>
</CardHeader>
```

## ✨ ประโยชน์

1. **Consistent Design** - ทุกหน้ามีรูปแบบเดียวกัน
2. **Theme-Aware** - สีเปลี่ยนตาม theme ที่เลือก
3. **Professional Look** - ดูเป็นระบบและเป็นมืออาชีพ
4. **Easy Maintenance** - แก้ไขง่ายในอนาคต

## 🚀 การใช้งาน

หลังจาก restart dev server:
1. เปิดหน้าใดก็ได้ในระบบ
2. สังเกต title icon และ card header icons
3. ไปที่ Settings และเปลี่ยน theme
4. กลับมาดูหน้าเดิม - icons และ titles จะเปลี่ยนสีตาม theme!

## 📝 หมายเหตุ

### สิ่งที่ยังคงสีเดิม (ตั้งใจ):
- ✅ Status indicators (success=green, warning=yellow, danger=red)
- ✅ Gradient backgrounds ที่ใช้หลายสี
- ✅ Chart colors
- ✅ Badge colors ที่แสดง status

### สิ่งที่เปลี่ยนเป็น primary:
- ✅ Page title icons
- ✅ Card header icons
- ✅ Card titles
- ✅ Card borders (primary cards)
- ✅ Primary buttons
- ✅ Active menu items
- ✅ Links และ interactive elements
