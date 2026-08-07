"use client";

import { SearchX } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import { useMarketplace } from "./hooks";

export default function MarketplaceEmpty() {
  const { resetFilters } = useMarketplace();

  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        bg-muted/20
        px-8
        py-20
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-primary/10
          text-primary
        "
      >
        <SearchX className="h-10 w-10" />
      </div>

      <h3 className="text-2xl font-semibold">
        No templates found
      </h3>

      <p
        className="
          mt-3
          max-w-md
          text-muted-foreground
        "
      >
        We couldn't find any templates matching your current
        search or filters. Try adjusting the filters or reset
        everything to explore all available templates.
      </p>

      <div className="mt-8">
        <AppButton
          onClick={resetFilters}
        >
          Reset Filters
        </AppButton>
      </div>
    </div>
  );
}