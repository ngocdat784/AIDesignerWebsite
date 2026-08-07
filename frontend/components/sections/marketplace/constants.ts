import type {
  MarketplaceCategoryId,
  MarketplaceSort,
  MarketplaceTabId,
  MarketplaceView,
} from "./types";

export const MARKETPLACE_SECTION_ID = "marketplace";

export const MARKETPLACE_TITLE =
  "Featured Templates";

export const MARKETPLACE_DESCRIPTION =
  "Discover premium templates crafted by professional creators.";

export const MARKETPLACE_ITEMS_PER_PAGE = 9;

/* =========================================================
 * Default Values
 * ========================================================= */

export const MARKETPLACE_DEFAULT_TAB: MarketplaceTabId =
  "all";

export const MARKETPLACE_DEFAULT_CATEGORY: MarketplaceCategoryId =
  "all";

export const MARKETPLACE_DEFAULT_SORT: MarketplaceSort =
  "popular";

export const MARKETPLACE_DEFAULT_VIEW: MarketplaceView =
  "grid";

/* =========================================================
 * Sort Options
 * ========================================================= */

export const MARKETPLACE_SORT_OPTIONS: ReadonlyArray<{
  label: string;
  value: MarketplaceSort;
}> = [
  {
    label: "Most Popular",
    value: "popular",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Highest Rated",
    value: "rating",
  },
  {
    label: "Price: Low to High",
    value: "price-asc",
  },
  {
    label: "Price: High to Low",
    value: "price-desc",
  },
];

/* =========================================================
 * View Options
 * ========================================================= */

export const MARKETPLACE_VIEW_OPTIONS: readonly MarketplaceView[] =
  [
    "grid",
    "list",
  ];

/* =========================================================
 * Grid
 * ========================================================= */

export const MARKETPLACE_GRID_COLUMNS = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
} as const;

/* =========================================================
 * Animation
 * ========================================================= */

export const MARKETPLACE_ANIMATION = {
  stagger: 0.08,
  duration: 0.4,
} as const;