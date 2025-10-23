# Emarat AI - Theme System

This directory contains themes for the Emarat AI application. Themes control colors, fonts, branding, and visual appearance.

## Directory Structure

```
themes/
├── emarat/              # Default Emarat theme
│   ├── theme.json       # Theme configuration
│   ├── emarat-logo.svg  # Company logo
│   ├── favicon.ico      # Favicons
│   └── fonts/           # Font files
└── custom-brand/        # Example custom theme
    ├── theme.json
    ├── logo.svg
    └── fonts/
```

## Creating a Custom Theme

### 1. Create Theme Directory

```bash
mkdir -p public/themes/my-brand/fonts
```

### 2. Add Assets

- Add your logo files (SVG recommended)
- Add favicons (ico, png formats)
- Add custom fonts (woff2 format recommended)

### 3. Create theme.json

Copy `emarat/theme.json` as a template and customize:

```json
{
  "id": "my-brand",
  "name": "My Brand",
  "version": "1.0.0",
  "branding": {
    "companyName": "My Company",
    "tagline": "Your tagline here",
    "logo": {
      "light": "/themes/my-brand/logo-light.svg",
      "dark": "/themes/my-brand/logo-dark.svg",
      "icon": "/themes/my-brand/favicon-32x32.png"
    },
    "favicon": {
      "ico": "/themes/my-brand/favicon.ico",
      "png16": "/themes/my-brand/favicon-16x16.png",
      "png32": "/themes/my-brand/favicon-32x32.png",
      "appleTouchIcon": "/themes/my-brand/apple-touch-icon.png",
      "safariPinned": "/themes/my-brand/safari-pinned-tab.svg"
    }
  },
  "fonts": {
    "primary": {
      "name": "YourFont",
      "fallback": "Arial, sans-serif",
      "files": [
        {
          "weight": 400,
          "style": "normal",
          "format": "woff2",
          "url": "/themes/my-brand/fonts/YourFont-Regular.woff2"
        }
      ]
    }
  },
  "colors": {
    "light": {
      "background": "#ffffff",
      "foreground": "#000000",
      "primary": "#0066cc",
      "primaryForeground": "#ffffff",
      ...
    },
    "dark": {
      "background": "#000000",
      "foreground": "#ffffff",
      "primary": "#3399ff",
      "primaryForeground": "#ffffff",
      ...
    }
  },
  "spacing": {
    "radius": "0.5rem"
  }
}
```

## Loading Themes

### Method 1: Default Theme

The application loads `/themes/emarat/theme.json` by default.

### Method 2: URL Parameter

Load a theme via URL:
```
https://your-app.com?themeUrl=/themes/my-brand/theme.json
```

### Method 3: JavaScript API

Use the window API (for platform embedding):

```javascript
// Load theme from URL
window.EmaratAI.setThemeFromUrl('/themes/my-brand/theme.json');

// Set theme directly
window.EmaratAI.setTheme({
  id: 'custom',
  name: 'Custom Theme',
  ...
});

// Switch light/dark mode
window.EmaratAI.setMode('light');
window.EmaratAI.setMode('dark');

// Get current theme
const theme = window.EmaratAI.getTheme();

// Listen to theme changes
const unsubscribe = window.EmaratAI.onThemeChange((theme) => {
  console.log('Theme changed:', theme);
});
```

### Method 4: External URL

Load theme from external CDN:
```javascript
window.EmaratAI.setThemeFromUrl('https://cdn.example.com/themes/my-theme.json');
```

## Theme Schema

### Required Fields

- `id` - Unique theme identifier
- `name` - Human-readable theme name
- `version` - Semantic version (e.g., "1.0.0")
- `branding` - Company branding assets
- `fonts` - Font definitions
- `colors` - Color palettes for light and dark modes
- `spacing` - Spacing values (border radius, etc.)

### Color Palette

Each color mode (light/dark) must include:

**Base Colors:**
- `background`, `foreground`
- `card`, `cardForeground`
- `popover`, `popoverForeground`

**Brand Colors:**
- `primary`, `primaryForeground`
- `secondary`, `secondaryForeground`

**UI Colors:**
- `muted`, `mutedForeground`
- `accent`, `accentForeground`
- `destructive`, `destructiveForeground`

**Borders & Inputs:**
- `border`, `input`, `inputBackground`, `ring`

**Sidebar:**
- `sidebar`, `sidebarForeground`
- `sidebarPrimary`, `sidebarPrimaryForeground`
- `sidebarAccent`, `sidebarAccentForeground`
- `sidebarBorder`, `sidebarRing`

**Charts:**
- `chart1`, `chart2`, `chart3`, `chart4`, `chart5`

**Semantic Colors:**
- `success`, `successBg`, `successBorder`, `successText`
- `warning`, `warningBg`, `warningBorder`, `warningText`
- `danger`, `dangerBg`, `dangerBorder`, `dangerText`
- `info`, `infoBg`, `infoBorder`, `infoText`

## Font Files

### Recommended Format

Use WOFF2 format for best compression and browser support:
```json
{
  "weight": 400,
  "style": "normal",
  "format": "woff2",
  "url": "/themes/my-brand/fonts/MyFont-Regular.woff2"
}
```

### Multiple Formats

Provide fallbacks for older browsers:
```json
"files": [
  {
    "weight": 400,
    "style": "normal",
    "format": "woff2",
    "url": "/themes/my-brand/fonts/MyFont-Regular.woff2"
  },
  {
    "weight": 400,
    "style": "normal",
    "format": "woff",
    "url": "/themes/my-brand/fonts/MyFont-Regular.woff"
  }
]
```

### Font Weights

Common font weights:
- 300 - Light
- 400 - Regular/Normal
- 500 - Medium
- 600 - Semi-Bold
- 700 - Bold

## Custom CSS

Add custom CSS rules via the `customCss` field:

```json
{
  ...
  "customCss": ".my-custom-class { color: red; }"
}
```

## Theme Caching

Themes are automatically cached in localStorage for faster loading. The cache is updated when:
- A new theme is loaded
- Theme mode (light/dark) changes
- Page is refreshed

## Validation

Themes are validated on load. Common errors:

- **Missing required field**: Add the missing field to your theme.json
- **Invalid color format**: Use hex (#ffffff) or rgba() format
- **Font file not found**: Check the font URL path
- **Invalid JSON**: Validate your JSON syntax

## Best Practices

1. **Use CSS Variables**: All theme colors are exposed as CSS variables
2. **Provide Both Modes**: Always define light and dark color palettes
3. **Optimize Assets**: Use compressed image formats (SVG, WebP)
4. **Test Thoroughly**: Test your theme in both light and dark modes
5. **Version Control**: Increment version when making changes
6. **Accessibility**: Ensure sufficient color contrast ratios

## Examples

See the default `emarat/` theme for a complete reference implementation.

## Support

For questions or issues with theming, consult the main documentation or contact the development team.
