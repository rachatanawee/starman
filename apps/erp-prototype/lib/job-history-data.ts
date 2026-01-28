export interface JobHistoryRecord {
  id: string
  productionOrderNo: string
  productName: string
  productSku: string
  customer: string
  salesOrderNo: string
  startDate: string
  completionDate: string
  durationDays: number
  targetQty: number
  completedQty: number
  scrapQty: number
  yieldRate: number
  // Cost breakdown
  actualDMCost: number
  actualDLCost: number
  actualOHCost: number
  totalActualCost: number
  standardCost: number
  costVariance: number
  variancePercent: number
  unitActualCost: number
  unitStandardCost: number
  // Performance metrics
  onTimeDelivery: boolean
  qualityScore: number // 0-100
  efficiency: number // 0-100
  // Operator & Machine
  primaryOperator: string
  workCenter: string
  machineHours: number
  laborHours: number
}

export interface JobHistoryStats {
  totalJobs: number
  totalRevenue: number
  avgYieldRate: number
  onTimeRate: number
  avgEfficiency: number
  totalScrap: number
}

export const mockJobHistory: JobHistoryRecord[] = [
  {
    id: 'jh-001',
    productionOrderNo: 'PO-2024-001',
    productName: 'Steel Beam 200x100mm',
    productSku: 'STL-BEAM-200',
    customer: 'Bangkok Construction Co.',
    salesOrderNo: 'SO-2024-045',
    startDate: '2024-01-02',
    completionDate: '2024-01-08',
    durationDays: 6,
    targetQty: 100,
    completedQty: 98,
    scrapQty: 2,
    yieldRate: 98,
    actualDMCost: 49000,
    actualDLCost: 3600,
    actualOHCost: 2400,
    totalActualCost: 55000,
    standardCost: 50000,
    costVariance: 5000,
    variancePercent: 10,
    unitActualCost: 561.22,
    unitStandardCost: 500,
    onTimeDelivery: true,
    qualityScore: 95,
    efficiency: 92,
    primaryOperator: 'Somchai P.',
    workCenter: 'Cutting Machine #1',
    machineHours: 12,
    laborHours: 12
  },
  {
    id: 'jh-002',
    productionOrderNo: 'PO-2024-002',
    productName: 'Channel Steel 150x75mm',
    productSku: 'STL-CHAN-150',
    customer: 'Siam Steel Trading',
    salesOrderNo: 'SO-2024-048',
    startDate: '2024-01-05',
    completionDate: '2024-01-12',
    durationDays: 7,
    targetQty: 200,
    completedQty: 195,
    scrapQty: 5,
    yieldRate: 97.5,
    actualDMCost: 117000,
    actualDLCost: 7200,
    actualOHCost: 4800,
    totalActualCost: 129000,
    standardCost: 120000,
    costVariance: 9000,
    variancePercent: 7.5,
    unitActualCost: 661.54,
    unitStandardCost: 600,
    onTimeDelivery: true,
    qualityScore: 92,
    efficiency: 88,
    primaryOperator: 'Niran K.',
    workCenter: 'Bending Machine #2',
    machineHours: 24,
    laborHours: 24
  },
  {
    id: 'jh-003',
    productionOrderNo: 'PO-2023-089',
    productName: 'Angle Bar 100x100mm',
    productSku: 'STL-ANGL-100',
    customer: 'Metro Engineering Ltd.',
    salesOrderNo: 'SO-2023-312',
    startDate: '2023-12-20',
    completionDate: '2023-12-28',
    durationDays: 8,
    targetQty: 150,
    completedQty: 150,
    scrapQty: 0,
    yieldRate: 100,
    actualDMCost: 67500,
    actualDLCost: 4500,
    actualOHCost: 3000,
    totalActualCost: 75000,
    standardCost: 75000,
    costVariance: 0,
    variancePercent: 0,
    unitActualCost: 500,
    unitStandardCost: 500,
    onTimeDelivery: true,
    qualityScore: 100,
    efficiency: 100,
    primaryOperator: 'Prasert W.',
    workCenter: 'Cutting Machine #1',
    machineHours: 15,
    laborHours: 15
  },
  {
    id: 'jh-004',
    productionOrderNo: 'PO-2023-088',
    productName: 'Square Tube 50x50mm',
    productSku: 'STL-TUBE-50',
    customer: 'Thai Furniture Factory',
    salesOrderNo: 'SO-2023-305',
    startDate: '2023-12-15',
    completionDate: '2023-12-27',
    durationDays: 12,
    targetQty: 300,
    completedQty: 285,
    scrapQty: 15,
    yieldRate: 95,
    actualDMCost: 85500,
    actualDLCost: 10800,
    actualOHCost: 7200,
    totalActualCost: 103500,
    standardCost: 90000,
    costVariance: 13500,
    variancePercent: 15,
    unitActualCost: 363.16,
    unitStandardCost: 300,
    onTimeDelivery: false,
    qualityScore: 85,
    efficiency: 75,
    primaryOperator: 'Wichai S.',
    workCenter: 'Welding Station #3',
    machineHours: 36,
    laborHours: 36
  },
  {
    id: 'jh-005',
    productionOrderNo: 'PO-2023-087',
    productName: 'H-Beam 300x150mm',
    productSku: 'STL-HBEAM-300',
    customer: 'Skyline Developers',
    salesOrderNo: 'SO-2023-298',
    startDate: '2023-12-10',
    completionDate: '2023-12-18',
    durationDays: 8,
    targetQty: 50,
    completedQty: 50,
    scrapQty: 0,
    yieldRate: 100,
    actualDMCost: 75000,
    actualDLCost: 6000,
    actualOHCost: 4000,
    totalActualCost: 85000,
    standardCost: 82500,
    costVariance: 2500,
    variancePercent: 3,
    unitActualCost: 1700,
    unitStandardCost: 1650,
    onTimeDelivery: true,
    qualityScore: 98,
    efficiency: 95,
    primaryOperator: 'Somchai P.',
    workCenter: 'Cutting Machine #1',
    machineHours: 20,
    laborHours: 20
  },
  {
    id: 'jh-006',
    productionOrderNo: 'PO-2023-086',
    productName: 'Flat Bar 100x10mm',
    productSku: 'STL-FLAT-100',
    customer: 'Industrial Parts Supply',
    salesOrderNo: 'SO-2023-289',
    startDate: '2023-12-05',
    completionDate: '2023-12-10',
    durationDays: 5,
    targetQty: 400,
    completedQty: 398,
    scrapQty: 2,
    yieldRate: 99.5,
    actualDMCost: 79600,
    actualDLCost: 3000,
    actualOHCost: 2000,
    totalActualCost: 84600,
    standardCost: 80000,
    costVariance: 4600,
    variancePercent: 5.75,
    unitActualCost: 212.56,
    unitStandardCost: 200,
    onTimeDelivery: true,
    qualityScore: 96,
    efficiency: 94,
    primaryOperator: 'Niran K.',
    workCenter: 'Cutting Machine #2',
    machineHours: 10,
    laborHours: 10
  },
  {
    id: 'jh-007',
    productionOrderNo: 'PO-2023-085',
    productName: 'Round Bar Ø25mm',
    productSku: 'STL-ROUND-25',
    customer: 'Precision Machining Co.',
    salesOrderNo: 'SO-2023-275',
    startDate: '2023-11-28',
    completionDate: '2023-12-05',
    durationDays: 7,
    targetQty: 500,
    completedQty: 490,
    scrapQty: 10,
    yieldRate: 98,
    actualDMCost: 98000,
    actualDLCost: 4200,
    actualOHCost: 2800,
    totalActualCost: 105000,
    standardCost: 100000,
    costVariance: 5000,
    variancePercent: 5,
    unitActualCost: 214.29,
    unitStandardCost: 200,
    onTimeDelivery: true,
    qualityScore: 94,
    efficiency: 90,
    primaryOperator: 'Prasert W.',
    workCenter: 'Cutting Machine #1',
    machineHours: 14,
    laborHours: 14
  },
  {
    id: 'jh-008',
    productionOrderNo: 'PO-2023-084',
    productName: 'C-Channel 200x80mm',
    productSku: 'STL-CCHAN-200',
    customer: 'Roof Systems Thailand',
    salesOrderNo: 'SO-2023-268',
    startDate: '2023-11-22',
    completionDate: '2023-12-02',
    durationDays: 10,
    targetQty: 120,
    completedQty: 115,
    scrapQty: 5,
    yieldRate: 95.8,
    actualDMCost: 92000,
    actualDLCost: 7200,
    actualOHCost: 4800,
    totalActualCost: 104000,
    standardCost: 96000,
    costVariance: 8000,
    variancePercent: 8.3,
    unitActualCost: 904.35,
    unitStandardCost: 800,
    onTimeDelivery: false,
    qualityScore: 88,
    efficiency: 82,
    primaryOperator: 'Wichai S.',
    workCenter: 'Bending Machine #2',
    machineHours: 24,
    laborHours: 24
  },
  {
    id: 'jh-009',
    productionOrderNo: 'PO-2023-083',
    productName: 'Steel Plate 10mm',
    productSku: 'STL-PLATE-10',
    customer: 'Marine Equipment Ltd.',
    salesOrderNo: 'SO-2023-255',
    startDate: '2023-11-15',
    completionDate: '2023-11-20',
    durationDays: 5,
    targetQty: 80,
    completedQty: 80,
    scrapQty: 0,
    yieldRate: 100,
    actualDMCost: 120000,
    actualDLCost: 4800,
    actualOHCost: 3200,
    totalActualCost: 128000,
    standardCost: 128000,
    costVariance: 0,
    variancePercent: 0,
    unitActualCost: 1600,
    unitStandardCost: 1600,
    onTimeDelivery: true,
    qualityScore: 100,
    efficiency: 100,
    primaryOperator: 'Somchai P.',
    workCenter: 'Cutting Machine #1',
    machineHours: 16,
    laborHours: 16
  },
  {
    id: 'jh-010',
    productionOrderNo: 'PO-2023-082',
    productName: 'L-Angle 75x75mm',
    productSku: 'STL-LANGL-75',
    customer: 'Building Materials Depot',
    salesOrderNo: 'SO-2023-248',
    startDate: '2023-11-10',
    completionDate: '2023-11-18',
    durationDays: 8,
    targetQty: 250,
    completedQty: 242,
    scrapQty: 8,
    yieldRate: 96.8,
    actualDMCost: 72600,
    actualDLCost: 6000,
    actualOHCost: 4000,
    totalActualCost: 82600,
    standardCost: 75000,
    costVariance: 7600,
    variancePercent: 10.1,
    unitActualCost: 341.32,
    unitStandardCost: 300,
    onTimeDelivery: true,
    qualityScore: 91,
    efficiency: 87,
    primaryOperator: 'Niran K.',
    workCenter: 'Cutting Machine #2',
    machineHours: 20,
    laborHours: 20
  }
]

export const calculateJobHistoryStats = (jobs: JobHistoryRecord[]): JobHistoryStats => {
  return {
    totalJobs: jobs.length,
    totalRevenue: jobs.reduce((sum, j) => sum + j.totalActualCost, 0),
    avgYieldRate: jobs.reduce((sum, j) => sum + j.yieldRate, 0) / jobs.length,
    onTimeRate: (jobs.filter(j => j.onTimeDelivery).length / jobs.length) * 100,
    avgEfficiency: jobs.reduce((sum, j) => sum + j.efficiency, 0) / jobs.length,
    totalScrap: jobs.reduce((sum, j) => sum + j.scrapQty, 0)
  }
}

export const getTopPerformers = (jobs: JobHistoryRecord[]) => {
  const operatorStats = jobs.reduce((acc, job) => {
    if (!acc[job.primaryOperator]) {
      acc[job.primaryOperator] = {
        operator: job.primaryOperator,
        jobsCompleted: 0,
        avgEfficiency: 0,
        avgQuality: 0,
        totalJobs: []
      }
    }
    acc[job.primaryOperator].jobsCompleted++
    acc[job.primaryOperator].totalJobs.push(job)
    return acc
  }, {} as Record<string, any>)

  return Object.values(operatorStats).map((stat: any) => ({
    operator: stat.operator,
    jobsCompleted: stat.jobsCompleted,
    avgEfficiency: stat.totalJobs.reduce((sum: number, j: JobHistoryRecord) => sum + j.efficiency, 0) / stat.jobsCompleted,
    avgQuality: stat.totalJobs.reduce((sum: number, j: JobHistoryRecord) => sum + j.qualityScore, 0) / stat.jobsCompleted
  })).sort((a, b) => b.avgEfficiency - a.avgEfficiency)
}
