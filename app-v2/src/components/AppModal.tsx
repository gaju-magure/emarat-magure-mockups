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
        return <div className="text-white p-6">App not found</div>;
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
      <div className="bg-[#08111e] border border-white/10 rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <h2 className="text-white text-lg md:text-xl">{getAppTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-400" />
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
