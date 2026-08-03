import { SORT_OPTIONS } from "@/lib/constants/sort-options";

export function getSortLabel(value: string) {
  return (
    SORT_OPTIONS.find(
      (item) => item.value === value
    )?.label ?? value
  );
}