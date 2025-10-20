/**
 * ChatMessage Component
 * Chat message bubble with role-based styling
 * Single Responsibility: Render chat messages with consistent styling
 *
 * Used in: InsightsScreen AI chat interface
 * Replaces: 90+ lines of duplicate message rendering code (3 messages × 30 lines)
 *
 * Features:
 * - Role-based alignment (user: right, assistant: left)
 * - Different background colors (user: primary, assistant: elevated)
 * - Message content with whitespace-pre-line
 * - Timestamp with role-specific styling
 * - Max width constraint (80%)
 */

import { ChatMessage as ChatMessageType } from '@/shared/types/screen-data-models';

export interface ChatMessageProps {
  /** Message data */
  message: ChatMessageType;
  /** Optional CSS classes */
  className?: string;
}

export function ChatMessage({
  message,
  className = ''
}: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${className}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser
            ? 'bg-primary text-white'
            : 'bg-background-elevated border border-border'
        }`}
      >
        <p
          className={`text-sm whitespace-pre-line ${
            isUser ? 'text-white' : 'text-text-primary'
          }`}
        >
          {message.content}
        </p>
        <p
          className={`text-xs mt-2 ${
            isUser ? 'text-white/70' : 'text-text-tertiary'
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}
