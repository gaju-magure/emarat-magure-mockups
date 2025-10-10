# Context Summary - Emarat AI App v3

## Project Overview
Building a modern AI-powered procurement assistant interface for Emarat. The application features a ChatGPT-style conversational interface where users can interact with an AI assistant named "Jarvis" to manage RFPs, analytics, tasks, budgets, and vendor relationships.

---

## Current State (as of 2025-10-10)

### Working Features ✅
1. **Chat Interface**
   - Clean, centered message layout (ChatGPT style)
   - Proper auto-scroll (messages scroll to bottom without layout shifting)
   - Typing indicator with animation
   - Message history preservation
   - Responsive design (mobile + desktop)

2. **Navigation**
   - Top navbar with Emarat logo
   - Control panel (right side):
     - New Chat button (active state only)
     - History button (active state only)
     - Divider (Emarat blue)
     - Notification bell
     - Theme toggle
     - Language toggle
   - Left sidebar with icon navigation (desktop)
   - Mobile collapsible top nav

3. **Layout**
   - Fixed header at top
   - Scrollable content in middle
   - Fixed input bar at bottom
   - No layout shifting or scrolling issues
   - Proper height management (h-screen, flex structure)

4. **Mock Data & Responses**
   - Rich formatted responses with markdown
   - Multiple response templates (RFP, analytics, vendor, contracts, etc.)
   - Action buttons (currently mock)
   - Emojis, bold text, lists, metrics
   - Keyword-based pattern matching

---

## Architecture

### Component Hierarchy
```
App.tsx
└── MainLayout
    ├── LeftSidebar (desktop only)
    ├── MobileBottomNav (mobile only)
    └── JarvisHomePage
        ├── Header (logo + controls)
        ├── Content Area (scrollable)
        │   ├── Idle State (greeting + priority chips)
        │   └── Active State (messages)
        └── Input Bar (text input + send button)
```

### Key Components

**JarvisHomePage** (`src/pages/JarvisHomePage.tsx`)
- Main chat interface
- State management (idle/active/history)
- Message rendering
- Input handling
- Auto-scroll logic

**MainLayout** (`src/components/layout/MainLayout.tsx`)
- Application wrapper
- Background gradients
- Sidebar positioning

**Mock Services** (`src/services/mock/`)
- `chat.mock.ts` - Chat response generation
- Pattern-based response matching
- Rich formatted templates

### State Management
- `useJarvisState` hook manages:
  - Current state (idle/active/history)
  - Conversations list
  - Current conversation
  - Message persistence

### Styling Approach
- Tailwind CSS with custom theme
- Responsive breakpoints: base (mobile), md, lg
- Theme colors: primary (Emarat blue), success (green), danger, etc.
- Glass morphism effects (`glass` utility class)
- Animations (slide-up, fade-in, pulse-glow, etc.)

---

## Critical Fixes

### Scroll Bug Fix (MAJOR)
**Problem:** Entire interface moved up when clicking input or adding messages

**Root Cause:** `scrollIntoView()` method scrolling multiple parent containers

**Solution:** Direct `scrollTop` manipulation on specific container
```typescript
// Changed from:
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

// To:
scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
```

**Impact:** Completely resolved layout shifting issues

---

## Design Decisions

### Message Layout
**Choice:** ChatGPT-style centered layout (avatar always on left)
**Rationale:**
- More space efficient
- Consistent visual flow
- Better for long messages
- Cleaner mobile experience

### Navigation Organization
**Choice:** Moved New Chat/History to top-right panel
**Rationale:**
- Frees up space in chat area
- Logical grouping with other controls
- Only shown when relevant (active state)
- Divider provides clear separation

### Scroll Strategy
**Choice:** Single scrollable container (content area only)
**Rationale:**
- Avoids nested scroll conflicts
- Simpler mental model
- Better performance
- Easier to debug

### Mobile Optimization
**Choice:** Aggressive spacing reduction on mobile
**Rationale:**
- Maximize content visibility on small screens
- Deliver more value per viewport
- Maintain readability with adjusted line-height

---

## Code Patterns

### Responsive Classes
```typescript
// Desktop first, mobile override
className="md:px-6 px-3 md:py-4 py-2"

// Spacing
className="md:space-y-4 space-y-3"

// Typography
className="md:text-sm text-xs md:leading-relaxed leading-snug"

// Sizing
className="md:w-7 md:h-7 w-6 h-6"
```

### Theme Colors
```typescript
// Use theme variables, not hardcoded colors
bg-primary/30  // ✅ Good (theme-aware, adjusts to light/dark)
bg-white/30    // ❌ Avoid (doesn't work in light mode)
```

### Layout Structure
```typescript
// Three-section layout pattern
<div className="flex flex-col h-full">
  <header className="flex-shrink-0">...</header>
  <main className="flex-1 overflow-y-auto">...</main>
  <footer className="flex-shrink-0">...</footer>
</div>
```

---

## File Organization

### Key Files
- `src/pages/JarvisHomePage.tsx` - Main chat interface (670 lines)
- `src/services/mock/chat.mock.ts` - Response generation (188 lines)
- `src/components/layout/MainLayout.tsx` - App wrapper (123 lines)
- `src/contexts/` - Context providers (Client, Theme, Language, Auth)
- `src/hooks/` - Custom hooks (useJarvisState, useGreeting, etc.)
- `src/types/` - TypeScript types

### Directory Structure
```
app-v3/app/
├── src/
│   ├── components/
│   │   ├── atoms/      - Small reusable components
│   │   ├── molecules/  - Composite components
│   │   ├── organisms/  - Complex components
│   │   └── layout/     - Layout components
│   ├── contexts/       - React contexts
│   ├── hooks/          - Custom hooks
│   ├── pages/          - Page components
│   ├── services/       - API/mock services
│   ├── types/          - TypeScript types
│   └── utils/          - Utility functions
├── public/             - Static assets
└── DEVELOPMENT.md      - Development tracker
```

---

## Dependencies

### Core
- React 19
- TypeScript
- React Router DOM
- Tailwind CSS v3

### UI Libraries
- Heroicons (icons)
- ReactMarkdown (message rendering)
- remark-gfm (GitHub Flavored Markdown)

### Build Tools
- Vite (dev server + bundler)
- PostCSS (CSS processing)

---

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES6+ features used throughout
- No IE11 support needed

---

## Performance Considerations

### Optimizations Applied
1. **Conditional rendering** - Only render active state
2. **Ref-based scroll** - Direct DOM manipulation for scroll
3. **Debounced typing** - Simulated delay for realistic UX
4. **Single scroll container** - Avoid nested scrolling
5. **Mobile-first CSS** - Smaller bundle for mobile

### Not Yet Implemented
- Virtual scrolling for long message lists
- Image lazy loading
- Code splitting by route
- Service worker for offline support

---

## Known Limitations

### Current Constraints
1. **Mock data only** - No real backend integration
2. **No persistence** - Conversations cleared on refresh (localStorage could be added)
3. **No file uploads** - Text-only input
4. **No voice input** - Keyboard only
5. **Action buttons** - Currently non-functional (mock hrefs)
6. **Single user** - No multi-user support

### Technical Debt
- Some components could be extracted for better reusability
- Type definitions could be more strict in places
- Could add more comprehensive error boundaries
- Test coverage needed

---

## Future Roadmap

### High Priority
- [ ] Backend API integration
- [ ] Real conversation persistence
- [ ] Action button implementations
- [ ] File upload support

### Medium Priority
- [ ] Voice input capability
- [ ] Keyboard shortcuts
- [ ] Data visualization components (charts, tables)
- [ ] Export conversation feature

### Low Priority
- [ ] Onboarding tour
- [ ] Advanced search in history
- [ ] Custom themes
- [ ] Multi-language support (already stubbed)

---

## Development Workflow

### Local Development
```bash
npm run dev  # Start dev server
# App runs on http://localhost:5173
```

### Code Style
- 2-space indentation
- Single quotes for strings
- Explicit return types for functions
- Descriptive variable names
- Component-level documentation

### Git Workflow
- Main branch: `main`
- Feature branches recommended
- Descriptive commit messages
- No force push to main

---

## Debugging Tips

### Common Issues & Solutions

**Layout shifting:**
- Check for `scrollIntoView()` usage
- Verify single scroll container
- Check `overflow-hidden` conflicts

**Responsive issues:**
- Use `md:` prefix correctly (desktop, not mobile)
- Test at breakpoints: 320px, 768px, 1024px
- Check both portrait and landscape

**Theme colors not working:**
- Use Tailwind theme variables (bg-primary, not bg-blue-500)
- Check opacity syntax: `bg-primary/30` not `bg-primary-30`

**State not updating:**
- Check useEffect dependencies
- Verify state lifting
- Check for stale closures

---

## Contact & Resources

### Internal Resources
- Design System: TBD
- API Documentation: TBD
- Deployment Guide: TBD

### External References
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Heroicons](https://heroicons.com)

---

*Last updated: 2025-10-10*
*Version: 3.0.0-alpha*
