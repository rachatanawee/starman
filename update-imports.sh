#!/bin/bash

# สคริปต์อัปเดต imports ให้ใช้ common-exports ทุกหน้า

echo "กำลังอัปเดต imports ให้ใช้ common-exports..."

# หาไฟล์ทั้งหมดที่ต้องอัปเดต
find apps/erp-prototype/app/\[locale\]/\(dashboard\)/company/\[id\] -name "page.tsx" -type f | while read file; do
  echo "Processing: $file"
  
  # สำรองไฟล์
  cp "$file" "$file.bak"
  
  # แทนที่ imports ที่ซ้ำๆ ด้วย common-exports
  # (จะทำใน Node.js script แทนเพราะ sed ซับซ้อนเกินไป)
done

echo "เสร็จสิ้น!"
