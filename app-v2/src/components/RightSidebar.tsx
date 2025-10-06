import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export function RightSidebar() {
  const updates = [
    { text: "5 invoices need review (AI <75%)", confidence: "72%", type: "alert" },
    { text: "3 RFP proposals pending evaluation", type: "info" },
    { text: "Demand forecast: +5.8% on Friday", type: "success" },
  ];

  const tasks = [
    { text: "Approve Invoice #4527", priority: "high" },
    { text: "Review Vendor A proposal", priority: "medium" },
    { text: "Update forecasting model", priority: "low" },
  ];

  return (
    <aside className="bg-white/[0.02] backdrop-blur-md rounded-xl p-4 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-gray-300 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            AI Alerts
          </h3>
          <ul className="space-y-2">
            {updates.map((update, i) => (
              <li
                key={i}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  update.type === "alert"
                    ? "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/15"
                    : update.type === "info"
                    ? "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15"
                    : "bg-green-500/10 border-green-500/30 hover:bg-green-500/15"
                }`}
              >
                <p className="text-sm text-gray-300">{update.text}</p>
                {update.confidence && (
                  <span className="inline-block mt-1 text-xs text-yellow-400">
                    Min confidence: {update.confidence}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-gray-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            My Tasks
          </h4>
          <ul className="space-y-2">
            {tasks.map((task, i) => (
              <li
                key={i}
                className="p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/5 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-gray-600 bg-transparent"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {task.text}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                        task.priority === "high"
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
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-gray-300 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Activity
          </h4>
          <div className="space-y-2 text-xs text-gray-500">
            <p>• Document uploaded 2h ago</p>
            <p>• Workflow approved 4h ago</p>
            <p>• Meeting scheduled 1d ago</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
