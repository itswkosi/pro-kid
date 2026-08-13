"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FeaturedResource = {
  title: string;
  summary: string;
  href: string;
  downloadHref: string;
  image: {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
  };
  accent: {
    surface: string;
    border: string;
    pill: string;
    button: string;
  };
};

const featuredResources: FeaturedResource[] = [
  {
    title: "Getting Started with PRO-KID",
    summary:
      "A practical orientation resource that introduces the PRO-KID tool, explains where it fits in care, and helps teams start using it confidently.",
    href: "/resources?resource=getting-started-with-pro-kid",
    downloadHref: "/resources?resource=getting-started-with-pro-kid&download=1",
    image: {
      src: "/images/getting-started.png",
      alt: "Illustrated group of young people on a purple background.",
      className: "bg-white",
      imageClassName: "object-contain p-4 sm:p-6",
    },
    accent: {
      surface: "bg-[linear-gradient(135deg,#FFFFFF_0%,#FBF9FF_100%)]",
      border: "border-[#DDD7F6]",
      pill: "bg-[#F1ECFF] text-[#6854C3]",
      button: "bg-[#624EC9] hover:bg-[#4F40A9]",
    },
  },
  {
    title: "Validation Study",
    summary:
      "A concise summary of the evidence behind PRO-KID, including instrument development, validation signals, and how the results support clinical interpretation.",
    href: "/resources?resource=validation-study",
    downloadHref: "/resources?resource=validation-study&download=1",
    image: {
      src: "/images/validation.png",
      alt: "Illustration of smiling kidneys on a soft blue and lavender background.",
      className: "bg-white",
      imageClassName: "object-contain p-4 sm:p-6",
    },
    accent: {
      surface: "bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_100%)]",
      border: "border-[#D6E4F8]",
      pill: "bg-[#EDF4FF] text-[#476FAE]",
      button: "bg-[#3570C9] hover:bg-[#295DAA]",
    },
  },
  {
    title: "Clinical Implementation Guide",
    summary:
      "A workflow-oriented guide for integrating PRO-KID into clinic operations, with practical steps for rollout, documentation, and team adoption.",
    href: "/resources?resource=clinical-implementation-guide",
    downloadHref: "/resources?resource=clinical-implementation-guide&download=1",
    image: {
      src: "/images/clinical-implimentation.png",
      alt: "Photo of a facilitator working with children around a table.",
      className: "bg-[linear-gradient(135deg,#F6FBFF_0%,#FFFFFF_100%)]",
      imageClassName: "object-contain p-4 sm:p-6",
    },
    accent: {
      surface: "bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FBFF_100%)]",
      border: "border-[#D9E8F8]",
      pill: "bg-[#EEF5FF] text-[#416AAB]",
      button: "bg-[#2F67BD] hover:bg-[#27559C]",
    },
  },
];

export function FeaturedResources() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-10 lg:pb-10" aria-labelledby="featured-resources-title">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.34 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#5D7DB1]">
            Featured Resources
          </p>
          <h2 id="featured-resources-title" className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-[#173D70] sm:text-4xl">
            Start With the Most Important Resources
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[#557194] sm:text-base sm:text-right">
          Curated materials for onboarding, evidence review, and implementation planning.
        </p>
      </motion.div>

      <div className="mt-7 space-y-5">
        {featuredResources.map((resource, index) => (
          <motion.article
            key={resource.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.34, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className={`group resource-reveal resource-hover-lift overflow-hidden rounded-[30px] border ${resource.accent.border} ${resource.accent.surface} shadow-[0_22px_44px_-34px_rgba(38,78,144,0.35)] hover:shadow-[0_30px_56px_-34px_rgba(38,78,144,0.42)]`}
          >
            <div className="grid gap-0 lg:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)]">
              <div className={`relative min-h-[260px] overflow-hidden border-b border-[#E7EEF9] lg:min-h-[320px] lg:border-b-0 lg:border-r ${resource.image.className ?? "bg-[#F7FAFF]"}`}>
                <Image
                  src={resource.image.src}
                  alt={resource.image.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className={resource.image.imageClassName ?? "object-cover"}
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${resource.accent.pill}`}>
                  Featured Download
                </span>
                <h3 className="mt-4 text-[1.85rem] font-extrabold leading-tight tracking-[-0.025em] text-[#1B4378] sm:text-[2.1rem]">
                  {resource.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#547194] sm:text-[1.05rem]">
                  {resource.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={resource.downloadHref}
                    className={`button-ripple inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-white transition-colors duration-200 ${resource.accent.button}`}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download
                  </Link>
                  <Link
                    href={resource.href}
                    className="button-ripple resource-link-underline inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D7E2F2] bg-white px-6 text-sm font-bold text-[#355B8E] transition-colors duration-200 hover:bg-[#F7FAFF]"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}