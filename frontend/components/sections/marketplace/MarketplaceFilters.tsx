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
        gap-3
        `,
        className
      )}
    >
      {/* Category */}

      <select
        value={category}
        onChange={(e) =>
          onCategoryChange(
            e.target.value
          )
        }
        className="
          h-11
          rounded-xl
          border
          bg-background
          px-4
          text-sm
          outline-none
          transition-colors
          focus:border-primary
        "
      >
        <option value="all">
          All Categories
        </option>

        {categories.map(
          (item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.label}
            </option>
          )
        )}
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
          h-11
          rounded-xl
          border
          bg-background
          px-4
          text-sm
          outline-none
          transition-colors
          focus:border-primary
        "
      >
        {sortOptions.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        )}
      </select>

      {/* View */}

      <div
        className="
          flex
          overflow-hidden
          rounded-xl
          border
        "
      >
        <Button
          type="button"
          variant={
            view === "grid"
              ? "default"
              : "ghost"
          }
          size="icon"
          className="rounded-none"
          onClick={() =>
            onViewChange(
              "grid"
            )
          }
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant={
            view === "list"
              ? "default"
              : "ghost"
          }
          size="icon"
          className="rounded-none"
          onClick={() =>
            onViewChange(
              "list"
            )
          }
        >
          <List className="h-4 w-4" />
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
      >
        Reset
      </AppButton>
    </div>
  );
}