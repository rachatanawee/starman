# Spark Framework Guide

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd spark-framework/apps/spark-base
bun install

# Run development server
bun run dev
```

Open [http://localhost:3201](http://localhost:3201)

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui components
- **i18n**: next-intl (English/Thai)

## Project Structure

```
apps/spark-base/
├── app/
│   └── [locale]/
│       ├── (auth)/              # Login pages
│       └── (dashboard)/         # Main app
│           └── company/[id]/    # Your pages here
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── tablecn/                 # Data grid components
├── lib/
│   ├── app.config.ts            # Central configuration
│   ├── business-utils.ts        # Generic utilities
│   └── mock-data/               # Mock data generators
└── messages/                    # i18n translations
```

## Core Features

### 1. Configuration System

Centralized configuration in `/lib/app.config.ts`:

```typescript
import { appConfig } from '@/lib/app.config'

const appName = appConfig.app.defaultName
const themes = appConfig.themes
```

### 2. Theme System

8 pre-built themes with instant switching:
- Tangerine (Orange) - Default
- Ocean Breeze (Blue)
- Claude (Brown)
- Forest Green
- Royal Purple
- Crimson Red
- Clean Slate (Gray)
- Twitter Blue

Themes use CSS variables for dynamic switching without page reload.

### 3. Mock Data Generators

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

```typescript
import { formatUtils, calcUtils, statusUtils } from '@/lib/business-utils'

// Formatting
formatUtils.currency(1000)      // '฿1,000.00'
formatUtils.percentage(85.5)    // '85.5%'

// Calculations
calcUtils.sum(items, 'amount')
calcUtils.average(items, 'price')

// Status management
statusUtils.getVariant('Completed')  // 'default'
statusUtils.getColor('Pending')      // 'text-yellow-600'
```

## Layout System

### Desktop Layout
- Fixed header with user controls
- Fixed sidebar (256px) with navigation
- Scroll position persistence
- Collapsible sections

### Mobile Layout
- Hamburger menu
- Slide-in drawer (288px)
- Search functionality
- Auto-height based on content

## Adding Components

```bash
# Install shadcn/ui components
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add dropdown-menu
```

## Creating Pages

```typescript
// app/[locale]/(dashboard)/company/[id]/your-page/page.tsx
import { ProjectLayout, PageTitle } from '@/lib/common-exports'
import { generateTransactions } from '@/lib/mock-data'
import { Icon } from 'lucide-react'

export default function YourPage({ params }: { params: { id: string } }) {
  const data = generateTransactions(20)
  
  return (
    <ProjectLayout projectId={params.id}>
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

## Customization

### Update Branding

```typescript
// lib/app.config.ts
export const appConfig = {
  app: {
    defaultName: 'Your App Name',
    defaultIcon: 'Building2',
    version: '1.0.0',
  },
}
```

### Add Custom Theme

1. Create `/public/themes/your-theme.css`
2. Define CSS variables:
```css
[data-theme="your-theme"] {
  --primary: 25 95% 53%;
  --primary-foreground: 0 0% 100%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```
3. Add to `appConfig.themes`

## Development Commands

```bash
# Development
bun run dev              # Start dev server (port 3201)
bun run dev:bun          # Start with bun runtime

# Build
bun run build            # Production build
bun run build:bun        # Build with bun

# Start
bun run start            # Start production server
bun run start:bun        # Start with bun runtime

# Lint
bun run lint             # Run ESLint
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="My App"
NEXT_PUBLIC_APP_ICON="Package"
```

## Best Practices

1. **Use CSS variables** for colors that should change with theme
2. **Test theme switching** to ensure no hardcoded colors
3. **Keep localStorage keys consistent** across components
4. **Use TypeScript** for type safety
5. **Follow existing patterns** for consistency

## Troubleshooting

### Layout issues
- Check that `layout.tsx` returns `children` only
- Each page should wrap with `<ProjectLayout>`
- Don't nest `ProjectLayout` components

### Import errors
- Check `tsconfig.json` path aliases
- Verify file exists in correct location
- Restart TypeScript server

### CSS not working
- Check `tailwind.config.ts` scans all directories
- Restart dev server
- Clear `.next` cache

## License

MIT
