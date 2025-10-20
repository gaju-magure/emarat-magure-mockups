# Emarat - Brand & UI/UX Design Guidelines

**Client:** Emirates General Petroleum Corporation (Emarat)
**Website:** https://www.emarat.ae
**Document Version:** 1.0
**Last Updated:** October 2025

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Logo Usage](#logo-usage)
5. [Iconography](#iconography)
6. [UI Components](#ui-components)
7. [Layout & Grid System](#layout--grid-system)
8. [Imagery Guidelines](#imagery-guidelines)
9. [Navigation Patterns](#navigation-patterns)
10. [Responsive Design](#responsive-design)

---

## Brand Identity

### Brand Mission
**"An elevated service experience for everybody, every time."**

### Brand Tagline
**"Trusted by you for four decades"**

### Brand Personality
- **Professional** - Modern, reliable petroleum services company
- **Customer-Centric** - Focus on service excellence and accessibility
- **Trustworthy** - Four decades of service in the UAE
- **Progressive** - Embracing innovation and technology
- **Community-Oriented** - Supporting national development and Emiratisation

### Brand Values
- Customer-centric service delivery
- Community engagement and CSR
- Safety and environmental responsibility
- Supporting UAE national development
- Transparency and accessibility

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Primary Blue** | `#1e87f0` | rgb(30, 135, 240) | Primary actions, links, highlights |
| **Dark Blue** | `#004290` | rgb(0, 66, 144) | Text links, headings, brand accent |
| **Darker Blue** | `#0e6ecd` | rgb(14, 110, 205) | Hover states, interactive elements |

### Logo Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Brand Green** | `#47a01a` | rgb(71, 160, 26) | Logo primary color, represents growth |
| **Logo Dark Blue** | `#003a85` | rgb(0, 58, 133) | Logo secondary color |

### Neutral Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **White** | `#ffffff` | rgb(255, 255, 255) | Backgrounds, cards, clean spaces |
| **Light Gray** | `#f8f8f8` | rgb(248, 248, 248) | Muted backgrounds, subtle sections |
| **Medium Gray** | `#e5e5e5` | rgb(229, 229, 229) | Borders, dividers, subtle separators |
| **Dark Gray** | `#999999` | rgb(153, 153, 153) | Secondary text, muted content |
| **Charcoal** | `#222222` | rgb(34, 34, 34) | Secondary backgrounds, footer |

### Text Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Default Text** | `#464e4c` | rgb(70, 78, 76) | Body copy, paragraphs |
| **Heading Text** | `#333333` | rgb(51, 51, 51) | Headings, titles |
| **Link Blue** | `#004290` | rgb(0, 66, 144) | Hyperlinks |
| **Muted Text** | `#999999` | rgb(153, 153, 153) | Secondary information, captions |

### Semantic Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Success Green** | `#32d296` | rgb(50, 210, 150) | Success messages, confirmations |
| **Warning Orange** | `#faa05a` | rgb(250, 160, 90) | Warnings, alerts |
| **Danger Red** | `#f0506e` | rgb(240, 80, 110) | Errors, critical alerts |

### Meta/Browser Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Safari Pinned Tab** | `#5bbad5` | Safari browser tab icon |
| **MS Tile Color** | `#da532c` | Windows tile color |
| **Theme Color** | `#ffffff` | Browser theme color |

---

## Typography

### Font Families

#### Primary Font (English)
```css
font-family: 'Karbon', Arial, sans-serif;
```
- **Weight:** 400 (Regular for headings)
- **Style:** Clean, modern sans-serif
- **Usage:** All English content, headings, body text

#### Arabic Font
```css
font-family: 'TheSansArabic', Arial, sans-serif;
```
- **Usage:** All Arabic content (bilingual support)

#### Monospace (Code/Technical)
```css
font-family: Consolas, monaco, monospace;
```
- **Usage:** Technical content, code snippets

### Typography Scale

| Element | Font Size | Line Height | Font Weight | Color |
|---------|-----------|-------------|-------------|-------|
| **H1 (Hero)** | Responsive | 1.5 | 400 | `#333333` |
| **H2** | Responsive | 1.5 | 400 | `#333333` |
| **H3** | Responsive | 1.5 | 400 | `#333333` |
| **Body Text** | 16px (base) | 1.5 | 400 | `#464e4c` |
| **Small/Caption** | Responsive | 1.5 | 400 | `#999999` |

### Typography Principles
- **Base font size:** 16px
- **Base line height:** 1.5
- **Responsive typography** with breakpoints
- **Hierarchical headings** for clear content structure
- **Bilingual support** (English/Arabic toggle)

---

## Logo Usage

### Logo Design

**File:** `/media/l31apyym/logo.svg`

#### Logo Characteristics
- **Format:** SVG (vector)
- **Dimensions:** 81.318px (width) × 112.464px (height)
- **Design Style:** Abstract, modern, geometric
- **Composition:** Stylized organic form suggesting growth and movement

#### Logo Colors
- **Primary Green:** `#47a01a`
- **Secondary Dark Blue:** `#003a85`

#### Logo Description
- Abstract, stylized graphic with interconnected shapes
- Layered geometric elements with curved and angular segments
- Asymmetrical layout creating visual depth
- Represents organic growth, energy, and movement
- Uses negative space and overlapping design elements
- Gradient-like color transitions between green and blue

### Logo Placement
- **Primary Position:** Top left of page (desktop and mobile)
- **Color on Light Background:** Full color (green + blue)
- **Color on Dark Background:** White/neutral version
- **Consistency:** Appears across all navigation areas

### Logo Usage Guidelines
- Always maintain aspect ratio
- Provide adequate clear space around logo
- Do not distort or skew
- Use SVG format for scalability
- Maintain minimum size for legibility

### Favicon Files
- `favicon.ico` - Standard favicon
- `apple-touch-icon.png` - iOS devices
- `favicon-32x32.png` - Standard web
- `favicon-16x16.png` - Small displays
- `safari-pinned-tab.svg` - Safari pinned tabs

---

## Iconography

### Icon Style
- **Format:** SVG (scalable vector graphics)
- **Style:** Minimalist, flat design
- **Color:** Monochromatic/neutral palette
- **Usage:** UI elements, navigation, social media

### Icon Examples
- Search icon: `/resources/images/icons/search-small.svg`
- Social media icons (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Service/feature icons throughout the site

### Icon Principles
- Clean, simple line work
- Consistent stroke weight
- Scalable without quality loss
- Accessible and recognizable
- Use `uk-svg` for inline SVG rendering

---

## UI Components

### Buttons

#### Button Classes
```css
.login-btn
.btn-div
```

#### Button Characteristics
- **Text-based CTAs** with clear action language
- **Icon-accompanied buttons** for enhanced recognition
- **Prominent placement** for primary actions
- **Consistent styling** across desktop and mobile

#### Button States
- Default
- Hover (darker shade)
- Active/Pressed
- Disabled

### Cards

#### Card Design Pattern
- **Image-backed cards** with centered text overlay
- **Large hero images:** 660×320px aspect ratio
- **Components:**
  - Hero image background
  - Descriptive title
  - Brief description text
  - Bulleted sub-links/features
  - Clickable entire card area

#### Card Layout
- Responsive grid layout
- Consistent spacing between cards
- Center-focused image cropping
- Minimal color overlay on images
- Clean, modular design

### Forms

#### Input Fields
```css
.uk-search-input
```
- Search inputs with placeholder text
- Clean, minimal border styling
- Autofocus on primary search

#### Search Component
- Navbar integrated search
- Full-width search bar
- Icon-enhanced search button
- Placeholder: "Search the website"

### Dropdowns

#### Dropdown Characteristics
```css
.uk-navbar-dropdown
.uk-navbar-dropdown-grid-footer
```
- **Mode:** Hover activation
- **Animation:** `uk-animation-slide-left-small`
- **Duration:** 500ms
- **Offset:** 0
- **Styling:** Box shadow, rounded bottom borders
- **Background:** Secondary color (`#222222`)

#### Dropdown Types
- Mega menu dropdowns for navigation
- Login portal dropdown
- Language selector dropdown

### Navigation

#### Mobile Navigation
```css
.uk-offcanvas-bar
.uk-drill-back
```
- Off-canvas slide menu
- Drill-down navigation pattern
- Close button with clear "Close" label
- Hierarchical menu structure
- Box shadow for depth

---

## Layout & Grid System

### Grid Principles
- **Responsive design** adapting to screen size
- **Modular blocks** for easy content arrangement
- **Consistent spacing** between elements
- **Center-aligned content blocks**
- **Flexible column widths**

### Layout Classes
```css
.uk-width-expand
.uk-width-auto
.uk-width-1-1 (full width)
```

### Section Spacing
- Adequate white space between sections
- Breathing room for content hierarchy
- Visual separation through spacing, not heavy borders

### Container Structure
- Full-width hero sections
- Contained content areas for readability
- Sidebar components ("Find a Service Station")
- Footer with structured link categories

---

## Imagery Guidelines

### Image Style
- **Professional, high-quality photography**
- **Operational and workplace scenes**
- **Consistent aspect ratio:** 660×320px for cards
- **Cropping:** Center-focused anchoring
- **Color grading:** Muted, professional tones
- **Subject matter:** People, stations, services, infrastructure

### Image Usage
- Hero sections with large visuals
- Card backgrounds with text overlay
- Supporting imagery for content sections
- Real photography over stock images
- Authentic representation of Emarat operations

### Image Optimization
- Responsive image sizing
- Adaptive loading for performance
- Proper alt text for accessibility
- Preserve aspect ratio across devices

---

## Navigation Patterns

### Primary Navigation Structure
- **Multi-level dropdown** navigation
- **Mega menu** with grid layout
- **Hierarchical organization:**
  - About Us
  - Individuals
  - Businesses
  - Careers
  - Contact Us

### Utility Navigation
- Language toggle (English/Arabic)
- Login portals dropdown:
  - EmCan
  - Fleet Manager
  - E-Services
- Search functionality
- "Find a Service Station" quick links

### Footer Navigation
- **Structured link categories:**
  - About
  - Individuals
  - Businesses
  - Careers
  - Contact
- **Social media icons**
- **Copyright notice**
- **Utility links** (Privacy, Terms, etc.)

### Mobile Navigation
- Hamburger menu icon
- Off-canvas sliding panel
- Drill-down pattern for sub-menus
- Close button for exit
- Same hierarchy as desktop

---

## Responsive Design

### Breakpoints
- Desktop (large screens)
- Tablet (medium screens)
- Mobile (small screens)

### Responsive Behaviors
- **Navigation:** Mega menu → Off-canvas mobile menu
- **Typography:** Fluid font sizing
- **Images:** Adaptive sizing and cropping
- **Grid:** Flexible column layouts
- **Cards:** Stack vertically on mobile

### Mobile-First Approach
- Touch-friendly interactive elements
- Optimized loading for mobile networks
- Simplified navigation for small screens
- Thumb-friendly button placement

---

## Design System Implementation

### CSS Framework
**UIkit** - Component library used throughout
- Provides consistent UI components
- Responsive grid system
- Animation and interaction utilities
- Accessibility features built-in

### Key UIkit Components Used
- `uk-navbar` - Navigation
- `uk-dropdown` - Dropdown menus
- `uk-offcanvas` - Mobile menu
- `uk-search` - Search functionality
- `uk-nav` - Navigation lists
- `uk-svg` - Inline SVG rendering
- `uk-animation-*` - Animation utilities

---

## Accessibility Considerations

### Standards
- Proper semantic HTML
- Alt text for all images
- Keyboard navigation support
- Sufficient color contrast ratios
- Screen reader compatibility

### Features
- Bilingual support (English/Arabic)
- Clear visual hierarchy
- Accessible form inputs
- Focus states on interactive elements
- ARIA labels where appropriate

---

## Brand Voice & Messaging

### Tone of Voice
- **Professional** yet **approachable**
- **Clear** and **concise**
- **Informative** without jargon
- **Customer-focused** language
- **Action-oriented** CTAs

### Key Messages
- Four decades of trusted service
- Comprehensive petroleum and service solutions
- Commitment to customer experience
- Supporting UAE national development
- Innovation and reliability

---

## Additional Assets

### Social Media
- Facebook
- Twitter
- Instagram
- LinkedIn
- YouTube

### Brand Resources
- Main stylesheet: `/resources/styles/main.css`
- Logo: `/media/l31apyym/logo.svg`
- Favicons: `/resources/favicons/`
- Icons: `/resources/images/icons/`

---

## Quick Reference - Design Tokens

```json
{
  "colors": {
    "primary": "#1e87f0",
    "primaryDark": "#004290",
    "primaryDarker": "#0e6ecd",
    "logoGreen": "#47a01a",
    "logoDarkBlue": "#003a85",
    "white": "#ffffff",
    "lightGray": "#f8f8f8",
    "mediumGray": "#e5e5e5",
    "darkGray": "#999999",
    "charcoal": "#222222",
    "textDefault": "#464e4c",
    "textHeading": "#333333",
    "textMuted": "#999999",
    "success": "#32d296",
    "warning": "#faa05a",
    "danger": "#f0506e"
  },
  "typography": {
    "fontFamily": {
      "primary": "Karbon, Arial, sans-serif",
      "arabic": "TheSansArabic, Arial, sans-serif",
      "mono": "Consolas, monaco, monospace"
    },
    "baseFontSize": "16px",
    "baseLineHeight": "1.5",
    "headingWeight": "400"
  },
  "spacing": {
    "unit": "8px"
  },
  "borderRadius": {
    "default": "4px"
  },
  "shadows": {
    "box": "0 5px 15px rgba(0,0,0,0.08)"
  },
  "animation": {
    "duration": "500ms",
    "easing": "ease-in-out"
  }
}
```

---

## Implementation Notes for AI Solution

### Brand Consistency Requirements
When designing the AI solution UI for Emarat:

1. **Use Emarat's color palette** - Primarily blues and greens from logo
2. **Match typography** - Karbon font family (or system fallback)
3. **Follow card-based layouts** - Image-backed cards with clean hierarchy
4. **Maintain professional imagery style** - Operational, authentic photography
5. **Implement responsive design** - Mobile-first approach
6. **Support bilingual content** - English/Arabic toggle capability
7. **Use consistent iconography** - Minimalist, flat SVG icons
8. **Apply UIkit framework patterns** - For consistency with main site
9. **Ensure accessibility** - WCAG compliance, keyboard navigation
10. **Reflect brand personality** - Professional, trustworthy, innovative

### Design Priorities
- **Functional over flashy** (aligns with AI ethos)
- **Clean, minimal interface** for AI tools
- **Data visualization** using brand colors
- **Dashboard layouts** with card-based metrics
- **Easy navigation** for AI CoE platform
- **Clear CTAs** for AI use case discovery

---

**End of Branding Guidelines**

*This document should be used as the single source of truth for all UI/UX design and development work related to Emarat's AI solution.*
