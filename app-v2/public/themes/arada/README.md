# Arada Theme

This theme is based on the design system from [Arada.com](https://www.arada.com/en/), a leading real estate developer in the UAE.

## Design Characteristics

- **Style**: Minimalist, monochrome, high-contrast - **basically white and black**
- **Primary Color**: Black (#000000) in light mode, White (#ffffff) in dark mode
- **Accent Color**: Black/White - no color accents
- **Background**: Pure White (#ffffff) in light mode, Pure Black (#000000) in dark mode
- **Charts**: Greyscale palette (5 shades from black to light grey)
- **Border Radius**: Minimal (0.25rem / 4px) - sharp, corporate aesthetic
- **Typography**: Clean, bold headings with lighter body text

## Fonts

The Arada brand uses custom proprietary fonts:

- **Primary**: Arada-Bold, Arada-Regular, Arada-Light
- **Arabic**: Cairo-Regular, Cairo-Light

### Adding Custom Fonts

To use the authentic Arada fonts:

1. Obtain licensed font files (WOFF2 format recommended)
2. Place font files in `/themes/arada/fonts/`
3. Update `theme.json` with font file references:

```json
{
  "fonts": {
    "primary": {
      "name": "Arada",
      "fallback": "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "files": [
        {
          "weight": 300,
          "style": "normal",
          "format": "woff2",
          "url": "/themes/arada/fonts/Arada-Light.woff2"
        },
        {
          "weight": 400,
          "style": "normal",
          "format": "woff2",
          "url": "/themes/arada/fonts/Arada-Regular.woff2"
        },
        {
          "weight": 700,
          "style": "normal",
          "format": "woff2",
          "url": "/themes/arada/fonts/Arada-Bold.woff2"
        }
      ]
    }
  }
}
```

Currently, the theme uses system fonts as fallback.

## Color Palette

### Light Mode (White & Black Theme)
- Background: `#ffffff` (Pure White)
- Foreground: `#000000` (Black)
- Primary: `#000000` (Black)
- Card: `#ffffff` (Pure White)
- Secondary: `#f5f5f5` (Very Light Grey)
- Muted: `#fafafa` (Near White)
- Accent: `#000000` (Black - no color)
- Border: `#e5e5e5` (Light Grey)
- Charts: Greyscale (`#000000` → `#404040` → `#737373` → `#a3a3a3` → `#d4d4d4`)

### Dark Mode (Black & White Theme)
- Background: `#000000` (Pure Black)
- Foreground: `#ffffff` (White)
- Primary: `#ffffff` (White)
- Card: `#0a0a0a` (Near Black)
- Secondary: `#1a1a1a` (Dark Grey)
- Muted: `#141414` (Very Dark Grey)
- Accent: `#ffffff` (White - no color)
- Border: `#262626` (Dark Grey)
- Charts: Greyscale Reversed (`#ffffff` → `#d4d4d4` → `#a3a3a3` → `#737373` → `#404040`)

## Usage

### Load Arada Theme

```javascript
// Using Window API
await window.EmaratAI.setThemeFromUrl('/themes/arada/theme.json');

// Using React Hook
const { loadTheme } = useTheme();
await loadTheme('/themes/arada/theme.json');

// Via URL Parameter
https://your-app.com?themeUrl=/themes/arada/theme.json

// Via Environment Variable
VITE_THEME_URL=/themes/arada/theme.json
```

### Switch Mode

```javascript
// Switch to dark mode
window.EmaratAI.setMode('dark');

// Switch to light mode
window.EmaratAI.setMode('light');
```

## Brand Assets

- **Logo**: Extracted from Arada.com (arada-logo.svg)
- **Favicon**: SVG placeholders (should be replaced with proper PNG/ICO files)

### Improving Favicons

⚠️ **Current Status**: The theme uses the SVG logo for all favicon references (temporary workaround).

For production use, create proper PNG/ICO favicon files:

1. See detailed instructions in `HOW_TO_CREATE_FAVICONS.md`
2. Use a favicon generator: https://realfavicongenerator.net/
3. Create these files:
   - `favicon.ico` (16x16, 32x32, 48x48 multi-size)
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `safari-pinned-tab.svg` (single color)
4. Place files in `/themes/arada/`
5. Update `theme.json` favicon paths

## Best Practices

### Use High Contrast Colors
The Arada theme uses pure black and white for maximum contrast. Ensure all text has sufficient contrast ratios:
- Black text on light gray: ✓ 14.8:1 contrast
- White text on black: ✓ 21:1 contrast

### Minimal Borders
Keep borders minimal with the theme's `0.25rem` radius:
```tsx
<div className="rounded-sm"> {/* Uses --radius setting */}
```

### Sharp Design
Avoid overly rounded elements. The Arada aesthetic favors:
- Sharp corners
- Clean lines
- Generous whitespace
- Bold typography

## Design System Reference

This theme is inspired by:
- [Arada.com](https://www.arada.com/en/)
- Minimalist corporate design
- High-end real estate branding
- Premium positioning

## License

This theme configuration is provided for educational and development purposes. The Arada brand, logo, and custom fonts are property of Arada Development and subject to their licensing terms.

For commercial use, ensure proper licensing of:
- Arada brand assets
- Custom font families
- Logo usage rights
