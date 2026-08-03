import { SortOption } from "@/lib/sorting/template.sort";

export interface SortItem {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortItem[] = [
  {
    value: "latest",
    label: "Newest",
  },
  {
    value: "rating",
    label: "Highest Rating",
  },
  {
    value: "downloads",
    label: "Most Downloaded",
  },
  {
    value: "price-low",
    label: "Price Low",
  },
  {
    value: "price-high",
    label: "Price High",
  },
];