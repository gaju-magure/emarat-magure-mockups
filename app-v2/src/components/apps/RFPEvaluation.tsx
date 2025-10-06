import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, LayoutGrid, Send, Sparkles, Briefcase, TrendingUp, Download, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface Message {
  type: "ai" | "user";
  text: string;
}

interface RFPEvaluationProps {
  onClose: () => void;
}

export function RFPEvaluation({ onClose }: RFPEvaluationProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "space">("space");
  const [selectedRFP, setSelectedRFP] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! I'm your RFP Evaluation AI. I've analyzed 3 proposals and scored them based on your criteria. Fuel Supply Q1 2026 leads with 92% compatibility. How can I help you evaluate these proposals?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const rfps = [
    {
      id: "rfp-001",
      name: "Fuel Supply Q1 2026",
      vendor: "Vendor A",
      score: 92,
      status: "Pending Review",
      submittedDate: "2025-09-28",
      deadline: "2025-10-15",
      amount: 2500000,
      criteria: {
        pricing: 95,
        experience: 88,
        compliance: 94,
        timeline: 90,
        innovation: 92,
      },
      strengths: ["Competitive pricing", "Strong compliance record", "Advanced fuel management system"],
      weaknesses: ["Limited regional presence", "No previous work with our company"],
    },
    {
      id: "rfp-002",
      name: "Fleet Maintenance Services",
      vendor: "Vendor B",
      score: 78,
      status: "In Review",
      submittedDate: "2025-09-30",
      deadline: "2025-10-18",
      amount: 850000,
      criteria: {
        pricing: 72,
        experience: 85,
        compliance: 80,
        timeline: 75,
        innovation: 78,
      },
      strengths: ["Extensive experience", "Good safety record", "Local presence"],
      weaknesses: ["Higher pricing than competitors", "Older technology stack"],
    },
    {
      id: "rfp-003",
      name: "IT Infrastructure Upgrade",
      vendor: "Vendor C",
      score: 85,
      status: "Pending Review",
      submittedDate: "2025-10-01",
      deadline: "2025-10-20",
      amount: 1200000,
      criteria: {
        pricing: 88,
        experience: 82,
        compliance: 90,
        timeline: 83,
        innovation: 89,
      },
      strengths: ["Innovative approach", "Strong technical team", "Good pricing"],
      weaknesses: ["Tight timeline", "Less industry-specific experience"],
    },
  ];

  const stats = {
    totalRFPs: 3,
    pending: 2,
    inReview: 1,
    avgScore: 85,
    totalValue: 4550000,
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

      if (lower.includes("fuel") || lower.includes("vendor a")) {
        aiResponse.text = "Vendor A's Fuel Supply proposal scored 92% overall. Key highlights: Excellent pricing (95%), strong compliance (94%), and innovative fuel management system. Main concerns: Limited regional presence and no prior relationship with us. They offer competitive pricing at $2.5M and meet all timeline requirements.";
      } else if (lower.includes("compare") || lower.includes("comparison")) {
        aiResponse.text = "Comparing all 3 proposals: Vendor A (Fuel Supply, 92%) leads with best pricing and compliance. Vendor C (IT Infrastructure, 85%) follows with innovative approach and good value. Vendor B (Fleet Maintenance, 78%) has strong experience but higher costs. Would you like a detailed criteria-by-criteria breakdown?";
      } else if (lower.includes("recommend")) {
        aiResponse.text = "Based on AI analysis, I recommend Vendor A for Fuel Supply (92% score) - they offer the best overall value with competitive pricing and strong compliance. For IT Infrastructure, Vendor C (85%) shows promising innovation despite tight timeline. Fleet Maintenance needs further negotiation on pricing.";
      } else if (lower.includes("pricing") || lower.includes("cost")) {
        aiResponse.text = "Pricing analysis: Vendor A - $2.5M (best value), Vendor C - $1.2M (competitive), Vendor B - $850K (15% above market average). Total RFP value: $4.55M. Vendor A offers 8% cost savings vs. budget.";
      } else {
        aiResponse.text = `I understand you're asking about: "${input}". Try asking me to compare proposals, analyze specific vendors, or provide recommendations.`;
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  const selectedRFPData = rfps.find((r) => r.id === selectedRFP);

  return (
    <div className="fixed inset-0 z-50 bg-[#08111e]/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-white text-lg">RFP Evaluation</h2>
              <p className="text-gray-400 text-sm">AI-powered proposal analysis</p>
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
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-gray-400"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Evaluation Workspace
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-gray-400"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Analysis
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Workspace Tab */}
          <TabsContent value="space" className="flex-1 overflow-hidden m-0">
            <div className="h-full flex flex-col lg:flex-row">
              {/* Left: RFP List */}
              <div className="lg:w-96 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                  <h3 className="text-white mb-3">Active Proposals</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/[0.03] rounded-lg p-2">
                      <p className="text-gray-400 text-xs">Total</p>
                      <p className="text-white">{stats.totalRFPs}</p>
                    </div>
                    <div className="bg-yellow-500/10 rounded-lg p-2">
                      <p className="text-yellow-400 text-xs">Pending</p>
                      <p className="text-white">{stats.pending}</p>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-2">
                      <p className="text-green-400 text-xs">Avg Score</p>
                      <p className="text-white">{stats.avgScore}%</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {rfps.map((rfp) => (
                    <div
                      key={rfp.id}
                      onClick={() => setSelectedRFP(rfp.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRFP === rfp.id
                          ? "bg-green-500/20 border-green-500/40"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white text-sm flex-1">{rfp.name}</h4>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
                          {rfp.score}%
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{rfp.vendor}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">${(rfp.amount / 1000000).toFixed(1)}M</span>
                        <span className="text-gray-500">Due: {new Date(rfp.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {selectedRFPData ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-white text-xl mb-2">{selectedRFPData.name}</h2>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-gray-400">Vendor: <span className="text-white">{selectedRFPData.vendor}</span></span>
                        <span className="text-gray-400">Amount: <span className="text-white">${selectedRFPData.amount.toLocaleString()}</span></span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          {selectedRFPData.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Overall Score */}
                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white">Overall AI Score</h3>
                        <span className="text-3xl text-green-400">{selectedRFPData.score}%</span>
                      </div>
                      <Progress value={selectedRFPData.score} className="h-3" />
                    </div>

                    {/* Criteria Breakdown */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 md:p-6">
                      <h3 className="text-white mb-4">Evaluation Criteria</h3>
                      <div className="space-y-4">
                        {Object.entries(selectedRFPData.criteria).map(([key, value]) => (
                          <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-300 text-sm capitalize">{key}</span>
                              <span className="text-white">{value}%</span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <h4 className="text-green-400 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {selectedRFPData.strengths.map((s, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <h4 className="text-red-400 mb-3 flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Concerns
                        </h4>
                        <ul className="space-y-2">
                          {selectedRFPData.weaknesses.map((w, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-sm">
                        Approve Proposal
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Report
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all text-sm">
                        Request Clarification
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Select a proposal to view details</p>
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
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl rounded-tl-sm p-4">
                          <p className="text-green-100 text-sm">{message.text}</p>
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
                  placeholder="Ask about RFP proposals..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center gap-2"
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
