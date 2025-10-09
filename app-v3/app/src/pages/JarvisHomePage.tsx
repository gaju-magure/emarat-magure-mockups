/**
 * Jarvis Home Page - ULTRA PREMIUM AI INTERFACE
 *
 * A million-dollar conversational AI experience
 * Stunning visuals, smooth animations, glassmorphism, and rich interactions
 *
 * Vision: The most beautiful, captivating AI interface ever built
 * Like Jarvis from Iron Man - premium, futuristic, and absolutely stunning
 */

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import { useAuth } from '@/contexts/AuthContext';
import { useGreeting } from '@/hooks/useGreeting';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Avatar } from '@/components/atoms/Avatar';
import { generateChatResponse, SUGGESTED_QUESTIONS, type SuggestedQuestion } from '@/services/mock/chat.mock';
import type { ChatMessage } from '@/types/chat.types';
import {
  PaperAirplaneIcon,
  SparklesIcon,
  MicrophoneIcon,
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export interface JarvisHomePageProps {
  /** Additional className */
  className?: string;
}

/**
 * Jarvis Home Page Component - Ultra Premium Edition
 */
export function JarvisHomePage({ className }: JarvisHomePageProps) {
  const { user } = useAuth();
  const { greeting, subtitle, period } = useGreeting();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting message
  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: 'initial',
      role: 'assistant',
      content: `${greeting}, ${user?.name || 'there'}! I'm **Jarvis**, your AI procurement assistant. ${subtitle}

How can I help you achieve excellence today?`,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [greeting, subtitle, user?.name]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Simulate typing delay
  const simulateTypingDelay = (text: string) => {
    const baseDelay = 1000;
    const charDelay = text.length * 10;
    return Math.min(baseDelay + charDelay, 3500);
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const response = generateChatResponse(inputValue);
    const delay = simulateTypingDelay(response.content);

    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, delay);
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: SuggestedQuestion) => {
    setInputValue(question.question);
    inputRef.current?.focus();
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Premium gradients based on time period
  const periodGradients = {
    morning: {
      bg: 'from-orange-500/20 via-yellow-500/10 to-transparent',
      avatar: 'from-orange-500 via-yellow-500 to-orange-600',
      glow: 'rgba(251, 146, 60, 0.4)',
    },
    afternoon: {
      bg: 'from-blue-500/20 via-sky-500/10 to-transparent',
      avatar: 'from-blue-500 via-sky-500 to-blue-600',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
    evening: {
      bg: 'from-purple-500/20 via-pink-500/10 to-transparent',
      avatar: 'from-purple-500 via-pink-500 to-purple-600',
      glow: 'rgba(168, 85, 247, 0.4)',
    },
    night: {
      bg: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      avatar: 'from-indigo-500 via-purple-500 to-indigo-600',
      glow: 'rgba(99, 102, 241, 0.4)',
    },
  };

  const currentGradient = periodGradients[period];

  return (
    <div className={cn('h-screen flex flex-col bg-background-primary relative overflow-hidden', className)}>
      {/* Animated Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br animated-gradient opacity-30',
          currentGradient.bg
        )}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" style={{ animationDelay: '0s' }} />
        <div className="particle absolute top-40 right-32 w-48 h-48 bg-success/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="particle absolute bottom-32 left-40 w-40 h-40 bg-primary/10 rounded-full blur-3xl" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Hero Header */}
        <div className="flex-shrink-0 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {/* Jarvis Avatar Logo */}
            <div className="inline-flex justify-center animate-float">
              <div
                className={cn(
                  'w-24 h-24 rounded-3xl flex items-center justify-center relative',
                  'bg-gradient-to-br shadow-2xl',
                  currentGradient.avatar,
                  'animate-pulse-glow'
                )}
                style={{
                  boxShadow: `0 0 60px ${currentGradient.glow}, 0 0 120px ${currentGradient.glow}`,
                }}
              >
                <SparklesIcon className="w-12 h-12 text-white animate-rotate-pulse" />

                {/* Glow ring */}
                <div className={cn(
                  'absolute inset-0 rounded-3xl bg-gradient-to-br opacity-50 blur-xl',
                  currentGradient.avatar
                )} />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
                Welcome to <span className="bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent animated-gradient">Jarvis</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Your AI-powered procurement intelligence assistant
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((message, index) => {
              const isUser = message.role === 'user';
              const isFirst = index === 0;

              return (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-4 animate-slide-up',
                    isUser ? 'justify-end' : 'justify-start'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Avatar (assistant only) */}
                  {!isUser && (
                    <div className="flex-shrink-0 animate-fade-in-scale">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center',
                          'bg-gradient-to-br shadow-lg relative',
                          currentGradient.avatar
                        )}
                        style={{
                          boxShadow: `0 0 30px ${currentGradient.glow}`,
                        }}
                      >
                        <SparklesIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={cn(
                      'flex-1 max-w-3xl group',
                      isUser && 'flex justify-end'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-3xl px-8 py-6 shadow-xl relative overflow-hidden',
                        'transition-spring hover-lift',
                        isUser
                          ? 'bg-gradient-to-br from-primary to-primary-600 text-white'
                          : 'glass border-2 border-white/10',
                        isFirst && !isUser && 'text-lg'
                      )}
                    >
                      {/* Glass effect overlay for assistant messages */}
                      {!isUser && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      )}

                      {/* Message Content */}
                      <div
                        className={cn(
                          'relative z-10 leading-relaxed',
                          isUser ? 'text-white' : 'text-text-primary'
                        )}
                      >
                        {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={i} className="font-bold text-primary">
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </div>

                      {/* Action Buttons */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-6 relative z-10">
                          {message.actions.map((action, idx) => (
                            <a
                              key={action.id}
                              href={action.href}
                              className={cn(
                                'px-5 py-2.5 rounded-xl font-medium transition-spring hover-lift text-sm',
                                action.variant === 'primary'
                                  ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg glow-primary'
                                  : action.variant === 'secondary'
                                  ? 'glass border border-white/20 text-text-primary'
                                  : 'text-text-secondary hover:text-text-primary'
                              )}
                            >
                              {action.label}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Timestamp with icon */}
                      <div
                        className={cn(
                          'text-xs mt-4 flex items-center gap-2 relative z-10',
                          isUser ? 'text-white/70' : 'text-text-tertiary'
                        )}
                      >
                        <ClockIcon className="w-3.5 h-3.5" />
                        {new Date(message.timestamp).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Avatar (user only) */}
                  {isUser && (
                    <div className="flex-shrink-0 animate-fade-in-scale">
                      <div className="ring-2 ring-primary/30 rounded-2xl">
                        <Avatar name={user?.name} size="lg" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator - Premium Version */}
            {isTyping && (
              <div className="flex gap-4 animate-slide-up">
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center',
                      'bg-gradient-to-br shadow-lg',
                      currentGradient.avatar,
                      'animate-pulse-glow'
                    )}
                    style={{
                      boxShadow: `0 0 30px ${currentGradient.glow}`,
                    }}
                  >
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="glass border-2 border-white/10 rounded-3xl px-8 py-6 shadow-xl">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-success animate-wave" />
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-success animate-wave" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-success animate-wave" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions - Premium Cards */}
            {messages.length <= 1 && !isTyping && (
              <div className="pt-12 pb-8 space-y-6 animate-fade-in-scale" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-sm font-semibold text-text-secondary text-center flex items-center justify-center gap-2">
                  <BoltIcon className="w-4 h-4" />
                  Quick start with these suggestions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUGGESTED_QUESTIONS.map((sq, idx) => {
                    const icons = [
                      ChartBarIcon,
                      SparklesIcon,
                      BoltIcon,
                      ChartBarIcon,
                      SparklesIcon,
                    ];
                    const Icon = icons[idx] || SparklesIcon;

                    return (
                      <button
                        key={sq.id}
                        onClick={() => handleSuggestedQuestion(sq)}
                        className={cn(
                          'glass p-6 rounded-2xl border-2 border-white/10',
                          'hover-lift transition-spring group',
                          'text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
                            'bg-gradient-to-br from-primary to-success',
                            'group-hover:scale-110 transition-spring'
                          )}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                              {sq.question}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Premium Input Area */}
        <div className="flex-shrink-0 border-t border-border-primary/50 glass relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex gap-4 items-end">
              {/* Text Input */}
              <div className="flex-1">
                <div className="glass rounded-2xl border-2 border-white/10 overflow-hidden transition-spring focus-within:border-primary/50 focus-within:shadow-lg">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask Jarvis anything... (Press Enter to send)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isTyping}
                    className="bg-transparent border-none focus:ring-0 text-lg py-4"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Voice Input Button */}
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<MicrophoneIcon className="w-6 h-6" />}
                  className="glass border-2 border-white/10 hover-lift"
                  aria-label="Voice input"
                  disabled
                  title="Voice input - Coming soon"
                />

                {/* Send Button */}
                <Button
                  variant="primary"
                  size="lg"
                  icon={<PaperAirplaneIcon className="w-5 h-5" />}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={cn(
                    'bg-gradient-to-r from-primary to-primary-600 hover-lift shadow-lg',
                    !inputValue.trim() && !isTyping && 'glow-primary'
                  )}
                  aria-label="Send message"
                >
                  Send
                </Button>
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-text-tertiary text-center mt-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-2">
                <kbd className="px-3 py-1 glass rounded-lg border border-white/10 font-mono text-xs">Enter</kbd>
                to send
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-3 py-1 glass rounded-lg border border-white/10 font-mono text-xs">Shift + Enter</kbd>
                for new line
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

JarvisHomePage.displayName = 'JarvisHomePage';
