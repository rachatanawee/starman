# Creating a New Project from Spark Base

This guide explains how to create a new project using `spark-base` as the template.

## Overview

- **spark-base**: The base template with all core components
- **@spark/core**: Shared package for layout components (ProjectLayout, PageTitle, etc.)
- **New Project**: Your customized application

## Step-by-Step Guide

### 1. Copy spark-base to create new project

```bash
# From workspace root
cp -r apps/spark-base apps/your-project-name
cd apps/your-project-name
```

### 2. Update package.json

```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3300",  // Change port
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@spark/core": "workspace:*",
    // ... other dependencies
  }
}
```

### 3. Install dependencies

```bash
bun install
```

### 4. Copy UI Components and tablecn (Required for Tailwind CSS)

**Why?** Tailwind CSS doesn't scan `node_modules` by default, so components from `@spark/core` won't have their CSS classes generated.

```bash
# From workspace root
cd apps/your-project-name

# Copy UI components
cp -r ../spark-base/components/ui ./components/

# Copy tablecn (DataGrid and related components)
cp -r ../spark-base/components/tablecn ./components/

# Copy other shared components (optional, if you want to customize them)
cp ../spark-base/components/breadcrumbs.tsx ./components/
cp ../spark-base/components/calendar-date-picker.tsx ./components/
cp ../spark-base/components/date-range-filter.tsx ./components/
cp ../spark-base/components/dynamic-title.tsx ./components/
cp ../spark-base/components/filter-panel.tsx ./components/
cp ../spark-base/components/mobile-menu.tsx ./components/
cp ../spark-base/components/page-title.tsx ./components/
cp ../spark-base/components/page-tracker.tsx ./components/
cp ../spark-base/components/page-transition.tsx ./components/
cp ../spark-base/components/project-layout.tsx ./components/
cp ../spark-base/components/project-sidebar.tsx ./components/
cp ../spark-base/components/project-switcher.tsx ./components/
cp ../spark-base/components/quick-search.tsx ./components/
cp ../spark-base/components/settings-aware-title.tsx ./components/
cp ../spark-base/components/theme-loader.tsx ./components/
```

### 5. Update imports in your files

Replace imports from `@spark/core` to local components:

**Before:**
```typescript
import { DataGrid } from '@spark/core'
import { Button } from '@spark/core'
import { Card } from '@spark/core'
```

**After:**
```typescript
import { DataGrid } from '@/components/tablecn/data-grid/data-grid'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

**Keep these from @spark/core:**
```typescript
// Layout components can stay in @spark/core
import { ProjectLayout, PageTitle, Breadcrumbs, DynamicTitle } from '@spark/core'
import { FilterPanel, DateRangeFilter } from '@spark/core'
```

### 6. Update tailwind.config.ts

Make sure Tailwind scans your local components:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Optional: scan @spark/core if you keep some components there
    "./node_modules/@spark/core/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
};
export default config;
```

### 7. Update common-exports.ts

```typescript
// apps/your-project-name/lib/common-exports.ts

// Layout components from @spark/core
export { ProjectLayout, PageTitle, Breadcrumbs, DynamicTitle } from '@spark/core'

// UI components from local
export { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
export { Button } from '@/components/ui/button'
export { Badge } from '@/components/ui/badge'
export { Input } from '@/components/ui/input'

// Common hooks
export { useParams, useRouter } from 'next/navigation'
export { useTranslations } from 'next-intl'
export { useState, useMemo, useEffect } from 'react'
```

### 8. Update environment variables

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_ICON="GitBranch"
```

### 9. Start development server

```bash
bun run dev
```

## Quick Setup Script

Create a script to automate the setup:

```bash
#!/bin/bash
# setup-new-project.sh

PROJECT_NAME=$1
PORT=$2

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: ./setup-new-project.sh <project-name> <port>"
  exit 1
fi

echo "Creating new project: $PROJECT_NAME"

# Copy spark-base
cp -r apps/spark-base apps/$PROJECT_NAME

cd apps/$PROJECT_NAME

# Copy components
cp -r ../spark-base/components/ui ./components/
cp -r ../spark-base/components/tablecn ./components/

# Update package.json name and port
sed -i '' "s/\"spark-base\"/\"$PROJECT_NAME\"/" package.json
sed -i '' "s/3100/$PORT/" package.json

# Install dependencies
bun install

echo "✓ Project created: apps/$PROJECT_NAME"
echo "✓ Next steps:"
echo "  1. cd apps/$PROJECT_NAME"
echo "  2. Update imports from @spark/core to local components"
echo "  3. bun run dev"
```

Usage:
```bash
chmod +x setup-new-project.sh
./setup-new-project.sh my-new-app 3400
```

## Import Strategy

### Option 1: Use Local Components (Recommended)
- Copy all components to your project
- Import from `@/components/...`
- Full control and customization
- Tailwind CSS works perfectly

### Option 2: Mix of @spark/core and Local
- Keep layout components in `@spark/core`
- Copy UI and tablecn to local
- Import UI from `@/components/ui/...`
- Import tablecn from `@/components/tablecn/...`
- Import layout from `@spark/core`

### Option 3: All from @spark/core (Not Recommended)
- Import everything from `@spark/core`
- Must configure Tailwind to scan `node_modules/@spark/core`
- May have CSS issues
- Less flexibility for customization

## Troubleshooting

### CSS not working for DataGrid
**Problem:** DataGrid displays without proper styling

**Solution:** 
1. Copy `components/tablecn` to your project
2. Update imports to use `@/components/tablecn/...`
3. Restart dev server

### Layout issues (sidebar missing, content overflow)
**Problem:** Sidebar not showing or content overflowing

**Solution:**
1. Check that `layout.tsx` in `company/[id]` returns `children` only
2. Each page should wrap content with `<ProjectLayout projectId={projectId}>`
3. Don't nest `ProjectLayout` components

### Components not found
**Problem:** Import errors for components

**Solution:**
1. Make sure you copied all required components
2. Check import paths match your file structure
3. Verify `components.json` aliases are correct

## Best Practices

1. **Always copy UI and tablecn components** to your project for Tailwind CSS compatibility
2. **Use common-exports.ts** to centralize imports and make refactoring easier
3. **Keep layout components in @spark/core** for consistency across projects
4. **Customize copied components** as needed for your specific requirements
5. **Document your customizations** to track changes from spark-base

## File Structure

```
apps/your-project-name/
├── app/
│   ├── [locale]/
│   │   ├── (dashboard)/
│   │   │   └── company/
│   │   │       └── [id]/
│   │   │           ├── layout.tsx          # Returns children only
│   │   │           └── your-page/
│   │   │               └── page.tsx        # Wraps with ProjectLayout
│   │   └── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                                 # Copied from spark-base
│   ├── tablecn/                            # Copied from spark-base
│   └── your-custom-components.tsx
├── lib/
│   ├── common-exports.ts                   # Centralized imports
│   └── mock-data/
├── messages/
│   ├── en.json
│   └── th.json
├── public/
├── .env.local
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Summary

**Yes, you need to copy DataGrid (tablecn) and UI components** to your project because:
1. Tailwind CSS doesn't scan `node_modules` by default
2. You get full control to customize components
3. CSS classes are properly generated
4. Better development experience

The recommended approach is:
- ✅ Copy `ui` and `tablecn` to local
- ✅ Import from `@/components/...`
- ✅ Keep layout components in `@spark/core` (optional)
- ✅ Use `common-exports.ts` for easy refactoring
