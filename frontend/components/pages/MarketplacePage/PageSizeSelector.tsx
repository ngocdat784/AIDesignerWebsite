"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  PAGE_SIZE_OPTIONS,
  PageSize,
} from "@/lib/constants/page-size";

import { useMarketplace } from "./hooks/useMarketplace";

export default function PageSizeSelector() {
  const {
    pageSize,
    setPageSize,
  } = useMarketplace();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        Show
      </span>

      <Select
        value={pageSize.toString()}
        onValueChange={(value) =>
          setPageSize(
            Number(value) as PageSize
          )
        }
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem
              key={size}
              value={size.toString()}
            >
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-sm text-muted-foreground">
        templates
      </span>
    </div>
  );
}