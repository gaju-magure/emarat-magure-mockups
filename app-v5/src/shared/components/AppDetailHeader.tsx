/**
 * AppDetailHeader Component
 * Sticky header for app detail screens with back button, title, and status
 * Single Responsibility: Render consistent header across all detail screens
 */

import { ArrowLeft } from 'lucide-react';
import { AppDetailHeaderProps } from '@/shared/types/app-details';
import { StatusBadge } from './StatusBadge';

export function AppDetailHeader({ title, subtitle, status, onClose }: AppDetailHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background-elevated backdrop-blur-glass-md border-b border-glow shadow-float-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="btn-icon"
              aria-label="Back to gallery"
            >
              <ArrowLeft className="h-5 w-5 text-text-primary" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-text-primary">
                {title}
              </h1>
              <p className="text-sm text-text-secondary">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={status} />
          </div>
        </div>
      </div>
    </div>
  );
}
