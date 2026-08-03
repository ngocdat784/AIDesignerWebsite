"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SORT_OPTIONS } from "@/lib/constants/sort-options";
import { useMarketplace } from "./hooks/useMarketplace";
import type { SortOption } from "@/lib/sorting/template.sort";

export default function MarketplaceSort() {
  const { sort, setSort } = useMarketplace();

  return (
    <div className="w-full md:w-64">
      <Select
        value={sort}
        onValueChange={(value) =>
          setSort(value as SortOption)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort templates" />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}