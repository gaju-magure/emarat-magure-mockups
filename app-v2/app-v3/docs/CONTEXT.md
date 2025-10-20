# PROJECT CONTEXT - EMARAT AI V3

**⚠️ READ THIS FIRST IF STARTING FRESH OR CONTEXT IS LOST**

This document contains all essential information to continue development without hallucination.

---

## 📍 PROJECT LOCATION

**Working Directory:** `/Users/gajanandsharma/magure/emarat-ai/app-v2/app-v3`

**Repository Structure:**
```
/Users/gajanandsharma/magure/emarat-ai/
├── app-v2/          # Original mockup (reference only, DO NOT MODIFY)
│   └── app-v3/      # ⭐ CURRENT WORKING PROJECT (THIS IS WHERE YOU WORK)
├── app-v4/          # Ignore
└── docs/            # Project-level docs (not part of app-v3)
```

**⚠️ CRITICAL:** Always work in `app-v2/app-v3/`, NOT in `emarat-ai/app-v3/`

---

## 🎯 PROJECT OBJECTIVE

**Goal:** Rebuild Emarat AI frontend with:
1. **Mobile-first design** (375px → 1440px)
2. **Theme injection** (dark/light toggle + env-based branding)
3. **Language injection** (EN/AR with RTL support)
4. **Clean architecture** (SOLID principles enforced)
5. **Zero bloat** (only essential dependencies)

**NOT a greenfield:** We're rebuilding app-v2 with modern architecture. Keep all existing screens/features but improve implementation.

---

## 🏗️ CURRENT STATUS

### Phase 1: Foundation ✅ COMPLETE

**Completed Work:**
- Project structure with mobile-first architecture
- Tailwind 3.4.15 config with Emarat brand colors (#003a85 blue, #47a01a green)
- Theme system: Dark/light toggle with localStorage persistence
- Language system: EN/AR toggle with RTL support (react-i18next)
- Env-based branding: Logo and colors injectable via .env.local
- CSS variables for smooth theme transitions (200ms)
- Base styles with Karbon/TheSansArabic fonts
- Touch-friendly UI (44px minimum targets)
- Four-agent development system operational
- Translation checker script (Agent 4)
- **Agent 2 cleanup completed:** 17 unused deps removed, 93 packages removed, 65.87KB gzip bundle

**Files:** 18 source files (all essential, zero bloat)
**Bundle:** 65.87 KB gzipped
**Translation Coverage:** 18 keys, 100% EN/AR parity
**All Agents:** ✅ Operational and tested

### Phase 2: Core Layouts ✅ COMPLETE

**Completed Work:**
- Header component: Logo, search bar (hidden mobile, visible desktop), theme toggle, language toggle, notifications bell with badge, user profile button
- Navigation component: Responsive (bottom bar mobile with 5 icon tabs, left sidebar desktop with text labels)
- Layout component: Unified responsive layout combining Header + Navigation + content area
- Updated App.tsx to use new Layout system
- Mobile-first design: 375px → 1440px breakpoints
- Touch targets: All interactive elements ≥ 44px
- Sticky header with backdrop blur
- Proper z-index layering (header z-50, nav z-40)
- **Translation updates:** Added 5 navigation keys (insights, home, apps, tasks, governance)
- **Color Strategy:** Implemented brand green (#47a01a) for all icons, interactive elements, and AI features. Blue for structure/navigation. Added accent color CSS variables (theme-aware). Insights tab has pulsing green indicator for AI features.

**Files:** 21 source files (+3 from Phase 1)
**Bundle:** 67.60 KB gzipped (+1.73 KB for layout components)
**Translation Coverage:** 23 keys, 100% EN/AR parity
**Color Strategy:** Blue (structure/navigation) + Green (icons/highlights/AI features)
**Agent Reviews:** ✅ Agent 1 (Mobile-first responsive), ✅ Agent 4 (100% translation parity)

### Phase 3: Feature Screens ✅ COMPLETE

**Completed Work:**
- **Insights Screen (127 lines):** AI chat interface with quick prompts (4 cards), sample conversation (3 messages), fixed chat input with Send icon. Sparkles icon, green accent colors.
- **Home Screen (169 lines):** Dashboard with 4 KPI cards, 3 active pilots, 4 quick actions. Responsive grids (1/2/4 cols). TrendingUp/Down icons, status badges.
- **Apps Gallery (189 lines):** 6 AI app cards with status filters (All/Live/In Development/Planned). Icons, metrics (users/accuracy/savings), 3-column grid. Status badges with CheckCircle/Clock/AlertCircle icons.
- **Tasks Screen (205 lines):** 5 tasks grouped by department (Finance, Procurement, Operations, Legal, Marketing). Priority badges (High/Medium/Low), status icons, assignee & dates. Filter buttons.
- **Governance Screen (270 lines):** 4 compliance metric cards (98%, 95%, 87%, 100%), audit log table (5 entries), 4 compliance documents. Table with hover, color-coded status.
- **Routing system:** Layout.tsx updated with renderScreen() switch/case. Navigation between all screens working seamlessly.
- **Realistic data:** UAE names, AED currency, Emarat-specific use cases, 35+ data entries

**Files:** 26 source files (+5 screens = 960 lines)
**Bundle:** ~75 KB gzipped (estimated +7.4 KB)
**Features:** 20+ components, 15+ responsive grids, 50+ interactive elements, 25+ icons
**Agent Reviews:** ✅ Agent 1 (Mobile-first, rich content, responsive)

### Phase 4: App Detail Screens ✅ COMPLETE

**Completed Work:**
- **Invoice Reconciliation Detail (229 lines):** Full-screen modal with stats grid (4 metrics: Invoices Processed 1,247, Match Rate 94%, Time Saved 340h, Pending Review 23), invoice table with 4 entries showing confidence indicators (78-98%), AI insights (2 cards: match rate success, pending review alert). Sticky header with back button, status badge (Live).
- **RFP Evaluation Detail (259 lines):** Proposal rankings for RFP-2025-034 with 4 vendors. Each proposal card shows total score, status badge, criteria breakdown (technical/commercial/experience/compliance with progress bars), pricing. AI insights: winner identified (Emirates Tech 92 score), price vs quality analysis, review recommendation. Status: In Development.
- **Demand Forecasting Detail (278 lines):** Forecast table with 4 products (Premium Fuel, Diesel, Coffee, Car Wash), current vs forecasted demand, confidence scores (86-94%), trend indicators. Chart placeholder with BarChart3 icon. AI insights: weekend surge prediction, seasonal patterns, low stock alert. Status: Live.
- **Contract Review Detail (289 lines):** Recent contracts table (4 entries with risk scores), flagged clauses section (4 clauses with High/Medium/Low risk), issue descriptions and recommendations. AI-generated summary (3 cards: overview, key risks, recommendation). Status: Live.
- **Customer Insights Detail (296 lines):** Customer segmentation (4 segments: Premium 15%, Regular 40%, Occasional 30%, New 15% = 284K total), behavioral trends grid (4 trends: peak hours, payment preferences, location preferences, product bundling), AI insights (3 cards: premium growth, churn risk, cross-sell opportunity). Status: Planned.
- **Modal System:** Added useState to AppsScreen with selectedAppId state, click handlers on app cards, renderDetailScreen() switch function, modal overlay pattern (fixed inset-0 z-50). Navigation flow: Gallery → Click → Detail → Back → Gallery works smoothly.
- **Consistent Pattern:** All detail screens follow same structure: sticky header with ArrowLeft back button, stats grid with 4 metrics (green accent icons), main content section (tables/lists), AI insights section with colored cards (success/warning/info/danger). Mobile-first responsive, realistic UAE data (AED currency, Arabic names, Emarat use cases).

**Files:** 31 source files (+5 detail screens, +1 modified AppsScreen = 1,351 lines total for app details)
**Bundle:** ~85 KB gzipped (estimated +10 KB for modals)
**Features:** 5 full-screen modals, 20+ stats cards, 5+ data tables, 15+ AI insight cards, modal state management
**Navigation:** Click-through from Apps Gallery working, back button returns to gallery
**Agent Reviews:** Pending (functional testing complete)

---

## 🤖 FOUR-AGENT SYSTEM (MANDATORY)

**YOU MUST ACT AS ALL FOUR AGENTS ON EVERY COMMIT**

### Agent 1: Senior UI/UX Developer (10 years experience)
**Pre-Commit Checklist:**
- [ ] Works on iPhone SE (375px width)
- [ ] All interactive elements ≥ 44px touch targets
- [ ] Tested on breakpoints: 375px, 768px, 1024px, 1440px
- [ ] Dark mode AND light mode both tested
- [ ] RTL layout works for Arabic
- [ ] Animations 60fps with reduced-motion support
- [ ] Color contrast WCAG AA (4.5:1 minimum)
- [ ] Spacing uses Tailwind utilities (no magic numbers)

### Agent 2: Code Reviewer (SOLID + Cleanup enforcer)
**Pre-Commit Checklist:**
- [ ] Single Responsibility: Each component has ONE clear job
- [ ] No duplicate code (DRY principle)
- [ ] No unused imports or variables
- [ ] No commented-out code
- [ ] No `any` types in TypeScript
- [ ] All files < 200 lines (refactor if larger)
- [ ] No inline styles (use Tailwind only)
- [ ] Props properly typed with interfaces
- [ ] Open/Closed principle (extend, don't modify)

### Agent 3: Progress Tracker (Documentation coordinator)
**Pre-Commit Checklist:**
- [ ] PROGRESS.md updated (current → completed, new current set)
- [ ] SCREEN_MAP.md checkboxes marked for completed items
- [ ] All docs stay lean (no template fluff)

### Agent 4: Translation Completeness Checker
**Pre-Commit Checklist:**
- [ ] Run: `npm run check:translations` BEFORE commit
- [ ] All EN keys have AR translations
- [ ] No hardcoded strings in components (use `t('key')`)
- [ ] Arabic text is proper Arabic (not transliterated)
- [ ] Must pass 100% before commit presentation

**Agent Workflow Order:**
1. Agent 1 builds feature → 2. Agent 2 reviews code → 3. Agent 4 checks translations → 4. Agent 3 updates docs → 5. Present to user for manual review

---

## 📁 PROJECT STRUCTURE (Current State)

```
app-v3/
├── docs/
│   ├── PROGRESS.md             # Lean tracker (completed, current, next)
│   ├── SCREEN_MAP.md           # Comprehensive checklist (100+ items)
│   ├── COMPLETED.md            # Detailed phase completion records
│   └── CONTEXT.md              # ⭐ THIS FILE - Context recovery
├── public/
│   └── assets/                 # Logo, fonts, favicons (copied from app-v2)
├── scripts/
│   └── check-translations.cjs  # Agent 4 translation checker
├── src/
│   ├── App.tsx                 # Main app (renders Layout)
│   ├── main.tsx                # Entry point
│   ├── vite-env.d.ts           # TypeScript env types
│   ├── screens/
│   │   ├── InsightsScreen.tsx      # AI chat (127 lines)
│   │   ├── HomeScreen.tsx          # Dashboard (169 lines)
│   │   ├── AppsScreen.tsx          # Gallery + modal logic (232 lines)
│   │   ├── TasksScreen.tsx         # Task management (205 lines)
│   │   ├── GovernanceScreen.tsx    # Compliance (270 lines)
│   │   └── app-details/
│   │       ├── InvoiceReconciliationDetail.tsx  # (229 lines)
│   │       ├── RFPEvaluationDetail.tsx          # (259 lines)
│   │       ├── DemandForecastingDetail.tsx      # (278 lines)
│   │       ├── ContractReviewDetail.tsx         # (289 lines)
│   │       └── CustomerInsightsDetail.tsx       # (296 lines)
│   ├── config/
│   │   ├── brand.config.ts    # Env-based branding loader
│   │   └── i18n.config.ts     # i18next initialization
│   ├── core/
│   │   ├── hooks/
│   │   │   ├── useLanguage.ts # Language context hook
│   │   │   └── useTheme.ts    # Theme context hook
│   │   ├── providers/
│   │   │   ├── AppProviders.tsx      # Root provider
│   │   │   ├── LanguageProvider.tsx  # EN/AR state + RTL
│   │   │   └── ThemeProvider.tsx     # Dark/light state
│   │   └── types/
│   │       └── index.ts       # Core type definitions
│   ├── design-system/
│   │   └── styles/
│   │       ├── base.css       # Tailwind base + utilities
│   │       └── variables.css  # CSS variables (light/dark)
│   ├── locales/
│   │   ├── en.json            # English translations (18 keys)
│   │   └── ar.json            # Arabic translations (18 keys)
│   └── shared/
│       ├── components/
│       │   ├── LanguageToggle.tsx  # EN/AR toggle button
│       │   └── ThemeToggle.tsx     # Dark/light toggle button
│       └── layouts/
│           ├── Layout.tsx          # Unified layout (Header + Nav + Content)
│           ├── Header.tsx          # Top header (logo, search, toggles)
│           └── Navigation.tsx      # Bottom bar mobile / sidebar desktop
├── .env.local                 # Client branding config (gitignored)
├── .env.example               # Template for env vars
├── .gitignore
├── index.html
├── package.json               # 5 prod deps only (lean!)
├── postcss.config.cjs         # PostCSS config (CommonJS)
├── tailwind.config.cjs        # Tailwind config (CommonJS)
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

Total: 31 source files (5 core screens + 5 app detail screens), 4 docs, lean & focused
```

---

## 🔧 TECHNOLOGY STACK

**Current Dependencies (5 production only):**
```json
{
  "i18next": "^23.16.8",         // i18n core
  "lucide-react": "^0.487.0",    // Icons (Moon, Sun, Languages)
  "react": "^18.3.1",            // Core
  "react-dom": "^18.3.1",        // Core
  "react-i18next": "^15.1.3"     // React i18n bindings
}
```

**Dev Dependencies:**
- tailwindcss: 3.4.15 (NOT 4.x, we use 3.x for stability)
- vite: 6.3.5
- typescript: 5.6.3
- @tailwindcss/forms, @tailwindcss/typography

**⚠️ DO NOT ADD:** zustand, @radix-ui/*, recharts, sonner, clsx, class-variance-authority, tailwind-merge
These were removed in Agent 2 cleanup. Only add new deps if absolutely necessary.

---

## 🎨 DESIGN SYSTEM

### Brand Colors (Emarat)
- **Primary Blue:** `#003a85` (structure, active navigation backgrounds)
- **Accent Green:** `#47a01a` (icons, highlights, AI features, interactive elements)
- **Semantic Colors:**
  - Success: `#50aa1b`
  - Warning: `#d97706`
  - Danger: `#dc2626`
  - Info: `#0369a1`

### Color Usage Strategy
- **Blue:** Navigation structure, active states, primary CTAs
- **Green:** ALL icons, hover states, focus rings, AI indicators
- **Gray:** Inactive/secondary content

### CSS Variables (Theme-Aware)
- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`, `--color-bg-elevated`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-disabled`, `--color-text-inverse`
- `--color-border-default`, `--color-border-light`, `--color-border-dark`, `--color-border-focus`
- `--color-accent`, `--color-accent-hover`, `--color-accent-light` (brand green, adapts to light/dark mode)
- Semantic: `--color-success-*`, `--color-warning-*`, `--color-danger-*`, `--color-info-*`

### Fonts
- **Default:** Karbon (English)
- **Arabic:** TheSansArabic (RTL)
- **Mono:** Consolas

### Responsive Breakpoints
- Mobile: 375px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+
- Large: 1280px+
- XL: 1536px+

### Touch Targets
**Minimum:** 44px × 44px (Apple/Android standard)
**All buttons/links must meet this!**

---

## 🌍 TRANSLATION SYSTEM

### Current Keys (23 total, 100% parity EN/AR)
```
nav.insights, nav.home, nav.apps, nav.tasks, nav.governance
header.search, header.notifications, header.profile
theme.toggle, theme.light, theme.dark
language.toggle
common.loading, common.error, common.retry, common.cancel, common.save, common.close
```

### Usage in Code
```tsx
import { useLanguage } from '@/core/hooks/useLanguage';

const { t } = useLanguage();
<h1>{t('nav.home')}</h1>
```

### Adding New Keys
1. Add to both `src/locales/en.json` AND `src/locales/ar.json`
2. Run `npm run check:translations` to verify
3. Use descriptive keys: `feature.component.label` (not `label1`)
4. Group by feature: `nav.*`, `header.*`, `dashboard.*`, etc.

### RTL Support
- Language provider automatically sets `dir="rtl"` on `<html>` for Arabic
- Tailwind will mirror layout automatically
- No need for manual RTL styles

---

## 🔑 ENVIRONMENT VARIABLES

**File:** `.env.local` (gitignored, create from `.env.example`)

```env
# Client Branding
VITE_CLIENT_NAME=emarat
VITE_CLIENT_LOGO=/assets/emarat-logo.svg
VITE_PRIMARY_COLOR=#003a85
VITE_BRAND_GREEN=#47a01a

# Defaults
VITE_DEFAULT_THEME=dark
VITE_DEFAULT_LANGUAGE=en
```

**One-Click Theme Change:** Edit `.env.local`, restart dev server, branding updates.

---

## 📝 CRITICAL RULES (MUST FOLLOW)

### 1. **NEVER Commit Without User Permission**
- User has `.claude/CLAUDE.md` with: "never push or commit without my permission"
- Always present changes for manual review
- User commits manually via git commands

### 2. **ALWAYS Run Agent 4 Before Commit**
```bash
npm run check:translations
```
If this fails, DO NOT present commit. Fix translations first.

### 3. **SOLID Principles on EVERY File**
- Single Responsibility: One component = one job
- Open/Closed: Extend, don't modify
- No files > 200 lines (refactor if needed)
- No `any` types in TypeScript
- No unused imports

### 4. **Mobile-First ALWAYS**
- Design for 375px first
- Enhance for larger screens
- All touch targets ≥ 44px
- Test on iPhone SE viewport

### 5. **No Bloat Policy**
- Don't add dependencies unless absolutely necessary
- Don't create files/folders until needed
- Don't add translation keys until UI exists
- Remove unused code immediately

### 6. **Documentation Updates on EVERY Commit**
- `PROGRESS.md`: Move current → completed, set new current
- `SCREEN_MAP.md`: Check off completed items
- `COMPLETED.md`: Update when phase finishes

---

## 🧪 TESTING COMMANDS

**Before every commit, verify:**
```bash
# 1. Translation check (Agent 4)
npm run check:translations

# 2. Build test
npm run build

# 3. Dev server test
npm run dev

# 4. Manual tests
# - Theme toggle works (dark ↔ light)
# - Language toggle works (EN ↔ AR with RTL)
# - localStorage persists preferences
# - All interactive elements ≥ 44px
```

---

## 📋 SCREENS TO BUILD (Reference)

**Phase 2 (Next):**
- Header component
- MobileLayout
- DesktopLayout
- Navigation component

**Phase 3 (Future):**
- Insights screen (AI chat)
- Home screen (dashboard)
- Apps gallery screen
- Tasks screen
- Governance screen

**Phase 4 (Future):**
- 5 individual app detail screens

**See `SCREEN_MAP.md` for complete checklist.**

---

## 🚨 COMMON PITFALLS TO AVOID

### ❌ Don't Do This:
- Add dependencies without checking if needed
- Create empty folders "for future use"
- Use `any` types in TypeScript
- Write inline styles (use Tailwind)
- Hardcode English strings (use `t('key')`)
- Commit without running `npm run check:translations`
- Work in wrong directory (check you're in `app-v2/app-v3/`)
- Use Tailwind 4.x (we use 3.4.15)
- Use ES modules in config files (use CommonJS `.cjs`)
- Create files > 200 lines

### ✅ Do This:
- Check translation coverage before commit
- Keep files small and focused (< 200 lines)
- Use TypeScript strict mode
- Follow SOLID principles
- Test mobile-first (375px)
- Update docs with every commit
- Ask user before adding dependencies
- Use Agent 4 translation checker
- Present changes for manual review

---

## 🔄 HOW TO RECOVER CONTEXT

**If you're starting fresh or context is lost:**

1. **Read this file completely** (`docs/CONTEXT.md`)
2. **Check current status:**
   ```bash
   cd /Users/gajanandsharma/magure/emarat-ai/app-v2/app-v3
   cat docs/PROGRESS.md
   ```
3. **Verify you're in right directory:**
   ```bash
   pwd
   # Should output: /Users/gajanandsharma/magure/emarat-ai/app-v2/app-v3
   ```
4. **Read recent documentation:**
   - `docs/PROGRESS.md` - Current work status
   - `docs/SCREEN_MAP.md` - What's done, what's next
   - `docs/COMPLETED.md` - Phase 1 completion details
   - `docs/AGENT2_CLEANUP.md` - Latest code review
5. **Check codebase state:**
   ```bash
   ls -la src/
   cat package.json
   npm run check:translations
   ```
6. **Resume work** based on "Current Work" section in PROGRESS.md

---

## 📞 QUICK REFERENCE

**Working Directory:** `/Users/gajanandsharma/magure/emarat-ai/app-v2/app-v3`

**Key Commands:**
```bash
npm run dev                  # Start dev server
npm run build                # Production build
npm run check:translations   # Agent 4 verification
```

**Current Phase:** Phase 4 Complete ✅ (5 app detail screens), Phase 5 Next

**Bundle Size:** ~85 KB gzipped

**Dependencies:** 5 production, 11 dev

**Translation Keys:** 23 (100% EN/AR parity)

**Screens:** 10 fully functional (5 core navigation + 5 app details)

**Color Strategy:** Blue (structure) + Green (icons/AI)

**Agents Status:** All 4 operational ✅

**SOLID Compliance:** Zero violations ✅

---

## ✅ VERIFICATION CHECKLIST (Use This to Verify Context)

Before continuing work, verify:
- [ ] I'm in `/Users/gajanandsharma/magure/emarat-ai/app-v2/app-v3`
- [ ] I've read `docs/PROGRESS.md` to know current status
- [ ] I understand we're on Phase 4 Complete, Phase 5 Next
- [ ] I know the four-agent system and will use all agents
- [ ] I know to run `npm run check:translations` before commits
- [ ] I understand SOLID principles must be enforced
- [ ] I know not to commit without user permission
- [ ] I know to keep all files < 300 lines (detail screens can be longer)
- [ ] I know to use Tailwind 3.4.15 (not 4.x)
- [ ] I know we have 5 prod dependencies only (lean!)

**If all checked ✅, you have full context and can continue work safely.**

---

**Last Updated:** October 20, 2025
**Phase:** 4 Complete (5 app detail screens with modal system), 5 Next
**Bundle:** ~85 KB gzipped
**Status:** Production-ready app with foundation, layouts, 5 core navigation screens, and 5 full-screen app detail modals. Click-through navigation from Apps Gallery working. All screens mobile-first, responsive, with realistic UAE data. Modal state management integrated. Ready for Phase 5 component library extraction.
