# Starman ERP 🚀

AI-powered Enterprise Resource Planning system built with Next.js, TypeScript, and modern web technologies.

## 🌟 Features

### Authentication & Session Management 🔐
- **Smart Login System** - Animated login page with fade transitions
  - Credential validation (demo@erp.com / demo123 or any @erp.com email)
  - Error handling with clear messages
  - Fade out/in transitions on login/logout
  - Build version display with hover tooltip
- **Session Persistence** - Remember last visited page and company
  - Auto-redirect to last page after login
  - Remember last selected company
  - Page tracking across navigation
- **Animated Branding** - Dynamic login page with continuous animations
  - Floating gradient shapes
  - Pulsing glow effects
  - Smooth hover transitions

### App Customization 🎨
- **Custom Branding** - Personalize application name and icon
  - Change app name (default: "Starman ERP")
  - Choose from 10 icon options (GitBranch, Star, Zap, Rocket, Heart, Sparkles, Building2, Settings, Shield, Globe)
  - Settings saved to localStorage
  - Applied across login page, sidebar, and all UI elements

### Theme System 🎨
- **8 Beautiful Themes** - Tangerine, Ocean Breeze, Claude, Forest Green, Royal Purple, Crimson Red, Clean Slate, Twitter Blue
- **Instant Theme Switching** - Change themes without page refresh
- **Persistent Preferences** - Theme selection saved to localStorage
- **Comprehensive Coverage** - Themes apply to all UI elements (sidebar, buttons, titles, charts, borders)
- **Visual Preview** - See theme colors before applying

### Sales Module
- **Quotation Management** - Create and manage sales quotations with AI-powered customer insights
- **Sales Order** - Track customer orders with complete document linkage
- **Sales Invoice** - Generate invoices and track payments

### Production Module
- **Bill of Materials (BOM)** - Manage production recipes with tree view and cost estimation
- **Production Order** - Track manufacturing orders with real-time progress monitoring
- **Production Planning** - AI-powered scheduling with "The Strategist" agent
  - Capacity conflict detection
  - Material risk analysis
  - Cost optimization suggestions
  - Deadline risk alerts
- **Manufacturing Execution** - Shop floor control system
  - Operator Cockpit - Kiosk mode for machine operators
  - Supervisor Dashboard - Real-time factory monitoring with OEE metrics
  - AI Co-Pilot - Intelligent problem-solving assistance

### Reports & Analytics Module
- **Dashboard** - Executive overview with modern design
  - Fullscreen mode for presentations
  - Export to CSV for data analysis
  - Print-friendly layout
  - Real-time metrics with hover effects
  - Gradient headers and visual enhancements
- **Factory Capacity Report** - Machine utilization and bottleneck analysis
- **Worker Allowance Report** - Labor cost tracking and productivity metrics
- **WIP Costing** - Real-time job costing with AI Financial Analyst
  - Cost ledger tracking (DM/DL/OH)
  - Variance analysis
  - Margin erosion alerts
  - One-click cost optimization
- **Job History** - Completed production analysis with performance rankings

### Accounting Interface Module
- **Integration Hub** - Bridge to Thai accounting software (PEAK, FlowAccount, TRCLOUD, Express)
- **Sync Dashboard** - Real-time document sync status monitoring
- **AI Reconciliation Agent** - Intelligent error detection and auto-fix
  - Missing Tax ID alerts
  - Unsynced document detection
  - Mapping error resolution
  - Duplicate entry prevention
- **Tax Staging** - VAT and WHT report preparation
- **GL Account Mapping** - Chart of accounts configuration

### User Management Module
- **User Administration** - Manage users with role-based access control
  - 7 roles: Admin, Manager, Accountant, Production Manager, Warehouse Staff, Sales, Viewer
  - Module permissions: Sales, Production, Inventory, Purchasing, Accounting, Reports, Settings
  - Company access control: Assign users to specific companies
  - Inline editing: Add/edit users without dialog popups
  - Search and filter: By role, status, name, or email

### AI Capabilities 🤖
- **The Strategist** - Production planning optimization
- **The Co-Pilot** - Shop floor problem diagnosis
- **The Financial Analyst** - WIP costing and margin analysis
- **The Reconciliation Agent** - Accounting sync error resolution
- Customer trend analysis
- Predictive maintenance alerts
- One-click fix actions

## 🎨 Theme System

Starman ERP features a comprehensive theme system with 8 beautiful color themes that transform the entire application interface.

### Available Themes
- **Tangerine** - Vibrant orange theme (default)
- **Ocean Breeze** - Calming blue theme
- **Claude** - Warm brown theme
- **Forest Green** - Natural green theme
- **Royal Purple** - Elegant purple theme
- **Crimson Red** - Bold red theme
- **Clean Slate** - Professional gray theme
- **Twitter Blue** - Classic Twitter blue

### Theme Features
- **Global Color System**: Themes apply to all UI elements including:
  - Sidebar highlights and active states
  - Primary buttons and actions
  - Page titles and icons
  - Progress bars and charts
  - Borders and accents
  - Focus rings and hover states
  
- **Persistent Settings**: Theme selection is saved to localStorage and persists across sessions
- **Dynamic Loading**: Themes are loaded dynamically without page refresh
- **Visual Preview**: Settings page shows color preview for each theme
- **Consistent Design**: All pages follow the same design language with theme-aware components

### Changing Themes
1. Navigate to Settings page (`/company/[id]/settings`)
2. Scroll to "Theme & Appearance" section
3. Click on any theme card to apply it instantly
4. Your selection is automatically saved

### Customizing App Branding
1. Navigate to Settings page (`/company/[id]/settings`)
2. Find "App Branding" section at the top
3. Enter your custom application name
4. Select an icon from the available options
5. Click "Apply Branding" to save
6. Changes will appear on login page and sidebar

### Theme Architecture
- **CSS Variables**: Uses CSS custom properties for dynamic theming
- **OKLCH Color Space**: Modern color format for better perceptual uniformity
- **Tailwind Integration**: Theme variables integrate seamlessly with Tailwind utilities
- **Component Support**: All UI components are theme-aware using `bg-primary`, `text-primary`, etc.

### Adding Custom Themes
1. Create a new CSS file in `/public/themes/your-theme.css`
2. Define the required CSS variables:
   ```css
   :root {
     --primary: oklch(0.65 0.25 30);
     --primary-foreground: oklch(1 0 0);
     --sidebar-primary: oklch(0.65 0.25 30);
     --sidebar-primary-foreground: oklch(1 0 0);
     --ring: oklch(0.65 0.25 30);
     --sidebar-ring: oklch(0.65 0.25 30);
   }
   ```
3. Add the theme to the settings context in `/lib/settings-context.tsx`
4. Theme will be available in the Settings page

## 🛠️ Tech Stack

- **Runtime**: Bun (fast JavaScript runtime)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with OKLCH color space
- **UI Components**: shadcn/ui
- **Data Grid**: TanStack Table
- **Charts**: Recharts
- **Diagrams**: Mermaid
- **State Management**: React Context + Hooks
- **Internationalization**: next-intl (English/Thai)
- **Theme System**: Dynamic CSS loading with localStorage persistence

## 📁 Project Structure

```
erp/
├── apps/
│   └── erp-prototype/
│       ├── app/                    # Next.js app directory
│       │   └── [locale]/
│       │       └── (dashboard)/
│       │           ├── company/[id]/
│       │           │   ├── quotation/
│       │           │   ├── sales-order/
│       │           │   ├── sales-invoice/
│       │           │   ├── bom/
│       │           │   ├── production-order/
│       │           │   ├── production-planning/
│       │           │   ├── manufacturing/
│       │           │   ├── factory-capacity/
│       │           │   ├── worker-allowance/
│       │           │   ├── wip-costing/
│       │           │   ├── job-history/
│       │           │   ├── accounting/
│       │           │   └── settings/
│       │           ├── users/          # User management
│       │           └── guide/          # User documentation
│       ├── components/             # Reusable components
│       │   ├── ui/                # shadcn/ui components
│       │   ├── tablecn/           # Data grid components
│       │   ├── theme-loader.tsx   # Dynamic theme loading
│       │   ├── page-title.tsx     # Consistent page titles
│       │   ├── operator-cockpit.tsx
│       │   ├── supervisor-dashboard.tsx
│       │   └── bom-tree-view.tsx
│       ├── lib/                   # Utilities and mock data
│       │   ├── settings-context.tsx  # Theme state management
│       │   ├── bom-data.ts
│       │   ├── production-order-data.ts
│       │   ├── production-planning-data.ts
│       │   ├── manufacturing-data.ts
│       │   ├── factory-capacity-data.ts
│       │   ├── worker-allowance-data.ts
│       │   ├── wip-costing-data.ts
│       │   ├── job-history-data.ts
│       │   ├── accounting-data.ts
│       │   └── user-data.ts
│       └── public/
│           └── themes/            # Theme CSS files
│               ├── tangerine.css
│               ├── ocean-breeze.css
│               ├── claude.css
│               ├── forest-green.css
│               ├── royal-purple.css
│               ├── crimson-red.css
│               ├── clean-slate.css
│               └── twitter.css
```

## 🚀 Getting Started

### Prerequisites
- Bun 1.0+ (recommended) or Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd erp

# Navigate to the app directory
cd apps/erp-prototype

# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3200](http://localhost:3200) in your browser.

### Build for Production

```bash
# Build the application
bun run build

# Start production server
bun run start
```

## 📖 User Guide

The system includes comprehensive built-in documentation accessible via the "Learn More" buttons throughout the application, or directly at `/guide`.

### Quick Navigation
- **Sales Guide**: `/guide?tab=sales`
- **Production Guide**: `/guide?tab=production`
- **Manufacturing Execution**: `/guide?tab=production&section=manufacturing-execution`
- **Production Planning**: `/guide?tab=production&section=production-planning`

## 🎯 Key Concepts

### Authentication Flow
The system uses mock authentication with session management:
- Login with demo@erp.com / demo123 or any email ending with @erp.com
- Session tokens stored in localStorage
- Auto-redirect to last visited page after login
- Fade transitions on login/logout for smooth UX
- Page tracking to remember user's last location

### App Customization
Users can personalize the application:
- Custom app name replaces "Starman ERP" throughout the system
- Icon selection from 10 Lucide icons
- Settings persist in localStorage
- Changes apply to login page, sidebar, and copyright text

### Theme System
The application uses a dynamic theme system that allows users to customize the entire interface:
- Themes are loaded as CSS files from `/public/themes/`
- Settings are managed by `SettingsProvider` context
- Theme changes apply instantly via `ThemeLoader` component
- All components use theme-aware CSS variables (`--primary`, `--primary-foreground`, etc.)
- Tailwind config supports both HSL and OKLCH color formats

### Document Flow
```
Quotation → Sales Order → Sales Invoice → Payment
                ↓
        Production Order → Manufacturing → Finished Goods
```

### Manufacturing Execution
- **Operator Cockpit**: Touch-friendly interface for machine operators
  - Mission Queue - Job selection
  - Control Panel - START/PAUSE/STOP controls with real-time timer
  - Output Reporting - Good/Scrap quantity tracking
  
- **Supervisor Dashboard**: Factory-wide monitoring
  - Factory Map - Live machine status visualization
  - OEE Monitor - Availability, Performance, Quality metrics
  - Alert Feed - Real-time issue notifications

### AI-Powered Planning
The Strategist AI analyzes production schedules and provides:
- 🔴 Capacity Conflict - Machine overload detection
- 📉 Material Risk - Shortage predictions
- ⚡ Cost Optimization - Setup time reduction
- ⏰ Deadline Risk - Late delivery warnings

## 🎨 Design System

- **Authentication UI**: Modern login page with animated background
  - Floating gradient shapes with continuous animation
  - Pulsing glow effects on icons
  - Smooth fade transitions
  - Responsive design for mobile and desktop
- **App Branding**: Customizable application identity
  - Dynamic app name display
  - Icon selection from Lucide library
  - Consistent branding across all pages
- **Theme System**: 8 customizable color themes with instant switching
- **Color Variables**: CSS custom properties using OKLCH color space
- **Typography**: System fonts with responsive sizing (text-xl/2xl/3xl)
- **Components**: Consistent shadcn/ui design language with theme integration
- **Icons**: Lucide React icons matching sidebar navigation
- **Responsive**: Mobile-first approach with breakpoints (sm/md/lg/xl)
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Focus rings and keyboard navigation support

## 🔧 Development

### Mock Data
All modules use realistic mock data for demonstration:
- Billion-baht factory scale (invoices 8-15M, production costs 5-12.9M)
- Steel service center context
- 20 mock users with 7 different roles
- 4 sample companies
- Realistic manufacturing operations
- Production schedules with conflicts

### Adding New Features
1. Create mock data in `/lib/*-data.ts`
2. Build components in `/components/`
3. Add pages in `/app/[locale]/(dashboard)/company/[id]/`
4. Update guide documentation in `/app/[locale]/(dashboard)/guide/components/`

## 📝 License

[Your License Here]

## 👥 Contributors

[Your Team/Contributors Here]

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
