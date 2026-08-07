"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import { useMarketplace } from "./hooks";

export default function MarketplacePagination() {
  const {
    page,
    totalPages,
    setPage,
  } = useMarketplace();

  if (totalPages <= 1) {
    return null;
  }

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div
      className="
        mt-14
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
      "
    >
      {/* Previous */}

      <AppButton
        variant="outline"
        onClick={previous}
        disabled={page === 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />

        Previous
      </AppButton>

      {/* Pages */}

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((number) => (
        <AppButton
          key={number}
          variant={
            page === number
              ? "default"
              : "outline"
          }
          size="icon"
          onClick={() => setPage(number)}
          className="
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
          "
        >
          {number}
        </AppButton>
      ))}

      {/* Next */}

      <AppButton
        variant="outline"
        onClick={next}
        disabled={page === totalPages}
      >
        Next

        <ChevronRight className="ml-2 h-4 w-4" />
      </AppButton>
    </div>
  );
}