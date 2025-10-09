/**
 * Mock Chat Service
 *
 * Simulates Jarvis AI chat responses with pattern matching
 */

import type { ChatMessage, SuggestedQuestion } from '@/types/chat.types';

/**
 * Suggested questions for quick start
 */
export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'sq-001',
    question: 'Show me pending RFP evaluations',
    category: 'rfp',
  },
  {
    id: 'sq-002',
    question: 'What are my top priorities today?',
    category: 'tasks',
  },
  {
    id: 'sq-003',
    question: 'Analyze spending trends this quarter',
    category: 'analytics',
  },
  {
    id: 'sq-004',
    question: 'Help me forecast next month\'s budget',
    category: 'forecast',
  },
  {
    id: 'sq-005',
    question: 'What can you help me with?',
    category: 'general',
  },
];

/**
 * Pattern-based response templates
 */
interface ResponseTemplate {
  patterns: string[];
  response: string;
  actions?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
}

const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  // RFP-related
  {
    patterns: ['rfp', 'proposal', 'vendor', 'evaluation', 'bid'],
    response: 'I found **3 pending RFP evaluations** that need your attention:\n\n1. **IT Infrastructure Upgrade** - 5 proposals, deadline in 2 hours ⏰\n2. **Office Supplies Contract** - 3 proposals, review in progress\n3. **Facility Management Services** - 8 proposals, scoring phase\n\nThe IT Infrastructure RFP is **urgent** - would you like me to open it for review?',
    actions: [
      { label: 'Review IT RFP', href: '/apps/rfp/it-infrastructure', variant: 'primary' },
      { label: 'View All RFPs', href: '/apps/rfp', variant: 'secondary' },
    ],
  },

  // Tasks and priorities
  {
    patterns: ['task', 'priority', 'priorities', 'todo', 'pending', 'today'],
    response: 'Here are your **top priorities** for today:\n\n**🔴 Urgent (3)**\n- Review IT Infrastructure RFP (due in 2 hours)\n- Approve budget revision for Q4\n- Sign contract renewal with TechCorp\n\n**🟡 Important (5)**\n- Team performance review meeting at 2 PM\n- Review vendor compliance reports\n- Update forecast for IT equipment\n\nYou\'re making great progress! 12 tasks completed this week.',
    actions: [
      { label: 'Open Task Dashboard', href: '/tasks', variant: 'primary' },
    ],
  },

  // Analytics and spending
  {
    patterns: ['analytics', 'spending', 'cost', 'savings', 'trend', 'analyze'],
    response: 'Here\'s your **Q4 spending analysis**:\n\n📊 **Key Metrics:**\n- Total Spend: **AED 8.2M** (↓ 12% vs Q3)\n- Cost Savings: **AED 2.4M** YTD (115% of target!)\n- Active Vendors: **147** (↓ 8 from consolidation)\n\n🔥 **Top Insights:**\n- IT category spending down 18%\n- Office supplies savings from vendor consolidation\n- Forecast accuracy improved to 94%\n\nWould you like a detailed breakdown by category?',
    actions: [
      { label: 'View Analytics', href: '/apps/analytics', variant: 'primary' },
      { label: 'Download Report', href: '/apps/analytics/export', variant: 'secondary' },
    ],
  },

  // Forecast and budget
  {
    patterns: ['forecast', 'budget', 'predict', 'projection', 'estimate'],
    response: 'I\'ve prepared a **budget forecast** for next month based on historical trends:\n\n💰 **Projected Spending:**\n- IT Equipment: **AED 450K** (↑ 12% seasonal increase)\n- Office Supplies: **AED 85K** (stable)\n- Professional Services: **AED 320K** (↓ 5%)\n- **Total: AED 855K**\n\n📈 **Confidence:** 94% (based on 18 months data)\n\n⚠️ **Recommendation:** Increase IT budget allocation - Q4 typically sees higher hardware demands.',
    actions: [
      { label: 'View Forecast Details', href: '/apps/forecast', variant: 'primary' },
      { label: 'Adjust Budget', href: '/apps/budget/adjust', variant: 'secondary' },
    ],
  },

  // Alerts and notifications
  {
    patterns: ['alert', 'notification', 'urgent', 'deadline', 'expiring'],
    response: 'You have **6 active alerts** requiring attention:\n\n🔴 **Urgent (2)**\n- RFP deadline in 2 hours (IT Infrastructure)\n- Budget approval needed by EOD\n\n🟡 **Warnings (3)**\n- 3 contracts expiring within 60 days\n- Vendor performance issue (TechCorp delivery delays)\n- Compliance review due next week\n\n🔵 **Info (1)**\n- New AI analytics features available\n\nShall I help you address the urgent items first?',
    actions: [
      { label: 'View All Alerts', href: '/alerts', variant: 'primary' },
    ],
  },

  // Help and capabilities
  {
    patterns: ['help', 'what can you', 'capabilities', 'how to', 'assist'],
    response: 'I\'m **Jarvis**, your AI procurement assistant! Here\'s what I can help you with:\n\n🎯 **RFP Management**\n- Evaluate vendor proposals\n- Score and compare bids\n- Generate evaluation reports\n\n📊 **Analytics & Insights**\n- Spending analysis and trends\n- Cost savings tracking\n- Vendor performance metrics\n\n📋 **Task Management**\n- Prioritize daily tasks\n- Track deadlines and approvals\n- Team collaboration\n\n💰 **Forecasting**\n- Budget predictions\n- Spending projections\n- Anomaly detection\n\nJust ask me anything in natural language - I\'m here to help!',
  },

  // Greeting
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: 'Hello! 👋 I\'m **Jarvis**, your AI procurement assistant.\n\nI noticed you have:\n- **3 pending RFP evaluations** (1 urgent)\n- **5 high-priority tasks** today\n- **AED 2.4M in cost savings** YTD 🎉\n\nHow can I help you today?',
    actions: [
      { label: 'Show Priorities', href: '/tasks', variant: 'primary' },
    ],
  },

  // Thanks
  {
    patterns: ['thank', 'thanks', 'appreciate'],
    response: 'You\'re welcome! Happy to help. 😊\n\nIs there anything else you\'d like me to assist with?',
  },
];

/**
 * Default fallback response
 */
const DEFAULT_RESPONSE: ChatMessage = {
  id: 'msg-default',
  role: 'assistant',
  content: 'I understand you\'re asking about that, but I need a bit more context. Could you rephrase your question?\n\nHere are some things I can help with:\n- RFP evaluations and vendor management\n- Analytics and spending insights\n- Task prioritization and deadlines\n- Budget forecasting and predictions',
  timestamp: new Date(),
  actions: [
    { label: 'View Suggested Questions', href: '#', variant: 'ghost' },
  ],
};

/**
 * Generate AI response based on user message
 */
export function generateChatResponse(userMessage: string): ChatMessage {
  const lowerMessage = userMessage.toLowerCase();

  // Find matching template
  for (const template of RESPONSE_TEMPLATES) {
    if (template.patterns.some((pattern) => lowerMessage.includes(pattern))) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: template.response,
        timestamp: new Date(),
        actions: template.actions?.map((action, idx) => ({
          id: `action-${Date.now()}-${idx}`,
          ...action,
        })),
      };
    }
  }

  // No match found - return default
  return {
    ...DEFAULT_RESPONSE,
    id: `msg-${Date.now()}`,
    timestamp: new Date(),
  };
}

/**
 * Simulate typing delay (for realistic AI response)
 */
export function simulateTypingDelay(message: string): number {
  // Base delay + proportional to message length (simulate "thinking")
  const baseDelay = 800;
  const charDelay = message.length * 10;
  return Math.min(baseDelay + charDelay, 3000); // Max 3 seconds
}

/**
 * Get initial greeting message
 */
export function getInitialGreeting(): ChatMessage {
  return {
    id: 'msg-initial',
    role: 'assistant',
    content: '👋 Hi! I\'m **Jarvis**, your AI procurement assistant.\n\nI can help you with RFP evaluations, analytics, tasks, forecasting, and more. What would you like to know?',
    timestamp: new Date(),
  };
}
