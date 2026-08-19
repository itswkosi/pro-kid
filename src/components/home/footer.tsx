import Image from "next/image";
import Link from "next/link";

const defaultLegalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Accessibility", href: "#" },
];

export type FooterContent = {
  title: string;
  description: string;
  learnMoreLabel: string;
  learnMoreHref: string;
  partnerLabel: string;
  partnerName: string;
  networkLabel: string;
  networkName: string;
  networkSubName: string;
  legalLinks: Array<{ label: string; href: string }>;
  taglineLine1: string;
  taglineLine2: string;
  copyright: string;
};

type FooterProps = {
  content?: FooterContent;
};

const defaultFooterContent: FooterContent = {
  title: "Footer",
  description:
    "PRO-KID is a research initiative from the University of Manitoba in collaboration with Can-SOLVE CKD.",
  learnMoreLabel: "Learn more about PRO-KID",
  learnMoreHref: "/about",
  partnerLabel: "Partner",
  partnerName: "University of Manitoba",
  networkLabel: "Network",
  networkName: "Can-SOLVE",
  networkSubName: "CKD Network",
  legalLinks: defaultLegalLinks,
  taglineLine1: "Patient Reported Outcomes",
  taglineLine2: "in Kidney Disease",
  copyright: "© 2026 University of Manitoba. All rights reserved.",
};

export function Footer({ content = defaultFooterContent }: FooterProps) {
  return (
    <footer
      id="contact"
      className="border-t border-[#DDE7F5] bg-white"
      aria-labelledby="footer-title"
    >
      <h2 id="footer-title" className="sr-only">
        {content.title}
      </h2>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#DDE7F5] py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1.25fr)_auto] lg:items-center lg:gap-6">
          <div className="min-w-0">
            <div className="flex items-start gap-2.5">
              <Image
                src="/images/PRO-Kid Logo.png"
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="mt-0.5 h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
              />

              <div>
                <p className="text-[42px] font-extrabold leading-[0.9] tracking-[-0.03em]">
                  <span className="text-[#E05A5A]">P</span>
                  <span className="text-[#F97316]">R</span>
                  <span className="text-[#22C55E]">O</span>
                  <span className="text-[#6B7280]">-</span>
                  <span className="text-[#4F46E5]">K</span>
                  <span className="text-[#F97316]">I</span>
                  <span className="text-[#10B981]">D</span>
                </p>
                <p className="mt-1 text-[11px] font-medium leading-4 text-[#6882A4]">
                  {content.taglineLine1}
                  <br />
                  {content.taglineLine2}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-sm leading-6 text-[#2E4F7A]">{content.description}</p>
            <Link
              href={content.learnMoreHref}
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#1E4E8C] transition-colors hover:text-[#163A6D]"
            >
              {content.learnMoreLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-center rounded-2xl border border-[#E0E8F7] bg-[#FBFDFF] px-4 py-3">
              <Image
                src="/images/um-logo.png"
                alt="University of Manitoba logo"
                width={220}
                height={80}
                className="h-10 w-auto max-w-[170px]"
              />
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-[#E0E8F7] bg-[#FBFDFF] px-4 py-3">
              <Image
                src="/images/can-solve-logo.png"
                alt="Can-SOLVE CKD Network logo"
                width={220}
                height={80}
                className="h-10 w-auto max-w-[170px]"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#0F3A7A]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-[#D7E4F8] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {content.legalLinks.map((link, index) => (
              <li key={link.label} className="inline-flex items-center gap-3">
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
                {index < content.legalLinks.length - 1 ? (
                  <span aria-hidden="true" className="text-[#ADC4E6]">
                    |
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="text-[11px] leading-5 text-[#D7E4F8]">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
