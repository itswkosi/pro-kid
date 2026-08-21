import { Baby, School, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";

import { ageGroups, type AgeGroup } from "@/lib/questionnaire";
import { cn } from "@/lib/utils";

type AgeSelectorProps = {
  selectedAge: AgeGroup;
  onAgeChange: (age: AgeGroup) => void;
};

const iconMap = {
  "2-4": Baby,
  "5-7": School,
  "8-18": UserRound,
} satisfies Record<AgeGroup, typeof Baby>;

export function AgeSelector({ selectedAge, onAgeChange }: AgeSelectorProps) {
  const t = useTranslations("tool");

  return (
    <div aria-labelledby="age-selector-title">
      <div className="mb-5 flex items-center gap-2 text-[#4F5FA0]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1EEFF] text-[#7658C8]">
          <Baby className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 id="age-selector-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5D79A0]">
          {t("onboarding.eyebrow")}
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {ageGroups.map((option) => {
          const Icon = iconMap[option.value];
          const isSelected = option.value === selectedAge;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAgeChange(option.value)}
              className={cn(
                "flex min-h-[220px] flex-col items-start rounded-[26px] border px-5 py-5 text-left transition-colors",
                isSelected
                  ? "border-[#9B87EA] bg-[#F7F4FF] text-[#5B44AB] shadow-[0_10px_22px_-18px_rgba(91,68,171,0.8)]"
                  : "border-[#E2E8F5] bg-white text-[#36567C] hover:border-[#CDC8F0] hover:bg-[#FBFAFF]",
              )}
              aria-pressed={isSelected}
            >
              <div className="flex w-full items-center gap-3">
                <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                  isSelected
                    ? "border-[#CABCF8] bg-white text-[#6E57BC]"
                    : "border-[#D8E3F2] bg-[#F8FBFF] text-[#6481A7]",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
                <span className="text-sm font-semibold text-[#7F8FAE]">
                  {t("onboarding.ageGroups.completedBy")}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xl font-bold tracking-[-0.02em] text-[#234A75]">
                    {t(`onboarding.ageGroups.${option.translationKey}.age`)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#6E58C0]">
                    {t(`onboarding.ageGroups.${option.translationKey}.respondent`)}
                  </p>
                </div>
                <p className="text-sm leading-6 text-[#5C7494]">
                  {t(`onboarding.ageGroups.${option.translationKey}.description`)}
                </p>
              </div>

            </button>
          );
        })}
      </div>
    </div>
  );
}