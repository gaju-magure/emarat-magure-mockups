import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { useTheme } from "../lib/theme";

export function RightSidebar() {
  const { theme } = useTheme();
  const isAradaTheme = theme?.id === "arada-corporate";

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
    <aside className="bg-secondary backdrop-blur-md rounded-xl p-4 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            AI Alerts
          </h3>
          <ul className="space-y-2">
            {updates.map((update, i) => {
              const getAlertStyle = () => {
                if (isAradaTheme) {
                  if (update.type === "alert") return "bg-muted border-border hover:bg-muted/80";
                  if (update.type === "success") return "bg-primary border-primary hover:bg-primary/90";
                  return "bg-secondary border-border hover:bg-accent";
                }
                if (update.type === "alert") return "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/15";
                if (update.type === "info") return "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15";
                return "bg-green-500/10 border-green-500/30 hover:bg-green-500/15";
              };

              return (
              <li
                key={i}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${getAlertStyle()}`}
              >
                <p className={`text-sm ${isAradaTheme && update.type === "success" ? "text-primary-foreground" : "text-foreground"}`}>{update.text}</p>
                {update.confidence && (
                  <span className={`inline-block mt-1 text-xs ${isAradaTheme ? "text-foreground" : "text-yellow-400"}`}>
                    Min confidence: {update.confidence}
                  </span>
                )}
              </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            My Tasks
          </h4>
          <ul className="space-y-2">
            {tasks.map((task, i) => (
              <li
                key={i}
                className="p-3 bg-accent hover:bg-muted rounded-lg border border-border transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-border bg-transparent"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground group-hover:text-foreground transition-colors">
                      {task.text}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded capitalize ${
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
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Activity
          </h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>• Document uploaded 2h ago</p>
            <p>• Workflow approved 4h ago</p>
            <p>• Meeting scheduled 1d ago</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
