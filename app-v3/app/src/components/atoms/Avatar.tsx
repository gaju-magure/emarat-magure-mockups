/**
 * Avatar Component
 *
 * Displays user avatar with image, initials, or fallback
 * Supports status indicators and multiple sizes
 */

import { useState } from 'react';
import { cn } from '@/utils/classnames';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** User name (for initials) */
  name?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Additional className */
  className?: string;
}

/**
 * Get initials from name
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Avatar Component
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="User Name" />
 *
 * // With initials
 * <Avatar name="Sarah Al-Mansouri" />
 *
 * // With status
 * <Avatar name="Sarah Al-Mansouri" status="online" />
 *
 * // Different sizes
 * <Avatar name="Sarah" size="xs" />
 * <Avatar name="Sarah" size="xl" />
 * ```
 */
export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name ? getInitials(name) : '?';
  const showImage = src && !imageError;

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Avatar circle */}
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center',
          'bg-primary/10 text-primary font-medium',
          'transition-all duration-200',

          // Size styles
          size === 'xs' && 'w-6 h-6 text-xs',
          size === 'sm' && 'w-8 h-8 text-sm',
          size === 'md' && 'w-10 h-10 text-base',
          size === 'lg' && 'w-12 h-12 text-lg',
          size === 'xl' && 'w-16 h-16 text-xl'
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 end-0 block rounded-full',
            'ring-2 ring-background-primary',

            // Size styles
            size === 'xs' && 'w-1.5 h-1.5',
            size === 'sm' && 'w-2 h-2',
            size === 'md' && 'w-2.5 h-2.5',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-4 h-4',

            // Status colors
            status === 'online' && 'bg-success-border',
            status === 'offline' && 'bg-text-tertiary',
            status === 'away' && 'bg-warning-border',
            status === 'busy' && 'bg-danger-border'
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

Avatar.displayName = 'Avatar';
