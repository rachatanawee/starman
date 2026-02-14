export function generateI18nTemplates(titleName: string, kebabName: string) {
  const en = JSON.stringify(
    {
      title: titleName,
      subtitle: `Manage ${titleName.toLowerCase()}`,
      add: `Add ${titleName}`,
      edit: `Edit ${titleName}`,
      delete: `Delete ${titleName}`,
      search: `Search ${titleName.toLowerCase()}...`,
      name: 'Name',
      code: 'Code',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      allStatus: 'All Status',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      noItemsFound: 'No items found',
      loading: 'Loading...',
    },
    null,
    2
  )

  const th = JSON.stringify(
    {
      title: titleName,
      subtitle: `จัดการ${titleName}`,
      add: `เพิ่ม${titleName}`,
      edit: `แก้ไข${titleName}`,
      delete: `ลบ${titleName}`,
      search: `ค้นหา${titleName}...`,
      name: 'ชื่อ',
      code: 'รหัส',
      status: 'สถานะ',
      active: 'ใช้งาน',
      inactive: 'ไม่ใช้งาน',
      allStatus: 'ทุกสถานะ',
      createdAt: 'สร้างเมื่อ',
      updatedAt: 'อัพเดทเมื่อ',
      noItemsFound: 'ไม่พบรายการ',
      loading: 'กำลังโหลด...',
    },
    null,
    2
  )

  return { en, th }
}
