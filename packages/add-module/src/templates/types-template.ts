export function generateTypesTemplate(pascalName: string) {
  return `export interface ${pascalName} {
  id: string
  name: string
  code: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface ${pascalName}FormData {
  name: string
  code: string
  status: 'active' | 'inactive'
}
`
}
