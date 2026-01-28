# ProjectFlow - UI Prototype

## Overview

This is a **full UI prototype** of ProjectFlow with all 57+ pages using **mock data only**. The purpose is to validate requirements and get stakeholder buy-in before full development.

## ⚠️ Important Notes

- **NO REAL DATA**: All data is mocked - no Supabase, GitLab, or AI API integration
- **UI ONLY**: This is for demonstration and requirement validation purposes
- **Mock Authentication**: Login works with any email/password
- **Static Deployment**: Can be deployed as a static site

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Open browser
# http://localhost:3000
```

## 🎨 Features Included

### ✅ Implemented (UI Only - Mock Data)
- Authentication (Login/Register)
- Project Management (List, Create, Settings)
- Dashboard with Charts
- Task List & Gantt Chart
- Requirements & Epics Management
- Cost Tracking & Budget
- Risk Management
- AI Features (Task Generation, Diagrams, Test Scenarios)
- Plan Management (Versioning, Scenarios, Impact Analysis)
- Acceptance Criteria & Traceability Matrix
- Command Palette (Cmd+K)
- Semantic Search
- Notifications & Activity Feed

### ❌ Not Implemented (Will be in Full Development)
- Real Supabase Database
- Real GitLab API Integration
- Real AI Provider Integration
- Real-time Webhooks
- Data Persistence
- User Authentication (Real)

## 📁 Project Structure

```
apps/web/
├── app/                    # Next.js App Router
│   └── [locale]/          # i18n routes
│       ├── (auth)/        # Auth pages (login, register)
│       └── (dashboard)/   # Dashboard pages
├── components/            # React components
│   └── ui/               # Shadcn UI components
├── lib/                  # Utilities
│   ├── mock-data.ts      # Mock data service
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🎯 Mock Data

All data is generated in `lib/mock-data.ts`:
- Mock Projects
- Mock Tasks/Issues
- Mock Requirements
- Mock Epics
- Mock Risks
- Mock Cost Data
- Mock Team Members
- Mock AI Responses

## 🔑 Mock Login

Use any credentials to login:
- Email: `any@email.com`
- Password: `any-password`

## 📝 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Forms**: React Hook Form + Zod
- **i18n**: next-intl

## 🎨 Design System

- **Style**: New York (Shadcn)
- **Base Color**: Slate
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📱 Responsive Design

- Desktop (>1024px): Full layout with sidebar
- Tablet (768-1024px): Collapsible sidebar
- Mobile (<768px): Bottom navigation

## 🧪 Testing

This prototype is for visual testing and requirement validation only.

## 📦 Deployment

Can be deployed as a static site to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## 🔄 Next Steps

After prototype validation:
1. Collect user feedback
2. Update requirements based on feedback
3. Make Go/No-Go decision
4. If Go: Proceed to Phase 1 (Full Development)

## 📞 Contact

For questions or feedback, please contact the development team.

---

**Note**: This is a prototype for demonstration purposes only. No real data or integrations are included.
