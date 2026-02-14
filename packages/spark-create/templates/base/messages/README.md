# Messages Structure

This directory contains i18n translations organized in a modular structure with automatic loading.

## Directory Structure

```
messages/
├── en.json                  # Core English translations (auth, common, company, etc.)
└── th.json                  # Core Thai translations

modules/
├── sales-order/
│   └── i18n/
│       ├── en.json          # Sales Order English translations
│       └── th.json          # Sales Order Thai translations
├── dashboard/
│   └── i18n/
│       ├── en.json          # Dashboard English translations
│       └── th.json          # Dashboard Thai translations
├── assets/
│   └── i18n/
│       ├── en.json          # Assets English translations
│       └── th.json          # Assets Thai translations
└── ...
```

## How It Works

The i18n configuration (`i18n.ts`) automatically:
1. Loads core translations from `messages/{locale}.json`
2. Scans all `modules/*/i18n/{locale}.json` files
3. Merges module translations with core translations
4. Converts module folder names to camelCase (e.g., `sales-order` → `salesOrder`)

## Usage

### In Components

```typescript
import { useTranslations } from 'next-intl'

// For module-specific translations
const t = useTranslations('salesOrder')
t('title') // "Sales Order" or "ใบสั่งขาย"

// For core translations
const tCommon = useTranslations('common')
tCommon('save') // "Save" or "บันทึก"

// For assets module
const tAssets = useTranslations('assets')
tAssets('scanQR') // "Scan QR" or "สแกน QR"
```

## Adding New Module Translations

1. Create a new module directory under `modules/`
2. Create `i18n` folder inside the module
3. Add `en.json` and `th.json` files in the `i18n` folder
4. The i18n system will automatically load them on next build/restart

Example:
```
modules/
└── inventory/
    ├── components/
    ├── hooks/
    ├── lib/
    ├── types/
    ├── i18n/
    │   ├── en.json
    │   └── th.json
    └── index.ts
```

```json
// modules/inventory/i18n/en.json
{
  "title": "Inventory",
  "addItem": "Add Item",
  "stockLevel": "Stock Level"
}

// modules/inventory/i18n/th.json
{
  "title": "สินค้าคงคลัง",
  "addItem": "เพิ่มรายการ",
  "stockLevel": "ระดับสต็อก"
}
```

Then use in components:
```typescript
const t = useTranslations('inventory')
t('title') // "Inventory" or "สินค้าคงคลัง"
```

## Benefits

- **Automatic Loading**: No need to manually update main translation files
- **Modular**: Each module owns its translations in its own `i18n` folder
- **Co-located**: Translations live with their module code
- **Organized**: Clear separation with dedicated `i18n` folder per module
- **Maintainable**: Easy to find and update module-specific translations
- **Scalable**: Add new modules without touching core files
- **Type-safe**: Works with next-intl's type system

## Core vs Module Translations

- **Core** (`messages/en.json`, `messages/th.json`): Shared translations used across the app (auth, common, company, branding)
- **Module** (`modules/*/i18n/{locale}.json`): Module-specific translations that are automatically loaded and namespaced
