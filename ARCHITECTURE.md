# Spark Template Architecture

## Structure

```
starman/
├── packages/
│   └── spark-core/              # 🔧 Core utilities (shared)
│       ├── lib/
│       │   ├── app.config.ts
│       │   ├── business-utils.ts
│       │   └── mock-data/
│       │       ├── generator.ts
│       │       └── generic-data.ts
│       ├── components/
│       │   ├── ui/              # shadcn components
│       │   └── tablecn/         # DataGrid
│       └── package.json
│
├── apps/
│   ├── spark-base/              # 📦 Base Template
│   │   ├── app/
│   │   │   └── [locale]/(dashboard)/company/[id]/
│   │   │       ├── settings/
│   │   │       ├── users/
│   │   │       ├── dashboard/
│   │   │       └── ui-patterns/
│   │   └── package.json
│   │
│   └── erp-prototype/           # 🏭 ERP Full (existing)
│       └── (all current files)
│
└── packages/
    └── create-spark-app/        # 🚀 CLI (future)
        └── templates/
            ├── base/
            └── erp/
```

## Layers

### 1. Core (spark-core)
**Shared by all templates**
- Configuration system
- Business utilities
- Mock data generators
- UI components (shadcn + tablecn)
- Theme system
- i18n setup

### 2. Base Template (spark-base)
**Minimal starter**
- Settings (theme, app name, icon)
- User Management
- Simple Dashboard
- UI Patterns Demo
- 2-3 sample pages

### 3. ERP Template (erp-prototype)
**Full ERP system**
- Base + All ERP modules
- Sales, Production, Accounting, etc.

## Migration Plan

### Phase 1: Extract Core ✅
- Move shared utilities to spark-core
- Move UI components to spark-core
- Setup package.json

### Phase 2: Create Base Template
- Copy erp-prototype → spark-base
- Remove ERP-specific files
- Keep only base features
- Link to spark-core

### Phase 3: Update ERP
- Link erp-prototype to spark-core
- Remove duplicated core files

### Phase 4: CLI Package
- Create create-spark-app
- Add template selection
- Publish to GitLab Registry
