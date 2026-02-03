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
    name: 'Demo Company',
    description: 'Demo company for testing',
    owner: 'Admin',
    members: 5,
    budget: 1000000,
    spent: 500000,
    createdAt: '2025-01-01',
    lastActivity: '2025-02-03'
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
