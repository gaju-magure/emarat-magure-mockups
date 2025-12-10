import { Home, TrendingUp, Grid3x3, CheckSquare, Shield, FileText, Briefcase } from "lucide-react";
import { useTheme } from "../lib/theme";

interface LeftSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenApp: (app: string) => void;
}

export function LeftSidebar({ currentView, onNavigate, onOpenApp }: LeftSidebarProps) {
  const { theme } = useTheme();
  const isAradaTheme = theme?.id === "arada-corporate";
  const navItems = [
    { icon: TrendingUp, label: "Emarat AI", id: "insights" },
    { icon: Home, label: "Dashboard", id: "home" },
    { icon: Grid3x3, label: "Apps", id: "apps" },
    { icon: CheckSquare, label: "Tasks", id: "tasks" },
    // { icon: Shield, label: "Governance", id: "governance" },
  ];

  return (
    <aside className="bg-secondary backdrop-blur-md rounded-xl p-4 overflow-y-auto">
      <nav>
        <h3 className="text-muted-foreground text-sm mb-3 px-2">Navigation</h3>
        <ul className="space-y-1 mb-6">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                currentView === item.id
                  ? isAradaTheme
                    ? "bg-primary text-primary-foreground"
                    : "bg-blue-500/20 text-blue-400"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label === "Emarat AI" && isAradaTheme ? "Arada AI" : item.label}</span>
            </li>
          ))}
        </ul>

        <h4 className="text-muted-foreground text-sm mb-3 px-2">Quick Actions</h4>
        <div className="space-y-2">
          <button
            onClick={() => onOpenApp("invoice")}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-foreground hover:text-foreground rounded-lg transition-all text-left"
          >
            <FileText className="w-4 h-4" />
            <span>Review Invoices</span>
          </button>
          <button
            onClick={() => onOpenApp("rfp")}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-foreground hover:text-foreground rounded-lg transition-all text-left"
          >
            <Briefcase className="w-4 h-4" />
            <span>Open RFPs</span>
          </button>
          <button
            onClick={() => onOpenApp("forecast")}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-foreground hover:text-foreground rounded-lg transition-all text-left"
          >
            <TrendingUp className="w-4 h-4" />
            <span>View Forecast</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
