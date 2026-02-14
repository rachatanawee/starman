import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import path from 'path'
import fs from 'fs/promises'

const locales = ['en', 'th']

async function loadModuleMessages(locale: string) {
  const moduleMessages: Record<string, any> = {}
  
  try {
    // Use __dirname or relative path from project root
    const modulesDir = path.join(process.cwd(), 'modules')
    
    console.log('🔍 Looking for modules in:', modulesDir)
    
    // Check if modules directory exists
    try {
      await fs.access(modulesDir)
    } catch {
      console.warn('⚠️ Modules directory not found:', modulesDir)
      return moduleMessages
    }
    
    // Read all module directories
    const moduleDirs = await fs.readdir(modulesDir, { withFileTypes: true })
    
    console.log('📁 Found module directories:', moduleDirs.map(d => d.name))
    
    // Load messages from each module's i18n folder
    for (const dir of moduleDirs) {
      if (!dir.isDirectory()) continue
      
      const messageFile = path.join(modulesDir, dir.name, 'i18n', `${locale}.json`)
      
      console.log('🔍 Trying to load:', messageFile)
      
      try {
        const content = await fs.readFile(messageFile, 'utf-8')
        const messages = JSON.parse(content)
        
        // Convert module folder name to camelCase (e.g., sales-order -> salesOrder)
        const moduleKey = dir.name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        
        moduleMessages[moduleKey] = messages
        console.log('✅ Loaded messages for module:', moduleKey)
      } catch (error) {
        console.warn('⚠️ Failed to load message file:', messageFile, error)
        // Skip if message file doesn't exist for this module
        continue
      }
    }
  } catch (error) {
    console.warn('Failed to load module messages:', error)
  }
  
  return moduleMessages
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  
  if (!locale || !locales.includes(locale)) notFound()

  // Load core messages
  const coreMessages = (await import(`./messages/${locale}.json`)).default
  
  // Load module messages
  const moduleMessages = await loadModuleMessages(locale)
  
  console.log('🌐 Loaded module messages:', Object.keys(moduleMessages))
  console.log('🌐 Assets messages loaded:', !!moduleMessages.assets)
  
  // Merge core and module messages
  const messages = {
    ...coreMessages,
    ...moduleMessages
  }

  return {
    locale,
    messages
  }
})
