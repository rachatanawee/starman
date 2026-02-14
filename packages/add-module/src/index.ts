#!/usr/bin/env node

import { Command } from 'commander'
import { generateModule } from './generators/module-generator.js'
import chalk from 'chalk'

const program = new Command()

program
  .name('spark-add-module')
  .description('Generate a new modular module for Spark Base')
  .version('1.0.0')

program
  .argument('<module-name>', 'Name of the module (e.g., purchases, customer)')
  .option('-p, --path <path>', 'Path to spark-base app', './apps/spark-base')
  .action(async (moduleName: string, options: { path: string }) => {
    try {
      console.log(chalk.blue('🚀 Generating module:'), chalk.bold(moduleName))
      await generateModule(moduleName, options.path)
      console.log(chalk.green('✅ Module generated successfully!'))
      console.log(chalk.gray('\nNext steps:'))
      console.log(chalk.gray('1. Add the module to your sidebar navigation'))
      console.log(chalk.gray('2. Update translations if needed'))
      console.log(chalk.gray('3. Customize the generated components'))
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error)
      process.exit(1)
    }
  })

program.parse()
