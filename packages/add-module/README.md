# @spark/add-module

CLI tool to generate modular modules for Spark Base applications with DataGrid support.

## Installation

```bash
cd packages/add-module
bun install
bun run build
```

## Usage

### Generate a new module

```bash
# From packages/add-module directory
bun run src/index.ts purchases --path ../../apps/spark-base

# Or after building
node dist/index.js customer --path ../../apps/spark-base
```

### What it generates

The CLI will create a complete module with DataGrid following the sales-order pattern:

1. **Module structure** in `modules/{module-name}/`:
   - `hooks/` - Custom React hooks (use-{module-name}.ts)
   - `lib/` - Mock data
   - `types/` - TypeScript type definitions
   - `i18n/` - Translation files (en.json, th.json)
   - `index.ts` - Module exports

2. **Page** in `app/[locale]/(dashboard)/company/[id]/{module-name}/`:
   - `page.tsx` - Full-featured page with:
     - DataGrid with sorting, filtering, row height controls
     - FilterPanel with search and status filters
     - Stats cards
     - Responsive layout
     - i18n support

### Example

```bash
bun run src/index.ts purchases --path ../../apps/spark-base
```

This creates:
- `modules/purchases/` - Module with hooks, types, data, i18n
- `app/[locale]/(dashboard)/company/[id]/purchases/page.tsx` - DataGrid page
- Translations in `modules/purchases/i18n/en.json` and `th.json`

### Next Steps

After generating a module:

1. **Add to sidebar navigation** in `core/layout/project-sidebar.tsx` and `core/layout/mobile-menu.tsx`
2. **Customize the DataGrid columns** in the page.tsx
3. **Update translations** if needed
4. **Add your business logic** to replace mock data

## Module Structure

```
modules/{module-name}/
├── hooks/
│   └── use-{module-name}.ts    # Data fetching hook
├── lib/
│   └── data.ts                  # Mock data
├── types/
│   └── index.ts                 # TypeScript types
├── i18n/
│   ├── en.json                  # English translations
│   └── th.json                  # Thai translations
└── index.ts                     # Module exports
```

## Page Features

Generated pages include:

- ✅ DataGrid with full features (sort, filter, search)
- ✅ FilterPanel with customizable filters
- ✅ Stats cards with gradient backgrounds
- ✅ Responsive design (mobile-first)
- ✅ i18n ready (English & Thai)
- ✅ TypeScript support
- ✅ Mock data included
- ✅ Follows Spark Base patterns

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Run directly (development)
bun run src/index.ts <module-name> --path <path-to-spark-base>
```

## Examples

```bash
# Generate purchases module
bun run src/index.ts purchases --path ../../apps/spark-base

# Generate customer module
bun run src/index.ts customer --path ../../apps/spark-base

# Generate inventory module
bun run src/index.ts inventory --path ../../apps/spark-base
```
