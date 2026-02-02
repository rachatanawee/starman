# รายการ Components

## Shadcn UI Components

### Form & Input Components
- **alert.tsx** - แสดงข้อความแจ้งเตือนหรือข้อมูลสำคัญ
- **button.tsx** - ปุ่มกดพร้อม variants ต่างๆ (default, destructive, outline, ghost, link)
- **checkbox.tsx** - ช่องทำเครื่องหมายสำหรับเลือกหลายตัวเลือก
- **input.tsx** - ช่องกรอกข้อความพื้นฐาน
- **label.tsx** - ป้ายชื่อสำหรับ form fields
- **select.tsx** - Dropdown สำหรับเลือกตัวเลือกเดียว
- **switch.tsx** - สวิตช์เปิด/ปิด (toggle)
- **textarea.tsx** - ช่องกรอกข้อความหลายบรรทัด
- **slider.tsx** - แถบเลื่อนสำหรับเลือกค่าตัวเลข
- **form.tsx** - Form wrapper พร้อม validation (ใช้ร่วมกับ react-hook-form)

### Display Components
- **badge.tsx** - ป้ายแสดงสถานะหรือหมวดหมู่
- **card.tsx** - กล่องสำหรับจัดกลุ่มเนื้อหา (Card, CardHeader, CardContent, CardFooter)
- **separator.tsx** - เส้นแบ่งแนวนอนหรือแนวตั้ง
- **skeleton.tsx** - Placeholder แสดงขณะโหลดข้อมูล
- **progress.tsx** - แถบแสดงความคืบหน้า
- **kbd.tsx** - แสดงปุ่มคีย์บอร์ด (keyboard shortcut)

### Navigation Components
- **tabs.tsx** - แท็บสำหรับสลับระหว่างหน้าต่างๆ
- **dropdown-menu.tsx** - เมนู dropdown พร้อม submenu
- **command.tsx** - Command palette สำหรับค้นหาและเลือกคำสั่ง
- **breadcrumbs** - (Custom) แสดงเส้นทางการนำทาง

### Overlay Components
- **dialog.tsx** - Modal dialog สำหรับแสดงเนื้อหาทับหน้าจอ
- **popover.tsx** - กล่องข้อความแสดงเมื่อคลิกหรือ hover
- **tooltip.tsx** - คำแนะนำสั้นๆ แสดงเมื่อ hover

### Data Components
- **table.tsx** - ตารางพื้นฐาน (Table, TableHeader, TableBody, TableRow, TableCell)
- **data-table.tsx** - ตารางข้อมูลพร้อมฟีเจอร์ขั้นสูง
- **calendar.tsx** - ปฏิทินสำหรับเลือกวันที่
- **chart.tsx** - กราฟและชาร์ตต่างๆ (ใช้ร่วมกับ recharts)

### Special Components
- **faceted.tsx** - Faceted filter สำหรับกรองข้อมูลแบบหลายเงื่อนไข
- **sortable.tsx** - Component สำหรับลากจัดเรียงลำดับ

## Custom Components

### Layout Components
- **project-layout.tsx** - Layout หลักของระบบ (header + sidebar + content)
- **project-sidebar.tsx** - Sidebar สำหรับ desktop พร้อม scroll persistence
- **mobile-menu.tsx** - Drawer menu สำหรับ mobile พร้อม search
- **project-switcher.tsx** - Dropdown สำหรับสลับระหว่าง company/project
- **page-transition.tsx** - Animation เมื่อเปลี่ยนหน้า
- **theme-loader.tsx** - โหลดและสลับ theme แบบ dynamic

### Navigation Components
- **breadcrumbs.tsx** - แสดงเส้นทางการนำทาง (Home > Company > Dashboard)
- **quick-search.tsx** - ช่องค้นหาแบบเร็ว (Cmd+K)

### Title Components
- **page-title.tsx** - หัวข้อหน้าพร้อม icon
- **settings-aware-title.tsx** - หัวข้อที่ปรับตามการตั้งค่า

### Data Display Components
- **filter-panel.tsx** - แผงกรองข้อมูลแบบละเอียด
- **date-range-filter.tsx** - เลือกช่วงวันที่สำหรับกรองข้อมูล
- **calendar-date-picker.tsx** - เลือกวันที่จากปฏิทิน
- **ai-insights-badge.tsx** - Badge แสดงข้อมูล AI insights

### BOM Components
- **bom-dialog.tsx** - Dialog สำหรับจัดการ BOM (Bill of Materials)
- **bom-tree-view.tsx** - แสดง BOM แบบ tree structure

### Dashboard Components
- **operator-cockpit.tsx** - Dashboard สำหรับ operator
- **supervisor-dashboard.tsx** - Dashboard สำหรับ supervisor

### Feedback Components (components/feedback/)
- **floating-undo.tsx** - ปุ่ม undo แบบลอยขึ้นมา
- **inline-feedback.tsx** - แสดง feedback แบบ inline
- **status-indicator.tsx** - แสดงสถานะ (loading, success, error)
- **use-optimistic.tsx** - Hook สำหรับ optimistic updates

## TableCN Components (Advanced Data Grid)

### Data Grid Components (components/tablecn/data-grid/)
- **data-grid.tsx** - Data grid หลักพร้อมฟีเจอร์ครบครัน
- **data-grid-cell.tsx** - Cell แต่ละช่องในตาราง
- **data-grid-cell-wrapper.tsx** - Wrapper สำหรับ cell พร้อม selection
- **data-grid-cell-variants.tsx** - Cell แบบต่างๆ (text, number, date, select)
- **data-grid-row.tsx** - แถวในตาราง
- **data-grid-column-header.tsx** - Header ของคอลัมน์
- **data-grid-context-menu.tsx** - Context menu เมื่อคลิกขวา
- **data-grid-search.tsx** - ค้นหาข้อมูลในตาราง
- **data-grid-sort-menu.tsx** - เมนูเรียงลำดับข้อมูล
- **data-grid-view-menu.tsx** - เมนูปรับมุมมองตาราง
- **data-grid-row-height-menu.tsx** - ปรับความสูงของแถว
- **data-grid-keyboard-shortcuts.tsx** - แสดง keyboard shortcuts

### Data Table Components (components/tablecn/data-table/)
- **data-table.tsx** - ตารางข้อมูลแบบ server-side
- **data-table-toolbar.tsx** - Toolbar สำหรับตาราง
- **data-table-advanced-toolbar.tsx** - Toolbar แบบขั้นสูง
- **data-table-column-header.tsx** - Header ที่เรียงลำดับได้
- **data-table-pagination.tsx** - Pagination controls
- **data-table-view-options.tsx** - เลือกคอลัมน์ที่จะแสดง
- **data-table-action-bar.tsx** - Action bar สำหรับ bulk actions
- **data-table-faceted-filter.tsx** - กรองแบบ faceted
- **data-table-date-filter.tsx** - กรองตามวันที่
- **data-table-range-filter.tsx** - กรองตามช่วงตัวเลข
- **data-table-slider-filter.tsx** - กรองด้วย slider
- **data-table-filter-menu.tsx** - เมนูกรองข้อมูล
- **data-table-filter-list.tsx** - แสดงรายการ filter ที่เลือก
- **data-table-sort-list.tsx** - แสดงรายการการเรียงลำดับ
- **data-table-skeleton.tsx** - Skeleton สำหรับตาราง

### Hooks (components/tablecn/hooks/)
- **use-data-grid.tsx** - Hook หลักสำหรับ data grid
- **use-data-table.ts** - Hook สำหรับ data table
- **use-badge-overflow.ts** - จัดการ badge ที่เกินพื้นที่
- **use-callback-ref.ts** - Callback ref utility
- **use-debounced-callback.ts** - Debounce callback
- **use-media-query.ts** - ตรวจสอบ media query
- **use-window-size.ts** - ตรวจสอบขนาดหน้าจอ

### Utilities (components/tablecn/lib/)
- **data-grid.ts** - Utilities สำหรับ data grid
- **data-table.ts** - Utilities สำหรับ data table
- **export.ts** - Export ข้อมูลเป็น CSV/Excel
- **filter-columns.ts** - กรองคอลัมน์
- **format.ts** - Format ข้อมูล (วันที่, ตัวเลข, สกุลเงิน)
- **parsers.ts** - Parse ข้อมูล
- **constants.ts** - ค่าคงที่ต่างๆ

## การติดตั้ง Shadcn UI Components

```bash
# ติดตั้ง component ใหม่
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add dropdown-menu

# ติดตั้งหลาย components พร้อมกัน
bunx --bun shadcn@latest add button dialog dropdown-menu input
```

## การใช้งาน

### ตัวอย่าง Button
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
```

### ตัวอย่าง Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content here</p>
  </DialogContent>
</Dialog>
```

### ตัวอย่าง Data Grid
```tsx
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'

<DataGrid
  data={data}
  columns={columns}
  onCellEdit={(rowIndex, columnId, value) => {
    // Handle cell edit
  }}
/>
```

## หมายเหตุ

- ใช้ **Bun** เป็น runtime และ package manager
- Components ทั้งหมดรองรับ theme system ผ่าน CSS variables
- Data Grid มีฟีเจอร์ครบครัน: inline editing, context menu, keyboard shortcuts, search, sort, filter
- Custom components ออกแบบมาเพื่อใช้งานใน ERP prototype โดยเฉพาะ
