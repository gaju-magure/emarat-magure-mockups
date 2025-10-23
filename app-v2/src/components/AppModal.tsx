import { X } from "lucide-react";
import { InvoiceReconciliation } from "./apps/InvoiceReconciliation";
import { RFPEvaluation } from "./apps/RFPEvaluation";
import { DemandForecast } from "./apps/DemandForecast";
import { ContractReview } from "./apps/ContractReview";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  appType: string | null;
}

export function AppModal({ isOpen, onClose, appType }: AppModalProps) {
  if (!isOpen || !appType) return null;

  const renderApp = () => {
    switch (appType) {
      case "invoice":
        return <InvoiceReconciliation />;
      case "rfp":
        return <RFPEvaluation />;
      case "forecast":
        return <DemandForecast />;
      case "contract":
        return <ContractReview />;
      default:
        return <div className="text-foreground p-6">App not found</div>;
    }
  };

  const getAppTitle = () => {
    switch (appType) {
      case "invoice":
        return "Invoice Reconciliation";
      case "rfp":
        return "RFP Evaluation";
      case "forecast":
        return "Demand Forecast";
      case "contract":
        return "Contract Review";
      default:
        return "App";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 md:p-4">
      <div className="bg-background border border-border rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-foreground text-lg md:text-xl">{getAppTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderApp()}
        </div>
      </div>
    </div>
  );
}
