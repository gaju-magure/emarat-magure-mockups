# **Emarat AI Platform v3 - Project Overview**

> **Enterprise AI Demo Platform** - White-labelable, production-quality mockup for sales demonstrations

**Last Updated:** October 8, 2025
**Status:** Ready for Development
**Target:** Multi-client enterprise demos

---

## **📚 Documentation Structure**

### **For AI Developers (READ THESE IN ORDER):**
1. **AI-WORK-INSTRUCTIONS.md** - How to work continuously without context loss
2. **DEVELOPMENT-TRACKER.md** - Granular task checklist with progress tracking
3. **IMPLEMENTATION-PLAN.md** - Technical architecture and file structure
4. **USER-JOURNEY-MAP.md** - User flows, screen designs, component requirements
5. **UX-STRATEGY.md** - User personas, design principles, demo script

### **For Project Stakeholders:**
- **UX-STRATEGY.md** - Vision and demo narrative
- **USER-JOURNEY-MAP.md** - How users interact with the platform
- **DEVELOPMENT-TRACKER.md** - Current progress

---

## **🎯 Project Goals**

### **Primary Goal:**
Build a production-grade demo that sells the vision of a unified enterprise AI platform

### **Success Criteria:**
- ✅ Looks "production-ready" not prototype
- ✅ Works perfectly on mobile (executive iPhones)
- ✅ Can be rebranded for any client in < 5 minutes
- ✅ Demo flows smoothly (5-minute narrative)
- ✅ Dark mode is polished, not an afterthought
- ✅ RTL layout perfect (Arabic support)

### **Key Features:**
1. **Central "Jarvis" AI** - Personalized, context-aware hub
2. **5 Use Cases** - RFP, Forecasting, Hiring, Reconciliation, Insights
3. **Unified Task View** - Cross-app task management
4. **AI Explainability** - Show reasoning, build trust
5. **Governance** - Audit trails, model performance

---

## **🏗️ Technical Stack**

```
Frontend: React 19 + TypeScript
Routing: React Router 7
Styling: Tailwind CSS 3 (theme-first)
Icons: Heroicons 2
Charts: Recharts 3
Build: Vite 7
Fonts: Karbon, TheSansArabic
```

---

## **📁 Key Files**

### **Configuration:**
- `tailwind.config.js` - Theme tokens (already configured)
- `src/config/client.config.ts` - Client branding (Emarat, Client X, etc.)
- `src/config/apps.config.ts` - Available apps per client
- `src/config/roles.config.ts` - Role definitions

### **Context Providers:**
- `src/contexts/ClientContext.tsx` - Client-specific config
- `src/contexts/ThemeContext.tsx` - Light/Dark mode
- `src/contexts/LanguageContext.tsx` - i18n + RTL
- `src/contexts/AuthContext.tsx` - Mock authentication

### **Core Screens:**
- `src/pages/JarvisHomePage.tsx` - Main dashboard (hero screen)
- `src/pages/AppsPage.tsx` - App launcher
- `src/pages/TasksPage.tsx` - Unified task view
- `src/pages/rfp/RFPDetailPage.tsx` - Example deep-dive

### **Assets:**
- `public/fonts/` - Karbon, TheSansArabic
- `public/emarat-logo.svg` - Client logo
- `public/favicon.ico` - Browser icon

---

## **🚀 Quick Start (For Development)**

### **1. Initial Setup:**
```bash
# Create project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install react-router-dom @heroicons/react recharts clsx
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography

# Initialize Tailwind
npx tailwindcss init -p

# Copy existing config
cp tailwind.config.js app-v3/tailwind.config.js
cp -r public/ app-v3/public/
```

### **2. Development:**
```bash
npm run dev
```

### **3. Build:**
```bash
npm run build
```

---

## **📊 Progress Tracking**

### **Current Status:**
```
Phase 1: Foundation        [░░░░░░░░░░] 0/10   (0%)
Phase 2: Layout            [░░░░░░░░░░] 0/12   (0%)
Phase 3: Jarvis Home       [░░░░░░░░░░] 0/15   (0%)
Phase 4: Apps & Features   [░░░░░░░░░░] 0/20   (0%)
Phase 5: Polish            [░░░░░░░░░░] 0/10   (0%)

TOTAL:                     [░░░░░░░░░░] 0/67   (0%)
```

**See DEVELOPMENT-TRACKER.md for detailed task breakdown**

---

## **🎨 Design System (Quick Reference)**

### **Theme Colors:**
```css
Primary: #003a85 (Emarat Blue)
Accent: #47a01a (Emarat Green)
Success: #50aa1b
Warning: #d97706
Danger: #dc2626
Info: #0369a1
```

### **Always Use Theme Tokens:**
```tsx
// ✅ GOOD
<div className="bg-primary text-white">

// ❌ BAD
<div className="bg-[#003a85] text-white">
```

### **Component Standards:**
- TypeScript typed props
- Theme-aware colors
- Dark mode support
- ARIA labels
- Mobile responsive
- Keyboard navigation

---

## **👥 User Personas**

### **Primary: Sarah Al-Mansouri (VP Procurement)**
- Age: 42 | Device: iPhone 15 + MacBook
- Needs: Fast decisions, audit trail, vendor insights
- Behavior: Morning triage, deep work, mobile check-ins

### **Secondary:**
- Ahmed (CFO) - Finance focus
- Fatima (HR Director) - Hiring pipeline
- Mohammed (Operations) - Forecasting

---

## **🎭 Demo Flow (5 Minutes)**

1. **Login** (15s) - Show security
2. **Jarvis Greeting** (30s) - Personalized hub
3. **RFP Quick Approval** (60s) - AI recommendation → Approve
4. **Chat with Jarvis** (45s) - "What's the forecast?"
5. **Cross-App Tasks** (30s) - Unified view
6. **Mobile Experience** (30s) - One-handed usage
7. **Dark Mode & RTL** (30s) - Seamless switching
8. **Governance** (30s) - Audit trails, compliance
9. **Closing** (30s) - Recap value props

---

## **🔐 White-Labeling (5-Minute Rebrand)**

### **To Add New Client:**

1. **Create config:**
```typescript
// src/config/client.config.ts
export const CLIENT_X_CONFIG: ClientConfig = {
  id: 'clientx',
  name: 'Client X Platform',
  branding: {
    logo: '/clientx-logo.svg',
    companyName: 'Client X Corp',
    tagline: 'AI-Powered Operations',
  },
  theme: {
    primary: '#1a73e8',
    accent: '#34a853',
  },
  features: {
    enabledApps: ['rfp', 'forecasting', 'insights'],
    enableGovernance: true,
  },
};

// Change active client
export const ACTIVE_CLIENT = CLIENT_X_CONFIG;
```

2. **Add assets:**
```bash
cp clientx-logo.svg public/
cp clientx-favicon.ico public/
```

3. **Build:**
```bash
npm run build
```

**Result:** Fully rebranded in < 5 minutes!

---

## **📱 Responsive Breakpoints**

```
Mobile:  < 640px  (Bottom nav, single column)
Tablet:  640-1024px (Partial sidebar)
Desktop: > 1024px (Full 3-column layout)
```

---

## **♿ Accessibility Standards**

- WCAG AA color contrast
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader labels (ARIA)
- Focus indicators visible
- Touch targets 44px+ (mobile)

---

## **🧪 Testing Checklist**

### **Per Component:**
- [ ] Renders without errors
- [ ] All props work
- [ ] Dark mode tested
- [ ] Mobile responsive
- [ ] Keyboard navigation
- [ ] ARIA labels present

### **Per Page:**
- [ ] All sections render
- [ ] Navigation works
- [ ] Data loads (mock)
- [ ] Actions function
- [ ] Mobile layout
- [ ] Dark mode polished

---

## **🚢 Deployment**

### **Recommended Hosts:**
- Vercel (easiest)
- Netlify
- AWS S3 + CloudFront

### **Environment Variables:**
```env
VITE_CLIENT_ID=emarat
VITE_DEMO_MODE=true
```

### **Build Command:**
```bash
npm run build
```

### **Output:**
```
dist/ folder (deploy this)
```

---

## **📞 Support**

### **Questions?**
- Read AI-WORK-INSTRUCTIONS.md (for AI)
- Read DEVELOPMENT-TRACKER.md (for progress)
- Read USER-JOURNEY-MAP.md (for UX guidance)

### **Blockers?**
- Document in DEVELOPMENT-TRACKER.md
- Tag user for input

---

## **🎯 Next Steps**

1. **Review all documentation** (5 files above)
2. **Run initial setup** (Vite + dependencies)
3. **Start Phase 1** (Foundation)
4. **Follow DEVELOPMENT-TRACKER.md** (task by task)
5. **Update progress continuously**

---

## **🏆 Success Metrics**

### **Demo Quality:**
- Looks production-ready
- Smooth 60fps animations
- < 1.5s load time
- Lighthouse score > 90

### **Business Value:**
- Client says "wow"
- Can rebrand in 5 minutes
- Works on executive's phone
- Tells compelling story

### **Technical Excellence:**
- Zero TypeScript errors
- WCAG AA compliant
- All tests pass
- Clean git history

---

**Let's build something amazing!** 🚀

---

**Project Links:**
- Repository: /Users/gajanandsharma/magure/emarat-ai/app-v3/
- Assets: /Users/gajanandsharma/magure/emarat-ai/app-v3/public/
- Docs: All .md files in root

**Last Updated:** October 8, 2025
