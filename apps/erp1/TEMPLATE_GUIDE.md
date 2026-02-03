# Template Configuration Guide

This application is designed as a reusable template for building business applications. This guide explains how to customize it for your specific needs.

## Quick Start

### 1. Application Configuration (`lib/app.config.ts`)

```typescript
export const appConfig = {
  app: {
    defaultName: 'Your App Name',    // Change this
    defaultIcon: 'Building2',         // Choose from available icons
    version: '1.0.0',
    buildNumber: '2024.01.01',
  },
  // ... more config
}
```

### 2. Theme Customization

**Available Themes:**
- Tangerine (Orange)
- Ocean Breeze (Blue)
- Claude (Brown)
- Forest Green
- Royal Purple
- Crimson Red
- Clean Slate (Gray)
- Twitter Blue

**Add Custom Theme:**
1. Create `/public/themes/your-theme.css`
2. Add to `appConfig.themes` array
3. Define CSS variables (see existing themes)

### 3. Mock Data Generation

```typescript
import { mockDataGenerator, generateTransactions } from '@/lib/mock-data'

// Generate 20 transactions
const data = generateTransactions(20)

// Custom generation
const customData = mockDataGenerator.array((i) => ({
  id: mockDataGenerator.id('custom'),
  name: mockDataGenerator.name('Item'),
  amount: mockDataGenerator.amount(1000, 50000),
  status: mockDataGenerator.status(['Active', 'Inactive']),
}), 10)
```

## File Structure

```
lib/
├── app.config.ts           # Central configuration
├── business-utils.ts       # Generic business utilities
├── mock-data/
│   ├── index.ts           # Export all mock utilities
│   ├── generator.ts       # Data generators
│   └── generic-data.ts    # Generic data types
├── settings-context.tsx   # Theme & settings state
└── common-exports.ts      # Barrel exports
```

## Removing ERP-Specific Code

### Files to Remove/Replace:
- `/lib/bom-data.ts` - BOM specific
- `/lib/production-order-data.ts` - Production specific
- `/lib/manufacturing-data.ts` - Manufacturing specific
- `/lib/accounting-data.ts` - Accounting specific

### Replace with Generic Data:
```typescript
// Instead of ERP-specific data
import { quotationData } from '@/lib/quotation-data'

// Use generic data
import { generateTransactions } from '@/lib/mock-data'
const transactions = generateTransactions(20)
```

## Business Utilities

### Status Management
```typescript
import { statusUtils } from '@/lib/business-utils'

const variant = statusUtils.getVariant('Completed') // 'default'
const color = statusUtils.getColor('Pending') // 'text-yellow-600'
```

### Formatting
```typescript
import { formatUtils } from '@/lib/business-utils'

formatUtils.currency(1000) // '฿1,000.00'
formatUtils.percentage(85.5) // '85.5%'
formatUtils.date('2024-01-01') // '1/1/2024'
```

### Filtering
```typescript
import { filterUtils } from '@/lib/business-utils'

filterUtils.matchesText('John Doe', 'john') // true
filterUtils.matchesDateRange('2024-01-15', '2024-01-01', '2024-01-31') // true
```

### Calculations
```typescript
import { calcUtils } from '@/lib/business-utils'

calcUtils.sum(items, 'amount') // Total amount
calcUtils.average(items, 'price') // Average price
calcUtils.percentage(50, 200) // 25
```

## Feature Flags

Enable/disable features in `app.config.ts`:

```typescript
features: {
  aiInsights: true,      // AI-powered insights
  multiLanguage: true,   // i18n support
  darkMode: false,       // Dark mode (not implemented)
  exportData: true,      // CSV/Excel export
}
```

## Storage Keys

Customize localStorage keys:

```typescript
storage: {
  theme: 'selected_theme',
  appName: 'app_name',
  appIcon: 'app_icon',
  lastPage: 'last_page',
  lastCompany: 'last_company',
}
```

## Authentication

Configure auth settings:

```typescript
auth: {
  demoEmail: 'demo@yourapp.com',
  demoPassword: 'demo123',
  emailDomain: '@yourapp.com',
  sessionKey: 'auth_token',
}
```

## Next Steps

1. **Customize branding** - Update app name, icon, colors
2. **Replace mock data** - Use generic generators or connect to API
3. **Remove unused modules** - Delete ERP-specific pages
4. **Add your modules** - Create new pages using existing patterns
5. **Update translations** - Modify `/messages/*.json` files

## Support

For questions or issues, refer to:
- Component documentation in `/components`
- Existing page implementations in `/app/[locale]/(dashboard)`
- README.md for feature overview
