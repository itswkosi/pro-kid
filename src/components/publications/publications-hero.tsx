import {
  BarChart3,
  BookOpen,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";
import type { ComponentType } from "react";

type FloatingIconProps = {
  icon: ComponentType<{ className?: string }>;
  className: string;
  tone: string;
};

function FloatingIcon({ icon: Icon, className, tone }: FloatingIconProps) {
  return (
    <div className={`absolute ${className}`}>
      <span className={`inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/80 shadow-[0_14px_30px_-18px_rgba(33,65,120,0.55)] ${tone}`}>
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
    </div>
  );
}

export function PublicationsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E7ECF8] bg-[linear-gradient(180deg,#F9FBFF_0%,#F5F2FD_100%)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#DDE9FF]/55 blur-3xl" />
        <div className="absolute right-4 top-4 h-56 w-56 rounded-full bg-[#EADFFF]/70 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-52 w-72 rounded-tl-[120px] bg-[#E4D8FB]/50" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(480px,1fr)] lg:items-center lg:px-10 lg:pb-14 lg:pt-14">
        <div className="max-w-[560px]">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[#153B6E] sm:text-5xl md:text-6xl">
            Publications
          </h1>
          <p className="mt-5 text-base leading-8 text-[#355982] sm:text-lg">
            Explore research and publications about PRO-KID and patient-reported outcomes in pediatric kidney disease.
          </p>
        </div>

        <div className="relative h-[250px] w-full sm:h-[300px] lg:h-[320px]">
          <FloatingIcon
            icon={BarChart3}
            className="left-6 top-5 animate-[float_5.6s_ease-in-out_infinite]"
            tone="bg-[#DFF3D9] text-[#4A8A54]"
          />
          <FloatingIcon
            icon={FileText}
            className="right-24 top-2 animate-[float_5s_ease-in-out_infinite]"
            tone="bg-[#E6DEFC] text-[#6B4CC2]"
          />
          <FloatingIcon
            icon={Search}
            className="right-4 top-16 animate-[float_6s_ease-in-out_infinite]"
            tone="bg-[#FFEFAE] text-[#9A7416]"
          />

          <div className="absolute inset-x-6 bottom-2 mx-auto max-w-[420px] rounded-[26px] bg-white/65 p-4 shadow-[0_22px_40px_-26px_rgba(35,66,116,0.65)] backdrop-blur-sm">
            <div className="rounded-[20px] border border-[#E4DFF6] bg-white px-5 py-4">
              <div className="relative grid grid-cols-2 gap-3">
                <div className="h-28 rounded-l-2xl bg-[linear-gradient(150deg,#F5F8FF_0%,#FAF7FF_100%)]" />
                <div className="h-28 rounded-r-2xl bg-[linear-gradient(150deg,#FAF7FF_0%,#F5F8FF_100%)]" />
                <BookOpen className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-[#6A52BA]" aria-hidden="true" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[#8A79C7]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
