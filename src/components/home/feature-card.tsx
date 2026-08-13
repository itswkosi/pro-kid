"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "blue" | "mint" | "lavender" | "yellow";
};

const toneClassMap: Record<NonNullable<FeatureCardProps["tone"]>, string> = {
  blue: "bg-[#EAF2FC] text-[#1E4E8C]",
  mint: "bg-[#E9FAF3] text-[#12785B]",
  lavender: "bg-[#F3EEFF] text-[#6D4FC2]",
  yellow: "bg-[#FFF7DB] text-[#8B6402]",
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "blue",
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-[#DBE6F5] bg-white p-6 shadow-[0_10px_35px_rgba(30,78,140,0.08)]"
    >
      <span
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl",
          toneClassMap[tone],
        )}
      >
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold text-[#163A6D]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#355378]">{description}</p>
    </motion.article>
  );
}
