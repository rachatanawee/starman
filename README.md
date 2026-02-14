# Spark 🚀

A production-ready Next.js monorepo template with modular architecture, built-in theming, i18n support, and powerful data management tools.

## ✨ Features

- **🧩 Modular Architecture** - Organized by feature modules with clear boundaries
- **🌐 i18n Ready** - Multi-language support (EN/TH) with automatic module loading
- **📊 DataGrid** - Powerful table with sorting, filtering, and search
- **🛠️ CLI Generator** - Create new modules instantly with `@spark/add-module`
- **🎨 Theme System** - 8 pre-built themes with instant switching
- **�  Type-Safe** - Full TypeScript support
- **📱 Responsive** - Mobile-first design
- **⚡ Bun Runtime** - Fast development and build times

## 📋 Prerequisites

- **Bun** (recommended) - [Install Bun](https://bun.sh/docs/installation)
- **Node.js 20+** (alternative) - [Install Node.js](https://nodejs.org/)

## 🚀 Quick Start

### Create New Project

```bash
# Using Bun (Recommended)
bunx @spark/create my-project

```

### Run Development Server

```bash
# Navigate to your project
cd my-project

# Install dependencies (if not already installed)
bun install

# Start development server
cd apps/spark-base
bun run dev
```

Open [http://localhost:3201](http://localhost:3201) to see your app!

### Alternative: Using npm

```bash
# Create project
npx @spark/create my-project

# Navigate and install
cd my-project
npm install

# Start development
cd apps/spark-base
npm run dev
```

## 📁 Project Structure

```
spark/
├── apps/
│   └── spark-base/              # Main application
│       ├── app/                 # Next.js app directory
│       │   └── [locale]/
│       │       ├── (auth)/      # Login pages
│       │       └── (dashboard)/ # Main app
│       ├── core/                # Core components
│       │   ├── auth/            # Authentication
│       │   ├── layout/          # Layout components
│       │   └── settings/        # Settings management
│       ├── shared/              # Shared utilities
│       │   ├── components/      # Shared components
│       │   │   ├── ui/          # shadcn/ui components
│       │   │   └── tablecn/     # DataGrid components
│       │   ├── hooks/           # Shared hooks
│       │   └── lib/             # Shared utilities
│       ├── modules/             # Feature modules
│       │   ├── sales-order/
│       │   ├── dashboard/
│       │   ├── assets/
│       ├── lib/                 # App-level utilities
│       │   ├── app.config.ts    # App configuration
│       │   ├── business-utils.ts
│       │   ├── common-exports.ts
│       │   └── mock-data/       # Mock data generators
│       ├── messages/            # Core i18n
│       │   ├── en.json
│       │   └── th.json
│       └── i18n.ts              # i18n config
├── packages/
│   └── add-module/              # CLI for generating modules
└── docs/                        # Documentation
```

## 🧩 Modular Architecture

Each module is self-contained:

```
modules/{module-name}/
├── hooks/              # Custom React hooks
├── lib/                # Utilities and data
├── types/              # TypeScript types
├── i18n/               # Module translations
│   ├── en.json
│   └── th.json
└── index.ts            # Module exports
```

### Creating New Modules

```bash
cd packages/add-module
bun run src/index.ts <module-name> --path ../../apps/spark-base
```

Example:
```bash
bun run src/index.ts inventory --path ../../apps/spark-base
```

This generates:
- Complete module structure
- Page with DataGrid, filtering, sorting
- i18n translations (EN/TH)
- TypeScript types and mock data

See [packages/add-module/README.md](packages/add-module/README.md) for details.

## 🌐 Internationalization

Modular i18n system that automatically loads translations:

### Core Translations
`apps/spark-base/messages/`:
- `en.json` - Core English
- `th.json` - Core Thai

### Module Translations
`modules/{module-name}/i18n/`:
- `en.json` - Module English
- `th.json` - Module Thai

The system automatically:
1. Scans modules for translation files
2. Loads and merges with core translations
3. Makes available via `useTranslations('{moduleName}')`

### Usage

```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('salesOrder')
t('title') // "Sales Order" or "ใบสั่งขาย"
```

See [apps/spark-base/messages/README.md](apps/spark-base/messages/README.md)

## 📊 DataGrid

Powerful table component with:
- Sorting and filtering
- Search functionality
- Row height controls
- Column visibility
- Responsive design
- Virtual scrolling

Based on TanStack Table.

## 🛠️ Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + OKLCH colors
- **UI**: shadcn/ui
- **Data Grid**: TanStack Table
- **Charts**: Recharts
- **i18n**: next-intl
- **Icons**: Lucide React

## 🔧 Development

### Commands

```bash
# Development
cd apps/spark-base
bun run dev          # Port 3201
bun run dev:bun      # With Bun runtime

# Build
bun run build
bun run build:bun    # With Bun runtime

# Production
bun run start
bun run start:bun    # With Bun runtime

# Lint
bun run lint
```

### Creating a Module

```bash
cd packages/add-module

# Generate module
bun run src/index.ts {module-name} --path ../../apps/spark-base

# Example
bun run src/index.ts inventory --path ../../apps/spark-base
```

### Adding to Navigation

After creating a module:

1. Edit `apps/spark-base/core/layout/project-sidebar.tsx`
2. Edit `apps/spark-base/core/layout/mobile-menu.tsx`
3. Add menu item with icon and route

## 📚 Documentation

- **[Module Generator](packages/add-module/README.md)** - CLI tool
- **[i18n System](apps/spark-base/messages/README.md)** - Translations
- **[Modular Monolith](apps/spark-base/docs/MODULAR_MONOLITH.md)** - Architecture
- **[Troubleshooting](apps/spark-base/docs/TROUBLESHOOTING.md)** - Common issues

## 🎯 Example Modules

Included modules demonstrate best practices:

- **Dashboard** - Stats and charts
- **Sales Order** - DataGrid with filtering
- **Assets** - QR scanning and tracking
- **Purchases** - Generated example
- **Customer** - Generated example

## 🎨 Theme System

8 pre-built themes:
- Tangerine (Orange)
- Ocean Breeze (Blue)
- Claude (Brown)
- Forest Green
- Royal Purple
- Crimson Red
- Clean Slate (Gray)
- Twitter Blue

Themes persist across sessions.

## 📝 License

MIT

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [Bun](https://bun.sh/)
