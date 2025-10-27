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
    <div className="fixed inset-0 z-50 bg-background">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-foreground text-lg">RFP Evaluation</h2>
              <p className="text-muted-foreground text-sm">AI-powered proposal analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-accent hover:bg-accent flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "space")} className="flex-1 flex flex-col">
          <div className="border-b border-border bg-secondary px-4">
            <TabsList className="bg-transparent border-0 h-12">
              <TabsTrigger
                value="space"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Evaluation Workspace
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground"
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
              <div className="lg:w-96 border-r border-border flex flex-col">
                <div className="p-4 border-b border-border bg-secondary">
                  <h3 className="text-foreground mb-3">Active Proposals</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-secondary rounded-lg p-2">
                      <p className="text-muted-foreground text-xs">Total</p>
                      <p className="text-foreground">{stats.totalRFPs}</p>
                    </div>
                    <div className="bg-yellow-500/10 rounded-lg p-2">
                      <p className="text-yellow-400 text-xs">Pending</p>
                      <p className="text-foreground">{stats.pending}</p>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-2">
                      <p className="text-green-400 text-xs">Avg Score</p>
                      <p className="text-foreground">{stats.avgScore}%</p>
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
                          ? "bg-primary/20 border-primary/40"
                          : "bg-secondary border-border hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-foreground text-sm flex-1">{rfp.name}</h4>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
                          {rfp.score}%
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2">{rfp.vendor}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">${(rfp.amount / 1000000).toFixed(1)}M</span>
                        <span className="text-muted-foreground">Due: {new Date(rfp.deadline).toLocaleDateString()}</span>
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
                      <h2 className="text-foreground text-xl mb-2">{selectedRFPData.name}</h2>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-muted-foreground">Vendor: <span className="text-foreground">{selectedRFPData.vendor}</span></span>
                        <span className="text-muted-foreground">Amount: <span className="text-foreground">${selectedRFPData.amount.toLocaleString()}</span></span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          {selectedRFPData.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Overall Score */}
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-foreground">Overall AI Score</h3>
                        <span className="text-3xl text-primary">{selectedRFPData.score}%</span>
                      </div>
                      <Progress value={selectedRFPData.score} className="h-3" />
                    </div>

                    {/* Criteria Breakdown */}
                    <div className="bg-secondary border border-border rounded-xl p-4 md:p-6">
                      <h3 className="text-foreground mb-4">Evaluation Criteria</h3>
                      <div className="space-y-4">
                        {Object.entries(selectedRFPData.criteria).map(([key, value]) => (
                          <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-foreground text-sm capitalize">{key}</span>
                              <span className="text-foreground">{value}%</span>
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
                            <li key={i} className="text-foreground text-sm flex items-start gap-2">
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
                            <li key={i} className="text-foreground text-sm flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-success hover:bg-success/90 text-white rounded-lg transition-all text-sm">
                        Approve Proposal
                      </button>
                      <button className="px-4 py-2 bg-accent hover:bg-accent text-foreground rounded-lg transition-all text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Report
                      </button>
                      <button className="px-4 py-2 bg-accent hover:bg-accent text-foreground rounded-lg transition-all text-sm">
                        Request Clarification
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a proposal to view details</p>
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
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tl-sm p-4">
                          <p className="text-foreground text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {message.type === "user" && (
                    <div className="bg-secondary border border-border rounded-xl rounded-tr-sm p-4 max-w-[85%]">
                      <p className="text-foreground text-sm">{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-secondary">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about RFP proposals..."
                  className="flex-1 px-4 py-3 bg-accent border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg transition-all flex items-center gap-2"
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
