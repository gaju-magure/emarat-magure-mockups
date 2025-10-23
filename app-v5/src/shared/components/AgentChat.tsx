/**
 * AgentChat Component
 * Chat interface for dedicated app agents with conversation history
 */

import { useState } from 'react';
import { Send, Sparkles, Bot, History, Plus } from 'lucide-react';

interface AgentChatProps {
  agentName: string;
  agentDescription: string;
  placeholder?: string;
}

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

export function AgentChat({ agentName, agentDescription, placeholder }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: `Hi! I'm your ${agentName} assistant. ${agentDescription}`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Sample conversation history
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Invoice matching discussion',
      timestamp: new Date(Date.now() - 86400000),
      preview: 'Can you help me with invoice INV-2847?',
    },
    {
      id: '2',
      title: 'Vendor reconciliation',
      timestamp: new Date(Date.now() - 172800000),
      preview: 'Show me all pending vendor invoices',
    },
    {
      id: '3',
      title: 'Monthly report analysis',
      timestamp: new Date(Date.now() - 259200000),
      preview: 'Generate summary for October',
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

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I received your message: "${input}". This is a demo response. In production, I would process your request using specialized AI models for ${agentName}.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        role: 'agent',
        content: `Hi! I'm your ${agentName} assistant. ${agentDescription}`,
        timestamp: new Date(),
      },
    ]);
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
      <div className="flex-1 flex flex-col">
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
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text-primary">{agentName} Agent</h3>
              <p className="text-xs text-text-secondary">{agentDescription}</p>
            </div>
          </div>
        </div>

        {/* Messages Area - Centered */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'agent' && (
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
                  placeholder={placeholder || `Ask ${agentName} agent anything...`}
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
