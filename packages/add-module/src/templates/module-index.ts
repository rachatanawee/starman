export function generateModuleIndex(
  pascalName: string,
  camelName: string,
  kebabName: string
) {
  return `// Types
export type { ${pascalName}, ${pascalName}FormData } from './types'

// Hooks
export { use${pascalName} } from './hooks/use-${kebabName}'

// Data
export { mock${pascalName}Data } from './lib/data'
`
}
