"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpenText, Mail } from "lucide-react";
import Link from "next/link";

export function ResourcesBottomCta() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-4 sm:px-6 lg:px-10 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.36 }}
        className="resource-reveal relative overflow-hidden rounded-[32px] border border-[#DECFF7] bg-[linear-gradient(135deg,#FBF8FF_0%,#F3F1FF_42%,#EEF5FF_100%)] px-6 py-10 shadow-[0_28px_52px_-34px_rgba(88,77,157,0.28)] sm:px-8 sm:py-12 lg:px-12 lg:py-14"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.div
            className="resource-blob-slow-x absolute -left-8 bottom-[-34px] h-48 w-72 rounded-[56%_44%_52%_48%/42%_54%_46%_58%] bg-[#D9CCFA]/75 blur-[2px]"
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="resource-blob-slow-y absolute left-[18%] top-[-28px] h-36 w-56 rounded-[48%_52%_44%_56%/58%_42%_58%_42%] bg-[#E8DEFF]/80"
            animate={{ y: [0, 10, 0], x: [0, 6, 0] }}
            transition={{ duration: 9.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="resource-blob-slow-x absolute right-[-18px] bottom-[-22px] h-52 w-80 rounded-[45%_55%_62%_38%/44%_48%_52%_56%] bg-[#D9E8FF]/78"
            animate={{ y: [0, -10, 0], x: [0, -8, 0] }}
            transition={{ duration: 10.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-[8%] top-[22%] h-4 w-4 rounded-full bg-[#9BD769]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[11%] top-[18%] h-3.5 w-3.5 rounded-full bg-[#7FAFF3]"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[18%] bottom-[26%] h-3 w-3 rounded-full bg-[#F0BE5C]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute right-[8%] top-[20%] h-18 w-18 rounded-full border border-dashed border-[#DCB6F0]"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[12%] bottom-[18%] h-14 w-14 rounded-full border border-dashed border-[#B9CFF4]"
            animate={{ rotate: [0, -12, 0] }}
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/78 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#6A58BF] backdrop-blur-sm">
              Need Help?
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#1B4175] sm:text-4xl lg:text-[2.7rem]">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#567093] sm:text-lg">
              Our team can help you find the right PRO-KID resource.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <Link
              href="/#contact"
              className="button-ripple inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#5C49C0] px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#4B3CA3]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Us
            </Link>
            <Link
              href="/publications"
              className="button-ripple resource-link-underline inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D6E0F3] bg-white/90 px-6 text-sm font-bold text-[#355A8D] backdrop-blur-sm transition-colors duration-200 hover:bg-white"
            >
              <BookOpenText className="h-4 w-4" aria-hidden="true" />
              Browse Publications
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}