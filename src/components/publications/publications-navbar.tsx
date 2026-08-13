"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
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
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      <svg width="30" height="30" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke="#AFC4E9" strokeWidth="1.5" fill="#F7FAFF" />
        <circle cx="7.5" cy="9" r="1.2" fill="#2B5482" />
        <circle cx="14.5" cy="9" r="1.2" fill="#2B5482" />
        <path d="M7.5 13.5 Q11 16.5 14.5 13.5" stroke="#2B5482" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
      <svg width="30" height="30" viewBox="0 0 22 22" fill="none" className="-ml-2 mt-1">
        <circle cx="11" cy="11" r="10" stroke="#AFC4E9" strokeWidth="1.5" fill="#F7FAFF" />
        <circle cx="7.5" cy="9" r="1.2" fill="#2B5482" />
        <circle cx="14.5" cy="9" r="1.2" fill="#2B5482" />
        <path d="M7.5 13.5 Q11 16.5 14.5 13.5" stroke="#2B5482" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
      <svg width="30" height="30" viewBox="0 0 22 22" fill="none" className="-ml-2 mt-4">
        <circle cx="11" cy="11" r="10" stroke="#AFC4E9" strokeWidth="1.5" fill="#F7FAFF" />
        <circle cx="7.5" cy="9" r="1.2" fill="#2B5482" />
        <circle cx="14.5" cy="9" r="1.2" fill="#2B5482" />
        <path d="M7.5 13.5 Q11 16.5 14.5 13.5" stroke="#2B5482" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function PublicationsNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DEE8F5]/90 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2" aria-label="PRO-KID homepage">
          <LogoMark />
          <span>
            <span className="block text-[42px] font-extrabold leading-[0.8] tracking-[-0.03em]">
              <span className="text-[#F29D39]">PRO</span>
              <span className="text-[#92C54A]">-</span>
              <span className="text-[#5D9CE3]">KID</span>
            </span>
            <span className="-mt-0.5 block text-[10px] font-medium text-[#6682A6]">
              Patient Reported Outcomes in Kidney Disease
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`inline-flex items-center gap-1 pb-1 text-sm font-semibold transition-colors ${
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
            className="h-11 rounded-2xl border-[#C9D8EF] px-4 text-sm font-semibold text-[#2A4F83]"
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
