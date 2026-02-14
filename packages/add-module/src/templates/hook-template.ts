export function generateHookTemplate(pascalName: string, camelName: string) {
  return `import { useState, useEffect } from 'react'
import type { ${pascalName} } from '../types'
import { mock${pascalName}Data } from '../lib/data'

export function use${pascalName}() {
  const [${camelName}s, set${pascalName}s] = useState<${pascalName}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      set${pascalName}s(mock${pascalName}Data)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const get${pascalName}ById = (id: string) => {
    return ${camelName}s.find(item => item.id === id)
  }

  const get${pascalName}ByCode = (code: string) => {
    return ${camelName}s.find(item => item.code === code)
  }

  return {
    ${camelName}s,
    loading,
    get${pascalName}ById,
    get${pascalName}ByCode,
  }
}
`
}
