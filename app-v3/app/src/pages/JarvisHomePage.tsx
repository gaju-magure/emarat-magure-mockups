/**
 * Emarat AI Home Page - STATE-BASED AI ASSISTANT
 *
 * A true personal AI assistant with distinct states:
 * - IDLE: Welcoming, proactive, showing priority information
 * - ACTIVE: Full conversation mode, focused on chat
 * - HISTORY: Reviewing past conversations
 *
 * Design Philosophy:
 * - Logo FIRST (the "face" of the assistant)
 * - Greeting BELOW logo (feels like AI is speaking)
 * - Smart state transitions (cards slide away during chat)
 * - Premium chat design with personality
 */

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/utils/classnames';
import { useAuth } from '@/contexts/AuthContext';
import { useGreeting } from '@/hooks/useGreeting';
import { useAlerts } from '@/hooks/useAlerts';
import { useJarvisState } from '@/hooks/useJarvisState';
import { getRecentInsights } from '@/services/mock/insights.mock';
import { generateChatResponse } from '@/services/mock/chat.mock';
import type { ChatMessage } from '@/types/chat.types';
import type { Insight } from '@/types/insight.types';
import { Logo } from '@/components/atoms/Logo';
import { ConversationHistory } from '@/components/organisms/ConversationHistory';
import { useClient } from '@/contexts/ClientContext';
import { NotificationBell } from '@/components/layout/NotificationBell';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageToggle } from '@/components/layout/LanguageToggle';
import {
  BoltIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  TrophyIcon,
  ClockIcon,
  SparklesIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export interface JarvisHomePageProps {
  /** Additional className */
  className?: string;
}

/**
 * Jarvis Home Page Component - State-Based Edition
 */
export function JarvisHomePage({ className }: JarvisHomePageProps) {
  const { user } = useAuth();
  const { greeting } = useGreeting();
  const { alerts } = useAlerts(2);
  const { client } = useClient();
  const [insights] = useState<Insight[]>(() => getRecentInsights(3));

  // State management
  const jarvisState = useJarvisState();
  const {
    state,
    setState,
    currentConversation,
    conversations,
    startNewConversation,
    saveConversation,
    loadConversation,
    deleteConversation,
  } = jarvisState;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedChipId, setExpandedChipId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Emarat branding colors from theme (lighter for better visibility)
  const emaratColors = {
    primary: client?.theme?.primary || '#003A85',
    success: client?.theme?.success || '#00A651',
    glow: 'rgba(0, 166, 81, 0.3)', // Lighter glow
  };

  // Calculate user context
  const urgentAlertsCount = alerts.filter(a => a.type === 'urgent').length;

  // Load conversation messages when current conversation changes
  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages);
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  // Save conversation when messages change
  useEffect(() => {
    if (state === 'active' && messages.length > 0) {
      saveConversation(messages);
    }
  }, [messages, state]);

  // Auto-scroll to bottom when new messages arrive - using scrollTop instead of scrollIntoView
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Start conversation if not already active
    if (state !== 'active') {
      startNewConversation();
    }

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
    const delay = 800 + inputValue.length * 15;

    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, delay);
  };

  // Handle input focus - transition to active state
  const handleInputFocus = () => {
    if (state === 'idle' && messages.length === 0) {
      startNewConversation();
    }
  };

  // Render logo (adapts based on state)
  const renderLogo = () => {
    const isIdle = state === 'idle';

    return (
      <div
        className={cn(
          'relative transition-all duration-500',
          isIdle ? 'mb-6' : 'mr-4'
        )}
      >
        {/* Lighter pulsing rings - only in idle state */}
        {isIdle && (
          <>
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-10 bg-gradient-to-br from-primary to-success"
              style={{ animationDuration: '3s' }}
            />
            <div
              className="absolute -inset-6 rounded-full animate-pulse opacity-20 bg-gradient-to-br from-primary to-success"
              style={{ animationDuration: '2s' }}
            />
          </>
        )}

        {/* Main Logo Container */}
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-primary via-success to-primary',
            'transition-all duration-500',
            isIdle ? 'w-24 h-24 animate-float' : 'w-10 h-10', // Smaller logo
            !isIdle && isTyping && 'animate-pulse-glow'
          )}
          style={{
            boxShadow: isIdle
              ? `0 0 40px ${emaratColors.glow}, 0 0 80px ${emaratColors.glow}` // Lighter glow
              : `0 0 15px ${emaratColors.glow}`,
          }}
        >
          {/* Emarat Logo */}
          <div className={cn('transition-transform duration-500', isIdle ? 'scale-[1.2]' : 'scale-[0.5]')}>
            <Logo size={isIdle ? 'md' : 'sm'} showName={false} />
          </div>

          {/* Subtle orbit ring - only in idle state */}
          {isIdle && (
            <div className="absolute inset-0 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '12s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-success/80 rounded-full" />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render idle state
  const renderIdleState = () => (
    <div className="h-full flex flex-col items-center justify-center px-6 animate-fade-in-scale">
      {/* Logo (compact, centered) */}
      {renderLogo()}

      {/* Greeting from logo - COMPACT */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {greeting}, <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent animated-gradient">{user?.name?.split(' ')[0]}</span>
        </h1>
        <p className="text-base text-text-secondary">
          {urgentAlertsCount > 0
            ? `${urgentAlertsCount} urgent ${urgentAlertsCount === 1 ? 'item' : 'items'} need your attention`
            : 'Your Emarat AI assistant is ready'}
        </p>
      </div>

      {/* Priority Items - Enhanced Chips with Summaries */}
      <div className="w-full max-w-5xl flex flex-wrap gap-4 justify-center">
        {/* Alert Chips - WITH BRIEF SUMMARY & BADGES */}
        {alerts.map((alert, idx) => {
          const isExpanded = expandedChipId === `alert-${alert.id}`;
          return (
            <div
              key={alert.id}
              onClick={() => setExpandedChipId(isExpanded ? null : `alert-${alert.id}`)}
              className={cn(
                'glass cursor-pointer chip-transition animate-slide-up',
                'border border-danger/20 hover:border-danger/40 hover:bg-danger/5',
                isExpanded
                  ? 'chip-expanded w-full md:w-96 p-4 rounded-xl'
                  : 'chip-collapsed w-auto max-w-sm p-3 rounded-xl'
              )}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {!isExpanded ? (
                // Collapsed chip - WITH SUMMARY & BADGES
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-danger rounded-full animate-pulse" />
                    <ExclamationTriangleIcon className="w-4 h-4 text-danger flex-shrink-0" />
                    <span className="text-sm font-semibold text-text-primary flex-1">
                      {alert.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1 pl-7">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-2 pl-7">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px] font-medium">
                      <ClockIcon className="w-3 h-3" />
                      Tomorrow
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                      AED 2.4M
                    </span>
                  </div>
                </div>
              ) : (
                // Expanded card - WITH REAL DATA
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-danger/20 text-danger flex items-center justify-center flex-shrink-0">
                        <ExclamationTriangleIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text-primary mb-1">{alert.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{alert.description}</p>
                      </div>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-text-tertiary flex-shrink-0 mt-1" />
                  </div>

                  {/* Action Items */}
                  <div className="space-y-2 pl-11">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-tertiary">Deadline:</span>
                      <span className="font-semibold text-danger">Tomorrow 5:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-tertiary">Vendors:</span>
                      <span className="font-medium text-text-primary">3 awaiting review</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-tertiary">Budget Impact:</span>
                      <span className="font-medium text-text-primary">AED 2.4M</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-danger/20">
                    <span className="text-xs font-semibold text-danger uppercase tracking-wide">
                      {alert.metadata?.confidence || 95}% AI Confidence
                    </span>
                    <span className="text-xs text-text-tertiary uppercase tracking-wide">{alert.category}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Insight Chips - WITH BRIEF SUMMARY & BADGES */}
        {insights.map((insight, idx) => {
          const isExpanded = expandedChipId === `insight-${insight.id}`;
          const iconMap: Record<string, any> = { metric: ChartBarIcon, achievement: TrophyIcon, suggestion: LightBulbIcon, alert: ExclamationTriangleIcon };
          const colorMap: Record<string, any> = {
            metric: { text: 'text-success', bg: 'bg-success/20', border: 'border-success/20', hover: 'hover:border-success/40 hover:bg-success/5', badge: 'bg-success/10 text-success' },
            achievement: { text: 'text-primary', bg: 'bg-primary/20', border: 'border-primary/20', hover: 'hover:border-primary/40 hover:bg-primary/5', badge: 'bg-primary/10 text-primary' },
            suggestion: { text: 'text-info', bg: 'bg-info/20', border: 'border-info/20', hover: 'hover:border-info/40 hover:bg-info/5', badge: 'bg-info/10 text-info' },
            alert: { text: 'text-danger', bg: 'bg-danger/20', border: 'border-danger/20', hover: 'hover:border-danger/40 hover:bg-danger/5', badge: 'bg-danger/10 text-danger' }
          };
          const Icon = iconMap[insight.type] || SparklesIcon;
          const colors = colorMap[insight.type] || colorMap.metric;

          // Badge data based on type
          const badgeData: Record<string, any> = {
            metric: { icon: '↗', label: '+12%' },
            achievement: { icon: '🎯', label: '100 RFPs' },
            suggestion: { icon: '💡', label: 'AED 65K' },
            alert: { icon: '⚠️', label: 'Alert' }
          };
          const badge = badgeData[insight.type] || badgeData.metric;

          return (
            <div
              key={insight.id}
              onClick={() => setExpandedChipId(isExpanded ? null : `insight-${insight.id}`)}
              className={cn(
                'glass cursor-pointer chip-transition animate-slide-up',
                'border',
                colors.border,
                colors.hover,
                isExpanded
                  ? 'chip-expanded w-full md:w-96 p-4 rounded-xl'
                  : 'chip-collapsed w-auto max-w-sm p-3 rounded-xl'
              )}
              style={{ animationDelay: `${(alerts.length + idx) * 0.05}s` }}
            >
              {!isExpanded ? (
                // Collapsed chip - WITH SUMMARY & BADGES
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {!insight.seen && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
                    <Icon className={cn('w-4 h-4 flex-shrink-0', colors.text)} />
                    <span className="text-sm font-semibold text-text-primary flex-1">
                      {insight.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1 pl-7">
                    {insight.content}
                  </p>
                  <div className="flex items-center gap-2 pl-7">
                    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium', colors.badge)}>
                      <span>{badge.icon}</span>
                      {badge.label}
                    </span>
                  </div>
                </div>
              ) : (
                // Expanded card - WITH REAL DATA
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', colors.bg, colors.text)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text-primary mb-1">{insight.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{insight.content}</p>
                      </div>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-text-tertiary flex-shrink-0 mt-1" />
                  </div>

                  {/* Insight Details */}
                  {insight.type === 'metric' && (
                    <div className="space-y-2 pl-11">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Current:</span>
                        <span className="font-semibold text-success">87% efficiency</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Trend:</span>
                        <span className="font-medium text-text-primary">↗ +12% vs last quarter</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Benchmark:</span>
                        <span className="font-medium text-text-primary">Industry avg: 74%</span>
                      </div>
                    </div>
                  )}

                  {insight.type === 'achievement' && (
                    <div className="space-y-2 pl-11">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Milestone:</span>
                        <span className="font-semibold text-primary">100 RFPs evaluated</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Time Saved:</span>
                        <span className="font-medium text-text-primary">~240 hours of manual work</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Accuracy:</span>
                        <span className="font-medium text-text-primary">96.4% match with final decisions</span>
                      </div>
                    </div>
                  )}

                  {insight.type === 'suggestion' && (
                    <div className="space-y-2 pl-11">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Opportunity:</span>
                        <span className="font-semibold text-info">Vendor consolidation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Potential Savings:</span>
                        <span className="font-medium text-text-primary">AED 65K annually</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-tertiary">Complexity:</span>
                        <span className="font-medium text-text-primary">Medium (2-3 weeks)</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className={cn('text-xs font-semibold uppercase tracking-wide', colors.text)}>
                      {insight.type}
                    </span>
                    {!insight.seen && (
                      <span className="text-xs text-primary uppercase tracking-wide">● New</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render active chat state
  const renderActiveState = () => (
    <div className="h-full flex flex-col animate-fade-in-scale">
      {/* Messages area - Centered like ChatGPT */}
      <div className="flex-1 md:px-6 px-3 md:py-4 py-2">
        <div className="max-w-3xl mx-auto md:space-y-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex md:gap-3 gap-2 animate-slide-up"
            >
              {/* Avatar - always on left */}
              <div className="md:w-7 md:h-7 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center flex-shrink-0 md:mt-1 mt-0.5">
                {message.role === 'assistant' ? (
                  <SparklesIcon className="md:w-3.5 md:h-3.5 w-3 h-3 text-white" />
                ) : (
                  <span className="text-white font-semibold md:text-xs text-[10px]">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Message content - full width */}
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    'md:px-4 md:py-2.5 px-3 py-2 md:rounded-2xl rounded-xl backdrop-blur-xl border',
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-primary/20 to-success/10 border-primary/30 text-text-primary'
                      : 'glass border-white/10 text-text-primary'
                  )}
                >
                  <div className="markdown md:text-sm text-xs md:leading-relaxed leading-snug">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex md:gap-3 gap-2 animate-slide-up">
              <div className="md:w-7 md:h-7 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="md:w-3.5 md:h-3.5 w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="glass border border-white/10 md:px-4 md:py-2.5 px-3 py-2 md:rounded-2xl rounded-xl inline-block">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-wave" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-wave" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-wave" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn('fixed inset-0 flex flex-col', className)}>
      {/* Integrated Header - Logo Left, Controls Right */}
      <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between bg-background-primary/80 backdrop-blur-sm z-30">
        <img
          src="/emarat-logo.svg"
          alt="Emarat AI"
          className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
        />

        <div className="flex items-center gap-3 bg-background-primary/80 backdrop-blur-sm rounded-3xl shadow-2xl p-2.5">
          {/* New Chat and History buttons - only show in active state */}
          {state === 'active' && (
            <>
              <button
                onClick={() => {
                  setMessages([]);
                  setState('idle');
                }}
                className="p-2 rounded-xl hover:bg-primary/10 transition-all relative group"
                title="New chat"
              >
                <SparklesIcon className="w-5 h-5 text-text-secondary" />
              </button>
              <button
                onClick={() => setState('history')}
                className="p-2 rounded-xl hover:bg-primary/10 transition-all relative group"
                title="View history"
              >
                <ClockIcon className="w-5 h-5 text-text-secondary" />
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-primary/30 mx-1" />
            </>
          )}

          <button className="p-2 rounded-xl hover:bg-primary/10 transition-all relative group">
            <div className="w-5 h-5 flex items-center justify-center">
              <NotificationBell />
            </div>
          </button>
          <button className="p-2 rounded-xl hover:bg-primary/10 transition-all relative group">
            <div className="w-5 h-5 flex items-center justify-center">
              <ThemeToggle variant="icon" />
            </div>
          </button>
          <button className="p-2 rounded-xl hover:bg-primary/10 transition-all relative group">
            <div className="w-5 h-5 flex items-center justify-center">
              <LanguageToggle variant="icon" />
            </div>
          </button>
        </div>
      </div>

      {/* Main content - SCROLLABLE */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {state === 'idle' && renderIdleState()}
        {state === 'active' && renderActiveState()}
      </div>

      {/* Input bar - FIXED AT BOTTOM */}
      <div className="flex-shrink-0 px-6 py-6 bg-background-primary/80 backdrop-blur-sm z-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            {/* Input container - SMALLER & BORDERLESS */}
            <div className={cn(
              'flex items-center gap-3 px-4 py-2.5',
              'glass backdrop-blur-xl',
              'rounded-full',
              'transition-all duration-300',
              'shadow-lg'
            )}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask Emarat AI anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleInputFocus}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isTyping}
                className={cn(
                  'flex-1 bg-transparent border-none outline-none',
                  'text-sm text-text-primary placeholder:text-text-tertiary',
                  'disabled:opacity-50',
                  'focus:ring-0 focus:outline-none'
                )}
              />

              {/* Send button - SMALLER */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full',
                  'bg-gradient-to-br transition-all',
                  'flex items-center justify-center',
                  inputValue.trim() && !isTyping
                    ? 'from-primary to-success hover:scale-110 shadow-md shadow-success/30'
                    : 'from-white/5 to-white/10 opacity-50 cursor-not-allowed'
                )}
                aria-label="Send message"
              >
                <BoltIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Subtle scanline effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-success/30 to-transparent animate-scan" />
            </div>
          </div>

          {/* Helper text - COMPACT */}
          <p className="text-center text-[10px] text-text-tertiary mt-2">
            Press <kbd className="px-1.5 py-0.5 glass rounded border border-white/10 font-mono text-[9px]">Enter</kbd> to send
            {conversations.length > 0 && (
              <>
                {' • '}
                <button
                  onClick={() => setState('history')}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {conversations.length} saved
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Conversation History Panel */}
      <ConversationHistory
        isOpen={state === 'history'}
        onClose={() => setState(messages.length > 0 ? 'active' : 'idle')}
        conversations={conversations}
        onLoad={loadConversation}
        onDelete={deleteConversation}
      />
    </div>
  );
}

JarvisHomePage.displayName = 'JarvisHomePage';
