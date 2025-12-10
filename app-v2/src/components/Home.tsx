import { TrendingUp, AlertCircle, CheckCircle2, Target, FileText, Briefcase, MessageSquare } from "lucide-react";
import { useTheme } from "../lib/theme";

interface HomeProps {
  onOpenApp: (app: string) => void;
}

export function Home({ onOpenApp }: HomeProps) {
  const { theme } = useTheme();
  const isAradaTheme = theme?.id === "arada-corporate";
  const kpis = [
    { label: "Fuel Sales (MTD)", value: "12.4M L", change: "+5.2%", positive: true, icon: TrendingUp },
    { label: "AP Aging", value: "48 hrs", change: "-12%", positive: true, icon: AlertCircle },
    { label: "Forecast Accuracy", value: "94.2%", change: "+3%", positive: true, icon: Target },
    { label: "HR Open Positions", value: "8 days", change: "-2d", positive: true, icon: CheckCircle2 },
  ];

  const pilots = [
    { name: "Invoice Reconciliation", status: "Live", roi: "+5%", color: "green" },
    { name: "Demand Forecasting", status: "In Validation", roi: "TBD", color: "yellow" },
    { name: "RFP Evaluation", status: "Pilot Stage", roi: "+3%", color: "blue" },
  ];

  const tasks = [
    { text: "Approve Invoice #4527", department: "Finance", priority: "high" },
    { text: "Review Vendor A Proposal", department: "Procurement", priority: "medium" },
    { text: "Interview Candidate - Ops Manager", department: "HR", priority: "low" },
  ];

  const appShortcuts = [
    { name: "Emarat AI Chat", icon: MessageSquare, app: "insights", color: "indigo" },
    { name: "Invoice Reconciliation", icon: FileText, app: "invoice", color: "blue" },
    { name: "RFP Evaluation", icon: Briefcase, app: "rfp", color: "green" },
    { name: "Demand Forecast", icon: TrendingUp, app: "forecast", color: "purple" },
  ];

  return (
    <div className="h-full overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="mb-4 md:mb-8">
        <h1 className="text-foreground mb-2 text-xl md:text-2xl">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm md:text-base">Monitor your key metrics and operations at a glance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-secondary backdrop-blur-md border border-border rounded-xl p-3 md:p-5 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <kpi.icon className={`w-4 h-4 md:w-5 md:h-5 ${isAradaTheme ? "text-primary" : "text-blue-400"}`} />
              <span
                className={`text-xs px-2 py-0.5 md:py-1 rounded ${
                  isAradaTheme
                    ? kpi.positive ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
                    : kpi.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {kpi.change}
              </span>
            </div>
            <p className="text-lg md:text-2xl text-foreground mb-1">{kpi.value}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Active Pilots */}
        <div className="bg-secondary backdrop-blur-md border border-border rounded-xl p-4 md:p-5">
          <h3 className="text-foreground mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
            <Target className={`w-4 h-4 md:w-5 md:h-5 ${isAradaTheme ? "text-primary" : "text-purple-400"}`} />
            Active Pilots
          </h3>
          <div className="space-y-2 md:space-y-3">
            {pilots.map((pilot, i) => (
              <div
                key={i}
                className="bg-white/[0.03] rounded-lg p-2 md:p-3 border border-white/5 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-1 md:mb-2">
                  <p className="text-xs md:text-sm text-foreground">{pilot.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                      isAradaTheme
                        ? pilot.color === "green"
                          ? "bg-primary text-primary-foreground"
                          : pilot.color === "yellow"
                          ? "bg-muted text-foreground border border-border"
                          : "bg-foreground text-background"
                        : pilot.color === "green"
                        ? "bg-green-500/20 text-green-400"
                        : pilot.color === "yellow"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {pilot.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">ROI: {pilot.roi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks */}
        <div className="bg-secondary backdrop-blur-md border border-border rounded-xl p-4 md:p-5">
          <h3 className="text-foreground mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
            <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 ${isAradaTheme ? "text-primary" : "text-blue-400"}`} />
            My Tasks
          </h3>
          <div className="space-y-2 md:space-y-3">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="bg-white/[0.03] rounded-lg p-2 md:p-3 border border-white/5 hover:bg-white/[0.06] transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2 mb-1 md:mb-2">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-gray-600 bg-transparent"
                  />
                  <p className={`text-xs md:text-sm text-foreground flex-1 transition-colors ${
                    isAradaTheme ? "group-hover:text-primary" : "group-hover:text-blue-400"
                  }`}>
                    {task.text}
                  </p>
                </div>
                <div className="flex items-center justify-between pl-6">
                  <span className="text-xs text-muted-foreground">{task.department}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded capitalize ${
                      isAradaTheme
                        ? "bg-primary text-primary-foreground"
                        : task.priority === "high"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copilot Quick Access */}
        <div className={`rounded-xl p-4 md:p-5 ${
          isAradaTheme ? "bg-secondary border border-border" : "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30"
        }`}>
          <h3 className="text-foreground mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
            <MessageSquare className={`w-4 h-4 md:w-5 md:h-5 ${isAradaTheme ? "text-primary" : "text-blue-400"}`} />
            {isAradaTheme ? "Arada AI" : "Emarat AI"}
          </h3>
          <p className="text-xs md:text-sm text-foreground mb-3 md:mb-4">
            Your AI copilot for operations, insights, and process automation.
          </p>
          <button
            onClick={() => onOpenApp("insights")}
            className={`w-full px-4 py-2 md:py-3 rounded-lg transition-all text-sm md:text-base ${
              isAradaTheme
                ? "bg-secondary border border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                : "bg-primary hover:bg-primary-hover text-primary-foreground"
            }`}
          >
            {isAradaTheme ? "Open Arada AI" : "Open Emarat AI"}
          </button>
        </div>
      </div>

      {/* App Shortcuts Grid */}
      <div>
        <h3 className="text-foreground mb-3 md:mb-4 text-base md:text-lg">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {appShortcuts.map((shortcut, i) => {
            const getIconBgColor = () => {
              if (isAradaTheme) return "bg-primary/10 border border-primary/20";
              if (shortcut.color === "indigo") return "bg-indigo-500/20";
              if (shortcut.color === "blue") return "bg-blue-500/20";
              if (shortcut.color === "green") return "bg-green-500/20";
              if (shortcut.color === "purple") return "bg-purple-500/20";
              return "bg-blue-500/20";
            };
            const getIconColor = () => {
              if (isAradaTheme) return "text-primary";
              if (shortcut.color === "indigo") return "text-indigo-400";
              if (shortcut.color === "blue") return "text-blue-400";
              if (shortcut.color === "green") return "text-green-400";
              if (shortcut.color === "purple") return "text-purple-400";
              return "text-blue-400";
            };
            return (
            <button
              key={i}
              onClick={() => onOpenApp(shortcut.app)}
              className="bg-secondary backdrop-blur-md border border-border rounded-xl p-4 md:p-6 hover:bg-white/[0.04] hover:border-border active:bg-white/[0.06] transition-all group text-center"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform ${getIconBgColor()}`}
              >
                <shortcut.icon className={`w-5 h-5 md:w-6 md:h-6 ${getIconColor()}`} />
              </div>
              <p className={`text-xs md:text-sm text-foreground transition-colors ${
                isAradaTheme ? "group-hover:text-primary" : "group-hover:text-blue-400"
              }`}>
                {shortcut.name === "Emarat AI Chat" && isAradaTheme ? "Arada AI Chat" : shortcut.name}
              </p>
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}