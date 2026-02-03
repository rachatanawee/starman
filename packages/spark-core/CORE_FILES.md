# Core Files to Extract

## From erp-prototype/lib/ → spark-core/lib/

### Configuration & Utilities
- [x] app.config.ts
- [x] business-utils.ts
- [x] common-exports.ts
- [x] settings-context.tsx

### Mock Data System
- [x] mock-data/generator.ts
- [x] mock-data/generic-data.ts
- [x] mock-data/index.ts (partial - only generic exports)

### NOT included (ERP-specific):
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
- ❌ mock-data/projects.ts
- ❌ mock-data/user-data.ts

## From erp-prototype/components/ → spark-core/components/

### UI Components (shadcn)
- [x] ui/* (all shadcn components)

### Data Grid
- [x] tablecn/* (entire DataGrid system)

### Core Components
- [x] project-layout.tsx
- [x] project-sidebar.tsx
- [x] page-title.tsx
- [x] theme-loader.tsx
- [x] filter-panel.tsx
- [x] date-range-filter.tsx

### NOT included (ERP-specific):
- ❌ ai-insights-badge.tsx
- ❌ bom-dialog.tsx
- ❌ bom-tree-view.tsx
- ❌ production-order-card.tsx
- ❌ (any other domain-specific components)

## From erp-prototype/public/

### Themes
- [x] public/themes/*.css (all 8 themes)

## From erp-prototype/messages/

### i18n
- [x] messages/en.json (base keys only)
- [x] messages/th.json (base keys only)

## Next Steps

1. Copy core files to spark-core
2. Update imports in spark-core
3. Create spark-base from erp-prototype
4. Remove ERP-specific files from spark-base
5. Update erp-prototype to use spark-core
