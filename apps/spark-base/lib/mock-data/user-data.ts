export type UserRole = 'admin' | 'manager' | 'accountant' | 'production_manager' | 'warehouse_staff' | 'sales' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'suspended'

export interface ModulePermission {
  sales: boolean
  production: boolean
  inventory: boolean
  purchasing: boolean
  accounting: boolean
  reports: boolean
  settings: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  department: string
  phone: string
  joinDate: string
  lastLogin: string
  permissions: ModulePermission
  companyAccess: string[]
  avatar?: string
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Somchai Prasert',
    email: 'somchai.p@company.com',
    role: 'admin',
    status: 'active',
    department: 'IT',
    phone: '081-234-5678',
    joinDate: '2020-01-15',
    lastLogin: '2024-01-15 14:30',
    permissions: { sales: true, production: true, inventory: true, purchasing: true, accounting: true, reports: true, settings: true },
    companyAccess: ['1', '2', '3', '4']
  },
  {
    id: '2',
    name: 'Niran Wongsakul',
    email: 'niran.w@company.com',
    role: 'manager',
    status: 'active',
    department: 'Operations',
    phone: '082-345-6789',
    joinDate: '2020-03-20',
    lastLogin: '2024-01-15 13:45',
    permissions: { sales: true, production: true, inventory: true, purchasing: true, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '2']
  },
  {
    id: '3',
    name: 'Siriwan Tanaka',
    email: 'siriwan.t@company.com',
    role: 'accountant',
    status: 'active',
    department: 'Finance',
    phone: '083-456-7890',
    joinDate: '2021-02-10',
    lastLogin: '2024-01-15 15:20',
    permissions: { sales: true, production: false, inventory: false, purchasing: true, accounting: true, reports: true, settings: false },
    companyAccess: ['1', '3']
  },
  {
    id: '4',
    name: 'Prasert Chaiyong',
    email: 'prasert.c@company.com',
    role: 'production_manager',
    status: 'active',
    department: 'Production',
    phone: '084-567-8901',
    joinDate: '2019-06-15',
    lastLogin: '2024-01-15 12:10',
    permissions: { sales: false, production: true, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['1']
  },
  {
    id: '5',
    name: 'Wichai Somboon',
    email: 'wichai.s@company.com',
    role: 'warehouse_staff',
    status: 'active',
    department: 'Warehouse',
    phone: '085-678-9012',
    joinDate: '2021-08-01',
    lastLogin: '2024-01-15 11:30',
    permissions: { sales: false, production: false, inventory: true, purchasing: false, accounting: false, reports: false, settings: false },
    companyAccess: ['1', '2']
  },
  {
    id: '6',
    name: 'Apinya Suwan',
    email: 'apinya.s@company.com',
    role: 'sales',
    status: 'active',
    department: 'Sales',
    phone: '086-789-0123',
    joinDate: '2020-11-12',
    lastLogin: '2024-01-15 14:00',
    permissions: { sales: true, production: false, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['2', '3']
  },
  {
    id: '7',
    name: 'Thana Pongpat',
    email: 'thana.p@company.com',
    role: 'production_manager',
    status: 'active',
    department: 'Production',
    phone: '087-890-1234',
    joinDate: '2020-05-20',
    lastLogin: '2024-01-15 10:45',
    permissions: { sales: false, production: true, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '4']
  },
  {
    id: '8',
    name: 'Kannika Rattana',
    email: 'kannika.r@company.com',
    role: 'accountant',
    status: 'active',
    department: 'Finance',
    phone: '088-901-2345',
    joinDate: '2021-09-15',
    lastLogin: '2024-01-15 13:20',
    permissions: { sales: true, production: false, inventory: false, purchasing: true, accounting: true, reports: true, settings: false },
    companyAccess: ['3', '4']
  },
  {
    id: '9',
    name: 'Surasak Maneerat',
    email: 'surasak.m@company.com',
    role: 'warehouse_staff',
    status: 'active',
    department: 'Warehouse',
    phone: '089-012-3456',
    joinDate: '2022-01-10',
    lastLogin: '2024-01-15 09:15',
    permissions: { sales: false, production: false, inventory: true, purchasing: false, accounting: false, reports: false, settings: false },
    companyAccess: ['2']
  },
  {
    id: '10',
    name: 'Pimchanok Saetang',
    email: 'pimchanok.s@company.com',
    role: 'sales',
    status: 'active',
    department: 'Sales',
    phone: '090-123-4567',
    joinDate: '2021-04-22',
    lastLogin: '2024-01-15 14:50',
    permissions: { sales: true, production: false, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '2', '3']
  },
  {
    id: '11',
    name: 'Anan Boonmee',
    email: 'anan.b@company.com',
    role: 'manager',
    status: 'active',
    department: 'Sales',
    phone: '091-234-5678',
    joinDate: '2019-12-01',
    lastLogin: '2024-01-15 15:10',
    permissions: { sales: true, production: false, inventory: true, purchasing: true, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '2', '4']
  },
  {
    id: '12',
    name: 'Rattana Khampha',
    email: 'rattana.k@company.com',
    role: 'viewer',
    status: 'active',
    department: 'Management',
    phone: '092-345-6789',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15 11:00',
    permissions: { sales: true, production: true, inventory: true, purchasing: true, accounting: true, reports: true, settings: false },
    companyAccess: ['1', '2', '3', '4']
  },
  {
    id: '13',
    name: 'Chaiyaporn Srisuk',
    email: 'chaiyaporn.s@company.com',
    role: 'warehouse_staff',
    status: 'active',
    department: 'Warehouse',
    phone: '093-456-7890',
    joinDate: '2022-06-10',
    lastLogin: '2024-01-15 08:30',
    permissions: { sales: false, production: false, inventory: true, purchasing: false, accounting: false, reports: false, settings: false },
    companyAccess: ['3']
  },
  {
    id: '14',
    name: 'Narumon Chaiyo',
    email: 'narumon.c@company.com',
    role: 'sales',
    status: 'inactive',
    department: 'Sales',
    phone: '094-567-8901',
    joinDate: '2021-07-18',
    lastLogin: '2024-01-10 16:20',
    permissions: { sales: true, production: false, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['2', '4']
  },
  {
    id: '15',
    name: 'Boonlert Saengchai',
    email: 'boonlert.s@company.com',
    role: 'production_manager',
    status: 'active',
    department: 'Production',
    phone: '095-678-9012',
    joinDate: '2020-09-05',
    lastLogin: '2024-01-15 12:40',
    permissions: { sales: false, production: true, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '3']
  },
  {
    id: '16',
    name: 'Supaporn Wongwan',
    email: 'supaporn.w@company.com',
    role: 'accountant',
    status: 'active',
    department: 'Finance',
    phone: '096-789-0123',
    joinDate: '2022-03-12',
    lastLogin: '2024-01-15 14:15',
    permissions: { sales: true, production: false, inventory: false, purchasing: true, accounting: true, reports: true, settings: false },
    companyAccess: ['2', '3']
  },
  {
    id: '17',
    name: 'Kittipong Saelim',
    email: 'kittipong.s@company.com',
    role: 'warehouse_staff',
    status: 'active',
    department: 'Warehouse',
    phone: '097-890-1234',
    joinDate: '2023-05-20',
    lastLogin: '2024-01-15 10:00',
    permissions: { sales: false, production: false, inventory: true, purchasing: false, accounting: false, reports: false, settings: false },
    companyAccess: ['4']
  },
  {
    id: '18',
    name: 'Waranya Phongam',
    email: 'waranya.p@company.com',
    role: 'sales',
    status: 'active',
    department: 'Sales',
    phone: '098-901-2345',
    joinDate: '2022-11-08',
    lastLogin: '2024-01-15 13:50',
    permissions: { sales: true, production: false, inventory: true, purchasing: false, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '3', '4']
  },
  {
    id: '19',
    name: 'Manop Thongdee',
    email: 'manop.t@company.com',
    role: 'manager',
    status: 'suspended',
    department: 'Production',
    phone: '099-012-3456',
    joinDate: '2021-10-15',
    lastLogin: '2024-01-05 09:30',
    permissions: { sales: false, production: true, inventory: true, purchasing: true, accounting: false, reports: true, settings: false },
    companyAccess: ['2', '3']
  },
  {
    id: '20',
    name: 'Siriporn Kaewmala',
    email: 'siriporn.k@company.com',
    role: 'viewer',
    status: 'active',
    department: 'HR',
    phone: '080-123-4567',
    joinDate: '2023-02-28',
    lastLogin: '2024-01-15 11:45',
    permissions: { sales: true, production: true, inventory: true, purchasing: true, accounting: false, reports: true, settings: false },
    companyAccess: ['1', '2']
  }
]

export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  accountant: 'Accountant',
  production_manager: 'Production Manager',
  warehouse_staff: 'Warehouse Staff',
  sales: 'Sales',
  viewer: 'Viewer'
}

export const statusLabels: Record<UserStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  suspended: 'Suspended'
}
