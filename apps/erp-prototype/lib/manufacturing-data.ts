// Manufacturing Execution Mock Data - Steel Service Center

export interface JobTicket {
  id: string
  ticketNumber: string
  productionOrderId: string
  productionOrderNumber: string
  operationId: string
  operationName: string
  productName: string
  workCenterId: string
  workCenterName: string
  operatorId?: string
  operatorName?: string
  targetQty: number
  actualGoodQty: number
  actualScrapQty: number
  unit: string
  totalSetupTimeMin: number
  totalRunTimeMin: number
  totalDowntimeMin: number
  standardTimeMin: number
  status: 'pending' | 'in_progress' | 'paused' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  startedAt?: string
  completedAt?: string
}

export interface WorkCenter {
  id: string
  name: string
  code: string
  status: 'running' | 'idle' | 'down' | 'setup'
  currentJobTicket?: string
  efficiency: number // %
  position: { x: number; y: number }
}

export interface WorkLog {
  id: string
  jobTicketId: string
  logType: 'setup' | 'production' | 'downtime'
  startTime: string
  endTime?: string
  durationMinutes?: number
  downtimeReasonCode?: string
  downtimeRemark?: string
}

export interface OutputLog {
  id: string
  jobTicketId: string
  logTime: string
  quantity: number
  type: 'good' | 'scrap'
  defectCode?: string
  defectReason?: string
}

export interface DefectCode {
  code: string
  name: string
  category: string
}

export interface DowntimeReason {
  code: string
  name: string
  category: string
}

// Mock Data
export const mockJobTickets: JobTicket[] = [
  {
    id: 'jt-001',
    ticketNumber: 'JOB-2026-001',
    productionOrderId: 'po-001',
    productionOrderNumber: 'PO-85',
    operationId: 'op-001',
    operationName: 'Slitting',
    productName: 'C-Channel 100x50x2mm',
    workCenterId: 'wc-001',
    workCenterName: 'Slitting Line 1',
    operatorId: 'user-001',
    operatorName: 'John Smith',
    targetQty: 500,
    actualGoodQty: 320,
    actualScrapQty: 5,
    unit: 'pcs',
    totalSetupTimeMin: 45,
    totalRunTimeMin: 180,
    totalDowntimeMin: 15,
    standardTimeMin: 240,
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-02-15',
    startedAt: '2026-02-14T08:00:00'
  },
  {
    id: 'jt-002',
    ticketNumber: 'JOB-2026-002',
    productionOrderId: 'po-002',
    productionOrderNumber: 'PO-86',
    operationId: 'op-002',
    operationName: 'Shearing',
    productName: 'Electrical Panel Door',
    workCenterId: 'wc-002',
    workCenterName: 'Shearing Machine 1',
    operatorId: 'user-002',
    operatorName: 'Mike Johnson',
    targetQty: 200,
    actualGoodQty: 200,
    actualScrapQty: 3,
    unit: 'pcs',
    totalSetupTimeMin: 30,
    totalRunTimeMin: 120,
    totalDowntimeMin: 0,
    standardTimeMin: 150,
    status: 'completed',
    priority: 'medium',
    dueDate: '2026-02-16',
    startedAt: '2026-02-14T06:00:00',
    completedAt: '2026-02-14T08:30:00'
  },
  {
    id: 'jt-003',
    ticketNumber: 'JOB-2026-003',
    productionOrderId: 'po-003',
    productionOrderNumber: 'PO-87',
    operationId: 'op-003',
    operationName: 'Press Brake',
    productName: 'Mounting Bracket',
    workCenterId: 'wc-003',
    workCenterName: 'Press Brake 1',
    targetQty: 300,
    actualGoodQty: 0,
    actualScrapQty: 0,
    unit: 'pcs',
    totalSetupTimeMin: 0,
    totalRunTimeMin: 0,
    totalDowntimeMin: 0,
    standardTimeMin: 180,
    status: 'pending',
    priority: 'urgent',
    dueDate: '2026-02-15'
  },
  {
    id: 'jt-004',
    ticketNumber: 'JOB-2026-004',
    productionOrderId: 'po-004',
    productionOrderNumber: 'PO-88',
    operationId: 'op-004',
    operationName: 'Welding',
    productName: 'Steel Frame Assembly',
    workCenterId: 'wc-004',
    workCenterName: 'Welding Station 1',
    targetQty: 50,
    actualGoodQty: 0,
    actualScrapQty: 0,
    unit: 'pcs',
    totalSetupTimeMin: 0,
    totalRunTimeMin: 0,
    totalDowntimeMin: 0,
    standardTimeMin: 300,
    status: 'pending',
    priority: 'low',
    dueDate: '2026-02-18'
  }
]

export const mockWorkCenters: WorkCenter[] = [
  {
    id: 'wc-001',
    name: 'Slitting Line 1',
    code: 'SLT-01',
    status: 'running',
    currentJobTicket: 'jt-001',
    efficiency: 85,
    position: { x: 20, y: 25 }
  },
  {
    id: 'wc-002',
    name: 'Shearing Machine 1',
    code: 'SHR-01',
    status: 'idle',
    efficiency: 92,
    position: { x: 50, y: 25 }
  },
  {
    id: 'wc-003',
    name: 'Press Brake 1',
    code: 'PRS-01',
    status: 'setup',
    efficiency: 78,
    position: { x: 80, y: 25 }
  },
  {
    id: 'wc-004',
    name: 'Welding Station 1',
    code: 'WLD-01',
    status: 'down',
    efficiency: 65,
    position: { x: 20, y: 60 }
  },
  {
    id: 'wc-005',
    name: 'Quality Check',
    code: 'QC-01',
    status: 'running',
    efficiency: 95,
    position: { x: 50, y: 60 }
  }
]

export const mockDefectCodes: DefectCode[] = [
  { code: 'DF-001', name: 'Scratches', category: 'Surface' },
  { code: 'DF-002', name: 'Dimension Out of Spec', category: 'Dimension' },
  { code: 'DF-003', name: 'Burr/Sharp Edge', category: 'Surface' },
  { code: 'DF-004', name: 'Warping/Bending', category: 'Shape' },
  { code: 'DF-005', name: 'Incomplete Cut', category: 'Process' },
  { code: 'DF-006', name: 'Material Defect', category: 'Material' }
]

export const mockDowntimeReasons: DowntimeReason[] = [
  { code: 'DT-001', name: 'Machine Breakdown', category: 'Equipment' },
  { code: 'DT-002', name: 'Waiting for Material', category: 'Material' },
  { code: 'DT-003', name: 'Tool Change', category: 'Setup' },
  { code: 'DT-004', name: 'Quality Issue', category: 'Quality' },
  { code: 'DT-005', name: 'Power Outage', category: 'Facility' },
  { code: 'DT-006', name: 'Operator Break', category: 'Planned' }
]

export const mockOEEData = {
  availability: 85.5, // % (Actual Run Time / Planned Production Time)
  performance: 92.3, // % (Actual Output / Standard Output)
  quality: 97.8, // % (Good Qty / Total Qty)
  oee: 77.2 // % (Availability × Performance × Quality)
}
