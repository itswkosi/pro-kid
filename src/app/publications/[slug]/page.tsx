import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { getPublicationBySlug } from "@/lib/publications";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    return {
      title: "Publication Not Found | PRO-KID",
    };
  }

  return {
    title: `${publication.title} | PRO-KID Publications`,
    description: publication.abstract,
  };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const hasPdf = publication.pdfUrl !== "#";
  const hasCitation = publication.citationUrl !== "#";

  return (
    <div className="min-h-screen bg-[#FBFCFF] text-[#173B68]">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-10">
        <Link href="/publications" className="text-sm font-semibold text-[#5B4FC3] hover:underline">
          ← Back to Publications
        </Link>

        <article className="mt-5 rounded-[24px] border border-[#E4ECF8] bg-white p-6 shadow-[0_22px_50px_-40px_rgba(33,73,124,0.55)] sm:p-8">
          <header>
            <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#1A3C70] sm:text-4xl">
              {publication.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#4D6D96]">{publication.authors.join(", ")}</p>
            <p className="mt-1 text-base font-medium text-[#365A86]">
              {publication.journal} • {publication.year}
            </p>
          </header>

          <section className="mt-8" aria-labelledby="abstract-heading">
            <h2 id="abstract-heading" className="text-xl font-bold text-[#1B3F73]">
              Abstract
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-[#355A85]">{publication.abstract}</p>
          </section>

          <section className="mt-8" aria-labelledby="citation-heading">
            <h2 id="citation-heading" className="text-xl font-bold text-[#1B3F73]">
              Citation
            </h2>
            <p className="mt-3 rounded-2xl bg-[#F5F8FF] p-4 text-[15px] leading-7 text-[#355A85]">
              {publication.citation}
            </p>
          </section>

          <section className="mt-8 flex flex-wrap gap-3" aria-label="Publication links">
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!hasPdf}
              tabIndex={hasPdf ? 0 : -1}
              className={`inline-flex h-11 items-center justify-center rounded-2xl border border-[#CEDCF1] bg-white px-5 text-sm font-semibold text-[#3C5D89] ${
                hasPdf ? "hover:bg-[#F4F8FF]" : "cursor-not-allowed opacity-50 pointer-events-none"
              }`}
            >
              Full publication
            </a>
            <a
              href={publication.citationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!hasCitation}
              tabIndex={hasCitation ? 0 : -1}
              className={`inline-flex h-11 items-center justify-center rounded-2xl border border-[#CEDCF1] bg-white px-5 text-sm font-semibold text-[#3C5D89] ${
                hasCitation ? "hover:bg-[#F4F8FF]" : "cursor-not-allowed opacity-50 pointer-events-none"
              }`}
            >
              Citation source
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
