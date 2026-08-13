"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LoaderCircle, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const audienceOptions = [
  "All Audiences",
  "Children",
  "Parents & Caregivers",
  "Healthcare Providers",
];

const resourceTypeOptions = [
  "All Resource Types",
  "Guide",
  "Worksheet",
  "Video",
  "Toolkit",
  "Clinical Resource",
];

const topicOptions = [
  "All Topics",
  "Symptoms",
  "Clinic Visits",
  "Communication",
  "Daily Care",
  "PRO-KID Implementation",
];

const searchableResources = [
  {
    title: "Getting Started with PRO-KID",
    audience: "Healthcare Providers",
    resourceType: "Guide",
    topic: "PRO-KID Implementation",
  },
  {
    title: "What Do Kidneys Do?",
    audience: "Children",
    resourceType: "Worksheet",
    topic: "Daily Care",
  },
  {
    title: "Preparing for Clinic Visits",
    audience: "Parents & Caregivers",
    resourceType: "Guide",
    topic: "Clinic Visits",
  },
  {
    title: "Symptom Tracking Tips",
    audience: "Parents & Caregivers",
    resourceType: "Toolkit",
    topic: "Symptoms",
  },
  {
    title: "Clinical Workflow",
    audience: "Healthcare Providers",
    resourceType: "Clinical Resource",
    topic: "PRO-KID Implementation",
  },
  {
    title: "Talking About How You Feel",
    audience: "Children",
    resourceType: "Guide",
    topic: "Communication",
  },
] as const;

type EmptyStateVariant = "idle" | "loading" | "no-results";

export function ResourceSearchInterface() {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [resourceType, setResourceType] = useState(resourceTypeOptions[0]);
  const [topic, setTopic] = useState(topicOptions[0]);
  const [isLoading, setIsLoading] = useState(false);

  const hasActiveFilters = useMemo(() => {
    return (
      query.trim().length > 0 ||
      audience !== audienceOptions[0] ||
      resourceType !== resourceTypeOptions[0] ||
      topic !== topicOptions[0]
    );
  }, [audience, query, resourceType, topic]);

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return searchableResources.filter((resource) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        resource.title.toLowerCase().includes(normalizedQuery) ||
        resource.topic.toLowerCase().includes(normalizedQuery) ||
        resource.resourceType.toLowerCase().includes(normalizedQuery);

      const matchesAudience =
        audience === audienceOptions[0] || resource.audience === audience;
      const matchesType =
        resourceType === resourceTypeOptions[0] || resource.resourceType === resourceType;
      const matchesTopic = topic === topicOptions[0] || resource.topic === topic;

      return matchesQuery && matchesAudience && matchesType && matchesTopic;
    });
  }, [audience, query, resourceType, topic]);

  useEffect(() => {
    if (!hasActiveFilters) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 420);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasActiveFilters, audience, query, resourceType, topic]);

  const emptyStateVariant: EmptyStateVariant | null = useMemo(() => {
    if (!hasActiveFilters) return "idle";
    if (isLoading) return "loading";
    if (filteredResources.length === 0) return "no-results";
    return null;
  }, [filteredResources.length, hasActiveFilters, isLoading]);

  function clearFilters() {
    setQuery("");
    setAudience(audienceOptions[0]);
    setResourceType(resourceTypeOptions[0]);
    setTopic(topicOptions[0]);
  }

  return (
    <section
      aria-label="Resource search and filters"
      className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-10 sm:px-6 lg:px-10 lg:pb-10 lg:pt-12"
    >
      <div className="resource-filter-transition rounded-[28px] border border-[#E3E8F4] bg-white/95 p-4 sm:p-6 lg:p-7">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(160px,1fr))_auto] lg:items-center">
          <label className="relative block lg:col-span-1">
            <span className="sr-only">Search resources</span>
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#92A2BC]"
              aria-hidden="true"
            />
            <input
              aria-label="Search resources"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources"
              className="resource-filter-transition h-14 w-full rounded-full border border-[#DCE3F0] bg-[#FDFEFF] pl-13 pr-5 text-sm font-medium text-[#284D7A] placeholder:text-[#9BAAC2] focus:border-[#9EB2D8] focus:outline-none"
            />
          </label>

          <PillSelect
            label="Audience"
            value={audience}
            options={audienceOptions}
            onChange={setAudience}
          />
          <PillSelect
            label="Resource type"
            value={resourceType}
            options={resourceTypeOptions}
            onChange={setResourceType}
          />
          <PillSelect label="Topic" value={topic} options={topicOptions} onChange={setTopic} />

          <button
            type="button"
            onClick={clearFilters}
            className="button-ripple resource-filter-transition inline-flex h-11 items-center justify-center rounded-full border border-[#D7DFEE] px-5 text-sm font-semibold text-[#3D5A85] hover:bg-[#F7FAFF] disabled:cursor-not-allowed disabled:opacity-45 lg:justify-self-end"
            disabled={!hasActiveFilters}
          >
            Clear Filters
          </button>
        </div>

        <AnimatePresence mode="wait">
          {emptyStateVariant ? (
            <motion.div
              key={emptyStateVariant}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <ResourceSearchEmptyState
                variant={emptyStateVariant}
                onClearFilters={clearFilters}
                resultsCount={filteredResources.length}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results-ready"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="mt-6 rounded-[24px] border border-[#DDE6F4] bg-[linear-gradient(135deg,#FBFDFF_0%,#F4F8FF_100%)] p-4 sm:p-6"
            >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#5B76A1]">
                  {filteredResources.length} resource{filteredResources.length === 1 ? "" : "s"} matched
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-[-0.015em] text-[#1E4478]">
                  Search results are ready to explore
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#587095]">
                  Refine your filters or continue browsing the featured and audience sections below.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#featured-resources-title"
                  className="button-ripple resource-link-underline inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D5E0F2] bg-white px-5 text-sm font-bold text-[#355A8D] transition-colors duration-200 hover:bg-[#F6FAFF]"
                >
                  View Featured Resources
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#resources-content"
                  className="button-ripple inline-flex h-11 items-center justify-center rounded-full bg-[#5B49BE] px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#493BA2]"
                >
                  Browse by Audience
                </Link>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

type PillSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function PillSelect({ label, value, options, onChange }: PillSelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="resource-filter-transition h-11 w-full rounded-full border border-[#DCE3F0] bg-[#FDFEFF] px-4 text-sm font-medium text-[#2C4D78] focus:border-[#9EB2D8] focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type ResourceSearchEmptyStateProps = {
  variant: EmptyStateVariant;
  onClearFilters: () => void;
  resultsCount: number;
};

function ResourceSearchEmptyState({
  variant,
  onClearFilters,
  resultsCount,
}: ResourceSearchEmptyStateProps) {
  const config =
    variant === "idle"
      ? {
          eyebrow: "Start exploring",
          title: "No filters selected",
          description:
            "Choose an audience, topic, or resource type to narrow the library and discover the most relevant PRO-KID materials.",
          primaryLabel: "Browse by Audience",
          primaryHref: "#resources-content",
          secondaryLabel: "View Featured Resources",
          secondaryHref: "#featured-resources-title",
          icon: Sparkles,
        }
      : variant === "loading"
        ? {
            eyebrow: "Working on it",
            title: "Loading resources",
            description:
              "We’re gathering the most relevant PRO-KID resources for your current search and filter selection.",
            primaryLabel: "Browse Publications",
            primaryHref: "/publications",
            secondaryLabel: "Clear Filters",
            secondaryHref: undefined,
            icon: LoaderCircle,
          }
        : {
            eyebrow: "Try another path",
            title: "No resources found",
            description:
              resultsCount === 0
                ? "No resources matched this combination of search terms and filters. Try broadening your search or browsing by audience instead."
                : "No resources matched this combination of search terms and filters.",
            primaryLabel: "Clear Filters",
            primaryHref: undefined,
            secondaryLabel: "Contact Us",
            secondaryHref: "/#contact",
            icon: Search,
          };

  const Icon = config.icon;

  return (
    <div className="resource-reveal mt-6 overflow-hidden rounded-[24px] border border-[#DDE6F4] bg-[linear-gradient(135deg,#FBFDFF_0%,#F6F4FF_52%,#F2F8FF_100%)]">
      <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="relative min-h-[240px] overflow-hidden border-b border-[#E5ECF7] lg:min-h-full lg:border-b-0 lg:border-r">
          <SearchStateIllustration variant={variant} />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B7EA9]">
            {config.eyebrow}
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-[#1D4478] sm:text-[2rem]">
            {config.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#587095] sm:text-base">
            {config.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {config.primaryHref ? (
              <Link
                href={config.primaryHref}
                className="button-ripple inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#5A47BE] px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#493AA3]"
              >
                <Icon className={variant === "loading" ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden="true" />
                {config.primaryLabel}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onClearFilters}
                className="button-ripple inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#5A47BE] px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#493AA3]"
              >
                <Icon className={variant === "loading" ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden="true" />
                {config.primaryLabel}
              </button>
            )}

            {config.secondaryHref ? (
              <Link
                href={config.secondaryHref}
                className="button-ripple resource-link-underline inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2F2] bg-white px-5 text-sm font-bold text-[#355A8D] transition-colors duration-200 hover:bg-[#F7FAFF]"
              >
                {config.secondaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={onClearFilters}
                className="button-ripple inline-flex h-11 items-center justify-center rounded-full border border-[#D7E2F2] bg-white px-5 text-sm font-bold text-[#355A8D] transition-colors duration-200 hover:bg-[#F7FAFF]"
              >
                {config.secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchStateIllustration({ variant }: { variant: EmptyStateVariant }) {
  const isIdle = variant === "idle";

  return (
    <div
      className={`relative flex h-full min-h-[240px] items-center justify-center ${
        isIdle
          ? "overflow-hidden"
          : "bg-[radial-gradient(circle_at_top,#F4F0FF_0%,#F7FBFF_55%,#FCFDFF_100%)] p-6"
      }`}
    >
      {!isIdle ? (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute left-8 top-8 h-20 w-20 rounded-[56%_44%_52%_48%/42%_54%_46%_58%] bg-[#E7DBFF]/70" />
          <div className="absolute right-7 top-10 h-16 w-16 rounded-full border border-dashed border-[#D8B8EF]" />
          <div className="absolute bottom-7 left-10 h-14 w-14 rounded-full border border-dashed border-[#C5D7F8]" />
          <div className="absolute bottom-10 right-12 h-4 w-4 rounded-full bg-[#A8D867]" />
          <div className="absolute right-16 top-1/2 h-3 w-3 rounded-full bg-[#7FADF1]" />
        </div>
      ) : null}

      {variant === "idle" ? (
        <div className="absolute inset-0">
          <Image
            src="/images/search.png"
            alt="Friendly search illustration"
            fill
            sizes="(min-width: 1024px) 280px, 100vw"
            className="object-cover scale-[0.9]"
          />
        </div>
      ) : variant === "loading" ? (
        <div className="relative h-40 w-52">
          <div className="absolute left-8 top-10 h-24 w-36 rounded-[24px] border-[5px] border-[#3B72C8] bg-white shadow-[0_20px_30px_-22px_rgba(51,92,160,0.45)]" />
          <div className="absolute left-14 top-16 h-12 w-24 rounded-full border-[4px] border-[#A9C4F4] border-t-[#5A47BE] animate-spin" />
          <div className="absolute left-[42%] top-[42%]">
            <LoaderCircle className="h-7 w-7 animate-spin text-[#5A47BE]" aria-hidden="true" />
          </div>
          <div className="absolute left-5 top-24 h-4 w-42 rounded-full bg-[#376CC1]" />
        </div>
      ) : (
        <div className="relative h-40 w-52">
          <div className="absolute left-6 top-12 h-22 w-22 rounded-[46%_54%_55%_45%/43%_42%_58%_57%] bg-[#B59FEF]" />
          <div className="absolute right-6 top-12 h-22 w-22 rounded-[54%_46%_45%_55%/42%_57%_43%_58%] bg-[#A38DE6]" />
          <div className="absolute left-[42%] top-18 h-16 w-3 rounded-full bg-[#CBBDF4]" />
          <div className="absolute left-[34%] top-2 flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-white bg-[#FFEEF1] shadow-[0_18px_28px_-20px_rgba(55,90,141,0.45)]">
            <Search className="h-7 w-7 text-[#E06C84]" aria-hidden="true" />
          </div>
          <div className="absolute left-[51%] top-[47%] h-6 w-1.5 rotate-[-32deg] rounded-full bg-[#E06C84]" />
        </div>
      )}
    </div>
  );
}