import { CheckCircle2, CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import type { QuestionResponse, QuestionnaireQuestion, QuestionnaireScale } from "@/types/questionnaire";
import { cn } from "@/lib/utils";

type SymptomCardProps = {
  index: number;
  question: QuestionnaireQuestion;
  response: QuestionResponse;
  showValidationState: boolean;
  onResponseChange: (
    questionId: string,
    field: keyof QuestionResponse,
    value: number,
  ) => void;
};

function ScaleSelector({
  questionId,
  field,
  label,
  scale,
  selectedValue,
  onChange,
}: {
  questionId: string;
  field: keyof QuestionResponse;
  label: string;
  scale: QuestionnaireScale;
  selectedValue?: number;
  onChange: (questionId: string, field: keyof QuestionResponse, value: number) => void;
}) {
  const isSmiley = scale.style === "smiley-3";
  const groupId = `${questionId}-${field}-group`;

  return (
    <fieldset role="radiogroup" aria-labelledby={`${groupId}-legend`}>
      <legend className={cn(
        "mb-2 text-[11px] font-semibold uppercase tracking-[0.12em]",
        field === "frequency" ? "text-[#8B80BF]" : "text-[#7CA45F]",
      )} id={`${groupId}-legend`}>
        {label}
      </legend>
      <div className={cn("flex flex-wrap items-center gap-2", isSmiley ? "justify-start" : "justify-start")}>
        {scale.options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={`${questionId}-${field}-${option.value}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${label}: ${option.label}`}
              data-field={field}
              data-selected={isSelected ? "true" : "false"}
              onClick={() => onChange(questionId, field, option.value)}
              className={cn(
                "group inline-flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-11 sm:w-11",
                field === "frequency"
                  ? isSelected
                    ? "border-[#7156C9] bg-[#ECE6FF] text-[#4E359D] shadow-[0_10px_18px_-16px_rgba(78,53,157,0.9)] focus-visible:ring-[#5C44B7]"
                    : "border-[#CFC5F2] text-[#58488D] hover:border-[#A693E7] hover:bg-[#FBFAFF] focus-visible:ring-[#5C44B7]"
                  : isSelected
                    ? "border-[#7CAB4E] bg-[#EAF6DF] text-[#395C2A] shadow-[0_10px_18px_-16px_rgba(57,92,42,0.8)] focus-visible:ring-[#395C2A]"
                    : "border-[#C7DCB1] text-[#4C6E40] hover:border-[#9DC376] hover:bg-[#FAFDF8] focus-visible:ring-[#395C2A]",
              )}
            >
              {option.icon ? (
                <span className="text-base leading-none sm:text-lg" aria-hidden="true">{option.icon}</span>
              ) : (
                <span aria-hidden="true">{option.value + 1}</span>
              )}
              <span className="sr-only">{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function SymptomCard({
  index,
  question,
  response,
  showValidationState,
  onResponseChange,
}: SymptomCardProps) {
  const t = useTranslations("tool.questionnaire.validation");
  const isComplete = response.frequency !== undefined && response.impact !== undefined;
  const questionId = `question-${question.id}`;
  const validationId = `${questionId}-validation`;

  return (
    <article className={cn(
      "rounded-[28px] border bg-white px-4 py-4 shadow-[0_18px_40px_-34px_rgba(49,67,126,0.28)] sm:px-5 sm:py-5 lg:px-6 lg:py-6",
      isComplete
        ? "border-[#D5E6CB]"
        : showValidationState
          ? "border-[#D9A98E] ring-1 ring-[#D9A98E]/50"
          : "border-[#EEF1FA]",
    )} id={questionId} tabIndex={-1} aria-labelledby={`${questionId}-title`} aria-describedby={validationId}>
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6 xl:grid-cols-[minmax(220px,1fr)_minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
        <div className="lg:col-span-2 xl:col-span-1 xl:pr-2">
          <div className="flex items-center justify-between gap-3 sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8CA0BC]">
              {index}
            </p>
            <p className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
              isComplete ? "bg-[#EEF8E6] text-[#355D32]" : "bg-[#FFF4EA] text-[#8A523E]",
            )}>
              {isComplete ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />}
              {isComplete ? t("complete") : t("incomplete")}
            </p>
          </div>
          <p id={`${questionId}-title`} className="mt-2 text-base font-semibold leading-6 text-[#183F74]">
            {question.text}
          </p>
          <p id={validationId} className={cn(
            "mt-3 text-sm leading-6",
            isComplete ? "text-[#355D32]" : showValidationState ? "text-[#8A523E]" : "text-[#6B7F99]",
          )}>
            {isComplete ? t("completeDescription") : showValidationState ? t("needsAttention") : t("incompleteDescription")}
          </p>
        </div>

        <ScaleSelector
          questionId={question.id}
          field="frequency"
          label={question.responseLabels.frequency}
          scale={question.frequencyScale}
          selectedValue={response.frequency}
          onChange={onResponseChange}
        />

        <ScaleSelector
          questionId={question.id}
          field="impact"
          label={question.responseLabels.impact}
          scale={question.impactScale}
          selectedValue={response.impact}
          onChange={onResponseChange}
        />
      </div>
    </article>
  );
}