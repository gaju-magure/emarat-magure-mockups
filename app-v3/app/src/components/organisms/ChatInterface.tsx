/**
 * ChatInterface Component
 *
 * Floating chat button + slide-in chat panel for Jarvis AI assistant
 * Includes message history, typing indicator, suggested questions, and action buttons
 */

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import { Button } from '@/components/atoms/Button';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  generateChatResponse,
  simulateTypingDelay,
  getInitialGreeting,
  SUGGESTED_QUESTIONS,
} from '@/services/mock/chat.mock';
import type { ChatMessage } from '@/types/chat.types';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export interface ChatInterfaceProps {
  /** Additional className for floating button */
  className?: string;
}

/**
 * ChatInterface Component
 *
 * @example
 * ```tsx
 * <ChatInterface />
 * ```
 */
export function ChatInterface({ className }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([getInitialGreeting()]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    const response = generateChatResponse(inputValue);
    const delay = simulateTypingDelay(response.content);

    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, delay);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-14 h-14 rounded-full',
          'bg-gradient-to-br from-primary to-primary-dark',
          'text-white shadow-lg',
          'flex items-center justify-center',
          'transition-all duration-300',
          'hover:scale-110 hover:shadow-xl',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'group',
          className
        )}
        aria-label={isOpen ? 'Close Jarvis Chat' : 'Open Jarvis Chat'}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <ChatBubbleLeftRightIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-success-text rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-24 right-6 z-40',
            'w-[90vw] max-w-md h-[600px]',
            'bg-background-primary border border-border-primary rounded-xl shadow-2xl',
            'flex flex-col',
            'animate-in slide-in-from-bottom-4 fade-in duration-300'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-primary bg-background-secondary rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar
                  src="/jarvis-avatar.png"
                  name="Jarvis AI"
                  size="md"
                  className="ring-2 ring-primary/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success-text border-2 border-background-secondary rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                  Jarvis AI
                  <SparklesIcon className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-xs text-text-secondary">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Close chat"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* Suggested Questions (show only if just started) */}
            {messages.length === 1 && !isTyping && (
              <div className="space-y-2">
                <p className="text-xs text-text-tertiary px-1">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((sq) => (
                    <button
                      key={sq.id}
                      onClick={() => handleSuggestedQuestion(sq.question)}
                      className={cn(
                        'text-xs px-3 py-1.5 rounded-full',
                        'bg-background-secondary hover:bg-background-tertiary',
                        'text-text-secondary hover:text-text-primary',
                        'border border-border-primary',
                        'transition-all duration-200',
                        'hover:scale-105'
                      )}
                    >
                      {sq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border-primary bg-background-secondary rounded-b-xl">
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Jarvis anything..."
                className={cn(
                  'flex-1 px-4 py-2.5 rounded-lg',
                  'bg-background-primary border border-border-primary',
                  'text-text-primary placeholder:text-text-tertiary',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                  'transition-all duration-200',
                  'text-sm'
                )}
                disabled={isTyping}
              />
              <Button
                variant="primary"
                size="md"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-text-tertiary mt-2 px-1">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
}

ChatInterface.displayName = 'ChatInterface';

/**
 * Message Bubble Component
 */
interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      {!isUser && (
        <Avatar
          src="/jarvis-avatar.png"
          name="Jarvis"
          size="sm"
          className="flex-shrink-0"
        />
      )}

      {/* Message Content */}
      <div className={cn('flex-1 space-y-2', isUser && 'flex flex-col items-end')}>
        {/* Bubble */}
        <div
          className={cn(
            'inline-block max-w-[85%] px-4 py-2.5 rounded-2xl',
            isUser
              ? 'bg-primary text-white rounded-tr-sm'
              : 'bg-background-secondary text-text-primary border border-border-primary rounded-tl-sm'
          )}
        >
          {/* Render markdown-style bold (**text**) */}
          <div
            className="text-sm whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br />'),
            }}
          />
        </div>

        {/* Action Buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <a key={action.id} href={action.href}>
                <Button
                  variant={action.variant || 'ghost'}
                  size="sm"
                  className="text-xs"
                >
                  {action.label}
                </Button>
              </a>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-text-tertiary px-1">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

/**
 * Typing Indicator Component
 */
function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar src="/jarvis-avatar.png" name="Jarvis" size="sm" className="flex-shrink-0" />
      <div className="bg-background-secondary border border-border-primary rounded-2xl rounded-tl-sm px-5 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
