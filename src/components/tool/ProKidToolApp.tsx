"use client";

import { NextIntlClientProvider, useTranslations } from "next-intl";
import { useState } from "react";

import { Footer, type FooterContent } from "@/components/home/footer";
import { Navbar, type NavbarItem } from "@/components/home/navbar";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import { type LanguageCode } from "@/lib/questionnaire";

import { QuestionnaireRenderer } from "./QuestionnaireRenderer";

const frToolOverride = {
  onboarding: {
    steps: {
      instructions: {
        title: frMessages.tool.onboarding.steps.instructions.title,
        description: frMessages.tool.onboarding.steps.instructions.description,
        items: {
          pastWeek: frMessages.tool.onboarding.steps.instructions.items.pastWeek,
          frequency: frMessages.tool.onboarding.steps.instructions.items.frequency,
          impact: frMessages.tool.onboarding.steps.instructions.items.impact,
          report: frMessages.tool.onboarding.steps.instructions.items.report,
        },
      },
    },
  },
  questionnaire: {
    title: frMessages.tool.questionnaire.title,
    subtitle: frMessages.tool.questionnaire.subtitle,
    validation: {
      ...enMessages.tool.questionnaire.validation,
      complete: frMessages.tool.questionnaire.validation.complete,
      incomplete: frMessages.tool.questionnaire.validation.incomplete,
    },
  },
};

const messages = {
  en: enMessages,
  fr: {
    ...enMessages,
    tool: {
      ...enMessages.tool,
      ...frToolOverride,
      onboarding: {
        ...enMessages.tool.onboarding,
        ...frToolOverride.onboarding,
        steps: {
          ...enMessages.tool.onboarding.steps,
          ...frToolOverride.onboarding.steps,
          instructions: {
            ...enMessages.tool.onboarding.steps.instructions,
            ...frToolOverride.onboarding.steps.instructions,
            items: {
              ...enMessages.tool.onboarding.steps.instructions.items,
              ...frToolOverride.onboarding.steps.instructions.items,
            },
          },
        },
      },
      questionnaire: {
        ...enMessages.tool.questionnaire,
        ...frToolOverride.questionnaire,
      },
    },
  },
};

const toolTimeZone = "America/Winnipeg";

function LocalizedToolShell({
  locale,
  onLanguageChange,
}: {
  locale: LanguageCode;
  onLanguageChange: (locale: LanguageCode) => void;
}) {
  const t = useTranslations();

  const navItems: NavbarItem[] = [
    { label: t("common.nav.items.about"), href: "/about" },
    { label: t("common.nav.items.resources"), href: "/resources" },
    { label: t("common.nav.items.publications"), href: "/publications" },
    { label: t("common.nav.items.tool"), href: "/prokid" },
  ];

  const footerContent: FooterContent = {
    title: t("common.footer.title"),
    description: t("common.footer.description"),
    learnMoreLabel: t("common.footer.learnMore"),
    learnMoreHref: "/about",
    partnerLabel: t("common.footer.partner"),
    partnerName: t("common.footer.partnerName"),
    networkLabel: t("common.footer.network"),
    networkName: t("common.footer.networkName"),
    networkSubName: t("common.footer.networkSubName"),
    legalLinks: [
      { label: t("common.footer.legal.privacy"), href: "#" },
      { label: t("common.footer.legal.terms"), href: "#" },
      { label: t("common.footer.legal.accessibility"), href: "#" },
    ],
    socialLinks: [
      { label: t("common.footer.social.facebook"), href: "#", mark: "f" },
      { label: t("common.footer.social.twitter"), href: "#", mark: "x" },
      { label: t("common.footer.social.instagram"), href: "#", mark: "ig" },
    ],
    taglineLine1: t("common.footer.taglineLine1"),
    taglineLine2: t("common.footer.taglineLine2"),
    copyright: t("common.footer.copyright"),
  };

  return (
    <div className="min-h-screen bg-[#FBFCFF] text-[#173B68]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-[#1E4E8C]"
      >
        {t("common.skipToMain")}
      </a>
      <Navbar
        navItems={navItems}
        homeHref="/"
        homeAriaLabel={t("common.nav.homeAriaLabel")}
        mobileMenuLabel={t("common.nav.toggle")}
        languageLabel={t(`tool.language.${locale === "en" ? "english" : "french"}`)}
        tagline={t("common.nav.tagline")}
      />

      <main id="main-content">
        <QuestionnaireRenderer
          selectedLanguage={locale}
          onLanguageChange={onLanguageChange}
        />
      </main>

      <Footer content={footerContent} />
    </div>
  );
}

export function ProKidToolApp() {
  const [locale, setLocale] = useState<LanguageCode>("en");

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale]}
      timeZone={toolTimeZone}
    >
      <LocalizedToolShell locale={locale} onLanguageChange={setLocale} />
    </NextIntlClientProvider>
  );
}