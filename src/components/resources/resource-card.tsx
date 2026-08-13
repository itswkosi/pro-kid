import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  HeartHandshake,
  NotebookPen,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ResourceCardThumbnail = {
  src: string;
  alt: string;
};

export type ResourceCardProps = {
  title: string;
  description: string;
  audience: string;
  resourceType: string;
  thumbnail: ResourceCardThumbnail;
  estimatedReadingTime: string;
  downloadUrl: string;
  externalLink?: string;
  className?: string;
};

const audienceAccents = {
  children: {
    cardBorder: "border-[#E4DCF7]",
    cardShadow: "shadow-[0_20px_40px_-32px_rgba(94,76,178,0.42)] hover:shadow-[0_28px_52px_-30px_rgba(94,76,178,0.36)]",
    badge: "bg-[#F2EDFF] text-[#674FBC]",
    iconWrap: "bg-[linear-gradient(135deg,#BCA9F0_0%,#7E6AD9_100%)]",
    meta: "text-[#657A9A]",
    action: "text-[#5E4DB7] hover:text-[#4D3E99]",
  },
  "parents & caregivers": {
    cardBorder: "border-[#D7E7DA]",
    cardShadow: "shadow-[0_20px_40px_-32px_rgba(55,111,72,0.28)] hover:shadow-[0_28px_52px_-30px_rgba(55,111,72,0.26)]",
    badge: "bg-[#EEF8F0] text-[#407350]",
    iconWrap: "bg-[linear-gradient(135deg,#A8D6B2_0%,#4B9A64_100%)]",
    meta: "text-[#637A72]",
    action: "text-[#356F48] hover:text-[#295938]",
  },
  "healthcare providers": {
    cardBorder: "border-[#D8E5F8]",
    cardShadow: "shadow-[0_20px_40px_-32px_rgba(47,103,189,0.3)] hover:shadow-[0_28px_52px_-30px_rgba(47,103,189,0.28)]",
    badge: "bg-[#EEF5FF] text-[#416AA6]",
    iconWrap: "bg-[linear-gradient(135deg,#98BBF2_0%,#3F74CC_100%)]",
    meta: "text-[#617797]",
    action: "text-[#2F67BD] hover:text-[#244F96]",
  },
} as const;

const defaultAccent = audienceAccents["healthcare providers"];

const resourceTypeIcons = {
  guide: BookOpen,
  article: NotebookPen,
  worksheet: FileText,
  toolkit: HeartHandshake,
  pdf: FileText,
  clinical: Stethoscope,
  default: FileText,
} as const;

function getAudienceAccent(audience: string) {
  return audienceAccents[audience.toLowerCase() as keyof typeof audienceAccents] ?? defaultAccent;
}

function getResourceTypeIcon(resourceType: string) {
  const normalizedType = resourceType.toLowerCase();

  if (normalizedType.includes("guide")) return resourceTypeIcons.guide;
  if (normalizedType.includes("article")) return resourceTypeIcons.article;
  if (normalizedType.includes("worksheet")) return resourceTypeIcons.worksheet;
  if (normalizedType.includes("toolkit")) return resourceTypeIcons.toolkit;
  if (normalizedType.includes("clinical")) return resourceTypeIcons.clinical;
  if (normalizedType.includes("pdf")) return resourceTypeIcons.pdf;

  return resourceTypeIcons.default;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

export function ResourceCard({
  title,
  description,
  audience,
  resourceType,
  thumbnail,
  estimatedReadingTime,
  downloadUrl,
  externalLink,
  className,
}: ResourceCardProps) {
  const accent = getAudienceAccent(audience);
  const TypeIcon = getResourceTypeIcon(resourceType);
  const external = externalLink ? isExternalUrl(externalLink) : false;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] border bg-white p-4 transition-all duration-300 hover:-translate-y-1 sm:p-6",
        accent.cardBorder,
        accent.cardShadow,
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="relative overflow-hidden rounded-[20px] border border-[#E8EEF8] bg-[linear-gradient(180deg,#F9FBFF_0%,#F3F7FF_100%)] aspect-[16/10]">
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />

          <span
            className={cn(
              "absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_14px_28px_-16px_rgba(34,65,114,0.55)] sm:left-6 sm:top-6",
              accent.iconWrap,
            )}
          >
            <TypeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full px-3 py-1 text-xs font-bold tracking-[0.04em]", accent.badge)}>
            {resourceType}
          </span>
          <span className="rounded-full bg-[#F4F7FB] px-3 py-1 text-xs font-semibold text-[#5E7392]">
            {audience}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold leading-8 tracking-[-0.015em] text-[#1E4478] sm:text-[1.35rem]">
            {title}
          </h3>
          <p className="text-sm leading-7 text-[#557194] sm:text-[15px]">
            {description}
          </p>
        </div>

        <div className={cn("flex items-center gap-2 text-sm font-medium", accent.meta)}>
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          <span>{estimatedReadingTime}</span>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={downloadUrl}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#244E89] px-5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#1D4171]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </Link>

          {externalLink ? (
            <Link
              href={externalLink}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D6E2F2] bg-white px-5 text-sm font-bold transition-colors duration-300 hover:bg-[#F7FAFF]",
                accent.action,
              )}
            >
              Read More
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}