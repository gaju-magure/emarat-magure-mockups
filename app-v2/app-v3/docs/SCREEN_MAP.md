# SCREEN MAP

## Core Navigation (5 Screens)
- [ ] **Insights (AI Copilot)** - Default screen, AI chat interface
- [ ] **Home (Dashboard)** - KPIs, active pilots, quick actions
- [ ] **Apps (Gallery)** - Browse all AI apps
- [ ] **Tasks** - Task management
- [ ] **Governance** - Audit and compliance

## App Detail Screens (5 Full-Screen Overlays)
- [ ] **Invoice Reconciliation** - Invoice matching workspace
- [ ] **RFP Evaluation** - RFP scoring and ranking
- [ ] **Demand Forecasting** - Forecasting dashboard with charts
- [ ] **Contract Review** - Contract analysis interface
- [ ] **Customer Insights** - Customer data analysis

## Shared Layout Components
- [ ] **Header** - Logo, search, theme toggle, lang toggle, notifications, profile
- [ ] **MobileLayout** - Header + content + bottom nav (5 tabs)
- [ ] **DesktopLayout** - Header + left sidebar + content + right sidebar
- [ ] **Navigation** - Responsive nav (bottom bar mobile, sidebar desktop)

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
