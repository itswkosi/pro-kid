"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ClipboardList, Heart, Info, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useMemo, useState } from "react";

import {
  ageGroups,
  getQuestionnaireDefinition,
  getQuestionnaireFile,
  type AgeGroup,
  type LanguageCode,
} from "@/lib/questionnaire";
import { Button } from "@/components/ui/button";
import {
  buildSymptomBurdenSummary,
  calculateQuestionnaireScores,
  type ScoreComputationResult,
} from "@/lib/scoring";
import type { QuestionResponse } from "@/types/questionnaire";

import { AgeSelector } from "./AgeSelector";
import { InstructionsCard } from "./InstructionsCard";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PrivacyNotice } from "./PrivacyNotice";
import { ReviewAnswersSection } from "./review-answers-section";
import { ResultsSummary } from "./ResultsSummary";
import { SymptomCard } from "./SymptomCard";

type QuestionnaireRendererProps = {
  selectedLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
};

function KidneyMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
      <path
        d="M24 6c-6.9 0-12 5.3-12 12.4 0 6 2.8 10.2 6.6 13.8 2.5 2.4 3.8 5 3.8 9.8h5.4c0-4.8 1.3-7.4 3.8-9.8 3.8-3.6 6.6-7.8 6.6-13.8C38.2 11.3 33 6 26.2 6H24Z"
        fill="#6FA2E8"
      />
      <path
        d="M27.8 12.2c4.7 2 7.5 6 7.5 10.8 0 5.5-2.7 9.2-6 12.3-1.8 1.7-2.8 3.5-3 6.7"
        stroke="#264873"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M25 18.5c0 4.7-.1 7.9 1.2 11.4"
        stroke="#264873"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuestionnaireRenderer({
  selectedLanguage,
  onLanguageChange,
}: QuestionnaireRendererProps) {
  const t = useTranslations("tool");
  const [selectedAge, setSelectedAge] = useState<AgeGroup>("8-18");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});
  const [reportResult, setReportResult] = useState<ScoreComputationResult | null>(null);
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);
  const [actionState, setActionState] = useState<"idle" | "generating" | "printing" | "downloading">("idle");
  const [showReviewValidation, setShowReviewValidation] = useState(false);

  const selectedAgeGroup = ageGroups.find((group) => group.value === selectedAge) ?? ageGroups[2];
  const selectedQuestionnaireFile = getQuestionnaireFile(selectedAge, selectedLanguage);
  const questionnaire = getQuestionnaireDefinition(selectedAge, selectedLanguage);
  const symptomSummary = buildSymptomBurdenSummary(questionnaire, responses);
  const currentLanguageLabel = t(
    `language.${selectedLanguage === "en" ? "english" : "french"}`,
  );
  const completedCount = questionnaire.questions.filter((question) => {
    const response = responses[question.id];
    return response?.frequency !== undefined && response?.impact !== undefined;
  }).length;
  const unansweredQuestions = useMemo(
    () => questionnaire.questions.filter((question) => {
      const response = responses[question.id];
      return response?.frequency === undefined || response?.impact === undefined;
    }),
    [questionnaire.questions, responses],
  );
  const hasPartialAssessment = hasStarted
    && Object.values(responses).some(
      (response) => response.frequency !== undefined || response.impact !== undefined,
    )
    && completedCount < questionnaire.questions.length;

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasPartialAssessment) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasPartialAssessment]);

  function goToStep(nextStep: 1 | 2 | 3) {
    startTransition(() => setStep(nextStep));
  }

  function beginQuestionnaire() {
    startTransition(() => setHasStarted(true));
  }

  function resetOnboarding() {
    startTransition(() => {
      setHasStarted(false);
      setStep(1);
      setResponses({});
      setHasGeneratedReport(false);
      setReportResult(null);
      setActionState("idle");
      setShowReviewValidation(false);
    });
  }

  function handleResponseChange(
    questionId: string,
    field: keyof QuestionResponse,
    value: number,
  ) {
    setResponses((current) => ({
      ...current,
      [questionId]: {
        ...current[questionId],
        [field]: value,
      },
    }));
    setHasGeneratedReport(false);
    setReportResult(null);
    setShowReviewValidation(false);
  }

  async function handleGenerateReport() {
    setShowReviewValidation(true);
    setActionState("generating");
    await Promise.resolve();

    const result = calculateQuestionnaireScores(questionnaire, responses);
    setReportResult(result);
    setHasGeneratedReport(result.canGenerate);
    setActionState("idle");
  }

  async function handlePrintReport() {
    if (!hasGeneratedReport || !reportResult?.frequency || !reportResult.impact) {
      return;
    }

    setActionState("printing");
    await openPdfReport("print");
    setActionState("idle");
  }

  async function handleDownloadPdf() {
    if (!hasGeneratedReport || !reportResult?.frequency || !reportResult.impact) {
      return;
    }

    setActionState("downloading");
    await openPdfReport("download");
    setActionState("idle");
  }

  function handleJumpToQuestion(questionId: string) {
    const target = window.document.getElementById(`question-${questionId}`);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    window.requestAnimationFrame(() => {
      target.focus();
      const nextControl = target.querySelector<HTMLElement>("button[data-selected='false']");
      nextControl?.focus();
    });
  }

  async function openPdfReport(mode: "print" | "download") {
    if (!reportResult?.frequency || !reportResult.impact) {
      return;
    }

    const [{ pdf }, { ProKidReportDocument: ReportDocument }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("./prokid-report-document"),
    ]);

    const dateFormatter = new Intl.DateTimeFormat(
      selectedLanguage === "fr" ? "fr-CA" : "en-CA",
      { dateStyle: "long" },
    );
    const generatedDate = dateFormatter.format(new Date());
    const ageVersion = t(`onboarding.ageGroups.${selectedAgeGroup.translationKey}.age`);

    const responseRows = questionnaire.questions.map((question) => {
      const response = responses[question.id];
      const frequencyOption = question.frequencyScale.options.find(
        (option) => option.value === response?.frequency,
      );
      const impactOption = question.impactScale.options.find(
        (option) => option.value === response?.impact,
      );

      return {
        id: question.id,
        question: question.text,
        frequency:
          response?.frequency !== undefined && frequencyOption
            ? `${response.frequency} - ${frequencyOption.label}`
            : "-",
        impact:
          response?.impact !== undefined && impactOption
            ? `${response.impact} - ${impactOption.label}`
            : "-",
      };
    });

    const pdfDocument = (
      <ReportDocument
        generatedDate={generatedDate}
        language={currentLanguageLabel}
        ageVersion={ageVersion}
        frequencyScore={reportResult.frequency.score}
        impactScore={reportResult.impact.score}
        responses={responseRows}
        umLogoSrc={`${window.location.origin}/images/um-logo.png`}
      />
    );

    const blob = await pdf(pdfDocument).toBlob();
    const url = URL.createObjectURL(blob);

    if (mode === "download") {
      const link = window.document.createElement("a");
      link.href = url;
      link.download = `prokid-report-${selectedLanguage}-${selectedAge}.pdf`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  const onboardingInstructions = [
    t("onboarding.steps.instructions.items.pastWeek"),
    t("onboarding.steps.instructions.items.noWrongAnswers"),
    t("onboarding.steps.instructions.items.notSaved"),
    t("onboarding.steps.instructions.items.report"),
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#ECEFFA] bg-[linear-gradient(180deg,#FFFDFC_0%,#F7F5FF_52%,#FBFCFF_100%)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-8 h-32 w-32 -translate-x-1/2 rounded-full border border-dashed border-[#CABCF8]" />
          <div className="absolute left-[52%] top-11 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full border border-dashed border-[#BCAEF2] bg-white/80 shadow-[0_18px_30px_-24px_rgba(82,67,153,0.7)]">
            <KidneyMark />
          </div>
          <div className="absolute right-[18%] top-12 h-20 w-20 rounded-full border border-dashed border-[#F2C3D3] bg-white/70" />
          <div className="absolute right-[18.6%] top-[3.9rem] flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE8EF] text-[#E36D87] shadow-[0_16px_28px_-22px_rgba(227,109,135,0.75)]">
            <Heart className="h-7 w-7 fill-current" aria-hidden="true" />
          </div>
          <Sparkles className="absolute right-[29%] top-[6.2rem] h-5 w-5 text-[#F0C451]" aria-hidden="true" />
          <span className="absolute left-[61%] top-[8.8rem] h-4 w-4 rounded-full bg-[#A8D760]" />
          <span className="absolute left-[68%] top-[10.3rem] h-2.5 w-2.5 rounded-full bg-[#85B8FF]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_80%_0%,rgba(191,181,239,0.2),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#183D72] sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#4E6687] sm:text-lg">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <AnimatePresence mode="wait" initial={false}>
          {!hasStarted ? (
            <motion.section
              key={`onboarding-${step}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="rounded-[34px] border border-[#E5EAF7] bg-white p-6 shadow-[0_24px_55px_-40px_rgba(49,67,126,0.35)] sm:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7A8FB2]">
                    {t("onboarding.stepLabel", { step })}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#1D4273] sm:text-[2.4rem]">
                    {step === 1
                      ? t("onboarding.steps.language.title")
                      : step === 2
                        ? t("onboarding.steps.age.title")
                        : t("onboarding.steps.instructions.title")}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-[#5A7393]">
                    {step === 1
                      ? t("onboarding.steps.language.description")
                      : step === 2
                        ? t("onboarding.steps.age.description")
                        : t("onboarding.steps.instructions.description")}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full bg-[#F4F7FD] px-3 py-2">
                  {[1, 2, 3].map((value) => (
                    <span
                      key={value}
                      className={value === step ? "h-2.5 w-8 rounded-full bg-[#7458D0]" : "h-2.5 w-2.5 rounded-full bg-[#C8D6EB]"}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_320px] lg:items-start">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`step-panel-${step}`}
                    initial={{ opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -22 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="rounded-[28px] border border-[#EBEFF8] bg-[#FCFDFF] p-5 sm:p-6"
                  >
                    {step === 1 ? (
                      <LanguageSwitcher
                        selectedLanguage={selectedLanguage}
                        onLanguageChange={(language) => {
                          startTransition(() => onLanguageChange(language));
                        }}
                      />
                    ) : null}

                    {step === 2 ? (
                      <AgeSelector selectedAge={selectedAge} onAgeChange={setSelectedAge} />
                    ) : null}

                    {step === 3 ? (
                      <div>
                        <div className="flex items-center gap-2 text-[#4F5FA0]">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF3FF] text-[#5A76C9]">
                            <ClipboardList className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5D79A0]">
                            {t("onboarding.eyebrow")}
                          </p>
                        </div>
                        <ul className="mt-6 space-y-4">
                          {onboardingInstructions.map((item, index) => (
                            <li key={item} className="flex items-start gap-3 text-base leading-7 text-[#496686]">
                              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2EEFF] text-sm font-semibold text-[#6D54C4]">
                                {index + 1}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="space-y-4">
                  <InstructionsCard
                    icon={Info}
                    title={t("sidebar.about.title")}
                    description={t("sidebar.about.description")}
                    footerLinkLabel={t("sidebar.about.link")}
                    accent="blue"
                  />
                  <div className="rounded-[26px] border border-[#E7ECF7] bg-white p-5 shadow-[0_18px_45px_-34px_rgba(49,67,126,0.22)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7A8FB2]">
                      {t("onboarding.selectedFile")}
                    </p>
                    <p className="mt-3 rounded-2xl bg-[#F7F8FD] px-4 py-3 font-mono text-sm text-[#5C6E93]">
                      {selectedQuestionnaireFile}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-[#56708F]">
                      <p>
                        <span className="font-semibold text-[#234872]">{t("onboarding.summary.language")}:</span>{" "}
                        {currentLanguageLabel}
                      </p>
                      <p>
                        <span className="font-semibold text-[#234872]">{t("onboarding.summary.ageGroup")}:</span>{" "}
                        {t(`onboarding.ageGroups.${selectedAgeGroup.translationKey}.age`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 rounded-2xl border-[#D4DDF0] bg-white px-5 text-sm font-semibold text-[#36567C] hover:bg-[#F8FAFF]"
                      onClick={() => goToStep((step - 1) as 1 | 2 | 3)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                      {t("onboarding.back")}
                    </Button>
                  ) : null}
                </div>

                {step < 3 ? (
                  <Button
                    type="button"
                    className="h-13 min-w-[10rem] rounded-2xl bg-[#7053D4] px-7 text-base font-semibold text-white hover:bg-[#5D45BC]"
                    onClick={() => goToStep((step + 1) as 1 | 2 | 3)}
                  >
                    {t("onboarding.continue")}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="h-14 min-w-[10.5rem] rounded-2xl bg-[#7053D4] px-8 text-base font-semibold text-white hover:bg-[#5D45BC]"
                    onClick={beginQuestionnaire}
                  >
                    {t("onboarding.begin")}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </motion.section>
          ) : (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="mb-6 rounded-[28px] border border-[#E6EAF7] bg-white p-5 shadow-[0_20px_48px_-38px_rgba(49,67,126,0.28)] sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C91B2]">
                        {t("onboarding.summary.language")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#234873]">{currentLanguageLabel}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C91B2]">
                        {t("onboarding.summary.ageGroup")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#234873]">
                        {t(`onboarding.ageGroups.${selectedAgeGroup.translationKey}.age`)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C91B2]">
                        {t("onboarding.summary.file")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#234873]">{selectedQuestionnaireFile}</p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-2xl border-[#D4DDF0] bg-white px-5 text-sm font-semibold text-[#36567C] hover:bg-[#F8FAFF]"
                    onClick={resetOnboarding}
                  >
                    {t("onboarding.changeSelections")}
                  </Button>
                </div>
              </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,3.25fr)_220px] xl:items-start 2xl:grid-cols-[minmax(0,3fr)_240px]">
          <div className="rounded-[32px] border border-[#E6EAF7] bg-white p-6 shadow-[0_24px_55px_-40px_rgba(49,67,126,0.35)] sm:p-8 lg:p-10 xl:px-10 xl:py-12">
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#5A76C9]">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#1D4273] sm:text-[2rem]">
                  {t("questionnaire.title")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#607896] sm:text-base">
                  {t("questionnaire.subtitle")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-[24px] border border-[#EDF1FA] bg-[#FCFDFF] px-4 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7A8FB2]">
                  {t("questionnaire.progress.title")}
                </p>
                <p className="mt-1 text-lg font-bold text-[#234873]">
                  {t("questionnaire.progress.count", {
                    completed: completedCount,
                    total: questionnaire.questions.length,
                  })}
                </p>
              </div>
              <div className="h-3 w-32 overflow-hidden rounded-full bg-[#ECF1FA] sm:w-40">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#8C74E4_0%,#A6D46E_100%)] transition-[width] duration-300"
                  style={{ width: `${(completedCount / questionnaire.questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-8 hidden rounded-[24px] border border-[#EFF2FA] bg-[#FCFDFF] px-4 py-4 md:block">
              <div className="grid grid-cols-[minmax(180px,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A90B0]">
                    {t("questionnaire.symptomsLabel")}
                  </p>
                </div>
                <div>
                  <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#7A64C6]">
                    {t("questionnaire.frequencyTitle")}
                  </p>
                </div>
                <div>
                  <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#7BA05F]">
                    {t("questionnaire.impactTitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {questionnaire.questions[0] ? (
                <div className="rounded-[24px] border border-[#EDF1FA] bg-[#FCFDFF] px-4 py-4">
                  <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A64C6]">
                        {questionnaire.questions[0].responseLabels.frequency}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {questionnaire.questions[0].frequencyScale.options.map((option) => (
                          <div key={`legend-frequency-${option.value}`} className="flex items-center gap-2">
                            <span
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#D7CCF5] bg-[#F7F4FF] text-xs font-bold text-[#4E359D]"
                              aria-hidden="true"
                            >
                              {option.icon ?? option.value + 1}
                            </span>
                            <span className="text-xs font-semibold text-[#58488D]">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7BA05F]">
                        {questionnaire.questions[0].responseLabels.impact}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {questionnaire.questions[0].impactScale.options.map((option) => (
                          <div key={`legend-impact-${option.value}`} className="flex items-center gap-2">
                            <span
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#CEE4B8] bg-[#F4FBEF] text-xs font-bold text-[#395C2A]"
                              aria-hidden="true"
                            >
                              {option.icon ?? option.value + 1}
                            </span>
                            <span className="text-xs font-semibold text-[#4C6E40]">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {questionnaire.questions.map((question, index) => (
                <SymptomCard
                  key={question.id}
                  index={index + 1}
                  question={question}
                  response={responses[question.id] ?? {}}
                  showValidationState={showReviewValidation && unansweredQuestions.some((item) => item.id === question.id)}
                  onResponseChange={handleResponseChange}
                />
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[linear-gradient(180deg,#F8F4FF_0%,#FBFAFF_100%)] px-4 py-3 text-sm text-[#6B5BAE]">
              {t("questionnaire.notice")}
            </div>
          </div>

          <div className="space-y-4">
            <InstructionsCard
              icon={ClipboardList}
              title={t("sidebar.howToUse.title")}
              items={[
                t("sidebar.howToUse.items.one"),
                t("sidebar.howToUse.items.two"),
                t("sidebar.howToUse.items.three"),
                t("sidebar.howToUse.items.four"),
              ]}
              accent="purple"
            />
            <InstructionsCard
              icon={Sparkles}
              title={t("sidebar.scoring.title")}
              description={t("sidebar.scoring.description")}
              footerLinkLabel={t("sidebar.scoring.link")}
              accent="green"
            />
            <PrivacyNotice />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="mt-8"
        >
          <ReviewAnswersSection
            completedCount={completedCount}
            totalCount={questionnaire.questions.length}
            unansweredQuestions={unansweredQuestions.map((question) => ({
              id: question.id,
              text: question.text,
            }))}
            onJumpToQuestion={handleJumpToQuestion}
            showValidationState={showReviewValidation && unansweredQuestions.length > 0}
          />
        </motion.div>

        <div className="mt-8">
          <ResultsSummary
            frequencyScore={reportResult?.frequency ?? null}
            impactScore={reportResult?.impact ?? null}
            symptomSummary={symptomSummary}
            hasGeneratedReport={hasGeneratedReport}
            scoreError={reportResult?.error ? t("results.validation.moreNeeded") : null}
            onGenerateReport={handleGenerateReport}
            onPrintReport={handlePrintReport}
            onDownloadPdf={handleDownloadPdf}
            onStartNewAssessment={resetOnboarding}
            actionState={actionState}
          />
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}