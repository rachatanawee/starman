/**
 * Mock Data Service for ProjectFlow Prototype
 * 
 * This file contains all mock data and simulated API functions
 * for the prototype. NO REAL DATA OR API CALLS.
 */

import { wmsRequirements, wmsEpics } from './wms-data'
import { wmsTasks } from './wms-tasks'

// ============================================================================
// TYPES
// ============================================================================

export type Role = 'developer' | 'business_analyst' | 'project_manager'
export type RequirementStatus = 'draft' | 'approved' | 'in_progress' | 'completed' | 'rejected'
export type RequirementPriority = 'low' | 'medium' | 'high' | 'critical'
export type EpicStatus = 'planning' | 'in_progress' | 'completed' | 'cancelled'
export type RiskStatus = 'identified' | 'mitigating' | 'resolved' | 'occurred'
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked'
export type CriterionStatus = 'not_started' | 'in_progress' | 'passed' | 'failed' | 'blocked'

export interface MockUser {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface MockProject {
  id: string
  name: string
  description: string
  owner: string
  members: number
  budget: number
  spent: number
  createdAt: string
  lastActivity: string
  gitlabUrl?: string
  aiProvider?: string
}

export interface MockTask {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: RequirementPriority
  assignee?: string
  assigneeName?: string
  labels: string[]
  milestone?: string
  dueDate?: string
  startDate?: string
  timeEstimate?: number
  timeSpent?: number
  epicId?: string
  requirementId?: string
}

export interface MockRequirement {
  id: string
  projectId: string
  title: string
  description: string
  priority: RequirementPriority
  status: RequirementStatus
  owner?: string
  category?: string
  linkedIssues: string[]
  acceptanceCriteria: MockAcceptanceCriterion[]
}

export interface MockAcceptanceCriterion {
  id: string
  requirementId: string
  text: string
  status: CriterionStatus
  testCases: string[]
}

export interface MockEpic {
  id: string
  projectId: string
  title: string
  description: string
  status: EpicStatus
  progress: number
  issueCount: number
  completedIssues: number
}

export interface MockRisk {
  id: string
  projectId: string
  title: string
  description: string
  impact: number // 1-5
  probability: number // 1-5
  score: number
  status: RiskStatus
  mitigation?: string
  owner?: string
}

export interface MockMilestone {
  id: string
  projectId: string
  title: string
  description: string
  dueDate: string
  startDate?: string
  progress: number
  issueCount: number
  completedIssues: number
}

export interface MockTestCase {
  id: string
  requirementId: string
  title: string
  type: 'manual' | 'automated'
  status: 'not_run' | 'passed' | 'failed' | 'blocked'
  givenText?: string
  whenText?: string
  thenText?: string
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Simulate API delay
 */
export const delay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Generate random ID
 */
const generateId = () => Math.random().toString(36).substring(2, 11)

/**
 * Get random item from array
 */
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockUsers: MockUser[] = [
  { id: '1', email: 'john@example.com', name: 'Bruce Wayne', avatar: '👨‍💻' },
  { id: '2', email: 'jane@example.com', name: 'Diana Prince', avatar: '👩‍💼' },
  { id: '3', email: 'bob@example.com', name: 'Clark Kent', avatar: '👨‍🔧' },
  { id: '4', email: 'alice@example.com', name: 'Barry Allen', avatar: '👩‍🎨' },
  { id: '5', email: 'charlie@example.com', name: 'Hal Jordan', avatar: '👨‍🚀' },
]

export const mockProjects: MockProject[] = [
  {
    id: '1',
    name: 'ABC Manufacturing Co.',
    description: 'Electronics manufacturing company with 3 production lines',
    owner: 'Bruce Wayne',
    members: 12,
    budget: 5000000,
    spent: 2800000,
    createdAt: '2025-11-15',
    lastActivity: '2026-01-20',
    gitlabUrl: 'https://gitlab.example.com/abc-manufacturing',
    aiProvider: 'OpenAI GPT-4'
  },
  {
    id: '2',
    name: 'XYZ Automotive Parts',
    description: 'Automotive parts manufacturer specializing in engine components',
    owner: 'Diana Prince',
    members: 8,
    budget: 3200000,
    spent: 1500000,
    createdAt: '2025-11-10',
    lastActivity: '2026-01-22',
    gitlabUrl: 'https://gitlab.example.com/xyz-automotive',
    aiProvider: 'OpenAI GPT-4'
  },
  {
    id: '3',
    name: 'Global Textiles Ltd.',
    description: 'Textile manufacturing with integrated supply chain',
    owner: 'Clark Kent',
    members: 15,
    budget: 4500000,
    spent: 2100000,
    createdAt: '2025-11-20',
    lastActivity: '2026-01-21',
    gitlabUrl: 'https://gitlab.example.com/global-textiles',
    aiProvider: 'OpenAI GPT-4'
  },
  {
    id: '4',
    name: 'Pacific Foods Inc.',
    description: 'Food processing and packaging facility',
    owner: 'Barry Allen',
    members: 10,
    budget: 2800000,
    spent: 1200000,
    createdAt: '2025-12-01',
    lastActivity: '2026-01-23',
    gitlabUrl: 'https://gitlab.example.com/pacific-foods',
    aiProvider: 'Anthropic Claude'
  },
]

export const mockTasks: MockTask[] = [
  // Phase 1 - Foundation (Week 1-2) - มกราคม 2026
  {
    id: '1',
    projectId: '1',
    title: 'Setup Authentication System',
    description: 'Implement JWT-based authentication with refresh tokens',
    status: 'done',
    priority: 'high',
    assignee: '1',
    assigneeName: 'Bruce Wayne',
    labels: ['backend', 'security'],
    milestone: 'Phase 1',
    dueDate: '2026-01-10',
    startDate: '2026-01-05',
    timeEstimate: 16,
    timeSpent: 14,
    epicId: '1',
    requirementId: '1'
  },
  {
    id: '2',
    projectId: '1',
    title: 'Design Dashboard UI',
    description: 'Create responsive dashboard with charts and metrics',
    status: 'done',
    priority: 'high',
    assignee: '2',
    assigneeName: 'Diana Prince',
    labels: ['frontend', 'ui'],
    milestone: 'Phase 1',
    dueDate: '2026-01-12',
    startDate: '2026-01-06',
    timeEstimate: 24,
    timeSpent: 22,
    epicId: '1'
  },
  {
    id: '3',
    projectId: '1',
    title: 'Setup Database Schema',
    description: 'Design and implement PostgreSQL database schema',
    status: 'done',
    priority: 'critical',
    assignee: '1',
    assigneeName: 'Bruce Wayne',
    labels: ['backend', 'database'],
    milestone: 'Phase 1',
    dueDate: '2026-01-08',
    startDate: '2026-01-03',
    timeEstimate: 12,
    timeSpent: 10,
    epicId: '1'
  },
  {
    id: '4',
    projectId: '1',
    title: 'Setup CI/CD Pipeline',
    description: 'Configure GitLab CI/CD with automated testing',
    status: 'in_progress',
    priority: 'medium',
    assignee: '4',
    assigneeName: 'Barry Allen',
    labels: ['devops', 'ci-cd'],
    milestone: 'Phase 1',
    dueDate: '2026-01-15',
    startDate: '2026-01-10',
    timeEstimate: 16,
    timeSpent: 8
  },
  {
    id: '19',
    projectId: '1',
    title: 'Configure Environment Variables',
    description: 'Setup development and production environment configurations',
    status: 'done',
    priority: 'high',
    assignee: '4',
    assigneeName: 'Barry Allen',
    labels: ['devops', 'config'],
    milestone: 'Phase 1',
    dueDate: '2026-01-14',
    startDate: '2026-01-12',
    timeEstimate: 8,
    timeSpent: 6,
    epicId: '1'
  },
  {
    id: '20',
    projectId: '1',
    title: 'Setup Logging System',
    description: 'Implement centralized logging with error tracking',
    status: 'in_progress',
    priority: 'medium',
    assignee: '3',
    assigneeName: 'Clark Kent',
    labels: ['backend', 'monitoring'],
    milestone: 'Phase 1',
    dueDate: '2026-01-17',
    startDate: '2026-01-13',
    timeEstimate: 12,
    timeSpent: 5
  },
  
  // Phase 2 - Core Features (Week 3-4)
  {
    id: '5',
    projectId: '1',
    title: 'Implement User Management',
    description: 'CRUD operations for user accounts and profiles',
    status: 'in_progress',
    priority: 'high',
    assignee: '1',
    assigneeName: 'Bruce Wayne',
    labels: ['backend', 'users'],
    milestone: 'Phase 2',
    dueDate: '2026-01-25',
    startDate: '2026-01-20',
    timeEstimate: 20,
    timeSpent: 12
  },
  {
    id: '6',
    projectId: '1',
    title: 'Build Project List View',
    description: 'Create project listing with search and filters',
    status: 'in_progress',
    priority: 'high',
    assignee: '2',
    assigneeName: 'Diana Prince',
    labels: ['frontend', 'ui'],
    milestone: 'Phase 2',
    dueDate: '2026-01-27',
    startDate: '2026-01-22',
    timeEstimate: 16,
    timeSpent: 6
  },
  {
    id: '7',
    projectId: '1',
    title: 'Implement Task Management',
    description: 'Create, update, delete tasks with status tracking',
    status: 'todo',
    priority: 'high',
    assignee: '3',
    assigneeName: 'Clark Kent',
    labels: ['backend', 'tasks'],
    milestone: 'Phase 2',
    dueDate: '2026-01-30',
    startDate: '2026-01-25',
    timeEstimate: 24
  },
  {
    id: '8',
    projectId: '1',
    title: 'Design Task Board UI',
    description: 'Kanban-style task board with drag and drop',
    status: 'todo',
    priority: 'medium',
    assignee: '2',
    assigneeName: 'Diana Prince',
    labels: ['frontend', 'ui'],
    milestone: 'Phase 2',
    dueDate: '2026-02-02',
    startDate: '2026-01-28',
    timeEstimate: 20
  },
  {
    id: '21',
    projectId: '1',
    title: 'Create Role-Based Access Control',
    description: 'Implement RBAC for different user roles',
    status: 'todo',
    priority: 'high',
    assignee: '1',
    assigneeName: 'Bruce Wayne',
    labels: ['backend', 'security'],
    milestone: 'Phase 2',
    dueDate: '2026-02-04',
    startDate: '2026-01-30',
    timeEstimate: 16
  },
  {
    id: '22',
    projectId: '1',
    title: 'Build Settings Page',
    description: 'User and project settings management interface',
    status: 'todo',
    priority: 'medium',
    assignee: '2',
    assigneeName: 'Diana Prince',
    labels: ['frontend', 'ui'],
    milestone: 'Phase 2',
    dueDate: '2026-02-06',
    startDate: '2026-02-02',
    timeEstimate: 14
  },
  
  // Phase 3 - Advanced Features (Week 5-6)
  {
    id: '9',
    projectId: '1',
    title: 'Implement Payment Gateway',
    description: 'Integrate Stripe payment processing',
    status: 'todo',
    priority: 'critical',
    assignee: '3',
    assigneeName: 'Clark Kent',
    labels: ['backend', 'payment'],
    milestone: 'Phase 3',
    dueDate: '2026-02-12',
    startDate: '2026-02-08',
    timeEstimate: 32
  },
  {
    id: '10',
    projectId: '1',
    title: 'Build Gantt Chart View',
    description: 'Interactive Gantt chart for project timeline',
    status: 'todo',
    priority: 'medium',
    assignee: '2',
    assigneeName: 'Diana Prince',
    labels: ['frontend', 'charts'],
    milestone: 'Phase 3',
    dueDate: '2026-02-15',
    startDate: '2026-02-10',
    timeEstimate: 28
  },
  {
    id: '11',
    projectId: '1',
    title: 'Implement Real-time Notifications',
    description: 'WebSocket-based real-time notifications',
    status: 'blocked',
    priority: 'medium',
    assignee: '1',
    assigneeName: 'Bruce Wayne',
    labels: ['backend', 'websocket'],
    milestone: 'Phase 3',
    dueDate: '2026-02-18',
    startDate: '2026-02-13',
    timeEstimate: 24
  },
  {
    id: '12',
    projectId: '1',
    title: 'Add File Upload System',
    description: 'Support for file attachments and document management',
    status: 'todo',
    priority: 'medium',
    assignee: '3',
    assigneeName: 'Clark Kent',
    labels: ['backend', 'storage'],
    milestone: 'Phase 3',
    dueDate: '2026-02-20',
    startDate: '2026-02-15',
    timeEstimate: 20
  },
  {
    id: '23',
    projectId: '1',
    title: 'Build Analytics Dashboard',
    description: 'Create analytics and reporting dashboard',
    status: 'todo',
    priority: 'medium',
    assignee: '2',
    assigneeName: 'Diana Prince',
    labels: ['frontend', 'analytics'],
    milestone: 'Phase 3',
    dueDate: '2026-02-22',
    startDate: '2026-02-17',
    timeEstimate: 20
  },
  {
    id: '24',
    projectId: '1',
    title: 'Implement Email Service',
    description: 'Setup email notifications and templates',
    status: 'todo',
    priority: 'low',
    assignee: '5',
    assigneeName: 'Hal Jordan',
    labels: ['backend', 'email'],
    milestone: 'Phase 3',
    dueDate: '2026-02-21',
    startDate: '2026-02-18',
    timeEstimate: 12
  },
  
  // Phase 4 - Polish & Testing (Week 7-8)
  {
    id: '13',
    projectId: '1',
    title: 'Write API Documentation',
    description: 'Create comprehensive API documentation with examples',
    status: 'todo',
    priority: 'low',
    assignee: '5',
    assigneeName: 'Hal Jordan',
    labels: ['documentation'],
    milestone: 'Phase 4',
    dueDate: '2026-02-28',
    startDate: '2026-02-24',
    timeEstimate: 16
  },
  {
    id: '14',
    projectId: '1',
    title: 'Implement Unit Tests',
    description: 'Write comprehensive unit tests for all modules',
    status: 'todo',
    priority: 'high',
    assignee: '4',
    assigneeName: 'Barry Allen',
    labels: ['testing', 'quality'],
    milestone: 'Phase 4',
    dueDate: '2026-03-05',
    startDate: '2026-03-01',
    timeEstimate: 32
  },
  {
    id: '15',
    projectId: '1',
    title: 'Performance Optimization',
    description: 'Optimize database queries and frontend rendering',
    status: 'todo',
    priority: 'medium',
    assignee: '1',
    assigneeName: 'Bruce Wayne',
    labels: ['performance', 'optimization'],
    milestone: 'Phase 4',
    dueDate: '2026-03-08',
    startDate: '2026-03-05',
    timeEstimate: 24
  },
  {
    id: '16',
    projectId: '1',
    title: 'Security Audit',
    description: 'Conduct security review and penetration testing',
    status: 'todo',
    priority: 'critical',
    assignee: '4',
    assigneeName: 'Barry Allen',
    labels: ['security', 'testing'],
    milestone: 'Phase 4',
    dueDate: '2026-03-12',
    startDate: '2026-03-08',
    timeEstimate: 20
  },
  {
    id: '17',
    projectId: '1',
    title: 'User Acceptance Testing',
    description: 'Conduct UAT with stakeholders',
    status: 'todo',
    priority: 'high',
    assignee: '5',
    assigneeName: 'Hal Jordan',
    labels: ['testing', 'uat'],
    milestone: 'Phase 4',
    dueDate: '2026-03-15',
    startDate: '2026-03-12',
    timeEstimate: 16
  },
  {
    id: '18',
    projectId: '1',
    title: 'Production Deployment',
    description: 'Deploy to production environment',
    status: 'todo',
    priority: 'critical',
    assignee: '4',
    assigneeName: 'Barry Allen',
    labels: ['deployment', 'production'],
    milestone: 'Phase 4',
    dueDate: '2026-03-20',
    startDate: '2026-03-18',
    timeEstimate: 8
  },
  {
    id: '25',
    projectId: '1',
    title: 'Integration Testing',
    description: 'End-to-end integration testing across all modules',
    status: 'todo',
    priority: 'high',
    assignee: '4',
    assigneeName: 'Barry Allen',
    labels: ['testing', 'integration'],
    milestone: 'Phase 4',
    dueDate: '2026-03-10',
    startDate: '2026-03-06',
    timeEstimate: 24
  },
  {
    id: '26',
    projectId: '1',
    title: 'Create User Guide',
    description: 'Write comprehensive user documentation and guides',
    status: 'todo',
    priority: 'medium',
    assignee: '5',
    assigneeName: 'Hal Jordan',
    labels: ['documentation'],
    milestone: 'Phase 4',
    dueDate: '2026-03-14',
    startDate: '2026-03-10',
    timeEstimate: 20
  },
  {
    id: '27',
    projectId: '1',
    title: 'Setup Monitoring & Alerts',
    description: 'Configure production monitoring and alerting system',
    status: 'todo',
    priority: 'high',
    assignee: '3',
    assigneeName: 'Clark Kent',
    labels: ['devops', 'monitoring'],
    milestone: 'Phase 4',
    dueDate: '2026-03-17',
    startDate: '2026-03-14',
    timeEstimate: 16
  },
  ...wmsTasks
]

export const mockRequirements: MockRequirement[] = [
  {
    id: '1',
    projectId: '1',
    title: 'User Authentication System',
    description: 'Users must be able to register, login, and logout securely using email/password or social authentication (Google, Facebook, GitHub)',
    priority: 'critical',
    status: 'in_progress',
    owner: 'Bruce Wayne',
    category: 'Security',
    linkedIssues: ['1'],
    acceptanceCriteria: [
      {
        id: 'ac1',
        requirementId: '1',
        text: 'User can register with email and password',
        status: 'passed',
        testCases: ['tc1', 'tc2']
      },
      {
        id: 'ac2',
        requirementId: '1',
        text: 'User can login with valid credentials',
        status: 'passed',
        testCases: ['tc3']
      },
      {
        id: 'ac3',
        requirementId: '1',
        text: 'User can logout successfully',
        status: 'in_progress',
        testCases: []
      },
      {
        id: 'ac4',
        requirementId: '1',
        text: 'Social login works for Google, Facebook, GitHub',
        status: 'not_started',
        testCases: []
      }
    ]
  },
  {
    id: '2',
    projectId: '1',
    title: 'Password Reset Functionality',
    description: 'Users should be able to reset their password via email verification link with token expiration',
    priority: 'high',
    status: 'approved',
    owner: 'Diana Prince',
    category: 'Features',
    linkedIssues: ['2'],
    acceptanceCriteria: [
      {
        id: 'ac5',
        requirementId: '2',
        text: 'User receives reset email within 5 minutes',
        status: 'in_progress',
        testCases: ['tc4']
      },
      {
        id: 'ac6',
        requirementId: '2',
        text: 'Reset link expires after 1 hour',
        status: 'not_started',
        testCases: []
      },
      {
        id: 'ac7',
        requirementId: '2',
        text: 'User can set new password successfully',
        status: 'not_started',
        testCases: []
      }
    ]
  },
  {
    id: '3',
    projectId: '1',
    title: 'Dashboard with Analytics',
    description: 'Display key metrics and charts showing user activity, sales data, and performance indicators with real-time updates',
    priority: 'high',
    status: 'draft',
    owner: 'Clark Kent',
    category: 'Features',
    linkedIssues: [],
    acceptanceCriteria: [
      {
        id: 'ac8',
        requirementId: '3',
        text: 'Dashboard loads within 2 seconds',
        status: 'not_started',
        testCases: []
      },
      {
        id: 'ac9',
        requirementId: '3',
        text: 'Charts update in real-time',
        status: 'not_started',
        testCases: []
      },
      {
        id: 'ac10',
        requirementId: '3',
        text: 'All metrics are accurate',
        status: 'not_started',
        testCases: []
      },
      {
        id: 'ac11',
        requirementId: '3',
        text: 'Responsive on mobile devices',
        status: 'not_started',
        testCases: []
      }
    ]
  },
  ...wmsRequirements
]

export const mockEpics: MockEpic[] = [
  {
    id: '1',
    projectId: '1',
    title: 'User Management',
    description: 'Complete user management system including auth, profiles, and permissions',
    status: 'in_progress',
    progress: 65,
    issueCount: 8,
    completedIssues: 5
  },
  {
    id: '2',
    projectId: '1',
    title: 'Payment Processing',
    description: 'Integrate payment gateway and handle transactions',
    status: 'planning',
    progress: 10,
    issueCount: 12,
    completedIssues: 1
  },
  {
    id: '3',
    projectId: '1',
    title: 'Product Catalog',
    description: 'Product listing, search, and filtering',
    status: 'in_progress',
    progress: 40,
    issueCount: 15,
    completedIssues: 6
  },
  ...wmsEpics
]

export const mockRisks: MockRisk[] = [
  {
    id: '1',
    projectId: '1',
    title: 'API Rate Limiting',
    description: 'Third-party API may have rate limits that affect performance',
    impact: 4,
    probability: 3,
    score: 12,
    status: 'identified',
    mitigation: 'Implement caching and request queuing',
    owner: 'Bruce Wayne'
  },
  {
    id: '2',
    projectId: '1',
    title: 'Team Member Leaving',
    description: 'Key developer may leave during critical phase',
    impact: 5,
    probability: 2,
    score: 10,
    status: 'mitigating',
    mitigation: 'Cross-training team members and documentation',
    owner: 'Diana Prince'
  },
  {
    id: '3',
    projectId: '1',
    title: 'Security Vulnerability',
    description: 'Potential security issues in authentication system',
    impact: 5,
    probability: 2,
    score: 10,
    status: 'resolved',
    mitigation: 'Security audit completed and fixes implemented',
    owner: 'Clark Kent'
  },
  {
    id: 'wms-1',
    projectId: '2',
    title: 'Barcode Scanner Hardware Compatibility',
    description: 'Different warehouse locations use various barcode scanner models that may not be compatible with the system',
    impact: 4,
    probability: 4,
    score: 16,
    status: 'identified',
    mitigation: 'Conduct hardware audit and create compatibility matrix. Implement universal scanner driver support',
    owner: 'Clark Kent'
  },
  {
    id: 'wms-2',
    projectId: '2',
    title: 'Network Connectivity in Warehouse',
    description: 'Poor WiFi coverage in warehouse areas may cause mobile app disconnections',
    impact: 5,
    probability: 3,
    score: 15,
    status: 'mitigating',
    mitigation: 'Install additional WiFi access points. Implement offline mode with data sync',
    owner: 'Barry Allen'
  },
  {
    id: 'wms-3',
    projectId: '2',
    title: 'Data Migration from Legacy System',
    description: 'Existing inventory data in old system may have inconsistencies and require extensive cleanup',
    impact: 4,
    probability: 4,
    score: 16,
    status: 'identified',
    mitigation: 'Create data validation scripts. Plan phased migration with parallel run period',
    owner: 'Diana Prince'
  },
  {
    id: 'wms-4',
    projectId: '2',
    title: 'Peak Season Performance',
    description: 'System may not handle peak season order volumes (3x normal load)',
    impact: 5,
    probability: 3,
    score: 15,
    status: 'mitigating',
    mitigation: 'Conduct load testing. Implement auto-scaling infrastructure. Optimize database queries',
    owner: 'Oliver Queen'
  },
  {
    id: 'wms-5',
    projectId: '2',
    title: 'User Adoption Resistance',
    description: 'Warehouse staff may resist switching from familiar manual processes to new digital system',
    impact: 4,
    probability: 3,
    score: 12,
    status: 'mitigating',
    mitigation: 'Conduct training sessions. Create user-friendly mobile interface. Assign change champions',
    owner: 'Diana Prince'
  },
  {
    id: 'wms-6',
    projectId: '2',
    title: 'Third-party Shipping API Downtime',
    description: 'Shipping carrier APIs may experience downtime affecting order fulfillment',
    impact: 4,
    probability: 2,
    score: 8,
    status: 'identified',
    mitigation: 'Implement retry logic and fallback mechanisms. Cache shipping rates. Monitor API health',
    owner: 'Hal Jordan'
  },
  {
    id: 'wms-7',
    projectId: '2',
    title: 'Inventory Count Discrepancies',
    description: 'Physical inventory may not match system records during initial rollout',
    impact: 3,
    probability: 4,
    score: 12,
    status: 'identified',
    mitigation: 'Conduct full physical inventory before go-live. Implement cycle counting procedures',
    owner: 'Clark Kent'
  },
  {
    id: 'wms-8',
    projectId: '2',
    title: 'Mobile Device Battery Life',
    description: 'Warehouse mobile devices may not last full shift with continuous scanning',
    impact: 3,
    probability: 3,
    score: 9,
    status: 'resolved',
    mitigation: 'Procured extended battery packs. Optimized app power consumption',
    owner: 'Barry Allen'
  },
]

export const mockMilestones: MockMilestone[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Phase 1: Foundation',
    description: 'Core infrastructure and authentication',
    dueDate: '2026-02-10',
    startDate: '2026-01-24',
    progress: 85,
    issueCount: 4,
    completedIssues: 3
  },
  {
    id: '2',
    projectId: '1',
    title: 'Phase 2: Core Features',
    description: 'User management and task system',
    dueDate: '2026-02-24',
    startDate: '2026-02-07',
    progress: 40,
    issueCount: 4,
    completedIssues: 1
  },
  {
    id: '3',
    projectId: '1',
    title: 'Phase 3: Advanced Features',
    description: 'Payment, charts, and real-time features',
    dueDate: '2026-03-10',
    startDate: '2026-02-24',
    progress: 0,
    issueCount: 4,
    completedIssues: 0
  },
  {
    id: '4',
    projectId: '1',
    title: 'Phase 4: Launch',
    description: 'Testing, optimization, and deployment',
    dueDate: '2026-04-05',
    startDate: '2026-03-08',
    progress: 0,
    issueCount: 6,
    completedIssues: 0
  },
]

export const mockTestCases: MockTestCase[] = [
  {
    id: 'tc1',
    requirementId: '1',
    title: 'User Registration - Happy Path',
    type: 'automated',
    status: 'passed',
    givenText: 'User is on registration page',
    whenText: 'User fills valid email and password',
    thenText: 'User account is created successfully'
  },
  {
    id: 'tc2',
    requirementId: '1',
    title: 'User Registration - Invalid Email',
    type: 'automated',
    status: 'passed',
    givenText: 'User is on registration page',
    whenText: 'User enters invalid email format',
    thenText: 'Error message is displayed'
  },
  {
    id: 'tc3',
    requirementId: '1',
    title: 'User Login - Valid Credentials',
    type: 'automated',
    status: 'passed',
    givenText: 'User has registered account',
    whenText: 'User enters correct email and password',
    thenText: 'User is logged in successfully'
  },
  {
    id: 'tc4',
    requirementId: '1',
    title: 'Password Reset Flow',
    type: 'manual',
    status: 'not_run',
    givenText: 'User forgot password',
    whenText: 'User requests password reset',
    thenText: 'Reset email is sent'
  },
]

// ============================================================================
// MOCK API FUNCTIONS
// ============================================================================

/**
 * Mock Authentication
 */
export const mockAuth = {
  login: async (email: string, password: string) => {
    await delay(800)
    // Accept any credentials for prototype
    return {
      user: mockUsers[0],
      token: 'mock-token-' + generateId()
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    await delay(1000)
    return {
      user: { id: generateId(), email, name },
      token: 'mock-token-' + generateId()
    }
  },
  
  logout: async () => {
    await delay(300)
    return { success: true }
  }
}

/**
 * Mock Projects API
 */
export const mockProjectsAPI = {
  list: async () => {
    await delay(100)
    return mockProjects
  },
  
  get: async (id: string) => {
    await delay(100)
    return mockProjects.find(p => p.id === id) || null
  },
  
  getSync: (id: string) => {
    return mockProjects.find(p => p.id === id) || null
  },
  
  create: async (data: Partial<MockProject>) => {
    await delay(800)
    return {
      id: generateId(),
      ...data,
      members: 1,
      budget: 0,
      spent: 0,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    } as MockProject
  },
  
  update: async (id: string, data: Partial<MockProject>) => {
    await delay(600)
    const project = mockProjects.find(p => p.id === id)
    return { ...project, ...data } as MockProject
  },
  
  delete: async (id: string) => {
    await delay(500)
    return { success: true }
  }
}

/**
 * Mock Tasks API
 */
export const mockTasksAPI = {
  list: async (projectId: string) => {
    await delay(100)
    return mockTasks.filter(t => t.projectId === projectId)
  },
  
  listSync: (projectId: string) => {
    return mockTasks.filter(t => t.projectId === projectId)
  },
  
  get: async (id: string) => {
    await delay(300)
    return mockTasks.find(t => t.id === id) || null
  },
  
  create: async (data: Partial<MockTask>) => {
    await delay(700)
    return {
      id: generateId(),
      ...data,
      status: 'todo',
      labels: [],
      timeSpent: 0
    } as MockTask
  }
}

/**
 * Mock AI API
 */
export const mockAIAPI = {
  generateTasks: async (description: string) => {
    await delay(2000) // Simulate AI processing
    return {
      tasks: [
        { title: 'Setup project structure', description: 'Initialize project with Next.js', priority: 'high' as RequirementPriority },
        { title: 'Configure database', description: 'Setup Supabase database', priority: 'high' as RequirementPriority },
        { title: 'Implement authentication', description: 'Add user login/register', priority: 'critical' as RequirementPriority },
        { title: 'Create dashboard', description: 'Build main dashboard UI', priority: 'medium' as RequirementPriority },
        { title: 'Write tests', description: 'Add unit and integration tests', priority: 'medium' as RequirementPriority },
      ],
      labels: ['backend', 'frontend', 'testing', 'security'],
      milestones: ['Phase 1: Setup', 'Phase 2: Development', 'Phase 3: Testing']
    }
  },
  
  generateDiagram: async (requirement: string, type: string) => {
    await delay(1500)
    return `graph TD
    A[User] -->|Login| B[Auth Service]
    B -->|Validate| C[Database]
    C -->|Success| D[Dashboard]
    C -->|Failure| E[Error Page]`
  },
  
  generateTestScenarios: async (requirement: string) => {
    await delay(1800)
    return [
      {
        title: 'Happy Path - Successful Login',
        given: 'User has valid credentials',
        when: 'User submits login form',
        then: 'User is redirected to dashboard'
      },
      {
        title: 'Sad Path - Invalid Credentials',
        given: 'User has invalid credentials',
        when: 'User submits login form',
        then: 'Error message is displayed'
      },
      {
        title: 'Edge Case - Empty Fields',
        given: 'User leaves fields empty',
        when: 'User submits login form',
        then: 'Validation errors are shown'
      }
    ]
  }
}

/**
 * Mock Chart Data Generators
 */
export const mockChartData = {
  workloadDistribution: () => [
    { name: 'Bruce Wayne', tasks: 12, hours: 96 },
    { name: 'Diana Prince', tasks: 8, hours: 64 },
    { name: 'Clark Kent', tasks: 10, hours: 80 },
    { name: 'Barry Allen', tasks: 6, hours: 48 },
    { name: 'Hal Jordan', tasks: 4, hours: 32 },
  ],
  
  burndownChart: () => {
    const data = []
    for (let i = 0; i <= 14; i++) {
      data.push({
        day: i,
        ideal: 100 - (i * 7.14),
        actual: 100 - (i * 6.5) + (Math.random() * 10 - 5)
      })
    }
    return data
  },
  
  costTrends: () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, i) => ({
      month,
      estimated: 200000 + (i * 50000),
      actual: 180000 + (i * 55000) + (Math.random() * 20000)
    }))
  }
}

// Export all mock data
export const mockData = {
  users: mockUsers,
  projects: mockProjects,
  tasks: mockTasks,
  requirements: mockRequirements,
  epics: mockEpics,
  risks: mockRisks,
  milestones: mockMilestones,
  testCases: mockTestCases
}
