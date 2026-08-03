"use client";

import FilterBadge from "@/components/common/FilterBadge";

import { getSortLabel } from "@/lib/helpers/getSortLabel";

import { useMarketplace } from "./hooks/useMarketplace";

export default function MarketplaceStats() {
  const {
  startIndex,
  endIndex,
  totalTemplates,

  search,
  category,
  sort,

  clearSearch,
  clearCategory,
  clearSort,
} = useMarketplace();

  return (
    <div className="space-y-4 rounded-2xl border bg-card p-5">

      <p className="text-sm text-muted-foreground">

        {totalTemplates === 0 ? (
          <>
            Showing{" "}
            <span className="font-semibold text-foreground">
              0
            </span>{" "}
            templates
          </>
        ) : (
          <>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {startIndex}
            </span>
            –
            <span className="font-semibold text-foreground">
              {endIndex}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {totalTemplates}
            </span>{" "}
            templates
          </>
        )}

      </p>

      <div className="flex flex-wrap gap-3">
  {search && (
    <FilterBadge
      label="Search"
      value={search}
      onRemove={clearSearch}
    />
  )}

  {category !== "All" && (
    <FilterBadge
      label="Category"
      value={category}
      onRemove={clearCategory}
    />
  )}

  {sort !== "latest" && (
    <FilterBadge
      label="Sort"
      value={getSortLabel(sort)}
      onRemove={clearSort}
    />
  )}
</div>

    </div>
  );
}