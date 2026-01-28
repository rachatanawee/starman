# Starman ERP 🚀

AI-powered Enterprise Resource Planning system built with Next.js, TypeScript, and modern web technologies.

## 🌟 Features

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

### AI Capabilities 🤖
- **The Strategist** - Production planning optimization
- **The Co-Pilot** - Shop floor problem diagnosis
- Customer trend analysis
- Predictive maintenance alerts
- One-click fix actions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Grid**: TanStack Table
- **Charts**: Recharts
- **Diagrams**: Mermaid
- **State Management**: React Hooks
- **Internationalization**: next-intl

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
│       │           │   └── manufacturing/
│       │           └── guide/      # User documentation
│       ├── components/             # Reusable components
│       │   ├── ui/                # shadcn/ui components
│       │   ├── tablecn/           # Data grid components
│       │   ├── operator-cockpit.tsx
│       │   ├── supervisor-dashboard.tsx
│       │   └── bom-tree-view.tsx
│       └── lib/                   # Utilities and mock data
│           ├── bom-data.ts
│           ├── production-order-data.ts
│           ├── production-planning-data.ts
│           └── manufacturing-data.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd erp

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 User Guide

The system includes comprehensive built-in documentation accessible via the "Learn More" buttons throughout the application, or directly at `/guide`.

### Quick Navigation
- **Sales Guide**: `/guide?tab=sales`
- **Production Guide**: `/guide?tab=production`
- **Manufacturing Execution**: `/guide?tab=production&section=manufacturing-execution`
- **Production Planning**: `/guide?tab=production&section=production-planning`

## 🎯 Key Concepts

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

- **Color Scheme**: Purple/Blue gradient for primary actions
- **Typography**: System fonts with responsive sizing
- **Components**: Consistent shadcn/ui design language
- **Icons**: Lucide React icons
- **Responsive**: Mobile-first approach

## 🔧 Development

### Mock Data
All modules use realistic mock data for demonstration:
- Steel service center context
- Realistic manufacturing operations
- Sample customer data
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
