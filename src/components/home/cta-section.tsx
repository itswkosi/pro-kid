"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="cta-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[30px] bg-[#9d8ce6]"
        >
          <Image
            src="/images/get-started.png"
            alt="Get started illustration"
            width={2048}
            height={1157}
            className="h-[190px] w-full object-cover object-center scale-[1.12] sm:h-[220px] lg:h-[235px] lg:scale-[1.09]"
            priority
          />

          {/* Pin text strictly inside the right purple safe zone (left of children ~48%, right of paper plane ~6%) */}
          <div className="absolute inset-y-0 left-[48%] right-[6%] z-10 flex items-center">
            <div>
              <h2
                id="cta-title"
                className="text-balance text-lg font-bold leading-snug text-white sm:text-2xl lg:text-3xl"
              >
                Ready to get started?
              </h2>
              <p className="mt-1 text-xs leading-5 text-white/90 sm:text-sm">
                Your voice can help you and others.
              </p>
              <Link
                href="/prokid"
                className="mt-3 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#5F53B8] transition-colors hover:bg-[#f3f6fd] sm:px-5 sm:py-2 sm:text-sm"
              >
                Start PRO-KID Tool
                <ArrowRight aria-hidden="true" className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
