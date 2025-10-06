import { FileText, Briefcase, TrendingUp, Users, Camera, Shield, Zap, Clock, MessageSquare, LayoutGrid, ExternalLink, FileCheck } from "lucide-react";
import { Badge } from "./ui/badge";

interface AppsProps {
  onOpenApp: (app: string) => void;
}

export function Apps({ onOpenApp }: AppsProps) {
  const apps = [
    {
      id: "invoice",
      name: "Invoice Reconciliation",
      description: "AI-suggested match between invoice, PO, and GRN. Tracks confidence and routes to reviewers.",
      icon: FileText,
      status: "Live",
      statusColor: "green",
      stats: { accuracy: "94%", processed: "1,247", saved: "120hrs" },
      hasChat: true,
      hasWorkspace: true,
      isExternal: false,
    },
    {
      id: "rfp",
      name: "RFP Evaluation",
      description: "AI ranking of vendor proposals; combines technical and financial scoring.",
      icon: Briefcase,
      status: "Live",
      statusColor: "green",
      stats: { accuracy: "89%", processed: "87", saved: "45hrs" },
      hasChat: true,
      hasWorkspace: true,
      isExternal: false,
    },
    {
      id: "forecast",
      name: "Demand Forecasting",
      description: "Forecast oil & gas demand, site-level sales prediction with explainability.",
      icon: TrendingUp,
      status: "Live",
      statusColor: "green",
      stats: { accuracy: "94%", locations: "42", updated: "Daily" },
      hasChat: true,
      hasWorkspace: false,
      isExternal: true,
    },
    {
      id: "contract",
      name: "Contract Review AI",
      description: "Intelligent analysis of contracts, clause extraction, and risk assessment.",
      icon: FileCheck,
      status: "Live",
      statusColor: "green",
      stats: { accuracy: "92%", processed: "45", saved: "67hrs" },
      hasChat: true,
      hasWorkspace: true,
      isExternal: false,
    },
    {
      id: "recruitment",
      name: "AI Recruitment",
      description: "Screening, fit analysis, and interview recommendations.",
      icon: Users,
      status: "Pilot",
      statusColor: "blue",
      stats: { accuracy: "87%", candidates: "156", saved: "28hrs" },
      hasChat: false,
      hasWorkspace: false,
      isExternal: false,
    },
    {
      id: "fleet",
      name: "Fleet Recognition",
      description: "Detects vehicle types and plate numbers at depots using Computer Vision.",
      icon: Camera,
      status: "Planned",
      statusColor: "gray",
      stats: { accuracy: "N/A", processed: "0", saved: "N/A" },
      hasChat: false,
      hasWorkspace: false,
      isExternal: false,
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-3 md:p-6">
      <div className="mb-4 md:mb-8">
        <h1 className="text-white mb-2 text-xl md:text-2xl">AI Application Suite</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Each app features AI Chat for intelligent assistance. Advanced apps include dedicated Workspaces or external platforms for complex operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <app.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1 text-sm md:text-base">{app.name}</h3>
                  <span
                    className={`inline-block px-2 py-0.5 md:py-1 text-xs rounded ${
                      app.statusColor === "green"
                        ? "bg-green-500/20 text-green-400"
                        : app.statusColor === "blue"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3 leading-relaxed">
              {app.description}
            </p>

            {/* Features */}
            <div className="flex gap-2 mb-3 md:mb-4 flex-wrap">
              {app.hasChat && (
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  AI Chat
                </Badge>
              )}
              {app.hasWorkspace && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                  <LayoutGrid className="w-3 h-3 mr-1" />
                  Workspace
                </Badge>
              )}
              {app.isExternal && (
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Advanced Platform
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
              {Object.entries(app.stats).map(([key, value], i) => (
                <div key={i} className="bg-white/[0.03] rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500 mb-1 capitalize">{key}</p>
                  <p className="text-xs md:text-sm text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onOpenApp(app.id)}
                disabled={app.status === "Planned"}
                className={`flex-1 px-3 md:px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm ${
                  app.status === "Planned"
                    ? "bg-gray-500/20 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                }`}
              >
                <Zap className="w-4 h-4" />
                {app.status === "Planned" ? "Coming Soon" : "Open"}
              </button>
              <button className="px-3 md:px-4 py-2 bg-white/[0.05] hover:bg-white/[0.10] active:bg-white/[0.15] text-gray-300 hover:text-white rounded-lg transition-all">
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-400 mb-1">Live Applications</p>
          <p className="text-xl md:text-2xl text-white">4</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-400 mb-1">With AI Chat</p>
          <p className="text-xl md:text-2xl text-white">4</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-400 mb-1">Total Processed</p>
          <p className="text-xl md:text-2xl text-white">1,379</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-400 mb-1">Time Saved</p>
          <p className="text-xl md:text-2xl text-white">232hrs</p>
        </div>
      </div>
    </div>
  );
}