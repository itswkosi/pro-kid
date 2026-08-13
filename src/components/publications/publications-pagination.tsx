"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PublicationsPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PublicationsPagination({ page, totalPages, onPageChange }: PublicationsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-7 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4E1F3] bg-white text-[#3A5F8B] disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPageChange(item)}
          aria-current={item === page ? "page" : undefined}
          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold ${
            item === page
              ? "bg-[#6F58CE] text-white"
              : "border border-[#D4E1F3] bg-white text-[#3A5F8B]"
          }`}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4E1F3] bg-white text-[#3A5F8B] disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
