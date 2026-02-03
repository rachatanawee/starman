# Creating a New Project from Spark Base

This guide explains how to create a new project using the **Modular Monolith + npx create** approach.

## Overview

**spark-base** is a Modular Monolith template that you can use to create new projects via `bunx @spark/create`.

### Architecture: Modular Monolith

- **Single application** with clear module boundaries
- **Shared infrastructure** (`shared/`, `core/`)
- **Domain modules** (`modules/sales/`, `modules/production/`, etc.)
- **No microservices complexity**
- **Easy to develop and deploy**

### Project Creation Strategy

```bash
# Create new project from template
bunx @spark/create my-erp-project

# This will:
# 1. Clone spark-base template
# 2. Set up project structure
# 3. Install dependencies
# 4. Ready to use!
```

## Directory Structure

```
my-erp-project/
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
├── modules/                    # Domain modules
│   ├── sales/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── production/
│   ├── inventory/
│   └── accounting/
│
├── lib/
│   ├── mock-data/
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

// Module-specific
import { QuotationForm } from '@/modules/sales/components/quotation-form'
import { ProductionOrder } from '@/modules/production/types'
```

## Step-by-Step: Create New Project

### 1. Create project using CLI (Future)

```bash
# This will be available once CLI is published
bunx @spark/create my-erp-project

cd my-erp-project
bun run dev
```

### 2. Manual Setup (Current)

```bash
# From workspace root
cp -r apps/spark-base apps/my-erp-project
cd apps/my-erp-project

# Update package.json
# Change name, version, port

# Install dependencies
bun install

# Start development
bun run dev
```

### 3. Customize for your needs

```bash
# Add your domain modules
mkdir -p modules/your-module/{components,lib,types}

# Add your pages
mkdir -p app/[locale]/(dashboard)/company/[id]/your-feature

# Customize shared components as needed
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

## Upgrading Spark Base

### Option 1: Manual Merge (Recommended)

```bash
# In your project
git remote add spark-base <spark-base-repo-url>
git fetch spark-base
git merge spark-base/main

# Resolve conflicts
# Test your application
```

### Option 2: CLI Upgrade (Future)

```bash
# This will be available once CLI is published
bunx @spark/cli upgrade

# This will:
# 1. Check for updates
# 2. Show what changed
# 3. Apply updates safely
# 4. Preserve your customizations
```

### Option 3: Copy Updated Files

```bash
# Copy specific updated files from spark-base
cp ../spark-base/shared/components/ui/button.tsx ./shared/components/ui/
cp ../spark-base/core/layout/project-layout.tsx ./core/layout/

# Test your application
```

## Adding New Modules

### Create Module Structure

```bash
mkdir -p modules/inventory/{components,lib,types}
```

### Example Module: Inventory

```
modules/inventory/
├── components/
│   ├── inventory-list.tsx
│   ├── inventory-form.tsx
│   └── stock-alert.tsx
├── lib/
│   ├── inventory-utils.ts
│   └── stock-calculations.ts
└── types/
    └── inventory.ts
```

### Module Component Example

```typescript
// modules/inventory/components/inventory-list.tsx
'use client'

import { DataGrid } from '@/shared/components/tablecn/data-grid/data-grid'
import { Button } from '@/shared/components/ui/button'
import { ProjectLayout } from '@/core/layout/project-layout'
import { PageTitle } from '@/core/layout/page-title'
import { useInventoryData } from '../lib/inventory-utils'

export function InventoryList() {
  const { data, columns } = useInventoryData()
  
  return (
    <div>
      <PageTitle title="Inventory" />
      <DataGrid data={data} columns={columns} />
    </div>
  )
}
```

## Benefits of This Approach

### ✅ Development
- Single codebase, easy to navigate
- Shared components, no duplication
- Fast hot reload
- IDE understands all references
- Clear module boundaries

### ✅ Maintenance
- Update components in one place
- Consistent versions
- Easy refactoring
- No dependency hell

### ✅ Deployment
- Single application to deploy
- No microservice complexity
- Easier scaling (vertical)
- Simple CI/CD

### ✅ Upgrades
- Pull updates from spark-base
- Merge changes safely
- Keep your customizations
- CLI tool for automation (future)

## Tailwind CSS

All components are local in your project, so Tailwind CSS works perfectly:

```typescript
// tailwind.config.ts
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... rest of config
};
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="My ERP System"
NEXT_PUBLIC_APP_ICON="Package"
```

## Publishing to Registry (GitLab)

### 1. Publish spark-base template

```bash
# In spark-base directory
npm version patch
npm publish --registry=https://your-gitlab.com/api/v4/projects/<project-id>/packages/npm/
```

### 2. Create CLI tool

```bash
# packages/spark-cli/
bunx @spark/create my-project
```

### 3. Users install from your registry

```bash
# .npmrc
@spark:registry=https://your-gitlab.com/api/v4/projects/<project-id>/packages/npm/

# Create project
bunx @spark/create my-erp-project
```

## Troubleshooting

### Layout issues
**Problem:** Sidebar not showing or content overflowing

**Solution:**
1. Check that `layout.tsx` in `company/[id]` returns `children` only
2. Each page should wrap content with `<ProjectLayout projectId={projectId}>`
3. Don't nest `ProjectLayout` components

### Import errors
**Problem:** Cannot find module

**Solution:**
1. Check `tsconfig.json` has correct path aliases
2. Verify file exists in correct location
3. Restart TypeScript server

### CSS not working
**Problem:** Components display without styling

**Solution:**
1. Check `tailwind.config.ts` scans all directories
2. Restart dev server
3. Clear `.next` cache

## Best Practices

1. **Follow module boundaries** - Don't import between modules
2. **Use shared/** for common code
3. **Use core/** for infrastructure
4. **Use modules/** for domain logic
5. **Keep components small and focused**
6. **Document your customizations**
7. **Test after upgrades**

## Summary

### Modular Monolith + npx create approach:

✅ **Single application** with clear boundaries
✅ **Easy to create** new projects (`bunx @spark/create`)
✅ **Easy to upgrade** (git merge or CLI tool)
✅ **All components local** (Tailwind CSS works perfectly)
✅ **No microservice complexity**
✅ **Fast development**
✅ **Simple deployment**

### What you get:

- Complete project structure
- All components ready to use
- Clear import patterns
- Module boundaries
- Easy customization
- Upgrade path
