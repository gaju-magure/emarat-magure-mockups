/**
 * useJarvisState Hook
 *
 * Manages Jarvis interface states and transitions
 * - idle: Default state with greeting and priority items
 * - active: Chat conversation mode
 * - history: Viewing past conversations
 */

import { useState, useEffect } from 'react';
import type { ChatMessage } from '@/types/chat.types';

export type JarvisState = 'idle' | 'active' | 'history';

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: Date;
  preview: string;
}

export interface UseJarvisStateReturn {
  state: JarvisState;
  setState: (state: JarvisState) => void;
  currentConversation: Conversation | null;
  conversations: Conversation[];
  startNewConversation: () => void;
  saveConversation: (messages: ChatMessage[]) => void;
  loadConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  isTransitioning: boolean;
}

const STORAGE_KEY = 'jarvis_conversations';

/**
 * Load conversations from localStorage
 */
function loadConversationsFromStorage(): Conversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return parsed.map((conv: any) => ({
      ...conv,
      timestamp: new Date(conv.timestamp),
      messages: conv.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error('Failed to load conversations:', error);
    return [];
  }
}

/**
 * Save conversations to localStorage
 */
function saveConversationsToStorage(conversations: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Failed to save conversations:', error);
  }
}

/**
 * Generate conversation title from first message
 */
function generateConversationTitle(messages: ChatMessage[]): string {
  const firstUserMessage = messages.find(m => m.role === 'user');
  if (!firstUserMessage) return 'New Conversation';

  const content = firstUserMessage.content;
  return content.length > 50 ? content.substring(0, 50) + '...' : content;
}

/**
 * useJarvisState Hook
 */
export function useJarvisState(): UseJarvisStateReturn {
  const [state, setState] = useState<JarvisState>('idle');
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load conversations on mount
  useEffect(() => {
    const loaded = loadConversationsFromStorage();
    setConversations(loaded);
  }, []);

  // Save conversations whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      saveConversationsToStorage(conversations);
    }
  }, [conversations]);

  /**
   * Start a new conversation
   */
  const startNewConversation = () => {
    setIsTransitioning(true);

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      messages: [],
      timestamp: new Date(),
      preview: '',
    };

    setCurrentConversation(newConversation);
    setState('active');

    setTimeout(() => setIsTransitioning(false), 300);
  };

  /**
   * Save current conversation
   */
  const saveConversation = (messages: ChatMessage[]) => {
    if (!currentConversation) return;

    const updatedConversation: Conversation = {
      ...currentConversation,
      messages,
      title: generateConversationTitle(messages),
      preview: messages[messages.length - 1]?.content.substring(0, 100) || '',
      timestamp: new Date(),
    };

    setCurrentConversation(updatedConversation);

    // Update conversations list
    setConversations(prev => {
      const existing = prev.findIndex(c => c.id === updatedConversation.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = updatedConversation;
        return updated;
      } else {
        return [updatedConversation, ...prev];
      }
    });
  };

  /**
   * Load a past conversation
   */
  const loadConversation = (id: string) => {
    setIsTransitioning(true);

    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
      setState('active');
    }

    setTimeout(() => setIsTransitioning(false), 300);
  };

  /**
   * Delete a conversation
   */
  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));

    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setState('idle');
    }
  };

  return {
    state,
    setState,
    currentConversation,
    conversations,
    startNewConversation,
    saveConversation,
    loadConversation,
    deleteConversation,
    isTransitioning,
  };
}
