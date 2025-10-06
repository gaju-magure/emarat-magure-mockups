import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Send, Sparkles, TrendingUp, ExternalLink, BarChart3, Calendar } from "lucide-react";

interface Message {
  type: "ai" | "user";
  text: string;
}

interface DemandForecastProps {
  onClose: () => void;
}

export function DemandForecast({ onClose }: DemandForecastProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! I'm your Demand Forecast AI assistant. I can help you understand demand patterns, analyze forecasts, and answer questions about predicted trends. For advanced modeling and scenario planning, you can launch the full Forecast Analytics Platform.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickInsights = [
    { label: "Next Week Trend", value: "+5.8%", color: "green" },
    { label: "Peak Day", value: "Friday", color: "blue" },
    { label: "Confidence", value: "94%", color: "purple" },
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

      if (lower.includes("next week") || lower.includes("forecast")) {
        aiResponse.text = "Next week's forecast shows steady growth: Monday 18.2K L (+2.1%), Tuesday 19.5K L (+3.4%), Wednesday 17.8K L (+1.2%), Thursday 20.1K L (+4.5%), Friday 21.3K L (+5.8%). Friday is expected to be the peak day. Overall confidence: 94%.";
      } else if (lower.includes("why") || lower.includes("reason")) {
        aiResponse.text = "The Friday peak is driven by historical patterns showing increased fuel purchases before weekends, especially ahead of the holiday season. Weather forecasts also indicate favorable conditions for increased travel.";
      } else if (lower.includes("risk") || lower.includes("concern")) {
        aiResponse.text = "Key risks to monitor: 1) Weather disruptions (20% probability), 2) Supply chain delays (15% probability), 3) Price volatility (10% probability). The model accounts for these factors with 94% confidence in base scenario.";
      } else if (lower.includes("compare") || lower.includes("last")) {
        aiResponse.text = "Compared to last week, we're seeing a 4.2% increase in overall demand. This aligns with seasonal trends and historical Q4 patterns. The growth is consistent across all major regions.";
      } else {
        aiResponse.text = `I understand you're asking about: "${input}". Try asking about next week's forecast, peak days, risks, or comparisons. For detailed scenario modeling, use the Advanced Analytics platform.`;
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  const handleLaunchExternal = () => {
    // Simulate launching external app
    const externalUrl = "https://forecast-analytics.emaratai.com";
    window.open(externalUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08111e]/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-white text-lg">Demand Forecast AI</h2>
              <p className="text-gray-400 text-sm">Predictive analytics assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Quick Insights Banner */}
        <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border-b border-white/10 p-4">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {quickInsights.map((insight, i) => (
              <div key={i} className="text-center">
                <p className="text-gray-400 text-xs mb-1">{insight.label}</p>
                <p className={`text-${insight.color}-400 text-lg`}>{insight.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* External App Notice */}
        <div className="bg-purple-500/10 border-b border-purple-500/30 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-white text-sm mb-1">Advanced Forecast Analytics Available</h3>
                <p className="text-gray-400 text-xs mb-3">
                  For complex scenario modeling, Monte Carlo simulations, and custom forecasting models, launch the full Analytics Platform.
                </p>
                <button
                  onClick={handleLaunchExternal}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all text-sm flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Advanced Analytics
                </button>
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
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl rounded-tl-sm p-4">
                      <p className="text-purple-100 text-sm">{message.text}</p>
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

        {/* Quick Actions */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { type: "user", text: "Show next week forecast" },
                ]);
                handleSend();
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all flex items-center gap-2"
            >
              <Calendar className="w-3 h-3" />
              Next Week
            </button>
            <button
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { type: "user", text: "What are the key risks?" },
                ]);
                handleSend();
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all"
            >
              Risk Analysis
            </button>
            <button
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { type: "user", text: "Compare with last week" },
                ]);
                handleSend();
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 transition-all"
            >
              Compare Trends
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
              placeholder="Ask about demand forecasts..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
