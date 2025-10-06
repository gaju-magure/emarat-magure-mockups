import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, TrendingUp, FileText, Users, DollarSign, AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface Message {
  type: "ai" | "user" | "alert";
  text: string;
  card?: any;
  alertType?: "info" | "warning" | "success";
}

interface InsightsProps {
  onOpenApp: (app: string) => void;
}

export function Insights({ onOpenApp }: InsightsProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "alert",
      text: "5 invoices require your review - AI confidence below 75%",
      alertType: "warning",
      card: {
        type: "invoices",
        data: [
          { id: "#4527", vendor: "Acme Corp", amount: "$12,450", issue: "PO mismatch", confidence: "72%" },
          { id: "#4531", vendor: "Global Ltd", amount: "$8,200", issue: "Price variance", confidence: "68%" },
          { id: "#4535", vendor: "Tech Inc", amount: "$15,300", issue: "Duplicate", confidence: "89%" },
        ],
      },
    },
    {
      type: "alert",
      text: "3 RFP proposals are pending your evaluation",
      alertType: "info",
      card: {
        type: "rfps",
        data: [
          { name: "Fuel Supply Q1 2026", vendor: "Vendor A", score: "92%", status: "Pending" },
          { name: "Fleet Maintenance", vendor: "Vendor B", score: "78%", status: "In Review" },
          { name: "IT Infrastructure", vendor: "Vendor C", score: "85%", status: "Pending" },
        ],
      },
    },
    {
      type: "alert",
      text: "Next week's demand forecast shows +5.8% increase on Friday",
      alertType: "success",
      card: {
        type: "forecast",
        data: [
          { day: "Mon", demand: "18.2K L", change: "+2.1%" },
          { day: "Tue", demand: "19.5K L", change: "+3.4%" },
          { day: "Wed", demand: "17.8K L", change: "+1.2%" },
          { day: "Thu", demand: "20.1K L", change: "+4.5%" },
          { day: "Fri", demand: "21.3K L", change: "+5.8%" },
        ],
      },
    },
    {
      type: "ai",
      text: "Hello Gajanand! I'm your Emarat AI Copilot. I've gathered the most important alerts for you today. How can I help you with your operations?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    { text: "Show next week's demand forecast", icon: TrendingUp },
    { text: "Summarize RFPs pending review", icon: FileText },
    { text: "List invoice exceptions this week", icon: DollarSign },
    { text: "Show top performing retail sites", icon: Users },
  ];

  const handleSend = (promptText?: string) => {
    const messageText = promptText || input.trim();
    if (!messageText) return;

    const userMessage: Message = { type: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response with contextual data
    setTimeout(() => {
      let aiResponse: Message = { type: "ai", text: "", card: null };
      const lower = messageText.toLowerCase();

      if (lower.includes("forecast") || lower.includes("demand")) {
        aiResponse.text = "Here's the demand forecast for the next 7 days:";
        aiResponse.card = {
          type: "forecast",
          data: [
            { day: "Mon", demand: "18.2K L", change: "+2.1%" },
            { day: "Tue", demand: "19.5K L", change: "+3.4%" },
            { day: "Wed", demand: "17.8K L", change: "+1.2%" },
            { day: "Thu", demand: "20.1K L", change: "+4.5%" },
            { day: "Fri", demand: "21.3K L", change: "+5.8%" },
          ],
        };
      } else if (lower.includes("rfp") || lower.includes("proposal")) {
        aiResponse.text = "You have 3 RFPs pending review:";
        aiResponse.card = {
          type: "rfps",
          data: [
            { name: "Fuel Supply Q1 2026", vendor: "Vendor A", score: "92%", status: "Pending" },
            { name: "Fleet Maintenance", vendor: "Vendor B", score: "78%", status: "In Review" },
            { name: "IT Infrastructure", vendor: "Vendor C", score: "85%", status: "Pending" },
          ],
        };
      } else if (lower.includes("invoice") || lower.includes("exception")) {
        aiResponse.text = "Found 5 invoice exceptions this week:";
        aiResponse.card = {
          type: "invoices",
          data: [
            { id: "#4527", vendor: "Acme Corp", amount: "$12,450", issue: "PO mismatch", confidence: "72%" },
            { id: "#4531", vendor: "Global Ltd", amount: "$8,200", issue: "Price variance", confidence: "68%" },
            { id: "#4535", vendor: "Tech Inc", amount: "$15,300", issue: "Duplicate", confidence: "89%" },
          ],
        };
      } else if (lower.includes("retail") || lower.includes("performing") || lower.includes("site")) {
        aiResponse.text = "Top 5 performing retail sites (last 30 days):";
        aiResponse.card = {
          type: "sites",
          data: [
            { name: "Dubai Marina", revenue: "$124K", growth: "+8.2%" },
            { name: "Abu Dhabi Downtown", revenue: "$118K", growth: "+7.5%" },
            { name: "Sharjah Central", revenue: "$112K", growth: "+6.8%" },
            { name: "Ajman Beach", revenue: "$98K", growth: "+5.1%" },
            { name: "Fujairah Port", revenue: "$92K", growth: "+4.3%" },
          ],
        };
      } else {
        aiResponse.text = `I understand you're asking about: "${messageText}". Try asking me about forecasts, RFPs, invoices, or retail performance. I can also launch specific apps for you.`;
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderCard = (card: any) => {
    if (!card) return null;

    switch (card.type) {
      case "forecast":
        return (
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 mt-3">
            <div className="space-y-2">
              {card.data.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-300">{item.day}</span>
                  <span className="text-white">{item.demand}</span>
                  <span className="text-green-400 text-sm">{item.change}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onOpenApp("forecast")}
              className="w-full mt-3 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all text-sm"
            >
              View Full Forecast Dashboard
            </button>
          </div>
        );

      case "rfps":
        return (
          <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden mt-3">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03]">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-400">RFP</th>
                  <th className="px-3 py-2 text-left text-gray-400">AI Score</th>
                  <th className="px-3 py-2 text-left text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {card.data.map((item: any, i: number) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-3 py-2 text-white">{item.name}</td>
                    <td className="px-3 py-2">
                      <span className="text-green-400">{item.score}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-400">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => onOpenApp("rfp")}
              className="w-full px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all text-sm"
            >
              Open RFP Evaluation Tool
            </button>
          </div>
        );

      case "invoices":
        return (
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 mt-3 space-y-2">
            {card.data.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-white">{item.id}</span>
                  <span className="text-gray-400 ml-2">{item.vendor}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">{item.amount}</span>
                  <span className="text-yellow-400">{item.confidence}</span>
                </div>
              </div>
            ))}
            <button
              onClick={() => onOpenApp("invoice")}
              className="w-full mt-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-all text-sm"
            >
              Review All Invoices
            </button>
          </div>
        );

      case "sites":
        return (
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 mt-3 space-y-2">
            {card.data.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-white">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">{item.revenue}</span>
                  <span className="text-green-400 text-sm">{item.growth}</span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getAlertIcon = (alertType?: string) => {
    switch (alertType) {
      case "warning":
        return <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />;
      case "success":
        return <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-400" />;
      case "info":
        return <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />;
      default:
        return <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />;
    }
  };

  const getAlertStyle = (alertType?: string) => {
    switch (alertType) {
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "success":
        return "bg-green-500/10 border-green-500/30";
      case "info":
        return "bg-blue-500/10 border-blue-500/30";
      default:
        return "bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/[0.02] backdrop-blur-md rounded-xl">
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "alert" && (
              <div className="w-full">
                <div className={`border rounded-xl p-3 md:p-4 ${getAlertStyle(message.alertType)}`}>
                  <div className="flex items-start gap-2 md:gap-3 mb-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getAlertIcon(message.alertType)}
                    </div>
                    <p className="text-white text-xs md:text-sm flex-1">{message.text}</p>
                  </div>
                  {renderCard(message.card)}
                </div>
              </div>
            )}
            {message.type === "ai" && (
              <div className="flex items-start gap-2 md:gap-3 max-w-[95%] md:max-w-[85%]">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl rounded-tl-sm p-3 md:p-4">
                    <p className="text-blue-100 text-xs md:text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {renderCard(message.card)}
                </div>
              </div>
            )}
            {message.type === "user" && (
              <div className="bg-white/[0.08] border border-white/10 rounded-xl rounded-tr-sm p-3 md:p-4 max-w-[95%] md:max-w-[85%]">
                <p className="text-gray-200 text-xs md:text-sm leading-relaxed">{message.text}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 md:px-6 pb-2 md:pb-3">
        <div className="flex gap-2 flex-wrap overflow-x-auto pb-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt.text)}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-white/[0.05] hover:bg-white/[0.10] active:bg-white/[0.15] border border-white/10 rounded-lg text-xs md:text-sm text-gray-300 hover:text-white transition-all whitespace-nowrap flex-shrink-0"
            >
              <prompt.icon className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{prompt.text}</span>
              <span className="sm:hidden">{prompt.text.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-white/10">
        <div className="flex gap-2 md:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 md:px-6 py-2 md:py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}