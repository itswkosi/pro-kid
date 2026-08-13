import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NewsletterCTA() {
  return (
    <section aria-label="Newsletter signup" className="mt-10 rounded-[22px] border border-[#E3EAF8] bg-[linear-gradient(110deg,#F8F4FF_0%,#F4F8FF_100%)] p-5 shadow-[0_18px_44px_-36px_rgba(33,69,122,0.52)] sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6C54C8] text-white">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#20406F]">Stay Updated</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#4A688F]">
              Subscribe to receive updates about new research and publications related to PRO-KID.
            </p>
          </div>
        </div>

        <Button className="h-11 rounded-2xl bg-white px-5 text-sm font-semibold text-[#5D4AB3] shadow-[0_8px_24px_-16px_rgba(42,69,122,0.75)] hover:bg-[#FBFAFF]">
          Subscribe for Updates
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
