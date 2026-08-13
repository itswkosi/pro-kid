"use client";

import { ArrowDownUp, Search } from "lucide-react";

type SearchFiltersProps = {
  query: string;
  type: string;
  topic: string;
  year: string;
  sort: string;
  count: number;
  types: string[];
  topics: string[];
  years: string[];
  onQueryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function SearchFilters({
  query,
  type,
  topic,
  year,
  sort,
  count,
  types,
  topics,
  years,
  onQueryChange,
  onTypeChange,
  onTopicChange,
  onYearChange,
  onSortChange,
}: SearchFiltersProps) {
  return (
    <section aria-label="Publications search and filters" className="rounded-[24px] border border-[#E6ECF8] bg-white p-4 shadow-[0_20px_50px_-40px_rgba(32,73,128,0.5)] sm:p-6">
      <div className="grid gap-3 xl:grid-cols-[1.4fr_repeat(3,minmax(140px,1fr))_auto_auto] xl:items-center">
        <label className="relative block">
          <span className="sr-only">Search publications</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8AA1C3]" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search publications..."
            className="h-12 w-full rounded-2xl border border-[#D9E4F5] bg-white pl-11 pr-4 text-sm text-[#244A78] placeholder:text-[#8EA2C2] focus:border-[#7FA2D8] focus:outline-none"
          />
        </label>

        <FilterSelect label="Publication Type" value={type} options={types} onChange={onTypeChange} />
        <FilterSelect label="Topic" value={topic} options={topics} onChange={onTopicChange} />
        <FilterSelect label="Year" value={year} options={years} onChange={onYearChange} />

        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A6792] xl:justify-end">
          <ArrowDownUp className="h-4 w-4" aria-hidden="true" />
          Sort by
        </div>

        <FilterSelect
          label="Sort publications"
          value={sort}
          options={["Most Recent", "Oldest", "Title A-Z"]}
          onChange={onSortChange}
        />
      </div>

      <p className="mt-4 text-sm font-medium text-[#5A759B]" aria-live="polite">
        {count} publications found
      </p>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-[#D9E4F5] bg-white px-3 text-sm font-medium text-[#2B4F7F] focus:border-[#7FA2D8] focus:outline-none"
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
