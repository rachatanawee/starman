#!/usr/bin/env node

import { Command } from 'commander'
import { create } from './commands/create.js'

const program = new Command()

program
  .name('@spark/create')
  .description('Create a new Spark project from template')
  .version('0.1.0')

program
  .argument('[project-name]', 'Name of the project to create')
  .option('-t, --template <template>', 'Template to use (spark-base)', 'spark-base')
  .option('-p, --port <port>', 'Development server port', '3100')
  .action(create)

program.parse()
