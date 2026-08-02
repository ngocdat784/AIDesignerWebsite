import { Template } from "@/types";

export type SortOption =
  | "latest"
  | "price-low"
  | "price-high"
  | "rating"
  | "downloads";
  export function sortTemplates(
  templates: Template[],
  option: SortOption
) {
  const items = [...templates];

  switch (option) {
    case "price-low":
      return items.sort(
        (a, b) => a.price - b.price
      );

    case "price-high":
      return items.sort(
        (a, b) => b.price - a.price
      );

    case "rating":
      return items.sort(
        (a, b) => b.rating - a.rating
      );

    case "downloads":
      return items.sort(
        (a, b) => b.downloads - a.downloads
      );

    default:
      return items;
  }
}