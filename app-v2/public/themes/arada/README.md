# Arada Theme

This theme is based on the design system from [Arada.com](https://www.arada.com/en/), a leading real estate developer in the UAE.

## Design Characteristics

- **Style**: Minimalist, monochrome, high-contrast
- **Primary Color**: Black (#000000) in light mode, White (#ffffff) in dark mode
- **Secondary Color**: Dark Blue (#1d428a, #082244)
- **Background**: Light Gray (#f1f1f1) in light mode, Pure Black (#000000) in dark mode
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

### Light Mode
- Background: `#ffffff` (Pure White)
- Foreground: `#000000` (Black)
- Primary: `#000000` (Black)
- Card: `#fafafa` (Very Light White)
- Secondary: `#fafafa` (Very Light White)
- Muted: `#f9f9f9` (Near White)
- Accent: `#1d428a` (Dark Blue)
- Border: `#d4d4d4` (Subtle Grey)
- Sidebar Border: `#d4d4d4` (Greyish Lines)

### Dark Mode
- Background: `#0a0a0a` (Near Black)
- Foreground: `#ffffff` (White)
- Primary: `#ffffff` (White)
- Secondary: `#2a2a2a` (Dark Gray)
- Accent: `#1d428a` (Blue)
- Card: `#141414` (Dark Gray)
- Border: `#2a2a2a` (Dark Gray)

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

For production use, replace placeholder favicons with proper image files:

1. Create a 512x512px PNG of the Arada logo with transparent background
2. Use a favicon generator to create multiple sizes:
   - 16x16 PNG
   - 32x32 PNG
   - 180x180 PNG (Apple Touch Icon)
   - ICO file containing multiple sizes
3. Create a simplified single-color SVG for Safari Pinned Tab
4. Replace files in `/themes/arada/`

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
