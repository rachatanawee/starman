# Theme System Testing Guide

## การทดสอบระบบ Theme

### 1. เริ่ม Dev Server
```bash
cd apps/erp-prototype
bun run dev
```

### 2. เปิด Browser Console
- กด F12 หรือ Cmd+Option+I (Mac) / Ctrl+Shift+I (Windows)
- ไปที่แท็บ Console

### 3. ทดสอบการเปลี่ยน Theme
1. ไปที่หน้า Settings: `/th/company/[id]/settings`
2. คลิกเลือก theme ต่างๆ
3. ดูใน Console ว่ามี log ดังนี้:
   - `🔄 Updating theme to: [theme-name]`
   - `🎨 Loading theme: [theme-name]`
   - `✅ Theme loaded successfully: [theme-name]`

### 4. ตรวจสอบว่า CSS ถูกโหลด
ใน Console พิมพ์:
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--primary')
```
ควรได้ค่า oklch(...) ที่แตกต่างกันตาม theme

### 5. ตรวจสอบ Sidebar Highlight
- ไปที่หน้าใดก็ได้ใน sidebar
- Menu ที่ active ควรมีสีตาม theme ที่เลือก
- ตรวจสอบว่า background เป็น `bg-primary/10` และ text เป็น `text-primary`

### 6. Hard Refresh
หากสีไม่เปลี่ยน ให้ทำ:
- Mac: Cmd + Shift + R
- Windows: Ctrl + Shift + R

### 7. ตรวจสอบ localStorage
ใน Console พิมพ์:
```javascript
localStorage.getItem('theme_name')
```
ควรได้ชื่อ theme ที่เลือกล่าสุด

## Theme Files ที่มี
- tangerine (ส้ม - default)
- ocean-breeze (น้ำเงิน)
- claude (เหลืองอำพัน)
- forest-green (เขียว)
- royal-purple (ม่วง)
- crimson-red (แดง)
- clean-slate (เทา)
- twitter (ฟ้า)

## การแก้ปัญหา

### ถ้าสีไม่เปลี่ยน:
1. ตรวจสอบ Console มี error หรือไม่
2. ตรวจสอบว่า theme CSS file โหลดสำเร็จหรือไม่ (ดูใน Network tab)
3. Clear browser cache และ hard refresh
4. Restart dev server

### ถ้า Sidebar ยังเป็นสีม่วง:
- ตรวจสอบว่าไฟล์ `project-sidebar.tsx` ใช้ `bg-primary/10` และ `text-primary` แล้ว
- ตรวจสอบว่า `globals.css` มี utility classes สำหรับ primary colors

### ถ้า Theme ไม่ persist หลัง refresh:
- ตรวจสอบว่า localStorage ทำงานปกติ
- ตรวจสอบว่า SettingsProvider ถูก wrap ใน layout แล้ว
