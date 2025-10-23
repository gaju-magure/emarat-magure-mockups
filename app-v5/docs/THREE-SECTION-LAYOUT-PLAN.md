# THREE-SECTION LAYOUT PLAN
**Mobile-First Collapsible Navigation + Chat + Alerts/Info**

## 🎯 Vision
Transform the app into a three-section powerhouse layout:
1. **Navigation Bar** - Collapsible (icons only → expands on hover)
2. **Chat Screen** - Center stage (AI chat interface)
3. **Alerts & Info** - Right panel with live data

**Design Philosophy:**
- Borderless glassmorphic cards
- Floating shadows creating depth
- Expandable/collapsible sections
- Mobile-first responsive behavior

---

## 📐 Layout Architecture

### Desktop (1440px+)
```
┌────────────────────────────────────────────────────────────────┐
│ [Nav]      │      Chat Screen (Flex)      │  [Alerts & Info]  │
│ Icons      │                              │                   │
│ Only       │  - AI Chat Interface         │  • System Alerts  │
│ (64px)     │  - Messages                  │  • Activity Feed  │
│            │  - Input Bar                 │  • Quick Stats    │
│ Expands ──>│                              │                   │
│ on Hover   │                              │  (320px fixed)    │
│ (256px)    │                              │                   │
└────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌────────────────────────────────────────────────────────────────┐
│ [Nav]      │      Chat Screen (Full Width)                     │
│ Icons      │                                                    │
│ Only       │  Alerts accessible via:                           │
│ (64px)     │  [Bell Icon] → Slide-in Drawer from right         │
│            │                                                    │
│ Expands ──>│                                                    │
│ on Hover   │                                                    │
│ (256px)    │                                                    │
└────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│              Chat Screen (Full Width, Full Height)              │
│                                                                 │
│                                                    [Bell FAB]◄──┤
│                                                    (Floating)   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
│          [5 Nav Icons - Bottom Bar - Fixed]                    │
└────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Components to Build

### 1. CollapsibleNav Component ✨ (NEW)
**Purpose:** Sleek icon-only navigation that expands on hover

**States:**
- **Collapsed (default):** 64px width, icons only, tooltips on hover
- **Expanded (hover):** 256px width, icons + labels, smooth transition

**Features:**
- Glassmorphic background with backdrop blur
- Active state: Blue glow + scale
- AI indicator: Green pulsing dot on Insights icon
- Smooth width transition (300ms cubic-bezier)
- Labels fade in/out with opacity transition
- Floating shadow that intensifies on hover

**Structure:**
```tsx
<nav className="collapsible-nav">
  <div className="nav-logo">Logo (visible when expanded)</div>

  <div className="nav-items">
    {/* Insights */}
    <NavItem icon={Lightbulb} label="Insights" active />

    {/* Home */}
    <NavItem icon={Home} label="Home" />

    {/* Apps */}
    <NavItem icon={Grid3x3} label="Apps" />

    {/* Tasks */}
    <NavItem icon={CheckSquare} label="Tasks" />

    {/* Governance */}
    <NavItem icon={Shield} label="Governance" />
  </div>

  <div className="nav-footer">
    <NavItem icon={Settings} label="Settings" />
  </div>
</nav>
```

### 2. AlertsPanel Component 📢 (NEW)
**Purpose:** Live alerts, activity feed, and quick stats

**Three Sections:**

#### Section 1: System Alerts (Top Priority)
```tsx
interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ReactNode;
}
```

**Sample Data:**
- 🔴 High Priority: "Invoice mismatch detected in Batch #4521"
- ⚠️ Warning: "RFP Evaluation deadline in 2 hours"
- ✅ Success: "Contract Review completed for ADNOC tender"
- 🔵 Info: "New AI model deployed for demand forecasting"

#### Section 2: Recent Activity (Timeline)
```tsx
interface Activity {
  id: string;
  icon: string | React.ReactNode;
  action: string;
  user: string;
  time: string;
  type: 'ai' | 'user' | 'system';
}
```

**Sample Data:**
- 🤖 AI: "Jarvis analyzed 247 invoices" - 5 min ago
- 👤 User: "Ahmed reviewed RFP #1234" - 12 min ago
- ⚙️ System: "Batch import completed" - 18 min ago
- 🤖 AI: "Contract risks identified in 3 documents" - 25 min ago
- 👤 User: "Fatima updated demand forecast" - 32 min ago

#### Section 3: Quick Stats (Mini KPIs)
```tsx
interface QuickStat {
  label: string;
  value: string;
  change: number; // percentage
  trend: 'up' | 'down';
  icon: React.ReactNode;
}
```

**Sample Data:**
- 💬 Active Chats: 12 (+3 today)
- ⚡ AI Actions: 247 (+18%)
- 📊 Tasks Today: 8/15 (53%)
- 🎯 Accuracy: 98.5% (+0.3%)

**Design:**
- Glassmorphic cards with floating shadows
- Colored indicators (success/warning/danger/info glows)
- Scrollable sections with smooth overflow
- Unread badge counters
- "View All" links

### 3. ThreeColumnLayout Component 🏗️ (NEW)
**Purpose:** Master layout wrapper managing all three sections

**Responsibilities:**
- Responsive column management
- Panel visibility state (alerts drawer on tablet/mobile)
- Width calculations and transitions
- Z-index layering

**Structure:**
```tsx
<div className="three-column-layout">
  <CollapsibleNav currentView={view} onNavigate={setView} />

  <main className="center-content">
    {renderCurrentScreen()}
  </main>

  <AlertsPanel
    isOpen={isAlertsOpen}
    onClose={() => setIsAlertsOpen(false)}
  />

  {/* Mobile: Floating Alerts Button */}
  <button className="alerts-fab lg:hidden">
    <Bell />
    {unreadCount > 0 && <Badge count={unreadCount} />}
  </button>
</div>
```

---

## 🎨 Design System Updates

### New CSS Variables
```css
/* Navigation Dimensions */
--nav-collapsed-width: 64px;
--nav-expanded-width: 256px;
--nav-transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Alerts Panel */
--alerts-panel-width: 320px;
--alerts-drawer-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Layout Spacing */
--layout-gap: 16px;
--content-max-width: 1400px;
```

### New Utility Classes
```css
/* Collapsible Navigation */
.collapsible-nav {
  @apply h-full border-r border-glow;
  @apply bg-background-elevated backdrop-blur-glass-sm;
  @apply transition-all duration-300 ease-out;
  width: var(--nav-collapsed-width);
}

.collapsible-nav:hover {
  width: var(--nav-expanded-width);
  @apply shadow-float-lg;
}

/* Alerts Panel */
.alerts-panel {
  @apply h-full border-l border-glow;
  @apply bg-background-elevated backdrop-blur-glass-sm;
  @apply shadow-float-md overflow-hidden;
  width: var(--alerts-panel-width);
}

/* Alerts FAB (Mobile) */
.alerts-fab {
  @apply fixed bottom-24 right-4 z-40;
  @apply w-14 h-14 rounded-full;
  @apply bg-primary text-white;
  @apply shadow-glow-primary;
  @apply hover:shadow-glow-lg hover:scale-110;
  @apply active:scale-95;
  @apply transition-all duration-300;
}
```

---

## 📊 Sample Data Models

### File: `src/shared/types/alerts-data-models.ts`
```typescript
export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export interface Activity {
  id: string;
  icon: string; // emoji or icon name
  action: string;
  user: string;
  time: string;
  type: 'ai' | 'user' | 'system';
  details?: string;
}

export interface QuickStat {
  label: string;
  value: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: 'primary' | 'accent' | 'success' | 'warning';
}

export interface AlertsPanelData {
  alerts: Alert[];
  activities: Activity[];
  stats: QuickStat[];
  unreadCount: number;
}
```

### Sample Data
```typescript
export const SAMPLE_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'error',
    title: 'Invoice Mismatch Detected',
    message: 'Batch #4521 has 3 invoices with discrepancies exceeding AED 10,000',
    time: '5 min ago',
    read: false,
    priority: 'high',
    actionUrl: '/apps/invoice-reconciliation',
  },
  {
    id: '2',
    type: 'warning',
    title: 'RFP Evaluation Deadline',
    message: 'Tender #RFP-2025-089 evaluation due in 2 hours',
    time: '12 min ago',
    read: false,
    priority: 'high',
  },
  {
    id: '3',
    type: 'success',
    title: 'Contract Review Complete',
    message: 'AI completed review of ADNOC supply agreement - 0 high-risk clauses',
    time: '1 hour ago',
    read: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'info',
    title: 'Model Update Deployed',
    message: 'Demand forecasting accuracy improved to 98.5%',
    time: '3 hours ago',
    read: true,
    priority: 'low',
  },
];

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    icon: '🤖',
    action: 'Analyzed 247 invoices',
    user: 'Emarat AI',
    time: '5 min ago',
    type: 'ai',
    details: 'Invoice Reconciliation batch completed',
  },
  {
    id: '2',
    icon: '👤',
    action: 'Reviewed RFP proposal',
    user: 'Ahmed Al Mazrouei',
    time: '12 min ago',
    type: 'user',
  },
  {
    id: '3',
    icon: '⚙️',
    action: 'Batch import completed',
    user: 'System',
    time: '18 min ago',
    type: 'system',
  },
  {
    id: '4',
    icon: '🤖',
    action: 'Identified contract risks',
    user: 'Emarat AI',
    time: '25 min ago',
    type: 'ai',
    details: '3 high-risk clauses flagged in legal documents',
  },
  {
    id: '5',
    icon: '👤',
    action: 'Updated demand forecast',
    user: 'Fatima Hassan',
    time: '32 min ago',
    type: 'user',
  },
];

export const SAMPLE_QUICK_STATS: QuickStat[] = [
  {
    label: 'Active Chats',
    value: '12',
    change: 3,
    trend: 'up',
    icon: <MessageSquare />,
    color: 'primary',
  },
  {
    label: 'AI Actions Today',
    value: '247',
    change: 18,
    trend: 'up',
    icon: <Sparkles />,
    color: 'accent',
  },
  {
    label: 'Tasks Completed',
    value: '8/15',
    change: 53,
    trend: 'neutral',
    icon: <CheckCircle />,
    color: 'success',
  },
  {
    label: 'AI Accuracy',
    value: '98.5%',
    change: 0.3,
    trend: 'up',
    icon: <Target />,
    color: 'accent',
  },
];
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Data Models & Types)
- [x] Document plan
- [ ] Create `alerts-data-models.ts` with TypeScript interfaces
- [ ] Create sample data constants
- [ ] Update CSS variables for layout dimensions

### Phase 2: CollapsibleNav Component
- [ ] Create `CollapsibleNav.tsx` base structure
- [ ] Implement collapsed state (icons only, 64px)
- [ ] Implement expanded state (icons + labels, 256px)
- [ ] Add hover transitions (width, opacity)
- [ ] Add active state styling (blue glow)
- [ ] Add AI indicator (green pulsing dot)
- [ ] Test mobile behavior (should not be collapsible)

### Phase 3: AlertsPanel Component
- [ ] Create `AlertsPanel.tsx` base structure
- [ ] Build Alerts section with colored indicators
- [ ] Build Activity Feed with timeline design
- [ ] Build Quick Stats with mini KPIs
- [ ] Add scrollable overflow behavior
- [ ] Add unread badges and counters
- [ ] Implement "Mark as Read" functionality

### Phase 4: ThreeColumnLayout Integration
- [ ] Create `ThreeColumnLayout.tsx` wrapper
- [ ] Implement desktop layout (nav + content + alerts)
- [ ] Implement tablet layout (nav + content, drawer alerts)
- [ ] Implement mobile layout (bottom nav, FAB alerts)
- [ ] Add alerts drawer state management
- [ ] Add floating alerts button (mobile)
- [ ] Test responsive breakpoints

### Phase 5: Integration & Polish
- [ ] Update `Layout.tsx` to use `ThreeColumnLayout`
- [ ] Verify `InsightsScreen` works in new layout
- [ ] Test all responsive behaviors
- [ ] Verify glassmorphic styling consistency
- [ ] Add smooth transitions and animations
- [ ] Test accessibility (keyboard navigation, ARIA)

### Phase 6: Testing & Refinement
- [ ] Test on mobile devices (real devices)
- [ ] Test hover states on desktop
- [ ] Test drawer interactions on tablet
- [ ] Verify no layout shifts or jank
- [ ] Performance check (smooth 60fps)
- [ ] Update documentation

---

## 🎯 Key Features Checklist

### Collapsible Navigation
- [ ] Icons only by default (64px)
- [ ] Expands to 256px on hover
- [ ] Smooth width transition (300ms)
- [ ] Labels fade in on expand
- [ ] Active state indicator (blue glow)
- [ ] AI feature indicator (green pulsing dot)
- [ ] Tooltips on collapsed state
- [ ] Not collapsible on mobile

### Alerts Panel
- [ ] Three distinct sections (Alerts, Activity, Stats)
- [ ] Colored indicators per alert type
- [ ] Scrollable overflow
- [ ] Unread count badge
- [ ] "View All" links
- [ ] Desktop: Fixed right panel (320px)
- [ ] Tablet: Slide-in drawer
- [ ] Mobile: Full-screen drawer via FAB

### Glassmorphic Design
- [ ] Borderless cards
- [ ] Frosted glass backdrop blur
- [ ] Floating shadows
- [ ] Hover elevation effects
- [ ] Consistent glow colors
- [ ] Smooth transitions

---

## 📱 Responsive Breakpoints

```css
/* Mobile: < 768px */
- Bottom navigation bar (5 icons)
- Full-width chat screen
- Alerts via floating FAB + drawer
- Settings button top-right

/* Tablet: 768px - 1024px */
- Collapsible nav (64px collapsed, 256px expanded)
- Full-width chat screen
- Alerts via slide-in drawer
- Settings in nav footer

/* Desktop: > 1024px */
- Collapsible nav (64px collapsed, 256px expanded)
- Flexible center content
- Fixed alerts panel (320px)
- Settings in nav footer

/* Large Desktop: > 1440px */
- Same as desktop but with max-width constraints
- Content centered with breathing room
```

---

## 🔄 State Management

### Layout State
```typescript
interface LayoutState {
  currentView: 'insights' | 'home' | 'apps' | 'tasks' | 'governance';
  isAlertsOpen: boolean; // For mobile/tablet drawer
  isNavExpanded: boolean; // Hover state (desktop)
  unreadAlertsCount: number;
}
```

### Alerts State
```typescript
interface AlertsState {
  alerts: Alert[];
  activities: Activity[];
  stats: QuickStat[];
  unreadCount: number;
}

// Actions
- markAlertAsRead(id: string)
- dismissAlert(id: string)
- loadMoreActivities()
- refreshStats()
```

---

## 🎨 Animation Details

### Navigation Expansion
```css
/* Width transition */
transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Label fade-in */
opacity: 0 → 1 (200ms delay, 200ms duration)

/* Shadow intensify */
box-shadow: var(--float-sm) → var(--float-lg)
```

### Alerts Drawer (Mobile/Tablet)
```css
/* Slide-in from right */
transform: translateX(100%) → translateX(0)
transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)

/* Backdrop fade-in */
opacity: 0 → 1 (200ms)
```

### Alert Items
```css
/* Unread indicator pulse */
animation: glow-pulse 2s ease-in-out infinite

/* Hover lift */
transform: translateY(0) → translateY(-2px)
box-shadow: var(--float-md) → var(--float-lg)
```

---

## 🔍 Next Steps

Once we complete this plan, we'll have:

1. ✅ Sleek collapsible navigation (icons → labels on hover)
2. ✅ Central AI chat interface (Insights screen)
3. ✅ Live alerts & activity panel with sample data
4. ✅ Fully responsive mobile-first layout
5. ✅ Glassmorphic floating design throughout
6. ✅ Smooth transitions and animations
7. ✅ Proper state management

**End Goal:** A professional, futuristic three-section layout that feels spacious, organized, and visually stunning with floating glassmorphic elements.

---

**Ready to build?** Let's start with Phase 1 and work our way through! 🚀
