# Emarat AI - App Architecture

## Overview

The Emarat AI Hub features a sophisticated app architecture with dedicated full-screen experiences for each AI application. Each app is designed with one of two patterns:

### Pattern 1: Chat + Workspace (Dual-Tab Layout)
Apps with complex operations have two integrated screens:
- **AI Chat Tab**: Conversational interface for quick queries and intelligent assistance
- **Workspace Tab**: Full-featured interface for detailed operations, analytics, and task management

### Pattern 2: Chat + External Platform (Chat-First with Redirect)
Apps for highly complex operations that require separate specialized platforms:
- **AI Chat Interface**: Primary conversational assistant for quick insights and queries
- **External Platform Launch**: Button to redirect to advanced standalone application for deep analysis

---

## App Examples

### 1. Invoice Reconciliation (`/components/apps/InvoiceReconciliation.tsx`)
**Pattern**: Chat + Workspace

**Chat Tab Features**:
- Query specific invoices by ID or vendor
- Ask about exceptions and variances
- Get summaries of flagged items
- Approval recommendations

**Workspace Tab Features**:
- Dashboard with key stats (Total Invoices, Flagged, Approved, Avg Confidence)
- Invoice queue table with filtering
- Individual invoice review with variance details
- Upload and export capabilities
- Approve/reject actions

**Use Case**: Process invoices, identify mismatches, and reconcile PO differences with AI confidence scoring.

---

### 2. RFP Evaluation (`/components/apps/RFPEvaluation.tsx`)
**Pattern**: Chat + Workspace

**Chat Tab Features**:
- Compare multiple proposals
- Analyze specific vendors
- Get AI recommendations
- Query pricing and criteria

**Workspace Tab Features**:
- RFP list sidebar with scores
- Detailed proposal view with:
  - Overall AI score and progress bar
  - Criteria breakdown (pricing, experience, compliance, timeline, innovation)
  - Strengths and weaknesses analysis
  - Action buttons (approve, export, request clarification)

**Use Case**: Evaluate and compare vendor proposals using AI-powered scoring across multiple criteria.

---

### 3. Demand Forecast (`/components/apps/DemandForecast.tsx`)
**Pattern**: Chat + External Platform

**Chat Interface Features**:
- Quick forecast queries (next week, peak days)
- Risk analysis
- Trend comparisons
- Quick action buttons

**External Platform**:
- Advanced forecasting with Monte Carlo simulations
- Custom modeling and scenario planning
- Redirects to specialized analytics platform

**Use Case**: Get quick forecast insights via chat, launch advanced platform for complex modeling.

---

### 4. Contract Review AI (`/components/apps/ContractReview.tsx`)
**Pattern**: Chat + Workspace

**Chat Tab Features**:
- Query specific clauses
- Get risk assessments
- Ask for recommendations
- Liability and termination analysis

**Workspace Tab Features**:
- Contract list with risk levels
- Detailed contract view:
  - AI compliance score
  - Clause summary (total, reviewed, flagged)
  - Key findings with risk/ok indicators
  - AI summary with actionable insights
  - Approve/request changes actions

**Use Case**: AI-powered contract analysis identifying risks, compliance issues, and negotiation points.

---

### 5. Customer Insights (`/components/apps/CustomerInsights.tsx`)
**Pattern**: Chat + External Platform

**Chat Interface Features**:
- Customer segment analysis
- Growth trends
- Churn and retention queries
- Location performance

**External Platform**:
- Advanced customer segmentation
- Cohort analysis
- Lifetime value modeling
- Power BI integration
- Predictive churn analysis

**Use Case**: Quick customer insights via AI chat, deep analytics via external platform.

---

## Technical Implementation

### Component Structure
Each app component follows this structure:

```tsx
interface AppProps {
  onClose: () => void;
}

export function AppName({ onClose }: AppProps) {
  // State management
  const [activeTab, setActiveTab] = useState<"chat" | "space">("space");
  const [messages, setMessages] = useState<Message[]>([...]);
  
  // Chat logic
  const handleSend = () => { /* AI response logic */ };
  
  return (
    <div className="fixed inset-0 z-50 bg-[#08111e]/95 backdrop-blur-sm">
      {/* Header */}
      {/* Tabs (for dual-tab pattern) */}
      {/* Content */}
    </div>
  );
}
```

### Routing in App.tsx
Apps are rendered conditionally based on `currentApp` state:

```tsx
{currentApp === "invoice" && <InvoiceReconciliation onClose={handleCloseApp} />}
{currentApp === "rfp" && <RFPEvaluation onClose={handleCloseApp} />}
{currentApp === "forecast" && <DemandForecast onClose={handleCloseApp} />}
{currentApp === "contract" && <ContractReview onClose={handleCloseApp} />}
```

### App Metadata in Apps.tsx
Each app is configured with:
- `hasChat`: boolean - Shows if app has AI chat
- `hasWorkspace`: boolean - Shows if app has dedicated workspace
- `isExternal`: boolean - Shows if app redirects to external platform

---

## Design Patterns

### Color Coding
- **Invoice**: Blue theme (`blue-500`)
- **RFP**: Green theme (`green-500`)
- **Forecast**: Purple theme (`purple-500`)
- **Contract**: Indigo theme (`indigo-500`)
- **Customer**: Cyan theme (`cyan-500`)

### Responsive Design
All apps are fully responsive:
- Mobile: Full-screen with optimized layout
- Tablet: Adaptive grid and spacing
- Desktop: Multi-column layouts with sidebars

### AI Chat Pattern
Consistent chat interface across all apps:
- AI messages with gradient avatar (left-aligned)
- User messages (right-aligned)
- Quick action buttons
- Context-aware responses

---

## Adding New Apps

To add a new app:

1. Create component in `/components/apps/YourApp.tsx`
2. Choose pattern (Chat+Workspace or Chat+External)
3. Add to Apps.tsx metadata
4. Import and route in App.tsx
5. Follow design system color themes
6. Implement responsive layout
7. Add contextual AI responses

---

## Best Practices

1. **Keep Chat Context-Aware**: AI responses should understand app-specific queries
2. **Workspace Data Density**: Balance information density with readability
3. **Mobile-First**: Design for mobile, enhance for desktop
4. **Loading States**: Show loading indicators for AI responses
5. **Error Handling**: Graceful error messages for failed operations
6. **Accessibility**: Keyboard navigation and screen reader support
