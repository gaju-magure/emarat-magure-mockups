import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Send, Sparkles, Users, ExternalLink, BarChart3, TrendingUp, MapPin } from "lucide-react";

interface Message {
  type: "ai" | "user";
  text: string;
}

interface CustomerInsightsProps {
  onClose: () => void;
}

export function CustomerInsights({ onClose }: CustomerInsightsProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! I'm your Customer Insights AI. I can help you understand customer behavior, analyze spending patterns, and identify trends. For advanced customer segmentation and predictive modeling, launch the full Customer Analytics Platform.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickStats = [
    { label: "Active Customers", value: "12,345", trend: "+8.2%", color: "blue" },
    { label: "Avg Transaction", value: "AED 245", trend: "+3.1%", color: "green" },
    { label: "Loyalty Members", value: "8,234", trend: "+12.5%", color: "purple" },
  ];

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

      if (lower.includes("top") || lower.includes("best") || lower.includes("customer")) {
        aiResponse.text = "Top 5 customer segments by revenue: 1) Fleet Operators (35%), 2) Commercial Vehicles (28%), 3) Retail Consumers (22%), 4) Government Contracts (10%), 5) Others (5%). Fleet Operators show highest loyalty with 94% retention rate.";
      } else if (lower.includes("trend") || lower.includes("growth")) {
        aiResponse.text = "Customer growth trends: +8.2% active customers this quarter, driven primarily by loyalty program expansion (+12.5%). Average transaction value increased 3.1% to AED 245. Weekend traffic up 15% compared to weekdays.";
      } else if (lower.includes("churn") || lower.includes("retention")) {
        aiResponse.text = "Churn analysis: Overall retention rate is 87%. At-risk customers identified: 234 (1.9%) showing decreased frequency. Loyalty members have 94% retention vs 78% for non-members. Recommendation: Target at-risk segment with personalized offers.";
      } else if (lower.includes("location") || lower.includes("site") || lower.includes("where")) {
        aiResponse.text = "Top performing locations: 1) Dubai Marina (18% of revenue), 2) Sheikh Zayed Road (15%), 3) Business Bay (12%). Peak hours: 7-9 AM and 5-7 PM. Weekend performance strongest in residential areas.";
      } else {
        aiResponse.text = `I understand you're asking about: "${input}". Try asking about top customers, growth trends, churn analysis, or location performance. For detailed cohort analysis and predictive modeling, use the Advanced Analytics platform.`;
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  const handleLaunchExternal = () => {
    // Simulate launching external analytics platform
    const externalUrl = "https://customer-analytics.emaratai.com";
    window.open(externalUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08111e]/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-white text-lg">Customer Insights AI</h2>
              <p className="text-gray-400 text-sm">Behavioral analytics assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-b border-white/10 p-4">
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {quickStats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                <p className={`text-${stat.color}-400 text-lg mb-1`}>{stat.value}</p>
                <p className="text-green-400 text-xs">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* External Platform Notice */}
        <div className="bg-cyan-500/10 border-b border-cyan-500/30 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-white text-sm mb-1">Advanced Customer Analytics Platform</h3>
                <p className="text-gray-400 text-xs mb-3">
                  For customer segmentation, cohort analysis, lifetime value modeling, and predictive churn analysis, access the full Analytics Platform with Power BI integration.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleLaunchExternal}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Launch Advanced Platform
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all text-sm">
                    View Tutorial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "ai" && (
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl rounded-tl-sm p-4">
                      <p className="text-cyan-100 text-sm">{message.text}</p>
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

        {/* Quick Prompts */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setInput("Who are our top customer segments?");
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all flex items-center gap-2"
            >
              <Users className="w-3 h-3" />
              Top Segments
            </button>
            <button
              onClick={() => {
                setInput("Show growth trends");
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-3 h-3" />
              Growth Trends
            </button>
            <button
              onClick={() => {
                setInput("Analyze location performance");
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all flex items-center gap-2"
            >
              <MapPin className="w-3 h-3" />
              Locations
            </button>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about customer insights..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
