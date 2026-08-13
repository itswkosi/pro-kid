import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { BrowseByAudience } from "@/components/resources/browse-by-audience";
import { FeaturedResources } from "@/components/resources/featured-resources";
import { ResourcesBottomCta } from "@/components/resources/resources-bottom-cta";
import { ResourceSearchInterface } from "@/components/resources/resource-search-interface";
import { ResourcesHero } from "@/components/resources/resources-hero";

export const metadata: Metadata = {
  title: "Resources | PRO-KID",
  description:
    "Educational materials and practical guidance for children, parents, caregivers, and healthcare providers in pediatric kidney care.",
};

export default function ResourcesPage() {
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
        <ResourcesHero />
        <ResourceSearchInterface />
        <FeaturedResources />
        <BrowseByAudience />
        <ResourcesBottomCta />
      </main>

      <Footer />
    </div>
  );
}