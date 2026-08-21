"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { NewsletterCTA } from "@/components/publications/newsletter-cta";
import { PublicationsPagination } from "@/components/publications/publications-pagination";
import { PublicationCard } from "@/components/publications/publication-card";
import { SearchFilters } from "@/components/publications/search-filters";
import type { PublicationItem } from "@/types/publication";

type FilterOptions = {
  types: string[];
  topics: string[];
  years: string[];
};

type PublicationsPageClientProps = {
  publications: PublicationItem[];
  options: FilterOptions;
};

const pageSize = 6;

export function PublicationsPageClient({ publications, options }: PublicationsPageClientProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");
  const [topic, setTopic] = useState("All Topics");
  const [year, setYear] = useState("All Years");
  const [sort, setSort] = useState("Oldest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const queryLower = query.toLowerCase().trim();

    const result = publications.filter((item) => {
      const typeMatch = type === "All Types" || item.type === type;
      const topicMatch = topic === "All Topics" || item.topics.includes(topic);
      const yearMatch = year === "All Years" || String(item.year) === year;
      const queryMatch =
        queryLower.length === 0 ||
        item.title.toLowerCase().includes(queryLower) ||
        item.abstract.toLowerCase().includes(queryLower) ||
        item.authors.join(" ").toLowerCase().includes(queryLower) ||
        item.journal.toLowerCase().includes(queryLower);

      return typeMatch && topicMatch && yearMatch && queryMatch;
    });

    if (sort === "Oldest") {
      result.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    } else if (sort === "Title A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    }

    return result;
  }, [publications, query, sort, topic, type, year]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:px-10">
      <SearchFilters
        query={query}
        type={type}
        topic={topic}
        year={year}
        sort={sort}
        count={filtered.length}
        types={options.types}
        topics={options.topics}
        years={options.years}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        onTypeChange={(value) => {
          setType(value);
          setPage(1);
        }}
        onTopicChange={(value) => {
          setTopic(value);
          setPage(1);
        }}
        onYearChange={(value) => {
          setYear(value);
          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
      />

      <div className="mt-5 grid gap-4 sm:gap-5">
        {pageItems.length === 0 ? (
          <p className="rounded-2xl border border-[#E4ECF8] bg-white p-6 text-[#486790]">No publications matched your filters.</p>
        ) : (
          pageItems.map((publication, index) => (
            <motion.div
              key={publication.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.03 }}
            >
              <PublicationCard publication={publication} />
            </motion.div>
          ))
        )}
      </div>

      <PublicationsPagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
      <NewsletterCTA />
    </section>
  );
}
