"use client";

import { cn } from "@/lib/utils";

import {
  MARKETPLACE_SORT_OPTIONS,
} from "./constants";

import MarketplaceFilters from "./MarketplaceFilters";
import MarketplaceSearch from "./MarketplaceSearch";
import MarketplaceTabs from "./MarketplaceTabs";

import {
  MarketplaceCategory,
  MarketplaceTab,
  MarketplaceSort,
  MarketplaceView,
  MarketplaceCategoryId,
  MarketplaceTabId,
} from "./types";

interface MarketplaceToolbarProps {
  search: string;

  onSearchChange: (
    value: string
  ) => void;

  tabs: MarketplaceTab[];

  activeTab: MarketplaceTabId;

  onTabChange: (
    value: MarketplaceTabId
  ) => void;

  categories: MarketplaceCategory[];

  activeCategory: MarketplaceCategoryId;

  onCategoryChange: (
    value: MarketplaceCategoryId
  ) => void;

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

export default function MarketplaceToolbar({
  search,
  onSearchChange,

  tabs,
  activeTab,
  onTabChange,

  categories,
  activeCategory,
  onCategoryChange,

  sort,
  onSortChange,

  view,
  onViewChange,

  className,
}: MarketplaceToolbarProps) {
 return (
  <div
    className={cn(
      `
        mb-12
        flex
        flex-col
        items-center
        gap-7
      `,
      className
    )}
  >
    {/* Search */}
    <MarketplaceSearch
      value={search}
      onChange={onSearchChange}
    />

    {/* Tabs */}
    <MarketplaceTabs
      tabs={tabs}
      value={activeTab}
      onChange={onTabChange}
    />

    {/* Filters */}
    <MarketplaceFilters
      categories={categories}
      category={activeCategory}
      onCategoryChange={onCategoryChange}
      sortOptions={MARKETPLACE_SORT_OPTIONS}
      sort={sort}
      onSortChange={onSortChange}
      view={view}
      onViewChange={onViewChange}
    />
  </div>
);
}