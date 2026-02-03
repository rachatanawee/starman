import prompts from 'prompts'
import chalk from 'chalk'
import ora from 'ora'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execa } from 'execa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface CreateOptions {
  template: string
  port: string
  modules?: string
}

export async function create(projectName?: string, options?: CreateOptions) {
  console.log(chalk.bold.cyan('\n✨ Create Spark Project\n'))

  // Prompt for project name if not provided
  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-spark-project',
      validate: (value) => {
        if (!value) return 'Project name is required'
        if (!/^[a-z0-9-]+$/.test(value)) {
          return 'Project name can only contain lowercase letters, numbers, and hyphens'
        }
        return true
      },
    })

    if (!response.projectName) {
      console.log(chalk.red('\n✖ Project creation cancelled'))
      process.exit(1)
    }

    projectName = response.projectName
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  // Check if directory already exists
  if (fs.existsSync(targetDir)) {
    const response = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory ${chalk.cyan(projectName)} already exists. Overwrite?`,
      initial: false,
    })

    if (!response.overwrite) {
      console.log(chalk.red('\n✖ Project creation cancelled'))
      process.exit(1)
    }

    await fs.remove(targetDir)
  }

  // Prompt for port
  const portResponse = await prompts({
    type: 'number',
    name: 'port',
    message: 'Development server port?',
    initial: parseInt(options?.port || '3100'),
  })

  const port = portResponse.port || 3100

  // Prompt for modules
  const modulesResponse = await prompts({
    type: 'multiselect',
    name: 'modules',
    message: 'Select modules to install:',
    choices: [
      { title: 'Manufacturing', value: 'manufacturing', description: 'BOM, Production Order, MRP, Manufacturing', selected: false },
      { title: 'Sales & Purchasing', value: 'sales', description: 'Quotation, Sales Order, Invoice, Purchasing', selected: false },
      { title: 'Inventory', value: 'inventory', description: 'Inventory Management & Warehouse', selected: false },
      { title: 'Accounting', value: 'accounting', description: 'Accounting & WIP Costing', selected: false },
      { title: 'Factory Operations', value: 'factory-ops', description: 'Factory Capacity, Job History, Worker Allowance', selected: false },
    ],
    hint: 'Space to select, Enter to confirm',
  })

  const selectedModules = modulesResponse.modules || []

  const spinner = ora('Creating project...').start()

  try {
    // Find spark-base template
    const templateDir = path.resolve(__dirname, '../templates/base')

    if (!fs.existsSync(templateDir)) {
      throw new Error('spark-base template not found')
    }

    // Copy template
    spinner.text = 'Copying template files...'
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        const relativePath = path.relative(templateDir, src)
        // Exclude node_modules, .next, and other build artifacts
        return !relativePath.includes('node_modules') &&
               !relativePath.includes('.next') &&
               !relativePath.includes('dist') &&
               !relativePath.includes('.turbo')
      },
    })

    // Update package.json
    spinner.text = 'Updating package.json...'
    const packageJsonPath = path.join(targetDir, 'package.json')
    const packageJson = await fs.readJson(packageJsonPath)
    packageJson.name = projectName
    packageJson.version = '0.1.0'
    packageJson.scripts.dev = `next dev -p ${port}`
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })

    // Update .env.local
    spinner.text = 'Creating .env.local...'
    const envPath = path.join(targetDir, '.env.local')
    const envContent = `NEXT_PUBLIC_APP_NAME="${projectName}"
NEXT_PUBLIC_APP_ICON="Rocket"
`
    await fs.writeFile(envPath, envContent)

    // Create modules config
    if (selectedModules.length > 0) {
      spinner.text = 'Creating modules config...'
      const modulesConfigPath = path.join(targetDir, 'lib/modules.config.ts')
      const modulesConfig = `// Auto-generated modules configuration
// This file is created by @spark/create based on selected modules

export const installedModules = {
  manufacturing: ${selectedModules.includes('manufacturing')},
  sales: ${selectedModules.includes('sales')},
  inventory: ${selectedModules.includes('inventory')},
  accounting: ${selectedModules.includes('accounting')},
  factoryOps: ${selectedModules.includes('factory-ops')},
} as const

export type ModuleName = keyof typeof installedModules

export function isModuleInstalled(module: ModuleName): boolean {
  return installedModules[module]
}
`
      await fs.writeFile(modulesConfigPath, modulesConfig)
    } else {
      // Create empty config if no modules selected
      const modulesConfigPath = path.join(targetDir, 'lib/modules.config.ts')
      const modulesConfig = `// Auto-generated modules configuration
// No modules installed

export const installedModules = {
  manufacturing: false,
  sales: false,
  inventory: false,
  accounting: false,
  factoryOps: false,
} as const

export type ModuleName = keyof typeof installedModules

export function isModuleInstalled(module: ModuleName): boolean {
  return installedModules[module]
}
`
      await fs.writeFile(modulesConfigPath, modulesConfig)
    }

    // Copy selected modules
    if (selectedModules.length > 0) {
      spinner.text = 'Installing selected modules...'
      
      // Always copy common files if any module is selected
      const commonTemplateDir = path.resolve(__dirname, '../templates/common')
      if (fs.existsSync(commonTemplateDir)) {
        // Copy common components
        const commonComponentsDir = path.join(commonTemplateDir, 'components')
        const targetCommonComponentsDir = path.join(targetDir, 'modules/common/components')
        await fs.ensureDir(targetCommonComponentsDir)
        await fs.copy(commonComponentsDir, targetCommonComponentsDir)

        // Copy common lib (sidebar-config.ts)
        const commonLibDir = path.join(commonTemplateDir, 'lib')
        const targetCommonLibDir = path.join(targetDir, 'modules/common/lib')
        await fs.ensureDir(targetCommonLibDir)
        await fs.copy(commonLibDir, targetCommonLibDir)

        // Copy common app files (dashboard, settings, ui-patterns, company page)
        const commonAppDir = path.join(commonTemplateDir, 'app')
        const targetCompanyIdDir = path.join(targetDir, 'app/[locale]/(dashboard)/company/[id]')
        await fs.ensureDir(targetCompanyIdDir)
        
        // Copy dashboard, settings, ui-patterns to [id] folder
        const commonAppItems = ['dashboard', 'settings', 'ui-patterns']
        for (const item of commonAppItems) {
          const srcPath = path.join(commonAppDir, item)
          const destPath = path.join(targetCompanyIdDir, item)
          if (fs.existsSync(srcPath)) {
            await fs.copy(srcPath, destPath)
          }
        }
        
        // Copy company page and new to company folder
        const targetCompanyDir = path.join(targetDir, 'app/[locale]/(dashboard)/company')
        await fs.ensureDir(targetCompanyDir)
        const companyFiles = ['page.tsx', 'new', 'layout.tsx']
        for (const file of companyFiles) {
          const srcPath = path.join(commonAppDir, file)
          const destPath = path.join(targetCompanyDir, file)
          if (fs.existsSync(srcPath)) {
            await fs.copy(srcPath, destPath)
          }
        }

        // Copy common mock data
        const commonMockDataDir = path.join(commonTemplateDir, 'lib/mock-data')
        const targetCommonMockDataDir = path.join(targetDir, 'modules/common/lib/mock-data')
        await fs.ensureDir(targetCommonMockDataDir)
        await fs.copy(commonMockDataDir, targetCommonMockDataDir)
      }

      // Copy each selected module
      for (const moduleName of selectedModules) {
        spinner.text = `Installing ${moduleName} module...`
        const moduleTemplateDir = path.resolve(__dirname, `../templates/modules/${moduleName}`)
        
        if (fs.existsSync(moduleTemplateDir)) {
          // Copy module components
          const moduleComponentsDir = path.join(moduleTemplateDir, 'components')
          if (fs.existsSync(moduleComponentsDir)) {
            const targetModuleComponentsDir = path.join(targetDir, `modules/${moduleName}/components`)
            await fs.ensureDir(targetModuleComponentsDir)
            await fs.copy(moduleComponentsDir, targetModuleComponentsDir)
          }

          // Copy module app files
          const moduleAppDir = path.join(moduleTemplateDir, 'app')
          if (fs.existsSync(moduleAppDir)) {
            const targetModuleAppDir = path.join(targetDir, 'app/[locale]/(dashboard)/company/[id]')
            await fs.ensureDir(targetModuleAppDir)
            await fs.copy(moduleAppDir, targetModuleAppDir)
          }

          // Copy module mock data
          const moduleMockDataDir = path.join(moduleTemplateDir, 'lib/mock-data')
          if (fs.existsSync(moduleMockDataDir)) {
            const targetModuleMockDataDir = path.join(targetDir, `modules/${moduleName}/lib/mock-data`)
            await fs.ensureDir(targetModuleMockDataDir)
            await fs.copy(moduleMockDataDir, targetModuleMockDataDir)
          }
        }
      }

      spinner.text = 'Modules installed'
    }

    // Install dependencies
    spinner.text = 'Installing dependencies with bun...'
    await execa('bun', ['install'], {
      cwd: targetDir,
      stdio: 'pipe',
    })

    spinner.succeed(chalk.green('Project created successfully!'))

    // Show next steps
    console.log(chalk.bold('\n📦 Next steps:\n'))
    console.log(chalk.cyan(`  cd ${projectName}`))
    console.log(chalk.cyan('  bun run dev'))
    console.log(chalk.dim(`\n  Your app will be running on http://localhost:${port}\n`))

    if (selectedModules.length > 0) {
      console.log(chalk.bold('📊 Installed Modules:\n'))
      
      const moduleDescriptions: Record<string, string[]> = {
        'manufacturing': ['BOM', 'Production Order', 'Production Planning', 'MRP', 'Manufacturing'],
        'sales': ['Quotation', 'Sales Order', 'Sales Invoice', 'Purchasing'],
        'inventory': ['Inventory Management'],
        'accounting': ['Accounting', 'WIP Costing'],
        'factory-ops': ['Factory Capacity', 'Job History', 'Worker Allowance'],
      }

      for (const moduleName of selectedModules) {
        const features = moduleDescriptions[moduleName] || []
        console.log(chalk.yellow(`  • ${moduleName}:`), chalk.dim(features.join(', ')))
      }
      
      console.log(chalk.dim('\n  Check /company route for implementation\n'))
    }

    console.log(chalk.bold('📚 Documentation:\n'))
    console.log(chalk.dim('  • MODULAR_MONOLITH.md - Architecture guide'))
    console.log(chalk.dim('  • BASE_TEMPLATE_FILES.md - Template structure'))
    console.log(chalk.dim('  • TROUBLESHOOTING.md - Common issues\n'))

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'))
    console.error(chalk.red('\nError:'), error)
    process.exit(1)
  }
}
