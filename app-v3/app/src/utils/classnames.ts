/**
 * Classnames Utility (cn)
 *
 * A utility function for conditionally joining classNames together
 * Built using clsx for optimal performance and flexibility
 *
 * Usage:
 * cn('foo', 'bar') // 'foo bar'
 * cn('foo', condition && 'bar') // 'foo bar' if condition is true
 * cn('foo', { bar: true, baz: false }) // 'foo bar'
 * cn('foo', ['bar', { baz: true }]) // 'foo bar baz'
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Merge classnames conditionally
 *
 * @param inputs - Class values to merge
 * @returns Merged classname string
 *
 * @example
 * ```tsx
 * // Basic usage
 * <div className={cn('text-lg', 'font-bold')}>Text</div>
 *
 * // Conditional classes
 * <button className={cn(
 *   'px-4 py-2 rounded',
 *   isPrimary && 'bg-primary text-white',
 *   isDisabled && 'opacity-50 cursor-not-allowed'
 * )}>
 *   Button
 * </button>
 *
 * // Object syntax
 * <div className={cn('base-class', {
 *   'active-class': isActive,
 *   'error-class': hasError
 * })}>
 *   Content
 * </div>
 *
 * // Array syntax
 * <div className={cn([
 *   'base-class',
 *   condition && 'conditional-class',
 *   { 'object-class': true }
 * ])}>
 *   Content
 * </div>
 *
 * // Variant patterns (common in components)
 * const buttonVariants = {
 *   primary: 'bg-primary text-white',
 *   secondary: 'bg-secondary text-white',
 *   ghost: 'bg-transparent border border-border-default'
 * };
 *
 * <button className={cn(
 *   'px-4 py-2 rounded font-medium',
 *   buttonVariants[variant]
 * )}>
 *   Button
 * </button>
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Common className patterns for reuse
 * Use these to maintain consistency across the app
 */
export const commonClasses = {
  // Layout
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8 sm:py-12 lg:py-16',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',

  // Typography
  heading1: 'text-3xl font-semibold text-text-primary',
  heading2: 'text-2xl font-semibold text-text-primary',
  heading3: 'text-lg font-semibold text-text-primary',
  body: 'text-base text-text-primary',
  caption: 'text-sm text-text-secondary',
  label: 'text-sm font-medium text-text-primary',

  // Cards
  card: 'bg-background-elevated rounded-lg border border-border-default p-6 shadow-sm',
  cardHover: 'bg-background-elevated rounded-lg border border-border-default p-6 shadow-sm hover:shadow-md transition-shadow',

  // Buttons (base classes)
  buttonBase: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed',
  buttonPrimary: 'bg-primary text-white hover:bg-primary-hover',
  buttonSecondary: 'bg-secondary text-white hover:bg-secondary-hover',
  buttonGhost: 'bg-transparent border border-border-default text-text-primary hover:bg-background-secondary',

  // Inputs
  inputBase: 'w-full rounded-lg border border-border-default bg-background-primary px-4 py-2 text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed',
  inputError: 'border-danger-border focus:border-danger-border focus:ring-danger-border',

  // Spacing
  stack: 'flex flex-col gap-4',
  stackTight: 'flex flex-col gap-2',
  stackRelaxed: 'flex flex-col gap-6',
  inline: 'flex items-center gap-4',
  inlineTight: 'flex items-center gap-2',

  // States
  loading: 'opacity-50 pointer-events-none',
  disabled: 'opacity-50 cursor-not-allowed',
  hidden: 'hidden',
  srOnly: 'sr-only',

  // Transitions
  transition: 'transition-all duration-200 ease-out',
  transitionFast: 'transition-all duration-150 ease-out',
  transitionSlow: 'transition-all duration-300 ease-out',

  // Focus
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-border-focus',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
} as const;

/**
 * Helper to create variant-based classnames
 * Useful for components with multiple variants
 *
 * @example
 * ```tsx
 * const buttonVariants = createVariants({
 *   variant: {
 *     primary: 'bg-primary text-white',
 *     secondary: 'bg-secondary text-white',
 *     ghost: 'bg-transparent border'
 *   },
 *   size: {
 *     sm: 'px-3 py-1.5 text-sm',
 *     md: 'px-4 py-2 text-base',
 *     lg: 'px-6 py-3 text-lg'
 *   }
 * });
 *
 * const classes = cn(
 *   'rounded font-medium',
 *   buttonVariants.variant.primary,
 *   buttonVariants.size.md
 * );
 * ```
 */
export function createVariants<T extends Record<string, Record<string, string>>>(
  variants: T
): T {
  return variants;
}
