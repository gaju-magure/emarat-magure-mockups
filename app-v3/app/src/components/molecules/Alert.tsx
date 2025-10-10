/**
 * Alert Component
 *
 * Contextual feedback messages for user actions
 * Supports multiple types and dismissible option
 */

import { useState, type ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export interface AlertProps {
  /** Alert type */
  type?: 'info' | 'success' | 'warning' | 'danger';
  /** Alert title */
  title?: string;
  /** Alert message */
  children: ReactNode;
  /** Show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** Dismissible */
  dismissible?: boolean;
  /** On dismiss callback */
  onDismiss?: () => void;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional className */
  className?: string;
}

/**
 * Alert Component
 *
 * @example
 * ```tsx
 * // Basic alert
 * <Alert type="success">
 *   Your changes have been saved.
 * </Alert>
 *
 * // With title and dismissible
 * <Alert
 *   type="warning"
 *   title="Warning"
 *   dismissible
 *   onDismiss={() => console.log('dismissed')}
 * >
 *   This action cannot be undone.
 * </Alert>
 *
 * // With action
 * <Alert
 *   type="info"
 *   title="New update available"
 *   action={{ label: 'Update now', onClick: () => handleUpdate() }}
 * >
 *   Version 2.0 is ready to install.
 * </Alert>
 * ```
 */
export function Alert({
  type = 'info',
  title,
  children,
  showIcon = true,
  icon: CustomIcon,
  dismissible = false,
  onDismiss,
  action,
  className,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) {
    return null;
  }

  // Icon mapping
  const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon,
  };

  const Icon = CustomIcon || icons[type];

  // Style mapping
  const styles = {
    info: {
      container: 'bg-info-background border-info-border',
      icon: 'text-info-text',
      title: 'text-info-text',
      text: 'text-text-primary',
      button: 'text-info-text hover:text-info-text/80',
    },
    success: {
      container: 'bg-success-background border-success-border',
      icon: 'text-success-text',
      title: 'text-success-text',
      text: 'text-text-primary',
      button: 'text-success-text hover:text-success-text/80',
    },
    warning: {
      container: 'bg-warning-background border-warning-border',
      icon: 'text-warning-text',
      title: 'text-warning-text',
      text: 'text-text-primary',
      button: 'text-warning-text hover:text-warning-text/80',
    },
    danger: {
      container: 'bg-danger-background border-danger-border',
      icon: 'text-danger-text',
      title: 'text-danger-text',
      text: 'text-text-primary',
      button: 'text-danger-text hover:text-danger-text/80',
    },
  };

  const currentStyle = styles[type];

  return (
    <div
      className={cn(
        'relative flex gap-3 p-4 rounded-lg border',
        'transition-all duration-200',
        currentStyle.container,
        className
      )}
      role="alert"
    >
      {/* Icon */}
      {showIcon && (
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', currentStyle.icon)} />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        {title && (
          <h4 className={cn('text-sm font-semibold mb-1', currentStyle.title)}>
            {title}
          </h4>
        )}

        {/* Message */}
        <div className={cn('text-sm', currentStyle.text)}>{children}</div>

        {/* Action */}
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              'mt-3 text-sm font-medium underline',
              'transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded',
              currentStyle.button
            )}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 p-1 -m-1 rounded',
            'transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            currentStyle.button
          )}
          aria-label="Dismiss alert"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';
