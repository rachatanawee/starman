export interface Shift {
  id: string
  code: string
  name: string
  startTime: string
  endTime: string
  breakMinutes: number
  isOvertime: boolean
}

export interface WorkCenterCapacity {
  id: string
  workCenterId: string
  workCenterName: string
  date: string
  shiftId: string
  standardHours: number
  adjustedHours: number
  totalAvailableHours: number
  loadedHours: number
  loadPercentage: number
  status: 'normal' | 'overload' | 'underload'
}

export interface MachineDowntime {
  id: string
  workCenterId: string
  workCenterName: string
  startTime: string
  endTime: string
  downtimeType: 'breakdown' | 'preventive_maintenance' | 'setup'
  reason: string
  impactHours: number
  status: 'scheduled' | 'active' | 'completed'
}

export interface AICapacityAlert {
  id: string
  type: 'ot_suggestion' | 'smart_maintenance' | 'bottleneck_detection'
  severity: 'info' | 'warning' | 'critical'
  title: string
  message: string
  workCenterId: string
  workCenterName: string
  date: string
  suggestedAction: string
  impactHours?: number
}

export const mockShifts: Shift[] = [
  {
    id: 'shift-1',
    code: 'SHIFT-DAY',
    name: 'Day Shift',
    startTime: '08:00',
    endTime: '17:00',
    breakMinutes: 60,
    isOvertime: false
  },
  {
    id: 'shift-2',
    code: 'SHIFT-NIGHT',
    name: 'Night Shift',
    startTime: '20:00',
    endTime: '05:00',
    breakMinutes: 60,
    isOvertime: false
  },
  {
    id: 'shift-3',
    code: 'SHIFT-OT',
    name: 'Overtime',
    startTime: '17:00',
    endTime: '20:00',
    breakMinutes: 0,
    isOvertime: true
  }
]

export const mockWorkCenterCapacity: WorkCenterCapacity[] = [
  {
    id: 'cap-1',
    workCenterId: 'wc-001',
    workCenterName: 'Cutting Machine',
    date: '2026-02-10',
    shiftId: 'shift-1',
    standardHours: 24, // 8 hrs x 3 machines
    adjustedHours: 0,
    totalAvailableHours: 24,
    loadedHours: 28.5,
    loadPercentage: 119,
    status: 'overload'
  },
  {
    id: 'cap-2',
    workCenterId: 'wc-002',
    workCenterName: 'Welding Station',
    date: '2026-02-10',
    shiftId: 'shift-1',
    standardHours: 16,
    adjustedHours: 0,
    totalAvailableHours: 16,
    loadedHours: 14.2,
    loadPercentage: 89,
    status: 'normal'
  },
  {
    id: 'cap-3',
    workCenterId: 'wc-003',
    workCenterName: 'Bending Machine',
    date: '2026-02-10',
    shiftId: 'shift-1',
    standardHours: 16,
    adjustedHours: 0,
    totalAvailableHours: 16,
    loadedHours: 4.8,
    loadPercentage: 30,
    status: 'underload'
  },
  {
    id: 'cap-4',
    workCenterId: 'wc-004',
    workCenterName: 'Painting Booth',
    date: '2026-02-10',
    shiftId: 'shift-1',
    standardHours: 8,
    adjustedHours: 0,
    totalAvailableHours: 8,
    loadedHours: 7.6,
    loadPercentage: 95,
    status: 'normal'
  },
  {
    id: 'cap-5',
    workCenterId: 'wc-001',
    workCenterName: 'Cutting Machine',
    date: '2026-02-11',
    shiftId: 'shift-1',
    standardHours: 24,
    adjustedHours: 0,
    totalAvailableHours: 24,
    loadedHours: 22.4,
    loadPercentage: 93,
    status: 'normal'
  },
  {
    id: 'cap-6',
    workCenterId: 'wc-004',
    workCenterName: 'Painting Booth',
    date: '2026-02-11',
    shiftId: 'shift-1',
    standardHours: 8,
    adjustedHours: 0,
    totalAvailableHours: 8,
    loadedHours: 7.8,
    loadPercentage: 98,
    status: 'normal'
  }
]

export const mockMachineDowntime: MachineDowntime[] = [
  {
    id: 'dt-1',
    workCenterId: 'wc-001',
    workCenterName: 'Cutting Machine',
    startTime: '2026-02-12T14:00:00',
    endTime: '2026-02-12T16:00:00',
    downtimeType: 'preventive_maintenance',
    reason: 'Scheduled blade replacement and calibration',
    impactHours: 2,
    status: 'scheduled'
  },
  {
    id: 'dt-2',
    workCenterId: 'wc-002',
    workCenterName: 'Welding Station',
    startTime: '2026-02-10T10:30:00',
    endTime: '2026-02-10T12:00:00',
    downtimeType: 'breakdown',
    reason: 'Power supply failure',
    impactHours: 1.5,
    status: 'completed'
  },
  {
    id: 'dt-3',
    workCenterId: 'wc-003',
    workCenterName: 'Bending Machine',
    startTime: '2026-02-13T13:00:00',
    endTime: '2026-02-13T15:00:00',
    downtimeType: 'preventive_maintenance',
    reason: 'Quarterly inspection',
    impactHours: 2,
    status: 'scheduled'
  }
]

export const mockAICapacityAlerts: AICapacityAlert[] = [
  {
    id: 'alert-1',
    type: 'ot_suggestion',
    severity: 'critical',
    title: 'Overload Detected - OT Required',
    message: 'Cutting Machine has 119% load on Feb 10. Overload by 4.5 hours. Recommend opening OT shift 17:00-20:00 to clear backlog.',
    workCenterId: 'wc-001',
    workCenterName: 'Cutting Machine',
    date: '2026-02-10',
    suggestedAction: 'Approve OT Shift (3 hours)',
    impactHours: 4.5
  },
  {
    id: 'alert-2',
    type: 'smart_maintenance',
    severity: 'info',
    title: 'Optimal Maintenance Window',
    message: 'Bending Machine has only 30% load on Feb 10 afternoon. Perfect time for preventive maintenance without impacting production schedule.',
    workCenterId: 'wc-003',
    workCenterName: 'Bending Machine',
    date: '2026-02-10',
    suggestedAction: 'Schedule maintenance at 14:00-16:00'
  },
  {
    id: 'alert-3',
    type: 'bottleneck_detection',
    severity: 'warning',
    title: 'Bottleneck Alert - Painting Booth',
    message: 'Painting Booth will be bottleneck next week with average 95% load. Consider sub-contracting or adding extra shift to prevent delays.',
    workCenterId: 'wc-004',
    workCenterName: 'Painting Booth',
    date: '2026-02-11',
    suggestedAction: 'Add night shift or find sub-contractor'
  }
]
