import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Navbar } from "@/components/home/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#173B68]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-[#1E4E8C]"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <HowItWorks />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
