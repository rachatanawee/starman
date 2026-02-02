# Starman Template 🚀

A production-ready Next.js application template with built-in theming, authentication, data management, and reusable business utilities. Perfect for building enterprise applications quickly.

> **Note**: This template includes a complete ERP system as a reference implementation. You can use it as-is or customize it for your specific needs.

## ✨ Why This Template?

- **🎨 8 Beautiful Themes** - Pre-built color schemes with instant switching
- **🔧 Centralized Configuration** - Single source of truth for all app settings
- **📊 Mock Data System** - Generic data generators for rapid prototyping
- **🛠️ Business Utilities** - Ready-to-use functions for common operations
- **🎯 Type-Safe** - Full TypeScript support throughout
- **📱 Responsive** - Mobile-first design with modern UI components
- **🌐 i18n Ready** - Multi-language support (English/Thai)
- **🔐 Auth System** - Complete authentication flow with session management

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd starman/apps/erp-prototype
bun install

# Run development server
bun run dev
```

Open [http://localhost:3200](http://localhost:3200) and login with `demo@erp.com` / `demo123`

## 📚 Documentation

- **[Template Guide](TEMPLATE_GUIDE.md)** - How to customize this template
- **[ERP-Specific Files](ERP_SPECIFIC_FILES.md)** - What to remove/keep when adapting
- **[Demo Page](/template-demo)** - Live examples of utilities and components

## 🎨 Core Features

### 1. Configuration System

Centralized configuration in `/lib/app.config.ts`:

```typescript
import { appConfig } from '@/lib/app.config'

// Access app settings
const appName = appConfig.app.defaultName
const themes = appConfig.themes
const features = appConfig.features
```

### 2. Theme System

8 pre-built themes with instant switching:
- Tangerine (Orange)
- Ocean Breeze (Blue)  
- Claude (Brown)
- Forest Green
- Royal Purple
- Crimson Red
- Clean Slate (Gray)
- Twitter Blue

**Add custom themes:**
1. Create `/public/themes/your-theme.css`
2. Add to `appConfig.themes`
3. Done!

### 3. Mock Data Generators

Generic data generators for rapid prototyping:

```typescript
import { generateTransactions, mockDataGenerator } from '@/lib/mock-data'

// Generate 20 transactions
const data = generateTransactions(20)

// Custom generation
const custom = mockDataGenerator.array((i) => ({
  id: mockDataGenerator.id('item'),
  name: mockDataGenerator.name('Product'),
  amount: mockDataGenerator.amount(1000, 50000),
}), 10)
```

### 4. Business Utilities

Ready-to-use functions for common operations:

```typescript
import { formatUtils, calcUtils, statusUtils } from '@/lib/business-utils'

// Formatting
formatUtils.currency(1000) // '฿1,000.00'
formatUtils.percentage(85.5) // '85.5%'

// Calculations
calcUtils.sum(items, 'amount')
calcUtils.average(items, 'price')

// Status management
statusUtils.getVariant('Completed') // 'default'
statusUtils.getColor('Pending') // 'text-yellow-600'
```

## 🛠️ Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + OKLCH colors
- **UI**: shadcn/ui components
- **Data Grid**: TanStack Table
- **Charts**: Recharts
- **i18n**: next-intl

## 📁 Project Structure

```
lib/
├── app.config.ts           # Central configuration
├── business-utils.ts       # Generic utilities
├── settings-context.tsx    # Theme & settings state
├── common-exports.ts       # Barrel exports
└── mock-data/              # Mock data system
    ├── generator.ts        # Data generators
    ├── generic-data.ts     # Generic types
    └── *.ts                # Domain-specific data

components/
├── ui/                     # shadcn/ui components
├── tablecn/                # Data grid
├── project-layout.tsx      # Main layout
├── page-title.tsx          # Page headers
└── theme-loader.tsx        # Dynamic theming

app/
└── [locale]/
    ├── (auth)/             # Login pages
    └── (dashboard)/        # Main app
        ├── template-demo/  # Usage examples
        └── company/[id]/   # Your pages here
```

## 🎯 Customization Guide

### 1. Update Branding

```typescript
// lib/app.config.ts
export const appConfig = {
  app: {
    defaultName: 'Your App Name',
    defaultIcon: 'Building2',
    version: '1.0.0',
  },
  // ...
}
```

### 2. Add Your Pages

```typescript
// app/[locale]/(dashboard)/your-page/page.tsx
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

### 3. Remove ERP Examples (Optional)

See [ERP_SPECIFIC_FILES.md](ERP_SPECIFIC_FILES.md) for detailed instructions on removing the ERP reference implementation.

## 🎨 Design System

## 📖 Reference Implementation

This template includes a complete ERP system as a reference implementation:

### Included Modules
- **Sales** - Quotations, Orders, Invoices
- **Production** - BOM, Orders, Planning, Manufacturing
- **Reports** - Dashboard, Capacity, Costing, History
- **Accounting** - Integration hub, Sync, Reconciliation
- **Users** - Role-based access control

### AI Features (Examples)
- Production planning optimization
- Shop floor problem diagnosis
- Cost analysis and margin tracking
- Accounting reconciliation

You can keep these as examples or remove them entirely. See [ERP_SPECIFIC_FILES.md](ERP_SPECIFIC_FILES.md) for details.

## 🔧 Development
### Authentication
- Mock auth system with session management
- Login: `demo@erp.com` / `demo123`
- Auto-redirect to last visited page
- Session persistence in localStorage

### Mock Data
- Centralized in `/lib/mock-data/`
- Generic generators for common data types
- Domain-specific examples (sales, production, etc.)
- Easy to replace with real API calls

### Adding Features
1. Create mock data using generators
2. Build components with shadcn/ui
3. Add pages following existing patterns
4. Use business utilities for common operations

## 📝 License

[Your License Here]

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
