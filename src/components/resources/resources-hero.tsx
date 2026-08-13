"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  Sparkles,
  Stethoscope,
  TabletSmartphone,
} from "lucide-react";
import Link from "next/link";

export function ResourcesHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E6EAF7] bg-[linear-gradient(180deg,#F9F7FF_0%,#F3F4FF_100%)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -left-16 top-10 h-56 w-56 rounded-[45%_55%_58%_42%/44%_43%_57%_56%] bg-[#E8E0FA]/85 blur-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-4 top-8 h-44 w-52 rounded-[52%_48%_46%_54%/39%_54%_46%_61%] bg-[#DFE9FF]/80 blur-sm"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-[28%] h-48 w-80 rounded-t-[65%] bg-[#ECE6FA]/80"
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(430px,1fr)] lg:items-center lg:gap-14 lg:px-10 lg:pb-20 lg:pt-12">
        <div className="max-w-[620px]">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm font-semibold text-[#58709A]">
              <li>
                <Link href="/" className="resource-link-underline transition-colors duration-200 hover:text-[#335A8B]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="text-[#2E4D79]" aria-current="page">
                Resources
              </li>
            </ol>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34 }}
            className="text-5xl font-extrabold tracking-[-0.03em] text-[#153B6E] sm:text-6xl md:text-7xl"
          >
            Resources
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.06 }}
            className="mt-6 max-w-xl text-base leading-8 text-[#365A86] sm:text-lg"
          >
            Educational materials to support kidney-health conversations for children,
            parents, caregivers, and healthcare providers, with practical guidance for
            understanding symptoms, preparing for visits, and making informed care decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.12 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#resources-content"
              className="button-ripple inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#5A46AF] px-7 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#49399A] sm:text-base"
            >
              Browse Resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className="button-ripple inline-flex h-12 items-center justify-center rounded-full border border-[#C7CDEC] bg-white/85 px-7 text-sm font-bold text-[#3A4F78] transition-colors duration-200 hover:bg-white sm:text-base"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative h-[320px] w-full sm:h-[380px] lg:h-[430px]"
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-0 top-3 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#97A8E8]/65 bg-white/80 text-[#5D79C6]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <HeartPulse className="h-7 w-7" />
          </motion.div>

          <motion.div
            className="absolute right-0 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-[#EFB3BF]/75 bg-[#FFE8EE] text-[#E16884]"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>

          <motion.div
            className="absolute right-7 top-20 h-3.5 w-3.5 rounded-full bg-[#7FB3F7]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-16 top-24 h-[18px] w-[18px] rounded-full bg-[#A7D97B]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-9 left-[14%] right-[12%] rounded-[26px] border border-white/70 bg-white/75 p-4 shadow-[0_24px_40px_-24px_rgba(47,71,128,0.45)] backdrop-blur-sm sm:p-5"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="relative mx-auto h-44 max-w-[420px] sm:h-48">
              <div className="absolute left-0 top-16 h-16 w-[72%] rounded-[14px] bg-[linear-gradient(130deg,#8BA3E7_0%,#7390DA_100%)] shadow-[0_12px_18px_-12px_rgba(46,74,140,0.9)]" />
              <div className="absolute left-3 top-11 h-14 w-[64%] rounded-[12px] bg-[linear-gradient(130deg,#A791E7_0%,#8B74D8_100%)] shadow-[0_10px_16px_-11px_rgba(68,49,130,0.85)]" />
              <div className="absolute left-6 top-6 h-14 w-[56%] rounded-[12px] bg-[linear-gradient(130deg,#C1AFE9_0%,#A893DE_100%)] shadow-[0_10px_16px_-11px_rgba(76,56,136,0.7)]" />

              <div className="absolute bottom-2 right-1 h-32 w-24 rounded-[16px] border border-[#DCE6FA] bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F6FF_100%)] p-3 shadow-[0_16px_26px_-18px_rgba(64,90,147,0.75)]">
                <TabletSmartphone className="h-6 w-6 text-[#4E72C6]" />
                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-full rounded-full bg-[#D7E3FB]" />
                  <div className="h-1.5 w-4/5 rounded-full bg-[#D7E3FB]" />
                  <div className="h-1.5 w-3/5 rounded-full bg-[#D7E3FB]" />
                </div>
              </div>

              <div className="absolute left-[62%] top-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE4FB] bg-[#EEF3FF] text-[#4364B8]">
                <BookOpenText className="h-6 w-6" />
              </div>

              <div className="absolute left-[62%] top-[34%] flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E9CB] bg-[#EBF8E2] text-[#5A9256]">
                <ClipboardCheck className="h-5 w-5" />
              </div>

              <div className="absolute left-[46%] top-[6%] flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E6FB] bg-[#EAF2FF] text-[#4A73C1]">
                <Stethoscope className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}