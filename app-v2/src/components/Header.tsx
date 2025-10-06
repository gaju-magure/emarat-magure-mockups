import { Search, Bell, User, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-14 md:h-16 border-b border-white/10 bg-[#08111e]/95 backdrop-blur-md px-3 md:px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm md:text-base">E</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-white text-base md:text-xl">Emarat AI</h1>
          <p className="text-xs text-gray-400 hidden md:block">Your Business Copilot</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-48 xl:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <button className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-gray-400" />
        </button>
        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 px-2 md:px-3 py-2 hover:bg-white/5 rounded-lg transition-colors">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
          <span className="text-white text-sm md:text-base hidden sm:inline">Gajanand</span>
        </button>
      </div>
    </header>
  );
}
