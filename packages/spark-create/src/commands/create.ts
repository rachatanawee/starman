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

  const spinner = ora('Creating project...').start()

  try {
    // Find spark-base template
    const templateDir = path.resolve(__dirname, '../../../../apps/spark-base')

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
