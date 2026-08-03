"use client";

import AppButton from "@/components/common/AppButton";

import {
  getPaginationItems,
} from "@/lib/pagination/getPaginationItems";

import { useMarketplace } from "./hooks/useMarketplace";

export default function MarketplacePagination() {
  const {
    page,
    totalPages,
    setPage,
  } = useMarketplace();

  if (totalPages <= 1) {
    return null;
  }

  const pages = getPaginationItems(
  page,
  totalPages
);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">

      <AppButton
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </AppButton>

      {pages.map((item, index) => {
  if (item === "...") {
    return (
      <span
        key={`ellipsis-${index}`}
        className="px-2 text-muted-foreground"
      >
        ...
      </span>
    );
  }

  return (
    <AppButton
      key={item}
      variant={
        page === item
          ? "default"
          : "outline"
      }
      onClick={() => setPage(item)}
    >
      {item}
    </AppButton>
  );
})}
      <AppButton
        variant="outline"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </AppButton>

    </div>
  );
}