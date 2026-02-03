# Spark Base - Troubleshooting

## หน้า Login ขาวเปล่า

ลองทำตามขั้นตอนนี้:

1. **Clear Browser Cache & LocalStorage**
   - เปิด DevTools (F12)
   - ไปที่ Application/Storage tab
   - Clear localStorage
   - Hard refresh (Ctrl+Shift+R หรือ Cmd+Shift+R)

2. **เช็ค Console Errors**
   - เปิด Console tab ใน DevTools
   - ดูว่ามี error อะไร

3. **เช็คว่า CSS โหลดหรือไม่**
   - ไปที่ Network tab
   - Filter เฉพาะ CSS
   - Refresh หน้า
   - ดูว่า `tangerine.css` โหลดสำเร็จหรือไม่

4. **ลอง Disable Theme Loading ชั่วคราว**
   - ลบ localStorage item `erp_settings`
   - Refresh

## วิธีรัน

```bash
cd apps/spark-base
bun run dev
```

เปิด http://localhost:3201

Login: `demo@erp.com` / `demo123`
