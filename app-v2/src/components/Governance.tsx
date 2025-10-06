import { useState } from "react";
import { Database, FileText, AlertTriangle, Shield, Activity } from "lucide-react";

export function Governance() {
  const [activeSection, setActiveSection] = useState("registry");

  const models = [
    {
      name: "Demand Forecast",
      version: "v2.3",
      owner: "Planning",
      accuracy: "94%",
      status: "Live",
      lastUpdated: "Oct 5, 2025",
    },
    {
      name: "RFP Scoring",
      version: "v1.8",
      owner: "Procurement",
      accuracy: "89%",
      status: "Pilot",
      lastUpdated: "Oct 3, 2025",
    },
    {
      name: "Invoice Matching",
      version: "v3.1",
      owner: "Finance",
      accuracy: "92%",
      status: "Live",
      lastUpdated: "Oct 6, 2025",
    },
    {
      name: "Recruitment Screening",
      version: "v1.2",
      owner: "HR",
      accuracy: "87%",
      status: "Pilot",
      lastUpdated: "Oct 1, 2025",
    },
  ];

  const auditLogs = [
    {
      timestamp: "Oct 6, 2025 10:23 AM",
      action: "AI suggested Vendor A (92%)",
      user: "John Smith",
      result: "Approved",
    },
    {
      timestamp: "Oct 6, 2025 09:45 AM",
      action: "Invoice #4527 auto-matched",
      user: "System (AI)",
      result: "Sent for Review",
    },
    {
      timestamp: "Oct 5, 2025 04:12 PM",
      action: "Model retrained - Demand Forecast v2.3",
      user: "Sarah Ahmed",
      result: "Deployed",
    },
    {
      timestamp: "Oct 5, 2025 02:30 PM",
      action: "Invoice #4520 approved",
      user: "Gajanand",
      result: "Approved",
    },
  ];

  const biasReports = [
    {
      model: "Recruitment Screening v1.2",
      issue: "Gender imbalance detected",
      severity: "Medium",
      description: "Last 50 predictions show 72% male candidates",
      date: "Oct 4, 2025",
    },
    {
      model: "RFP Scoring v1.8",
      issue: "Regional bias detected",
      severity: "Low",
      description: "Preference towards UAE-based vendors",
      date: "Oct 2, 2025",
    },
  ];

  const dataDomains = [
    {
      name: "ERP Data",
      sources: ["SAP", "Oracle"],
      connectedModels: ["Invoice Matching", "RFP Scoring"],
      owner: "IT Department",
      lastRefresh: "Oct 6, 2025",
    },
    {
      name: "Sales Data",
      sources: ["POS Systems", "Site Reports"],
      connectedModels: ["Demand Forecast"],
      owner: "Planning",
      lastRefresh: "Oct 6, 2025",
    },
    {
      name: "HR Data",
      sources: ["HRMS", "Applicant Tracking"],
      connectedModels: ["Recruitment Screening"],
      owner: "HR Department",
      lastRefresh: "Oct 5, 2025",
    },
  ];

  const menuItems = [
    { id: "registry", label: "Model Registry", icon: Database },
    { id: "audit", label: "Audit Logs", icon: Activity },
    { id: "bias", label: "Bias & Risk Reports", icon: AlertTriangle },
    { id: "policy", label: "Policy Manager", icon: Shield },
    { id: "data", label: "Data Catalog", icon: FileText },
  ];

  return (
    <div className="h-full overflow-y-auto p-3 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-white mb-2 text-xl md:text-2xl">AI Governance</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Provide visibility and accountability for all AI models, usage, and compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 md:gap-6">
        {/* Left Menu - Horizontal on mobile, vertical on desktop */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4">
          <h3 className="text-gray-400 text-sm mb-3 px-2 hidden lg:block">Governance</h3>
          <nav className="flex lg:flex-col gap-2 lg:space-y-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg transition-all text-left whitespace-nowrap flex-shrink-0 lg:w-full text-sm ${
                  activeSection === item.id
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white active:bg-white/10"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6">
          {activeSection === "registry" && (
            <div>
              <h2 className="text-white mb-4">Model Registry</h2>
              <p className="text-gray-400 text-sm mb-6">
                Complete list of all deployed AI models with performance metrics.
              </p>
              <div className="overflow-hidden rounded-lg border border-white/10">
                <table className="w-full">
                  <thead className="bg-white/[0.03]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-gray-400">Model Name</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-400">Version</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-400">Owner</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-400">Accuracy</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-400">Status</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-400">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {models.map((model, i) => (
                      <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-4 py-3 text-white">{model.name}</td>
                        <td className="px-4 py-3 text-gray-300">{model.version}</td>
                        <td className="px-4 py-3 text-gray-300">{model.owner}</td>
                        <td className="px-4 py-3">
                          <span className="text-green-400">{model.accuracy}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${
                              model.status === "Live"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {model.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{model.lastUpdated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "audit" && (
            <div>
              <h2 className="text-white mb-4">Audit Logs</h2>
              <p className="text-gray-400 text-sm mb-6">
                Chronological record of user & AI actions across the platform.
              </p>
              <div className="space-y-3">
                {auditLogs.map((log, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-white text-sm">{log.action}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          log.result === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : log.result === "Deployed"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {log.result}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{log.user}</span>
                      <span className="text-gray-500">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "bias" && (
            <div>
              <h2 className="text-white mb-4">Bias & Risk Reports</h2>
              <p className="text-gray-400 text-sm mb-6">
                Flagged anomalies and fairness checks across AI models.
              </p>
              <div className="space-y-4">
                {biasReports.map((report, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-yellow-500/30 rounded-lg p-5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white">{report.model}</h3>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${
                              report.severity === "High"
                                ? "bg-red-500/20 text-red-400"
                                : report.severity === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {report.severity} Severity
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{report.issue}</p>
                        <p className="text-sm text-gray-500 mb-3">{report.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{report.date}</span>
                          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "policy" && (
            <div>
              <h2 className="text-white mb-4">Policy Manager</h2>
              <p className="text-gray-400 text-sm mb-6">
                AI use policies, guidelines, and acceptance tracking.
              </p>
              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white mb-1">AI Ethics Guidelines v2.0</h3>
                      <p className="text-sm text-gray-400">Updated: Sep 15, 2025</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded text-xs bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Acceptance Rate:</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "87%" }}></div>
                      </div>
                      <span className="text-sm text-green-400">87%</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm">
                    View Document
                  </button>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white mb-1">Data Privacy Policy</h3>
                      <p className="text-sm text-gray-400">Updated: Aug 20, 2025</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded text-xs bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Acceptance Rate:</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "94%" }}></div>
                      </div>
                      <span className="text-sm text-green-400">94%</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm">
                    View Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "data" && (
            <div>
              <h2 className="text-white mb-4">Data Catalog</h2>
              <p className="text-gray-400 text-sm mb-6">
                Visual map of key data domains connected to AI models.
              </p>
              <div className="space-y-4">
                {dataDomains.map((domain, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-5"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white mb-2">{domain.name}</h3>
                        <div className="flex items-center gap-2">
                          {domain.sources.map((source, j) => (
                            <span
                              key={j}
                              className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Database className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-400 mb-2">Connected Models:</p>
                      <div className="flex flex-wrap gap-2">
                        {domain.connectedModels.map((model, j) => (
                          <span
                            key={j}
                            className="inline-block px-2 py-1 bg-white/[0.05] text-gray-300 rounded text-xs"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Owner: {domain.owner}</span>
                      <span className="text-gray-500">Last refresh: {domain.lastRefresh}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}