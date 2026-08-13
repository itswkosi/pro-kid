import type { QuestionResponse, QuestionnaireDefinition, QuestionnaireQuestion } from "@/types/questionnaire";

export type ScoreField = keyof Pick<QuestionResponse, "frequency" | "impact">;

export type CalculatedScore = {
  score: number;
  answered: number;
  total: number;
  missing: number;
  missingRatio: number;
};

export type ScoreComputationResult = {
  frequency: CalculatedScore | null;
  impact: CalculatedScore | null;
  canGenerate: boolean;
  error: "too-many-missing" | null;
};

export type SymptomBurdenSummary = {
  id: string;
  text: string;
  frequency: number;
  impact: number;
  burdenScore: number;
};

function getScaleMax(question: QuestionnaireQuestion, field: ScoreField) {
  const scale = field === "frequency" ? question.frequencyScale : question.impactScale;
  return Math.max(...scale.options.map((option) => option.value));
}

export function normalizeResponseValue(
  question: QuestionnaireQuestion,
  field: ScoreField,
  value: number,
) {
  const maxValue = getScaleMax(question, field);

  if (maxValue === 0) {
    return 0;
  }

  return (value / maxValue) * 100;
}

export function calculateScaleScore(
  questionnaire: QuestionnaireDefinition,
  responses: Record<string, QuestionResponse>,
  field: ScoreField,
): CalculatedScore | null {
  const total = questionnaire.questions.length;
  const answeredQuestions = questionnaire.questions.filter(
    (question) => responses[question.id]?.[field] !== undefined,
  );
  const answered = answeredQuestions.length;
  const missing = total - answered;
  const missingRatio = total === 0 ? 1 : missing / total;

  if (missingRatio > 0.5 || answered === 0) {
    return null;
  }

  const totalPercent = answeredQuestions.reduce((sum, question) => {
    const rawValue = responses[question.id]?.[field];

    if (rawValue === undefined) {
      return sum;
    }

    return sum + normalizeResponseValue(question, field, rawValue);
  }, 0);

  return {
    score: Math.round((totalPercent / answered) * 10) / 10,
    answered,
    total,
    missing,
    missingRatio,
  };
}

export function calculateQuestionnaireScores(
  questionnaire: QuestionnaireDefinition,
  responses: Record<string, QuestionResponse>,
): ScoreComputationResult {
  const frequency = calculateScaleScore(questionnaire, responses, "frequency");
  const impact = calculateScaleScore(questionnaire, responses, "impact");

  const canGenerate = Boolean(frequency && impact);

  return {
    frequency,
    impact,
    canGenerate,
    error: canGenerate ? null : "too-many-missing",
  };
}

export function buildSymptomBurdenSummary(
  questionnaire: QuestionnaireDefinition,
  responses: Record<string, QuestionResponse>,
): SymptomBurdenSummary[] {
  return questionnaire.questions
    .flatMap((question) => {
      const response = responses[question.id];

      if (response?.frequency === undefined || response.impact === undefined) {
        return [];
      }

      const normalizedFrequency = normalizeResponseValue(
        question,
        "frequency",
        response.frequency,
      );
      const normalizedImpact = normalizeResponseValue(
        question,
        "impact",
        response.impact,
      );

      return [
        {
          id: question.id,
          text: question.text,
          frequency: response.frequency,
          impact: response.impact,
          burdenScore: normalizedFrequency + normalizedImpact,
        },
      ];
    })
    .sort((left, right) => {
      if (right.burdenScore !== left.burdenScore) {
        return right.burdenScore - left.burdenScore;
      }

      if (right.impact !== left.impact) {
        return right.impact - left.impact;
      }

      if (right.frequency !== left.frequency) {
        return right.frequency - left.frequency;
      }

      return left.text.localeCompare(right.text);
    });
}