import en2To4 from "../../../questionnaires/en/2-4.json";
import en5To7 from "../../../questionnaires/en/5-7.json";
import en8To18 from "../../../questionnaires/en/8-18.json";
import fr2To4 from "../../../questionnaires/fr/2-4.json";
import fr5To7 from "../../../questionnaires/fr/5-7.json";
import fr8To18 from "../../../questionnaires/fr/8-18.json";
import type { QuestionnaireDefinition } from "@/types/questionnaire";

export type AgeGroup = "2-4" | "5-7" | "8-18";

export type LanguageCode = "en" | "fr";

export const ageGroups = [
  {
    value: "2-4",
    translationKey: "age2To4",
    questionnaireFile: "questionnaires/{locale}/2-4.json",
  },
  {
    value: "5-7",
    translationKey: "age5To7",
    questionnaireFile: "questionnaires/{locale}/5-7.json",
  },
  {
    value: "8-18",
    translationKey: "age8To18",
    questionnaireFile: "questionnaires/{locale}/8-18.json",
  },
] as const satisfies ReadonlyArray<{
  value: AgeGroup;
  translationKey: string;
  questionnaireFile: string;
}>;

export const languageOptions: ReadonlyArray<{ value: LanguageCode; labelKey: string }> = [
  { value: "en", labelKey: "english" },
  { value: "fr", labelKey: "french" },
];

const questionnaires: Record<LanguageCode, Record<AgeGroup, QuestionnaireDefinition>> = {
  en: {
    "2-4": en2To4 as QuestionnaireDefinition,
    "5-7": en5To7 as QuestionnaireDefinition,
    "8-18": en8To18 as QuestionnaireDefinition,
  },
  fr: {
    "2-4": fr2To4 as QuestionnaireDefinition,
    "5-7": fr5To7 as QuestionnaireDefinition,
    "8-18": fr8To18 as QuestionnaireDefinition,
  },
};

export function getQuestionnaireFile(ageGroup: AgeGroup, language: LanguageCode) {
  return ageGroups.find((group) => group.value === ageGroup)?.questionnaireFile.replace("{locale}", language) ?? ageGroups[2].questionnaireFile.replace("{locale}", language);
}

export function getQuestionnaireDefinition(ageGroup: AgeGroup, language: LanguageCode) {
  return questionnaires[language][ageGroup] ?? questionnaires.en["8-18"];
}