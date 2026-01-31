# ⚠️ RESTART DEV SERVER REQUIRED

## การเปลี่ยนแปลงที่ทำ:

1. ✅ แก้ไข `tailwind.config.ts` - เปลี่ยนจาก `hsl(var(--primary))` เป็น `var(--primary)`
2. ✅ ลบ custom utility classes ออกจาก `globals.css`
3. ✅ อัพเดท sidebar ให้ใช้ `bg-primary/10` และ `text-primary`

## วิธี Restart:

```bash
# หยุด dev server ที่กำลังรัน (Ctrl+C)

# จากนั้นรันใหม่
cd apps/erp-prototype
bun run dev
```

## หลัง Restart:

1. เปิด browser และ **hard refresh** (Cmd+Shift+R หรือ Ctrl+Shift+R)
2. ไปที่หน้า Settings: `/th/company/[id]/settings`
3. เลือก theme ต่างๆ
4. ตรวจสอบว่า sidebar highlight เปลี่ยนสีตาม theme

## ตรวจสอบว่าใช้งานได้:

- ✅ Sidebar menu ที่ active ควรมีพื้นหลังสีอ่อนของ theme ที่เลือก
- ✅ Text ของ menu ที่ active ควรเป็นสีเข้มของ theme
- ✅ Logo icon ด้านบนควรเป็นสีของ theme
- ✅ เมื่อเปลี่ยน theme สีควรเปลี่ยนทันที

## หากยังไม่ทำงาน:

1. ตรวจสอบ browser console มี error หรือไม่
2. ลอง clear browser cache ทั้งหมด
3. ตรวจสอบว่า theme CSS file โหลดสำเร็จ (ดูใน Network tab)
4. ตรวจสอบว่า localStorage มีค่า `theme_name`

```javascript
// ใน browser console
localStorage.getItem('theme_name')
getComputedStyle(document.documentElement).getPropertyValue('--primary')
```
