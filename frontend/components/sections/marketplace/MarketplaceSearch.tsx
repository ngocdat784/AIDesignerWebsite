"use client";

import { Search, X } from "lucide-react";

import AppInput from "@/components/common/AppInput";
import { cn } from "@/lib/utils";

interface MarketplaceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MarketplaceSearch({
  value,
  onChange,
  placeholder = "Search templates, creators or tags...",
  className,
}: MarketplaceSearchProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md",
        className
      )}
    >
      {/* Search Icon */}

      <Search
        className="
          absolute
          left-4
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      {/* Input */}

      <AppInput
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="pl-11 pr-11"
      />

      {/* Clear */}

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-muted-foreground
            transition-colors
            hover:bg-muted
            hover:text-foreground
          "
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}