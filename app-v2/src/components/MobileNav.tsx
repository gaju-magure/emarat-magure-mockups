import { Home, TrendingUp, Grid3x3, CheckSquare, Shield } from "lucide-react";

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function MobileNav({ currentView, onNavigate }: MobileNavProps) {
  const navItems = [
    { icon: TrendingUp, label: "AI", id: "insights" },
    { icon: Home, label: "Home", id: "home" },
    { icon: Grid3x3, label: "Apps", id: "apps" },
    { icon: CheckSquare, label: "Tasks", id: "tasks" },
    { icon: Shield, label: "Gov", id: "governance" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#08111e]/95 backdrop-blur-lg border-t border-white/10 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              currentView === item.id
                ? "text-blue-400"
                : "text-gray-400 active:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}