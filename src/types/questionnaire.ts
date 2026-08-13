import type { AgeGroup, LanguageCode } from "@/lib/questionnaire";

export type QuestionnaireScaleStyle = "likert-5" | "smiley-3";

export type QuestionnaireOption = {
  value: number;
  label: string;
  icon?: string;
};

export type QuestionnaireScale = {
  style: QuestionnaireScaleStyle;
  options: QuestionnaireOption[];
};

export type QuestionnaireQuestion = {
  id: string;
  text: string;
  responseLabels: {
    frequency: string;
    impact: string;
  };
  frequencyScale: QuestionnaireScale;
  impactScale: QuestionnaireScale;
};

export type QuestionnaireDefinition = {
  id: string;
  locale: LanguageCode;
  ageGroup: AgeGroup;
  questions: QuestionnaireQuestion[];
};

export type QuestionResponse = {
  frequency?: number;
  impact?: number;
};