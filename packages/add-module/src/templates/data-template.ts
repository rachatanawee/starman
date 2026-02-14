export function generateDataTemplate(pascalName: string, camelName: string) {
  return `import type { ${pascalName} } from '../types'

export const mock${pascalName}Data: ${pascalName}[] = [
  {
    id: '1',
    name: 'Sample ${pascalName} 1',
    code: '${camelName.toUpperCase()}-001',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sample ${pascalName} 2',
    code: '${camelName.toUpperCase()}-002',
    status: 'active',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Sample ${pascalName} 3',
    code: '${camelName.toUpperCase()}-003',
    status: 'inactive',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
]
`
}
