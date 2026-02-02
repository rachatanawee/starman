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
}

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
    lastActivity: '2026-01-20'
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
    lastActivity: '2026-01-22'
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
    lastActivity: '2026-01-21'
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
    lastActivity: '2026-01-23'
  }
]

export const mockProjectsAPI = {
  list: async () => mockProjects,
  get: async (id: string) => mockProjects.find(p => p.id === id) || null,
  getSync: (id: string) => mockProjects.find(p => p.id === id) || null
}

export const mockAuth = {
  login: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Simple validation - accept demo credentials or any @erp.com email
    if ((email === 'demo@erp.com' && password === 'demo123') || email.endsWith('@erp.com')) {
      return {
        user: { id: '1', email, name: email.split('@')[0] },
        token: 'mock-token-' + Date.now()
      }
    }
    
    // Throw error for invalid credentials
    throw new Error('Invalid email or password')
  }
}

export interface MockTask {
  id: string
  projectId: string
  title: string
  status: string
}

export const mockTasksAPI = {
  list: async (projectId: string) => [] as MockTask[],
  listSync: (projectId: string) => [] as MockTask[]
}
