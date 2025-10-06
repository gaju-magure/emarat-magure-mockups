import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AppLayout } from '../../components/layout/AppLayout';
import {
  PaperAirplaneIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  SparklesIcon,
  LightBulbIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  document: UploadedDocument | null;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export function ChatWithDocPage() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: t('chatWithDoc.newChat'),
      document: null,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState('1');
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];
  const document = activeSession?.document || null;

  const suggestedQuestions = [
    { question: "Summarize the main points of this document", category: "Summary" },
    { question: "What are the key takeaways?", category: "Insights" },
    { question: "Extract all dates and numbers", category: "Data" },
    { question: "Translate this document to Arabic", category: "Translate" },
  ];

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: t('chatWithDoc.newChat'),
      document: null,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length === 1) return;
    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    setSessions(updatedSessions);
    if (activeSessionId === sessionId) {
      setActiveSessionId(updatedSessions[0].id);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeSession) return;

    setIsProcessing(true);

    setTimeout(() => {
      const uploadedDoc: UploadedDocument = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      };

      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `${t('chatWithDoc.ready')} I've analyzed "${file.name}". What would you like to know about it?`,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                document: uploadedDoc,
                messages: [welcomeMessage],
                title: file.name.slice(0, 40) + (file.name.length > 40 ? '...' : ''),
                updatedAt: new Date(),
              }
            : session
        )
      );

      setIsProcessing(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim() || !document || !activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? { ...session, messages: updatedMessages, updatedAt: new Date() }
          : session
      )
    );

    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Based on the document "${document.name}", here's what I found: ${getMockResponse(input)}`,
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

  const getMockResponse = (question: string): string => {
    if (question.toLowerCase().includes('summar')) {
      return "This document contains important information about business operations, key metrics, and strategic initiatives for the upcoming quarter.";
    }
    if (question.toLowerCase().includes('key')) {
      return "The main takeaways are: 1) Revenue increased by 15%, 2) Customer satisfaction improved, 3) New market expansion planned for Q3.";
    }
    if (question.toLowerCase().includes('date') || question.toLowerCase().includes('number')) {
      return "Key dates: Jan 15, 2025 - Q1 Start, Mar 30, 2025 - Review Meeting. Important numbers: 15% growth, AED 2.5M budget, 150 employees.";
    }
    return "I've analyzed your question about the document. The information shows relevant data and insights that align with your query.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-120px)] gap-4">
        {/* Sessions Sidebar - Compact */}
        <div className="w-64 flex-shrink-0 space-y-3">
          {/* Header - Compact */}
          <div className="rounded-xl bg-primary p-4 shadow-md">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                <DocumentTextIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{t('chatWithDoc.title')}</h2>
                <p className="text-xs text-white/90">{t('chatWithDoc.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* New Chat Button - Compact */}
          <button
            onClick={createNewSession}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-success px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-success/20 transition-all hover:bg-success/90 active:scale-[0.98]"
          >
            <PlusIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
            {t('chatWithDoc.newChat')}
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
                    <DocumentTextIcon className={`h-4 w-4 ${
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
                      {session.document ? `${session.messages.length} msgs` : 'No document'}
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
          {!document ? (
            /* Upload Area */
            <div className="flex flex-1 flex-col items-center justify-center p-8">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-12 transition-all hover:border-primary hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary dark:hover:bg-gray-800/50"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <ArrowUpTrayIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {isProcessing ? t('chatWithDoc.processing') : t('chatWithDoc.dragDrop')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('chatWithDoc.supportedFormats')}</p>
                {isProcessing && (
                  <div className="mt-4 flex gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header - Minimal */}
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <DocumentTextIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {document.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(document.size)}
                    </p>
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
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <SparklesIcon className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] rounded-xl px-4 py-2.5 shadow-sm ${
                          message.type === 'user'
                            ? 'bg-primary text-white'
                            : 'border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                        }`}
                      >
                        <p className={`text-sm leading-relaxed ${
                          message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-white'
                        }`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
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
                    {t('magvision.suggestedQuestions')}
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {suggestedQuestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(item.question)}
                        className="group flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-left text-xs shadow-sm transition-all hover:border-primary hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10 transition-colors group-hover:bg-success/20">
                          <DocumentTextIcon className="h-4 w-4 text-success" />
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
                    ))}
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
                    placeholder={t('chatWithDoc.chatPlaceholder')}
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
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
