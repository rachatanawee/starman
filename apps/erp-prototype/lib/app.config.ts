/**
 * Application Configuration
 * Centralized configuration for the entire application
 */

export const appConfig = {
  // Application Identity
  app: {
    defaultName: 'Starman ERP',
    defaultIcon: 'GitBranch',
    version: '1.0.0',
    buildNumber: '2026.01.15',
  },

  // Available Icons
  icons: [
    'GitBranch',
    'Star',
    'Zap',
    'Rocket',
    'Heart',
    'Sparkles',
    'Building2',
    'Settings',
    'Shield',
    'Globe',
  ] as const,

  // Theme Configuration
  themes: [
    { id: 'tangerine', name: 'Tangerine', file: 'tangerine.css', preview: 'oklch(0.65 0.25 30)' },
    { id: 'ocean-breeze', name: 'Ocean Breeze', file: 'ocean-breeze.css', preview: 'oklch(0.55 0.20 230)' },
    { id: 'claude', name: 'Claude', file: 'claude.css', preview: 'oklch(0.55 0.15 40)' },
    { id: 'forest-green', name: 'Forest Green', file: 'forest-green.css', preview: 'oklch(0.50 0.20 150)' },
    { id: 'royal-purple', name: 'Royal Purple', file: 'royal-purple.css', preview: 'oklch(0.50 0.25 290)' },
    { id: 'crimson-red', name: 'Crimson Red', file: 'crimson-red.css', preview: 'oklch(0.55 0.25 25)' },
    { id: 'clean-slate', name: 'Clean Slate', file: 'clean-slate.css', preview: 'oklch(0.45 0.02 240)' },
    { id: 'twitter', name: 'Twitter Blue', file: 'twitter.css', preview: 'oklch(0.55 0.20 240)' },
  ],

  // Authentication
  auth: {
    demoEmail: 'demo@erp.com',
    demoPassword: 'demo123',
    emailDomain: '@erp.com',
    sessionKey: 'auth_token',
  },

  // Storage Keys
  storage: {
    theme: 'selected_theme',
    appName: 'app_name',
    appIcon: 'app_icon',
    lastPage: 'last_page',
    lastCompany: 'last_company',
  },

  // UI Settings
  ui: {
    transitionDuration: 150, // ms
    sidebarWidth: 256, // px
    defaultRowHeight: 'md' as const,
  },

  // Feature Flags
  features: {
    aiInsights: true,
    multiLanguage: true,
    darkMode: false,
    exportData: true,
  },
} as const

export type AppConfig = typeof appConfig
export type ThemeId = typeof appConfig.themes[number]['id']
export type IconName = typeof appConfig.icons[number]
