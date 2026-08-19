"use client";

import { motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const defaultNavItems = [
  { label: "About PRO-KID", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Publications", href: "/publications" },
  { label: "PRO-KID Tool", href: "/prokid" },
];

export type NavbarItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  navItems?: NavbarItem[];
  homeHref?: string;
  homeAriaLabel?: string;
  mobileMenuLabel?: string;
  languageLabel?: string;
  tagline?: string;
};

export function Navbar({
  navItems = defaultNavItems,
  homeHref = "/",
  homeAriaLabel = "PRO-KID home",
  mobileMenuLabel = "Toggle navigation menu",
  languageLabel = "English",
  tagline = "Patient Reported Outcomes in Kidney Disease",
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4ECF7]/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[110px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-center gap-2" aria-label={homeAriaLabel}>
          <Image
            src="/images/PRO-Kid Logo.png"
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
          />
          <span>
            <span className="block text-[30px] font-extrabold leading-[1] tracking-tight">
              <span className="text-[#E05A5A]">P</span>
              <span className="text-[#F97316]">R</span>
              <span className="text-[#22C55E]">O</span>
              <span className="text-[#6B7280]">-</span>
              <span className="text-[#4F46E5]">K</span>
              <span className="text-[#F97316]">I</span>
              <span className="text-[#10B981]">D</span>
            </span>
            <span className="block text-[16.5px] font-medium leading-[1.3] text-[#577294]">
              <span className="font-extrabold text-[#E05A5A]">P</span>atient {" "}
              <span className="font-extrabold text-[#F97316]">R</span>eported {" "}
              <span className="font-extrabold text-[#22C55E]">O</span>utcomes in {" "}
              <span className="font-extrabold text-[#4F46E5]">Kid</span>ney Disease
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1 text-[18.5px] font-medium text-[#274B77] transition-colors hover:text-[#1E4E8C]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-[#C8D8EF] px-4 text-[18.5px] text-[#1E4E8C]"
          >
            <Globe aria-hidden="true" className="mr-2 h-4 w-4" />
            {languageLabel}
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileMenuLabel}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4E1F2] text-[#1E4E8C] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-[#E4ECF7] bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-[#274B77] hover:bg-[#F3F7FD]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="mt-2 h-10 justify-start rounded-xl border-[#C8D8EF] px-3 text-sm text-[#1E4E8C]"
            >
              <Globe aria-hidden="true" className="mr-2 h-4 w-4" />
              {languageLabel}
            </Button>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
