import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, LayoutGrid, Send, Sparkles, FileText, AlertCircle, CheckCircle2, DollarSign, Upload, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface Message {
  type: "ai" | "user";
  text: string;
  data?: any;
}

interface InvoiceReconciliationProps {
  onClose: () => void;
}

export function InvoiceReconciliation({ onClose }: InvoiceReconciliationProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "space">("space");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! I'm your Invoice Reconciliation AI assistant. I've analyzed all pending invoices and flagged 5 that need your attention. You can ask me about specific invoices, exceptions, or vendors.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const invoices = [
    {
      id: "#4527",
      vendor: "Acme Corporation",
      amount: 12450,
      date: "2025-10-01",
      status: "flagged",
      confidence: 72,
      issue: "PO mismatch",
      poNumber: "PO-2024-1234",
      expectedAmount: 11200,
      variance: 1250,
    },
    {
      id: "#4531",
      vendor: "Global Ltd",
      amount: 8200,
      date: "2025-10-02",
      status: "flagged",
      confidence: 68,
      issue: "Price variance",
      poNumber: "PO-2024-1256",
      expectedAmount: 7800,
      variance: 400,
    },
    {
      id: "#4535",
      vendor: "Tech Inc",
      amount: 15300,
      date: "2025-10-03",
      status: "flagged",
      confidence: 89,
      issue: "Duplicate detected",
      poNumber: "PO-2024-1278",
      expectedAmount: 15300,
      variance: 0,
    },
    {
      id: "#4540",
      vendor: "Supply Co",
      amount: 9800,
      date: "2025-10-04",
      status: "approved",
      confidence: 95,
      issue: null,
      poNumber: "PO-2024-1290",
      expectedAmount: 9800,
      variance: 0,
    },
    {
      id: "#4545",
      vendor: "Services Corp",
      amount: 22100,
      date: "2025-10-05",
      status: "flagged",
      confidence: 65,
      issue: "Missing documentation",
      poNumber: "PO-2024-1302",
      expectedAmount: 22100,
      variance: 0,
    },
  ];

  const stats = {
    totalInvoices: 28,
    flagged: 5,
    approved: 18,
    pending: 5,
    totalAmount: 156700,
    avgConfidence: 82,
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const lower = input.toLowerCase();
      let aiResponse: Message = { type: "ai", text: "" };

      if (lower.includes("4527") || lower.includes("acme")) {
        aiResponse.text = "Invoice #4527 from Acme Corporation for $12,450 has a PO mismatch. The expected amount was $11,200 (variance: $1,250). This could be due to additional items or pricing changes. Would you like me to pull up the purchase order details?";
      } else if (lower.includes("approve") || lower.includes("accept")) {
        aiResponse.text = "I can help you approve invoices. Which invoice would you like to approve? Please note that flagged invoices with confidence below 75% require manual review before approval.";
      } else if (lower.includes("summary") || lower.includes("overview")) {
        aiResponse.text = `Here's your invoice summary: ${stats.totalInvoices} total invoices, ${stats.flagged} flagged for review, ${stats.approved} approved, and ${stats.pending} pending. Total amount: $${stats.totalAmount.toLocaleString()}. Average AI confidence: ${stats.avgConfidence}%.`;
        aiResponse.data = stats;
      } else if (lower.includes("duplicate")) {
        aiResponse.text = "Invoice #4535 from Tech Inc appears to be a duplicate. I found another invoice with the same PO number (PO-2024-1278) submitted 3 days ago for the same amount. Confidence: 89%. Would you like to see both invoices side by side?";
      } else {
        aiResponse.text = `I understand you're asking about: "${input}". Try asking me about specific invoices (e.g., #4527), exceptions, vendors, or request a summary.`;
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08111e]/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white text-lg">Invoice Reconciliation</h2>
              <p className="text-gray-400 text-sm">AI-powered invoice processing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "space")} className="flex-1 flex flex-col">
          <div className="border-b border-white/10 bg-white/[0.02] px-4">
            <TabsList className="bg-transparent border-0 h-12">
              <TabsTrigger 
                value="space" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 text-gray-400"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Workspace
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 text-gray-400"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Chat
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Workspace Tab */}
          <TabsContent value="space" className="flex-1 overflow-hidden m-0 p-4 md:p-6">
            <div className="h-full flex flex-col gap-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Total Invoices</p>
                  <p className="text-white text-xl">{stats.totalInvoices}</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-400 text-xs mb-1">Flagged</p>
                  <p className="text-white text-xl">{stats.flagged}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 text-xs mb-1">Approved</p>
                  <p className="text-white text-xl">{stats.approved}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Avg Confidence</p>
                  <p className="text-white text-xl">{stats.avgConfidence}%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Invoices
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>

              {/* Invoice List */}
              <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden flex flex-col">
                <div className="p-3 border-b border-white/10 bg-white/[0.03]">
                  <h3 className="text-white">Invoice Queue</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white/[0.05] backdrop-blur-sm">
                      <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-gray-400 text-sm">Invoice</th>
                        <th className="text-left p-3 text-gray-400 text-sm hidden md:table-cell">Vendor</th>
                        <th className="text-left p-3 text-gray-400 text-sm">Amount</th>
                        <th className="text-left p-3 text-gray-400 text-sm hidden sm:table-cell">Status</th>
                        <th className="text-left p-3 text-gray-400 text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                          <td className="p-3">
                            <div>
                              <p className="text-white text-sm">{invoice.id}</p>
                              <p className="text-gray-500 text-xs md:hidden">{invoice.vendor}</p>
                            </div>
                          </td>
                          <td className="p-3 text-gray-300 text-sm hidden md:table-cell">{invoice.vendor}</td>
                          <td className="p-3">
                            <p className="text-white text-sm">${invoice.amount.toLocaleString()}</p>
                            {invoice.variance > 0 && (
                              <p className="text-yellow-400 text-xs">+${invoice.variance}</p>
                            )}
                          </td>
                          <td className="p-3 hidden sm:table-cell">
                            <Badge
                              variant={invoice.status === "approved" ? "default" : invoice.status === "flagged" ? "destructive" : "secondary"}
                              className={
                                invoice.status === "approved"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : invoice.status === "flagged"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-all">
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="flex-1 overflow-hidden m-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "ai" && (
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl rounded-tl-sm p-4">
                          <p className="text-blue-100 text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {message.type === "user" && (
                    <div className="bg-white/[0.08] border border-white/10 rounded-xl rounded-tr-sm p-4 max-w-[85%]">
                      <p className="text-gray-200 text-sm">{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about invoices..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
