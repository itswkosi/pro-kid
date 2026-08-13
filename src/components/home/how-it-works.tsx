"use client";

import Image from "next/image";

const steps = [
  {
    title: "1. Complete",
    description:
      "Answer simple questions about your symptoms and how they affect you.",
    icon: "/images/icon-1.png",
  },
  {
    title: "2. See Your Results",
    description:
      "Get a summary of your symptoms and how they impact your life.",
    icon: "/images/icon-2.png",
  },
  {
    title: "3. Download or Print",
    description:
      "Save or print your results to share with your healthcare team.",
    icon: "/images/icon-3.png",
  },
  {
    title: "4. Talk to Your Care Team",
    description:
      "Use your results to have better conversations about your health.",
    icon: "/images/icon-4.png",
  },
];

export function HowItWorks() {
  const desktopFlow = steps.flatMap((step, index) => {
    const isLast = index === steps.length - 1;

    return [
      <li key={`step-${step.title}`} className="text-center">
        <span className="inline-flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(23,62,114,0.08)]">
          <Image
            src={step.icon}
            alt=""
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-contain"
            aria-hidden="true"
          />
        </span>

        <h3 className="mx-auto mt-4 max-w-[210px] text-[1.2rem] font-bold leading-[1.25] text-[#163A6D]">
          {index === 3 ? (
            <>
              4. Talk to Your
              <br />
              Care Team
            </>
          ) : (
            step.title
          )}
        </h3>
        <p className="mx-auto mt-2 max-w-[250px] text-[0.95rem] leading-[1.45] text-[#173E72]">
          {step.description}
        </p>
      </li>,
      ...(!isLast
        ? [
            <li
              key={`arrow-${step.title}`}
              aria-hidden="true"
              className="self-start pt-9 text-[2.4rem] font-light leading-none text-[#1D4A84]"
            >
              &rarr;
            </li>,
          ]
        : []),
    ];
  });

  return (
    <section
      id="resources"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ECF4FF_0%,#E8F2FF_100%)] py-16 sm:py-20"
      aria-labelledby="how-it-works-title"
    >
      <div
        className="pointer-events-none absolute -right-8 bottom-0 h-24 w-24 rounded-tl-[80px] bg-[#A8D34B]/85"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="how-it-works-title"
          className="text-center text-4xl font-bold tracking-[-0.02em] text-[#143C78] sm:text-5xl"
        >
          How It Works
        </h2>

        <ol className="mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:hidden">
          {steps.map((step) => (
            <li key={step.title} className="text-center">
              <span className="inline-flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(23,62,114,0.08)]">
                <Image
                  src={step.icon}
                  alt=""
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] object-contain"
                  aria-hidden="true"
                />
              </span>

              <h3 className="mx-auto mt-4 max-w-[180px] text-[1.3rem] font-bold leading-[1.2] text-[#163A6D]">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[250px] text-[1rem] leading-[1.45] text-[#173E72]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <ol className="mt-10 hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-x-5 xl:gap-x-6 lg:grid">
          {desktopFlow}
        </ol>
      </div>
    </section>
  );
}
