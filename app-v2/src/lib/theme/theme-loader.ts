/**
 * Theme Loader
 * Handles loading, applying, and managing themes
 */

import type { Theme, ThemeMode, ColorPalette, ThemeFont } from './types';
import { ThemeValidator } from './theme-validator';

export class ThemeLoader {
  private static fontStyleElement: HTMLStyleElement | null = null;
  private static customCssElement: HTMLStyleElement | null = null;

  /**
   * Load theme from URL
   */
  static async loadThemeFromUrl(url: string): Promise<Theme> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load theme: ${response.statusText}`);
      }

      const themeData = await response.json();
      return ThemeValidator.validateAndSanitize(themeData);
    } catch (error) {
      console.error('Error loading theme from URL:', error);
      throw error;
    }
  }

  /**
   * Apply complete theme to the document
   */
  static applyTheme(theme: Theme, mode: ThemeMode): void {
    console.log(`Applying theme: ${theme.name} (${mode} mode)`);

    // 1. Apply CSS variables for colors
    this.injectCSSVariables(theme.colors[mode]);

    // 2. Load and inject fonts
    this.loadFonts(theme.fonts);

    // 3. Apply spacing
    this.applySpacing(theme.spacing);

    // 4. Update branding (favicon, title, etc.)
    this.updateBranding(theme.branding, mode);

    // 5. Inject custom CSS if provided
    if (theme.customCss) {
      this.injectCustomCSS(theme.customCss);
    }

    // 6. Set or remove dark class on document
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Trigger a custom event for theme application
    const event = new CustomEvent('themeApplied', {
      detail: { theme, mode },
    });
    window.dispatchEvent(event);
  }

  /**
   * Inject CSS variables into :root
   */
  private static injectCSSVariables(palette: ColorPalette): void {
    const root = document.documentElement;

    // Base colors
    root.style.setProperty('--background', palette.background);
    root.style.setProperty('--foreground', palette.foreground);
    root.style.setProperty('--card', palette.card);
    root.style.setProperty('--card-foreground', palette.cardForeground);
    root.style.setProperty('--popover', palette.popover);
    root.style.setProperty('--popover-foreground', palette.popoverForeground);

    // Brand colors
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--primary-foreground', palette.primaryForeground);
    root.style.setProperty('--secondary', palette.secondary);
    root.style.setProperty('--secondary-foreground', palette.secondaryForeground);

    // UI colors
    root.style.setProperty('--muted', palette.muted);
    root.style.setProperty('--muted-foreground', palette.mutedForeground);
    root.style.setProperty('--accent', palette.accent);
    root.style.setProperty('--accent-foreground', palette.accentForeground);
    root.style.setProperty('--destructive', palette.destructive);
    root.style.setProperty('--destructive-foreground', palette.destructiveForeground);

    // Borders & inputs
    root.style.setProperty('--border', palette.border);
    root.style.setProperty('--input', palette.input);
    root.style.setProperty('--input-background', palette.inputBackground);
    root.style.setProperty('--ring', palette.ring);

    // Sidebar
    root.style.setProperty('--sidebar', palette.sidebar);
    root.style.setProperty('--sidebar-foreground', palette.sidebarForeground);
    root.style.setProperty('--sidebar-primary', palette.sidebarPrimary);
    root.style.setProperty('--sidebar-primary-foreground', palette.sidebarPrimaryForeground);
    root.style.setProperty('--sidebar-accent', palette.sidebarAccent);
    root.style.setProperty('--sidebar-accent-foreground', palette.sidebarAccentForeground);
    root.style.setProperty('--sidebar-border', palette.sidebarBorder);
    root.style.setProperty('--sidebar-ring', palette.sidebarRing);

    // Charts
    root.style.setProperty('--chart-1', palette.chart1);
    root.style.setProperty('--chart-2', palette.chart2);
    root.style.setProperty('--chart-3', palette.chart3);
    root.style.setProperty('--chart-4', palette.chart4);
    root.style.setProperty('--chart-5', palette.chart5);

    // Semantic colors
    root.style.setProperty('--success', palette.success);
    root.style.setProperty('--success-bg', palette.successBg);
    root.style.setProperty('--success-border', palette.successBorder);
    root.style.setProperty('--success-text', palette.successText);

    root.style.setProperty('--warning', palette.warning);
    root.style.setProperty('--warning-bg', palette.warningBg);
    root.style.setProperty('--warning-border', palette.warningBorder);
    root.style.setProperty('--warning-text', palette.warningText);

    root.style.setProperty('--danger', palette.danger);
    root.style.setProperty('--danger-bg', palette.dangerBg);
    root.style.setProperty('--danger-border', palette.dangerBorder);
    root.style.setProperty('--danger-text', palette.dangerText);

    root.style.setProperty('--info', palette.info);
    root.style.setProperty('--info-bg', palette.infoBg);
    root.style.setProperty('--info-border', palette.infoBorder);
    root.style.setProperty('--info-text', palette.infoText);
  }

  /**
   * Load fonts dynamically
   */
  private static loadFonts(fonts: Theme['fonts']): void {
    console.log('🔤 Loading fonts...');

    // Remove existing font style element if any
    if (this.fontStyleElement) {
      this.fontStyleElement.remove();
    }

    // Create new style element
    this.fontStyleElement = document.createElement('style');
    this.fontStyleElement.id = 'theme-fonts';

    let css = '';
    let fontsLoaded = 0;

    // Generate @font-face rules for primary font
    if (fonts.primary.files.length > 0) {
      css += this.generateFontFaceRules(fonts.primary);
      document.documentElement.style.setProperty('--font-primary', `"${fonts.primary.name}", ${fonts.primary.fallback}`);
      console.log(`  ✓ Primary font: ${fonts.primary.name} (${fonts.primary.files.length} variants)`);
      fontsLoaded++;
    }

    // Generate @font-face rules for Arabic font
    if (fonts.arabic && fonts.arabic.files.length > 0) {
      css += this.generateFontFaceRules(fonts.arabic);
      document.documentElement.style.setProperty('--font-arabic', `"${fonts.arabic.name}", ${fonts.arabic.fallback}`);
      console.log(`  ✓ Arabic font: ${fonts.arabic.name} (${fonts.arabic.files.length} variants)`);
      fontsLoaded++;
    }

    // Generate @font-face rules for mono font
    if (fonts.mono && fonts.mono.files.length > 0) {
      css += this.generateFontFaceRules(fonts.mono);
      document.documentElement.style.setProperty('--font-mono', `"${fonts.mono.name}", ${fonts.mono.fallback}`);
      console.log(`  ✓ Mono font: ${fonts.mono.name} (${fonts.mono.files.length} variants)`);
      fontsLoaded++;
    }

    this.fontStyleElement.textContent = css;
    document.head.appendChild(this.fontStyleElement);

    console.log(`✅ ${fontsLoaded} font families injected successfully`);
  }

  /**
   * Generate @font-face CSS rules for a font
   */
  private static generateFontFaceRules(font: ThemeFont): string {
    return font.files
      .map(
        (file) => `
@font-face {
  font-family: "${font.name}";
  font-weight: ${file.weight};
  font-style: ${file.style};
  font-display: swap;
  src: url("${file.url}") format("${file.format}");
}
`
      )
      .join('\n');
  }

  /**
   * Apply spacing values
   */
  private static applySpacing(spacing: Theme['spacing']): void {
    document.documentElement.style.setProperty('--radius', spacing.radius);
  }

  /**
   * Update branding elements (favicon, title, etc.)
   */
  private static updateBranding(branding: Theme['branding'], mode: ThemeMode): void {
    // Update document title
    document.title = branding.companyName;

    // Update meta description if tagline exists
    if (branding.tagline) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', branding.tagline);
    }

    // Update favicons
    this.updateFavicon('icon', branding.favicon.ico);
    this.updateFavicon('icon', branding.favicon.png16, 'image/png', '16x16');
    this.updateFavicon('icon', branding.favicon.png32, 'image/png', '32x32');
    this.updateFavicon('apple-touch-icon', branding.favicon.appleTouchIcon);

    // Update Safari pinned tab
    let safariTab = document.querySelector('link[rel="mask-icon"]') as HTMLLinkElement;
    if (!safariTab) {
      safariTab = document.createElement('link');
      safariTab.rel = 'mask-icon';
      document.head.appendChild(safariTab);
    }
    safariTab.href = branding.favicon.safariPinned;

    // Store logo URLs in CSS variables for components to use
    document.documentElement.style.setProperty('--logo-light', `url("${branding.logo.light}")`);
    document.documentElement.style.setProperty('--logo-dark', `url("${branding.logo.dark}")`);
    document.documentElement.style.setProperty('--logo-icon', `url("${branding.logo.icon}")`);

    // Set current logo based on mode
    const currentLogo = mode === 'dark' ? branding.logo.dark : branding.logo.light;
    document.documentElement.style.setProperty('--logo-current', `url("${currentLogo}")`);

    // Dispatch event for components that need logo updates
    const logoEvent = new CustomEvent('logoUpdated', {
      detail: { branding, mode },
    });
    window.dispatchEvent(logoEvent);
  }

  /**
   * Update a favicon link element
   */
  private static updateFavicon(
    rel: string,
    href: string,
    type?: string,
    sizes?: string
  ): void {
    let link = document.querySelector(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ''}`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      if (type) link.type = type;
      if (sizes) link.setAttribute('sizes', sizes);
      document.head.appendChild(link);
    }

    link.href = href;
  }

  /**
   * Inject custom CSS
   */
  private static injectCustomCSS(css: string): void {
    // Remove existing custom CSS element if any
    if (this.customCssElement) {
      this.customCssElement.remove();
    }

    // Create new style element
    this.customCssElement = document.createElement('style');
    this.customCssElement.id = 'theme-custom-css';
    this.customCssElement.textContent = css;
    document.head.appendChild(this.customCssElement);
  }

  /**
   * Clear all theme customizations
   */
  static clearTheme(): void {
    if (this.fontStyleElement) {
      this.fontStyleElement.remove();
      this.fontStyleElement = null;
    }

    if (this.customCssElement) {
      this.customCssElement.remove();
      this.customCssElement = null;
    }

    document.documentElement.classList.remove('dark');
  }
}
