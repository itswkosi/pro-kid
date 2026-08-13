import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { InstructionsCard } from "./InstructionsCard";

export function PrivacyNotice() {
  const t = useTranslations("tool.sidebar.privacy");

  return (
    <InstructionsCard
      icon={ShieldCheck}
      title={t("title")}
      description={t("description")}
      accent="blue"
    />
  );
}