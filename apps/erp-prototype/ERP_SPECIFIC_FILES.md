# ERP-Specific Files to Remove

This document lists files that contain ERP-specific business logic and should be removed or replaced when using this as a generic template.

## Mock Data Files (Remove/Replace)

### Sales Module
- `/lib/quotation-data.ts` - Quotation mock data
- `/lib/sales-order-data.ts` - Sales order mock data  
- `/lib/sales-invoice-data.ts` - Invoice mock data

### Production Module
- `/lib/bom-data.ts` - Bill of Materials data
- `/lib/production-order-data.ts` - Production order data
- `/lib/production-planning-data.ts` - Production planning data
- `/lib/manufacturing-data.ts` - Manufacturing execution data

### Reports Module
- `/lib/factory-capacity-data.ts` - Factory capacity reports
- `/lib/worker-allowance-data.ts` - Worker allowance data
- `/lib/wip-costing-data.ts` - WIP costing data
- `/lib/job-history-data.ts` - Job history data

### Accounting Module
- `/lib/accounting-data.ts` - Accounting integration data

### User Management
- `/lib/user-data.ts` - User management data (keep if needed)

## Page Files (Remove if not needed)

### Sales Pages
- `/app/[locale]/(dashboard)/company/[id]/quotation/` - Quotation management
- `/app/[locale]/(dashboard)/company/[id]/sales-order/` - Sales orders
- `/app/[locale]/(dashboard)/company/[id]/sales-invoice/` - Invoices

### Production Pages
- `/app/[locale]/(dashboard)/company/[id]/bom/` - Bill of Materials
- `/app/[locale]/(dashboard)/company/[id]/production-order/` - Production orders
- `/app/[locale]/(dashboard)/company/[id]/production-planning/` - Production planning
- `/app/[locale]/(dashboard)/company/[id]/manufacturing/` - Manufacturing execution
- `/app/[locale]/(dashboard)/company/[id]/mrp/` - Material Requirements Planning

### Reports Pages
- `/app/[locale]/(dashboard)/company/[id]/factory-capacity/` - Factory capacity
- `/app/[locale]/(dashboard)/company/[id]/worker-allowance/` - Worker allowance
- `/app/[locale]/(dashboard)/company/[id]/wip-costing/` - WIP costing
- `/app/[locale]/(dashboard)/company/[id]/job-history/` - Job history

### Accounting Pages
- `/app/[locale]/(dashboard)/company/[id]/accounting/` - Accounting integration

### Other Pages
- `/app/[locale]/(dashboard)/company/[id]/purchasing/` - Purchasing
- `/app/[locale]/(dashboard)/company/[id]/inventory/` - Inventory

## Components (Remove if not needed)

### ERP-Specific Components
- `/components/bom-tree-view.tsx` - BOM tree visualization
- `/components/operator-cockpit.tsx` - Manufacturing operator interface
- `/components/supervisor-dashboard.tsx` - Factory supervisor dashboard
- `/components/ai-insights-badge.tsx` - AI insights (keep if using AI features)

## Keep These (Generic/Reusable)

### Core Components
- `/components/project-layout.tsx` - Main layout wrapper
- `/components/page-title.tsx` - Page title component
- `/components/dynamic-title.tsx` - Dynamic document title
- `/components/theme-loader.tsx` - Theme loading system
- `/components/filter-panel.tsx` - Generic filter panel
- `/components/date-range-filter.tsx` - Date range picker
- `/components/feedback/` - Feedback components (undo, status)

### UI Components
- `/components/ui/*` - shadcn/ui components (keep all)
- `/components/tablecn/*` - Data grid components (keep all)

### Utilities
- `/lib/app.config.ts` - Configuration (keep & customize)
- `/lib/business-utils.ts` - Generic utilities (keep)
- `/lib/mock-data/*` - Generic mock data (keep)
- `/lib/settings-context.tsx` - Settings state (keep)
- `/lib/common-exports.ts` - Barrel exports (keep)

## Translation Files (Customize)

### Keep but modify:
- `/messages/en.json` - English translations
- `/messages/th.json` - Thai translations

Remove ERP-specific translation keys and add your own.

## Replacement Strategy

### Option 1: Clean Slate
```bash
# Remove all ERP-specific files
rm -rf app/[locale]/(dashboard)/company/[id]/quotation
rm -rf app/[locale]/(dashboard)/company/[id]/sales-order
# ... etc

# Remove mock data
rm lib/quotation-data.ts
rm lib/bom-data.ts
# ... etc
```

### Option 2: Keep as Examples
Keep the files as reference examples and create your own modules alongside them.

### Option 3: Gradual Migration
Replace one module at a time with your own business logic.

## After Removal

1. Update sidebar navigation in `/components/project-layout.tsx`
2. Update translations in `/messages/*.json`
3. Update README.md to reflect your application
4. Create your own pages using the generic patterns
5. Use `/lib/mock-data` generators for new mock data

## Generic Page Template

Use this pattern for new pages:

```typescript
import { ProjectLayout, PageTitle } from '@/lib/common-exports'
import { generateTransactions } from '@/lib/mock-data'
import { Icon } from 'lucide-react'

export default function YourPage() {
  const data = generateTransactions(20)
  
  return (
    <ProjectLayout projectId={projectId}>
      <PageTitle 
        icon={Icon}
        title="Your Page"
        subtitle="Description"
      />
      {/* Your content */}
    </ProjectLayout>
  )
}
```
