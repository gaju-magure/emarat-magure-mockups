import { useState } from 'react';
import {
  PaperAirplaneIcon,
  SparklesIcon,
  ChartBarIcon,
  CubeIcon,
  ClockIcon,
  LightBulbIcon,
  PlusIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export function AskMagVision() {
  const initialMessage: Message = {
    id: '1',
    type: 'assistant',
    content: "Hi Sarah! I'm your MagVisionIQ AI assistant. I can help you analyze your store data, get insights, and answer questions about sales, inventory, staffing, and more. What would you like to know?",
    timestamp: new Date(),
  };

  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'New Chat',
      messages: [initialMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState('1');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  // Suggested questions
  const suggestedQuestions = [
    {
      icon: ChartBarIcon,
      question: "What were my top-selling items yesterday?",
      category: "Sales"
    },
    {
      icon: CubeIcon,
      question: "Which items are running low on stock?",
      category: "Inventory"
    },
    {
      icon: ClockIcon,
      question: "What are the peak hours for customer footfall?",
      category: "Footfall"
    },
    {
      icon: LightBulbIcon,
      question: "Give me recommendations to increase sales this week",
      category: "Insights"
    },
  ];

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [initialMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length === 1) return; // Don't delete the last session

    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    setSessions(updatedSessions);

    if (activeSessionId === sessionId) {
      setActiveSessionId(updatedSessions[0].id);
    }
  };

  const updateSessionTitle = (sessionId: string, firstUserMessage: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId && session.title === 'New Chat'
          ? { ...session, title: firstUserMessage.slice(0, 40) + (firstUserMessage.length > 40 ? '...' : '') }
          : session
      )
    );
  };

  const handleSend = async () => {
    if (!input.trim() || !activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    const questionText = input;

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? { ...session, messages: updatedMessages, updatedAt: new Date() }
          : session
      )
    );

    // Update session title if this is the first user message
    if (messages.length === 1) {
      updateSessionTitle(activeSessionId, questionText);
    }

    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(questionText),
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? { ...session, messages: [...session.messages, aiResponse], updatedAt: new Date() }
            : session
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Sessions Sidebar - Compact */}
      <div className="w-64 flex-shrink-0 space-y-3">
        {/* Header - Compact */}
        <div className="rounded-xl bg-primary p-4 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Ask MagVisionIQ</h2>
              <p className="text-xs text-white/90">AI insights</p>
            </div>
          </div>
        </div>

        {/* New Chat Button - Compact */}
        <button
          onClick={createNewSession}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-success px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-success/20 transition-all hover:bg-success/90 active:scale-[0.98]"
        >
          <PlusIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
          New Chat
        </button>

        {/* Sessions List - More Space */}
        <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group relative cursor-pointer overflow-hidden rounded-lg border p-2.5 transition-all ${
                activeSessionId === session.id
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-200 bg-white hover:border-primary/30 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary/30'
              }`}
              onClick={() => setActiveSessionId(session.id)}
            >
              {/* Active Indicator */}
              {activeSessionId === session.id && (
                <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
              )}

              <div className="flex items-start gap-2 pl-1">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  activeSessionId === session.id
                    ? 'bg-primary/20'
                    : 'bg-success/10 group-hover:bg-success/20'
                }`}>
                  <ChatBubbleLeftRightIcon className={`h-4 w-4 ${
                    activeSessionId === session.id ? 'text-primary' : 'text-success'
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-xs font-semibold ${
                    activeSessionId === session.id
                      ? 'text-primary'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {session.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {session.messages.length} msgs
                  </p>
                </div>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="opacity-0 transition-all group-hover:opacity-100"
                  >
                    <TrashIcon className="h-3.5 w-3.5 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Container - Maximized */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
        {/* Chat Header - Minimal */}
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <SparklesIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {activeSession?.title || 'New Chat'}
              </h3>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {messages.length} msgs
            </span>
          </div>
        </div>

        {/* Messages Area - Maximum Space */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4 dark:bg-gray-900/30">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start gap-2 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <SparklesIcon className="h-4 w-4 animate-pulse text-primary" />
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Questions - Compact */}
        {messages.length === 1 && (
          <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <LightBulbIcon className="h-4 w-4 text-yellow-500" />
              Try asking:
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {suggestedQuestions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(item.question)}
                    className="group flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-left text-xs shadow-sm transition-all hover:border-primary hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10 transition-colors group-hover:bg-success/20">
                      <Icon className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-bold uppercase text-primary">
                        {item.category}
                      </span>
                      <p className="mt-1 text-xs font-medium leading-snug text-gray-700 dark:text-gray-300">
                        {item.question}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Area - Compact */}
        <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              rows={1}
              className="flex-1 resize-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Message Interface
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Chat Message Component - Compact
function ChatMessage({ message }: { message: Message }) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
      {/* Avatar - Smaller */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${
          isUser
            ? 'bg-primary text-white'
            : 'bg-primary/10 ring-1 ring-primary/10'
        }`}
      >
        {isUser ? (
          <span className="text-xs font-bold">S</span>
        ) : (
          <SparklesIcon className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Message Content - Compact Bubble */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <div
          className={`rounded-xl px-3 py-2 shadow-sm ${
            isUser
              ? 'bg-primary text-white'
              : 'border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>
        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}

// Mock AI Response Generator
function getAIResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('top-selling') || lowerQuestion.includes('best seller')) {
    return `Based on yesterday's sales data from LS Retail POS:

**Top 5 Selling Items:**
1. Bottled Water (500ml) - 342 units - AED 1,368
2. Marlboro Red - 156 packs - AED 4,680
3. Energy Drinks (Red Bull) - 128 cans - AED 896
4. Coffee (Hot) - 98 cups - AED 588
5. Chocolate Bars (KitKat) - 87 units - AED 261

Total revenue from these items: AED 7,793 (17% of daily sales)

💡 **Insight:** Water sales are 23% higher than usual due to the heat wave. Consider increasing stock levels.`;
  }

  if (lowerQuestion.includes('low') && lowerQuestion.includes('stock')) {
    return `Here are items currently running low on stock:

🔴 **Critical (< 10 units):**
- Marlboro Red: 8 packs remaining
- Diesel Fuel Additive: 5 bottles

🟡 **Low (< 25 units):**
- Bottled Water: 15 cases
- Energy Drinks: 22 cans
- Motor Oil (5W-30): 18 bottles

📦 **Recommendation:** Place urgent orders for critical items. Based on sales velocity, Marlboro Red will run out by 2 PM today.`;
  }

  if (lowerQuestion.includes('peak') || lowerQuestion.includes('footfall')) {
    return `Based on the past 7 days of footfall data from computer vision:

**Peak Hours:**
🕗 Morning Peak: 7:00 AM - 9:00 AM (avg 87 customers/hour)
🕐 Lunch Peak: 12:30 PM - 2:00 PM (avg 103 customers/hour)
🕕 Evening Peak: 5:30 PM - 7:30 PM (avg 124 customers/hour)

**Slowest Hours:**
🕘 9:00 AM - 11:00 AM (avg 32 customers/hour)
🕑 2:00 PM - 4:00 PM (avg 28 customers/hour)

💡 **Staffing Tip:** Schedule 3 staff during peak hours and 2 during slow hours to optimize labor costs.`;
  }

  if (lowerQuestion.includes('recommendation') || lowerQuestion.includes('increase sales')) {
    return `Here are my AI-powered recommendations to boost sales this week:

**1. Weather-Based Promotions** 🌡️
The forecast shows temperatures above 40°C. Run a "Beat the Heat" combo: Water + Energy Drink for AED 8 (save AED 2). Expected uplift: +15%

**2. Optimize Product Placement** 📍
Move coffee machine closer to entrance during morning hours (7-9 AM). Heat map shows 78% of morning customers turn right immediately.

**3. Staff Scheduling** 👥
Add 1 additional staff member on Thursday & Friday 6-8 PM. Queue wait times are 40% longer, causing 12% customer drop-off.

**4. Inventory Rebalancing** 📦
Stock up on snacks. There's a correlation between fuel purchases and snack sales (+23%). Currently understocked.

**Potential Revenue Impact:** +AED 3,200/week`;
  }

  // Default response
  return `I understand your question. Currently, I have access to data from:
- LS Retail POS (sales, transactions)
- Oracle Fusion (staff, scheduling)
- Computer Vision (footfall, heat maps, security)
- Inventory Management System

Could you rephrase your question or try one of the suggested questions? I'm here to help with sales analytics, inventory insights, staffing optimization, and operational recommendations.`;
}
