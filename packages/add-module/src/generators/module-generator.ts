import fs from 'fs/promises'
import path from 'path'
import { generatePageTemplate } from '../templates/page-template.js'
import { generateModuleIndex } from '../templates/module-index.js'
import { generateHookTemplate } from '../templates/hook-template.js'
import { generateTypesTemplate } from '../templates/types-template.js'
import { generateDataTemplate } from '../templates/data-template.js'
import { generateI18nTemplates } from '../templates/i18n-template.js'

export async function generateModule(moduleName: string, basePath: string) {
  // Convert to kebab-case for folder names
  const kebabName = moduleName.toLowerCase().replace(/\s+/g, '-')
  
  // Convert to camelCase for code
  const camelName = kebabName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
  
  // Convert to PascalCase for components
  const pascalName = camelName.charAt(0).toUpperCase() + camelName.slice(1)
  
  // Convert to Title Case for display
  const titleName = moduleName
    .split(/[-\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  const modulePath = path.join(basePath, 'modules', kebabName)
  const pagePath = path.join(basePath, 'app', '[locale]', '(dashboard)', 'company', '[id]', kebabName)

  // Create module structure
  await createDirectory(path.join(modulePath, 'hooks'))
  await createDirectory(path.join(modulePath, 'lib'))
  await createDirectory(path.join(modulePath, 'types'))
  await createDirectory(path.join(modulePath, 'i18n'))
  await createDirectory(pagePath)

  // Generate files
  await generateModuleFiles(modulePath, { kebabName, camelName, pascalName, titleName })
  await generatePageFile(pagePath, { kebabName, camelName, pascalName, titleName })

  console.log(`✅ Module "${kebabName}" created at:`)
  console.log(`   - ${modulePath}`)
  console.log(`   - ${pagePath}`)
}

async function createDirectory(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

async function generateModuleFiles(
  modulePath: string,
  names: { kebabName: string; camelName: string; pascalName: string; titleName: string }
) {
  const { kebabName, camelName, pascalName, titleName } = names

  // Generate types
  await fs.writeFile(
    path.join(modulePath, 'types', 'index.ts'),
    generateTypesTemplate(pascalName)
  )

  // Generate data
  await fs.writeFile(
    path.join(modulePath, 'lib', 'data.ts'),
    generateDataTemplate(pascalName, camelName)
  )

  // Generate hook
  await fs.writeFile(
    path.join(modulePath, 'hooks', `use-${kebabName}.ts`),
    generateHookTemplate(pascalName, camelName)
  )

  // Generate module index
  await fs.writeFile(
    path.join(modulePath, 'index.ts'),
    generateModuleIndex(pascalName, camelName, kebabName)
  )

  // Generate i18n files
  const i18n = generateI18nTemplates(titleName, kebabName)
  await fs.writeFile(path.join(modulePath, 'i18n', 'en.json'), i18n.en)
  await fs.writeFile(path.join(modulePath, 'i18n', 'th.json'), i18n.th)
}

async function generatePageFile(
  pagePath: string,
  names: { kebabName: string; camelName: string; pascalName: string; titleName: string }
) {
  await fs.writeFile(
    path.join(pagePath, 'page.tsx'),
    generatePageTemplate(names)
  )
}
