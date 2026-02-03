export interface DailyAllowanceSummary {
  id: string
  date: string
  userId: string
  workerName: string
  shiftName: string
  clockIn: string
  clockOut: string
  totalWorkHours: number
  otHours: number
  totalGoodQty: number
  totalScrapQty: number
  totalAmount: number
  status: 'pending' | 'approved' | 'paid'
}

export interface AllowanceTransaction {
  id: string
  summaryId: string
  allowanceType: string
  category: 'income' | 'deduction'
  quantity: number
  rate: number
  amount: number
  description: string
}

export interface AICoachingAlert {
  id: string
  type: 'gamification' | 'fraud_detection' | 'performance_insight'
  severity: 'info' | 'warning' | 'critical'
  title: string
  message: string
  workerId: string
  workerName: string
  suggestedAction?: string
}

export const mockDailyAllowanceSummary: DailyAllowanceSummary[] = [
  {
    id: 'sum-1',
    date: '2026-02-10',
    userId: 'worker-001',
    workerName: 'Somchai Jaidee',
    shiftName: 'Day Shift',
    clockIn: '08:00',
    clockOut: '20:00',
    totalWorkHours: 11,
    otHours: 3,
    totalGoodQty: 450,
    totalScrapQty: 5,
    totalAmount: 1250,
    status: 'approved'
  },
  {
    id: 'sum-2',
    date: '2026-02-10',
    userId: 'worker-002',
    workerName: 'Niran Sukjai',
    shiftName: 'Day Shift',
    clockIn: '08:00',
    clockOut: '17:00',
    totalWorkHours: 8,
    otHours: 0,
    totalGoodQty: 320,
    totalScrapQty: 2,
    totalAmount: 820,
    status: 'approved'
  },
  {
    id: 'sum-3',
    date: '2026-02-10',
    userId: 'worker-003',
    workerName: 'Prasert Kaewmala',
    shiftName: 'Night Shift',
    clockIn: '20:00',
    clockOut: '05:00',
    totalWorkHours: 8,
    otHours: 0,
    totalGoodQty: 280,
    totalScrapQty: 8,
    totalAmount: 750,
    status: 'pending'
  },
  {
    id: 'sum-4',
    date: '2026-02-10',
    userId: 'worker-004',
    workerName: 'Wichai Thongdee',
    shiftName: 'Day Shift',
    clockIn: '08:00',
    clockOut: '17:00',
    totalWorkHours: 8,
    otHours: 0,
    totalGoodQty: 495,
    totalScrapQty: 1,
    totalAmount: 1150,
    status: 'approved'
  },
  {
    id: 'sum-5',
    date: '2026-02-11',
    userId: 'worker-001',
    workerName: 'Somchai Jaidee',
    shiftName: 'Day Shift',
    clockIn: '08:00',
    clockOut: '17:00',
    totalWorkHours: 8,
    otHours: 0,
    totalGoodQty: 380,
    totalScrapQty: 3,
    totalAmount: 920,
    status: 'pending'
  }
]

export const mockAllowanceTransactions: AllowanceTransaction[] = [
  {
    id: 'txn-1',
    summaryId: 'sum-1',
    allowanceType: 'Base Wage',
    category: 'income',
    quantity: 8,
    rate: 75,
    amount: 600,
    description: 'Daily base wage (8 hours)'
  },
  {
    id: 'txn-2',
    summaryId: 'sum-1',
    allowanceType: 'OT 1.5x',
    category: 'income',
    quantity: 3,
    rate: 112.5,
    amount: 337.5,
    description: 'Overtime 3 hours at 1.5x rate'
  },
  {
    id: 'txn-3',
    summaryId: 'sum-1',
    allowanceType: 'Piece Rate',
    category: 'income',
    quantity: 450,
    rate: 0.6,
    amount: 270,
    description: 'Production incentive (450 pieces)'
  },
  {
    id: 'txn-4',
    summaryId: 'sum-1',
    allowanceType: 'Diligent Bonus',
    category: 'income',
    quantity: 1,
    rate: 50,
    amount: 50,
    description: 'Perfect attendance bonus'
  },
  {
    id: 'txn-5',
    summaryId: 'sum-1',
    allowanceType: 'Scrap Penalty',
    category: 'deduction',
    quantity: 5,
    rate: 1.5,
    amount: -7.5,
    description: 'Defect penalty (5 pieces)'
  },
  {
    id: 'txn-6',
    summaryId: 'sum-4',
    allowanceType: 'Base Wage',
    category: 'income',
    quantity: 8,
    rate: 75,
    amount: 600,
    description: 'Daily base wage (8 hours)'
  },
  {
    id: 'txn-7',
    summaryId: 'sum-4',
    allowanceType: 'Piece Rate',
    category: 'income',
    quantity: 495,
    rate: 0.6,
    amount: 297,
    description: 'Production incentive (495 pieces)'
  },
  {
    id: 'txn-8',
    summaryId: 'sum-4',
    allowanceType: 'High Performance Bonus',
    category: 'income',
    quantity: 1,
    rate: 250,
    amount: 250,
    description: 'Tier 2 bonus for exceeding 500 pieces target'
  }
]

export const mockAICoachingAlerts: AICoachingAlert[] = [
  {
    id: 'coach-1',
    type: 'gamification',
    severity: 'info',
    title: 'Almost There! 🎯',
    message: 'Somchai has produced 380 pieces today. Just 20 more pieces to unlock Tier 2 Bonus (+฿250)! Time remaining: 1.5 hours.',
    workerId: 'worker-001',
    workerName: 'Somchai Jaidee',
    suggestedAction: 'Send motivation notification to worker kiosk'
  },
  {
    id: 'coach-2',
    type: 'fraud_detection',
    severity: 'critical',
    title: 'Suspicious Activity Detected',
    message: 'Prasert reported 280 pieces with 8 scrap items (2.86% defect rate). This is 3x higher than his average. Possible data entry error or quality issue.',
    workerId: 'worker-003',
    workerName: 'Prasert Kaewmala',
    suggestedAction: 'Supervisor review required before approval'
  },
  {
    id: 'coach-3',
    type: 'performance_insight',
    severity: 'info',
    title: 'Top Performer Alert 🏆',
    message: 'Wichai achieved 495 pieces with only 1 scrap (0.2% defect rate) - Best performance this week! Consider for Employee of the Month.',
    workerId: 'worker-004',
    workerName: 'Wichai Thongdee',
    suggestedAction: 'Send recognition certificate'
  }
]
