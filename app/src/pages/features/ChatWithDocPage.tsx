import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AppLayout } from '../../components/layout/AppLayout';
import {
  PaperAirplaneIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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

  const [document, setDocument] = useState<UploadedDocument | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "Summarize the main points of this document",
    "What are the key takeaways?",
    "Extract all dates and numbers",
    "Translate this document to Arabic",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      const uploadedDoc: UploadedDocument = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      };

      setDocument(uploadedDoc);
      setIsProcessing(false);

      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `${t('chatWithDoc.ready')} I've analyzed "${file.name}". What would you like to know about it?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim() || !document) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Based on the document "${document.name}", here's what I found: ${getMockResponse(input)}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
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

  const handleRemoveDocument = () => {
    setDocument(null);
    setMessages([]);
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
      <div className="flex h-[calc(100vh-8rem)] flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-text-primary">{t('chatWithDoc.title')}</h1>
          <p className="text-sm text-text-secondary">{t('chatWithDoc.subtitle')}</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Chat Area */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-background-elevated" style={{ borderColor: 'var(--color-border-default)' }}>
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
                  className="flex w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors hover:border-primary hover:bg-background-tertiary"
                  style={{ borderColor: 'var(--color-border-default)' }}
                >
                  <ArrowUpTrayIcon className="mb-4 h-16 w-16 text-text-tertiary" />
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {isProcessing ? t('chatWithDoc.processing') : t('chatWithDoc.dragDrop')}
                  </h3>
                  <p className="text-sm text-text-secondary">{t('chatWithDoc.supportedFormats')}</p>
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <>
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {messages.length === 0 && !isTyping && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <SparklesIcon className="mb-4 h-12 w-12 text-success" />
                      <p className="mb-6 text-center text-text-secondary">{t('chatWithDoc.askQuestion')}</p>

                      <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                        {suggestedQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => setInput(question)}
                            className="rounded-lg border bg-background-secondary p-3 text-left text-sm text-text-primary transition-colors hover:border-primary hover:bg-background-tertiary"
                            style={{ borderColor: 'var(--color-border-default)' }}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-white'
                            : 'border bg-background-secondary text-text-primary'
                        }`}
                        style={message.type === 'assistant' ? { borderColor: 'var(--color-border-default)' } : {}}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-lg border bg-background-secondary p-3" style={{ borderColor: 'var(--color-border-default)' }}>
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-success"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-success" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t p-4" style={{ borderColor: 'var(--color-border-default)' }}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={t('chatWithDoc.chatPlaceholder')}
                      className="flex-1 rounded-lg border bg-background-secondary px-4 py-2 text-sm text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none"
                      style={{ borderColor: 'var(--color-border-default)' }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Document Info Sidebar */}
          {document && (
            <div className="w-80 shrink-0 rounded-lg border bg-background-elevated p-4" style={{ borderColor: 'var(--color-border-default)' }}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">{t('chatWithDoc.documentInfo')}</h3>
                <button
                  onClick={handleRemoveDocument}
                  className="rounded-lg p-1 text-text-tertiary hover:bg-background-tertiary hover:text-danger"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-background-secondary p-3">
                  <DocumentTextIcon className="h-8 w-8 shrink-0 text-success" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">{document.name}</p>
                    <p className="text-xs text-text-tertiary">{formatFileSize(document.size)}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{t('chatWithDoc.fileName')}:</span>
                    <span className="font-medium text-text-primary">{document.name.split('.').pop()?.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{t('chatWithDoc.fileSize')}:</span>
                    <span className="font-medium text-text-primary">{formatFileSize(document.size)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
