# Consistent Page Titles Update

## ✅ การเปลี่ยนแปลงที่ทำ

### 1. ลบ Gradient Text ทั้งหมด
แทนที่ gradient text ด้วยสีเดียวที่สอดคล้องกัน:
- ❌ `bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`
- ✅ `text-gray-900` (สำหรับ title text)

### 2. เพิ่ม Icon ให้ทุกหน้า
ทุก page title ตอนนี้มี icon ที่ตรงกับ sidebar:
- ✅ Sales Order → `ListTodo` icon
- ✅ Quotation → `FileText` icon  
- ✅ Sales Invoice → `DollarSign` icon
- ✅ Worker Allowance History → `History` icon
- ✅ Inventory → `Package2` icon (มีอยู่แล้ว)

### 3. รูปแบบ Title ที่สอดคล้องกัน

**รูปแบบมาตรฐาน:**
```tsx
<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 text-gray-900">
  <IconComponent className="h-8 w-8 text-primary flex-shrink-0" />
  <span>Page Title</span>
</h1>
<p className="text-xs sm:text-sm text-gray-600 mt-1">Subtitle description</p>
```

### 4. แก้ไขปุ่มให้ใช้สี Primary
แทนที่ปุ่มที่ใช้สีต่างๆ:
- ✅ `bg-indigo-600 hover:bg-indigo-700` → `bg-primary hover:bg-primary/90`
- ✅ `bg-blue-600 hover:bg-blue-700` → `bg-primary hover:bg-primary/90`
- ✅ `bg-green-600 hover:bg-green-700` → `bg-primary hover:bg-primary/90`

## 📄 หน้าที่ได้รับการอัพเดท

### Sales Module
- ✅ **Quotation** - มี FileText icon สี primary
- ✅ **Sales Order** - มี ListTodo icon สี primary
- ✅ **Sales Invoice** - มี DollarSign icon สี primary

### Production Module
- ✅ **BOM** - มี icon สี primary
- ✅ **Production Planning** - มี icon สี primary
- ✅ **Production Order** - มี icon สี primary
- ✅ **Manufacturing** - มี icon สี primary

### Materials Module
- ✅ **MRP** - มี icon สี primary
- ✅ **Purchasing** - มี icon สี primary
- ✅ **Inventory** - มี icon สี primary

### Reports Module
- ✅ **Dashboard** - มี icon สี primary
- ✅ **Factory Capacity** - มี icon สี primary
- ✅ **Worker Allowance** - มี icon สี primary
- ✅ **Worker Allowance History** - มี History icon สี primary
- ✅ **WIP Costing** - มี icon สี primary
- ✅ **Job History** - มี icon สี primary

### Finance Module
- ✅ **Accounting** - มี icon สี primary

### Settings
- ✅ **Settings** - มี icon สี primary

## 🎨 ผลลัพธ์

### ก่อนแก้ไข:
- ❌ บางหน้าใช้ gradient text (purple-blue, green-emerald)
- ❌ บางหน้าไม่มี icon
- ❌ ปุ่มใช้สีต่างๆ (purple, blue, green, indigo)
- ❌ ไม่สอดคล้องกับ theme system

### หลังแก้ไข:
- ✅ ทุกหน้าใช้ text สีเดียวกัน (text-gray-900)
- ✅ ทุกหน้ามี icon ที่ตรงกับ sidebar
- ✅ Icon ใช้สี `text-primary` (เปลี่ยนตาม theme)
- ✅ ปุ่มทั้งหมดใช้ `bg-primary` (เปลี่ยนตาม theme)
- ✅ รูปแบบสอดคล้องกันทั่วทั้งระบบ

## 🎯 Icon Mapping (ตาม Sidebar)

| Page | Icon | Class |
|------|------|-------|
| Dashboard | LayoutDashboard | `h-8 w-8 text-primary` |
| Quotation | FileText | `h-8 w-8 text-primary` |
| Sales Order | ListTodo | `h-8 w-8 text-primary` |
| Sales Invoice | DollarSign | `h-8 w-8 text-primary` |
| BOM | GitBranch | `h-8 w-8 text-primary` |
| Production Planning | BarChart3 | `h-8 w-8 text-primary` |
| Production Order | Calendar | `h-8 w-8 text-primary` |
| Manufacturing | Settings | `h-8 w-8 text-primary` |
| MRP | Network | `h-8 w-8 text-primary` |
| Purchasing | ShoppingBag | `h-8 w-8 text-primary` |
| Inventory | Package2 | `h-8 w-8 text-primary` |
| Factory Capacity | Building2 | `h-8 w-8 text-primary` |
| Worker Allowance | Users2 | `h-8 w-8 text-primary` |
| WIP Costing | DollarSign | `h-8 w-8 text-primary` |
| Job History | History | `h-8 w-8 text-primary` |
| Accounting | Calculator | `h-8 w-8 text-primary` |
| Settings | Settings | `h-8 w-8 text-primary` |

## 🚀 การใช้งาน

### Component ที่สร้างใหม่:
```tsx
// components/page-title.tsx
<PageTitle 
  icon={IconComponent}
  title="Page Title"
  subtitle="Optional subtitle"
/>
```

### การใช้งานโดยตรง:
```tsx
<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 text-gray-900">
  <Icon className="h-8 w-8 text-primary flex-shrink-0" />
  <span>Title</span>
</h1>
```

## ✨ ประโยชน์

1. **Consistent Design** - ทุกหน้ามีรูปแบบเดียวกัน
2. **Theme-Aware** - Icon และปุ่มเปลี่ยนสีตาม theme
3. **Better UX** - ผู้ใช้รู้ว่าอยู่หน้าไหนจาก icon ที่เหมือนกับ sidebar
4. **Professional Look** - ดูเป็นระบบและเป็นมืออาชีพ
5. **Easy Maintenance** - แก้ไขง่ายในอนาคต

## 📝 หมายเหตุ

- Title text ใช้ `text-gray-900` (ไม่เปลี่ยนตาม theme)
- Icon ใช้ `text-primary` (เปลี่ยนตาม theme)
- ปุ่มใช้ `bg-primary` (เปลี่ยนตาม theme)
- Subtitle ใช้ `text-gray-600` (ไม่เปลี่ยนตาม theme)

## 🔄 ต้อง Restart Dev Server

หลังจากการเปลี่ยนแปลงนี้ ต้อง restart dev server:
```bash
cd apps/erp-prototype
bun run dev
```

จากนั้น hard refresh browser (Cmd+Shift+R หรือ Ctrl+Shift+R)
