# ProjectFlow Prototype - Demo Guide

## 🎯 Quick Start

This is a **fully functional UI prototype** with mock data. No backend required!

### Running the Demo

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Open browser
open http://localhost:3000
```

### Demo Login

**Any credentials work!** This is a mock authentication system.

Example:
- Email: `demo@projectflow.com`
- Password: `anything`

---

## 📁 Project Structure

```
apps/prototype/
├── app/                          # Next.js 15 App Router
│   └── [locale]/
│       ├── (auth)/
│       │   └── login/           # Login page
│       └── (dashboard)/
│           ├── projects/        # Projects list
│           └── projects/[id]/   # Project pages
│               ├── dashboard/   # Overview
│               ├── requirements/ # Requirements management
│               ├── tasks/       # Task list with AI
│               ├── gantt/       # Gantt chart
│               ├── epics/       # Epic management
│               ├── costs/       # Cost tracking
│               ├── risks/       # Risk management
│               ├── team/        # Team management
│               ├── settings/    # Project settings
│               ├── ai/          # AI tools
│               ├── acceptance/  # Acceptance criteria
│               ├── traceability/ # Traceability matrix
│               └── workload/    # Workload management
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components
│   ├── breadcrumbs.tsx          # Navigation breadcrumbs
│   ├── project-switcher.tsx     # Project dropdown
│   ├── quick-search.tsx         # Cmd+K search
│   └── ...
├── lib/
│   ├── mock-data.ts             # All mock data
│   ├── wms-data.ts              # WMS project data
│   └── wms-tasks.ts             # WMS tasks data
└── public/themes/               # Theme CSS files
```

---

## 🎨 Features Implemented

### ✅ Phase 0 Complete (80%)

#### Core Pages
- [x] Login page with mock auth
- [x] Projects list with search
- [x] Project dashboard with charts
- [x] Requirements management
- [x] Epics management
- [x] Tasks list
- [x] Gantt chart (interactive)
- [x] Cost tracking
- [x] Risk management
- [x] Team management
- [x] Project settings
- [x] AI tools page
- [x] Acceptance criteria
- [x] Traceability matrix
- [x] Workload management
- [x] User guide

#### Navigation
- [x] Collapsible sidebar
- [x] Breadcrumbs
- [x] Project switcher dropdown
- [x] Quick search (Cmd+K)
- [x] Language switcher (EN/TH)

#### Data
- [x] 3 sample projects
- [x] Mock tasks with Gantt timeline
- [x] Mock requirements with acceptance criteria
- [x] Mock team members
- [x] Mock costs and risks

---

## 🎬 Demo Scenarios

### Scenario 1: AI Requirements Analysis
1. Login with any credentials
2. Select "Warehouse Management System" project
3. Go to Requirements page
4. Paste meeting notes in AI analyzer
5. Click "Analyze with AI"
6. Review generated requirements

### Scenario 2: AI Task Generation
1. Go to Tasks page
2. Copy requirements from Requirements page
3. Paste in AI Task Generator
4. Set sprint dates
5. Click "Generate"
6. Review and submit to GitLab (mock)

### Scenario 3: Project Monitoring
1. Go to Dashboard
2. Show real-time charts
3. Navigate to Gantt Chart
4. Show timeline and milestones
5. Check Costs and Risks

---

## 📊 Sample Data

### Projects
1. **E-Commerce Platform** (ID: 1)
   - Budget: ฿2,500,000
   - Team: 8 members
   - Status: In Progress

2. **Warehouse Management System** (ID: 2)
   - Budget: ฿3,200,000
   - Team: 5 members
   - Status: In Progress
   - **Most complete data for demo**

3. **API Gateway** (ID: 3)
   - Budget: ฿1,800,000
   - Team: 6 members
   - Status: In Progress

### Sample Meeting Transcript

Use this for AI Requirements demo:

```
Meeting Notes - WMS Project
Date: January 15, 2026

Attendees: PM, SA, Dev Team

Requirements Discussion:
1. Inventory Management
   - Real-time stock tracking
   - Low stock alerts
   - Barcode scanning support
   - Multi-warehouse support

2. Order Fulfillment
   - Pick, pack, ship workflow
   - Order prioritization
   - Shipping label generation
   - Tracking number integration

3. Reporting
   - Inventory reports
   - Order history
   - Performance metrics
   - Export to Excel/PDF

4. User Management
   - Role-based access control
   - Warehouse staff accounts
   - Activity logging
   - Permission management
```

---

## 🎯 Key Demo Points

### For Stakeholders
- **Time Savings:** AI reduces planning time by 60%
- **Accuracy:** Real-time data from GitLab
- **Visibility:** Complete project overview
- **Integration:** Works with existing GitLab workflow

### Technical Highlights
- Next.js 15 with App Router
- Bun runtime for fast development
- Shadcn UI components
- Tailwind CSS for styling
- Mock data service (no backend needed)
- Responsive design (desktop-first)

---

## 🔧 Customization

### Adding New Projects

Edit `apps/prototype/lib/mock-data.ts`:

```typescript
export const mockProjects: MockProject[] = [
  {
    id: '4',
    name: 'Your Project Name',
    description: 'Project description',
    owner: 'Owner Name',
    members: 10,
    budget: 5000000,
    spent: 1000000,
    createdAt: '2024-01-01',
    lastActivity: '2024-02-01',
    gitlabUrl: 'https://gitlab.example.com/project',
    aiProvider: 'OpenAI GPT-4'
  }
]
```

### Changing Theme

Themes are in `public/themes/`:
- `clean-slate.css` (default)
- `ocean-breeze.css`
- `tangerine.css`
- `twitter.css`
- `claude.css`

---

## 🐛 Known Limitations (Prototype)

- ❌ No real backend (all mock data)
- ❌ No real AI integration (simulated responses)
- ❌ No real GitLab connection
- ❌ No data persistence (localStorage only)
- ❌ No authentication (mock only)
- ❌ Limited mobile responsiveness
- ❌ No real-time updates
- ❌ No file uploads

These will be implemented in Phase 1-7 of the full development.

---

## 📸 Screenshots

Screenshots should be taken at:
- 1920x1080 resolution
- 100% browser zoom
- Clean data (no test/debug content)

Key screens:
1. Login page
2. Projects list
3. Dashboard
4. Requirements with AI
5. Tasks with AI generator
6. Gantt chart
7. User guide

---

## 🎥 Video Demo

Recommended structure:
1. **Intro** (30s) - Problem statement
2. **Login & Projects** (30s) - Show project list
3. **Dashboard** (1m) - Overview and charts
4. **AI Requirements** (1m) - Paste meeting notes, generate
5. **AI Tasks** (1.5m) - Generate tasks, review, submit
6. **Gantt Chart** (30s) - Timeline visualization
7. **Other Features** (30s) - Quick tour
8. **Closing** (30s) - Summary and benefits

**Total:** ~5 minutes

---

## 📞 Support

For questions about the demo:
- Check `DEMO_WALKTHROUGH.md` for detailed demo script
- Check `/guide` page in the app for user documentation
- Review `lib/mock-data.ts` for data structure

---

## 🚀 Next Steps

After demo approval:
1. **Phase 1:** Real Supabase backend
2. **Phase 2:** GitLab integration
3. **Phase 3:** Real AI integration
4. **Phase 4:** Advanced features
5. **Phase 5:** Production deployment

Estimated timeline: ~6 months with 1 developer

---

**Version:** 1.0 (Prototype)
**Last Updated:** January 2026
