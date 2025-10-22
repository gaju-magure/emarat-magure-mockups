/**
 * Insights Screen (AI Copilot)
 * Single-screen layout with actionable insights - no scrolling required
 */

import { Send, Sparkles, AlertCircle, Clock, TrendingUp, FileText, ChevronRight, Users } from 'lucide-react';

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

export function InsightsScreen() {
  return (
    <div className="h-full flex flex-col bg-background-primary overflow-hidden">
      {/* Compact Welcome Header */}
      <div className="flex-shrink-0 px-4 md:px-6 pt-6 pb-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 shadow-glow-accent flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-text-primary">AI Insights Assistant</h2>
            <p className="text-xs text-text-secondary">Ask me anything about your business</p>
          </div>
        </div>
      </div>

      {/* Main Content - No Scroll, Compact Layout */}
      <div className="flex-1 px-4 md:px-8 pb-32 overflow-hidden flex flex-col">
        <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col gap-4">
          {/* Top Section: 2-Column Insight Cards */}
          <div className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[55vh]">
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
          <div className="flex-shrink-0">
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
        </div>
      </div>

      {/* Chat Input - Floating at bottom */}
      <div className="fixed bottom-20 lg:bottom-4 left-0 right-0 px-4 md:px-6 pointer-events-none z-20">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <div className="relative rounded-2xl bg-background-elevated backdrop-blur-glass-lg shadow-float-xl border border-glow p-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full h-12 px-4 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-accent text-white shadow-glow-accent hover:shadow-glow-lg hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200"
              aria-label="Send message"
              title="Send"
            >
              <Send className="h-5 w-5" />
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
