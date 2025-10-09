/**
 * Input Component
 *
 * A themeable input component with label, error states, and icon support
 * Fully accessible with ARIA attributes
 */

import React, { type ReactNode, type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/classnames';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'number';
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Icon element (prefix) */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={setEmail}
 * />
 *
 * // With error
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 *
 * // With icon
 * <Input
 *   label="Search"
 *   type="search"
 *   icon={<MagnifyingGlassIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      placeholder,
      value,
      onChange,
      error,
      helperText,
      disabled = false,
      required = false,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const hasError = !!error;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Icon (left) */}
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-text-tertiary">
              <span className="w-5 h-5 flex items-center justify-center">
                {icon}
              </span>
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              // Base styles
              'w-full rounded-lg border bg-background-primary px-4 py-2.5 text-text-primary placeholder:text-text-tertiary',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',

              // Border states
              hasError
                ? 'border-danger-border focus:border-danger-border focus:ring-danger-border'
                : 'border-border-default focus:border-border-focus focus:ring-border-focus',

              // Disabled state
              disabled && 'opacity-50 cursor-not-allowed bg-background-secondary',

              // Icon padding
              icon && iconPosition === 'left' && 'ps-10',
              icon && iconPosition === 'right' && 'pe-10'
            )}
            {...props}
          />

          {/* Icon (right) */}
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-text-tertiary">
              <span className="w-5 h-5 flex items-center justify-center">
                {icon}
              </span>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-danger-text"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
