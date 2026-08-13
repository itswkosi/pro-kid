"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  BookOpenCheck,
  CalendarDays,
  CircleHelp,
  ClipboardList,
  Files,
  Download,
  FileBadge2,
  FileText,
  LayoutTemplate,
  MessageSquareHeart,
  NotebookText,
  Presentation,
  Quote,
  Scale,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type AudienceItem = {
  title: string;
  description: string;
  targetId: string;
  icon: typeof Baby;
  accent: {
    border: string;
    iconWrap: string;
    iconColor: string;
    arrow: string;
    hoverGlow: string;
  };
};

const audiences: AudienceItem[] = [
  {
    title: "Children",
    description:
      "Kid-friendly resources that explain kidney health in clear, supportive language.",
    targetId: "children-section",
    icon: Baby,
    accent: {
      border: "border-[#D7C9F4]",
      iconWrap: "bg-[#F0EAFE]",
      iconColor: "text-[#7654C9]",
      arrow: "text-[#7654C9]",
      hoverGlow: "hover:shadow-[0_22px_38px_-25px_rgba(118,84,201,0.75)]",
    },
  },
  {
    title: "Parents & Caregivers",
    description:
      "Practical guidance to help you prepare for visits and support daily symptom conversations.",
    targetId: "parents-caregivers-section",
    icon: Users,
    accent: {
      border: "border-[#C8E7CC]",
      iconWrap: "bg-[#E7F7EA]",
      iconColor: "text-[#3D8C59]",
      arrow: "text-[#3D8C59]",
      hoverGlow: "hover:shadow-[0_22px_38px_-25px_rgba(61,140,89,0.7)]",
    },
  },
  {
    title: "Healthcare Providers",
    description:
      "Clinical tools and implementation materials for integrating PRO-KID in practice.",
    targetId: "healthcare-providers-section",
    icon: Stethoscope,
    accent: {
      border: "border-[#C4DBFF]",
      iconWrap: "bg-[#E6F0FF]",
      iconColor: "text-[#3D72C7]",
      arrow: "text-[#3D72C7]",
      hoverGlow: "hover:shadow-[0_22px_38px_-25px_rgba(61,114,199,0.7)]",
    },
  },
];

type ChildrenResource = {
  title: string;
  description: string;
  type: string;
  readTime: string;
  href: string;
  ctaLabel?: string;
  external?: boolean;
  visual:
    | {
        kind: "image";
        src: string;
        alt: string;
        className?: string;
        imageClassName?: string;
      }
    | {
        kind: "custom";
        className?: string;
      };
};

type ParentResource = {
  title: string;
  description: string;
  format: "PDF" | "Article";
  href: string;
  icon: typeof FileText;
};

type ClinicianResource = {
  title: string;
  description: string;
  publicationDate: string;
  pages: string;
  authors: string;
  href: string;
  citationHref: string;
  icon: typeof FileText;
};

const childrenResources: ChildrenResource[] = [
  {
    title: "What Do Kidneys Do?",
    description:
      "Learn what kidneys do, why they matter, and how they help your body feel its best.",
    type: "Education",
    readTime: "4 min read",
    href: "https://youtu.be/Bn8czDqPUvY?si=alam8EoMqiDBdtRL",
    ctaLabel: "Watch Video",
    external: true,
    visual: {
      kind: "image",
      src: "/images/what-kidneys.png",
      alt: "Friendly illustrated kidneys smiling on a soft pastel background.",
      className: "bg-white",
      imageClassName: "object-contain p-3",
    },
  },
  {
    title: "Talking About How You Feel",
    description:
      "Simple conversation starters that help you explain feelings, questions, and symptoms.",
    type: "Tips",
    readTime: "3 min read",
    href: "https://youtu.be/5xZYFPJ0fps?si=b7IPI9ruAvSxUJcC",
    ctaLabel: "Watch Video",
    external: true,
    visual: {
      kind: "image",
      src: "/images/talking-about.png",
      alt: "Illustrated children standing together on a soft purple background.",
      className: "bg-white",
      imageClassName: "object-cover object-left",
    },
  },
  {
    title: "My Health Workbook",
    description:
      "A guided workbook to track questions, symptoms, and what matters most before clinic.",
    type: "Activity",
    readTime: "8 min read",
    href: "/resources?resource=my-health-workbook",
    visual: {
      kind: "image",
      src: "/images/my-health-workbook.png",
      alt: "Friendly document illustration with a check mark.",
      className: "bg-white",
      imageClassName: "object-contain p-6",
    },
  },
  {
    title: "Getting Ready for Clinic",
    description:
      "What to bring, what to expect, and a few easy ways to feel more prepared for your visit.",
    type: "Preparation",
    readTime: "5 min read",
    href: "https://youtu.be/SRvJGRGqrKc?si=IkgHzdeKmAgQZQT6",
    ctaLabel: "Watch Video",
    external: true,
    visual: {
      kind: "image",
      src: "/images/get-ready.png",
      alt: "A backpack and clinic essentials ready for a visit.",
      className: "bg-white",
      imageClassName: "object-contain p-5",
    },
  },
];

const parentResources: ParentResource[] = [
  {
    title: "Understanding PRO-KID",
    description:
      "A clear overview of what PRO-KID measures and how it supports conversations about your child's health.",
    format: "PDF",
    href: "/resources?resource=understanding-pro-kid",
    icon: NotebookText,
  },
  {
    title: "Preparing for Clinic Visits",
    description:
      "A practical checklist to help organize questions, medications, and updates before each appointment.",
    format: "PDF",
    href: "/resources?resource=preparing-for-clinic-visits",
    icon: ClipboardList,
  },
  {
    title: "Helping Your Child Describe Symptoms",
    description:
      "Guidance for asking open questions and helping your child explain pain, fatigue, and everyday changes.",
    format: "Article",
    href: "/resources?resource=helping-your-child-describe-symptoms",
    icon: MessageSquareHeart,
  },
  {
    title: "Symptom Tracking Tips",
    description:
      "Suggestions for noticing patterns, writing useful notes, and sharing symptom changes with the care team.",
    format: "PDF",
    href: "/resources?resource=symptom-tracking-tips",
    icon: FileText,
  },
  {
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about clinic visits, PRO-KID use, privacy, and what to expect over time.",
    format: "Article",
    href: "/resources?resource=frequently-asked-questions",
    icon: CircleHelp,
  },
];

const clinicianResources: ClinicianResource[] = [
  {
    title: "Implementation Guides",
    description:
      "Step-by-step guidance for introducing PRO-KID into pediatric nephrology workflows and visit routines.",
    publicationDate: "Jul 2026",
    pages: "18 pages",
    authors: "PRO-KID Working Group",
    href: "/resources?resource=implementation-guides",
    citationHref: "/resources?resource=implementation-guides&view=citation",
    icon: BookOpenCheck,
  },
  {
    title: "Validation Papers",
    description:
      "Core validation evidence summarizing development methods, psychometrics, and pediatric use cases.",
    publicationDate: "Jun 2026",
    pages: "12 pages",
    authors: "Chanchlani et al.",
    href: "/resources?resource=validation-papers",
    citationHref: "/resources?resource=validation-papers&view=citation",
    icon: FileBadge2,
  },
  {
    title: "Clinical Workflow",
    description:
      "Workflow maps for screening, follow-up, documentation, and team coordination during clinic visits.",
    publicationDate: "May 2026",
    pages: "10 pages",
    authors: "Clinical Implementation Team",
    href: "/resources?resource=clinical-workflow",
    citationHref: "/resources?resource=clinical-workflow&view=citation",
    icon: LayoutTemplate,
  },
  {
    title: "Scoring Manual",
    description:
      "Reference instructions for scoring, interpreting domains, and using results consistently in practice.",
    publicationDate: "Apr 2026",
    pages: "22 pages",
    authors: "Measurement Core",
    href: "/resources?resource=scoring-manual",
    citationHref: "/resources?resource=scoring-manual&view=citation",
    icon: Scale,
  },
  {
    title: "Presentation Slides",
    description:
      "Ready-to-use decks for orientation, knowledge sharing, and internal training across care teams.",
    publicationDate: "Mar 2026",
    pages: "26 slides",
    authors: "PRO-KID Knowledge Translation",
    href: "/resources?resource=presentation-slides",
    citationHref: "/resources?resource=presentation-slides&view=citation",
    icon: Presentation,
  },
  {
    title: "Training Materials",
    description:
      "Quick-start resources, facilitator notes, and reference materials for onboarding clinicians to PRO-KID.",
    publicationDate: "Feb 2026",
    pages: "14 pages",
    authors: "Education and Practice Leads",
    href: "/resources?resource=training-materials",
    citationHref: "/resources?resource=training-materials&view=citation",
    icon: Files,
  },
];

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BrowseByAudience() {
  return (
    <section id="resources-content" className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-20 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.34 }}
      >
        <h2 className="text-center text-3xl font-extrabold tracking-[-0.02em] text-[#173D70] sm:text-4xl">
          Browse by Audience
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-8 text-[#3D5F8D] sm:text-lg">
          Quickly jump to the resources designed for each audience.
        </p>
      </motion.div>

      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {audiences.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => scrollToId(item.targetId)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.34, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.99 }}
              className={`group resource-reveal resource-hover-lift w-full rounded-2xl border bg-white p-6 text-left ${item.accent.border} ${item.accent.hoverGlow}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${item.accent.iconWrap}`}>
                  <Icon className={`h-7 w-7 ${item.accent.iconColor}`} aria-hidden="true" />
                </span>

                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 ${item.accent.arrow} transition-transform duration-300 group-hover:translate-x-1`}>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-[-0.01em] text-[#1F4677]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#43668E] sm:text-base">
                {item.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-16 space-y-8 sm:mt-20 sm:space-y-10">
        <section
          id="children-section"
          className="scroll-mt-24 rounded-[32px] border border-[#D7C9F4] bg-white px-5 py-7 sm:px-7 sm:py-8 lg:px-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#D6C5FA] bg-[#F0EAFE] text-[#7654C9] shadow-[0_12px_24px_-18px_rgba(118,84,201,0.65)]">
                <Baby className="h-7 w-7" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-[1.9rem] font-extrabold tracking-[-0.02em] text-[#5B42A5]">
                  For Children
                </h3>
                <p className="mt-1 max-w-3xl text-sm leading-7 text-[#4A5F84] sm:text-base">
                  Easy-to-understand resources to help you learn about your kidneys and talk about how you feel.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {childrenResources.map((resource, index) => (
              <motion.article
                key={resource.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.34, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group resource-reveal resource-hover-lift flex h-full flex-col rounded-[24px] border border-[#E5EAF7] bg-white/95 p-4 shadow-[0_18px_36px_-30px_rgba(45,72,128,0.6)] hover:shadow-[0_28px_52px_-28px_rgba(88,77,157,0.36)]"
              >
                <div
                  className={`relative overflow-hidden rounded-[18px] border border-[#E8EDF8] ${resource.visual.className ?? "bg-[#F8FBFF]"} aspect-[1.65/1]`}
                >
                  {resource.visual.kind === "image" ? (
                    <Image
                      src={resource.visual.src}
                      alt={resource.visual.alt}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 100vw"
                      className={resource.visual.imageClassName ?? "object-cover"}
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <div className="absolute left-[20%] top-[22%] h-[44%] w-[40%] rounded-[22px_22px_16px_16px] border-[5px] border-[#3A72C7] bg-[#7AA8EA] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]" />
                      <div className="absolute left-[17%] top-[52%] h-[16%] w-[46%] rounded-[14px] bg-[#3A72C7]" />
                      <div className="absolute left-[56%] top-[34%] h-[34%] w-[9%] rounded-full bg-[#80B55D]" />
                      <div className="absolute left-[54.5%] top-[31%] h-[7%] w-[12%] rounded-full border-[4px] border-[#80B55D] bg-transparent" />
                      <div className="absolute left-[66%] top-[28%] h-[10%] w-[10%] rounded-[6px] bg-[#F6D15A]" />
                      <div className="absolute left-[67%] top-[38%] h-[28%] w-[8%] rounded-[4px] bg-[#9BC4F6]" />
                      <div className="absolute right-[12%] top-[22%] h-3 w-3 rounded-full bg-[#A6D95D]" />
                      <div className="absolute left-[14%] top-[20%] h-2.5 w-2.5 rounded-full bg-[#C9B3F5]" />
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#EFF2FF] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B5AB8]">
                    {resource.type}
                  </span>
                  <span className="rounded-full bg-[#F4F8FF] px-2.5 py-1 text-[11px] font-semibold text-[#58709A]">
                    {resource.readTime}
                  </span>
                </div>

                <h4 className="mt-4 text-xl font-bold leading-7 tracking-[-0.015em] text-[#23467A]">
                  {resource.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-[#557194]">
                  {resource.description}
                </p>

                <Link
                  href={resource.href}
                  target={resource.external ? "_blank" : undefined}
                  rel={resource.external ? "noreferrer" : undefined}
                  className="resource-link-underline mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#6A56C8] transition-colors duration-200 hover:text-[#5646AC]"
                >
                  {resource.ctaLabel ?? "Read More"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="parents-caregivers-section"
          className="scroll-mt-24 rounded-[32px] border border-[#C8E7CC] bg-[linear-gradient(140deg,#FAFFFB_0%,#F0FAF2_100%)] px-5 py-7 sm:px-7 sm:py-8 lg:px-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#BFE1C4] bg-[#E9F6EC] text-[#3D8C59] shadow-[0_12px_24px_-18px_rgba(61,140,89,0.52)]">
                <Users className="h-7 w-7" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-[1.9rem] font-extrabold tracking-[-0.02em] text-[#2F7C4B]">
                  For Parents &amp; Caregivers
                </h3>
                <p className="mt-1 max-w-3xl text-sm leading-7 text-[#4A5F84] sm:text-base">
                  Helpful tools and information to support conversations, preparation, and day-to-day symptom tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {parentResources.map((resource, index) => {
              const Icon = resource.icon;

              return (
                <motion.article
                  key={resource.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.34, delay: index * 0.05 }}
                  whileHover={{ y: -7 }}
                  className="group resource-reveal resource-hover-lift flex h-full flex-col rounded-[24px] border border-[#DDE8E0] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFEFC_100%)] p-5 shadow-[0_18px_34px_-28px_rgba(44,88,64,0.28)] hover:border-[#BFDAC3] hover:shadow-[0_28px_50px_-30px_rgba(44,88,64,0.34)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D6E8D7] bg-[#F4FBF5] text-[#3D8C59] transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>

                    <span className="rounded-full border border-[#D6E8D7] bg-[#F7FBF8] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#4F7B5A]">
                      {resource.format}
                    </span>
                  </div>

                  <h4 className="mt-5 text-[1.05rem] font-bold leading-7 tracking-[-0.015em] text-[#204B34]">
                    {resource.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#5A6E68]">
                    {resource.description}
                  </p>

                  <Link
                    href={resource.href}
                    className="button-ripple inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#C7DEC9] bg-white px-4 text-sm font-bold text-[#356F48] transition-all duration-200 hover:border-[#AED4B4] hover:bg-[#F4FBF5]"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {resource.format === "PDF" ? "Download PDF" : "Open Article"}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section
          id="healthcare-providers-section"
          className="scroll-mt-24 rounded-[32px] border border-[#C4DBFF] bg-[linear-gradient(140deg,#FAFDFF_0%,#EFF5FF_100%)] px-5 py-7 sm:px-7 sm:py-8 lg:px-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C8DBFF] bg-[#EAF2FF] text-[#3D72C7] shadow-[0_12px_24px_-18px_rgba(61,114,199,0.5)]">
                <Stethoscope className="h-7 w-7" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-[1.9rem] font-extrabold tracking-[-0.02em] text-[#2E66BE]">
                  For Healthcare Providers
                </h3>
                <p className="mt-1 max-w-3xl text-sm leading-7 text-[#4A5F84] sm:text-base">
                  Professional reference materials for implementation, scoring, evidence review, and team training.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {clinicianResources.map((resource, index) => {
              const Icon = resource.icon;

              return (
                <motion.article
                  key={resource.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.34, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group resource-reveal resource-hover-lift flex h-full flex-col rounded-[24px] border border-[#D8E4F8] bg-white p-5 shadow-[0_18px_34px_-30px_rgba(36,82,154,0.22)] hover:border-[#BBD0F5] hover:shadow-[0_28px_48px_-30px_rgba(36,82,154,0.28)]"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-[#E8EFFB] pb-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3C6FC4]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[#D7E4FA] bg-[#F6FAFF] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#4C6FA3]">
                      PDF
                    </span>
                  </div>

                  <h4 className="mt-5 text-[1.08rem] font-bold leading-7 tracking-[-0.015em] text-[#1E457A]">
                    {resource.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#5A7396]">
                    {resource.description}
                  </p>

                  <dl className="mt-5 grid gap-2.5 text-sm text-[#5E7392]">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#6F92C8]" aria-hidden="true" />
                      <dt className="font-semibold text-[#375887]">Publication Date</dt>
                      <dd>{resource.publicationDate}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#6F92C8]" aria-hidden="true" />
                      <dt className="font-semibold text-[#375887]">Pages</dt>
                      <dd>{resource.pages}</dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="mt-0.5 h-4 w-4 text-[#6F92C8]" aria-hidden="true" />
                      <dt className="font-semibold text-[#375887]">Authors</dt>
                      <dd>{resource.authors}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    <Link
                      href={resource.href}
                      className="button-ripple inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2F68BF] px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#2758A3]"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download
                    </Link>
                    <Link
                      href={resource.citationHref}
                      className="button-ripple resource-link-underline inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D3E1F8] bg-white px-4 text-sm font-bold text-[#3B629A] transition-colors duration-200 hover:bg-[#F5F9FF]"
                    >
                      <Quote className="h-4 w-4" aria-hidden="true" />
                      Citation
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}