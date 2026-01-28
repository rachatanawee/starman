/**
 * Warehouse Management System Mock Data
 * Project ID: 2
 * Team: 2 SA + 3 PG = 5 members
 * Duration: 200 mandays (40 days with 5 people)
 */

import type { MockTask, MockRequirement, MockEpic, MockAcceptanceCriterion } from './mock-data'

// WMS Requirements (25 functional requirements)
export const wmsRequirements: MockRequirement[] = [
  {
    id: 'wms-req-1',
    projectId: '2',
    title: 'Goods Receipt Management',
    description: 'System to receive incoming goods with barcode scanning, quality inspection, and automatic location assignment',
    priority: 'critical',
    status: 'in_progress',
    owner: 'Jane Smith',
    category: 'Inbound Operations',
    linkedIssues: ['wms-1', 'wms-2'],
    acceptanceCriteria: [
      { id: 'wms-ac-1', requirementId: 'wms-req-1', text: 'Scan barcode to receive goods', status: 'passed', testCases: [] },
      { id: 'wms-ac-2', requirementId: 'wms-req-1', text: 'Auto-assign storage location based on rules', status: 'in_progress', testCases: [] },
      { id: 'wms-ac-3', requirementId: 'wms-req-1', text: 'Record quality inspection results', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-2',
    projectId: '2',
    title: 'Put-away Process',
    description: 'Optimize storage location assignment and guide warehouse staff to proper locations',
    priority: 'critical',
    status: 'in_progress',
    owner: 'Bob Wilson',
    category: 'Inbound Operations',
    linkedIssues: ['wms-3'],
    acceptanceCriteria: [
      { id: 'wms-ac-4', requirementId: 'wms-req-2', text: 'Calculate optimal storage location', status: 'passed', testCases: [] },
      { id: 'wms-ac-5', requirementId: 'wms-req-2', text: 'Display put-away instructions on mobile device', status: 'in_progress', testCases: [] }
    ]
  },
  {
    id: 'wms-req-3',
    projectId: '2',
    title: 'Inventory Tracking',
    description: 'Real-time inventory tracking with lot/serial number management and expiry date monitoring',
    priority: 'critical',
    status: 'approved',
    owner: 'Jane Smith',
    category: 'Inventory Management',
    linkedIssues: ['wms-4', 'wms-5'],
    acceptanceCriteria: [
      { id: 'wms-ac-6', requirementId: 'wms-req-3', text: 'Track inventory by lot number', status: 'not_started', testCases: [] },
      { id: 'wms-ac-7', requirementId: 'wms-req-3', text: 'Alert on expiring products', status: 'not_started', testCases: [] },
      { id: 'wms-ac-8', requirementId: 'wms-req-3', text: 'Real-time stock level updates', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-4',
    projectId: '2',
    title: 'Cycle Counting',
    description: 'Automated cycle counting schedule and variance reporting',
    priority: 'high',
    status: 'approved',
    owner: 'Alice Johnson',
    category: 'Inventory Management',
    linkedIssues: ['wms-6'],
    acceptanceCriteria: [
      { id: 'wms-ac-9', requirementId: 'wms-req-4', text: 'Generate cycle count tasks automatically', status: 'not_started', testCases: [] },
      { id: 'wms-ac-10', requirementId: 'wms-req-4', text: 'Report inventory variances', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-5',
    projectId: '2',
    title: 'Order Picking',
    description: 'Multi-strategy picking (wave, batch, zone) with pick path optimization',
    priority: 'critical',
    status: 'draft',
    owner: 'Bob Wilson',
    category: 'Outbound Operations',
    linkedIssues: ['wms-7', 'wms-8'],
    acceptanceCriteria: [
      { id: 'wms-ac-11', requirementId: 'wms-req-5', text: 'Support wave picking strategy', status: 'not_started', testCases: [] },
      { id: 'wms-ac-12', requirementId: 'wms-req-5', text: 'Optimize pick path to minimize travel', status: 'not_started', testCases: [] },
      { id: 'wms-ac-13', requirementId: 'wms-req-5', text: 'Batch multiple orders for efficiency', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-6',
    projectId: '2',
    title: 'Packing Station',
    description: 'Packing verification, label printing, and shipping documentation',
    priority: 'high',
    status: 'draft',
    owner: 'Charlie Brown',
    category: 'Outbound Operations',
    linkedIssues: ['wms-9'],
    acceptanceCriteria: [
      { id: 'wms-ac-14', requirementId: 'wms-req-6', text: 'Verify picked items before packing', status: 'not_started', testCases: [] },
      { id: 'wms-ac-15', requirementId: 'wms-req-6', text: 'Print shipping labels automatically', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-7',
    projectId: '2',
    title: 'Shipping Management',
    description: 'Carrier integration, shipment tracking, and proof of delivery',
    priority: 'high',
    status: 'draft',
    owner: 'Jane Smith',
    category: 'Outbound Operations',
    linkedIssues: ['wms-10'],
    acceptanceCriteria: [
      { id: 'wms-ac-16', requirementId: 'wms-req-7', text: 'Integrate with carrier APIs', status: 'not_started', testCases: [] },
      { id: 'wms-ac-17', requirementId: 'wms-req-7', text: 'Track shipment status', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-8',
    projectId: '2',
    title: 'Returns Processing',
    description: 'Handle product returns with inspection, restocking, or disposal workflow',
    priority: 'medium',
    status: 'draft',
    owner: 'Alice Johnson',
    category: 'Returns Management',
    linkedIssues: ['wms-11'],
    acceptanceCriteria: [
      { id: 'wms-ac-18', requirementId: 'wms-req-8', text: 'Inspect returned items', status: 'not_started', testCases: [] },
      { id: 'wms-ac-19', requirementId: 'wms-req-8', text: 'Restock or dispose based on condition', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-9',
    projectId: '2',
    title: 'Warehouse Layout Management',
    description: 'Define zones, aisles, racks, bins with capacity and characteristics',
    priority: 'high',
    status: 'approved',
    owner: 'Bob Wilson',
    category: 'Configuration',
    linkedIssues: ['wms-12'],
    acceptanceCriteria: [
      { id: 'wms-ac-20', requirementId: 'wms-req-9', text: 'Create hierarchical location structure', status: 'not_started', testCases: [] },
      { id: 'wms-ac-21', requirementId: 'wms-req-9', text: 'Define location capacity and rules', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-10',
    projectId: '2',
    title: 'Barcode & RFID Support',
    description: 'Support multiple barcode formats and RFID tag reading',
    priority: 'critical',
    status: 'in_progress',
    owner: 'Charlie Brown',
    category: 'Technology',
    linkedIssues: ['wms-13'],
    acceptanceCriteria: [
      { id: 'wms-ac-22', requirementId: 'wms-req-10', text: 'Scan 1D and 2D barcodes', status: 'passed', testCases: [] },
      { id: 'wms-ac-23', requirementId: 'wms-req-10', text: 'Read RFID tags', status: 'in_progress', testCases: [] }
    ]
  },
  {
    id: 'wms-req-11',
    projectId: '2',
    title: 'Mobile App for Warehouse Staff',
    description: 'Android/iOS app for all warehouse operations with offline capability',
    priority: 'critical',
    status: 'in_progress',
    owner: 'Jane Smith',
    category: 'Technology',
    linkedIssues: ['wms-14', 'wms-15'],
    acceptanceCriteria: [
      { id: 'wms-ac-24', requirementId: 'wms-req-11', text: 'Work offline and sync when online', status: 'in_progress', testCases: [] },
      { id: 'wms-ac-25', requirementId: 'wms-req-11', text: 'Support all warehouse operations', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-12',
    projectId: '2',
    title: 'Dashboard & Analytics',
    description: 'Real-time KPI dashboard with warehouse performance metrics',
    priority: 'high',
    status: 'draft',
    owner: 'Alice Johnson',
    category: 'Reporting',
    linkedIssues: ['wms-16'],
    acceptanceCriteria: [
      { id: 'wms-ac-26', requirementId: 'wms-req-12', text: 'Display real-time KPIs', status: 'not_started', testCases: [] },
      { id: 'wms-ac-27', requirementId: 'wms-req-12', text: 'Show warehouse utilization', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-13',
    projectId: '2',
    title: 'Inventory Reports',
    description: 'Stock level, aging, movement, and valuation reports',
    priority: 'medium',
    status: 'draft',
    owner: 'Bob Wilson',
    category: 'Reporting',
    linkedIssues: ['wms-17'],
    acceptanceCriteria: [
      { id: 'wms-ac-28', requirementId: 'wms-req-13', text: 'Generate stock aging report', status: 'not_started', testCases: [] },
      { id: 'wms-ac-29', requirementId: 'wms-req-13', text: 'Export reports to Excel/PDF', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-14',
    projectId: '2',
    title: 'User & Role Management',
    description: 'Multi-level user access control with role-based permissions',
    priority: 'high',
    status: 'approved',
    owner: 'Jane Smith',
    category: 'Security',
    linkedIssues: ['wms-18'],
    acceptanceCriteria: [
      { id: 'wms-ac-30', requirementId: 'wms-req-14', text: 'Define custom roles and permissions', status: 'not_started', testCases: [] },
      { id: 'wms-ac-31', requirementId: 'wms-req-14', text: 'Audit user activities', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-15',
    projectId: '2',
    title: 'ERP Integration',
    description: 'Bi-directional integration with ERP systems (SAP, Oracle, etc.)',
    priority: 'critical',
    status: 'draft',
    owner: 'Charlie Brown',
    category: 'Integration',
    linkedIssues: ['wms-19'],
    acceptanceCriteria: [
      { id: 'wms-ac-32', requirementId: 'wms-req-15', text: 'Sync orders from ERP', status: 'not_started', testCases: [] },
      { id: 'wms-ac-33', requirementId: 'wms-req-15', text: 'Send inventory updates to ERP', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-16',
    projectId: '2',
    title: 'E-commerce Integration',
    description: 'Connect with Shopify, WooCommerce, Magento for order fulfillment',
    priority: 'high',
    status: 'draft',
    owner: 'Alice Johnson',
    category: 'Integration',
    linkedIssues: ['wms-20'],
    acceptanceCriteria: [
      { id: 'wms-ac-34', requirementId: 'wms-req-16', text: 'Import orders from e-commerce platforms', status: 'not_started', testCases: [] },
      { id: 'wms-ac-35', requirementId: 'wms-req-16', text: 'Update order status back to platform', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-17',
    projectId: '2',
    title: 'Slotting Optimization',
    description: 'AI-based product placement optimization for picking efficiency',
    priority: 'medium',
    status: 'draft',
    owner: 'Bob Wilson',
    category: 'Optimization',
    linkedIssues: ['wms-21'],
    acceptanceCriteria: [
      { id: 'wms-ac-36', requirementId: 'wms-req-17', text: 'Analyze pick frequency and suggest optimal locations', status: 'not_started', testCases: [] },
      { id: 'wms-ac-37', requirementId: 'wms-req-17', text: 'Generate slotting recommendations', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-18',
    projectId: '2',
    title: 'Labor Management',
    description: 'Track worker productivity, task assignment, and performance metrics',
    priority: 'medium',
    status: 'draft',
    owner: 'Jane Smith',
    category: 'Operations',
    linkedIssues: ['wms-22'],
    acceptanceCriteria: [
      { id: 'wms-ac-38', requirementId: 'wms-req-18', text: 'Assign tasks to workers', status: 'not_started', testCases: [] },
      { id: 'wms-ac-39', requirementId: 'wms-req-18', text: 'Track productivity metrics', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-19',
    projectId: '2',
    title: 'Cross-docking',
    description: 'Direct transfer from receiving to shipping without storage',
    priority: 'medium',
    status: 'draft',
    owner: 'Charlie Brown',
    category: 'Operations',
    linkedIssues: ['wms-23'],
    acceptanceCriteria: [
      { id: 'wms-ac-40', requirementId: 'wms-req-19', text: 'Identify cross-dock eligible items', status: 'not_started', testCases: [] },
      { id: 'wms-ac-41', requirementId: 'wms-req-19', text: 'Route items directly to shipping', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-20',
    projectId: '2',
    title: 'Kitting & Assembly',
    description: 'Create product kits and perform light assembly operations',
    priority: 'low',
    status: 'draft',
    owner: 'Alice Johnson',
    category: 'Operations',
    linkedIssues: ['wms-24'],
    acceptanceCriteria: [
      { id: 'wms-ac-42', requirementId: 'wms-req-20', text: 'Define kit components', status: 'not_started', testCases: [] },
      { id: 'wms-ac-43', requirementId: 'wms-req-20', text: 'Track kit assembly process', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-21',
    projectId: '2',
    title: 'Yard Management',
    description: 'Track trailers, dock scheduling, and yard inventory',
    priority: 'low',
    status: 'draft',
    owner: 'Bob Wilson',
    category: 'Operations',
    linkedIssues: ['wms-25'],
    acceptanceCriteria: [
      { id: 'wms-ac-44', requirementId: 'wms-req-21', text: 'Schedule dock appointments', status: 'not_started', testCases: [] },
      { id: 'wms-ac-45', requirementId: 'wms-req-21', text: 'Track trailer locations in yard', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-22',
    projectId: '2',
    title: 'Multi-warehouse Support',
    description: 'Manage multiple warehouse locations with inventory transfer',
    priority: 'high',
    status: 'draft',
    owner: 'Jane Smith',
    category: 'Configuration',
    linkedIssues: ['wms-26'],
    acceptanceCriteria: [
      { id: 'wms-ac-46', requirementId: 'wms-req-22', text: 'Configure multiple warehouses', status: 'not_started', testCases: [] },
      { id: 'wms-ac-47', requirementId: 'wms-req-22', text: 'Transfer inventory between warehouses', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-23',
    projectId: '2',
    title: 'Alerts & Notifications',
    description: 'Real-time alerts for low stock, expiring products, and exceptions',
    priority: 'medium',
    status: 'draft',
    owner: 'Charlie Brown',
    category: 'Operations',
    linkedIssues: ['wms-27'],
    acceptanceCriteria: [
      { id: 'wms-ac-48', requirementId: 'wms-req-23', text: 'Send low stock alerts', status: 'not_started', testCases: [] },
      { id: 'wms-ac-49', requirementId: 'wms-req-23', text: 'Notify on expiring products', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-24',
    projectId: '2',
    title: 'API for Third-party Integration',
    description: 'RESTful API for external system integration',
    priority: 'high',
    status: 'approved',
    owner: 'Alice Johnson',
    category: 'Integration',
    linkedIssues: ['wms-28'],
    acceptanceCriteria: [
      { id: 'wms-ac-50', requirementId: 'wms-req-24', text: 'Provide comprehensive REST API', status: 'not_started', testCases: [] },
      { id: 'wms-ac-51', requirementId: 'wms-req-24', text: 'API documentation with examples', status: 'not_started', testCases: [] }
    ]
  },
  {
    id: 'wms-req-25',
    projectId: '2',
    title: 'Audit Trail & Compliance',
    description: 'Complete audit trail for regulatory compliance (FDA, GMP)',
    priority: 'high',
    status: 'approved',
    owner: 'Bob Wilson',
    category: 'Security',
    linkedIssues: ['wms-29'],
    acceptanceCriteria: [
      { id: 'wms-ac-52', requirementId: 'wms-req-25', text: 'Log all inventory transactions', status: 'not_started', testCases: [] },
      { id: 'wms-ac-53', requirementId: 'wms-req-25', text: 'Generate compliance reports', status: 'not_started', testCases: [] }
    ]
  }
]

// WMS Epics
export const wmsEpics: MockEpic[] = [
  {
    id: 'wms-epic-1',
    projectId: '2',
    title: 'Inbound Operations',
    description: 'Receiving, put-away, and goods receipt processes',
    status: 'in_progress',
    progress: 35,
    issueCount: 15,
    completedIssues: 5
  },
  {
    id: 'wms-epic-2',
    projectId: '2',
    title: 'Inventory Management',
    description: 'Real-time tracking, cycle counting, and stock control',
    status: 'in_progress',
    progress: 20,
    issueCount: 12,
    completedIssues: 2
  },
  {
    id: 'wms-epic-3',
    projectId: '2',
    title: 'Outbound Operations',
    description: 'Order picking, packing, and shipping processes',
    status: 'planning',
    progress: 5,
    issueCount: 18,
    completedIssues: 1
  },
  {
    id: 'wms-epic-4',
    projectId: '2',
    title: 'Mobile Application',
    description: 'Android/iOS app for warehouse operations',
    status: 'in_progress',
    progress: 40,
    issueCount: 20,
    completedIssues: 8
  },
  {
    id: 'wms-epic-5',
    projectId: '2',
    title: 'Integration & API',
    description: 'ERP, e-commerce, and third-party integrations',
    status: 'planning',
    progress: 10,
    issueCount: 14,
    completedIssues: 1
  },
  {
    id: 'wms-epic-6',
    projectId: '2',
    title: 'Reporting & Analytics',
    description: 'Dashboards, KPIs, and operational reports',
    status: 'planning',
    progress: 0,
    issueCount: 10,
    completedIssues: 0
  }
]
