import { useState } from "react";
import { Header } from "./components/Header";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { MobileNav } from "./components/MobileNav";
import { Home } from "./components/Home";
import { Insights } from "./components/Insights";
import { Apps } from "./components/Apps";
import { Tasks } from "./components/Tasks";
import { Governance } from "./components/Governance";
import { Sheet, SheetContent } from "./components/ui/sheet";

// Import dedicated app components
import { InvoiceReconciliation } from "./components/apps/InvoiceReconciliation";
import { RFPEvaluation } from "./components/apps/RFPEvaluation";
import { DemandForecast } from "./components/apps/DemandForecast";
import { ContractReview } from "./components/apps/ContractReview";

export default function App() {
  const [currentView, setCurrentView] = useState("insights");
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const handleOpenApp = (app: string) => {
    if (app === "insights") {
      setCurrentView("insights");
    } else {
      setCurrentApp(app);
    }
  };

  const handleCloseApp = () => {
    setCurrentApp(null);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setLeftSidebarOpen(false);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case "home":
        return <Home onOpenApp={handleOpenApp} />;
      case "insights":
        return <Insights onOpenApp={handleOpenApp} />;
      case "apps":
        return <Apps onOpenApp={handleOpenApp} />;
      case "tasks":
        return <Tasks onOpenApp={handleOpenApp} />;
      case "governance":
        return <Governance />;
      default:
        return <Home onOpenApp={handleOpenApp} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08111e] via-[#0b1a2b] to-[#08111e]">
      <Header onMenuClick={() => setLeftSidebarOpen(true)} />
      
      {/* Mobile Left Sidebar */}
      <Sheet open={leftSidebarOpen} onOpenChange={setLeftSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 bg-[#08111e] border-white/10">
          <LeftSidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenApp={handleOpenApp}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px] gap-4 p-2 md:p-4 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] pb-20 md:pb-4">
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:block">
          <LeftSidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenApp={handleOpenApp}
          />
        </aside>
        
        {/* Main Content */}
        <main className="h-full overflow-hidden bg-white/[0.02] backdrop-blur-md rounded-xl">
          {renderMainContent()}
        </main>
        
        {/* Desktop Right Sidebar */}
        <aside className="hidden xl:block">
          <RightSidebar />
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Dedicated App Screens */}
      {currentApp === "invoice" && <InvoiceReconciliation onClose={handleCloseApp} />}
      {currentApp === "rfp" && <RFPEvaluation onClose={handleCloseApp} />}
      {currentApp === "forecast" && <DemandForecast onClose={handleCloseApp} />}
      {currentApp === "contract" && <ContractReview onClose={handleCloseApp} />}
    </div>
  );
}
