import { AlertTriangle, ArrowRightCircle, CheckCircle2, ClipboardCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type UnansweredQuestion = {
  id: string;
  text: string;
};

type ReviewAnswersSectionProps = {
  completedCount: number;
  totalCount: number;
  unansweredQuestions: UnansweredQuestion[];
  onJumpToQuestion: (questionId: string) => void;
  showValidationState: boolean;
};

export function ReviewAnswersSection({
  completedCount,
  totalCount,
  unansweredQuestions,
  onJumpToQuestion,
  showValidationState,
}: ReviewAnswersSectionProps) {
  const t = useTranslations("tool.review");
  const allComplete = completedCount === totalCount;

  return (
    <section
      className="rounded-[30px] border border-[#E6EAF7] bg-white p-5 shadow-[0_22px_48px_-38px_rgba(49,67,126,0.28)] sm:p-6"
      aria-labelledby="review-answers-title"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#365FAE]">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 id="review-answers-title" className="text-xl font-bold text-[#183F74]">
                {t("title")}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#59728F]">{t("description")}</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-[24px] border border-[#E4EAF6] bg-[#FBFCFF] px-4 py-4 text-center lg:min-w-[220px]"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A8FB2]">
            {t("completionLabel")}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#214873]">
            {completedCount}/{totalCount}
          </p>
          <p className="mt-1 text-sm font-medium text-[#5E7896]">{t("completionSuffix")}</p>
        </div>
      </div>

      <div className="mt-6">
        {allComplete ? (
          <div className="flex items-start gap-3 rounded-[24px] border border-[#D5E6CB] bg-[#F5FBF1] px-4 py-4 text-[#355D32]">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm leading-6">{t("allComplete")}</p>
          </div>
        ) : (
          <div className="rounded-[24px] border border-[#F0D8C7] bg-[#FFF8F3] px-4 py-4">
            <div className="flex items-start gap-3 text-[#8C5738]">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{t("incompleteTitle")}</p>
                <p className="mt-1 text-sm leading-6">{t("incompleteDescription")}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3" role="list" aria-label={t("unansweredListLabel")}>
              {unansweredQuestions.map((question) => (
                <Button
                  key={question.id}
                  type="button"
                  variant="outline"
                  className="min-h-12 rounded-2xl border-[#DDBAA4] bg-white px-4 text-left text-sm font-semibold text-[#7F4D31] hover:bg-[#FFFBF7]"
                  onClick={() => onJumpToQuestion(question.id)}
                  aria-label={t("jumpToQuestionAria", { question: question.text })}
                >
                  <ArrowRightCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  {question.text}
                </Button>
              ))}
            </div>

            {showValidationState ? (
              <p className="mt-4 text-sm leading-6 text-[#8C5738]">{t("validationNotice")}</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
