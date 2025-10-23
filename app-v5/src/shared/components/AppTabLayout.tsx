/**
 * AppTabLayout Component
 * Two-tab layout for apps: Chat with dedicated agent + Workspace
 */

import { useState, ReactNode } from 'react';
import { MessageSquare, LayoutGrid, X } from 'lucide-react';

interface AppTabLayoutProps {
  chatContent: ReactNode;
  workspaceContent: ReactNode;
  defaultTab?: 'chat' | 'workspace';
  onClose?: () => void;
}

export function AppTabLayout({ chatContent, workspaceContent, defaultTab = 'workspace', onClose }: AppTabLayoutProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'workspace'>(defaultTab);

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation with Close Button */}
      <div className="flex-shrink-0 border-b border-border-light bg-background-elevated/50 backdrop-blur-glass-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-xl transition-all duration-200
                  ${activeTab === 'chat'
                    ? 'bg-background-primary text-accent border-b-2 border-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary/50'
                  }
                `}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat with Agent</span>
              </button>
              <button
                onClick={() => setActiveTab('workspace')}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-xl transition-all duration-200
                  ${activeTab === 'workspace'
                    ? 'bg-background-primary text-primary border-b-2 border-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary/50'
                  }
                `}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Workspace</span>
              </button>
            </div>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background-tertiary/50 transition-all duration-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && chatContent}
        {activeTab === 'workspace' && workspaceContent}
      </div>
    </div>
  );
}
