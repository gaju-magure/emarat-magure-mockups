/**
 * Insights Screen (AI Copilot)
 * Chat interface with conversation history and actionable insights
 */

import { useState } from 'react';
import { Send, Sparkles, AlertCircle, Clock, TrendingUp, FileText, ChevronRight, Users, History, Plus } from 'lucide-react';

// Sample insights data
const URGENT_INVOICES = [
  { id: '#4527', vendor: 'Acme Corp', amount: '$12,450', confidence: 72 },
  { id: '#4531', vendor: 'Global Ltd', amount: '$8,200', confidence: 68 },
  { id: '#4535', vendor: 'Tech Inc', amount: '$15,300', confidence: 89 },
];

const PENDING_RFPS = [
  { name: 'Fuel Supply Q1 2026', score: 92, status: 'Pending' },
  { name: 'Fleet Maintenance', score: 78, status: 'In Review' },
  { name: 'IT Infrastructure', score: 85, status: 'Pending' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

export function InsightsScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Sample conversation history
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Q4 Revenue Analysis',
      timestamp: new Date(Date.now() - 86400000),
      preview: 'Can you analyze Q4 revenue trends?',
    },
    {
      id: '2',
      title: 'Invoice reconciliation help',
      timestamp: new Date(Date.now() - 172800000),
      preview: 'Show me all invoices with low confidence',
    },
    {
      id: '3',
      title: 'RFP evaluation insights',
      timestamp: new Date(Date.now() - 259200000),
      preview: 'Which RFP proposals are highest priority?',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I received your message: "${input}". This is a demo response. In production, I would analyze your business data and provide actionable insights.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };
  return (
    <div className="h-full flex bg-background-primary">
      {/* Conversation History Sidebar */}
      {showHistory && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowHistory(false)}
          />
          <aside className="fixed lg:relative inset-y-0 left-0 w-72 bg-background-elevated border-r border-border-light z-50 flex flex-col">
            {/* History Header */}
            <div className="flex-shrink-0 p-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Conversation History</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background-tertiary transition-all duration-200"
              >
                ✕
              </button>
            </div>

            {/* New Chat Button */}
            <div className="flex-shrink-0 p-3">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-medium text-sm transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>New Chat</span>
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full text-left p-3 rounded-xl bg-background-tertiary/50 hover:bg-background-tertiary border border-transparent hover:border-border-light transition-all duration-200"
                >
                  <div className="font-medium text-sm text-text-primary mb-1 truncate">
                    {conv.title}
                  </div>
                  <div className="text-xs text-text-tertiary truncate">{conv.preview}</div>
                  <div className="text-xs text-text-tertiary mt-1">
                    {conv.timestamp.toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex-shrink-0 px-4 md:px-6 pt-4 pb-3 border-b border-border-light">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-10 h-10 rounded-full bg-background-elevated hover:bg-background-tertiary flex items-center justify-center transition-all duration-200"
              title="Conversation History"
            >
              <History className="h-5 w-5 text-text-secondary" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 shadow-glow-accent flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text-primary">AI Insights Assistant</h3>
              <p className="text-xs text-text-secondary">Ask me anything about your business</p>
            </div>
          </div>
        </div>

        {/* Messages Area - Centered */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              /* Welcome Screen with Insight Cards */
              <div className="space-y-4">
                {/* Top Section: 2-Column Insight Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Invoice Review Card */}
            <div className="rounded-2xl bg-warning/5 backdrop-blur-glass-md shadow-float-lg overflow-hidden flex flex-col">
              {/* Card Header */}
              <div className="flex-shrink-0 p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary">Invoice Review</h3>
                  <p className="text-xs text-text-secondary">5 items need attention - AI confidence &lt;75%</p>
                </div>
              </div>

              {/* Tabular Data */}
              <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-1.5">
                {URGENT_INVOICES.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-background-elevated/50 hover:bg-background-elevated hover:shadow-float-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="text-xs font-bold text-text-primary flex-shrink-0">{invoice.id}</span>
                      <span className="text-xs text-text-secondary truncate">{invoice.vendor}</span>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-xs font-semibold text-text-primary">{invoice.amount}</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-lg ${
                        invoice.confidence >= 75 ? 'text-success bg-success/10' : invoice.confidence >= 65 ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
                      }`}>
                        {invoice.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 p-3 pt-2">
                <button className="w-full py-2.5 px-3 rounded-xl bg-warning/10 hover:bg-warning/20 text-warning font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group shadow-float-sm hover:shadow-float-md">
                  Review All Invoices
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Right: RFP Proposals Card */}
            <div className="rounded-2xl bg-info/5 backdrop-blur-glass-md shadow-float-lg overflow-hidden flex flex-col">
              {/* Card Header */}
              <div className="flex-shrink-0 p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-info" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary">RFP Proposals</h3>
                  <p className="text-xs text-text-secondary">3 proposals pending evaluation</p>
                </div>
              </div>

              {/* Tabular Data */}
              <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-1.5">
                {PENDING_RFPS.map((rfp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-background-elevated/50 hover:bg-background-elevated hover:shadow-float-sm transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-xs text-text-primary flex-1 truncate pr-2.5">{rfp.name}</span>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-xs font-bold text-success px-1.5 py-0.5 rounded-lg bg-success/10">{rfp.score}%</span>
                      <span className="text-xs text-text-tertiary w-20 text-right">{rfp.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 p-3 pt-2">
                <button className="w-full py-2.5 px-3 rounded-xl bg-success/10 hover:bg-success/20 text-success font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group shadow-float-sm hover:shadow-float-md">
                  Open RFP Tool
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
                </div>

                {/* Bottom Section: Quick Actions Row */}
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background-elevated/50 backdrop-blur-glass-md hover:bg-background-elevated hover:shadow-float-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <TrendingUp className="h-4 w-4 text-accent group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-200">
                      Demand Forecast
                    </span>
                  </button>
                  <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background-elevated/50 backdrop-blur-glass-md hover:bg-background-elevated hover:shadow-float-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <FileText className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                      RFP Summary
                    </span>
                  </button>
                  <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background-elevated/50 backdrop-blur-glass-md hover:bg-background-elevated hover:shadow-float-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <AlertCircle className="h-4 w-4 text-warning group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-warning transition-colors duration-200">
                      Invoice Exceptions
                    </span>
                  </button>
                  <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background-elevated/50 backdrop-blur-glass-md hover:bg-background-elevated hover:shadow-float-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <Users className="h-4 w-4 text-success group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-success transition-colors duration-200">
                      Top Retail Sites
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`
                        max-w-[75%] rounded-2xl px-4 py-3 shadow-float-sm
                        ${message.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-background-elevated backdrop-blur-glass-md text-text-primary'
                        }
                      `}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.role === 'user' ? 'text-white/70' : 'text-text-tertiary'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">U</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Centered */}
        <div className="flex-shrink-0 px-4 md:px-6 py-4 border-t border-border-light">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-background-elevated backdrop-blur-glass-md border border-border-light text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-float-md hover:shadow-float-lg transition-all duration-200"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
