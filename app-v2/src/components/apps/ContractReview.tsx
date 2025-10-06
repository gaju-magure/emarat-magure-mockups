import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, LayoutGrid, Send, Sparkles, FileCheck, Upload, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface Message {
  type: "ai" | "user";
  text: string;
}

interface ContractReviewProps {
  onClose: () => void;
}

export function ContractReview({ onClose }: ContractReviewProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "space">("space");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! I'm your Contract Review AI. I've analyzed 2 contracts and identified key clauses, risks, and compliance issues. How can I help you review these documents?",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedContract, setSelectedContract] = useState<string | null>("contract-001");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contracts = [
    {
      id: "contract-001",
      name: "Vendor Supply Agreement 2026",
      vendor: "Global Supplies Inc",
      uploadDate: "2025-10-03",
      status: "Under Review",
      riskLevel: "medium",
      pages: 24,
      aiScore: 78,
      clauses: {
        total: 42,
        reviewed: 42,
        flagged: 3,
      },
      keyFindings: [
        { type: "risk", text: "Termination clause: 90-day notice required (industry standard: 60 days)" },
        { type: "risk", text: "Liability cap: $500K (recommend: $1M for contract size)" },
        { type: "risk", text: "Auto-renewal clause without price cap" },
        { type: "ok", text: "Payment terms: Net 30 (standard)" },
        { type: "ok", text: "Force majeure clause comprehensive" },
      ],
      summary: "Standard vendor agreement with moderate risk factors. Main concerns: longer termination notice period and limited liability cap.",
    },
    {
      id: "contract-002",
      name: "Service Level Agreement - IT",
      vendor: "TechServices Pro",
      uploadDate: "2025-10-05",
      status: "Pending Upload",
      riskLevel: "low",
      pages: 18,
      aiScore: 92,
      clauses: {
        total: 28,
        reviewed: 28,
        flagged: 1,
      },
      keyFindings: [
        { type: "risk", text: "SLA guarantees: 99.5% uptime (competitive: 99.9%)" },
        { type: "ok", text: "Response times: well-defined and reasonable" },
        { type: "ok", text: "Penalty structure: fair and proportional" },
        { type: "ok", text: "Data protection: GDPR compliant" },
      ],
      summary: "Well-structured SLA with minimal risk. Uptime guarantee slightly below industry best practice but acceptable.",
    },
  ];

  const selectedContractData = contracts.find((c) => c.id === selectedContract);

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

      if (lower.includes("termination") || lower.includes("notice")) {
        aiResponse.text = "The Vendor Supply Agreement has a 90-day termination notice requirement, which is longer than the industry standard of 60 days. This could limit flexibility if you need to switch vendors quickly. I recommend negotiating this down to 60 days.";
      } else if (lower.includes("liability") || lower.includes("cap")) {
        aiResponse.text = "The liability cap is set at $500K, which may be low considering the contract value and potential exposure. Industry best practice for contracts of this size is typically $1M+. This is a moderate risk that should be addressed in negotiations.";
      } else if (lower.includes("risk") || lower.includes("concern")) {
        aiResponse.text = "Main risks identified: 1) 90-day termination notice (longer than standard), 2) $500K liability cap (recommend $1M), 3) Auto-renewal without price protection. All are negotiable items that should be discussed with the vendor.";
      } else if (lower.includes("recommend") || lower.includes("suggest")) {
        aiResponse.text = "My recommendations: 1) Negotiate termination notice to 60 days, 2) Increase liability cap to $1M, 3) Add annual price cap of 3-5% for auto-renewals, 4) Consider adding performance metrics tied to renewals.";
      } else {
        aiResponse.text = `I understand you're asking about: "${input}". Try asking about specific clauses like termination, liability, risks, or request recommendations for contract improvements.`;
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
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-white text-lg">Contract Review AI</h2>
              <p className="text-gray-400 text-sm">Intelligent contract analysis</p>
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
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400 text-gray-400"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Review Workspace
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400 text-gray-400"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Workspace Tab */}
          <TabsContent value="space" className="flex-1 overflow-hidden m-0">
            <div className="h-full flex flex-col lg:flex-row">
              {/* Left: Contract List */}
              <div className="lg:w-80 border-r border-white/10 flex flex-col bg-white/[0.01]">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white mb-3">Active Contracts</h3>
                  <button className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all text-sm flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload New Contract
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {contracts.map((contract) => (
                    <div
                      key={contract.id}
                      onClick={() => setSelectedContract(contract.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedContract === contract.id
                          ? "bg-indigo-500/20 border-indigo-500/40"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                      }`}
                    >
                      <h4 className="text-white text-sm mb-2">{contract.name}</h4>
                      <p className="text-gray-400 text-xs mb-3">{contract.vendor}</p>
                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            contract.riskLevel === "low"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : contract.riskLevel === "medium"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {contract.riskLevel} risk
                        </Badge>
                        <span className="text-white text-sm">{contract.aiScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Contract Details */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {selectedContractData ? (
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h2 className="text-white text-xl mb-2">{selectedContractData.name}</h2>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-gray-400">Vendor: <span className="text-white">{selectedContractData.vendor}</span></span>
                        <span className="text-gray-400">Pages: <span className="text-white">{selectedContractData.pages}</span></span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          {selectedContractData.status}
                        </Badge>
                      </div>
                    </div>

                    {/* AI Analysis Score */}
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white mb-1">AI Compliance Score</h3>
                          <p className="text-gray-400 text-sm">Based on {selectedContractData.clauses.total} clauses analyzed</p>
                        </div>
                        <div className="text-4xl text-indigo-400">{selectedContractData.aiScore}%</div>
                      </div>
                    </div>

                    {/* Clause Summary */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-xs mb-1">Total Clauses</p>
                        <p className="text-white text-2xl">{selectedContractData.clauses.total}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                        <p className="text-green-400 text-xs mb-1">Reviewed</p>
                        <p className="text-white text-2xl">{selectedContractData.clauses.reviewed}</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                        <p className="text-yellow-400 text-xs mb-1">Flagged</p>
                        <p className="text-white text-2xl">{selectedContractData.clauses.flagged}</p>
                      </div>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 md:p-6">
                      <h3 className="text-white mb-4">Key Findings</h3>
                      <div className="space-y-3">
                        {selectedContractData.keyFindings.map((finding, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-3 p-3 rounded-lg ${
                              finding.type === "risk"
                                ? "bg-yellow-500/10 border border-yellow-500/30"
                                : "bg-green-500/10 border border-green-500/30"
                            }`}
                          >
                            {finding.type === "risk" ? (
                              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            )}
                            <p className="text-gray-300 text-sm">{finding.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 md:p-6">
                      <h3 className="text-blue-400 mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        AI Summary
                      </h3>
                      <p className="text-gray-300 text-sm">{selectedContractData.summary}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-sm">
                        Approve Contract
                      </button>
                      <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all text-sm">
                        Request Changes
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all text-sm">
                        Download Report
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileCheck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Select a contract to review</p>
                    </div>
                  </div>
                )}
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
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl rounded-tl-sm p-4">
                          <p className="text-indigo-100 text-sm">{message.text}</p>
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
                  placeholder="Ask about contract clauses..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all flex items-center gap-2"
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
