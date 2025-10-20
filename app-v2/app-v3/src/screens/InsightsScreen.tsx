/**
 * Insights Screen (AI Copilot)
 * AI chat interface with quick prompts and conversation history
 */

import { Send, Sparkles } from 'lucide-react';
import { useLanguage } from '@/core/hooks/useLanguage';

const QUICK_PROMPTS = [
  { icon: '📊', text: 'Show me today\'s KPIs' },
  { icon: '🔍', text: 'Analyze sales trends' },
  { icon: '💡', text: 'Suggest optimizations' },
  { icon: '📈', text: 'Generate report' },
];

const SAMPLE_MESSAGES = [
  {
    role: 'assistant',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    time: '10:30 AM',
  },
  {
    role: 'user',
    content: 'What are the top performing products this quarter?',
    time: '10:31 AM',
  },
  {
    role: 'assistant',
    content: 'Based on the latest data, here are your top 3 performing products:\n\n1. Premium Fuel (95 Octane) - 42% growth\n2. Diesel - 28% growth\n3. Car Wash Services - 31% growth\n\nWould you like me to provide more details on any of these?',
    time: '10:31 AM',
  },
];

export function InsightsScreen() {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col bg-background-primary">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            AI Insights Assistant
          </h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Ask me anything about your business metrics, trends, or get recommendations
          </p>
        </div>

        {/* Quick Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background-elevated hover:bg-background-secondary transition-all duration-200 text-left group"
            >
              <span className="text-2xl">{prompt.icon}</span>
              <span className="text-sm text-text-secondary group-hover:text-text-primary">
                {prompt.text}
              </span>
            </button>
          ))}
        </div>

        {/* Sample Conversation */}
        <div className="max-w-3xl mx-auto space-y-4 pt-8">
          {SAMPLE_MESSAGES.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-background-elevated border border-border'
                }`}
              >
                <p
                  className={`text-sm whitespace-pre-line ${
                    message.role === 'user' ? 'text-white' : 'text-text-primary'
                  }`}
                >
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-white/70' : 'text-text-tertiary'
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="border-t border-border bg-background-elevated p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full h-12 pl-4 pr-12 bg-background-secondary border border-border rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-accent hover:bg-accent-hover text-white flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-text-tertiary mt-2 text-center">
            AI-powered insights for your business
          </p>
        </div>
      </div>
    </div>
  );
}
