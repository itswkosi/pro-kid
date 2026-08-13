import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { PublicationsHero } from "@/components/publications/publications-hero";
import { PublicationsPageClient } from "@/components/publications/publications-page-client";
import { getPublicationFilterOptions, getPublications } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Publications | PRO-KID",
  description:
    "Explore PRO-KID research publications and patient-reported outcomes literature in pediatric kidney disease.",
};

export default async function PublicationsPage() {
  const publications = await getPublications();
  const options = await getPublicationFilterOptions();

  return (
    <div className="min-h-screen bg-[#FBFCFF] text-[#173B68]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-[#1E4E8C]"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <PublicationsHero />
        <PublicationsPageClient publications={publications} options={options} />
      </main>

      <Footer />
    </div>
  );
}
