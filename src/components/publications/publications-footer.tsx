import Image from "next/image";
import Link from "next/link";

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Accessibility", href: "#" },
];

export function PublicationsFooter() {
  return (
    <footer id="contact" className="mt-12 border-t border-[#DFE8F7] bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer information
      </h2>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-8 border-b border-[#DFE8F7] pb-8 lg:grid-cols-[1.2fr_1fr_1.2fr_auto] lg:items-center">
          <div>
            <p className="text-[42px] font-extrabold leading-[0.85] tracking-[-0.03em]">
              <span className="text-[#F29D39]">PRO</span>
              <span className="text-[#92C54A]">-</span>
              <span className="text-[#5D9CE3]">KID</span>
            </p>
            <p className="mt-1 text-xs leading-5 text-[#5E7B9F]">Patient Reported Outcomes in Kidney Disease</p>
          </div>

          <div>
            <p className="text-sm leading-7 text-[#2F4F7A]">
              PRO-KID is a research initiative from the University of Manitoba in collaboration with Can-SOLVE CKD.
            </p>
            <Link href="/about" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#2F4F7A] hover:text-[#1F3E6D]">
              Learn more about PRO-KID
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E2EAF7] bg-[#FBFDFF] p-3">
              <Image src="/images/um-logo.png" alt="University of Manitoba logo" width={220} height={80} className="h-10 w-auto" />
            </div>
            <div className="rounded-2xl border border-[#E2EAF7] bg-[#FBFDFF] p-3">
              <Image src="/images/can-solve-logo.png" alt="Can-SOLVE CKD Network logo" width={220} height={80} className="h-10 w-auto" />
            </div>
          </div>

          <ul className="flex items-center gap-3">
            <li>
              <Link href="#" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CADAF0] text-[#4F6E95] hover:text-[#214374]">
                <span aria-hidden="true" className="text-xs font-semibold">
                  f
                </span>
              </Link>
            </li>
            <li>
              <Link href="#" aria-label="Twitter" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CADAF0] text-[#4F6E95] hover:text-[#214374]">
                <span aria-hidden="true" className="text-xs font-semibold">
                  x
                </span>
              </Link>
            </li>
            <li>
              <Link href="#" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CADAF0] text-[#4F6E95] hover:text-[#214374]">
                <span aria-hidden="true" className="text-[10px] font-semibold uppercase">
                  ig
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#113C7B]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 text-xs text-[#D7E4F8] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <ul className="flex flex-wrap items-center gap-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>© 2026 University of Manitoba. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
