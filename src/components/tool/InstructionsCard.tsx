import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type InstructionsCardProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  items?: string[];
  footerLinkLabel?: string;
  accent?: "purple" | "blue" | "green";
};

const accentMap = {
  purple: {
    icon: "bg-[#F3EEFF] text-[#7253D4]",
    link: "text-[#6B52C0]",
    bullet: "bg-[#EEE8FF] text-[#6B52C0]",
  },
  blue: {
    icon: "bg-[#EEF3FF] text-[#5270C5]",
    link: "text-[#4263BC]",
    bullet: "bg-[#E9F1FF] text-[#5270C5]",
  },
  green: {
    icon: "bg-[#ECF8E6] text-[#5D8F53]",
    link: "text-[#537F4C]",
    bullet: "bg-[#F0F8EC] text-[#5D8F53]",
  },
} as const;

export function InstructionsCard({
  icon: Icon,
  title,
  description,
  items,
  footerLinkLabel,
  accent = "purple",
}: InstructionsCardProps) {
  const tones = accentMap[accent];

  return (
    <article className="rounded-[26px] border border-[#E6EAF7] bg-white p-5 shadow-[0_18px_45px_-34px_rgba(49,67,126,0.3)]">
      <div className="flex items-start gap-3">
        <span className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl", tones.icon)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#244872]">{title}</h3>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-[#5A7393]">{description}</p>
          ) : null}
        </div>
      </div>

      {items?.length ? (
        <ol className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#4A6487]">
              <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold", tones.bullet)}>
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {footerLinkLabel ? (
        <p className={cn("mt-4 text-sm font-semibold", tones.link)}>
          {footerLinkLabel}
          <span aria-hidden="true"> →</span>
        </p>
      ) : null}
    </article>
  );
}