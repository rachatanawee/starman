# Spark 🚀

A production-ready Next.js monorepo template with modular architecture, built-in theming, i18n support, and powerful data management tools.

## ✨ Features

- **🧩 Modular Architecture** - Organized by feature modules with clear boundaries
- **🌐 i18n Ready** - Multi-language support (EN/TH) with automatic module loading
- **📊 DataGrid** - Powerful table with sorting, filtering, and search
- **🛠️ CLI Generator** - Create new modules instantly with `@spark/add-module`
- **🎨 Theme System** - 8 pre-built themes with instant switching
- **🎯 Type-Safe** - Full TypeScript support
- **📱 Responsive** - Mobile-first design
- **⚡ Bun Runtime** - Fast development and build times

## 📋 Prerequisites

- **Bun** (recommended) - [Install Bun](https://bun.sh/docs/installation)
- **Node.js 20+** (alternative) - [Install Node.js](https://nodejs.org/)
- **GitLab Access Token** - For accessing Spark packages

## 🚀 Quick Start

### 1. Setup Registry (First Time Only)

#### Windows Users:

**PowerShell:**
```powershell
# Set environment variable for SSL
$env:NODE_TLS_REJECT_UNAUTHORIZED = '0'

# Configure registry
Add-Content -Path "$env:USERPROFILE\.bunfig.toml" -Value @"

[install.scopes]
`"@spark`" = `"https://codehub.csigroups.com/api/v4/projects/698/packages/npm/`"

[install.tls]
rejectUnauthorized = false
"@
```

**Command Prompt:**
```cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0

notepad %USERPROFILE%\.bunfig.toml
```

Then add this content:
```toml
[install.scopes]
"@spark" = "https://codehub.csigroups.com/api/v4/projects/698/packages/npm/"

[install.tls]
rejectUnauthorized = false
```

#### macOS/Linux Users:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0

cat >> ~/.bunfig.toml << 'EOF'

[install.scopes]
"@spark" = "https://codehub.csigroups.com/api/v4/projects/698/packages/npm/"

[install.tls]
rejectUnauthorized = false
EOF
```

**Note:** If you get authentication errors, you may need a GitLab token. See "Using Token" section below.

### 2. Create New Project

**Windows PowerShell:**
```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED = '0'
bunx @spark/create my-project --skip-install
cd my-project
bun install
```

**Windows Command Prompt:**
```cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0
bunx @spark/create my-project --skip-install
cd my-project
bun install
```

**macOS/Linux:**
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 bunx @spark/create my-project --skip-install
cd my-project
bun install
```

**Note:** Using `--skip-install` flag avoids Windows-specific bun install issues during project creation.

### 3. Run Development Server

```bash
cd my-project/apps/spark-base
bun install
bun run dev
```

Open [http://localhost:3201](http://localhost:3201)

---

## 🔐 Using Token (Optional)

If you get authentication errors, add a GitLab token:

### Get Token:
1. Go to https://codehub.csigroups.com/-/user_settings/personal_access_tokens
2. Create token with `read_api` and `read_registry` scopes
3. Copy the token

### Configure with Token:

**Windows (PowerShell):**
```powershell
Add-Content -Path "$env:USERPROFILE\.bunfig.toml" -Value @"

[install.scopes]
`"@spark`" = { 
  url = `"https://codehub.csigroups.com/api/v4/projects/698/packages/npm/`",
  token = `"YOUR_GITLAB_TOKEN`"
}

[install.tls]
rejectUnauthorized = false
"@
```

**macOS/Linux:**
```bash
cat >> ~/.bunfig.toml << 'EOF'

[install.scopes]
"@spark" = { 
  url = "https://codehub.csigroups.com/api/v4/projects/698/packages/npm/",
  token = "YOUR_GITLAB_TOKEN"
}

[install.tls]
rejectUnauthorized = false
EOF
```

Replace `YOUR_GITLAB_TOKEN` with your actual token.

---

## 📝 Using npm instead of Bun

**Configure npm:**
```bash
npm config set @spark:registry https://codehub.csigroups.com/api/v4/projects/698/packages/npm/
npm config set strict-ssl false
```

**Create project:**
```bash
# Windows Command Prompt
set NODE_TLS_REJECT_UNAUTHORIZED=0 && npx @spark/create my-project

# Windows PowerShell
$env:NODE_TLS_REJECT_UNAUTHORIZED='0'; npx @spark/create my-project

# macOS/Linux
NODE_TLS_REJECT_UNAUTHORIZED=0 npx @spark/create my-project
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
│       │   └── assets/
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
