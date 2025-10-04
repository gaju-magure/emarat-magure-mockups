# Emarat AI - B2E Platform

> AI-powered Business-to-Employee platform for Emirates General Petroleum Corporation (Emarat)

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)

## Overview

Emarat AI is a comprehensive Business-to-Employee (B2E) platform delivering 18 AI-powered solutions designed to reduce costs, improve employee efficiency, and enhance operational excellence across Emarat's retail, commercial, and administrative operations.

### Mission

"An elevated service experience for everybody, every time" - powered by functional, ROI-driven AI that augments employees rather than replacing them.

### Strategic Objectives

1. **AI Data Readiness** - Unified enterprise data layer
2. **AI/ML & Computer Vision Solutions** - Production-grade AI features
3. **AI Governance & Compliance** - Ethical, auditable, compliant AI

## Features

### 8 Core AI Solutions

#### 1. MagVisionIQ Dashboard
**Category:** Analytics & Computer Vision
**Users:** Store Managers, Operations Teams

Complete retail operations intelligence platform:
- **Ask MagVisionIQ** - Conversational AI to query store data
- **Footfall Tracking & Heat Maps** - Customer movement analytics
- **Sales & Revenue Analytics** - Real-time financial insights
- **Inventory Management** - AI-powered stock monitoring
- **Queue Monitoring** - Wait time optimization
- **Staff & Scheduling** - Workforce optimization
- **Security & Compliance** - Safety monitoring
- **Reports & Analytics** - Business intelligence

#### 2. Emarat Insights
**Category:** Natural Language Processing
**Users:** All Employees

Conversational AI that interacts with enterprise data (ERP, POS, CRM) to provide instant business insights and accelerate decision-making.

#### 3. Employee Support Helpdesk
**Category:** Natural Language Processing
**Users:** All Employees

AI-powered HR helpdesk answering queries about leave balance, payroll, insurance, grievances, and HR policies. Reduces HR support tickets by 50-70%.

#### 4. Time & Attendance
**Category:** Computer Vision
**Users:** Retail & Field Employees

Facial recognition-based contactless attendance tracking eliminating time theft and improving payroll accuracy.

#### 5. AI-Powered Hiring
**Category:** Machine Learning
**Users:** HR Managers

Automated candidate pre-screening, resume parsing, and bias-free ranking to reduce time-to-hire by 40-50% while supporting Emiratisation goals.

#### 6. Document Reconciliation
**Category:** AI Agents
**Users:** Finance Teams

Automated invoice generation and 3-way matching (PO, invoice, receipt) reducing AP processing time by 60-80%.

#### 7. Vendor Onboarding
**Category:** Document AI
**Users:** Procurement, Finance

Automatic data extraction from vendor documents (trade license, VAT, bank details) with fraud detection and validation.

#### 8. Demand Forecasting
**Category:** Predictive Analytics
**Users:** Operations, Finance, Store Managers

AI-assisted sales and inventory forecasting improving accuracy by 20-30% and reducing stockouts/overstock situations.

### Additional Features (Roadmap)

- **Safety & Compliance Monitoring** - Computer vision for PPE, unauthorized access, smoking detection
- **Customer Support AI** - 24/7 FAQ automation and agent assistance
- **EmCan App Chatbot** - Fuel station locator, service booking, loyalty queries
- **Product Bundling** - ML-powered cross-sell recommendations
- **Fleet Vehicle Recognition** - License plate tracking and idle time monitoring
- **Contract Review & Generation** - Legal AI for contract analysis

## Technology Stack

### Frontend
- **React 18** with TypeScript - Modern, type-safe UI development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS with dark mode support
- **React Router v6** - Client-side routing with nested routes
- **React Hook Form + Zod** - Type-safe form validation
- **Heroicons** - Beautiful SVG icons
- **Recharts** - Data visualization and charting

### State Management
- **React Context API** - Theme, language, and authentication state
- **React Query** (planned) - Server state management

### Design System
- **Custom Component Library** - Built on Tailwind CSS
- **Emarat Brand Colors** - Official brand palette (#003a85, #47a01a)
- **Emarat Fonts** - Karbon (English), TheSansArabic (Arabic)
- **Dark Mode** - Full theme support with CSS variables
- **RTL/LTR** - Bidirectional layout support

### Backend Integration (Planned)
- **Oracle Fusion** - ERP (HR, Finance, Procurement)
- **LS Retail** - POS (Sales, Inventory)
- **Salesforce** - CRM (Customer data)
- **EmKan** - Loyalty program

## Project Structure

```
emarat-ai/
├── app/                          # React application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── auth/            # Authentication components
│   │   │   ├── layout/          # Layout components (AppLayout, TopActions)
│   │   │   ├── navigation/      # Sidebar, navigation
│   │   │   └── molecules/       # Theme toggles, UI elements
│   │   ├── contexts/            # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── LanguageContext.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── auth/            # Login, 2FA, password reset
│   │   │   ├── features/        # AI feature pages
│   │   │   │   └── magvision/   # MagVisionIQ sub-features
│   │   │   └── DashboardPage.tsx
│   │   ├── config/              # App configuration
│   │   │   └── navigation.ts    # Navigation structure
│   │   ├── types/               # TypeScript type definitions
│   │   ├── styles/              # Global styles, fonts
│   │   ├── App.tsx              # Root component
│   │   └── main.tsx             # Application entry
│   ├── public/                  # Static assets
│   │   ├── fonts/               # Emarat brand fonts
│   │   └── emarat-logo.svg
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── vite.config.ts           # Vite configuration
│   └── package.json
├── docs/                        # Documentation
│   ├── project-overview/        # Client overview, AI features
│   └── ui-ux/                   # Branding, user journeys
├── mock-ups/                    # Design planning
│   ├── 03-screen-map.md         # Complete screen inventory
│   └── 04-implementation-plan.md
├── PROGRESS_TRACKER.md          # Development progress
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- Modern browser with ES2020 support
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emarat-ai/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

### Demo Access

The platform includes 6 demo users for testing:

| User | Role | Email | Features Access |
|------|------|-------|----------------|
| **Sarah** | Store Manager | sarah@emarat.ae | MagVisionIQ, Forecasting, Compliance |
| **Fatima** | HR Manager | fatima@emarat.ae | AI Hiring, Employee Helpdesk |
| **Ali** | Fuel Attendant | ali@emarat.ae | Helpdesk, Time & Attendance |
| **Rashid** | Finance Manager | rashid@emarat.ae | Reconciliation, Vendor Onboarding |
| **Layla** | Retail Employee | layla@emarat.ae | Helpdesk, Attendance |
| **Mohammed** | Procurement | mohammed@emarat.ae | Vendor Onboarding |

**Password:** Any password works in demo mode

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Airbnb style guide
- **Prettier** - Automatic code formatting
- **Conventional Commits** - Commit message standards

### Component Development

1. **Create component** in appropriate directory
2. **Define TypeScript types** for props
3. **Implement dark mode support** using CSS variables
4. **Add responsive design** for mobile, tablet, desktop
5. **Test with all demo users** for role-based access

### Theme System

The platform uses CSS variables for dynamic theming:

```css
/* Light mode */
--color-primary: #003a85
--color-success: #50aa1b
--color-background: #ffffff

/* Dark mode */
--color-primary: #1e87f0
--color-success: #47a01a
--color-background: #1a1a1a
```

Access via Tailwind classes:
- `bg-primary` - Primary blue
- `text-success` - Success green
- `dark:bg-gray-900` - Dark mode background

## Implementation Progress

### ✅ Completed (Phase 1)
- Theme Foundation & Design System
- Authentication System (G1)
- App Shell & Navigation (G2)
- Demo User Selector & Role-Based Navigation
- MagVisionIQ Dashboard Home (F1.1)
- Ask MagVisionIQ Chat Interface (F1.0)
- Footfall Tracking & Heat Maps (F1.6)

### 🔄 In Progress
- MagVisionIQ sub-features (78 screens total)
  - Sales & Revenue (F1.2)
  - Inventory Management (F1.3)
  - Queue Monitoring (F1.4)
  - Staff & Scheduling (F1.5)
  - Security & Compliance (F1.7)
  - Reports & Analytics (F1.8)

### 📋 Planned (Phase 2)
- User Profile & Settings (G3)
- Emarat Insights (F2)
- Employee Support Helpdesk (F3)
- Time & Attendance (F4)
- AI-Powered Hiring (F5)
- Document Reconciliation (F6)
- Vendor Onboarding (F7)
- Demand Forecasting (F8)
- Safety & Compliance (F9)

**Total Screens:** 434
**Completed:** ~50 (12%)
**See [PROGRESS_TRACKER.md](PROGRESS_TRACKER.md) for detailed status**

## Architecture Decisions

### Why Vite?
- 10-100x faster than webpack HMR
- Native ESM support
- Optimal build performance
- Better DX with instant server start

### Why Tailwind CSS?
- Utility-first approach for rapid development
- Built-in dark mode support
- Smaller bundle size than CSS-in-JS
- Easier theme customization
- Better performance

### Why React Context over Redux?
- Simpler state management for app size
- No additional dependencies
- Better TypeScript integration
- Sufficient for B2E platform scope
- Easier to learn for team

### Why React Router v6?
- Modern data-loading patterns
- Nested routing for complex layouts
- Better TypeScript support
- Smaller bundle size
- Active maintenance

## Brand Guidelines

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#003a85` | Logo, headings, primary actions |
| Success Green | `#47a01a` | Logo, success states, navigation icons |
| Light Green | `#50aa1b` | Active states, highlights |
| Dark Gray | `#222222` | Dark mode backgrounds |
| Charcoal | `#464e4c` | Body text |

### Typography

- **English:** Karbon (Regular, Medium)
- **Arabic:** TheSansArabic (Light, Plain, Bold)
- **Base Size:** 16px
- **Line Height:** 1.5

### Logo

- Format: SVG
- Colors: Green (#47a01a) + Blue (#003a85)
- Placement: Top-left in navigation
- Always maintain aspect ratio

## Accessibility

- **WCAG 2.1 AA Compliance** - Target standard
- **Keyboard Navigation** - Full support
- **Screen Readers** - ARIA labels and semantic HTML
- **Color Contrast** - Minimum 4.5:1 for text
- **Focus Indicators** - Visible focus states
- **RTL Support** - Arabic language layouts

## Performance

- **Lighthouse Score Target:** >90
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3.5s
- **Bundle Size:** <500KB (gzipped)
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - WebP with fallbacks

## Security

- **Authentication** - JWT tokens (production)
- **Authorization** - Role-based access control
- **Data Privacy** - GDPR/UAE compliance
- **Input Validation** - Zod schema validation
- **XSS Protection** - React's built-in escaping
- **HTTPS Only** - Production environment

## Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory with optimized static files

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://api.emarat.ae
VITE_AUTH_DOMAIN=auth.emarat.ae
VITE_ENVIRONMENT=production
```

### Hosting Recommendations

- **Vercel** - Recommended for frontend
- **AWS Amplify** - Enterprise option
- **Netlify** - Alternative choice
- **Azure Static Web Apps** - If using Azure AD SSO

## Roadmap

### Phase 1: Foundation (0-3 Months)
- ✅ Theme system and design foundation
- ✅ Authentication and navigation
- 🔄 MagVisionIQ Dashboard (in progress)
- 📋 Core AI features (5 pilots)

### Phase 2: Scale (4-6 Months)
- Productionize pilot features
- Add 5-7 new AI features
- Backend API integration
- User testing and feedback

### Phase 3: Expansion (7-12 Months)
- Roll out remaining features
- Advanced analytics and reporting
- Mobile app (React Native)
- AI model optimization

## Contributing

### Development Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push to remote: `git push origin feature/new-feature`
4. Create Pull Request
5. Wait for code review
6. Merge after approval

### Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor component
test: Add tests
chore: Update dependencies
```

## Support

### Documentation

- **Project Overview:** [docs/project-overview/emarat-client-overview.md](docs/project-overview/emarat-client-overview.md)
- **AI Features:** [docs/project-overview/ai-features-catalog.md](docs/project-overview/ai-features-catalog.md)
- **Brand Guidelines:** [docs/ui-ux/emarat-branding-guidelines.md](docs/ui-ux/emarat-branding-guidelines.md)
- **User Journeys:** [docs/ui-ux/b2e-employee-journeys.md](docs/ui-ux/b2e-employee-journeys.md)
- **Screen Map:** [mock-ups/03-screen-map.md](mock-ups/03-screen-map.md)

### Contact

- **Provider:** Magure
- **Client:** Emirates General Petroleum Corporation (Emarat)
- **Website:** https://www.emarat.ae

## License

Proprietary - © 2025 Magure. All rights reserved.

This software is developed exclusively for Emirates General Petroleum Corporation (Emarat) and is not for public distribution.

---

**Built with ❤️ by Magure for Emarat**

*Empowering employees with functional AI that saves money, improves efficiency, and delivers measurable ROI.*
