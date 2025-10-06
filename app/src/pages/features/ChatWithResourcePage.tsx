import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AppLayout } from '../../components/layout/AppLayout';
import {
  PaperAirplaneIcon,
  DocumentTextIcon,
  SparklesIcon,
  LightBulbIcon,
  PlusIcon,
  TrashIcon,
  CircleStackIcon,
  FolderIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CloudIcon,
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
  resource: ConnectedResource | null;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ConnectedResource {
  id: string;
  name: string;
  type: ResourceType;
  connectedAt: Date;
  metadata?: {
    size?: number;
    recordCount?: number;
    lastSync?: Date;
    tables?: string[];
    collections?: string[];
  };
}

type ResourceType = 'document' | 'database' | 'crm' | 'erp' | 'files' | 'cloud';

const resourceTypes = [
  {
    type: 'document' as ResourceType,
    label: 'Documents',
    labelAr: 'المستندات',
    icon: DocumentTextIcon,
    description: 'PDF, DOCX, TXT, Images',
    descriptionAr: 'PDF، DOCX، TXT، صور'
  },
  {
    type: 'database' as ResourceType,
    label: 'Database',
    labelAr: 'قاعدة البيانات',
    icon: CircleStackIcon,
    description: 'SQL, MongoDB, PostgreSQL',
    descriptionAr: 'SQL، MongoDB، PostgreSQL'
  },
  {
    type: 'crm' as ResourceType,
    label: 'CRM System',
    labelAr: 'نظام CRM',
    icon: BuildingOfficeIcon,
    description: 'Salesforce, HubSpot, Zoho',
    descriptionAr: 'Salesforce، HubSpot، Zoho'
  },
  {
    type: 'erp' as ResourceType,
    label: 'ERP System',
    labelAr: 'نظام ERP',
    icon: ChartBarIcon,
    description: 'SAP, Oracle, Dynamics',
    descriptionAr: 'SAP، Oracle، Dynamics'
  },
  {
    type: 'files' as ResourceType,
    label: 'File Storage',
    labelAr: 'تخزين الملفات',
    icon: FolderIcon,
    description: 'SharePoint, Google Drive',
    descriptionAr: 'SharePoint، Google Drive'
  },
  {
    type: 'cloud' as ResourceType,
    label: 'Cloud Storage',
    labelAr: 'التخزين السحابي',
    icon: CloudIcon,
    description: 'AWS S3, Azure Blob, GCS',
    descriptionAr: 'AWS S3، Azure Blob، GCS'
  },
];

export function ChatWithResourcePage() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: t('chatWithResource.newChat'),
      resource: null,
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
  const resource = activeSession?.resource || null;

  const getSuggestedQuestions = (resourceType?: ResourceType) => {
    switch (resourceType) {
      case 'database':
        return [
          { question: "Show me the total sales for last month", category: "Query" },
          { question: "How many active customers do we have?", category: "Analytics" },
          { question: "Find all orders above AED 10,000", category: "Search" },
          { question: "Generate a revenue report by category", category: "Report" },
        ];
      case 'crm':
        return [
          { question: "Show me top 10 leads this quarter", category: "Leads" },
          { question: "What's our customer conversion rate?", category: "Analytics" },
          { question: "List all open opportunities", category: "Sales" },
          { question: "Show customer satisfaction scores", category: "Insights" },
        ];
      case 'erp':
        return [
          { question: "Show inventory levels by warehouse", category: "Inventory" },
          { question: "What's our current cash flow status?", category: "Finance" },
          { question: "List pending purchase orders", category: "Procurement" },
          { question: "Show production schedule for this week", category: "Operations" },
        ];
      case 'files':
        return [
          { question: "Find all Excel files modified last week", category: "Search" },
          { question: "Show me the latest project reports", category: "Documents" },
          { question: "List all contracts expiring this month", category: "Contracts" },
          { question: "Find presentations about Q4 strategy", category: "Search" },
        ];
      case 'cloud':
        return [
          { question: "Show storage usage by department", category: "Analytics" },
          { question: "List all files larger than 100MB", category: "Search" },
          { question: "Find backups from last week", category: "Backups" },
          { question: "Show access logs for sensitive data", category: "Security" },
        ];
      default: // document
        return [
          { question: "Summarize the main points of this document", category: "Summary" },
          { question: "What are the key takeaways?", category: "Insights" },
          { question: "Extract all dates and numbers", category: "Data" },
          { question: "Translate this document to Arabic", category: "Translate" },
        ];
    }
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: t('chatWithResource.newChat'),
      resource: null,
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

  const handleResourceTypeSelect = (type: ResourceType) => {
    if (type === 'document') {
      fileInputRef.current?.click();
    } else {
      handleResourceConnection(type);
    }
  };

  const handleResourceConnection = (type: ResourceType) => {
    if (!activeSession) return;
    setIsProcessing(true);

    setTimeout(() => {
      const resourceNames = {
        database: 'Emarat Main Database (PostgreSQL)',
        crm: 'Salesforce Production',
        erp: 'SAP ERP System',
        files: 'SharePoint Document Library',
        cloud: 'AWS S3 Storage',
        document: 'Document',
      };

      const metadata = {
        database: { recordCount: 125000, tables: ['customers', 'orders', 'products', 'inventory'], lastSync: new Date() },
        crm: { recordCount: 8500, collections: ['leads', 'contacts', 'opportunities', 'accounts'], lastSync: new Date() },
        erp: { recordCount: 250000, tables: ['financials', 'procurement', 'inventory', 'hr'], lastSync: new Date() },
        files: { recordCount: 1250, lastSync: new Date() },
        cloud: { size: 524288000, lastSync: new Date() },
      };

      const connectedResource: ConnectedResource = {
        id: Date.now().toString(),
        name: resourceNames[type],
        type: type,
        connectedAt: new Date(),
        metadata: metadata[type as keyof typeof metadata],
      };

      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Connected to ${connectedResource.name}! I can help you query, analyze, and extract insights from this ${type}. What would you like to know?`,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                resource: connectedResource,
                messages: [welcomeMessage],
                title: connectedResource.name,
                updatedAt: new Date(),
              }
            : session
        )
      );

      setIsProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeSession) return;

    setIsProcessing(true);

    setTimeout(() => {
      const connectedResource: ConnectedResource = {
        id: Date.now().toString(),
        name: file.name,
        type: 'document',
        connectedAt: new Date(),
        metadata: { size: file.size },
      };

      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `${t('chatWithResource.ready')} I've analyzed "${file.name}". What would you like to know about it?`,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                resource: connectedResource,
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
    if (!input.trim() || !resource || !activeSession) return;

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
        content: getMockResponse(input, resource.type),
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

  const getMockResponse = (question: string, resourceType: ResourceType): string => {
    const lowerQuestion = question.toLowerCase();

    if (resourceType === 'database') {
      if (lowerQuestion.includes('sales') || lowerQuestion.includes('revenue')) {
        return "Based on the database query, last month's total sales were AED 2.5M across 1,250 transactions. The average order value was AED 2,000. Top performing category: Fuel & Lubricants (65% of revenue).";
      }
      if (lowerQuestion.includes('customer')) {
        return "Currently, we have 8,500 active customers in the database. 2,150 are new customers from last quarter. Customer retention rate is 85%.";
      }
      return "I've queried the database and found relevant records matching your request. The data shows positive trends across key metrics.";
    }

    if (resourceType === 'crm') {
      if (lowerQuestion.includes('lead')) {
        return "Top 10 leads this quarter: 1) Al Majid Motors (AED 500K), 2) Emirates Logistics (AED 350K), 3) Dubai Retail Group (AED 280K). Total pipeline value: AED 2.8M.";
      }
      if (lowerQuestion.includes('conversion')) {
        return "Current conversion rate: 28% (Lead to Customer). This is 5% higher than last quarter. Average sales cycle: 45 days.";
      }
      return "I've analyzed the CRM data. The insights show strong performance in customer engagement and opportunity management.";
    }

    if (resourceType === 'erp') {
      if (lowerQuestion.includes('inventory')) {
        return "Inventory Status: Warehouse A (85% capacity), Warehouse B (72% capacity), Warehouse C (91% capacity). Low stock alerts: 15 items. Overstocked: 8 items.";
      }
      if (lowerQuestion.includes('cash flow') || lowerQuestion.includes('finance')) {
        return "Current Cash Flow: Positive AED 1.2M. Accounts Receivable: AED 3.5M. Accounts Payable: AED 2.8M. Operating margin: 18%.";
      }
      return "ERP data retrieved successfully. All operational metrics are within normal ranges.";
    }

    if (resourceType === 'files') {
      if (lowerQuestion.includes('find') || lowerQuestion.includes('search')) {
        return "Found 23 files matching your criteria: 15 Excel spreadsheets, 5 Word documents, 3 PowerPoint presentations. Most recent: Q4_Financial_Report.xlsx (modified 2 days ago).";
      }
      if (lowerQuestion.includes('contract')) {
        return "Found 5 contracts expiring this month: Vendor Agreement #1234 (15 days), Service Contract #5678 (22 days), Lease Agreement #9012 (8 days).";
      }
      return "I've searched through the file storage and found relevant documents matching your query.";
    }

    if (resourceType === 'cloud') {
      if (lowerQuestion.includes('storage') || lowerQuestion.includes('usage')) {
        return "Storage Usage: Operations (45GB), Finance (32GB), HR (18GB), Marketing (25GB). Total: 120GB of 500GB capacity (24% used).";
      }
      if (lowerQuestion.includes('backup')) {
        return "Latest backups: Daily backup completed successfully (Today 2:00 AM). Last 7 days: 7/7 successful. Total backup size: 85GB.";
      }
      return "Cloud storage data retrieved. All systems are operating normally with regular backup schedules maintained.";
    }

    // Default document response
    if (lowerQuestion.includes('summar')) {
      return "This document contains important information about business operations, key metrics, and strategic initiatives for the upcoming quarter.";
    }
    if (lowerQuestion.includes('key')) {
      return "The main takeaways are: 1) Revenue increased by 15%, 2) Customer satisfaction improved, 3) New market expansion planned for Q3.";
    }
    return "I've analyzed your question about the resource. The information shows relevant data and insights that align with your query.";
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

  const getResourceIcon = (type: ResourceType) => {
    const resourceType = resourceTypes.find(r => r.type === type);
    return resourceType?.icon || DocumentTextIcon;
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
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{t('chatWithResource.title')}</h2>
                <p className="text-xs text-white/90">{isRTL ? 'الدردشة مع الموارد' : 'Chat with Resources'}</p>
              </div>
            </div>
          </div>

          {/* New Chat Button - Compact */}
          <button
            onClick={createNewSession}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-success px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-success/20 transition-all hover:bg-success/90 active:scale-[0.98]"
          >
            <PlusIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
            {t('chatWithResource.newChat')}
          </button>

          {/* Sessions List - More Space */}
          <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 240px)' }}>
            {sessions.map((session) => {
              const ResourceIcon = session.resource ? getResourceIcon(session.resource.type) : DocumentTextIcon;
              return (
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
                      <ResourceIcon className={`h-4 w-4 ${
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
                        {session.resource ? `${session.messages.length} msgs` : 'No resource'}
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
              );
            })}
          </div>
        </div>

        {/* Chat Container - Maximized */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {!resource ? (
            /* Resource Selector */
            <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto p-4 sm:p-8">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />

              <div className="w-full max-w-4xl">
                <div className="mb-6 text-center sm:mb-8">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 sm:h-16 sm:w-16">
                      <SparklesIcon className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    {isProcessing ? (isRTL ? 'جارٍ الاتصال...' : 'Connecting...') : (isRTL ? 'اختر نوع المورد' : 'Select Resource Type')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isRTL ? 'اتصل بمصادر البيانات المختلفة واطرح الأسئلة' : 'Connect to various data sources and ask questions'}
                  </p>
                </div>

                {isProcessing ? (
                  <div className="flex justify-center">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
                      <div className="h-3 w-3 animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
                      <div className="h-3 w-3 animate-bounce rounded-full bg-success" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {resourceTypes.map((resourceType) => {
                      const Icon = resourceType.icon;
                      return (
                        <button
                          key={resourceType.type}
                          onClick={() => handleResourceTypeSelect(resourceType.type)}
                          className="group flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 bg-white p-4 text-center transition-all hover:border-primary hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary sm:gap-3 sm:p-6"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 transition-colors group-hover:bg-success/20 sm:h-14 sm:w-14">
                            <Icon className="h-6 w-6 text-success sm:h-7 sm:w-7" />
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                              {isRTL ? resourceType.labelAr : resourceType.label}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {isRTL ? resourceType.descriptionAr : resourceType.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
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
                    {(() => {
                      const Icon = getResourceIcon(resource.type);
                      return <Icon className="h-4 w-4 text-primary" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {resource.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {resource.type === 'document' && resource.metadata?.size
                        ? formatFileSize(resource.metadata.size)
                        : resource.metadata?.recordCount
                        ? `${resource.metadata.recordCount.toLocaleString()} records`
                        : resourceTypes.find(r => r.type === resource.type)?.label}
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
                    {getSuggestedQuestions(resource.type).map((item, index) => {
                      const Icon = getResourceIcon(resource.type);
                      return (
                        <button
                          key={index}
                          onClick={() => setInput(item.question)}
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
                    placeholder={t('chatWithResource.chatPlaceholder')}
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
