# @starman/spark-core

Core utilities and components for Spark templates.

## What's Included

### Configuration
- `lib/app.config.ts` - Centralized app configuration
- `lib/settings-context.tsx` - Theme & settings state management

### Utilities
- `lib/business-utils.ts` - Generic business utilities (format, calc, status)
- `lib/common-exports.ts` - Barrel exports for convenience

### Mock Data System
- `lib/mock-data/generator.ts` - Generic data generators
- `lib/mock-data/generic-data.ts` - Generic types & generators

### UI Components
- `components/ui/*` - shadcn/ui components
- `components/tablecn/*` - DataGrid system
- `components/project-layout.tsx` - Main layout
- `components/page-title.tsx` - Page headers
- `components/theme-loader.tsx` - Dynamic theming
- `components/filter-panel.tsx` - Generic filter component

### Themes
- 8 pre-built color themes (OKLCH-based)

## Usage

```typescript
// In your app's package.json
{
  "dependencies": {
    "@starman/spark-core": "workspace:*"
  }
}

// Import in your app
import { appConfig } from '@starman/spark-core/lib/app.config'
import { formatUtils } from '@starman/spark-core/lib/business-utils'
import { Button } from '@starman/spark-core/components/ui/button'
```

## Not Included

This package does NOT include:
- Domain-specific mock data (sales, production, etc.)
- Domain-specific components (AI badges, BOM dialogs, etc.)
- Application pages
- Routing logic

Those belong in the specific template (base or erp).
