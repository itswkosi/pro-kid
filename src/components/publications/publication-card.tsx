import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Building2,
  ClipboardCheck,
  FileSearch,
  FileText,
  Globe,
  LineChart,
  Map,
  MessageCircle,
  MessagesSquare,
  Monitor,
  Presentation,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

import type { PublicationItem } from "@/types/publication";

const toneClasses = {
  lavender: "bg-[#EEE7FF] text-[#6C4FC5]",
  periwinkle: "bg-[#E8EEFF] text-[#3F66BE]",
  mint: "bg-[#E1F6EA] text-[#2E8D65]",
  yellow: "bg-[#FFF4C8] text-[#A57718]",
  coral: "bg-[#FFE6E6] text-[#BA5A6D]",
} as const;

const tagToneClasses = {
  lavender: "bg-[#F2EDFF] text-[#694DBA]",
  periwinkle: "bg-[#EDF3FF] text-[#3B62B5]",
  mint: "bg-[#E8F7EE] text-[#2E8D65]",
  yellow: "bg-[#FFF7D5] text-[#9A771D]",
  coral: "bg-[#FFEDEE] text-[#B35C6D]",
} as const;

const iconMap = {
  "file-text": FileText,
  "bar-chart": BarChart3,
  users: Users,
  presentation: Presentation,
  "book-open": BookOpen,
  globe: Globe,
  monitor: Monitor,
  "line-chart": LineChart,
  "clipboard-check": ClipboardCheck,
  building: Building2,
  map: Map,
  baby: BadgeCheck,
  stethoscope: Stethoscope,
  "messages-square": MessagesSquare,
  "file-search": FileSearch,
  "message-circle": MessageCircle,
  network: LineChart,
} as const;

type PublicationCardProps = {
  publication: PublicationItem;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  const Icon = iconMap[publication.icon] || FileText;
  const hasPdf = publication.pdfUrl !== "#";
  const hasCitation = publication.citationUrl !== "#";

  return (
    <article className="group grid gap-5 rounded-[22px] border border-[#E5ECF8] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(26,72,128,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-30px_rgba(26,72,128,0.5)] lg:grid-cols-[auto_minmax(0,1.2fr)_minmax(0,0.8fr)_auto] lg:items-start lg:gap-7 lg:p-6">
      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${toneClasses[publication.accent]}`}>
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>

      <div>
        <h3 className="text-[1.28rem] font-bold leading-7 tracking-[-0.015em] text-[#1C3E72]">
          {publication.title}
        </h3>
        <p className="mt-2 text-[15px] font-medium leading-6 text-[#5A7396]">{publication.authors.join(", ")}</p>
        <p className="mt-1 text-[15px] font-medium text-[#3A5D87]">
          {publication.journal}
          <span className="mx-2 text-[#A3B6D2]">•</span>
          {publication.year}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${tagToneClasses[publication.accent]}`}>
            {publication.type}
          </span>
          {publication.topics.map((topic) => (
            <span key={topic} className="rounded-xl bg-[#F1F6FF] px-2.5 py-1 text-xs font-semibold text-[#4D6D97]">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm leading-7 text-[#3F608A]">{publication.description}</p>
        <Link
          href={`/publications/${publication.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#6350C8] underline-offset-4 hover:underline"
        >
          View Abstract
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex shrink-0 lg:flex-col">
        <a
          href={publication.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full publication for ${publication.title}`}
          aria-disabled={!hasPdf}
          tabIndex={hasPdf ? 0 : -1}
          className={`inline-flex h-11 items-center justify-center rounded-2xl border border-[#CEDCF1] bg-white px-4 text-sm font-semibold text-[#3C5D89] ${
            hasPdf ? "hover:bg-[#F4F8FF]" : "cursor-not-allowed opacity-50 pointer-events-none"
          }`}
        >
          Full publication
        </a>
      </div>
    </article>
  );
}
