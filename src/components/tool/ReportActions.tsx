import { Download, Printer } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type ReportActionsProps = {
  hasGeneratedReport: boolean;
  onGenerateReport: () => void;
  onPrintReport: () => void;
  onDownloadPdf: () => void;
  onStartNewAssessment: () => void;
  actionState: "idle" | "generating" | "printing" | "downloading";
};

export function ReportActions({
  hasGeneratedReport,
  onGenerateReport,
  onPrintReport,
  onDownloadPdf,
  onStartNewAssessment,
  actionState,
}: ReportActionsProps) {
  const t = useTranslations("tool.results.actions");
  const isGenerating = actionState === "generating";
  const isPrinting = actionState === "printing";
  const isDownloading = actionState === "downloading";

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row" aria-busy={actionState !== "idle"}>
      <Button
        type="button"
        className="min-h-12 flex-1 rounded-2xl bg-[#5C44B7] px-4 text-sm font-semibold text-white shadow-[0_16px_28px_-24px_rgba(68,47,156,0.8)] hover:bg-[#4B3796] focus-visible:ring-[#5C44B7]"
        onClick={onGenerateReport}
        disabled={isGenerating || isPrinting || isDownloading}
        aria-label={t("generateAria")}
      >
        {isGenerating ? t("generating") : t("generate")}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="min-h-12 flex-1 rounded-2xl border-[#B8A5EA] bg-white px-4 text-sm font-semibold text-[#4D3A9C] shadow-[0_12px_22px_-24px_rgba(68,47,156,0.45)] hover:bg-[#FBFAFF] focus-visible:ring-[#5C44B7]"
        disabled={!hasGeneratedReport || isGenerating || isPrinting || isDownloading}
        onClick={onPrintReport}
        aria-label={t("printAria")}
      >
        <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
        {isPrinting ? t("printing") : t("print")}
      </Button>
      <Button
        type="button"
        className="min-h-12 flex-1 rounded-2xl bg-[#244872] px-4 text-sm font-semibold text-white shadow-[0_16px_28px_-24px_rgba(36,72,114,0.72)] hover:bg-[#1A3656] focus-visible:ring-[#244872]"
        disabled={!hasGeneratedReport || isGenerating || isPrinting || isDownloading}
        onClick={onDownloadPdf}
        aria-label={t("downloadAria")}
      >
        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
        {isDownloading ? t("downloading") : t("download")}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="min-h-12 flex-1 rounded-2xl border-[#BFD0E3] bg-white px-4 text-sm font-semibold text-[#244872] shadow-[0_12px_22px_-24px_rgba(36,72,114,0.4)] hover:bg-[#F8FAFF] focus-visible:ring-[#244872]"
        onClick={onStartNewAssessment}
        disabled={isGenerating || isPrinting || isDownloading}
        aria-label={t("startNewAria")}
      >
        {t("startNew")}
      </Button>
    </div>
  );
}