import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import type { CalculatedScore, SymptomBurdenSummary } from "@/lib/scoring";
import { cn } from "@/lib/utils";

import { ReportActions } from "./ReportActions";

type ResultsSummaryProps = {
  frequencyScore: CalculatedScore | null;
  impactScore: CalculatedScore | null;
  symptomSummary: SymptomBurdenSummary[];
  hasGeneratedReport: boolean;
  scoreError: string | null;
  onGenerateReport: () => void;
  onPrintReport: () => void;
  onDownloadPdf: () => void;
  onStartNewAssessment: () => void;
  actionState: "idle" | "generating" | "printing" | "downloading";
};

function CircularScore({
  score,
  accent,
}: {
  score: number;
  accent: "purple" | "green";
}) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const stroke = accent === "purple" ? "#7C5FE0" : "#84C166";

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#E8EDF7" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold tracking-[-0.04em] text-[#214873]">{score.toFixed(1)}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8B99B4]">/100</p>
      </div>
    </div>
  );
}

function ScoreSummaryCard({
  title,
  score,
  accent,
  answeredText,
}: {
  title: string;
  score: CalculatedScore;
  accent: "purple" | "green";
  answeredText: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#E8EBF7] bg-white p-5 shadow-[0_18px_45px_-34px_rgba(49,67,126,0.25)] sm:p-6">
      <p className="text-sm font-semibold text-[#6F7FB0]">{title}</p>
      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CircularScore score={score.score} accent={accent} />
        <div className="w-full max-w-[18rem]">
          <p className="text-sm leading-6 text-[#5B7392]">{answeredText}</p>
          <div className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8DA0BC]">
            <span>0</span>
            <span>100</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[#EDF1FA]">
            <div
              className={cn(
                "h-2 rounded-full",
                accent === "purple" ? "bg-[#8A73E5]" : "bg-[#8CC36A]",
              )}
              style={{ width: `${score.score}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ResultsSummary({
  frequencyScore,
  impactScore,
  symptomSummary,
  hasGeneratedReport,
  scoreError,
  onGenerateReport,
  onPrintReport,
  onDownloadPdf,
  onStartNewAssessment,
  actionState,
}: ResultsSummaryProps) {
  const t = useTranslations("tool.results");

  return (
    <section
      className="rounded-[32px] border border-[#E5EAF7] bg-white p-6 shadow-[0_24px_55px_-40px_rgba(49,67,126,0.35)] sm:p-8"
      aria-labelledby="results-summary-title"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <h2 id="results-summary-title" className="text-2xl font-bold text-[#1D4273] sm:text-[2rem]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#55708E]">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {hasGeneratedReport && frequencyScore && impactScore ? (
            <>
              <ScoreSummaryCard
                title={t("frequencyScore.title")}
                score={frequencyScore}
                accent="purple"
                answeredText={t("frequencyScore.answered", {
                  answered: frequencyScore.answered,
                  total: frequencyScore.total,
                })}
              />
              <ScoreSummaryCard
                title={t("impactScore.title")}
                score={impactScore}
                accent="green"
                answeredText={t("impactScore.answered", {
                  answered: impactScore.answered,
                  total: impactScore.total,
                })}
              />
            </>
          ) : (
            <div className="md:col-span-2 rounded-[26px] border border-[#E8EBF7] bg-[#FCFDFF] p-5">
              {scoreError ? (
                <div className="flex items-start gap-3 rounded-2xl border border-[#F5D9D2] bg-[#FFF7F4] px-4 py-4 text-[#8A523E]">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <p className="text-sm leading-6">{scoreError}</p>
                </div>
              ) : (
                <p className="text-sm leading-6 text-[#5B7392]">{t("emptyState")}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {hasGeneratedReport && frequencyScore && impactScore ? (
        <div className="mt-8 rounded-[28px] border border-[#E8EBF7] bg-[#FCFDFF] p-5 sm:p-6">
          <h3 className="text-xl font-bold text-[#214873]">{t("symptomSummary.title")}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#58708F]">
            {t("symptomSummary.description")}
          </p>

          <div className="mt-6 space-y-3">
            {symptomSummary.length > 0 ? (
              symptomSummary.map((symptom) => (
                <article
                  key={symptom.id}
                  className="rounded-[24px] border border-[#E6EBF6] bg-white px-4 py-4 shadow-[0_14px_34px_-30px_rgba(49,67,126,0.25)] sm:px-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-base font-semibold text-[#214873]">{symptom.text}</h4>
                    <div className="grid grid-cols-2 gap-3 sm:min-w-[240px]">
                      <div className="rounded-2xl bg-[#F6F2FF] px-3 py-3 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A64C6]">
                          {t("symptomSummary.frequency")}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[#6E55C8]">{symptom.frequency}</p>
                      </div>
                      <div className="rounded-2xl bg-[#F4FAEF] px-3 py-3 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6E9654]">
                          {t("symptomSummary.impact")}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[#6A9A58]">{symptom.impact}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-sm leading-6 text-[#5B7392]">{t("symptomSummary.empty")}</p>
            )}
          </div>
        </div>
      ) : null}

      <div className="mt-8 rounded-[28px] border border-[#E7ECF7] bg-[linear-gradient(180deg,#FAFCFF_0%,#F6F8FD_100%)] px-5 py-5 sm:px-6">
        <p className="text-sm leading-7 text-[#4F6788]">{t("disclaimer")}</p>
      </div>

      <ReportActions
        hasGeneratedReport={hasGeneratedReport}
        onGenerateReport={onGenerateReport}
        onPrintReport={onPrintReport}
        onDownloadPdf={onDownloadPdf}
        onStartNewAssessment={onStartNewAssessment}
        actionState={actionState}
      />
    </section>
  );
}