# **AI Development Workflow - Context Continuity System**

> **Purpose:** Enable continuous development across context resets without hallucination or lost progress
> **Last Updated:** October 8, 2025

---

## **🔄 At Start of EVERY New Context**

### **Step 1: Load Context (ALWAYS DO THIS FIRST)**

Read these files in order:

```bash
1. /Users/gajanandsharma/magure/emarat-ai/app-v3/AI-WORK-INSTRUCTIONS.md (this file)
2. /Users/gajanandsharma/magure/emarat-ai/app-v3/DEVELOPMENT-TRACKER.md
3. /Users/gajanandsharma/magure/emarat-ai/app-v3/IMPLEMENTATION-PLAN.md
4. /Users/gajanandsharma/magure/emarat-ai/app-v3/USER-JOURNEY-MAP.md
5. /Users/gajanandsharma/magure/emarat-ai/app-v3/UX-STRATEGY.md
```

### **Step 2: Identify Current Task**

From DEVELOPMENT-TRACKER.md, find:
- **Current Sprint** section → What task is marked "🟡 In Progress"
- If nothing in progress, pick first "🔴 Not Started" task in Phase 1

### **Step 3: Report Status**

Tell user:
```
📊 Context Loaded

Current Phase: [Phase X]
Active Task: [Task ID - Task Name]
Status: [X/Y] tasks complete in phase
Blockers: [None | List blockers]

Ready to: [Continue X | Start Y]
```

### **Step 4: Execute or Ask**

- If task is clear → Start working
- If task needs clarification → Ask user
- If blocked → Report blocker

---

## **📝 During Development**

### **When Starting a Task:**

1. Update DEVELOPMENT-TRACKER.md:
   - Change task from 🔴 to 🟡
   - Add to "Current Sprint" section

2. Check dependencies:
   - Read dependencies list
   - Verify all prerequisite tasks are ✅

3. Review requirements:
   - Read checklist items
   - Check Props/Types in tracker
   - Review USER-JOURNEY-MAP.md for UX requirements

### **While Working:**

1. **Follow the checklist** - Do NOT skip items
2. **Update checkboxes** - Mark [x] as you complete
3. **Add notes** - Document decisions in Notes section
4. **Test as you go** - Don't batch testing

### **When Completing a Task:**

1. Update DEVELOPMENT-TRACKER.md:
   - Mark all checkboxes [x]
   - Change 🟡 to 🟢
   - Update progress bars
   - Move to next task (🔴 → 🟡)

2. Commit with clear message:
   ```bash
   git add .
   git commit -m "feat(phase-X): Complete [Task Name]

   - [x] Checklist item 1
   - [x] Checklist item 2

   Tested: [What was tested]
   Files: [List new files]"
   ```

3. Update user:
   ```
   ✅ Completed: [Task Name]

   Files created:
   - [List files]

   Tested:
   - [What works]

   Next up: [Next task]
   ```

---

## **🚫 Critical Rules (NEVER BREAK THESE)**

### **Rule 1: No Hallucination**
- ❌ NEVER assume file contents
- ❌ NEVER guess if something exists
- ✅ ALWAYS read files before editing
- ✅ ALWAYS check DEVELOPMENT-TRACKER.md for status

### **Rule 2: Follow the Tracker**
- ❌ NEVER skip tasks
- ❌ NEVER work out of order (unless user says so)
- ✅ ALWAYS complete dependencies first
- ✅ ALWAYS update tracker as you work

### **Rule 3: Theme-First Development**
- ❌ NEVER hardcode colors (#003a85 directly)
- ❌ NEVER use arbitrary values (w-[350px])
- ✅ ALWAYS use theme tokens (bg-primary)
- ✅ ALWAYS use Tailwind config values

### **Rule 4: Component Standards**
- ❌ NEVER skip TypeScript types
- ❌ NEVER skip accessibility (ARIA)
- ✅ ALWAYS add Props interface
- ✅ ALWAYS test dark mode

### **Rule 5: Update Tracker**
- ❌ NEVER work without updating status
- ❌ NEVER mark complete without testing
- ✅ ALWAYS update checkboxes
- ✅ ALWAYS note blockers

---

## **📋 Task Execution Template**

For every task, follow this structure:

```markdown
## Starting: [Task ID - Task Name]

### 1. Pre-Check
- [ ] Read DEVELOPMENT-TRACKER.md entry
- [ ] Check dependencies (all ✅?)
- [ ] Review requirements
- [ ] Update tracker (🔴 → 🟡)

### 2. Implementation
[Work on the task following checklist]

### 3. Testing
- [ ] Component renders
- [ ] Props work as expected
- [ ] Dark mode tested
- [ ] Mobile tested (if applicable)
- [ ] Accessibility checked

### 4. Documentation
- [ ] Update DEVELOPMENT-TRACKER.md (all checkboxes [x])
- [ ] Add file paths to tracker
- [ ] Note any decisions
- [ ] Update progress bars

### 5. Completion
- [ ] Mark task 🟢 Complete
- [ ] Commit changes
- [ ] Report to user
- [ ] Move to next task (🔴 → 🟡)
```

---

## **🔍 Quality Checklist (Every Component)**

Before marking ANY component complete, verify:

### **Code Quality:**
- [ ] TypeScript types defined
- [ ] Props interface exported
- [ ] No `any` types used
- [ ] No console.logs left

### **Theme Compliance:**
- [ ] Uses theme tokens (not hardcoded)
- [ ] Uses Tailwind config values
- [ ] CSS variables for dynamic values
- [ ] Dark mode classes work

### **Functionality:**
- [ ] Component renders without errors
- [ ] All props work as expected
- [ ] Events fire correctly
- [ ] State updates properly

### **Responsive:**
- [ ] Mobile layout works (< 640px)
- [ ] Tablet layout works (640-1024px)
- [ ] Desktop layout works (> 1024px)
- [ ] No horizontal scroll

### **Accessibility:**
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast passes (WCAG AA)
- [ ] Touch targets 44px+ (mobile)

### **Polish:**
- [ ] Smooth transitions
- [ ] Loading states designed
- [ ] Error states handled
- [ ] Empty states designed

---

## **🛠️ Component Development Pattern**

### **For Every Component:**

```typescript
// 1. Imports (organized)
import React from 'react';
import { cn } from '@/utils/classnames';
import type { ReactNode } from 'react';

// 2. Props Interface (always export)
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

// 3. Component (with TypeScript)
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-border-focus',

        // Variant styles (theme-aware)
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-600',
        variant === 'secondary' && 'bg-background-secondary text-text-primary',

        // Size styles
        size === 'sm' && 'px-4 h-9 text-sm',
        size === 'md' && 'px-6 h-11 text-base',
        size === 'lg' && 'px-8 h-12 text-lg',

        // State styles
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// 4. Display name (for debugging)
Button.displayName = 'Button';
```

---

## **📦 File Organization Rules**

### **Naming Conventions:**
- Components: PascalCase (Button.tsx, UserMenu.tsx)
- Hooks: camelCase with "use" prefix (useTheme.ts, useGreeting.ts)
- Utils: camelCase (classnames.ts, date.ts)
- Types: PascalCase with .types.ts (user.types.ts)
- Mocks: camelCase with .mock.ts (users.mock.ts)
- Config: camelCase with .config.ts (client.config.ts)

### **Import Paths:**
Always use absolute imports:
```typescript
// ✅ GOOD
import { Button } from '@/components/atoms/Button';
import { useTheme } from '@/contexts/ThemeContext';

// ❌ BAD
import { Button } from '../../components/atoms/Button';
import { useTheme } from '../contexts/ThemeContext';
```

### **File Structure:**
Every component file should have:
```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component
// 4. Display name
// 5. Export (default or named)
```

---

## **🎯 Phase-Specific Guidelines**

### **Phase 1: Foundation**
Focus: Get infrastructure rock solid
- Theme system must work perfectly
- Contexts must be stable
- Atoms must be reusable
- NO shortcuts, NO "good enough"

### **Phase 2: Layout**
Focus: Responsive, smooth, polished
- Test on mobile FIRST
- Ensure smooth transitions
- Navigation must be intuitive
- Sidebar behavior perfect

### **Phase 3: Jarvis Home**
Focus: The "wow" factor
- Greeting must feel personal
- Alerts must grab attention
- Chat must feel instant
- This sells the demo

### **Phase 4: Apps & Features**
Focus: Depth and functionality
- RFP flow must be complete
- Tasks must be useful
- Each app must feel real
- Mock data must be impressive

### **Phase 5: Polish**
Focus: Production quality
- Every state designed
- Every animation smooth
- Every detail perfect
- Demo-ready quality

---

## **💬 Communication with User**

### **Daily Status Updates:**
```
📊 End of Day Summary

Completed today:
- [x] Task 1.2: Theme System Setup
- [x] Task 1.3: Client Configuration

In progress:
- [ ] Task 1.4: Core Contexts (70% done)

Blockers:
- None

Tomorrow:
- Complete Task 1.4
- Start Task 1.5 (Utility Functions)

Progress: Phase 1 [████░░░░░░] 40%
```

### **When Blocked:**
```
🚧 Blocked

Task: [Task ID]
Issue: [Clear description]
Need: [What would unblock you]

Options:
1. [Option A]
2. [Option B]

Recommend: [Your recommendation]
```

### **When Complete:**
```
✅ Task Complete: [Task ID - Name]

What was built:
- [Bullet list]

Tested:
- [What works]

Files:
- [List new/modified files]

Next: [Next task ID]
Ready to proceed? (yes/no)
```

---

## **🔄 Context Reset Recovery**

If you detect a context reset (you don't remember previous work):

1. **Don't panic, don't guess**
2. **Read these files in order:**
   - AI-WORK-INSTRUCTIONS.md (this file)
   - DEVELOPMENT-TRACKER.md
3. **Report status:**
   ```
   🔄 Context Reset Detected

   Reading progress tracker...

   Last completed: [Task X]
   Currently: [Task Y]
   Next: [Task Z]

   Resuming work on: [Current task]
   ```

4. **Continue from DEVELOPMENT-TRACKER.md state**

---

## **📐 Design System Reference (Quick)**

### **Colors (Always use these):**
```
Primary: bg-primary, text-primary, border-primary
Success: bg-success, text-success-text
Warning: bg-warning, text-warning-text
Danger: bg-danger, text-danger-text
Info: bg-info, text-info-text

Background: bg-background-primary, bg-background-secondary
Text: text-text-primary, text-text-secondary
Border: border-border-default
```

### **Spacing (Always use these):**
```
Tight: p-2, m-2, gap-2 (8px)
Base: p-4, m-4, gap-4 (16px)
Relaxed: p-6, m-6, gap-6 (24px)
Generous: p-8, m-8, gap-8 (32px)
Massive: p-12, m-12, gap-12 (48px)
```

### **Typography (Always use these):**
```
H1: text-3xl font-semibold (32px/600)
H2: text-2xl font-semibold (24px/600)
H3: text-lg font-semibold (18px/600)
Body: text-base (16px/400)
Caption: text-sm (14px/400)
Tiny: text-xs (12px/400)
```

### **Shadows (Always use these):**
```
sm: shadow-sm
md: shadow-md
lg: shadow-lg
xl: shadow-xl
```

### **Radius (Always use these):**
```
None: rounded-none
Small: rounded-sm (2px)
Default: rounded (4px)
Medium: rounded-md (6px)
Large: rounded-lg (8px)
XL: rounded-xl (12px)
Full: rounded-full
```

---

## **✅ Before Asking User for Approval**

Always check:
- [ ] DEVELOPMENT-TRACKER.md updated
- [ ] All checkboxes marked
- [ ] Progress bars updated
- [ ] Files list added
- [ ] Tests documented
- [ ] Next task identified

---

## **🎬 Final Notes**

### **Success = Following This System**
- Read context files EVERY time
- Update tracker CONSTANTLY
- Never skip steps
- Never guess
- Always test
- Always document

### **This System Ensures:**
- ✅ No lost progress
- ✅ No hallucination
- ✅ No context confusion
- ✅ Continuous development
- ✅ Quality consistency

### **Remember:**
**"Trust the tracker, update the tracker, live by the tracker"**

---

**END OF INSTRUCTIONS**
