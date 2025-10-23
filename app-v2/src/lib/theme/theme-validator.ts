/**
 * Theme Validator
 * Validates theme JSON structure and provides helpful error messages
 */

import type { Theme, ColorPalette } from './types';

export class ThemeValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ThemeValidationError';
  }
}

export class ThemeValidator {
  private static requiredFields = [
    'id',
    'name',
    'version',
    'branding',
    'fonts',
    'colors',
    'spacing',
  ];

  private static requiredColorFields: (keyof ColorPalette)[] = [
    'background',
    'foreground',
    'primary',
    'primaryForeground',
    'secondary',
    'secondaryForeground',
    'card',
    'cardForeground',
    'border',
  ];

  static validate(theme: unknown): theme is Theme {
    if (!theme || typeof theme !== 'object') {
      throw new ThemeValidationError('Theme must be a valid object');
    }

    const themeObj = theme as Record<string, unknown>;

    // Check required top-level fields
    for (const field of this.requiredFields) {
      if (!(field in themeObj)) {
        throw new ThemeValidationError(`Missing required field: ${field}`);
      }
    }

    // Validate branding
    this.validateBranding(themeObj.branding);

    // Validate fonts
    this.validateFonts(themeObj.fonts);

    // Validate colors
    this.validateColors(themeObj.colors);

    // Validate spacing
    this.validateSpacing(themeObj.spacing);

    return true;
  }

  private static validateBranding(branding: unknown): void {
    if (!branding || typeof branding !== 'object') {
      throw new ThemeValidationError('branding must be an object');
    }

    const brandingObj = branding as Record<string, unknown>;

    if (!brandingObj.companyName || typeof brandingObj.companyName !== 'string') {
      throw new ThemeValidationError('branding.companyName is required');
    }

    if (!brandingObj.logo || typeof brandingObj.logo !== 'object') {
      throw new ThemeValidationError('branding.logo must be an object');
    }

    const logo = brandingObj.logo as Record<string, unknown>;
    if (!logo.light || !logo.dark || !logo.icon) {
      throw new ThemeValidationError('branding.logo must have light, dark, and icon properties');
    }

    if (!brandingObj.favicon || typeof brandingObj.favicon !== 'object') {
      throw new ThemeValidationError('branding.favicon must be an object');
    }
  }

  private static validateFonts(fonts: unknown): void {
    if (!fonts || typeof fonts !== 'object') {
      throw new ThemeValidationError('fonts must be an object');
    }

    const fontsObj = fonts as Record<string, unknown>;

    if (!fontsObj.primary) {
      throw new ThemeValidationError('fonts.primary is required');
    }

    // Validate primary font
    this.validateFont(fontsObj.primary, 'fonts.primary');

    // Validate optional fonts
    if (fontsObj.arabic) {
      this.validateFont(fontsObj.arabic, 'fonts.arabic');
    }
    if (fontsObj.mono) {
      this.validateFont(fontsObj.mono, 'fonts.mono');
    }
  }

  private static validateFont(font: unknown, path: string): void {
    if (!font || typeof font !== 'object') {
      throw new ThemeValidationError(`${path} must be an object`);
    }

    const fontObj = font as Record<string, unknown>;

    if (!fontObj.name || typeof fontObj.name !== 'string') {
      throw new ThemeValidationError(`${path}.name is required`);
    }

    if (!fontObj.fallback || typeof fontObj.fallback !== 'string') {
      throw new ThemeValidationError(`${path}.fallback is required`);
    }

    if (!Array.isArray(fontObj.files)) {
      throw new ThemeValidationError(`${path}.files must be an array`);
    }
  }

  private static validateColors(colors: unknown): void {
    if (!colors || typeof colors !== 'object') {
      throw new ThemeValidationError('colors must be an object');
    }

    const colorsObj = colors as Record<string, unknown>;

    if (!colorsObj.light || typeof colorsObj.light !== 'object') {
      throw new ThemeValidationError('colors.light is required');
    }

    if (!colorsObj.dark || typeof colorsObj.dark !== 'object') {
      throw new ThemeValidationError('colors.dark is required');
    }

    // Validate light palette
    this.validateColorPalette(colorsObj.light, 'colors.light');

    // Validate dark palette
    this.validateColorPalette(colorsObj.dark, 'colors.dark');
  }

  private static validateColorPalette(palette: unknown, path: string): void {
    if (!palette || typeof palette !== 'object') {
      throw new ThemeValidationError(`${path} must be an object`);
    }

    const paletteObj = palette as Record<string, unknown>;

    for (const field of this.requiredColorFields) {
      if (!(field in paletteObj)) {
        throw new ThemeValidationError(`${path}.${field} is required`);
      }

      if (typeof paletteObj[field] !== 'string') {
        throw new ThemeValidationError(`${path}.${field} must be a string`);
      }
    }
  }

  private static validateSpacing(spacing: unknown): void {
    if (!spacing || typeof spacing !== 'object') {
      throw new ThemeValidationError('spacing must be an object');
    }

    const spacingObj = spacing as Record<string, unknown>;

    if (!spacingObj.radius || typeof spacingObj.radius !== 'string') {
      throw new ThemeValidationError('spacing.radius is required');
    }
  }

  /**
   * Validate and sanitize a theme object
   * Returns the validated theme or throws an error
   */
  static validateAndSanitize(theme: unknown): Theme {
    this.validate(theme);
    return theme as Theme;
  }
}
