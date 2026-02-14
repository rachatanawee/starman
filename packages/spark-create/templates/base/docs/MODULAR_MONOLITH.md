# Spark Base - Modular Monolith Architecture

## Overview

Spark Base is now structured as a **Modular Monolith** - a single application organized into clear, domain-driven modules with shared infrastructure.

## Directory Structure

```
spark-base/
├── app/                        # Next.js App Router
│   └── [locale]/
│       └── (dashboard)/
│           └── company/[id]/
│
├── shared/                     # Shared across all modules
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── tablecn/           # DataGrid components
│   │   ├── filter-panel.tsx
│   │   ├── date-range-filter.tsx
│   │   └── calendar-date-picker.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── business-utils.ts
│   └── hooks/
│
├── core/                       # Core infrastructure
│   ├── layout/
│   │   ├── project-layout.tsx
│   │   ├── project-sidebar.tsx
│   │   ├── page-title.tsx
│   │   ├── breadcrumbs.tsx
│   │   └── dynamic-title.tsx
│   ├── settings/
│   │   └── settings-context.tsx
│   └── auth/
│
├── modules/                    # Domain modules (to be added)
│   ├── sales/
│   ├── production/
│   ├── inventory/
│   └── accounting/
│
├── lib/
│   ├── mock-data/             # Mock data
│   ├── app.config.ts
│   └── common-exports.ts
│
└── messages/                   # i18n translations
```

## Import Patterns

### ✅ Correct Imports

```typescript
// Shared components
import { DataGrid } from '@/shared/components/tablecn/data-grid/data-grid'
import { Button } from '@/shared/components/ui/button'
import { FilterPanel } from '@/shared/components/filter-panel'

// Core infrastructure
import { ProjectLayout } from '@/core/layout/project-layout'
import { PageTitle } from '@/core/layout/page-title'
import { useSettings } from '@/core/settings/settings-context'

// Shared utilities
import { cn } from '@/shared/lib/utils'
import { formatCurrency } from '@/shared/lib/business-utils'

// Module-specific (when modules are added)
import { QuotationForm } from '@/modules/sales/components/quotation-form'
```

### ❌ Old Imports (to be updated)

```typescript
// Old
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { ProjectLayout } from '@/components/project-layout'
import { cn } from '@/lib/utils'
```

## Module Boundaries

### Allowed Dependencies

```
modules/sales/
  ✅ Can import from: shared/, core/, lib/
  ❌ Cannot import from: modules/production/, modules/inventory/

modules/production/
  ✅ Can import from: shared/, core/, lib/
  ❌ Cannot import from: modules/sales/, modules/inventory/
```

### Cross-Module Communication

If modules need to communicate:
1. Move shared logic to `shared/`
2. Use events/hooks in `shared/hooks/`
3. Use shared types in `shared/types/`

## Benefits

### ✅ Development
- Single codebase, easy to navigate
- Shared components, no duplication
- Fast hot reload
- IDE understands all references

### ✅ Maintenance
- Update components in one place
- Consistent versions
- Easy refactoring
- Clear module boundaries

### ✅ Deployment
- Single application to deploy
- No microservice complexity
- Easier scaling (vertical)

## Migration Status

### ✅ Completed
- [x] Created modular structure
- [x] Moved shared components to `shared/`
- [x] Moved core layout to `core/`
- [x] Updated tsconfig paths
- [x] Updated all imports in pages
- [x] Updated common-exports.ts
- [x] Updated layout.tsx imports
- [x] Fixed all import paths
- [x] Build successful

### 📋 Todo
- [ ] Test all pages work in development
- [ ] Add module structure (sales, production, etc.)
- [ ] Create module documentation
- [ ] Add module boundaries linting

## Next Steps

1. Update imports in all page files
2. Update `lib/common-exports.ts`
3. Test application
4. Add domain modules
5. Create CLI tool for project creation

## CLI Tool (Future)

```bash
# Create new project from this template
bunx @spark/create my-erp-project

# Upgrade existing project
bunx @spark/cli upgrade

# Add module to existing project
bunx @spark/cli add-module inventory
```
