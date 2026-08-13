import Link from "next/link";

const defaultLegalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Accessibility", href: "#" },
];

const defaultSocialLinks = [
  { label: "Facebook", href: "#", mark: "f" },
  { label: "Twitter", href: "#", mark: "x" },
  { label: "Instagram", href: "#", mark: "ig" },
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
  socialLinks: Array<{ label: string; href: string; mark: string }>;
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
  socialLinks: defaultSocialLinks,
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
              <svg width="32" height="32" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
                <circle cx="11" cy="11" r="10" stroke="#AFC4E9" strokeWidth="1.5" fill="#F7FAFF" />
                <circle cx="7.5" cy="9" r="1.2" fill="#2B5482" />
                <circle cx="14.5" cy="9" r="1.2" fill="#2B5482" />
                <path d="M7.5 13.5 Q11 16.5 14.5 13.5" stroke="#2B5482" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>
              <svg width="32" height="32" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="-ml-1 mt-0.5 shrink-0">
                <circle cx="11" cy="11" r="10" stroke="#AFC4E9" strokeWidth="1.5" fill="#F7FAFF" />
                <circle cx="7.5" cy="9" r="1.2" fill="#2B5482" />
                <circle cx="14.5" cy="9" r="1.2" fill="#2B5482" />
                <path d="M7.5 13.5 Q11 16.5 14.5 13.5" stroke="#2B5482" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>
              <svg width="32" height="32" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="-ml-1 mt-3 shrink-0">
                <circle cx="11" cy="11" r="10" stroke="#AFC4E9" strokeWidth="1.5" fill="#F7FAFF" />
                <circle cx="7.5" cy="9" r="1.2" fill="#2B5482" />
                <circle cx="14.5" cy="9" r="1.2" fill="#2B5482" />
                <path d="M7.5 13.5 Q11 16.5 14.5 13.5" stroke="#2B5482" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>

              <div>
                <p className="text-[42px] font-extrabold leading-[0.9] tracking-[-0.03em]">
                  <span className="text-[#F29D39]">PRO</span>
                  <span className="text-[#92C54A]">-</span>
                  <span className="text-[#5D9CE3]">KID</span>
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
            <div className="rounded-2xl border border-[#E0E8F7] bg-[#FBFDFF] px-4 py-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#7C94B8]">{content.partnerLabel}</p>
              <p className="mt-1 text-[16px] font-semibold leading-6 text-[#2A4163]">{content.partnerName}</p>
            </div>
            <div className="rounded-2xl border border-[#E0E8F7] bg-[#FBFDFF] px-4 py-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#7C94B8]">{content.networkLabel}</p>
              <p className="mt-1 text-[16px] font-semibold leading-6 text-[#5D4A9D]">
                {content.networkName}
                <br />
                <span className="font-medium text-[#475E86]">{content.networkSubName}</span>
              </p>
            </div>
          </div>

          <ul className="flex items-center gap-3">
            {content.socialLinks.map(({ label, href, mark }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#C8D8EF] bg-white text-[#6A84A6] transition-colors hover:text-[#1E4E8C]"
                >
                  <span className="text-[12px] font-semibold uppercase" aria-hidden="true">
                    {mark}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
