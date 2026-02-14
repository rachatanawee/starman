# Base Template Files

## What to Keep in spark-base

### Core Pages (from erp-prototype)
```
app/[locale]/
├── (auth)/
│   └── login/                    # ✅ Keep
├── (dashboard)/
│   └── company/[id]/
│       ├── settings/             # ✅ Keep
│       ├── users/                # ✅ Keep  
│       ├── dashboard/            # ✅ Keep (simplify)
│       ├── ui-patterns/          # ✅ Keep
│       └── template-demo/        # ✅ Keep (2-3 demo pages)
```

### Components to Keep
- ✅ project-layout.tsx
- ✅ project-sidebar.tsx (simplified menu)
- ✅ page-title.tsx
- ✅ theme-loader.tsx
- ✅ filter-panel.tsx
- ✅ date-range-filter.tsx

### Mock Data to Keep
- ✅ mock-data/projects.ts
- ✅ mock-data/user-data.ts
- ✅ Use generic-data from core for demos

### What to REMOVE from Base

#### Pages (ERP-specific)
- ❌ quotation/
- ❌ sales-order/
- ❌ invoice/
- ❌ production-order/
- ❌ production-planning/
- ❌ manufacturing/
- ❌ bom/
- ❌ wip-costing/
- ❌ accounting/
- ❌ purchasing/
- ❌ mrp/
- ❌ inventory/
- ❌ worker-allowance/
- ❌ job-history/
- ❌ factory-capacity/
- ❌ reports/

#### Components (ERP-specific)
- ❌ ai-insights-badge.tsx
- ❌ bom-dialog.tsx
- ❌ bom-tree-view.tsx
- ❌ production-order-card.tsx

#### Mock Data (ERP-specific)
- ❌ mock-data/sales.ts
- ❌ mock-data/production-*.ts
- ❌ mock-data/accounting-data.ts
- ❌ mock-data/bom-data.ts
- ❌ mock-data/wip-costing-data.ts
- ❌ mock-data/purchasing-data.ts
- ❌ mock-data/mrp-data.ts
- ❌ mock-data/manufacturing-data.ts
- ❌ mock-data/inventory-data.ts
- ❌ mock-data/worker-allowance-data.ts
- ❌ mock-data/job-history-data.ts
- ❌ mock-data/factory-capacity-data.ts

#### i18n (ERP-specific keys)
- ❌ Remove all ERP translation keys
- ✅ Keep only: common, settings, users, dashboard

## Simplified Sidebar for Base

```typescript
// Base template sidebar
const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Star, label: 'UI Patterns', path: '/ui-patterns' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]
```

## Demo Pages for Base

Keep 2-3 simple demo pages:
1. **Products Demo** - Simple CRUD with DataGrid
2. **Orders Demo** - List with filters
3. **Reports Demo** - Simple charts

Use `generateTransactions()` and `generateItems()` from core.
