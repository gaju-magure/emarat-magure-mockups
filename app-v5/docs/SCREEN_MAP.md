# SCREEN MAP

## Core Navigation (5 Screens)
- [x] **Insights (AI Copilot)** - AI chat interface with quick prompts, conversation, input (127 lines)
- [x] **Home (Dashboard)** - 4 KPI cards, 3 pilots, 4 quick actions (169 lines)
- [x] **Apps (Gallery)** - 6 app cards, filter tabs, status badges (189 lines)
- [x] **Tasks** - 5 tasks by department, priority/status badges (205 lines)
- [x] **Governance** - 4 compliance cards, audit table, documents (270 lines)

## App Detail Screens (5 Full-Screen Overlays)
- [x] **Invoice Reconciliation** - Invoice matching workspace (229 lines)
- [x] **RFP Evaluation** - RFP scoring and ranking (259 lines)
- [x] **Demand Forecasting** - Forecasting dashboard with charts (278 lines)
- [x] **Contract Review** - Contract analysis interface (289 lines)
- [x] **Customer Insights** - Customer data analysis (296 lines)

## Shared Layout Components
- [x] **Header** - Logo, search, theme toggle, lang toggle, notifications, profile
- [x] **Layout** - Unified responsive layout (mobile: header + bottom nav, desktop: header + sidebar)
- [x] **Navigation** - Responsive nav (bottom bar mobile, sidebar desktop)

## Per-Screen Component Breakdown

### Insights Screen
- [ ] ChatMessageList (virtualized scroll, message bubbles)
- [ ] ChatInput (text input, file upload, voice button, 44px touch)
- [ ] AlertsBar (dismissible cards, horizontal scroll)
- [ ] QuickActionsRow (4 action buttons)

### Home Screen
- [ ] KPICardGrid (responsive 1/2/3 cols, stat cards)
- [ ] ActivePilotsCarousel (horizontal swipe cards)
- [ ] TasksPreview (last 3 tasks, link to Tasks screen)
- [ ] QuickActionsGrid (4 large buttons)

### Apps Gallery Screen
- [ ] AppCardGrid (responsive 1/2/3 cols)
- [ ] AppCard (icon, name, status badge, stats, description)
- [ ] FilterTabs (All/Live/In Development/Planned)
- [ ] AppModal (overlay on card click, full app details)

### Tasks Screen
- [ ] TaskList (grouped by department)
- [ ] TaskCard (title, assignee, due date, priority badge)
- [ ] TaskFilters (status, department, priority)

### Governance Screen
- [ ] AuditLogTable (responsive, virtualized)
- [ ] ComplianceStatusCards (metrics cards)
- [ ] DocumentsSection (list of compliance docs)

### Invoice Reconciliation App
- [ ] AppHeader (back button, title, actions)
- [ ] ChatTab (AI chat interface)
- [ ] WorkspaceTab (invoice list, matching data)
- [ ] InvoiceList (table with filters, search)
- [ ] MatchingConfidenceIndicator (visual score 0-100%)

### RFP Evaluation App
- [ ] ProposalList (cards with scores)
- [ ] ScoringMatrix (criteria table)
- [ ] ComparisonView (side-by-side proposals)

### Demand Forecasting App
- [ ] ForecastChart (line chart, responsive)
- [ ] MetricsCards (accuracy, confidence, variance)
- [ ] TimeRangeSelector (dropdown)

### Contract Review App
- [ ] DocumentViewer (PDF/text viewer)
- [ ] IssuesPanel (flagged clauses, risk scores)
- [ ] SummarySection (AI-generated summary)

### Customer Insights App
- [ ] CustomerSegmentChart (pie/bar chart)
- [ ] InsightsCards (key findings)
- [ ] FilterControls (date range, segments)

## Design System Components (From app-v2, to be imported as needed)
- [ ] Button (primary, secondary, ghost, icon variants)
- [ ] Input (text, search, with icons)
- [ ] Card (elevated, flat, bordered)
- [ ] Badge (status, count, color variants)
- [ ] Tabs (horizontal, vertical, responsive)
- [ ] Dialog (modal, drawer variants)
- [ ] Table (responsive, sortable, filterable)
- [ ] Select (dropdown, multi-select)
- [ ] Checkbox, Radio, Switch
- [ ] Tooltip, Popover
- [ ] Avatar, Skeleton
- [ ] Progress, Slider
- [ ] Alert, Toast (using sonner)
- [ ] Separator, ScrollArea

## Theme System Components
- [x] ThemeProvider (context + localStorage sync)
- [x] ThemeToggle (button component)
- [x] LanguageProvider (i18next wrapper)
- [x] LanguageToggle (button component)
- [x] BrandConfigLoader (reads env, provides logo/colors)
- [x] AppProviders (combines all providers)

## Foundation (Phase 1)
- [x] Project structure
- [x] Package.json with dependencies
- [x] Tailwind config (Emarat brand colors)
- [x] Vite, TypeScript, PostCSS config
- [x] CSS variables for theme switching
- [x] Spacing tokens (mobile-first)
- [x] Brand config loader
- [x] Theme system (provider, hook, toggle)
- [x] Language system (provider, hook, toggle, i18n)
- [x] Base styles and fonts
- [x] Demo app showing toggles working
