"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About PRO-KID", href: "/about" },
  { label: "Resources", href: "#resources", hasDropdown: true },
  { label: "Publications", href: "/publications", active: true },
  { label: "PRO-KID Tool", href: "#tool" },
  { label: "FAQ", href: "#faq" },
];

function LogoMark() {
  return (
    <Image
      src="/images/PRO-Kid Logo.png"
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
    />
  );
}

export function PublicationsNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DEE8F5]/90 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[118px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2" aria-label="PRO-KID homepage">
          <LogoMark />
          <span>
            <span className="block text-[42px] font-extrabold leading-[0.8] tracking-[-0.03em]">
              <span className="text-[#F29D39]">PRO</span>
              <span className="text-[#92C54A]">-</span>
              <span className="text-[#5D9CE3]">KID</span>
            </span>
            <span className="-mt-0.5 block text-[16.5px] font-medium leading-[1.3] text-[#6682A6]">
              <span className="font-extrabold text-[#F29D39]">P</span>atient {" "}
              <span className="font-extrabold text-[#92C54A]">R</span>eported {" "}
              <span className="font-extrabold text-[#5D9CE3]">O</span>utcomes in {" "}
              <span className="font-extrabold text-[#7C6AE9]">Kid</span>ney Disease
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`inline-flex items-center gap-1 pb-1 text-[18.5px] font-semibold transition-colors ${
                item.active
                  ? "border-b-2 border-[#7F64DA] text-[#233D70]"
                  : "text-[#365886] hover:text-[#1F4A82]"
              }`}
            >
              {item.label}
              {item.hasDropdown ? <ChevronDown className="h-3.5 w-3.5" /> : null}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Button
            variant="outline"
            className="h-11 rounded-2xl border-[#C9D8EF] px-4 text-[18.5px] font-semibold text-[#2A4F83]"
          >
            <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
            English
            <ChevronDown className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#CAD9EE] text-[#275389] xl:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-[#E2EAF7] bg-white xl:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-1 px-4 py-3 sm:px-6 lg:px-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[#375C89] hover:bg-[#F3F7FF]"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="outline"
                className="mt-2 h-11 justify-start rounded-xl border-[#CAD9EE] text-[#2A4F83]"
              >
                <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                English
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
