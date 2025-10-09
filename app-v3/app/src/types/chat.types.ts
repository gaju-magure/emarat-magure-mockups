/**
 * Chat Message Types
 *
 * Type definitions for Jarvis chat interface
 */

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  /** Optional action buttons in AI response */
  actions?: ChatAction[];
  /** Typing indicator (only for assistant) */
  isTyping?: boolean;
}

export interface ChatAction {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface SuggestedQuestion {
  id: string;
  question: string;
  category: 'rfp' | 'analytics' | 'tasks' | 'forecast' | 'general';
}
