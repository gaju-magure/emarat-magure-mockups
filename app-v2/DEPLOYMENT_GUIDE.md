# Multi-Domain Deployment Guide

This guide shows you how to deploy the same codebase to different domains with different branding.

---

## 🎯 Use Case

You have one codebase but want to deploy it to multiple domains with different branding:

- **emarat.ai** → Emarat branding
- **magure.ai** → Magure branding
- **partner.com** → Partner branding

---

## 🚀 Quick Setup

### 1. **Set Environment Variables**

Create a `.env` file in the project root or set environment variables in your hosting platform:

```bash
# Choose your theme
VITE_THEME_URL=/themes/emarat/theme.json
VITE_THEME_MODE=light
```

### 2. **Build the Application**

```bash
npm run build
```

### 3. **Deploy**

The built application will automatically load the theme specified in the environment variables.

---

## 📦 Deployment Examples

### **Vercel** (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Go to **Project Settings** → **Environment Variables**
4. Add variables:

**For Emarat deployment:**
```
VITE_THEME_URL=/themes/emarat/theme.json
VITE_THEME_MODE=light
```

**For Magure deployment:**
```
VITE_THEME_URL=/themes/mgai/theme.json
VITE_THEME_MODE=light
```

5. Deploy!

Each domain can have different environment variables, giving you automatic multi-tenancy.

---

### **Netlify**

1. Push code to GitHub
2. Import project to Netlify
3. Go to **Site Settings** → **Build & Deploy** → **Environment**
4. Add environment variables
5. Deploy!

---

### **Docker Deployment**

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Set theme via build arguments
ARG VITE_THEME_URL=/themes/emarat/theme.json
ARG VITE_THEME_MODE=light

ENV VITE_THEME_URL=$VITE_THEME_URL
ENV VITE_THEME_MODE=$VITE_THEME_MODE

# Build the app
RUN npm run build

# Production image
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build with different themes:**

```bash
# Emarat version
docker build --build-arg VITE_THEME_URL=/themes/emarat/theme.json -t emarat-app .

# Magure version
docker build --build-arg VITE_THEME_URL=/themes/mgai/theme.json -t magure-app .
```

---

### **AWS Amplify**

1. Connect your GitHub repository
2. Go to **App Settings** → **Environment Variables**
3. Add:
   - `VITE_THEME_URL` → `/themes/emarat/theme.json`
   - `VITE_THEME_MODE` → `light`
4. Deploy!

---

### **Azure Static Web Apps**

1. Create Static Web App from GitHub
2. Go to **Configuration** → **Application Settings**
3. Add environment variables
4. Redeploy

---

### **Google Cloud Run**

```bash
# Build and deploy with environment variables
gcloud run deploy emarat-app \
  --source . \
  --set-env-vars VITE_THEME_URL=/themes/emarat/theme.json,VITE_THEME_MODE=light
```

---

## 🌐 Multi-Domain Strategy

### **Option 1: Multiple Vercel/Netlify Projects**

Best for: Simple setup, different builds per domain

1. Create separate projects for each domain
2. Connect same GitHub repo to each
3. Set different environment variables per project
4. Each domain gets its own branding automatically

**Example:**
- `emarat-production` project → emarat.ai domain
- `magure-production` project → magure.ai domain

---

### **Option 2: Single Deployment with Runtime Detection**

Best for: Dynamic multi-tenancy, same build everywhere

Update `theme-provider.tsx` to detect domain:

```typescript
// Get theme based on domain
const getThemeFromDomain = () => {
  const hostname = window.location.hostname;

  if (hostname.includes('magure')) {
    return '/themes/mgai/theme.json';
  } else if (hostname.includes('emarat')) {
    return '/themes/emarat/theme.json';
  }

  // Default
  return import.meta.env.VITE_THEME_URL || '/themes/emarat/theme.json';
};
```

---

### **Option 3: External Theme Server**

Best for: SaaS platforms, dynamic partner themes

Set environment variable to external URL:

```bash
VITE_THEME_URL=https://cdn.yourcompany.com/themes/{partner-id}/theme.json
```

Each partner gets their own theme JSON hosted on your CDN.

---

## 🔒 Security Considerations

### **Environment Variables**

✅ **Safe to expose:**
- `VITE_THEME_URL` - Just a path to public JSON
- `VITE_THEME_MODE` - Just "light" or "dark"

❌ **Never expose:**
- API keys
- Database credentials
- Secret tokens

Only variables prefixed with `VITE_` are exposed to the client in Vite projects.

### **Theme URL Validation**

The theme loader validates:
- ✅ JSON schema
- ✅ Required fields
- ✅ Color format
- ✅ Font URLs

---

## 🧪 Testing Different Themes

### **Local Development**

Create multiple `.env` files:

**.env.emarat**
```bash
VITE_THEME_URL=/themes/emarat/theme.json
VITE_THEME_MODE=light
```

**.env.magure**
```bash
VITE_THEME_URL=/themes/mgai/theme.json
VITE_THEME_MODE=light
```

**Switch themes:**
```bash
# Use Emarat theme
cp .env.emarat .env
npm run dev

# Use Magure theme
cp .env.magure .env
npm run dev
```

---

### **Preview Builds**

```bash
# Build with Emarat theme
VITE_THEME_URL=/themes/emarat/theme.json npm run build
npm run preview

# Build with Magure theme
VITE_THEME_URL=/themes/mgai/theme.json npm run build
npm run preview
```

---

## 📊 Monitoring

### **Check Active Theme**

Add to your analytics or monitoring:

```javascript
// Log which theme is active
const theme = window.EmaratAI.getTheme();
console.log('Active theme:', theme.id, theme.name);

// Send to analytics
analytics.track('Theme Loaded', {
  themeId: theme.id,
  themeName: theme.name,
  mode: window.EmaratAI.getMode()
});
```

---

## 🆘 Troubleshooting

### **Theme not loading after deployment?**

1. Check environment variables are set correctly
2. Verify theme files exist in `/public/themes/` folder
3. Check browser console for errors
4. Ensure you rebuilt after changing env variables

### **Different theme showing than expected?**

```javascript
// Check what environment variable was set during build
console.log('Expected theme:', import.meta.env.VITE_THEME_URL);
console.log('Actual theme:', window.EmaratAI.getTheme()?.name);
```

### **Theme works locally but not in production?**

- Ensure theme files are included in build output
- Check `/public/themes/` folder is copied to deployment
- Verify hosting platform serves static files correctly

---

## 📋 Checklist

Before deploying to a new domain:

- [ ] Created/selected theme JSON file
- [ ] Set `VITE_THEME_URL` environment variable
- [ ] Set `VITE_THEME_MODE` environment variable
- [ ] Built application (`npm run build`)
- [ ] Tested build locally (`npm run preview`)
- [ ] Verified theme assets exist in build output
- [ ] Deployed to hosting platform
- [ ] Tested live site

---

## 🎯 Real-World Example

**Scenario:** You want to deploy to 3 domains

### **Domain 1: emarat.ai**
```bash
# Vercel Project: emarat-production
VITE_THEME_URL=/themes/emarat/theme.json
VITE_THEME_MODE=light
```

### **Domain 2: magure.ai**
```bash
# Vercel Project: magure-production
VITE_THEME_URL=/themes/mgai/theme.json
VITE_THEME_MODE=light
```

### **Domain 3: partner.com**
```bash
# Vercel Project: partner-production
VITE_THEME_URL=/themes/partner/theme.json
VITE_THEME_MODE=dark
```

**Result:** Same codebase, 3 different brands, fully automated! 🚀

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: October 23, 2025
