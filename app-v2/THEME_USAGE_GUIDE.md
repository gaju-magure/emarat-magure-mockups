# Theme System - Quick Start Guide

This guide shows you how to use the dynamic theme system to white-label the Emarat AI application.

---

## 🚀 Quick Theme Switch

### Switch Between Themes

Open your browser console and run:

```javascript
// Switch to MGAI (Magure) branding
window.EmaratAI.setThemeFromUrl('/themes/mgai/theme.json');

// Switch to Emarat branding
window.EmaratAI.setThemeFromUrl('/themes/emarat/theme.json');
```

**Everything changes instantly:**
- ✅ Logo
- ✅ Company name & tagline
- ✅ Colors (60+ variables)
- ✅ Fonts
- ✅ Favicons
- ✅ Document title

---

## 🌍 Multi-Domain Deployment (Environment Variables)

### Configure Theme via Environment Variables

**Perfect for deploying the same codebase to different domains with different branding!**

#### Step 1: Create `.env` File

```bash
# For Emarat deployment
VITE_THEME_URL=/themes/emarat/theme.json
VITE_THEME_MODE=light
```

```bash
# For Magure deployment
VITE_THEME_URL=/themes/mgai/theme.json
VITE_THEME_MODE=light
```

#### Step 2: Build the Application

```bash
npm run build
```

The theme will be baked into the build and applied automatically on load!

### Deployment Platform Examples

#### **Vercel**
```bash
# Project Settings → Environment Variables
VITE_THEME_URL=/themes/mgai/theme.json
VITE_THEME_MODE=light
```

#### **Netlify**
```bash
# Site Settings → Build & Deploy → Environment
VITE_THEME_URL=/themes/emarat/theme.json
VITE_THEME_MODE=light
```

#### **Docker**
```dockerfile
# Dockerfile
ENV VITE_THEME_URL=/themes/custom/theme.json
ENV VITE_THEME_MODE=dark
```

#### **AWS Amplify / Azure / Google Cloud**
Set environment variables in your hosting platform's dashboard:
- `VITE_THEME_URL` → `/themes/partner/theme.json`
- `VITE_THEME_MODE` → `light`

### External Theme URLs

You can also load themes from external CDNs:

```bash
VITE_THEME_URL=https://cdn.partner.com/branding/theme.json
VITE_THEME_MODE=light
```

**Perfect for:**
- Partner white-labeling
- Multi-tenant SaaS
- Different brands per domain
- A/B testing different themes

---

## 📋 Available Themes

### 1. **Emarat Theme** (Default)
- **Logo**: Emarat corporate logo
- **Company**: "Emarat AI"
- **Tagline**: "Your Business Copilot"
- **Primary Color**: Emarat Blue (#003a85)
- **Fonts**: Karbon (custom), TheSansArabic
- **Path**: `/themes/emarat/theme.json`

### 2. **Magure Theme**
- **Logo**: Magure logo
- **Company**: "Magure"
- **Tagline**: "AI Governance"
- **Primary Color**: Indigo (#6366f1)
- **Fonts**: System fonts (Inter fallback)
- **Path**: `/themes/mgai/theme.json`

---

## 🎨 Complete Theme API

### Load Theme from URL

```javascript
window.EmaratAI.setThemeFromUrl('/themes/custom/theme.json');
```

### Set Theme from JSON Object

```javascript
const customTheme = {
  id: 'custom-brand',
  name: 'My Brand',
  version: '1.0.0',
  branding: {
    companyName: 'My Company',
    tagline: 'We Build Amazing Things',
    logo: {
      light: '/themes/custom/logo-light.svg',
      dark: '/themes/custom/logo-dark.svg',
      icon: '/themes/custom/icon.svg'
    },
    favicon: {
      ico: '/themes/custom/favicon.ico',
      png16: '/themes/custom/favicon-16x16.png',
      png32: '/themes/custom/favicon-32x32.png',
      appleTouchIcon: '/themes/custom/apple-touch-icon.png',
      safariPinned: '/themes/custom/safari-pinned-tab.svg'
    }
  },
  fonts: {
    primary: {
      name: 'Roboto',
      fallback: 'sans-serif',
      files: [
        {
          url: '/themes/custom/fonts/Roboto-Regular.woff2',
          weight: 400,
          style: 'normal',
          format: 'woff2'
        }
      ]
    }
  },
  colors: {
    light: {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#0066cc',
      primaryForeground: '#ffffff',
      // ... (60+ color tokens)
    },
    dark: {
      background: '#0f172a',
      foreground: '#f1f5f9',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      // ... (60+ color tokens)
    }
  },
  spacing: {
    radius: '0.5rem'
  }
};

window.EmaratAI.setTheme(customTheme);
```

### Switch Light/Dark Mode

```javascript
// Switch to dark mode
window.EmaratAI.setMode('dark');

// Switch to light mode
window.EmaratAI.setMode('light');
```

### Get Current Theme

```javascript
const currentTheme = window.EmaratAI.getTheme();
console.log('Current theme:', currentTheme.name);
```

### Get Current Mode

```javascript
const mode = window.EmaratAI.getMode();
console.log('Current mode:', mode); // 'light' or 'dark'
```

### Listen to Theme Changes

```javascript
const unsubscribe = window.EmaratAI.onThemeChange((theme) => {
  console.log('Theme changed to:', theme.name);
});

// Stop listening
unsubscribe();
```

---

## 🎯 Use Cases

### **1. Partner White-Label**

Load partner's custom theme from their server:

```javascript
window.EmaratAI.setThemeFromUrl('https://partner.com/brand-theme.json');
```

### **2. Iframe Embedding**

Embed the app with custom branding:

```html
<iframe id="emarat-app" src="https://app.emaratai.com"></iframe>
<script>
  const iframe = document.getElementById('emarat-app');
  iframe.addEventListener('load', () => {
    iframe.contentWindow.EmaratAI.setThemeFromUrl('/partner-theme.json');
  });
</script>
```

### **3. Dynamic Rebranding**

Update colors on the fly:

```javascript
const theme = window.EmaratAI.getTheme();
theme.colors.light.primary = '#ff0000';
window.EmaratAI.setTheme(theme);
```

### **4. Multi-Tenant SaaS**

Different branding per tenant:

```javascript
const tenantId = 'acme-corp';
window.EmaratAI.setThemeFromUrl(`/themes/${tenantId}/theme.json`);
```

---

## 📦 Creating a New Theme

### Step 1: Create Theme Folder

```bash
mkdir -p public/themes/my-brand/fonts
```

### Step 2: Add Assets

Place your assets in the folder:
- Logo: `logo.svg`
- Favicon: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
- Fonts: `fonts/MyFont-Regular.woff2`

### Step 3: Create `theme.json`

Copy and modify from an existing theme:

```bash
cp public/themes/emarat/theme.json public/themes/my-brand/theme.json
```

Edit the JSON file to match your branding.

### Step 4: Test Your Theme

```javascript
window.EmaratAI.setThemeFromUrl('/themes/my-brand/theme.json');
```

---

## 🎨 Color Tokens Reference

The theme system uses 60+ CSS color variables:

### **Base Colors**
- `background`, `foreground`
- `card`, `cardForeground`
- `popover`, `popoverForeground`

### **Brand Colors**
- `primary`, `primaryForeground`
- `secondary`, `secondaryForeground`

### **UI Colors**
- `muted`, `mutedForeground`
- `accent`, `accentForeground`
- `destructive`, `destructiveForeground`

### **Input Colors**
- `border`, `input`, `inputBackground`, `ring`

### **Sidebar Colors**
- `sidebar`, `sidebarForeground`
- `sidebarPrimary`, `sidebarPrimaryForeground`
- `sidebarAccent`, `sidebarAccentForeground`
- `sidebarBorder`, `sidebarRing`

### **Chart Colors**
- `chart1`, `chart2`, `chart3`, `chart4`, `chart5`

### **Semantic Colors**
- `success`, `successBg`, `successBorder`, `successText`
- `warning`, `warningBg`, `warningBorder`, `warningText`
- `danger`, `dangerBg`, `dangerBorder`, `dangerText`
- `info`, `infoBg`, `infoBorder`, `infoText`

---

## 🔍 Debugging

### Check Theme is Loaded

```javascript
window.EmaratAI.getTheme();
```

### Check CSS Variables

```javascript
getComputedStyle(document.documentElement).getPropertyValue('--primary');
getComputedStyle(document.documentElement).getPropertyValue('--font-primary');
```

### Check Font Injection

```javascript
document.getElementById('theme-fonts').textContent;
```

### Check Fonts Loaded

```javascript
document.fonts.ready.then(() => {
  document.fonts.forEach(f => console.log(f.family, f.status));
});
```

### Check Body Font

```javascript
getComputedStyle(document.body).fontFamily;
```

---

## ⚡ Performance

- **Theme Load Time**: < 100ms (cached)
- **Theme Switch Time**: < 50ms
- **Font Injection**: Synchronous
- **Font Loading**: Async with fallbacks
- **CSS Variables**: 60+ tokens
- **No FOUC**: CSS variables prevent flash

---

## 🔐 Security

### Built-in Protections
- ✅ Theme validation (schema checking)
- ✅ Sanitized CSS injection
- ✅ Font URL validation
- ✅ No `eval()` or unsafe operations

### Best Practices
- Always validate theme JSON before applying
- Use HTTPS for external theme URLs
- Implement CSP headers for font sources
- Sanitize custom CSS if allowed

---

## 📚 Additional Documentation

- **Full API Reference**: `THEME_SYSTEM.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Theme Creation Guide**: `public/themes/README.md`
- **Codebase Overview**: `CODEBASE_ANALYSIS.md`

---

## 🆘 Support

### Common Issues

**Theme not loading?**
```javascript
// Check for errors in console
window.EmaratAI.setThemeFromUrl('/themes/custom/theme.json')
  .catch(err => console.error('Theme load failed:', err));
```

**Colors not updating?**
```javascript
// Hard refresh the page
location.reload();
```

**Fonts not showing?**
```javascript
// Check font files exist
console.log(document.getElementById('theme-fonts').textContent);
```

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: October 23, 2025
