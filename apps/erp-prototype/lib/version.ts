import { readFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

export function getAppVersion() {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
    )
    
    let gitHash = 'dev'
    try {
      gitHash = execSync('git rev-parse --short HEAD').toString().trim()
    } catch {
      // Git not available or not a git repo
    }
    
    return {
      version: packageJson.version,
      hash: gitHash,
      full: `v${packageJson.version}-${gitHash}`
    }
  } catch {
    return {
      version: '0.1.0',
      hash: 'dev',
      full: 'v0.1.0-dev'
    }
  }
}
