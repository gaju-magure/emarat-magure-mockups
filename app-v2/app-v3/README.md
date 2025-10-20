# Emarat AI V3 - Mobile-First Rebuild

Modern, theme-injectable, language-injectable rebuild of Emarat AI application.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Theme & Language Switching

### User-Level (Runtime UI Toggles)
- Click moon/sun icon in header to toggle dark/light mode
- Click EN/AR button in header to switch languages

### Client-Level (One-Click Branding)
Edit `.env.local` and restart dev server:

```env
VITE_CLIENT_NAME=your-company
VITE_CLIENT_LOGO=/assets/your-logo.svg
VITE_PRIMARY_COLOR=#your-color
VITE_DEFAULT_THEME=dark
VITE_DEFAULT_LANGUAGE=en
```

## Project Structure

```
app-v3/
├── docs/
│   ├── PROGRESS.md          # Updated with every commit
│   └── SCREEN_MAP.md        # Comprehensive checklist
├── src/
│   ├── config/              # Brand & i18n configs
│   ├── core/                # Providers, hooks, types
│   ├── design-system/       # Tokens, styles, UI components
│   ├── features/            # Screen-specific features
│   ├── shared/              # Layouts & shared components
│   └── locales/             # en.json, ar.json
```

## Tech Stack

- React 18.3 + TypeScript
- Vite 6.3.5
- Tailwind CSS 3.4.15 (Emarat brand colors)
- react-i18next (English + Arabic RTL)
- Zustand (state management)
- Radix UI primitives

## Features Implemented (Phase 1)

- ✅ Mobile-first responsive design
- ✅ Dark/light theme switching (localStorage persisted)
- ✅ English/Arabic language switching (RTL support)
- ✅ Env-based client branding
- ✅ CSS variable theming system
- ✅ Touch-friendly UI (44px minimum)
- ✅ Emarat brand colors from Tailwind config

## Next Steps (Phase 2)

- Build Header component
- Build Mobile & Desktop layouts
- Build Navigation (bottom bar mobile, sidebar desktop)
