/**
 * ConversationHistory Component
 *
 * Slide-in panel showing past Jarvis conversations
 * - List of all conversations
 * - Search and filter
 * - Load or delete conversations
 */

import { useState } from 'react';
import { cn } from '@/utils/classnames';
import type { Conversation } from '@/hooks/useJarvisState';
import { useClient } from '@/contexts/ClientContext';
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { formatRelativeTime } from '@/utils/date';

export interface ConversationHistoryProps {
  /** Whether panel is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** List of conversations */
  conversations: Conversation[];
  /** Load conversation handler */
  onLoad: (id: string) => void;
  /** Delete conversation handler */
  onDelete: (id: string) => void;
  /** Additional className */
  className?: string;
}

/**
 * ConversationHistory Component
 */
export function ConversationHistory({
  isOpen,
  onClose,
  conversations,
  onLoad,
  onDelete,
  className,
}: ConversationHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { client } = useClient();

  // Emarat theme colors from client config
  const emaratColors = {
    primary: client?.theme?.primary || '#003A85',
    success: client?.theme?.success || '#00A651',
  };

  // Filter conversations by search query
  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in-scale"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Side Panel - THEME AWARE */}
      <div
        className={cn(
          'fixed top-0 right-0 h-screen w-full max-w-md z-50',
          'bg-background-elevated backdrop-blur-xl',
          'border-l-2',
          'shadow-2xl',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        style={{
          borderLeftColor: emaratColors.primary,
        }}
      >
        {/* Header - EMARAT THEME */}
        <div
          className="px-6 py-5 border-b border-border-default"
          style={{
            background: `linear-gradient(to right, ${emaratColors.primary}15, ${emaratColors.success}15)`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(to bottom right, ${emaratColors.primary}, ${emaratColors.success})`
                }}
              >
                <ClockIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">
                Conversation History
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-12 pr-4 py-3',
                'bg-background-secondary rounded-xl',
                'border border-border-default',
                'text-text-primary placeholder:text-text-tertiary',
                'focus:outline-none focus:border-primary',
                'transition-colors'
              )}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ChatBubbleLeftIcon className="w-12 h-12 text-text-tertiary mb-4 opacity-50" />
              <p className="text-text-secondary mb-2">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </p>
              <p className="text-sm text-text-tertiary">
                {searchQuery ? 'Try a different search term' : 'Start chatting with Jarvis to create your first conversation'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConversations.map((conversation, idx) => (
                <div
                  key={conversation.id}
                  className={cn(
                    'group relative overflow-hidden',
                    'bg-background-secondary rounded-xl p-4',
                    'border border-border-default',
                    'transition-all duration-300 hover-lift',
                    'cursor-pointer animate-slide-up'
                  )}
                  style={{
                    animationDelay: `${idx * 0.05}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(to right, ${emaratColors.primary}20, ${emaratColors.success}20)`;
                    e.currentTarget.style.borderColor = `${emaratColors.primary}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                  onClick={() => {
                    onLoad(conversation.id);
                    onClose();
                  }}
                >
                  {/* Content */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-text-primary text-sm line-clamp-1 flex-1">
                      {conversation.title}
                    </h3>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this conversation?')) {
                          onDelete(conversation.id);
                        }
                      }}
                      className="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-danger/20 transition-all"
                      aria-label="Delete conversation"
                    >
                      <TrashIcon className="w-4 h-4 text-danger" />
                    </button>
                  </div>

                  {/* Preview */}
                  <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                    {conversation.preview || 'No messages yet'}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary">
                      {formatRelativeTime(conversation.timestamp)}
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {conversation.messages.length} {conversation.messages.length === 1 ? 'message' : 'messages'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ConversationHistory.displayName = 'ConversationHistory';
