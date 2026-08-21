"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#EAE7F5] lg:min-h-[760px]">
      {/* Hero image — right half */}
      <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block" aria-hidden="true">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-child.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Fade left into lavender background */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#EAE7F5_0%,rgba(234,231,245,0.35)_28%,rgba(234,231,245,0)_55%)]" />
      </div>

      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {/* Kidney icon — dashed circle */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="absolute left-[54%] top-10 flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-dashed border-[#A78BFA]/60 bg-white/70"
        >
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden="true">
            <path d="M12 3C8.5 3 6 6 6 9c0 2.5 1 4.5 2.5 6C10 16.5 10 18 10 20h4c0-2 0-3.5 1.5-5C17 13.5 18 11.5 18 9c0-3-2.5-6-6-6z" fill="#60A5FA" opacity="0.9"/>
          </svg>
        </motion.div>

        {/* Heart icon — pink filled circle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute right-[12%] top-10 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FCA5A5]/70"
        >
          <Heart className="h-7 w-7 fill-[#EF4444] text-[#EF4444]" />
        </motion.div>

        {/* Yellow 4-pointed star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="absolute right-[25%] top-24"
        >
          <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
            <path d="M20 2 L22.5 17.5 L38 20 L22.5 22.5 L20 38 L17.5 22.5 L2 20 L17.5 17.5 Z" fill="#FBBF24"/>
          </svg>
        </motion.div>

        {/* Teal dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="absolute bottom-16 left-[50%] h-6 w-6 rounded-full bg-[#34D399]"
        />

        {/* Yellow dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="absolute bottom-28 left-[60%] h-4 w-4 rounded-full bg-[#FBBF24]"
        />

        {/* Dashed orbit rings */}
        <div className="absolute left-[52%] top-6 h-28 w-28 rounded-full border border-dashed border-[#C4B5FD]/50" />
        <div className="absolute right-[10%] top-6 h-20 w-20 rounded-full border border-dashed border-[#FCA5A5]/50" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl py-16 sm:py-20 lg:py-32"
          >
            <h1 className="text-balance text-5xl font-bold leading-[1.08] text-[#2D2066] sm:text-6xl lg:text-[4.4rem]">
              Your symptoms.{" "}
              <br />
              Your voice. Your care.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-[#4B4580] sm:text-lg">
              PRO-KID is a patient-reported outcome tool that helps children and
              youth with kidney disease share how they feel—so their healthcare
              team can provide the best possible care.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                id="start"
                href="/prokid"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#3D2B8E] px-7 text-base font-semibold text-white transition-colors hover:bg-[#2f2070]"
              >
                Start PRO-KID Tool
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#2D2066]/30 bg-white/80 px-7 text-base font-semibold text-[#2D2066] transition-colors hover:bg-white"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Spacer column for the absolutely-positioned image */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
