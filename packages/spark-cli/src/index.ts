#!/usr/bin/env node

import { Command } from 'commander'
import { add } from './commands/add.js'
import { init } from './commands/init.js'

const program = new Command()

program
  .name('spark')
  .description('CLI tool for Spark components')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize Spark in your project')
  .action(init)

program
  .command('add')
  .description('Add Spark components to your project')
  .argument('[components...]', 'Components to add (e.g., ui, tablecn, all)')
  .action(add)

program.parse()
