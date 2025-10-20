# Emarat Brand Assets

**Client:** Emirates General Petroleum Corporation (Emarat)
**Last Updated:** October 2025

---

## Asset Inventory

### Logo Files

#### Primary Logo
- **File:** `emarat-logo.svg`
- **Format:** SVG (Scalable Vector Graphics)
- **Dimensions:** 81.318px × 112.464px
- **Colors:**
  - Primary Green: `#47a01a`
  - Secondary Dark Blue: `#003a85`
- **Usage:** Main logo for all applications, headers, branding
- **Source:** https://www.emarat.ae/media/l31apyym/logo.svg

---

### Favicon Files

#### Standard Favicon
- **File:** `favicon.ico`
- **Format:** ICO
- **Size:** 2.3 KB
- **Usage:** Browser tab icon (legacy support)
- **Source:** https://www.emarat.ae/favicon.ico

#### Favicon 16×16
- **File:** `favicon-16x16.png`
- **Format:** PNG
- **Dimensions:** 16 × 16 pixels
- **Usage:** Small browser icons, bookmarks
- **Source:** https://www.emarat.ae/resources/favicons/favicon-16x16.png

#### Favicon 32×32
- **File:** `favicon-32x32.png`
- **Format:** PNG
- **Dimensions:** 32 × 32 pixels
- **Usage:** Standard browser icons, desktop shortcuts
- **Source:** https://www.emarat.ae/resources/favicons/favicon-32x32.png

#### Apple Touch Icon
- **File:** `apple-touch-icon.png`
- **Format:** PNG
- **Dimensions:** 180 × 180 pixels
- **Usage:** iOS home screen icons, Safari bookmarks
- **Source:** https://www.emarat.ae/resources/favicons/apple-touch-icon.png

#### Safari Pinned Tab
- **File:** `safari-pinned-tab.svg`
- **Format:** SVG
- **Color:** `#5bbad5` (defined in meta tag)
- **Usage:** Safari pinned tabs on macOS
- **Source:** https://www.emarat.ae/resources/favicons/safari-pinned-tab.svg

---

## Brand Colors (Reference)

### Primary Colors
- **Primary Blue:** `#1e87f0`
- **Dark Blue:** `#004290`
- **Darker Blue:** `#0e6ecd`

### Logo Colors
- **Brand Green:** `#47a01a`
- **Logo Dark Blue:** `#003a85`

### Neutral Colors
- **White:** `#ffffff`
- **Light Gray:** `#f8f8f8`
- **Medium Gray:** `#e5e5e5`
- **Dark Gray:** `#999999`
- **Charcoal:** `#222222`

### Semantic Colors
- **Success Green:** `#32d296`
- **Warning Orange:** `#faa05a`
- **Danger Red:** `#f0506e`

---

## Usage Guidelines

### Logo Usage
- **Always maintain aspect ratio** - Do not stretch or distort
- **Minimum size:** 40px width for digital, 20mm for print
- **Clear space:** Maintain padding equal to height of logo letter
- **Backgrounds:**
  - Light backgrounds: Use full-color logo
  - Dark backgrounds: Use white version (create from SVG)
  - Avoid busy or low-contrast backgrounds

### Favicon Usage
- **Web applications:** Use `favicon.ico` for broad compatibility
- **Modern browsers:** Include PNG variants (16×16, 32×32)
- **iOS/Safari:** Include `apple-touch-icon.png` and `safari-pinned-tab.svg`
- **HTML implementation:**
```html
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
```

---

## File Structure

```
docs/ui-ux/assets/
├── README.md                    # This file
├── emarat-logo.svg              # Primary logo (5.1 KB)
├── favicon.ico                  # Standard favicon (2.3 KB)
├── favicon-16x16.png            # Small favicon (847 B)
├── favicon-32x32.png            # Medium favicon (1.1 KB)
├── apple-touch-icon.png         # iOS icon (7.4 KB)
└── safari-pinned-tab.svg        # Safari pinned tab icon
```

---

## Additional Assets Needed (To Be Created)

### Logo Variations
- [ ] White version of logo (for dark backgrounds)
- [ ] Monochrome version (single color)
- [ ] Horizontal lockup (logo + wordmark)
- [ ] Favicon-sized logo (simplified for small sizes)

### Brand Images
- [ ] Hero images for dashboards
- [ ] Placeholder images for empty states
- [ ] Illustration set (operations, data, AI themes)
- [ ] Icon set (custom icons matching brand style)

### Marketing Assets
- [ ] Social media profile images
- [ ] Email header template
- [ ] Presentation template backgrounds
- [ ] Loading animations / spinners

---

## Asset Export Settings

### For Web Use
- **SVG:** Optimize with SVGO, remove unnecessary metadata
- **PNG:** Export at 2x resolution for retina displays
- **ICO:** Include multiple sizes (16, 32, 48 pixels)

### For Print
- **Format:** PDF or EPS (vector)
- **Color mode:** CMYK
- **Resolution:** 300 DPI minimum

---

## License & Usage Rights

All assets are property of **Emirates General Petroleum Corporation (Emarat)** and are used under license for this project.

**Restrictions:**
- Do not modify the logo without approval
- Do not use assets for non-Emarat projects
- Do not redistribute assets publicly
- Maintain brand integrity in all uses

---

## Contact

For additional brand assets or usage questions:
- **Brand Guidelines:** See `docs/ui-ux/emarat-branding-guidelines.md`
- **Project Lead:** Magure AI Team

---

*Last updated: October 2025*
