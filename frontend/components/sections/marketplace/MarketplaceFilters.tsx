"use client";

import {
  Grid3X3,
  List,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  MarketplaceCategory,
  MarketplaceCategoryId,
  MarketplaceSort,
  MarketplaceView,
} from "./types";

interface MarketplaceFiltersProps {
  categories: MarketplaceCategory[];

  category: MarketplaceCategoryId;

  onCategoryChange: (
    value: MarketplaceCategoryId
  ) => void;

  sortOptions: readonly {
    label: string;
    value: string;
  }[];

  sort: MarketplaceSort;

  onSortChange: (
    value: MarketplaceSort
  ) => void;

  view: MarketplaceView;

  onViewChange: (
    value: MarketplaceView
  ) => void;

  className?: string;
}

export default function MarketplaceFilters({
  categories,
  category,
  onCategoryChange,
  sortOptions,
  sort,
  onSortChange,
  view,
  onViewChange,
  className,
}: MarketplaceFiltersProps) {
 return (
  <div
    className={cn(
      `
        flex
        flex-wrap
        items-center
        gap-4
      `,
      className
    )}
  >
    {/* Category */}
    <select
      value={category}
      onChange={(e) =>
        onCategoryChange(
          e.target.value as MarketplaceCategoryId
        )
      }
      className="
        h-12
        min-w-[170px]
        cursor-pointer
        rounded-xl
        border
        border-border
        bg-background
        px-5
        text-base
        font-medium
        shadow-sm
        outline-none
        transition-all
        duration-200
        hover:border-primary/40
        hover:shadow-md
        focus:border-primary
        focus:ring-2
        focus:ring-primary/10
      "
    >
      <option value="all">
        All Categories
      </option>

      {categories.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.label}
        </option>
      ))}
    </select>

    {/* Sort */}
    <select
      value={sort}
      onChange={(e) =>
        onSortChange(
          e.target.value as MarketplaceSort
        )
      }
      className="
        h-12
        min-w-[160px]
        cursor-pointer
        rounded-xl
        border
        border-border
        bg-background
        px-5
        text-base
        font-medium
        shadow-sm
        outline-none
        transition-all
        duration-200
        hover:border-primary/40
        hover:shadow-md
        focus:border-primary
        focus:ring-2
        focus:ring-primary/10
      "
    >
      {sortOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>

    {/* View */}
    <div
      className="
        flex
        h-12
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-background
        shadow-sm
      "
    >
      <Button
        type="button"
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        className="
          h-12
          w-12
          rounded-none
        "
        onClick={() => onViewChange("grid")}
        aria-label="Grid view"
      >
        <Grid3X3 className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        className="
          h-12
          w-12
          rounded-none
        "
        onClick={() => onViewChange("list")}
        aria-label="List view"
      >
        <List className="h-5 w-5" />
      </Button>
    </div>

    {/* Reset */}
    <AppButton
  variant="outline"
  onClick={() => {
    onCategoryChange("all");
    onSortChange("popular");
    onViewChange("grid");
  }}
  className="
    h-12
    min-w-[110px]
    rounded-xl
    px-6
    text-base
    font-medium
    shadow-sm
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:shadow-md
  "
>
  Reset
</AppButton>
  </div>
);
}