import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import { languageOptions, type LanguageCode } from "@/lib/questionnaire";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  selectedLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
};

export function LanguageSwitcher({
  selectedLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const t = useTranslations("tool");

  return (
    <div aria-labelledby="language-switcher-title">
      <div className="mb-5 flex items-center gap-2 text-[#4F5FA0]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF3FF] text-[#5A76C9]">
          <Globe className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 id="language-switcher-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5D79A0]">
          {t("onboarding.eyebrow")}
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {languageOptions.map((option) => {
          const isSelected = option.value === selectedLanguage;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onLanguageChange(option.value)}
              className={cn(
                "min-h-14 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                isSelected
                  ? "border-[#7C62D8] bg-[#7253D4] text-white shadow-[0_14px_30px_-24px_rgba(63,44,136,0.9)]"
                  : "border-[#E2E8F5] bg-white text-[#4E6485] hover:border-[#CDC8F0] hover:bg-[#FBFAFF]",
              )}
              aria-pressed={isSelected}
            >
              {t(`language.${option.labelKey}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}