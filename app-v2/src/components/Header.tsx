import { Search, Bell, User, Menu } from "lucide-react";
import { useTheme } from "../lib/theme";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, mode } = useTheme();

  // Get logo and company name from theme, with fallbacks
  const logoUrl = theme?.branding?.logo?.[mode] || theme?.branding?.logo?.light || "/themes/emarat/emarat-logo.svg";
  const companyName = theme?.branding?.companyName || "Emarat AI";
  const tagline = theme?.branding?.tagline || "Your Business Copilot";

  // Adjust logo size based on theme - MGAI logo needs to be smaller
  const logoHeight = theme?.id === "mgai" ? "h-6 md:h-7" : "h-8 md:h-10";

  return (
    <header className="h-14 md:h-16 border-b border-border bg-card/95 backdrop-blur-md px-3 md:px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <img
          src={logoUrl}
          alt={`${companyName} Logo`}
          className={`${logoHeight} w-auto`}
        />
        <div className="hidden sm:block">
          <h1 className="text-foreground text-base md:text-xl font-semibold">{companyName}</h1>
          <p className="text-xs text-muted-foreground hidden md:block">{tagline}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-48 xl:w-64 pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 px-2 md:px-3 py-2 hover:bg-accent rounded-lg transition-colors">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
          </div>
          <span className="text-foreground text-sm md:text-base hidden sm:inline">Gajanand</span>
        </button>
      </div>
    </header>
  );
}
